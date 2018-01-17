var EJEJC_ga = "";
if (window.EJEJC_config) EJEJC_config();
if (typeof _gat != "undefined" && typeof ejGATracker != "undefined") {
    EJEJC_ga = 'ga';
} else if (window.urchinTracker && typeof _ulink != "undefined") {
    if (_ulink == "1") {
        EJEJC_ga = 'urchin';
    }
}

jQuery(document).ready(function() {
    jQuery('a.ej_ejc_ithkbx').click(function() {
        return EJEJC_ilc(this)
    });
    jQuery('input.ej_ejc_ithkbx').click(function() {
        return EJEJC_ilc(this.parentNode)
    });
    jQuery('a.ej_ejc_jthkbx').click(function() {
        return EJEJC_jlc(this)
    });
    jQuery('input.ej_ejc_jthkbx').click(function() {
        return EJEJC_jlc(this.parentNode)
    });
    jQuery('a.ec_ejc_thkbx,input.ec_ejc_thkbx').each(function(i) {
        if (jQuery(this).attr("href")) {
            if (!jQuery(this).attr("onClick")) {
                jQuery(this).click(function() {
                    return EJEJC_lc(this)
                })
            }
        } else {
            if (!jQuery(this).attr("onClick")) {
                jQuery(this).click(function() {
                    return EJEJC_lc(this.parentNode)
                })
            }
            if (this.parentNode) {
                if (jQuery(this.parentNode).attr("action")) {
                    if (!jQuery(this.parentNode).attr("onSubmit")) {
                        jQuery(this.parentNode).submit(function() {
                            return EJEJC_lc(this)
                        })
                    }
                }
            }
        }
    });
});


function EJV1_escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

var EJEJC_CDAYS = 1;

if (window.EJEJC_config) EJEJC_config();

function EJEJC_setCookie(a, b) {
    var EJEJC_CDOMAIN = '';

    var t = new Date();
    t.setTime(t.getTime());
    var e = new Date(t.getTime() + (EJEJC_CDAYS * 24 * 60 * 60 * 1000));
    var d;
    d = document.domain;
    var c;
    c = EJEJC_CDOMAIN;
    if (c == 'true') {} else if (c) {
        if (c.indexOf(".") > 0) {
            c = c.toLowerCase();
            if (d.indexOf(c) + c.length == d.length) {
                d = c
            }
        } else {}
    } else {
        d = EJEJC_baseDomain(d)
    }
    document.cookie = a + "=" + encodeURIComponent(b) + ";expires=" + e.toGMTString() + ";path=/;domain=" + d + ";"
}

function EJEJC_baseDomain(d) {
    var e;
    var s;
    var l;
    e = d.split(/\./);
    l = e.length;
    if (l <= 2) {
        s = d
    } else {
        s = e[l - 2] + "." + e[l - 1];
        if (e[l - 1].length == 2 || s == "blogspot.com" || s == "wordpress.com") {
            s = e[l - 3] + "." + s
        }
    }
    return (s)
}

function EJEJC_gc(a) {
    var b = a + "=";
    var d = document.cookie.split(';');
    for (var i = 0; i < d.length; i++) {
        var c = d[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(b) == 0) return c.substring(b.length, c.length)
    }
    return null;
}

