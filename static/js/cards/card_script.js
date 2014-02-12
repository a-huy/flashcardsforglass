
var f, k = this,
    m = function (a, b) {
        var c = a.split("."),
            d = k;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d[e] ? d = d[e] : d = d[e] = {} : d[e] = b
    }, aa = function (a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }, n = function (a) {
        var b = aa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, p = function (a) {
        return "string" == typeof a
    };
Math.random();
var ba = function (a, b, c) {
    return a.call.apply(a.bind, arguments)
}, ca = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, q = function (a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ba : ca;
        return q.apply(null, arguments)
    };
Function.prototype.bind = Function.prototype.bind || function (a, b) {
    if (1 < arguments.length) {
        var c = Array.prototype.slice.call(arguments, 1);
        c.unshift(this, a);
        return q.apply(null, c)
    }
    return q(this, a)
};
Math.random();
var r = Array.prototype,
    da = r.indexOf ? function (a, b, c) {
        return r.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    }, ea = r.forEach ? function (a, b, c) {
        r.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, g = 0; g < d; g++) g in e && b.call(c, e[g], g, a)
    }, fa = r.filter ? function (a, b, c) {
        return r.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], g = 0, h = p(a) ?
                a.split("") : a, l = 0; l < d; l++)
            if (l in h) {
                var u = h[l];
                b.call(c, u, l, a) && (e[g++] = u)
            }
        return e
    }, s = function (a) {
        return r.concat.apply(r, arguments)
    };
var t = function (a) {
    if (a.classList) return a.classList;
    a = a.className;
    return p(a) && a.match(/\S+/g) || []
}, v = function (a, b) {
        var c;
        a.classList ? c = a.classList.contains(b) : (c = t(a), c = 0 <= da(c, b));
        return c
    }, ga = function (a, b) {
        a.classList ? a.classList.remove(b) : v(a, b) && (a.className = fa(t(a), function (a) {
            return a != b
        }).join(" "))
    }, w = function (a, b, c) {
        v(a, b) && (ga(a, b), a.classList ? a.classList.add(c) : v(a, c) || (a.className += 0 < a.className.length ? " " + c : c))
    };
var x = function (a, b) {
    this.a = [];
//    this.A = !1;
    this.A = !0;
    this.L = !! a;
    this.f = b
}, y = [{
        className: "text-x-small",
        n: 0
    }, {
        className: "text-small",
        n: 0
    }, {
        className: "text-normal",
        n: 0
    }, {
        className: "text-large",
        n: 0
    }, {
        className: "text-x-large",
        n: 14
    }],
    z = function (a, b) {
        var c = new x(a, b);
        if ("complete" == document.readyState) window.setTimeout(q(c.J, c), 0);
        else {
            var d = function () {
                "complete" == document.readyState && (document.removeEventListener("readystatechange", d, !1), c.J())
            };
            document.addEventListener("readystatechange", d, !1)
        }
        return c
    };
m("AutoSizer.init", z);
var ha = function () {
    var a = A.K;
    B(a);
    a.a.length ? a.A ? C(a) : a.b || D(a) : E(a)
};
x.prototype.J = function () {
    B(this);
    0 != this.a.length || this.L ? D(this) : E(this)
};
var D = function (a) {
    a.e = document.getElementsByTagName("body")[0];
    a.b = ia(a);
    a.b.style.fontFamily = "Roboto";
    a.k = ia(a);
    window.setTimeout(q(a.B, a), 10)
}, B = function (a) {
        var b = document.getElementsByClassName("text-auto-size");
        a.a = [];
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            a.a.push(d);
            d.style.visibility = "hidden"
        }
    };
