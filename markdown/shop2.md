<!--
Title: Shop 2 Beta
Scripts: 
- https://www.e-junkie.com/e-junkie-shop-script.js
- https://code.jquery.com/jquery-3.2.1.min.js
- https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js
Javascript: var ej = new EJ_Shop({client_id:328984,offset:8,lazy_loading_eff:400,pinned:['pntbtr', 'vgnt150', 'vgnsnk'],custom_thumbnails:{'pntbtr':'http://peepalfarm.org/images/pnt_btr_joey01_600.jpg','vgnt150':'http://peepalfarm.org/images/vegantella.jpg'}}); function ej_shop(x){ if(x.pinned){ x.pinned.forEach(function(y){ document.getElementById("row_"+y).onclick = function(e) { e.preventDefault(); confirm("/?p=product&i="+y); window.location.href = "/?p=product&i="+y;  } }) }; var tmp = "<option value=''>All</option>"; if(x.available_filters != null) x.available_filters.forEach(function(y){ tmp += "<option value='"+y+"'>"+y+"</option>" }); document.getElementById("ej_filter_handler").innerHTML = tmp; }
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
	.index{
		text-align: center;
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
.modal{
	font-family: 'Raleway';
}
.modal img{
    display: block;
    max-width: 100%;
    margin: 20px;
}
</style>

<div class="input_div" style="margin-top: 10vh">
	<input class="input" type="text" placeholder="Search Products" id="ej_search_handler">
	<!-- <select id="ej_sort_handler">
		<option value="Latest">Latest</option>
		<option value="Popular">Popular</option>
	</select> -->
	<select id="ej_filter_handler"></select>
</div>
<div id="app_container"></div>
<div id="listing_template" hidden>
	<div class="index">
		<div class="row" id="{identifier}" style="{style}">
		 		<div class="one-half column" id="row_{number}" data-fancybox data-src="#modal_{identifier}">
					<p><strong>{title}</strong><br/>{tagline}</p>
					<img src="{thumbnail}" alt="{title}" title="{title}">
		<!-- 			<p style="font-size: 13px;">{details}</p> -->
				</div>
				<div class="one-half column SndCol"> 
		<!-- 			<quote style="font-size: 12px;">{description}</quote> -->
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
	<div class="modal" id="modal_{identifier}" style="display: none">
		<div class="row" style="text-align: left">
	 		<div class="one-half column">
    			<p><strong>{title}</strong></p>
    			<img src="{custom_thumbnail}" alt="{title}" title="{title}">
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
				<p style="font-size: 14px;">{details}</p>
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
	<select name="{name}" style="max-width: 250px;">{options}</select>
</div>
<div id="text_template" hidden>
	<label class="label">{label}</label>
	<input class="input" type="text" placeholder="{placeholder}" name="{name}">
	{hidden}
</div>
