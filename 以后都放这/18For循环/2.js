define("kg/route-map-http/0.0.3/index", [], function(t, r, e) {
	var s, i, a, n;
	s = function(t) {
		function r(t) {
			this.parse(t)
		}
		var e = "http:",
			s = new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$", "i");
		return r.prototype = {
			parse: function(t) {
				var r = t.match(s) || [];
				this.protocol = r[1] || e, this.username = r[2], this.password = r[3], this.hostname = r[4] || "", this.port = r[5] || "", this.pathname = r[6] || "/", this.search = r[7] ? "?" + r[7] : "", this.hash = r[8] || "", this.host = this.hostname + (this.port ? ":" + this.port : ""), this.origin = this.protocol + "//" + this.host, this.href = this.toString()
			}
		}, t = r
	}(), i = function(t) {
		function r(t) {
			var r = t.api,
				s = t.type,
				o = t.dirName || n,
				h = {};
			if(r) {
				var p = new a(r),
					u = p.host;
				"/" !== p.pathname && (u += p.pathname), u = o + "/" + s + "/" + u, h.path = u;
				var f = {};
				if(p.search.substr(1).replace(/(\w+)=(\w+)/gi, function(t, r, e) {
						f[r] = decodeURIComponent(e)
					}), t.data)
					for(var l in t.data) f[l] = t.data[l];
				var c = i(f, t.requiredParams);
				h.params = c || void 0, h.key = e(h) || void 0
			}
			return h
		}

		function e(t) {
			for(var r = t.path, e = t.params, s = e ? r + "" + e : r, i = [], a = s.split(""), n = 0, o = a.length; n < o; n++) {
				var h = a[n];
				h >= "0" && h <= "9" || h <= "z" && h >= "a" ? i.push(h) : h <= "Z" && h >= "A" && i.push(h.toLowerCase())
			}
			return i.join("")
		}

		function i(t, r) {
			var e = void 0;
			if(t) {
				e = [];
				for(var s in t) t.hasOwnProperty(s) && (!r || r.indexOf(s) > -1) && e.push(s + "-" + t[s]);
				e.sort()
			} else e = [];
			return e.join("_")
		}
		var a = s,
			n = "default";
		return t = {
			parse: r
		}
	}(), a = function(t) {
		function r(t) {
			t.type = t.type || "http", this.apiConfig = t, this.rules = e.parse(t)
		}
		var e = i,
			s = "//global.alicdn.com/",
			a = "";
		return r.prototype = {
			getKey: function() {
				return this.rules && this.rules.key ? "TAI_LSKEY_" + this.apiConfig.type.toUpperCase() + "_" + this.rules.key : null
			},
			getCDNAddress: function() {
				return this.rules ? s + this.rules.path + (this.rules.params ? "/" + this.rules.params : "") + a : null
			},
			getJSONPCallbak: function() {
				return this.rules.key || null
			}
		}, t = r
	}(), n = function(t) {
		return t = a
	}(), e.exports = n
});
define("kg/home-2017/0.0.5/index", ["util", "node", "ua", "dom", "url", "kg/session/0.0.1/index", "kg/pattern/2.0.5/lib/event", "kg/pattern/2.0.5/lib/reporter", "kg/pattern/2.0.5/lib/image", "kg/pattern/2.0.5/lib/io", "promise", "kg/pattern/2.0.5/index", "kg/slide/6.0.8/index", "kg/home-2017/0.0.5/c/nav/index.css", "anim", "kg/offline/7.0.1/index", "cookie", "kg/datalazyload/6.0.10/index", "kg/attr-anim/6.0.6/index", "kg/home-2017/0.0.5/c/fixedtool/index.css"], function(require, exports, module) {
	var util = require("util"),
		node = require("node"),
		_ua_ = require("ua"),
		dom = require("dom"),
		_url_ = require("url"),
		aliSession = require("kg/session/0.0.1/index"),
		aliPatternLibEvent = require("kg/pattern/2.0.5/lib/event"),
		aliPatternLibReporter = require("kg/pattern/2.0.5/lib/reporter"),
		aliPatternLibImage = require("kg/pattern/2.0.5/lib/image"),
		aliPatternLibIo = require("kg/pattern/2.0.5/lib/io"),
		promise = require("promise"),
		aliPattern = require("kg/pattern/2.0.5/index"),
		aliSlide = require("kg/slide/6.0.8/index"),
		kgHome2017005CNavIndexless = require("kg/home-2017/0.0.5/c/nav/index.css"),
		anim = require("anim"),
		aliOffline = require("kg/offline/7.0.1/index"),
		cookie = require("cookie"),
		aliDatalazyload = require("kg/datalazyload/6.0.10/index"),
		aliAttrAnim = require("kg/attr-anim/6.0.6/index"),
		kgHome2017005CFixedtoolIndexless = require("kg/home-2017/0.0.5/c/fixedtool/index.css"),
		kgHome2017005LibPolyfill, kgHome2017005LibAplus, kgHome2017005LibFeature, kgHome2017005LibTanx, kgHome2017005CQrIndex, kgHome2017005CServiceCatjsthtml, kgHome2017005CServiceItemjsthtml, kgHome2017005CServiceBannerjsthtml, kgHome2017005LibAld, kgHome2017005CTmallIndex, kgHome2017005CConveLayoutjsthtml, kgHome2017005CFocusItemjsthtml, kgHome2017005CNavIndex, kgHome2017005CBeltItemjsthtml, kgHome2017005CAppItemjsthtml, kgHome2017005CMemberLoginjsthtml, kgHome2017005CNoticeIndex, kgHome2017005CHeadlineItemjsthtml, kgHome2017005CDecorationsItemjsthtml, kgHome2017005CTanxIndex, kgHome2017005CSearchSticky, kgHome2017005CSearchTmalljsthtml, kgHome2017005CSearchAlimamajsthtml, kgHome2017005CCornerIndex, kgHome2017005CFixedtoolItemjsthtml, kgHome2017005CSuperbannerItemjsthtml, kgHome2017005LibLog, kgHome2017005CommonHeadItemBarjsthtml, kgHome2017005CommonHeadItemjsthtml, kgHome2017005LibUtil, kgHome2017005CAdIndex, kgHome2017005CServiceIndex, kgHome2017005CPromoIndex, kgHome2017005CConveIndex, kgHome2017005CFocusIndex, kgHome2017005CBeltIndex, kgHome2017005CAppIndex, kgHome2017005CMemberIndex, kgHome2017005CHeadlineIndex, kgHome2017005CDecorationsIndex, kgHome2017005CSearchIndex, kgHome2017005CFixedtoolIndex, kgHome2017005CSuperbannerIndex, kgHome2017005CommonHeadIndex, kgHome2017005LibModules, kgHome2017005CommonInject, kgHome2017005LibLoader, kgHome2017005LibIndex, kgHome2017005Index;
	kgHome2017005LibPolyfill = function(t) {
		function e() {
			function t(t, e) {
				if(e = e || {
						bubbles: !1,
						cancelable: !1,
						detail: void 0
					}, document.createEvent) {
					var n = document.createEvent("CustomEvent");
					return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
				}
			}
			return "function" != typeof window.CustomEvent && (t.prototype = window.Event && window.Event.prototype || {}, void(window.CustomEvent = t))
		}

		function n() {
			var t = navigator.userAgent.toLowerCase().indexOf("taobrowser") > -1;
			window.requestNextAnimationFrame = function() {
				if(t) return function(t) {
					setTimeout(function() {
						t && t()
					})
				};
				var e = void 0,
					n = void 0,
					a = 0,
					i = navigator.userAgent,
					o = 0,
					r = this;
				return window.webkitRequestAnimationFrame && (n = function(t) {
					void 0 === t && (t = +new Date), r.callback(t)
				}, e = window.webkitRequestAnimationFrame, window.webkitRequestAnimationFrame = function(t, a) {
					r.callback = t, e(n, a)
				}), window.mozRequestAnimationFrame && (o = i.indexOf("rv:"), i.indexOf("Gecko") != -1 && (a = i.substr(o + 3, 3), "2.0" === a && (window.mozRequestAnimationFrame = void 0))), window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
					var n, a;
					window.setTimeout(function() {
						n = +new Date, t(n), a = +new Date, r.timeout = 1e3 / 60 - (a - n)
					}, r.timeout)
				}
			}()
		}
		return e(), n(), t
	}(), kgHome2017005LibAplus = function(t) {
		var e = node.all,
			n = util,
			a = "//g.alicdn.com/??secdev/entry/index.js,alilog/oneplus/entry.js";
		return n.load || (n.load = function(t) {
			"complete" == document.readyState ? t() : e(window).on("load", function() {
				t()
			})
		}), n.load(function() {
			setTimeout(function() {
				KISSY.getScript(a)
			}, 3e3)
		}), t
	}(), kgHome2017005LibFeature = function(t) {
		function e() {
			this._retina(), this._zoom(), this._webp(), this._env(), this.responsive()
		}
		var n = _ua_,
			a = node.all,
			i = dom,
			o = a("body"),
			r = util,
			s = aliSession,
			l = aliPatternLibEvent;
		return e.prototype = {
			_retina: function() {
				r.isHighDensity() ? s.set("retina", !0) : s.set("retina", !1)
			},
			_zoom: function() {
				var t = this;
				if("windows" === n.os || "macintosh" === n.os) {
					if(11 == n.ie || "edge" == n.core) return;
					try {
						var e = this._detectZoom();
						e > 0 && (e > 1.01 || e < .99) && this._responsive(e), setInterval(function() {
							var e = t._detectZoom();
							t._responsive(e)
						}, 1500)
					} catch(a) {}
				}
			},
			_detectZoom: function() {
				function t(t, e) {
					var n = Math.pow(10, e);
					return Math.round(t * n) / n
				}
				var e = 1,
					n = window.devicePixelRatio;
				return n && n < 1 && n > 0 ? e = n : isNaN(screen.deviceXDPI) || isNaN(screen.logicalXDPI) ? window.outerWidth > 0 && window.innerWidth > 0 && (e = window.outerWidth / window.innerWidth) : e = screen.deviceXDPI / screen.logicalXDPI, t(e, 1)
			},
			_responsive: function(t) {
				t > 0 && t < .99 ? o.addClass("tb-zoom") : o.removeClass("tb-zoom")
			},
			_webp: function() {
				this._supportWebp(function(t) {
					t ? s.set("webp", !0) : s.set("webp", !1)
				})
			},
			_supportWebp: function(t) {
				var e = new Image;
				e.onload = e.onerror = function() {
					t(2 === e.width && 2 === e.height)
				}, e.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
			},
			_env: function() {
				var t = a("#J_TBBucket"),
					e = t.attr("data-container"),
					n = a("#J_TBBucket").attr("data-version"),
					i = t.val();
				s.set("bucket", i), s.set("tbVersion", n), e && s.set("env", e)
			},
			responsive: function() {
				var t = a(window);
				t.on("resize", function() {
					var t = a("body"),
						e = i.viewportWidth();
					r.each([990, 1024, 1190, 1270, 1365, 1440], function(n) {
						e <= n ? t.addClass("s" + n) : t.removeClass("s" + n)
					}), l.broadcast("window:responsive", {
						wide: e > 1190
					})
				}), t.fire("resize")
			}
		}, t = e
	}(), kgHome2017005LibTanx = function(t) {
		var e = aliPatternLibReporter,
			n = node,
			a = n.all,
			i = function(t, n, i) {
				t = a(t);
				var o = this.el = t.hasClass("J_Tanx") ? t : t.one(".J_Tanx");
				return o ? (this.isOPE = 1 == o.attr("data-isope"), this.pid = o.attr("data-id"), this.isCorner = t.hasClass("J_TanxCorner"), this.autoLazy = 1 == o.attr("data-autolazy"), this.cb = n || function() {}, void this.init(i)) : void e({
					category: "ERROR_Tanx_notFound_Hook",
					msg: "Tanx\u5e7f\u544a\u6ca1\u6709\u627e\u5230\u94a9\u5b50"
				})
			};
		i.prototype.init = function(t) {
			if(this.isCorner) return void this.loadCorner();
			if(this.autoLazy) {
				var e = this.el.parent("div"),
					n = e && (e.offset().top - Number(this.el.attr("data-ahead")) || 0);
				return void this.lazyLoad({
					pid: this.pid,
					isope: this.isOPE,
					top: n
				})
			}
			this.load(this.pid, this.isOPE, t)
		};
		var o = !1;
		return i.prototype.loadCorner = function() {
			var t = this;
			if(!((window.innerWidth || document.documentElement.clientWidth + 21) < 1366 || o)) {
				o = !0;
				var n = "//p.tanx.com/ex?i=",
					i = KISSY.map(a(".J_TanxCorner"), function(t) {
						return a(t).one(".J_Tanx").attr("id").split("-")[2]
					}),
					r = Math.floor(Math.random() * i.length);
				KISSY.getScript(n + i[r], {
					error: function() {
						e({
							category: "ERROR_Tanx-script-crash",
							msg: "Tanx \u5e7f\u544a\u521d\u59cb\u5316\u811a\u672c\u52a0\u8f7d\u5931\u8d25\uff01 " + i[r]
						}, "warn"), t.cb()
					}
				})
			}
		}, i.prototype.load = function(t, n, i) {
			function o() {
				e({
					category: "ERROR_Tanx-notFound-hook",
					msg: "Tanx \u6ca1\u6709\u627e\u5230 id \u4e3a " + t + " \u7684 hook\uff01",
					sampling: 1
				}, "warn")
			}
			var r = window,
				s = {
					i: t,
					sd: "ecpm.tanx.com"
				};
			if(t) {
				if(n && (s.sd = ("https:" === location.protocol ? "opehs" : "ope") + ".tanx.com"), r.tanxssp_show) return void r.tanxssp_show(s);
				if(r.tanx_ssp_onload = r.tanx_ssp_onload || [], r.tanx_ssp_onload.push(s), this.cb(), i) {
					if(!a(".tanx-a-" + t).length) return void o()
				} else if(!a("#tanx-a-" + t).length) return void o();
				var l = "//g.alicdn.com/mm/tanx-cdn/t/tanxssp.js?v=2";
				KISSY.getScript(l, {
					charset: "gbk",
					error: function() {
						"function" != typeof window.tanxssp_show && e({
							category: "ERROR_Tanx-script-crash",
							msg: "Tanx \u5e7f\u544a\u521d\u59cb\u5316\u811a\u672c\u52a0\u8f7d\u5931\u8d25\uff01 " + t
						}, "warn")
					},
					success: function() {
						e({
							msg: "[Tanx] " + t
						})
					}
				})
			}
		}, i.prototype.lazyLoad = function(t) {
			function n() {
				var a = o.height() + o.scrollTop();
				t.top <= a && "1" != i.el.attr("loaded") && (e({
					msg: "[Lazyload Tanx] " + t.pid
				}), i.el.attr("loaded", "1"), i.load(t.pid, t.isope), o.detach("scroll resize", n))
			}
			var i = this,
				o = a(window);
			o.on("scroll resize", n), n()
		}, t = i
	}(), kgHome2017005CQrIndex = function(t) {
		var e = node,
			n = e.all,
			a = aliPatternLibImage,
			i = function(t) {
				this.el = t;
				var e = n(".qrcode", this.el),
					i = e.attr("data-src"),
					i = a.getImageAndCache(i, {
						webp: !0
					});
				e.attr("src", i), this.el.delegate("click", ".J_QrFt", function() {
					this.el.hide()
				}, this)
			};
		return t = i
	}(), kgHome2017005CServiceCatjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) _.each(data, function(t, e) {
				if(__p += "\n  ", e < 3) {
					__p += '\n  <div class="service-panel">\n    <h5>\n      ';
					var n = t.head && t.head[0];
					__p += '\n      <a href="' + __e(n.link) + '">' + (null == (__t = n.name) ? "" : __t) + '</a>\n      <a href="' + __e(n.more) + '">\n        <span>\u66f4\u591a <i class="tb-ifont">&#xe62e;</i></span>\n      </a>\n    </h5>\n    <p>\n      ', _.each(t.list, function(t, e) {
						__p += "\n        ";
						var n = _.isTrue(t.h);
						__p += '\n        <a href="' + __e(t.link) + '" ', n && (__p += 'class="h" '), __p += ">" + (null == (__t = t.name) ? "" : __t) + "</a>\n      "
					}), __p += "\n    </p>\n  </div>\n  "
				}
				__p += "\n"
			}), __p += "\n\n";
			return __p
		}
	}(), kgHome2017005CServiceItemjsthtml = function(exports) {
		return exports = function(obj) {
			obj || (obj = {});
			var __t, __p = "";
			with(obj) __p += '<div class="service-float-item clearfix" data-index="' + (null == (__t = data.index) ? "" : __t) + '">\n  <div class="service-fi-links loading" data-spm-ab="links-' + (null == (__t = data.index) ? "" : __t) + '"></div>\n  <div class="service-rmd">\n    <h3>\u731c\u4f60\u559c\u6b22</h3>\n    <div class="service-rmd-list loading clearfix" data-spm-ab="rmds-' + (null == (__t = data.index) ? "" : __t) + '"></div>\n  </div>\n</div>\n';
			return __p
		}
	}(), kgHome2017005CServiceBannerjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) _.each(data.recItemList, function(t, e) {
				__p += "\n  ", e < 6 && (__p += '\n  <a href="' + __e(t.url || t.link) + '" class="fl">\n    <div class="img-wrapper">\n      <img src="' + __e($runtime.image(t.pic || t.img, "110x110", "200x200", "q90", !0)) + '" alt="' + (null == (__t = t.itemName || t.title) ? "" : __t) + '"/>\n    </div>\n    <h5>\n      ', t.dacuIcon && (__p += '\n      <span class="dacu-icon ' + (null == (__t = t.dacuIcon) ? "" : __t) + '"></span>\n      '), __p += '\n      <span class="li-name a-all">' + (null == (__t = t.itemName || t.title) ? "" : __t) + "</span>\n    </h5>\n  </a>\n  "), __p += "\n"
			}), __p += "\n\n";
			return __p
		}
	}(), kgHome2017005LibAld = function(t) {
		function e(t) {
			return _[t] ? l.resolve(_[t]) : m ? new l(function(e, n) {
				h.push({
					id: t,
					resolve: e,
					reject: n
				})
			}) : (m = !0, s.jsonp({
				url: "//ald.taobao.com/recommend2.htm",
				data: {
					appId: i()
				},
				timeout: 4
			}).then(function(e) {
				_ = e || {}, m = !1, a(e);
				var i = n(e, t);
				if(i) return i
			}, function(t) {
				m = !1, a()
			}))
		}

		function n(t, e) {
			if(t && t[e] && t[e].data && t[e].data.length > 0) return t[e]
		}

		function a(t) {
			d.each(h, function(e) {
				var a = n(t, e.id);
				a ? e.resolve(a) : e.reject("empty")
			})
		}

		function i() {
			var t = [];
			return d.each(u(".J_Ald"), function(e) {
				var n = u(e),
					a = n.attr("data-id");
				d.inArray(t, a) || t.push(a)
			}), t.join(",")
		}

		function o(t, e) {
			var n = e || u(".J_Ald_" + t),
				a = u("img", n);
			n.addClass("mod-loaded"), n.css("visibility", "visible"), d.each(a, function(t) {
				var e = u(t),
					n = e.attr("data-src");
				n = c.getNewUrl(n, {
					webp: !0
				}), e.attr("src", n)
			})
		}

		function r(t, e, n, a) {
			var i = "";
			n = n || "";
			for(var o = a || u(".J_Ald_" + t), r = 0, s = e.length; r < s; r++) {
				var l = e[r];
				if(l.exposureParam && l.nickNameStrategy) {
					var d = new Image;
					d.src = l.exposureParam, d.onerror = function() {
						return !1
					}
				}
				var h = l.href || l.link || l.url || l.action,
					m = l.img || l.content || l.imgUrl,
					_ = l.text || "",
					p = {};
				!n && a && (p.webp = !0), m = c.getNewUrl(m, p), i += '<a href="' + h + '" data-spm="d' + (r + 1) + '"><img src="' + (m + n) + '" alt="' + _ + '" /></a>'
			}
			o.html(i), o.css("visibility", "visible")
		}
		var s = aliPatternLibIo,
			l = promise,
			c = aliPatternLibImage,
			d = util,
			u = node.all,
			h = [],
			m = !1,
			_ = {};
		return t = {
			loader: e,
			loadTms: o,
			render: r
		}
	}(), kgHome2017005CTmallIndex = function(t) {
		function e(t) {
			this.el = t, this.optEl = this.el.all(".J_TmallOpt"), this.retina = !!c.get("retina"), this.webp = !!c.get("webp"), e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = kgHome2017005LibTanx,
			i = kgHome2017005LibAld,
			o = node,
			r = aliSlide,
			s = util,
			l = aliPatternLibImage,
			c = aliSession,
			d = o.all;
		return n.extend(e, {
			init: function() {
				this.collectData(), this.initSlider(), this.bind(), this._getLogo(), d(".tmall-bd", this.el).removeClass("tb-loading")
			},
			bind: function() {
				this.el.delegate("click", ".J_Prev", this._prev, this), this.el.delegate("click", ".J_Next", this._next, this)
			},
			initSlider: function() {
				var t = this;
				this.slide = new r(this.el, {
					contentClass: "tmall-bd",
					pannelClass: "mod",
					navClass: "tmall-nav",
					effect: "hSlide",
					timeout: 5e3,
					carousel: !0,
					autoSlide: !0,
					touchmove: !0
				}), this.el.on("mouseenter", function() {
					t.optEl.show()
				}), this.el.on("mouseleave", function() {
					t.optEl.hide()
				}), this.slide.on("beforeSwitch", function(e) {
					var n = e.pannelnode,
						a = e.index;
					7 == a && (a = 1), 0 == a && (a = 6), d(".tmall-hd i", t.el).text(a), t.store[a] || (n.hasClass("J_TanxWrapper") ? (t.loadTanx(n, a - 1), t._godlog(a)) : t.loadContent(n, a - 1))
				});
				try {
					var e = this.slide.pannels.item(1)
				} catch(n) {
					this.reportError({
						extra: "\u521d\u59cb\u5316\u5f02\u5e38\uff0c\u8be6\u60c5\uff1a" + n.message
					})
				}
				this.loadContent(e, 0)
			},
			_prev: function(t) {
				t.preventDefault(), this.slide.previous()
			},
			_next: function(t) {
				t.preventDefault(), this.slide.next()
			},
			renderTanx: function() {
				this.el.all(".J_Tanx").each(function(t) {
					var e = d(t),
						n = Number(e.attr("data-lazychance"));
					n = isNaN(n) ? 1 : n;
					var i = Math.random() >= n;
					i && (new a(e), e.removeClass("J_Tanx"))
				})
			},
			loadContent: function(t, e) {
				var n = this;
				if(t.addClass("mod-loaded"), this._godlog(e + 1), t.hasClass("J_Ald")) {
					t.removeClass("J_Ald");
					var a = t.attr("data-id");
					this.load(t, e, a).then(function() {
						var t = n._getBgs(e);
						t && d(".J_Ald_" + a).each(function(e) {
							n._bg(d(e), t)
						})
					})["catch"](function(t) {
						n.reportError({
							extra: t && t.message
						})
					}), this.store[e + 1] = !0
				}
			},
			load: function(t, e, n) {
				var a = this,
					o = this.banners[e],
					r = o && o.share,
					l = o && o.local,
					c = this.getSize(t),
					d = o && o.alds;
				if(d && d.length) var u = d.length;
				else switch(this.reportError({
					extra: JSON.stringify({
						data: this.banners,
						curIndex: e
					})
				}), e) {
					case 0:
						u = 5;
						break;
					case 1:
					case 2:
						u = 4;
						break;
					case 3:
						u = 12;
						break;
					case 4:
						u = 2
				}
				var u = o.alds.length;
				r = s.isTrue(r), l = s.isTrue(l);
				var h = r ? t : null;
				return i.loader(n).then(function(t) {
					var s = t && t.data;
					if(s)
						if(l) i.render(n, d, c, h);
						else if(r && 0 !== e) {
						var m = parseInt(o.start, 10) || 0,
							_ = parseInt(o.len, 10) || u,
							p = s.slice(m, m + _),
							f = !1;
						p && p.length === _ || (a.reportBackup({
							extra: "Ald \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\uff1a" + n + ["\u5f00\u59cb\u4f4d\u7f6e\uff1a", m, " \u957f\u5ea6\u4e3a\uff1a", _, "\u5b9e\u9645\u8fd4\u56de\u957f\u5ea6\uff1a", p.length].join(" ")
						}), p = d, f = !0), i.render(n, p, c, h)
					} else s.length < u && (a.reportBackup({
						extra: "Ald \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\uff1a" + n + ["\u957f\u5ea6\u4e3a\uff1a", _, "\u5b9e\u9645\u8fd4\u56de\u957f\u5ea6\uff1a", s.length].join(" ")
					}), s = d), i.render(n, s, c, h);
					else i.render(n, d, c, h), a.reportBackup({
						extra: "Ald \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\uff1a" + n
					})
				})["catch"](function(t) {
					i.render(n, d, c, h), a.reportBackup({
						extra: "Ald \u5e7f\u544a\u52a0\u8f7d\u5931\u8d25\uff1a" + n + "\uff0c\u8be6\u60c5 " + (t && t.message)
					})
				})
			},
			_bg: function(t, e) {
				t.attr("data-open") && d("a", t).each(function(t, n) {
					if(t = d(t), e[n]) {
						var a = e[n].bg,
							i = e[n].bg2;
						a && (t.css({
							background: "url(" + a + ") 0 0 no-repeat"
						}), i && t.css("background-image", "-webkit-image-set(url(" + a + ") 1x,url(" + i + ") 2x)"))
					}
				})
			},
			_getBgs: function(t) {
				var e = [],
					n = this.banners[t],
					a = n && n.open;
				if(a = s.isTrue(a)) return s.each(n.alds, function(t) {
					e.push({
						bg: t.bg,
						bg2: t.bg2
					})
				}), e
			},
			loadTanx: function(t, e) {
				var n = this,
					i = t.all(".J_Tanx");
				if(1 === i.length) {
					new a(i.item(0));
					var o = i[0].id;
					this.subscribe("alimama:tanx", function(i) {
						if(i.hook === "#" + o) {
							var r = "",
								l = n.banners[e] && n.banners[e].tanxs;
							s.each(l, function(t) {
								r += '<a class="J_Tanx hide" id="tanx-a-' + t.id + '" data-id="' + t.id + '"></a>'
							}), t.html(r), t.addClass("column-2");
							var c = t.all(".J_Tanx");
							new a(c.item(0)), new a(c.item(1))
						}
					})
				} else if(i.each(function(t) {
						new a(t, function() {}, (!0))
					}), 5 === e) {
					var r, l = !1,
						c = function u() {
							if(!l) {
								var e = d(".tanx-wrapper", this.el);
								if(e.all("img").length) {
									var n = e.html();
									t.html(n).removeClass("J_TanxWrapper"), l = !0
								} else r = setTimeout(u, 50)
							}
						};
					c()
				}
			},
			getSize: function(t) {
				var e = "_240x240.jpg";
				return t.hasClass("mod-5") ? e = this.retina ? "_350x1000q90.jpg" : "_210x1000q90.jpg" : t.hasClass("mod-6") ? e = this.retina ? "_350x350q90.jpg" : "_190x190q90.jpg" : t.hasClass("mod-4") && (e = this.retina ? "_350x350q90.jpg" : "_200x200q90.jpg"), t.hasClass("mod-12") ? e = this.retina ? "_170x170q90.jpg" : "_90x90q90.jpg" : t.hasClass("mod-2") && (e = this.retina ? "_400x400q90.jpg" : "_240x240q90.jpg"), this.webp && this.retina && (e += "_.webp"), e
			},
			collectData: function() {
				var t = d("textarea", this.el).val();
				try {
					this.banners = JSON.parse(t), s.each(this.banners, function(t, e) {
						t && t.alds && 12 === t.alds.length && s.each(t.alds, function(t) {
							t.link.indexOf("//") === -1 && (t.link = "//" + t.link + ".tmall.com/")
						})
					})
				} catch(e) {
					this.reportError({
						extra: e && e.message
					})
				}
			},
			_godlog: function(t) {
				this.expouse[t] || (this.expouse[t] = !0, this.godlog("/tbindex.2016201863.1", "", {
					frame: t
				}, "H47671113", "tmall frame " + t + " expouse"))
			},
			_getLogo: function() {
				var t = d(".hd-bg", this.el),
					e = !!t.attr("data-bg"),
					n = "//img.alicdn.com/tfs/TB1thpcbUgQMeJjy0FjXXaExFXa-122-22.png",
					a = "//img.alicdn.com/tfs/TB1hjDKX6ihSKJjy0FiXXcuiFXa-244-44.png";
				if(!e) {
					var i = c.get("retina") ? a : n,
						i = l.getImageAndCache(i);
					t.css({
						"background-image": "url(" + i + ")"
					})
				}
			},
			defaults: function() {
				return {
					expouse: {},
					store: {},
					name: "tbh-tmall",
					category: "ERROR_ALD_Load_Crash"
				}
			}
		}), t = e
	}(), kgHome2017005CConveLayoutjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<div class="conve-bd-box" tabindex="-1">\n  <a href="javascript:;" target="_self" class="conve-bd-box-close J_conveClose tb-ifont" data-spm-click="gostr=/tbindex;locaid=d1;name=\u5173\u95ed\u4fbf\u6c11\u670d\u52a1\u6d6e\u5c42" aira-label="\u5173\u95ed\u6d6e\u5c42">&#xe613;</a>\n  ', _.each(data.names, function(t, e) {
				__p += '\n  <div class="conve-bd-item J_Conve_' + (null == (__t = t) ? "" : __t) + ' loading">\n    <div class="conve-bd-loading"></div>\n  </div>\n  '
			}), __p += "\n</div>";
			return __p
		}
	}(), kgHome2017005CFocusItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<a href="' + (null == (__t = data.targetUrl) ? "" : __t) + '" ', data.spm && (__p += 'data-spm-ab="' + (null == (__t = data.spm) ? "" : __t) + '"'), __p += '>\n  <img src="' + (null == (__t = data.imgUrl) ? "" : __t) + '" alt="' + (null == (__t = data.name || "\u7126\u70b9\u56fe") ? "" : __t) + '">\n</a>';
			return __p
		}
	}(), kgHome2017005CNavIndex = function(t) {
		function e(t, n) {
			this.el = a(t), this.conf = n, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = node.all,
			i = util,
			o = _url_;
		return n.extend(e, {
			init: function() {
				if(this.el.hasClass("nav11")) {
					try {
						var t = (o.parse(location.href, !0).query || {}).scheduleDate;
						if(t) {
							t = t.indexOf("-") !== -1 ? new Date(t).getTime() : parseInt(t);
							var e = new Date(2017, 10, 1, 0, 0, 0).getTime();
							t && i.now() < e && (isNaN(t) || (this.mockTime = t))
						}
					} catch(n) {}
					this.countdown()
				}
			},
			countdown: function(t) {
				var e = this,
					n = this.getStatus(t);
				if(n) {
					if(!this.countdownEl) {
						var i = '<div class="countdown-wrapper fl"><span class="countdown-inner"></span><span class="bar"></span><span class="lave"></span></div>';
						a(".nav", this.el).append(i), this.countdownEl = a(".countdown-inner", this.el)
					}
					this.countdownEl.html(n.msg), this.lastStatus ? this.lastStatus.center !== n.center && (n.center ? this.countdownEl.addClass("center") : this.countdownEl.removeClass("center")) : n.center ? this.countdownEl.addClass("center") : this.countdownEl.removeClass("center"), this.lastStatus = n
				} else a(".countdown-wrapper", this.el).remove();
				setTimeout(function() {
					e.mockTime && (e.mockTime += 1e3), e.countdown()
				}, 1e3)
			},
			getStatus: function(t) {
				function e(t, e, n, a, i, o) {
					return new Date(t, e, n, a, i, o).getTime()
				}

				function n(t) {
					return t < 10 ? "0" + t : "" + t
				}

				function a(t) {
					var e = t.split("");
					return i.substitute('<span class="bg">{decade}</span><span class="bg unit">{unit}</span>', {
						decade: e[0],
						unit: e[1]
					})
				}
				var o = this.getTime();
				this.time || (this.time = {
					longBefore: e(2017, 10, 1, 0, 0, 0),
					dayBefore: e(2017, 10, 10, 0, 0, 0),
					readyStart: e(2017, 10, 10, 23, 50, 0),
					start: e(2017, 10, 11, 0, 0, 0),
					readyEnd: e(2017, 10, 11, 23, 50, 0),
					end: e(2017, 10, 11, 23, 59, 59)
				});
				var r = this.time;
				if(!(o < r.longBefore)) {
					if(o >= r.longBefore && o < r.dayBefore) {
						var s = (r.dayBefore - o) / 864e5;
						return s = Math.ceil(s), s = n(s + 1), {
							msg: '\u8ddd\u53cc11\u5f00\u5e55\u5269<span class="countdown">' + a(s) + "</span>\u5929",
							center: !1
						}
					}
					if(o >= r.dayBefore && o < r.readyStart) {
						var l = r.start - o,
							c = Math.floor(l / 1e3),
							d = parseInt(c / 3600, 10) % 24,
							u = parseInt(c / 60, 10) % 60,
							h = parseInt(c % 60, 10);
						return d = n(d), u = n(u), h = n(h), {
							msg: ['\u8ddd\u53cc11\u5269<span class="countdown">', a(d), ":", a(u), ":", a(h), "</span>"].join(""),
							center: !1
						}
					}
					if(o >= r.readyStart && o < r.start) return {
						msg: "\u53cc11\u5373\u5c06\u5f00\u59cb",
						center: !0
					};
					if(o >= r.start && o < r.readyEnd) {
						var l = r.end - o,
							c = Math.floor(l / 1e3),
							d = parseInt(c / 3600, 10) % 24,
							u = parseInt(c / 60, 10) % 60,
							h = parseInt(c % 60, 10);
						return d = n(d), u = n(u), h = n(h), {
							msg: ['\u8ddd\u7ed3\u675f\u5269<span class="countdown">', a(d), ":", a(u), ":", a(h), "</span>"].join(""),
							center: !1
						}
					}
					return o >= r.readyEnd && o < r.end ? {
						msg: "\u53cc11\u5373\u5c06\u7ed3\u675f",
						center: !0
					} : void 0
				}
			},
			getTime: function() {
				return this.mockTime ? this.mockTime : i.now()
			},
			defaults: function() {
				return {
					name: "nav"
				}
			}
		}), t = e
	}(), kgHome2017005CBeltItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) _.each(data, function(t, e) {
				if(__p += "\n", e < 6) {
					__p += '\n<li class="' + (null == (__t = 5 === e ? "last" : "") ? "" : __t) + '">\n  <a href="' + __e(t.link || t.clickUrl) + '" class="clearfix" role="listitem" aria-posinset="' + (null == (__t = e) ? "" : __t) + '" aria-setsize="' + (null == (__t = data.length) ? "" : __t) + '" >\n    <img class="a-all" src="' + __e($runtime.image(t.img || t.picUrl, "80x80", "160x160", "q90", !0)) + '" aria-labelledby="belt-item-tl-' + (null == (__t = e) ? "" : __t) + '"/>\n    <div class="right">\n      <h4 id="belt-item-tl-' + (null == (__t = e) ? "" : __t) + '">' + (null == (__t = t.type || t.title) ? "" : __t) + '</h4>\n      <p class="subtitle">' + (null == (__t = t.info || t.subtitle) ? "" : __t) + '</p>\n      <p class="extra">\n      ';
					var n = t.gNum || t.pop;
					__p += "\n      ", n = n ? '<i class="tb-ifont">&#xe618;</i>\u4eba\u6c14' + n : "\u6700\u65b0\u53d1\u73b0", __p += "\n      " + (null == (__t = n) ? "" : __t) + "\n      </p>\n    </div>\n  </a>\n</li>\n"
				}
				__p += "\n"
			}), __p += "\n\n    ";
			return __p
		}
	}(), kgHome2017005CAppItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) {
				var head = data.head && data.head[0];
				__p += "\n<h3>\n  ", __p += head.link ? '\n    <a href="' + __e(head.link) + '">' + (null == (__t = head.name) ? "" : __t) + "</a>\n  " : "\n    " + (null == (__t = head.name) ? "" : __t) + " \n  ", __p += '\n  <a class="more" href="' + __e(head.more) + '">\u66f4\u591a <i class="tb-ifont">&#xe62e;</i></a>\n</h3>\n\n<ul class="apps-nav clearfix">\n  ', _.each(data.apps, function(t, e) {
					__p += "\n  ", e <= 9 && (__p += '\n  <li class="nav" data-spm-ab="apps-' + (null == (__t = t.spm) ? "" : __t) + '">\n    <a href="' + (null == (__t = t.link ? t.link : "javascript:;") ? "" : __t) + '" ', "1" === t.log && (__p += "onclick=\"javascript:goldlog.record('/" + (null == (__t = t.logkey) ? "" : __t) + "','','','" + (null == (__t = t.gokey) ? "" : __t) + "')\" "), __p += '>\n      <img src="' + __e(t.img) + '" alt="\u624b\u673aapp - ' + (null == (__t = t.name) ? "" : __t) + '" class="app-icon" />\n    </a>\n    <div class="app-qr">\n      <img class="J_QRCode" data-src="' + (null == (__t = t.qr) ? "" : __t) + '_80x80.jpg" src="//g.alicdn.com/s.gif" alt="\u4f7f\u7528\u624b\u673a\u626b\u63cf' + (null == (__t = t.name) ? "" : __t) + '\u7684\u4e8c\u7ef4\u7801" />\n      <p>\u626b\u4e00\u626b' + (null == (__t = t.name) ? "" : __t) + "</p>\n    </div>\n  </li>\n   "), __p += "\n  "
				}), __p += "\n</ul>"
			}
			return __p
		}
	}(), kgHome2017005CMemberLoginjsthtml = function(exports) {
		return exports = function(obj) {
			obj || (obj = {});
			var __t, __p = "";
			with(obj) __p += '<div class="member-column-4">\n  <a href="//buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?action=itemlist/BoughtQueryAction&event_submit_do_query=1&tabCode=waitConfirm">\n    <strong>' + (null == (__t = data.a) ? "" : __t) + '</strong>\u5f85\u6536\u8d27\n  </a>\n  <a href="//buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?action=itemlist/BoughtQueryAction&event_submit_do_query=1&tabCode=waitSend">\n    <strong>' + (null == (__t = data.d) ? "" : __t) + '</strong>\u5f85\u53d1\u8d27\n  </a>\n  <a href="//buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?action=itemlist/BoughtQueryAction&event_submit_do_query=1&tabCode=waitPay">\n   <strong>' + (null == (__t = data.b) ? "" : __t) + '</strong>\u5f85\u4ed8\u6b3e\n  </a>\n  <a href="//buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?action=itemlist/BoughtQueryAction&event_submit_do_query=1&tabCode=waitRate">\n    <strong>' + (null == (__t = data.c) ? "" : __t) + "</strong>\u5f85\u8bc4\u4ef7\n  </a>\n</div>";
			return __p
		}
	}(), kgHome2017005CNoticeIndex = function(t) {
		function e(t) {
			this.el = t, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = node,
			i = aliSlide,
			o = a.all,
			r = util,
			s = promise;
		return n.extend(e, {
			init: function() {
				this.bind()
			},
			bind: function() {
				var t = this;
				r.load(function() {
					t._godlog("\u516c\u544a")
				}), this.el.delegate("mouseenter", ".J_Enter", function e(t) {
					var n = o(t.currentTarget),
						a = n.index(),
						s = this;
					this.slide = new i(this.el, {
						contentClass: "notice-bd",
						pannelClass: "mod",
						navClass: "notice-hd",
						eventType: "mouseenter",
						defaultTab: a + 1
					}), this._show(r.trim(n.text()), a), this.el.undelegate("mouseenter", ".J_Enter", e, this), this.slide.on("beforeSwitch", function(t) {
						var e = o(t.navnode).text();
						s._show(e, t.index)
					})
				}, this)
			},
			_show: function(t, e) {
				this.store[t] || 0 === e || (this._render(e, this.slide.pannels.item(e)), this._godlog(t))
			},
			_render: function(t, e) {
				var n = this;
				this.getList(t).then(function(t) {
					var n = [];
					t && (r.each(t.items, function(t) {
						t.enhance = t.enhance === !0 || "true" === t.enhance, t.enhance = t.enhance ? "h" : "", n.push(r.substitute('<li><a href="{link}" class="{enhance}">{text}</a></li>', t))
					}), o(e).html(n.join("")))
				})["catch"](function(t) {
					n.reportError({
						extra: {
							message: t && t.message,
							type: "render"
						}
					})
				})
			},
			getList: function(t) {
				var e = this;
				return this.category ? s.resolve(this.category[t]) : this.jsonp({
					url: this.url,
					cache: !0,
					data: {
						ids: this.ids
					},
					jsonpCallback: "tbhome_" + this.ids
				}).then(function(n) {
					var a = e.getVal(n, t);
					return a ? a : e.backup(t, "empty")
				}, function(n) {
					return e.backup(t, n && n.message)
				})["catch"](function(t) {
					e.reportError({
						extra: t && t.message
					})
				})
			},
			backup: function(t, e) {
				var n = this;
				return this.tarzan({
					url: this.url,
					data: {
						ids: this.ids
					}
				}).then(function(a) {
					var i = n.getVal(a, t);
					if(i) return n.reportCDN({
						extra: e
					}), i;
					throw new Error("cdn empty")
				})
			},
			getVal: function(t, e) {
				var n = t && t[this.ids] && t[this.ids].value;
				if(n && n.category) return this.category = n.category, this.category[e]
			},
			_godlog: function(t) {
				this.store[t] || (this.store[t] = !0, this.godlog("/tbindex.2016092702.notice", "EXP", {
					name: t
				}, "H1482418995", "\u516c\u544a\u66dd\u5149\uff1a" + t))
			},
			defaults: function() {
				return {
					store: {},
					name: "tbh-notice",
					url: "//tce.alicdn.com/api/data.htm",
					ids: "617432"
				}
			}
		}), t = e
	}(), kgHome2017005CHeadlineItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) __p += '<h3 class="headline-hd mod-hd">\n  <em>\u6dd8\u5b9d\u5934\u6761</em>\n  <p>\n    ', data.hd.qrcode && (__p += '\n    <span class="qr-wrapper">\n      <span class="tb-ifont tb-qr">&#xe610;</span>\n      <span class="a-all">\n        <img src="' + (null == (__t = data.hd.qrcode) ? "" : __t) + '" alt="">\n        <em>\u624b\u673a\u6dd8\u5b9d\u626b\u7801</em>\n      </span>\n    </span>\n    '), __p += '\n    <span class="subtitle">\u8ba9\u4f60\u7684\u751f\u6d3b\u66f4\u6709\u8da3</span>\n  </p>\n</h3>\n', data.hd.more && (__p += '\n<a class="more" href="' + (null == (__t = data.hd.more) ? "" : __t) + '">\u66f4\u591a <i class="tb-ifont">&#xe62e;</i></a>\n'), __p += '\n<div class="headline-bd" role="list">\n  ', _.each(data.list, function(t, e) {
				__p += '\n  <div class="mod ', 0 !== e && (__p += "hide"), __p += '" role="listitem">\n    <a href="' + __e(t.link || t.url) + '">\n      <img class="a-opacity" src="' + (null == (__t = $runtime.image(t.img || t.pic, "120x120", "250x250", "q90", !0)) ? "" : __t) + '" alt="\u65b0\u95fb\u56fe\u7247"/>\n      <h4>' + __e(t.title || t.name) + "</h4>\n      <p>" + __e(t.detail || t.dec) + "</p>\n    </a>\n  </div>\n  "
			}), __p += "\n</div>";
			return __p
		}
	}(), kgHome2017005CDecorationsItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__e = _.escape,
				__j = Array.prototype.join;
			with(obj) __p += '<div class="decorations-item" style="background:url(' + __e(data.img) + ") no-repeat;width:" + (null == (__t = data.width) ? "" : __t) + "px;height:" + (null == (__t = data.height) ? "" : __t) + "px;z-index:3; ", data.top && (__p += " top: " + (null == (__t = data.top) ? "" : __t) + "px; "), __p += " ", data.left && (__p += "left: " + (null == (__t = data.left) ? "" : __t) + "px; "), __p += '">\n</div>\n\n';
			return __p
		}
	}(), kgHome2017005CTanxIndex = function(t) {
		var e = kgHome2017005LibTanx;
		return t = function(t) {
			new e(t)
		}
	}(), kgHome2017005CSearchSticky = function(t) {
		var e = _ua_,
			n = node,
			a = n.all,
			i = a(window),
			o = aliSession,
			r = function() {
				e.ie && e.ie <= 8 || this.init()
			};
		return r.prototype.init = function() {
			var t = "wrap-fixed",
				e = !1,
				n = !1,
				r = a("#J_SiteNav"),
				s = r.height(),
				l = a(".J_Cup"),
				c = a(".J_Top"),
				d = function() {
					var r = i.scrollTop(),
						d = l.offset().top;
					r > d + 100 ? (e || (e = !0, l.addClass(t), window.TB.isFixed && c.animate({
						top: s
					}, {
						duration: .2,
						easing: "easeOut"
					})), !n && o.get("sugEl") && (n = !0, o.get("sugEl").css({
						position: "fixed",
						top: window.TB.isFixed ? s + 39 : 39
					})), a("#J_SearchFt").hide()) : (e && (e = !1, c.css("top", 0), l.removeClass(t)), n && o.get("sugEl") && (n = !1, o.get("sugEl").css({
						position: "absolute",
						top: d + 91
					})), a("#J_SearchFt").show(), a("#J_SearchIcon").show())
				};
			d(), i.on("scroll", d)
		}, t = r
	}(), kgHome2017005CSearchTmalljsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<div class="search-hots">\n  ', _.each(data.list, function(t, e) {
				__p += '\n  <a href="http://list.tmall.com/search_product.htm?sourceId=tb.index&commend=all&q=' + (null == (__t = t.query) ? "" : __t) + "&from=tbmain_1." + (null == (__t = e) ? "" : __t) + '_hq" ', t.highlight && (__p += ' class="h" '), __p += ">" + (null == (__t = t.query) ? "" : __t) + "</a>\n  "
			}), __p += "\n</div>";
			return __p
		}
	}(), kgHome2017005CSearchAlimamajsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) _.each(data, function(t) {
				__p += '\n<a href="' + (null == (__t = t.link) ? "" : __t) + '" ', t.highlight && (__p += ' class="h" '), __p += ">" + (null == (__t = t.query) ? "" : __t) + "</a>\n"
			}), __p += "\n";
			return __p
		}
	}(), kgHome2017005CCornerIndex = function(t) {
		function e(t) {
			function e(t) {
				a({
					category: "ERROR_Corner",
					msg: t || "\u811a\u672c\u8def\u5f84\u4e0d\u5b58\u5728"
				})
			}
			var n = i(".corner-inner", t);
			if(0 !== n.length) {
				var o = n.attr("data-path");
				return o ? void KISSY.use(o, function(t, e) {}, function(t) {
					e("\u811a\u672c\u52a0\u8f7d\u5931\u8d25" + t && t.message)
				}) : void e()
			}
		}
		var n = node,
			a = aliPatternLibReporter,
			i = n.all;
		return t = e
	}(), kgHome2017005CFixedtoolItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<span class="tb-ifont wangwang">&#xe605;</span>\n', _.each(data, function(t, e) {
				__p += "\n", t.clickme = _.isTrue(t.clickme), __p += '\n  <a href="' + (null == (__t = t.url ? t.url : 7 == e ? "http://report.12377.cn:13225/toreportinputNormal_anis.do?spm=a21bo.50862.1997523009.48.28689e73weBwJ0&file=toreportinputNormal_anis.do%E7%82%B9%E8%BF%9B%E5%8E%BB%E6%98%AF%E8%BF%99%E4%B8%AA%E7%BD%91%E5%9D%80" : "#") ? "" : __t) + '" class="a-all fixedtool-' + (null == (__t = t.index) ? "" : __t) + " " + (null == (__t = 0 === e ? "on" : "") ? "" : __t) + '" data-tool="' + (null == (__t = t.tool) ? "" : __t) + '" aria-hidden="true" data-spm-click="gostr=/tbindex;locaid=d' + (null == (__t = e + 1) ? "" : __t) + ";name=fixed-" + (null == (__t = e + 1) ? "" : __t) + '">' + (null == (__t = t.name) ? "" : __t), t.clickme && (__p += "<em></em> "), __p += "</a>\n"
			});
			return __p
		}
	}(), kgHome2017005CSuperbannerItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "");
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<a href="' + (null == (__t = data.venues.tmallUrl) ? "" : __t) + '" class="tmall11 fl">\n  <img src="' + (null == (__t = data.venues.tmall) ? "" : __t) + '" alt="\u5929\u732b\u53cc\u5341\u4e00">\n</a>\n<div class="list tmall-list fl">\n  ', _.each(data.tmallList, function(t, e) {
				__p += '\n    <a href="' + (null == (__t = t.link) ? "" : __t) + '" class="fl item-' + (null == (__t = e + 1) ? "" : __t) + '">\n      <div class="desc-wrapper">\n        <h4 class="title">' + (null == (__t = t.title) ? "" : __t) + '</h4>\n        <p class="subtitle">' + (null == (__t = t.subtitle) ? "" : __t) + '</p>\n      </div>\n      <div class="img-outer">\n        <img src="' + (null == (__t = $runtime.image(t.img, "80x80", "160x160", "q90", !0)) ? "" : __t) + '" alt="' + (null == (__t = t.title) ? "" : __t) + '">\n      </div>\n    </a>\n    '
			}), __p += '\n</div>\n<a href="' + (null == (__t = data.venues.taobaoUrl) ? "" : __t) + '" class="taobao11 fl">\n<img src="' + (null == (__t = data.venues.taobao) ? "" : __t) + '" alt="\u6dd8\u5b9d\u5609\u5e74\u534e">\n</a>\n<div class="taobao-list fl">\n  <a href="' + (null == (__t = data.taobaoList[0].link) ? "" : __t) + '" class="taobao-item fl">\n    <div class="desc-wrapper">\n      <p class="title">' + (null == (__t = data.taobaoList[0].title) ? "" : __t) + '</p>\n      <p class="subtitle">' + (null == (__t = data.taobaoList[0].subtitle) ? "" : __t) + '</p>\n    </div>\n    <img src="' + (null == (__t = $runtime.image(data.taobaoList[0].img, "70x70", "160x160", "q90", !0)) ? "" : __t) + '" alt="">\n  </a>\n</div>';
			return __p
		}
	}(), kgHome2017005LibLog = function(t) {
		function e() {
			r.load(function() {
				var t = o.get("tbVersion");
				KISSY.use("kg/home-2017/" + t + "/lib/monitor")
			}, 15e3), this.init()
		}
		var n = node,
			a = aliOffline,
			i = aliPatternLibReporter,
			o = aliSession,
			r = util,
			s = n.all,
			l = (new a, aliPattern);
		return l.extend(e, {
			init: function() {
				var t = this;
				r.load(function() {
					t.addClickTracker(), t.scrollPV(), t.modulePVDots()
				}), s(document).on("private:error", function(e) {
					var n = e && e.detail;
					n || (n = e && e.originalEvent && e.originalEvent.detail), n && "tanx" === n.source && t.broadcast("alimama:tanx", n);
					try {
						i({
							category: "ERROR_PRIVATE_ERROR",
							msg: JSON.stringify(e)
						}, "warn")
					} catch(a) {}
				})
			},
			modulePVDots: function() {
				var t = [];
				s("div[preload-distance]").each(function(e) {
					var n = s(e),
						a = n.offset().top;
					t.push({
						el: n,
						top: a
					})
				}), t = t.sort(function(t, e) {
					return t.top > e.top ? 1 : -1
				});
				var e, n = s(window);
				n.on("scroll", e = function() {
					var a = n.scrollTop() + n.height(),
						o = !0;
					r.each(t, function(t) {
						var e = t.el,
							n = t.top;
						if(t.loaded || (o = !1), a >= n && e.hasClass("tbh-loaded")) {
							t.loaded = !0;
							var r = (e.attr("tms") + "-" + (e.attr("tms-datakey") || ""), e.attr("data-name") || ""),
								s = e.one('a[href*="pvid"]'),
								l = s && s.attr("href"),
								c = l && l.match(/pvid=([^&$#]*)/);
							i({
								msg: "exposure log " + r + ": {tag}",
								goldlog: ["/tbindex.20160406.1", "", {
									name: r,
									pvid: c && c[1] || ""
								}, "H46985920"]
							})
						}
					}), o && n.detach("scroll", e)
				}), e()
			},
			scrollPV: function() {
				for(var t = [], e = s(window), n = [], a = 700, o = 350, l = 0; l < 30; l++) t.push(a + o * l);
				var c;
				e.on("scroll", c = function() {
					var a = e.scrollTop();
					r.each(t, function(t) {
						a >= t && !r.inArray(t, n) && (n.push(t), i({
							goldlog: ["/tbindex.2014.10", "", {
								top: t
							}, "H46896546"],
							msg: t + "px \u89e6\u53d1\u57cb\u70b9"
						}))
					}), t.length == n.length && e.detach("scroll", c)
				}), c()
			},
			addClickTracker: function() {
				function t(t, e, n, a) {
					var i, o = s(t);
					o && !o.attr("data-spm-click") && (e = e ? ";name=" + e : "", a = a || "/tbindex", n = n || "d2016", i = "gostr=" + a + ";locaid=" + n + e, o.attr("data-spm-click", i))
				}
				t(".J_Conve a[href*='zhaocaibao.alipay.com']", "\u8682\u8681\u91d1\u670d\u62db\u8d22\u5b9d\u9996\u9875"), t(".J_QrFt", "\u4e8c\u7ef4\u7801\u5173\u95ed\u6309\u94ae"), t(".J_PromoOpt .prev", "\u9996\u7126prev\u6309\u94ae", "d500"), t(".J_PromoOpt .next", "\u9996\u7126next\u6309\u94ae", "d600"), t(".J_TmallOpt .prev", "\u5929\u732bprev\u6309\u94ae", "d500"), t(".J_TmallOpt .next", "\u5929\u732bnext\u6309\u94ae", "d600")
			}
		}), t = e
	}(), kgHome2017005CommonHeadItemBarjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += "\n", data.itemLayer && (__p += '\n<div class="' + (null == (__t = data.classname) ? "" : __t) + '-inner">\n'), __p += '\n  <h3 class="' + (null == (__t = data.classname) ? "" : __t) + '-hd mod-hd bar-hd">\n    <em>' + (null == (__t = data.title) ? "" : __t) + "</em>\n    ", data.morelink && (__p += '\n    <span class="tb-fn clearfix">\n      <a class="more" href="' + (null == (__t = data.morelink) ? "" : __t) + '">\u66f4\u591a <i class="tb-ifont">&#xe62e;</i></a>\n    </span>\n    '), __p += '\n  </h3>\n  <div class="list clearfix"></div>\n  ', data.itemLayer || (__p += '\n  <div class="hotsale-ft">\n    <i class="hotsale-end">END</i>\n  </div>\n  '), __p += "\n\n", data.itemLayer && (__p += "\n</div>\n");
			return __p
		}
	}(), kgHome2017005CommonHeadItemjsthtml = function(exports) {
		return exports = function(obj) {
			function print() {
				__p += __j.call(arguments, "")
			}
			obj || (obj = {});
			var __t, __p = "",
				__j = Array.prototype.join;
			with(obj) __p += '<div class="' + (null == (__t = data.classname) ? "" : __t) + '-inner">\n  <h3 class="' + (null == (__t = data.classname) ? "" : __t) + '-hd mod-hd com-hd">\n    <em>' + (null == (__t = data.title) ? "" : __t) + "</em>\n    ", data.link && (__p += '\n    <a href="' + (null == (__t = data.link) ? "" : __t) + '" class="fl">\n    '), __p += ' \n    <img class="mlogo fl" src="' + (null == (__t = data.logo) ? "" : __t) + '" title="' + (null == (__t = data.title) ? "" : __t) + '"/>\n    ', data.link && (__p += "\n    </a>\n    "), __p += "\n    <p>\n      ", data.qr && (__p += ' \n      <span class="qr-wrapper">\n        <span class="tb-ifont tb-qr">&#xe610;</span>\n        <span class="a-all">\n          <img src="' + (null == (__t = data.qr) ? "" : __t) + '" alt="' + (null == (__t = data.title) ? "" : __t) + '">\n          <em>\u624b\u673a\u6dd8\u5b9d\u626b\u7801</em>\n        </span>\n      </span>\n      '), __p += '\n      <span class="subtitle ' + (null == (__t = data.qr ? "" : "ml6") ? "" : __t) + '">' + (null == (__t = data.subtitle) ? "" : __t) + '</span>\n    </p>\n    <span class="tb-fn clearfix">\n      ', _.isTrue(data.switcher) && (__p += '\n      <span class="switch">\u6362\u4e00\u6362</span>\n      '), __p += "\n      ", data.moreLink && (__p += '\n      <a class="more" href="' + (null == (__t = data.moreLink) ? "" : __t) + '">\u66f4\u591a <i class="tb-ifont">&#xe62e;</i></a>\n      '), __p += '\n    </span>\n  </h3>\n  <ul class="list clearfix ' + (null == (__t = data.classname) ? "" : __t) + '-list"></ul>\n</div>\n\n\n';
			return __p
		}
	}(), kgHome2017005LibUtil = function(t) {
		var e = util,
			n = node.all;
		return e.isHighDensity = function() {
			return window.matchMedia && (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches) || window.devicePixelRatio && window.devicePixelRatio > 1.3
		}, e.frame = function(t) {
			window.requestNextAnimationFrame(function() {
				t()
			})
		}, e.load = function(t, a) {
			function i() {
				a ? setTimeout(function() {
					e.frame(t)
				}, a) : e.frame(t)
			}
			/loaded|complete/.test(document.readyState) ? i() : n(window).on("load", i)
		}, e.getKey = function(t, e) {
			if(t && t[e]) return t[e]
		}, e.getItem = function(t, n) {
			if(t && e.isArray(t) && t.length > n) return t[n]
		}, t
	}(), kgHome2017005CAdIndex = function(t) {
		function e(t) {
			this.innerEl = n(".tbh-ad-inner", t), e.superclass.constructor.apply(this)
		}
		var n = node.all,
			a = kgHome2017005LibTanx,
			i = util,
			o = aliPattern,
			r = aliPatternLibImage;
		return o.extend(e, {
			init: function() {
				var t = this,
					e = n("textarea", this.innerEl);
				if(e.length) {
					var o = e.attr("data-type");
					this.configData = JSON.parse(i.trim(e.val()));
					var r = this.configData.pid;
					if(1 == o) this.renderTanx(r), this.type = 1, window.tanx_c = window.tanx_c || {}, window.tanx_c[r] = {
						CustomShow: function(e) {
							try {
								if(e.tmpl) {
									var n = JSON.parse(e.tmpl);
									if(n.image1 && n.image2 && n.image3) return void t.renderBg(n)
								}
								t.backup({
									message: "empty"
								})
							} catch(a) {
								t.backup({
									message: a.message
								})
							}
						}
					}, new a(this.innerEl);
					else {
						if(0 != o) return;
						this.renderTanx(r), new a(this.innerEl), this.type = 0
					}
					this.bind()
				}
			},
			renderTanx: function(t) {
				this.innerEl.html('<a class="J_Tanx" style="display:none!important" id="tanx-a-' + t + '" data-id=' + t + "></a>")
			},
			renderBg: function(t) {
				this.innerEl.html('<div class="tbh-ad-wrapper">\n        <img alt="\u5e7f\u544a" src="' + r.getNewUrl(t.image2, {
					webp: !0
				}) + '"/>\n        <span class="tbh-ad-banner-tag">\u5e7f\u544a</span>\n      </div>\n      <img alt="\u5de6\u4fa7\u6c1b\u56f4" src="' + r.getNewUrl(t.image1, {
					webp: !0
				}) + '"  class="ad-left-item"/>\n      <img alt="\u53f3\u4fa7\u6c1b\u56f4" src="' + r.getNewUrl(t.image1, {
					webp: !0
				}) + '" class="ad-right-item"/>'), this.responesive(), this.lazyBind()
			},
			bind: function() {
				var t = this;
				n("document");
				this.subscribe("alimama:tanx", function(e) {
					e && e.hook && e.hook === "#tanx-a-" + t.configData.pid && t.backup(e)
				})
			},
			lazyBind: function() {
				n(window).on("resize", i.buffer(this.responesive, 100))
			},
			responesive: function() {
				var t, e = n(window).width(),
					a = n("body"),
					i = n(".tbh-ad-banner-tag", this.innerEl);
				t = a.hasClass("s1190") ? -(e - 990) / 2 : (e - 1190) / 2 < 365 ? -(e - 1190) / 2 : -365, i.css({
					right: t
				})
			},
			backup: function(t) {
				0 == this.type ? this.innerEl.html('<a class="tbh-ad-banner" href="' + this.configData.link + '"><img src="' + this.configData.img + '"><span class="tbh-ad-banner-tag">\u5e7f\u544a</span></a>') : this.renderBg({
					image1: this.configData.leftImg,
					image2: this.configData.img,
					image3: this.configData.rightImg
				}), this.reportBackup({
					extra: t
				})
			},
			defaults: function() {
				return {
					name: "ad",
					category: "ALIMAMA_AD"
				}
			}
		}), t = e
	}(), kgHome2017005CServiceIndex = function(t) {
		function e(t) {
			this.el = t, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = promise,
			i = node,
			o = util,
			r = kgHome2017005CServiceCatjsthtml,
			s = kgHome2017005CServiceItemjsthtml,
			l = kgHome2017005CServiceBannerjsthtml,
			c = i.all,
			d = -1,
			u = {},
			h = "service",
			m = "cache-service-banners",
			_ = m + "-validator",
			p = {};
		return n.extend(e, {
			init: function() {
				this.floatEl = c(".service-float", this.el), this.bind(), this.collectData(), this.showHotTags(), this.serviceEl = c(".J_Service", this.el)
			},
			bind: function() {
				var t = this,
					e = c(".service-bd", this.el),
					n = c("li", e),
					a = this.floatEl;
				this.el.delegate("mouseenter", ".J_Cat", function(e) {
					var i = c(e.currentTarget);
					t.enterTime && clearTimeout(t.enterTime), t.enterTime = setTimeout(function() {
						d = i.index(), n.removeClass("on"), i.addClass("on"), a.fadeIn(.3), t.showFloat()
					}, 100)
				}), this.el.delegate("mouseleave", ".service-bd", function(e) {
					var i = c(e.relatedTarget || e.toElement || e.fromElement);
					i.hasClass("service-float") || i.parent(".service-float") || (t.enterTime && clearTimeout(t.enterTime), d = -1, n.removeClass("on"), a.hide())
				}), a.on("mouseenter", function() {
					d > -1 && (t.enterTime && clearTimeout(t.enterTime), n.item(d).addClass("on"), a.fadeIn(.3), t.showFloat())
				}).on("mouseleave", function(e) {
					var i = c(e.relatedTarget || e.toElement || e.fromElement);
					i.hasClass("service-bd") || i.parent(".service-bd") || (t.enterTime && clearTimeout(t.enterTime), d = -1, n.removeClass("on"), a.hide())
				})
			},
			collectData: function() {
				for(var t = c(".J_Cat", this.el), e = [], n = [], a = 0, i = t.length; a < i; a++) {
					for(var o = c(t[a]), r = o.attr("data-groupid"), s = o.attr("data-closeper"), l = c("a", o), d = [], h = [], m = 0, _ = l.length; m < _; m++) {
						var p = c(l[m]),
							f = p.attr("data-dataid");
						d.push(p.attr("data-cid")), h.push(f), n.push(f)
					}
					e.push({
						groupId: r,
						closePer: 1 == s,
						cids: d,
						dataids: h
					})
				}
				this.config = u = e, this.mids = n
			},
			showFloat: function() {
				var t = c(".service-float-item", this.el),
					e = c('.service-float-item[data-index="' + d + '"]', this.el);
				return d == -1 || e.length ? (t.hide(), void e.show()) : (this.renderTo(s, {
					index: d
				}, this.floatEl), t.hide(), c('.service-float-item[data-index="' + d + '"]', this.el).show(), this.renderModuleData(), this.renderBanners(), void this.godlog("/tbindex.2016092701.category", "EXP", {
					index: d
				}, "H1484266099", "\u4e3b\u9898\u5e02\u573a\u6d6e\u5c42\u66dd\u5149\uff0c\u5e8f\u53f7\uff1a" + d))
			},
			renderBanners: function() {
				var t = this,
					e = d,
					n = u[e].groupId;
				this.fetchBanner(n).then(function(a) {
					var i = {
						recItemList: u[e].backup
					};
					a = a && a.result || [];
					for(var o = 0, r = a.length; o < r; o++)
						if(a[o] && a[o].topicId == n && a[o].recItemList && a[o].recItemList.length >= 6) {
							i = a[o];
							break
						}
					i || t.reportError({
						msg: "\u5bb9\u707e\u5931\u8d25\uff0cbanner \u6570\u636e\u4e0d\u5b58\u5728",
						category: t.category.banner,
						extra: {
							topicId: n
						}
					});
					var s = c('.service-float-item[data-index="' + e + '"] .service-rmd-list', t.el);
					t.render(l, i, s), s.removeClass("loading")
				})["catch"](function(e) {
					t.reportError({
						category: t.category.banner,
						extra: {
							topicId: n,
							msg: "\u6e32\u67d3\u5f02\u5e38\uff0c\u8be6\u60c5" + e && e.message
						}
					})
				})
			},
			renderModuleData: function() {
				var t = this,
					e = d,
					n = u[e].dataids,
					a = [];
				this.requestModuleData(function(i) {
					for(var o = 0, s = n.length; o < s; o++) {
						var l = n[o];
						i && i[l] && i[l].value && a.push(i[l].value)
					}
					var d = c('.service-float-item[data-index="' + e + '"] .service-fi-links');
					t.render(r, a, d);
					d.removeClass("loading")
				})
			},
			requestModuleData: function(t) {
				var e = this,
					n = "tce_" + h;
				return p[n] ? void(t && t(p[n])) : (this.moduleRenderQueue = this.moduleRenderQueue || [], this.moduleRenderQueue.push(t), void this.jsonp({
					url: "//tce.alicdn.com/api/data.htm",
					timeout: 5,
					cache: !0,
					data: {
						ids: this.mids.join(",")
					}
				}).then(function(a) {
					if(p[n] = a, !a || o.isEmptyObject(a))
						if(a = e.offline.getItem("cache-service-tce")) {
							for(a = JSON.parse(a), t && t(a); e.moduleRenderQueue.shift();) t && t(a);
							e.reportCache({
								category: e.category.cat
							})
						} else e.getCatBackup(n, t);
					else
						for(e.offline.setItem("cache-service-tce", JSON.stringify(a)), t && t(a); e.moduleRenderQueue.shift();) t && t(a)
				}, function() {
					var a = e.offline.getItem("cache-service-tce");
					if(a) {
						for(a = JSON.parse(a), p[n] = a, t && t(a); e.moduleRenderQueue.shift();) t && t(a);
						e.reportCache({
							category: e.category.cat
						})
					} else e.getCatBackup(n, t)
				}))
			},
			fetchBanner: function(t) {
				var e = this,
					n = this.fname;
				return new a(function(a, i) {
					return p[e.fname] && e.cacheTPP[t] ? void a(p[e.fname]) : e.cacheBannerData ? void a(e.cacheBannerData) : e.jsonp({
						url: "//tui.taobao.com/recommend?appid=2807",
						timeout: 3
					}).then(function(o) {
						if(e.hasTppRequest = !0, o && o.result && o.result.length > 0) {
							var r = [];
							p[n] = o;
							for(var s = 0; s < 3; s++) o.result[s] && o.result[s].topicId && r.push(o.result[s].topicId);
							for(var s = 0, l = o.result.length; s < l; s++) {
								var c = o.result[s],
									d = c && c.topicId;
								d && e.validator.array.minItems(c.recItemList, 6) && (e.cacheTPP[d] = !0)
							}
							return r.length && e.offline.setItem("service-hot", r.join(",")), e.offline.setItem(m, JSON.stringify(o)), e.offline.setItem(_, JSON.stringify(e.cacheTPP)), void(e.cacheTPP[t] && a(o))
						}
						var u = e.getCacheBanner(t);
						return u ? void a(u) : void i()
					}, function(n) {
						var o = e.getCacheBanner(t);
						o ? a(o) : i()
					})
				}).then(function(t) {
					return t
				}, function() {
					return e.getTCEBanner(t)
				})
			},
			getCacheBanner: function(t) {
				var e = this.offline.getItem(m),
					n = this.offline.getItem(_);
				if(e && n && (e = JSON.parse(e), n = JSON.parse(n), p[this.fname] = e, n[t])) return this.reportCache({
					category: this.category.banner,
					extra: {
						topicId: t
					}
				}), e
			},
			showHotTags: function() {
				var t = this.offline.getItem("service-hot");
				if(t) {
					t = t.split(",");
					for(var e = 0, n = t.length; e < n; e++) c('.J_Cat[data-groupid="' + t[e] + '"] span', this.el).addClass("tbh-tag")
				}
			},
			getTCEBanner: function(t) {
				var e = this,
					n = this.ids;
				return this.cacheBannerData ? a.resolve() : this.jsonp({
					url: "//tce.alicdn.com/api/data.htm",
					data: {
						ids: n
					}
				}).then(function(a) {
					if(a && a[n] && a[n].value) {
						var i = a[n].value.groups;
						return e.reportBackup({
							category: e.category.banner,
							msg: "\u8d70 tce \u515c\u5e95\u6570\u636e",
							extra: {
								topicId: t
							}
						}), e._setBannerBackup(i), e.cacheBannerData = a, i
					}
					return e.getBackupBanner(t)
				}, function(n) {
					return e.getBackupBanner(t)
				})
			},
			_setBannerBackup: function(t) {
				var e = this;
				o.each(t, function(t) {
					var n = e.getRetItem(t.groupId);
					n.backup = t.banners
				})
			},
			getRetItem: function(t) {
				for(var e = 0, n = u.length; e < n; e++)
					if(u[e].groupId === t) return u[e]
			},
			getCatBackup: function(t, e) {
				var n = this;
				KISSY.use("p/tbh-service-cat/index", function(a, i) {
					p[t] = i, n.reportCDN({
						category: n.category.cat
					}), e && e(i)
				}, function(t) {
					e(), n.reportError({
						category: n.category.cat
					})
				})
			},
			getBackupBanner: function(t) {
				var e = this;
				return this.use("p/tbh-service/index").then(function(n) {
					return e.reportCDN({
						category: e.category.banner,
						extra: {
							topicId: t
						}
					}), e._setBannerBackup(n && n.groups), e.cacheBannerData = n, n.groups
				}, function() {
					e.reportError({
						category: e.category.banner,
						extra: {
							topicId: t
						}
					})
				})
			},
			defaults: function() {
				return {
					ids: "222256",
					name: "tbh-service",
					fname: "tpp_tbh-service",
					cacheTPP: {},
					category: {
						cat: "ERROR_service_cat_data_err",
						banner: "ERROR_service_banner_data_err"
					}
				}
			}
		}), t = e
	}(), kgHome2017005CPromoIndex = function(t) {
		function e(t) {
			this.el = t, this.optEl = this.el.all(".J_PromoOpt"), e.superclass.constructor.apply(this)
		}
		var n = kgHome2017005LibTanx,
			a = kgHome2017005LibAld,
			i = aliPattern,
			o = aliSession,
			r = aliSlide,
			s = node,
			l = util,
			c = {},
			d = s.all;
		return i.extend(e, {
			init: function() {
				this._bind();
				var t = this.index = d(".promo-bd", this.el).attr("data-index") || 0;
				t = parseInt(t);
				var e = window.location.search.slice(1),
					n = this.el.one(".mod-six");
				if(n && e) {
					var a = l.unparam(e);
					a && null !== a.six ? this.gosix = 1 : n.remove()
				} else n && n.remove();
				this.initSlider(t)
			},
			_bind: function() {
				this.el.delegate("click", ".J_Prev", this._prev, this), this.el.delegate("click", ".J_Next", this._next, this)
			},
			initSlider: function(t) {
				var e = this;
				if(this.slide = new r(this.el, {
						contentClass: "promo-bd",
						pannelClass: "mod",
						navClass: "promo-nav",
						effect: "hSlide",
						timeout: 5e3,
						carousel: !0,
						autoSlide: !0,
						touchmove: !0,
						defaultTab: parseInt(t)
					}), this.el.on("mouseenter", function() {
						e.optEl.show()
					}), this.el.on("mouseleave", function() {
						e.optEl.hide()
					}), this.slide.on("beforeSwitch", function(t) {
						var n = t.index;
						if(1 !== c[n]) {
							var a = t.pannelnode;
							e.loadContent(a, n)
						}
						c[n] || (c[n] = !0, e.godlog("/tbindex.promo.promo", "EXP", {
							index: n
						}, "H1476877900", "\u9996\u7126\u7b2c " + n + " \u5e27\u66dd\u5149"))
					}), this.gosix) return void this.slide.go(6);
				this.renderTanx(), 0 == t && t++;
				try {
					var n = this.slide.pannels.item(t);
					this.loadContent(n)
				} catch(a) {
					this.reportError({
						extra: "switch {index}: " + (a && a.message)
					})
				}
			},
			renderTanx: function() {
				this.el.all(".J_Tanx").each(function(t) {
					var e = d(t),
						a = Number(e.attr("data-lazychance"));
					a = isNaN(a) ? 1 : a;
					var i = Math.random() >= a;
					i && (new n(e), e.removeClass("J_Tanx"))
				})
			},
			loadContent: function(t, e) {
				var i = this,
					r = t.hasClass("J_Tanx"),
					s = t.hasClass("J_Ald");
				if(r) new n(t), t.removeClass("J_Tanx");
				else if(s) {
					var l = t.attr("data-id");
					a.loader(l).then(function(e) {
						var n = e && e.data;
						return n ? (a.render(l, n, o.get("webp") ? "_q90_.webp" : "_q90"), void i.addADTag(t)) : i.backup(l, "empty")
					})["catch"](function(t) {
						return i.backup(l, t && t.message)
					}), t.removeClass("J_Ald")
				}
				r || s || (c[e] = 1)
			},
			backup: function(t, e) {
				try {
					a.loadTms(t), this.reportBackup({
						extra: "\u963f\u62c9\u4e01 " + t + " \u52a0\u8f7d\u5931\u8d25\uff0c\u8be6\u60c5\uff1a" + (e || "")
					})
				} catch(n) {
					this.reportError()
				}
			},
			_prev: function(t) {
				t.preventDefault(), this.slide.previous()
			},
			_next: function(t) {
				t.preventDefault(), this.slide.next()
			},
			addADTag: function(t) {
				var e = 1 == t.attr("data-show"),
					n = d("a", t);
				e && 0 == d(".ad-tags", n).length && n.append('<span class="ad-tags">\u5e7f\u544a</span>')
			},
			defaults: function() {
				return {
					name: "tbh-promo",
					category: "ERROR_ALD_Load_Crash"
				}
			}
		}), t = e
	}(), kgHome2017005CConveIndex = function(t) {
		function e(t) {
			this.el = t, this.init()
		}
		var n = node,
			a = aliPatternLibReporter,
			i = aliPattern,
			o = kgHome2017005CConveLayoutjsthtml,
			r = n.all,
			s = "/markets/tbhome/",
			l = {
				game: s + "bianming-game",
				baoxian: s + "bianming-baoxian",
				trip: s + "bianming-trip",
				phone: s + "bianming-phone"
			},
			c = {},
			d = !0,
			u = "//www.taobao.com";
		return /(alicdn|taobao)\.com$/.test(window.location.host) && (u = "//" + window.location.host), "tms-preview.taobao.com" === window.location.host && (u = "//tms-preview.taobao.com/wh/tms/taobao/page"), i.extend(e, {
			init: function() {
				this.bind(), this.bindCloseAction()
			},
			bind: function() {
				this.el.delegate("mouseenter", ".conve-float", this.showConveBox, this), this.el.delegate("mousemove", ".conve-float", this.showConveBox, this), this.el.delegate("click", ".conve-bd-box-close", this.closeConveBox, this)
			},
			showConveBox: function(t) {
				var e = r(t.currentTarget);
				e.index();
				if(e.hasClass("conve-float")) {
					var n = r(".conve", this.el),
						a = e.attr("data-name");
					c[a] || (d && (d = !1, this._renderLayout(n), r(".conve-bd-item").hide()), this["goto"](e), c[a] = !0), n.addClass("conve_on"), this.el.one(".conve_on") && (this.el.all(".conve-float").removeClass("selected"), e.addClass("selected")), e.addClass("selected"), r(".conve-bd-item").hide(), r(".conve-bd-item.J_Conve_" + a).show()
				}
			},
			_renderLayout: function(t) {
				var e = [];
				r(".conve-float", t).each(function(t) {
					var n = r(t),
						a = n.attr("data-name");
					a && e.push(a)
				}), this.renderTo(o, {
					names: e
				}, t), this.loadStyle()
			},
			"goto": function(t) {
				try {
					var e = t.attr("data-name");
					if(!e) return;
					var n = r(".J_Conve_" + e, this.el);
					if(r(".J_convePop", this.el).hide(), !n.hasClass("loading")) return
				} catch(i) {
					this.reportError({
						extra: "goto error" + this.el.all(".conve-list li").length
					})
				}
				this.ajax({
					url: u + l[e],
					cache: !1,
					dataType: "html"
				}).then(function(t) {
					return t ? void n.removeClass("loading").html(t, !0) : void a({
						category: "Error_conve_load_html_err",
						msg: "get module: " + e + " fail"
					})
				}, function(t) {
					a({
						category: "Error_conve_load_html_err",
						msg: "get module: " + e + " fail, detail:" + t && t.message
					})
				})
			},
			closeConveBox: function() {
				clearTimeout(this.timer), this.el.one(".conve").removeClass("conve_on"), this.el.all(".conve-float").removeClass("selected")
			},
			bindCloseAction: function() {
				var t = this;
				r("body").on("mousedown", function(e) {
					var n = r(e.target),
						a = n.parent(".J_Module"),
						i = e.target.nodeName.toLowerCase();
					("body" === i || n.hasClass("cup") || a && !a.parent(".J_Module") && !a.hasClass("tbh-conve")) && t.closeConveBox()
				})
			},
			loadStyle: function() {
				KISSY.getScript("//g.alicdn.com/tb-mod/tbh-conve-common/0.0.1/index-min.css")
			}
		}), t = e
	}(), kgHome2017005CFocusIndex = function(t) {
		function e(t, n) {
			this.el = t, this.conf = n, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = node,
			i = a.all,
			o = util,
			r = kgHome2017005CFocusItemjsthtml,
			s = cookie,
			l = aliPatternLibImage;
		return n.extend(e, {
			init: function() {
				this._parse();
				var t = this.backupData && this.backupData.closePer;
				o.isTrue(t) || !this.conf ? this._renderFirstPaint() : this.load(), this._bind()
			},
			_bind: function() {
				var t = this,
					e = i(window),
					n = i("#J_ScreenColumn");
				n.length && e.on("scroll", function a(i) {
					e.scrollTop() + e.height() >= n.offset().top && (t._render(t.threeScreen, n), e.off("scroll", a))
				})
			},
			_parse: function() {
				try {
					return void(this.backupData = this.conf && this.conf.moduleinfo || {})
				} catch(t) {}
			},
			load: function() {
				var t = this;
				this.xctrl({
					data: this.conf,
					key: ["list"],
					request: "taobao",
					extra: {
						cna: s.get("cna")
					}
				}).then(function(e) {
					e && e.list && t.validator.array.minItems(e.list, 1) && (t.list = e.list), t._renderFirstPaint()
				})["catch"](function(e) {
					t.reportError({
						extra: {
							err: e && e.message,
							val: "\u6e32\u67d3\u9519\u8bef"
						}
					})
				})
			},
			_renderFirstPaint: function() {
				this._render(this.bannerRight, this.el, "290x290", "400x400"), this._render(this.subjectMarket, i("#J_ServiceBottom"), "190x190", "320x320")
			},
			_render: function(t, e, n, a) {
				n = n || "", a = a || "";
				var i, s, c = null,
					d = [];
				if(o.each(this.list, function(e) {
						e && e.code === t && (e.imgUrl && e.targetUrl ? c = e : d.push("img or link is empty"))
					}), !c) {
					switch(t) {
						case this.bannerRight:
							i = this.backupData.bannerLink, s = this.backupData.bannerImg, d.push(this.bannerRight);
							break;
						case this.subjectMarket:
							i = this.backupData.subjectLink, s = this.backupData.subjectImg, d.push(this.subjectMarket);
							break;
						case this.threeScreen:
							i = this.backupData.screenLink, s = this.backupData.screenImg, d.push(this.threeScreen)
					}
					i && s ? (c = {
						targetUrl: i,
						imgUrl: s
					}, this.reportBackup({
						extra: d.join(":")
					})) : this.reportError({
						extra: d.join(":")
					})
				}
				c && (c.imgUrl = l.response(c.imgUrl, n, a, "q90", !0), this.render(r, c, e), c.trackinfo && this.log(c.trackinfo))
			},
			log: function(t) {
				var e = this;
				this.logCache.push(t), setTimeout(function() {
					e.logCache.length && e.godlog("/tbindex.luban.luban", "EXP", "name=" + e.logCache.join("::"), "H1476877899")
				}, 0)
			},
			defaults: function() {
				return {
					name: "tbh-focus",
					category: "ERROR_Data_tbh_focus",
					bannerRight: "pchome_first_banner_right",
					subjectMarket: "pchome_subject_market",
					threeScreen: "pchome_three_screen_column",
					list: [],
					backupData: {},
					logCache: []
				}
			}
		}), t = e
	}(), kgHome2017005CBeltIndex = function(t) {
		function e(t, n) {
			this.el = t, this.conf = n, e.superclass.constructor.apply(this)
		}
		var n = node,
			a = n.all,
			i = util,
			o = aliPattern,
			r = kgHome2017005CBeltItemjsthtml,
			s = cookie;
		return o.extend(e, {
			init: function() {
				var t = this;
				this.load().then(function(e) {
					var n = a(".list", t.el);
					t.render(r, e, n), t.broadcast("load:module", {
						name: t.name
					}), t.el.removeClass("tb-loading")
				})["catch"](function(e) {
					t.reportError(e && e.message)
				})
			},
			load: function() {
				var t = this;
				return this.xctrl({
					data: this.conf,
					key: ["list", "modules"],
					request: "taobao",
					extra: {
						cna: s.get("cna"),
						pageSize: 6
					}
				}).then(function(e) {
					var n = e.modules,
						a = void 0;
					n && n[0] && (a = n[0].link || t.secLink), t.renderHead(n);
					var o = e.list && e.list[0] && e.list[0].item,
						r = [],
						s = "";
					if(o && t.validator.array.minItems(o, 6)) {
						if(i.each(o, function(t) {
								t.clickUrl && t.clickUrl.indexOf("?") > -1 && t.title && t.subtitle && (t.clickUrl = a + "?" + t.clickUrl.split("?")[1], r.push(t))
							}), r.length >= 6) return t.offline.setItem(t.cacheKey, JSON.stringify(r)), r;
						s = JSON.stringify({
							len: r.length,
							total: o.length
						})
					} else s = "\u8fd4\u56de\u6570\u636e\u9519\u8bef\uff0c\u957f\u5ea6\u4e3a " + (o && o.length);
					return t.getCache(s)
				}, function(e) {
					return t.getCache(e && e.message || "\u8bf7\u6c42\u51fa\u9519")
				})
			},
			getCache: function(t) {
				var e = this.offline.getItem(this.cacheKey);
				if(e) {
					try {
						this.reportCache({
							extra: encodeURIComponent(t)
						})
					} catch(n) {}
					return JSON.parse(e)
				}
				return this.backup(t)
			},
			backup: function(t) {
				var e = this,
					n = this.name || this.backupName;
				return this.use("p/tbh-" + n + "/index", function(n) {
					return e.reportCDN(t), n
				}, function(t) {
					e.reportError("cdn" + t && t.message)
				})
			},
			defaults: function() {
				return {
					name: "belt",
					cacheKey: "TB_Blet",
					title: "\u4eba\u7fa4\u7814\u7a76\u6240",
					subtitle: "\u53d1\u73b0\u5c5e\u4e8e\u4f60\u7684\u751f\u6d3b\u65b9\u5f0f",
					secLink: "//www.taobao.com/markets/tbhome/crowd-guide",
					logo: "//img.alicdn.com/tfs/TB1o60degoQMeJjy1XaXXcSsFXa-180-48.png"
				}
			}
		}), t = e
	}(), kgHome2017005CAppIndex = function(t) {
		function e(t, n) {
			this.el = t, this.cfg = n, e.superclass.constructor.apply(this)
		}
		var n = util,
			a = node,
			i = a.all,
			o = aliPattern,
			r = aliPatternLibImage,
			s = kgHome2017005CAppItemjsthtml;
		return o.extend(e, {
			init: function() {
				this.load()
			},
			load: function() {
				var t = this;
				this.fetch().then(function(e) {
					if(e.apps.length > 10) {
						var n = e.apps.slice(0, 5),
							a = e.apps.slice(5),
							a = t.shuffle(a);
						e.apps = n.concat(a.slice(0, 5))
					}
					var o = i(".apps", t.el);
					t._parse(e.apps), t.render(s, e, o), o.removeClass("tb-loading"), t._bind()
				})["catch"](function(e) {
					t.reportError()
				})
			},
			fetch: function() {
				var t = this;
				return this.xctrl({
					data: this.cfg,
					key: ["head", "apps"]
				}).then(function(e) {
					if(e && e.head && e.apps && !n.isEmptyObject(e.head) && !n.isEmptyObject(e.apps)) return t.offline.setItem(t.cacheKey, JSON.stringify(e)), e;
					var e = t.offline.getItem(t.cacheKey);
					return e = JSON.parse(e), e ? (t.reportCache(), e) : t.backup()
				})
			},
			backup: function() {
				var t = this;
				return this.use("p/" + this.name + "/index").then(function(e) {
					return t.reportCDN(), e
				})
			},
			_parse: function(t) {
				n.each(t, function(t) {
					t.img = r.getImageAndCache(t.img, {
						webp: !0,
						size: "60x60"
					})
				})
			},
			_bind: function() {
				this.el.delegate("mouseenter", ".nav", function(t) {
					var e = i(".J_QRCode", t.currentTarget);
					if(1 != e.attr("data-loaded")) {
						var n = e.attr("data-src");
						e.attr("src", n), e.attr("data-loaded", 1)
					}
				})
			},
			shuffle: function(t) {
				for(var e, n = t.length, a = Array(n), i = 0; i < n; i++) e = ~~(Math.random() * (i + 1)), e !== i && (a[i] = a[e]), a[e] = t[i];
				return a
			},
			defaults: function() {
				return {
					cacheKey: "cache-apps-tce",
					name: "tbh-app",
					cacheBaseKey: "cache-base64-apps"
				}
			}
		}), t = e
	}(), kgHome2017005CMemberIndex = function(t) {
		function e() {
			return u.getTag()
		}

		function n(t) {
			return u.getNick(t)
		}
		var a = node,
			i = aliPatternLibReporter,
			o = aliPatternLibImage,
			r = _ua_,
			s = util,
			l = aliSession,
			c = aliPattern,
			d = kgHome2017005CMemberLoginjsthtml,
			u = window.TB && TB.Global,
			h = u && u.isLogin(),
			m = {
				"\u5317\u4eac": "//img.alicdn.com/tfs/TB1DsAvOFXXXXc5XVXXXXXXXXXX-580-340.png",
				"\u4e0a\u6d77": "//img.alicdn.com/tfs/TB18IEUOFXXXXaQXXXXXXXXXXXX-580-340.png",
				"\u5e7f\u5dde": "//img.alicdn.com/tfs/TB1IMECOFXXXXXiXVXXXXXXXXXX-580-340.png",
				"\u6df1\u5733": "//img.alicdn.com/tfs/TB124AVOFXXXXb.XXXXXXXXXXXX-580-340.png",
				"\u676d\u5dde": "//img.alicdn.com/tps/TB1QuZvLVXXXXb4XpXXXXXXXXXX-580-340.png",
				"default": "//img.alicdn.com/tfs/TB19tIiOFXXXXbmapXXXXXXXXXX-580-340.png"
			},
			_ = a.all,
			p = "//taojinbi.taobao.com/index.htm",
			f = p + "?auto_take=true",
			g = function(t) {
				this.el = t, this.tag = e(), this.init(), this.bg()
			};
		return c.extend(g, {
			init: function() {
				if(h) {
					var t = this.el.all(".J_MemberClub");
					this.tag < 1 && t.attr("href", "//new.taobao.com");
					var e = this.el.all(".J_MemberPunch");
					e.attr({
						href: p,
						"data-spm": "d1"
					}), this._render()
				}
				var a = _(".J_MemberAvatar", this.el),
					i = "//wwc.alicdn.com/avatar/getAvatar.do?userNick={userNick}&width=50&height=50&type=sns&_input_charset=UTF-8",
					o = s.substitute(i, {
						userNick: n(!0)
					});
				a.attr("src", o)
			},
			bg: function() {
				var t = this.el.attr("data-img");
				t || (h ? this.setBg() : this._setCityBg())
			},
			setBg: function() {
				var t = this,
					e = this.offline.getItem("city");
				return e && m[e] ? void this._setCityBg(e) : (this._setCityBg(), void setTimeout(function() {
					t.jsonp("//tbip.alicdn.com/api/queryip").then(function(e) {
						if(e && e.data && e.data.city) {
							var n = e.data.city,
								a = /\u5317\u4eac|\u4e0a\u6d77|\u5e7f\u5dde|\u6df1\u5733|\u676d\u5dde/.exec(n);
							a = a && a[0], a && t.offline.setItem("city", a)
						}
					})
				}, 8e3))
			},
			_setCityBg: function(t) {
				t || (t = "default");
				var e = m[t];
				e && (r.ie && 8 == r.ie ? e += "_290x290.jpg" : (e = l.get("retina") ? e : e + "_290x290.jpg", e = o.getImageAndCache(e)), this.el.css({
					backgroundImage: "url(" + e + ")"
				}))
			},
			_render: function() {
				var t = this,
					e = this.el.all(".J_MemberHome"),
					a = this.el.all(".J_MemberNick");
				if(e.attr("href", "//i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739"), n() && a.html(n()), !isNaN(this.tag)) {
					var o = "";
					10 === this.tag ? o = "super" : 20 === this.tag && (o = "apass"), r.ie && 8 == r.ie || o && _(".avatar-wrapper", this.el).addClass(o), this.jsonp("//i.taobao.com/json/my_taobao_remind_data.htm").then(function(e) {
						return t.remind(e)
					}, function(t) {
						i({
							category: "ERROR_Member_Login_Detect_Crash",
							msg: "fetch delivery address error, detail: " + (t && t.message)
						}, "warn")
					})
				}
			},
			remind: function(t) {
				var e = this.el.all(".J_MemberLogin"),
					n = this.el.all(".J_MemberLogout");
				"true" === t[6];
				_(".member-tjb", this.el).addClass("member-tjb-login");
				var a = this.render(d, {
					a: t[3] || 0,
					b: t[1][0] || 0,
					c: t[2] || 0,
					d: t[7] || 0
				});
				e.append(a).show(), n.animate({
					marginTop: "-25px"
				}, .2, "easeOut");
				var i = this.el.all(".J_MemberPunch");
				i.attr({
					href: f,
					"data-spm": "d2"
				})
			}
		}), t = g
	}(), kgHome2017005CHeadlineIndex = function(t) {
		function e(t, n) {
			this.el = t, this.conf = n, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = node.all,
			i = aliDatalazyload,
			o = _ua_,
			r = aliSlide,
			s = kgHome2017005CHeadlineItemjsthtml;
		return n.extend(e, {
			init: function() {
				var t = this;
				this.load().then(function(e) {
					var n = a(".J_Headline", t.el);
					t.render(s, {
						list: e,
						hd: {
							more: t.more
						}
					}, n), t._lazyload(), 8 == o.ie ? setTimeout(function() {
						t.initSlider()
					}, 3e3) : t.initSlider(), a(".J_Headline", t.el).removeClass("tb-loading")
				})["catch"](function(e) {
					t.reportError({
						extra: {
							message: e && e.message,
							type: "render"
						}
					})
				})
			},
			load: function() {
				var t = this;
				return this.jsonp({
					url: this.url,
					jsonp: "callBack"
				}).then(function(e) {
					var e = e && e.data;
					return t.validator.array.minItems(e, 1) ? e : t.getCache()
				}, function(e) {
					return t.getCache(e)
				})
			},
			getCache: function(t) {
				var e = this,
					n = this.offline.getItem(this.cacheKey);
				return n ? (this.reportCache({
					extra: {
						message: t && t.message
					}
				}), JSON.parse(n)) : this.tarzan({
					url: this.url,
					cache: !0
				}).then(function(n) {
					return e.reportCDN({
						extra: {
							message: t && t.message
						}
					}), n && n.data
				})
			},
			_lazyload: function(t) {
				new i(".tbh-headline")
			},
			initSlider: function() {
				var t = this;
				this.slide = new r(".headline", {
					contentClass: "headline-bd",
					pannelClass: "mod",
					effect: "vSlide",
					timeout: 5e3,
					autoSlide: !0,
					touchmove: !0
				});
				var e = a(".headline-hd", this.el).width(),
					n = a(".headline-bd", this.el),
					i = a(".J_Headline", this.el);
				this.subscribe("window:responsive", function(a) {
					var o = i.width() - e;
					n.width(o), t.slide.fixSlideSize()
				})
			},
			defaults: function() {
				return {
					cacheKey: "cache-headline-be",
					name: "headline",
					category: "ERROR_Headlines_get_null_data",
					url: "//headline.taobao.com/feed/homeFeed.do",
					more: "//headline.taobao.com/feed/feedList.htm"
				}
			}
		}), t = e
	}(), kgHome2017005CDecorationsIndex = function(t) {
		function e(t) {
			this.el = t, this.init()
		}
		var n = node,
			a = util,
			i = aliPattern,
			o = kgHome2017005CDecorationsItemjsthtml,
			r = {},
			s = n.all;
		return i.extend(e, {
			init: function() {
				var t = this,
					e = s("textarea", this.el),
					n = a.trim(e.val());
				if(e && e.length && n) {
					r = JSON.parse(n), e.remove(), a.each("hideLogo holy".split(" "), function(e) {
						a.isTrue(r[e], "on") && "function" == typeof t["run" + e] && t["run" + e](r[e][0])
					});
					var i = r.side && r.side.length,
						i = i && i[0];
					if(a.isTrue(r.side, "on")) {
						var o = r.side[0].list;
						o && o.length && (this.list = o, this._lazybind())
					}
				}
			},
			hidelogo: function(t) {
				s(".logo-bd").fadeOut(.3)
			},
			runholy: function(t) {
				var e = this,
					n = !1,
					i = !1,
					r = s("#J_SiteNav").outerHeight(),
					l = s(".tbh-banner").height();
				a.each(t.list, function(t) {
					if(a.isTrue(t.left) && !i) {
						var c = s(".tbh-member");
						t.left = c.width(), t.top = -(c.offset().top - r - l);
						var d = e.render(o, t);
						c.prepend(d), i = !0
					}
					if(!a.isTrue(t.left) && !n) {
						t.left = -t.width;
						var u = s(".tbh-service");
						t.top = -(u.offset().top - r - l);
						var h = e.render(o, t);
						u.prepend(h), n = !0
					}
				})
			},
			_lazybind: function() {
				s(window).on("load", a.bind(this._loadSide, this)), this.lazyTimer = setTimeout(a.bind(function() {
					this._loadSide()
				}, this), 4e3)
			},
			_loadSide: function() {
				function t(r) {
					clearTimeout(e), e = setTimeout(a.bind(function() {
						var e = n.scrollTop() + i;
						this.list.length ? a.each(this.list, a.bind(function(t, n) {
							var i = t && t.refer && s("." + t.refer);
							if(i && t.img && i.offset() && i.offset().top <= e) {
								var o = '<img class="decorate" src="{img}" width="{width}" height="{height}"/>',
									o = a.substitute(o, t),
									r = s(o);
								t.top && r.css("top", t.top), t.left && r.css("left", t.left), t.right && r.css("right", t.right), t.bottom && r.css("bottom", t.bottom), i.append(r), this.list.splice(n, 1)
							}
						}, o)) : n.off("scroll", t)
					}, o), 50)
				}
				var e, n = s(window),
					i = n.height(),
					o = this;
				this.hasLoad || (this.hasLoad = !0, n.on("scroll", t), t())
			},
			defaults: function() {
				return {
					name: "decoration"
				}
			}
		}), t = e
	}(), kgHome2017005CSearchIndex = function(t) {
		function e(t) {
			this.el = t, this.qEl = h("#q"), this.forms = m.forms.search, e.superclass.constructor.apply(this)
		}
		var n = _ua_,
			a = anim,
			i = node,
			o = cookie,
			r = kgHome2017005CSearchSticky,
			s = aliPatternLibReporter,
			l = aliPattern,
			c = util,
			d = kgHome2017005CSearchTmalljsthtml,
			u = kgHome2017005CSearchAlimamajsthtml,
			h = i.all,
			m = document;
		return l.extend(e, {
			init: function() {
				this.bind(), new r, this.cloneLine(), this.loadAlimamaWord(), this.placeholder(), this.intelligentInitSuggest(), this.setSPM("taobao-item")
			},
			bind: function() {
				this.el.delegate("mouseenter", "#J_SearchTab", this.toggleTab, this), this.el.delegate("mouseleave", "#J_SearchTab", this.toggleTab, this), this.el.delegate("click", ".J_SearchTab", this.clickTab, this), this.el.delegate("focusin", "#q", this.focusInput, this), this.el.delegate("focusout", "#q", this.blurInput, this), this.el.delegate("keyup", "#q", this.keyupInput, this), this.el.delegate("input", "#q", this.keyupInput, this), this.el.delegate("click", "#J_SearchIcon", this.clickIcon, this)
			},
			cloneLine: function() {
				h(".search-hots-lines", this.el).append(h(".search-hots-fline", this.el).clone(!0).attr({
					"class": "search-hots-sline",
					"data-spm-ab": "sline"
				}))
			},
			placeholder: function() {
				function t(t) {
					var e = t.match(/(\w+?:\/\/[^\?#&]+)(\?([^$#]+))?/);
					return !!(e && e[1] && e[3]) && {
						action: e[1],
						params: c.unparam(e[3])
					}
				}
				var e = this,
					n = h(".J_TbSearchContent label"),
					a = "",
					i = n.attr("data-oeid");
				i && this.jsonp({
					url: "//s.taobao.com/search?app=api&m=word&oeid=",
					data: {
						oeid: i
					}
				}).then(function(o) {
					if(o && o.success && o.data && o.data.length > 0) {
						var r = o.data[0],
							l = "<span style='display:none;'>" + r.word_keyword + "</span>" + (r.word_title || r.word_keyword);
						if(n.html(l).attr("data-searchtype-item", l).show(), !r.word_url) return;
						var c = t(r.word_url);
						h(".J_SearchPanel form", e.el).attr("action", c.action);
						for(var d in c.params) "q" != d && e.hidden(!0, d, c.params[d])
					} else n.show(), s({
						category: "ERROR_NODATA_" + a + i,
						msg: "API: " + +a + i
					}, "warn")
				}, function(t) {
					n.show(), s({
						category: "ERROR_FAILED_" + a + i,
						msg: "API: " + a + i + " msg: " + t && t.message
					}, "warn")
				})
			},
			intelligentInitSuggest: function() {
				function t() {
					a || (a = !0, n.initSearchSuggest(), e.off("load", t), n.qEl.off("focus", t), n.qEl.off("input", t), n.el.undelegate("mouseenter", ".search-wrap", t, this))
				}
				var e = h(window),
					n = this,
					a = !1;
				c.load(function() {
					setTimeout(function() {
						t()
					}, 600)
				}), this.qEl.on("focus", t), this.qEl.on("input", t), this.el.delegate("mouseenter", ".search-wrap", t, this)
			},
			initSearchSuggest: function() {
				var t = window.suggestModuleVersion || "6.2.3",
					e = this,
					a = "kg/search-suggest/" + t;
				KISSY.use(a + "/index," + a + "/plugin/history," + a + "/plugin/cloud," + a + "/plugin/tab," + a + "/plugin/history-magic," + a + "/plugin/imgsearch," + a + "/theme/pailitao/," + a + "/new_suggest.css", function(t, a, i, o, r, l, d, u) {
					var _ = this,
						p = ["channelEntry", "history", "c2c_activity", "dapei_top", "cat", "global", "list", "dapei_bottom", "scene", "shop", "tmall", "cloud"],
						f = [new i, new r({
							activeCls: "selected",
							node: e.el.all("li.J_SearchTab")
						}), new o, new l],
						g = "//suggest.taobao.com/sug?k=1&area=c2c",
						v = !(h(m).scrollTop() > 0),
						b = "";
					if(!(n.ie && n.ie <= 7)) {
						var x = new d({
							input: "#J_IMGSeachUploadBtn",
							type: "iframe",
							theme: new u({
								formNode: "#J_TSearchForm",
								queueTarget: "#J_UploaderMessage"
							})
						});
						f.push(x), h("#J_UploaderPanel").show()
					}
					var k = new a({
						placeholder: {
							show: !0,
							node: "#tbSearchContent",
							api: "//suggest.taobao.com/sug?area=shade_recommand&code=utf-8"
						},
						plugins: f,
						sugConfig: {
							sourceUrl: g,
							node: "#q",
							focused: v,
							resultFormat: b
						},
						mods: {
							sort: p,
							tmall: {
								tmpl: ['<div class="{prefixCls}menu-extras-cate extras-mall" data-key="q={tmall}&suggest=tmall_{$index}&tab=mall">', '<span class="{prefixCls}menu-key">{tmall}</span>', "<b>\u5929\u732b\u76f8\u5173</b>", "</div>"].join("")
							},
							scene: {
								tmpl: ['<div class="{prefixCls}menu-extras-cate extras-scene" data-action="http://fa.taobao.com/search" data-key="q={scene}&suggest=scene_{$index}">', '<span class="{prefixCls}menu-key">{scene}</span>', "<b>\u88c5\u4fee\u5b9d\u5178/\u9009\u8d2d\u79d8\u7c4d</b>", "</div>"].join("")
							}
						}
					});
					k.on("beforeImageSuccess", function() {
						s({
							msg: "\u56fe\u7247\u4e0a\u4f20\u6210\u529f"
						})
					}), k.comboBox.on("beforeShow", function() {
						TB.$sug || (TB.$sug = k.get("menu").get("el"))
					}), k.comboBox.on("click", function() {
						s(h(".J_Cup").hasClass("wrap-fixed") ? {
							goldlog: ["/tbindex.2014.11", "", {
								type: 2
							}, "H46896547"]
						} : {
							goldlog: ["/tbindex.2014.11", "", {
								type: 1
							}, "H46896547"]
						})
					}), n.ie && 11 === n.ie && k.comboBox.get("menu").on("afterRenderUI", function() {
						this.get("el").on("click", {
							fn: function(t) {
								k.comboClick(t)
							},
							once: !0
						})
					}), e.comboBox = k.comboBox, v || _.forms && (_.forms.className = ""), h(".btn-search").on("click", function(t) {
						t.halt();
						var n, a = e.qEl,
							i = h("#J_TSearchForm");
						if("" === c.trim(a.val())) {
							if(e.isTmall) n = h(".J_TmallPlaceholder").children("label").attr("data-q"), e.hidden(!0, "from", "tbmain_1_placeholder");
							else {
								e.setSPM("taobao-item");
								var o = h("span", ".J_TbPlaceholder");
								o && o.length && (n = o.text(), i.append('<input type="hidden" name="hintq" value="1">')), e.hidden(!1)
							}
							h(".J_Placeholder", this.el).hide(), a.val(n)
						} else e.setSPM("taobao-item");
						i.fire("submit")
					})
				})
			},
			setSPM: function(t) {
				var e = [h("meta[name=spm-id]").attr("content")];
				e.push(h("body").attr("data-spm")), e.push(this.el.attr("data-spm") + "-" + t), e.push(c.trim(this.qEl.val()) ? "1" : "2"), this.forms.spm.value = e.join(".")
			},
			toggleTab: function(t) {
				var e = t.type,
					n = "triggers-hover",
					a = h(".J_SearchTabBox", this.el);
				"mouseenter" === e ? a.addClass(n) : a.removeClass(n)
			},
			clickTab: function(t) {
				var e = h(t.currentTarget);
				if(h(".J_Cup").hasClass("wrap-fixed")) {
					var n = h(".J_SearchTabBox", this.el),
						a = h("ul", n),
						i = a.item(0);
					e[0] !== i[0] && a.prepend(e)
				}
				this.forms.search_type.value = e.attr("data-searchType"), this.isTmall = "true" === e.attr("data-tmall");
				var o = h(".J_SearchPanel", this.el),
					r = h(".J_TmallSearchContent", this.el),
					s = h(".J_TbSearchContent", this.el),
					l = h(".btn-search", this.el);
				this.isTmall ? (o.addClass("tmall-search-panel"), l.removeClass("tb-bg"), this.setSPM("tmall"), this.loadTmallWord(), r.show(), s.hide()) : (o.removeClass("tmall-search-panel"), l.addClass("tb-bg"), this.setSPM("taobao-item"), r.hide(), s.show()), this.qEl.val() && (r.hide(), s.hide())
			},
			hidden: function(t, e, n) {
				var a = h(".J_SearchPanel").all("form"),
					i = h(".hidden-" + e);
				if(t) {
					var o = '<input type="hidden" name="{name}" value="{value}" class="hidden-{name}">',
						r = c.substitute(o, {
							name: e,
							value: n
						});
					i.length || a.append(r)
				} else i.length && i.remove()
			},
			loadAlimamaWord: function() {
				var t = this,
					e = window.TB,
					n = e && e.Global && e.Global.getNick(),
					a = o.get("cna"),
					i = "//textlink.simba.taobao.com";
				this.jsonp({
					url: i,
					dataType: "jsonp",
					data: {
						name: "tbhs",
						cna: a,
						nn: encodeURIComponent(n) || "",
						count: 13,
						pid: "430266_1006"
					}
				}).then(function(e) {
					e && e.success && e.data && e.data.length > 0 ? (t.render(u, e.data, h(".search-hots-sline", t.el)), t._alimamaWordRun()) : s({
						category: "ERROR_NODATA_" + i,
						msg: "API: " + i + ", DATA: " + (JSON.stringify(e) || "").slice(0, 500),
						sampling: 10
					}, "warn")
				})["catch"](function() {
					s({
						category: "ERROR_FAILED_" + i,
						msg: "API: " + i
					}, "warn")
				})
			},
			_alimamaWordRun: function() {
				var t = .6,
					e = "ease-out",
					n = h(".search-hots-lines", this.el);
				n.css("top", 0), setTimeout(function() {
					new a(n, {
						top: -23
					}, t, e).run()
				}, 10)
			},
			loadTmallWord: function() {
				var t = this;
				return this.tmallWord ? this.tmallWord : void this.jsonp("//suggest.taobao.com/sug?area=tmall-hq&code=utf-8&src=tbmain").then(function(e) {
					if(e.success) {
						t.tmallWord = e;
						var n = e.model,
							a = n.placeholder && n.placeholder[0];
						a && h(".J_TmallPlaceholder", t.el).all("label").text(a.text).attr("data-q", a.query), t.render(d, n, h(".J_TmallHotWord"))
					}
				})
			},
			focusInput: function() {
				this.forms.className = "search-panel-focused"
			},
			blurInput: function() {
				c.trim(this.qEl.val()) || (this.forms.className = "")
			},
			keyupInput: function() {
				var t = c.trim(this.qEl.val()),
					e = h(".J_SearchIcon", this.el),
					n = h(".J_Placeholder", this.el),
					a = h(".J_TmallSearchContent", this.el),
					i = h(".J_TbSearchContent", this.el);
				t ? (n.hide(), e.hide()) : (n.hide(), this.isTmall ? a.show() : (i.show(), h(".J_TbPlaceholder").show()), e.show()), t && (a.hide(), a.hide())
			},
			clickIcon: function() {
				this.qEl.fire("focus")
			},
			defaults: function() {
				return {
					name: "tbh-search"
				}
			}
		}), t = e
	}(), kgHome2017005CFixedtoolIndex = function(t) {
		var e = _ua_,
			n = node,
			a = aliAttrAnim,
			i = kgHome2017005CFixedtoolItemjsthtml,
			o = aliPattern,
			r = n.all,
			s = e && e.ie && 8 === e.ie,
			l = s ? 0 : .4,
			c = function(t) {
				return this.el = t, e.ipad || e.android ? void this.el.hide() : (this.toolEl = r(".J_FixedTool", this.el), this.enabledFeedback = !!this.toolEl.attr("data-feedback"), this.feddbackVersion = this.toolEl.attr("data-version") || "0.1.26", void(this.toolEl.length && (this.name = "tbh-fixedtool", this.init())))
			};
		return o.extend(c, {
			init: function() {
				var t = this;
				this.load().then(function(e) {
					e && (t.render(i, e, t.toolEl), t.bind())
				})["catch"](function(e) {
					t.reportError({
						extra: e && e.message
					})
				})
			},
			load: function() {
				var t = this,
					e = 1017579,
					n = {
						url: "//tce.alicdn.com/api/data.htm",
						data: {
							ids: e
						},
						cache: !0,
						jsonpCallback: "tce_fixedtool_callback"
					};
				return this.jsonp(n).then(function(a) {
					var i = t._getTool(a, e);
					return i ? i : t.backup(n, e)
				}, function() {
					return t.backup(n, e)
				})
			},
			_getTool: function(t, e) {
				if(t && t[e] && t[e].value) {
					var n = t[e].value.tools;
					if(n && n.length) return n
				}
			},
			backup: function(t, e) {
				var n = this;
				return this.tarzan(t).then(function(t) {
					var a = n._getTool(t, e);
					return a ? (n.reportCDN(), a) : void n.reportError()
				})
			},
			bind: function() {
				var t = this,
					e = this,
					n = r('a[data-tool="gotop"]', this.toolEl),
					i = r(window);
				this.count(), this.el.delegate("click", "a", function(n) {
					var o = r(n.currentTarget),
						c = o.attr("data-tool");
					if(!c) return t.enabledFeedback && o.hasClass(".fixedtool-8") && t._showFeedback() && (n.preventDefault(), t._feedback()), !0;
					if(t.count(), n.halt(), "gotop" === c) return s ? void i.scrollTop(0) : (new a(r("html"), {
						scrollTop: 0
					}, {
						duration: l,
						easing: "easeOut"
					}).run(), void new a(r("body"), {
						scrollTop: 0
					}, {
						duration: l,
						easing: "easeOut"
					}).run());
					if(t.dataCache[c]) {
						var d = function(t, e, n) {
								new a(r("body"), {
									scrollTop: t
								}, {
									duration: e,
									easing: "easeOut",
									complete: function() {
										u(t, n)
									}
								}).run(), new a(r("html"), {
									scrollTop: t
								}, {
									duration: e,
									easing: "easeOut",
									complete: function() {
										u(n)
									}
								}).run()
							},
							u = function _(t, n) {
								if("hotsale" === n && !_.hasExe) {
									_.hasExe = !0, e.count();
									var a = e.dataCache[n].top;
									d(a, 0)
								}
							},
							h = t.dataCache[c].item,
							m = t.dataCache[c].top;
						if(t.el.all(".on").removeClass("on"), h.addClass("on"), s) return r("body").scrollTop(m), void r("html").scrollTop(m);
						d(m, l, c)
					}
				});
				var o = this.toolEl.hasClass("left");
				i.on("scroll", function() {
					var e = i.scrollTop(),
						a = r(".tbh-conve").offset().top + 2,
						s = 75;
					if(e > i.height() ? n.show() : n.hide(), e <= a - s) {
						var l = r("a", t.el).attr("data-tool");
						t.dataCache[l] && t.dataCache[l].obj.addClass("on"), o ? t.toolEl.css({
							position: "fixed",
							bottom: s,
							top: "auto"
						}) : t.toolEl.css({
							position: "absolute",
							top: a
						})
					} else {
						o ? t.toolEl.css({
							position: "fixed",
							bottom: s,
							top: "auto"
						}) : t.toolEl.css({
							position: "fixed",
							top: s
						});
						var c = t.scroll[t.scroll.length - 1];
						if(e >= c) return t.el.all(".on").removeClass("on"), void t.scrollDOM[c].item.addClass("on");
						for(var d = 1, u = t.scroll.length; d < u; d++)
							if(e >= t.scroll[d - 1] && e < t.scroll[d]) {
								t.el.all(".on").removeClass("on"), t.scrollDOM[t.scroll[d - 1]].item.addClass("on");
								break
							}
					}
				}).fire("scroll"), i.on("resize", function() {
					var e = i.width(),
						n = r(".fixedtool", t.el);
					e > 1190 && e < 1311 ? n.addClass("ft1190") : n.removeClass("ft1190"), e < 1111 ? n.addClass("ft990") : n.removeClass("ft990")
				}).fire("resize"), this.toolEl.fadeIn(.5)
			},
			count: function() {
				var t = this,
					e = this.toolEl.all("a");
				this.dataCache = {}, this.scroll = [], this.scrollDOM = {}, e.each(function(e) {
					var n = r(e),
						a = n.attr("data-tool"),
						i = r('div[data-name="' + a + '"]');
					if(a && i && i.length) {
						var o = i.offset().top - 48;
						t.dataCache[a] = {
							obj: i,
							item: n,
							top: o
						}, t.scroll.push(o), t.scrollDOM[o] = {
							obj: i,
							item: n
						}
					}
				}), this.scroll = this.scroll.sort(function(t, e) {
					return t > e ? 1 : -1
				})
			},
			_showFeedback: function() {
				return !(e.ios || e.android || e.ipad || e.iphone)
			},
			_feedback: function() {
				function t() {
					try {
						n.feedback.init({
							productId: 875,
							source: "web"
						})
					} catch(t) {}
				}
				var e = this,
					n = this;
				this.feedback && t(), KISSY.use("kg/xz-feedback-pc-tb/" + this.feddbackVersion + "/index", function(n, a) {
					e.feedback = new a, t()
				})
			}
		}), t = c
	}(), kgHome2017005CSuperbannerIndex = function(t) {
		function e(t, n) {
			this.el = t, this.conf = n, e.superclass.constructor.apply(this)
		}
		var n = aliPattern,
			a = util,
			i = kgHome2017005CSuperbannerItemjsthtml,
			o = node.all,
			r = cookie;
		return n.extend(e, {
			init: function() {
				var t = this,
					e = o("textarea", this.el).val();
				this.staticData = e ? JSON.parse(e) : {}, this.load().then(function(e) {
					e = e || {};
					var n = t.getValidData(e.tmall, 4, t.staticData.tmallList),
						a = t.getValidData(e.taobao, 1, t.staticData.taobaoList);
					t.render(i, {
						tmallList: n,
						taobaoList: a,
						venues: t.staticData.venues[0]
					}, o(".superbanner-inner", t.el))
				})["catch"](function(e) {
					t.reportError(e && e.message)
				})
			},
			load: function() {
				var t = this;
				return this.xctrl({
					data: this.conf,
					key: ["list"],
					request: "taobao",
					extra: {
						cna: r.get("cna")
					}
				}).then(function(e) {
					var n = e.list && e.list && e.list[0] && e.list[0].item;
					if(t.validator.array.minItems(n, 2)) {
						var a = n[0] && n[0].extList,
							i = n[1] && n[1].extList;
						return {
							tmall: a,
							taobao: i
						}
					}
					t.reportCDN({
						message: "valid error"
					})
				})["catch"](function(e) {
					return t.reportCDN({
						message: "request error"
					}), {}
				})
			},
			getValidData: function(t, e, n) {
				var i = this,
					o = [];
				if(a.each(t, function(t) {
						i.validator.notEmpty(t, ["biz_name", "biz_url", "subtitle", "itemList"]) && i.validator.array.minItems(t.itemList, 1) && t.itemList[0].pic_url && o.push({
							title: t.biz_name,
							subtitle: t.subtitle,
							link: t.biz_url,
							img: t.itemList[0].pic_url
						})
					}), o.length >= e) return o;
				for(var r = 0; r < e - o.length; r++) n && n[r] && o.push(n[r]);
				return o
			},
			defaults: function() {
				return {
					name: "superbanner"
				}
			}
		}), t = e
	}(), kgHome2017005CommonHeadIndex = function(t) {
		var e = kgHome2017005CommonHeadItemBarjsthtml,
			n = kgHome2017005CommonHeadItemjsthtml;
		return t = {
			renderHeadBar: function(t, n) {
				n = n || this.el;
				var a = this.name,
					i = t && t[0] || {};
				i.classname = i.classname || a, i.title = i.title || this.title, i.switcher = i["switch"] || this.switcher, i.itemLayer = i.itemLayer || this.itemLayer, i.logo = i.logo || this.logo, this.renderTo(e, i, n)
			},
			renderHead: function(t, e) {
				e = e || this.el;
				var a = this.name,
					i = t && t[0] || {};
				i.classname = i.classname || a, i.title = i.title || this.title, i.subtitle = i.subtitle || this.subtitle, i.switcher = i["switch"] || this.switcher, i.logo = i.logo || this.logo, this.renderTo(n, i, e)
			}
		}
	}(), kgHome2017005LibModules = function(t) {
		return t = {
			ad: kgHome2017005CAdIndex,
			qr: kgHome2017005CQrIndex,
			service: kgHome2017005CServiceIndex,
			promo: kgHome2017005CPromoIndex,
			tmall: kgHome2017005CTmallIndex,
			conve: kgHome2017005CConveIndex,
			focus: kgHome2017005CFocusIndex,
			nav: kgHome2017005CNavIndex,
			belt: kgHome2017005CBeltIndex,
			app: kgHome2017005CAppIndex,
			member: kgHome2017005CMemberIndex,
			notice: kgHome2017005CNoticeIndex,
			headline: kgHome2017005CHeadlineIndex,
			decorations: kgHome2017005CDecorationsIndex,
			tanx: kgHome2017005CTanxIndex,
			search: kgHome2017005CSearchIndex,
			corner: kgHome2017005CCornerIndex,
			fixedtool: kgHome2017005CFixedtoolIndex,
			superbanner: kgHome2017005CSuperbannerIndex
		}
	}(), kgHome2017005CommonInject = function(t) {
		var e = aliPattern,
			n = kgHome2017005CommonHeadIndex,
			a = util;
		return a.mix(e.prototype, n), t
	}(), kgHome2017005LibLoader = function(t) {
		function e(t, e, a, i, o) {
			if(i) return void n(t, e, a, o);
			var r = t.attr("preload-distance");
			r ? (r = Number(r), new u({
				diff: {
					top: r || 50,
					bottom: r || 50
				},
				autoDestroy: !0
			}).addCallback(t, function() {
				n(t, e, a, o)
			})) : f.addCallback(t, function() {
				n(t, e, a, o)
			})
		}

		function n(t, e, n, i) {
			var o = _.get("tbVersion") || "0.0.1";
			if(!t.hasClass("tbh-loaded") && !i) return void d({
				category: "ERROR_Loader_Crash",
				msg: "Loader\u52a0\u8f7d\u6a21\u5757\u65f6\uff0c\u53d1\u73b0\u6a21\u5757\u4e0d\u5b58\u5728 " + t.className
			}, "warn");
			if(p[i]) a(t, e, i);
			else {
				var r = "kg/home-2017/" + o + "/c/" + i + "/index",
					s = r + ".css";
				a(t, e, i, r, s)
			}
		}

		function a(t, e, n, a, s) {
			var l = p[n];
			if(l) try {
				new l(t, e)
			} catch(c) {
				i(n, c)
			} else o().then(function() {
				return r(a)
			}, function(t) {
				return r(a + ", " + s)
			}).then(function(a) {
				try {
					new a(t, e)
				} catch(o) {
					i(n, o)
				}
			}, function(t) {
				i(n, t)
			})
		}

		function i(t, e) {
			var n = e && e.message;
			d({
				category: "ERROR_Loader_Crash",
				msg: "fatal error " + t + "~" + n
			}, "warn"), (_.get("env") || location.host.indexOf("yb.my") !== -1) && window.console && window.console.log(t, e)
		}

		function o() {
			function t(t) {
				m.each(b, function(e) {
					t ? e.resolve() : e.reject()
				})
			}
			if(g) return l ? h.resolve() : h.reject();
			if(v) return new h(function(t, e) {
				b.push({
					resolve: t,
					reject: e
				})
			});
			v = !0;
			var e = _.get("tbVersion") || "1.5.0";
			return h.all([r("kg/home-2017/" + e + "/lib/lazy"), s("//g.alicdn.com/??kg/home-2017/" + e + "/lib/style/lazy.css")]).then(function() {
				g = !0, v = !1, l = !0, t(!0)
			}, function(e) {
				g = !0, v = !1, l = !1, i("lazy", e && e.message), t(!1)
			})
		}

		function r(t) {
			return m.isString(t) && (t = t.split(",")), t = m.map(t, function(t) {
				return m.trim(t)
			}), new h(function(e, n) {
				KISSY.use(t, {
					success: function(t, n) {
						e(n)
					},
					error: function(t) {
						n()
					}
				})
			})
		}

		function s(t) {
			return new h(function(e, n) {
				KISSY.getScript(t, {
					success: function() {
						e()
					},
					error: function() {
						n()
					}
				})
			})
		}
		var l, c = node,
			d = aliPatternLibReporter,
			u = aliDatalazyload,
			h = promise,
			m = util,
			_ = (c.all, aliSession),
			p = kgHome2017005LibModules,
			f = new u({
				diff: {
					top: 50,
					bottom: 50
				}
			}),
			g = !1,
			v = !1,
			b = [];
		return t = e
	}(), kgHome2017005LibIndex = function(t) {
		function e() {
			var t = [],
				e = ["promo", "service", "qr", "decorations", "qr", "tmall", "focus", "conve", "member", "tanx", "search", "headline", "superbanner", "nav"],
				i = ["corner", "fixedtool", "ad"],
				o = ["promo", "focus"],
				r = [],
				l = a();
			l.banner && (r.push("ad"), r.push("corner")), l.doodle && r.push("ad"), l.corner && r.push("corner");
			d(".J_Module").each(function(n) {
				var a, n = d(n),
					l = n.attr("tms"),
					u = n.attr("tms-data"),
					h = n.attr("tms-datakey");
				if(l && h && l.indexOf("/") !== -1 ? a = l.split("/")[0] : (l = n.attr("data-name"), "special" === l && (l = "quality"), a = l), !n.hasClass("tb-pass") && !c.inArray(a, r)) {
					if(u && c.trim(u)) try {
						u = JSON.parse(u)
					} catch(m) {
						u = {}
					} else u = {};
					return c.inArray(a, e) ? void c.frame(function() {
						var t = c.inArray(a, o);
						s(n, u, l, t, a)
					}) : c.inArray(a, i) ? void c.load(function() {
						c.frame(function() {
							s(n, u, l, !0, a)
						})
					}, 50) : void t.push({
						el: n,
						data: u,
						name: l,
						moduleName: a
					})
				}
			}), n(t)
		}

		function n(t) {
			function e() {
				n || (n = !0, u.detach(a, e), c.each(t, function(t) {
					c.frame(function() {
						s(t.el, t.data, t.name, t.force, t.moduleName)
					})
				}))
			}
			var n = !1,
				a = "mousemove scroll mousedown touchstart touchmove keydown resize onload";
			u.on(a, e), setTimeout(function() {
				e()
			}, 5e3)
		}

		function a() {
			var t = {};
			d(".tbh-logo .logo-hover").length && (t.doodle = !0), d(".tbh-banner .topBanner").length && (t.banner = !0);
			var e = d(".tbh-decorations textarea");
			if(e.length) try {
				var n = JSON.parse(e.val()),
					a = n.left[0].decorations.length,
					i = n.right[0].decorations.length;
				a && i ? (t.doodle = !0, t.banner = !0) : (a || i) && (t.doodle = !0)
			} catch(o) {}
			return !d(".tbh-ad .tbh-ad-inner textarea").length || t.banner || t.doodle || (t.corner = !0), c.isEmptyObject(t) || h({
				category: "CONFLICT_TANX",
				msg: JSON.stringify(t)
			}, "warn"), t
		}
		var i = _ua_,
			o = node,
			r = kgHome2017005LibFeature,
			s = kgHome2017005LibLoader,
			l = kgHome2017005LibLog,
			c = util,
			d = o.all,
			u = d(window),
			h = aliPatternLibReporter;
		return i.ie && i.ie < 8 || (new r, e(), new l), t
	}(), kgHome2017005Index = function(t) {
		return t = kgHome2017005LibIndex
	}(), module.exports = kgHome2017005Index
});
define("kg/pattern/2.0.5/index", ["ua", "util", "kg/xctrl/6.10.3/xctrl-kissy", "promise", "io", "kg/route-map-http/0.0.3/index", "url", "kg/session/0.0.1/index", "kg/offline/7.0.1/index", "node", "json"], function(t, e, r) {
	var n, o, a, i, c, s, u, l, f, p, g, d = t("ua"),
		h = t("util"),
		m = t("kg/xctrl/6.10.3/xctrl-kissy"),
		w = t("promise"),
		v = t("io"),
		y = t("kg/route-map-http/0.0.3/index"),
		b = t("url"),
		_ = t("kg/session/0.0.1/index"),
		x = t("kg/offline/7.0.1/index"),
		O = t("node"),
		j = t("json");
	n = function(t) {
		var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			r = d,
			n = (window.location.hostname, h);
		return window.JSTracker2 = window.JSTracker2 || [], t = function(t, o) {
			if(t.category) {
				if(r.ie && r.ie < 8) return;
				t.sampling = t.sampling || 10;
				var a = "http://jstracker.www.taobao.com/0.0.3/" + t.category;
				a = a.slice(0, 200), window.JSTracker2.push({
					msg: t.msg,
					url: a,
					sampling: t.sampling
				})
			}
			n.isArray(t.goldlog) && (t.goldlog[3] || (t.goldlog[3] = "H46896569"), "object" === e(t.goldlog[2]) && (t.goldlog[2] = n.param(t.goldlog[2])), (window.goldlog_queue || (window.goldlog_queue = [])).push({
				action: "goldlog.record",
				arguments: t.goldlog
			}));
			var i = window.location.search,
				c = !1;
			i && (i = n.unparam(i.slice(1)), c = i.hasOwnProperty("_console") || i.hasOwnProperty("_debug")), t.msg && c && (o = o || "info", r.ie && r.ie <= 8 && (o = "log"), window.console && window.console[o] && window.console[o]("[REPORTER LOG] " + t.msg))
		}
	}(), o = function(t) {
		var e = m,
			r = w,
			n = v,
			o = h,
			a = y;
		return t = {
			xctrl: function(t) {
				return new r(function(r, n) {
					t.callback = function(t) {
						t ? r(t) : n(t)
					}, e.dynamic(t)
				})
			},
			jsonp: function(t) {
				"string" == typeof t && (t = {
					url: t
				});
				var e = {
					dataType: "jsonp",
					timeout: 5
				};
				if(!t.url) throw new Error("jsonp request need url");
				return t = o.merge(e, t), this.ajax(t)
			},
			ajax: function(t) {
				return new r(function(e, r) {
					t.success = function(t) {
						e(t)
					}, t.error = function(t, e) {
						r({
							message: e
						})
					}, n(t)
				})
			},
			tarzan: function(t) {
				"string" == typeof t && (t = {
					url: t
				});
				var e = new a({
					api: t.url,
					data: t.data || {},
					dirName: "pctaobao"
				});
				return this.jsonp({
					url: e.getCDNAddress(),
					timeout: 60,
					jsonpCallback: e.getJSONPCallbak(),
					cache: !0
				})
			},
			use: function(t) {
				return new r(function(e, r) {
					KISSY.use([t], function(t, r) {
						e(r)
					}, function(t) {
						r(t)
					})
				})
			}
		}
	}(), a = function(t) {
		var e = {};
		return t = {
			__events: {},
			on: function(t, e, r) {
				if(t) {
					if("function" != typeof e) throw new Error("event handler must be a function.");
					this.__events[t] || (this.__events[t] = []), this.__events[t].push({
						hander: e,
						scope: r
					})
				}
			},
			fire: function(t, e) {
				if(t) {
					var r = this.__events[t];
					if(r)
						for(var n = 0, o = r.length; n < o; n++) {
							var a = r[n];
							a.scope ? a.hander.call(a.scope, e) : a.hander.call(this, e)
						}
				}
			},
			off: function(t, e) {
				if(t) {
					var r = this.__events[t];
					if(e) {
						for(var n = 0, o = r.length; n < o; n++)
							if(r[n].hander === e) {
								r.splice(n, 1);
								break
							}
					} else this.__events[t] = null
				}
			},
			broadcast: function(t, r) {
				var n = e[t],
					o = 0;
				if(void 0 !== n) {
					var a = [].slice.call(arguments, 0);
					a = a.length > 2 ? a.splice(2, a.length - 1) : [], a = [r].concat(a), o = n.length;
					for(var i = 0; i < o; i++) {
						var c = n[i];
						c && c.callback && (a = a.concat(c.args), c.callback.apply(c.scope, a))
					}
				}
				return this
			},
			subscribe: function(t, r, n) {
				t = t || [];
				var o = [].slice.call(arguments);
				"string" == typeof t && (t = t.split(","));
				var a = t.length;
				if(0 === a) return this;
				o = o.length > 3 ? o.splice(3, o.length - 1) : [];
				for(var i = 0; i < a; i++) {
					var c = t[i];
					e[c] = e[c] || [], e[c].push({
						callback: r,
						scope: n,
						args: o
					})
				}
				return this
			},
			unsubscribe: function(t, r, n) {
				var o = e[t];
				if(!o) return this;
				if(r) {
					for(var a = o.length, i = [], c = 0; c < a; c++) {
						var s = o[c];
						s.callback == r && s.scope == n || i.push(s)
					}
					o = i
				} else o.length = 0;
				return this
			}
		}
	}(), i = function(t) {
		function e(t, e) {
			for(var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
			return t
		}

		function r(t, e) {
			return e && n.isArray(t) && (t = t[0] && t[0][e]), "true" === t || t === !0
		}
		var n = h;
		return n.isTrue = r, t = {
			extend: e
		}
	}(), c = function(t) {
		var e = "NOT_EMPTY",
			r = h;
		return t = {
			array: {
				maxItems: function(t, e) {
					if(r.isArray(t) && t.length <= e) return !0
				},
				minItems: function(t, e) {
					if(r.isArray(t) && t.length >= e) return !0
				}
			},
			object: {
				required: function(t, e) {
					if(r.isArray(e)) {
						var n = !0;
						return r.each(e, function(e) {
							t.hasOwnProperty(e) || (n = !1)
						}), n
					}
				}
			},
			properties: function(t, r) {
				var n = !0;
				for(var o in r)
					if(r.hasOwnProperty(o))
						if(t.hasOwnProperty(o)) {
							var a = (r[o], t[o]);
							a.format && a.format === e && (t[o] || (n = !1))
						} else n = !1;
				return n
			},
			notEmpty: function(t, e) {
				for(var r = !0, n = 0, o = e.length; n < o; n++) {
					var a = e[n],
						i = {};
					i[a] = {
						format: "NOT_EMPTY"
					};
					var c = this.properties(t, i);
					if(!c) {
						r = !1;
						break
					}
				}
				return r
			}
		}
	}(), s = function(t) {
		var e = b,
			r = _,
			n = h,
			o = x,
			a = new o;
		return t = {
			getNewUrl: function(t, o) {
				if(o = o || {}, !t || "string" != typeof t) return "";
				var a = o.size || "",
					i = o.q || "",
					c = "",
					s = o.xz ? "xz" : "";
				a + s + i && (c = "_" + a + s + i, c += ".jpg");
				try {
					var u = e.parse(t)
				} catch(l) {
					return t
				}
				var f = u.host,
					p = u.pathname,
					g = (u.protocol, "img.alicdn.com");
				u.protocol = "";
				var d = ["a.tbcdn.cn", "assets.alicdn.com", "wwc.taobaocdn.com", "wwc.alicdn.com", "cbu01.alicdn.com"];
				if(n.inArray(d, f)) return /alicdn/.test(f) || (u.protocol = "http:"), "//" + e.format(u);
				var h = f.match(/(.+\.(?:alicdn)\.com)/);
				if(h && h[0] != g && (u.host = g), o && o.isOriginal) return "//" + e.format(u);
				var m = /_(\d+x\d+|cy\d+i\d+|sum|m|b)?(xz|xc)?(q\d+)?(s\d+)?(\.jpg)?(_\.webp)?$/i,
					w = p.match(m);
				if(/\.gif/.test(p)) return "//" + e.format(u);
				/\.png/.test(p) && (c = c.replace(/(q\d+)(s\d+)/, "")), o.webp && r.get("webp") && (c += "_.webp");
				var v = /_\.(jpg|png|gif|jpeg)/;
				if(w) w[1] || w[2] || w[3] || w[4] ? u.pathname = p.replace(m, c) : w[0].match(v) && (u.pathname += c);
				else if(p.match(/_\.webp$/g)) {
					var y = /_\.webp$/g;
					u.pathname = p.replace(y, c)
				} else u.pathname = p + c;
				return "//" + e.format(u)
			},
			toDataUrl: function(t, e) {
				if(!window.XMLHttpRequest || !window.FileReader) return e(t);
				try {
					var r = new XMLHttpRequest;
					r.responseType = "blob", r.onload = function() {
						var t = new FileReader;
						t.onloadend = function() {
							e(t.result)
						}, t.readAsDataURL(r.response)
					}, r.open("GET", t), r.send()
				} catch(n) {}
			},
			getImageAndCache: function(t, e, r, n) {
				var t = this.getNewUrl(t, e),
					o = this;
				"function" != typeof r && (r = function(e) {
					e && e !== t && a.setItem(t, e)
				});
				var i = a.getItem(t);
				return i ? i : (n ? this.toDataUrl(t, r) : setTimeout(function() {
					o.toDataUrl(t, r)
				}, 8e3), t)
			},
			response: function(t, e, n, o, a, i) {
				e = n && r.get("retina") ? n : e;
				var c;
				if(e) {
					var c = {};
					c.size = e, o && "q" === o.charAt(0) && (c.q = o), a && r.get("webp") && (c.webp = a)
				} else c = {
					isOriginal: !0
				};
				return i && (c.xz = !0), t = this.getNewUrl(t, c)
			}
		}
	}(), u = function(t) {
		function e(t, e, r) {
			e = e || {};
			try {
				var n = {
						data: e,
						$runtime: a,
						_: i
					},
					o = t(n);
				return o
			} catch(s) {
				window.console && window.console.log(s), c.send({
					category: "tbh_render_error_" + r.name,
					msg: JSON.stringify({
						message: s && s.message,
						stack: s.stack
					})
				})
			}
		}
		var r = O,
			o = r.all,
			a = {},
			i = h,
			c = n;
		return window._ = window._ || {}, window._.escape = i.escapeHTML, t = {
			render: function(t, r, n, a) {
				var i = e(t, r, this),
					c = o(i);
				return n ? (o(n).html("").append(c), c) : c
			},
			renderTo: function(t, r, n) {
				var a = e(t, r, this),
					i = o(a);
				return o(n).append(i), i
			},
			config: function(t) {
				for(var e in t) t.hasOwnProperty(e) && (a[e] = t[e])
			}
		}
	}(), l = function(t) {
		function e(t, e, n, o) {
			if(!t || !e) return t;
			var a = e.prototype,
				i = Object.create(a);
			return t.prototype = i, i.constructor = t, t.superclass = a, e != Object && a.constructor == Object.prototype && (a.constructor = e), n && r.extend(i, n), o && r.extend(t, o), t
		}
		var r = i;
		return "function" != typeof Object.create && (Object.create = function(t) {
			function e() {}
			return e.prototype = t, new e
		}), t = e
	}(), f = function(t) {
		function e() {
			var t = arguments[0] || {},
				t = c.extend(this.defaults(), t);
			this.__events = {}, r(this, t)
		}

		function r(t, e, r) {
			var n;
			for(var o in e) e.hasOwnProperty(o) && (n = e[o], t[o] = n)
		}
		var n = a,
			o = l,
			c = i;
		return c.extend(e.prototype, n), e.inherit = o, e.extend = function(t, r, n) {
			o(t, e, r, n)
		}, e.prototype.constructor = e, e.prototype.defaults = function() {
			return {}
		}, e.prototype.get = function(t) {
			return this[t]
		}, e.prototype.set = function(t, e) {
			this[t] = e
		}, t = e
	}(), p = function(t) {
		function e() {
			if(e.superclass.constructor.apply(this, arguments), !this.name) throw new Error("module name cannot be null, please check you code.");
			this.init()
		}
		var r = u,
			i = o,
			l = a,
			p = f,
			g = x,
			d = _,
			m = new g,
			w = n,
			v = c,
			y = j,
			b = s,
			O = h;
		return e.inherit = p.inherit, e.extend = function(t, r, n) {
			e.inherit(t, e, r, n)
		}, p.extend(e, O.merge({
			init: function() {},
			render: r.render,
			renderTo: r.renderTo
		}, i, l, {
			offline: m,
			validator: v
		}, {
			__lazyload: function(t) {},
			getLazyloadConfig: function() {
				return {}
			},
			godlog: function(t, e, r, n, o) {
				w({
					goldlog: [t, e, r, n],
					msg: o || [t, r].join(":") + "\u66dd\u5149"
				})
			},
			report: function(t, e) {
				var r = t.category || this.category || "ERROR_" + this.name + "_data_err",
					n = t.type || "warn",
					o = {
						type: n,
						data: t.data || {},
						desc: t.msg || "",
						name: this.name
					};
				t.extra && (o.extra = t.extra), w({
					category: r,
					msg: y.stringify(o)
				}, e || "warn")
			},
			reportCache: function(t, e) {
				t = O.merge({
					data: {
						step: 10,
						stepName: "storage"
					},
					msg: "storage"
				}, t), this.report(t, e)
			},
			reportBackup: function(t, e) {
				t = O.merge({
					data: {
						step: 11,
						stepName: "backup"
					},
					msg: "backup"
				}, t), this.report(t, e)
			},
			reportCDN: function(t, e) {
				t = O.merge({
					data: {
						step: 100,
						stepName: "cdn"
					},
					msg: "cdn"
				}, t), this.report(t, e)
			},
			reportError: function(t, e) {
				t = O.merge({
					data: {
						step: -1
					},
					msg: "empty"
				}, t), this.report(t, e)
			}
		})), r.config({
			placeholder: "//g.alicdn.com/s.gif",
			suffix: function(t, e, r, n) {
				var o = "_";
				return o += d.get("retina") ? e : t, r && (o += r), n && d.get("webp") && (o += "_.webp"), o
			},
			isTrue: O.isTrue,
			https: function(t) {
				return t = b.getNewUrl(t, {
					isOriginal: !0
				})
			},
			image: function(t, e, r, n, o, a) {
				return b.response.apply(b, arguments)
			}
		}), t = e
	}(), g = function(t) {
		return t = p
	}(), r.exports = g
});
define("kg/pattern/2.0.5/lib/image", ["url", "kg/session/0.0.1/index", "util", "kg/offline/7.0.1/index"], function(e, t, a) {
	var n = e("url"),
		r = e("kg/session/0.0.1/index"),
		i = e("util"),
		o = e("kg/offline/7.0.1/index"),
		c = new o;
	a.exports = {
		getNewUrl: function(e, t) {
			if(t = t || {}, !e || "string" != typeof e) return "";
			var a = t.size || "",
				o = t.q || "",
				c = "",
				s = t.xz ? "xz" : "";
			a + s + o && (c = "_" + a + s + o, c += ".jpg");
			try {
				var l = n.parse(e)
			} catch(p) {
				return e
			}
			var f = l.host,
				u = l.pathname,
				d = (l.protocol, "img.alicdn.com");
			l.protocol = "";
			var m = ["a.tbcdn.cn", "assets.alicdn.com", "wwc.taobaocdn.com", "wwc.alicdn.com", "cbu01.alicdn.com"];
			if(i.inArray(m, f)) return /alicdn/.test(f) || (l.protocol = "http:"), "//" + n.format(l);
			var g = f.match(/(.+\.(?:alicdn)\.com)/);
			if(g && g[0] != d && (l.host = d), t && t.isOriginal) return "//" + n.format(l);
			var w = /_(\d+x\d+|cy\d+i\d+|sum|m|b)?(xz|xc)?(q\d+)?(s\d+)?(\.jpg)?(_\.webp)?$/i,
				h = u.match(w);
			if(/\.gif/.test(u)) return "//" + n.format(l);
			/\.png/.test(u) && (c = c.replace(/(q\d+)(s\d+)/, "")), t.webp && r.get("webp") && (c += "_.webp");
			var b = /_\.(jpg|png|gif|jpeg)/;
			if(h) h[1] || h[2] || h[3] || h[4] ? l.pathname = u.replace(w, c) : h[0].match(b) && (l.pathname += c);
			else if(u.match(/_\.webp$/g)) {
				var v = /_\.webp$/g;
				l.pathname = u.replace(v, c)
			} else l.pathname = u + c;
			return "//" + n.format(l)
		},
		toDataUrl: function(e, t) {
			if(!window.XMLHttpRequest || !window.FileReader) return t(e);
			try {
				var a = new XMLHttpRequest;
				a.responseType = "blob", a.onload = function() {
					var e = new FileReader;
					e.onloadend = function() {
						t(e.result)
					}, e.readAsDataURL(a.response)
				}, a.open("GET", e), a.send()
			} catch(n) {}
		},
		getImageAndCache: function(e, t, a, n) {
			var e = this.getNewUrl(e, t),
				r = this;
			"function" != typeof a && (a = function(t) {
				t && t !== e && c.setItem(e, t)
			});
			var i = c.getItem(e);
			return i ? i : (n ? this.toDataUrl(e, a) : setTimeout(function() {
				r.toDataUrl(e, a)
			}, 8e3), e)
		},
		response: function(e, t, a, n, i, o) {
			t = a && r.get("retina") ? a : t;
			var c;
			if(t) {
				var c = {};
				c.size = t, n && "q" === n.charAt(0) && (c.q = n), i && r.get("webp") && (c.webp = i)
			} else c = {
				isOriginal: !0
			};
			return o && (c.xz = !0), e = this.getNewUrl(e, c)
		}
	}
});
define("kg/pattern/2.0.5/lib/reporter", ["ua", "util"], function(o, n, e) {
	var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
		},
		r = o("ua"),
		t = (window.location.hostname, o("util"));
	window.JSTracker2 = window.JSTracker2 || [], e.exports = function(o, n) {
		if(o.category) {
			if(r.ie && r.ie < 8) return;
			o.sampling = o.sampling || 10;
			var e = "http://jstracker.www.taobao.com/0.0.3/" + o.category;
			e = e.slice(0, 200), window.JSTracker2.push({
				msg: o.msg,
				url: e,
				sampling: o.sampling
			})
		}
		t.isArray(o.goldlog) && (o.goldlog[3] || (o.goldlog[3] = "H46896569"), "object" === l(o.goldlog[2]) && (o.goldlog[2] = t.param(o.goldlog[2])), (window.goldlog_queue || (window.goldlog_queue = [])).push({
			action: "goldlog.record",
			arguments: o.goldlog
		}));
		var i = window.location.search,
			g = !1;
		i && (i = t.unparam(i.slice(1)), g = i.hasOwnProperty("_console") || i.hasOwnProperty("_debug")), o.msg && g && (n = n || "info", r.ie && r.ie <= 8 && (n = "log"), window.console && window.console[n] && window.console[n]("[REPORTER LOG] " + o.msg))
	}
});
define("kg/pattern/2.0.5/lib/io", ["kg/xctrl/6.10.3/xctrl-kissy", "promise", "io", "util", "kg/route-map-http/0.0.3/index"], function(t, n, r) {
	var e = t("kg/xctrl/6.10.3/xctrl-kissy"),
		i = t("promise"),
		o = t("io"),
		a = t("util"),
		u = t("kg/route-map-http/0.0.3/index");
	r.exports = {
		xctrl: function(t) {
			return new i(function(n, r) {
				t.callback = function(t) {
					t ? n(t) : r(t)
				}, e.dynamic(t)
			})
		},
		jsonp: function(t) {
			"string" == typeof t && (t = {
				url: t
			});
			var n = {
				dataType: "jsonp",
				timeout: 5
			};
			if(!t.url) throw new Error("jsonp request need url");
			return t = a.merge(n, t), this.ajax(t)
		},
		ajax: function(t) {
			return new i(function(n, r) {
				t.success = function(t) {
					n(t)
				}, t.error = function(t, n) {
					r({
						message: n
					})
				}, o(t)
			})
		},
		tarzan: function(t) {
			"string" == typeof t && (t = {
				url: t
			});
			var n = new u({
				api: t.url,
				data: t.data || {},
				dirName: "pctaobao"
			});
			return this.jsonp({
				url: n.getCDNAddress(),
				timeout: 60,
				jsonpCallback: n.getJSONPCallbak(),
				cache: !0
			})
		},
		use: function(t) {
			return new i(function(n, r) {
				KISSY.use([t], function(t, r) {
					n(r)
				}, function(t) {
					r(t)
				})
			})
		}
	}
});
define("kg/home-2017/0.0.5/c/fixedtool/index.css", ["node"], function(o, t, i) {
	"use strict";
	var e = o("node");
	i.exports = e("<style>div.tbh-fixedtool .ft1190{margin-right:-633px}div.tbh-fixedtool .ft990{margin-right:-533px}div.tbh-fixedtool.left .ft1190{margin-left:-633px;margin-right:auto}div.tbh-fixedtool.left .ft990{margin-left:-533px;margin-right:auto}.fixedtool{display:none;position:absolute;z-index:4;top:837px;right:50%;width:50px;text-align:center;margin-right:-655px}.fixedtool .wangwang.tb-ifont{position:absolute;height:36px;width:50px;line-height:36px;text-align:center;font-size:32px;color:#ff7f13;top:-28px;right:0}.fixedtool.left{left:50%;right:auto;margin-right:auto;margin-left:-655px;top:auto;bottom:50px}.fixedtool a{display:block;height:44px;position:relative;text-decoration:none;padding:6px 8px 0;font-size:14px;line-height:40px;background:#fff}.fixedtool a:after{content:'';border-bottom:1px solid #efefef;width:34px;position:absolute;left:8px;bottom:-1px;z-index:1}.fixedtool a:last-child:after{border-bottom:none}.fixedtool a.fixedtool-1{-webkit-border-top-left-radius:8px;-moz-border-radius-topleft:8px;border-top-left-radius:8px;-webkit-border-top-right-radius:8px;-webkit-background-clip:padding-box;-moz-border-radius-topright:8px;-moz-background-clip:padding;border-top-right-radius:8px;background-clip:padding-box}.fixedtool a.fixedtool-9{-webkit-border-bottom-left-radius:8px;-moz-border-radius-bottomleft:8px;border-bottom-left-radius:8px;-webkit-border-bottom-right-radius:8px;-webkit-background-clip:padding-box;-moz-border-radius-bottomright:8px;-moz-background-clip:padding;border-bottom-right-radius:8px;background-clip:padding-box}.fixedtool a.fixedtool-8 i{font-size:12px}.fixedtool a i{font-style:normal;font-size:14px;display:block;line-height:40px}.fixedtool a.on,.fixedtool a:hover{z-index:2;text-decoration:none;color:#FFF;background-repeat:no-repeat;font-weight:700;background-repeat:repeat-x;background-image:-webkit-linear-gradient(135deg,#ff971b,#ff5000);background-image:-o-linear-gradient(135deg,#ff971b,#ff5000);background-image:linear-gradient(135deg,#ff971b,#ff5000);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffff5000', endColorstr='#ffff6f06', GradientType=1)}.fixedtool a.on .tb-ifont,.fixedtool a:hover .tb-ifont{color:#FFF}.fixedtool a:focus{outline:0}.fixedtool a em{position:absolute;right:-30px;width:40px;height:40px;text-indent:-9999px;z-index:2;top:5px}.fixedtool .fixedtool-7 .tb-ifont{color:#999;position:relative;line-height:20px}a.fixedtool-1,a.fixedtool-3,a.fixedtool-4,a.fixedtool-5,a.fixedtool-6,a.fixedtool-7,a.fixedtool-9{line-height:17px;font-size:13px}a.fixedtool-7,a.fixedtool-8,a.fixedtool-9{font-size:12px}a.fixedtool-1{color:#F40;padding-top:10px;height:40px}a.fixedtool-1.on,a.fixedtool-1:hover{background-color:#F40}.fixedtool-3{color:#f05}.fixedtool-4{color:#8d7afb}.fixedtool-5{color:#A8C001}.fixedtool-2{color:#a2745b}a.fixedtool-6{color:#F40}.fixedtool-8 strong i,.fixedtool-9 strong i{font-size:12px}</style>").appendTo("head")
});
define("kg/pattern/2.0.5/lib/event", [], function(e, t, n) {
	var r = {};
	n.exports = {
		__events: {},
		on: function(e, t, n) {
			if(e) {
				if("function" != typeof t) throw new Error("event handler must be a function.");
				this.__events[e] || (this.__events[e] = []), this.__events[e].push({
					hander: t,
					scope: n
				})
			}
		},
		fire: function(e, t) {
			if(e) {
				var n = this.__events[e];
				if(n)
					for(var r = 0, s = n.length; r < s; r++) {
						var i = n[r];
						i.scope ? i.hander.call(i.scope, t) : i.hander.call(this, t)
					}
			}
		},
		off: function(e, t) {
			if(e) {
				var n = this.__events[e];
				if(t) {
					for(var r = 0, s = n.length; r < s; r++)
						if(n[r].hander === t) {
							n.splice(r, 1);
							break
						}
				} else this.__events[e] = null
			}
		},
		broadcast: function(e, t) {
			var n = r[e],
				s = 0;
			if(void 0 !== n) {
				var i = [].slice.call(arguments, 0);
				i = i.length > 2 ? i.splice(2, i.length - 1) : [], i = [t].concat(i), s = n.length;
				for(var a = 0; a < s; a++) {
					var c = n[a];
					c && c.callback && (i = i.concat(c.args), c.callback.apply(c.scope, i))
				}
			}
			return this
		},
		subscribe: function(e, t, n) {
			e = e || [];
			var s = [].slice.call(arguments);
			"string" == typeof e && (e = e.split(","));
			var i = e.length;
			if(0 === i) return this;
			s = s.length > 3 ? s.splice(3, s.length - 1) : [];
			for(var a = 0; a < i; a++) {
				var c = e[a];
				r[c] = r[c] || [], r[c].push({
					callback: t,
					scope: n,
					args: s
				})
			}
			return this
		},
		unsubscribe: function(e, t, n) {
			var s = r[e];
			if(!s) return this;
			if(t) {
				for(var i = s.length, a = [], c = 0; c < i; c++) {
					var l = s[c];
					l.callback == t && l.scope == n || a.push(l)
				}
				s = a
			} else s.length = 0;
			return this
		}
	}
});