function EJV1_getCartResponse(cart_url, showCart){

    if(showCart === undefined) {
        showCart = true;
    }
    var ej_ejc_cart_id;
    var ej_ejc_cart_md5;
    var ej_ejc_cart_currency;
    var client_id;
    var qs = cart_url.replace("?","&"); // don't modify the url as we use it as it is below and replace ? with & will break it
	
    try { 
        cart_url = cart_url.replace(/\;/g,"&"); // some ppl use non-js version of code with js view cart. we can handle that but due to myspace non js button urls have ; instead of &amp;
    } catch (e) {
            //
    }

    qs = cart_url.split('&');

    // get client id
    for(var i=0;i < qs.length;i++) {
        var c = qs[i];
        if (c.substring(0,3)=='cl=') {
                client_id=c.substring(3);
                break;
        }
    }
    
    var ej_has_zipcode = false;
    for(var i=0;i < qs.length;i++) {
        var c = qs[i];
        if (c.substring(0,7)=='zipcode') {
            ej_has_zipcode = true;
            break;
        }
    }
    
    var ej_has_country = false;
    for(var i=0;i < qs.length;i++) {
        var c = qs[i];
        if (c.substring(0,10)=='to_country') {
            ej_has_country = true;
            break;
        }
    }
    
    EJEJC_clnt=client_id;
    ej_ejc_cart_id=EJEJC_gc('cart_id'+client_id);
    ej_ejc_cart_md5=EJEJC_gc('cart_md5'+client_id);
    ej_ejc_cart_currency=EJEJC_gc('cart_currency'+client_id); 
    ej_ejc_to_country=EJEJC_gc('to_country'+client_id); 
    ej_ejc_zipcode=EJEJC_gc('zipcode'+client_id); 
    if (ej_ejc_cart_id) {
        EJEJC_setCookie('cart_id'+client_id,ej_ejc_cart_id);
        EJEJC_setCookie('cart_md5'+client_id,ej_ejc_cart_md5); 
        EJEJC_setCookie('cart_currency'+client_id,ej_ejc_cart_currency);
        EJEJC_setCookie('to_country'+client_id,ej_ejc_to_country);
        EJEJC_setCookie('zipcode'+client_id,decodeURIComponent(ej_ejc_zipcode));//unescape
    }
    cart_url = cart_url + '&cart_md5=' + ej_ejc_cart_md5 + '&cart_id=' + ej_ejc_cart_id + '&cart_currency=' + ej_ejc_cart_currency;
    
    if(!ej_has_country)
        cart_url = cart_url + '&to_country=' + ej_ejc_to_country;
    
    if(!ej_has_zipcode)
        cart_url = cart_url + '&zipcode=' + ej_ejc_zipcode;

    if(showCart)	
        jQuery('#EJC_cart').html('<iframe scrolling="no" id="EJC_Iframe" class="EJC_Iframe" src="'+cart_url+'"></iframe>');
    else{
        d = document;
        var t=d.createElement('script');
        t.setAttribute('src', cart_url+"&js=1&call_multi=1");
        d.getElementsByTagName('head')[0].appendChild(t);
    }
	
    if(EJV1_detectIE())
        jQuery('#EJC_Iframe').width("110%");
}

