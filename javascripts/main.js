

//var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});



	function splitInput(str) {
		/*
			* couldn't do YAML file with markdown (content: +++ ##markdown +++) as github seems 
			* to removes YAML from files when accessed in a browser :/
			* couldn't do Markdown file with YAML front matter.  github gives 404 for .md filesf
			* with YAML front matter, so i can't do that unless i change the extension to .txt. however, then prose.io does not parse markdown.
			* solution: YAML front matter in html comments
		*/

		var yaml_begin = '<!--';
		var yaml_end = '-->';
		
		if (str.slice(0, yaml_begin.length) !== yaml_begin) return;
		
		
		//console.log(str.substr(str.indexOf(yaml_begin)+yaml_begin.length, str.indexOf(yaml_end)-(yaml_end.length+1)));
		
		return {
				yaml : str.substr(str.indexOf(yaml_begin)+yaml_begin.length, str.indexOf(yaml_end)-(yaml_end.length+1)),
				markdown : str.substr(str.indexOf(yaml_end)+yaml_end.length)
			}
	}

	function metaMarked(data) {
		
		var mySplitInput = splitInput(data);

		return mySplitInput ?  {
				meta : jsyaml.safeLoad(mySplitInput['yaml']),
				html : marked(mySplitInput['markdown'])
			} : {
				meta : null,
				html : marked(data)
			};
	};



	function loadContent(req,pushstate,firstload) {
		
		var lastPushed=Cookies.get('lastPushed');

		console.log("req:"+req);
		console.log("pushstate:"+pushstate);
		console.log("lastPushed:"+lastPushed);
		
		
		if (pushstate) {
			// lastPushed is used so that we don't push things in history in case of page refresh
			if (lastPushed!=req) {
				window.history.pushState({ url: req }, "", req)
				console.log("pushed in history":+req);
				Cookies.set('lastPushed', req);

			}
			
		}
		
		if (req=="/") {
				fn=md_path+index_md; //file name
		} else {
				// parse the value of p
				if (getURLParameter("p",req)) {
					fn=md_path+getURLParameter("p",req).replace(/[^0-9a-z]/gi, '')+".md";
				} else {
					fn=md_path+index_md; // some garbage querystring came with index page load request, does not have p. load home page
				}		
				
		}
			
		var jqxhr = $.get(fn, function( data ) {
				
			var md = metaMarked(data);
			//console.log(md.meta);
			var content_holder=document.getElementById('content');
			content_holder.innerHTML = md.html;
			if (!firstload) {
				FB.XFBML.parse(content_holder);
			}
			labnolDOMContentLoaded();

			window.scrollTo(0, 0); 
			
			$('#nav').blur(); // tried for mobile, not working
			
			
			//$("#edit").html('<a href="//prose.io/#'+user_name+'/'+repo_name+'/edit/master/'+fn+'">Edit on Prose.IO</a> | <a href="//github.com/'+user_name+'/'+repo_name+'/edit/master/'+fn+'">Edit on Github</a>"');
			$("#edit").html('<p><a href="//github.com/'+user_name+'/'+repo_name+'/edit/master/'+fn+'">Edit</a></p>');
			
			$("#edit").show();
			
			if (md.meta) {
				if (md.meta["Title"]!==undefined) {
					document.title=site_title+" - "+md.meta["Title"]
				} else {	
					document.title=site_title;
				}
				
				if (md.meta["Scripts"]!==undefined) {
					$.ajaxSetup({
					  cache: true
					});
					var num_of_scripts = md.meta["Scripts"].length;
					var scripts_loaded = 0;
					$.each( md.meta["Scripts"], function( key, value ) {
						$.getScript(value,function() { 
								scripts_loaded++;
								if (scripts_loaded==num_of_scripts) {
									if (md.meta["Javascript"]!==undefined) {
										jQuery.globalEval(jQuery.trim(md.meta["Javascript"]));
									}	
								}	
						});
					});
				} else if (md.meta["Javascript"]!==undefined) {
					jQuery.globalEval(jQuery.trim(md.meta["Javascript"]));
				} 						
				
			} else {
				document.title=site_title;
			}
			
		});
		
		jqxhr.fail(function(e) {
			if (e.status=="404") {
				document.getElementById('content').innerHTML = '<p><center>404. This page does not exist.</p><p><a href="//github.com/'+user_name+'/'+repo_name+'/new/master?filename='+fn+'">Create this page</a></center></p>';
				$("#edit").hide();
			}	
		});
	}	
						
			
	function processClicks(obj) {
		
		var req=$(obj).attr("href");		
				
				  // no slashes after first (if that) and p is present 
		if (req==="/" || (req.indexOf("/",1)<0 && getURLParameter("p",req)!=null )  ) { 
		// so it is within app link
			if (req.substring(0, 1)!="/") {
			// make sure the req is uniform and not like /?p= sometimes and just ?p other times
			// so the lastPushed thing above works
				req = "/" + req;
			}	
			
			window.event.preventDefault ? window.event.preventDefault() : window.event.returnValue = false;
			loadContent(req,true,false);
			
		//	ga('send', 'pageview', {'page': req});
		} else {
			// alert("slipped!");
		}	
						
	}	
	
	

	function hasScrolled() {
		var navbar_height = $('header').outerHeight();
						
		var st = $(this).scrollTop();

		// instead of == 0
		if (st < 30) {
		// we have scrolled all the way up
		
			$('header').removeClass('nav-up').removeClass('smaller');  
								
		} else if (st > lastScrollTop) {
		// Scroll Down
			//console.log("// scroll down");
			
			if (st > 0 && st <= navbar_height ) {
				// on first scroll down, we go small	
				// console.log("// on first scroll down, we go small");
				$('header').addClass('smaller');
			} else if (st > navbar_height) {
				// then we disapper	
				// console.log("// then we disapper");
				
				$('header').addClass('smaller').addClass('nav-up');
			}
		
		} else {
			
		// Scroll Up
			// console.log("// scroll up");
			
			$('header').removeClass('nav-up');
		}
		lastScrollTop = st;
	}

	//http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513	
	function getURLParameter(name,searchstring) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(searchstring)||[,""])[1].replace(/\+/g, '%20'))||null
	}

	 /* Light YouTube Embeds by @labnol */
	    /* Web: http://labnol.org/?p=27941 */

		function labnolDOMContentLoaded() {
		    var div, n,
			v = document.getElementsByClassName("youtube-player");
		    for (n = 0; n < v.length; n++) {
			div = document.createElement("div");
			div.setAttribute("data-id", v[n].dataset.id);
			div.innerHTML = labnolThumb(v[n].dataset.id);
			div.onclick = labnolIframe;
			v[n].appendChild(div);
		    }
		}

	    function labnolThumb(id) {
		var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
		    play = '<div class="play"></div>';
		return thumb.replace("ID", id) + play;
	    }

	    function labnolIframe() {
		var iframe = document.createElement("iframe");
		var embed = "https://www.youtube.com/embed/ID?autoplay=1";
		iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "1");
		this.parentNode.replaceChild(iframe, this);
	    }
	     
