
Math.random();
var c = function (a, b, d) {
    return a.call.apply(a.bind, arguments)
}, f = function (a, b, d) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var e = Array.prototype.slice.call(arguments, 2);
            return function () {
                var d = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(d, e);
                return a.apply(b, d)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, h = function (a, b, d) {
        h = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? c : f;
        return h.apply(null, arguments)
    };
Function.prototype.bind = Function.prototype.bind || function (a, b) {
    if (1 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 1);
        d.unshift(this, a);
        return h.apply(null, d)
    }
    return h(this, a)
};
var _movie = '<article>\n  <figure>\n    <img src="$ROOT/links/movie.jpg">\n  </figure>\n  <section>\n    <h1 class="text-large">Movie</h1>\n    <p class="text-x-small">\n      <img class="icon-small" src="$ROOT/links/rated_r.png">\n      120 min / Drama\n    </p>\n    <hr>\n    <p class="text-normal">\n      1:15 2:10 4:15<br>\n      Movie Theatre\n    </p>\n  </section>\n</article>\n',
    _flight = '<article>\n  <section>\n    <div class="layout-figure">\n      <div class="align-center">\n        <p class="text-x-large">BOS</p>\n        <img src="$ROOT/links/plane.png" width="50" height="50">\n        <p class="text-x-large">SFO</p>\n      </div>\n      <div>\n        <div class="text-normal">\n          <p>Virgin America 351</p>\n          <p>Gate B38</p>\n          <p>8:35am</p>\n          <p class="green">On Time</p>\n        </div>\n      </div>\n    </div>\n  </section>\n</article>\n',
    _sports = '<article>\n  <section>\n    <div class="layout-two-column">\n      <div class="align-center">\n        <p>Celtics</p>\n        <p class="text-x-large">101</p>\n      </div>\n      <div class="align-center">\n        <p>Bulls</p>\n        <p class="text-x-large">95</p>\n      </div>\n    </div>\n  </section>\n  <footer>\n    <p>Final Score</p>\n  </footer>\n</article>\n',
    _simpleEvent = '<article>\n  <section>\n    <div class="text-auto-size">\n      <p class="yellow">8:00<sub>PM</sub></p>\n      <p>Dinner with folks tonight</p>\n    </div>\n  </section>\n  <footer>\n    <div>Their place</div>\n  </footer>\n</article>\n',
    _knowledge = '<article>\n  <figure>\n    <img src="$ROOT/links/lincoln.png">\n  </figure>\n  <section>\n    <table class="text-small align-justify"> \n      <tbody>\n        <tr>\n          <td>Born</td>\n          <td>Feb 12, 1809</td>\n        </tr>\n        <tr>\n          <td>Died</td>\n          <td>Apr 15, 1865</td>\n        </tr>\n        <tr>\n          <td>Height</td>\n          <td>6\' 4"</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</article>\n',
    _knowledgeMosaic = '<article>\n  <figure>\n    <ul class="mosaic mosaic3">\n      <li style="background-image: url($ROOT/links/washington.jpg)"></li>\n      <li style="background-image: url($ROOT/links/lincoln.png)"></li>\n      <li style="background-image: url($ROOT/links/obama.jpg)"></li>\n      <li style="background-image: url($ROOT/links/washington.jpg)"></li>\n      <li style="background-image: url($ROOT/links/lincoln.png)"></li>\n    </ul>\n  </figure>\n  <section>\n    <p class="text-medium">\n      U.S. Presidents\n    </p>\n    <table class="text-small align-justify">\n      <tbody>\n        <tr>\n          <td>Washington</td>\n          <td>1<sup>st</sup></td>\n        </tr>\n        <tr>\n          <td>Lincoln</td>\n          <td>16<sup>th</sup></td>\n        </tr>\n        <tr>\n          <td>Obama</td>\n          <td>44<sup>th</sup></td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</article>\n',
    _stock = '<article>\n  <section>\n    <table class="align-justify"> \n      <tbody>\n        <tr>\n          <td>AAPL</td>\n          <td>503.73</td>\n          <td class="red">-16.57 (3.18%)</td>\n        </tr>\n        <tr>\n          <td>AMZN</td>\n          <td>274.03</td>\n          <td class="green">+6.09 (2.27%)</td>\n        </tr>\n        <tr>\n          <td>GOOG</td>\n          <td>727.58</td>\n          <td class="red">-12.41 (1.68%)</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</article>\n',
    _transit = '<article>\n  <section>\n    <table class="text-small">\n      <tbody>\n        <tr>\n          <td>\n            <img src="$ROOT/links/icons_30_0000_blue.png" class="icon-small">\n            Daly City <span class="muted">\u203a</span> Dublin\n          </td>\n          <td>\n            <div class="text-minor align-right muted">in 5 min</div>\n        </td>\n        </tr>\n        <tr>\n          <td>\n            <img src="$ROOT/links/icons_30_0001_green.png" class="icon-small">\n            Milbrae <span class="muted">\u203a</span> Richmond\n          </td>\n          <td>\n            <div class="text-minor align-right muted">in 7 min</div>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <img src="$ROOT/links/icons_30_0002_yellow.png" class="icon-small">\n            Fremont <span class="muted">\u203a</span> Daly City\n          </td>\n          <td>\n            <div class="text-minor align-right muted">in 16 min</div>\n          </td>\n        </tr>\n        <tr>\n          <td>\n            <img src="$ROOT/links/icons_30_0003_red.png" class="icon-small">\n            Pittsburg/Bay Point <span class="muted">\u203a</span> SFO\n          </td>\n          <td>\n            <div class="text-minor align-right muted">in 21 min</div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n  <footer>\n    <img src="$ROOT/links/icons_30_0025_geo_transit.png" class="left">\n    <p>Embarcadero BART</p>\n  </footer>\n</article>\n',
    _list = '<article>\n  <section>\n    <ul class="text-x-small">\n      <li>Gingerbread</li>\n      <li>Chocolate Chip Cookies</li>\n      <li>Tiramisu</li>\n      <li>Donuts</li>\n      <li>Sugar Plum Gummies</li>\n    </ul>\n  </section>\n  <footer>\n    <p>Grocery list</p>\n  </footer>\n</article>\n',
    _autoResize = '<article>\n  <section>\n    <p class="text-auto-size">This <em class="yellow">paragraph</em> auto-resizes according to the <strong class="blue">HTML</strong> content length.\n    </p>\n  </section>\n</article>\n',
    _hybrid = '<article class="photo">\n  <img src="$ROOT/links/filoli-spring-fling.jpg" width="100%" height="100%">\n  <div class="overlay-gradient-tall-dark"/>\n  <section>\n    <p class="text-auto-size">Spring Fling Fundraiser at Filoli</p>\n  </section>\n</article>\n',
    _mosaic = '<article class="photo">\n  <ul class="mosaic mosaic3">\n    <li style="background-image: url($ROOT/links/washington.jpg)"></li>\n    <li style="background-image: url($ROOT/links/lincoln.png)"></li>\n    <li style="background-image: url($ROOT/links/obama.jpg)"></li>\n  </ul>\n  <div class="overlay-gradient-tall-dark"/>\n  <section>\n    <p class="text-auto-size">United States Presidents</p>\n  </section>\n</article>\n',
    _multipage = '<article class="cover-only">\n  <section>\n    <p class="text-auto-size">This is the cover card of a long list</p>\n  </section>\n  <footer>\n    <p>Hover to scroll</p>\n  </footer>\n</article>\n<article class="auto-paginate">\n  <ul class="text-x-small">\n    <li>First item</li>\n    <li>Second item</li>\n    <li>Third item</li>\n    <li>Fourth item</li>\n    <li>Fifth item</li>\n    <li>Sixth item</li>\n    <li>Seventh item</li>\n    <li>Eighth item</li>\n    <li>Ninth item</li>\n    <li>Tenth item</li>\n  </ul>\n</article>\n',
    _author = '<article class="author">\n  <img src="$ROOT/links/filoli-spring-fling.jpg" width="100%" height="100%">\n  <div class="overlay-full"/>\n  <header>\n    <img src="$ROOT/links/lincoln-avatar.png"/>\n    <h1>@abraham_lincoln</h1>\n    <h2>Gettysburg, Pennsylvania</h2>\n  </header>\n  <section>\n    <p class="text-auto-size">Four score and seven years ago, our fathers brought forth on this continent a new nation, conceived in <span class="blue">#liberty</span></p>\n  </section>\n</article>\n',
    k = [{
        id: "TEXT",
        content: {
            text: "This item auto-resizes according to the text length",
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "AUTO_RESIZE",
        content: {
            html: _autoResize,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "HYBRID",
        content: {
            html: _hybrid,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "HYBRID_MOSAIC",
        content: {
            html: _mosaic,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "MULTIPAGE",
        content: {
            html: _multipage,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "SIMPLE_EVENT",
        content: {
            html: _simpleEvent,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "LIST",
        content: {
            html: _list,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "KNOWLEDGE",
        content: {
            html: _knowledge,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "KNOWLEDGE_MOSAIC",
        content: {
            html: _knowledgeMosaic,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "STOCK",
        content: {
            html: _stock,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "SPORTS",
        content: {
            html: _sports,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "FLIGHT",
        content: {
            html: _flight,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "MOVIE",
        content: {
            html: _movie,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "TRANSIT",
        content: {
            html: _transit,
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "SIMPLE_MESSAGE",
        content: {
            text: "Hello Explorers,\n\nWelcome to Glass!\n\n+Project Glass\n",
            creator: {
                displayName: "Project Glass",
                imageUrls: ["https://lh3.googleusercontent.com/-quy9Ox8dQJI/T3xUHhub6PI/AAAAAAAAHAQ/YvjqA3Pw1sM/glass_photos.jpg?sz=360"]
            },
            notification: {
                level: "DEFAULT"
            }
        }
    }, {
        id: "AUTHOR",
        content: {
            html: _author,
            notification: {
                level: "DEFAULT"
            }
        }
    }];
var m = {}, n = {}, p = {}, q = {};
m.b = null;
m.q = !1;
q.i = [{
    j: "minute",
    value: 60
}, {
    j: "hour",
    value: 60
}, {
    j: "day",
    value: 24
}];
q.I = 20;
n.v = function () {
    $("textarea").keydown(function (a) {
        if (9 === a.keyCode) {
            var b = this.selectionStart,
                d = this.selectionEnd,
                e = $(this).val();
            $(this).val(e.substring(0, b) + "  " + e.substring(d));
            this.selectionStart = this.selectionEnd = b + 2;
            a.preventDefault()
        }
    });
    $("#source-html").bind("input propertychange", function () {
        var a = $("#source-html").val(),
            b = JSON.parse($("#source-json").val()) || {};
        b.html || null == b.text ? b.html = a : b.text = a;
        $("#source-json").val(JSON.stringify(b, void 0, 2));
        p.h(b, !1)
    });
    $("#source-json").bind("input propertychange",
        function () {
            var a = JSON.parse($("#source-json").val());
            a.text && 0 < a.text.length ? ($("#source-html").val(a.text), $("#html-text-button").text("Text")) : ($("#source-html").val(a.html || ""), $("#html-text-button").text("HTML"));
            p.h(a, !1)
        });
    $(".sourceBox").focus(function () {
        $(".sourceContainer").addClass("editing")
    });
    $(".sourceBox").blur(function () {
        $(".sourceContainer").removeClass("editing")
    })
};
n.D = function () {
    $("#clientId").change(p.c);
    $("#clientId").keyup(p.c);
    $("#authorizeApisButton").click(function () {
        q.l();
        return !1
    });
    $("#sendButton").click(q.H);
    $("#reloadButton").click(q.d);
    $("#deleteButton").click(q.F);
    $("#brand-icon-url").on("propertychange keyup input paste", q.m);
    $("#brand-icon-url").on("dragenter", function (a) {
        a.preventDefault();
        a.stopPropagation();
        a.originalEvent.dataTransfer.dropEffect = "copy";
        $(this).addClass("dragging")
    });
    $("#brand-icon-url").on("dragleave", function (a) {
        a.preventDefault();
        a.stopPropagation();
        $(this).removeClass("dragging")
    });
    $("#brand-icon-url").on("drop", q.G)
};
p.A = function () {
    $(".scrollBarInner").bind("scroll", function () {
        $(this).find(".shadow").css("opacity", $(this).scrollTop() / 15)
    })
};
p.L = function (a) {
    $("#menuItemList").empty();
    if (a.menuItems) {
        for (var b = 0, d = 0; d < a.menuItems.length; ++d) {
            var e = a.menuItems[d];
            if (e.values && 0 < e.values.length) {
                var g = e.values[0],
                    l = $("<div>").addClass("menuItem"),
                    v = $("<center>").addClass("menuItemValue"),
                    w = $("<img>").addClass("menuItemIcon").attr("src", g.iconUrl),
                    g = $("<p>").addClass("menuItemDisplayName").text(g.displayName);
                l.append(v.append(w).append(g));
                l.click(q.M);
                l.attr("data-item-id", a.id);
                l.attr("data-menu-id", e.id);
                $("#menuItemList").append(l);
                b += l.outerWidth(!0)
            }
        }
        $("#menuItemList").width(b)
    }
    0 < $(".menuItem").length ? ($("#menuItemBox").show(), $(".topContainer").addClass("topContainerExtended")) : ($("#menuItemBox").hide(), $(".topContainer").removeClass("topContainerExtended"))
};
p.J = function (a) {
    $("#itemList").empty();
    if (a.items && 0 < a.items.length) {
        for (var b = 0; b < a.items.length; ++b) {
            var d = a.items[b],
                e = $("<li>").addClass("carditem");
            e.append(q.p("item-" + d.id, d, q.n(d)));
            $("#itemList").append(e)
        }
        $("a", "#bottomContainer .selector").each(function () {
            "timeline" == $(this).attr("value") && $(this).click()
        });
        $("#item-" + a.items[0].id).load(function () {
            q.g("item-" + a.items[0].id, a.items[0])
        })
    } else $("#itemList").append($("<p>").text("No items found"))
};
p.f = function () {
    $("#butterbar").removeClass("shown")
};
p.k = function () {
    $(".map-tooltip").each(function () {
        var a = this;
        $(this).parent().bind("mouseover", function () {
            a.s || $(a).addClass("visible");
            a.s = !1
        });
        $(this).parent().bind("mouseout", function () {
            $(a).removeClass("visible")
        });
        $(this).bind("mouseover", function () {
            $(a).removeClass("visible");
            a.s = !0
        });
        $(a).css("left", ($(a).parent().width() - $(a).width()) / 2 - 2);
        $(a).css("top", $(a).parent().height() + 6);
        var b = $(a).css("paddingLeft").replace("px", ""),
            d = $(a).width() / 2;
        $(".pointer", $(a)).css("left", parseInt(d, 10) + parseInt(b,
            10))
    })
};
p.B = function () {
    $(".map-segmentedcontrol").delegate(".map-button", "click", function (a) {
        a.preventDefault();
        $(this).addClass("selected").siblings().removeClass("selected");
        $("#" + $(this).attr("data-target")).show().siblings().hide()
    })
};
p.o = function (a) {
    a.text ? ($("#source-html").val(a.text), $("#html-text-button").text("Text")) : ($("#source-html").val(a.html || ""), $("#html-text-button").text("HTML"));
    $("#source-json").val(JSON.stringify(a, void 0, 2))
};
p.a = function (a, b, d) {
    var e = $("#butterbar");
    e.empty();
    e.append($("<p>").text(a + "  ").append($("<a>").text("Dismiss").click(p.f)));
    b ? e.addClass("error") : e.removeClass("error");
    e.addClass("shown");
    d && setTimeout(p.f, d)
};
p.c = function () {
    m.q && "" != $("#clientId").val() ? $("#authorizeApisButton").removeClass("disabled") : $("#authorizeApisButton").addClass("disabled")
};
p.h = function (a, b) {
    var d = $("#brand-icon-url").val();
    $("#preview")[0].contentWindow.postMessage(q.r(null, a, q.n(a), d, b), "*");
    a.id ? ($("#sendButton").text("Update Item"), $("#deleteButton").show()) : ($("#sendButton").text("Insert Item"), $("#deleteButton").hide())
};
q.u = function () {
    var a = window.localStorage.clientId;
    a && ($("#clientId").val(a), p.f())
};
q.l = function (a, b) {
    var d = {
        client_id: $("#clientId").val(),
        scope: "https://www.googleapis.com/auth/glass.timeline",
        immediate: a || !1
    };
    gapi.auth.authorize(d, function (a) {
        a && (window.localStorage.clientId = $("#clientId").val(), b ? b() : (q.d(), q.K(), $("#authSettings").hide(), $("#apiActions").show(), p.k()))
    })
};
q.r = function (a, b, d, e, g) {
    a = {
        id: a,
        event: "content",
        content: b,
        footer: d,
        brand_icon: e,
        selected: g
    };
    gapi && gapi.auth && (b = gapi.auth.getToken()) && (a.accessToken = b.access_token);
    return a
};
q.p = function (a, b, d, e) {
    var g = $("<iframe>").addClass("smallcard").attr("src", "smallcard.html").attr("id", a);
    g.load(function () {
        this.contentWindow.postMessage(q.r(a, b, d, e, !0), "*")
    });
    return g
};
q.e = function (a, b) {
    a.execute(function (d) {
        d.error ? q.l(!0, function () {
            a.execute(b)
        }) : b(d.result)
    })
};
q.n = function (a) {
    var b = "just now";
    if (a.displayTime || a.updated) {
        a = Math.floor((new Date - new Date(a.displayTime || a.updated)) / 6E4);
        var d = 0,
            e = !0;
        if (0 == a) return b;
        0 > a && (a *= -1, e = !1);
        for (; d + 1 < q.i.length && (b = Math.floor(a / q.i[d + 1].value), 0 != b); ++d) a = b;
        b = a + " " + q.i[d].j;
        1 != a && (b += "s");
        b = e ? b + " ago" : "in " + b
    }
    return b
};
q.C = function () {
    var a = window.location.href,
        b = a.lastIndexOf("/"); - 1 < b && (a = a.substr(0, b));
    for (b = 0; b < k.length; ++b) {
        var d = $("<li>").addClass("carditem"),
            e = k[b];
        e.content.html && (e.content.html = e.content.html.replace(/\$ROOT/g, a));
        var g = e.id,
            l = window.localStorage.brandIconURL,
            g = g.replace("_", " ");
        d.append(q.p("template-" + e.id, e.content, e.id.replace("_", " "), l));
        $("#templateList").append(d)
    }
    e = k[0];
    $("#template-" + e.id).load(function () {
        q.g("template-" + e.id, e.content)
    })
};
q.w = function (a) {
    a = a.originalEvent.data;
    "clicked" == a.event ? q.g(a.id, a.content) : "changed" == a.event && p.o(a.content)
};
q.d = function () {
    p.a("Loading Timeline Items...");
    q.e(gapi.client.mirror.timeline.list({
        maxResults: q.I
    }), function (a) {
        p.J(a);
        p.f()
    })
};
q.K = function () {
    var a = gapi.client.mirror.subscriptions.list({});
    q.e(a, function (a) {
        if (a.items)
            for (var d = 0; d < a.items.length; ++d) {
                var e = a.items[d];
                if ("timeline" == e.collection) {
                    m.b = e;
                    break
                }
            }
    })
};
q.g = function (a, b) {
    a && b && ($(".smallcard").each(function (a, b) {
        b.contentWindow.postMessage({
            event: "unselect"
        }, "*")
    }), $("#" + a)[0].contentWindow.postMessage({
        event: "select"
    }, "*"), p.o(b), p.L(b), p.h(b, !0))
};
q.H = function () {
    var a = JSON.parse($("#source-json").val()),
        b = null,
        b = a.id ? gapi.client.mirror.timeline.update({
            id: a.id,
            resource: a
        }) : gapi.client.mirror.timeline.insert({
            resource: a
        });
    p.a("Executing request...");
    q.e(b, q.d)
};
q.F = function () {
    var a = JSON.parse($("#source-json").val()),
        b = null;
    a.id ? (b = gapi.client.mirror.timeline["delete"]({
        id: a.id
    }), p.a("Deleting item..."), q.e(b, q.d)) : p.a("Item not in Timeline", !0, 2E3)
};
q.M = function () {
    if (m.b) {
        var a = {
            itemId: $(this).attr("data-item-id"),
            menuActionId: $(this).attr("data-menu-id"),
            callbackUrl: m.b.callbackUrl,
            userToken: m.b.userToken,
            verifyToken: m.b.verifyToken
        };
        p.a("Sending notification...");
        $.post("/operation/notify", a, function () {
            p.a("Notification sent!", !1, 5E3)
        })
    } else p.a("Unable to send notification, service is not subscribed", !0)
};
q.t = function () {
    var a = window.localStorage.brandIconURL;
    a && $("#brand-icon-url").val(a)
};
q.G = function (a) {
    a.stopPropagation();
    a.preventDefault();
    a = a.originalEvent.dataTransfer.files[0];
    if (a.type.match("image.*")) {
        var b = new FileReader;
        b.onload = function (a) {
            a = a.target.result;
            $("#brand-icon-url").val(a);
            $("#brand-icon-url").removeClass("dragging");
            q.m()
        };
        b.readAsDataURL(a)
    }
};
q.m = function () {
    var a = $("#brand-icon-url").val();
    window.localStorage.brandIconURL = a;
    var b = {
        event: "updateBrand",
        url: a
    };
    $("#preview")[0].contentWindow.postMessage(b, "*");
    $(".smallcard").each(function (a, e) {
        e.contentWindow.postMessage(b, "*")
    })
};
var r = function () {
    gapi.auth.init(function () {
        gapi.client.load("mirror", "v1", function () {
            m.q = !0;
            p.c()
        })
    })
}, s = ["initMirrorApi"],
    t = this;
s[0] in t || !t.execScript || t.execScript("var " + s[0]);
for (var u; s.length && (u = s.shift());) s.length || void 0 === r ? t[u] ? t = t[u] : t = t[u] = {} : t[u] = r;
$(document).ready(function () {
    top == self && "mirror-api-playground.appspot.com" == window.location.hostname && window.location.replace("https://developers.google.com/glass/playground");
    n.D();
    n.v();
    q.C();
    q.u();
    q.t();
    p.A();
    p.k();
    p.B();
    p.c();
    $(window).bind("message", q.w)
});