function isFacebookApp() { //detect if its Facebook Browser
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function EJEJC_lc(th){

    if(document.getElementById('EJC_wrapper'))
        return false;

    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
        isMobile = true;
    
    if(isMobile){

	if(th.href) return true;
	else if(th.action){ // th.submit();
		if(isFacebookApp()){
                        var tmp_url = th.action;
                        tmp_url = tmp_url.split('?')[1];
                        tmp_url = tmp_url.split('&');
                        for(var tmpi = 0; tmpi < tmp_url.length; tmpi++){
                                $('<input>').attr({
                                    type: 'hidden',
                                    name: tmp_url[tmpi].split('=')[0],
                                    value: tmp_url[tmpi].split('=')[1]
                                }).appendTo(th);
				if(tmpi == tmp_url.length-1){ th.submit(); return true; }
                        }
                }
                else{ th.submit(); return true; }
	}else{
            var x = findForm(th);
            if (x != false){ x.submit(); return true; }
       }
       return true;
    }

    var x = th;

    if(x.href){
        if(isMobile){
            return true;
        }
        else{
            EJV1_showOverlay(true);
            EJV1_getCartResponse(x.href);
        }   
    }else if(x.action){
        var url = "";
        var selectTags = x.getElementsByTagName('select');
        for(var i = 0; i < selectTags.length; i++)
            url += "&"+selectTags[i].name+"="+encodeURIComponent(selectTags[i].value);

        var inputTags = x.getElementsByTagName('input');
        /*for(var i = 0; i < inputTags.length; i++)
            url += "&"+inputTags[i].name+"="+encodeURIComponent(inputTags[i].value);*/

	for(var i = 0; i < inputTags.length; i++){
            if (inputTags[i].value) {
                if (inputTags[i].type == 'radio' && inputTags[i].checked != true) continue;
                url += "&"+inputTags[i].name+"="+encodeURIComponent(inputTags[i].value);
            }
        }
        
        if(isMobile)
            return true;
        else{
            EJV1_showOverlay(true);
            EJV1_getCartResponse(x.action+url);
        }   
    }else if (typeof x == 'object'){
        x = findForm(x);
        if (x != false) {
            var url = "";
            var selectTags = x.getElementsByTagName('select');
            for(var i = 0; i < selectTags.length; i++)
                url += "&"+selectTags[i].name+"="+encodeURIComponent(selectTags[i].value);

            var inputTags = x.getElementsByTagName('input');
            /*for(var i = 0; i < inputTags.length; i++)
                url += "&"+inputTags[i].name+"="+encodeURIComponent(inputTags[i].value);*/

	for(var i = 0; i < inputTags.length; i++){
            if (inputTags[i].value) {
                if (inputTags[i].type == 'radio' && inputTags[i].checked != true) continue;
                url += "&"+inputTags[i].name+"="+encodeURIComponent(inputTags[i].value);
            }
        }
            
            if(isMobile)
                return true;
            else{
                EJV1_showOverlay(true);
                EJV1_getCartResponse(x.action+url);
            }   
            return false
        } 
    }else{
        alert("Oops..Failed to load cart");
    }
    return false;
}

function findForm(a) {
    if (a.action && (a.action.indexOf("gb.php") != -1 || a.action.indexOf("gb2.php") != -1)){
        return (a);
    } else {
        if (a.parentNode) {
            return findForm(a.parentNode)
        } else {
            return false
        }
    }
}

function EJV1_showOverlay(newtab){
    var overlay_html = "<style>\
            .EJC_wrapper, .EJC_overlay{\
                width: 100%;\
                height: 100vh;\
                position: fixed;\
                margin: 0 auto;\
                top: 0;\
                right: 0;\
                bottom: 0;\
                left: 0;\
                padding-bottom: 20px;\
                z-index: 10000000;\
                overflow-y: auto;\
                background-color: rgba(0,0,0,0.8);\
            }\
            .EJC_Iframe{\
                overflow: hidden;\
                border: none;\
                margin: 0;\
                width: 100%;\
                display: block;\
                height: 450px;\
                padding: 0px;\
            }\
            .EJC_overlay{\
                display: none;\
                overflow: hidden;\
                position: fixed;\
                z-index: 999999;\
                background-color: rgba(0,0,0,0.8);\
            }\
            .EJC_cart{\
                background-color: transparent;\
                position: relative;\
                margin: 0 auto;\
                left: 0; right: 0; top: 0; bottom: 0;\
                z-index: 99999999;\
                margin-top: 2.5%;\
                height: auto;\
                min-height: 400px;\
                padding: 0px !important;\
                transition: all 0.5s ease;\
                border-radius: 2px;\
                /*box-shadow: 0 12px 30px 0 rgba(0,0,0,.5),inset 0 1px 0 0 hsla(0,0%,100%,.65);*/\
            }\
            .EJC_loading_image{\
                margin: 0 auto;\
                display: block;\
                max-width: 200px;\
                margin-top: 50px;\
            }\
            .EJ_Loading{\
                position: absolute;\
                margin: 0 auto;\
                left: 0; right: 0; top: 0; bottom: 0;\
                z-index: 99999999;\
                height: 100vh;\
                padding: 0px !important;\
                transition: all 0.5s ease;\
            }\
            @media screen and (max-width: 768px){\
                .EJC_cart{width: 100% !important; background-color: #fff; margin-top: 0% !important;}\
                .EJ_Loading{ background-size: 95% !important; }\
            }\
            @media screen and (min-width: 767px) and (max-width: 1024px){\
                .EJC_cart{ width: 830px !important;  }\
            }\
            @media screen and (min-width: 1024px){\
                .EJC_cart{ width: 970px !important; }\
            }\
            .loading{\
                background-color: #ccc !important;\
                color: #fff !important;\
                background-image: linear-gradient(-180deg,#9E9E9E,#717475) !important;\
            }\
            .EJC_wrapper .brand{\
            font-weight: 700 !important;\
            text-align: center !important;\
            font-size: 11px !important;\
            margin: 20px auto !important;\
            padding:5px !important;\
            border:1px solid #ccc !important;\
            border-radius: 3px !important;\
            width: 185px !important;\
            color: #ccc !important;\
            position:fixed !important;\
            bottom:0 !important;\
            left:10px !important;\
            background:rgba(0, 0, 0, 0.1) !important;\
            }\
            .EJC_wrapper .brand-icon{\
                margin-right: 5px !important;\
                font-size: 15px !important;\
                display: inline-block !important;\
                color: #ccc !important;\
            }\
            .EJC_wrapper .brand-text{\
            margin-right: 3px !important;\
            display: inline-block !important;\
            color: #ccc !important;\
            font-family: arial, sans-serif;\
            }\
            .EJC_wrapper .brand-name{\
                font-weight: 700 !important;\
                display: inline-block !important;\
                color: #ccc !important;\
                font-family: arial, sans-serif;\
                margin-top: 2px;\
            }\
            span.brand-img img {\
              display: inline-block;\
              width: 15px;\
              height: auto;\
              margin: 7px 20px 0 5px;\
              vertical-align: middle;\
            }\
            span.brand-img {\
              position: absolute;\
              left: -2px;\
              top: -2px;\
            }\
            a.secure-icon {\
                position: fixed;\
                right: 25px;\
                bottom: 15px;\
            }\
            a.secure-icon img{\
                 width: 100px;\
                border-radius: 3px;\
            }\
        </style>";
        if(!newtab){
            overlay_html += '<div class="EJC_cart" id="EJC_cart"><img src="" class="EJC_loading_image"></div>';
            document.body.backgroundColor = "rgba(0,0,0,0.8);";
        }else{
            overlay_html += '<div class="EJC_wrapper" id="EJC_wrapper" onclick="EJV1_removeCart()">\
                                <svg width="20px" height="20px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" id="EJ_Loading" style="position: absolute; z-index: 9999999; left:0; right:0; top:0; bottom:0; height: 20%;width: 20%;margin: 0 auto;display:block;margin-top: 10%;">\
                                    <g>\
                                    <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>\
                                    <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">\
                                    <animate attributeName="stroke" values="#ff9b00;#f0ad4e" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite"/>\
                                    <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>\
                                    <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite"/>\
                                    </circle>\
                                    </g>\
                                </svg>\
                                <div class="EJC_cart" id="EJC_cart"><img src="" class="EJC_loading_image"></div>\
                                <a class="secure-icon"><img src="https://www.e-junkie.com/ecom/restified/geotrust.jpg"></a>\
                                <div class="brand">\
                                    <span class="brand-img"><img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698630-icon-114-lock-128.png"></span>\
                                    <a target="_blank" href="https://e-junkie.com/fatfreecartpro/index.php"><span class="brand-icon ion-android-lock"></span><span class="brand-text">Powered by</span><span class="brand-name">FatFreeCartPro</span></a>\
                                </div>\
                            </div>';
                    document.body.style.overflow = "hidden";
        }

    	jQuery('body').append(overlay_html);

        jQuery('#EJC_Loading_Icon').hide();
}

//Set cookies from iframe
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent,function(e) {
    var data = e.data.split('&&');
    if(data.length > 1){
        if(data[0] == "EJLoadingIcon")
            jQuery('#EJ_Loading').hide();
	if(data[0] == "EJCookies")
            EJEJC_setCookie(data[1], data[2]);
        if(data[0] == "EJHeight")
            jQuery('#EJC_Iframe').height(parseInt(data[1]));
        if(data[0] == "EJCartClose")
            EJV1_removeCart();
        if(data[0] == "EJPaymentFlow"){
            //data[1] = CheckoutUrl
            //data[2] = CheckoutCode
            //data[3] = Paypal->false, CC->true
            //data[4] = redirectPage
            EJV1_proceedPaymentOptions(data[1], data[2], data[3], data[4]);
        }
    }
},false);


