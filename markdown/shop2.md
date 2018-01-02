<!--
Title: Shop 2 Beta
Scripts: 
- https://www.e-junkie.com/e-junkie-shop-script.js
Javascript: var ej = new EJ_Shop({client_id:328984,offset:8,lazy_loading_eff:400,pinned:['pntbtr', 'vgnt150', 'vgnsnk'],pinned_down:['x','y'],filters:null});function x(y){var params = {'action': 'http://webintents.org/share','type': 'text/uri-list','data':y.href};var intent=new WebKitIntent(params);window.navigator.webkitStartActivity(intent,function(data){alert("Received from invoked intent: "+data);});}
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
	/* padding: 20px; */
}
@media(max-width: 600px){
	.one-half{
		text-align: center;
	}
	.cart_btn{ width: auto; }
	.SndCol{
		padding: 0px;
	}
}
</style>

<!-- 
	* filter kicks in first
	* then, sorting
	* then, pinning

	* search (which is sort of a filter) works on whatever is being displayed
-->
<div class="input_div" style="margin-top: 10vh">
	<input class="input" type="text" placeholder="Search Products" id="ej_search_handler">
	<select id="ej_sort_handler">
		<option value="Latest">Latest</option>
		<option value="Popular">Popular</option>
	</select>
</div>
<a href="https://google.com" onclick="return x(this)">Intent Test</a>
<div id="app_container">
	<!-- this is what gets populated with products, using the template below -->
</div>
<div id="listing_template" hidden>
	<div class="row" id="{identifier}" style="{style}">
	 		<div class="one-half column">
    			<p><strong><a>{title}</a></strong><br/>{tagline}</p>
    			<img src="{thumbnail}" alt="{title}" title="{title}">
<!-- 			<p style="font-size: 13px;">{details}</p> -->
    		</div>
    		<div class="one-half column SndCol"> 
<!-- 			<quote style="font-size: 12px;">{description}</quote> -->
			{form}
			<p>₹{price}</p>
			{options_template}
    			<button type="button" class="cart_btn {link_class}" onclick="{onclick}">Add To Cart</button>
			{/form}
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
