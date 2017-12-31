<!--
Title: Contact us
Scripts: 
- https://www.e-junkie.com/e-junkie-shop-script.js

Javascript: var ej = new EJ_Shop(328984, 9);

-->
<div id="app_container" class="row">
</div>	
<div id="listing_template" hidden>
  <div class="one-half column">
    {form}
    <p><strong><a>{title}</a></strong><br/>{tagline}</p>
    <img src="{thumbnail}" alt="{title}" title="{title}">
    {options_template}
    <p>₹{price}</p>
    <a href="{link}" target="{link_target}" class="{link_class}" onclick="{onclick}">Add To Cart</a>
    {/form}
  </div>
</div>
<div id="dropdown_template" hidden>
	<label class="label">{label}</label>
	{hidden}
	<select name="{name}" style="max-width: 250px">{options}</select>
</div>
<div id="text_template" hidden>
	<label class="label">{label}</label>
	{hidden}
    	<input class="input" type="text" placeholder="{placeholder}" name="{name}">
</div>