x.prototype.B = function () {
    this.b.clientWidth < this.k.clientWidth ? (this.A = !0, this.e.removeChild(this.b), this.e.removeChild(this.k), C(this)) : window.setTimeout(q(this.B, this), 10)
};
var C = function (a) {
    for (var b = 0; b < a.a.length; b++) {
        for (var c = a.a[b], d = document.defaultView.getComputedStyle(c, null), e = parseInt(d.height, 10), d = parseInt(d.width, 10), g = "text-auto-size", h = 0; h < y.length; h++) {
            w(c, g, y[h].className);
            if (c.scrollHeight > e + y[h].n || c.scrollWidth > d) {
                0 < h ? w(c, y[h].className, y[h - 1].className) : c.style.wordWrap = "break-word";
                break
            }
            g = y[h].className
        }
        c.style.visibility = ""
    }
    E(a)
}, ia = function (a) {
        var b = document.createElement("DIV");
        a.e.appendChild(b);
        b.appendChild(document.createTextNode("Xx"));
        b.style.fontWeight = "100";
        b.style.fontSize = "30px";
        b.style.position = "absolute";
        b.style.top = "-100px";
        b.style.width = "auto";
        b.style.margin = "0";
        b.style.padding = "0";
        return b
    }, E = function (a) {
        a.f ? a.f() : window.GLASS.autoSizingComplete()
    };
var ja = function (a, b) {
    this.a = [];
    this.b = !1;
    this.k = Boolean(a);
    this.f = b
}, ka = function (a, b) {
        var c = new ja(a, b);
        if ("complete" == document.readyState) window.setTimeout(q(c.e, c), 0);
        else {
            var d = function () {
                "complete" == document.readyState && (document.removeEventListener("readystatechange", d, !1), c.e())
            };
            document.addEventListener("readystatechange", d, !1)
        }
        return c
    };
m("Paginator.init", ka);
ja.prototype.e = function () {
    la(this);
    if (this.k)
        if (0 < this.a.length && (this.a[0].style.visibility = "visible"), 1 < this.a.length) {
            var a = this.a.length,
                b;
            if (b = this.b) {
                t: {
                    for (b = 1; b < this.a.length; b++)
                        if (!v(this.a[b], "cover-overflow")) {
                            b = !1;
                            break t
                        }
                    b = !0
                }
                if (b) {
                    t: {
                        b = this.a[0].getElementsByClassName("auto-overflow");
                        if (0 < b.length)
                            for (var c = 0; c < b.length; c++) {
                                var d = b[c],
                                    e = window.getComputedStyle(d, null),
                                    g = parseInt(e.getPropertyValue("height"), 10),
                                    e = parseInt(e.getPropertyValue("line-height"), 10);
                                if (d.scrollHeight >= g +
                                    e) {
                                    b = !0;
                                    break t
                                }
                            }
                        b = !1
                    }
                    b = !b
                }
            }
            b && (a = 1);
            F(this, 640 * a)
        } else 1 == this.a.length && (a = this.a[0], v(a, "auto-paginate") ? (a = ma(a), 640 < a && F(this, a)) : F(this, 640));
        else na(this)
};
var la = function (a) {
    var b = document.getElementsByTagName("article");
    a.a = [];
    for (var c = 0; c < b.length; c++) a.a.push(b[c]);
    0 < a.a.length && (a.b = v(a.a[0], "cover-only"))
}, F = function (a, b) {
        a.f ? a.f(b, 360, a.b) : window.GLASS.paginationComplete(b, 360, a.b)
    }, oa = function (a) {
        var b = document.documentElement;
        a = a.getBoundingClientRect();
        return {
            top: a.top + window.pageYOffset - b.clientTop,
            left: a.left + window.pageXOffset - b.clientLeft
        }
    }, ma = function (a) {
        var b, c = document.createElement("DIV");
        c.textContent = "&nbsp;";
        a.appendChild(c);
        b =
            document.documentElement;
        for (var d = c.offsetParent || b; d && "HTML" != d.nodeName && "static" === d.style.position;) d = d.offsetParent;
        b = d || b;
        var d = {
            top: 0,
            left: 0
        }, e = oa(c);
        "HTML" != b.nodeName && (d = oa(b));
        var g = window.getComputedStyle(c, null);
        b = e.top - d.top - parseFloat(g.getPropertyValue("margin-top"));
        d = e.left - d.left - parseFloat(g.getPropertyValue("margin-left"));
        40 >= b && (d -= 640);
        a.removeChild(c);
        return d + 640
    }, na = function (a) {
        for (var b = 0, c = 0; c < a.a.length; c++) {
            var d = a.a[c];
            d.style.left = "0px";
            var e = 0,
                e = v(d, "auto-paginate") ?
                    ma(d) : 640;
            d.style.left = b + "px";
            d.style.visibility = "visible";
            b += e
        }
        F(a, b)
    };
