<!--
Title: Good Products
Scripts: 	
- https://www.e-junkie.com/ecom/e-junkie-shop-script.js

Javascript: var cat = ''; try{ cat=getURLParameter('c', window.location.search); cat=decodeURIComponent(cat); } catch(e){ console.log(e); } var ej = new EJ_Shop({client_id:328984,offset:8,lazy_loading_eff:400,filters:[cat],hidden:['1566084','1566571','1556436', '1556552', '1556556','1566570','1566568','1566569','1556435'],pinned:['pntbtr','vgnt150', 'vgnsnk','1566554','1562738','1562739','1564515','dlddt1','1556547',],pinned_down:['1566571'],hidden_filters:[] }, ej_shop); function ej_shop(x){ console.log(x); if(x.filters) if(x.filters.length > 0) cat = x.filters[0]; x.products.forEach(function(y){ if((y.needs_options == "true" || y.needs_advance_options == "true") && document.getElementById("button_element_"+y.id)){ document.getElementById("button_element_"+y.id).innerHTML = "View Options"; document.getElementById("button_element_"+y.id).setAttribute('onclick',''); $("#button_element_"+y.id).click(function(){ document.getElementById("modal_div_"+y.id).click(); });  }}); var tmp = "<option value=''>All</option>"; if(x.available_filters != null) x.available_filters.forEach(function(y){ tmp += "<option value='"+y+"' "+(cat.toLowerCase()==y.toLowerCase()?'selected':'')+">"+y+"</option>" }); document.getElementById("ej_filter_handler").innerHTML = tmp; document.getElementsByClassName('input_div')[0].hidden=false;}
-->
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
	img.mobile-friendly{
		width: auto !important;
    		max-width: 100%;
    		height: auto;
	}
	.desktop-friendly{
		display: none;
	}
	.thumbnail_holder{
		max-height: 350px;
		min-height: 350px;
	}
}
.modal {
	max-width: 800px;
	font-family: Raleway;
}
.modal img{
    display: block;
    max-width: 100%;
    margin: 20px;
}
.product_title{
    margin: 0;
    margin-bottom: -10px;
    padding-left: 5px;
}
</style>
<center><i>"Buy less, buy well, make it last!"</i></center>

<div class="input_div" style="margin-top: 5vh" hidden>
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
	<p class="product_title"><a href="/?p=product&i={number}"><strong>{title}</strong></a></p>
        <div id="row_{number}" style="padding: 5px;">
	    <div id="modal_div_{id}" data-fancybox data-src="#modal_{identifier}">
            	<p>{tagline}</p>
	    	<div class="desktop-friendly thumbnail_holder" style="background-image: url('{thumbnail}');height: 180px;background-size: cover;width: 100%; background-position: center; "></div>
	    	<img class="mobile-friendly" src="{thumbnail}" alt="{title}" title="{title}">
		<p>₹{price}</p>
	    </div>
            {form}
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

Why buy Peepal Farm food products?
==

1. **Vegan:** All the products at Peepal Farm are vegan friendly! 

2. **Real Ingredients:** We use whole ingredients, that we know to be healthy. You can be sure of the freshness of our products as they are made to order; we do not produce in bulk.

3. **Homemade:** We make the products in our home kitchen. We take great care in growing, producing, procuring and processing the ingredients. We were only making for our own consumption and the idea of selling the products sprung from the compliments and feedback we got from folks volunteering with us!

4. **Support a Good Cause:** 100% profit from our products goes towards supporting our [stray animal recovery center](/?p=recovery).

5. **Give work:** As our sales increased, we hired a local young girl from the village. Her name is Mamta. She is camera shy but thoroughly enjoys the learning process of making the products. She is happy to be independent, and is now even bringing her own ideas to the table. More sales will help us give employment to more girls and older women who can no longer do hard physical labor.

<!-- facebook messenger plugin
<div class="fb-customerchat" page_id="1504767806516890" ref="shop"></div> -->
