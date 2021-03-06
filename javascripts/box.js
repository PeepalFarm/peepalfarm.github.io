// jQuery history: 1.1.2, 1.1.4(good cand.), 1.2.3
// ej v24
try {
    if (typeof jQuery !== "undefined") {
        if (jQuery.fn.jquery.substr(0, 1) != '$') {
            (function() {
                var i, j, k, ej_jqv, jqv;
                k = 0;
                ej_jqv = 123;
                i = ej_jqv.toString().length - 1;
                jqv = jQuery.fn.jquery.split('.');
                for (j = 0; j <= i; j++) {
                    if (jqv[j] == null || typeof jqv[j] == 'undefined') {
                        jqv[j] = 0;
                    }
                    k = k + jqv[j] * Math.pow(10, (i - j));
                }
                if (k > ej_jqv) {
                    EJEJC_PLAYNICE = true;
                }
            }());
        }
    }
} catch (e) {
    //
}
(function() {
    if (window.jQuery) var w = window.jQuery;
    var E = window.jQuery = function(a, b) {
        return new E.prototype.init(a, b)
    };
    if (window.$) var D = window.$;
    window.$ = E;
    var u = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;
    var G = /^.[^:#\[\.]*$/;
    E.fn = E.prototype = {
        init: function(d, b) {
            d = d || document;
            if (d.nodeType) {
                this[0] = d;
                this.length = 1;
                return this
            } else if (typeof d == "string") {
                var c = u.exec(d);
                if (c && (c[1] || !b)) {
                    if (c[1]) d = E.clean([c[1]], b);
                    else {
                        var a = document.getElementById(c[3]);
                        if (a)
                            if (a.id != c[3]) return E().find(d);
                            else {
                                this[0] = a;
                                this.length = 1;
                                return this
                            }
                        else d = []
                    }
                } else return new E(b).find(d)
            } else if (E.isFunction(d)) return new E(document)[E.fn.ready ? "ready" : "load"](d);
            return this.setArray(d.constructor == Array && d || (d.jquery || d.length && d != window && !d.nodeType && d[0] != undefined && d[0].nodeType) && E.makeArray(d) || [d])
        },
        jquery: "1.2.3",
        size: function() {
            return this.length
        },
        length: 0,
        get: function(a) {
            return a == undefined ? E.makeArray(this) : this[a]
        },
        pushStack: function(b) {
            var a = E(b);
            a.prevObject = this;
            return a
        },
        setArray: function(a) {
            this.length = 0;
            Array.prototype.push.apply(this, a);
            return this
        },
        each: function(a, b) {
            return E.each(this, a, b)
        },
        index: function(b) {
            var a = -1;
            this.each(function(i) {
                if (this == b) a = i
            });
            return a
        },
        attr: function(c, a, b) {
            var d = c;
            if (c.constructor == String)
                if (a == undefined) return this.length && E[b || "attr"](this[0], c) || undefined;
                else {
                    d = {};
                    d[c] = a
                }
            return this.each(function(i) {
                for (c in d) E.attr(b ? this.style : this, c, E.prop(this, d[c], b, i, c))
            })
        },
        css: function(b, a) {
            if ((b == 'width' || b == 'height') && parseFloat(a) < 0) a = undefined;
            return this.attr(b, a, "curCSS")
        },
        text: function(b) {
            if (typeof b != "object" && b != null) return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(b));
            var a = "";
            E.each(b || this, function() {
                E.each(this.childNodes, function() {
                    if (this.nodeType != 8) a += this.nodeType != 1 ? this.nodeValue : E.fn.text([this])
                })
            });
            return a
        },
        wrapAll: function(b) {
            if (this[0]) E(b, this[0].ownerDocument).clone().insertBefore(this[0]).map(function() {
                var a = this;
                while (a.firstChild) a = a.firstChild;
                return a
            }).append(this);
            return this
        },
        wrapInner: function(a) {
            return this.each(function() {
                E(this).contents().wrapAll(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                E(this).wrapAll(a)
            })
        },
        append: function() {
            return this.domManip(arguments, true, false, function(a) {
                if (this.nodeType == 1) this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, true, function(a) {
                if (this.nodeType == 1) this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, false, false, function(a) {
                this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, false, true, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        end: function() {
            return this.prevObject || E([])
        },
        find: function(b) {
            var c = E.map(this, function(a) {
                return E.find(b, a)
            });
            return this.pushStack(/[^+>] [^+>]/.test(b) || b.indexOf("..") > -1 ? E.unique(c) : c)
        },
        clone: function(e) {
            var f = this.map(function() {
                if (E.browser.msie && !E.isXMLDoc(this)) {
                    var a = this.cloneNode(true),
                        container = document.createElement("div");
                    container.appendChild(a);
                    return E.clean([container.innerHTML])[0]
                } else return this.cloneNode(true)
            });
            var d = f.find("*").andSelf().each(function() {
                if (this[F] != undefined) this[F] = null
            });
            if (e === true) this.find("*").andSelf().each(function(i) {
                if (this.nodeType == 3) return;
                var c = E.data(this, "events");
                for (var a in c)
                    for (var b in c[a]) E.event.add(d[i], a, c[a][b], c[a][b].data)
            });
            return f
        },
        filter: function(b) {
            return this.pushStack(E.isFunction(b) && E.grep(this, function(a, i) {
                return b.call(a, i)
            }) || E.multiFilter(b, this))
        },
        not: function(b) {
            if (b.constructor == String)
                if (G.test(b)) return this.pushStack(E.multiFilter(b, this, true));
                else b = E.multiFilter(b, this);
            var a = b.length && b[b.length - 1] !== undefined && !b.nodeType;
            return this.filter(function() {
                return a ? E.inArray(this, b) < 0 : this != b
            })
        },
        add: function(a) {
            return !a ? this : this.pushStack(E.merge(this.get(), a.constructor == String ? E(a).get() : a.length != undefined && (!a.nodeName || E.nodeName(a, "form")) ? a : [a]))
        },
        is: function(a) {
            return a ? E.multiFilter(a, this).length > 0 : false
        },
        hasClass: function(a) {
            return this.is("." + a)
        },
        val: function(b) {
            if (b == undefined) {
                if (this.length) {
                    var c = this[0];
                    if (E.nodeName(c, "select")) {
                        var e = c.selectedIndex,
                            values = [],
                            options = c.options,
                            one = c.type == "select-one";
                        if (e < 0) return null;
                        for (var i = one ? e : 0, max = one ? e + 1 : options.length; i < max; i++) {
                            var d = options[i];
                            if (d.selected) {
                                b = E.browser.msie && !d.attributes.value.specified ? d.text : d.value;
                                if (one) return b;
                                values.push(b)
                            }
                        }
                        return values
                    } else return (this[0].value || "").replace(/\r/g, "")
                }
                return undefined
            }
            return this.each(function() {
                if (this.nodeType != 1) return;
                if (b.constructor == Array && /radio|checkbox/.test(this.type)) this.checked = (E.inArray(this.value, b) >= 0 || E.inArray(this.name, b) >= 0);
                else if (E.nodeName(this, "select")) {
                    var a = b.constructor == Array ? b : [b];
                    E("option", this).each(function() {
                        this.selected = (E.inArray(this.value, a) >= 0 || E.inArray(this.text, a) >= 0)
                    });
                    if (!a.length) this.selectedIndex = -1
                } else this.value = b
            })
        },
        html: function(a) {
            return a == undefined ? (this.length ? this[0].innerHTML : null) : this.empty().append(a)
        },
        replaceWith: function(a) {
            return this.after(a).remove()
        },
        eq: function(i) {
            return this.slice(i, i + 1)
        },
        slice: function() {
            return this.pushStack(Array.prototype.slice.apply(this, arguments))
        },
        map: function(b) {
            return this.pushStack(E.map(this, function(a, i) {
                return b.call(a, i, a)
            }))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        },
        data: function(d, b) {
            var a = d.split(".");
            a[1] = a[1] ? "." + a[1] : "";
            if (b == null) {
                var c = this.triggerHandler("getData" + a[1] + "!", [a[0]]);
                if (c == undefined && this.length) c = E.data(this[0], d);
                return c == null && a[1] ? this.data(a[0]) : c
            } else return this.trigger("setData" + a[1] + "!", [a[0], b]).each(function() {
                E.data(this, d, b)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                E.removeData(this, a)
            })
        },
        domManip: function(g, f, h, d) {
            var e = this.length > 1,
                elems;
            return this.each(function() {
                if (!elems) {
                    elems = E.clean(g, this.ownerDocument);
                    if (h) elems.reverse()
                }
                var b = this;
                if (f && E.nodeName(this, "table") && E.nodeName(elems[0], "tr")) b = this.getElementsByTagName("tbody")[0] || this.appendChild(this.ownerDocument.createElement("tbody"));
                var c = E([]);
                E.each(elems, function() {
                    var a = e ? E(this).clone(true)[0] : this;
                    if (E.nodeName(a, "script")) {
                        c = c.add(a)
                    } else {
                        if (a.nodeType == 1) c = c.add(E("script", a).remove());
                        d.call(b, a)
                    }
                });
                c.each(evalScript)
            })
        }
    };
    E.prototype.init.prototype = E.prototype;

    function evalScript(i, a) {
        if (a.src) E.ajax({
            url: a.src,
            async: false,
            dataType: "script"
        });
        else E.globalEval(a.text || a.textContent || a.innerHTML || "");
        if (a.parentNode) a.parentNode.removeChild(a)
    }
    E.extend = E.fn.extend = function() {
        var b = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            options;
        if (b.constructor == Boolean) {
            deep = b;
            b = arguments[1] || {};
            i = 2
        }
        if (typeof b != "object" && typeof b != "function") b = {};
        if (length == 1) {
            b = this;
            i = 0
        }
        for (; i < length; i++)
            if ((options = arguments[i]) != null)
                for (var a in options) {
                    if (b === options[a]) continue;
                    if (deep && options[a] && typeof options[a] == "object" && b[a] && !options[a].nodeType) b[a] = E.extend(b[a], options[a]);
                    else if (options[a] != undefined) b[a] = options[a]
                }
        return b
    };
    var F = "jQuery" + (new Date()).getTime(),
        uuid = 0,
        windowData = {};
    var H = /z-?index|font-?weight|opacity|zoom|line-?height/i;
    E.extend({
        noConflict: function(a) {
            window.$ = D;
            if (a) window.jQuery = w;
            return E
        },
        isFunction: function(a) {
            return !!a && typeof a != "string" && !a.nodeName && a.constructor != Array && /function/i.test(a + "")
        },
        isXMLDoc: function(a) {
            return a.documentElement && !a.body || a.tagName && a.ownerDocument && !a.ownerDocument.body
        },
        globalEval: function(a) {
            a = E.trim(a);
            if (a) {
                var b = document.getElementsByTagName("head")[0] || document.documentElement,
                    script = document.createElement("script");
                script.type = "text/javascript";
                if (E.browser.msie) script.text = a;
                else script.appendChild(document.createTextNode(a));
                b.appendChild(script);
                b.removeChild(script)
            }
        },
        nodeName: function(b, a) {
            return b.nodeName && b.nodeName.toUpperCase() == a.toUpperCase()
        },
        cache: {},
        data: function(c, d, b) {
            c = c == window ? windowData : c;
            var a = c[F];
            if (!a) a = c[F] = ++uuid;
            if (d && !E.cache[a]) E.cache[a] = {};
            if (b != undefined) E.cache[a][d] = b;
            return d ? E.cache[a][d] : a
        },
        removeData: function(c, b) {
            c = c == window ? windowData : c;
            var a = c[F];
            if (b) {
                if (E.cache[a]) {
                    delete E.cache[a][b];
                    b = "";
                    for (b in E.cache[a]) break;
                    if (!b) E.removeData(c)
                }
            } else {
                try {
                    delete c[F]
                } catch (e) {
                    if (c.removeAttribute) c.removeAttribute(F)
                }
                delete E.cache[a]
            }
        },
        each: function(c, a, b) {
            if (b) {
                if (c.length == undefined) {
                    for (var d in c)
                        if (a.apply(c[d], b) === false) break
                } else
                    for (var i = 0, length = c.length; i < length; i++)
                        if (a.apply(c[i], b) === false) break
            } else {
                if (c.length == undefined) {
                    for (var d in c)
                        if (a.call(c[d], d, c[d]) === false) break
                } else
                    for (var i = 0, length = c.length, value = c[0]; i < length && a.call(value, i, value) !== false; value = c[++i]) {}
            }
            return c
        },
        prop: function(b, a, c, i, d) {
            if (E.isFunction(a)) a = a.call(b, i);
            return a && a.constructor == Number && c == "curCSS" && !H.test(d) ? a + "px" : a
        },
        className: {
            add: function(c, b) {
                E.each((b || "").split(/\s+/), function(i, a) {
                    if (c.nodeType == 1 && !E.className.has(c.className, a)) c.className += (c.className ? " " : "") + a
                })
            },
            remove: function(c, b) {
                if (c.nodeType == 1) c.className = b != undefined ? E.grep(c.className.split(/\s+/), function(a) {
                    return !E.className.has(b, a)
                }).join(" ") : ""
            },
            has: function(b, a) {
                return E.inArray(a, (b.className || b).toString().split(/\s+/)) > -1
            }
        },
        swap: function(b, c, a) {
            var e = {};
            for (var d in c) {
                e[d] = b.style[d];
                b.style[d] = c[d]
            }
            a.call(b);
            for (var d in c) b.style[d] = e[d]
        },
        css: function(d, e, c) {
            if (e == "width" || e == "height") {
                var b, props = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    which = e == "width" ? ["Left", "Right"] : ["Top", "Bottom"];

                function getWH() {
                    b = e == "width" ? d.offsetWidth : d.offsetHeight;
                    var a = 0,
                        border = 0;
                    E.each(which, function() {
                        a += parseFloat(E.curCSS(d, "padding" + this, true)) || 0;
                        border += parseFloat(E.curCSS(d, "border" + this + "Width", true)) || 0
                    });
                    b -= Math.round(a + border)
                }
                if (E(d).is(":visible")) getWH();
                else E.swap(d, props, getWH);
                return Math.max(0, b)
            }
            return E.curCSS(d, e, c)
        },
        curCSS: function(e, k, j) {
            var d;

            function color(b) {
                if (!E.browser.safari) return false;
                var a = document.defaultView.getComputedStyle(b, null);
                return !a || a.getPropertyValue("color") == ""
            }
            if (k == "opacity" && E.browser.msie) {
                d = E.attr(e.style, "opacity");
                return d == "" ? "1" : d
            }
            if (E.browser.opera && k == "display") {
                var c = e.style.outline;
                e.style.outline = "0 solid black";
                e.style.outline = c
            }
            if (k.match(/float/i)) k = y;
            if (!j && e.style && e.style[k]) d = e.style[k];
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                if (k.match(/float/i)) k = "float";
                k = k.replace(/([A-Z])/g, "-$1").toLowerCase();
                var h = document.defaultView.getComputedStyle(e, null);
                if (h && !color(e)) d = h.getPropertyValue(k);
                else {
                    var f = [],
                        stack = [];
                    for (var a = e; a && color(a); a = a.parentNode) stack.unshift(a);
                    for (var i = 0; i < stack.length; i++)
                        if (color(stack[i])) {
                            f[i] = stack[i].style.display;
                            stack[i].style.display = "block"
                        }
                    d = k == "display" && f[stack.length - 1] != null ? "none" : (h && h.getPropertyValue(k)) || "";
                    for (var i = 0; i < f.length; i++)
                        if (f[i] != null) stack[i].style.display = f[i]
                }
                if (k == "opacity" && d == "") d = "1"
            } else if (e.currentStyle) {
                var g = k.replace(/\-(\w)/g, function(a, b) {
                    return b.toUpperCase()
                });
                d = e.currentStyle[k] || e.currentStyle[g];
                if (!/^\d+(px)?$/i.test(d) && /^\d/.test(d)) {
                    var l = e.style.left,
                        runtimeStyle = e.runtimeStyle.left;
                    e.runtimeStyle.left = e.currentStyle.left;
                    e.style.left = d || 0;
                    d = e.style.pixelLeft + "px";
                    e.style.left = l;
                    e.runtimeStyle.left = runtimeStyle
                }
            }
            return d
        },
        clean: function(l, h) {
            var k = [];
            h = h || document;
            if (typeof h.createElement == 'undefined') h = h.ownerDocument || h[0] && h[0].ownerDocument || document;
            E.each(l, function(i, d) {
                if (!d) return;
                if (d.constructor == Number) d = d.toString();
                if (typeof d == "string") {
                    d = d.replace(/(<(\w+)[^>]*?)\/>/g, function(b, a, c) {
                        return c.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? b : a + "></" + c + ">"
                    });
                    var f = E.trim(d).toLowerCase(),
                        div = h.createElement("div");
                    var e = !f.indexOf("<opt") && [1, "<select multiple='multiple'>", "</select>"] || !f.indexOf("<leg") && [1, "<fieldset>", "</fieldset>"] || f.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1, "<table>", "</table>"] || !f.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!f.indexOf("<td") || !f.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || !f.indexOf("<col") && [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] || E.browser.msie && [1, "div<div>", "</div>"] || [0, "", ""];
                    div.innerHTML = e[1] + d + e[2];
                    while (e[0]--) div = div.lastChild;
                    if (E.browser.msie) {
                        var g = !f.indexOf("<table") && f.indexOf("<tbody") < 0 ? div.firstChild && div.firstChild.childNodes : e[1] == "<table>" && f.indexOf("<tbody") < 0 ? div.childNodes : [];
                        for (var j = g.length - 1; j >= 0; --j)
                            if (E.nodeName(g[j], "tbody") && !g[j].childNodes.length) g[j].parentNode.removeChild(g[j]);
                        if (/^\s/.test(d)) div.insertBefore(h.createTextNode(d.match(/^\s*/)[0]), div.firstChild)
                    }
                    d = E.makeArray(div.childNodes)
                }
                if (d.length === 0 && (!E.nodeName(d, "form") && !E.nodeName(d, "select"))) return;
                if (d[0] == undefined || E.nodeName(d, "form") || d.options) k.push(d);
                else k = E.merge(k, d)
            });
            return k
        },
        attr: function(d, e, c) {
            if (!d || d.nodeType == 3 || d.nodeType == 8) return undefined;
            var f = E.isXMLDoc(d) ? {} : E.props;
            if (e == "selected" && E.browser.safari) d.parentNode.selectedIndex;
            if (f[e]) {
                if (c != undefined) d[f[e]] = c;
                return d[f[e]]
            } else if (E.browser.msie && e == "style") return E.attr(d.style, "cssText", c);
            else if (c == undefined && E.browser.msie && E.nodeName(d, "form") && (e == "action" || e == "method")) return d.getAttributeNode(e).nodeValue;
            else if (d.tagName) {
                if (c != undefined) {
                    if (e == "type" && E.nodeName(d, "input") && d.parentNode) throw "type property can't be changed";
                    d.setAttribute(e, "" + c)
                }
                if (E.browser.msie && /href|src/.test(e) && !E.isXMLDoc(d)) return d.getAttribute(e, 2);
                return d.getAttribute(e)
            } else {
                if (e == "opacity" && E.browser.msie) {
                    if (c != undefined) {
                        d.zoom = 1;
                        d.filter = (d.filter || "").replace(/alpha\([^)]*\)/, "") + (parseFloat(c).toString() == "NaN" ? "" : "alpha(opacity=" + c * 100 + ")")
                    }
                    return d.filter && d.filter.indexOf("opacity=") >= 0 ? (parseFloat(d.filter.match(/opacity=([^)]*)/)[1]) / 100).toString() : ""
                }
                e = e.replace(/-([a-z])/ig, function(a, b) {
                    return b.toUpperCase()
                });
                if (c != undefined) d[e] = c;
                return d[e]
            }
        },
        trim: function(a) {
            return (a || "").replace(/^\s+|\s+$/g, "")
        },
        makeArray: function(b) {
            var a = [];
            if (typeof b != "array")
                for (var i = 0, length = b.length; i < length; i++) a.push(b[i]);
            else a = b.slice(0);
            return a
        },
        inArray: function(b, a) {
            for (var i = 0, length = a.length; i < length; i++)
                if (a[i] == b) return i;
            return -1
        },
        merge: function(a, b) {
            if (E.browser.msie) {
                for (var i = 0; b[i]; i++)
                    if (b[i].nodeType != 8) a.push(b[i])
            } else
                for (var i = 0; b[i]; i++) a.push(b[i]);
            return a
        },
        unique: function(a) {
            var c = [],
                done = {};
            try {
                for (var i = 0, length = a.length; i < length; i++) {
                    var b = E.data(a[i]);
                    if (!done[b]) {
                        done[b] = true;
                        c.push(a[i])
                    }
                }
            } catch (e) {
                c = a
            }
            return c
        },
        grep: function(c, a, d) {
            var b = [];
            for (var i = 0, length = c.length; i < length; i++)
                if (!d && a(c[i], i) || d && !a(c[i], i)) b.push(c[i]);
            return b
        },
        map: function(d, a) {
            var c = [];
            for (var i = 0, length = d.length; i < length; i++) {
                var b = a(d[i], i);
                if (b !== null && b != undefined) {
                    if (b.constructor != Array) b = [b];
                    c = c.concat(b)
                }
            }
            return c
        }
    });
    var v = navigator.userAgent.toLowerCase();
    E.browser = {
        version: (v.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(v),
        opera: /opera/.test(v),
        msie: /msie/.test(v) && !/opera/.test(v),
        mozilla: /mozilla/.test(v) && !/(compatible|webkit)/.test(v)
    };
    var y = E.browser.msie ? "styleFloat" : "cssFloat";
    E.extend({
        boxModel: !E.browser.msie || document.compatMode == "CSS1Compat",
        props: {
            "for": "htmlFor",
            "class": "className",
            "float": y,
            cssFloat: y,
            styleFloat: y,
            innerHTML: "innerHTML",
            className: "className",
            value: "value",
            disabled: "disabled",
            checked: "checked",
            readonly: "readOnly",
            selected: "selected",
            maxlength: "maxLength",
            selectedIndex: "selectedIndex",
            defaultValue: "defaultValue",
            tagName: "tagName",
            nodeName: "nodeName"
        }
    });
    E.each({
        parent: function(a) {
            return a.parentNode
        },
        parents: function(a) {
            return E.dir(a, "parentNode")
        },
        next: function(a) {
            return E.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return E.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return E.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return E.dir(a, "previousSibling")
        },
        siblings: function(a) {
            return E.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return E.sibling(a.firstChild)
        },
        contents: function(a) {
            return E.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : E.makeArray(a.childNodes)
        }
    }, function(c, d) {
        E.fn[c] = function(b) {
            var a = E.map(this, d);
            if (b && typeof b == "string") a = E.multiFilter(b, a);
            return this.pushStack(E.unique(a))
        }
    });
    E.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(c, b) {
        E.fn[c] = function() {
            var a = arguments;
            return this.each(function() {
                for (var i = 0, length = a.length; i < length; i++) E(a[i])[b](this)
            })
        }
    });
    E.each({
        removeAttr: function(a) {
            E.attr(this, a, "");
            if (this.nodeType == 1) this.removeAttribute(a)
        },
        addClass: function(a) {
            E.className.add(this, a)
        },
        removeClass: function(a) {
            E.className.remove(this, a)
        },
        toggleClass: function(a) {
            E.className[E.className.has(this, a) ? "remove" : "add"](this, a)
        },
        remove: function(a) {
            if (!a || E.filter(a, [this]).r.length) {
                E("*", this).add(this).each(function() {
                    E.event.remove(this);
                    E.removeData(this)
                });
                if (this.parentNode) this.parentNode.removeChild(this)
            }
        },
        empty: function() {
            E(">*", this).remove();
            while (this.firstChild) this.removeChild(this.firstChild)
        }
    }, function(a, b) {
        E.fn[a] = function() {
            return this.each(b, arguments)
        }
    });
    E.each(["Height", "Width"], function(i, c) {
        var b = c.toLowerCase();
        E.fn[b] = function(a) {
            return this[0] == window ? E.browser.opera && document.body["client" + c] || E.browser.safari && window["inner" + c] || document.compatMode == "CSS1Compat" && document.documentElement["client" + c] || document.body["client" + c] : this[0] == document ? Math.max(Math.max(document.body["scroll" + c], document.documentElement["scroll" + c]), Math.max(document.body["offset" + c], document.documentElement["offset" + c])) : a == undefined ? (this.length ? E.css(this[0], b) : null) : this.css(b, a.constructor == String ? a : a + "px")
        }
    });
    var C = E.browser.safari && parseInt(E.browser.version) < 417 ? "(?:[\\w*_-]|\\\\.)" : "(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",
        quickChild = new RegExp("^>\\s*(" + C + "+)"),
        quickID = new RegExp("^(" + C + "+)(#)(" + C + "+)"),
        quickClass = new RegExp("^([#.]?)(" + C + "*)");
    E.extend({
        expr: {
            "": function(a, i, m) {
                return m[2] == "*" || E.nodeName(a, m[2])
            },
            "#": function(a, i, m) {
                return a.getAttribute("id") == m[2]
            },
            ":": {
                lt: function(a, i, m) {
                    return i < m[3] - 0
                },
                gt: function(a, i, m) {
                    return i > m[3] - 0
                },
                nth: function(a, i, m) {
                    return m[3] - 0 == i
                },
                eq: function(a, i, m) {
                    return m[3] - 0 == i
                },
                first: function(a, i) {
                    return i == 0
                },
                last: function(a, i, m, r) {
                    return i == r.length - 1
                },
                even: function(a, i) {
                    return i % 2 == 0
                },
                odd: function(a, i) {
                    return i % 2
                },
                "first-child": function(a) {
                    return a.parentNode.getElementsByTagName("*")[0] == a
                },
                "last-child": function(a) {
                    return E.nth(a.parentNode.lastChild, 1, "previousSibling") == a
                },
                "only-child": function(a) {
                    return !E.nth(a.parentNode.lastChild, 2, "previousSibling")
                },
                parent: function(a) {
                    return a.firstChild
                },
                empty: function(a) {
                    return !a.firstChild
                },
                contains: function(a, i, m) {
                    return (a.textContent || a.innerText || E(a).text() || "").indexOf(m[3]) >= 0
                },
                visible: function(a) {
                    return "hidden" != a.type && E.css(a, "display") != "none" && E.css(a, "visibility") != "hidden"
                },
                hidden: function(a) {
                    return "hidden" == a.type || E.css(a, "display") == "none" || E.css(a, "visibility") == "hidden"
                },
                enabled: function(a) {
                    return !a.disabled
                },
                disabled: function(a) {
                    return a.disabled
                },
                checked: function(a) {
                    return a.checked
                },
                selected: function(a) {
                    return a.selected || E.attr(a, "selected")
                },
                text: function(a) {
                    return "text" == a.type
                },
                radio: function(a) {
                    return "radio" == a.type
                },
                checkbox: function(a) {
                    return "checkbox" == a.type
                },
                file: function(a) {
                    return "file" == a.type
                },
                password: function(a) {
                    return "password" == a.type
                },
                submit: function(a) {
                    return "submit" == a.type
                },
                image: function(a) {
                    return "image" == a.type
                },
                reset: function(a) {
                    return "reset" == a.type
                },
                button: function(a) {
                    return "button" == a.type || E.nodeName(a, "button")
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                },
                has: function(a, i, m) {
                    return E.find(m[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                animated: function(a) {
                    return E.grep(E.timers, function(b) {
                        return a == b.elem
                    }).length
                }
            }
        },
        parse: [/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/, /^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/, new RegExp("^([:.#]*)(" + C + "+)")],
        multiFilter: function(a, c, b) {
            var d, cur = [];
            while (a && a != d) {
                d = a;
                var f = E.filter(a, c, b);
                a = f.t.replace(/^\s*,\s*/, "");
                cur = b ? c = f.r : E.merge(cur, f.r)
            }
            return cur
        },
        find: function(t, p) {
            if (typeof t != "string") return [t];
            if (p && p.nodeType != 1 && p.nodeType != 9) return [];
            p = p || document;
            var d = [p],
                done = [],
                last, nodeName;
            while (t && last != t) {
                var r = [];
                last = t;
                t = E.trim(t);
                var o = false;
                var g = quickChild;
                var m = g.exec(t);
                if (m) {
                    nodeName = m[1].toUpperCase();
                    for (var i = 0; d[i]; i++)
                        for (var c = d[i].firstChild; c; c = c.nextSibling)
                            if (c.nodeType == 1 && (nodeName == "*" || c.nodeName.toUpperCase() == nodeName)) r.push(c);
                    d = r;
                    t = t.replace(g, "");
                    if (t.indexOf(" ") == 0) continue;
                    o = true
                } else {
                    g = /^([>+~])\s*(\w*)/i;
                    if ((m = g.exec(t)) != null) {
                        r = [];
                        var l = {};
                        nodeName = m[2].toUpperCase();
                        m = m[1];
                        for (var j = 0, rl = d.length; j < rl; j++) {
                            var n = m == "~" || m == "+" ? d[j].nextSibling : d[j].firstChild;
                            for (; n; n = n.nextSibling)
                                if (n.nodeType == 1) {
                                    var h = E.data(n);
                                    if (m == "~" && l[h]) break;
                                    if (!nodeName || n.nodeName.toUpperCase() == nodeName) {
                                        if (m == "~") l[h] = true;
                                        r.push(n)
                                    }
                                    if (m == "+") break
                                }
                        }
                        d = r;
                        t = E.trim(t.replace(g, ""));
                        o = true
                    }
                }
                if (t && !o) {
                    if (!t.indexOf(",")) {
                        if (p == d[0]) d.shift();
                        done = E.merge(done, d);
                        r = d = [p];
                        t = " " + t.substr(1, t.length)
                    } else {
                        var k = quickID;
                        var m = k.exec(t);
                        if (m) {
                            m = [0, m[2], m[3], m[1]]
                        } else {
                            k = quickClass;
                            m = k.exec(t)
                        }
                        m[2] = m[2].replace(/\\/g, "");
                        var f = d[d.length - 1];
                        if (m[1] == "#" && f && f.getElementById && !E.isXMLDoc(f)) {
                            var q = f.getElementById(m[2]);
                            if ((E.browser.msie || E.browser.opera) && q && typeof q.id == "string" && q.id != m[2]) q = E('[@id="' + m[2] + '"]', f)[0];
                            d = r = q && (!m[3] || E.nodeName(q, m[3])) ? [q] : []
                        } else {
                            for (var i = 0; d[i]; i++) {
                                var a = m[1] == "#" && m[3] ? m[3] : m[1] != "" || m[0] == "" ? "*" : m[2];
                                if (a == "*" && d[i].nodeName.toLowerCase() == "object") a = "param";
                                r = E.merge(r, d[i].getElementsByTagName(a))
                            }
                            if (m[1] == ".") r = E.classFilter(r, m[2]);
                            if (m[1] == "#") {
                                var e = [];
                                for (var i = 0; r[i]; i++)
                                    if (r[i].getAttribute("id") == m[2]) {
                                        e = [r[i]];
                                        break
                                    }
                                r = e
                            }
                            d = r
                        }
                        t = t.replace(k, "")
                    }
                }
                if (t) {
                    var b = E.filter(t, r);
                    d = r = b.r;
                    t = E.trim(b.t)
                }
            }
            if (t) d = [];
            if (d && p == d[0]) d.shift();
            done = E.merge(done, d);
            return done
        },
        classFilter: function(r, m, a) {
            m = " " + m + " ";
            var c = [];
            for (var i = 0; r[i]; i++) {
                var b = (" " + r[i].className + " ").indexOf(m) >= 0;
                if (!a && b || a && !b) c.push(r[i])
            }
            return c
        },
        filter: function(t, r, h) {
            var d;
            while (t && t != d) {
                d = t;
                var p = E.parse,
                    m;
                for (var i = 0; p[i]; i++) {
                    m = p[i].exec(t);
                    if (m) {
                        t = t.substring(m[0].length);
                        m[2] = m[2].replace(/\\/g, "");
                        break
                    }
                }
                if (!m) break;
                if (m[1] == ":" && m[2] == "not") r = G.test(m[3]) ? E.filter(m[3], r, true).r : E(r).not(m[3]);
                else if (m[1] == ".") r = E.classFilter(r, m[2], h);
                else if (m[1] == "[") {
                    var g = [],
                        type = m[3];
                    for (var i = 0, rl = r.length; i < rl; i++) {
                        var a = r[i],
                            z = a[E.props[m[2]] || m[2]];
                        if (z == null || /href|src|selected/.test(m[2])) z = E.attr(a, m[2]) || '';
                        if ((type == "" && !!z || type == "=" && z == m[5] || type == "!=" && z != m[5] || type == "^=" && z && !z.indexOf(m[5]) || type == "$=" && z.substr(z.length - m[5].length) == m[5] || (type == "*=" || type == "~=") && z.indexOf(m[5]) >= 0) ^ h) g.push(a)
                    }
                    r = g
                } else if (m[1] == ":" && m[2] == "nth-child") {
                    var e = {},
                        g = [],
                        test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3] == "even" && "2n" || m[3] == "odd" && "2n+1" || !/\D/.test(m[3]) && "0n+" + m[3] || m[3]),
                        first = (test[1] + (test[2] || 1)) - 0,
                        d = test[3] - 0;
                    for (var i = 0, rl = r.length; i < rl; i++) {
                        var j = r[i],
                            parentNode = j.parentNode,
                            id = E.data(parentNode);
                        if (!e[id]) {
                            var c = 1;
                            for (var n = parentNode.firstChild; n; n = n.nextSibling)
                                if (n.nodeType == 1) n.nodeIndex = c++;
                            e[id] = true
                        }
                        var b = false;
                        if (first == 0) {
                            if (j.nodeIndex == d) b = true
                        } else if ((j.nodeIndex - d) % first == 0 && (j.nodeIndex - d) / first >= 0) b = true;
                        if (b ^ h) g.push(j)
                    }
                    r = g
                } else {
                    var f = E.expr[m[1]];
                    if (typeof f == "object") f = f[m[2]];
                    if (typeof f == "string") f = eval("false||function(a,i){return " + f + ";}");
                    r = E.grep(r, function(a, i) {
                        return f(a, i, m, r)
                    }, h)
                }
            }
            return {
                r: r,
                t: t
            }
        },
        dir: function(b, c) {
            var d = [];
            var a = b[c];
            while (a && a != document) {
                if (a.nodeType == 1) d.push(a);
                a = a[c]
            }
            return d
        },
        nth: function(a, e, c, b) {
            e = e || 1;
            var d = 0;
            for (; a; a = a[c])
                if (a.nodeType == 1 && ++d == e) break;
            return a
        },
        sibling: function(n, a) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && (!a || n != a)) r.push(n)
            }
            return r
        }
    });
    E.event = {
        add: function(f, i, g, e) {
            if (f.nodeType == 3 || f.nodeType == 8) return;
            if (E.browser.msie && f.setInterval != undefined) f = window;
            if (!g.guid) g.guid = this.guid++;
            if (e != undefined) {
                var h = g;
                g = function() {
                    return h.apply(this, arguments)
                };
                g.data = e;
                g.guid = h.guid
            }
            var j = E.data(f, "events") || E.data(f, "events", {}),
                handle = E.data(f, "handle") || E.data(f, "handle", function() {
                    var a;
                    if (typeof E == "undefined" || E.event.triggered) return a;
                    a = E.event.handle.apply(arguments.callee.elem, arguments);
                    return a
                });
            handle.elem = f;
            E.each(i.split(/\s+/), function(c, b) {
                var a = b.split(".");
                b = a[0];
                g.type = a[1];
                var d = j[b];
                if (!d) {
                    d = j[b] = {};
                    if (!E.event.special[b] || E.event.special[b].setup.call(f) === false) {
                        if (f.addEventListener) f.addEventListener(b, handle, false);
                        else if (f.attachEvent) f.attachEvent("on" + b, handle)
                    }
                }
                d[g.guid] = g;
                E.event.global[b] = true
            });
            f = null
        },
        guid: 1,
        global: {},
        remove: function(e, h, f) {
            if (e.nodeType == 3 || e.nodeType == 8) return;
            var i = E.data(e, "events"),
                ret, index;
            if (i) {
                if (h == undefined || (typeof h == "string" && h.charAt(0) == "."))
                    for (var g in i) this.remove(e, g + (h || ""));
                else {
                    if (h.type) {
                        f = h.handler;
                        h = h.type
                    }
                    E.each(h.split(/\s+/), function(b, a) {
                        var c = a.split(".");
                        a = c[0];
                        if (i[a]) {
                            if (f) delete i[a][f.guid];
                            else
                                for (f in i[a])
                                    if (!c[1] || i[a][f].type == c[1]) delete i[a][f];
                            for (ret in i[a]) break;
                            if (!ret) {
                                if (!E.event.special[a] || E.event.special[a].teardown.call(e) === false) {
                                    if (e.removeEventListener) e.removeEventListener(a, E.data(e, "handle"), false);
                                    else if (e.detachEvent) e.detachEvent("on" + a, E.data(e, "handle"))
                                }
                                ret = null;
                                delete i[a]
                            }
                        }
                    })
                }
                for (ret in i) break;
                if (!ret) {
                    var d = E.data(e, "handle");
                    if (d) d.elem = null;
                    E.removeData(e, "events");
                    E.removeData(e, "handle")
                }
            }
        },
        trigger: function(g, c, d, f, h) {
            c = E.makeArray(c || []);
            if (g.indexOf("!") >= 0) {
                g = g.slice(0, -1);
                var a = true
            }
            if (!d) {
                if (this.global[g]) E("*").add([window, document]).trigger(g, c)
            } else {
                if (d.nodeType == 3 || d.nodeType == 8) return undefined;
                var b, ret, fn = E.isFunction(d[g] || null),
                    event = !c[0] || !c[0].preventDefault;
                if (event) c.unshift(this.fix({
                    type: g,
                    target: d
                }));
                c[0].type = g;
                if (a) c[0].exclusive = true;
                if (E.isFunction(E.data(d, "handle"))) b = E.data(d, "handle").apply(d, c);
                if (!fn && d["on" + g] && d["on" + g].apply(d, c) === false) b = false;
                if (event) c.shift();
                if (h && E.isFunction(h)) {
                    ret = h.apply(d, b == null ? c : c.concat(b));
                    if (ret !== undefined) b = ret
                }
                if (fn && f !== false && b !== false && !(E.nodeName(d, 'a') && g == "click")) {
                    this.triggered = true;
                    try {
                        d[g]()
                    } catch (e) {}
                }
                this.triggered = false
            }
            return b
        },
        handle: function(c) {
            var a;
            c = E.event.fix(c || window.event || {});
            var b = c.type.split(".");
            c.type = b[0];
            var f = E.data(this, "events") && E.data(this, "events")[c.type],
                args = Array.prototype.slice.call(arguments, 1);
            args.unshift(c);
            for (var j in f) {
                var d = f[j];
                args[0].handler = d;
                args[0].data = d.data;
                if (!b[1] && !c.exclusive || d.type == b[1]) {
                    var e = d.apply(this, args);
                    if (a !== false) a = e;
                    if (e === false) {
                        c.preventDefault();
                        c.stopPropagation()
                    }
                }
            }
            if (E.browser.msie) c.target = c.preventDefault = c.stopPropagation = c.handler = c.data = null;
            return a
        },
        fix: function(c) {
            var a = c;
            c = E.extend({}, a);
            c.preventDefault = function() {
                if (a.preventDefault) a.preventDefault();
                a.returnValue = false
            };
            c.stopPropagation = function() {
                if (a.stopPropagation) a.stopPropagation();
                a.cancelBubble = true
            };
            if (!c.target) c.target = c.srcElement || document;
            if (c.target.nodeType == 3) c.target = a.target.parentNode;
            if (!c.relatedTarget && c.fromElement) c.relatedTarget = c.fromElement == c.target ? c.toElement : c.fromElement;
            if (c.pageX == null && c.clientX != null) {
                var b = document.documentElement,
                    body = document.body;
                c.pageX = c.clientX + (b && b.scrollLeft || body && body.scrollLeft || 0) - (b.clientLeft || 0);
                c.pageY = c.clientY + (b && b.scrollTop || body && body.scrollTop || 0) - (b.clientTop || 0)
            }
            if (!c.which && ((c.charCode || c.charCode === 0) ? c.charCode : c.keyCode)) c.which = c.charCode || c.keyCode;
            if (!c.metaKey && c.ctrlKey) c.metaKey = c.ctrlKey;
            if (!c.which && c.button) c.which = (c.button & 1 ? 1 : (c.button & 2 ? 3 : (c.button & 4 ? 2 : 0)));
            return c
        },
        special: {
            ready: {
                setup: function() {
                    bindReady();
                    return
                },
                teardown: function() {
                    return
                }
            },
            mouseenter: {
                setup: function() {
                    if (E.browser.msie) return false;
                    E(this).bind("mouseover", E.event.special.mouseenter.handler);
                    return true
                },
                teardown: function() {
                    if (E.browser.msie) return false;
                    E(this).unbind("mouseover", E.event.special.mouseenter.handler);
                    return true
                },
                handler: function(a) {
                    if (I(a, this)) return true;
                    arguments[0].type = "mouseenter";
                    return E.event.handle.apply(this, arguments)
                }
            },
            mouseleave: {
                setup: function() {
                    if (E.browser.msie) return false;
                    E(this).bind("mouseout", E.event.special.mouseleave.handler);
                    return true
                },
                teardown: function() {
                    if (E.browser.msie) return false;
                    E(this).unbind("mouseout", E.event.special.mouseleave.handler);
                    return true
                },
                handler: function(a) {
                    if (I(a, this)) return true;
                    arguments[0].type = "mouseleave";
                    return E.event.handle.apply(this, arguments)
                }
            }
        }
    };
    E.fn.extend({
        bind: function(c, a, b) {
            return c == "unload" ? this.one(c, a, b) : this.each(function() {
                E.event.add(this, c, b || a, b && a)
            })
        },
        one: function(d, b, c) {
            return this.each(function() {
                E.event.add(this, d, function(a) {
                    E(this).unbind(a);
                    return (c || b).apply(this, arguments)
                }, c && b)
            })
        },
        unbind: function(a, b) {
            return this.each(function() {
                E.event.remove(this, a, b)
            })
        },
        trigger: function(c, a, b) {
            return this.each(function() {
                E.event.trigger(c, a, this, true, b)
            })
        },
        triggerHandler: function(c, a, b) {
            if (this[0]) return E.event.trigger(c, a, this[0], false, b);
            return undefined
        },
        toggle: function() {
            var b = arguments;
            return this.click(function(a) {
                this.lastToggle = 0 == this.lastToggle ? 1 : 0;
                a.preventDefault();
                return b[this.lastToggle].apply(this, arguments) || false
            })
        },
        hover: function(a, b) {
            return this.bind('mouseenter', a).bind('mouseleave', b)
        },
        ready: function(a) {
            bindReady();
            if (E.isReady) a.call(document, E);
            else E.readyList.push(function() {
                return a.call(this, E)
            });
            return this
        }
    });
    E.extend({
        isReady: false,
        readyList: [],
        ready: function() {
            if (!E.isReady) {
                E.isReady = true;
                if (E.readyList) {
                    E.each(E.readyList, function() {
                        this.apply(document)
                    });
                    E.readyList = null
                }
                E(document).triggerHandler("ready")
            }
        }
    });
    var x = false;

    function bindReady() {
        if (x) return;
        x = true;
        if (document.addEventListener && !E.browser.opera) document.addEventListener("DOMContentLoaded", E.ready, false);
        if (E.browser.msie && window == top)(function() {
            if (E.isReady) return;
            try {
                document.documentElement.doScroll("left")
            } catch (error) {
                setTimeout(arguments.callee, 0);
                return
            }
            E.ready()
        })();
        if (E.browser.opera) document.addEventListener("DOMContentLoaded", function() {
            if (E.isReady) return;
            for (var i = 0; i < document.styleSheets.length; i++)
                if (document.styleSheets[i].disabled) {
                    setTimeout(arguments.callee, 0);
                    return
                }
            E.ready()
        }, false);
        if (E.browser.safari) {
            var a;
            (function() {
                if (E.isReady) return;
                if (document.readyState != "loaded" && document.readyState != "complete") {
                    setTimeout(arguments.callee, 0);
                    return
                }
                if (a === undefined) a = E("style, link[rel=stylesheet]").length;
                if (document.styleSheets.length != a) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                E.ready()
            })()
        }
        E.event.add(window, "load", E.ready)
    }
    E.each(("blur,focus,load,resize,scroll,unload,click,dblclick," + "mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + "submit,keydown,keypress,keyup,error").split(","), function(i, b) {
        E.fn[b] = function(a) {
            return a ? this.bind(b, a) : this.trigger(b)
        }
    });
    var I = function(a, c) {
        var b = a.relatedTarget;
        while (b && b != c) try {
            b = b.parentNode
        } catch (error) {
            b = c
        }
        return b == c
    };
    E(window).bind("unload", function() {
        E("*").add(document).unbind()
    });
    E.fn.extend({
        load: function(g, d, c) {
            if (E.isFunction(g)) return this.bind("load", g);
            var e = g.indexOf(" ");
            if (e >= 0) {
                var i = g.slice(e, g.length);
                g = g.slice(0, e)
            }
            c = c || function() {};
            var f = "GET";
            if (d)
                if (E.isFunction(d)) {
                    c = d;
                    d = null
                } else {
                    d = E.param(d);
                    f = "POST"
                }
            var h = this;
            E.ajax({
                url: g,
                type: f,
                dataType: "html",
                data: d,
                complete: function(a, b) {
                    if (b == "success" || b == "notmodified") h.html(i ? E("<div/>").append(a.responseText.replace(/<script(.|\s)*?\/script>/g, "")).find(i) : a.responseText);
                    h.each(c, [a.responseText, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return E.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return E.nodeName(this, "form") ? E.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))
            }).map(function(i, c) {
                var b = E(this).val();
                return b == null ? null : b.constructor == Array ? E.map(b, function(a, i) {
                    return {
                        name: c.name,
                        value: a
                    }
                }) : {
                    name: c.name,
                    value: b
                }
            }).get()
        }
    });
    E.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i, o) {
        E.fn[o] = function(f) {
            return this.bind(o, f)
        }
    });
    var B = (new Date).getTime();
    E.extend({
        get: function(d, b, a, c) {
            if (E.isFunction(b)) {
                a = b;
                b = null
            }
            return E.ajax({
                type: "GET",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        getScript: function(b, a) {
            return E.get(b, null, a, "script")
        },
        getJSON: function(c, b, a) {
            return E.get(c, b, a, "json")
        },
        post: function(d, b, a, c) {
            if (E.isFunction(b)) {
                a = b;
                b = {}
            }
            return E.ajax({
                type: "POST",
                url: d,
                data: b,
                success: a,
                dataType: c
            })
        },
        ajaxSetup: function(a) {
            E.extend(E.ajaxSettings, a)
        },
        ajaxSettings: {
            global: true,
            type: "GET",
            timeout: 0,
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            data: null,
            username: null,
            password: null,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        ajax: function(s) {
            var f, jsre = /=\?(&|$)/g,
                status, data;
            s = E.extend(true, s, E.extend(true, {}, E.ajaxSettings, s));
            if (s.data && s.processData && typeof s.data != "string") s.data = E.param(s.data);
            if (s.dataType == "jsonp") {
                if (s.type.toLowerCase() == "get") {
                    if (!s.url.match(jsre)) s.url += (s.url.match(/\?/) ? "&" : "?") + (s.jsonp || "callback") + "=?"
                } else if (!s.data || !s.data.match(jsre)) s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
                s.dataType = "json"
            }
            if (s.dataType == "json" && (s.data && s.data.match(jsre) || s.url.match(jsre))) {
                f = "jsonp" + B++;
                if (s.data) s.data = (s.data + "").replace(jsre, "=" + f + "$1");
                s.url = s.url.replace(jsre, "=" + f + "$1");
                s.dataType = "script";
                window[f] = function(a) {
                    data = a;
                    success();
                    complete();
                    window[f] = undefined;
                    try {
                        delete window[f]
                    } catch (e) {}
                    if (h) h.removeChild(g)
                }
            }
            if (s.dataType == "script" && s.cache == null) s.cache = false;
            if (s.cache === false && s.type.toLowerCase() == "get") {
                var i = (new Date()).getTime();
                var j = s.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + i + "$2");
                s.url = j + ((j == s.url) ? (s.url.match(/\?/) ? "&" : "?") + "_=" + i : "")
            }
            if (s.data && s.type.toLowerCase() == "get") {
                s.url += (s.url.match(/\?/) ? "&" : "?") + s.data;
                s.data = null
            }
            if (s.global && !E.active++) E.event.trigger("ajaxStart");
            if ((!s.url.indexOf("http") || !s.url.indexOf("//")) && s.dataType == "script" && s.type.toLowerCase() == "get") {
                var h = document.getElementsByTagName("head")[0];
                var g = document.createElement("script");
                g.src = s.url;
                if (s.scriptCharset) g.charset = s.scriptCharset;
                if (!f) {
                    var l = false;
                    g.onload = g.onreadystatechange = function() {
                        if (!l && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                            l = true;
                            success();
                            complete();
                            h.removeChild(g)
                        }
                    }
                }
                h.appendChild(g);
                return undefined
            }
            var m = false;
            var k = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            k.open(s.type, s.url, s.async, s.username, s.password);
            try {
                if (s.data) k.setRequestHeader("Content-Type", s.contentType);
                if (s.ifModified) k.setRequestHeader("If-Modified-Since", E.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT");
                k.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                k.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default)
            } catch (e) {}
            if (s.beforeSend) s.beforeSend(k);
            if (s.global) E.event.trigger("ajaxSend", [k, s]);
            var c = function(a) {
                if (!m && k && (k.readyState == 4 || a == "timeout")) {
                    m = true;
                    if (d) {
                        clearInterval(d);
                        d = null
                    }
                    status = a == "timeout" && "timeout" || !E.httpSuccess(k) && "error" || s.ifModified && E.httpNotModified(k, s.url) && "notmodified" || "success";
                    if (status == "success") {
                        try {
                            data = E.httpData(k, s.dataType)
                        } catch (e) {
                            status = "parsererror"
                        }
                    }
                    if (status == "success") {
                        var b;
                        try {
                            b = k.getResponseHeader("Last-Modified")
                        } catch (e) {}
                        if (s.ifModified && b) E.lastModified[s.url] = b;
                        if (!f) success()
                    } else E.handleError(s, k, status);
                    complete();
                    if (s.async) k = null
                }
            };
            if (s.async) {
                var d = setInterval(c, 13);
                if (s.timeout > 0) setTimeout(function() {
                    if (k) {
                        k.abort();
                        if (!m) c("timeout")
                    }
                }, s.timeout)
            }
            try {
                k.send(s.data)
            } catch (e) {
                E.handleError(s, k, null, e)
            }
            if (!s.async) c();

            function success() {
                if (s.success) s.success(data, status);
                if (s.global) E.event.trigger("ajaxSuccess", [k, s])
            }

            function complete() {
                if (s.complete) s.complete(k, status);
                if (s.global) E.event.trigger("ajaxComplete", [k, s]);
                if (s.global && !--E.active) E.event.trigger("ajaxStop")
            }
            return k
        },
        handleError: function(s, a, b, e) {
            if (s.error) s.error(a, b, e);
            if (s.global) E.event.trigger("ajaxError", [a, s, e])
        },
        active: 0,
        httpSuccess: function(r) {
            try {
                return !r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || r.status == 1223 || E.browser.safari && r.status == undefined
            } catch (e) {}
            return false
        },
        httpNotModified: function(a, c) {
            try {
                var b = a.getResponseHeader("Last-Modified");
                return a.status == 304 || b == E.lastModified[c] || E.browser.safari && a.status == undefined
            } catch (e) {}
            return false
        },
        httpData: function(r, b) {
            var c = r.getResponseHeader("content-type");
            var d = b == "xml" || !b && c && c.indexOf("xml") >= 0;
            var a = d ? r.responseXML : r.responseText;
            if (d && a.documentElement.tagName == "parsererror") throw "parsererror";
            if (b == "script") E.globalEval(a);
            if (b == "json") a = eval("(" + a + ")");
            return a
        },
        param: function(a) {
            var s = [];
            if (a.constructor == Array || a.jquery) E.each(a, function() {
                s.push(encodeURIComponent(this.name) + "=" + encodeURIComponent(this.value))
            });
            else
                for (var j in a)
                    if (a[j] && a[j].constructor == Array) E.each(a[j], function() {
                        s.push(encodeURIComponent(j) + "=" + encodeURIComponent(this))
                    });
                    else s.push(encodeURIComponent(j) + "=" + encodeURIComponent(a[j]));
            return s.join("&").replace(/%20/g, "+")
        }
    });
    E.fn.extend({
        show: function(c, b) {
            return c ? this.animate({
                height: "show",
                width: "show",
                opacity: "show"
            }, c, b) : this.filter(":hidden").each(function() {
                this.style.display = this.oldblock || "";
                if (E.css(this, "display") == "none") {
                    var a = E("<" + this.tagName + " />").appendTo("body");
                    this.style.display = a.css("display");
                    if (this.style.display == "none") this.style.display = "block";
                    a.remove()
                }
            }).end()
        },
        hide: function(b, a) {
            return b ? this.animate({
                height: "hide",
                width: "hide",
                opacity: "hide"
            }, b, a) : this.filter(":visible").each(function() {
                this.oldblock = this.oldblock || E.css(this, "display");
                this.style.display = "none"
            }).end()
        },
        _toggle: E.fn.toggle,
        toggle: function(a, b) {
            return E.isFunction(a) && E.isFunction(b) ? this._toggle(a, b) : a ? this.animate({
                height: "toggle",
                width: "toggle",
                opacity: "toggle"
            }, a, b) : this.each(function() {
                E(this)[E(this).is(":hidden") ? "show" : "hide"]()
            })
        },
        slideDown: function(b, a) {
            return this.animate({
                height: "show"
            }, b, a)
        },
        slideUp: function(b, a) {
            return this.animate({
                height: "hide"
            }, b, a)
        },
        slideToggle: function(b, a) {
            return this.animate({
                height: "toggle"
            }, b, a)
        },
        fadeIn: function(b, a) {
            return this.animate({
                opacity: "show"
            }, b, a)
        },
        fadeOut: function(b, a) {
            return this.animate({
                opacity: "hide"
            }, b, a)
        },
        fadeTo: function(c, a, b) {
            return this.animate({
                opacity: a
            }, c, b)
        },
        animate: function(l, k, j, h) {
            var i = E.speed(k, j, h);
            return this[i.queue === false ? "each" : "queue"](function() {
                if (this.nodeType != 1) return false;
                var g = E.extend({}, i);
                var f = E(this).is(":hidden"),
                    self = this;
                for (var p in l) {
                    if (l[p] == "hide" && f || l[p] == "show" && !f) return E.isFunction(g.complete) && g.complete.apply(this);
                    if (p == "height" || p == "width") {
                        g.display = E.css(this, "display");
                        g.overflow = this.style.overflow
                    }
                }
                if (g.overflow != null) this.style.overflow = "hidden";
                g.curAnim = E.extend({}, l);
                E.each(l, function(c, a) {
                    var e = new E.fx(self, g, c);
                    if (/toggle|show|hide/.test(a)) e[a == "toggle" ? f ? "show" : "hide" : a](l);
                    else {
                        var b = a.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
                            start = e.cur(true) || 0;
                        if (b) {
                            var d = parseFloat(b[2]),
                                unit = b[3] || "px";
                            if (unit != "px") {
                                self.style[c] = (d || 1) + unit;
                                start = ((d || 1) / e.cur(true)) * start;
                                self.style[c] = start + unit
                            }
                            if (b[1]) d = ((b[1] == "-=" ? -1 : 1) * d) + start;
                            e.custom(start, d, unit)
                        } else e.custom(start, a, "")
                    }
                });
                return true
            })
        },
        queue: function(a, b) {
            if (E.isFunction(a) || (a && a.constructor == Array)) {
                b = a;
                a = "fx"
            }
            if (!a || (typeof a == "string" && !b)) return A(this[0], a);
            return this.each(function() {
                if (b.constructor == Array) A(this, a, b);
                else {
                    A(this, a).push(b);
                    if (A(this, a).length == 1) b.apply(this)
                }
            })
        },
        stop: function(b, c) {
            var a = E.timers;
            if (b) this.queue([]);
            this.each(function() {
                for (var i = a.length - 1; i >= 0; i--)
                    if (a[i].elem == this) {
                        if (c) a[i](true);
                        a.splice(i, 1)
                    }
            });
            if (!c) this.dequeue();
            return this
        }
    });
    var A = function(b, c, a) {
        if (!b) return undefined;
        c = c || "fx";
        var q = E.data(b, c + "queue");
        if (!q || a) q = E.data(b, c + "queue", a ? E.makeArray(a) : []);
        return q
    };
    E.fn.dequeue = function(a) {
        a = a || "fx";
        return this.each(function() {
            var q = A(this, a);
            q.shift();
            if (q.length) q[0].apply(this)
        })
    };
    E.extend({
        speed: function(b, a, c) {
            var d = b && b.constructor == Object ? b : {
                complete: c || !c && a || E.isFunction(b) && b,
                duration: b,
                easing: c && a || a && a.constructor != Function && a
            };
            d.duration = (d.duration && d.duration.constructor == Number ? d.duration : {
                slow: 600,
                fast: 200
            }[d.duration]) || 400;
            d.old = d.complete;
            d.complete = function() {
                if (d.queue !== false) E(this).dequeue();
                if (E.isFunction(d.old)) d.old.apply(this)
            };
            return d
        },
        easing: {
            linear: function(p, n, b, a) {
                return b + a * p
            },
            swing: function(p, n, b, a) {
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * a + b
            }
        },
        timers: [],
        timerId: null,
        fx: function(b, c, a) {
            this.options = c;
            this.elem = b;
            this.prop = a;
            if (!c.orig) c.orig = {}
        }
    });
    E.fx.prototype = {
        update: function() {
            if (this.options.step) this.options.step.apply(this.elem, [this.now, this]);
            (E.fx.step[this.prop] || E.fx.step._default)(this);
            if (this.prop == "height" || this.prop == "width") this.elem.style.display = "block"
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && this.elem.style[this.prop] == null) return this.elem[this.prop];
            var r = parseFloat(E.css(this.elem, this.prop, a));
            return r && r > -10000 ? r : parseFloat(E.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(c, b, d) {
            this.startTime = (new Date()).getTime();
            this.start = c;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            this.update();
            var e = this;

            function t(a) {
                return e.step(a)
            }
            t.elem = this.elem;
            E.timers.push(t);
            if (E.timerId == null) {
                E.timerId = setInterval(function() {
                    var a = E.timers;
                    for (var i = 0; i < a.length; i++)
                        if (!a[i]()) a.splice(i--, 1);
                    if (!a.length) {
                        clearInterval(E.timerId);
                        E.timerId = null
                    }
                }, 13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = E.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(0, this.cur());
            if (this.prop == "width" || this.prop == "height") this.elem.style[this.prop] = "1px";
            E(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = E.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var t = (new Date()).getTime();
            if (a || t > this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var b = true;
                for (var i in this.options.curAnim)
                    if (this.options.curAnim[i] !== true) b = false;
                if (b) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (E.css(this.elem, "display") == "none") this.elem.style.display = "block"
                    }
                    if (this.options.hide) this.elem.style.display = "none";
                    if (this.options.hide || this.options.show)
                        for (var p in this.options.curAnim) E.attr(this.elem.style, p, this.options.orig[p])
                }
                if (b && E.isFunction(this.options.complete)) this.options.complete.apply(this.elem);
                return false
            } else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                this.pos = E.easing[this.options.easing || (E.easing.swing ? "swing" : "linear")](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    E.fx.step = {
        scrollLeft: function(a) {
            a.elem.scrollLeft = a.now
        },
        scrollTop: function(a) {
            a.elem.scrollTop = a.now
        },
        opacity: function(a) {
            E.attr(a.elem.style, "opacity", a.now)
        },
        _default: function(a) {
            a.elem.style[a.prop] = a.now + a.unit
        }
    };
    E.fn.offset = function() {
        var b = 0,
            top = 0,
            elem = this[0],
            results;
        if (elem) with(E.browser) {
            var d = elem.parentNode,
                offsetChild = elem,
                offsetParent = elem.offsetParent,
                doc = elem.ownerDocument,
                safari2 = safari && parseInt(version) < 522 && !/adobeair/i.test(v),
                fixed = E.css(elem, "position") == "fixed";
            if (elem.getBoundingClientRect) {
                var c = elem.getBoundingClientRect();
                add(c.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), c.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop));
                add(-doc.documentElement.clientLeft, -doc.documentElement.clientTop)
            } else {
                add(elem.offsetLeft, elem.offsetTop);
                while (offsetParent) {
                    add(offsetParent.offsetLeft, offsetParent.offsetTop);
                    if (mozilla && !/^t(able|d|h)$/i.test(offsetParent.tagName) || safari && !safari2) border(offsetParent);
                    if (!fixed && E.css(offsetParent, "position") == "fixed") fixed = true;
                    offsetChild = /^body$/i.test(offsetParent.tagName) ? offsetChild : offsetParent;
                    offsetParent = offsetParent.offsetParent
                }
                while (d && d.tagName && !/^body|html$/i.test(d.tagName)) {
                    if (!/^inline|table.*$/i.test(E.css(d, "display"))) add(-d.scrollLeft, -d.scrollTop);
                    if (mozilla && E.css(d, "overflow") != "visible") border(d);
                    d = d.parentNode
                }
                if ((safari2 && (fixed || E.css(offsetChild, "position") == "absolute")) || (mozilla && E.css(offsetChild, "position") != "absolute")) add(-doc.body.offsetLeft, -doc.body.offsetTop);
                if (fixed) add(Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft), Math.max(doc.documentElement.scrollTop, doc.body.scrollTop))
            }
            results = {
                top: top,
                left: b
            }
        }

        function border(a) {
            add(E.curCSS(a, "borderLeftWidth", true), E.curCSS(a, "borderTopWidth", true))
        }

        function add(l, t) {
            b += parseInt(l) || 0;
            top += parseInt(t) || 0
        }
        return results
    }
})();
if (typeof EJEJC_IGNORECONFLICT != 'undefined') {
    // do nothing, for debugging
} else if (typeof EJEJC_PLAYNICE != 'undefined') {
    // jQuery of other instance will be available
    ejejc_jQuery = jQuery.noConflict(true);
} else {
    // some devs. are relying on jq we include
    // by not passing thru, we keep the jQuery object available
    ejejc_jQuery = jQuery.noConflict();
}


try {
	
	if (typeof EJV1_loadFlag=="undefined") {
		var EJV1_loadFlag = true; // this is as box.js is loaded in iframe and there we set it to false
	} 
} catch (e) {
	console.log(e);
}

var EJV1_Server = "https://www.e-junkie.com";
var EJV1_Location = "/ecom/restified";

try {
	if (typeof EJV1_Script=="undefined") {
		var EJV1_Script=EJV1_Server+EJV1_Location+"/checkStatus.php";
	}
} catch (e) {
	console.log(e);
}

try {
	if (typeof EJV1_cart_version=="undefined") {
		var EJV1_cart_version = null;
	}
} catch (e) {
	console.log(e);
}
var EJV1_cartUrl = null;
var EJV1_cartInitialized = false;
var EJV1_script_loaded = false;
var EJV1_th_cache = null;

jQuery( document ).ready(function() {
console.log(EJV1_cart_version);
console.log(EJV1_loadFlag);
console.log(EJV1_cart_version===0);


if (EJV1_cart_version===0 || EJV1_cart_version===1) {
console.log("we made it");
	// we have been summoned from box_fb_n or _o
	EJV1_injectBoxScript(EJV1_cart_version);
} else {

    var found_cart_btns = false;
    var cl = null;
    var cartLoaded = false;

    if(ejejc_jQuery('a.ej_ejc_ithkbx').length){
        var documentStr = ejejc_jQuery('a.ej_ejc_ithkbx')[0].attr('href');
        var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
        if(EJV1_loadFlag && aLinks){
            for(var x = 0; x < aLinks.length; x++){
                cl = aLinks[x];
                if(!isNaN(cl)) { found_cart_btns  = true; }
            }
        }
    }
    else if(ejejc_jQuery('input.ej_ejc_ithkbx').length){
        var documentStr = ejejc_jQuery('input.ej_ejc_jthkbx')[0].parentNode.action
        var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
        if(EJV1_loadFlag && aLinks){
            for(var x = 0; x < aLinks.length; x++){
                cl = aLinks[x];
                if(!isNaN(cl)) { found_cart_btns  = true; }
            }
        }   
    }
    else if(ejejc_jQuery('a.ej_ejc_jthkbx').length){
        var documentStr = ejejc_jQuery('a.ej_ejc_ithkbx')[0].attr('href');
        var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
        if(EJV1_loadFlag && aLinks){
            for(var x = 0; x < aLinks.length; x++){
                cl = aLinks[x];
                if(!isNaN(cl)) { found_cart_btns  = true; }
            }
        }
    }
    else if(ejejc_jQuery('input.ej_ejc_jthkbx').length){
        var documentStr = ejejc_jQuery('input.ej_ejc_jthkbx')[0].parentNode.action
        var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
        if(EJV1_loadFlag && aLinks){
            for(var x = 0; x < aLinks.length; x++){
                cl = aLinks[x];
                if(!isNaN(cl)) { found_cart_btns  = true; }
            }
        }   
    }

    else if(ejejc_jQuery('a.ec_ejc_thkbx,input.ec_ejc_thkbx').length){
        var ele = ejejc_jQuery('a.ec_ejc_thkbx,input.ec_ejc_thkbx')[0];
        if (ejejc_jQuery(ele).attr("href")) {
            var documentStr = ejejc_jQuery(ele).attr("href");
            var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
            if(EJV1_loadFlag && aLinks){
                for(var x = 0; x < aLinks.length; x++){
                    cl = aLinks[x];
                    if(!isNaN(cl)) { found_cart_btns  = true; break; }
                }
            }    
        } else {
            if (ele.parentNode) {
                if (ejejc_jQuery(ele.parentNode).attr("action")) {
                    var documentStr = ejejc_jQuery(ele.parentNode).attr("action");
                    var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
                    if(EJV1_loadFlag && aLinks){
                        for(var x = 0; x < aLinks.length; x++){
                            cl = aLinks[x];
                            if(!isNaN(cl)) { found_cart_btns  = true; break;}
                        }
                    }       
                }
            }
        }
    }

    if (found_cart_btns) {
        if(EJV1_loadFlag && cl) {
            if(!isNaN(cl)) {
                if (parseInt(cl) == 1) cl = 0;	// for ffc
                EJV1_injectBoxScript(cl);
                cartLoaded = true;
            }
            else
                EJV1_injectBoxScript(0);
        }
    }else{
        var documentStr = document.body.innerHTML+document.head.innerHTML;
        var aLinks = documentStr.match(/([^\?]*)cl=(\d*)/);
        if(EJV1_loadFlag && aLinks) {
            for(var x = 0; x < aLinks.length; x++){
                cl = aLinks[x];
                if(!isNaN(cl)){
                    if(parseInt(cl) == 1) cl = 0;
                    EJV1_injectBoxScript(cl);
                    cartLoaded = true;
                    break;
                }
                
            }
	    if(!cartLoaded)
            	EJV1_injectBoxScript(0);
        }
    }
}
}); 



function EJV1_injectBoxScript(cl){
    var url = EJV1_Script+"?cl="+cl;

	console.log(url);
	
    d = document;
    var t=d.createElement('script');
    t.setAttribute('src', url);
    d.getElementsByTagName('head')[0].appendChild(t);
	
}

function EJV1_configCart(config){
  
    console.log("Cart Initialized "+config);	 
    if(config == 1 || config == 0){

        EJV1_script_loaded = true;
        EJV1_cart_version = config;
        
        return true;
    }
    
    alert("Failed to load cart");
    return false;
}