function EJV1_removeCart(){
    EJV1_cartInitialized = false;
    document.body.style.overflow = "auto";
    jQuery('#EJC_wrapper').remove();
}

function EJV1_proceedPaymentOptions(checkoutUrl, checkoutCode, CC, redirectPage){
    var site;
    var auser; 
    var astring;
    var adata;
    var abeacon;
    var qs = "";
    var chk;
    auser=astring=adata='';
    var EJEJC_DOMAIN = "www.e-junkie.com";
    
    qs = '&ec_url='+encodeURIComponent(top.location.href);
    
    // BEACON will be set by merchant
    if(typeof EJEJC_BEACON != 'undefined' || window['EJEJC_BEACON'] != void 0)
        abeacon=encodeURIComponent(EJEJC_BEACON);
    else
        abeacon = "false";

    if (window.getUrchinFieldValue) {
        if (EJEJC_ga=='urchin') {
            try {
                adata=getUrchinFieldValue();
            } catch (e) { }
        } else if (EJEJC_ga=='ga' && window.setUrchinInputCode) {
            try	{
                setUrchinInputCode(ejGATracker);
                adata=getUrchinFieldValue();
            } catch (e) { }
        }
    }
    
    if (EJEJC_ga=='urchin' && window.__utmLinkPost) {
        try {
            astring=encodeURIComponent(checkoutUrl);//encodeURI does not work here :( //escape
            auser=_uacct;
        } catch (e) { }
    } else if (EJEJC_ga=='ga' && typeof ejGATracker._linkByPost!="undefined") {
        try {
//            ejGATracker._linkByPost(EJEJC_f);
            astring=encodeURIComponent(checkoutUrl+'gajs=true&');//encodeURI does not work here :( //escape
            auser=ejGATracker._getAccount();
        } catch (e) { }
    }
    
    if (EJEJC_ga=='urchin') {
        try {
            urchinTracker('/'+EJEJC_DOMAIN+'/ecom/'+checkoutCode);
        } catch (e) { }
    } else if (EJEJC_ga=='ga') {
        try {
            ejGATracker._trackPageview('/'+EJEJC_DOMAIN+'/ecom/'+checkoutCode);
        } catch (e) { }
    }

    if(redirectPage == "true"){
        if(CC == "true")
            window.location.href = checkoutUrl+"&returnUrl="+EJV1_escapeHtml(window.location.href);
        else    
            window.location.href = checkoutUrl+'&auser='+auser+'&astring='+astring+'&abeacon='+abeacon;
    }
}

jQuery(document).keyup(function(e) {
  // if (e.keyCode === 13) jQuery('.save').click();     // enter
  if (e.keyCode === 27) EJV1_removeCart();   // esc
});

function EJEJC_frm(th){
    EJEJC_lc(th);
    return false;
}

function EJV1_detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

var MultiCartArray = null;
var MultiCartPos = 0;
function EJEJC_multiAdd(urlArray){
    MultiCartArray = urlArray;
    EJEJC_multiCartCall();
}
function EJEJC_multiCartCall(){
    if(MultiCartPos == 0)
        EJV1_showOverlay(true);
    if(MultiCartPos < MultiCartArray.length-1){
        console.log("Called here");
        EJV1_getCartResponse(MultiCartArray[MultiCartPos], false);
        MultiCartPos++;
    }else if(MultiCartPos == MultiCartArray.length-1){
        console.log("Called Inside this");
        EJV1_getCartResponse(MultiCartArray[MultiCartPos], true);
        MultiCartArray = null;
        MultiCartPos = 0;
    }
}

function EJV1_initializeCart(x){ return false; }

//jQuery.noConflict( true );
