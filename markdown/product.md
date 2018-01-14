<!--
Title: Product details
Scripts: 
- https://www.e-junkie.com/e-junkie-shop-script.js
- https://code.jquery.com/jquery-3.2.1.min.js
- https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js
Javascript: var ej = new EJ_Product({client_id:328984,show_tags:true,show_related_max:4,item_number:window.location.search.split('i=')[1],custom_thumbnail:{'xpntbtr':'http://peepalfarm.org/images/pnt_btr_joey01_600.jpg'},show_related:true}); function ej_shop(x){ if(x.custom_thumbnail[x.itemNumber]) $('#thumbnail_element').remove(); else $('#custom_thumbnail_element').remove(); }
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
@media(max-width: 600px){
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
.modal{
	font-family: 'Raleway';
}
.modal img{
    display: block;
    max-width: 100%;
    margin: 20px;
}
#app_container img{
	max-width: 100%;
    width: auto;
}
.tag{
    background-color: #ffcc00;
    border-radius: 0px;
    color: #060606;
    padding: 5px 10px;
    margin-top: 10px;
    box-shadow: 0px 0px 2px 0px #444;
    text-decoration: none;
    font-size: 14px;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
<div id="app_container" style="margin-top: 30px;">
	<img src="http://migyeongsophialim.com/img/loadinganimation.gif" style="max-width: 200px;margin: 0 auto;margin-top: 15vh;display: block;">
</div>
<div id="listing_template" hidden>
	<div class="index">
		<div class="row" id="{identifier}" style="{style}">
		 		<div class="two-thirds column" id="row_{number}">
					{tags}
					<p><strong itemprop="name">{title}</strong><br/><span itemprop="description">{description}</span></p>
					<img itemprop="image" style="width: auto; max-width: 100%" id="thumbnail_element" src="{thumbnail}" alt="{title}" title="{title}">
					<img itemprop="image" style="width: auto; max-width: 100%" id="custom_thumbnail_element" src="{custom_thumbnail}" alt="{title}" title="{title}">
					<p>{details}</p>
				</div>
				<div class="one-third column">
					{form}
					{options_template}
					<p  itemprop="offers" itemscope itemtype="http://schema.org/Offer"><span itemprop="price">₹{price}</span></p>
					<button type="button" class="cart_btn {button_class}" onclick="{onclick}">
			            	Add To Cart
			        	</button>	
					{/form}
					<p style="color: #009900;"><strong>Related Products</strong></p>
					{related_products}
				</div>
		</div>
	</div>
</div>
<div id="related_product_template" hidden>
	<div class="row" style="text-align: left">
		<a href="/?p=product&i={number}" style="color: black;text-decoration: none;">
			<p><strong>{title}</strong><br/>{tagline}</p>
			<img style="width: auto; max-width: 100%" src="{thumbnail}" alt="{title}" title="{title}">
		</a>
	</div>
</div>
<div id="dropdown_template" hidden>
	<label class="label">{label}</label>
	{hidden}
	<select name="{name}" style="max-width:250px;">{options}</select>
</div>
<div id="text_template" hidden>
	<label class="label">{label}</label>
	<input class="input" type="text" placeholder="{placeholder}" name="{name}">
	{hidden}
</div>
<div id="tags_template" hidden>
	<a class="tag" href="/?p=shop&c={html_name}">{name}</a>
</div>

**All "Peepal Farm" products are made fresh with whole ingredients, are Vegan friendly, help generate employment in our [village](https://en.wikipedia.org/wiki/Dhanotu) and 100% profits are used to support our [stray animal recovery center](/?p=recovery). **

[&laquo; Back to shop](/?p=shop)
