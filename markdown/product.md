<!--
Title: Product Beta
Scripts: 
- https://www.e-junkie.com/e-junkie-shop-script.js
- https://code.jquery.com/jquery-3.2.1.min.js
- https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js
Javascript: var ej = new EJ_Product({client_id:328984,item_number:window.location.search.split('i=')[1],custom_thumbnail:{'pntbtr':'http://peepalfarm.org/images/pnt_btr_joey01_600.jpg'}});
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
<div id="app_container">
	<img src="http://migyeongsophialim.com/img/loadinganimation.gif" style="max-width: 200px;margin: 0 auto;margin-top: 15vh;display: block;">
</div>
<div id="listing_template" hidden>
	<div class="index">
		<div class="row" id="{identifier}" style="{style}">
		 		<div class="one-half column" id="row_{number}" data-fancybox data-src="#modal_{identifier}">
					<p><strong>{title}</strong><br/>{tagline}</p>
					<img src="{thumbnail}" alt="{title}" title="{title}">
					<img src="{custom_thumbnail}" alt="{title}" title="{title}">
					<p style="font-size: 13px;">{details}</p>
				</div>
				<div class="one-half column SndCol"> 
					<quote style="font-size: 12px;">{description}</quote>
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
<div id="dropdown_template" hidden>
	<label class="label">{label}</label>
	{hidden}
	<select name="{name}">{options}</select>
</div>
<div id="text_template" hidden>
	<label class="label">{label}</label>
	<input class="input" type="text" placeholder="{placeholder}" name="{name}">
	{hidden}
</div>