var pa = "StopIteration" in k ? k.StopIteration : Error("StopIteration"),
    G = function () {};
G.prototype.next = function () {
    throw pa;
};
G.prototype.k = function () {
    return this
};
var qa = function (a) {
    var b = [],
        c = 0,
        d;
    for (d in a) b[c++] = a[d];
    return b
}, ra = function (a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    };
var I = function (a, b) {
    this.b = {};
    this.a = [];
    this.f = this.e = 0;
    var c = arguments.length;
    if (1 < c) {
        if (c % 2) throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2) H(this, arguments[d], arguments[d + 1])
    } else if (a) {
        a instanceof I ? (c = a.j(), d = a.g()) : (c = ra(a), d = qa(a));
        for (var e = 0; e < c.length; e++) H(this, c[e], d[e])
    }
};
I.prototype.g = function () {
    J(this);
    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);
    return a
};
I.prototype.j = function () {
    J(this);
    return this.a.concat()
};
I.prototype.remove = function (a) {
    return K(this.b, a) ? (delete this.b[a], this.e--, this.f++, this.a.length > 2 * this.e && J(this), !0) : !1
};
var J = function (a) {
    if (a.e != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length;) {
            var d = a.a[b];
            K(a.b, d) && (a.a[c++] = d);
            b++
        }
        a.a.length = c
    }
    if (a.e != a.a.length) {
        for (var e = {}, c = b = 0; b < a.a.length;) d = a.a[b], K(e, d) || (a.a[c++] = d, e[d] = 1), b++;
        a.a.length = c
    }
};
I.prototype.get = function (a, b) {
    return K(this.b, a) ? this.b[a] : b
};
var H = function (a, b, c) {
    K(a.b, b) || (a.e++, a.a.push(b), a.f++);
    a.b[b] = c
};
I.prototype.clone = function () {
    return new I(this)
};
I.prototype.k = function (a) {
    J(this);
    var b = 0,
        c = this.a,
        d = this.b,
        e = this.f,
        g = this,
        h = new G;
    h.next = function () {
        for (;;) {
            if (e != g.f) throw Error("The map has changed since the iterator was created");
            if (b >= c.length) throw pa;
            var h = c[b++];
            return a ? h : d[h]
        }
    };
    return h
};
var K = function (a, b) {
    return Object.prototype.hasOwnProperty.call(a, b)
};
var sa = function (a) {
    if ("function" == typeof a.g) return a.g();
    if (p(a)) return a.split("");
    if (n(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
        return b
    }
    return qa(a)
}, ta = function (a, b, c) {
        if ("function" == typeof a.forEach) a.forEach(b, c);
        else if (n(a) || p(a)) ea(a, b, c);
        else {
            var d;
            if ("function" == typeof a.j) d = a.j();
            else if ("function" != typeof a.g)
                if (n(a) || p(a)) {
                    d = [];
                    for (var e = a.length, g = 0; g < e; g++) d.push(g)
                } else d = ra(a);
                else d = void 0;
            for (var e = sa(a), g = e.length, h = 0; h < g; h++) b.call(c, e[h], d && d[h], a)
        }
    };
var L, M, N, O, ua = function () {
        return k.navigator ? k.navigator.userAgent : null
    };
O = N = M = L = !1;
var P;
if (P = ua()) {
    var va = k.navigator;
    L = 0 == P.lastIndexOf("Opera", 0);
    M = !L && (-1 != P.indexOf("MSIE") || -1 != P.indexOf("Trident"));
    N = !L && -1 != P.indexOf("WebKit");
    O = !L && !N && !M && "Gecko" == va.product
}
var wa = M,
    xa = O,
    ya = N;
var Q;
if (L && k.opera) {
    var za = k.opera.version;
    "function" == typeof za && za()
} else xa ? Q = /rv\:([^\);]+)(\)|;)/ : wa ? Q = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : ya && (Q = /WebKit\/(\S+)/), Q && Q.exec(ua());
var Aa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
    Ba = function (a) {
        if (R) {
            R = !1;
            var b = k.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Ba(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) throw R = !0, Error();
            }
        }
        return a.match(Aa)
    }, R = ya;
