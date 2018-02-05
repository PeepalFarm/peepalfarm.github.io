function EJ_FetchItems(client_id, callback){
	/*see if browser supports localStorage, then do all the caching mecahnism
	otherwise load the ajax diretly*/
	/*
		1. See if avoid load is defined in session, then don't look for head
		2. Else look for head
		3. if head has changes, then refreshCache
	*/
	this.xhttp = null
	this.avoid_load = false
	this.last_modified_local = null
	this.localstorage_available = false
	this.sessionstorage_available = false
	this.clientId = client_id
	var self = this
	var dd = new Date();
	dd = dd.toJSON();
	this.shop_listing_url = "https://s3.amazonaws.com/json.e-junkie.com/"+this.clientId+"?"+dd
	if (typeof(Storage) !== "undefined"){
		this.localstorage_available = true
		this.sessionstorage_available = true	
	} 
	if(this.sessionstorage_available && sessionStorage){
	    this.avoid_load = sessionStorage.getItem("EJ_avoid_load");
	}
	if(localstorage_available)
		this.last_modified_local = localStorage.getItem('EJ_Last_Modified_'+this.clientId)	
	
	this.refreshCache = function(){
		console.log("Starting Fetching Products : "+ new Date().toLocaleTimeString())
		if (window.XMLHttpRequest) this.xhttp = new XMLHttpRequest();
		else this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		var self = this
		this.xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(self.xhttp.responseText)
				var headers = self.xhttp.getResponseHeader('last-modified'); 
			    var arr = headers.trim().split(/[\r\n]+/);
			    var last_modified_remote = new Date(arr[0])
			    var return_response = null;
			    return_response = JSON.parse(self.xhttp.responseText)
				if(return_response.status){
					if(self.localstorage_available){
						localStorage.setItem('EJ_Products_'+self.clientId, JSON.stringify(return_response))
				    	localStorage.setItem('EJ_Last_Modified_'+self.clientId, last_modified_remote)
				    	if(sessionStorage && self.sessionstorage_available)	sessionStorage.setItem("EJ_avoid_load", "1")
					}			
					console.log("Finished Fetching Products : "+ new Date().toLocaleTimeString())
					callback(return_response);
				}else{
					console.error("Failed to fetch products : " + new Date().toLocaleTimeString())	
					callback(false)
				} 
		    }else if(this.status >= 300){
			    console.error("Failed to fetch products : " + new Date().toLocaleTimeString())
			    callback(false)
		    }
		};
		this.xhttp.open("GET", this.shop_listing_url, true);
		this.xhttp.send();
	};

	if(this.avoid_load && this.last_modified_local){  //since avoid_load might be true, but someone delete items from local storage, thats why last_modified_local must be true also
		callback(JSON.parse(localStorage.getItem('EJ_Products_'+this.clientId)))
	}else{
		//do a check for last_modified_local first

		if(this.last_modified_local == null){ //we  don't have anything, get everything
			return this.refreshCache()
		}

		//do head check now
		this.last_modified_local = new Date(this.last_modified_local)
		//check for head first
		/*Get Last Modifited header
		If last_modified in localStorage is less than last_modified in header,
		then refresh localStorage*/
		console.log("Starting Fetching HEAD : "+ new Date().toLocaleTimeString())		
		if (window.XMLHttpRequest) this.xhttp = new XMLHttpRequest();
		else this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		var self =this
		this.xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
				console.log("Finished Fetching HEAD : "+ new Date().toLocaleTimeString())
				var headers = self.xhttp.getResponseHeader('last-modified'); 
			    var arr = headers.trim().split(/[\r\n]+/);
			    var last_modified_remote = new Date(arr[0])
			    if(last_modified_remote - last_modified_local > 100){
			    	return self.refreshCache()
			    }else{
			    	callback(JSON.parse(localStorage.getItem('EJ_Products_'+self.clientId)))
			    	if(sessionStorage && self.sessionstorage_available)	sessionStorage.setItem("EJ_avoid_load", "1")
			    }
    		    
		    }else if(this.status >= 300){
		    	console.error("Failed to fetch HEAD : " + new Date().toLocaleTimeString())
		    }
		};
		this.xhttp.open("HEAD", this.shop_listing_url, true);
		this.xhttp.send();
	}
}


