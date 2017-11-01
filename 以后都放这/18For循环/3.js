/*!
Copyright 2015, KISSY v6.2.4
MIT Licensed
*/
! function e(t, n, r) {
	function i(a, u) {
		if(!n[a]) {
			if(!t[a]) {
				var s = "function" == typeof require && require;
				if(!u && s) return s(a, !0);
				if(o) return o(a, !0);
				throw new Error("Cannot find module '" + a + "'")
			}
			var c = n[a] = {
				exports: {}
			};
			t[a][0].call(c.exports, function(e) {
				var n = t[a][1][e];
				return i(n ? n : e)
			}, c, c.exports, e, t, n, r)
		}
		return n[a].exports
	}
	for(var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
	return i
}({
	1: [function(e) {
		function t() {}
		var n = e("runtime"),
			r = e("querystring"),
			i = e("util"),
			o = e("path"),
			a = e("url"),
			u = e("ua"),
			s = e("feature");
		e("loader");
		var c = e("logger-manager");
		e("meta"), n.add("querystring", function() {
			return r
		}), n.add("util", function() {
			return i
		}), n.add("util-base", function() {
			return i
		}), n.add("util-extra", function() {
			return i
		}), n.add("path", function() {
			return o
		}), n.add("url", function() {
			return a
		}), n.add("ua", function() {
			return u
		}), n.add("feature", function() {
			return s
		}), n.add("io-script", function() {
			return n.getScript
		}), n.add("logger-manager", function() {
			return c
		}), location && -1 !== (location.search || "").indexOf("ks-debug") && (n.Config.debug = !0), n.addMember("UA", u), n.addMember("Feature", s), i.mix(n, i), n.addMember("getLogger", c.getLogger), n.addMember("log", n.Config.debug ? c.log : t), n.addMember("error", n.Config.debug ? c.error : t)
	}, {
		feature: 2,
		loader: 4,
		"logger-manager": 21,
		meta: 23,
		path: 24,
		querystring: 26,
		runtime: 28,
		ua: 29,
		url: 31,
		util: 33
	}],
	2: [function(e, t) {
		var n = e("./lib/feature");
		t.exports = n
	}, {
		"./lib/feature": 3
	}],
	3: [function(e, t) {
		function n() {
			return arguments[1].toUpperCase()
		}

		function r(e) {
			if(-1 !== e.indexOf("-") && (e = e.replace(y, n)), e in g) return g[e];
			if(!o || e in o) g[e] = {
				propertyName: e,
				propertyNamePrefix: ""
			};
			else {
				for(var t, r = e.charAt(0).toUpperCase() + e.slice(1), i = 0; l > i; i++) {
					var a = c[i];
					t = a + r, t in o && (g[e] = {
						propertyName: t,
						propertyNamePrefix: a
					})
				}
				g[e] = g[e] || null
			}
			return g[e]
		}
		var i, o, a, u, s = window,
			c = ["Webkit", "Moz", "O", "ms"],
			l = c.length,
			f = s.document || {},
			d = f && f.documentElement,
			m = !0,
			p = !1,
			h = "ontouchstart" in f && !window.callPhantom,
			g = {},
			v = f.documentMode;
		d && (d.querySelector && 8 !== v && (p = !0), o = d.style, m = "classList" in d, i = "msPointerEnabled" in navigator, a = "pointerEnabled" in navigator);
		var y = /-([a-z])/gi;
		t.exports = {
			isMsPointerSupported: function() {
				return i
			},
			isPointerSupported: function() {
				return a
			},
			isTouchEventSupported: function() {
				return h
			},
			isTouchGestureSupported: function() {
				return h || a || i
			},
			isDeviceMotionSupported: function() {
				return !!s.DeviceMotionEvent
			},
			isHashChangeSupported: function() {
				return "onhashchange" in s && (!v || v > 7)
			},
			isInputEventSupported: function() {
				return "oninput" in s && (!v || v > 9)
			},
			isTransform3dSupported: function() {
				if(void 0 !== u) return u;
				if(d && r("transform")) try {
					var e = f.createElement("p"),
						t = r("transform").propertyName;
					d.insertBefore(e, d.firstChild), e.style[t] = "translate3d(1px,1px,1px)";
					var n = s.getComputedStyle(e),
						i = n.getPropertyValue(t) || n[t];
					d.removeChild(e), u = void 0 !== i && i.length > 0 && "none" !== i
				} catch(o) {
					u = !0
				} else u = !1;
				return u
			},
			isClassListSupported: function() {
				return m
			},
			isQuerySelectorSupported: function() {
				return p
			},
			getCssVendorInfo: function(e) {
				return r(e)
			}
		}
	}, {}],
	4: [function(e, t) {
		var n = e("runtime"),
			r = e("io-script"),
			i = e("./lib/fns"),
			o = e("./lib/setup"),
			a = e("./lib/config"),
			u = e("./lib/utils"),
			s = (e("./lib/data-structure"), e("./lib/configs"), e("./lib/combo-loader")),
			c = e("./lib/loader");
		e("./lib/init"), e("./lib/i18n"), o.config = a, o.Utils = u, o.getScript = r, o.ComboLoader = s, o.WaitingModules = c.WaitingModules, n.addMember("config", a), n.addMember("getScript", r), n.addMember("add", c.add), n.addMember("use", c.use), n.addMember("require", c.require), n.addMember("setImmediate", i.setImmediate), t.exports = o
	}, {
		"./lib/combo-loader": 5,
		"./lib/config": 6,
		"./lib/configs": 7,
		"./lib/data-structure": 8,
		"./lib/fns": 9,
		"./lib/i18n": 10,
		"./lib/init": 11,
		"./lib/loader": 12,
		"./lib/setup": 13,
		"./lib/utils": 15,
		"io-script": 16,
		runtime: 28
	}],
	5: [function(e, t) {
		function n(e, t, n, r, i) {
			function o() {
				--a || n(f, u)
			}
			var a = t && t.length,
				u = [],
				f = [];
			c.each(t, function(t) {
				var n, a = {
					timeout: i,
					success: function() {
						f.push(t), n && b && (l.registerModule(e, n.name, b.factory, b.config), b = void 0), o()
					},
					error: function() {
						u.push(t), o()
					},
					charset: r
				};
				t.combine || (n = t.mods[0], "css" === n.getType() ? n = void 0 : d && (x = n.name, w = (new Date).valueOf(), a.attrs = {
					"data-mod-name": n.name
				})), s.Config.loadModsFn(t, a)
			})
		}

		function r(e, t) {
			c.mix(this, {
				runtime: e,
				waitingModules: t
			})
		}

		function i(e, t) {
			if(!e && "function" == typeof t && (t.length > 1 || t.define)) {
				var n = l.getRequiresFromFn(t);
				n.length && (e = e || {}, e.requires = n)
			} else e && e.requires && !e.cjs && (e.cjs = 0);
			return e
		}

		function o() {
			var e, t, n, r, i = s.Env.host.document.getElementsByTagName("script");
			for(t = i.length - 1; t >= 0; t--)
				if(r = i[t], "interactive" === r.readyState) {
					e = r;
					break
				}
			return n = e ? e.getAttribute("data-mod-name") : x
		}

		function a(e) {
			c.each(e, function(e) {
				var t = [];
				c.each(e.mods, function(e) {
					e.status === h && t.push(e.name)
				})
			})
		}

		function u(e, t) {
			e = e.split(/\//), t = t.split(/\//);
			for(var n = Math.min(e.length, t.length), r = 0; n > r && e[r] === t[r]; r++);
			return e.slice(0, r).join("/") + "/"
		}
		var s = e("runtime/index"),
			c = e("./fns"),
			l = e("./utils"),
			f = e("./setup").Status,
			d = c.ieMode < 10,
			m = l.getHash,
			p = f.LOADING,
			h = f.LOADED,
			g = f.READY_TO_ATTACH,
			v = f.ERROR,
			y = (new Date).valueOf();
		r.groupTag = y;
		var b, x, w;
		r.add = function(e, t, n, r, a) {
			if(3 === a && c.isArray(t)) {
				var u = t;
				t = n, n = {
					requires: u,
					cjs: 1
				}
			}
			"function" == typeof e || 1 === a ? (n = t, t = e, n = i(n, t), d ? (e = o(), l.registerModule(r, e, t, n), x = null, w = 0) : b = {
				factory: t,
				config: n
			}) : (d ? (x = null, w = 0) : b = void 0, n = i(n, t), l.registerModule(r, e, t, n))
		}, c.mix(r.prototype, {
			use: function(e) {
				var t, r, i = this,
					o = s.Config.timeout,
					u = i.runtime;
				t = c.keys(i.calculate(e)), l.createModulesInfo(u, t), r = i.getComboUrls(t), c.each(r.css, function(e) {
					n(u, e, function(e, t) {
						a(e), c.each(e, function(e) {
							c.each(e.mods, function(e) {
								l.registerModule(u, e.name, s.noop), e.notifyAll()
							})
						}), c.each(t, function(e) {
							c.each(e.mods, function(t) {
								var n = t.name + " is not loaded! can not find module in path : " + e.fullpath;
								console && console.error(n), t.status = v, t.notifyAll()
							})
						})
					}, e.charset, o)
				}), c.each(r.js, function(e) {
					n(u, e, function(t) {
						a(t), c.each(e, function(e) {
							c.each(e.mods, function(t) {
								if(!t.factory) {
									var n = t.name + " is not loaded! can not find module in path : " + e.fullpath;
									console && console.error(n), t.status = v
								}
								t.notifyAll()
							})
						})
					}, e.charset, o)
				})
			},
			calculate: function(e, t, n) {
				var r, i, o, a, u = this,
					s = u.waitingModules,
					c = u.runtime;
				for(n = n || {}, t = t || {}, r = 0; r < e.length; r++) i = e[r], t[i] || (t[i] = 1, o = l.createModuleInfo(c, i), a = o.status, a >= g || (a !== h && (s.contains(i) || (a !== p && (o.status = p, n[i] = 1), o.wait(function(e) {
					s.remove(e.name), s.notifyAll()
				}), s.add(i))), u.calculate(o.getNormalizedRequires(), t, n)));
				return n
			},
			getComboMods: function(e, t) {
				for(var n, r, i, o, a, s, f, d, m, p, h, g, v, b = {}, x = this.runtime, w = 0, M = e.length; M > w; ++w) {
					r = e[w], i = l.createModuleInfo(x, r), a = i.getType(), v = i.getFullPath(), o = i.getPackage(), h = o.name, m = o.getCharset(), d = o.getTag(), g = o.getGroup(), p = o.getPrefixUriForCombo(), n = o.getPackageUri();
					var A = h;
					if((i.canBeCombined = o.isCombine() && c.startsWith(v, p)) && g) {
						A = g + "_" + m + "_" + y;
						var E;
						(E = t[A]) ? E.isSameOriginAs(n) ? E.setPath(u(E.getPath(), n.getPath())) : (A = h, t[h] = n): t[A] = n.clone()
					} else t[h] = n;
					s = b[a] = b[a] || {}, (f = s[A]) ? (1 !== f.tags.length || f.tags[0] !== d) && f.tags.push(d) : (f = s[A] = [], f.charset = m, f.tags = [d]), f.push(i)
				}
				return b
			},
			getComboUrls: function(e) {
				var t = this.runtime,
					n = t.Config,
					r = n.comboPrefix,
					i = n.comboSep,
					o = n.comboMaxFileNum,
					a = n.comboMaxUrlLength,
					u = {},
					s = this.getComboMods(e, u),
					c = {};
				for(var l in s) {
					c[l] = {};
					for(var f in s[l]) {
						var d = [],
							p = [],
							h = s[l][f],
							g = h.tags,
							v = g.length > 1 ? m(g.join("")) : g[0],
							y = v ? "?t=" + encodeURIComponent(v) + "." + l : "",
							b = y.length,
							x = u[f].toString(),
							w = x.length,
							M = x + r,
							A = c[l][f] = [],
							E = M.length;
						A.charset = h.charset, A.mods = [];
						for(var q = function() {
								A.push({
									combine: 1,
									fullpath: M + d.join(i) + y,
									mods: p
								})
							}, C = 0; C < h.length; C++) {
							var S = h[C];
							A.mods.push(S);
							var O = S.getFullPath();
							if(S.canBeCombined) {
								var k = O.slice(w).replace(/\?.*$/, "");
								d.push(k), p.push(S), (d.length > o || E + d.join(i).length + b > a) && (d.pop(), p.pop(), q(), d = [], p = [], C--)
							} else A.push({
								combine: 0,
								fullpath: O,
								mods: [S]
							})
						}
						d.length && q()
					}
				}
				return c
			}
		}), t.exports = r
	}, {
		"./fns": 9,
		"./setup": 13,
		"./utils": 15,
		"runtime/index": 28
	}],
	6: [function(e, t) {
		var n = e("runtime/index"),
			r = e("./fns"),
			i = function(e, t) {
				var i, o, a, u = n,
					s = n.Config,
					c = s.fns;
				return r.isObject(e) ? r.each(e, function(e, t) {
					a = c[t], a ? a.call(u, e) : s[t] = e
				}) : (i = c[e], void 0 === t ? o = i ? i.call(u) : s[e] : i ? o = i.call(u, t) : s[e] = t), o
			};
		t.exports = i
	}, {
		"./fns": 9,
		"runtime/index": 28
	}],
	7: [function(e) {
		function t(e) {
			var t;
			return e = e.replace(/\\/g, "/"), "/" !== e.charAt(e.length - 1) && (e += "/"), n ? t = n.resolve(e) : (l.startsWith(e, "file:") || (e = "file:" + e), t = new a(e)), t
		}
		var n, r, i = e("runtime"),
			o = e("io-script"),
			a = e("./uri"),
			u = e("./utils"),
			s = e("./setup").Status,
			c = e("./data-structure"),
			l = e("./fns"),
			f = i.Env.host,
			d = f.location,
			m = i.Config.fns;
		!l.nodejs && d && (r = d.href) && (n = new a(r)), i.Config.loadModsFn = function(e, t) {
			o(e.fullpath, t)
		}, m.packages = function(e) {
			var n, r = this.Config,
				o = r.packages = r.packages || {};
			return e ? void l.each(e, function(e, r) {
				n = e.name || r;
				var a = t(e.base || e.path);
				e.name = n, e.base = a.toString(), e.baseUri = a, e.runtime = i, delete e.path, o[n] ? o[n].reset(e) : o[n] = new c.Package(e)
			}) : e === !1 ? void(r.packages = {}) : o
		}, m.modules = function(e) {
			var t = this;
			e && l.each(e, function(e, n) {
				var r = u.createModuleInfo(t, n, e);
				r.status === s.INIT && l.mix(r, e)
			})
		}, m.base = function(e) {
			var n, r = this,
				i = r.Config;
			return e ? (n = t(e), i.base = n.toString(), void(i.baseUri = n)) : i.base
		}
	}, {
		"./data-structure": 8,
		"./fns": 9,
		"./setup": 13,
		"./uri": 14,
		"./utils": 15,
		"io-script": 16,
		runtime: 28
	}],
	8: [function(e, t) {
		function n(e, t) {
			return t in e ? e[t] : e.runtime.Config[t]
		}

		function r(e) {
			d.mix(this, e)
		}

		function i(e) {
			var t = this;
			t.exports = {}, t.status = p.INIT, t.name = void 0, t.factory = void 0, t.cjs = 1, d.mix(t, e), t.waitedCallbacks = []
		}

		function o(e) {
			for(var t = [], n = 0; n < e.length; n++) t[n] = e[n];
			return t
		}

		function a(e) {
			if("function" == typeof e && (e = {
					success: e
				}), e && e.success) {
				var t = e.success;
				return e.success = function() {
					t.apply(this, o(arguments).slice(1))
				}, e.sync = 1, e
			}
		}

		function u(e) {
			var t = e.name,
				n = "." + e.getType(),
				r = "-min";
			return t = l.join(l.dirname(t), l.basename(t, n)), e.getPackage().isDebug() && (r = ""), t + r + n
		}

		function s(e, t) {
			var n, r = e.config("packages"),
				i = t + "/",
				o = "";
			for(n in r) d.startsWith(i, n + "/") && n.length > o.length && (o = n);
			return r[o] || y
		}
		var c = e("runtime/index"),
			l = e("path/index"),
			f = e("./uri"),
			d = e("./fns"),
			m = e("./setup"),
			p = m.Status,
			h = e("./utils"),
			g = {},
			v = "ignorePackageNameInUri";
		r.prototype = {
			constructor: r,
			reset: function(e) {
				d.mix(this, e)
			},
			getTag: function() {
				return n(this, "tag")
			},
			getName: function() {
				return this.name
			},
			getBase: function() {
				return n(this, "base")
			},
			getPrefixUriForCombo: function() {
				var e = this,
					t = e.name;
				return e.getBase() + (t && !e.isIgnorePackageNameInUri() ? t + "/" : "")
			},
			getPackageUri: function() {
				var e = this;
				return e.packageUri = new f(this.getPrefixUriForCombo()), e.packageUri
			},
			getBaseUri: function() {
				return n(this, "baseUri")
			},
			isDebug: function() {
				return n(this, "debug")
			},
			isIgnorePackageNameInUri: function() {
				return n(this, v)
			},
			getCharset: function() {
				return n(this, "charset")
			},
			isCombine: function() {
				return n(this, "combine")
			},
			getGroup: function() {
				return n(this, "group")
			}
		}, g.Package = r, i.prototype = {
			kissy: 1,
			constructor: i,
			use: function(e, t) {
				return e = h.getModNamesAsArray(e), c.use(h.normalDepModuleName(this.name, e), t)
			},
			resolve: function(e) {
				return this.getFullPathUri().resolve(e)
			},
			resolveByName: function(e) {
				return h.normalDepModuleName(this.name, e)
			},
			require: function(e) {
				var t = this;
				if("string" == typeof e) return c.require(e, this.name);
				for(var n = e, r = 0; r < n.length; r++) n[r] = t.resolveByName(n[r]);
				var i = o(arguments);
				i[0] = n, i[1] = a(i[1]), c.use.apply(c, i)
			},
			wait: function(e) {
				this.waitedCallbacks.push(e)
			},
			notifyAll: function() {
				for(var e, t = this.waitedCallbacks.length, n = 0; t > n; n++)(e = this.waitedCallbacks[n])(this);
				this.waitedCallbacks = []
			},
			getType: function() {
				var e = this,
					t = e.type;
				return t || (t = ".css" === l.extname(e.name).toLowerCase() ? "css" : "js", e.type = t), t
			},
			getFullPathUri: function() {
				var e, t, n, r, i, o, a = this;
				return a.fullPathUri || (a.fullpath ? t = new f(a.fullpath) : (r = a.getPackage(), n = r.getBaseUri(), o = a.getPath(), r.isIgnorePackageNameInUri() && (i = r.name) && (o = l.relative(i, o)), t = n.resolve(o), (e = a.getTag()) && (e += "." + a.getType(), t.query.set("t", e))), a.fullPathUri = t), a.fullPathUri
			},
			getFullPath: function() {
				var e, t = this;
				return t.fullpath || (e = t.getFullPathUri(), t.fullpath = e.toString()), t.fullpath
			},
			getPath: function() {
				var e = this;
				return e.path || (e.path = u(e))
			},
			getName: function() {
				return this.name
			},
			getPackage: function() {
				var e = this;
				return e.packageInfo || (e.packageInfo = s(e.runtime, e.name))
			},
			getTag: function() {
				var e = this;
				return e.tag || e.getPackage().getTag()
			},
			getCharset: function() {
				var e = this;
				return e.charset || e.getPackage().getCharset()
			},
			getRequiresWithAlias: function() {
				var e = this,
					t = e.requiresWithAlias,
					n = e.requires;
				return n && 0 !== n.length ? (t || (e.requiresWithAlias = t = h.normalizeModNamesWithAlias(e.runtime, n, e.name)), t) : n || []
			},
			getRequiredMods: function() {
				var e = this,
					t = e.runtime;
				return d.map(e.getNormalizedRequires(), function(e) {
					return h.createModuleInfo(t, e)
				})
			},
			getNormalizedRequires: function() {
				var e, t = this,
					n = t.normalizedRequiresStatus,
					r = t.status,
					i = t.requires;
				return i && 0 !== i.length ? (e = t.normalizedRequires) && n === r ? e : (t.normalizedRequiresStatus = r, t.normalizedRequires = h.normalizeModNames(t.runtime, i, t.name), t.normalizedRequires) : i || []
			}
		}, g.Module = i;
		var y = new r({
			name: "",
			runtime: c
		});
		m.Package = g.Package, m.Module = g.Module, t.exports = g
	}, {
		"./fns": 9,
		"./setup": 13,
		"./uri": 14,
		"./utils": 15,
		"path/index": 24,
		"runtime/index": 28
	}],
	9: [function(e, t, n) {
		function r(e) {
			var t = [];
			for(var n in e) t.push(n);
			return t
		}

		function i(e) {
			var t = 0;
			return parseFloat(e.replace(/\./g, function() {
				return 0 === t++ ? "." : ""
			}))
		}

		function o(e, t, n) {
			function r() {}
			var i = [].slice,
				o = i.call(arguments, 3),
				a = function() {
					var a = i.call(arguments);
					return t.apply(this instanceof r ? this : n || this, e ? a.concat(o) : o.concat(a))
				};
			return r.prototype = t.prototype, a.prototype = new r, a
		}

		function a(e) {
			return encodeURIComponent(String(e))
		}

		function u(e) {
			return decodeURIComponent(e.replace(/\+/g, " "))
		}
		var s, c = e("runtime/index"),
			l = e("querystring"),
			f = c.Env.host,
			d = (f.navigator || {}).userAgent || "",
			m = Array.isArray || function(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			};
		(s = d.match(/Trident\/([\d.]*)/)) && (n.trident = i(s[1])), (s = d.match(/Gecko/)) && (n.gecko = .1, (s = d.match(/rv:([\d.]*)/)) && s[1] && (n.gecko = i(s[1]))), (s = d.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (v = s[1] || s[2]) && (n.ie = i(v), n.ieMode = f.document.documentMode || n.ie, n.trident = n.trident || 1),
		function() {
			function e() {
				for(var e, n = 0; e = t[n++];) e();
				n > 1 && (t = []), r = 0
			}
			var t = [],
				r = 0;
			n.setImmediate = function(e) {
				t.push(e), r || (r = 1, i())
			};
			var i;
			if("function" == typeof setImmediate) i = function() {
				setImmediate(e)
			};
			else if("undefined" != typeof MessageChannel) {
				var o = new MessageChannel;
				o.port1.onmessage = function() {
					i = a, o.port1.onmessage = e, e()
				};
				var a = function() {
					o.port2.postMessage(0)
				};
				i = function() {
					setTimeout(e, 0), a()
				}
			} else i = function() {
				setTimeout(e, 0)
			}
		}(), n.isArray = m, n.keys = r, n.bind = o(0, o, null, 0), n.indexOfArray = Array.prototype.indexOf ? function(e, t) {
			return Array.prototype.indexOf.call(t, e)
		} : function(e, t) {
			for(var n = 0, r = t.length; r > n; ++n)
				if(t[n] === e) return n;
			return -1
		}, n.map = Array.prototype.map ? function(e, t, n) {
			return Array.prototype.map.call(e, t, n || this)
		} : function(e, t, n) {
			for(var r = e.length, i = new Array(r), o = 0; r > o; o++) {
				var a = "string" == typeof e ? e.charAt(o) : e[o];
				(a || o in e) && (i[o] = t.call(n || this, a, o, e))
			}
			return i
		}, n.reduce = function(e, t, n) {
			var r = e.length;
			if("function" != typeof t) throw new TypeError("callback is not function!");
			if(0 === r && 2 === arguments.length) throw new TypeError("arguments invalid");
			var i, o = 0;
			if(arguments.length >= 3) i = n;
			else
				for(;;) {
					if(o in e) {
						i = e[o++];
						break
					}
					if(o += 1, o >= r) throw new TypeError
				}
			for(; r > o;) o in e && (i = t.call(void 0, i, e[o], o, e)), o++;
			return i
		}, n.isObject = function(e) {
			return "[object Object]" == Object.prototype.toString.call(e)
		}, n.isEmptyObject = function(e) {
			for(var t in e)
				if(void 0 !== t) return !1;
			return !0
		}, n.mix = function(e, t) {
			for(var n in t) e[n] = t[n];
			return e
		}, n.endsWith = function(e, t) {
			var n = e.length - t.length;
			return n >= 0 && e.indexOf(t, n) == n
		}, n.startsWith = function(e, t) {
			return 0 === e.lastIndexOf(t, 0)
		}, n.each = function(e, t) {
			var n, i, o = 0;
			if(m(e))
				for(i = e.length; i > o && t(e[o], o, e) !== !1; o++);
			else
				for(n = r(e), i = n.length; i > o && t(e[n[o]], n[o], e) !== !1; o++);
		}; {
			var p = "",
				h = /^[\s\xa0]+|[\s\xa0]+$/g;
			String.prototype.trim ? function(e) {
				return null == e ? p : String.prototype.trim.call(e)
			} : function(e) {
				return null == e ? p : (e + "").replace(h, p)
			}
		}
		n.param = l.stringify, n.unparam = l.parse, n.urlDecode = u, n.urlEncode = a
	}, {
		querystring: 26,
		"runtime/index": 28
	}],
	10: [function(e) {
		var t = e("runtime/index"),
			n = e("./loader");
		n.add("i18n", {
			alias: function(e, n) {
				return n + "/i18n/" + t.Config.lang
			}
		})
	}, {
		"./loader": 12,
		"runtime/index": 28
	}],
	11: [function(e) {
		function t(e) {
			return new Function("return " + e)()
		}

		function n(e) {
			var n = e.src || "";
			if(!n.match(h)) return 0;
			var r = e.getAttribute("data-config");
			r = r ? t(r) : {};
			var i, u, s = r.comboPrefix || d,
				c = r.comboSep || m,
				l = n.indexOf(s);
			if(-1 === l ? u = n.replace(p, "$1") : (u = n.substring(0, l), "/" !== u.charAt(u.length - 1) && (u += "/"), i = n.substring(l + s.length).split(c), o.each(i, function(e) {
					return e.match(h) ? (u += e.replace(p, "$1"), !1) : void 0
				})), !("tag" in r)) {
				var g = n.lastIndexOf("?t=");
				if(-1 !== g) {
					var v = n.substring(g + 1);
					r.tag = a.getHash(f + v)
				}
			}
			return r.base = r.base || u, r
		}

		function r() {
			var e, t, r = l.getElementsByTagName("script");
			for(e = r.length - 1; e >= 0; e--)
				if(t = n(r[e])) return t;
			return console && console.error("must load kissy by file name in browser environment: seed.js or seed-min.js"), null
		}
		var i = e("runtime/index"),
			o = e("./fns"),
			a = e("./utils"),
			u = e("./config"),
			s = e("./loader"),
			c = i.Env.host,
			l = c && c.document,
			f = "1450252392754",
			d = "??",
			m = ",",
			p = /^(.*)(seed|kissy|loader)(?:-min)?\.js[^\/]*/i,
			h = /(seed|kissy|loader)(?:-min)?\.js/i;
		u({
			comboPrefix: d,
			comboSep: m,
			charset: "utf-8",
			lang: "zh-cn"
		}), l && l.getElementsByTagName && u(o.mix({
			comboMaxUrlLength: 2e3,
			comboMaxFileNum: 40
		}, r())), c.define = function(e, t, n) {
			t && o.isArray(t) ? n.define = 1 : "function" == typeof e && (e.define = 1), s.add(e, t, n)
		}
	}, {
		"./config": 6,
		"./fns": 9,
		"./loader": 12,
		"./utils": 15,
		"runtime/index": 28
	}],
	12: [function(e, t) {
		function n(e) {
			i.mix(this, {
				fn: e,
				waitMods: {}
			})
		}
		var r = e("runtime/index"),
			i = e("./fns"),
			o = e("./utils"),
			a = e("./combo-loader"),
			u = r.Env,
			s = i.setImmediate;
		n.prototype = {
			constructor: n,
			notifyAll: function() {
				var e = this,
					t = e.fn;
				t && i.isEmptyObject(e.waitMods) && (e.fn = null, t())
			},
			add: function(e) {
				this.waitMods[e] = 1
			},
			remove: function(e) {
				delete this.waitMods[e]
			},
			contains: function(e) {
				return this.waitMods[e]
			}
		};
		var c = {};
		c.WaitingModules = n, i.mix(c, {
			add: function(e, t, n) {
				a.add(e, t, n, r, arguments.length)
			},
			use: function(e, t, i) {
				function u() {
					++p; {
						var e, n = [];
						(new Date).valueOf()
					}
					e = o.checkModsLoadRecursively(l, r, void 0, n), e ? (o.attachModsRecursively(l, r), t && (d ? m() : s(m))) : n.length ? i && (d ? i.apply(r, n) : s(function() {
						i.apply(r, n)
					})) : (h.fn = u, f.use(l))
				}
				var l, f, d, m, p = 0,
					h = new n(u);
				return "object" == typeof t && (d = t.sync, i = t.error, t = t.success), m = function() {
					t.apply(r, o.getModules(r, e))
				}, e = o.getModNamesAsArray(e), e = o.normalizeModNamesWithAlias(r, e), l = o.unalias(r, e), f = new a(r, h), d ? h.notifyAll() : s(function() {
					h.notifyAll()
				}), r || c
			},
			require: function(e, t) {
				if(e) {
					var n = o.unalias(r, o.normalizeModNamesWithAlias(r, [e], t));
					return o.attachModsRecursively(n, r), o.getModules(r, n)[1]
				}
			}
		}), u.mods = {}, t.exports = c
	}, {
		"./combo-loader": 5,
		"./fns": 9,
		"./utils": 15,
		"runtime/index": 28
	}],
	13: [function(e, t) {
		var n = e("runtime/index"),
			r = {};
		n.addMember("Loader", r), r.Status = {
			ERROR: -1,
			INIT: 0,
			LOADING: 1,
			LOADED: 2,
			READY_TO_ATTACH: 3,
			ATTACHING: 4,
			ATTACHED: 5
		}, t.exports = r
	}, {
		"runtime/index": 28
	}],
	14: [function(e, t) {
		function n(e) {
			e._queryMap || (e._queryMap = u.unparam(e._query))
		}

		function r(e) {
			this._query = e || ""
		}

		function i(e, t) {
			return e.toLowerCase() === t.toLowerCase()
		}

		function o(e) {
			if(e instanceof o) return e.clone();
			var t, n = this;
			return u.mix(n, {
				scheme: "",
				userInfo: "",
				hostname: "",
				port: "",
				path: "",
				query: "",
				fragment: ""
			}), t = a.parse(e), u.each(t, function(e, t) {
				if(e = e || "", "query" === t) n.query = new r(e);
				else {
					try {
						e = u.urlDecode(e)
					} catch(i) {
						new Error(i + "urlDecode error : " + e)
					}
					n[t] = e
				}
			}), n
		}
		var a = (e("path"), e("url")),
			u = e("./fns"),
			s = {
				scheme: 1,
				userInfo: 2,
				hostname: 3,
				port: 4,
				path: 5,
				query: 6,
				fragment: 7
			};
		r.prototype = {
			constructor: r,
			clone: function() {
				return new r(this.toString())
			},
			get: function(e) {
				var t, r = this;
				return n(r), t = r._queryMap, e ? t[e] : t
			},
			set: function(e, t) {
				var i, o = this;
				return n(o), i = o._queryMap, "string" == typeof e ? o._queryMap[e] = t : (e instanceof r && (e = e.get()), u.each(e, function(e, t) {
					i[t] = e
				})), o
			},
			toString: function(e) {
				var t = this;
				return n(t), u.param(t._queryMap, void 0, void 0, e)
			}
		}, o.prototype = {
			constructor: o,
			clone: function() {
				var e = new o,
					t = this;
				return u.each(s, function(n, r) {
					e[r] = t[r]
				}), e.query = e.query.clone(), e
			},
			resolve: function(e) {
				"string" != typeof e && (e = a.format(e));
				var t = new o(a.resolve(this.toString(), e));
				return t.query = new r(t.query), t
			},
			setPath: function(e) {
				return this.path = e, this
			},
			getPath: function() {
				return this.path
			},
			isSameOriginAs: function(e) {
				var t = this;
				return i(t.hostname, e.hostname) && i(t.scheme, e.scheme) && i(t.port, e.port)
			},
			toString: function(e) {
				return a.format(this, e)
			}
		}, o.Query = r, t.exports = o
	}, {
		"./fns": 9,
		path: 24,
		url: 31
	}],
	15: [function(e, t) {
		function n(e) {
			if("string" == typeof e) return r(e);
			for(var t = [], n = 0, i = e.length; i > n; n++) t[n] = r(e[n]);
			return t
		}

		function r(e) {
			return "/" === e.charAt(e.length - 1) && (e += "index"), s.endsWith(e, ".js") && (e = e.slice(0, -3)), e
		}

		function i(e, t) {
			var n = t.indexOf("!");
			if(-1 !== n) {
				var r = t.substring(0, n);
				t = t.substring(n + 1), a.use(r, {
					sync: !0,
					success: function(n, i) {
						i.alias && (t = i.alias(e, t, r))
					}
				})
			}
			return t
		}

		function o(e) {
			var t;
			return(t = e.match(/^\s*["']([^'"\s]+)["']\s*$/)) || console && console.error("can not find required mod in require call: " + e), t[1]
		}
		var a = e("runtime/index"),
			u = e("path/index"),
			s = e("./fns"),
			c = e("./setup").Status,
			l = c.ATTACHED,
			f = c.READY_TO_ATTACH,
			d = c.LOADED,
			m = c.ATTACHING,
			p = c.ERROR,
			h = !0,
			g = !1,
			v = a.Env.host,
			y = (v.document, {}),
			b = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
			x = /[^.'"]\s*require\s*\(([^)]+)\)/g;
		y.normalDepModuleName = function(e, t) {
			var n, r = 0;
			if(!t) return t;
			if("string" == typeof t) return s.startsWith(t, "../") || s.startsWith(t, "./") ? u.resolve(u.dirname(e), t) : u.normalize(t);
			for(n = t.length; n > r; r++) t[r] = y.normalDepModuleName(e, t[r]);
			return t
		}, y.createModulesInfo = function(e, t) {
			for(var n = 0; n < t.length; n++) {
				var r = t[n];
				y.createModuleInfo(e, r)
			}
		}, y.createModuleInfo = function(e, t, n) {
			t = r(t);
			var i = e.Env.mods,
				o = i[t];
			return o ? o : (i[t] = o = new a.Loader.Module(s.mix({
				name: t,
				runtime: e
			}, n)), o)
		}, y.getModules = function(e, t) {
			var n, r, i, o, a = [e],
				u = e.Env.mods;
			return s.each(t, function(t) {
				n = u[t], n && "css" === n.getType() ? a.push(void 0) : (r = y.unalias(e, t), i = s.reduce(r, function(e, t) {
					return o = u[t], e && o && o.status >= m
				}, !0), a.push(i ? u[r[0]].exports : null))
			}), a
		}, y.attachModsRecursively = function(e, t) {
			var n, r = e.length;
			for(n = 0; r > n; n++) y.attachModRecursively(e[n], t)
		}, y.checkModsLoadRecursively = function(e, t, n, r, i) {
			n = n || [], i = i || {};
			var o, a = 1,
				u = e.length,
				s = n.length;
			for(o = 0; u > o; o++) a = a && y.checkModLoadRecursively(e[o], t, n, r, i), n.length = s;
			return !!a
		}, y.checkModLoadRecursively = function(e, t, n, r, i) {
			var o, a = t.Env.mods,
				u = a[e];
			return e in i ? i[e] : u ? (o = u.status, o === p ? (r.push(u), i[e] = g, g) : o >= f ? (i[e] = h, h) : o !== d ? (i[e] = g, g) : s.indexOfArray(e, n) > -1 ? (console && console.warn("find cyclic dependency between mods: " + n), i[e] = h, h) : (n.push(e), y.checkModsLoadRecursively(u.getNormalizedRequires(), t, n, r, i) ? (u.status = f, i[e] = h, h) : (i[e] = g, g))) : (i[e] = g, g)
		}, y.attachModRecursively = function(e, t) {
			var n, r = t.Env.mods,
				i = r[e];
			n = i.status, n >= m || (i.status = m, i.cjs ? y.attachMod(t, i) : (y.attachModsRecursively(i.getNormalizedRequires(), t), y.attachMod(t, i)))
		}, y.attachMod = function(e, t) {
			var n, r = t.factory;
			if("function" == typeof r) {
				var i;
				t.cjs && (r.length > 1 || r.define) && (i = s.bind(t.require, t)), n = r.apply(t, t.cjs ? t.factory.define ? [i, t.exports, t] : [e, i, t.exports, t] : y.getModules(e, t.getRequiresWithAlias())), void 0 !== n && (t.exports = n)
			} else t.exports = r;
			t.status = l
		}, y.getModNamesAsArray = function(e) {
			return "string" == typeof e && (e = e.replace(/\s+/g, "").split(",")), e
		}, y.normalizeModNames = function(e, t, n) {
			return y.unalias(e, y.normalizeModNamesWithAlias(e, t, n))
		}, y.unalias = function(e, t) {
			for(var r, i, o, a, u = [].concat(t), s = 0, c = e.Env.mods; !s;)
				for(s = 1, r = u.length - 1; r >= 0; r--)
					if((i = c[u[r]]) && "alias" in i) {
						for(s = 0, o = i.alias, "string" == typeof o && (o = [o]), a = o.length - 1; a >= 0; a--) o[a] || o.splice(a, 1);
						u.splice.apply(u, [r, 1].concat(n(o)))
					}
			return u
		}, y.normalizeModNamesWithAlias = function(e, t, r) {
			var o, a, u = [];
			if(t)
				for(o = 0, a = t.length; a > o; o++) t[o] && u.push(i(e, n(t[o])));
			return r && (u = y.normalDepModuleName(r, u)), u
		}, y.registerModule = function(e, t, n, i) {
			t = r(t);
			var o = e.Env.mods,
				a = o[t];
			return a && void 0 !== a.factory ? void(console && console.warn(t + " is defined more than once")) : (y.createModuleInfo(e, t), a = o[t], s.mix(a, {
				name: t,
				status: d,
				factory: n
			}), void s.mix(a, i))
		}, y.getHash = function(e) {
			var t, n = 5381;
			for(t = e.length; --t > -1;) n = (n << 5) + n + e.charCodeAt(t);
			return n + ""
		}, y.getRequiresFromFn = function(e) {
			var t = [];
			return e.toString().replace(b, "").replace(x, function(e, n) {
				t.push(o(n))
			}), t
		}, t.exports = y
	}, {
		"./fns": 9,
		"./setup": 13,
		"path/index": 24,
		"runtime/index": 28
	}],
	16: [function(e, t) {
		t.exports = e("./lib/get-script")
	}, {
		"./lib/get-script": 19
	}],
	17: [function(e, t, n) {
		function r() {
			c || (i("start css poll timer"), a())
		}

		function i(e) {
			console && console.debug && console.debug(e)
		}

		function o(e, t) {
			var n = 0;
			if(u.webkit) e.sheet && (i("webkit css poll loaded: " + t), n = 1);
			else if(e.sheet) try {
				var r = e.sheet.cssRules;
				r && (i("same domain css poll loaded: " + t), n = 1)
			} catch(o) {
				var a = o.name;
				i("css poll exception: " + a + " " + o.code + " " + t), "NS_ERROR_DOM_SECURITY_ERR" === a && (i("css poll exception: " + a + "loaded : " + t), n = 1)
			}
			return n
		}

		function a() {
			for(var e in l) {
				var t = l[e],
					n = t.node;
				o(n, e) && (t.callback && t.callback.call(n), delete l[e])
			}
			u.isEmptyObject(l) ? (i("clear css poll timer"), c = 0) : c = setTimeout(a, s)
		}
		var u = e("./fns"),
			s = 30,
			c = 0,
			l = {};
		n.pollCss = function(e, t) {
			var n, i = e.href;
			n = l[i] = {}, n.node = e, n.callback = t, r()
		}, n.isCssLoaded = o
	}, {
		"./fns": 18
	}],
	18: [function(e, t, n) {
		function r(e) {
			var t = [];
			for(var n in e) t.push(n);
			return t
		}

		function i(e) {
			var t = 0;
			return parseFloat(e.replace(/\./g, function() {
				return 0 === t++ ? "." : ""
			}))
		}
		var o, a = (window.navigator || {}).userAgent || "",
			u = Array.isArray || function(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			};
		((o = a.match(/AppleWebKit\/*\s*([\d.]*)/i)) || (o = a.match(/Safari[\/]{0,1}([\d.]*)/))) && o[1] && (n.webkit = i(o[1])), n.isEmptyObject = function(e) {
			for(var t in e)
				if(void 0 !== t) return !1;
			return !0
		}, n.startsWith = function(e, t) {
			return 0 === e.lastIndexOf(t, 0)
		}, n.each = function(e, t) {
			var n, i, o = 0;
			if(u(e))
				for(i = e.length; i > o && t(e[o], o, e) !== !1; o++);
			else
				for(n = r(e), i = n.length; i > o && t(e[n[o]], n[o], e) !== !1; o++);
		}
	}, {}],
	19: [function(e, t) {
		var n, r, i = e("path"),
			o = e("./fns"),
			a = e("./utils"),
			u = 1e3,
			s = window.document,
			c = {},
			l = "undefined" != typeof KISSY ? KISSY.Config : {};
		t.exports = r = function(e, t, r) {
			function f() {
				var e = b.readyState;
				e && "loaded" !== e && "complete" !== e || (b.onreadystatechange = b.onload = null, w(0))
			}
			var d, m, p, h, g, v = t,
				y = 0;
			if(o.startsWith(i.extname(e).toLowerCase(), ".css") && (y = 1), "object" == typeof v && (t = v.success, d = v.error, m = v.timeout, r = v.charset, p = v.attrs), h = c[e] = c[e] || [], h.push([t, d]), h.length > 1) return h.node;
			var b = s.createElement(y ? "link" : "script"),
				x = function() {
					g && (clearTimeout(g), g = void 0)
				};
			p && o.each(p, function(e, t) {
				b.setAttribute(t, e)
			}), r && (b.charset = r), y ? (b.href = e, b.rel = "stylesheet") : (b.src = e, b.async = !0), h.node = b;
			var w = function(t) {
					var n, r = t;
					x(), o.each(c[e], function(e) {
						(n = e[r]) && n.call(b)
					}), delete c[e]
				},
				M = "onload" in b,
				A = l.forceCssPoll || o.webkit && o.webkit < 536;
			return y && A && M && (M = !1), M ? (b.onload = f, b.onerror = function() {
				b.onerror = null, w(1)
			}) : y ? a.pollCss(b, function() {
				w(0)
			}) : b.onreadystatechange = f, m && (g = setTimeout(function() {
				w(1)
			}, m * u)), n || (n = a.docHead()), y ? n.appendChild(b) : n.insertBefore(b, n.firstChild), b
		}
	}, {
		"./fns": 18,
		"./utils": 20,
		path: 24
	}],
	20: [function(e, t) {
		var n = e("./css-onload"),
			r = window.document,
			i = {};
		i.docHead = function() {
			return r.getElementsByTagName("head")[0] || r.documentElement
		}, i.pollCss = n.pollCss, t.exports = i
	}, {
		"./css-onload": 17
	}],
	21: [function(e, t) {
		var n = e("./lib/logger-manager");
		t.exports = n
	}, {
		"./lib/logger-manager": 22
	}],
	22: [function(e, t) {
		function n(e) {
			var t = {};
			for(var n in o) ! function(t, n) {
				t[n] = function(t) {
					return r.log(t, n, e)
				}
			}(t, n);
			return t
		}
		var r, i = {},
			o = {
				debug: 10,
				info: 20,
				warn: 30,
				error: 40
			};
		r = t.exports = {
			config: function(e) {
				return e && (i = e), i
			},
			log: function(e, t, n) {
				var r = 1;
				if(n) {
					r = 0;
					var a, u, s, c, l, f, d;
					if(t = t || "debug", c = o[t] || o.debug, a = i.includes) {
						for(r = 0, u = 0; u < a.length; u++)
							if(s = a[u], d = s.logger, f = o[s.maxLevel] || o.error, l = o[s.minLevel] || o.debug, c >= l && f >= c && n.match(d)) {
								r = 1;
								break
							}
					} else if(a = i.excludes)
						for(r = 1, u = 0; u < a.length; u++)
							if(s = a[u], d = s.logger, f = o[s.maxLevel] || o.error, l = o[s.minLevel] || o.debug, c >= l && f >= c && n.match(d)) {
								r = 0;
								break
							}
					r && (e = n + ": " + e)
				}
				return r ? ("undefined" != typeof console && console.log && console[t && console[t] ? t : "log"](e), e) : void 0
			},
			getLogger: function(e) {
				return n(e)
			},
			error: function(e) {
				throw e instanceof Error ? e : new Error(e)
			}
		}
	}, {}],
	23: [function(e) {
		var t = e("runtime/index"),
			n = e("ua/index"),
			r = e("feature/index");
		t.config({
			modules: {
				"anim-base": {
					requires: ["dom", "promise", "util"]
				},
				"anim-timer": {
					requires: ["dom", "util", "anim-base", "feature"]
				},
				"anim-transition": {
					requires: ["util", "dom", "anim-base", "feature"]
				},
				attribute: {
					requires: ["util", "event-custom"]
				},
				base: {
					requires: ["util", "attribute"]
				},
				"dom-base": {
					requires: ["util", "io-script", "feature", "query-selector"]
				},
				"dom-extra": {
					requires: ["util", "dom-base", "feature"]
				},
				"dom-ie": {
					requires: ["util", "dom-base", "ua"]
				},
				event: {
					requires: ["event-dom", "event-custom"]
				},
				"event-base": {
					requires: ["util"]
				},
				"event-custom": {
					requires: ["util", "event-base"]
				},
				"event-dom-base": {
					requires: ["util", "event-base", "dom"]
				},
				"event-dom-extra": {
					requires: ["event-dom-base", "dom", "util", "feature", "ua"]
				},
				"event-dom-ie": {
					requires: ["event-dom-base", "dom"]
				},
				"event-gesture": {
					requires: ["event-touch", "event-dom", "util", "feature"]
				},
				"event-touch": {
					requires: ["event-dom", "dom", "util", "feature"]
				},
				io: {
					requires: ["util", "io-extra", "io-form"]
				},
				"io-base": {
					requires: ["util", "io-script", "url", "promise", "querystring"]
				},
				"io-extra": {
					requires: ["io-base", "util", "dom", "querystring"]
				},
				"io-form": {
					requires: ["io-base", "util", "dom", "querystring"]
				},
				node: {
					requires: ["node-base", "node-event", "node-anim"]
				},
				"node-anim": {
					requires: ["util", "node-base", "anim"]
				},
				"node-base": {
					requires: ["dom", "util"]
				},
				"node-event": {
					requires: ["util", "node-base", "event-dom"]
				}
			}
		}), t.config({
			modules: {
				anim: {
					alias: r.getCssVendorInfo("transition") ? "anim-transition" : "anim-timer"
				},
				dom: {
					alias: ["dom-base", "dom-extra", n.ieMode < 10 ? "dom-ie" : ""]
				},
				"event-dom": {
					alias: ["event-dom-base", "event-dom-extra", r.isTouchEventSupported ? "event-gesture" : "", n.ieMode < 9 ? "event-dom-ie" : ""]
				},
				json: {
					alias: [n.ieMode < 8 ? "json-ie" : "json-base"]
				},
				"query-selector": {
					alias: r.isQuerySelectorSupported() ? "query-selector-base" : "query-selector-ie"
				},
				core: {
					alias: ["dom", "event", "io", "anim", "base", "node", "json", "ua", "cookie"]
				},
				ajax: {
					alias: "io"
				},
				"rich-base": {
					alias: "base"
				}
			},
			packages: {
				kg: {
					base: "//g.alicdn.com/"
				}
			}
		})
	}, {
		"feature/index": 2,
		"runtime/index": 28,
		"ua/index": 29
	}],
	24: [function(e, t) {
		var n = e("./lib/path");
		t.exports = n
	}, {
		"./lib/path": 25
	}],
	25: [function(e, t) {
		function n(e) {
			var t = e.split(/\/+/);
			return t[t.length - 1] || (t = t.slice(0, -1)), t[0] || (t = t.slice(1)), t
		}

		function r(e, t) {
			for(var n, r = 0, i = e.length - 1, o = []; i >= 0; i--) n = e[i], "." !== n && (".." === n ? r++ : r ? r-- : o[o.length] = n);
			if(t)
				for(; r--; r) o[o.length] = "..";
			return o = o.reverse()
		}
		var i = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/,
			o = {
				resolve: function() {
					var e, t, i, o = "",
						a = arguments,
						u = 0;
					for(t = a.length - 1; t >= 0 && !u; t--) i = a[t], "string" == typeof i && i && (o = i + "/" + o, u = "/" === i.charAt(0));
					return e = r(n(o), !u).join("/"), (u ? "/" : "") + e || "."
				},
				normalize: function(e) {
					var t = "/" === e.charAt(0),
						i = "/" === e.slice(-1);
					return e = r(n(e), !t).join("/"), e || t || (e = "."), e && i && (e += "/"), (t ? "/" : "") + e
				},
				join: function() {
					var e = Array.prototype.slice.call(arguments);
					return o.normalize(e.join("/"))
				},
				relative: function(e, t) {
					e = o.normalize(e), t = o.normalize(t);
					var r, i, a = n(e),
						u = [],
						s = n(t),
						c = Math.min(a.length, s.length);
					for(r = 0; c > r && a[r] === s[r]; r++);
					for(i = r; r < a.length;) u.push(".."), r++;
					return u = u.concat(s.slice(i)), u.join("/")
				},
				basename: function(e, t) {
					var n = e.match(i) || [],
						r = n[3] || "";
					return t && r && r.slice(-1 * t.length) === t && (r = r.slice(0, -1 * t.length)), r
				},
				dirname: function(e) {
					var t = e.match(i) || [],
						n = t[1] || "",
						r = t[2] || "";
					return n || r ? (r && (r = r.substring(0, r.length - 1)), n + r) : "."
				},
				extname: function(e) {
					return(e.match(i) || [])[4] || ""
				}
			};
		t.exports = o
	}, {}],
	26: [function(e, t) {
		t.exports = e("./lib/querystring")
	}, {
		"./lib/querystring": 27
	}],
	27: [function(e, t) {
		function n(e) {
			var t = typeof e;
			return null == e || "object" !== t && "function" !== t
		}

		function r(e) {
			return "[object Array]" === c.apply(e)
		}

		function i(e) {
			return decodeURIComponent(e.replace(/\+/g, " "))
		}
		var o, a = "&",
			u = "",
			s = encodeURIComponent,
			c = {}.toString,
			l = "=";
		t.exports = {
			_debug: "",
			stringify: function(e, t, i, c) {
				t = t || a, i = i || l, c === o && (c = !0);
				var f, d, m, p, h, g = [];
				for(f in e) {
					h = e[f];
					var v = f;
					if(f = s(f), n(h)) g.push(f), h !== o && g.push(i, s(h + u)), g.push(t);
					else if(r(h))
						for(d = 0, p = h.length; p > d; ++d) m = h[d], n(m) && (g.push(f, c && "[]" !== v.slice(-2) ? s("[]") : u), m !== o && g.push(i, s(m + u)), g.push(t))
				}
				return g.pop(), g.join(u)
			},
			parse: function(e, t, n) {
				if("string" != typeof e || !(e = e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""))) return {};
				t = t || a, n = n || l;
				for(var u, s, c, f = {}, d = e.split(t), m = 0, p = d.length; p > m; ++m) {
					if(u = d[m].indexOf(n), -1 === u) s = i(d[m]), c = o;
					else {
						s = i(d[m].substring(0, u)), c = d[m].substring(u + 1);
						try {
							c = i(c)
						} catch(h) {
							throw new Error("decodeURIComponent error : " + c)
						}
						"[]" === s.slice(-2) && (s = s.slice(0, -2))
					}
					s in f ? r(f[s]) ? f[s].push(c) : f[s] = [f[s], c] : f[s] = c
				}
				return f
			}
		}
	}, {}],
	28: [function(e, t) {
		(function(e) {
			var n;
			"undefined" != typeof window ? n = window : "undefined" != typeof e ? n = e : "undefined" != typeof self && (n = self);
			var r = n.KISSY;
			r || (r = {}, r.__BUILD_TIME = "1450252392754", r.Env = {
				host: n
			}, r.Config = {
				debug: "",
				fns: {}
			}, r.version = "6.2.4", r.addMember = function(e, t, n) {
				if(e in r && !n) throw new Error("The member that you want to add to KISSY already exists!");
				r[e] = t
			}), t.exports = n.KISSY = r
		}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {}],
	29: [function(e, t) {
		t.exports = e("./lib/ua")
	}, {
		"./lib/ua": 30
	}],
	30: [function(e, t) {
		function n(e) {
			var t = 0;
			return parseFloat(e.replace(/\./g, function() {
				return 0 === t++ ? "." : ""
			}))
		}

		function r(e, t) {
			var r, i;
			t[r = "trident"] = .1, (i = e.match(/Trident\/([\d.]*)/)) && i[1] && (t[r] = n(i[1])), t.core = r
		}

		function i(e) {
			var t, r;
			return(t = e.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (r = t[1] || t[2]) ? n(r) : 0
		}

		function o(e) {
			var t, o, u, s, l, f = "",
				d = f,
				m = f,
				p = [6, 9],
				h = "{{version}}",
				g = "<!--[if IE " + h + "]><s></s><![endif]-->",
				v = c && c.createElement("div"),
				y = [],
				b = {
					webkit: a,
					edge: a,
					trident: a,
					gecko: a,
					presto: a,
					chrome: a,
					safari: a,
					firefox: a,
					ie: a,
					ieMode: a,
					opera: a,
					mobile: a,
					core: a,
					shell: a,
					phantomjs: a,
					os: a,
					ipad: a,
					iphone: a,
					ipod: a,
					ios: a,
					android: a,
					nodejs: a
				};
			if(v && v.getElementsByTagName && (v.innerHTML = g.replace(h, ""), y = v.getElementsByTagName("s")), y.length > 0) {
				for(r(e, b), s = p[0], l = p[1]; l >= s; s++)
					if(v.innerHTML = g.replace(h, s), y.length > 0) {
						b[m = "ie"] = s;
						break
					}!b.ie && (u = i(e)) && (b[m = "ie"] = u)
			} else((o = e.match(/AppleWebKit\/*\s*([\d.]*)/i)) || (o = e.match(/Safari\/([\d.]*)/))) && o[1] ? (b[d = "webkit"] = n(o[1]), (o = e.match(/OPR\/(\d+\.\d+)/)) && o[1] ? b[m = "opera"] = n(o[1]) : (o = e.match(/Chrome\/([\d.]*)/)) && o[1] ? b[m = "chrome"] = n(o[1]) : (o = e.match(/\/([\d.]*) Safari/)) && o[1] ? b[m = "safari"] = n(o[1]) : b.safari = b.webkit, (o = e.match(/Edge\/([\d.]*)/)) && o[1] && (d = m = "edge", b[d] = n(o[1])), / Mobile\//.test(e) && e.match(/iPad|iPod|iPhone/) ? (b.mobile = "apple", o = e.match(/OS ([^\s]*)/), o && o[1] && (b.ios = n(o[1].replace("_", "."))), t = "ios", o = e.match(/iPad|iPod|iPhone/), o && o[0] && (b[o[0].toLowerCase()] = b.ios)) : / Android/i.test(e) ? (/Mobile/.test(e) && (t = b.mobile = "android"), o = e.match(/Android ([^\s]*);/), o && o[1] && (b.android = n(o[1]))) : (o = e.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (b.mobile = o[0].toLowerCase()), (o = e.match(/PhantomJS\/([^\s]*)/)) && o[1] && (b.phantomjs = n(o[1]))) : (o = e.match(/Presto\/([\d.]*)/)) && o[1] ? (b[d = "presto"] = n(o[1]), (o = e.match(/Opera\/([\d.]*)/)) && o[1] && (b[m = "opera"] = n(o[1]), (o = e.match(/Opera\/.* Version\/([\d.]*)/)) && o[1] && (b[m] = n(o[1])), (o = e.match(/Opera Mini[^;]*/)) && o ? b.mobile = o[0].toLowerCase() : (o = e.match(/Opera Mobi[^;]*/)) && o && (b.mobile = o[0]))) : (u = i(e)) ? (b[m = "ie"] = u, r(e, b)) : (o = e.match(/Gecko/)) && (b[d = "gecko"] = .1, (o = e.match(/rv:([\d.]*)/)) && o[1] && (b[d] = n(o[1]), /Mobile|Tablet/.test(e) && (b.mobile = "firefox")), (o = e.match(/Firefox\/([\d.]*)/)) && o[1] && (b[m = "firefox"] = n(o[1])));
			return t || (/windows|win32/i.test(e) ? t = "windows" : /macintosh|mac_powerpc/i.test(e) ? t = "macintosh" : /linux/i.test(e) ? t = "linux" : /rhino/i.test(e) && (t = "rhino")), b.os = t, b.core = b.core || d, b.shell = m, b.ieMode = b.ie && c.documentMode || b.ie, b
		}
		var a, u, s = "undefined" != typeof window ? window : {},
			c = s.document,
			l = s.navigator && s.navigator.userAgent || "";
		u = o(l), u.getDescriptorFromUserAgent = o;
		var f = ["webkit", "trident", "gecko", "presto", "chrome", "safari", "firefox", "ie", "opera"],
			d = c && c.documentElement,
			m = "";
		if(d) {
			for(var p = 0; p < f.length; p++) {
				var h = f[p],
					g = u[h];
				g && (m += " ks-" + h + (parseInt(g, 10) + ""), m += " ks-" + h)
			}
			m && (d.className = (d.className + m).replace(/^[\s\xa0]+|[\s\xa0]+$/g, ""))
		}
		t.exports = u
	}, {}],
	31: [function(e, t) {
		t.exports = e("./lib/url")
	}, {
		"./lib/url": 32
	}],
	32: [function(e, t) {
		function n(e) {
			return ":" === e.slice(-1) && (e = e.slice(0, -1)), "http" === e || "https" === e || "ftp" === e || "gopher" === e || "file" === e
		}

		function r(e) {
			return 1 === e.length ? "0" + e : e
		}

		function i(e, t) {
			return encodeURI(e).replace(t, function(e) {
				return "%" + r(e.charCodeAt(0).toString(16))
			})
		}
		var o, a = e("querystring"),
			u = e("path"),
			s = /[#\/\?@]/g,
			c = /[#\?]/g,
			l = /#/g,
			f = new RegExp("^([\\w\\d+.-]+:)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(\\?[^#]*)?(#.*)?$"),
			d = {
				protocol: 1,
				auth: 2,
				hostname: 3,
				port: 4,
				pathname: 5,
				search: 6,
				hash: 7
			},
			m = {
				parse: function(e, t) {
					e = e || "";
					var r = e.match(f) || [],
						i = {};
					for(var o in d) i[o] = r[d[o]];
					i.protocol && (i.protocol = i.protocol.toLowerCase()), i.hostname && (i.hostname = i.hostname.toLowerCase());
					var u = i.protocol;
					if(u && (i.slashes = -1 !== e.lastIndexOf(u + "//")), u && !n(u.slice(0, -1))) {
						if(!i.slashes) return e = e.slice(0, u.length) + "//" + e.slice(u.length), i = m.parse(e, t), i.slashes = null, i
					} else i.hostname && !i.pathname && (i.pathname = "/");
					return i.path = i.pathname, i.search && (i.path += i.search), i.host = i.hostname, i.port && (i.host = i.hostname + ":" + i.port), i.search && (i.query = i.search.substring(1)), t && i.query && (i.query = a.parse(i.query)), i.href = m.format(i), i
				},
				format: function(e, t) {
					var r = e.host;
					r === o && e.hostname && (r = encodeURIComponent(e.hostname), e.port && (r += ":" + e.port));
					var u = e.search,
						f = e.query;
					u === o && f !== o && ("string" != typeof f && (f = a.stringify(f, o, o, t)), f && (u = "?" + f)), u && "?" !== u.charAt(0) && (u = "?" + u);
					var d = e.hash || "";
					d && "#" !== d.charAt(0) && (d = "#" + d);
					var m, p, h = e.pathname || "",
						g = [];
					return(m = e.protocol) && (":" !== m.slice(-1) && (m += ":"), g.push(i(m, s))), r !== o && ((this.slashes || m && n(m)) && g.push("//"), (p = e.auth) && (g.push(i(p, s)), g.push("@")), g.push(r)), h && g.push(i(h, c)), u && g.push(u), d && g.push("#" + i(d.substring(1), l)), g.join("")
				},
				resolve: function(e, t) {
					var n, r = 0,
						i = ["protocol", "auth", "host", "pathname", "search", "hash"],
						o = {};
					e = m.parse(e), t = m.parse(t);
					for(var a = 0; a < i.length; a++) {
						var s = i[a];
						if(r) o[s] = t[s];
						else if(o[s] = e[s], "pathname" === s) {
							var c = t.pathname;
							c && (r = 1, "/" !== c.charAt(0) && (o.hostname && !o.pathname ? c = "/" + c : o.pathname && (("/." === c.slice(-2) || "/.." === c.slice(-3) || "." === c || ".." === c) && (c += "/"), n = o.pathname.lastIndexOf("/"), -1 !== n && (c = o.pathname.slice(0, n + 1) + c))), o.pathname = u.normalize(c))
						} else "search" === s ? t.search && (o.search = t.search, r = 1) : t[s] && (r = r || o[s] !== t[s], o[s] = t[s])
					}
					return m.format(o)
				}
			};
		m.stringify = m.format, t.exports = m
	}, {
		path: 24,
		querystring: 26
	}],
	33: [function(e, t) {
		var n = e("ua"),
			r = e("util-base");
		e("util-extra"), n.ieMode < 9 && e("util-ie"), t.exports = r
	}, {
		ua: 29,
		"util-base": 34,
		"util-extra": 45,
		"util-ie": 52
	}],
	34: [function(e, t) {
		t.exports = e("./lib/main")
	}, {
		"./lib/main": 35
	}],
	35: [function(e, t) {
		var n = e("./main/base");
		e("./main/array"), e("./main/function"), e("./main/json"), e("./main/object"), e("./main/querystring"), e("./main/string"), e("./main/type"), e("./main/web"), t.exports = n
	}, {
		"./main/array": 36,
		"./main/base": 37,
		"./main/function": 38,
		"./main/json": 39,
		"./main/object": 40,
		"./main/querystring": 41,
		"./main/string": 42,
		"./main/type": 43,
		"./main/web": 44
	}],
	36: [function(e) {
		var t, n = Array.prototype,
			r = n.indexOf,
			i = n.filter,
			o = n.reduce,
			o = n.reduce,
			a = e("./base"),
			u = n.map;
		a.mix(a, {
			indexOf: function(e, n, i) {
				return i === t ? r.call(n, e) : r.call(n, e, i)
			},
			inArray: function(e, t) {
				return a.indexOf(e, t) > -1
			},
			filter: function(e, t, n) {
				return i.call(e, t, n || this)
			},
			map: function(e, t, n) {
				return u.call(e, t, n || this)
			},
			reduce: function(e, t, n) {
				return o.call(e, t, n)
			},
			makeArray: function(e) {
				if(null == e) return [];
				if(a.isArray(e)) return e;
				var t = typeof e.length,
					n = typeof e;
				if("number" !== t || "string" == typeof e.nodeName || null != e && e == e.window || "string" === n || "function" === n && !("item" in e && "number" === t)) return [e];
				for(var r = [], i = 0, o = e.length; o > i; i++) r[i] = e[i];
				return r
			}
		})
	}, {
		"./base": 37
	}],
	37: [function(e, t) {
		var n = 0,
			r = "";
		t.exports = {
			_debug: "",
			mix: function(e, t) {
				for(var n in t) e[n] = t[n];
				return e
			},
			guid: function(e) {
				return(e || r) + n++
			}
		}
	}, {}],
	38: [function(e) {
		function t(e, t, n) {
			function r() {}
			var i = [].slice,
				o = i.call(arguments, 3),
				a = function() {
					var a = i.call(arguments);
					return t.apply(this instanceof r ? this : n || this, e ? a.concat(o) : o.concat(a))
				};
			return r.prototype = t.prototype, a.prototype = new r, a
		}
		var n = e("./base");
		n.mix(n, {
			noop: function() {},
			now: Date.now || function() {
				return +new Date
			},
			later: function(e, t, r, i, o) {
				t = t || 0;
				var a, u, s = e,
					c = n.makeArray(o);
				return "string" == typeof e && (s = i[e]), a = function() {
					s.apply(i, c)
				}, u = r ? setInterval(a, t) : setTimeout(a, t), {
					id: u,
					interval: r,
					cancel: function() {
						this.interval ? clearInterval(u) : clearTimeout(u)
					}
				}
			},
			buffer: function(e, t, r) {
				function i() {
					i.stop(), o = n.later(e, t, 0, r || this, arguments)
				}
				if(t = t || 150, -1 === t) return function() {
					e.apply(r || this, arguments)
				};
				var o = null;
				return i.stop = function() {
					o && (o.cancel(), o = 0)
				}, i
			},
			bind: t(0, t, null, 0),
			rbind: t(0, t, null, 1)
		})
	}, {
		"./base": 37
	}],
	39: [function(e) {
		var t = e("./base"),
			n = "undefined" != typeof JSON ? JSON : {};
		t.parseJson = n.parse
	}, {
		"./base": 37
	}],
	40: [function(e) {
		function t(e, t) {
			return "constructor" === e ? s : t
		}

		function n() {}

		function r(e, t) {
			var r;
			return p ? r = p(e) : (n.prototype = e, r = new n), r.constructor = t, r
		}

		function i(e, t) {
			for(var n in t) e[n] = t[n]
		}

		function o(e, t, n, r, i, o, u) {
			if(!t || !e) return e;
			var s;
			t[l] = e, o.push(t);
			for(var c in t) s = c, s !== l && a(s, e, t, n, r, i, o, u);
			return e
		}

		function a(e, t, n, r, i, a, u, f) {
			if(r || !(e in t) || a) {
				var d = t[e],
					m = n[e];
				if(d === m) return void(d === s && (t[e] = d));
				if(i && (m = i.call(n, e, m)), a && m && (c.isArray(m) || c.isPlainObject(m)))
					if(f && m[l]) t[e] = m[l];
					else {
						var p = d && (c.isArray(d) || c.isPlainObject(d)) ? d : c.isArray(m) ? [] : {};
						t[e] = p, o(p, m, r, i, !0, u, f)
					}
				else m === s || !r && e in t || (t[e] = m)
			}
		}

		function u(e, t, n, r) {
			var i, o, a, s, l = e;
			if(!e) return l;
			if(r && e[f]) return n[e[f]].destination;
			if("object" == typeof e) {
				var d = e.constructor;
				c.inArray(d, [Boolean, String, Number, Date, RegExp]) ? l = new d(e.valueOf()) : (i = c.isArray(e)) ? l = t ? c.filter(e, t) : e.concat() : (o = c.isPlainObject(e)) && (l = {}), r && (e[f] = s = c.guid("c"), n[s] = {
					destination: l,
					input: e
				})
			}
			if(i)
				for(var m = 0; m < l.length; m++) l[m] = u(l[m], t, n, r);
			else if(o)
				for(a in e) a === f || t && t.call(e, e[a], a, e) === !1 || (l[a] = u(e[a], t, n, r));
			return l
		}
		var s, c = e("./base"),
			l = "__MIX_CIRCULAR",
			f = "__~ks_cloned",
			d = "__~ks_stamped",
			m = {}.toString,
			p = Object.create;
		i(c, {
			each: function(e, t, n) {
				if(e) {
					var r, i, o, a = 0,
						u = e && e.length,
						l = u === s || "[object Function]" === m.call(e);
					if(n = n || null, l)
						for(i = "function" == typeof Object.keys ? Object.keys(e) : c.keys(e); a < i.length && (r = i[a], t.call(n, e[r], r, e) !== !1); a++);
					else
						for(o = e[0]; u > a && t.call(n, o, a, e) !== !1; o = e[++a]);
				}
				return e
			},
			isEmptyObject: function(e) {
				for(var t in e)
					if(t !== s) return !1;
				return !0
			},
			keys: Object.keys,
			stamp: function(e, t, n) {
				n = n || d;
				var r = e[n];
				if(r) return r;
				if(!t) try {
					r = e[n] = c.guid(n)
				} catch(i) {
					r = s
				}
				return r
			},
			mix: function(e, t, n, r, i) {
				var a;
				if("object" == typeof n && (r = n.whitelist, i = n.deep, a = n.structured, n = n.overwrite), r && "function" != typeof r) {
					var u = r;
					r = function(e, t) {
						return c.inArray(e, u) ? t : s
					}
				}
				n === s && (n = !0), a === s && (a = !0);
				var f, d = [],
					m = 0;
				for(o(e, t, n, r, i, d, a); f = d[m++];) delete f[l];
				return e
			},
			augment: function(e, n) {
				var r, i, o = c.makeArray(arguments),
					a = o.length - 2,
					u = 1,
					l = o[a],
					f = o[a + 1];
				for(o[1] = n, c.isArray(f) || (l = f, f = s, a++), "boolean" != typeof l && (l = s, a++); a > u; u++) i = o[u], (r = i.prototype) && (i = c.mix({}, r, !0, t)), c.mix(e.prototype, i, l, f);
				return e
			},
			merge: function(e) {
				e = c.makeArray(arguments);
				var t, n = {},
					r = e.length;
				for(t = 0; r > t; t++) c.mix(n, e[t]);
				return n
			},
			extend: function(e, t, n, i) {
				var o, a = t.prototype;
				return a.constructor = t, o = r(a, e), e.prototype = c.mix(o, e.prototype), e.superclass = a, n && c.mix(o, n), i && c.mix(e, i), e
			},
			clone: function(e, t) {
				var n;
				"object" == typeof t && (n = t.structured, t = t.filter), n === s && (n = !0);
				var r;
				n && (r = {});
				var i = u(e, t, r, n);
				return n && c.each(r, function(e) {
					if(e = e.input, e[f]) try {
						delete e[f]
					} catch(t) {
						e[f] = s
					}
				}), r = null, i
			}
		})
	}, {
		"./base": 37
	}],
	41: [function(e) {
		var t = e("./base"),
			n = e("querystring");
		t.mix(t, {
			param: n.stringify,
			unparam: n.parse
		})
	}, {
		"./base": 37,
		querystring: 26
	}],
	42: [function(e) {
		function t() {
			return arguments[1].toUpperCase()
		}
		var n, r = e("./base"),
			i = /\\?\{([^{}]+)\}/g,
			o = "",
			a = String.prototype.trim,
			u = /-([a-z])/gi;
		r.mix(r, {
			trim: function(e) {
				return null == e ? o : a.call(e)
			},
			startsWith: function(e, t) {
				return 0 === e.lastIndexOf(t, 0)
			},
			endsWith: function(e, t) {
				var n = e.length - t.length;
				return n >= 0 && e.indexOf(t, n) === n
			},
			camelCase: function(e) {
				return -1 === e.indexOf("-") ? e : e.replace(u, t)
			},
			urlEncode: function(e) {
				return encodeURIComponent(String(e))
			},
			urlDecode: function(e) {
				return decodeURIComponent(e.replace(/\+/g, " "))
			},
			ucfirst: function(e) {
				return e += "", e.charAt(0).toUpperCase() + e.substring(1)
			},
			substitute: function(e, t, r) {
				return "string" == typeof e && t ? e.replace(r || i, function(e, r) {
					return "\\" === e.charAt(0) ? e.slice(1) : t[r] === n ? o : t[r]
				}) : e
			}
		})
	}, {
		"./base": 37
	}],
	43: [function(e) {
		function t(e, t) {
			return u.hasOwnProperty.call(e, t)
		}
		var n, r = e("./base"),
			i = {},
			o = !1,
			a = r.noop,
			u = Object.prototype,
			s = u.toString;
		r.mix(r, {
			type: function(e) {
				return null == e ? String(e) : i[s.call(e)] || "object"
			},
			isPlainObject: function(e) {
				if(!e || "object" !== r.type(e) || e.nodeType || e.window == e) return o;
				var i, a;
				try {
					if((a = e.constructor) && !t(e, "constructor") && !t(a.prototype, "isPrototypeOf")) return o
				} catch(u) {
					return o
				}
				for(i in e);
				return i === n || t(e, i)
			}
		}), r.mix(r, {
			isBoolean: a,
			isNumber: a,
			isString: a,
			isFunction: a,
			isArray: a,
			isDate: a,
			isRegExp: a,
			isObject: a,
			isNull: a,
			isUndefined: a
		});
		for(var c = "Boolean Number String Function Date RegExp Object Array Null Undefined".split(" "), l = 0; l < c.length; l++) ! function(e, t) {
			i["[object " + e + "]"] = t = e.toLowerCase(), r["is" + e] = function(e) {
				return r.type(e) === t
			}
		}(c[l], l);
		r.isArray = Array.isArray || r.isArray
	}, {
		"./base": 37
	}],
	44: [function(e) {
		var t = e("./base"),
			n = /complete|loaded|interactive/,
			r = "undefined" != typeof window ? window : {},
			i = /\S/;
		t.mix(t, {
			isWindow: function(e) {
				return null != e && e == e.window
			},
			ready: function(e) {
				n.test(document.readyState) && document.body ? e() : document.addEventListener("DOMContentLoaded", function() {
					e()
				}, !1)
			},
			globalEval: function(e) {
				e && i.test(e) && (r.execScript ? r.execScript(e) : ! function(e) {
					r.eval.call(r, e)
				}(e))
			}
		})
	}, {
		"./base": 37
	}],
	45: [function(e, t) {
		t.exports = e("./lib/extra")
	}, {
		"./lib/extra": 46
	}],
	46: [function(e, t) {
		var n = e("util-base");
		e("./extra/array"), e("./extra/escape"), e("./extra/function"), e("./extra/object"), e("./extra/web"), t.exports = n
	}, {
		"./extra/array": 47,
		"./extra/escape": 48,
		"./extra/function": 49,
		"./extra/object": 50,
		"./extra/web": 51,
		"util-base": 34
	}],
	47: [function(e) {
		var t, n = Array.prototype,
			r = n.lastIndexOf,
			i = n.every,
			o = n.some,
			a = e("util-base");
		a.mix(a, {
			lastIndexOf: function(e, n, i) {
				return i === t ? r.call(n, e) : r.call(n, e, i)
			},
			unique: function(e, t) {
				var n = e.slice();
				t && n.reverse();
				for(var r, i, o = 0; o < n.length;) {
					for(i = n[o];
						(r = a.lastIndexOf(i, n)) !== o;) n.splice(r, 1);
					o += 1
				}
				return t && n.reverse(), n
			},
			every: function(e, t, n) {
				return i.call(e, t, n || this)
			},
			some: function(e, t, n) {
				return o.call(e, t, n || this)
			}
		})
	}, {
		"util-base": 34
	}],
	48: [function(e) {
		function t() {
			var e = u;
			for(var t in s) {
				var n = s[t];
				e += n + "|"
			}
			return e = e.slice(0, -1), r = new RegExp(e, "g")
		}

		function n() {
			var e = u;
			for(var t in c) {
				var n = c[t];
				e += n + "|"
			}
			return e += "&#(\\d{1,5});", i = new RegExp(e, "g")
		}
		var r, i, o = e("util-base"),
			a = 16,
			u = "",
			s = {
				"&amp;": "&",
				"&gt;": ">",
				"&lt;": "<",
				"&#x60;": "`",
				"&#x2F;": "/",
				"&quot;": '"',
				"&#x27;": "'"
			},
			c = {},
			l = /[&<>"'`]/,
			f = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
		! function() {
			for(var e in s) c[s[e]] = e
		}(), r = t(), i = n(), o.mix(o, {
			escapeHtml: function(e) {
				return e || 0 === e ? (e = "" + e, l.test(e) ? (e + "").replace(r, function(e) {
					return c[e]
				}) : e) : ""
			},
			escapeRegExp: function(e) {
				return e.replace(f, "\\$&")
			},
			unEscapeHtml: function(e) {
				return e.replace(i, function(e, t) {
					return s[e] || String.fromCharCode(+t)
				})
			},
			fromUnicode: function(e) {
				return e.replace(/\\u([a-f\d]{4})/gi, function(e, t) {
					return String.fromCharCode(parseInt(t, a))
				})
			}
		}), o.escapeHTML = o.escapeHtml, o.unEscapeHTML = o.unEscapeHtml
	}, {
		"util-base": 34
	}],
	49: [function(e) {
		var t = e("util-base");
		t.mix(t, {
			throttle: function(e, n, r) {
				if(n = n || 150, -1 === n) return function() {
					e.apply(r || this, arguments)
				};
				var i = t.now();
				return function() {
					var o = t.now();
					o - i > n && (i = o, e.apply(r || this, arguments))
				}
			}
		})
	}, {
		"util-base": 34
	}],
	50: [function(e) {
		(function(t) {
			function n(e, t) {
				return null !== e && e !== a && e[t] !== a
			}

			function r(e, t, n) {
				return delete e[c], delete t[c], n
			}

			function i(e, t) {
				if(e[c] === t && t[c] === e) return !0;
				e[c] = t, t[c] = e;
				for(var i in t)
					if(!n(e, i) && n(t, i)) return r(e, t, !1);
				for(i in e)
					if(!n(t, i) && n(e, i)) return r(e, t, !1);
				for(i in t)
					if(i !== c && !u.equals(e[i], t[i])) return r(e, t, !1);
				return u.isArray(e) && u.isArray(t) && e.length !== t.length ? r(e, t, !1) : r(e, t, !0)
			}

			function o(e, t) {
				for(var n in t) e[n] = t[n]
			}
			var a, u = e("util-base"),
				s = "undefined" == typeof window ? t : window,
				c = "__~ks_compared";
			o(u, {
				equals: function(e, t) {
					return e === t ? !0 : e === a || null === e || t === a || null === t ? null == e && null == t : e instanceof Date && t instanceof Date ? e.getTime() === t.getTime() : "string" == typeof e && "string" == typeof t ? e === t : "number" == typeof e && "number" == typeof t ? e === t : "object" == typeof e && "object" == typeof t ? i(e, t) : e === t
				},
				namespace: function(e, t) {
					var n, r, i;
					for(i = e.split("."), n = t || s, r = 0; r < i.length; ++r) n = n[i[r]] = n[i[r]] || {};
					return n
				}
			})
		}).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {
		"util-base": 34
	}],
	51: [function(e) {
		var t = e("util-base"),
			n = "undefined" != typeof window ? window : {},
			r = n.document || {},
			i = "",
			o = 500,
			a = 40,
			u = /^#?([\w-]+)$/;
		t.mix(t, {
			parseXml: function(e) {
				if(e.documentElement) return e;
				var t;
				if(n.DOMParser ? t = (new DOMParser).parseFromString(e, "text/xml") : (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = !1, t.loadXML(e)), !t || !t.documentElement || t.getElementsByTagName("parsererror").length) throw new Error("Invalid XML: " + e);
				return t
			},
			available: function(e, n) {
				e = (e + i).match(u)[1];
				var s = 1,
					c = t.later(function() {
						if(++s > o) return void c.cancel();
						var t = r.getElementById(e);
						t && (n(t), c.cancel())
					}, a, !0)
			}
		}), t.parseXML = t.parseXml
	}, {
		"util-base": 34
	}],
	52: [function(e, t, n) {
		arguments[4][45][0].apply(n, arguments)
	}, {
		"./lib/extra": 53
	}],
	53: [function(e, t) {
		var n = e("./extra/base");
		e("./extra/object"), t.exports = n
	}, {
		"./extra/base": 54,
		"./extra/object": 55
	}],
	54: [function(e, t) {
		var n = e("../main");
		t.exports = n
	}, {
		"../main": 56
	}],
	55: [function(e) {
		var t = e("./base"),
			n = !{
				toString: 1
			}.propertyIsEnumerable("toString"),
			r = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toString", "toLocaleString", "valueOf"];
		t.keys = Object.keys || function(e) {
			var t, i, o = [];
			for(t in e) e.hasOwnProperty(t) && o.push(t);
			if(n)
				for(i = r.length - 1; i >= 0; i--) t = r[i], e.hasOwnProperty(t) && o.push(t);
			return o
		}
	}, {
		"./base": 54
	}],
	56: [function(e, t) {
		var n = e("util-base");
		e("./main/array"), e("./main/escape"), e("./main/json"), e("./main/string"), e("./main/web"), t.exports = n
	}, {
		"./main/array": 57,
		"./main/escape": 58,
		"./main/json": 59,
		"./main/string": 60,
		"./main/web": 61,
		"util-base": 34
	}],
	57: [function(e) {
		var t, n = !0,
			r = Array.prototype,
			i = r.indexOf,
			o = r.lastIndexOf,
			a = r.filter,
			u = r.every,
			s = r.some,
			c = e("util-base"),
			l = r.map,
			f = r.reduce,
			d = !1;
		c.mix(c, {
			indexOf: i ? c.indexOf : function(e, t, n) {
				for(var r = n || 0, i = t.length; i > r; ++r)
					if(t[r] === e) return r;
				return -1
			},
			lastIndexOf: o ? c.lastIndexOf : function(e, n, r) {
				r === t && (r = n.length - 1);
				for(var i = r; i >= 0 && n[i] !== e; i--);
				return i
			},
			filter: a ? c.filter : function(e, t, n) {
				var r = [];
				return c.each(e, function(e, i, o) {
					t.call(n || this, e, i, o) && r.push(e)
				}), r
			},
			map: l ? c.map : function(e, t, n) {
				for(var r = e.length, i = new Array(r), o = 0; r > o; o++) {
					var a = "string" == typeof e ? e.charAt(o) : e[o];
					(a || o in e) && (i[o] = t.call(n || this, a, o, e))
				}
				return i
			},
			reduce: f ? c.reduce : function(e, r, i) {
				var o = e.length;
				if("function" != typeof r) throw new TypeError("callback is not function!");
				if(0 === o && 2 === arguments.length) throw new TypeError("arguments invalid");
				var a, u = 0;
				if(arguments.length >= 3) a = i;
				else
					do {
						if(u in e) {
							a = e[u++];
							break
						}
						if(u += 1, u >= o) throw new TypeError
					} while (n);
				for(; o > u;) u in e && (a = r.call(t, a, e[u], u, e)), u++;
				return a
			},
			every: u ? c.every : function(e, t, r) {
				for(var i = e && e.length || 0, o = 0; i > o; o++)
					if(o in e && !t.call(r || this, e[o], o, e)) return d;
				return n
			},
			some: s ? c.some : function(e, t, r) {
				for(var i = e && e.length || 0, o = 0; i > o; o++)
					if(o in e && t.call(r || this, e[o], o, e)) return n;
				return d
			}
		})
	}, {
		"util-base": 34
	}],
	58: [function(e) {
		function t(e) {
			var t = typeof e;
			return null === e || "object" !== t && "function" !== t
		}

		function n() {
			var e = f;
			for(var t in d) {
				var n = d[t];
				e += n + "|"
			}
			return e = e.slice(0, -1), i = new RegExp(e, "g")
		}

		function r() {
			var e = f;
			for(var t in m) {
				var n = m[t];
				e += n + "|"
			}
			return e += "&#(\\d{1,5});", o = new RegExp(e, "g")
		}
		var i, o, a = e("util-base"),
			u = "&",
			s = "=",
			c = !0,
			l = 16,
			f = "",
			d = {
				"&amp;": "&",
				"&gt;": ">",
				"&lt;": "<",
				"&#x60;": "`",
				"&#x2F;": "/",
				"&quot;": '"',
				"&#x27;": "'"
			},
			m = {},
			p = /[&<>"'`]/,
			h = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
		! function() {
			for(var e in d) m[d[e]] = e
		}(), i = n(), o = r(), a.mix(a, {
			escapeHtml: function(e) {
				return e || 0 === e ? (e = "" + e, p.test(e) ? (e + "").replace(i, function(e) {
					return m[e]
				}) : e) : ""
			},
			escapeRegExp: function(e) {
				return e.replace(h, "\\$&")
			},
			unEscapeHtml: function(e) {
				return e.replace(o, function(e, t) {
					return d[e] || String.fromCharCode(+t)
				})
			},
			param: function(e, n, r, i) {
				n = n || u, r = r || s, void 0 === i && (i = c);
				var o, l, d, m, p, h = [],
					g = a.urlEncode;
				for(o in e)
					if(p = e[o], o = g(o), t(p)) h.push(o), void 0 !== p && h.push(r, g(p + f)), h.push(n);
					else if(a.isArray(p) && p.length)
					for(l = 0, m = p.length; m > l; ++l) d = p[l], t(d) && (h.push(o, i ? g("[]") : f), void 0 !== d && h.push(r, g(d + f)), h.push(n));
				return h.pop(), h.join(f)
			},
			unparam: function(e, t, n) {
				if("string" != typeof e || !(e = a.trim(e))) return {};
				t = t || u, n = n || s;
				for(var r, i, o, c = {}, l = a.urlDecode, f = e.split(t), d = 0, m = f.length; m > d; ++d) {
					if(r = f[d].indexOf(n), -1 === r) i = l(f[d]), o = void 0;
					else {
						i = l(f[d].substring(0, r)), o = f[d].substring(r + 1);
						try {
							o = l(o)
						} catch(p) {}
						a.endsWith(i, "[]") && (i = i.substring(0, i.length - 2))
					}
					i in c ? a.isArray(c[i]) ? c[i].push(o) : c[i] = [c[i], o] : c[i] = o
				}
				return c
			},
			fromUnicode: function(e) {
				return e.replace(/\\u([a-f\d]{4})/gi, function(e, t) {
					return String.fromCharCode(parseInt(t, l))
				})
			}
		}), a.escapeHTML = a.escapeHtml, a.unEscapeHTML = a.unEscapeHtml
	}, {
		"util-base": 34
	}],
	59: [function(e) {
		var t = e("util-base"),
			n = /^[\],:{}\s]*$/,
			r = /(?:^|:|,)(?:\s*\[)+/g,
			i = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			o = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
		t.parseJson = window.JSON && window.JSON.parse ? window.JSON.parse : function(e) {
			if(null === e) return e;
			if("string" == typeof e && (e = t.trim(e), e && n.test(e.replace(i, "@").replace(o, "]").replace(r, "")))) return new Function("return " + e)();
			throw new Error("Invalid Json: " + e)
		}
	}, {
		"util-base": 34
	}],
	60: [function(e) {
		var t = e("util-base"),
			n = "",
			r = /^[\s\xa0]+|[\s\xa0]+$/g,
			i = String.prototype.trim;
		t.mix(t, {
			trim: i ? t.trim : function(e) {
				return null === e ? n : (e + "").replace(r, n)
			}
		})
	}, {
		"util-base": 34
	}],
	61: [function(e) {
		function t() {
			if(!u) {
				i && i.setTimeout && v(i, p, t), u = 1;
				for(var e = 0; e < s.length; e++) s[e]()
			}
		}

		function n() {
			if(!o || o.readyState === h) return void t();
			if(g(i, p, t), l) {
				var e = function() {
					v(o, d, e), t()
				};
				g(o, d, e)
			} else {
				var n = function() {
					o.readyState === h && (v(o, m, n), t())
				};
				g(o, m, n);
				var r, u = a && a.doScroll;
				try {
					r = null === i.frameElement
				} catch(s) {
					r = !1
				}
				if(u && r) {
					var f = function() {
						try {
							u("left"), t()
						} catch(e) {
							setTimeout(f, c)
						}
					};
					f()
				}
			}
		}
		var r = e("util-base"),
			i = "undefined" != typeof window ? window : {},
			o = i.document || {},
			a = o.documentElement,
			u = 0,
			s = [],
			c = 40,
			l = o.addEventListener,
			f = o.attachEvent || l,
			d = "DOMContentLoaded",
			m = "readystatechange",
			p = "load",
			h = "complete",
			g = l ? function(e, t, n) {
				e.addEventListener(t, n, !1)
			} : function(e, t, n) {
				e.attachEvent("on" + t, n)
			},
			v = l ? function(e, t, n) {
				e.removeEventListener(t, n, !1)
			} : function(e, t, n) {
				e.detachEvent("on" + t, n)
			};
		r.mix(r, {
			ready: function(e) {
				return u ? e() : s.push(e), this
			}
		}), f && n();
		try {
			o.execCommand && o.execCommand("BackgroundImageCache", !1, !0)
		} catch(y) {}
	}, {
		"util-base": 34
	}]
}, {}, [1]);
define("kg/global-util/1.0.5/index", [], function(require, exports, module) {
	var kgGlobalUtil105Index;
	kgGlobalUtil105Index = function(exports) {
		function getCookie(e) {
			var n = document.cookie.match("(?:^|;)\\s*" + e + "=([^;]*)");
			return n && n[1] ? decodeURIComponent(n[1]) : ""
		}
		var S = KISSY;
		window.TB || (window.TB = {}), window.TB.Global || (window.TB.Global = {});
		var onLine = -1 === location.hostname.indexOf("daily.taobao.net"),
			cdnHost = location.protocol + "//" + (onLine ? "g.alicdn.com" : "g-assets.daily.taobao.net");
		return S.config({
			packages: [{
				name: "tbc",
				combine: !0,
				path: cdnHost + "/tbc/",
				ignorePackageNameInUri: !0
			}, {
				name: "gallery",
				combine: !0,
				path: "//assets.alicdn.com/s/kissy/gallery/",
				ignorePackageNameInUri: !0
			}]
		}), exports = TB.Global = {
			version: "3.0",
			isLogin: function() {
				var e = getCookie("_nk_") || getCookie("tracknick"),
					n = getCookie("_l_g_"),
					t = getCookie("lgc");
				return !!(n && e || t)
			},
			getNick: function() {
				var e = getCookie("_nk_"),
					n = getCookie("lgc"),
					t = e || n;
				return t && (t = this.fromUnicode(t).replace(/[<>%&;\\'"]/g, "")), t
			},
			getAvatar: function() {
				var e = "//gtms03.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_80x80.jpg",
					n = this.getNick();
				return n ? "//wwc.alicdn.com/avatar/getAvatar.do?userNick=" + n + "&_input_charset=UTF-8&width=80&height=80&type=sns" : e
			},
			fromUnicode: function(e) {
				return e.replace(/\\u([a-f\d]{4})/gi, function(e, n) {
					return String.fromCharCode(parseInt(n, 16))
				})
			},
			getTag: function() {
				return parseInt(S.unparam(getCookie("uc1")).tag, 10)
			},
			getHost: function() {
				return this.isDaily() ? ".daily.taobao.net" : ".taobao.com"
			},
			getCdnHost: function() {
				return cdnHost
			},
			isDaily: function() {
				return !onLine
			},
			isMobile: function() {
				var e = navigator.userAgent;
				return !!e.match(/AppleWebKit.*Mobile.*/) || "ontouchstart" in document.documentElement
			},
			getCharset: function() {
				return /utf\-*8/i.test(document.charset || document.characterSet) ? "utf8" : "gbk"
			},
			isHttps: function() {
				return "https:" === location.protocol
			},
			getComponentVersion: function(name) {
				var search = location.search.replace("?", "");
				if(search && -1 !== search.indexOf("fn-")) {
					search = search.split("&");
					for(var obj = {}, i = 0, len = search.length; len > i; i++) /^fn\-/.test(search[i]) && (obj[search[i].replace(/=.+$/, "")] = search[i].replace(/^[^=]+=/, ""));
					var sname = "fn-" + name;
					if(obj[sname] && /^\d+\.\d+\.\d+$/.test(obj[sname])) return obj[sname]
				}
				var container = document.getElementById("J_SiteNav");
				if(container) {
					var config = container.getAttribute("data-component-config");
					if(config) return config = window.JSON && JSON.parse ? JSON.parse(config) : eval("(" + config + ")"), config[name] || ""
				}
				return ""
			},
			use: function(e, n) {
				if(/kg\//.test(e)) {
					var t = e.split("/"),
						o = this.getComponentVersion(t[1]);
					if(o) return t[1] += "/" + o, t[2] || t.push("index"), S.use(t.join("/"), n)
				}
			}
		}
	}(), module.exports = kgGlobalUtil105Index
});
! function(e) {
	function t(r) {
		if(n[r]) return n[r].exports;
		var i = n[r] = {
			exports: {},
			id: r,
			loaded: !1
		};
		return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
	}
	var n = {};
	return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
	"use strict";
	var r = n(1),
		i = n(4);
	r(), e.exports = i
}, function(e, t, n) {
	var r = n(2),
		i = n(4),
		o = n(15);
	e.exports = function() {
		try {
			if(!window) return;
			if(window.JSTracker2 && window.JSTracker2.version) return;
			var e = [];
			window.JSTracker2 && window.JSTracker2.length > 0 && (e = window.JSTracker2);
			var t;
			window.g_config && window.g_config.jstracker2 && (t = window.g_config.jstracker2), window.JSTracker2 = new i(t);
			for(var n = 0; n < e.length; n++) window.JSTracker2.push(e[n]);
			o.call(JSTracker2);
			var a = window.onerror;
			window.onerror = function() {
				try {
					a && a.apply(window, arguments);
					var e = r.apply(window, arguments);
					window.JSTracker2.push(e)
				} catch(t) {}
			}
		} catch(s) {}
	}
}, function(e, t, n) {
	var r = n(3);
	e.exports = function(e, t, n, i, o) {
		var o = r(o).toString(),
			a = e;
		try {
			"object" == typeof e && e.message && (a = e.message, t = e.filename, n = e.lineno, i = e.colno)
		} catch(s) {}
		var c = {
			msg: a,
			file: t,
			line: n,
			col: i,
			stack: o.substr(0, 1024)
		};
		return c
	}
}, function(e, t) {
	function n(e, t, n, r) {
		this.funcName = e, this.file = t, this.line = n, this.col = r
	}
	n.prototype.toString = function() {
		return [this.funcName, this.file, this.line, this.col].join("|")
	};
	var r = /\S+\:\d+/,
		i = /\s+at /,
		o = {
			parse: function(e) {
				return e ? "undefined" != typeof e.stacktrace || "undefined" != typeof e["opera#sourceloc"] ? this.parseOpera(e) : e.stack && e.stack.match(i) ? this.parseV8OrIE(e) : e.stack && e.stack.match(r) ? this.parseFFOrSafari(e) : "" : ""
			},
			extractLocation: function(e) {
				if(e.indexOf(":") === -1) return [e];
				var t = e.replace(/[\(\)\s]/g, "").split(":"),
					n = t.pop(),
					r = t[t.length - 1];
				if(!isNaN(parseFloat(r)) && isFinite(r)) {
					var i = t.pop();
					return [t.join(":"), i, n]
				}
				return [t.join(":"), n, void 0]
			},
			parseV8OrIE: function(e) {
				return e.stack.split("\n").slice(1).map(function(e) {
					var t = e.replace(/^\s+/, "").split(/\s+/).slice(1),
						r = this.extractLocation(t.pop()),
						i = t[0] && "Anonymous" !== t[0] ? t[0] : void 0;
					return new n(i, (void 0), r[0], r[1], r[2])
				}, this)
			},
			parseFFOrSafari: function(e) {
				return e.stack.split("\n").filter(function(e) {
					return !!e.match(r)
				}, this).map(function(e) {
					var t = e.split("@"),
						r = this.extractLocation(t.pop()),
						i = t.shift() || void 0;
					return new n(i, (void 0), r[0], r[1], r[2])
				}, this)
			},
			parseOpera: function(e) {
				return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
			},
			parseOpera9: function(e) {
				for(var t = /Line (\d+).*script (?:in )?(\S+)/i, r = e.message.split("\n"), i = [], o = 2, a = r.length; o < a; o += 2) {
					var s = t.exec(r[o]);
					s && i.push(new n((void 0), (void 0), s[2], s[1]))
				}
				return i
			},
			parseOpera10: function(e) {
				for(var t = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, r = e.stacktrace.split("\n"), i = [], o = 0, a = r.length; o < a; o += 2) {
					var s = t.exec(r[o]);
					s && i.push(new n(s[3] || void 0, (void 0), s[2], s[1]))
				}
				return i
			},
			parseOpera11: function(e) {
				return e.stack.split("\n").filter(function(e) {
					return !!e.match(r) && !e.match(/^Error created at/)
				}, this).map(function(e) {
					var t, r = e.split("@"),
						i = this.extractLocation(r.pop()),
						o = r.shift() || "",
						a = o.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^\)]*\)/g, "") || void 0;
					o.match(/\(([^\)]*)\)/) && (t = o.replace(/^[^\(]+\(([^\)]*)\)$/, "$1"));
					var s = void 0 === t || "[arguments not available]" === t ? void 0 : t.split(",");
					return new n(a, s, i[0], i[1], i[2])
				}, this)
			}
		};
	e.exports = function(e) {
		var t = o.parse(e);
		return t
	}
}, function(e, t, n) {
	function r(e) {
		var t = {
			msg: "",
			file: "",
			line: "",
			col: "",
			stack: "",
			url: "",
			ua: "",
			screen: "",
			nick: "",
			dns: "",
			con: "",
			req: "",
			res: "",
			dcl: "",
			onload: "",
			type: "",
			ki: ""
		};
		this.version = "o4.2.1", t = {
			v: this.version,
			ua: o,
			screen: a,
			sampling: 100,
			nick: s,
			ki: c
		}, this._debug = location.href.indexOf("jt_debug") != -1, this._pushed_num = 0, this._config = u.merge(t, e)
	}
	var i = n(5),
		o = n(11),
		a = n(12),
		s = n(13),
		c = n(14),
		u = n(10);
	r.prototype.push = i, e.exports = r
}, function(e, t, n) {
	var r = n(6),
		i = n(7),
		o = n(9),
		a = n(8),
		s = n(10);
	e.exports = function(e) {
		try {
			if(!e) return;
			e && e.constructor === Object || (e = r(e)), e = s.merge(this._config, e);
			var t = a;
			e.t = t();
			for(var n in e) "" !== e[n] && null !== e[n] && void 0 !== e[n] || delete e[n];
			var c = s.stringify(e),
				u = e.sampling;
			if(u < 1 && (u = 9999999, "undefined" != typeof console && console.warn && console.warn("JSTracker2 sampling is invalid, please set a integer above 1!")), "__PV" !== e.msg && !this._debug && Math.random() * u > 1);
			else if(this._pushed_num < 10) {
				this._pushed_num++, this._debug && window.console && window.console.log(e);
				var p = o.call(this);
				i(p + c)
			}
		} catch(l) {}
	}
}, function(e, t, n) {
	var r = n(3);
	e.exports = function(e) {
		var t = {
			msg: e.message,
			file: "",
			line: "",
			col: "",
			stack: r(e).toString()
		};
		return t
	}
}, function(e, t, n) {
	var r = n(8);
	e.exports = function(e) {
		var t = window,
			n = "jsFeImage_" + r(),
			i = t[n] = new Image;
		i.onload = i.onerror = function() {
			t[n] = null
		}, i.src = e
	}
}, function(e, t) {
	var n = function() {
		return +new Date + ".r" + Math.floor(1e3 * Math.random())
	};
	e.exports = n
}, function(e, t) {
	e.exports = function() {
		var e = "//gm.mmstat.com";
		return this._config.server && (e = this._config.server), e + "/jstracker.3?"
	}
}, function(e, t) {
	e.exports = {
		merge: function(e, t) {
			var n = {};
			for(var r in e) n[r] = e[r];
			for(var r in t) n[r] = t[r];
			return n
		},
		stringify: function(e) {
			var t = [];
			for(var n in e) t.push(n + "=" + encodeURIComponent(e[n]));
			return t.join("&")
		},
		now: function() {
			return window.performance && window.performance.now ? window.performance.now() : Date && "function" == typeof Date.now ? Date.now() : new Date
		}
	}
}, function(e, t) {
	var n = function() {
		try {
			if(/UBrowser/i.test(navigator.userAgent)) return "";
			if("undefined" != typeof window.scrollMaxX) return "";
			var e = "track" in document.createElement("track"),
				t = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0;
			return window.clientInformation && window.clientInformation.languages && window.clientInformation.languages.length > 2 ? "" : e ? t > 1 ? " QIHU 360 EE" : " QIHU 360 SE" : ""
		} catch(n) {
			return ""
		}
	}();
	e.exports = navigator.userAgent + n
}, function(e, t) {
	e.exports = screen.width + "x" + screen.height
}, function(e, t) {
	var n = null;
	try {
		var r = /_nk_=([^;]+)/.exec(document.cookie) || /_w_tb_nick=([^;]+)/.exec(document.cookie) || /lgc=([^;]+)/.exec(document.cookie);
		r && (n = decodeURIComponent(r[1]))
	} catch(i) {}
	e.exports = n
}, function(e, t) {
	function n() {
		try {
			return KISSY.version
		} catch(e) {
			return null
		}
	}
	e.exports = n()
}, function(e, t, n) {
	var r = n(16),
		i = n(18);
	e.exports = function() {
		var e = this,
			t = 100;
		if(this._config.p_sampling && (t = this._config.p_sampling), this._debug || !(Math.random() * t > 1)) {
			if(this._cpu = new i, window.performance && window.performance.memory) try {
				var n = parseInt(window.performance.memory.usedJSHeapSize),
					o = parseInt(window.performance.memory.totalJSHeapSize);
				n && (this._jsHeapSizeData = {
					jsHeapUsed: n
				}, o && (this._jsHeapSizeData.jsHeapUsedRate = (n / o).toFixed(4)))
			} catch(a) {}
			setTimeout(function() {
				try {
					var t = r.call(e);
					window.JSTracker2.push(t)
				} catch(n) {}
			}, 2e4)
		}
	}
}, function(e, t, n) {
	var r = n(17),
		i = n(10);
	e.exports = function() {
		var e = {},
			t = window;
		if(t.performance) {
			var n = t.performance.timing;
			e.dns = n.domainLookupEnd - n.domainLookupStart, e.con = n.connectEnd - n.connectStart, e.req = n.responseStart - n.requestStart, e.res = n.responseEnd - n.responseStart, e.dcl = n.domContentLoadedEventEnd - n.domLoading, e.onload = n.loadEventStart - n.domLoading, e.type = window.performance.navigation.type, e.sampling = 100
		}
		e.msg = "__PV";
		var o = r.call(this);
		return e.stack = i.stringify(o), e
	}
}, function(e, t, n) {
	var r = n(10);
	e.exports = function() {
		var e = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance,
			t = {};
		if(e) {
			var n = e.timing;
			if(n) {
				if(void 0 === t.firstPaint) {
					var i = -1;
					window.chrome && window.chrome.loadTimes ? (i = 1e3 * window.chrome.loadTimes().firstPaintTime, i -= 1e3 * window.chrome.loadTimes().startLoadTime) : "number" == typeof window.performance.timing.msFirstPaint && (i = window.performance.timing.msFirstPaint, t.firstPaint = i - window.performance.timing.navigationStart), t.firstPaint = Math.floor(i)
				}
				t.load = n.loadEventEnd - n.fetchStart, t.domReady = n.domComplete - n.domInteractive, t.readyStart = n.fetchStart - n.navigationStart, t.redirect = n.redirectEnd - n.redirectStart, t.appcache = n.domainLookupStart - n.fetchStart, t.unloadEvent = n.unloadEventEnd - n.unloadEventStart, t.lookupDomain = n.domainLookupEnd - n.domainLookupStart, t.connect = n.connectEnd - n.connectStart, t.request = n.responseEnd - n.requestStart, t.initDomTree = n.domInteractive - n.responseEnd, t.loadEvent = n.loadEventEnd - n.loadEventStart
			}
		}
		if(this._jsHeapSizeData && (t = r.merge(t, this._jsHeapSizeData)), this._cpu) {
			this._cpu.pause(), t.busy = Math.floor(this._cpu.getTotalSize(0, 15e3));
			for(var o = this._cpu.data.dataArray, a = -1, s = 0, c = 0; c < o.length && (o[c] <= .1 ? a++ : (s = c + 1, a = 0), !(a >= 5)); c++);
			t.avail = Math.floor(this._cpu.data.timeArray[s] - this._cpu.data.timeArray[0]), t.busyPer = Math.floor(this._cpu.getOverPerAmount(1, 0, 15e3) / this._cpu.getOverPerAmount(0, 0, 15e3) * 100), this._debug && window.console && window.console.log(t)
		}
		return t
	}
}, function(e, t) {
	! function(e) {
		function t() {
			this.conf = {
				log: !1,
				consoleUI: !1,
				delay: 100,
				stat: !0,
				ui: !1
			}, this.log("start"), this.run(), this._lastTime = this.now(), this.data = {
				timeArray: [],
				per_line: [],
				time_line: [],
				size_line: [],
				averageTime: this.conf.delay,
				totalSize: 0,
				dataArray: [],
				timeArray: []
			}, this.log("end")
		}
		t.prototype.run = function() {
			var e, t = this;
			t.conf.ui, window.addEventListener && window.addEventListener("touchmove", function() {
				t.resumeFlag = !0
			}, !1), this._timerID = setTimeout(function() {
				if(!t.isPause) {
					t.currentTime = t.now(), e = (t.currentTime - t._lastTime - t.conf.delay - 0) / t.conf.delay, e < 0 && (e = 0), e > 1 && (e = 1), t._lastTime = t.currentTime;
					var n = t.getStepPer(t.now(), e),
						r = Math.floor(n / .5) + 1;
					if(r = r > 200 ? 200 : r, t.resumeFlag) t.resumeFlag = !1;
					else
						for(var i = 0; i < r; i++) t.logPercent(e);
					t._timerID = setTimeout(arguments.callee, t.conf.delay)
				}
			}, t.conf.delay)
		}, t.prototype.now = function() {
			return window.performance && window.performance.now ? window.performance.now() : Date && "function" == typeof Date.now ? Date.now() : new Date
		}, t.prototype.log = function(t) {
			this.conf.log && e.console && e.console.log && e.console.log("### CPU Log:" + t)
		}, t.prototype.getStepPer = function(e, t) {
			var n = this.data;
			n.time_line.push(e);
			var r;
			n.per_line.push(t);
			var i = n.time_line.length;
			r = 1 == n.time_line.length ? n.averageTime : e - n.time_line[i - 2], r < n.averageTime && (r = n.averageTime);
			var o = (r - n.averageTime) / n.averageTime;
			return i >= 2 ? (n.totalSize += (n.per_line[i - 1] + n.per_line[i - 2]) * (n.time_line[i - 1] - n.time_line[i - 2]) / 2, n.size_line.push(n.totalSize)) : n.size_line.push(0), n.per_line.length > 2 && (n.per_line.shift(), n.time_line.shift()), o
		}, t.prototype.drawUIByConsole = function(e) {
			for(var t = Math.round(10 * e), n = "▆", r = t; r--;) n += "▆";
			n += Math.round(100 * e), this.log(n)
		}, t.prototype.pause = function() {
			clearTimeout(this._timerID), this.isPause = !0, this.log("###########################PAUSE!!!!!!!!!")
		}, t.prototype.resume = function() {
			(null == this.isPause || this.isPause) && (this._lastTime = this.now() + 1e4, this.isPause = !1, this.resumeFlag = !0, this.log("###########################RESUME!!!!!!!!!"), this.run())
		}, t.prototype.logPercent = function(e) {
			this.conf.stat && this.logStat(e), this.conf.ui, this.conf.consoleUI && this.drawUIByConsole(e)
		}, t.prototype.logStat = function(e) {
			var t = this.data;
			t.dataArray.push(e), t.timeArray.push(this.now())
		}, t.prototype.getCurrentCPU = function() {
			for(var e = this.data, t = e.dataArray, n = 0, r = t.length, i = 0, o = r - 1; o >= 0 && (i += t[o], n++, !(n >= 3)); o--);
			return 0 == n ? 0 : i / n
		}, t.prototype.getTimeIndex = function(e, t) {
			for(var n = this.data.timeArray, r = 0; r < n.length; r++)
				if(t) {
					if(n[r] - n[0] > e) return r - 1
				} else if(n[r] - n[0] >= e) return r;
			return n.length
		}, t.prototype.getOverPerAmount = function(e, t, n) {
			for(var r = this.data, i = this.getTimeIndex(t), o = this.getTimeIndex(n, 1), a = r.dataArray, s = 0, c = i; c < o; c++) "undefined" != typeof a[c] && a[c] >= e && s++;
			return s
		}, t.prototype.getTotalSize = function(e, t) {
			var n = this.data,
				r = this.getTimeIndex(e),
				i = this.getTimeIndex(t, !0),
				o = n.size_line[i];
			o || (o = n.size_line[n.size_line.length - 1]);
			var a = o - n.size_line[r];
			return a
		}, e.cpu = t
	}(window), e.exports = cpu
}]);
define("kg/tb-nav/2.5.1/index", ["util", "event-custom", "io", "node", "cookie", "dom", "event", "ua"], function(t, e, n) {
	var i, a, o, r, s, c, u, d, l, v, m, p, g, f, h, w, b = t("util"),
		_ = t("event-custom"),
		C = t("io"),
		S = t("node"),
		M = t("cookie"),
		N = t("dom"),
		y = t("event"),
		T = t("ua");
	i = function(t) {
		var e = TB.Global;
		return e.versionName = "3.1.0", t = e
	}(), a = function(t) {
		function e() {}
		var n = b,
			i = _;
		return n.augment(e, i.Target, {
			show: function(t) {
				this.fire("show", {
					targetName: t
				})
			},
			hide: function(t) {
				this.fire("hide", {
					target: t
				})
			},
			subscribe: function(t, e, n) {
				this.on(e, function(e) {
					t === e.targetName && n && n(e)
				})
			}
		}), t = new e
	}(), o = function(t) {
		var e = C,
			n = S,
			o = n.all,
			r = M,
			s = i,
			c = a,
			u = "//tce.alicdn.com/api/data.htm?ids=175785";
		return t = {
			status: 0,
			init: function() {
				var t = this;
				c.subscribe("sitemap", "show", function() {
					t.status || (t.status = 1, t.fetchData.call(t))
				})
			},
			fetchData: function() {
				new e({
					url: u,
					dataType: "jsonp",
					cache: !0,
					success: this.render,
					jsonpCallback: "tce_175785"
				})
			},
			render: function(t) {
				if(t && t[175785] && t[175785].value && t[175785].value.map) {
					var e, n = t[175785].value.map,
						i = o("#J_SiteNavSitemap");
					e = s.isMobile() ? i.width() + i.offset().left : o("#J_SiteNavBd").width();
					for(var a = '<div class="site-nav-menu-bd"><div id="J_SiteMapBd" class="site-nav-menu-panel"' + (e ? ' style="width:' + (e - 2) + 'px"' : "") + ">", c = 0, u = n.length; c < u; c++) {
						var d = n[c];
						a += '<div class="site-nav-sitemap-mod" data-spm="' + d.spm + '"><div class="site-nav-sitemap-mod-wrap">', a += '<div class="site-nav-sitemap-mod-hd"><h4 style="color:' + d.titleColor + '">' + d.title + "</h4></div>", a += '<div class="site-nav-sitemap-mod-bd"><ul>';
						for(var l = 0, v = d.list.length; l < v; l++) {
							var m = d.list[l];
							a += '<li style="width:' + Math.floor(99 / d.column) + '%">', a += '<a href="' + m.link + '" ' + (m.cookie ? ' data-cookie="' + m.cookie + '" class="J_SetCookieInSiteMap"' : "") + (m.goldlog ? " " + m.goldlog : "") + ">" + m.name, "true" === m.hot && (a += '<i class="hot"></i>'), "true" === m["new"] && (a += '<i class="new"></i>'), a += "</a></li>"
						}
						a += "</ul></div>", a += "</div></div>"
					}
					a += "</div></div>", o(a).appendTo("#J_SiteNavSitemap"), o(".J_SetCookieInSiteMap", "#J_SiteNavSitemap").on("click", function(t) {
						var e = o(t.target).attr("data-cookie");
						e && r.set("thw", e, 30, ".taobao.com")
					})
				}
			}
		}
	}(), r = function(t) {
		var e = a,
			n = i,
			o = (KISSY, n.getComponentVersion("tmsg") || "0.0.2");
		return t = {
			status: 0,
			init: function() {
				var t = this;
				e.subscribe("tmsg", "show", function() {
					t.status || (t.status = 1)
				}), n.isLogin() && KISSY.use("kg/tmsg/" + o + "/index")
			},
			destroy: function() {
				this.status = 0
			}
		}
	}(), s = function(t) {
		function e(t) {
			return t ? d.unparam(t) : {}
		}

		function n() {
			this.status = 0
		}
		var o = KISSY,
			r = N,
			s = y,
			c = C,
			u = M,
			d = b,
			l = a,
			v = i,
			m = window.g_config && window.g_config.appId ? parseInt(window.g_config.appId) : void 0,
			p = "mini-cart",
			g = "menu-empty",
			f = v.getHost(),
			h = v.getComponentVersion("cart") || "0.0.3";
		return n.prototype.init = function() {
			var t = this;
			return !this.status && (t.$cart = r.get("#J_MiniCart"), TB.Global.setCartNum = function(e) {
				t.setCartNum(e)
			}, this.$cart && (r.addClass(this.$cart, g), s.on(r.get(".site-nav-menu-hd a", this.$cart), "click", function() {
				r.removeClass(t.$cart, "menu-hover"), window.MiniCart && (window.MiniCart._clicked = !1);
				var e = new Image;
				e.src = "//gm.mmstat.com/tbcart.1.56&t=" + +new Date
			}), this.update()), this.cartNum = 0, window.MiniCart && window.MiniCart.reset && window.MiniCart.reset(), void l.subscribe("cart", "show", function() {
				t.renderMenu.call(t)
			}))
		}, n.prototype.update = function() {
			function t(e) {
				if(e = e || 0) {
					var i = {
						keys: "TCART_234_" + e + "_q",
						t: d.now()
					};
					c.jsonp(g, i, function(e) {
						if(e) {
							var a = r >= 0 ? r : l ? 1 : 0;
							n.setCartNum(e[i.keys]), u.get("mt", "ci=" + e[i.keys] + "_" + a + (s ? "&" + s : ""), 7, f)
						} else l && t()
					})
				} else c.getScript(p + "callback=TB.Global.setCartNum&t=" + +new Date + (m ? "&appid=" + m : ""))
			}
			var n = this,
				i = e(u.get("mt")),
				a = i && i.ci ? i.ci.split("_") : [void 0, void 0],
				o = parseInt(a[0], 10),
				r = parseInt(a[1], 10),
				s = i ? i.cp : void 0,
				l = v.isLogin(),
				p = "//cart" + f + "/top_cart_quantity.htm?",
				g = "//count." + (v.isDaily() ? "daily.taobao.net" : v.isHttps() ? "taobao.com" : "tbcdn.cn") + "/counter6";
			if(n._OFF = a < 0, l) i ? 1 == r ? n.setCartNum(o) : t() : t(u.get("unb"));
			else {
				var h = u.get("t");
				h ? o >= 0 ? n.setCartNum(o) : t(h) : n.setCartNum(0)
			}
		}, n.prototype.setCartNum = function(t) {
			var e = this;
			if(d.isNumber(t) && !e._OFF && e.$cart) {
				var n = e.$cart.getElementsByTagName("a")[0],
					i = 19 !== m,
					a = r.get("strong", n);
				t < 0 && (e._OFF = t === -1, r.removeClass(e.$cart, p), window.MiniCart && e.off()), e._OFF ? r.addClass(e.$cart, "J_SiteNavDisableMenu") : a.innerHTML = t, r.addClass(e.$cart, p), e._OFF !== !0 || v.isMobile() || (i = !1), r[(i ? "remove" : "add") + "Class"](e.$cart, g), r.addClass(e.$cart, "menu"), n.id = "mc-menu-hd", window.MiniCart && (window.MiniCart.cartNum = t, window.MiniCart.isExpired = !0)
			}
		}, n.prototype.off = function() {
			var t = r.query(".menu-bd-panel", "#J_MiniCart");
			return t && t[0] ? (t[0].innerHTML = window.MiniCart._parseMsg(" "), r.addClass(t[0], "mini-cart-closed"), !0) : (r.addClass(self.$cart, g), !1)
		}, n.prototype.renderMenu = function() {
			var t = this;
			return 19 !== m && (t._OFF !== !0 || v.isMobile() ? (window.MiniCart ? window.MiniCart.render() : o.ready(function() {
				c.getScript(v.getCdnHost() + "/tb/mini-cart/" + h + "/index-min.js", function() {
					o.use("tb/mini-cart", function() {
						var e = r.get("#J_MiniCartNum"),
							n = e ? e.innerHTML : -1;
						return n === -1 || t._OFF === !0 ? t.off() : void window.MiniCart.init(n, !0)
					})
				})
			}), !0) : (r.addClass(t.$cart, g), !1))
		}, n.prototype.destroy = function() {
			this.status = 0
		}, t = new n
	}(), c = function(t) {
		var e = KISSY,
			n = i;
		return t = {
			init: function() {
				var t = window.g_config,
					i = t ? t.appId : "",
					a = location.search,
					o = !1,
					r = -1 !== a.indexOf("tstart") || -1 === a.indexOf("tdog");
				if(t && t.webww === !1 && (o = !0), i && i != -1 || r) {
					if(o) return;
					var s = n.getCdnHost() + "/aliww/web.ww/scripts/webww.js";
					window.Light || e.getScript(s)
				}
			}
		}
	}(), u = function(t) {
		function e() {
			var t = "//tce.alicdn.com/api/data.htm?ids=79618";
			new r({
				dataType: "jsonp",
				url: t,
				cache: !0,
				jsonpCallback: "tce_79618",
				success: function(t) {
					if(t && t[79618]) {
						var e = t[79618].value.data[0];
						"true" === e.status && e.img1 && e.href && i(e)
					}
				}
			})
		}

		function n(t) {
			var e = !1;
			if(t) {
				for(var n = location.host, i = t.split(","), a = 0, o = i.length; a < o; a++)
					if(new RegExp(i[a].replace(/\./g, "\\.")).test(n)) {
						e = !0;
						break
					}
			} else e = !0;
			return e
		}

		function i(t) {
			var e = o.get("#J_SiteNavWeekend");
			if(!n(t.list)) return !1;
			var i = t.img1,
				a = t.img2 || i,
				r = t.href;
			if(e.innerHTML = ['<div class="menu-hd">', '<a href="' + r + '"  data-spm="d3">', '<img id="J_WeekendImg" src="' + i + '"/>', "</a>", "</div>"].join(""), o.css(e, "display", "block"), i !== a) {
				var c = o.get("#J_WeekendImg");
				s.subscribe("weekend", "show", function() {
					c.setAttribute("src", a)
				}), s.subscribe("weekend", "hide", function() {
					c.setAttribute("src", i)
				})
			}
		}
		var o = N,
			r = C,
			s = a,
			c = b;
		return t = {
			init: function() {
				var t = o.get("#J_SiteNavBd");
				if(!t) return !1;
				var n = parseFloat(o.css(t, "width"));
				return !(n < 1190) && void c.ready(e)
			}
		}
	}(), d = function(t) {
		var e = M,
			n = i,
			a = b;
		return t = {
			init: function() {
				var t, i = a.unparam(e.get("mt")),
					o = encodeURIComponent(location.href);
				if(i.np) t = "//law" + n.getHost() + "/rulefaces/summon.htm?t=" + a.now() + "&url=" + o;
				else {
					var r = a.unparam(e.get("uc1"));
					if(!r || !r.cbu) return !1;
					t = "//reg" + n.getHost() + "/member/changeNick2B.jhtml?t=" + a.now() + "&url=" + o
				}
				var s = document.createElement("div");
				s.className = "site-nav-cbu-cover";
				var c = document.createElement("iframe");
				c.src = t, c.className = "site-nav-cbu-iframe", c.allowTransparency = "true", document.body.appendChild(s), document.body.appendChild(c), document.documentElement.style.overflow = "hidden"
			}
		}
	}(), l = function(t) {
		var e = y;
		return t = {
			init: function() {
				function t(i) {
					9 == i.keyCode && n++, 10 === n && (e.detach(window, "keydown", t), window.JSTracker && JSTracker.send({
						url: "http://wai.taobao.com",
						category: location.host + location.pathname,
						sampling: 1
					}))
				}
				var n = 0;
				e.on(window, "keydown", t)
			}
		}
	}(), v = function(t) {
		var e = S,
			n = e.all,
			o = i,
			r = a;
		return t = {
			init: function() {
				this.bindEvent(), this.renderMobileSiteNav(), this.renderPadBar()
			},
			bindEvent: function() {
				o.isMobile() ? n("body").on("click", function(t) {
					var e = t.target;
					if(n(e).hasClass("J_MultiMenu") || n(e).parent(".J_MultiMenu")) {
						var i = n(e).parent(".site-nav-multi-menu") || n(e);
						if(n(e).parent(".site-nav-menu-hd") && !i.hasClass("site-nav-menu-hover")) {
							if(t.preventDefault(), i.hasClass("site-nav-menu-hover")) return i.removeClass("site-nav-menu-hover"), r.hide(i.attr("data-name"));
							n(".site-nav-menu-hover", "#J_SiteNav").removeClass("site-nav-menu-hover"), i.addClass("site-nav-menu-hover"), r.show(i.attr("data-name"))
						}
					} else n(".site-nav-menu-hover", "#J_SiteNav").removeClass("site-nav-menu-hover")
				}) : n("#J_SiteNav").delegate("mouseenter mouseleave", ".J_MultiMenu", function(t) {
					var e = n(t.currentTarget),
						i = t.currentTarget;
					e.hasClass("J_SiteNavDisableMenu") || ("mouseenter" === t.type ? (e.addClass("site-nav-menu-hover"), r.show(i.getAttribute("data-name"))) : "mouseleave" === t.type && (e.removeClass("site-nav-menu-hover"), r.hide(i.getAttribute("data-name"))))
				})
			},
			renderMobileSiteNav: function() {
				o.isMobile() && n("#J_SiteNav").addClass("site-nav-at-mobile")
			},
			renderPadBar: function() {
				var t = navigator.userAgent,
					e = /iPad|taobao_apad|Android.+Tablet|GT-N5100|GT-N5110|GT-N5110|GT-N8000|GT-N8010|GT-P3100|GT-P5110|GT-P5210|Lenovo A3000|LG-V500|MediaPad|MI PAD|Nexus 7|P98 3G|Ramosi9|SM-P600|SM-P601|SM-T110|SM-T210|SM-T211|SM-T310|SM-T311|SM-T320|SM-T321|SM-T520|SM-T700|SM-T705|SM-T800|SM-T805|V703|V719|V819|V919|V975|Venue 7|X98 3G/i;
				if(e.test(t)) {
					var n = window.g_config || {},
						i = location.search;
					if(6 !== n.appId && !/[\?&]ttid=/.test(i)) {
						var a = document.getElementById("J_SiteNav"),
							o = document.body.offsetWidth,
							r = a.offsetWidth;
						r < o && (a.style.width = o + "px");
						var s = !/[&\?]pad_preview=1/.test(location.search),
							c = document.createElement("iframe");
						c.setAttribute("width", "100%"), c.setAttribute("height", "160px"), c.setAttribute("src", location.protocol + "//" + (s ? "www" : "cdnprepub.tms") + ".taobao.com/market/app/site-nav-banner.php?redirect_url=" + encodeURIComponent(location.href.replace(/#.*$/g, ""))), c.setAttribute("frameborder", "0"), c.setAttribute("scrolling", "no");
						var u = document.createElement("span");
						u.appendChild(document.createTextNode("\xd7"));
						var d = document.createElement("div");
						d.className = "tb-global-pad-notice", d.appendChild(u), d.appendChild(c), u.onclick = function() {
							if(d.style.display = "none", window.goldlog) try {
								window.goldlog.record("/ipadapp.141226.1", "", "url=" + encodeURIComponent(location.host + location.pathname), "H46926338")
							} catch(t) {}
						};
						var l = document.getElementById("J_SiteNav");
						l && l.insertBefore(d, document.getElementById("J_SiteNavBd"))
					}
				}
			}
		}
	}(), m = function(t) {
		function e() {
			u('<div id="J_SiteFooter" style="min-height: 150px"></div>').appendTo("body")
		}

		function n() {
			return !!window.g_config && 6 == window.g_config.appId
		}

		function a() {
			var t = d.docHeight(),
				e = d.scrollTop(),
				n = d.viewportHeight();
			return e + n + 300 >= t
		}

		function o() {
			var t, e = !1,
				n = function i() {
					return !e && (t && clearTimeout(t), void(t = setTimeout(function() {
						t = null, a() && (e = !0, l.detach(window, "scroll resize", i), r())
					}, 200)))
				};
			l.on(window, "scroll resize", n)
		}

		function r() {
			s.use("kg/tb-footer", function(t, e) {
				new e({
					needLogo: n(),
					delay: !1,
					root: d.get("#J_SiteFooter")
				}).render()
			})
		}
		var s = i,
			c = S,
			u = c.all,
			d = N,
			l = y;
		return t = {
			init: function() {
				e(), a() ? r() : o()
			}
		}
	}(), p = function(t) {
		return t = {
			send: function(t) {
				window.JSTracker2 = window.JSTracker2 || [];
				var e = "http://jstracker.www.taobao.com/nav/" + t.category;
				window.JSTracker2.push({
					url: e,
					msg: t.msg
				})
			}
		}
	}(), g = function(t) {
		function e() {
			var t = c.getTag(),
				e = "";
			return 10 === t ? e = "super" : 20 === t && (e = "apass"), e
		}

		function n() {
			var t = c.getTag(),
				n = c.getNick(),
				i = e(),
				a = "";
			i && (a = "super");
			var o = "";
			8 == v.ie && (o = "ie8");
			var r = '<a href="//vip.taobao.com" target="_top" class="site-nav-vip-icon ' + i + " " + o + '"></a>';
			(t === -1 || isNaN(t)) && (r = "", a = "");
			var s = '<a href="' + w + '" target="_top" class="site-nav-login-info-nick ' + a + '">' + n + "</a>",
				d = s + r;
			u.html("#J_SiteNavLogin", l.substitute(M, {
				loginUrl: g,
				logoutUrl: f,
				regUrl: h,
				spaceUrl: w,
				nick: n,
				userInfo: d
			}))
		}

		function o(t) {
			var n = (c.getTag(), c.getNick()),
				i = e();
			if(v.ie && v.ie < 9 && (i = ""), !(1 === t.code && t.status && t.data && t.data.isLogin && t.data.taoScore)) return !1;
			var a = t.data.taoScore,
				o = "\u666e\u901a\u4f1a\u5458";
			"apass" === i ? o = "APASS\u4f1a\u5458" : "super" === i && (o = "\u8d85\u7ea7\u4f1a\u5458");
			var r = '<p class="level-info tao-score">\u6dd8\u6c14\u503c\uff1a' + a + '</p><p class="level-info ' + i + '">' + o + "</p>";
			u.html("#J_SiteNavLoginPanel", l.substitute(y, {
				tagIcon: i,
				levelInfo: r,
				logoutUrl: f,
				regUrl: h,
				spaceUrl: w,
				avatarUrl: c.getAvatar(),
				host: c.getHost(),
				nick: n
			}))
		}

		function r() {
			var t = c.getHost(),
				e = "//vip" + t + "/ajax/getGoldUser.do";
			new d({
				url: e,
				dataType: "jsonp",
				data: {
					_input_charset: "utf-8",
					from: "diaoding"
				},
				scriptCharset: "gbk",
				success: o
			})
		}
		var s = a,
			c = i,
			u = N,
			d = C,
			l = b,
			v = T,
			m = "https://login" + c.getHost(),
			p = "//login" + c.getHost(),
			g = m + "/member/login.jhtml?f=top",
			f = p + "/member/logout.jhtml?f=top&out=true",
			h = "//reg" + c.getHost() + "/member/new_register.jhtml?from=tbtop&ex_info=&ex_sign=",
			w = "//i" + c.getHost() + "/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739",
			_ = location.href;
		/^http.*(\/member\/login\.jhtml)$/i.test(_) && (_ = "");
		var S = _;
		g += (~g.indexOf("?") ? "&" : "?") + "redirectURL=" + encodeURIComponent(S), f += (~f.indexOf("?") ? "&" : "?") + "redirectURL=" + encodeURIComponent(S);
		var M = ['<div class="site-nav-menu-hd">', '  <div class="site-nav-sign">', '    <a href="{loginUrl}" target="_top" class="h">\u4eb2\uff0c\u8bf7\u767b\u5f55</a>', '    <a href="{regUrl}" target="_top">\u514d\u8d39\u6ce8\u518c</a>', "  </div>", '  <div class="site-nav-user">', "    {userInfo}", '    <span class="site-nav-arrow"><span class="site-nav-icon">&#xe605;</span></span>', "  </div>", "</div>", '<div class="site-nav-menu-bd" id="J_SiteNavLoginPanel">', "</div>"].join(""),
			y = ['<div class="site-nav-menu-bd-panel">', '  <div class="site-nav-user-wrapper {tagIcon}">', '    <a href="//i{host}/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739" target="_top" id="J_UserAvatar" class="site-nav-user-avatar">', '        <img id="J_SiteNavUserAvatar" src="{avatarUrl}" width="80" height="80" alt="{nick}\u7684\u5934\u50cf">', "    </a>", "  </div>", '  <div class="site-nav-user-info">', '    <p class="site-nav-user-operate">', '      <a href="//member1{host}/member/fresh/account_security.htm" target="_top">\u8d26\u53f7\u7ba1\u7406</a>', '      <span class="site-nav-pipe">|</span>', '      <a href="{logoutUrl}" target="_top">\u9000\u51fa</a>', "    </p>", "    {levelInfo}", "  </div>", '  <a class="site-nav-user-privilege" href="//vip.taobao.com" target="_top">\u67e5\u770b\u4f60\u7684\u4e13\u5c5e\u6743\u76ca</a>', "</div>"].join("");
		return t = {
			status: 0,
			init: function() {
				this.render()
			},
			render: function() {
				var t = this;
				n();
				var e = "site-nav-status-login",
					i = "site-nav-status-logout",
					a = "site-nav-multi-menu J_MultiMenu",
					o = "#J_SiteNav",
					d = "#J_SiteNavLogin";
				c.isLogin() ? (u.replaceClass(o, i, e), u.addClass(d, a), s.subscribe("login", "show", function() {
					t.status || (t.status = 1, r())
				})) : (u.replaceClass(o, e, i), u.removeClass(d, a))
			},
			destroy: function() {
				this.status = 0
			}
		}
	}(), f = function(t) {
		var e = a,
			n = S.all,
			i = ["GLOBAL", "CN", "HK", "TW", "MO", "KR", "MY", "AU", "SG", "NZ", "CA", "US", "JP"],
			o = ["\u5168\u7403", "\u4e2d\u56fd\u5927\u9646", "\u9999\u6e2f", "\u53f0\u6e7e", "\u6fb3\u95e8", "\u97e9\u56fd", "\u9a6c\u6765\u897f\u4e9a", "\u6fb3\u5927\u5229\u4e9a", "\u65b0\u52a0\u5761", "\u65b0\u897f\u5170", "\u52a0\u62ff\u5927", "\u7f8e\u56fd", "\u65e5\u672c"],
			r = b,
			s = p;
		return t = {
			init: function() {
				this.render(), this.listEl = n("#J_SiteNavRegionList"), this.bind()
			},
			bind: function() {
				var t = !1,
					a = this;
				e.subscribe("region", "show", function() {
					t || (a.renderItems(), t = !0)
				}), this.listEl.delegate("click", ".J_RegionItem", function(t) {
					var e = n(t.currentTarget).index(),
						a = i[e],
						o = !0;
					"www.taobao.com" === location.hostname && "/" === location.pathname && "CN" === a && (o = !1), s.send({
						category: "REGION_SWITCH",
						msg: "MAINLAND -> " + a
					}), KISSY.use("kg/tb-gnav/1.0.1/lib/hng", function(t, e) {
						e.set(a, o)
					})
				})
			},
			renderItems: function() {
				var t = [];
				t = r.map(o, function(t) {
					return '<li class="site-nav-region-item J_RegionItem" role="option">' + t + "</li>"
				}), this.listEl.html(t.join(""))
			},
			render: function() {
				var t = '<li class="site-nav-menu site-nav-switch site-nav-multi-menu J_MultiMenu" data-name="region">\n      <div class="site-nav-menu-hd">\n        <span class="site-nav-region">\u4e2d\u56fd\u5927\u9646</span>\n        <span class="site-nav-arrow"><span class="site-nav-icon">&#xe605;</span></span>\n      </div>\n      <div class="site-nav-menu-bd site-nav-menu-list">\n        <ul id="J_SiteNavRegionList" class="site-nav-region-list site-nav-menu-bd-panel menu-bd-panel" role="listbox" aria-expanded="true">\n        </ul>\n      </div>\n    </li>';
				n("#J_SiteNavBdL").prepend(t)
			}
		}
	}(), h = function(t) {
		function e(t) {
			var e = {
				user: !0,
				responsive: !0,
				cart: !0,
				webww: !0,
				weekend: !0,
				accessibility: !0,
				account: !0,
				siteMap: !0,
				footer: !0,
				region: !1
			};
			t = t || {}, t = I.merge(e, t), t.user && i.init(), t.responsive && y.init(), t.cart && w.init(), t.webww && _.init(), t.region && x.init(), t.weekend && (window.g_config && window.g_config.weekend === !1 || C.init()), t.accessibility && N.init(), t.account && M.init(), t.siteMap && a.init(), t.footer && T.init(), n()
		}

		function n() {
			var t = J(document);
			t.delegate("mouseenter", ".J_Tmsg_Basic", function e(n) {
				h.init(), A.send({
					category: "message",
					msg: location.host + location.pathname
				}), t.undelegate("mouseenter", ".J_Tmsg_Basic", e)
			})
		}
		var i = g,
			a = o,
			h = r,
			w = s,
			_ = c,
			C = u,
			M = d,
			N = l,
			y = v,
			T = m,
			k = S,
			J = k.all,
			I = b,
			x = f,
			A = p;
		return t = e
	}(), w = function(t) {
		var e = i,
			n = h,
			a = window.g_config || {},
			o = a.footer !== !1;
		return n({
			region: a.region || !1,
			footer: o
		}), t = e
	}(), n.exports = w
});
! function() {
	var n, t = "isg",
		r = [/(?:\.alicdn\.com|\.mmstat\.com|\.tanx\.com|\.google\.com|\.googleapis\.com)\//],
		e = self,
		i = !!e.addEventListener,
		u = document.getElementsByTagName("head")[0],
		o = navigator.userAgent;
	! function(n) {
		function t() {
			return 4294967295 * Math.random() >>> 0
		}

		function r(n) {
			for(var t = 0, r = 0, e = n.length; r < e; r++) t = (t << 5) - t + n.charCodeAt(r), t >>>= 0;
			return t
		}

		function u(n, t) {
			var r = n.indexOf(t);
			return -1 == r ? n : n.substr(0, r)
		}

		function o(n, t) {
			var r = n.indexOf(t);
			return -1 == r ? n : n.substr(r + t.length)
		}

		function c(n) {
			return /^(\d+\.){3}\d+$/.test(n)
		}

		function a(n) {
			if(c(n)) return n;
			var t = m.test(n) ? -3 : -2;
			return n.split(".").slice(t).join(".")
		}

		function f(n) {
			if(!n) return null;
			var t = n.match(w);
			if(!t) return null;
			var r = t[1];
			return y.test(r) && (r = o(r, "@"), r = u(r, ":")), r
		}

		function s(n) {
			for(var t = 0, r = n.length - 1; r >= 0; r--) t = t << 1 | +n[r];
			return t
		}

		function v(n, t, r, e) {
			i ? n.addEventListener(t, r, e) : n["attachEvent"]("on" + t, function() {
				r(event)
			})
		}

		function l(n, t, r) {
			if(!n) return !1;
			var e = n[t];
			if(!e) return !1;
			var i = r(e);
			return n[t] = i, !0
		}

		function d(n, t, r) {
			if(!_) return !1;
			var e = _(n, t);
			return !(!e || !e.set) && (e.set = r(e.set), i || (e.get = function(n) {
				return function() {
					return n.call(this)
				}
			}(e.get)), Object.defineProperty(n, t, e), !0)
		}

		function h(n, t, r) {
			if("apply" in t) return t.apply(n, r);
			switch(r.length) {
				case 0:
					return t();
				case 1:
					return t(r[0]);
				case 2:
					return t(r[0], r[1]);
				default:
					return t(r[0], r[2], r[3])
			}
		}

		function p(n, t) {
			switch(t.length) {
				case 0:
					return new n;
				case 1:
					return new n(t[0]);
				case 2:
					return new n(t[0], t[1]);
				default:
					return new n(t[0], t[2], t[3])
			}
		}

		function g(n) {
			return k ? k(n) : "__" + n
		}
		n.a = t, n.b = r, n.c = Date.now || function() {
			return +new Date
		}, n.d = u, n.e = o, n.f = c;
		var m = /\.com\.cn$|\.com\.hk$/;
		n.g = a;
		var w = /^(?:https?:)?\/{2,}([^\/?#\\]+)/i,
			y = /[@:]/;
		n.h = f, n.i = s, n.j = v, n.k = l;
		var _ = Object.getOwnPropertyDescriptor;
		n.l = d, n.m = h, n.n = p;
		var k = e["Symbol"];
		n.o = g
	}(n || (n = {}));
	var c;
	! function(t) {
		function r(n) {
			A++, x = n.isTrusted == undefined || n.isTrusted, T = n.clientX, E = n.clientY
		}

		function e(n) {
			b++
		}

		function i(n) {
			j++
		}

		function o(n) {
			M++
		}

		function c() {
			var n = screen.availWidth,
				t = window.outerWidth;
			null == t && (t = document.documentElement.clientWidth || document.body.clientWidth), _ = n - t < 20
		}

		function a(n) {
			k = !0, C = !0
		}

		function f(n) {
			C = !1
		}

		function s() {
			n.j(document, "mousemove", e, !0), n.j(document, "touchmove", e, !0), n.j(document, "click", r, !0), n.j(document, "keydown", o, !0);
			var t = "onwheel" in u ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
			n.j(document, t, i, {
				capture: !0,
				passive: !0
			}), n.j(window, "focus", a), n.j(window, "blur", f), n.j(window, "resize", c), c()
		}

		function v() {
			return b
		}

		function l() {
			return j
		}

		function d() {
			return A
		}

		function h() {
			return M
		}

		function p() {
			return {
				u: T,
				v: E,
				w: x
			}
		}

		function g() {
			return !document.hidden
		}

		function m() {
			return C
		}

		function w() {
			return k
		}

		function y() {
			return _
		}
		var _, k, b = 0,
			A = 0,
			j = 0,
			M = 0,
			T = 0,
			E = 0,
			x = !0,
			C = !0;
		t.p = s, t.q = v, t.r = l, t.s = d, t.t = h, t.x = p, t.y = g, t.z = m, t.A = w, t.B = y
	}(c || (c = {}));
	var a;
	! function(t) {
		function r(n) {
			if(!O) return !1;
			var t;
			try {
				t = new O(n)
			} catch(r) {
				return !1
			}
			return !!t
		}

		function c(n) {
			for(var t = 0; t < P; t++) {
				var r = L[t].name;
				if(n.test(r)) return !0
			}
			return !1
		}

		function a() {
			return c(/Shockwave/i) || r("ShockwaveFlash.ShockwaveFlash")
		}

		function f() {
			return navigator.javaEnabled()
		}

		function s() {
			return c(/PDF|Acrobat/i)
		}

		function v() {
			return c(/Native Client/)
		}

		function l() {
			return c(/WangWang/i)
		}

		function d() {
			return c(/Alipay/i)
		}

		function h() {
			return "$cdc_asdjflasutopfhvcZLmcfl_" in document
		}

		function p() {
			return !0
		}

		function g() {
			try {
				return "localStorage" in window
			} catch(n) {
				return !1
			}
		}

		function m() {
			var n;
			try {
				n = document.createElement("canvas").getContext("webgl2")
			} catch(t) {}
			return !!n
		}

		function w() {
			return "ontouchstart" in document
		}

		function y() {
			return "1" == (navigator["msDoNotTrack"] || navigator["doNotTrack"])
		}

		function _() {
			return /zh-cn/i.test(navigator.language || navigator["systemLanguage"])
		}

		function k() {
			var n = navigator["languages"];
			return n && n.length > 0
		}

		function b() {
			return -480 === (new Date).getTimezoneOffset()
		}

		function A() {
			return "iso-8859-1" === document["defaultCharset"]
		}

		function j() {
			for(var t = [], r = 0; r < 16; r++) t[r] = Q[r]();
			return n.i(t)
		}

		function M() {
			for(var n in N)
				if(N.hasOwnProperty(n)) {
					var t = N[n];
					if(t()) return +n.substr(1)
				}
			return 0
		}

		function T() {
			return P
		}

		function E(n) {
			var t = e["RTCPeerConnection"] || e["mozRTCPeerConnection"] || e["webkitRTCPeerConnection"];
			if(!t) return void n(0);
			var r = {
					iceServers: [{
						urls: "stun:x"
					}]
				},
				i = new t(r);
			i.onicecandidate = function(t) {
				var r = t.candidate;
				if(!r) return void n(0);
				var e = x(r.candidate);
				null != e && (n(e), i.onicecandidate = null)
			}, i["createDataChannel"](""), i.createOffer(function(n) {
				i.setLocalDescription(n)
			}, function(t) {
				n(0)
			})
		}

		function x(n) {
			var t = /(\d+)\.(\d+)\.(\d+)\.(\d+)\D/.exec(n);
			return t ? (+t[1] << 24 | +t[2] << 16 | +t[3] << 8 | +t[4]) >>> 0 : null
		}

		function C() {
			L && (P = L.length)
		}
		var O = e["ActiveXObject"],
			L = navigator.plugins,
			P = 0,
			Q = [a, f, s, v, l, d, h, p, g, m, w, y, _, k, b, A];
		t.C = j;
		var D = navigator.vendor,
			B = "chrome" in window,
			S = "ActiveXObject" in window,
			W = u.style,
			N = {
				_13: function() {
					return "callPhantom" in window
				},
				_14: function() {
					return /python/i.test(navigator.appVersion)
				},
				_15: function() {
					return "sgAppName" in navigator
				},
				_16: function() {
					return /Maxthon/i.test(D)
				},
				_17: function() {
					return "opr" in window
				},
				_18: function() {
					return B && /BIDUBrowser/i.test(o)
				},
				_19: function() {
					return B && /LBBROWSER/i.test(o)
				},
				_20: function() {
					return B && /QQBrowser/.test(o)
				},
				_21: function() {
					return B && /UBrowser/i.test(o)
				},
				_22: function() {
					return B && /2345Explorer/.test(o)
				},
				_23: function() {
					return B && /TheWorld/.test(o)
				},
				_24: function() {
					return B && "MSGesture" in window
				},
				_25: function() {
					return "aef" in window
				},
				_1: function() {
					return B
				},
				_2: function() {
					return "MozSettingsEvent" in window
				},
				_3: function() {
					return "safari" in window
				},
				_4: function() {
					return S && !("maxHeight" in W)
				},
				_5: function() {
					return S && !("postMessage" in window)
				},
				_6: function() {
					return S && !i
				},
				_7: function() {
					return S && !window["Uint8Array"]
				},
				_8: function() {
					return S && !window["WeakMap"]
				},
				_9: function() {
					return S && window["WeakMap"]
				},
				_10: function() {
					return "Google Inc." === navigator.vendor
				},
				_11: function() {
					return "Apple Computer, Inc." === navigator.vendor
				},
				_12: function() {
					return S
				}
			};
		t.D = M, t.F = T, t.H = E, t.p = C
	}(a || (a = {}));
	var f;
	! function(n) {
		function t(n) {
			var t = document.cookie,
				r = "; " + n + "=",
				e = t.indexOf(r);
			if(-1 === e) {
				if(r = n + "=", t.substr(0, r.length) != r) return;
				e = 0
			}
			var i = e + r.length,
				u = t.indexOf("; ", i);
			return -1 === u && (u = t.length), t.substring(i, u)
		}

		function r(n, t, r, e, i) {
			var u = n + "=" + t;
			e && (u += "; domain=" + e), i && (u += "; path=" + i), r && (u += "; expires=" + r), document.cookie = u
		}

		function e(n, t, e) {
			r(n, "", "Thu, 01 Jan 1970 00:00:00 GMT", t, e)
		}
		n.I = t, n.J = r, n.K = e
	}(f || (f = {}));
	var s, v = function() {
		function n(n) {
			this._fields = n;
			for(var t = 0, r = n.length; t < r; t++) this[t] = 0
		}
		return n.prototype.L = function() {
			for(var n = this._fields, t = [], r = -1, e = 0, i = n.length; e < i; e++)
				for(var u = this[e], o = n[e], c = r += o; t[c] = 255 & u, 0 != --o;) --c, u >>= 8;
			return t
		}, n.prototype.M = function(n) {
			for(var t = this._fields, r = 0, e = 0, i = t.length; e < i; e++) {
				var u = t[e],
					o = 0;
				do {
					o = (o << 8) + n[r++]
				} while (--u > 0);
				this[e] = o >>> 0
			}
		}, n
	}();
	! function(n) {
		function t(n) {
			for(var t = 0, r = 0, e = n.length; r < e; r++) t = (t << 5) - t + n[r];
			return 255 & t
		}

		function r(n, t, r, e, i) {
			for(var u = n.length; t < u;) r[e++] = n[t++] ^ 255 & i, i = ~(131 * i)
		}

		function e(n) {
			for(var t = [], r = n.length, e = 0; e < r;) {
				var i = n[e++] << 16 | n[e++] << 8 | n[e++];
				t.push(f.charAt(i >> 18), f.charAt(i >> 12 & 63), f.charAt(i >> 6 & 63), f.charAt(63 & i))
			}
			return t.join("")
		}

		function i(n) {
			for(var t = [], r = 0; r < n.length; r += 4) {
				var e = s[n.charAt(r)] << 18 | s[n.charAt(r + 1)] << 12 | s[n.charAt(r + 2)] << 6 | s[n.charAt(r + 3)];
				t.push(e >> 16, e >> 8 & 255, 255 & e)
			}
			return t
		}

		function u() {
			for(var n = 0; n < 64; n++) {
				var t = f.charAt(n);
				s[t] = n
			}
		}

		function o(n) {
			var i = t(n),
				u = [a, i];
			return r(n, 0, u, 2, i), e(u)
		}

		function c(n) {
			var e = i(n),
				u = e[1],
				o = [];
			if(r(e, 2, o, 0, u), t(o) == u) return o
		}
		var a = 2,
			f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
			s = {};
		n.p = u, n.N = o, n.O = c
	}(s || (s = {}));
	var l;
	! function(n) {
		function t() {
			for(var n = navigator.platform, t = 0; t < r.length; t++)
				if(r[t].test(n)) return t + 1;
			return 0
		}
		var r = [/^Win32/, /^Win64/, /^Linux armv|Android/, /^Android/, /^iPhone/, /^iPad/, /^MacIntel/, /^Linux [ix]\d+/, /^ARM/, /^iPod/, /^BlackBerry/];
		n.P = t
	}(l || (l = {}));
	var d;
	! function(t) {
		function r() {
			return n.c() / 1e3 >>> 0
		}

		function e() {
			n.d(location.href, "#")
		}

		function i(t) {
			if(c.p(), a.p(), t) {
				var r = s.O(t);
				r && o.M(r)
			}
			o[1] = n.a(), o[5] = a.D(), o[6] = l.P(), e(), o[8] = n.b(navigator.userAgent), o[16] = a.C(), o[17] = a.F(), a.H(function(n) {
				o[7] = n
			})
		}

		function u(t, i) {
			var u;
			0 == o[4] && (o[4] = n.a(), o[3] = r(), u = !0), o[2] = r(), o[9] = c.q(), o[10] = c.r(), o[11] = c.s(), o[12] = c.t();
			var a = c.x();
			o[13] = a.u, o[14] = a.v;
			var v = c.z(),
				l = c.B(),
				d = c.A(),
				h = [u, c.y(), t, v, a.w, history.length > 0, d, l];
			if(o[15] = n.i(h), t) {
				o[0] = ++f, e();
				n.e(i, "//")
			} else o[0] = 0;
			var p = o.L(),
				g = s.N(p);
			return g
		}
		var o = new v([2, 2, 4, 4, 4, 1, 1, 4, 4, 3, 2, 2, 2, 2, 2, 1, 2, 1]),
			f = 0;
		t.p = i, t.Q = u
	}(d || (d = {}));
	var h, p = "";
	! function(i) {
		function u(n, t) {
			if(t)
				for(var r = 0; r < t.length; r++)
					if(t[r].test(n)) return !0;
			return !1
		}

		function o(n) {
			return u(n, r) || u(n, e["sufei_jsonp_ignore"])
		}

		function c(t) {
			var r = n.h(t);
			return !r || w.test(r)
		}

		function a(r) {
			y || (y = new Date(n.c() + 15552e6).toUTCString()), f.J(t, r, y, m, "/")
		}

		function s() {
			a(d.Q(!1, null))
		}

		function v(n) {
			a(d.Q(!0, n)), _ || (_ = setTimeout(function() {
				_ = 0, s()
			}, 0))
		}

		function l(n) {
			if(o(n)) return p;
			var r = d.Q(!0, n);
			return n + (/\?/.test(n) ? "&" : "?") + t + "=" + r
		}

		function h(n) {
			return null == n ? n = "" : n += "", c(n) ? (v(n), null) : l(n)
		}

		function g() {
			var r = f.I(t);
			d.p(r);
			var e = location.hostname;
			m = n.g(e), w = new RegExp("\\.?" + m.replace(/\./g, "\\.") + "$", "i"), s(), n.j(window, "unload", function(n) {
				s()
			})
		}
		var m, w, y, _;
		i.Q = h, i.p = g
	}(h || (h = {}));
	var g;
	! function(t) {
		function r() {
			i() || (o("insertBefore"), o("appendChild"))
		}

		function i() {
			var t = e["HTMLScriptElement"];
			return !!t && n.l(t.prototype, "src", function(n) {
				return function(t) {
					try {
						var r = a(t);
						r && (t = r)
					} catch(e) {}
					return n.call(this, t)
				}
			})
		}

		function o(t) {
			var r = e["Element"];
			r ? n.k(r.prototype, t, c) : (n.k(u, t, c), n.k(document.body, t, c))
		}

		function c(t) {
			return function(r) {
				if(r && "SCRIPT" === r.tagName) try {
					var e = a(r.src);
					e && (r.src = e)
				} catch(i) {}
				return n.m(this, t, arguments)
			}
		}

		function a(n) {
			return f.test(n) ? /isg=/.test(n) ? null : h.Q(n) : null
		}
		t.p = r;
		var f = /callback=/
	}(g || (g = {}));
	var m;
	! function(t) {
		function r(t) {
			return n.d(t.href, "#")
		}

		function i(n) {
			var t = n.target;
			if(!t) {
				var r = document.getElementsByTagName("base"),
					e = r.length;
				e > 0 && (t = r[e - 1].target)
			}
			return t
		}

		function u(n) {
			if(/^https?\:/.test(n.protocol)) {
				var t = i(n);
				if(!t || /^_self$/i.test(t)) {
					if(r(n) === s && n.hash) return
				}
				h.Q(n.href)
			}
		}

		function o(n) {
			if(!n.defaultPrevented)
				for(var t = n.target || n.srcElement; t;) {
					var r = t.tagName;
					if("A" === r || "AREA" === r) {
						u(t);
						break
					}
					t = t.parentNode
				}
		}

		function c(n) {
			var t = n.target || n.srcElement;
			if(t[v] !== l) {
				h.Q(t.action)
			}
		}

		function a(n) {
			return function() {
				try {
					var t = this;
					h.Q(t.action), t[v] = ++l
				} catch(r) {}
				return n.apply(this, arguments)
			}
		}

		function f() {
			s = r(location), n.j(document, "click", o), n.j(document, "submit", c);
			var t = e["HTMLFormElement"];
			t && n.k(t.prototype, "submit", a)
		}
		var s, v = n.o("sufei_id"),
			l = 0;
		t.p = f
	}(m || (m = {}));
	var w;
	! function(t) {
		function r() {
			i(), /Mobile/.test(o) && (u(), c() || document.addEventListener("DOMContentLoaded", c))
		}

		function i() {
			n.k(e, "fetch", function(n) {
				return function(t, r) {
					if("string" != typeof t) return n.apply(this, arguments);
					try {
						var e = h.Q(t);
						e ? t = e : "" === e || (r = r || {}, r.credentials = r.credentials || "include")
					} catch(i) {}
					return n.call(this, t, r)
				}
			})
		}

		function u() {
			var t = e["lib"];
			t && n.k(t.windvane, "call", function(n) {
				return function(t, r, e) {
					if("MtopWVPlugin" === t && "send" === r) try {
						h.Q("")
					} catch(i) {}
					return n.apply(this, arguments)
				}
			})
		}

		function c() {
			var t = e["jsbridge"];
			if(t && (t = t["default"])) return n.k(t, "pushBack", function(n) {
				return function(t, r, e) {
					if("native:" === t) try {
						h.Q("")
					} catch(i) {}
					return n.apply(this, arguments)
				}
			}), !0
		}
		t.p = r
	}(w || (w = {}));
	var y;
	! function(t) {
		function r() {
			var n = e["XMLHttpRequest"];
			if(n) {
				var t = n.prototype;
				t ? i(t) : u()
			}
			o()
		}

		function i(t) {
			n.k(t, "open", function(n) {
				return function(t, r) {
					return this[c] = r, n.apply(this, arguments)
				}
			}), n.k(t, "send", function(n) {
				return function(t) {
					try {
						var r = this[c];
						h.Q(r)
					} catch(e) {}
					return n.apply(this, arguments)
				}
			})
		}

		function u() {
			n.k(e, "XMLHttpRequest", function(t) {
				return function() {
					try {
						h.Q("")
					} catch(r) {}
					return n.n(t, arguments)
				}
			})
		}

		function o() {
			n.k(e, "ActiveXObject", function(t) {
				return function(r) {
					try {
						r && /XMLHTTP/i.test(r) && h.Q("")
					} catch(e) {}
					return n.n(t, arguments)
				}
			})
		}
		var c = n.o("sufei_url");
		t.p = r
	}(y || (y = {}));
	var _;
	! function(n) {
		function t() {
			s.p(), h.p(), m.p(), y.p(), w.p(), g.p()
		}
		var r = "_sufei_data2";
		! function() {
			if(!document[r]) {
				document[r] = 300;
				try {
					t()
				} catch(n) {}
			}
		}()
	}(_ || (_ = {}))
}();