			
			
			/* © 2013-2014 j201
			* https://github.com/j201/meta-marked */
			// Splits the given string into a meta section and a markdown section if a meta section is present, else returns null
			function splitInput(str) {
				if (str.slice(0, 3) !== '---') return;

				var matcher = /\n(\.{3}|-{3})/g;
				var metaEnd = matcher.exec(str);

				return metaEnd && [str.slice(0, metaEnd.index), str.slice(matcher.lastIndex)];
			}

			function metaMarked(data) {
				
				var mySplitInput = splitInput(data);

				return mySplitInput ?  {
						meta : cheapYAML(mySplitInput[0]),
						html : marked(mySplitInput[1])
					} : {
						meta : null,
						html : marked(data)
					};
			};
			
			

			function cheapYAML(meta) {
					var arr=new Array();
					var lines=meta.split("\n");
					console.log(lines);
					for (var i in lines) {
							line=lines[i];
							if (line.indexOf(":")>0) {
								
								var pair_left=$.trim(line.split(":",1));
								var pair_right=$.trim(line.substr(line.indexOf(':')+1));
								arr[pair_left.toLowerCase()]=pair_right;
								
							}	
					}	
					return(arr);
			}	


			function loadMarkdown(fn) {
				$.get(fn, function( data ) {
					var md = metaMarked(data);
					var content_holder=document.getElementById('content');
					content_holder.innerHTML = md.html;
				
					window.scrollTo(0, 0);
					$('nav ul').blur(); // no working
					document.title=(md.meta?(md.meta["title"]?site_title+" - "+md.meta["title"]:site_title):site_title);
					
				});
			}	
								
					
			function processClicks(obj) {
				
				var org_req=$(obj).attr("href");
				var req;
				
				if (org_req=="/") {
						req="/index.html"
				} else {
						req=org_req;
				}	
				loadMarkdown(md_path+req.substr(2).replace(/\.html/g,"")+".md");
								
				//window.history.pushState("object or string", "Title", org_req);
				
			}	
			


			function hasScrolled() {
				var navbar_height = $('header').outerHeight();
								
				var st = $(this).scrollTop();

				if (st == 0) {
				// we have scrolled all the way up
				
					$('header').removeClass('nav-up').removeClass('smaller');  
										
				} else if (st > lastScrollTop) {
				// Scroll Down
					console.log("// scroll down");
					
					if (st > 0 && st <= navbar_height ) {
						// on first scroll down, we go small	
						console.log("// on first scroll down, we go small");
						$('header').addClass('smaller');
					} else if (st > navbar_height) {
						// then we disapper	
						console.log("// then we disapper");
						
						$('header').addClass('smaller').addClass('nav-up');
					}
				
				} else {
					
				// Scroll Up
					console.log("// scroll up");
					
					$('header').removeClass('nav-up');
				}
				lastScrollTop = st;
			}