function EJ_Shop(params, callback){

	params.container = params.container ? params.container : "app_container"
	params.listing_template = params.listing_template ? params.listing_template : "listing_template"
	params.text_template = params.text_template ? params.text_template : "text_template"
	params.dropdown_template = params.dropdown_template ? params.dropdown_template : "dropdown_template"
	this.clientId = params.client_id ? params.client_id : null
	this.offset = params.offset ? params.offset : 9
	if(params.lazy_loading !== undefined)
		this.lazy_loading = params.lazy_loading ? true : false
	else
		this.lazy_loading = false
	if(params.show_expired_time !== undefined)
		this.show_expired_time = params.show_expired_time ? true : false
	else
		this.show_expired_time = false
	this.lazy_loading_eff = params.lazy_loading_eff ? params.lazy_loading_eff : 300
	this.products = null
	this.client = null
	this.totalCount = 0
	this.container = document.getElementById(params.container)
	this.listing_template = document.getElementById(params.listing_template)
	this.dropdown_template = document.getElementById(params.dropdown_template)
	this.text_template = document.getElementById(params.text_template)
	this.pinned = params.pinned ? params.pinned : []
	this.pinned_down = params.pinned_down ? params.pinned_down : []
	this.hidden = params.hidden ? params.hidden : []
	this.sort = params.sort ? params.sort : "Latest"
	this.filters = params.filters ? params.filters : null
	this.custom_thumbnails = params.custom_thumbnails ? params.custom_thumbnails : []
	this.available_filters = null
	this.call_user_callback = true //make false, after calling once
	this.last_modified = null
	var self = this

	if(isNaN(this.clientId) || this.clientId == null || this.clientId == ""){
		console.error("Invalid Client ID Passed")
		return false;
	}

	if(this.container == null || this.container === undefined)
	{
		console.error("Container not found in DOM")
		return false;	
	}

	if(this.listing_template == null || this.listing_template === undefined)
	{
		console.error("Listing Template not found in DOM")
		return false;	
	}else{
		var x = this.listing_template
		this.listing_template = this.listing_template.innerHTML
		x.remove()
	}

	if(this.dropdown_template == null || this.dropdown_template === undefined)
	{
		console.error("Listing Template not found in DOM")
		return false;	
	}else{
		var x = this.dropdown_template
		this.dropdown_template = this.dropdown_template.innerHTML
		x.remove()
	}

	if(this.text_template == null || this.text_template === undefined)
	{
		console.error("Listing Template not found in DOM")
		return false;	
	}else{
		var x = this.text_template
		this.text_template = this.text_template.innerHTML
		x.remove()
	} 

	this.renderItems = function(){
		var template = ""
		var final_template = ""
		var cart_url = this.client.view_cart_url
		var counter = 0;
		this.products.forEach(function(item){
			counter++;
			template = self.listing_template
			template = template.replace(/{title}/g, item.name)
			template = template.replace(/{id}/g, item.id)
			template = template.replace(/{identifier}/g, "ej_item_"+item.id)
			template = template.replace(/{number}/g, item.number)
			template = template.replace(/{tagline}/g, item.tagline)
			if(item.image)
				template = template.replace(/{thumbnail}/g, item.image)
			else
				template = template.replace(/{thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif");
			if(self.custom_thumbnails[item.number])
				template = template.replace(/{custom_thumbnail}/g, self.custom_thumbnails[item.number])
			else
				template = template.replace(/{custom_thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif")
			template = template.replace(/{price}/g, item.price)
			template = template.replace(/{currency}/g, item.currency)
			template = template.replace(/{description}/g, item.description)
			template = template.replace(/{details}/g, item.details)
			template = template.replace(/{link_class}/g, 'ej_ejc_thkbox')
			template = template.replace(/{link_target}/g, 'ej_ejc')
			template = template.replace(/{download_link}/g, item.download_link)
			template = template.replace(/{homepage_link}/g, item.homepage_link)
			template = template.replace(/{purchased}/g, item.purchased)

			if((counter > self.offset) && self.lazy_loading)
				template = template.replace(/{style}/g, "opacity: 0; transition: all 0.5s ease")
			else
				template = template.replace(/{style}/g, "")

			var form_str = "<form action='"+cart_url+"&i="+item.number+"&ejc=2' method='POST' target='ej_ejc' accept-charset='UTF-8'>"
                                form_str +=     "<input type='hidden' name='c' value='cart'><input type='hidden' name='ejc' value='2'>"
                                form_str += "<input type='hidden' name='cl' value='"+self.clientId+"'><input type='hidden' name='i' value='"+item.number+"'>"
                                template = template.replace(/{form}/g, form_str)
                                template = template.replace(/{onclick}/g, "return EJEJC_lc(this.parentNode);")
                                template = template.replace(/{\/form}/g, "</form>")
                                //template = template.replace(/{link}/g, "#")


			if(item.needs_advance_options == "true" || item.needs_options == "true"){
				//populate dropdown or text boxes
				var str = ""
				if (item.needs_options=="true"){
				  	if (item.on0) {
				    	if(item.on0_options.split("\n").length > 1) { //dropdown
				    		str += self.dropdown_template
			    			str = str.replace(/{label}/g, item.on0)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on0' value='"+item.on0+"'>")
				      		str = str.replace(/{name}/g, "os0")  
				      		var temp_on0_items = item.on0_options.split("\n")
				      		var tmp_str = ""
				      		temp_on0_items.forEach(function(x){
				        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
				    		})
				      		str = str.replace(/{options}/g, tmp_str)  
			    		} 
			    		else { //text
			    			str += self.text_template
			    			str = str.replace(/{label}/g, item.on0)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on0' value='"+item.on0+"'>")
				      		str = str.replace(/{placeholder}/g, item.on0)
				      		str = str.replace(/{name}/g, "os0")  
				    	}
				  	}

				  	if (item.on1) {
				    	if(item.on1_options.split("\n").length > 1) { //dropdown
				    		str += self.dropdown_template
			    			str = str.replace(/{label}/g, item.on1)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on1' value='"+item.on1+"'>")
				      		str = str.replace(/{name}/g, "os1")  
				      		var temp_on1_items = item.on1_options.split("\n")
				      		var tmp_str = ""
				      		temp_on1_items.forEach(function(x){
				        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
				    		})
				      		str = str.replace(/{options}/g, tmp_str)  
			    		} 
			    		else { //text
			    			str += self.text_template
			    			str = str.replace(/{label}/g, item.on1)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on1' value='"+item.on1+"'>")
				      		str = str.replace(/{placeholder}/g, item.on1)
				      		str = str.replace(/{name}/g, "os1")  
				    	}
				  	}

				  	if (item.on2) {
				    	if(item.on2_options.split("\n").length > 1) { //dropdown
				    		str += self.dropdown_template
			    			str = str.replace(/{label}/g, item.on2)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on2' value='"+item.on2+"'>")
				      		str = str.replace(/{name}/g, "os2")  
				      		var temp_on2_items = item.on2_options.split("\n")
				      		var tmp_str = ""
				      		temp_on2_items.forEach(function(x){
				        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
				    		})
				      		str = str.replace(/{options}/g, tmp_str)  
			    		} 
			    		else { //text
			    			str += self.text_template
			    			str = str.replace(/{label}/g, item.on2)
				      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on2' value='"+item.on2+"'>")
				      		str = str.replace(/{placeholder}/g, item.on2)
				      		str = str.replace(/{name}/g, "os2")  
				    	}
				  	}
				}

				if (item.needs_advance_options=="true"){
				  	if (item.option1 && item.option1_options.length) {
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.option1)
			      		str = str.replace(/{hidden}/g, "")
			      		str = str.replace(/{name}/g, "o1")  
			      		var tmp_str = ""
			      		item.option1_options.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
				  	}

				  	if (item.option2 && item.option2_options.length) {
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.option2)
			      		str = str.replace(/{hidden}/g, "")
			      		str = str.replace(/{name}/g, "o2")  
			      		var tmp_str = ""
			      		item.option2_options.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
				  	}

				  	if (item.option3 && item.option3_options.length) {
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.option3)
			      		str = str.replace(/{hidden}/g, "")
			      		str = str.replace(/{name}/g, "o3")  
			      		var tmp_str = ""
			      		item.option3_options.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
				  	}
				}

				template = template.replace(/{options_template}/g, str)

			}else{
				template = template.replace(/{options_template}/g, "")
			}
			final_template += template
		})
		this.container.innerHTML = final_template

		if(typeof(callback) === typeof(Function) && self.call_user_callback){
			self.call_user_callback = false
			callback(self)
		}

		if(this.lazy_loading){
			window.addEventListener('scroll', function(){
				for(var x = self.offset; x < self.products.length; x++){
					if((document.getElementById('ej_item_'+self.products[x].id).offsetTop-window.pageYOffset) <= self.lazy_loading_eff){
						document.getElementById('ej_item_'+self.products[x].id).style = "opacity: 1; transition: all 0.5s ease"
					}
				}
			})
		}
	};	

	this.searchProducts = function(x){
		var searchString = x.target.value.toUpperCase()
		if(searchString == "")
			for(var y in self.products){
				document.getElementById("ej_item_"+self.products[y].id).hidden = false;
				document.getElementById("ej_item_"+self.products[y].id).style.display = "block";
				document.getElementById("ej_item_"+self.products[y].id).style = "opacity: 1;"
			}
		else
			for(var y in self.products)
				if(self.products[y].name.toUpperCase().indexOf(searchString) != -1){
					document.getElementById("ej_item_"+self.products[y].id).hidden = false;
					document.getElementById("ej_item_"+self.products[y].id).style.display = "block";
					document.getElementById("ej_item_"+self.products[y].id).style = "opacity: 1;"
				}
				else{
					document.getElementById("ej_item_"+self.products[y].id).hidden = true;
					document.getElementById("ej_item_"+self.products[y].id).style.display = "none";
				}
	}

	this.filterProducts = function(x){
		if(x.target.value == "")
			self.filters = null
		else
			self.filters = [x.target.value.toUpperCase()]
		self.refreshListings()
	}

	this.sortProducts = function(x){
		self.sort = x.target.value
		self.refreshListings()
	}

	this.refreshListings = function(){

		var tmp_arr = []
		self.products.forEach(function(y){
			if(self.hidden.indexOf(y.number) == -1)
				tmp_arr.push(y)
		})
		self.products = tmp_arr

		var tmp_filters = []
		self.available_filters = []
		self.products.forEach(function(y){
			if(y.tags){
				y.tags.forEach(function(z){
					if(tmp_filters.indexOf(z.toUpperCase()) == -1){
						tmp_filters.push(z.toUpperCase())
						self.available_filters.push(z)
					}
				})
			}
		})
		

		//filter the products first
		if(self.filters){

			var tmp = []
			self.filters.forEach(function(y){
				if(y)
				tmp.push(y.toUpperCase())
			})
			self.filters = tmp

			var tmpArr = []
			self.products.forEach(function(x){
				if(x.tags){
					var counter = 0;
					x.tags.forEach(function(y){
						if(self.filters.indexOf(y.toUpperCase()) != -1)
							counter++
					})
					if(counter == self.filters.length) tmpArr.push(x)
				}
			})
			self.products = tmpArr
		}

		//sort items first, we get Latest ones usually, sort manually if 'Popular' is selected
		if(self.sort == "Popular")
			self.products = self.products.sort(function (a, b) {
			  return b.purchased - a.purchased;
			});
		else if(self.sort == "Latest")
			self.products = self.products.sort(function (a, b) {
			  return b.id - a.id;
			});

		//put pinned items on top
		var tmpArr = []
		for(var x = 0; x < self.pinned.length; x++)
			self.products.forEach(function(y){
				if(y.number == self.pinned[x] && tmpArr.indexOf(y) == -1){
					tmpArr.push(y)
				}
			})

		self.products.forEach(function(y){
			//tmpArr.indexOf(y) == -1 && self.pinned_down.indexOf(y.number.toString()) == -1 ? tmpArr.push(y) : ""
			if(y.number)
				tmpArr.indexOf(y) == -1 && self.pinned_down.indexOf(y.number.toString()) == -1 ? tmpArr.push(y) : ""
			else
				tmpArr.push(y)
		})

		for(var x = 0; x < self.pinned_down.length; x++)
			self.products.forEach(function(y){
				if(y.number == self.pinned_down[x] && tmpArr.indexOf(y) == -1){
					tmpArr.push(y)
				}
			})

		self.products = tmpArr
		self.renderItems()
	};

	EJ_FetchItems(self.clientId, function(response){
		if(response){
			self.products = response.items
			self.client = response.client
			self.totalCount = response.count
			self.refreshListings()
		}
	})

	if(document.getElementById('ej_search_handler')){
		var el=document.getElementById("ej_search_handler");
		el.addEventListener("keyup", this.searchProducts, false);
	}
	
	if(document.getElementById('ej_sort_handler')){
		var el = document.getElementById("ej_sort_handler"); 
		el.addEventListener("change", this.sortProducts, false);
	}

	if(document.getElementById('ej_filter_handler')){
		var el = document.getElementById("ej_filter_handler"); 
		el.addEventListener("change", this.filterProducts, false);
	}

}

function EJ_Product(params, callback){

	params.container = params.container ? params.container : "app_container"
	params.listing_template = params.listing_template ? params.listing_template : "listing_template"
	params.text_template = params.text_template ? params.text_template : "text_template"
	params.dropdown_template = params.dropdown_template ? params.dropdown_template : "dropdown_template"
	params.related_product_template = params.related_product_template ? params.related_product_template : "related_product_template"
	params.tags_template = params.tags_template ? params.tags_template : "tags_template"

	this.clientId = params.client_id ? params.client_id : null
	this.itemNumber = params.item_number ? params.item_number : null
	this.product = null
	this.products = null
	this.client = null
	this.show_related = params.show_related ? params.show_related : false
	this.show_related_max = params.show_related_max ? params.show_related_max : 0
	this.totalCount = 0
	this.container = document.getElementById(params.container)
	this.listing_template = document.getElementById(params.listing_template)
	this.dropdown_template = document.getElementById(params.dropdown_template)
	this.text_template = document.getElementById(params.text_template)
	this.related_product_template = document.getElementById(params.related_product_template)
	this.tags_template = document.getElementById(params.tags_template)
	this.custom_thumbnail = params.custom_thumbnail ? params.custom_thumbnail : []
	if(params.show_tags !== undefined)
		this.show_tags = params.show_tags ? true : false
	else
		this.show_tags = false
	this.call_user_callback = true //make false, after calling once
	var self = this

	if(isNaN(this.clientId) || this.clientId == null || this.clientId == ""){
		console.error("Invalid Client ID Passed")
		return false;
	}

	if(this.itemNumber == null || this.itemNumber == ""){
		console.error("Invalid Item Number Passed")
		return false;
	}

	if(this.container == null || this.container === undefined)
	{
		console.error("Container not found in DOM")
		return false;	
	}

	if(this.listing_template == null || this.listing_template === undefined)
	{
		console.error("Listing Template not found in DOM")
		return false;	
	}else{
		var x = this.listing_template
		this.listing_template = this.listing_template.innerHTML
		x.remove()
	}

	if(this.dropdown_template == null || this.dropdown_template === undefined)
	{
		console.error("Dropdown Template not found in DOM")
		return false;	
	}else{
		var x = this.dropdown_template
		this.dropdown_template = this.dropdown_template.innerHTML
		x.remove()
	}

	if(this.text_template == null || this.text_template === undefined)
	{
		console.error("Text Template not found in DOM")
		return false;	
	}else{
		var x = this.text_template
		this.text_template = this.text_template.innerHTML
		x.remove()
	}

	if(this.related_product_template == null || this.related_product_template === undefined)
	{
		console.error("Related Product Template not found in DOM")
		return false;	
	}else{
		var x = this.related_product_template
		this.related_product_template = this.related_product_template.innerHTML
		x.remove()
	}

	if(self.show_tags && (this.tags_template == null || this.tags_template === undefined))
	{
		console.error("Tags Template not found in DOM")
		return false;	
	}else{
		var x = this.tags_template
		this.tags_template = this.tags_template.innerHTML
		x.remove()
	} 

	this.renderItem = function(){
		var template = ""
		var final_template = ""
		var cart_url = this.client.view_cart_url
		item = this.product
		template = self.listing_template
		template = template.replace(/{title}/g, item.name)
		template = template.replace(/{id}/g, item.id)
		template = template.replace(/{identifier}/g, "ej_item_"+item.id)
		template = template.replace(/{number}/g, item.number)
		template = template.replace(/{tagline}/g, item.tagline)
		if(item.image)
			template = template.replace(/{thumbnail}/g, item.image)
		else
			template = template.replace(/{thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif");
		if(self.custom_thumbnail[item.number])
			template = template.replace(/{custom_thumbnail}/g, self.custom_thumbnail[item.number])
		else
			template = template.replace(/{custom_thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif")
		template = template.replace(/{price}/g, item.price)
		template = template.replace(/{currency}/g, item.currency)
		template = template.replace(/{description}/g, item.description)
		template = template.replace(/{details}/g, item.details)
		template = template.replace(/{link_class}/g, 'ej_ejc_thkbox')
		template = template.replace(/{link_target}/g, 'ej_ejc')
		template = template.replace(/{download_link}/g, item.download_link)
		template = template.replace(/{homepage_link}/g, item.homepage_link)
		template = template.replace(/{purchased}/g, item.purchased)

		var form_str = "<form action='"+cart_url+"&i="+item.number+"&ejc=2' method='POST' target='ej_ejc' accept-charset='UTF-8'>"
		form_str +=	"<input type='hidden' name='c' value='cart'><input type='hidden' name='ejc' value='2'>"
		form_str += "<input type='hidden' name='cl' value='"+self.clientId+"'><input type='hidden' name='i' value='"+item.number+"'>"
		template = template.replace(/{form}/g, form_str)
		template = template.replace(/{onclick}/g, "return EJEJC_lc(this.parentNode);")
		template = template.replace(/{\/form}/g, "</form>")


		if(item.needs_advance_options == "true" || item.needs_options == "true"){
			//populate dropdown or text boxes
			var str = ""
			if (item.needs_options=="true"){
			  	if (item.on0) {
			    	if(item.on0_options.split("\n").length > 1) { //dropdown
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.on0)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on0' value='"+item.on0+"'>")
			      		str = str.replace(/{name}/g, "os0")  
			      		var temp_on0_items = item.on0_options.split("\n")
			      		var tmp_str = ""
			      		temp_on0_items.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
		    		} 
		    		else { //text
		    			str += self.text_template
		    			str = str.replace(/{label}/g, item.on0)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on0' value='"+item.on0+"'>")
			      		str = str.replace(/{placeholder}/g, item.on0)
			      		str = str.replace(/{name}/g, "os0")  
			    	}
			  	}

			  	if (item.on1) {
			    	if(item.on1_options.split("\n").length > 1) { //dropdown
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.on1)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on1' value='"+item.on1+"'>")
			      		str = str.replace(/{name}/g, "os1")  
			      		var temp_on1_items = item.on1_options.split("\n")
			      		var tmp_str = ""
			      		temp_on1_items.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
		    		} 
		    		else { //text
		    			str += self.text_template
		    			str = str.replace(/{label}/g, item.on1)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on1' value='"+item.on1+"'>")
			      		str = str.replace(/{placeholder}/g, item.on1)
			      		str = str.replace(/{name}/g, "os1")  
			    	}
			  	}

			  	if (item.on2) {
			    	if(item.on2_options.split("\n").length > 1) { //dropdown
			    		str += self.dropdown_template
		    			str = str.replace(/{label}/g, item.on2)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on2' value='"+item.on2+"'>")
			      		str = str.replace(/{name}/g, "os2")  
			      		var temp_on2_items = item.on2_options.split("\n")
			      		var tmp_str = ""
			      		temp_on2_items.forEach(function(x){
			        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
			    		})
			      		str = str.replace(/{options}/g, tmp_str)  
		    		} 
		    		else { //text
		    			str += self.text_template
		    			str = str.replace(/{label}/g, item.on2)
			      		str = str.replace(/{hidden}/g, "<input type='hidden' name='on2' value='"+item.on2+"'>")
			      		str = str.replace(/{placeholder}/g, item.on2)
			      		str = str.replace(/{name}/g, "os2")  
			    	}
			  	}
			}

			if (item.needs_advance_options=="true"){
			  	if (item.option1 && item.option1_options.length) {
		    		str += self.dropdown_template
	    			str = str.replace(/{label}/g, item.option1)
		      		str = str.replace(/{hidden}/g, "")
		      		str = str.replace(/{name}/g, "o1")  
		      		var tmp_str = ""
		      		item.option1_options.forEach(function(x){
		        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
		    		})
		      		str = str.replace(/{options}/g, tmp_str)  
			  	}

			  	if (item.option2 && item.option2_options.length) {
		    		str += self.dropdown_template
	    			str = str.replace(/{label}/g, item.option2)
		      		str = str.replace(/{hidden}/g, "")
		      		str = str.replace(/{name}/g, "o2")  
		      		var tmp_str = ""
		      		item.option2_options.forEach(function(x){
		        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
		    		})
		      		str = str.replace(/{options}/g, tmp_str)  
			  	}

			  	if (item.option3 && item.option3_options.length) {
		    		str += self.dropdown_template
	    			str = str.replace(/{label}/g, item.option3)
		      		str = str.replace(/{hidden}/g, "")
		      		str = str.replace(/{name}/g, "o3")  
		      		var tmp_str = ""
		      		item.option3_options.forEach(function(x){
		        		tmp_str += "<option value='"+x+"'>"+x+"</option>";    
		    		})
		      		str = str.replace(/{options}/g, tmp_str)  
			  	}
			}

			template = template.replace(/{options_template}/g, str)

		}else{
			template = template.replace(/{options_template}/g, "")
		}

		if(self.show_related && self.product.tags){
			var rel_prod = [];
			var filt = self.product.tags
			var tmp = []
			filt.forEach(function(x){ tmp.push(x.toUpperCase()) })
			filt = tmp
			self.products.forEach(function(x){
				if(x.tags){
					var counter = 0;
					x.tags.forEach(function(y){
						if(filt.indexOf(y.toUpperCase()) != -1)
							counter++
					})
					if(counter > 0 && x.number != self.itemNumber) rel_prod.push(x)
				}
			})
			var fnl_str = ""
			if(self.show_related_max == 0){
				rel_prod.forEach(function(yy){
					var str = ""
					str = self.related_product_template
					str = str.replace(/{title}/g, yy.name)
					str = str.replace(/{id}/g, yy.id)
					str = str.replace(/{identifier}/g, "ej_related_item_"+yy.id)
					str = str.replace(/{number}/g, yy.number)
					str = str.replace(/{tagline}/g, yy.tagline)
					if(yy.image)
						str = str.replace(/{thumbnail}/g, yy.image)
					else
						str = str.replace(/{thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif");
					str = str.replace(/{price}/g, yy.price)
					str = str.replace(/{currency}/g, yy.currency)
					str = str.replace(/{description}/g, yy.description)
					str = str.replace(/{details}/g, yy.details)	
					fnl_str += str
				})
			}else{
				for(var y = 0; (y < self.show_related_max && y < rel_prod.length) ; y++){
					var str = ""
					yy = rel_prod[y]
					str = self.related_product_template
					str = str.replace(/{title}/g, yy.name)
					str = str.replace(/{id}/g, yy.id)
					str = str.replace(/{identifier}/g, "ej_related_item_"+yy.id)
					str = str.replace(/{number}/g, yy.number)
					str = str.replace(/{tagline}/g, yy.tagline)
					if(yy.image)
						str = str.replace(/{thumbnail}/g, yy.image)
					else
						str = str.replace(/{thumbnail}/g, "https://www.e-junkie.com/ecom/spacer.gif");
					str = str.replace(/{price}/g, yy.price)
					str = str.replace(/{currency}/g, yy.currency)
					str = str.replace(/{description}/g, yy.description)
					str = str.replace(/{details}/g, yy.details)	
					fnl_str += str
				}
			}
			template = template.replace(/{related_products}/g, fnl_str)
		}else template = template.replace(/{related_products}/g, "")

		var fnl_str = ""
		if(self.show_tags && self.product.tags){
			self.product.tags.forEach(function(y){
				var str = self.tags_template
				str = str.replace(/{name}/g, y)
				str = str.replace(/{html_name}/g, encodeURIComponent(y))
				fnl_str += str
			})
		}	
		template = template.replace(/{tags}/g, fnl_str)
		
		final_template += template

		this.container.innerHTML = final_template

		if(typeof(callback) === typeof(Function) && self.call_user_callback){
			self.call_user_callback = false
			callback(self)
		}
	};	

	EJ_FetchItems(self.clientId, function(response){
		if(response){
			self.products = response.items
			self.client = response.client
			self.totalCount = response.count
			self.product = null
			self.products.forEach(function(y){
				if(y.number == self.itemNumber)
					self.product = y
			})
			if(self.product == null){
				alert("No Product Found")
				return false;
			}
			self.renderItem()
		}
	})
}
