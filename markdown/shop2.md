<!--
Title: Good Products
Scripts: 	
- https://www.e-junkie.com/e-junkie-shop-script.js
- https://code.jquery.com/jquery-3.2.1.min.js
- https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js
Javascript: var ej = new EJ_Shop({client_id:328984,offset:0,lazy_loading:true,lazy_loading_eff:0,pinned:['pntbtr', 'vgnt150', 'vgnsnk'],custom_thumbnails:{'pntbtr':'http://peepalfarm.org/images/pnt_btr_joey01_600.jpg','vgnt150':'http://peepalfarm.org/images/vegantella.jpg'}}); function ej_shop(x){ x.products.forEach(function(y){ if(y.needs_options == "true" || y.needs_advance_options == "true") { document.getElementById('button_element_'+y.id).innerText = "View Options"; document.getElementById('button_element_'+y.id).onclick = ""; } }); var z=['pntbtr']; if(true) { z.forEach(function(y){ document.getElementById('row_'+y).onclick = function(e) { e.preventDefault(); window.location.href = "/?p=product&i="+y; } }); } var tmp = "<option value=''>All</option>"; if(x.available_filters != null) x.available_filters.forEach(function(y){ tmp += "<option value='"+y+"'>"+y+"</option>" }); document.getElementById("ej_filter_handler").innerHTML = tmp; }
-->
<link href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.css" rel="stylesheet">
<style>
.input_div{
	margin-top: 10px;
	margin-bottom: 15px;
}
.input_div input{ width: 48%; margin-right: 1%; }
.input_div select{ width: 48%; margin-right: 1%; }
.row{
	margin-bottom: 20px;
}
.cart_btn{
	text-decoration: none;
	background-color: #009900;
	padding: 10px;
	border-radius: 3px;
	color: #fff;
	margin-top: 15px;
	display: block;
	width: fit-content;
	line-height: 0px;
}
.cart_btn:hover{
	color: white
}
.label{
	margin-top: 10px;
}
.input, select{
	margin-bottom: 0px;
}
.SndCol{
	padding: 20px;
}
.mobile-friendly{
	display: none;
}
.desktop-friendly{
	display: block;
}
.index{        
    width: 32%;
    max-width: 32%;
    min-width: 32%;
    display: inline-block;
    vertical-align: bottom;
}
@media(max-width: 600px){
	.index{
		min-width: 100%;
		margin: 0 auto;
		margin-bottom: -10px;
	}
	.cart_btn{ width: 100%; }
	.SndCol{
		padding: 0px;
	}
	.mobile-friendly{
		display: block;
	}
	.desktop-friendly{
		display: none;
	}
}
.modal {
	max-width: 800px;
	font-family: 'Raleway';
}
.modal img{
    display: block;
    max-width: 100%;
    margin: 20px;
}
</style>
<center><i>"Buy less, buy well, make it last!"</i></center>

<div class="input_div" style="margin-top: 5vh">
	<input class="input" type="text" placeholder="Search Products" id="ej_search_handler">
	<!-- <select id="ej_sort_handler">
		<option value="Latest">Latest</option>
		<option value="Popular">Popular</option>
	</select> -->
	<select id="ej_filter_handler"></select>
</div>
<div class="row">
  <div id="app_container">
    <img src="/images/loadinganimation.gif" style="max-width: 200px;margin: 0 auto;margin-top: 15vh;display: block;">
  </div>
</div>
<div id="listing_template" hidden>
    <div class="index" id="{identifier}" style="{style}">
        <div id="row_{number}" style="padding: 5px;" data-fancybox data-src="#modal_{identifier}">
            <p><strong>{title}</strong><br/>{tagline}</p>
	    <div class="thumbnail_holder" style="background-image: url('{thumbnail}');height: 180px;background-size: cover;width: 100%;"></div>
	    <!--<img src="{thumbnail}" alt="{title}" title="{title}">-->
            {form}
            <p>₹{price}</p>
            <button type="button" id="button_element_{id}" class="cart_btn {button_class}" onclick="{onclick}">
                Add To Cart
                </button>   
            {/form}
        </div>    
    </div>
    <div class="modal" id="modal_{identifier}" style="display: none">
        <div class="row" style="text-align: left">
            <div class="one-half column">
                <p><strong>{title}</strong></p>
                <!-- <img src="{custom_thumbnail}" alt="{title}" title="{title}">-->
                <quote style="font-size: 14px;">{description}</quote>
                <div class="desktop-friendly">
                    {form}
                    {options_template}
                    <p>₹{price}</p>
                    <button type="button" class="cart_btn {button_class}" onclick="{onclick}">
                    Add To Cart
                    </button>
                    {/form}
                </div>
            </div>
            <div class="one-half column SndCol"> 
                <p style="font-size: 14px;">
			{details}
		</p>
                <div class="mobile-friendly">
                    {form}
                    {options_template}
                    <p>₹{price}</p>
                    <button type="button" class="cart_btn {button_class}" onclick="{onclick}">
                    Add To Cart
                    </button>
                    {/form}
                </div>
            </div>    
        </div>
    </div>
</div>

<div id="dropdown_template" hidden>
	<label class="label">{label}</label>
	{hidden}
	<select name="{name}" style="max-width: 250px">{options}</select>
</div>
<div id="text_template" hidden>
	<label class="label">{label}</label>
	<input class="input" type="text" placeholder="{placeholder}" name="{name}">
	{hidden}
</div>

<a name="story"></a>

Why buy Peepal Farm products?
==

1. **Vegan:** All the products at Peepal Farm are vegan friendly! 

2. **Real Ingredients:** We use whole ingredients, that we know to be healthy. You can be sure of the freshness of our products as they are made to order; we do not produce in bulk.

3. **Homemade:** We make the products in our home kitchen. We take great care in growing, producing, procuring and processing the ingredients. We were only making for our own consumption and the idea of selling the products sprung from the compliments and feedback we got from folks volunteering with us!

4. **Support a Good Cause:** 100% profit from our products goes towards supporting our [stray animal recovery center](/?p=recovery).

5. **Give work:** As our sales increased, we hired a local young girl from the village. Her name is Mamta. She is camera shy but thoroughly enjoys the learning process of making the products. She is happy to be independent, and is now even bringing her own ideas to the table. More sales will help us give employment to more girls and older women who can no longer do hard physical labor.
