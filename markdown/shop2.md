<!--
Title: Contact us
Scripts: 
- https://www.e-junkie.com/ecom/box_fb_n.js
- https://www.e-junkie.com/e-junkie-shop-script.js

Javascript: var ej = new EJ_Shop(328984, 9);

-->
this is a test
===

*a
*b
*c

<div id="listing_template" hidden>
		<div class="column is-4">
			{form}
		  <div class="box">
			  <article class="media">
			    <div class="media-left">
			      <figure class="image is-64x64">
			        <img src="{thumbnail}" alt="{title}">
			      </figure>
			    </div>
			    <div class="media-content">
			      <div class="content">
			        <p>
			          <strong>{title}</strong>
			          <br/>
			          <small>{tagline}</small>
			          <br>
			          {description}
			          <br/>
			          {options_template}
			          <strong style="color: red">{price} {currency}</strong>
			        </p>
			      </div>
			      <nav class="level is-mobile">
			        <div class="level-left">
			          <a class="level-item" href="{link}" target="{link_target}" class="{link_class}" onclick="{onclick}">
			            Add To Cart</span>
			          </a>
			        </div>
			      </nav>
			    </div>
			  </article>
			</div>
			{/form}
		</div>
	</div>

	<div id="dropdown_template" hidden>
		<div class="field">
			<label class="label">{label}</label>
			{hidden}
			<div class="select">
			  <select name="{name}">
			    {options}
			  </select>
			</div>
		</div>
	</div>

	<div id="text_template" hidden>
		<div class="field">
		  <label class="label">{label}</label>
			{hidden}
		  <div class="control">
		    <input class="input" type="text" placeholder="{placeholder}" name="{name}">
		  </div>
		</div>
	</div>