var S = function (a, b) {
    var c;
    if (a instanceof S) this.i = void 0 !== b ? b : a.i, Ca(this, a.l), this.r = a.r, this.m = a.m, Da(this, a.q), this.p = a.p, Ea(this, a.a.clone()), this.o = a.o;
    else if (a && (c = Ba(String(a)))) {
        this.i = !! b;
        Ca(this, c[1] || "", !0);
        var d = c[2] || "";
        this.r = d ? decodeURIComponent(d) : "";
        this.m = (d = c[3] || "") ? decodeURIComponent(d) : "";
        Da(this, c[4]);
        this.p = (d = c[5] || "") ? decodeURIComponent(d) : "";
        Ea(this, c[6] || "", !0);
        this.o = (c = c[7] || "") ? decodeURIComponent(c) : ""
    } else this.i = !! b, this.a = new T(null, 0, this.i)
};
f = S.prototype;
f.l = "";
f.r = "";
f.m = "";
f.q = null;
f.p = "";
f.o = "";
f.i = !1;
f.toString = function () {
    var a = [],
        b = this.l;
    b && a.push(U(b, Fa), ":");
    if (b = this.m) {
        a.push("//");
        var c = this.r;
        c && a.push(U(c, Fa), "@");
        a.push(encodeURIComponent(String(b)));
        b = this.q;
        null != b && a.push(":", String(b))
    }
    if (b = this.p) this.m && "/" != b.charAt(0) && a.push("/"), a.push(U(b, "/" == b.charAt(0) ? Ga : Ha));
    (b = this.a.toString()) && a.push("?", b);
    (b = this.o) && a.push("#", U(b, Ia));
    return a.join("")
};
f.clone = function () {
    return new S(this)
};
var Ca = function (a, b, c) {
    a.l = c ? b ? decodeURIComponent(b) : "" : b;
    a.l && (a.l = a.l.replace(/:$/, ""))
}, Da = function (a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.q = b
        } else a.q = null
    }, Ea = function (a, b, c) {
        b instanceof T ? (a.a = b, Ja(a.a, a.i)) : (c || (b = U(b, Ka)), a.a = new T(b, 0, a.i))
    }, U = function (a, b) {
        return p(a) ? encodeURI(a).replace(b, La) : null
    }, La = function (a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }, Fa = /[#\/\?@]/g,
    Ha = /[\#\?:]/g,
    Ga = /[\#\?]/g,
    Ka = /[\#\?@]/g,
    Ia = /#/g,
    T = function (a, b, c) {
        this.a = a || null;
        this.b = !! c
    }, W = function (a) {
        if (!a.c && (a.c = new I, a.h = 0, a.a))
            for (var b = a.a.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("="),
                    e = null,
                    g = null;
                0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
                e = decodeURIComponent(e.replace(/\+/g, " "));
                e = V(a, e);
                a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
            }
    };
f = T.prototype;
f.c = null;
f.h = null;
f.add = function (a, b) {
    W(this);
    this.a = null;
    a = V(this, a);
    var c = this.c.get(a);
    c || H(this.c, a, c = []);
    c.push(b);
    this.h++;
    return this
};
f.remove = function (a) {
    W(this);
    a = V(this, a);
    return K(this.c.b, a) ? (this.a = null, this.h -= this.c.get(a).length, this.c.remove(a)) : !1
};
f.j = function () {
    W(this);
    for (var a = this.c.g(), b = this.c.j(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]);
    return c
};
f.g = function (a) {
    W(this);
    var b = [];
    if (p(a)) {
        var c = a;
        W(this);
        c = V(this, c);
        K(this.c.b, c) && (b = s(b, this.c.get(V(this, a))))
    } else
        for (a = this.c.g(), c = 0; c < a.length; c++) b = s(b, a[c]);
    return b
};
f.get = function (a, b) {
    var c = a ? this.g(a) : [];
    return 0 < c.length ? String(c[0]) : b
};
f.toString = function () {
    if (this.a) return this.a;
    if (!this.c) return "";
    for (var a = [], b = this.c.j(), c = 0; c < b.length; c++)
        for (var d = b[c], e = encodeURIComponent(String(d)), d = this.g(d), g = 0; g < d.length; g++) {
            var h = e;
            "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
            a.push(h)
        }
    return this.a = a.join("&")
};
f.clone = function () {
    var a = new T;
    a.a = this.a;
    this.c && (a.c = this.c.clone(), a.h = this.h);
    return a
};
var V = function (a, b) {
    var c = String(b);
    a.b && (c = c.toLowerCase());
    return c
}, Ja = function (a, b) {
        b && !a.b && (W(a), a.a = null, ta(a.c, function (a, b) {
            var e = b.toLowerCase();
            if (b != e && (this.remove(b), this.remove(e), 0 < a.length)) {
                this.a = null;
                var g = this.c,
                    e = V(this, e),
                    h;
                h = a.length;
                if (0 < h) {
                    for (var l = Array(h), u = 0; u < h; u++) l[u] = a[u];
                    h = l
                } else h = [];
                H(g, e, h);
                this.h += a.length
            }
        }, a));
        a.b = b
    };
var X = {}, Y = {}, A = {};
Y.F = "text-x-small text-small text-normal text-large text-x-large";
Y.I = ["webkit-transform", "ms-transform", "moz-transform", "o-transform"];
Y.d = 640;
Y.Q = 360;
Y.D = "text-auto-size";
Y.ea = "cover-only";
Y.v = "map-text-node";
Y.G = "map-time-footer";
Y.H = NaN;
A.Z = "p, h1, h2, h3, h4, td, li";
A.w = 0;
A.W = 200;
A.fa = "https://www.googleapis.com/mirror/v1";
A.aa = "h1,h2,h3,h4,h5,h6,img,li,ol,ul,article,aside,details,figure,figcaption,footer,header,nav,section,summary,time,blockquote,br,div,hr,p,span,b,big,center,em,i,u,s,small,strike,strong,style,sub,sup,table,tbody,td,tfoot,th,thead,tr";
A.ba = "head,title,audio,embed,object,source,video,frame,frameset,applet,script";
A.contentEditable = !1;
var Z = {};
Y.M = function (a) {
    if (a.attachments)
        for (var b = 0; b < a.attachments.length; ++b) {
            var c = a.attachments[b],
                d;
            if (0 == c.contentType.indexOf("image/")) d = $("<img>"), A.s(c.id, d);
            else if (0 == c.contentType.indexOf("video/")) {
                var e = $("<source>");
                A.s(c.id, e);
                e.attr("type", c.contentType);
                d = $("<video>");
                d.append(e)
            }
            if (d) {
                d.width(Y.d).height(Y.Q);
                $("article").append(d).append($("<div>").addClass("photo-overlay"));
                $("article").addClass("photo");
                break
            }
        }
};
Y.O = function (a) {
    a.attachments && $("img", $(".card-content")).each(function (b, c) {
        c = $(c);
        var d = c.attr("src");
        0 == d.indexOf("attachment:") ? (d = parseInt(d.substr(d.indexOf(":") + 1), 10), d < a.attachments.length && A.s(a.attachments[d].id, c)) : 0 == d.indexOf("cid:") && A.s(d.substr(d.indexOf(":") + 1), c)
    })
};
Y.t = function (a) {
    $(".card").empty();
    a && $(".card").css("left", 0);
    a = Z.content;
    if (a.html) {
        var b = $("<div>").html(a.html);
        A.C(b, !0);
        var c = b.children();
        c.detach();
        c.appendTo(".card");
        b.remove();
        Y.O(a)
    } else {
        var b = $("<article>"),
            c = $("<section>"),
            d = $("<p>");
        $(".card").append(b);
        for (var e = (a.text || "").split("\n"), g = 0; g < e.length; ++g) {
            var h = e[g];
            h ? d.append($("<div>").text(h)) : d.append($("<div>").append($("<br>")))
        }
        Y.M(a);
        if (a.creator && a.creator.imageUrls && 0 < a.creator.imageUrls.length) {
            var l = $("<img>");
            l.attr("src",
                a.creator.imageUrls[0]);
            b.append($("<figure>").append(l));
            l.load(function () {
                var a = l.parent();
                l.height(a.height());
                l.css("margin-left", (a.width() - l.width()) / 2);
                l.css("margin-right", (a.width() - l.width()) / 2);
                l.css("margin-top", (a.height() - l.height()) / 2);
                l.css("margin-bottom", (a.height() - l.height()) / 2)
            })
        }
        b.append(c);
        c.append(d);
        d.attr("class", "text-auto-size");
        d.attr("id", Y.v)
    }
    $(".text-auto-size").each(function (a, b) {
        $(b).attr("data-text-autosize", "true");
        $(b).keyup(function () {
            $(b).removeClass(Y.F);
            $(b).addClass(Y.D);
            ha()
        })
    });
    ha();
    A.P();
    a = $("<footer>").attr("id", Y.G).append($("<time>").text(Z.footer).append($("<img>").addClass("footer-brand-icon")));
    $("article").append(a);
    Z.brand_icon ? ($("img.footer-brand-icon").attr("src", Z.brand_icon), $("article footer#map-time-footer").addClass("has-brand-icon")) : $("article footer#map-time-footer").removeClass("has-brand-icon")
};
Y.R = function () {
    if (!Z.id) {
        var a = Y.H;
        a && Y.u(1);
        try {
            var b = A.N;
            la(b);
            na(b)
        } finally {
            Y.u(a)
        }
    }
};
Y.V = function (a) {
    $(".card").width(a);
    a > Y.d ? $(".scroll").show() : $(".scroll").hide();
    var b = $(".card").position().left;
    Y.d >= a + b && (b = Y.d - a, b = Math.floor(b / Y.d) * Y.d, $(".card").css("left", b), $(".rightscroll").hide());
    0 == b && $(".leftscroll").hide()
};
Y.da = function () {
    var a = $(".card").position().left - Y.d,
        a = Math.floor(a / Y.d) * Y.d;
    $(".card").css("left", a);
    Y.d >= $(".card").width() + a && $(".rightscroll").hide();
    $(".leftscroll").show()
};
Y.scrollLeft = function () {
    var a = $(".card").position().left + Y.d,
        a = Math.floor(a / Y.d) * Y.d;
    $(".card").css("left", a);
    0 == a && $(".leftscroll").hide();
    $(".rightscroll").show()
};
Y.u = function (a) {
//    if (a && 0 < a && 1 >= a) {
//        for (var b = "scale(" + a + ")", c = 0; c < Y.I.length; ++c) $(".scalable").css(Y.I[c], b);
//        Y.H = a
//    }
};
Y.U = function () {
    var a = window.location.href,
        a = (a instanceof S ? a.clone() : new S(a, void 0)).a;
    A.contentEditable = !! a.get("contentEditable", !1);
    Y.u(Number(a.get("scale", 1)));
    try {
        var b = JSON.parse(a.get("timelineItem", null));
        b && (Z = {
            content: b
        }, Y.t(!0))
    } catch (c) {}
};
A.s = function (a, b) {
    Z.accessToken && gapi.auth && (gapi.auth.setToken({
        access_token: Z.accessToken
    }), gapi.client.request({
        path: "/mirror/v1/timeline/" + Z.content.id + "/attachments/" + a
    }).execute(function (a) {
        a && a.contentUrl && b.attr("src", A.ca(a.contentUrl))
    }))
};
A.P = function () {
    A.contentEditable && ($(A.Z, $(".card")).attr("contenteditable", "true"), $("div", $(".card")).each(function (a, b) {
        b = $(b);
        0 != $.trim(b.html()).indexOf("<") && b.attr("contenteditable", "true")
    }), $("#" + Y.v + " div").attr("contenteditable", null), X.$())
};
A.C = function (a, b) {
    b && $(A.ba, a).remove();
    a.children().each(function (a, b) {
        b = $(b);
        A.C(b);
        b.is(A.aa) || (b.children().unwrap(), b.remove())
    })
};
A.X = function () {
    var a = $(".card").clone();
    $("#" + Y.G, a).remove();
    $("img.footer-brand-icon", a).remove();
    $("*[contenteditable=true]", a).each(function (a, c) {
        c = $(c);
        c.html() && c.html(c.html().replace(/<div><br><\/div>/g, "<br/>"))
    });
    $("[data-text-autosize=true]", a).each(function (a, c) {
        c = $(c);
        c.removeClass(Y.F);
        c.addClass(Y.D);
        c.attr("data-text-autosize", null);
        c.attr("style") || c.attr("style", null)
    });
    $("[contenteditable=true]", a).attr("contenteditable", null);
    return a.html()
};
A.Y = function () {
    var a = "";
    $("#" + Y.v + " > div").each(function () {
        a += $("<p>").html($(this).html().replace(/<br>/g, "\n")).text() + "\n"
    });
    a && (a = a.substr(0, a.length - 1));
    return a
};
A.ca = function (a) {
    if (a && Z.accessToken) {
        var b = "access_token=" + Z.accessToken;
        return -1 != a.indexOf("?") ? a + "&" + b : a + "?" + b
    }
    return a
};
X.$ = function () {
    $("[contenteditable=true]").bind("paste keyup blur input", function () {
        clearTimeout(A.w);
        Z.content.html ? Z.content.html = A.X() : Z.content.text = A.Y();
        window.parent.postMessage({
            event: "changed",
            id: Z.id,
            content: Z.content
        }, "*")
    });
    $("[contenteditable=true]").blur(function () {
        A.w = setTimeout(Y.t, A.W)
    });
    $("[contenteditable=true]").focus(function () {
        clearTimeout(A.w)
    })
};
X.T = function () {
    window.addEventListener("message", function (a) {
        a = a.data;
        "content" == a.event ? (Z = a, Y.t(a.selected)) :
            "unselect" == a.event ? $(".card").removeClass("selected") :
                "select" == a.event ? $(".card").addClass("selected") :
                    "resize" == a.event ? $('.card-size').attr('class', 'card-size ' + a.sizeClass) :
                        "updateBrand" == a.event && (a.url ? ($(".card img.footer-brand-icon").attr("src", a.url), $(".card footer#map-time-footer").addClass("has-brand-icon")) :
                            $(".card footer#map-time-footer").removeClass("has-brand-icon"))
    }, !1)
};
X.S = function () {
    $(".card").click(function () {
        $(this).hasClass("selected") || window.parent.postMessage({
            event: "clicked",
            id: Z.id,
            content: Z.content,
            template: $(this).data('template'),
            card_id: $(this).data('card-id')
        }, "*")
    });
    $(".rightscroll").click(Y.da);
    $(".leftscroll").click(Y.scrollLeft)
};
m("initAuth", function () {
    gapi.auth.init(function () {})
});
$(document).ready(function () {
    A.N = ka(!0, Y.V);
    A.K = z(!0, Y.R);
    X.T();
    X.S();
    Y.U()
});
