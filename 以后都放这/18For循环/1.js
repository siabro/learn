define("event-custom", ["event-base", "util"], function(t) {
	var e, r, n, i, s, a, u = t("event-base"),
		o = t("util");
	return e = function(t) {
		function e() {
			e.superclass.constructor.apply(this, arguments)
		}
		var r = u,
			n = o;
		return n.extend(e, r.Observer, {
			keys: ["fn", "context", "groups"]
		}), t = e
	}(), r = function(t) {
		function e(t) {
			e.superclass.constructor.call(this), n.mix(this, t)
		}
		var r = u,
			n = o;
		return n.extend(e, r.Object), t = e
	}(), n = function(t) {
		function n() {
			var t = this;
			n.superclass.constructor.apply(t, arguments), t.defaultFn = null, t.defaultTargetOnly = !1, t.bubbles = !0
		}
		var i = u,
			s = e,
			a = r,
			c = i.Utils,
			f = o;
		return f.extend(n, i.Observable, {
			on: function(t) {
				var e = new s(t); - 1 === this.findObserver(e) && this.observers.push(e)
			},
			fire: function(t) {
				t = t || {};
				var e, r, n, i, s, u = this,
					o = u.bubbles,
					c = u.currentTarget,
					f = u.type,
					v = u.defaultFn,
					g = t;
				if(t.type = f, g.isEventObject || (g = new a(g)), g.target = g.target || c, g.currentTarget = c, s = u.notify(g), i !== !1 && void 0 !== s && (i = s), o && !g.isPropagationStopped())
					for(e = c.getTargets(), r = e && e.length || 0, n = 0; r > n && !g.isPropagationStopped(); n++) s = e[n].fire(f, g), i !== !1 && void 0 !== s && (i = s);
				if(v && !g.isDefaultPrevented()) {
					var l = g.target,
						h = l.getEventListeners(g.type);
					(u.defaultTargetOnly || h && h.defaultTargetOnly) && c !== l || (i = v.call(c, g))
				}
				return i
			},
			notify: function(t) {
				var e, r, n, i = [].concat(this.observers),
					s = i.length;
				for(n = 0; s > n && !t.isImmediatePropagationStopped(); n++) e = i[n].notify(t, this), r !== !1 && void 0 !== e && (r = e);
				return r
			},
			detach: function(t) {
				var e, r = this,
					n = t.fn,
					i = t.context,
					s = r.currentTarget,
					a = r.observers,
					u = t.groups;
				if(a.length) {
					u && (e = c.getGroupsRe(u));
					var o, f, v, g, l, h = a.length;
					if(n || e) {
						for(i = i || s, o = 0, f = 0, v = []; h > o; ++o) {
							g = a[o];
							var p = g.config;
							l = p.context || s, (i !== l || n && n !== p.fn || e && !p.groups.match(e)) && (v[f++] = g)
						}
						r.observers = v
					} else r.reset()
				}
			}
		}), t = n
	}(), i = function(t) {
		function e(t, e) {
			var r = t.getEventListeners(e);
			return r || (r = t.getEventListeners()[e] = new i({
				currentTarget: t,
				type: e
			})), r
		}
		var r = u,
			i = n,
			s = o,
			a = r.Utils,
			c = a.splitAndRun,
			f = "__~ks_bubble_targets",
			v = "__~ks_custom_events";
		return t = {
			isTarget: 1,
			fire: function(t, e) {
				var r, n = this,
					s = n.getTargets(),
					u = s && s.length;
				return t.isEventObject && (e = t, t = t.type), e = e || {}, c(t, function(t) {
					var s, o;
					if(a.fillGroupsForEvent(t, e), t = e.type, o = n.getEventListeners(t), o || u) {
						if(o) {
							if(!o.hasObserver() && !o.defaultFn && (o.bubbles && !u || !o.bubbles)) return
						} else o = new i({
							currentTarget: n,
							type: t
						});
						s = o.fire(e), r !== !1 && void 0 !== s && (r = s)
					}
				}), r
			},
			publish: function(t, r) {
				var n, i = this;
				return c(t, function(t) {
					n = e(i, t), s.mix(n, r)
				}), i
			},
			addTarget: function(t) {
				var e = this,
					r = e.getTargets();
				return s.inArray(t, r) || r.push(t), e
			},
			removeTarget: function(t) {
				var e = this,
					r = e.getTargets(),
					n = s.indexOf(t, r);
				return -1 !== n && r.splice(n, 1), e
			},
			getTargets: function() {
				return this[f] || (this[f] = [])
			},
			getEventListeners: function(t) {
				var e = this[v] || (this[v] = {});
				return t ? e[t] : e
			},
			on: function(t, r, n) {
				var i = this;
				return a.batchForType(function(t, r, n) {
					var s = a.normalizeParam(t, r, n);
					t = s.type;
					var u = e(i, t);
					u.on(s)
				}, 0, t, r, n), i
			},
			detach: function(t, e, r) {
				var n = this;
				return a.batchForType(function(t, e, r) {
					var i = a.normalizeParam(t, e, r);
					if(t = i.type) {
						var u = n.getEventListeners(t);
						u && u.detach(i)
					} else s.each(n.getEventListeners(), function(t) {
						t.detach(i)
					})
				}, 0, t, e, r), n
			}
		}
	}(), s = function(t) {
		var e = i,
			n = o;
		return t = {
			Target: e,
			Object: r,
			global: n.mix({}, e)
		}
	}(), a = function(t) {
		return t = s
	}()
});
define("event-base", ["util"], function(t) {
	var n, r, e, o, i, u, a = t("util");
	return n = function(t) {
		function n(t) {
			if(t.indexOf(".") < 0) return [t, ""];
			var n = t.match(/([^.]+)?(\..+)?$/),
				r = n[1],
				e = [r],
				o = n[2];
			return o ? (o = o.split(".").sort(), e.push(o.join("."))) : e.push(""), e
		}
		var r, e, o = a;
		return t = {
			splitAndRun: r = function(t, n) {
				return o.isArray(t) ? (o.each(t, n), void 0) : (t = o.trim(t), -1 === t.indexOf(" ") ? n(t) : o.each(t.split(/\s+/), n), void 0)
			},
			normalizeParam: function(t, r, e) {
				var i = r || {};
				i = "function" == typeof r ? {
					fn: r,
					context: e
				} : o.merge(i);
				var u = n(t);
				return t = u[0], i.groups = u[1], i.type = t, i
			},
			batchForType: function(t, n) {
				var e = o.makeArray(arguments),
					i = e[2 + n];
				i && o.isObject(i) ? o.each(i, function(r, o) {
					var i = [].concat(e);
					i.splice(0, 2), i[n] = o, i[n + 1] = r, t.apply(null, i)
				}) : r(i, function(r) {
					var o = [].concat(e);
					o.splice(0, 2), o[n] = r, t.apply(null, o)
				})
			},
			fillGroupsForEvent: function(t, r) {
				var o = n(t),
					i = o[1];
				i && (i = e(i), r._ksGroups = i), r.type = o[0]
			},
			getGroupsRe: e = function(t) {
				return new RegExp(t.split(".").join(".*\\.") + "(?:\\.|$)")
			}
		}
	}(), r = function(t) {
		function n(t) {
			this.config = t || {}
		}
		var r, e = a;
		return n.prototype = {
			constructor: n,
			equals: function(t) {
				var n = this;
				return !!e.reduce(n.keys, function(r, e) {
					return r && n.config[e] === t.config[e]
				}, 1)
			},
			simpleNotify: function(t, n) {
				var r, e = this,
					o = e.config;
				return r = o.fn.call(o.context || n.currentTarget, t, o.data), o.once && n.removeObserver(e), r
			},
			notifyInternal: function(t, n) {
				var r = this.simpleNotify(t, n);
				return r === !1 && t.halt(), r
			},
			notify: function(t, n) {
				var e = this,
					o = e.config,
					i = t._ksGroups;
				return !i || o.groups && o.groups.match(i) ? e.notifyInternal(t, n) : r
			}
		}, t = n
	}(), e = function(t) {
		function n(t) {
			var n = this;
			n.currentTarget = null, r.mix(n, t), n.reset()
		}
		var r = a;
		return n.prototype = {
			constructor: n,
			hasObserver: function() {
				return !!this.observers.length
			},
			reset: function() {
				var t = this;
				t.observers = []
			},
			removeObserver: function(t) {
				var n, r = this,
					e = r.observers,
					o = e.length;
				for(n = 0; o > n; n++)
					if(e[n] === t) {
						e.splice(n, 1);
						break
					}
				r.checkMemory()
			},
			checkMemory: function() {},
			findObserver: function(t) {
				var n, r = this.observers;
				for(n = r.length - 1; n >= 0; --n)
					if(t.equals(r[n])) return n;
				return -1
			}
		}, t = n
	}(), o = function(t) {
		function n() {
			var t = this;
			t.timeStamp = i.now(), t.target = r, t.currentTarget = r
		}
		var r, e = function() {
				return !1
			},
			o = function() {
				return !0
			},
			i = a;
		return n.prototype = {
			isEventObject: 1,
			constructor: n,
			isDefaultPrevented: e,
			isPropagationStopped: e,
			isImmediatePropagationStopped: e,
			preventDefault: function() {
				this.isDefaultPrevented = o
			},
			stopPropagation: function() {
				this.isPropagationStopped = o
			},
			stopImmediatePropagation: function() {
				var t = this;
				t.isImmediatePropagationStopped = o, t.stopPropagation()
			},
			halt: function(t) {
				var n = this;
				t ? n.stopImmediatePropagation() : n.stopPropagation(), n.preventDefault()
			}
		}, t = n
	}(), i = function(t) {
		var i = n,
			u = r,
			a = e;
		return t = {
			Utils: i,
			Object: o,
			Observer: u,
			Observable: a
		}
	}(), u = function(t) {
		return t = i
	}()
});
define("io", ["util", "io-extra", "io-form"], function(i) {
	var r, e = i("util"),
		t = i("io-extra"),
		o = i("io-form");
	return r = function(i) {
		var r = e,
			a = t,
			n = o;
		return r.mix(a, {
			serialize: n.serialize,
			getFormData: n.getFormData
		}), i = a
	}()
});
define("io-extra", ["util", "querystring", "dom", "io-base", "util"], function(t) {
	var e, r, n, o = t("util"),
		a = t("querystring"),
		i = t("dom"),
		c = t("io-base"),
		u = t("util");
	return e = function(t) {
		function e(t) {
			var e, r = m.guid("io-iframe"),
				n = f.getEmptyIframeSrc();
			return e = t.iframe = f.create("<iframe " + (n ? ' src="' + n + '" ' : "") + ' id="' + r + '" name="' + r + '" style="position:absolute;left:-9999px;top:-9999px;"/>'), f.prepend(e, y.body || y.documentElement), e
		}

		function r(t, e, r) {
			var n, o, a, i = [];
			return m.each(t, function(t, c) {
				for(n = m.isArray(t), n || (t = [t]), o = 0; o < t.length; o++) a = y.createElement("input"), a.type = "hidden", a.name = c + (n && r ? "[]" : ""), a.value = t[o], f.append(a, e), i.push(a)
			}), i
		}

		function n(t) {
			f.remove(t)
		}

		function u(t) {
			var e, r = this,
				o = r.form,
				a = r.io,
				i = t.type,
				c = a.iframe;
			if(c)
				if("abort" === i && 6 === p.ie ? setTimeout(function() {
						f.attr(o, r.attrs)
					}, 0) : f.attr(o, r.attrs), n(this.fields), p.removeEvent(c, "load", r._callback), p.removeEvent(c, "error", r._callback), setTimeout(function() {
						f.remove(c)
					}, b), a.iframe = null, "load" === i) try {
					e = c.contentWindow.document, e && e.body && (a.responseText = f.html(e.body), m.startsWith(a.responseText, "<?xml") && (a.responseText = void 0)), a.responseXML = e && e.XMLDocument ? e.XMLDocument : e, e ? a._ioReady(v, "success") : a._ioReady(g, "parser error")
				} catch(u) {
					a._ioReady(g, "parser error")
				} else "error" === i && a._ioReady(g, "error")
		}

		function s(t) {
			this.io = t, this._callback = m.bind(u, this)
		}
		var m = o,
			d = a,
			f = i,
			l = c,
			p = l._util,
			y = document,
			v = 200,
			g = 500,
			b = 30,
			h = m.clone(l.getConfig().converters.text);
		return h.json = function(t) {
			return m.parseJson(m.unEscapeHtml(t))
		}, l.setupConfig({
			converters: {
				iframe: h,
				text: {
					iframe: function(t) {
						return t
					}
				},
				xml: {
					iframe: function(t) {
						return t
					}
				}
			}
		}), m.augment(s, {
			send: function() {
				function t() {
					p.addEvent(o, "load", i._callback), p.addEvent(o, "error", i._callback), m.submit()
				}
				var n, o, a, i = this,
					c = i.io,
					u = c.config,
					s = u.data,
					m = f.get(u.form);
				i.attrs = {
					target: f.attr(m, "target") || "",
					action: f.attr(m, "action") || "",
					encoding: f.attr(m, "encoding"),
					enctype: f.attr(m, "enctype"),
					method: f.attr(m, "method")
				}, i.form = m, o = e(c), f.attr(m, {
					target: o.id,
					action: c._getUrlForSend(),
					method: "post",
					enctype: "multipart/form-data",
					encoding: "multipart/form-data"
				}), s && (a = d.parse(s)), a && (n = r(a, m, u.serializeArray)), i.fields = n, 6 === p.ie ? setTimeout(t, 0) : t()
			},
			abort: function() {
				this._callback({
					type: "abort"
				})
			}
		}), l.setupTransport("iframe", s), t
	}(), r = function(t) {
		var e = c,
			r = u;
		return r.mix(e, {
			upload: function(t, r, n, o, a) {
				return "function" == typeof n && (a = o, o = n, n = void 0), e({
					url: t,
					type: "post",
					dataType: a,
					form: r,
					data: n,
					complete: o
				})
			}
		}), t = e
	}(), n = function(t) {
		return t = r
	}()
});
define("io-base", ["util", "querystring", "promise", "url", "dom", "io-script"], function(e) {
	var t, r, n, o, a, i, s, c, u, p, d, f = e("util"),
		l = e("querystring"),
		v = e("promise"),
		m = e("url"),
		h = e("dom"),
		y = e("io-script");
	return t = function(e) {
		function t(e) {
			var t = e.context;
			delete e.context, e = n.mix(n.clone(x), e, {
				deep: !0
			}), e.context = t || e;
			var r, a, s = e.type,
				u = e.dataType;
			return a = e.uri = i.parse(i.resolve(d, e.url), !0), a.query = {}, "crossDomain" in e || (e.crossDomain = !(a.protocol === h.protocol && a.host === h.host)), s = e.type = s.toUpperCase(), e.hasContent = !p.test(s), e.processData && (r = e.data) && "string" != typeof r && (e.data = o.stringify(r, void 0, void 0, e.serializeArray)), u = e.dataType = n.trim(u || "*").split(c), "cache" in e || !n.inArray(u[0], ["script", "jsonp"]) || (e.cache = !1), e.hasContent || (e.data && n.mix(a.query, o.parse(e.data)), e.cache === !1 && (a.query._ksTS = n.now() + "_" + n.guid())), e
		}

		function r(e) {
			var o = this;
			if(!(o instanceof r)) return new r(e);
			r.superclass.constructor.call(o), a.Defer(o), o.userConfig = e, e = t(e), n.mix(o, {
				responseData: null,
				config: e || {},
				timeoutTimer: null,
				responseText: null,
				responseXML: null,
				responseHeadersString: "",
				responseHeaders: null,
				requestHeaders: {},
				readyState: 0,
				state: 0,
				statusText: null,
				status: 0,
				transport: null
			});
			var i, s;
			r.callPreprocessors("start", {
				io: o
			}), r.fire("start", {
				io: o
			}), i = g[e.dataType[0]] || g["*"], s = new i(o), o.transport = s, e.contentType && o.setRequestHeader("Content-Type", e.contentType);
			var c, u = e.dataType[0],
				p = e.timeout,
				d = e.context,
				f = e.headers,
				l = e.accepts;
			o.setRequestHeader("Accept", u && l[u] ? l[u] + ("*" === u ? "" : ", */*; q=0.01") : l["*"]);
			for(c in f) o.setRequestHeader(c, f[c]);
			if(e.beforeSend && e.beforeSend.call(d, o, e) === !1) return o;
			o.readyState = 1, r.callPreprocessors("send", {
				io: o
			}), r.fire("send", {
				io: o
			}), e.async && p > 0 && (o.timeoutTimer = setTimeout(function() {
				o.abort("timeout")
			}, 1e3 * p));
			try {
				o.state = 1, s.send()
			} catch(v) {
				o.state < 2 && o._ioReady(-1, v.message || "send error")
			}
			return o
		}
		var n = f,
			o = l,
			a = v,
			i = m,
			s = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
			c = /\s+/,
			u = function(e) {
				return e
			},
			p = /^(?:GET|HEAD)$/,
			d = location.href,
			h = i.parse(d),
			y = s.test(h.protocol),
			g = {},
			x = {
				type: "GET",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				async: !0,
				serializeArray: !0,
				processData: !0,
				accepts: {
					xml: "application/xml, text/xml",
					html: "text/html",
					text: "text/plain",
					json: "application/json, text/javascript",
					"*": "*/*"
				},
				converters: {
					text: {
						json: n.parseJson,
						html: u,
						text: u,
						xml: n.parseXML || u
					}
				},
				headers: {
					"X-Requested-With": "XMLHttpRequest"
				},
				contents: {
					xml: /xml/,
					html: /html/,
					json: /json/
				}
			};
		x.converters.html = x.converters.text;
		var T = {},
			b = {};
		return n.mix(r, {
			preprocessors: T,
			events: b,
			addPreprocessor: function(e, t) {
				var n = T[e] = T[e] || [];
				return n.push(t), r
			},
			callPreprocessors: function(e, t) {
				for(var n = (T[e] || []).concat(), o = 0, a = n.length; a > o; o++) n[o].call(r, t)
			},
			on: function(e, t) {
				var n = b[e] = b[e] || [];
				return n.push(t), r
			},
			detach: function(e, t) {
				if(t) {
					var r = b[e];
					if(r) {
						var o = n.indexOf(t, r); - 1 !== o && r.splice(o, 1)
					}
				} else b[e] = []
			},
			fire: function(e, t) {
				var n = (b[e] || []).concat();
				t = t || {}, t.type = e, t.target = t.currentTarget = r;
				for(var o = 0, a = n.length; a > o; o++) n[o].call(r, t)
			},
			isLocal: y,
			setupConfig: function(e) {
				n.mix(x, e, {
					deep: !0
				})
			},
			setupTransport: function(e, t) {
				g[e] = t
			},
			getTransport: function(e) {
				return g[e]
			},
			getConfig: function() {
				return x
			}
		}), e = r
	}(), r = function(e) {
		function t(e, t, r) {
			e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, r)
		}

		function r(e, t, r) {
			e.removeEventListener ? e.removeEventListener(t, r, !1) : e.detachEvent && e.detachEvent("on" + t, r)
		}

		function n(e) {
			var t = 0;
			return parseFloat(e.replace(/\./g, function() {
				return 0 === t++ ? "." : ""
			}))
		}
		var o, a, i = {
				addEvent: t,
				removeEvent: r
			},
			s = (window.navigator || {}).userAgent || "";
		return(o = s.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (a = o[1] || o[2]) && (i.ie = n(a), i.ieMode = document.documentMode || i.ie), e = i
	}(), n = function(e) {
		function n(e, t) {
			try {
				return new(t || y).XMLHttpRequest
			} catch(r) {}
			return void 0
		}

		function o(e, t) {
			try {
				return new(t || y).ActiveXObject("Microsoft.XMLHTTP")
			} catch(r) {}
			return void 0
		}

		function a(e) {
			return g && e instanceof g
		}

		function i(e) {
			var t, r = e.ifModified;
			return r && (t = e.uri, e.cache === !1 && (t = c.clone(t), delete t.query._ksTS), t = u.stringify(t)), t
		}
		var s, c = f,
			u = m,
			p = l,
			d = t,
			v = r,
			h = 200,
			y = window,
			g = v.ieMode > 7 && y.XDomainRequest,
			x = 204,
			T = 404,
			b = 1223,
			_ = {
				proto: {}
			},
			w = {},
			H = {};
		return d.__lastModifiedCached = w, d.__eTagCached = H, _.nativeXhr = y.ActiveXObject ? function(e, t) {
			return !s && e && g ? new g : !d.isLocal && n(e, t) || o(e, t)
		} : n, s = _.supportCORS = "withCredentials" in _.nativeXhr(), _.XDomainRequest_ = g, c.mix(_.proto, {
			sendInternal: function() {
				var e, t, r, n, o = this,
					u = o.io,
					d = u.config,
					f = o.nativeXhr,
					l = d.files,
					v = l ? "post" : d.type,
					m = d.async,
					h = u.mimeType,
					y = u.requestHeaders || {},
					g = u._getUrlForSend(),
					x = i(d);
				x && ((r = w[x]) && (y["If-Modified-Since"] = r), (r = H[x]) && (y["If-None-Match"] = r)), (e = d.username) ? f.open(v, g, m, e, d.password) : f.open(v, g, m), t = d.xhrFields || {}, "withCredentials" in t && (s || delete t.withCredentials);
				for(n in t) try {
					f[n] = t[n]
				} catch(T) {}
				h && f.overrideMimeType && f.overrideMimeType(h);
				var b = y["X-Requested-With"];
				if(b === !1 && delete y["X-Requested-With"], "undefined" != typeof f.setRequestHeader)
					for(n in y) f.setRequestHeader(n, y[n]);
				var _ = d.hasContent && d.data || null;
				if(l) {
					var R = _,
						j = {};
					R && (j = p.parse(R)), j = c.mix(j, l), _ = new FormData, c.each(j, function(e, t) {
						c.isArray(e) ? c.each(e, function(e) {
							_.append(t + (d.serializeArray ? "[]" : ""), e)
						}) : _.append(t, e)
					})
				}
				f.send(_), m && 4 !== f.readyState ? a(f) ? (f.onload = function() {
					f.readyState = 4, f.status = 200, o._callback()
				}, f.onerror = function() {
					f.readyState = 4, f.status = 500, o._callback()
				}) : f.onreadystatechange = function() {
					o._callback()
				} : o._callback()
			},
			abort: function() {
				this._callback(0, 1)
			},
			_callback: function(e, t) {
				var r, n, o, s, u, p = this,
					f = p.nativeXhr,
					l = p.io,
					v = l.config;
				try {
					if(t || 4 === f.readyState)
						if(a(f) ? (f.onerror = c.noop, f.onload = c.noop) : f.onreadystatechange = c.noop, t) 4 !== f.readyState && f.abort();
						else {
							r = i(v);
							var m = f.status;
							a(f) || (l.responseHeadersString = f.getAllResponseHeaders()), r && (n = f.getResponseHeader("Last-Modified"), o = f.getResponseHeader("ETag"), n && (w[r] = n), o && (H[o] = o)), u = f.responseXML, u && u.documentElement && (l.responseXML = u);
							var y = l.responseText = f.responseText;
							if(v.files && y) {
								var g, _; - 1 !== (g = y.indexOf("<body>")) && (_ = y.lastIndexOf("</body>"), -1 === _ && (_ = y.length), y = y.slice(g + 6, _)), l.responseText = c.unEscapeHtml ? c.unEscapeHtml(y) : y
							}
							try {
								s = f.statusText
							} catch(R) {
								s = ""
							}
							m || !d.isLocal || v.crossDomain ? m === b && (m = x) : m = l.responseText ? h : T, l._ioReady(m, s)
						}
				} catch(R) {
					f.onreadystatechange = c.noop, t || l._ioReady(-1, R.message || "process error")
				}
			}
		}), e = _
	}(), o = function(e) {
		function t(e) {
			var t = this,
				r = e.config;
			t.io = e, r.crossDomain = !1, t._onLoad = a.bind(o, t)
		}

		function o() {
			var e = this,
				t = e.io.config,
				r = t.uri,
				n = r.hostname,
				o = l[n];
			o.ready = 1, i.removeEvent(o.iframe, "load", e._onLoad), e.send()
		}
		var a = f,
			i = r,
			s = m,
			c = h,
			u = n,
			p = "/sub_domain_proxy.html",
			d = document,
			l = {};
		return a.augment(t, u.proto, {
			send: function() {
				var e, t, r = this,
					n = r.io.config,
					o = n.uri,
					a = o.hostname,
					f = l[a],
					v = p;
				return n.xdr && n.xdr.subDomain && n.xdr.subDomain.proxy && (v = n.xdr.subDomain.proxy), f && f.ready ? (r.nativeXhr = u.nativeXhr(0, f.iframe.contentWindow), r.nativeXhr ? r.sendInternal() : console.error("io: document.domain not set correctly!"), void 0) : (f ? e = f.iframe : (f = l[a] = {}, e = f.iframe = d.createElement("iframe"), c.css(e, {
					position: "absolute",
					left: "-9999px",
					top: "-9999px"
				}), c.prepend(e, d.body || d.documentElement), t = {}, t.protocol = o.protocol, t.host = o.host, t.pathname = v, e.src = s.stringify(t)), i.addEvent(e, "load", r._onLoad), void 0)
			}
		}), e = t
	}(), a = function(e) {
		function r(e) {
			var t = e.config,
				r = this;
			return t.crossDomain ? (r.io = e, r) : new(o.getTransport("*"))(e)
		}
		var n = f,
			o = t,
			a = 200,
			i = 500;
		return o.setupConfig({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /javascript|ecmascript/
			},
			converters: {
				text: {
					script: function(e) {
						return n.globalEval(e), e
					}
				}
			}
		}), n.augment(r, {
			send: function() {
				var e = this,
					t = e.io,
					r = t.config;
				e.script = o.getScript(t._getUrlForSend(), {
					charset: r.scriptCharset,
					success: function() {
						e._callback("success")
					},
					error: function() {
						e._callback("error")
					}
				})
			},
			_callback: function(e, t) {
				var r = this,
					n = r.script,
					o = r.io;
				n && (r.script = void 0, t || ("error" !== e ? o._ioReady(a, "success") : "error" === e && o._ioReady(i, "script error")))
			},
			abort: function() {
				this._callback(0, 1)
			}
		}), o.setupTransport("script", r), e
	}(), i = function(e) {
		var r = f,
			n = t,
			o = window;
		return n.setupConfig({
			jsonp: "callback",
			jsonpCallback: function() {
				return r.guid("jsonp")
			}
		}), n.addPreprocessor("start", function(e) {
			var t = e.io,
				n = t.config,
				a = n.dataType;
			if("jsonp" === a[0]) {
				delete n.contentType;
				var i, s, c = n.jsonpCallback,
					u = "function" == typeof c ? c() : c,
					p = o[u];
				n.uri.query[n.jsonp] = u, o[u] = function(e) {
					arguments.length > 1 && (e = r.makeArray(arguments)), i = [e]
				}, t.fin(function() {
					if(o[u] = p, void 0 === p) try {
						delete o[u]
					} catch(e) {} else i && p(i[0])
				}), s = n.converters, s.script = s.script || {}, s.script.json = function() {
					if(!i) throw new Error("not call jsonpCallback: " + u);
					return i[0]
				}, a.length = 2, a[0] = "script", a[1] = "json"
			}
		}), e
	}(), s = function(e) {
		function r(e) {
			var t, r, o, a = e.responseText,
				i = e.responseXML,
				s = e.config,
				c = s.converters,
				u = s.contents,
				p = s.dataType;
			if(a || i) {
				for(r = e.mimeType || e.getResponseHeader("Content-Type");
					"*" === p[0];) p.shift();
				if(!p.length)
					for(t in u)
						if(u[t].test(r)) {
							p[0] !== t && p.unshift(t);
							break
						}
				p[0] = p[0] || "text";
				for(var d = 0; d < p.length; d++) {
					if("text" === p[d] && void 0 !== a) {
						o = a;
						break
					}
					if("xml" === p[d] && void 0 !== i) {
						o = i;
						break
					}
				}
				if(!o) {
					var f = {
						text: a,
						xml: i
					};
					n.each(["text", "xml"], function(e) {
						var t = p[0],
							r = c[e] && c[e][t];
						return r && f[e] ? (p.unshift(e), o = "text" === e ? a : i, !1) : void 0
					})
				}
			}
			for(var l = p[0], v = 1; v < p.length; v++) {
				t = p[v];
				var m = c[l] && c[l][t];
				if(!m) throw new Error("no covert for " + l + " => " + t);
				o = m(o), l = t
			}
			e.responseData = o
		}
		var n = f,
			o = v,
			a = t,
			i = m,
			s = 200,
			c = 300,
			u = 304,
			p = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
		return n.extend(a, o, {
			setRequestHeader: function(e, t) {
				var r = this;
				return r.requestHeaders[e] = t, r
			},
			getAllResponseHeaders: function() {
				var e = this;
				return 2 === e.state ? e.responseHeadersString : null
			},
			getResponseHeader: function(e) {
				var t, r, n = this;
				if(e = e.toLowerCase(), 2 === n.state) {
					if(!(r = n.responseHeaders))
						for(r = n.responseHeaders = {}; t = p.exec(n.responseHeadersString);) r[t[1].toLowerCase()] = t[2];
					t = r[e]
				}
				return void 0 === t ? null : t
			},
			overrideMimeType: function(e) {
				var t = this;
				return t.state || (t.mimeType = e), t
			},
			abort: function(e) {
				var t = this;
				return e = e || "abort", t.transport && t.transport.abort(e), t._ioReady(0, e), t
			},
			getNativeXhr: function() {
				var e = this.transport;
				return e ? e.nativeXhr : null
			},
			_ioReady: function(e, t) {
				var n = this;
				if(2 !== n.state) {
					n.state = 2, n.readyState = 4;
					var o;
					if(e >= s && c > e || e === u)
						if(e === u) t = "not modified", o = !0;
						else try {
							r(n), t = "success", o = !0
						} catch(i) {
							t = i.message || "parser error"
						} else 0 > e && (e = 0);
					n.status = e, n.statusText = t;
					var p, d = n.defer,
						f = n.config;
					(p = n.timeoutTimer) && (clearTimeout(p), n.timeoutTimer = 0);
					var l, v = o ? "success" : "error",
						m = [n.responseData, t, n],
						h = f.context,
						y = {
							io: n
						};
					(l = f[v]) && l.apply(h, m), (l = f.complete) && l.apply(h, m), a.fire(v, y), a.fire("complete", y), d[o ? "resolve" : "reject"](m)
				}
			},
			_getUrlForSend: function() {
				var e = this.config,
					t = e.uri,
					r = t.search || "";
				return delete t.search, r && !n.isEmptyObject(t.query) && (r = "&" + r.substring(1)), i.stringify(t, e.serializeArray) + r
			}
		}), e
	}(), c = function(e) {
		function r(e, t, r, o, a) {
			return "function" == typeof t && (o = r, r = t, t = void 0), n({
				type: a || "get",
				url: e,
				data: t,
				complete: r,
				dataType: o
			})
		}
		var n = t,
			o = f,
			a = y;
		return o.mix(n, {
			getScript: a,
			get: r,
			post: function(e, t, n, o) {
				return "function" == typeof t && (o = n, n = t, t = void 0), r(e, t, n, o, "post")
			},
			jsonp: function(e, t, n) {
				if(o.isPlainObject(e)) {
					var a = e;
					e = a.url, t = a.data, n = a.success
				} else "function" == typeof t && (n = t, t = void 0);
				return r(e, t, n, "jsonp")
			},
			getJSON: function(e, t, n) {
				return "function" == typeof t && (n = t, t = void 0), r(e, t, n, "json")
			}
		}), e = n
	}(), u = function(e) {
		function r(e) {
			return p.domain && i.endsWith(e, p.domain)
		}

		function a(e) {
			var t, n = e.config,
				o = n.crossDomain,
				a = this,
				i = n.xdr || {},
				s = i.subDomain = i.subDomain || {};
			return a.io = e, o && !c.supportCORS && r(n.uri.hostname) && s.proxy !== !1 ? new u(e) : (t = a.nativeXhr = c.nativeXhr(o), a)
		}
		var i = f,
			s = t,
			c = n,
			u = o,
			p = document;
		return i.augment(a, c.proto, {
			send: function() {
				this.sendInternal()
			}
		}), s.setupTransport("*", a), e
	}(), p = function(e) {
		var t = c,
			n = r;
		return t._util = n, e = t
	}(), d = function(e) {
		return e = p
	}()
});
define("promise", [], function() { //! Copyright 2015, promise@6.1.1 MIT Licensed, build time: Thu, 29 Oct 2015 12:29:42 GMT 
	var n, t;
	return n = function(n) {
		function t(n, t) {
			if(n)
				for(var e = 0, r = n.length; r > e && t(n[e], e) !== !1; e++);
		}

		function e(n, t) {
			for(var e in t) n[e] = t[e]
		}

		function r(n) {
			return n && "function" == typeof n.then
		}

		function o(n, t, e) {
			if(n instanceof f) e.call(n, n.reason);
			else if(n instanceof s || !r(n)) {
				var i = n[p];
				if(r(i) || i instanceof f) return o(i, t, e), void 0;
				n[v] === m ? n[d].push([t, e]) : t && t.call(n, i)
			} else n.then(t, e)
		}

		function i(n) {
			var t = this;
			return t instanceof i ? (t.promise = n || new s, t.promise.defer = t, void 0) : new i(n)
		}

		function u(n) {
			return n && n instanceof s
		}

		function c(n, t) {
			return function() {
				return n.apply(t, arguments)
			}
		}

		function s(n) {
			var t = this;
			if(t[d] = [], t[w] = [], n)
				if("function" == typeof n) {
					t[v] = m;
					var e = new i(t),
						r = c(e.resolve, e),
						o = c(e.reject, e);
					try {
						n(r, o)
					} catch(u) {
						throw o(u), new Error(u.stack || u)
					}
				} else t[v] = y;
			else t[v] = m
		}

		function f(n) {
			return n instanceof f ? n : (this.reason = n, void 0)
		}

		function a(n, t, e) {
			function u(n) {
				try {
					return t ? t.call(this, n) : n
				} catch(e) {
					return window.console && console.error(e.stack || e), new f(e)
				}
			}

			function c(n) {
				try {
					return e ? e.call(this, n) : new f(n)
				} catch(t) {
					return window.console && console.error(t.stack || t), new f(t)
				}
			}

			function s(n) {
				l || (l = 1, a.resolve(u.call(this, n)))
			}
			var a = new i,
				l = 0;
			return r(n) ? o(n, s, function(n) {
				l || (l = 1, a.resolve(c.call(this, n)))
			}) : s(n), a.promise
		}

		function l(n) {
			return n && n[v] === y
		}

		function h(n) {
			return n && n[v] === _
		}
		var p = "__promise_value",
			v = "__promise_status",
			w = "__promise_progress_listeners",
			d = "__promise_pendings",
			m = "Pending",
			y = "Fulfilled",
			_ = "Rejected";
		return i.prototype = {
			constructor: i,
			resolve: function(n) {
				var e = this.promise;
				if(e[v] !== m) return null;
				e[v] = n instanceof f ? _ : y, e[p] = n;
				var r = e[d];
				return t(r, function(n) {
					o(e, n[0], n[1])
				}), e[d] = [], e[w] = [], this.promise
			},
			reject: function(n) {
				return this.resolve(new f(n))
			},
			notify: function(n) {
				return this.promise[v] !== m ? null : (t(this.promise[w], function(t) {
					t(n)
				}), void 0)
			}
		}, s.prototype = {
			constructor: s,
			then: function(n, t, e) {
				return e && this.progress(e), a(this, n, t)
			},
			progress: function(n) {
				var t = this,
					e = t[w];
				return t[v] !== m ? t : (e || (e = t[w] = []), e.push(n), t)
			},
			fail: function(n) {
				return this.then(0, n)
			},
			fin: function(n) {
				return this.then(function(t) {
					return n(t, !0)
				}, function(t) {
					return n(t, !1)
				})
			},
			done: function(n, t) {
				var e = this,
					r = function(n) {
						setTimeout(function() {
							throw n
						}, 0)
					},
					o = n || t ? e.then(n, t) : e;
				o.fail(r)
			},
			isResolved: function() {
				return l(this)
			},
			isRejected: function() {
				return h(this)
			}
		}, s.prototype["catch"] = s.prototype.fail, s.Defer = i, e(s, {
			when: a,
			cast: function(n) {
				return n instanceof s ? n : new s(function(t) {
					t(n)
				})
			},
			resolve: function(n) {
				return new s(function(t) {
					t(n)
				})
			},
			reject: function(n) {
				return new s(function(t, e) {
					e(n)
				})
			},
			isPromise: u,
			isResolved: l,
			isRejected: h,
			all: function(n) {
				var t = n.length;
				if(!t) return null;
				for(var e = new i, r = 0; r < n.length; r++) ! function(r, o) {
					a(r, function(r) {
						n[o] = r, 0 === --t && e.resolve(n)
					}, function(n) {
						e.reject(n)
					})
				}(n[r], r);
				return e.promise
			},
			async: function(n) {
				return function() {
					function t(n, t) {
						var i;
						return i = o[n](t), i.done ? i.value : a(i.value, e, r)
					}

					function e(n) {
						return t("next", n)
					}

					function r(n) {
						return t("throw", n)
					}
					var o = n.apply(this, arguments);
					try {
						return e()
					} catch(i) {
						return s.reject(i)
					}
				}
			}
		}), n = s
	}(), t = function(t) {
		return t = n
	}()
});
define("dom-base", ["util", "io-script", "feature", "query-selector"], function(e) {
	var t, n, r, o, i, a, u, l, c, f, d, s, p = e("util"),
		v = e("io-script"),
		g = e("feature"),
		m = e("query-selector");
	return t = function(e) {
		var t = p,
			n = window,
			r = n.document,
			o = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
			i = {
				ELEMENT_NODE: 1,
				ATTRIBUTE_NODE: 2,
				TEXT_NODE: 3,
				CDATA_SECTION_NODE: 4,
				ENTITY_REFERENCE_NODE: 5,
				ENTITY_NODE: 6,
				PROCESSING_INSTRUCTION_NODE: 7,
				COMMENT_NODE: 8,
				DOCUMENT_NODE: 9,
				DOCUMENT_TYPE_NODE: 10,
				DOCUMENT_FRAGMENT_NODE: 11,
				NOTATION_NODE: 12
			},
			a = e = {
				isCustomDomain: function(e) {
					e = e || n, e = a.get(e);
					var t = e.document.domain,
						r = e.location.hostname;
					return t !== r && t !== "[" + r + "]"
				},
				getEmptyIframeSrc: function() {
					return ""
				},
				NodeType: i,
				getWindow: function(e) {
					if(e = a.get(e), !e || !e.nodeType) return n;
					if(t.isWindow(e)) return e;
					var r = e;
					return r.nodeType !== i.DOCUMENT_NODE && (r = e.ownerDocument), r.defaultView || r.parentWindow
				},
				getDocument: function(e) {
					return e ? (e = a.get(e), t.isWindow(e) ? e.document : e.nodeType === i.DOCUMENT_NODE ? e : e.ownerDocument) : r
				},
				isDomNodeList: function(e) {
					return e && !e.nodeType && e.item && !e.setTimeout
				},
				nodeName: function(e) {
					var t = a.get(e),
						n = t.nodeName.toLowerCase(),
						r = t.scopeName;
					return r && "HTML" !== r && (n = r.toLowerCase() + ":" + n), n
				},
				_RE_NUM_NO_PX: new RegExp("^(" + o + ")(?!px)[a-z%]+$", "i")
			};
		return e
	}(), n = function(e) {
		function n(e) {
			return null == e ? "" : e + ""
		}

		function r(e, t) {
			t = y[t] || t;
			var n = N[t];
			return n && n.get ? n.get(e, t) : e[t]
		}
		var o = p,
			i = t,
			a = i.NodeType,
			u = "",
			l = i.nodeName,
			c = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
			f = /^(?:button|input|object|select|textarea)$/i,
			d = /^a(?:rea)?$/i,
			s = /:|^on/,
			v = /\r/g,
			g = {},
			m = {
				val: 1,
				css: 1,
				html: 1,
				text: 1,
				data: 1,
				width: 1,
				height: 1,
				offset: 1,
				scrollTop: 1,
				scrollLeft: 1
			},
			h = {
				tabindex: {
					get: function(e) {
						var t = e.getAttributeNode("tabindex");
						return t && t.specified ? parseInt(t.value, 10) : f.test(e.nodeName) || d.test(e.nodeName) && e.href ? 0 : void 0
					}
				}
			},
			y = {
				hidefocus: "hideFocus",
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			E = {
				get: function(e, t) {
					return i.prop(e, t) ? t.toLowerCase() : void 0
				},
				set: function(e, t, n) {
					var r;
					return t === !1 ? i.removeAttr(e, n) : (r = y[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
				}
			},
			N = {},
			T = {},
			_ = {
				select: {
					get: function(e) {
						var t, n, r, o = e.selectedIndex,
							a = e.options,
							u = "select-one" === String(e.type);
						if(0 > o) return null;
						if(u) return i.val(a[o]);
						for(t = [], n = 0, r = a.length; r > n; ++n) a[n].selected && t.push(i.val(a[n]));
						return t
					},
					set: function(e, t) {
						var n = o.makeArray(t),
							r = e.options;
						return o.each(r, function(e) {
							e.selected = o.inArray(i.val(e), n)
						}), n.length || (e.selectedIndex = -1), n
					}
				}
			};
		return o.each(["radio", "checkbox"], function(e) {
			_[e] = {
				get: function(e) {
					return null === e.getAttribute("value") ? "on" : e.value
				},
				set: function(e, t) {
					return o.isArray(t) ? (e.checked = o.inArray(i.val(e), t), 1) : void 0
				}
			}
		}), h.style = {
			get: function(e) {
				return e.style.cssText
			}
		}, o.mix(i, {
			_valHooks: _,
			_propFix: y,
			_attrHooks: h,
			_propHooks: N,
			_attrNodeHook: T,
			_attrFix: g,
			prop: function(e, t, n) {
				var a, u, l, c = i.query(e);
				if("object" == typeof t) return o.each(t, function(e, t) {
					i.prop(c, t, e)
				}), void 0;
				if(t = y[t] || t, l = N[t], void 0 !== n)
					for(a = c.length - 1; a >= 0; a--) u = c[a], l && l.set ? l.set(u, n, t) : u[t] = n;
				else if(c.length) return r(c[0], t);
				return void 0
			},
			removeProp: function(e, t) {
				t = y[t] || t;
				var n, r, o = i.query(e);
				for(n = o.length - 1; n >= 0; n--) {
					r = o[n];
					try {
						r[t] = void 0, delete r[t]
					} catch(a) {}
				}
			},
			attr: function(e, t, n, r) {
				var o, f, d, p = i.query(e),
					v = p[0];
				if("object" == typeof t) {
					r = n;
					for(var y in t) i.attr(p, y, t[y], r);
					return void 0
				}
				if(r && m[t]) return i[t](e, n);
				if(t = t.toLowerCase(), r && m[t]) return i[t](e, n);
				if(t = g[t] || t, o = c.test(t) ? E : s.test(t) ? T : h[t], void 0 === n) {
					if(v && v.nodeType === a.ELEMENT_NODE) {
						if("form" === l(v) && (o = T), o && o.get) return o.get(v, t);
						if(d = v.getAttribute(t), "" === d) {
							var N = v.getAttributeNode(t);
							if(!N || !N.specified) return void 0
						}
						return null === d ? void 0 : d
					}
				} else
					for(f = p.length - 1; f >= 0; f--) v = p[f], v && v.nodeType === a.ELEMENT_NODE && ("form" === l(v) && (o = T), o && o.set ? o.set(v, n, t) : v.setAttribute(t, u + n));
				return void 0
			},
			removeAttr: function(e, t) {
				t = t.toLowerCase(), t = g[t] || t;
				var n, r, o, u = i.query(e);
				for(o = u.length - 1; o >= 0; o--) r = u[o], r.nodeType === a.ELEMENT_NODE && (r.removeAttribute(t), c.test(t) && (n = y[t] || t) in r && (r[n] = !1))
			},
			val: function(e, t) {
				var r, a, u, c, f, d;
				if(void 0 === t) return u = i.get(e), u ? (r = _[l(u)] || _[u.type], r && "get" in r && void 0 !== (a = r.get(u, "value")) ? a : (a = u.value, "string" == typeof a ? a.replace(v, "") : null == a ? "" : a)) : void 0;
				for(c = i.query(e), f = c.length - 1; f >= 0; f--) {
					if(u = c[f], 1 !== u.nodeType) return void 0;
					d = t, null == d ? d = "" : "number" == typeof d ? d += "" : o.isArray(d) && (d = o.map(d, n)), r = _[l(u)] || _[u.type];
					var s = r && "set" in r;
					s && void 0 !== r.set(u, d, "value") || (u.value = d)
				}
				return void 0
			},
			text: function(e, t) {
				var n, r, o, u;
				if(void 0 === t) return n = i.get(e), i._getText(n);
				for(r = i.query(e), o = r.length - 1; o >= 0; o--) n = r[o], u = n.nodeType, u === a.ELEMENT_NODE ? (i.cleanData(n.getElementsByTagName("*")), "textContent" in n ? n.textContent = t : n.innerText = t) : (u === a.TEXT_NODE || u === a.CDATA_SECTION_NODE) && (n.nodeValue = t);
				return void 0
			},
			_getText: function(e) {
				return e.textContent
			},
			_getProp: r
		}), e
	}(), r = function(e) {
		function n(e) {
			e = i.trim(e || "");
			for(var t, n = e.split(c), r = [], o = n.length, a = 0; o > a; a++)(t = n[a]) && r.push(t);
			return r
		}

		function r(e) {
			return function(t, n) {
				var r, o, i, a = t.classList,
					l = u.call(arguments, 2);
				for(r = 0, o = n.length; o > r; r++)(i = n[r]) && a[e].apply(a, [i].concat(l))
			}
		}

		function o(e) {
			return function(t, r) {
				var o = n(r),
					i = u.call(arguments, 2);
				a.query(t).each(function(t) {
					t.nodeType === l.ELEMENT_NODE && a[e].apply(a, [t, o].concat(i))
				})
			}
		}
		var i = p,
			a = t,
			u = [].slice,
			l = a.NodeType,
			c = /[\.\s]\s*\.?/;
		return i.mix(a, {
			_hasClass: function(e, t) {
				var n, r, o, i = e.classList;
				if(i.length) {
					for(n = 0, r = t.length; r > n; n++)
						if(o = t[n], o && !i.contains(o)) return !1;
					return !0
				}
				return !1
			},
			_addClass: r("add"),
			_removeClass: r("remove"),
			_toggleClass: r("toggle"),
			hasClass: function(e, t) {
				var r = !1;
				return t = n(t), a.query(e).each(function(e) {
					return e.nodeType === l.ELEMENT_NODE && a._hasClass(e, t) ? (r = !0, !1) : void 0
				}), r
			},
			replaceClass: function(e, t, n) {
				a.removeClass(e, t), a.addClass(e, n)
			},
			addClass: o("_addClass"),
			removeClass: o("_removeClass"),
			toggleClass: o("_toggleClass")
		}), e
	}(), o = function(e) {
		function n(e, t) {
			return e.getElementsByTagName(t)
		}

		function r(e, t) {
			var n = e && e !== m ? e.createElement(y) : N;
			return t && n === N && (n.innerHTML = ""), n
		}

		function o(e, t) {
			var n = r(t);
			return n.innerHTML = "m<div>" + e + "</div>", n.lastChild
		}

		function i(e) {
			try {
				return e.innerHTML = "", void 0
			} catch(t) {}
			for(; e.lastChild;) a(e.lastChild, e)
		}

		function a(e, t) {
			t && (b && t.canHaveChildren && "removeNode" in e ? (e.firstChild && i(e), e.removeNode(!1)) : t.removeChild(e))
		}

		function u(e, t, r) {
			var o = t.nodeType;
			if(o === h.DOCUMENT_FRAGMENT_NODE)
				for(var i = t.childNodes, a = r.childNodes, l = 0; i[l];) a[l] && u(e, i[l], a[l]), l++;
			else if(o === h.ELEMENT_NODE)
				for(var c = n(t, "*"), f = n(r, "*"), d = 0; c[d];) f[d] && e(c[d], f[d]), d++
		}

		function l(e, t, n) {
			var r, o;
			if(t.nodeType !== h.ELEMENT_NODE) {
				r = g.data(e);
				for(o in r) g.data(t, o, r[o]);
				n && n.clone(e, t)
			}
		}

		function c(e, t) {
			var n = e.nodeType;
			return n === h.ELEMENT_NODE ? g.attr(e, t, !0) : n === h.DOCUMENT_FRAGMENT_NODE && g.attr(e.childNodes, t, !0), e
		}

		function f(e) {
			var t, n, r, o = null;
			if(!e || !e.push && !e.item || !e[0]) throw new Error("Unable to convert " + e + " to fragment.");
			for(n = e[0].ownerDocument, o = n.createDocumentFragment(), e = v.makeArray(e), t = 0, r = e.length; r > t; t++) o.appendChild(e[t]);
			return o
		}
		var d, s, v = p,
			g = t,
			m = document,
			h = g.NodeType,
			y = "div",
			E = "parentNode",
			N = m && m.createElement(y),
			T = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			_ = /<([\w:]+)/,
			C = /^\s+/,
			D = /\s+$/,
			b = function(e) {
				var t, n;
				return(t = e.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (n = t[1] || t[2]) ? parseFloat(n) < 9 : !1
			}(navigator.userAgent),
			w = b,
			x = /<|&#?\w+;/,
			O = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
			M = g._creators = {
				div: o
			},
			L = {
				area: "map",
				thead: "table",
				td: "tr",
				th: "tr",
				tr: "tbody",
				tbody: "table",
				tfoot: "table",
				caption: "table",
				colgroup: "table",
				col: "colgroup",
				legend: "fieldset"
			},
			A = "<{tag}>{html}</{tag}>";
		for(s in L) ! function(e) {
			M[s] = function(t, n) {
				return g.create(v.substitute(A, {
					tag: e,
					html: t
				}), d, n)
			}
		}(L[s]);
		return M.option = M.optgroup = function(e, t) {
			return g.create('<select multiple="multiple">' + e + "</select>", void 0, t)
		}, L.option = L.optgroup = 1, v.mix(g, {
			create: function(e, t, n, r) {
				var i = null;
				if(!e) return i;
				if(e.nodeType) return g.clone(e);
				if("string" != typeof e) return i;
				void 0 === r && (r = !0), r && (e = v.trim(e));
				var a, u, l, d, s, p = n || m,
					h = y;
				if(x.test(e))
					if(l = O.exec(e)) i = p.createElement(l[1]);
					else if(e = e.replace(T, "<$1></$2>"), (l = _.exec(e)) && (d = l[1]) && (h = d.toLowerCase()), a = (M[h] || o)(e, p), w && (u = e.match(C)) && a.insertBefore(p.createTextNode(u[0]), a.firstChild), w && /\S/.test(e) && (u = e.match(D)) && a.appendChild(p.createTextNode(u[0])), s = a.childNodes, 1 === s.length) i = s[0][E].removeChild(s[0]);
				else {
					if(!s.length) throw new Error(e + " : create node error");
					i = f(s)
				} else i = p.createTextNode(e);
				return t ? c(i, t) : i
			},
			_fixCloneAttributes: function(e, t) {
				var n, r, o = e.nodeName.toLowerCase(),
					i = (e.type || "").toLowerCase();
				"textarea" === o ? (t.defaultValue = e.defaultValue, t.value = e.value) : "input" !== o || "checkbox" !== i && "radio" !== i || (r = e.checked, r && (t.defaultChecked = t.checked = r), n = e.value, t.value !== n && (t.value = n))
			},
			_defaultCreator: o,
			html: function(e, t, o) {
				var i, a, u, l = g.query(e),
					c = l[0],
					f = !1;
				if(!c) return void 0;
				if(void 0 === t) {
					if(c.nodeType === h.ELEMENT_NODE) return c.innerHTML;
					if(c.nodeType === h.DOCUMENT_FRAGMENT_NODE) {
						var d = r(c.ownerDocument, 1);
						return d.appendChild(c), d.innerHTML
					}
					return null
				}
				if(t += "", !(t.match(/<(?:script|style|link)/i) || w && t.match(C) || L[(t.match(_) || ["", ""])[1].toLowerCase()])) try {
					for(a = l.length - 1; a >= 0; a--) u = l[a], u.nodeType === h.ELEMENT_NODE && (g.cleanData(n(u, "*")), u.innerHTML = t);
					f = !0
				} catch(s) {}
				return f || (i = g.create(t, 0, c.ownerDocument, 0), g.empty(l), g.append(i, l, o)), void 0
			},
			remove: function(e, t, r) {
				var o, i, u, l = g.query(e);
				for(u = l.length - 1; u >= 0; u--) o = l[u], t || o.nodeType !== h.ELEMENT_NODE || (i = v.makeArray(n(o, "*")), i.push(o), g.removeData(i), r && r.detach(i)), a(o, o.parentNode)
			},
			clone: function(e, t, n, r, o) {
				"object" == typeof t && (r = t.deepWithDataAndEvent, n = t.withDataAndEvent, t = t.deep);
				var i, a, c = g.get(e),
					f = g._fixCloneAttributes;
				return c ? (a = c.nodeType, i = c.cloneNode(t), (a === h.ELEMENT_NODE || a === h.DOCUMENT_FRAGMENT_NODE) && (f && a === h.ELEMENT_NODE && f(c, i), t && f && u(f, c, i)), n && (l(c, i, o), t && r && u(l, c, i)), i) : null
			},
			empty: function(e, t) {
				var n, r, o = g.query(e);
				for(r = o.length - 1; r >= 0; r--) n = o[r], g.remove(n.childNodes, !1, t)
			},
			_nodeListToFragment: f,
			_getHolderDiv: r
		}), e
	}(), i = function(e) {
		var n = p,
			r = t,
			o = window,
			i = "_ks_data_" + n.now(),
			a = {},
			u = {},
			l = {
				applet: 1,
				object: 1,
				embed: 1
			},
			c = {
				data: function(e, t, n) {
					if(e == o) return c.data(u, t, n);
					var r = e[i];
					return void 0 === n ? void 0 !== t ? r && r[t] : r = e[i] = e[i] || {} : (r = e[i] = e[i] || {}, r[t] = n, void 0)
				},
				removeData: function(e, t) {
					if(e == o) return c.removeData(u, t);
					var r = e[i];
					if(void 0 !== t) delete r[t], n.isEmptyObject(r) && c.removeData(e);
					else try {
						delete e[i]
					} catch(a) {
						e[i] = void 0
					}
				}
			},
			f = {
				data: function(e, t, r) {
					if(l[e.nodeName.toLowerCase()]) return void 0;
					var o, u = e[i];
					if(!u) {
						if(void 0 !== t && void 0 === r) return void 0;
						u = e[i] = n.guid()
					}
					return o = a[u], void 0 === r ? void 0 !== t ? o && o[t] : o = a[u] = a[u] || {} : (o = a[u] = a[u] || {}, o[t] = r, void 0)
				},
				removeData: function(e, t) {
					var r = e[i];
					if(r) {
						var o = a[r];
						if(void 0 !== t) delete o[t], n.isEmptyObject(o) && f.removeData(e);
						else {
							delete a[r];
							try {
								delete e[i]
							} catch(u) {
								e[i] = void 0
							}
							e.removeAttribute && e.removeAttribute(i)
						}
					}
				}
			};
		return n.mix(r, {
			__EXPANDO: i,
			_dataCache: a,
			_winDataCache: u,
			data: function(e, t, n) {
				var o = r.query(e),
					i = o[0];
				if("object" == typeof t) {
					for(var a in t) r.data(o, a, t[a]);
					return void 0
				}
				if(void 0 === n) {
					if(i) return i.nodeType ? f.data(i, t) : c.data(i, t)
				} else
					for(var u = o.length - 1; u >= 0; u--) i = o[u], i.nodeType ? f.data(i, t, n) : c.data(i, t, n);
				return void 0
			},
			removeData: function(e, t) {
				var n, o, i = r.query(e);
				for(o = i.length - 1; o >= 0; o--) n = i[o], n.nodeType ? f.removeData(n, t) : c.removeData(n, t)
			},
			cleanData: function(e, t, o) {
				var i, a, u = r.query(e);
				for(a = u.length - 1; a >= 0; a--)
					if(i = u[a], i.nodeType) {
						var l = t && n.makeArray(i.getElementsByTagName("*")) || [];
						l.push(i);
						for(var d = 0, s = l.length; s > d; d++) f.removeData(l[d]);
						o && o.detach(l)
					} else c.removeData(i)
			}
		}), e
	}(), a = function(e) {
		function n(e) {
			return !e.type || y.test(e.type)
		}

		function r(e, t) {
			var o, i, a, u = [];
			for(o = 0; e[o]; o++)
				if(i = e[o], a = s(i), i.nodeType === f.DOCUMENT_FRAGMENT_NODE) u.push.apply(u, r(g(i.childNodes), t));
				else if("script" === a && n(i)) i.parentNode && i.parentNode.removeChild(i), t && t.push(i);
			else {
				if(i.nodeType === f.ELEMENT_NODE && !d.test(a)) {
					var l, c, p = [],
						v = i.getElementsByTagName("script");
					for(c = 0; c < v.length; c++) l = v[c], n(l) && p.push(l);
					m.apply(e, [o + 1, 0].concat(p))
				}
				u.push(i)
			}
			return u
		}

		function o(e) {
			if(e.src) u(e.src);
			else {
				var t = a.trim(e.text || e.textContent || e.innerHTML || "");
				t && a.globalEval(t)
			}
		}

		function i(e, t, n, i) {
			e = l.query(e), i && (i = []), e = r(e, i), l._fixInsertionChecked && l._fixInsertionChecked(e), t = l.query(t);
			var u, c, f, d, s, p = e.length,
				v = t.length;
			if((p || i && i.length) && v)
				for(u = l._nodeListToFragment(e), v > 1 && (s = l.clone(u, !0), t = a.makeArray(t)), c = 0; v > c; c++) f = t[c], u && (d = c > 0 ? l.clone(s, !0) : u, n(d, f)), i && i.length && a.each(i, o)
		}
		var a = p,
			u = v,
			l = t,
			c = "parentNode",
			f = l.NodeType,
			d = /^(?:button|input|object|select|textarea)$/i,
			s = l.nodeName,
			g = a.makeArray,
			m = [].splice,
			h = "nextSibling",
			y = /\/(java|ecma)script/i;
		return a.mix(l, {
			_fixInsertionChecked: null,
			insertBefore: function(e, t, n) {
				i(e, t, function(e, t) {
					t[c] && t[c].insertBefore(e, t)
				}, n)
			},
			insertAfter: function(e, t, n) {
				i(e, t, function(e, t) {
					t[c] && t[c].insertBefore(e, t[h])
				}, n)
			},
			appendTo: function(e, t, n) {
				i(e, t, function(e, t) {
					t.appendChild(e)
				}, n)
			},
			prependTo: function(e, t, n) {
				i(e, t, function(e, t) {
					t.insertBefore(e, t.firstChild)
				}, n)
			},
			replaceWith: function(e, t) {
				var n = l.query(e);
				t = l.query(t), l.remove(t, !0), l.insertBefore(t, n), l.remove(n)
			}
		}), a.each({
			prepend: "prependTo",
			append: "appendTo",
			before: "insertBefore",
			after: "insertAfter"
		}, function(e, t) {
			l[t] = l[e]
		}), e
	}(), u = function(e) {
		function n(e) {
			var t, n, r, o = e.ownerDocument,
				i = o.body;
			return e.getBoundingClientRect ? (t = e.getBoundingClientRect(), n = t[b], r = t[w], n -= d.clientLeft || i.clientLeft || 0, r -= d.clientTop || i.clientTop || 0, {
				left: n,
				top: r
			}) : {
				left: 0,
				top: 0
			}
		}

		function r(e) {
			var t = n(e),
				r = s(e);
			return t.left += u[x](r), t.top += u[O](r), t
		}

		function o(e, t) {
			var o, i = {
					left: 0,
					top: 0
				},
				a = s(e),
				u = e;
			t = t || a;
			do o = a == t ? r(u) : n(u), i.left += o.left, i.top += o.top; while (a && a != t && (u = a.frameElement) && (a = a.parent));
			return i
		}

		function i(e, t) {
			"static" === u.css(e, h) && (e.style[h] = y);
			var n, r, i = o(e),
				a = {};
			for(r in t) n = parseFloat(u.css(e, r)) || 0, a[r] = n + t[r] - i[r];
			u.css(e, a)
		}
		var a = p,
			u = t,
			l = window,
			c = l.document,
			f = u.NodeType,
			d = c && c.documentElement,
			s = u.getWindow,
			v = "CSS1Compat",
			g = "compatMode",
			m = Math.max,
			h = "position",
			y = "relative",
			E = "document",
			N = "body",
			T = "documentElement",
			_ = "viewport",
			C = "scroll",
			D = "client",
			b = "left",
			w = "top",
			x = C + "Left",
			O = C + "Top",
			M = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		return a.mix(u, {
			offset: function(e, t, n) {
				var r;
				if(void 0 === t) {
					r = u.get(e);
					var a;
					return r && (a = o(r, n)), a
				}
				var l, c = u.query(e);
				for(l = c.length - 1; l >= 0; l--) r = c[l], i(r, t);
				return void 0
			},
			docWidth: 0,
			docHeight: 0,
			viewportHeight: 0,
			viewportWidth: 0,
			scrollTop: 0,
			scrollLeft: 0
		}), a.each(["Left", "Top"], function(e, t) {
			var n = C + e;
			u[n] = function(r, o) {
				if("number" == typeof r) return arguments.callee(l, r);
				r = u.get(r);
				var i, a, c, d, p;
				return r && r.nodeType === f.ELEMENT_NODE ? void 0 !== o ? r[n] = parseFloat(o) : i = r[n] : (d = s(r), void 0 !== o ? (o = parseFloat(o), a = "Left" === e ? o : u.scrollLeft(d), c = "Top" === e ? o : u.scrollTop(d), d.scrollTo(a, c)) : (i = d["page" + (t ? "Y" : "X") + "Offset"], "number" != typeof i && (p = d[E], i = p[T][n], "number" != typeof i && (i = p[N][n])))), i
			}
		}), a.each(["Width", "Height"], function(e) {
			u["doc" + e] = function(t) {
				t = u.get(t);
				var n = u.getDocument(t);
				return m(n[T][C + e], n[N][C + e], u[_ + e](n))
			}, u[_ + e] = function(t) {
				t = u.get(t);
				var n = s(t),
					r = n["inner" + e];
				if(M && r) return r;
				var o = D + e,
					i = n[E],
					a = i[N],
					l = i[T],
					c = l[o];
				return i[g] === v && c || a && a[o] || c
			}
		}), e
	}(), l = function(e) {
		function n(e) {
			if(W[e]) return W[e];
			var t = E(e);
			return t && t.propertyName || e
		}

		function r(e) {
			var t, n, r = F[e];
			return F[e] || (t = b.body || b.documentElement, n = b.createElement(e), h.prepend(n, t), r = h.css(n, "display"), t.removeChild(n), F[e] = r), r
		}

		function o(e, t, n) {
			var r, o = {},
				i = e.style;
			for(r in t) o[r] = i[r], i[r] = t[r];
			n.call(e);
			for(r in t) i[r] = o[r]
		}

		function i(e, t, r, o) {
			var i, a, u;
			if(!(i = e.style)) return void 0;
			if(t = o ? t : H(t), u = I[t], t = n(t), void 0 !== r) {
				if(null === r || r === q ? r = q : isNaN(Number(r)) || S[t] || (r += k), u && u.set && (r = u.set(e, r)), void 0 !== r) {
					try {
						i[t] = r
					} catch(l) {}
					r === q && i.removeAttribute && i.removeAttribute(t)
				}
				return i.cssText || e.removeAttribute("style"), void 0
			}
			return u && "get" in u && void 0 !== (a = u.get(e, !1)) || (a = i[t]), void 0 === a ? "" : a
		}

		function a(e) {
			var t, n = arguments;
			return 0 !== e.offsetWidth ? t = f.apply(void 0, n) : o(e, R, function() {
				t = f.apply(void 0, n)
			}), t
		}

		function u(e, t, n, r) {
			var o, i, a, u = 0;
			for(i = 0; i < t.length; i++)
				if(o = t[i])
					for(a = 0; a < n.length; a++) {
						var l;
						l = "border" === o ? o + n[a] + "Width" : o + n[a], u += parseFloat(h._getComputedStyle(e, l, r)) || 0
					}
			return u
		}

		function l(e, t) {
			return "border-box" === h._getComputedStyle(e, "boxSizing", t)
		}

		function c(e) {
			var t, n = e.ownerDocument;
			return n.defaultView && (t = n.defaultView.getComputedStyle(e, null)), t
		}

		function f(e, t, n) {
			if(v.isWindow(e)) return t === x ? h.viewportWidth(e) : h.viewportHeight(e);
			if(9 === e.nodeType) return t === x ? h.docWidth(e) : h.docHeight(e);
			var r = t === x ? ["Left", "Right"] : ["Top", "Bottom"],
				o = t === x ? e.offsetWidth : e.offsetHeight,
				i = c(e),
				a = l(e, i),
				f = 0;
			(null == o || 0 >= o) && (o = void 0, f = h._getComputedStyle(e, t, i), (null == f || Number(f) < 0) && (f = e.style[t] || 0), f = parseFloat(f) || 0), void 0 === n && (n = a ? C : T);
			var d = void 0 !== o || a,
				s = o || f;
			return n === T ? d ? s - u(e, ["border", "padding"], r, i) : f : d ? s + (n === C ? 0 : n === _ ? -u(e, ["border"], r, i) : u(e, ["margin"], r, i)) : f + u(e, N.slice(n), r, i)
		}

		function d(e) {
			var t, n, r = {
				top: 0,
				left: 0
			};
			return "fixed" === h.css(e, "position") ? n = e.getBoundingClientRect() : (t = s(e), n = h.offset(e), r = h.offset(t), r.top += parseFloat(h.css(t, "borderTopWidth")) || 0, r.left += parseFloat(h.css(t, "borderLeftWidth")) || 0), n.top -= parseFloat(h.css(e, "marginTop")) || 0, n.left -= parseFloat(h.css(e, "marginLeft")) || 0, {
				top: n.top - r.top,
				left: n.left - r.left
			}
		}

		function s(e) {
			for(var t = e.offsetParent || (e.ownerDocument || b).body; t && !P.test(t.nodeName) && "static" === h.css(t, "position");) t = t.offsetParent;
			return t
		}
		var v = p,
			m = g,
			h = t,
			y = window,
			E = m.getCssVendorInfo,
			N = ["margin", "border", "padding"],
			T = -1,
			_ = 2,
			C = 1,
			D = 0,
			b = y.document || {},
			w = /^margin/,
			x = "width",
			O = "height",
			M = "display",
			L = M + v.now(),
			A = "none",
			S = {
				fillOpacity: 1,
				fontWeight: 1,
				lineHeight: 1,
				opacity: 1,
				orphans: 1,
				widows: 1,
				zIndex: 1,
				zoom: 1
			},
			q = "",
			k = "px",
			B = /\d(?!px)[a-z%]+$/i,
			I = {},
			W = {
				"float": "cssFloat"
			},
			F = {},
			H = v.camelCase;
		v.mix(h, {
			_cssHooks: I,
			_cssProps: W,
			_getComputedStyle: function(e, t, r) {
				var o, i, a, u, l = "",
					c = e.ownerDocument;
				return t = n(t), (r = r || c.defaultView.getComputedStyle(e, null)) && (l = r.getPropertyValue(t) || r[t]), "" !== l || h.contains(c, e) || (l = e.style[t]), h._RE_NUM_NO_PX.test(l) && w.test(t) && (u = e.style, o = u.width, i = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = r.width, u.width = o, u.minWidth = i, u.maxWidth = a), l
			},
			_style: i,
			css: function(e, t, n) {
				var r, o, a, u, l = h.query(e),
					c = l[0];
				if("object" == typeof t) {
					for(r in t)
						for(u = l.length - 1; u >= 0; u--) i(l[u], r, t[r]);
					return void 0
				}
				if(t = H(t), o = I[t], void 0 === n) return a = "", c && (o && "get" in o && void 0 !== (a = o.get(c, !0)) || (a = h._getComputedStyle(c, t))), "undefined" == typeof a ? "" : a;
				for(u = l.length - 1; u >= 0; u--) i(l[u], t, n, 1);
				return void 0
			},
			show: function(e) {
				var t, n, o, i, a = h.query(e);
				for(i = a.length - 1; i >= 0; i--) o = a[i], o.style[M] = h.data(o, L) || q, h.css(o, M) === A && (t = o.tagName.toLowerCase(), n = r(t), h.data(o, L, n), o.style[M] = n)
			},
			hide: function(e) {
				var t, n, r = h.query(e);
				for(n = r.length - 1; n >= 0; n--) {
					t = r[n];
					var o = t.style,
						i = o[M];
					i !== A && (i && h.data(t, L, i), o[M] = A)
				}
			},
			toggle: function(e) {
				var t, n, r = h.query(e);
				for(n = r.length - 1; n >= 0; n--) t = r[n], h.css(t, M) === A ? h.show(t) : h.hide(t)
			},
			addStyleSheet: function(e, t, n) {
				"string" == typeof e && (n = t, t = e, e = y);
				var r, o = h.getDocument(e);
				n && (n = n.replace("#", q)) && (r = h.get("#" + n, o)), r || (r = h.create("<style>", {
					id: n
				}, o), h.get("head", o).appendChild(r), r.styleSheet ? r.styleSheet.cssText = t : r.appendChild(o.createTextNode(t)))
			},
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0,
			width: 0,
			height: 0
		}), v.each([x, O], function(e) {
			h["inner" + v.ucfirst(e)] = function(t) {
				var n = h.get(t);
				return n && a(n, e, _)
			}, h["outer" + v.ucfirst(e)] = function(t, n) {
				var r = h.get(t);
				return r && a(r, e, n ? D : C)
			};
			var t = e === x ? ["Left", "Right"] : ["Top", "Bottom"];
			h[e] = function(n, r) {
				var o = h.get(n);
				if(void 0 !== r) {
					if(o) {
						var i = c(o),
							f = l(o, i);
						return f && (r += u(o, ["padding", "border"], t, i)), h.css(n, e, r)
					}
					return void 0
				}
				return o && a(o, e, T)
			}, I[e] = {
				get: function(t, n) {
					var r;
					return n && (r = a(t, e) + "px"), r
				}
			}
		});
		var R = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		};
		v.each(["left", "top"], function(e) {
			I[e] = {
				get: function(t, n) {
					var r, o, i;
					if(n) {
						if(i = h.css(t, "position"), "static" === i) return "auto";
						if(r = h._getComputedStyle(t, e), o = "auto" === r, o && "relative" === i) return "0px";
						(o || B.test(r)) && (r = d(t)[e] + "px")
					}
					return r
				}
			}
		});
		var P = /^(?:body|html)$/i;
		return e
	}(), c = function(e) {
		function n(e) {
			var t, n = this,
				r = n.length;
			for(t = 0; r > t && e(n[t], t) !== !1; t++);
		}

		function r(e) {
			var t = e.substr(1);
			if(!t) throw new Error("An invalid or illegal string was specified for selector.");
			return t
		}

		function o(e) {
			var t = e.charAt(0);
			return "#" === t ? i(r(e)) : "." === t ? a(r(e)) : u(e)
		}

		function i(e) {
			return function(t) {
				var n = g._getElementById(e, E);
				return n && g._contains(t, n) ? [n] : []
			}
		}

		function a(e) {
			return function(t) {
				return v(t, e)
			}
		}

		function u(e) {
			return function(t) {
				return t.getElementsByTagName(e)
			}
		}

		function l(e) {
			var t = /,|\+|=|~|\[|\]|:|>|\||\$|\^|\*|\(|\)|[\w-]+\.[\w-]+|[\w-]+#[\w-]+/;
			return !e.match(t)
		}

		function c(e, t) {
			var r, i, a, u, f = "string" == typeof e,
				d = void 0 !== t ? c(t) : (u = 1) && [E],
				s = d.length;
			if(e) {
				if(f) {
					if(e = q(e), u)
						if("body" === e) r = [E.body];
						else if(O.test(e)) r = D(v(E, RegExp.$1));
					else if(A.test(e)) a = g._getElementById(RegExp.$2, E), r = a && a.nodeName.toLowerCase() === RegExp.$1 ? [a] : [];
					else if(M.test(e)) a = g._getElementById(e.substr(1), E), r = a ? [a] : [];
					else if(L.test(e)) r = D(E.getElementsByTagName(e));
					else if(l(e)) {
						var p, m, y, N = e.split(/\s+/),
							T = d;
						for(i = 0, p = N.length; p > i; i++) N[i] = o(N[i]);
						for(i = 0, p = N.length; p > i; i++) {
							var _, w = N[i],
								S = [];
							for(m = 0, y = T.length; y > m; m++) _ = w(T[m]), S.push.apply(S, D(_));
							if(T = S, !T.length) break
						}
						r = T && T.length > 1 ? g.unique(T) : T
					}
					if(!r) {
						for(r = [], i = 0; s > i; i++) x.apply(r, g._selectInternal(e, d[i]));
						r.length > 1 && s > 1 && g.unique(r)
					}
				} else if(r = e.nodeType || h.isWindow(e) ? [e] : e.getDOMNodes ? e.getDOMNodes() : C(e) ? e : b(e) ? D(e) : [e], !u) {
					var k, B = r,
						I = B.length;
					for(r = [], i = 0; I > i; i++)
						for(k = 0; s > k; k++)
							if(g._contains(d[k], B[i])) {
								r.push(B[i]);
								break
							}
				}
			} else r = [];
			return r.each = n, r
		}

		function f(e, t) {
			var n = e && d(e, "class");
			return n && (n = n.replace(/[\r\t\n]/g, w)) && (w + n + w).indexOf(w + t + w) > -1
		}

		function d(e, t) {
			var n = e && e.getAttributeNode(t);
			return n && n.specified ? "value" in n ? n.value : n.nodeValue : void 0
		}

		function s(e, t) {
			return "*" === t || e.nodeName.toLowerCase() === t.toLowerCase()
		}
		var v, g = t,
			h = p,
			y = m,
			E = document,
			N = E.documentElement,
			T = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector,
			_ = "getElementsByClassName" in E,
			C = h.isArray,
			D = h.makeArray,
			b = g.isDomNodeList,
			w = " ",
			x = Array.prototype.push,
			O = /^\.([\w-]+)$/,
			M = /^#([\w-]+)$/,
			L = /^([\w-])+$/,
			A = /^([\w-]+)#([\w-]+)$/,
			S = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,
			q = h.trim;
		v = _ ? function(e, t) {
			return e.getElementsByClassName(t)
		} : function(e, t) {
			var n, r, o = [],
				i = e.getElementsByTagName("*");
			for(t = " " + t + " ", n = 0; n < i.length; n++) r = i[n], (" " + (r.className || r.getAttribute("class")) + " ").indexOf(t) > -1 && o.push(r);
			return o
		};
		var k = "sourceIndex" in N ? function(e, t) {
				return e.sourceIndex - t.sourceIndex
			} : function(e, t) {
				if(!e.compareDocumentPosition || !t.compareDocumentPosition) return e.compareDocumentPosition ? -1 : 1;
				var n = 4 & e.compareDocumentPosition(t);
				return n ? -1 : 1
			},
			B = y && y.matches ? y.matches : function(e, t) {
				for(var n, r = [], o = 0, i = t.length; i > o; o++) n = t[o], T.call(n, e) && r.push(n);
				return r
			};
		return h.mix(g, {
			_getElementsByTagName: function(e, t) {
				return D(t.querySelectorAll(e))
			},
			_getElementById: function(e, t) {
				return t.getElementById(e)
			},
			_getSimpleAttr: d,
			_isTag: s,
			_hasSingleClass: f,
			_selectInternal: y || function(e, t) {
				return D(t.querySelectorAll(e))
			},
			query: c,
			get: function(e, t) {
				return c(e, t)[0] || null
			},
			unique: function() {
				function e(e, n) {
					return e === n ? (t = !0, 0) : k(e, n)
				}
				var t, n = !0;
				return [0, 0].sort(function() {
						return n = !1, 0
					}),
					function(r) {
						if(t = n, r.sort(e), t)
							for(var o = 1, i = r.length; i > o;) r[o] === r[o - 1] ? (r.splice(o, 1), --i) : o++;
						return r
					}
			}(),
			filter: function(e, t, n) {
				var r, o, i, a, u = c(e, n),
					l = [];
				return "string" == typeof t && (t = q(t)) && (i = S.exec(t)) && (r = i[1], o = i[2], a = i[3], r ? !r || o || a || (t = function(e) {
					return d(e, "id") === r
				}) : t = function(e) {
					var t = !0,
						n = !0;
					return o && (t = s(e, o)), a && (n = f(e, a)), n && t
				}), l = "function" == typeof t ? h.filter(u, t) : B(t, u)
			},
			test: function(e, t, n) {
				var r = c(e, n);
				return r.length && g.filter(r, t, n).length === r.length
			}
		}), e
	}(), f = function(e) {
		function n(e, t, n, o, l, c, f) {
			if(!(e = a.get(e))) return null;
			if(0 === t) return e;
			if(c || (e = e[n]), !e) return null;
			l = l && a.get(l) || null, void 0 === t && (t = 1);
			var d, s, p = [],
				v = i.isArray(t);
			for("number" == typeof t && (d = 0, s = t, t = function() {
					return ++d === s
				}); e && e !== l && (!(e.nodeType === u.ELEMENT_NODE || e.nodeType === u.TEXT_NODE && f) || !r(e, t) || o && !o(e) || (p.push(e), v));) e = e[n];
			return v ? p : p[0] || null
		}

		function r(e, t) {
			if(!t) return !0;
			if(i.isArray(t)) {
				var n, r = t.length;
				if(!r) return !0;
				for(n = 0; r > n; n++)
					if(a.test(e, t[n])) return !0
			} else if(a.test(e, t)) return !0;
			return !1
		}

		function o(e, t, n, r) {
			var o, l, c, f = [],
				d = a.get(e),
				s = d;
			if(d && n && (s = d.parentNode), s) {
				for(o = i.makeArray(s.childNodes), l = 0; l < o.length; l++) c = o[l], (r || c.nodeType === u.ELEMENT_NODE) && c !== d && f.push(c);
				t && (f = a.filter(f, t))
			}
			return f
		}
		var i = p,
			a = t,
			u = a.NodeType,
			l = 16;
		return i.mix(a, {
			_contains: function(e, t) {
				return !!(e.compareDocumentPosition(t) & l)
			},
			closest: function(e, t, r, o) {
				return n(e, t, "parentNode", function(e) {
					return e.nodeType !== u.DOCUMENT_FRAGMENT_NODE
				}, r, !0, o)
			},
			parent: function(e, t, r) {
				return n(e, t, "parentNode", function(e) {
					return e.nodeType !== u.DOCUMENT_FRAGMENT_NODE
				}, r, void 0)
			},
			first: function(e, t, r) {
				var o = a.get(e);
				return n(o && o.firstChild, t, "nextSibling", void 0, void 0, !0, r)
			},
			last: function(e, t, r) {
				var o = a.get(e);
				return n(o && o.lastChild, t, "previousSibling", void 0, void 0, !0, r)
			},
			next: function(e, t, r) {
				return n(e, t, "nextSibling", void 0, void 0, void 0, r)
			},
			prev: function(e, t, r) {
				return n(e, t, "previousSibling", void 0, void 0, void 0, r)
			},
			siblings: function(e, t, n) {
				return o(e, t, !0, n)
			},
			children: function(e, t) {
				return o(e, t, void 0)
			},
			contents: function(e, t) {
				return o(e, t, void 0, 1)
			},
			contains: function(e, t) {
				return e = a.get(e), t = a.get(t), e && t ? a._contains(e, t) : !1
			},
			index: function(e, t) {
				var n, r, o, l = a.query(e),
					c = 0,
					f = l[0];
				if(!t) {
					if(r = f && f.parentNode, !r) return -1;
					for(n = f; n = n.previousSibling;) n.nodeType === u.ELEMENT_NODE && c++;
					return c
				}
				return o = a.query(t), "string" == typeof t ? i.indexOf(f, o) : i.indexOf(o[0], l)
			},
			equals: function(e, t) {
				if(e = a.query(e), t = a.query(t), e.length !== t.length) return !1;
				for(var n = e.length; n >= 0; n--)
					if(e[n] !== t[n]) return !1;
				return !0
			}
		}), e
	}(), d = function(e) {
		var n = t;
		return e = n
	}(), s = function(e) {
		return e = d
	}()
});
define("query-selector-base", [], function() { //! Copyright 2015, query-selector-base@6.1.2 MIT Licensed, build time: Thu, 29 Oct 2015 12:31:02 GMT 
	var e;
	return e = function(e) {
		return e = null
	}()
});
define("dom-extra", ["dom-base", "util", "feature"], function(e) {
	var t, r, o, n, l, i, a, f, u, c = e("dom-base"),
		s = e("util"),
		p = e("feature");
	return t = function(e) {
		var t = c;
		return e = t
	}(), r = function(e) {
		var r = s,
			o = t,
			n = document,
			l = n && n.documentElement,
			i = o._getProp;
		return r.mix(o, {
			hasAttr: l && !l.hasAttribute ? function(e, t) {
				t = t.toLowerCase();
				var r, n, l, i = o.query(e);
				for(r = 0; r < i.length; r++)
					if(n = i[r], l = n.getAttributeNode(t), l && l.specified) return !0;
				return !1
			} : function(e, t) {
				for(var r = o.query(e), n = r.length, l = 0; n > l; l++)
					if(r[l].hasAttribute(t)) return !0;
				return !1
			},
			hasProp: function(e, t) {
				var r, n, l = o.query(e),
					a = l.length;
				for(r = 0; a > r; r++)
					if(n = l[r], void 0 !== i(n, t)) return !0;
				return !1
			}
		}), e
	}(), o = function(e) {
		var r = s,
			o = t,
			n = document,
			l = n && "outerHTML" in n.documentElement,
			i = o.NodeType,
			a = o._getHolderDiv;
		return r.mix(o, {
			outerHtml: function(e, t, r, n) {
				var f, u, c, s = o.query(e),
					p = s.length,
					d = s[0];
				if(!d) return null;
				if(void 0 === t) return l && d.nodeType !== i.DOCUMENT_FRAGMENT_NODE ? d.outerHTML : (f = a(d.ownerDocument, 1), f.appendChild(o.clone(d, !0)), f.innerHTML);
				if(t += "", !t.match(/<(?:script|style|link)/i) && l)
					for(u = p - 1; u >= 0; u--) d = s[u], d.nodeType === i.ELEMENT_NODE && (o.cleanData(d, 1), d.outerHTML = t);
				else c = o.create(t, 0, d.ownerDocument, 0), o.insertBefore(c, s, r), o.remove(s, !1, n);
				return void 0
			}
		}), o.outerHTML = o.outerHtml, e
	}(), n = function(e) {
		var r = s,
			o = t,
			n = window,
			l = o.__EXPANDO,
			i = o._dataCache,
			a = o._winDataCache,
			f = {
				hasData: function(e, t) {
					if(e)
						if(void 0 !== t) {
							if(t in e) return !0
						} else if(!r.isEmptyObject(e)) return !0;
					return !1
				}
			},
			u = {
				hasData: function(e, t) {
					if(e === n) return u.hasData(a, t);
					var r = e[l];
					return f.hasData(r, t)
				}
			},
			c = {
				hasData: function(e, t) {
					var r = e[l];
					if(!r) return !1;
					var o = i[r];
					return f.hasData(o, t)
				}
			};
		return r.mix(o, {
			hasData: function(e, t) {
				for(var r = !1, n = o.query(e), l = 0; l < n.length; l++) {
					var i = n[l];
					if(r = i.nodeType ? c.hasData(i, t) : u.hasData(i, t)) return r
				}
				return r
			}
		}), e
	}(), l = function(e) {
		var r = s,
			o = t;
		return r.mix(o, {
			wrapAll: function(e, t) {
				t = o.clone(o.get(t), !0), e = o.query(e), e[0].parentNode && o.insertBefore(t, e[0]);
				for(var r;
					(r = t.firstChild) && 1 === r.nodeType;) t = r;
				o.appendTo(e, t)
			},
			wrap: function(e, t) {
				e = o.query(e), t = o.get(t), r.each(e, function(e) {
					o.wrapAll(e, t)
				})
			},
			wrapInner: function(e, t) {
				e = o.query(e), t = o.get(t), r.each(e, function(e) {
					var r = e.childNodes;
					r.length ? o.wrapAll(r, t) : e.appendChild(t)
				})
			},
			unwrap: function(e) {
				e = o.query(e), r.each(e, function(e) {
					var t = e.parentNode;
					o.replaceWith(t, t.childNodes)
				})
			}
		}), e
	}(), i = function(e) {
		var r = s,
			o = t,
			n = o.getWindow,
			l = o.NodeType,
			i = "left",
			a = "top";
		return r.mix(o, {
			scrollIntoView: function(e, t, f, u) {
				var c, s;
				if(c = o.get(e)) {
					t && (t = o.get(t)), t || (t = c.ownerDocument), t.nodeType === l.DOCUMENT_NODE && (t = n(t)), "object" == typeof f && (u = f.allowHorizontalScroll, s = f.onlyScrollIfNeeded, f = f.alignWithTop), u = void 0 === u ? !0 : u;
					var p, d, h, v, y, m, T, g, D, N, w = r.isWindow(t),
						b = o.offset(c),
						L = o.outerHeight(c),
						E = o.outerWidth(c);
					w ? (T = t, N = o.height(T), D = o.width(T), g = {
						left: o.scrollLeft(T),
						top: o.scrollTop(T)
					}, y = {
						left: b[i] - g[i],
						top: b[a] - g[a]
					}, m = {
						left: b[i] + E - (g[i] + D),
						top: b[a] + L - (g[a] + N)
					}, v = g) : (p = o.offset(t), d = t.clientHeight, h = t.clientWidth, v = {
						left: o.scrollLeft(t),
						top: o.scrollTop(t)
					}, y = {
						left: b[i] - (p[i] + (parseFloat(o.css(t, "borderLeftWidth")) || 0)),
						top: b[a] - (p[a] + (parseFloat(o.css(t, "borderTopWidth")) || 0))
					}, m = {
						left: b[i] + E - (p[i] + h + (parseFloat(o.css(t, "borderRightWidth")) || 0)),
						top: b[a] + L - (p[a] + d + (parseFloat(o.css(t, "borderBottomWidth")) || 0))
					}), s ? (y.top < 0 || m.top > 0) && (f === !0 ? o.scrollTop(t, v.top + y.top) : f === !1 ? o.scrollTop(t, v.top + m.top) : y.top < 0 ? o.scrollTop(t, v.top + y.top) : o.scrollTop(t, v.top + m.top)) : (f = void 0 === f ? !0 : !!f, f ? o.scrollTop(t, v.top + y.top) : o.scrollTop(t, v.top + m.top)), u && (s ? (y.left < 0 || m.left > 0) && (f === !0 ? o.scrollLeft(t, v.left + y.left) : f === !1 ? o.scrollLeft(t, v.left + m.left) : y.left < 0 ? o.scrollLeft(t, v.left + y.left) : o.scrollLeft(t, v.left + m.left)) : (f = void 0 === f ? !0 : !!f, f ? o.scrollLeft(t, v.left + y.left) : o.scrollLeft(t, v.left + m.left)))
				}
			}
		}), e
	}(), a = function(e) {
		var r = s,
			o = p,
			n = t,
			l = r.camelCase,
			i = n._style,
			a = n.nodeName,
			f = o.getCssVendorInfo,
			u = f("userSelect"),
			c = u && u.propertyName;
		return r.mix(n, {
			style: function(e, t, r) {
				var o, a, f, u = n.query(e),
					c = u[0];
				if("object" == typeof t) {
					for(o in t)
						for(o = l(o), f = u.length - 1; f >= 0; f--) i(u[f], o, t[o], 1);
					return void 0
				}
				if(t = l(t), void 0 === r) return a = "", c && (a = i(c, t, r, 1)), a;
				for(f = u.length - 1; f >= 0; f--) i(u[f], t, r, 1);
				return void 0
			},
			unselectable: c ? function(e) {
				for(var t = n.query(e), r = t.length - 1; r >= 0; r--) t[r].style[c] = "none"
			} : function(e) {
				var t, o, l, i, f, u, c = n.query(e),
					s = 0;
				for(i = ["iframe", "textarea", "input", "select"], o = c.length - 1; o >= 0; o--)
					for(t = c[o], f = t.style, u = t.getElementsByTagName("*"), t.setAttribute("unselectable", "on"); l = u[s++];) r.inArray(a(l), i) || l.setAttribute("unselectable", "on")
			}
		}), e
	}(), f = function(e) {
		var r = t;
		return e = r
	}(), u = function(e) {
		return e = f
	}()
});
define("io-form", ["util", "dom", "querystring", "io-base"], function(e) {
	var r, t, a, n = e("util"),
		i = e("dom"),
		o = e("querystring"),
		u = e("io-base");
	return r = function(e) {
		function r(e) {
			return e.replace(d, "\r\n")
		}

		function t(e) {
			for(var r = [], t = 0; t < e.length; t++) r.push(e[t]);
			return r
		}
		var a, u = n,
			l = i,
			f = o,
			s = /^(?:select|textarea)/i,
			d = /\r?\n/g,
			m = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
		return a = {
			serialize: function(e, r) {
				return f.stringify(a.getFormData(e), void 0, void 0, r || !1)
			},
			getFormData: function(e) {
				var a = [],
					n = {};
				return u.each(l.query(e), function(e) {
					var r = e.elements ? t(e.elements) : [e];
					a.push.apply(a, r)
				}), a = u.filter(a, function(e) {
					return e.name && !e.disabled && (e.checked || s.test(e.nodeName) || m.test(e.type))
				}), u.each(a, function(e) {
					var t, a = l.val(e);
					if(null !== a) {
						if(a = u.isArray(a) ? u.map(a, r) : r(a), t = n[e.name], void 0 === t) return n[e.name] = a, void 0;
						u.isArray(t) || (t = n[e.name] = [t]), t.push.apply(t, u.makeArray(a))
					}
				}), n
			}
		}, e = a
	}(), t = function(e) {
		var t = n,
			a = u,
			l = i,
			f = o,
			s = r,
			d = window,
			m = Array.prototype.slice,
			c = d.FormData;
		return a.addPreprocessor("start", function(e) {
			var r, a, n, i, o, u = e.io,
				d = u.config,
				y = d.form;
			if(y) {
				r = l.get(y), o = d.data;
				for(var p = !1, v = {}, g = l.query("input", r), h = 0, b = g.length; b > h; h++) {
					var q = g[h];
					if("file" === q.type.toLowerCase()) {
						if(p = !0, !c) break;
						var w = m.call(q.files, 0);
						v[l.attr(q, "name")] = w.length > 1 ? w : w[0] || null
					}
				}
				p && c && (d.files = d.files || {}, t.mix(d.files, v), delete d.contentType), !p || c ? (i = s.getFormData(r), d.hasContent ? (i = f.stringify(i, void 0, void 0, d.serializeArray), o ? d.data += "&" + i : d.data = i) : t.mix(d.uri.query, i)) : (n = d.dataType, a = n[0], "*" === a && (a = "text"), n.length = 2, n[0] = "iframe", n[1] = a)
			}
		}), e = s
	}(), a = function(e) {
		return e = t
	}()
});
define("node", ["node-base", "node-event", "node-anim"], function(n) {
	{
		var e, o = n("node-base");
		n("node-event"), n("node-anim")
	}
	return e = function(n) {
		var e = o;
		return n = e
	}()
});
define("node-base", ["util", "dom"], function(t) {
	var e, n, r, i, a = t("util"),
		o = t("dom");
	return e = function(t) {
		function e(t, i, a) {
			var o, l = this;
			if(t instanceof e && 1 === arguments.length) return t.slice();
			if(!(l instanceof e)) return e.all.apply(e, arguments);
			if(!t) return l;
			if("string" == typeof t) {
				if(o = r.create(t, i, a), o.nodeType === u.DOCUMENT_FRAGMENT_NODE) return s.apply(this, p(o.childNodes)), l
			} else {
				if(n.isArray(t) || c(t)) return s.apply(l, p(t)), l;
				o = t
			}
			return l[0] = o, l.length = 1, l
		}
		var n = a,
			r = o,
			i = Array.prototype,
			l = i.slice,
			u = r.NodeType,
			s = i.push,
			p = n.makeArray,
			c = r.isDomNodeList;
		return e.prototype = {
			constructor: e,
			isNode: !0,
			length: 0,
			item: function(t) {
				var n = this;
				return t = parseInt(t, 10), "number" == typeof t && !isNaN(t) && t < n.length ? new e(n[t]) : null
			},
			add: function(t, n, r) {
				"number" == typeof n && (r = n, n = void 0);
				var a = e.all(t, n).getDOMNodes(),
					o = new e(this);
				if(void 0 === r) s.apply(o, a);
				else {
					var l = [r, 0];
					l.push.apply(l, a), i.splice.apply(o, l)
				}
				return o
			},
			slice: function() {
				return new e(l.apply(this, arguments))
			},
			getDOMNodes: function() {
				return l.call(this)
			},
			each: function(t, e) {
				return n.each(this, function(n, r) {
					return t.call(e || n, n, r, this)
				}, this), this
			},
			map: function(t, e) {
				return n.map(this, function(n, r) {
					return t.call(e || n, n, r, this)
				}, this)
			},
			getDOMNode: function() {
				return this[0]
			},
			end: function() {
				var t = this;
				return t.__parent || t
			},
			filter: function(t) {
				return new e(r.filter(this, n.isString(t) ? t : function(e, n, r) {
					return t.call(e, e, n, r)
				}))
			},
			all: function(t) {
				var n, r = this;
				return n = r.length > 0 ? e.all(t, r) : new e, n.__parent = r, n
			},
			one: function(t) {
				var e = this,
					n = e.all(t),
					r = n.length ? n.slice(0, 1) : null;
				return r && (r.__parent = e), r
			}
		}, e.prototype.find = e.prototype.all, e.fn = e.prototype, n.mix(e, {
			all: function(t, i) {
				if("string" == typeof t && (t = n.trim(t)) && t.length >= 3 && n.startsWith(t, "<") && n.endsWith(t, ">")) {
					var a;
					return i && (i.getDOMNode && (i = i[0]), i.nodeType || (a = i, i = arguments[2])), new e(t, a, i)
				}
				return new e(r.query(t, i))
			},
			one: function(t, n) {
				var r = e.all(t, n);
				return r.length ? r.slice(0, 1) : null
			}
		}), e.Dom = r, "undefined" != typeof KISSY && n.mix(KISSY, {
			all: e.all,
			one: e.one
		}), t = e
	}(), n = function(t) {
		function n(t, e, n) {
			n.unshift(e);
			var r = u[t].apply(u, n);
			return void 0 === r ? e : r
		}

		function r(t, e, n) {
			n.unshift(e);
			var r = u[t].apply(u, n);
			return void 0 === r ? e : null === r ? null : new s(r)
		}

		function i(t, e, r, i) {
			return void 0 !== i[r] || l.isObject(i[0]) ? n(t, e, i) : (i.unshift(e), u[t].apply(u, i))
		}
		var l = a,
			u = o,
			s = e,
			p = s.prototype,
			c = l.makeArray,
			f = ["nodeName", "isCustomDomain", "getEmptyIframeSrc", "equals", "contains", "index", "scrollTop", "scrollLeft", "height", "width", "innerHeight", "innerWidth", "outerHeight", "outerWidth", "addStyleSheet", "appendTo", "prependTo", "insertBefore", "before", "after", "insertAfter", "test", "hasClass", "addClass", "removeClass", "replaceClass", "toggleClass", "removeAttr", "hasAttr", "hasProp", "show", "hide", "toggle", "scrollIntoView", "remove", "empty", "removeData", "hasData", "unselectable", "wrap", "wrapAll", "replaceWith", "wrapInner", "unwrap"],
			h = ["getWindow", "getDocument", "first", "last", "parent", "closest", "next", "prev", "clone", "siblings", "contents", "children"],
			d = {
				attr: 1,
				text: 0,
				css: 1,
				style: 1,
				val: 0,
				prop: 1,
				offset: 0,
				html: 0,
				outerHTML: 0,
				outerHtml: 0,
				data: 1
			};
		return l.each(f, function(t) {
			p[t] = function() {
				var e = c(arguments);
				return n(t, this, e)
			}
		}), l.each(h, function(t) {
			p[t] = function() {
				var e = c(arguments);
				return r(t, this, e)
			}
		}), l.each(d, function(t, e) {
			p[e] = function() {
				var n = c(arguments);
				return i(e, this, t, n)
			}
		}), t
	}(), r = function(t) {
		var n = a,
			r = o,
			i = e,
			l = i.prototype;
		return n.each(["append", "prepend", "before", "after"], function(t) {
			l[t] = function(e) {
				var n = e,
					i = this;
				return "object" != typeof n && (n = r.create(n + "")), n && r[t](n, i), i
			}
		}), n.each(["wrap", "wrapAll", "replaceWith", "wrapInner"], function(t) {
			var e = l[t];
			l[t] = function(t) {
				var n = this;
				return "string" == typeof t && (t = i.all(t, n[0].ownerDocument)), e.call(n, t)
			}
		}), t
	}(), i = function(t) {
		var n = e;
		return t = n
	}()
});
define("node-event", ["node-base", "util", "event-dom"], function(e) {
	var n, t, r = e("node-base"),
		a = e("util"),
		u = e("event-dom");
	return n = function(e) {
		var n = r,
			t = a,
			i = u,
			o = n.prototype,
			f = t.makeArray,
			d = ["on", "detach", "delegate", "undelegate", "off"],
			c = ["fire", "fireHandler", "trigger", "triggerHandler"];
		return n.KeyCode = i.KeyCode, n.Event = i, t.each(d, function(e) {
			o[e] = function() {
				var n = this,
					t = f(arguments);
				return t.unshift(n), i[e].apply(i, t), n
			}
		}), t.each(c, function(e) {
			o[e] = function() {
				var n = this,
					t = f(arguments);
				return t.unshift(n), i[e].apply(i, t)
			}
		}), e = n
	}(), t = function(e) {
		return e = n
	}()
});
define("event-dom-base", ["dom", "event-base", "util"], function(e) {
	var t, r, n, o, a, i, l, c, u, s = e("dom"),
		f = e("event-base"),
		v = e("util");
	return t = function(e) {
		var t = s,
			r = "ksEventTargetId_" + +new Date,
			n = document,
			o = n && n.addEventListener ? function(e, t, r, n) {
				e.addEventListener && e.addEventListener(t, r, !!n)
			} : function(e, t, r) {
				e.attachEvent && e.attachEvent("on" + t, r)
			},
			a = n && n.removeEventListener ? function(e, t, r, n) {
				e.removeEventListener && e.removeEventListener(t, r, !!n)
			} : function(e, t, r) {
				e.detachEvent && e.detachEvent("on" + t, r)
			};
		return e = {
			simpleAdd: o,
			simpleRemove: a,
			data: function(e, n) {
				return t.data(e, r, n)
			},
			removeData: function(e) {
				return t.removeData(e, r)
			}
		}
	}(), r = function(e) {
		return e = {}
	}(), n = function(e) {
		function t(e) {
			t.superclass.constructor.call(this, e)
		}
		var n = f,
			o = r,
			a = v;
		return a.extend(t, n.Observer, {
			keys: ["fn", "filter", "data", "context", "originalType", "groups", "last"],
			notifyInternal: function(e, t) {
				var r, n, a, i, l = this,
					c = e.type;
				return(i = l.config.originalType) ? e.type = i : i = c, (r = o[i]) && r.handle ? (n = r.handle(e, l, t), n && n.length > 0 && (a = n[0])) : a = l.simpleNotify(e, t), a === !1 && e.halt(), e.type = c, a
			}
		}), e = t
	}(), o = function(e) {
		function t() {
			return l
		}

		function r() {
			return c
		}

		function n(e) {
			var o = this,
				l = e.type,
				f = "function" == typeof e.stopPropagation || "boolean" == typeof e.cancelBubble;
			n.superclass.constructor.call(o), o.originalEvent = e;
			var v = r;
			"defaultPrevented" in e ? v = e.defaultPrevented ? t : r : "getPreventDefault" in e ? v = e.getPreventDefault() ? t : r : "returnValue" in e && (v = e.returnValue === c ? t : r), o.isDefaultPrevented = v;
			var d, g, p, h = [],
				m = u.concat();
			for(a.each(s, function(e) {
					return l.match(e.reg) && (m = m.concat(e.props), e.fix && h.push(e.fix)), void 0
				}), g = m.length; g;) p = m[--g], o[p] = e[p];
			for(!o.target && f && (o.target = e.srcElement || i), o.target && 3 === o.target.nodeType && (o.target = o.target.parentNode), g = h.length; g;) d = h[--g], d(o, e);
			o.timeStamp = e.timeStamp || a.now()
		}
		var o = f,
			a = v,
			i = document,
			l = !0,
			c = !1,
			u = ["altKey", "bubbles", "cancelable", "ctrlKey", "currentTarget", "eventPhase", "metaKey", "shiftKey", "target", "timeStamp", "view", "type"],
			s = [{
				reg: /^key/,
				props: ["char", "charCode", "key", "keyCode", "which"],
				fix: function(e, t) {
					null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), void 0 === e.metaKey && (e.metaKey = e.ctrlKey)
				}
			}, {
				reg: /^touch/,
				props: ["touches", "changedTouches", "targetTouches"]
			}, {
				reg: /^hashchange$/,
				props: ["newURL", "oldURL"]
			}, {
				reg: /^gesturechange$/i,
				props: ["rotation", "scale"]
			}, {
				reg: /^(mousewheel|DOMMouseScroll)$/,
				props: [],
				fix: function(e, t) {
					var r, n, o, a = t.wheelDelta,
						i = t.axis,
						l = t.wheelDeltaY,
						c = t.wheelDeltaX,
						u = t.detail;
					a && (o = a / 120), u && (o = 0 - (u % 3 === 0 ? u / 3 : u)), void 0 !== i && (i === e.HORIZONTAL_AXIS ? (n = 0, r = 0 - o) : i === e.VERTICAL_AXIS && (r = 0, n = o)), void 0 !== l && (n = l / 120), void 0 !== c && (r = -1 * c / 120), r || n || (n = o), void 0 !== r && (e.deltaX = r), void 0 !== n && (e.deltaY = n), void 0 !== o && (e.delta = o)
				}
			}, {
				reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
				props: ["buttons", "clientX", "clientY", "button", "offsetX", "relatedTarget", "which", "fromElement", "toElement", "offsetY", "pageX", "pageY", "screenX", "screenY"],
				fix: function(e, t) {
					var r, n, o, a = e.target,
						l = t.button;
					return a && null == e.pageX && null != t.clientX && (r = a.ownerDocument || i, n = r.documentElement, o = r.body, e.pageX = t.clientX + (n && n.scrollLeft || o && o.scrollLeft || 0) - (n && n.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || o && o.scrollTop || 0) - (n && n.clientTop || o && o.clientTop || 0)), e.which || void 0 === l || (e.which = 1 & l ? 1 : 2 & l ? 3 : 4 & l ? 2 : 0), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === a ? e.toElement : e.fromElement), e
				}
			}];
		return a.extend(n, o.Object, {
			constructor: n,
			preventDefault: function() {
				var e = this,
					t = e.originalEvent;
				t.preventDefault ? t.preventDefault() : t.returnValue = c, n.superclass.preventDefault.call(e)
			},
			stopPropagation: function() {
				var e = this,
					t = e.originalEvent;
				t.stopPropagation ? t.stopPropagation() : t.cancelBubble = l, n.superclass.stopPropagation.call(e)
			}
		}), e = n
	}(), a = function(e) {
		function a(e) {
			var t = this;
			i.mix(t, e), t.reset()
		}
		var i = v,
			l = f,
			c = s,
			u = r,
			d = t,
			g = n,
			p = o,
			h = l.Utils;
		return i.extend(a, l.Observable, {
			constructor: a,
			setup: function() {
				var e = this,
					t = e.type,
					r = u[t] || {},
					n = e.currentTarget,
					o = d.data(n),
					a = o.handle;
				r.setup && r.setup.call(n, t) !== !1 || d.simpleAdd(n, t, a)
			},
			reset: function() {
				var e = this;
				a.superclass.reset.call(e), e.delegateCount = 0, e.lastCount = 0
			},
			notify: function(e) {
				var t, r, n, o, a, i, l, u, s, f, v = e.target,
					d = e.type,
					g = this,
					p = g.currentTarget,
					h = g.observers,
					m = [],
					b = g.delegateCount || 0;
				if(b && v.nodeType)
					for(; v !== p;) {
						if(v.disabled !== !0 || "click" !== d) {
							var y, E, T, D = {};
							for(u = [], a = 0; b > a; a++) f = h[a], T = f.config.filter, E = T + "", y = D[E], void 0 === y && (y = D[E] = c.test(v, T)), y && u.push(f);
							u.length && m.push({
								currentTarget: v,
								currentTargetObservers: u
							})
						}
						v = v.parentNode || p
					}
				for(b < h.length && m.push({
						currentTarget: p,
						currentTargetObservers: h.slice(b)
					}), a = 0, l = m.length; !e.isPropagationStopped() && l > a; ++a)
					for(o = m[a], u = o.currentTargetObservers, t = o.currentTarget, e.currentTarget = t, i = 0; !e.isImmediatePropagationStopped() && i < u.length; i++) s = u[i], r = s.notify(e, g), n !== !1 && void 0 !== r && (n = r);
				return n
			},
			fire: function(e, t) {
				e = e || {};
				var r, n, o = this,
					l = String(o.type),
					s = u[l] || {},
					f = s.bubbles !== !1,
					v = o.currentTarget;
				if(!(s.fire && s.fire.call(v, t) === !1 || (e.isEventObject || (n = e, e = new p({
						type: l
					}), i.mix(e, n)), e.currentTarget = v, e.target = e.target || v, s.preFire && s.preFire.call(v, e, t) === !1))) {
					var d, g, h = v,
						m = c.getWindow(h),
						b = m.document,
						y = [],
						E = "on" + l,
						T = 0;
					do y.push(h), h = h.parentNode || h.ownerDocument || h === b && m; while (!t && h && f);
					h = y[T];
					do e.currentTarget = h, r = a.getDomEventObservable(h, l), r && (g = r.notify(e), void 0 !== g && d !== !1 && (d = g)), h[E] && h[E].call(h) === !1 && e.preventDefault(), h = y[++T]; while (!t && h && !e.isPropagationStopped());
					if(!t && !e.isDefaultPrevented()) {
						try {
							v[l] && !i.isWindow(v) && (a.triggeredEvent = l, v[l]())
						} catch(D) {
							console.error("event-dom: trigger action error: " + D)
						}
						a.triggeredEvent = ""
					}
					return d
				}
			},
			on: function(e) {
				var t = this,
					r = t.observers,
					n = u[t.type] || {},
					o = e instanceof g ? e : new g(e); - 1 === t.findObserver(o) && (o.config.filter ? (r.splice(t.delegateCount, 0, o), t.delegateCount++) : o.config.last ? (r.push(o), t.lastCount++) : r.splice(r.length - t.lastCount, 0, o), n.add && n.add.call(t.currentTarget, o))
			},
			detach: function(e) {
				var t, r = this,
					n = u[r.type] || {},
					o = "filter" in e,
					a = e.filter,
					i = e.context,
					l = e.fn,
					c = r.currentTarget,
					s = r.observers,
					f = e.groups;
				if(s.length) {
					f && (t = h.getGroupsRe(f));
					var v, d, g, p, m, b = s.length;
					if(l || o || t) {
						for(i = i || c, v = 0, d = 0, g = []; b > v; ++v) {
							p = s[v];
							var y = p.config;
							m = y.context || c, i !== m || l && l !== y.fn || o && (a && a !== y.filter || !a && !y.filter) || t && !y.groups.match(t) ? g[d++] = p : (y.filter && r.delegateCount && r.delegateCount--, y.last && r.lastCount && r.lastCount--, n.remove && n.remove.call(c, p))
						}
						r.observers = g
					} else r.reset();
					r.checkMemory()
				}
			},
			checkMemory: function() {
				var e, t, r = this,
					n = r.type,
					o = u[n] || {},
					a = r.currentTarget,
					l = d.data(a);
				l && (e = l.observables, r.hasObserver() || (t = l.handle, o.tearDown && o.tearDown.call(a, n) !== !1 || d.simpleRemove(a, n, t), delete e[n]), i.isEmptyObject(e) && (l.handle = null, d.removeData(a)))
			}
		}), a.triggeredEvent = "", a.getDomEventObservable = function(e, t) {
			var r, n = d.data(e);
			return n && (r = n.observables), r ? r[t] : null
		}, a.getDomEventObservablesHolder = function(e, t) {
			var r = d.data(e);
			return !r && t && d.data(e, r = {}), r
		}, e = a
	}(), i = function(e) {
		function n(e, t) {
			var r, n = g[t] || {};
			return !e.originalType && (r = n.typeFix) && (e.originalType = t, t = r), t
		}

		function i(e, t, r) {
			var o, a, i, l;
			r = m.merge(r), t = n(r, t), o = p.getDomEventObservablesHolder(e, 1), (l = o.handle) || (l = o.handle = function(e) {
				var t, r = e.type,
					n = l.currentTarget;
				return p.triggeredEvent === r ? void 0 : (t = p.getDomEventObservable(n, r), t ? (e.currentTarget = n, e = new h(e), t.notify(e)) : void 0)
			}, l.currentTarget = e), (i = o.observables) || (i = o.observables = {}), a = i[t], a || (a = i[t] = new p({
				type: t,
				currentTarget: e
			}), a.setup()), a.on(r), e = null
		}

		function l(e, t, r) {
			r = m.merge(r);
			var o;
			t = n(r, t);
			var a = p.getDomEventObservablesHolder(e),
				i = (a || {}).observables;
			if(a && i)
				if(t) o = i[t], o && o.detach(r);
				else
					for(t in i) i[t].detach(r)
		}
		var c = f,
			u = t,
			d = s,
			g = r,
			p = a,
			h = o,
			m = v,
			b = c.Utils,
			y = {
				on: function(e, t, r, n) {
					return e = d.query(e), b.batchForType(function(e, t, r, n) {
						var o, a, l = b.normalizeParam(t, r, n);
						for(t = l.type, o = e.length - 1; o >= 0; o--) a = e[o], i(a, t, l)
					}, 1, e, t, r, n), e
				},
				detach: function(e, t, r, n) {
					return e = d.query(e), b.batchForType(function(e, t, r, n) {
						var o, a, i, c, u = b.normalizeParam(t, r, n);
						for(t = u.type, o = e.length - 1; o >= 0; o--)
							if(c = e[o], l(c, t, u), u.deep && c.getElementsByTagName)
								for(i = c.getElementsByTagName("*"), a = i.length - 1; a >= 0; a--) l(i[a], t, u)
					}, 1, e, t, r, n), e
				},
				delegate: function(e, t, r, n, o) {
					return y.on(e, t, {
						fn: n,
						context: o,
						filter: r
					})
				},
				undelegate: function(e, t, r, n, o) {
					return y.detach(e, t, {
						fn: n,
						context: o,
						filter: r
					})
				},
				fire: function(e, t, r, n) {
					var o;
					return t.isEventObject && (r = t, t = t.type), r = r || {}, r.synthetic = 1, b.splitAndRun(t, function(t) {
						var a, i, l, c;
						b.fillGroupsForEvent(t, r), t = r.type;
						var u = g[t],
							s = t;
						for(u && u.typeFix && (s = u.typeFix), e = d.query(e), i = e.length - 1; i >= 0; i--) l = e[i], c = p.getDomEventObservable(l, s), n || c || (c = new p({
							type: s,
							currentTarget: l
						})), c && (a = c.fire(r, n), o !== !1 && void 0 !== a && (o = a))
					}), o
				},
				fireHandler: function(e, t, r) {
					return y.fire(e, t, r, 1)
				},
				clone: function(e, t) {
					var r, n;
					if(r = p.getDomEventObservablesHolder(e)) {
						var o = u.data(e);
						o && o === u.data(t) && u.removeData(t), n = r.observables, m.each(n, function(e, r) {
							m.each(e.observers, function(e) {
								i(t, r, e.config)
							})
						})
					}
				},
				getEventListeners: function(e, t) {
					var r = (p.getDomEventObservablesHolder(e) || {
						observables: {}
					}).observables;
					return t ? r[t] : r
				}
			};
		return e = y
	}(), l = function(e) {
		var t = i,
			n = r,
			o = v,
			a = "onmousewheel" in document.documentElement ? "mousewheel" : "DOMMouseScroll";
		return e = o.mix(n, {
			mousewheel: {
				typeFix: a
			},
			load: {
				bubbles: !1
			},
			click: {
				fire: function(e) {
					var t = this;
					return !e && "checkbox" === String(t.type) && t.click && "input" === t.nodeName.toLowerCase() ? (t.click(), !1) : void 0
				}
			},
			focus: {
				bubbles: !1,
				preFire: function(e, r) {
					return r ? void 0 : t.fire(this, "focusin")
				},
				fire: function(e) {
					var t = this;
					return !e && t.ownerDocument && t !== t.ownerDocument.activeElement && t.focus ? (t.focus(), !1) : void 0
				}
			},
			blur: {
				bubbles: !1,
				preFire: function(e, r) {
					return r ? void 0 : t.fire(this, "focusout")
				},
				fire: function(e) {
					var t = this;
					return !e && t.ownerDocument && t === t.ownerDocument.activeElement && t.blur ? (t.blur(), !1) : void 0
				}
			}
		})
	}(), c = function(e) {
		var r = v,
			n = i,
			c = o,
			u = a,
			s = l,
			f = t;
		return e = r.merge({
			add: n.on,
			remove: n.detach,
			off: n.detach,
			trigger: n.fire,
			triggerHandler: n.fireHandler,
			Observable: u,
			Special: s,
			Object: c,
			Utils: f
		}, n)
	}(), u = function(e) {
		return e = c
	}()
});
define("event-dom-extra", ["event-dom-base", "util", "ua", "util", "dom", "feature", "dom"], function(e) {
	var t, n, a, i, o, r, c, u, s = e("event-dom-base"),
		E = e("util"),
		f = e("ua"),
		N = e("util"),
		_ = e("dom"),
		d = e("feature"),
		T = e("dom");
	return t = function(e) {
		var t = {
			MAC_ENTER: 3,
			BACKSPACE: 8,
			TAB: 9,
			NUM_CENTER: 12,
			ENTER: 13,
			SHIFT: 16,
			CTRL: 17,
			ALT: 18,
			PAUSE: 19,
			CAPS_LOCK: 20,
			ESC: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			PRINT_SCREEN: 44,
			INSERT: 45,
			DELETE: 46,
			ZERO: 48,
			ONE: 49,
			TWO: 50,
			THREE: 51,
			FOUR: 52,
			FIVE: 53,
			SIX: 54,
			SEVEN: 55,
			EIGHT: 56,
			NINE: 57,
			QUESTION_MARK: 63,
			A: 65,
			B: 66,
			C: 67,
			D: 68,
			E: 69,
			F: 70,
			G: 71,
			H: 72,
			I: 73,
			J: 74,
			K: 75,
			L: 76,
			M: 77,
			N: 78,
			O: 79,
			P: 80,
			Q: 81,
			R: 82,
			S: 83,
			T: 84,
			U: 85,
			V: 86,
			W: 87,
			X: 88,
			Y: 89,
			Z: 90,
			META: 91,
			WIN_KEY_RIGHT: 92,
			CONTEXT_MENU: 93,
			NUM_ZERO: 96,
			NUM_ONE: 97,
			NUM_TWO: 98,
			NUM_THREE: 99,
			NUM_FOUR: 100,
			NUM_FIVE: 101,
			NUM_SIX: 102,
			NUM_SEVEN: 103,
			NUM_EIGHT: 104,
			NUM_NINE: 105,
			NUM_MULTIPLY: 106,
			NUM_PLUS: 107,
			NUM_MINUS: 109,
			NUM_PERIOD: 110,
			NUM_DIVISION: 111,
			F1: 112,
			F2: 113,
			F3: 114,
			F4: 115,
			F5: 116,
			F6: 117,
			F7: 118,
			F8: 119,
			F9: 120,
			F10: 121,
			F11: 122,
			F12: 123,
			NUMLOCK: 144,
			SEMICOLON: 186,
			DASH: 189,
			EQUALS: 187,
			COMMA: 188,
			PERIOD: 190,
			SLASH: 191,
			APOSTROPHE: 192,
			SINGLE_QUOTE: 222,
			OPEN_SQUARE_BRACKET: 219,
			BACKSLASH: 220,
			CLOSE_SQUARE_BRACKET: 221,
			WIN_KEY: 224,
			MAC_FF_META: 224,
			WIN_IME: 229
		};
		return t.isTextModifyingKeyEvent = function(e) {
			var n = e.keyCode;
			if(e.altKey && !e.ctrlKey || e.metaKey || n >= t.F1 && n <= t.F12) return !1;
			switch(n) {
				case t.ALT:
				case t.CAPS_LOCK:
				case t.CONTEXT_MENU:
				case t.CTRL:
				case t.DOWN:
				case t.END:
				case t.ESC:
				case t.HOME:
				case t.INSERT:
				case t.LEFT:
				case t.MAC_FF_META:
				case t.META:
				case t.NUMLOCK:
				case t.NUM_CENTER:
				case t.PAGE_DOWN:
				case t.PAGE_UP:
				case t.PAUSE:
				case t.PRINT_SCREEN:
				case t.RIGHT:
				case t.SHIFT:
				case t.UP:
				case t.WIN_KEY:
				case t.WIN_KEY_RIGHT:
					return !1;
				default:
					return !0
			}
		}, t.isCharacterKey = function(e) {
			if(e >= t.ZERO && e <= t.NINE) return !0;
			if(e >= t.NUM_ZERO && e <= t.NUM_MULTIPLY) return !0;
			if(e >= t.A && e <= t.Z) return !0;
			if(-1 !== window.navigation.userAgent.indexOf("WebKit") && 0 === e) return !0;
			switch(e) {
				case t.SPACE:
				case t.QUESTION_MARK:
				case t.NUM_PLUS:
				case t.NUM_MINUS:
				case t.NUM_PERIOD:
				case t.NUM_DIVISION:
				case t.SEMICOLON:
				case t.DASH:
				case t.EQUALS:
				case t.COMMA:
				case t.PERIOD:
				case t.SLASH:
				case t.APOSTROPHE:
				case t.SINGLE_QUOTE:
				case t.OPEN_SQUARE_BRACKET:
				case t.BACKSLASH:
				case t.CLOSE_SQUARE_BRACKET:
					return !0;
				default:
					return !1
			}
		}, e = t
	}(), n = function(e) {
		var n = s,
			a = t;
		return n.KeyCode = a, e = n
	}(), a = function(e) {
		var t = n,
			a = t.Special,
			i = E,
			o = f;
		return o.ie || i.each([{
			name: "focusin",
			fix: "focus"
		}, {
			name: "focusout",
			fix: "blur"
		}], function(e) {
			function n(n) {
				var a = n.target;
				return t.fire(a, e.name)
			}
			var o = i.guid("attaches_" + i.now() + "_");
			a[e.name] = {
				setup: function() {
					var t = this.ownerDocument || this;
					o in t || (t[o] = 0), t[o] += 1, 1 === t[o] && t.addEventListener(e.fix, n, !0)
				},
				tearDown: function() {
					var t = this.ownerDocument || this;
					t[o] -= 1, 0 === t[o] && t.removeEventListener(e.fix, n, !0)
				}
			}
		}), e
	}(), i = function(e) {
		var t, a, i, o, r = N,
			c = n,
			u = _,
			s = f,
			E = d,
			T = c.Special,
			l = window,
			m = l.document,
			S = "__ks_replace_history__",
			h = s.ieMode,
			U = "hashchange";
		if(!E.isHashChangeSupported()) {
			var M = 50,
				v = "<html><head><title>" + (m && m.title || "") + " - {hash}</title>{head}</head><body>{hash}</body></html>";
			c.REPLACE_HISTORY = S;
			var A = function() {
					var e = location.href.match(/#.+$/);
					return e && e[0] || "#"
				},
				O = function() {
					c.fireHandler(l, U, {
						newURL: location.href,
						oldURL: i + o
					}), o = A()
				},
				I = function(e) {
					return e.contentWindow.document
				};
			t = h && 8 > h ? function(e, t) {
				var n = r.substitute(v, {
						hash: r.escapeHtml(e),
						head: u.isCustomDomain() ? '<script>document.domain = "' + m.domain + '";</script>' : ""
					}),
					i = I(a);
				try {
					t ? i.open("text/html", "replace") : i.open(), i.write(n), i.close()
				} catch(o) {}
			} : function() {
				O()
			};
			var p, R = function() {
					var e = A(),
						n = 0; - 1 !== e.indexOf(S) && (n = 1, e = e.replace(S, ""), location.hash = e), e !== o && t(e, n), p = setTimeout(R, M)
				},
				C = function() {
					p || R()
				},
				L = function() {
					p && clearTimeout(p), p = 0
				};
			h && 8 > h && (C = function() {
				if(!a) {
					var e = u.getEmptyIframeSrc();
					a = u.create("<iframe " + (e ? 'src="' + e + '"' : "") + ' style="display: none" height="0" width="0" tabindex="-1" title="empty"/>'), u.prepend(a, m.documentElement), c.add(a, "load", function() {
						c.remove(a, "load"), t(A()), c.add(a, "load", n), R()
					}), m.attachEvent("propertychange", function(e) {
						e = e || window.event;
						try {
							"title" === e.propertyName && (I(a).title = m.title + " - " + A())
						} catch(e) {}
					});
					var n = function() {
						location.hash = r.trim(I(a).body.innerText), O()
					}
				}
			}, L = function() {
				p && clearTimeout(p), p = 0, c.detach(a), u.remove(a), a = 0
			}), T[U] = {
				setup: function() {
					this === l && (o = A(), i = location.href.replace(/#.+/, ""), C())
				},
				tearDown: function() {
					this === l && L()
				}
			}
		}
		return e
	}(), o = function(e) {
		function t(e) {
			var t = (e.nodeName || "").toLowerCase();
			return "textarea" === t ? !0 : "input" === t ? "text" === e.type || "password" === e.type : !1
		}

		function a(e) {
			if(_.hasData(e, U)) {
				var t = _.data(e, U);
				clearTimeout(t), _.removeData(e, U)
			}
		}

		function i(e) {
			_.removeData(e, h), a(e)
		}

		function o(e) {
			a(e.target)
		}

		function r(e) {
			var t = e.value,
				n = _.data(e, h);
			t !== n && (N.fire(e, m), _.data(e, h, t))
		}

		function c(e) {
			_.hasData(e, U) || _.data(e, U, setTimeout(function t() {
				r(e), _.data(e, U, setTimeout(t, M))
			}, M))
		}

		function u(e) {
			var t = e.target;
			"focus" === e.type && _.data(t, h, t.value), c(t)
		}

		function s(e) {
			E(e), N.on(e, "blur", o), N.on(e, "mousedown keyup keydown focus", u)
		}

		function E(e) {
			i(e), N.detach(e, "blur", o), N.detach(e, "mousedown keyup keydown focus", u)
		}

		function f(e) {
			var n = e.target;
			t(n) && !n.__inputHandler && (n.__inputHandler = 1, N.on(n, "input", d))
		}
		var N = n,
			_ = T,
			d = function() {},
			l = N.Special,
			m = "input",
			S = "event-dom/input",
			h = S + "/history",
			U = S + "/poll",
			M = 50;
		return l.input = {
			setup: function() {
				var e = this;
				t(e) ? s(e) : N.on(e, "focusin", f)
			},
			tearDown: function() {
				var e = this;
				t(e) ? E(e) : (N.remove(e, "focusin", f), _.query("textarea,input", e).each(function(e) {
					e.__inputHandler && (e.__inputHandler = 0, N.remove(e, "input", d))
				}))
			}
		}, e
	}(), r = function(e) {
		var t = _,
			a = n,
			i = E,
			o = a.Special;
		return i.each([{
			name: "mouseenter",
			fix: "mouseover"
		}, {
			name: "mouseleave",
			fix: "mouseout"
		}], function(e) {
			o[e.name] = {
				typeFix: e.fix,
				handle: function(e, n, a) {
					var i = e.currentTarget,
						o = e.relatedTarget;
					return !o || o !== i && !t.contains(i, o) ? [n.simpleNotify(e, a)] : void 0
				}
			}
		}), e
	}(), c = function(e) {
		var t = n;
		return e = t
	}(), u = function(e) {
		return e = c
	}()
});
define("event-gesture", ["event-dom-base", "util", "event-touch", "feature"], function(e) {
	var t, a, r, n, i, s, o = e("event-dom-base"),
		u = e("util"),
		g = e("event-touch"),
		p = e("feature");
	return t = function(e) {
		function t(e, t, a) {
			var r, i, s = e.lastTouches,
				o = s[0],
				u = o.pageX,
				g = o.pageY,
				p = u - e.startX,
				h = g - e.startY,
				f = Math.abs(p),
				m = Math.abs(h),
				T = e.direction;
			T || (T = f > m ? 0 > p ? "left" : "right" : 0 > h ? "up" : "down", e.direction = T), r = "up" === T || "down" === T ? m : f;
			var E, X, Y = t.timeStamp - e.startTime;
			if(a)
				if(e.isStarted) i = l;
				else {
					i = c;
					var S = window,
						P = {
							left: S.pageXOffset + v,
							right: S.pageXOffset + S.innerWidth - v,
							top: S.pageYOffset + v,
							bottom: S.pageYOffset + S.innerHeight - v
						};
					if("right" === T && u > P.left) return !1;
					if("left" === T && u < P.right) return !1;
					if("down" === T && g > P.top) return !1;
					if("up" === T && g < P.bottom) return !1;
					e.isStarted = 1, e.startTime = t.timeStamp
				}
			else i = d, "left" === T || "right" === T ? E = r / Y : X = r / Y;
			return n.fire(o.target, i, {
				originalEvent: t.originalEvent,
				pageX: o.pageX,
				pageY: o.pageY,
				which: 1,
				direction: T,
				distance: r,
				duration: Y / 1e3,
				velocityX: E,
				velocityY: X
			}), void 0
		}

		function a() {}
		var r = g._gestureUtil,
			n = o,
			i = u,
			s = r.addEvent,
			p = r.SingleTouch,
			c = "edgePanStart",
			l = "edgePan",
			d = "edgePanEnd",
			v = 60;
		return i.extend(a, p, {
			requiredGestureType: "touch",
			start: function() {
				var e = this;
				a.superclass.start.apply(e, arguments);
				var t = e.lastTouches[0];
				e.direction = null, e.startX = t.pageX, e.startY = t.pageY
			},
			move: function(e) {
				return a.superclass.move.apply(this, arguments), t(this, e, 1)
			},
			end: function(e) {
				return a.superclass.end.apply(this, arguments), t(this, e, 0)
			}
		}), s([l, d, c], {
			handle: new a
		}), e = {
			EDGE_PAN: l,
			EDGE_PAN_START: c,
			EDGE_PAN_END: d
		}
	}(), a = function(e) {
		function t(e, t) {
			var a = e.pageX - t.pageX,
				r = e.pageY - t.pageY;
			return Math.sqrt(a * a + r * r)
		}

		function a(e, a) {
			var i = e.lastTouches[0],
				s = e.startPos;
			if(!e.direction) {
				var o = a.pageX - e.startPos.pageX,
					u = a.pageY - e.startPos.pageY,
					g = Math.abs(o),
					c = Math.abs(u);
				e.direction = g > c ? 0 > o ? "left" : "right" : 0 > u ? "up" : "down"
			}
			t(i, s) > T && (e.isStarted ? r(e, a) : (E.body.setCapture && E.body.setCapture(), e.isStarted = !0), p.fire(e.dragTarget, v, n(e, a)))
		}

		function r(e, t) {
			var a = e.lastTouches[0],
				r = t.timeStamp;
			r - e.lastTime > m && (e.lastPos = {
				pageX: a.pageX,
				pageY: a.pageY
			}, e.lastTime = r)
		}

		function n(e, t, a) {
			var r = e.startPos;
			a = a || {};
			var n = e.lastTouches[0];
			return a.which = 1, a.pageX = n.pageX, a.pageY = n.pageY, a.originalEvent = t.originalEvent, a.deltaX = n.pageX - r.pageX, a.deltaY = n.pageY - r.pageY, a.startTime = e.startTime, a.startPos = e.startPos, a.gestureType = t.gestureType, a.direction = e.direction, a
		}

		function i() {}
		var s = g._gestureUtil,
			p = o,
			c = u,
			l = s.addEvent,
			d = s.SingleTouch,
			v = "panStart",
			h = "panEnd",
			f = "pan",
			m = 300,
			T = 3,
			E = document;
		return c.extend(i, d, {
			start: function() {
				var e = this;
				i.superclass.start.apply(e, arguments);
				var t = e.lastTouches[0];
				e.lastTime = e.startTime, e.dragTarget = t.target, e.startPos = e.lastPos = {
					pageX: t.pageX,
					pageY: t.pageY
				}, e.direction = null
			},
			move: function(e) {
				var t = this;
				i.superclass.move.apply(t, arguments), t.isStarted ? (r(t, e), p.fire(t.dragTarget, f, n(t, e))) : a(t, e)
			},
			end: function(e) {
				var t = this,
					a = t.lastTouches[0],
					r = e.timeStamp,
					i = (a.pageX - t.lastPos.pageX) / (r - t.lastTime),
					s = (a.pageY - t.lastPos.pageY) / (r - t.lastTime);
				p.fire(t.dragTarget, h, n(t, e, {
					velocityX: i || 0,
					velocityY: s || 0
				})), E.body.releaseCapture && E.body.releaseCapture()
			}
		}), l([v, f, h], {
			handle: new i
		}), e = {
			PAN_START: v,
			PAN: f,
			PAN_END: h
		}
	}(), r = function(e) {
		function t(e, t) {
			var a = e.pageX - t.pageX,
				r = e.pageY - t.pageY;
			return Math.sqrt(a * a + r * r)
		}

		function a() {}

		function r(e) {
			2 === e.targetTouches.length && e.preventDefault()
		}
		var n = g._gestureUtil,
			i = o,
			s = p,
			c = u,
			l = n.DoubleTouch,
			d = n.addEvent,
			v = "pinch",
			h = "pinchStart",
			f = "pinchEnd";
		c.extend(a, l, {
			requiredGestureType: "touch",
			move: function(e) {
				var r = this;
				a.superclass.move.apply(r, arguments);
				var n = r.lastTouches;
				if(n[0].pageX > 0 && n[0].pageY > 0 && n[1].pageX > 0 && n[1].pageY > 0) {
					var s = t(n[0], n[1]);
					if(r.isStarted) i.fire(r.target, v, c.mix(e, {
						distance: s,
						scale: s / r.startDistance
					}));
					else {
						r.isStarted = !0, r.startDistance = s;
						var o = r.target = r.getCommonTarget(e);
						i.fire(o, h, c.mix(e, {
							distance: s,
							scale: 1
						}))
					}
				}
			},
			end: function(e) {
				var t = this;
				a.superclass.end.apply(t, arguments), i.fire(t.target, f, c.mix(e, {
					touches: t.lastTouches
				}))
			}
		});
		var m = new a;
		d([h, f], {
			handle: m
		});
		var T = {
			handle: m
		};
		return s.isTouchEventSupported() && (T.setup = function() {
			this.addEventListener("touchmove", r, !1)
		}, T.tearDown = function() {
			this.removeEventListener("touchmove", r, !1)
		}), d(v, T), e = {
			PINCH: v,
			PINCH_START: h,
			PINCH_END: f
		}
	}(), n = function(e) {
		function t() {}

		function a(e) {
			2 === e.targetTouches.length && e.preventDefault()
		}
		var r = g._gestureUtil,
			n = o,
			i = u,
			s = p,
			c = r.DoubleTouch,
			l = r.addEvent,
			d = "rotateStart",
			v = "rotate",
			h = 180 / Math.PI,
			f = "rotateEnd";
		i.extend(t, c, {
			requiredGestureType: "touch",
			move: function(e) {
				var a = this;
				t.superclass.move.apply(a, arguments);
				var r = a.lastTouches,
					s = r[0],
					o = r[1],
					u = a.lastAngle,
					g = Math.atan2(o.pageY - s.pageY, o.pageX - s.pageX) * h;
				if(void 0 !== u) {
					var p = Math.abs(g - u),
						c = (g + 360) % 360,
						l = (g - 360) % 360;
					Math.abs(c - u) < p ? g = c : Math.abs(l - u) < p && (g = l)
				}
				a.lastAngle = g, a.isStarted ? n.fire(a.target, v, i.mix(e, {
					angle: g,
					rotation: g - a.startAngle
				})) : (a.isStarted = !0, a.startAngle = g, a.target = a.getCommonTarget(e), n.fire(a.target, d, i.mix(e, {
					angle: g,
					rotation: 0
				})))
			},
			end: function(e) {
				var a = this;
				t.superclass.end.apply(a, arguments), a.lastAngle = void 0, n.fire(a.target, f, i.mix(e, {
					touches: a.lastTouches
				}))
			}
		});
		var m = new t;
		l([f, d], {
			handle: m
		});
		var T = {
			handle: m
		};
		return s.isTouchEventSupported() && (T.setup = function() {
			this.addEventListener("touchmove", a, !1)
		}, T.tearDown = function() {
			this.removeEventListener("touchmove", a, !1)
		}), l(v, T), e = {
			ROTATE_START: d,
			ROTATE: v,
			ROTATE_END: f
		}
	}(), i = function(e) {
		function t() {
			r = void 0, d = 0
		}

		function a(e) {
			var t, a = e.accelerationIncludingGravity,
				s = a.x,
				o = a.y,
				u = a.z;
			void 0 !== r && (t = h(f(s - r), f(o - n), f(u - i)), t > c && E(), t > l && (d = 1)), r = s, n = o, i = u
		}
		var r, n, i, s = o,
			g = u,
			p = s.Special,
			c = 5,
			l = 20,
			d = 0,
			v = "shake",
			h = Math.max,
			f = Math.abs,
			m = window,
			T = "devicemotion",
			E = g.buffer(function() {
				d && (s.fireHandler(m, v, {
					accelerationIncludingGravity: {
						x: r,
						y: n,
						z: i
					}
				}), t())
			}, 250);
		return p.shake = {
			setup: function() {
				this === m && m.addEventListener(T, a, !1)
			},
			tearDown: function() {
				this === m && (E.stop(), t(), m.removeEventListener(T, a, !1))
			}
		}, e = {
			SHAKE: v
		}
	}(), s = function(e) {
		var s = u,
			p = o,
			c = g,
			l = t,
			d = a,
			v = r,
			h = n,
			f = i,
			m = {
				EdgePanGestureEvent: l,
				PanGestureEvent: d,
				PinchGestureEvent: v,
				RotateGestureEvent: h,
				ShakeGestureEvent: f
			};
		return s.mix(m, c), s.mix(p, m), e = m
	}()
});
define("event-touch", ["util", "dom", "event-dom-base", "feature"], function(e) {
	var t, n, o, r, i, a, u, s, c, h = e("util"),
		d = e("dom"),
		l = e("event-dom-base"),
		v = e("feature");
	return t = function(e) {
		function t(e) {
			return m.startsWith(e, "touch")
		}

		function n(e) {
			return m.startsWith(e, "mouse")
		}

		function o(e) {
			return m.startsWith(e, "MSPointer") || m.startsWith(e, "pointer")
		}

		function r(e) {
			var t = this;
			t.doc = e, t.eventHandles = [], t.init(), t.touches = [], t.inTouch = 0
		}

		function i(e) {
			c(this, e)
		}

		function a(e) {
			p(this, e)
		}

		function u(e) {
			i.call(this, e), S[e].setup.apply(this, arguments)
		}

		function s(e) {
			a.call(this, e), S[e].tearDown.apply(this, arguments)
		}

		function c(e, t) {
			var n = E.getDocument(e),
				o = E.data(n, w);
			o || E.data(n, w, o = new r(n)), t && o.addEventHandle(t)
		}

		function p(e, t) {
			var n = E.getDocument(e),
				o = E.data(n, w);
			o && (t && o.removeEventHandle(t), o.eventHandles.length || (o.destroy(), E.removeData(n, w)))
		}
		var f, T, g, m = h,
			E = d,
			S = {},
			y = l,
			H = y.Special,
			w = m.guid("touch-handle"),
			M = v,
			P = /iPad|iPhone|iPod/.test(navigator.userAgent),
			X = 2500,
			Y = 25;
		return M.isTouchEventSupported() ? P ? (g = "touchend touchcancel", f = "touchstart", T = "touchmove") : (g = "touchend touchcancel mouseup", f = "touchstart mousedown", T = "touchmove mousemove") : M.isPointerSupported() ? (f = "pointerdown", T = "pointermove", g = "pointerup pointercancel") : M.isMsPointerSupported() ? (f = "MSPointerDown", T = "MSPointerMove", g = "MSPointerUp MSPointerCancel") : (f = "mousedown", T = "mousemove", g = "mouseup"), r.prototype = {
			constructor: r,
			lastTouches: [],
			firstTouch: null,
			init: function() {
				var e = this,
					t = e.doc;
				y.on(t, f, e.onTouchStart, e), o(T) || y.on(t, T, e.onTouchMove, e), y.on(t, g, e.onTouchEnd, e)
			},
			addTouch: function(e) {
				e.identifier = e.pointerId, this.touches.push(e)
			},
			removeTouch: function(e) {
				for(var t, n = 0, o = e.pointerId, r = this.touches, i = r.length; i > n; n++)
					if(t = r[n], t.pointerId === o) {
						r.splice(n, 1);
						break
					}
			},
			updateTouch: function(e) {
				for(var t, n = 0, o = e.pointerId, r = this.touches, i = r.length; i > n; n++) t = r[n], t.pointerId === o && (r[n] = e)
			},
			isPrimaryTouch: function(e) {
				return this.firstTouch === e.identifier
			},
			setPrimaryTouch: function(e) {
				null === this.firstTouch && (this.firstTouch = e.identifier)
			},
			removePrimaryTouch: function(e) {
				this.isPrimaryTouch(e) && (this.firstTouch = null)
			},
			dupMouse: function(e) {
				var t = this.lastTouches,
					n = e.changedTouches[0];
				if(this.isPrimaryTouch(n)) {
					var o = {
						x: n.clientX,
						y: n.clientY
					};
					t.push(o), setTimeout(function() {
						var e = t.indexOf(o);
						e > -1 && t.splice(e, 1)
					}, X)
				}
			},
			isEventSimulatedFromTouch: function(e) {
				for(var t, n = this.lastTouches, o = e.clientX, r = e.clientY, i = 0, a = n.length; a > i && (t = n[i]); i++) {
					var u = Math.abs(o - t.x),
						s = Math.abs(r - t.y);
					if(Y >= u && Y >= s) return !0
				}
				return 0
			},
			normalize: function(e) {
				var r, i, a, u = e.type;
				return(i = t(u)) ? (a = "touchend" === u || "touchcancel" === u ? e.changedTouches : e.touches, e.gestureType = "touch") : (o(u) ? e.gestureType = e.originalEvent.pointerType : n(u) && (e.gestureType = "mouse"), a = this.touches), a && 1 === a.length && (e.which = 1, e.pageX = a[0].pageX, e.pageY = a[0].pageY), i ? e : (r = !u.match(/(up|cancel)$/i), e.touches = r ? a : [], e.targetTouches = r ? a : [], e.changedTouches = a, e)
			},
			onTouchStart: function(e) {
				var r, i, a = this,
					u = e.type,
					s = a.eventHandles;
				if(t(u)) a.setPrimaryTouch(e.changedTouches[0]), a.dupMouse(e);
				else if(n(u)) {
					if(a.isEventSimulatedFromTouch(e)) return;
					a.touches = [e]
				} else {
					if(!o(u)) throw new Error("unrecognized touch event: " + e.type);
					a.addTouch(e.originalEvent), 1 === a.touches.length && y.on(a.doc, T, a.onTouchMove, a)
				}
				for(var c = 0, h = s.length; h > c; c++) r = s[c], i = s[r].handle, i.isActive = 1;
				a.callEventHandle("onTouchStart", e)
			},
			onTouchMove: function(e) {
				var r = this,
					i = e.type;
				if(n(i)) {
					if(r.isEventSimulatedFromTouch(i)) return;
					r.touches = [e]
				} else if(o(i)) r.updateTouch(e.originalEvent);
				else if(!t(i)) throw new Error("unrecognized touch event: " + e.type);
				r.callEventHandle("onTouchMove", e)
			},
			onTouchEnd: function(e) {
				var r = this,
					i = e.type;
				n(i) && r.isEventSimulatedFromTouch(e) || (r.callEventHandle("onTouchEnd", e), t(i) ? (r.dupMouse(e), m.makeArray(e.changedTouches).forEach(function(e) {
					r.removePrimaryTouch(e)
				})) : n(i) ? r.touches = [] : o(i) && (r.removeTouch(e.originalEvent), r.touches.length || y.detach(r.doc, T, r.onTouchMove, r)))
			},
			callEventHandle: function(e, t) {
				var n, o, r = this,
					i = r.eventHandles,
					a = i.concat();
				t = r.normalize(t);
				var u = t.gestureType;
				if(t.changedTouches.length) {
					for(var s = 0, c = a.length; c > s; s++)
						if(n = a[s], i[n]) {
							if(o = i[n].handle, o.requiredGestureType && u !== o.requiredGestureType) continue;
							if(o.processed) continue;
							o.processed = 1, o.isActive && o[e] && o[e](t) === !1 && (o.isActive = 0)
						}
					for(s = 0, c = a.length; c > s; s++) n = i[s], i[n] && (o = i[n].handle, o.processed = 0)
				}
			},
			addEventHandle: function(e) {
				var t = this,
					n = t.eventHandles,
					o = S[e].handle;
				n[e] ? n[e].count++ : (n.push(e), t.sortEventHandles(), n[e] = {
					count: 1,
					handle: o
				})
			},
			sortEventHandles: function() {
				this.eventHandles.sort(function(e, t) {
					var n = S[e],
						o = S[t];
					return n.order - o.order
				})
			},
			removeEventHandle: function(e) {
				var t = this.eventHandles;
				t[e] && (t[e].count--, t[e].count || (t.splice(m.indexOf(e, t), 1), delete t[e]))
			},
			destroy: function() {
				var e = this,
					t = e.doc;
				y.detach(t, f, e.onTouchStart, e), y.detach(t, T, e.onTouchMove, e), y.detach(t, g, e.onTouchEnd, e)
			}
		}, e = function(e, t) {
			"string" == typeof e && (e = [e]), m.each(e, function(e) {
				var n = {};
				n.setup = t.setup ? u : i, n.tearDown = t.tearDown ? s : a, n.add = t.add, n.remove = t.remove, t.order = t.order || 100, S[e] = t, H[e] = n
			})
		}
	}(), n = function(e) {
		function t() {}
		var n = function() {};
		return t.prototype = {
			constructor: t,
			requiredTouchCount: 0,
			onTouchStart: function(e) {
				var t = this,
					n = t.requiredTouchCount,
					o = e.touches,
					r = o.length;
				return r === n ? (t.isTracking || (t.isTracking = !0, t.isStarted = !1), t.lastTouches = e.touches, t.startTime = e.timeStamp, t.start(e)) : (r > n && t.onTouchEnd(e, !0), void 0)
			},
			onTouchMove: function(e) {
				var t = this;
				return t.isTracking ? (t.lastTouches = e.touches, t.move(e)) : void 0
			},
			onTouchEnd: function(e, t) {
				var n = this;
				n.isTracking && (n.isTracking = !1, n.isStarted && (n.isStarted = !1, n.end(e, t)))
			},
			start: n,
			move: n,
			end: n
		}, e = t
	}(), o = function(e) {
		function t() {}
		var o = n,
			r = h;
		return r.extend(t, o, {
			requiredTouchCount: 1,
			start: function() {
				t.superclass.start.apply(this, arguments);
				var e = this,
					n = e.lastTouches;
				e.lastXY = {
					pageX: n[0].pageX,
					pageY: n[0].pageY
				}
			}
		}), e = t
	}(), r = function(e) {
		function t() {}
		var o = d,
			r = n,
			i = h;
		return i.extend(t, r, {
			requiredTouchCount: 2,
			getCommonTarget: function(e) {
				var t = e.touches,
					n = t[0].target,
					r = t[1].target;
				if(n === r) return n;
				if(o.contains(n, r)) return n;
				for(; r;) {
					if(o.contains(r, n)) return r;
					r = r.parentNode
				}
				return void 0
			}
		}), e = t
	}(), i = function(e) {
		var i = t;
		return e = {
			addEvent: i,
			Touch: n,
			SingleTouch: o,
			DoubleTouch: r
		}
	}(), a = function(e) {
		function t(e, t, n) {
			var o, r, i = e.lastTouches,
				a = i[0],
				u = a.pageX,
				s = a.pageY,
				h = u - e.startX,
				d = s - e.startY,
				l = Math.abs(h),
				v = Math.abs(d),
				m = t.timeStamp;
			if(e.isStarted = 1, m - e.startTime > f) return !1;
			if(e.isVertical && l > T && (e.isVertical = 0), e.isHorizontal && v > T && (e.isHorizontal = 0), e.isVertical && e.isHorizontal && (v > l ? e.isHorizontal = 0 : e.isVertical = 0), n || (e.isVertical && g > v && (e.isVertical = 0), e.isHorizontal && g > l && (e.isHorizontal = 0)), e.isHorizontal) r = 0 > h ? "left" : "right", o = l;
			else {
				if(!e.isVertical) return !1;
				r = 0 > d ? "up" : "down", o = v
			}
			if(n) {
				var E = t.originalEvent._ksSwipePrevent;
				return E && (E === !0 || E[r]) && t.preventDefault(), void 0
			}
			c.fire(a.target, p, {
				originalEvent: t.originalEvent,
				pageX: a.pageX,
				pageY: a.pageY,
				which: 1,
				direction: r,
				distance: o,
				duration: (t.timeStamp - e.startTime) / 1e3
			})
		}

		function n() {}

		function o(e, t, n) {
			for(var o = !1; e !== t && !(o = a.test(e, n));) e = e.parentNode;
			return o
		}
		var r = h,
			a = d,
			u = i,
			s = u.addEvent,
			c = l,
			v = u.SingleTouch,
			p = "swipe",
			f = 1e3,
			T = 35,
			g = 50;
		return r.extend(n, v, {
			requiredGestureType: "touch",
			start: function() {
				var e = this;
				n.superclass.start.apply(e, arguments);
				var t = e.lastTouches[0];
				e.isHorizontal = 1, e.isVertical = 1, e.startX = t.pageX, e.startY = t.pageY
			},
			move: function(e) {
				return n.superclass.move.apply(this, arguments), t(this, e, 1)
			},
			end: function(e) {
				return n.superclass.end.apply(this, arguments), t(this, e, 0)
			}
		}), s([p], {
			handle: new n,
			add: function(e) {
				var t = e.config,
					n = t.preventDefault;
				if(n) {
					var r = t.filter;
					e._preventFn = function(e) {
						(!r || o(e.target, e.currentTarget, r)) && (e._ksSwipePrevent = n)
					}, this.addEventListener("touchmove", e._preventFn)
				}
			},
			remove: function(e) {
				e._preventFn && (this.removeEventListener("touchmove", e._preventFn), e._preventFn = null)
			}
		}), e = {
			SWIPE: p
		}
	}(), u = function(e) {
		function t(e) {
			e.preventDefault()
		}

		function n(e) {
			e.singleTapTimer && (clearTimeout(e.singleTapTimer), e.singleTapTimer = 0), e.tapHoldTimer && (clearTimeout(e.tapHoldTimer), e.tapHoldTimer = 0)
		}

		function o() {
			o.superclass.constructor.apply(this, arguments)
		}
		var r = i,
			a = r.addEvent,
			u = l,
			s = r.SingleTouch,
			c = h,
			d = "singleTap",
			v = "doubleTap",
			p = "hold",
			f = "tap",
			T = 1e3,
			g = 300,
			m = 5,
			E = u.Object,
			S = /iPad|iPhone|iPod/.test(navigator.userAgent);
		return c.extend(o, s, {
			start: function(e) {
				var t = this;
				o.superclass.start.call(t, e), n(t);
				var r = t.lastTouches[0];
				return t.tapHoldTimer = setTimeout(function() {
					var n = c.mix({
						which: 1,
						duration: (c.now() - e.timeStamp) / 1e3
					}, t.lastXY);
					t.tapHoldTimer = 0, t.lastXY = 0, u.fire(r.target, p, n)
				}, T), t.isStarted = !0, void 0
			},
			move: function() {
				var e, t = this;
				if(!(e = t.lastXY)) return !1;
				var o = t.lastTouches[0];
				return !o || Math.abs(o.pageX - e.pageX) > m || Math.abs(o.pageY - e.pageY) > m ? (n(t), !1) : void 0
			},
			end: function(e, o) {
				var r, i = this;
				if(n(i), !o && (r = i.lastXY)) {
					var a = i.lastTouches[0],
						s = a.target,
						h = new E(e.originalEvent);
					c.mix(h, {
						type: f,
						which: 1,
						pageX: r.pageX,
						pageY: r.pageY,
						target: s,
						currentTarget: s
					}), u.fire(s, f, h), h.isDefaultPrevented() && (S ? e.preventDefault() : u.on(s.ownerDocument || s, "click", {
						fn: t,
						once: 1
					}));
					var l, p = i.lastEndTime,
						T = e.timeStamp;
					if(i.lastEndTime = T, p && (l = T - p, g > l)) return i.lastEndTime = 0, u.fire(s, v, {
						pageX: r.pageX,
						pageY: r.pageY,
						which: 1,
						duration: l / 1e3
					}), void 0;
					l = T - i.startTime, l > g ? u.fire(s, d, {
						pageX: r.pageX,
						pageY: r.pageY,
						which: 1,
						duration: l / 1e3
					}) : i.singleTapTimer = setTimeout(function() {
						u.fire(s, d, {
							pageX: r.pageX,
							pageY: r.pageY,
							which: 1,
							duration: (c.now() - i.startTime) / 1e3
						})
					}, g)
				}
			}
		}), a([f, v, d, p], {
			handle: new o
		}), e = {
			TAP: f,
			SINGLE_TAP: d,
			DOUBLE_TAP: v,
			HOLD: p
		}
	}(), s = function(e) {
		function t(e, t) {
			var o = {
				isActive: 1
			};
			o[t] = function(t) {
				n.fire(t.target, e, t)
			}, r(e, {
				order: 1,
				handle: o
			})
		}
		var n = l,
			o = i,
			r = o.addEvent,
			a = e = {
				START: "ksGestureStart",
				MOVE: "ksGestureMove",
				END: "ksGestureEnd"
			};
		return t(a.START, "onTouchStart"), t(a.MOVE, "onTouchMove"), t(a.END, "onTouchEnd"), e
	}(), c = function(e) {
		var t = h,
			n = l,
			o = s,
			r = a,
			c = u,
			d = i,
			v = {
				BasicGestureEvent: o,
				SwipeGestureEvent: r,
				TapGestureEvent: c
			};
		return v._gestureUtil = d, t.mix(n, v), e = v
	}()
});
define("node-anim", ["node-base", "anim", "util"], function(n) {
	var t, e, i = n("node-base"),
		r = n("anim"),
		o = n("util");
	return t = function(n) {
		function t(n, t, e) {
			for(var i = [], r = {}, o = e || 0; t > o; o++) i.push.apply(i, f[o]);
			for(o = 0; o < i.length; o++) r[i[o]] = n;
			return r
		}
		var e = i,
			a = r,
			u = o,
			g = e.Dom,
			f = [
				["height", "margin-top", "margin-bottom", "padding-top", "padding-bottom"],
				["width", "margin-left", "margin-right", "padding-left", "padding-right"],
				["opacity"]
			];
		return u.augment(e, {
			animate: function() {
				var n = this,
					t = n.length,
					e = n.length > 1,
					i = u.makeArray(arguments),
					r = i[0],
					o = a;
				r.to ? o = r.Anim || a : (r = i[1], r && (o = r.Anim || a));
				for(var g = 0; t > g; g++) {
					var f = n[g],
						h = e ? u.clone(i) : i,
						s = h[0];
					s.to ? (s.node = f, new o(s).run()) : o.apply(void 0, [f].concat(h)).run()
				}
				return n
			},
			stop: function(n, t, e) {
				var i = this;
				return u.each(i, function(i) {
					a.stop(i, n, t, e)
				}), i
			},
			pause: function(n, t) {
				var e = this;
				return u.each(e, function(n) {
					a.pause(n, t)
				}), e
			},
			resume: function(n, t) {
				var e = this;
				return u.each(e, function(n) {
					a.resume(n, t)
				}), e
			},
			isRunning: function() {
				for(var n = this, t = 0; t < n.length; t++)
					if(a.isRunning(n[t])) return !0;
				return !1
			},
			isPaused: function() {
				for(var n = this, t = 0; t < n.length; t++)
					if(a.isPaused(n[t])) return !0;
				return !1
			}
		}), u.each({
			show: t("show", 3),
			hide: t("hide", 3),
			toggle: t("toggle", 3),
			fadeIn: t("show", 3, 2),
			fadeOut: t("hide", 3, 2),
			fadeToggle: t("toggle", 3, 2),
			slideDown: t("show", 1),
			slideUp: t("hide", 1),
			slideToggle: t("toggle", 1)
		}, function(n, t) {
			e.prototype[t] = function(e, i, r) {
				var o = this;
				if(g[t] && !e) g[t](o);
				else {
					var f = a;
					"object" == typeof e && (f = e.Anim || a), u.each(o, function(t) {
						new f(t, n, e, r, i).run()
					})
				}
				return o
			}
		}), n = e
	}(), e = function(n) {
		return n = t
	}()
});
define("anim-transition", ["util", "dom", "anim-base", "feature"], function(n) {
	var e, t, a = n("util"),
		r = n("dom"),
		i = n("anim-base"),
		o = n("feature");
	return e = function(n) {
		function e(n) {
			var e = "";
			return u.each(n, function(n, t) {
				e && (e += ","), e += t + " " + n.duration + "s " + n.easing + " " + n.delay + "s"
			}), e
		}

		function t(n) {
			return n.replace(/[A-Z]/g, function(n) {
				return "-" + n.toLowerCase()
			})
		}

		function s(n, e, t, a, r) {
			var i = this;
			return i instanceof s ? (s.superclass.constructor.apply(i, arguments), void 0) : new s(n, e, t, a, r)
		}
		var u = a,
			c = r,
			p = i,
			f = o,
			d = f.getCssVendorInfo,
			l = d("transition");
		if(l) {
			var m = l.propertyName,
				v = "linear",
				g = {
					ease: 1,
					linear: 1,
					"ease-in": 1,
					"ease-out": 1,
					"ease-in-out": 1
				};
			u.extend(s, p, {
				prepareFx: function() {
					var n, e, a = this,
						r = a._propsData,
						i = {};
					for(var o in r) n = r[o], "string" == typeof n.easing ? u.startsWith(n.easing, "cubic-bezier") || g[n.easing] || (n.easing = v) : n.easing = v, e = d(o), e ? i[t(e.propertyName)] = r[o] : console.error("anim: unsupported css property for transition anim: " + o);
					a._propsData = i
				},
				doStart: function() {
					var n = this,
						t = n.node,
						a = t.style,
						r = n._propsData,
						i = a[m],
						o = 0,
						s = {};
					u.each(r, function(n, e) {
						var a = n.value;
						c.css(t, e, c.css(t, e)), s[e] = a, o = Math.max(n.duration + n.delay, o)
					}), -1 !== i.indexOf("none") ? i = "" : i && (i += ","), a[m] = i + e(r), setTimeout(function() {
						c.css(t, s)
					}, 0), n._transitionEndTimer = setTimeout(function() {
						n.stop(!0)
					}, 1e3 * o)
				},
				beforeResume: function() {
					var n = this,
						e = n._propsData,
						t = u.merge(e),
						a = n._runTime / 1e3;
					u.each(t, function(n, t) {
						var r = a;
						n.delay >= r ? n.delay -= r : (r -= n.delay, n.delay = 0, n.duration >= r ? n.duration -= r : delete e[t])
					})
				},
				doStop: function(n) {
					var e, t = this,
						a = t.node,
						r = a.style,
						i = t._propsData,
						o = [],
						s = {};
					t._transitionEndTimer && (clearTimeout(t._transitionEndTimer), t._transitionEndTimer = null), u.each(i, function(e, t) {
						n || (s[t] = c.css(a, t)), o.push(t)
					}), e = u.trim(r[m].replace(new RegExp("(^|,)\\s*(?:" + o.join("|") + ")\\s+[^,]+", "gi"), "$1")).replace(/^,|,,|,$/g, "") || "none", r[m] = e, c.css(a, s)
				}
			}), u.mix(s, p.Statics), n = s, s._name_ = "TransitionAnim"
		} else n = null;
		return n
	}(), t = function(n) {
		var t = e;
		return n = t
	}()
});
define("anim-base", ["dom", "util", "promise"], function(e) {
	var n, t, i, u, a = e("dom"),
		o = e("util"),
		r = e("promise");
	return n = function(e) {
		function n(e, n, t) {
			n = n || s;
			var u, a = i.data(e, r);
			return a || t || i.data(e, r, a = {}), a && (u = a[n], u || t || (u = a[n] = [])), u
		}
		var t, i = a,
			u = o,
			r = u.guid("ks-queue-" + u.now() + "-"),
			s = u.guid("ks-queue-" + u.now() + "-");
		return t = {
			queueCollectionKey: r,
			queue: function(e, t, i) {
				var u = n(e, t);
				return u.push(i), u
			},
			remove: function(e, i, a) {
				var o, r = n(e, i, 1);
				return r && (o = u.indexOf(a, r), o > -1 && r.splice(o, 1)), r && !r.length && t.clearQueue(e, i), r
			},
			clearQueues: function(e) {
				i.removeData(e, r)
			},
			clearQueue: function(e, n) {
				n = n || s;
				var t = i.data(e, r);
				t && delete t[n], u.isEmptyObject(t) && i.removeData(e, r)
			},
			dequeue: function(e, i) {
				var u = n(e, i, 1);
				return u && (u.shift(), u.length || t.clearQueue(e, i)), u
			}
		}, e = t
	}(), t = function(e) {
		function t(e) {
			var n = e.node,
				t = l.data(n, v);
			t || l.data(n, v, t = {}), t[f.stamp(e)] = e
		}

		function i(e) {
			var n = e.node,
				t = l.data(n, v);
			t && (delete t[f.stamp(e)], f.isEmptyObject(t) && l.removeData(n, v))
		}

		function u(e) {
			var n = e.node,
				t = l.data(n, v);
			return t ? !!t[f.stamp(e)] : 0
		}

		function r(e) {
			var n = e.node,
				t = l.data(n, p);
			t || l.data(n, p, t = {}), t[f.stamp(e)] = e
		}

		function s(e) {
			var n = e.node,
				t = l.data(n, p);
			t && (delete t[f.stamp(e)], f.isEmptyObject(t) && l.removeData(n, p))
		}

		function d(e) {
			var n = e.node,
				t = l.data(n, p);
			return t ? !!t[f.stamp(e)] : 0
		}

		function c(e, n, t) {
			var i = l.data(e, "resume" === t ? p : v),
				u = f.merge(i);
			f.each(u, function(e) {
				(void 0 === n || e.config.queue === n) && e[t]()
			})
		}
		var m = n,
			f = o,
			l = a,
			v = f.guid("ks-anim-unqueued-" + f.now() + "-"),
			p = f.guid("ks-anim-paused-" + f.now() + "-");
		return e = {
			saveRunningAnim: t,
			removeRunningAnim: i,
			isAnimPaused: d,
			removePausedAnim: s,
			savePausedAnim: r,
			isAnimRunning: u,
			isElPaused: function(e) {
				var n = l.data(e, p);
				return n && !f.isEmptyObject(n)
			},
			isElRunning: function(e) {
				var n = l.data(e, v);
				return n && !f.isEmptyObject(n)
			},
			pauseOrResumeQueue: c,
			stopEl: function(e, n, t, i) {
				t && (void 0 === i ? m.clearQueues(e) : i !== !1 && m.clearQueue(e, i));
				var u = l.data(e, v),
					a = f.merge(u);
				f.each(a, function(e) {
					(void 0 === i || e.config.queue === i) && e.stop(n)
				})
			}
		}
	}(), i = function(e) {
		function i(e) {
			var n, t = e.config.complete;
			l.isEmptyObject(n = e._backupProps) || d.css(e.node, n), t && t.call(e)
		}

		function u(e, n, t, i, a) {
			var o, r = this;
			e.node ? o = e : (l.isPlainObject(t) ? o = l.clone(t) : (o = {
				complete: a
			}, t && (o.duration = t), i && (o.easing = i)), o.node = e, o.to = n), o = l.merge(h, o), u.superclass.constructor.call(r), f.Defer(r), r.config = o, e = o.node, l.isPlainObject(e) || (e = d.get(o.node)), r.node = r.el = e, r._backupProps = {}, r._propsData = {};
			var s = {};
			n = o.to;
			for(var c in n) s[p(c)] = n[c];
			o.to = s
		}
		var s, d = a,
			c = t,
			m = n,
			f = r,
			l = o,
			v = d.NodeType,
			p = l.camelCase,
			g = l.noop,
			_ = {
				toggle: 1,
				hide: 1,
				show: 1
			},
			h = {
				duration: 1,
				easing: "linear"
			};
		l.extend(u, f, {
			prepareFx: g,
			runInternal: function() {
				var e, n = this,
					t = n.config,
					i = n.node,
					u = n._backupProps,
					a = n._propsData,
					o = t.to,
					r = t.delay || 0,
					m = t.duration;
				if(c.saveRunningAnim(n), l.each(o, function(e, n) {
						l.isPlainObject(e) || (e = {
							value: e
						}), a[n] = l.mix({
							delay: r,
							easing: t.easing,
							frame: t.frame,
							duration: m
						}, e)
					}), i.nodeType === v.ELEMENT_NODE) {
					if(o.width || o.height) {
						var f = i.style;
						l.mix(u, {
							overflow: f.overflow,
							"overflow-x": f.overflowX,
							"overflow-y": f.overflowY
						}), f.overflow = "hidden"
					}
					var p, g;
					if(l.each(a, function(t, a) {
							if(e = t.value, _[e]) {
								if(g === s && (g = "none" === d.css(i, "display")), "hide" === e && g || "show" === e && !g) return n.stop(!0), p = !1;
								u[a] = d._style(i, a), "toggle" === e && (e = g ? "show" : "hide"), "hide" === e ? (t.value = 0, u.display = "none") : (t.value = d.css(i, a), d.css(i, a, 0), d.show(i))
							}
							return void 0
						}), p === !1) return
				}
				n.startTime = l.now(), l.isEmptyObject(a) ? (n.__totalTime = 1e3 * m, n.__waitTimeout = setTimeout(function() {
					n.stop(!0)
				}, n.__totalTime)) : (n.prepareFx(), n.doStart())
			},
			isRunning: function() {
				return c.isAnimRunning(this)
			},
			isPaused: function() {
				return c.isAnimPaused(this)
			},
			pause: function() {
				var e = this;
				return e.isRunning() && (e._runTime = l.now() - e.startTime, e.__totalTime -= e._runTime, c.removeRunningAnim(e), c.savePausedAnim(e), e.__waitTimeout ? clearTimeout(e.__waitTimeout) : e.doStop()), e
			},
			doStop: g,
			doStart: g,
			resume: function() {
				var e = this;
				return e.isPaused() && (e.startTime = l.now() - e._runTime, c.removePausedAnim(e), c.saveRunningAnim(e), e.__waitTimeout ? e.__waitTimeout = setTimeout(function() {
					e.stop(!0)
				}, e.__totalTime) : (e.beforeResume(), e.doStart())), e
			},
			beforeResume: g,
			run: function() {
				var e, n = this,
					t = n.config.queue;
				return t === !1 ? n.runInternal() : (e = m.queue(n.node, t, n), 1 === e.length && n.runInternal()), n
			},
			stop: function(e) {
				var n, t = this,
					u = t.node,
					a = t.config.queue;
				if(t.isResolved() || t.isRejected()) return t;
				if(t.__waitTimeout && (clearTimeout(t.__waitTimeout), t.__waitTimeout = 0), !t.isRunning() && !t.isPaused()) return a !== !1 && m.remove(u, a, t), t;
				t.doStop(e), c.removeRunningAnim(t), c.removePausedAnim(t);
				var o = t.defer;
				return e ? (i(t), o.resolve([t])) : o.reject([t]), a !== !1 && (n = m.dequeue(u, a), n && n[0] && n[0].runInternal()), t
			}
		});
		var w = u.Statics = {
			isRunning: c.isElRunning,
			isPaused: c.isElPaused,
			stop: c.stopEl,
			Q: m
		};
		return l.each(["pause", "resume"], function(e) {
			w[e] = function(n, t) {
				return null === t || "string" == typeof t || t === !1 ? c.pauseOrResumeQueue(n, t, e) : c.pauseOrResumeQueue(n, void 0, e)
			}
		}), e = u
	}(), u = function(e) {
		var n = i;
		return e = n
	}()
});
define("cookie", [], function() { //! Copyright 2015, cookie@6.1.2 MIT Licensed, build time: Thu, 29 Oct 2015 07:04:13 GMT 
	var e, n;
	return e = function(e) {
		function n(e) {
			return decodeURIComponent(e.replace(/\+/g, " "))
		}

		function t(e) {
			return "string" == typeof e && "" !== e
		}
		var o = document,
			r = 864e5,
			i = encodeURIComponent;
		return e = {
			get: function(e) {
				var r, i;
				return t(e) && (i = String(o.cookie).match(new RegExp("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)"))) && (r = i[1] ? n(i[1]) : ""), r
			},
			set: function(e, n, c, u, f, a, g) {
				var m, p = c;
				m = g ? String(n) : String(i(n)), "number" == typeof p && (p = new Date, p.setTime(p.getTime() + c * r)), p instanceof Date && (m += "; expires=" + p.toUTCString()), t(u) && (m += "; domain=" + u), t(f) && (m += "; path=" + f), a && (m += "; secure"), o.cookie = e + "=" + m
			},
			remove: function(e, n, t, o) {
				this.set(e, "", -1, n, t, o)
			}
		}
	}(), n = function(n) {
		return n = e
	}()
});
define("event", ["event-dom", "event-custom"], function(e) {
	var t, n = e("event-dom"),
		r = e("event-custom");
	return t = function(e) {
		var t = n,
			v = r,
			o = t;
		return o.Target = v.Target, e = o
	}()
});
define("base", ["util", "attribute"], function(t) {
	var n, r, e = t("util"),
		i = t("attribute");
	return n = function(t) {
		function n(t, n) {
			return function(r) {
				return function() {
					var e = this;
					n ? r !== f && r.apply(e, arguments) : e.callSuper.apply(e, arguments);
					var i = arguments.callee.__owner__.__extensions__ || [];
					n && i.reverse(), s(e, i, t, arguments), n ? e.callSuper.apply(e, arguments) : r !== f && r.apply(e, arguments)
				}
			}
		}

		function r(t) {
			var n = this,
				r = n.__extensions__,
				e = n.__hooks__,
				i = n.prototype;
			if(r.length && e)
				for(var a in e)(!i.hasOwnProperty(a) || t.hasOwnProperty(a)) && (t[a] = t[a] || f);
			return h.call(n, t)
		}

		function a(t) {
			var n, r = this;
			t.target === r && (n = r[g + t.type.slice(5).slice(0, -6)], n.call(r, t.newVal, t))
		}

		function u(t) {
			var n, r = t.get("plugins");
			l.each(r, function(t, e) {
				"function" == typeof t && (n = t, r[e] = new n)
			})
		}

		function o(t, n) {
			var r, e, i = this,
				a = i.get("plugins");
			if(n = n || [], n = [i].concat(n), r = a.length)
				for(var u = 0; r > u; u++) e = a[u][t], e && e.apply(a[u], n)
		}

		function s(t, n, r, e) {
			var i;
			if(i = n && n.length)
				for(var a = 0; i > a; a++) {
					var u = n[a] && (r ? n[a].prototype[r] : n[a]);
					u && u.apply(t, e || [])
				}
		}
		var l = e,
			c = i,
			p = l.ucfirst,
			g = "_onSet",
			f = l.noop,
			v = c.extend({
				constructor: function() {
					var t = this;
					t.callSuper.apply(t, arguments);
					var n = t.get("listeners");
					if(n)
						for(var r in n) t.on(r, n[r]);
					t.initializer(), u(t), o.call(t, "pluginInitializer"), t.bindInternal(), t.syncInternal()
				},
				initializer: f,
				__getHook: n,
				__callPluginsMethod: o,
				bindInternal: function() {
					var t, n, r = this,
						e = r.getAttrs();
					for(t in e) n = g + p(t), r[n] && r.on("after" + p(t) + "Change", a)
				},
				syncInternal: function() {
					for(var t, n = this, r = [], e = n.constructor, i = n.getAttrs(); e;) r.push(e), e = e.superclass && e.superclass.constructor;
					for(r.reverse(), t = 0; t < r.length; t++) {
						var a = r[t].ATTRS || {};
						for(var u in a)
							if(u in i) {
								var o, s, l = g + p(u);
								(s = n[l]) && 0 !== i[u].sync && void 0 !== (o = n.get(u)) && s.call(n, o)
							}
					}
				},
				plug: function(t) {
					var n = this;
					if("function" == typeof t) {
						var r = t;
						t = new r
					}
					return t.pluginInitializer && t.pluginInitializer(n), n.get("plugins").push(t), n
				},
				unplug: function(t) {
					var n = [],
						r = this,
						e = "string" == typeof t;
					return l.each(r.get("plugins"), function(i) {
						var a, u = 0;
						t && (e ? (a = i.get && i.get("pluginId") || i.pluginId, a !== t && (n.push(i), u = 1)) : i !== t && (n.push(i), u = 1)), u || i.pluginDestructor(r)
					}), r.setInternal("plugins", n), r
				},
				getPlugin: function(t) {
					var n = null;
					return l.each(this.get("plugins"), function(r) {
						var e = r.get && r.get("pluginId") || r.pluginId;
						return e === t ? (n = r, !1) : void 0
					}), n
				},
				destructor: f,
				destroy: function() {
					var t = this,
						n = l.makeArray(arguments);
					t.get("destroyed") || (o.call(t, "pluginDestructor", n), t.destructor.apply(t, n), t.set("destroyed", !0), t.fire("destroy"), t.detach())
				}
			});
		l.mix(v, {
			__hooks__: {
				initializer: n(),
				destructor: n("__destructor", !0)
			},
			ATTRS: {
				plugins: {
					valueFn: function() {
						return []
					}
				},
				destroyed: {
					value: !1
				},
				listeners: {}
			},
			extend: function d(t, n, e) {
				l.isArray(t) || (e = n, n = t, t = []);
				var i = c.extend.call(this, n, e);
				if(i.__extensions__ = t, r.call(i, {}), t.length) {
					var a = {},
						u = {};
					l.each(t.concat(i), function(t) {
						if(t) {
							l.each(t.ATTRS, function(t, n) {
								var r = a[n] = a[n] || {};
								l.mix(r, t)
							});
							var n, r = t.prototype;
							for(n in r) r.hasOwnProperty(n) && (u[n] = r[n])
						}
					}), i.ATTRS = a, u.constructor = i, l.augment(i, u)
				}
				return i.extend = e && e.extend || d, i.addMembers = r, i
			}
		});
		var h = v.addMembers;
		return t = v
	}(), r = function(t) {
		return t = n
	}()
});
define("attribute", ["util", "event-custom"], function(t) {
	var r, e, n = t("util"),
		a = t("event-custom");
	return r = function(t) {
		function r(t) {
			return t === V.noop ? function() {} : V.bind(t)
		}

		function e(t, r) {
			return "string" == typeof r ? t[r] : r
		}

		function i(t) {
			return t.__attrVals || (t.__attrVals = {})
		}

		function o(t, r) {
			return t + V.ucfirst(r) + "Change"
		}

		function u(t, r, e, n, a, i, u, s) {
			return u = u || e, t.fire(o(r, e), V.mix({
				attrName: u,
				subAttrName: i,
				prevVal: n,
				newVal: a
			}, s))
		}

		function s(t, r, e) {
			var n = t[r];
			return e || n || (t[r] = n = {}), n || {}
		}

		function _(t, r) {
			for(var e = 0, n = r.length; void 0 !== t && n > e; e++) t = t[r[e]];
			return t
		}

		function f(t, r, e) {
			var n = r.length - 1,
				a = t;
			if(n >= 0) {
				for(var i = 0; n > i; i++) t = t[r[i]];
				void 0 !== t ? t[r[i]] = e : a = void 0
			}
			return a
		}

		function c(t) {
			var r;
			return -1 !== t.indexOf(".") && (r = t.split("."), t = r.shift()), {
				path: r,
				name: t
			}
		}

		function l(t, r, e) {
			var n = e;
			return r && (n = void 0 === t ? {} : V.clone(t), f(n, r, e)), n
		}

		function v(t, r) {
			var e = s(t, "__defaultBeforeFns");
			if(!e[r]) {
				e[r] = 1;
				var n = o("before", r);
				t.publish(n, {
					defaultFn: h,
					defaultTargetOnly: !0
				})
			}
		}

		function d(t, r, e, n, a) {
			var i, u, s, f = c(r),
				d = r;
			if(r = f.name, i = f.path, s = t.get(r), v(t, r), i && (u = _(s, i)), !n.force) {
				if(!i && s === e) return void 0;
				if(i && u === e) return void 0
			}
			e = l(s, i, e);
			var p = V.mix({
				attrName: r,
				subAttrName: d,
				prevVal: s,
				newVal: e,
				_opts: n,
				_attrs: a,
				target: t
			}, n.data);
			if(n.silent) {
				if(O === h.call(t, p)) return O
			} else if(O === t.fire(o("before", r), p)) return O;
			return t
		}

		function h(t) {
			var r = this,
				e = t.newVal,
				n = t.prevVal,
				a = t.attrName,
				o = t.subAttrName,
				s = t._attrs,
				_ = t._opts,
				f = r.setInternal(a, e);
			return f === O ? f : (_.silent || (e = i(r)[a], u(r, "after", a, n, e, o, null, _.data), s ? s.push({
				prevVal: n,
				newVal: e,
				attrName: a,
				subAttrName: o
			}) : u(r, "", "*", [n], [e], [o], [a], _.data)), void 0)
		}

		function p(t) {
			var r = this,
				e = r.constructor;
			for(r.userConfig = t; e;) A(r, e.ATTRS), e = e.superclass ? e.superclass.constructor : null;
			w(r, t)
		}

		function m(t, e) {
			var n = e.__hooks__;
			if(n)
				for(var a in n) a in t && (t[a] = n[a](t[a]));
			V.each(t, function(n, a) {
				if("function" == typeof n) {
					var i = 0;
					if(n.__owner__) {
						var o = n.__owner__;
						delete n.__owner__, delete n.__name__, i = n.__wrapped__ = 1;
						var u = r(n);
						u.__owner__ = o, u.__name__ = a, o.prototype[a] = u
					} else n.__wrapped__ && (i = 1);
					i && (t[a] = n = r(n)), n.__owner__ = e, n.__name__ = a
				}
			})
		}

		function g(t) {
			var r = this;
			m(t, r), V.mix(r.prototype, t)
		}

		function A(t, r) {
			if(r)
				for(var e in r) t.addAttr(e, r[e], !1)
		}

		function w(t, r) {
			if(r)
				for(var e in r) t.setInternal(e, r[e])
		}

		function y(t, r) {
			var n, a = t.getAttrs(),
				i = s(a, r, 1),
				o = i.valueFn;
			return o && (o = e(t, o)) && (n = o.call(t), void 0 !== n && (i.value = n), delete i.valueFn, a[r] = i), i.value
		}

		function b(t, r, n, a) {
			var i, o, u;
			u = c(r), r = u.name, i = u.path, i && (o = t.get(r), n = l(o, i, n));
			var _, f = s(t.getAttrs(), r),
				v = f.validator;
			return v && (v = e(t, v)) && (_ = v.call(t, n, r, a), void 0 !== _ && _ !== !0) ? _ : void 0
		}
		var V = n,
			x = a,
			N = {},
			O = !1;
		return p.extend = function S(t, r) {
			var e, n = t,
				a = this;
			r = V.merge(r), t = V.merge(t), n.hasOwnProperty("constructor") && (t.constructor = n.constructor);
			var i, o = r.__hooks__;
			(i = a.__hooks__) && (o = r.__hooks__ = r.__hooks__ || {}, V.mix(o, i, !1));
			r.name || "AttributeDerived";
			e = t.hasOwnProperty("constructor") ? t.constructor : function() {
				this.callSuper.apply(this, arguments)
			}, t.constructor = e, e.__hooks__ = o, m(t, e);
			var u, s = r.inheritedStatics;
			return(u = a.inheritedStatics) && (s = r.inheritedStatics = r.inheritedStatics || {}, V.mix(s, u, !1)), V.extend(e, a, t, r), s && V.mix(e, s), e.extend = r.extend || S, e.addMembers = g, e
		}, V.augment(p, x.Target, {
			INVALID: N,
			callSuper: function() {
				var t, r, e = this,
					n = arguments;
				"function" == typeof e && e.__name__ ? (t = e, r = n[0], n = Array.prototype.slice.call(n, 1)) : (t = arguments.callee.caller, t.__wrapped__ && (t = t.caller), r = e);
				var a = t.__name__;
				if(!a) return void 0;
				var i = t.__owner__.superclass[a];
				return i ? i.apply(r, n || []) : void 0
			},
			getAttrs: function() {
				return this.__attrs || (this.__attrs = {})
			},
			getAttrVals: function() {
				var t, r = this,
					e = {},
					n = r.getAttrs();
				for(t in n) e[t] = r.get(t);
				return e
			},
			addAttr: function(t, r, e) {
				var n, a = this,
					i = a.getAttrs(),
					o = V.merge(r);
				return o.value && "object" == typeof o.value && (o.value = V.clone(o.value)), (n = i[t]) ? V.mix(n, o, e) : i[t] = o, a
			},
			addAttrs: function(t, r) {
				var e = this;
				return V.each(t, function(t, r) {
					e.addAttr(r, t)
				}), r && e.set(r), e
			},
			hasAttr: function(t) {
				return this.getAttrs().hasOwnProperty(t)
			},
			removeAttr: function(t) {
				var r = this,
					e = i(r),
					n = r.getAttrs();
				return r.hasAttr(t) && (delete n[t], delete e[t]), r
			},
			set: function(t, r, e) {
				var n, a = this;
				if("string" != typeof t) {
					e = r, e = e || {};
					var i = Object(t),
						o = [],
						s = [];
					for(t in i) void 0 !== (n = b(a, t, i[t], i)) && s.push(n);
					if(s.length) return e.error && e.error(s), O;
					for(t in i) d(a, t, i[t], e, o);
					var _ = [],
						f = [],
						c = [],
						l = [];
					return V.each(o, function(t) {
						f.push(t.prevVal), c.push(t.newVal), _.push(t.attrName), l.push(t.subAttrName)
					}), _.length && u(a, "", "*", f, c, l, _, e.data), a
				}
				return e = e || {}, n = b(a, t, r), void 0 !== n ? (e.error && e.error(n), O) : d(a, t, r, e)
			},
			setInternal: function(t, r) {
				var n, a = this,
					o = s(a.getAttrs(), t),
					u = o.setter;
				return u && (u = e(a, u)) && (n = u.call(a, r, t)), n === N ? O : (void 0 !== n && (r = n), i(a)[t] = r, void 0)
			},
			get: function(t) {
				var r, n, a, o, u = this,
					f = ".",
					c = i(u);
				return -1 !== t.indexOf(f) && (r = t.split(f), t = r.shift()), n = s(u.getAttrs(), t, 1), a = n.getter, o = t in c ? c[t] : y(u, t), a && (a = e(u, a)) && (o = a.call(u, o, t)), t in c || void 0 === o || (c[t] = o), r && (o = _(o, r)), o
			},
			reset: function(t, r) {
				var e = this;
				if("string" == typeof t) return e.hasAttr(t) ? e.set(t, y(e, t), r) : e;
				r = t;
				var n = e.getAttrs(),
					a = {};
				for(t in n) a[t] = y(e, t);
				return e.set(a, r), e
			}
		}), t = p
	}(), e = function(t) {
		return t = r
	}()
});
define("json-base", [], function() { //! Copyright 2015, json-base@6.1.1 MIT Licensed, build time: Thu, 29 Oct 2015 12:16:20 GMT 
	var n;
	return n = function(n) {
		return n = "undefined" != typeof JSON ? JSON : null
	}()
});
define("kg/attr-anim/6.0.6/index", [], function(e, n, t) {
	var o;
	o = function(e) {
		function n(e, n, t) {
			var o = this;
			e && e != window && e.length ? o.elem = e[0] : o.elem = e, o.duration = t.duration, o.easingFunction = l[t.easing], o.complete = t.complete, o.endAttrsObj = n, o.alreadyStartRun = !1, o.isRunning = !1, o.isComplete = !1, o.isPaused = !1, o.frameTime = 16
		}
		var t = Math.PI,
			o = Math.pow,
			r = Math.sin,
			i = (parseFloat, 1.70158),
			l = {
				swing: function(e) {
					return .5 - Math.cos(e * t) / 2
				},
				easeNone: function(e) {
					return e
				},
				linear: function(e) {
					return e
				},
				easeIn: function(e) {
					return e * e
				},
				easeOut: function(e) {
					return(2 - e) * e
				},
				easeBoth: function(e) {
					return(e *= 2) < 1 ? .5 * e * e : .5 * (1 - --e * (e - 2))
				},
				easeInStrong: function(e) {
					return e * e * e * e
				},
				easeOutStrong: function(e) {
					return 1 - --e * e * e * e
				},
				easeBothStrong: function(e) {
					return(e *= 2) < 1 ? .5 * e * e * e * e : .5 * (2 - (e -= 2) * e * e * e)
				},
				elasticIn: function(e) {
					var n = .3,
						i = n / 4;
					return 0 === e || 1 === e ? e : 0 - o(2, 10 * (e -= 1)) * r((e - i) * (2 * t) / n)
				},
				elasticOut: function(e) {
					var n = .3,
						i = n / 4;
					return 0 === e || 1 === e ? e : o(2, -10 * e) * r((e - i) * (2 * t) / n) + 1
				},
				elasticBoth: function(e) {
					var n = .45,
						i = n / 4;
					return 0 === e || 2 === (e *= 2) ? e : 1 > e ? -.5 * (o(2, 10 * (e -= 1)) * r((e - i) * (2 * t) / n)) : o(2, -10 * (e -= 1)) * r((e - i) * (2 * t) / n) * .5 + 1
				},
				backIn: function(e) {
					return 1 === e && (e -= .001), e * e * ((i + 1) * e - i)
				},
				backOut: function(e) {
					return(e -= 1) * e * ((i + 1) * e + i) + 1
				},
				backBoth: function(e) {
					var n = i,
						t = (n *= 1.525) + 1;
					return(e *= 2) < 1 ? .5 * (e * e * (t * e - n)) : .5 * ((e -= 2) * e * (t * e + n) + 2)
				},
				bounceIn: function(e) {
					return 1 - l.bounceOut(1 - e)
				},
				bounceOut: function(e) {
					var n, t = 7.5625;
					return n = 1 / 2.75 > e ? t * e * e : 2 / 2.75 > e ? t * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? t * (e -= 2.25 / 2.75) * e + .9375 : t * (e -= 2.625 / 2.75) * e + .984375
				},
				bounceBoth: function(e) {
					return .5 > e ? .5 * l.bounceIn(2 * e) : .5 * l.bounceOut(2 * e - 1) + .5
				}
			},
			u = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
				setTimeout(e, 1 / 60 * 1e3)
			},
			c = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout,
			s = function(e) {
				return "undefined" != typeof e && null !== e
			};
		return n.prototype.run = function() {
			var e = this;
			if(e.nowTime = 0, e.elem == window) {
				if(e.elemInitScrollTop = document.documentElement.scrollTop + document.body.scrollTop, e.elemInitScrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft, e.elemInitScrollLeft == e.endAttrsObj.scrollLeft || e.elemInitScrollTop == e.endAttrsObj.scrollTop) return void(e.complete && e.complete(e.elem))
			} else e.elemInitScrollLeft = e.elem.scrollLeft, e.elemInitScrollTop = e.elem.scrollTop;
			e.alreadyStartRun || (e.alreadyStartRun = !0, e.isRunning = !0, e.animTimer = u(function() {
				e._elemInNextStep(e.nowTime), e.nowTime += e.frameTime / 1e3
			}))
		}, n.prototype._elemInNextStep = function(e) {
			var n = this;
			if(e < n.duration) {
				var t = n.easingFunction(e / n.duration);
				if(n.elem == window) {
					var o = s(n.endAttrsObj.scrollLeft) ? n.elemInitScrollLeft + (n.endAttrsObj.scrollLeft - n.elemInitScrollLeft) * t : 0,
						r = s(n.endAttrsObj.scrollTop) ? n.elemInitScrollTop + (n.endAttrsObj.scrollTop - n.elemInitScrollTop) * t : 0;
					window.scrollTo(o, r)
				} else void 0 != n.endAttrsObj.scrollLeft && (n.elem.scrollLeft = n.elemInitScrollLeft + (n.endAttrsObj.scrollLeft - n.elemInitScrollLeft) * t), void 0 != n.endAttrsObj.scrollTop && (n.elem.scrollTop = n.elemInitScrollTop + (n.endAttrsObj.scrollTop - n.elemInitScrollTop) * t);
				n.animTimer = u(function() {
					n._elemInNextStep(n.nowTime), n.nowTime += n.frameTime / 1e3
				})
			} else c(n.animTimer), n.animTimer = null, n._jumpEnd(), n.isComplete = !0, n.complete && n.complete(n.elem), n.alreadyStartRun = !1
		}, n.prototype.stop = function(e) {
			var n = this;
			this.isRunning && (n.alreadyStartRun = !1, e && n._jumpEnd(), c(n.animTimer), n.animTimer = null)
		}, n.prototype._jumpEnd = function() {
			var e = this;
			if(e.elem == window) {
				var n = e.endAttrsObj.scrollLeft ? e.endAttrsObj.scrollLeft : 0,
					t = e.endAttrsObj.scrollTop ? e.endAttrsObj.scrollTop : 0;
				window.scrollTo(n, t)
			} else e.endAttrsObj.scrollLeft && (e.elem.scrollLeft = e.endAttrsObj.scrollLeft), e.endAttrsObj.scrollTop && (e.elem.scrollTop = e.endAttrsObj.scrollTop)
		}, n.prototype.pause = function() {
			var e = this;
			e.isRunning && (c(e.animTimer), e.isRunning = !1, e.isPaused = !0)
		}, n.prototype.resume = function() {
			var e = this;
			e.isPaused && (e.isPaused = !1, e.isRunning = !0, e.animTimer = u(function() {
				e.nowTime += e.frameTime / 1e3, e._elemInNextStep(e.nowTime)
			}))
		}, n.prototype.isRunning = function() {
			return this.isRunning
		}, n.prototype.isPaused = function() {
			return this.isPaused
		}, e = n
	}(), t.exports = o
});
define("kg/xctrl/6.10.3/xctrl-kissy", ["io", "json"], function(require, exports, module) {
	var io = require("io"),
		json = require("json"),
		kgXctrl6103SrcBaseApi, kgXctrl6103SrcGetHelper, kgXctrl6103SrcModBaseApiKissy, kgXctrl6103SrcApi, kgXctrl6103SrcBase, kgXctrl6103XctrlKissy;
	kgXctrl6103SrcBaseApi = function(t) {
		var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			r = {};
		return r.isString = function(t) {
			return "string" == typeof t && t.constructor == String
		}, r.isArray = function(t) {
			return null != t && ("object" == ("undefined" == typeof t ? "undefined" : e(t)) && t.constructor == Array)
		}, r.isFunction = function(t) {
			return "function" == typeof t && t.constructor == Function
		}, r.trim = function(t) {
			for(var t = t.replace(/^\s+/, ""), e = t.length - 1; e >= 0; e--)
				if(/\S/.test(t.charAt(e))) {
					t = t.substring(0, e + 1);
					break
				}
			return t
		}, r.inArray = function(t, e, r) {
			var a;
			if(e) {
				if(Array.prototype.indexOf) return Array.prototype.indexOf.call(e, t, r);
				for(a = e.length, r = r ? r < 0 ? Math.max(0, a + r) : r : 0; r < a; r++)
					if(r in e && e[r] === t) return r
			}
			return -1
		}, t = r
	}(), kgXctrl6103SrcGetHelper = function(t) {
		function e(t) {
			r = window.XctrlBaseApi || {}, this.init(t)
		}
		var r, a = {
			request: {
				merge: {
					maxBlock: 20,
					maxCount: 80,
					maxTime: 300,
					outTime: 100
				},
				jsonp: {
					callback: "callback"
				},
				url: "",
				backupUrl: "",
				parameters: {},
				split: ",;|"
			},
			response: {
				convert: {},
				path: ""
			}
		};
		return e.prototype = {
			init: function(t) {
				var e = this;
				e.conf = r.merge(t, r.clone(a)), r.mix(e.conf, t, !0, null, !0), e.conf.request.merge && e.conf.request.mergeKey && (e._path = e.conf.request.mergeKey.split(">")), e._init()
			},
			_init: function() {
				var t = this;
				t._stack = [], t._resultSuccess = {}, t._block = {}, t._count = 0, t._blockCount = 0, t._startTime = null
			},
			_val: function(t, e) {
				return e.replace(/\$\{([^}]*)\}/g, function(e, r) {
					return t[r] || ""
				})
			},
			_valResponse: function(t, e) {
				return e.replace(/@\{([^}]*)\}/g, function(e, r) {
					return t[r]
				})
			},
			countItem: function() {
				var t = this;
				return t.conf.request.mergeCount
			},
			_paraTr: function(t, e) {
				var r = this,
					a = {};
				for(var i in e) e.hasOwnProperty(i) && (a[i] = r._val(t, e[i]));
				return a
			},
			push: function(t, e, a) {
				var i, n, c = this,
					o = c.conf.request,
					s = o.merge,
					u = o.mergeKey,
					p = o.mergeCount,
					l = c._path,
					f = o.parameters,
					m = {
						para: t,
						cb: e,
						dycfg: a || {}
					};
				if(i = c._paraTr(t, f), i = r.merge(i, t), n = a ? s && u && a.merge : s && u, a.request && (n = !1), n) {
					c._startTime = c._startTime || new Date, p && ("" == i[p] ? m.count = "" : m.count = parseInt(i[p], 10), c._count + m.count > s.maxCount && c._count > 0 && c._do(), c._count += m.count);
					for(var g = c._block, d = !1, h = 0; h < l.length; h += 1) {
						var y = i[l[h]];
						if(h + 1 === l.length)
							if(g[y]) {
								for(var _ = !1, v = 0, b = g[y].length; v < b; v++) return g[y][v] === i[v] || !p || h === p || (_ = !0, !1);
								if(_) return c._do(), c.push(t, e), c;
								p && (g[y][p] += i[p] ? parseInt(i[p], 10) : "")
							} else {
								var k = {};
								for(var A in i) i.hasOwnProperty(A) && r.inArray(A, l) < 0 && (p === A ? k[A] = i[A] ? parseInt(i[A], 10) : "" : k[A] = i[A]);
								g[y] = k, d = !0
							}
						else g[y] || (g[y] = {}, d = !0), g = g[y]
					}
					var S = r.clone(m);
					if(c._stack.push(S), d && (c._blockCount += 1, c._blockCount >= s.maxBlock)) return c._do(), c;
					new Date - c._startTime > s.maxTime ? c._do() : (clearTimeout(c._timer), c._timer = setTimeout(function() {
						c._do()
					}, s.outTime))
				} else {
					var w = [];
					w.push(m), c._do(i, w)
				}
				return c
			},
			_getPara: function() {
				var t = this,
					e = t.conf.request,
					r = t._path,
					a = e.split.split(""),
					i = r.length,
					n = t._block,
					c = function o(t, e, r) {
						var n = {};
						if(n[t[0]] = [], t.length > 1) {
							for(var c in e)
								if(e.hasOwnProperty(c)) {
									n[t[0]].push(c);
									var s = o(t.slice(1), e[c], r + 1);
									for(var u in s) s.hasOwnProperty(u) && (n[u] || (n[u] = []), n[u].push(s[u]))
								}
						} else {
							var p = 0;
							for(var l in e) {
								if(e.hasOwnProperty(l)) {
									n[t[0]].push(l);
									var f = 0;
									for(var m in e[l]) e[l].hasOwnProperty(m) && (n[m] || (n[m] = []), n[m][p] = e[l][m], f++)
								}
								p++
							}
							for(var g in n) n[g].length !== p && (n[g].length = p)
						}
						for(var d in n) n.hasOwnProperty(d) && (n[d] = n[d].join(a[i - r - 1]));
						return n
					};
				return c(r, n, 0)
			},
			_do: function(t, e) {
				var a = this,
					i = e || a._stack,
					n = r.JSON.stringify(t);
				a[n] = !1;
				var c = t || a._getPara();
				if(e && "taobao" === e[0].dycfg.request) var o = "//tce.taobao.com/api/mget.htm",
					s = "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.taobao.com/api/mget.htm";
				else if(e && "alicdn" === e[0].dycfg.request) var o = "//tce.alicdn.com/api/mget.htm",
					s = "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.alicdn.com/api/mget.htm";
				else var o = a.conf.request.url,
					s = a.conf.request.backupUrl;
				var u, p = function l(e) {
					a._assign(e, i, function() {
						JSTracker2.push({
							msg: r.JSON.stringify(c) + "|| result empty"
						}), s ? a._get(c, s, l, function() {
							a._assign({}, i, function() {}, t), JSTracker2.push({
								msg: r.JSON.stringify(c) + "|| dispatch error"
							})
						}) : a._assign({}, i, function() {}, t), a[n] = !0
					}, t)
				};
				window.InitModeAjaxInTmsPreview && (u = !0), i && i[0] && i[0].dycfg && "mtop" === i[0].dycfg.mode && !u && r.MTop ? a._mtopGet(c, o, p, function() {
					JSTracker2.push({
						msg: r.JSON.stringify(c) + "|| mtop error"
					}), s ? a._get(c, s, p, function() {
						a._assign({}, i, function() {}, t), JSTracker2.push({
							msg: r.JSON.stringify(c) + "|| dispatch error"
						})
					}) : a._assign({}, i, function() {}, t), a[n] = !0
				}) : a._get(c, o, p, function() {
					JSTracker2.push({
						msg: r.JSON.stringify(c) + "|| ajax error"
					}), s ? a._get(c, s, p, function() {
						a._assign({}, i, function() {}, t), JSTracker2.push({
							msg: r.JSON.stringify(c) + "|| dispatch error"
						})
					}) : a._assign({}, i, function() {}, t), a[n] = !0
				}), e || (a._init(), clearTimeout(a._timer))
			},
			_mtopGet: function(t, e, a, i) {
				try {
					location.search.indexOf("testTcePre=true") > -1 ? (lib.mtop.config.prefix = "api", lib.mtop.config.subDomain = "wapa", lib.mtop.config.mainDomain = "taobao.com") : t.env && t.env.indexOf("debug") > -1 && /\.alibaba-inc\./i.test(location.hostname) ? (lib.mtop.config.prefix = "api.m", lib.mtop.config.subDomain = "tms", lib.mtop.config.mainDomain = "alibaba-inc.com") : t.env && t.env.indexOf("pre") > -1 && /\wapa.taobao\./i.test(location.hostname) && (lib.mtop.config.prefix = "api", lib.mtop.config.subDomain = "m", lib.mtop.config.mainDomain = "taobao.com");
					var n = r.clone(t);
					"kimi" === r.version && (n.src = "phone");
					var c = r.JSON.stringify(n);
					r.MTop.request({
						AntiCreep: !0,
						api: "mtop.taobao.tceget.xget",
						v: "1.0",
						data: {
							d: c
						},
						ecode: 0,
						dataType: "jsonp",
						timeout: 2e4
					}, function(t) {
						a && a(t.data)
					}, function(t) {
						i && i()
					})
				} catch(o) {
					i && i()
				}
			},
			_get: function(t, e, a, i) {
				var n = this,
					c = (n.conf.request.jsonp.callback, function(t) {
						var e = [];
						for(var r in t) {
							var a = t[r];
							e.push(r + "=" + a)
						}
						return e.join("&")
					});
				if(n._stack.length > 0) var o = n._stack[0].dycfg.cacheTime;
				else var o = !1;
				if(o && e.indexOf("dispatch") < 0) var s = n._getCbName(t, e, o);
				else var s = "jsonp" + r.guid();
				var u = {};
				return "kimi" === r.version && (u.src = "phone"), r.sufei(function() {
					r.ajax({
						url: e + (e.indexOf("?") < 0 ? "?" : "&") + c(t),
						data: u,
						dataType: "jsonp",
						jsonpCallback: s,
						cache: !0,
						scriptCharset: "utf-8",
						timeout: n.conf.request.timeout,
						crossDomain: !0,
						success: function(t) {
							a && a(t)
						},
						error: function() {
							i && i()
						}
					})
				}), n
			},
			_getCbName: function(t, e, a) {
				var i = "jsonp";
				try {
					for(var n = t.tce_sid.split(","), c = 0, o = n.length; c < o; c++) i += n[c].slice(-2);
					var s = e.indexOf("dispatch") > -1 ? "d" : "n";
					i += s, i += parseInt(+new Date / a / 1e3)
				} catch(u) {
					i += r.guid()
				}
				return i
			},
			_assign: function(t, e, a, i) {
				var n, c, o, s, u, p, l, f, m = this,
					g = m.conf.response,
					d = g.convert,
					h = g.path.split("."),
					y = m.conf.request.backupUrl,
					_ = (r.JSON.stringify(i), !1);
				if(d && d.path) {
					s = d.path.split("."), u = t;
					for(var v in s) u = u[s[v]];
					o = {};
					for(var v in s) {
						var b = s[v];
						o[m._valResponse(b, d.key)] = b
					}
					t = o
				}
				l = t.context && t.context.time || (new Date).getTime() + "";
				try {
					var k = location.search.match(new RegExp("[?&]scheduleDate=([^&]*)(&?)", "i"));
					if(k && k[1]) {
						var f = decodeURIComponent(k[1]),
							A = f.replace(/-/g, "/");
						l = new Date(A).getTime() + ""
					}
				} catch(S) {}
				for(n = 0; n < e.length; n += 1) {
					for(o = t || [], c = 0; c < h.length; c += 1) o = o[m._val(e[n].para, h[c])] || [], 1 === c && (p = o.success);
					if(e[n].count && (o = r.isArray(o) ? o.splice(0, e[n].count) : []), r.isFunction(e[n].cb))
						if(m[r.JSON.stringify(i)]) m._resultSuccess[r.JSON.stringify(e[n].para)] || (e[n].cb(o, l), m._resultSuccess[r.JSON.stringify(e[n].para)] = "success");
						else {
							o.length, m._resultSuccess[r.JSON.stringify(e[n].para)], e[n].dycfg.backup;
							o.length > 0 && !m._resultSuccess[r.JSON.stringify(e[n].para)] ? (e[n].cb(o, l), m._resultSuccess[r.JSON.stringify(e[n].para)] = "success") : 0 === o.length && e[n].dycfg.backup === !1 ? (e[n].cb(o, l), m._resultSuccess[r.JSON.stringify(e[n].para)] = "success") : 0 === o.length && p && "true" === p ? (e[n].cb(o, l), m._resultSuccess[r.JSON.stringify(e[n].para)] = "success") : 0 === o.length && e[n].dycfg.backup && (y ? _ = !0 : (e[n].cb(o, l), m._resultSuccess[r.JSON.stringify(e[n].para)] = "success"))
						}
				}
				_ && a && a()
			}
		}, t = e
	}(), kgXctrl6103SrcModBaseApiKissy = function(exports) {
		window.__sufei_injected__ || KISSY.getScript("//g.alicdn.com/sd/sufei/0.2.4/app/common/sufei-kissy.js");
		var version = KISSY && KISSY.version,
			BaseApi = kgXctrl6103SrcBaseApi,
			LabApi, LabApi = {
				merge: "KISSY.merge",
				mix: "KISSY.mix",
				guid: "KISSY.guid",
				clone: "KISSY.clone"
			};
		for(var key in LabApi) BaseApi[key] = eval(LabApi[key]);
		var IO = io,
			JSON = json;
		return BaseApi.JSON = JSON, BaseApi.ajax = function(t) {
			return IO(t)
		}, BaseApi.sufei = function(t) {
			t && t()
		}, BaseApi.version = "kissy", window.XctrlBaseApi = BaseApi, exports
	}(), kgXctrl6103SrcApi = function(t) {
		var e = kgXctrl6103SrcGetHelper,
			r = {},
			a = {
				add: function(t, a) {
					return r[t] = new e(a), r[t]
				},
				use: function(t) {
					return r[t]
				},
				GetHelper: e
			};
		if(a.add("tcepre", {
				request: {
					timeout: 5,
					url: "//tce.taobao.org/api/teg.htm",
					parameters: {
						tce_sid: "${tce_sid}",
						tce_vid: "${tce_vid}",
						env: "${env}",
						tid: "${tid}",
						tab: "${tab}",
						topic: "${topic}",
						count: "${count}"
					},
					charset: "utf-8"
				},
				response: {
					path: "result"
				}
			}), a.add("tceplus", {
				request: {
					timeout: 5,
					url: "//tce.taobao.com/api/teg.htm",
					backupUrl: "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.taobao.com/api/teg.htm",
					parameters: {
						tce_sid: "${tce_sid}",
						tce_vid: "${tce_vid}",
						tid: "${tid}",
						tab: "${tab}",
						topic: "${topic}",
						count: "${count}"
					},
					charset: "utf-8"
				},
				response: {
					path: "result"
				}
			}), a.add("tcedaily", {
				request: {
					timeout: 5,
					url: "//tce.daily.taobao.net/api/mget.htm",
					parameters: {
						tce_sid: "${tce_sid}",
						tce_vid: "${tce_vid}",
						tid: "${tid}",
						env: "${env}",
						tab: "${tab}",
						topic: "${topic}",
						count: "${count}"
					},
					mergeKey: "tce_sid",
					mergeCount: "count",
					charset: "utf-8"
				},
				response: {
					path: "result.${tce_sid}.result"
				}
			}), window.g_config && 6 == window.g_config.appId) {
			var i = {
				request: {
					timeout: 5,
					cacheTime: 60,
					url: "//tce.alicdn.com/api/mget.htm",
					parameters: {
						tce_sid: "${tce_sid}",
						tce_vid: "${tce_vid}",
						tid: "${tid}",
						tab: "${tab}",
						env: "${env}",
						topic: "${topic}",
						count: "${count}"
					},
					mergeKey: "tce_sid",
					mergeCount: "count",
					charset: "utf-8"
				},
				response: {
					path: "result.${tce_sid}.result"
				}
			};
			/testDispath=true/.test(location.search) && (i.request.backupUrl = "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.alicdn.com/api/mget.htm"), a.add("tceinner", i), a.add("tceonline", {
				request: {
					timeout: 5,
					url: "//tce.alicdn.com/api/mget.htm",
					backupUrl: "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.alicdn.com/api/mget.htm",
					parameters: {
						tce_sid: "${tce_sid}",
						tce_vid: "${tce_vid}",
						tid: "${tid}",
						tab: "${tab}",
						topic: "${topic}",
						count: "${count}"
					},
					cacheTime: 60,
					mergeKey: "tce_sid",
					mergeCount: "count",
					charset: "utf-8"
				},
				response: {
					path: "result.${tce_sid}.result"
				}
			})
		} else a.add("tceinner", {
			request: {
				timeout: 5,
				url: "//tce.taobao.org/api/mget.htm",
				parameters: {
					tce_sid: "${tce_sid}",
					tce_vid: "${tce_vid}",
					tid: "${tid}",
					tab: "${tab}",
					env: "${env}",
					topic: "${topic}",
					count: "${count}"
				},
				charset: "utf-8"
			},
			response: {
				path: "result.${tce_sid}.result"
			}
		}), a.add("tceonline", {
			request: {
				timeout: 5,
				url: "https://tce.taobao.com/api/mget.htm",
				backupUrl: "https://www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.taobao.com/api/mget.htm",
				parameters: {
					tce_sid: "${tce_sid}",
					tce_vid: "${tce_vid}",
					tid: "${tid}",
					tab: "${tab}",
					topic: "${topic}",
					count: "${count}"
				},
				mergeKey: "tce_sid",
				mergeCount: "count",
				charset: "utf-8"
			},
			response: {
				path: "result.${tce_sid}.result"
			}
		});
		return a.add("tcecdn", {
			request: {
				timeout: 5,
				url: "//tce.alicdn.com/api/mget.htm",
				backupUrl: "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=http://tce.alicdn.com/api/mget.htm",
				parameters: {
					tce_sid: "${tce_sid}",
					tce_vid: "${tce_vid}",
					tid: "${tid}",
					tab: "${tab}",
					topic: "${topic}",
					count: "${count}"
				},
				mergeKey: "tce_sid",
				mergeCount: "count",
				charset: "utf-8"
			},
			response: {
				path: "result.${tce_sid}.result"
			}
		}), a.add("tce", {
			request: {
				timeout: 5,
				url: "//tce.taobao.com/api/get.htm",
				backupUrl: "//www.taobao.com/go/rgn/sys/xctrl/dispatch.php?murl=//tce.taobao.com/api/get.htm",
				parameters: {
					tce_sid: "${tce_sid}",
					tid: "${tid}",
					tab: "${tab}",
					topic: "${topic}",
					count: "${count}"
				},
				charset: "utf-8"
			},
			response: {
				path: "result"
			}
		}), t = a
	}(), kgXctrl6103SrcBase = function(exports) {
		function Multi(t) {
			this.init(t)
		}
		var api = kgXctrl6103SrcApi,
			defaultConfig = {
				timeout: 3e3,
				extra: {},
				mode: "mtop",
				backup: !0,
				merge: !0
			},
			BaseApi;
		window.JSTracker2 = window.JSTracker2 || [], window.g_config = window.g_config || {}, window.g_config.jstracker2 = {
			url: "http://xctrl.taobao.net/"
		}, Multi.prototype = {
			init: function(t) {
				var e = this;
				BaseApi = window.XctrlBaseApi || {};
				var t = BaseApi.merge(defaultConfig, t);
				e.cfg = t, e._stringfiyToResult(t)
			},
			_stringfiyToResult: function _stringfiyToResult(conf) {
				var self = this;
				if(window.JSON) var data = BaseApi.isString(conf.data) ? JSON.parse(conf.data) : conf.data;
				else var data = BaseApi.isString(conf.data) ? eval("(" + conf.data + ")") : conf.data;
				var key = conf.key,
					cb = conf.callback,
					p = conf.extra;
				if(self.RequestFind = BaseApi.clone(data), BaseApi.isArray(key))
					if(conf.merge = !0, 0 === key.length) cb(arr);
					else {
						self.keyArrayResult = {}, self.keyArrayIndex = 0, self.keyArrayLength = key.length;
						for(var i = 0, len = key.length; i < len; i++) {
							var sKey = key[i],
								sArr = data[key[i]];
							sArr && self._getData(sArr, sKey, cb, p)
						}
					}
				else if(BaseApi.isString(key)) {
					var arr = data[key];
					arr && BaseApi.isArray(arr) && 0 !== arr.length ? self._getData(arr, key, cb, p) : cb(arr)
				}
			},
			_getData: function(t, e, r, a) {
				for(var i, n = this, c = {}, o = 0, s = t.length; o < s; o++) {
					var u, p, l, f = t[o],
						m = f.data_type,
						g = f.data_para,
						d = f.data_request;
					for(var h in f) BaseApi.isArray(f[h]) && (u = h, p = f[h]);
					if(g = d ? n.checkRely(f) : g, g = a ? BaseApi.merge(g, a) : g, m) {
						if(i = api.use(m)) {
							for(var y in g)
								if(g.hasOwnProperty(y)) {
									try {
										g[y] = unescape(g[y])
									} catch(_) {}
									g[y] = encodeURIComponent(BaseApi.trim(g[y]))
								}
							l = {
								arrs: t,
								request: d,
								next_key: u,
								next_param: p,
								cb_data: c,
								key: e,
								cb: r
							}, i.push(g, function(t, e) {
								n._dataCallback(t, e, l)
							}, n.cfg)
						}
					} else {
						var v = BaseApi.clone(f);
						for(var h in f)
							if(BaseApi.isArray(f[h])) {
								delete v[h];
								for(var y = 0, b = f[h].length; y < b; y++) {
									var k = f[h][y];
									k.data_request = v
								}
							}
					}
				}
				return 0 !== t[0].length && t[0].data_type || (n.keyArrayLength ? (n.keyArrayResult[e] = t, n.keyArrayIndex++, n.keyArrayIndex === n.keyArrayLength && (n.keyArrayResult.timestamp = "", n.keyArrayResult.isDynamic = !1, r && r(n.keyArrayResult))) : (c[e] = t, c.timestamp = "", c.isDynamic = !1, r && r(c))), !1
			},
			_dataCallback: function(t, e, r) {
				var a = this,
					i = r.arrs,
					n = r.request,
					c = r.next_key,
					o = r.next_param,
					s = r.cb_data,
					u = r.key,
					p = r.cb;
				if(t && BaseApi.isArray(t) && 0 !== t.length)
					for(var t = a._GetMsgWhitCommit(t), l = 0, f = t.length; l < f; l++) {
						var m = t[l];
						n && (m.data_request = n), c && (o[0].data_request = BaseApi.clone(m), m[c] = o), i[l] = BaseApi.clone(m)
					} else i = [];
				a.keyArrayLength ? (a.keyArrayResult[u] = i, a.keyArrayIndex++, a.keyArrayIndex === a.keyArrayLength && (a.keyArrayResult.timestamp = e, a.keyArrayResult.isDynamic = !0, p && p(a.keyArrayResult))) : (s[u] = i, s.timestamp = e, s.isDynamic = !0, p && p(s))
			},
			_toEachArr: function(t, e, r) {
				var a = this;
				a.promise[e] = {}, a.promise[e].get = 0, a.promise[e].len = t.length, a._postRequst(t, e, r)
			},
			_GetMsgWhitCommit: function(t) {
				function e(t, e) {
					for(var a, i = 0, n = t.length; i < n; i++) {
						var c = t[i],
							o = !0;
						for(var s in c) BaseApi.isString(c[s]) && e[s] !== c[s] && (o = !1), BaseApi.isArray(c[s]) && (a = s);
						if(o && a) {
							t = c[a];
							break
						}
					}
					if(!o || !a) var t = r(t, e);
					return t
				}

				function r(t, e) {
					for(var r, a = 0, i = t.length; a < i; a++) {
						var n = t[a],
							c = !1;
						for(var o in n) "cat_id" === o && n[o] === e[o] && (c = !0), BaseApi.isArray(n[o]) && (r = o);
						if(c && r) {
							t = n[r];
							break
						}
					}
					return t
				}
				var a = this,
					i = BaseApi.clone(t),
					n = a.RequestFind;
				if(n.moduleinfo) return i;
				if(n.data_request) {
					var c = n.data_request,
						o = e(i, c);
					i = e(o, n)
				} else i = e(i, n);
				return i
			},
			checkRely: function(t) {
				var e = t.data_para;
				for(var r in e) {
					var a = decodeURIComponent(e[r]),
						i = /@/g,
						n = a.match(i),
						c = n ? n.length : 0,
						o = null;
					if(c > 0) {
						for(var s = a.replace(i, ""), u = 0; u < c; u++) o = o ? o.data_request : t.data_request;
						e[r] = o[s]
					}
				}
				return e
			},
			log: function(t) {
				window.console && console.log(t)
			}
		};
		var XCtrl;
		return XCtrl = {
			dynamic: function(t, e, r, a) {
				new Multi(arguments.length > 1 ? {
					data: t,
					key: e,
					callback: r,
					extra: a
				} : arguments[0])
			},
			Dynamic: Multi
		}, exports = XCtrl
	}(), kgXctrl6103XctrlKissy = function(t) {
		var e = kgXctrl6103SrcBase;
		return t = e
	}(), module.exports = kgXctrl6103XctrlKissy
});
define("kg/datalazyload/6.0.10/index", ["dom", "event", "base"], function(t, e, n) {
	var o, a, r = t("dom"),
		i = t("event"),
		c = t("base");
	o = function(t) {
		function e(t) {
			var e;
			try {
				e = window.localStorage && window.localStorage.getItem("webpsupport")
			} catch(o) {}
			return null !== e ? void t("true" === e) : void n(function(e) {
				try {
					window.localStorage.setItem("webpsupport", e)
				} catch(n) {}
				t(e)
			})
		}

		function n(t) {
			var e, n = new Image;
			n.onload = n.onerror = function() {
				e || (e = !0, t(2 === n.width && 2 === n.height))
			}, setTimeout(function() {
				e || (e = !0, t(!1))
			}, 16), n.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
		}

		function o() {
			var t = window;
			if("object" === ("undefined" == typeof localStorage ? "undefined" : a(localStorage))) {
				var e = "test",
					n = window.sessionStorage;
				try {
					return n.setItem(e, "1"), n.removeItem(e), t.__isLocalStorageNameSupported__ = 1, !0
				} catch(o) {
					return t.__isLocalStorageNameSupported__ = -1, !1
				}
			}
		}
		var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			},
			r = window.WebP = {};
		return r.isSupport = function(t) {
			var n = window;
			if(t)
				if(!n.__isLocalStorageNameSupported__ && o(), n.__isLocalStorageNameSupported__ === -1) t(!1);
				else if(1 === n.__isLocalStorageNameSupported__) {
				if(void 0 === r._isSupport) return void e(function(e) {
					r._isSupport = e, t(e)
				});
				t(r._isSupport)
			} else t(!1)
		}, t = r
	}(), a = function(t) {
		function e(t) {
			var e = !!~t.indexOf(".alicdn.com"),
				n = t.indexOf(".jpg") || t.indexOf(".png");
			return e && n && (t += "_.webp"), t
		}

		function n(t) {
			var e, n, o, a = [];
			return function(r, i) {
				return 0 === i || i || (i = 1), 1 & i && !n && (n = !0, t(function(t) {
					for(e = t; o = a.shift();) try {
						o && o.apply(null, [e])
					} catch(n) {
						setTimeout(function() {
							throw n
						}, 0)
					}
				})), e ? (r && r.apply(null, [e]), e) : (2 & i || r && a.push(r), e)
			}
		}

		function a(t, e, n) {
			function o() {
				a && (a.cancel(), a = 0), r = _.now(), t.apply(n || this, arguments), i = _.now()
			}
			var a, r = 0,
				i = 0,
				e = e || 150;
			return _.mix(function() {
				!r || i >= r && _.now() - i > e || i < r && _.now() - r > 8 * e ? o() : (a && a.cancel(), a = _.later(o, e, 0, null, arguments))
			}, {
				stop: function() {
					a && (a.cancel(), a = 0)
				}
			})
		}

		function l(t, e, n) {
			t.style.display = I, t.className = "";
			var o = p.create("<div>");
			t.parentNode.insertBefore(o, t);
			var a = t.value;
			if(_.isFunction(n)) {
				var r = n({
					type: "textarea",
					elem: t,
					value: a
				});
				r && (a = r)
			}
			return p.html(o, a, e), o
		}

		function s(t) {
			return t._ks_lazy_width ? t._ks_lazy_width : (t._ks_lazy_width = p.outerWidth(t), t._ks_lazy_width)
		}

		function u(t) {
			return t._ks_lazy_height ? t._ks_lazy_height : (t._ks_lazy_height = p.outerHeight(t), t._ks_lazy_height)
		}

		function f(t, e, n) {
			if(!t.offsetWidth) return !1;
			var o, a = p.offset(t),
				r = !0,
				i = a.left,
				c = a.top,
				l = {
					left: i,
					top: c,
					right: i + s(t),
					bottom: c + u(t)
				};
			return o = g(e, l), o && n && (r = g(n, l)), r && o
		}

		function d(t, e) {
			var n = this;
			if(!(n instanceof d)) return new d(t, e);
			var o = t;
			_.isPlainObject(o) || (o = e || {}, t && (o.container = t)), d.superclass.constructor.call(n, o), n._callbacks = {}, n._containerIsNotDocument = 9 != n.get("container").nodeType, _.isArray(o.container) && (n._backCompact = 1), n._initLoadEvent(), o.container && n.addElements(o.container), n._loadFn(), _.ready(function() {
				n._loadFn()
			}), n.resume()
		}

		function g(t, e) {
			var n = {};
			return n.top = Math.max(t.top, e.top), n.bottom = Math.min(t.bottom, e.bottom), n.left = Math.max(t.left, e.left), n.right = Math.min(t.right, e.right), n.bottom >= n.top && n.right >= n.left
		}

		function m(t, e, n, o) {
			"img-src" === e && (e = "img"), _.isArray(t) || (t = [p.get(t)]);
			var a = new d(b, {});
			a.set("imgFlag", n || w + k), a.set("areaFlag", n || S + k), a.set("onStart", o), a.set("force", !0), a.addElements(t, e)
		}
		var _ = KISSY,
			p = r,
			h = i,
			v = c,
			y = _.Env.host,
			b = y.document,
			w = "data-ks-lazyload",
			S = "ks-datalazyload",
			k = "-custom",
			A = "default",
			I = "none",
			x = "scroll",
			F = "touchmove",
			z = "resize",
			H = 100,
			N = 0,
			C = function(t, n, a, r, i) {
				n = n || w;
				var c = t.getAttribute(n),
					l = {
						type: "img",
						elem: t,
						src: c
					},
					s = !_.isFunction(a) || a(l) !== !1,
					u = o;
				s && l.src && ! function() {
					var o = function(e) {
						t.src != e && (t.src = e), t.removeAttribute(n)
					};
					_.isFunction(r) ? u.isSupport(function(t) {
						o(t ? r(l.src) : l.src)
					}) : i ? u.isSupport(function(t) {
						o(t ? e(l.src) : l.src)
					}) : o(l.src)
				}()
			};
		return d.ATTRS = {
			diff: {
				value: A
			},
			placeholder: {
				value: "//g.alicdn.com/s.gif"
			},
			execScript: {
				value: !0
			},
			container: {
				setter: function(t) {
					return t = t || b, _.isWindow(t) ? t = t.document : (t = p.get(t), "body" == p.nodeName(t) && (t = t.ownerDocument)), t
				},
				valueFn: function() {
					return b
				}
			},
			autoDestroy: {
				value: !0
			},
			onStart: {
				value: null
			}
		}, _.extend(d, v, {
			_initLoadEvent: function() {
				var t = this,
					e = t.get("autoDestroy");
				t.imgHandle = function() {
					C(this, t.get("imgFlag"), t.get("onStart"), t.get("webpReplacer"), t.get("webp"))
				}, t.textareaHandle = function() {
					t.addElements(l(this, t.get("execScript"), t.get("onStart")))
				}, t._loadFn = a(function() {
					e && 0 == t._counter && _.isEmptyObject(t._callbacks) && t.destroy(), t._loadItems()
				}, H, t)
			},
			refresh: function() {
				this._loadFn()
			},
			_loadItems: function() {
				var t = this,
					e = t.get("container");
				t._containerIsNotDocument && !e.offsetWidth || (t._windowRegion = t._getBoundingRect(), !t._backCompact && t._containerIsNotDocument && (t._containerRegion = t._getBoundingRect(t.get("container"))), _.each(t._callbacks, function(e, n) {
					e && t._loadItem(n, e)
				}))
			},
			_loadItem: function(t, e) {
				var n = this,
					e = e || n._callbacks[t];
				if(!e) return !0;
				var o = e.el,
					a = !1,
					r = e.fn;
				if(n.get("force") || f(o, n._windowRegion, n._containerRegion)) try {
					a = r.call(o)
				} catch(i) {
					setTimeout(function() {
						throw i
					}, 0)
				}
				return a !== !1 && delete n._callbacks[t], a
			},
			addCallback: function(t, e) {
				t = p.get(t);
				var n = this,
					o = n._callbacks,
					a = {
						el: t || document,
						fn: e || _.noop
					},
					r = ++N;
				o[r] = a, n._windowRegion ? n._loadItem(r, a) : n.refresh()
			},
			removeCallback: function(t, e) {
				t = p.get(t);
				var n = this._callbacks;
				_.each(n, function(o, a) {
					o.el == t && (e ? o.fn == e : 1) && delete n[a]
				})
			},
			getElements: function() {
				var t = this,
					e = [],
					n = [],
					o = t._callbacks;
				return _.each(o, function(o) {
					o.fn == t.imgHandle && e.push(o.el), o.fn == t.textareaHandle && n.push(o.el)
				}), {
					images: this._images,
					textareas: this._textareas
				}
			},
			addElements: function(t, e) {
				"string" == typeof t ? t = p.query(t) : _.isArray(t) || (t = [t]);
				var o = this;
				o._counter = o._counter || 0, _.each(t, function(t) {
					e && "img" !== e || _.each(_.filter([t].concat(p.query("img", t)), function(t) {
						return t.getAttribute && t.getAttribute(o.get("imgFlag") || w)
					}, o), function(t) {
						o.onPlaceHolder = o.onPlaceHolder || n(function(t) {
							var e = new Image,
								n = o.get("placeholder");
							e.src = n, e.onload = e.onerror = function() {
								t(n)
							}
						}), t.offsetWidth ? o.addCallback(t, o.imgHandle) : (o._counter++, t.onload = function() {
							o._counter--, o.addCallback(t, o.imgHandle)
						}, t.src || o.onPlaceHolder(function(e) {
							t.src || (t.src = e)
						}))
					}), e && "textarea" !== e || _.each(p.query("textarea." + (o.get("areaFlag") || S), t), function(t) {
						o.addCallback(t, o.textareaHandle)
					})
				})
			},
			removeElements: function(t) {
				"string" == typeof t ? t = p.query(t) : _.isArray(t) || (t = [t]);
				var e = this,
					n = e._callbacks;
				_.each(n, function(e, o) {
					_.inArray(e.el, t) && delete n[o]
				})
			},
			_getBoundingRect: function(t) {
				var e, n, o, a;
				if(void 0 !== t) {
					e = p.outerHeight(t), n = p.outerWidth(t);
					var r = p.offset(t);
					o = r.left, a = r.top
				} else e = p.viewportHeight(), n = p.viewportWidth(), o = p.scrollLeft(), a = p.scrollTop();
				var i = this.get("diff"),
					c = i === A ? n : i,
					l = 0,
					s = c,
					u = i === A ? e : i,
					f = 0,
					d = u,
					g = o + n,
					m = a + e;
				return _.isObject(i) && (l = i.left || 0, s = i.right || 0, f = i.top || 0, d = i.bottom || 0), o -= l, g += s, a -= f, m += d, {
					left: o,
					top: a,
					right: g,
					bottom: m
				}
			},
			pause: function() {
				var t = this,
					e = t._loadFn;
				if(!t._destroyed && (h.remove(y, x, e), h.remove(y, F, e), h.remove(y, z, e), e.stop(), t._containerIsNotDocument)) {
					var n = t.get("container");
					h.remove(n, x, e), h.remove(n, F, e)
				}
			},
			resume: function() {
				var t = this,
					e = t._loadFn;
				if(!t._destroyed && (h.on(y, x, e), h.on(y, F, e), h.on(y, z, e), t._containerIsNotDocument)) {
					var n = t.get("container");
					h.on(n, x, e), h.on(n, F, e)
				}
			},
			destroy: function() {
				var t = this;
				t.pause(), t._callbacks = {}, t.fire("destroy"), t._destroyed = 1
			}
		}), d.loadCustomLazyData = m, _.DataLazyload = d, t = d
	}(), n.exports = a
}); /* 2016-05-06 10:57:52 */
! function e(t, n, i) {
	function r(o, a) {
		if(!n[o]) {
			if(!t[o]) {
				var u = "function" == typeof require && require;
				if(!a && u) return u(o, !0);
				if(s) return s(o, !0);
				throw new Error("Cannot find module '" + o + "'")
			}
			var c = n[o] = {
				exports: {}
			};
			t[o][0].call(c.exports, function(e) {
				var n = t[o][1][e];
				return r(n ? n : e)
			}, c, c.exports, e, t, n, i)
		}
		return n[o].exports
	}
	for(var s = "function" == typeof require && require, o = 0; o < i.length; o++) r(i[o]);
	return r
}({
	1: [function(e, t, n) {
		function i(e) {
			return this instanceof i || !l(e) ? void 0 : s(e)
		}

		function r(e) {
			var t, n;
			for(t in e) n = e[t], i.Mutators.hasOwnProperty(t) ? i.Mutators[t].call(this, n) : this.prototype[t] = n
		}

		function s(e) {
			return e.extend = i.extend, e.implement = r, e
		}

		function o() {}

		function a(e, t, n) {
			for(var i in t)
				if(t.hasOwnProperty(i)) {
					if(n && -1 === d(n, i)) continue;
					"prototype" !== i && (e[i] = t[i])
				}
		}
		t.exports = i, i.create = function(e, t) {
			function n() {
				e.apply(this, arguments), this.constructor === n && this.initialize && this.initialize.apply(this, arguments)
			}
			return l(e) || (t = e, e = null), t || (t = {}), e || (e = t.Extends || i), t.Extends = e, e !== i && a(n, e, e.StaticsWhiteList), r.call(n, t), s(n)
		}, i.extend = function(e) {
			return e || (e = {}), e.Extends = this, i.create(e)
		}, i.Mutators = {
			Extends: function(e) {
				var t = this.prototype,
					n = u(e.prototype);
				a(n, t), n.constructor = this, this.prototype = n, this.superclass = e.prototype
			},
			Implements: function(e) {
				f(e) || (e = [e]);
				for(var t, n = this.prototype; t = e.shift();) a(n, t.prototype || t)
			},
			Statics: function(e) {
				a(this, e)
			}
		};
		var u = Object.__proto__ ? function(e) {
				return {
					__proto__: e
				}
			} : function(e) {
				return o.prototype = e, new o
			},
			c = Object.prototype.toString,
			f = Array.isArray || function(e) {
				return "[object Array]" === c.call(e)
			},
			l = function(e) {
				return "[object Function]" === c.call(e)
			},
			d = Array.prototype.indexOf ? function(e, t) {
				return e.indexOf(t)
			} : function(e, t) {
				for(var n = 0, i = e.length; i > n; n++)
					if(e[n] === t) return n;
				return -1
			}
	}, {}],
	2: [function(e, t, n) {
		t.exports = {
			app: "kissy",
			style: "app/common/sufei-tb.css"
		}
	}, {}],
	3: [function(e, t, n) {
		var i = {},
			r = {};
		i.on = function(e, t) {
			var n = r[e] || (r[e] = []);
			return n.push(t), i
		}, i.off = function(e, t) {
			if(!e && !t) return r = {}, i;
			var n = r[e];
			if(n)
				if(t)
					for(var s = n.length - 1; s >= 0; s--) n[s] === t && n.splice(s, 1);
				else delete r[e];
			return i
		}, i.fire = function(e, t) {
			var n = r[e];
			if(n) {
				n = n.slice();
				for(var s = 0, o = n.length; o > s; s++) n[s](t)
			}
			return i
		}, t.exports = i
	}, {}],
	4: [function(e, t, n) {
		var i = e("./mod/sufei-kissy"),
			r = e("./config/sufei-kissy");
		screen.width < 800 && (r.style = "app/common/sufei-h5.css");
		var s = "0.1.0";
		r.version = s, r.style = "//g.alicdn.com/sd/sufei/" + s + "/" + r.style, new i(r), window.__sufei_injected__ = 1
	}, {
		"./config/sufei-kissy": 2,
		"./mod/sufei-kissy": 7
	}],
	5: [function(e, t, n) {
		t.exports = function() {
			"use strict";
			var e, t, n, i, r = {
					'"': '"',
					"\\": "\\",
					"/": "/",
					b: "\b",
					f: "\f",
					n: "\n",
					r: "\r",
					t: "	"
				},
				s = function(t) {
					throw {
						name: "SyntaxError",
						message: t,
						at: e,
						text: n
					}
				},
				o = function(i) {
					return i && i !== t && s("Expected '" + i + "' instead of '" + t + "'"), t = n.charAt(e), e += 1, t
				},
				a = function() {
					var e, n = "";
					for("-" === t && (n = "-", o("-")); t >= "0" && "9" >= t;) n += t, o();
					if("." === t)
						for(n += "."; o() && t >= "0" && "9" >= t;) n += t;
					if("e" === t || "E" === t)
						for(n += t, o(), ("-" === t || "+" === t) && (n += t, o()); t >= "0" && "9" >= t;) n += t, o();
					return e = +n, isFinite(e) ? e : void s("Bad number")
				},
				u = function() {
					var e, n, i, a = "";
					if('"' === t)
						for(; o();) {
							if('"' === t) return o(), a;
							if("\\" === t)
								if(o(), "u" === t) {
									for(i = 0, n = 0; 4 > n && (e = parseInt(o(), 16), isFinite(e)); n += 1) i = 16 * i + e;
									a += String.fromCharCode(i)
								} else {
									if("string" != typeof r[t]) break;
									a += r[t]
								}
							else a += t
						}
					s("Bad string")
				},
				c = function() {
					for(; t && " " >= t;) o()
				},
				f = function() {
					switch(t) {
						case "t":
							return o("t"), o("r"), o("u"), o("e"), !0;
						case "f":
							return o("f"), o("a"), o("l"), o("s"), o("e"), !1;
						case "n":
							return o("n"), o("u"), o("l"), o("l"), null
					}
					s("Unexpected '" + t + "'")
				},
				l = function() {
					var e = [];
					if("[" === t) {
						if(o("["), c(), "]" === t) return o("]"), e;
						for(; t;) {
							if(e.push(i()), c(), "]" === t) return o("]"), e;
							o(","), c()
						}
					}
					s("Bad array")
				},
				d = function() {
					var e, n = {};
					if("{" === t) {
						if(o("{"), c(), "}" === t) return o("}"), n;
						for(; t;) {
							if(e = u(), c(), o(":"), Object.hasOwnProperty.call(n, e) && s('Duplicate key "' + e + '"'), n[e] = i(), c(), "}" === t) return o("}"), n;
							o(","), c()
						}
					}
					s("Bad object")
				};
			return i = function() {
					switch(c(), t) {
						case "{":
							return d();
						case "[":
							return l();
						case '"':
							return u();
						case "-":
							return a();
						default:
							return t >= "0" && "9" >= t ? a() : f()
					}
				},
				function(r, o) {
					var a;
					return n = r, e = 0, t = " ", a = i(), c(), t && s("Syntax error"), "function" == typeof o ? function u(e, t) {
						var n, i, r = e[t];
						if(r && "object" == typeof r)
							for(n in r) Object.prototype.hasOwnProperty.call(r, n) && (i = u(r, n), void 0 !== i ? r[n] = i : delete r[n]);
						return o.call(e, t, r)
					}({
						"": a
					}, "") : a
				}
		}()
	}, {}],
	6: [function(e, t, n) {
		function i(e) {
			try {
				var t, n, i = e.data.split(a);
				i.length > 1 ? (t = i[0], n = i[1]) : (i = r(i[0]), t = i.type, n = i.content);
				for(var s = 0, o = l.length; o > s; s++) l[s].event === t && l[s].callback(n)
			} catch(u) {}
		}

		function r(e) {
			return o ? o(e) : s(e)
		}
		var s = e("./json_parse"),
			o = window.JSON && JSON.parse,
			a = "@=_=@",
			u = null,
			c = null,
			f = null,
			l = [],
			d = {
				uid: 0,
				hid: -1,
				q: [],
				tm: 0,
				postMessage: function(e, t) {
					var n = ++d.uid,
						i = d.q,
						r = {
							name: +new Date + "" + n + "^" + document.domain + "&" + t,
							uid: n,
							target: e
						};
					i.push(r), d.tm || (d.tm = setInterval(function() {
						var e = d.q;
						if(!(0 === e.length || e[0].uid <= d.hid)) {
							var t = e[0];
							d.hid = t.uid, t.target.name = t.name
						}
					}, 10))
				},
				ListenerMessage: function(e, t) {
					function n() {
						if(!e) return !1;
						var n = e.name;
						if(n !== i) {
							d.q.shift(), i = n;
							var s = r.exec(n);
							if(!s) return;
							t && t({
								origin: s[2],
								data: s[3]
							})
						}
					}
					var i = "",
						r = /^(\d+?)\^(.+?)&(.*?)$/;
					setInterval(n, 10)
				}
			};
		window.SufeiMessenger = t.exports = {
			initListener: function(e) {
				u = e.currentWin, c = e.originWin, f = e.msgTransfer, u && c && f && (u.postMessage ? u.addEventListener ? u.addEventListener("message", i, !1) : u.attachEvent && u.attachEvent("onmessage", i) : "fromFrame" == f ? d.ListenerMessage(c, i) : d.ListenerMessage(u, i))
			},
			register: function(e, t) {
				l.push({
					event: e,
					callback: t
				})
			},
			send: function(e) {
				var t = e.type + a + e.content;
				u && c && f && (c.postMessage ? c.postMessage(t, "*") : "fromFrame" == f ? d.postMessage(c, t) : d.postMessage(u, t, "*"))
			}
		}
	}, {
		"./json_parse": 5
	}],
	7: [function(e, t, n) {
		function i(e) {
			return function(t) {
				return {}.toString.call(t) == "[object " + e + "]"
			}
		}

		function r(e) {
			var t = e.dataType;
			g(t) && (/script/.test(t.join("")) ? e.dataType = "jsonp" : e.dataType = "json")
		}
		var s, o, a = e("../emit"),
			u = e("../sufei-base"),
			c = window,
			f = [].slice,
			l = c.$ && c.$.__io__ ? c.$ : null,
			d = c.KISSY || l,
			p = null,
			v = null,
			g = (i("String"), Array.isArray || i("Array")),
			h = u.extend({
				initialize: function(e) {
					var t = this;
					a.on("event:cleanHijackQueue@sufei", function() {
						for(var e, n, i, r = [t.currentRequest].concat(t.queue), s = 0; s < r.length; s++) r[s] && (n = r[s].sufeiData, e = n && n.defer, i = n && n.response, e && o.apply(e, [i]))
					}), h.superclass.initialize.call(t, e), d && (d.use ? d.use(d.version >= "1.4" ? "io,promise" : "ajax", function(e, n, i) {
						p = n, v = d.Defer || i.Defer, s = v.prototype.resolve, o = v.prototype.reject, t.setup()
					}) : (p = d.__io__, v = d.__promise__.Defer, s = v.prototype.resolve, o = v.prototype.reject, t.setup()))
				},
				setup: function() {
					var e = this;
					p.on("start", function(t) {
						var n = t.ajaxConfig || t.io && (t.io.cfg || t.io.config) || {},
							i = t.io,
							r = i && (i.defer || i._defer),
							o = n.dataType;
						if(g(o) && (o = o.join("")), /json|\*/.test(o)) {
							var a = n.success;
							n.success = function(t, i, o) {
								var u = e.validate(t);
								u.pass ? (a && a.apply(n.context || n, arguments), n.sufeiData && n.sufeiData.defer && s.apply(n.sufeiData.defer, [f.call(arguments)])) : ("string" == typeof t && (t = u.result), e.run({
									url: t.url,
									config: d.merge({
										sufeiData: {
											defer: r,
											response: f.call(arguments)
										}
									}, n),
									im: u.immediate
								}))
							}, r && d.version >= "1.4" && (r.resolve = function(t) {
								var n = e.validate(t && t[0]);
								n.pass && s.apply(r, [t])
							})
						}
					})
				},
				getValidateURI: function(e) {
					var t = this;
					new p({
						url: e,
						dataType: "jsonp",
						sufei: !0,
						success: function(e) {
							t.status = 200, a.fire("event:showDialog@sufei", e.url)
						}
					})
				},
				resendRequest: function(e) {
					var t = this;
					if(p) {
						var n = [t.currentRequest];
						d.each(n.concat(t.queue), function(n, i) {
							r(n), n.url = t.addQueryToken(n.url, e), new p(n)
						}), t.reset()
					}
				}
			});
		t.exports = h
	}, {
		"../emit": 3,
		"../sufei-base": 8
	}],
	8: [function(e, t, n) {
		function i() {
			var e = u.createElement("b");
			return e.innerHTML = "<!--[if lte IE 7]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
		}

		function r(e) {
			return g ? g(e) : v(e)
		}

		function s(e, t) {
			function n() {
				i.onload = i.onreadystatechange = null, i = null, t()
			}
			e || t && t();
			var i = u.createElement("link");
			i.charset = "utf-8", i.rel = "stylesheet", i.href = e;
			var r = "onload" in i;
			m && !r && setTimeout(function() {
				o(i, t)
			}, 1), r ? i.onload = n : i.onreadystatechange = function() {
				/loaded|complete/.test(i.readyState) && n()
			}, c.appendChild(i), u.createStyleSheet && u.createStyleSheet(e)
		}

		function o(e, t) {
			var n, i = e.sheet;
			if(m) i && (n = !0);
			else if(i) try {
				i.cssRules && (n = !0)
			} catch(r) {
				"NS_ERROR_DOM_SECURITY_ERR" === r.name && (n = !0)
			}
			setTimeout(function() {
				n ? t() : o(e, t)
			}, 20)
		}
		var a = window,
			u = document,
			c = u.head || u.getElementsByTagName("head")[0] || u.documentElement,
			f = a.navigator.userAgent,
			l = e("./emit"),
			d = e("./class"),
			p = e("./messenger"),
			v = e("./json_parse"),
			g = a.JSON && JSON.parse,
			h = function() {},
			m = +f.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536,
			y = /iphone|ipad|ipod/.test(f.toLowerCase()),
			w = "rgv587_flag",
			_ = "sm";
		t.exports = d.create({
			initialize: function(e) {
				var t = this;
				e = e || {}, t.app = e.app || "", t.version = e.version || "", t.style = e.style || "", t.dialog = null, t.reset(), t.listen()
			},
			reset: function() {
				var e = this;
				e.currentRequest = null, e.queue = [], e.status = 0
			},
			listen: function() {
				var e = this;
				l.on("event:cleanHijackQueue@sufei", function() {
					e.reset()
				}), l.on("event:showDialog@sufei", function(t) {
					e.dialog ? e.show(t) : s(e.style, function() {
						e.render(t), e.show()
					})
				}), l.on("msg:validateSuccess@sufei", function(t) {
					e.resendRequest(t), e.hide(), p.send({
						type: "msg:resetCheckCode@sufei",
						content: ""
					})
				})
			},
			initMessenger: function(e) {
				var t = this;
				p.initListener({
					currentWin: a,
					originWin: e,
					msgTransfer: "fromFrame"
				}), p.register("msg:validateSuccess@sufei", function(e) {
					l.fire("msg:validateSuccess@sufei", e)
				}), p.register("child", function(e) {
					e = r(decodeURIComponent(e));
					var n = t.validate(e);
					n.pass ? e.queryToken ? l.fire("msg:validateSuccess@sufei", e.queryToken) : t.hide() : l.fire("event:showDialog@sufei", e.url)
				})
			},
			show: function(e) {
				var t = this;
				e && t.frame.src != e && (t.frame.src = e), t.dialog && (t.dialog.style.display = "block"), p.send({
					type: "msg:refreshCheckCode@sufei",
					content: ""
				}), l.fire("event:dialogShow@sufei")
			},
			hide: function() {
				l.fire("event:cleanHijackQueue@sufei"), this.dialog && (this.dialog.style.display = "none"), l.fire("event:dialogHide@sufei")
			},
			render: function(e) {
				var t = this,
					n = u.createElement("div");
				n.style.display = "none", t.app ? n.className = "sufei-dialog sufei-dialog-" + t.app : n.className = "sufei-dialog", n.innerHTML = ['<div class="sufei-dialog-mask">', i() ? '<iframe frameborder="none" src="javascript:\'\'"></iframe>' : "", "</div>", '<div class="sufei-dialog-content">', '<iframe id="sufei-dialog-content" frameborder="none" src="' + e + '"></iframe>', '<div class="sufei-dialog-close" id="sufei-dialog-close">\u5173\u95ed</div>', "</div>"].join(""), u.body.appendChild(n);
				var r = u.getElementById("sufei-dialog-close");
				r.addEventListener ? r.addEventListener("click", function() {
					t.hide()
				}, !1) : r.attachEvent("onclick", function() {
					return t.hide(), !1
				}), t.dialog = n, t.frame = u.getElementById("sufei-dialog-content"), t.initMessenger(t.frame.contentWindow), y && t.iosFix(), t.render = function() {}
			},
			iosFix: function() {
				var e = u.body,
					t = "sufei-ios-fix-fixed",
					n = 0,
					i = this.dialog;
				e.classList.add(t), l.on("event:dialogShow@sufei", function() {
					n = e.scrollTop, e.scrollTop = 0, i.style.height = e.scrollHeight + "px", setTimeout(function() {
						e.scrollTop = 0
					}, 200)
				}), l.on("event:dialogHide@sufei", function() {
					e.scrollTop = n
				})
			},
			validate: function(e) {
				if("string" == typeof e) try {
					e = r(e)
				} catch(t) {
					return {
						pass: !0
					}
				}
				return !e || e[w] !== _ && e[w + "0"] !== _ ? {
					pass: !0
				} : {
					result: e,
					pass: !1,
					immediate: e[w] === _
				}
			},
			run: function(e) {
				var t = this;
				return t.status > 0 && !e.config.sufei ? void t.queue.push(e.config) : void(e.im ? (t.currentRequest = t.currentRequest || e.config, t.status = 200, l.fire("event:showDialog@sufei", e.url)) : (t.currentRequest = e.config, t.status = 100, t.getValidateURI(e.url)))
			},
			setup: h,
			getValidateURI: h,
			resendRequest: h,
			addQueryToken: function(e, t) {
				return e += /\?/.test(e) ? "&" + t : "?" + t
			},
			parseJSON: r
		})
	}, {
		"./class": 1,
		"./emit": 3,
		"./json_parse": 5,
		"./messenger": 6
	}]
}, {}, [4]);
define("kg/offline/7.0.1/index", ["json", "util", "base"], function(e, t, n) {
	var i, r, s = e("json"),
		a = e("util"),
		u = e("base");
	i = function(e) {
		var t, n, i = s,
			r = a,
			u = {},
			c = "DEADLINE-KEY";
		return r.mix(u, {
			init: function() {
				var e, r, s = (new Date).getTime();
				t = localStorage, n = i.parse(t.getItem(c)) || {};
				for(var a in n) n.hasOwnProperty(a) && (e = parseInt(n[a], 10), r = e - s, r <= 0 ? (this.removeItem(a), delete n[a], this._saveDeadLine()) : this._deadlineKey(a, r));
				return this
			},
			setItem: function(e, i, r) {
				if(r) {
					var s = parseInt(r, 10),
						a = (new Date).getTime();
					n[e] = s + a, this._deadlineKey(e, s), this._saveDeadLine()
				}
				return t.setItem(e, i), !0
			},
			getItem: function(e) {
				return t.getItem(e)
			},
			removeItem: function(e) {
				return t.removeItem(e), delete n[e], this._saveDeadLine(), !this.getItem(e)
			},
			clear: function() {
				return t.clear(), 0 === this.size()
			},
			size: function() {
				var e = t.length;
				return t[c] ? e - 1 : e
			},
			getAll: function(e) {
				for(var n, r = t.length, s = {}, a = 0; a < r; a++) n = t.key(a), s[n] = t.getItem(n), n === c && delete s[n];
				return e ? s : i.stringify(s)
			},
			timeRemain: function(e) {
				return t[e] ? e in n ? n[e] - (new Date).getTime() : -1 : 0
			},
			usedByte: function() {
				var e = this.getAll().length;
				return t[c] && (e += i.stringify(n).length, e += c.length), e
			},
			_deadlineKey: function(e, i) {
				var s = this;
				r.later(function() {
					t.removeItem(e), delete n[e], s._saveDeadLine()
				}, i)
			},
			_saveDeadLine: function() {
				t.setItem(c, i.stringify(n))
			}
		}), e = u
	}(), r = function(e) {
		function t() {
			t.superclass.constructor.call(this)
		}
		var n = i,
			r = u,
			s = a;
		return n.init(), s.extend(t, r, {
			setItem: function(e, t, i) {
				var r = parseInt(i, 10);
				if(!s.isString(e) || !s.isString(t) || "" === s.trim(e)) return !1;
				try {
					return n.setItem(e, t, r)
				} catch(a) {
					return !1
				}
			},
			getItem: function(e) {
				if(!s.isString(e)) return null;
				try {
					return n.getItem(e)
				} catch(t) {}
			},
			removeItem: function(e) {
				if(!s.isString(e)) return !1;
				try {
					return n.removeItem(e)
				} catch(t) {}
			},
			clear: function() {
				s.Offline.fire("clear");
				try {
					return n.clear()
				} catch(e) {}
			},
			getAll: function(e) {
				try {
					return n.getAll(e)
				} catch(t) {}
			},
			size: function() {
				try {
					return n.size()
				} catch(e) {}
			},
			timeRemain: function(e) {
				if(!s.isString(e)) return !1;
				try {
					return n.timeRemain(e)
				} catch(t) {}
			},
			usedByte: function() {
				try {
					return n.usedByte()
				} catch(e) {}
			}
		}), s.Offline = new t, e = t
	}(), n.exports = r
});
define("kg/session/0.0.1/index", [], function(n, t, e) {
	var r, i;
	r = function(n) {
		"use strict";
		var t = {};
		return n = {
			save: function(n) {
				for(var t in n) n.hasOwnProperty(t) && this.set(t, n[t])
			},
			set: function(n, e) {
				t[n] = e
			},
			get: function(n) {
				return t[n]
			}
		}
	}(), i = function(n) {
		return n = r
	}(), e.exports = i
});
define("kg/slide/6.0.8/index", ["node", "util", "event", "json", "event-custom", "ua", "anim"], function(e, t, n) {
	var i, a, s, o, r = e("node"),
		l = e("util"),
		c = (e("event"), e("json")),
		u = e("event-custom"),
		d = e("ua");
	e("anim");
	i = function(e) {
		"use strict";
		var t = r,
			n = l,
			i = t;
		return n.augment(i, {
			_delegate: function() {
				var e = this;
				return n.isFunction(arguments[1]) ? e.delegate(arguments[0], arguments[2], arguments[1]) : e.delegate.apply(e, arguments), e
			},
			indexOf: function(e) {
				var i = this;
				if(n.isUndefined(e)) return null;
				e[0] && (e = e[0]);
				var a = 0;
				return i.each(function(n, i) {
					n = t.all(n), n[0] === e && (a = i)
				}), a
			},
			size: function() {
				return this.length
			},
			set: function(e, t) {
				return "innerHTML" === e ? this.html(t) : this.attr(e, t), this
			},
			get: function(e) {
				var t = this,
					n = {
						innerHTML: function() {
							return t.html()
						},
						region: function() {
							return {
								height: t.height(),
								width: t.width()
							}
						}
					};
				return e in n ? n[e]() : void 0
			},
			appendChild: function() {
				return this.append.apply(this, arguments), this
			},
			setStyle: function(e, t) {
				return this.css.apply(this, arguments), this
			},
			setStyles: function(e) {
				return this.css.apply(this, arguments), this
			},
			cloneNode: function() {
				return this.clone.apply(this, arguments)
			}
		}), t.create = function(e) {
			return t(e)
		}, e
	}(), a = function(e) {
		"use strict";
		var t = r,
			n = c;
		return e = {
			setHash: function(e, t) {
				var n, i;
				"object" == typeof e ? (n = window.location.href, t = e) : n = e, n.indexOf("#") < 0 && (n += "#");
				var a = this.getHash(n);
				for(i in t) a[i] = t[i];
				n = n.split("#")[0] + "#";
				for(i in a) n += i + "=" + a[i] + "&";
				return n = n.substr(0, n.length - 1)
			},
			getHash: function(e) {
				var t = e || window.location.href;
				if(t.indexOf("#") < 0) return {};
				var i = t.split("#")[1];
				if("" === i) return {};
				"&" == i[i.length - 1] && (i = i.substr(0, i.length - 1)), i = i.replace(/"/gi, "'"), i = i.replace(/=/gi, '":"'), i = i.replace(/&/gi, '","'), i += '"', i = '{"' + i + "}";
				var a = n.parse(i);
				return a
			},
			_globalEval: function(e) {
				if(e && /\S/.test(e)) {
					var t = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0],
						n = document.createElement("script");
					n.text = e, t.insertBefore(n, t.firstChild), setTimeout(function() {
						t.removeChild(n)
					}, 1)
				}
			},
			execScript: function(e) {
				var n, i, a, s, o, r, l = this,
					c = new RegExp(/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/gi),
					u = t.one("head")[0],
					d = /\ssrc=(['"])(.*?)\1/i,
					h = /\scharset=(['"])(.*?)\1/i;
				for(c.lastIndex = 0; n = c.exec(e);) i = n[1], a = i ? i.match(d) : !1, a && a[2] ? (o = document.createElement("script"), o.src = a[2], (s = i.match(h)) && s[2] && (o.charset = s[2]), o.async = !0, u.appendChild(o)) : (r = n[2]) && r.length > 0 && l._globalEval(r)
			},
			isDaily: function() {
				return /daily\.taobao\.net/.test(window.location.hostname) ? !0 : !1
			},
			getHiddenProp: function() {
				if("hidden" in document) return "hidden";
				for(var e = ["webkit", "moz", "ms", "o"], t = 0; t < e.length; t++)
					if(e[t] + "Hidden" in document) return e[t] + "Hidden";
				return null
			},
			isHidden: function() {
				var e = this.getHiddenProp();
				return e ? document[e] : !1
			}
		}
	}(), s = function(e) {
		"use strict";

		function t(e) {
			var t, i, a, s, r, l, c = new RegExp(/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/gi),
				u = o.one("head")[0],
				d = /\ssrc=(['"])(.*?)\1/i,
				h = /\scharset=(['"])(.*?)\1/i;
			for(c.lastIndex = 0; t = c.exec(e);) i = t[1], a = i ? i.match(d) : !1, a && a[2] ? (r = document.createElement("script"), r.src = a[2], (s = i.match(h)) && s[2] && (r.charset = s[2]), r.async = !0, u.appendChild(r)) : (l = t[2]) && l.length > 0 && n(l)
		}

		function n(e) {
			if(e && /\S/.test(e)) {
				var t = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0],
					n = document.createElement("script");
				n.text = e, t.insertBefore(n, t.firstChild), setTimeout(function() {
					t.removeChild(n)
				}, 1)
			}
		}

		function i() {
			if(!(this instanceof i)) throw new Error('please use "new Slide()"');
			this.init.apply(this, arguments)
		}
		var s = u,
			o = r,
			h = o.all,
			p = c,
			f = d,
			m = l,
			g = a;
		return m.mix(m, g), i.plug = function() {}, m.augment(i, s.Target, {
			init: function(e, t) {
				var n = this;
				if(m.isObject(e)) n.con = e;
				else if(/^#/i.test(e)) n.con = o.one(e);
				else if(o.one("#" + e)) n.con = o.one("#" + e);
				else {
					if(!o.one(e)) throw new Error("Slide Container Hooker not found");
					n.con = o.one(e)
				}
				if(n.buildParam(t), n.buildHTML(), n.bindEvent(), n.fire("ready", {
						index: 0,
						navnode: n.tabs.item(0),
						pannelnode: n.pannels.item(0)
					}), n.reverse) {
					var i;
					i = n.previous, n.previous = n.next, n.next = i
				}
				if(n.carousel)
					for(var a = 0; a < n.colspan; a++) n.fix_for_transition_when_carousel(2 * a);
				return n.fixSlideSize(), n.layerSlide && n.initLayer(), n.stoped = null, n.renderPannelTextarea(n.currentTab), this
			},
			setWrapperSize: function(e) {
				var t = this;
				m.isUndefined(e) && (e = 0), t.pannels = t.con.all("." + t.contentClass + " ." + t.pannelClass), t.length = t.pannels.length;
				var n = {
					none: function() {},
					vSlide: function() {
						var n = t.animcon.get("region");
						t.animwrap.setStyles({
							height: (t.length + e) * n.height / t.colspan + "px"
						})
					},
					hSlide: function() {
						var n = t.animcon.get("region");
						t.animwrap.setStyles({
							width: (t.length + e) * n.width / t.colspan + "px"
						})
					},
					fade: function() {}
				};
				return n[t.effect](), m.isUndefined(e) || t.relocateCurrentTab(), this
			},
			add: function(e, t) {
				var n = this;
				return(m.isUndefined(t) || t > n.length) && (t = n.length), m.isString(e) && (e = e.one(e)), n.transitions && e.css({
					visibility: "hidden"
				}), t == n.length ? (setTimeout(function() {
					n.setWrapperSize(1)
				}, 0), e.insertAfter(n.pannels[t - 1])) : e.insertBefore(n.pannels[t]), n.setWrapperSize(), n.fixSlideSize(n.currentTab), n.transitions && e.css({
					visibility: ""
				}), n.transitions, this
			},
			remove: function(e) {
				var t = this;
				if(1 !== t.length) return e <= t.currentTab && (t.currentTab--, t.length--), t.transitions && t.con.css({
					display: "none"
				}), o.one(t.pannels[e]).remove(), t.setWrapperSize(), t.transitions && t.con.css({
					display: "block"
				}), t.fixSlideSize(t.currentTab), this
			},
			removeLast: function() {
				var e = this;
				return e.remove(e.length - 1), e
			},
			renderLazyData: function(e) {
				if(e.setStyle("display", "none"), "1" != e.attr("lazy-data")) {
					e.attr("lazy-data", "1"), m.isUndefined(i);
					var n = e.get("innerHTML").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"),
						i = o.create("<div>" + n + "</div>");
					o.one(i).insertBefore(e), t(n)
				}
			},
			renderPannelTextarea: function(e) {
				var t = this;
				if(t.pannels.item(e))
					for(var n = function(e) {
							var n = t.pannels.item(e).all(".data-lazyload");
							n && n.each(function(e) {
								t.renderLazyData(h(e))
							})
						}, i = 0; i < t.colspan; i++) n(e + i)
			},
			buildWrap: function() {
				var e = this;
				return e.animwrap = o.create('<div style="position:absolute;"></div>'), e.animcon.children().appendTo(e.animwrap), e.animcon.empty().appendChild(e.animwrap), e.pannels = e.con.all("." + e.contentClass + " ." + e.pannelClass), e
			},
			doEffectInit: function() {
				var e = this,
					t = {
						none: function() {
							e.pannels = e.con.all("." + e.contentClass + " ." + e.pannelClass), e.pannels.setStyles({
								display: "none"
							}), e.pannels.item(e.defaultTab).setStyles({
								display: "block"
							})
						},
						vSlide: function() {
							e.buildWrap();
							var t = e.animcon.get("region");
							e.pannels.setStyles({
								"float": "none",
								overflow: "hidden"
							}), e.animwrap.setStyles({
								height: e.length * t.height / e.colspan + "px",
								overflow: "hidden",
								top: -1 * e.defaultTab * t.height + "px"
							})
						},
						hSlide: function() {
							e.buildWrap();
							var t = e.animcon.get("region");
							e.pannels.setStyles({
								"float": "left",
								overflow: "hidden"
							}), e.transitions ? e.animwrap.setStyles({
								overflow: "hidden",
								width: e.length * t.width / e.colspan + "px",
								"-webkit-transition-duration": "0s",
								"-webkit-transform": "translate3d(" + -1 * e.defaultTab * t.width + "px,0,0)"
							}) : e.animwrap.setStyles({
								width: e.length * t.width / e.colspan + "px",
								overflow: "hidden",
								left: -1 * e.defaultTab * t.width + "px"
							})
						},
						fade: function() {
							e.pannels = e.con.all("." + e.contentClass + " ." + e.pannelClass), e.pannels.setStyles({
								position: "absolute",
								zIndex: 0
							}), e.pannels.each(function(t, n) {
								t = h(t), n == e.defaultTab ? t.setStyles({
									opacity: 1,
									display: "block"
								}) : t.setStyles({
									opacity: 0,
									display: "none"
								})
							})
						}
					};
				return t[e.effect](), this
			},
			buildHTML: function() {
				var e = this,
					t = e.con;
				e.tabs = t.all("." + e.navClass + " " + e.triggerSelector);
				var n = t.all("." + e.contentClass + " ." + e.pannelClass);
				if(e.length = n.size(), t.one("." + e.navClass) || o('<ul class="' + e.navClass + '" style="display:none"></ul>').appendTo(e.con), 0 === e.tabs.size()) {
					for(var i = t.all("." + e.navClass), a = "", s = 0; s < e.length; s++) {
						var r = "";
						0 === s && (r = e.selectedClass), a += '<li class="' + r + '"><a href="javascript:void(0);">' + (s + 1) + "</a></li>"
					}
					i.set("innerHTML", a)
				}
				return e.tabs = t.all("." + e.navClass + " " + e.triggerSelector), e.animcon = t.one("." + e.contentClass), e.animwrap = null, e.doEffectInit(), e.carousel ? (e.fixSlideSize(e.currentTab - e.colspan), e.highlightNav(e.currentTab - e.colspan)) : (e.fixSlideSize(e.currentTab), e.highlightNav(e.getWrappedIndex(e.currentTab))), e.autoSlide === !0 && (e.invisibleStop && e.isSlideVisible() || !e.invisibleStop) && e.play(), this
			},
			getCurrentPannel: function() {
				var e = this;
				return o.one(e.pannels[e.currentTab])
			},
			renderWidth: function() {
				var e = this,
					t = e.animcon.get("region").width;
				return "hSlide" == e.effect && (t /= e.colspan), e.pannels.setStyles({
					width: t + "px"
				}), this
			},
			renderHeight: function() {
				var e = this,
					t = e.animcon.get("region").height;
				return "vSlide" == e.effect && (t /= e.colspan), e.pannels.setStyles({
					height: t + "px"
				}), this
			},
			relocateCurrentTab: function(e) {
				var t = this;
				return m.isUndefined(e) && (e = t.currentTab), "hSlide" == t.effect ? (t.transitions ? t.animwrap.setStyles({
					"-webkit-transition-duration": "0s",
					"-webkit-transform": "translate3d(" + -1 * e * t.animcon.get("region").width / t.colspan + "px,0,0)",
					"-webkit-backface-visibility": "hidden"
				}) : t.animwrap.setStyles({
					left: -1 * e * t.animcon.get("region").width / t.colspan
				}), t.currentTab = e, this) : void 0
			},
			fixSlideSize: function(e) {
				var t = this;
				return t.adaptive_fixed_width && t.renderWidth(), t.adaptive_fixed_height && t.renderHeight(), t.adaptive_fixed_size && t.renderHeight().renderWidth(), t.resetSlideSize(e), this
			},
			removeHeightTimmer: function() {
				var e = this;
				m.isNull(e.heightTimmer) || (clearInterval(e.heightTimmer), e.heightTimmer = null)
			},
			addHeightTimmer: function() {
				var e = this;
				m.isNull(e.heightTimmer) || (clearInterval(e.heightTimmer), e.heightTimmer = null);
				var t = function() {
					"hSlide" == e.effect && e.animcon.setStyles({
						height: e.pannels.item(e.currentTab).get("region").height + "px"
					})
				};
				e.heightTimmer = setInterval(t, 100), t()
			},
			resetSlideSize: function(e) {
				var t, n, i = this;
				return("undefined" == typeof e || null === e) && (e = i.currentTab), "hSlide" == i.effect || "vSlide" == i.effect ? ("hSlide" == i.effect && (t = i.adaptive_width ? i.adaptive_width() : i.animcon.get("region").width, n = i.pannels.item(e).get("region").height, i.animwrap.setStyles({
					width: i.pannels.size() * t + "px"
				}), t /= i.colspan, i.pannels.setStyles({
					width: t + "px",
					display: "block"
				}), i.animcon.setStyles({
					width: t * i.colspan + "px",
					overflow: "hidden"
				}), i.animWrapperAutoHeightSetting && i.animcon.setStyles({
					height: n + "px"
				})), "vSlide" == i.effect && (t = i.pannels.item(e).get("region").width, n = i.adaptive_height ? i.adaptive_height() : i.animcon.get("region").height, i.animwrap.setStyles({
					height: i.pannels.size() * n + "px"
				}), n /= i.colspan, i.pannels.setStyles({
					height: n * i.colspan + "px",
					display: "block"
				}), i.animcon.setStyles({
					height: n * i.colspan + "px",
					overflow: "hidden"
				}), i.animWrapperAutoHeightSetting && i.animcon.setStyles({
					width: t + "px"
				})), this) : void 0
			},
			getWrappedIndex: function(e) {
				var t = this,
					n = 0;
				return n = t.carousel ? e < t.colspan ? t.length - 3 * t.colspan + e : e >= t.length - t.colspan ? e - (t.length - t.colspan) : e - t.colspan : e
			},
			getMousePosition: function() {
				var e = this,
					t = function(t) {
						e._t_mouseX = t.clientX, e._t_mouseY = t.clientY
					};
				o.one(document).on("mousemove", t), setTimeout(function() {
					o.one(window).detach("mouseover", t)
				}, e.triggerDelay)
			},
			massTrigger: function(e, t) {
				var n = this;
				return m.inArray(n.eventType, ["mouseover", "mouseenter"]) ? (n.getMousePosition(), void(m.isUndefined(n._fired) || m.isNull(n._fired) ? n._fired = setTimeout(function() {
					n.inRegion([n._t_mouseX + o.one(window).scrollLeft(), n._t_mouseY + o.one(window).scrollTop()], o.one(t)) && e(o.one(t)), n._fired = null
				}, n.triggerDelay) : (clearTimeout(n._fired), n._fired = setTimeout(function() {
					n.inRegion([n._t_mouseX + o.one(window).scrollLeft(), n._t_mouseY + o.one(window).scrollTop()], o.one(t)) && e(o.one(t)), n._fired = null
				}, n.triggerDelay)))) : void e(o.one(t))
			},
			getMaxAnimDelay: function(e) {
				var t = this,
					n = 0;
				if(t.sublayers) return m.each(t.sublayers[e], function(e) {
					e.durationout + e.delayout > n && (n = e.durationout + e.delayout)
				}), n
			},
			inRegion: function(e, t) {
				var n = t.offset(),
					i = {
						width: t.width(),
						height: t.height()
					};
				return e[0] >= n.left && e[0] <= n.left + i.width && e[1] >= n.top && e[1] <= n.top + i.height ? !0 : !1
			},
			bindEvent: function() {
				var e = this;
				if(m.inArray(e.eventType, ["click", "mouseover", "mouseenter"]) && e.con._delegate(e.eventType, function(t) {
						t.preventDefault(), e.massTrigger(function(t) {
							var n = Number(e.tabs.indexOf(t));
							e.carousel && (n = (n + 1) % e.length), e.go(n), e.autoSlide && e.stoped === !1 && e.stop().play()
						}, t.currentTarget)
					}, "." + e.navClass + " " + e.triggerSelector), e.hoverStop && (e.con._delegate("mouseover", function() {
						if(e.isMouseover = !0, e.autoSlide) {
							var t = e.stoped;
							e.stop(), e.stoped = t
						}
					}, "." + e.contentClass + " ." + e.pannelClass), e.con._delegate("mouseout", function() {
						e.isMouseover = !1, e.autoSlide && !!e.stoped == !1 && e.play()
					}, "." + e.contentClass + " ." + e.pannelClass)), o.one(window).on("resize", function() {
						e.fixSlideSize(e.currentTab), e.relocateCurrentTab()
					}), e.on("beforeSwitch", function() {
						return "function" == typeof e.before_switch ? (e._executeSwitch = e.before_switch(), e._executeSwitch) : "boolean" == typeof e.before_switch ? (e._executeSwitch = e.before_switch, e.before_switch) : (e._executeSwitch = !0, !0)
					}), !e.touchmove) return this;
				if(e.con._delegate("touchstart", function(t) {
						e.stop(), e.touching = !0, e.is_last() && e.carousel && e.fix_next_carousel(), e.is_first() && e.carousel && e.fix_pre_carousel(), e.startX = t.changedTouches[0].clientX, e.startY = t.changedTouches[0].clientY, e.animwrap.setStyles({
							"-webkit-transition-duration": "0s"
						}), e.startT = Number(new Date)
					}, "." + e.contentClass), e.con._delegate("touchend", function(t) {
						e.touching = !1;
						var n = t.changedTouches[0].clientX,
							i = Number(e.animcon.get("region").width);
						e.deltaX = Math.abs(n - e.startX);
						var a = Math.abs(n) < Math.abs(e.startX),
							s = !a,
							o = e.carousel ? !1 : e.is_last() && a || e.is_first() && s,
							r = function() {
								e.animwrap.setStyles({
									"-webkit-transition-duration": Number(e.speed) / 2 + "s",
									"-webkit-transform": "translate3d(" + -1 * e.currentTab * e.animcon.get("region").width / e.colspan + "px,0,0)"
								})
							},
							l = function() {
								var t = e.animcon.get("region").width / e.colspan,
									n = parseInt((e.deltaX - t / 2) / t, 10);
								a ? (n >= 1 && e.length > 2 && (e.currentTab += n + 1, e.currentTab >= e.length - e.colspan && (e.currentTab = e.length - e.colspan - 1)), e.next()) : (n >= 1 && e.length > 2 && (e.currentTab += -1 * n - 1, e.currentTab <= 0 && (e.currentTab = 1)), e.previous())
							};
						return e.touchmove && e.deltaX < 30 ? void r() : (!o && (e.touchmove && e.deltaX > i / 3 || !e.touchmove && e.carousel || !e.carousel && e.touchmove && "hSlide" == e.effect || !e.touchmove && !e.carousel || Number(new Date) - e.startT < 550) ? l() : r(), void(e.autoSlide && e.stoped === !1 && e.play()))
					}, "." + e.contentClass), e.touchmove && (e.con._delegate("touchmove", function(t) {
						if(!(t.touches.length > 1)) {
							e.deltaX = t.touches[0].clientX - e.startX;
							var n = e.is_last() && e.deltaX < 0 || e.is_first() && e.deltaX > 0;
							if(!e.carousel && "hSlide" == e.effect && n && (e.deltaX = e.deltaX / 3), e.isScrolling = Math.abs(e.deltaX) < Math.abs(t.touches[0].clientY - e.startY) ? !0 : !1, !e.isScrolling) {
								t.preventDefault(), e.stop();
								var i = Number(e.animcon.get("region").width / e.colspan),
									a = e.deltaX - e.currentTab * i;
								e.animwrap.setStyles({
									"-webkit-transition-duration": "0s",
									"-webkit-transform": "translate3d(" + a + "px,0,0)"
								})
							}
						}
					}, "." + e.contentClass), e.animwrap && e.animwrap.on("webkitTransitionEnd", function() {})), e.invisibleStop) {
					var t = m.getHiddenProp();
					if(t) {
						var n, i = t.replace(/[H|h]idden/, "") + "visibilitychange";
						o.one(document).on(i, function() {
							m.isHidden() ? e.timer ? (n = !0, e.stop()) : n = !1 : e.isSlideVisible() && n && e.play()
						})
					}
					o.one(window).on("scroll resize", function() {
						e.isSlideVisible() ? e.timer || e.hoverStop && (!e.hoverStop || e.isMouseover) || e.play() : e.timer && e.stop()
					})
				}
				return this
			},
			isSlideVisible: function() {
				var e = this,
					t = e.animcon.offset().left,
					n = e.animcon.offset().top,
					i = e.animcon.width(),
					a = e.animcon.height(),
					s = o.one(window).scrollTop(),
					r = o.one(window).scrollLeft();
				return s > n + a || s + o.one(window).height() < n || r > t + i || r + o.one(window).width() < t ? !1 : !0
			},
			initLayer: function() {
				var e = this;
				if(!("ontouchstart" in document.documentElement || f.ie > 0 && f.ie < 9)) {
					var t = ["durationin", "easingin", "durationout", "easingout", "delayin", "delayout", "slideindirection", "slideoutdirection", "offsetin", "offsetout", "alpha", "easeInStrong", "easeOutStrong", "easeBothStrong", "easeNone", "easeIn", "easeOut", "easeBoth", "elasticIn", "elasticOut", "elasticBoth", "backIn", "backOut", "backBoth", "bounceIn", "bounceOut", "bounceBoth", "left", "top", "right", "bottom"],
						n = {
							durationin: 1e3,
							easingin: "easeIn",
							durationout: 1e3,
							easingout: "easeOut",
							delayin: 300,
							delayout: 300,
							slideindirection: "right",
							slideoutdirection: "left",
							alpha: !0,
							offsetin: 50,
							offsetout: 50
						},
						i = function(e) {
							function i(e, t) {
								var n = r[t];
								a[t] = void 0 === n || null === n ? e : n
							}
							var a = this,
								s = e.attr("rel").replace(/"'/gi, "").replace(new RegExp("(" + t.join("|") + ")", "ig"), '"$1"'),
								r = p.parse("{" + s + "}");
							m.each(n, i), this.el = e, this.left = Number(e.css("left").replace("px", "")), this.top = Number(e.css("top").replace("px", "")), this.animIn = function() {
								var e = this,
									t = e.offsetin,
									n = e.slideindirection,
									i = {
										left: function() {
											e.el.css({
												left: e.left - t
											})
										},
										top: function() {
											e.el.css({
												top: e.top - t
											})
										},
										right: function() {
											e.el.css({
												left: e.left + t
											})
										},
										bottom: function() {
											e.el.css({
												top: e.top + t
											})
										}
									};
								i[n](), setTimeout(function() {
									var t = {
											left: {
												left: e.left
											},
											top: {
												top: e.top
											},
											bottom: {
												top: e.top
											},
											right: {
												left: e.left
											}
										},
										i = {};
									m.mix(i, t[n]), e.alpha && m.mix(i, {
										opacity: 1
									}), o.one(e.el).animate(i, e.durationout / 1e3, e.easingin, function() {})
								}, e.delayin), e.alpha && e.el.css({
									opacity: 0
								})
							}, this.animOut = function() {
								var e = this,
									t = e.offsetout,
									n = e.slideoutdirection,
									i = {
										left: function() {
											e.el.css({
												left: e.left
											})
										},
										top: function() {
											e.el.css({
												top: e.top
											})
										},
										right: function() {
											e.el.css({
												left: e.left
											})
										},
										bottom: function() {
											e.el.css({
												top: e.top
											})
										}
									};
								i[n](), setTimeout(function() {
									var i = {
											left: {
												left: e.left + t
											},
											top: {
												top: e.top + t
											},
											bottom: {
												top: e.top - t
											},
											right: {
												left: e.left - t
											}
										},
										a = {};
									m.mix(a, i[n]), e.alpha && m.mix(a, {
										opacity: 0
									}), o.one(e.el).animate(a, e.durationout / 1e3, e.easingout, function() {})
								}, e.delayout), e.alpha && e.el.css({
									opacity: 1
								})
							}
						};
					e.sublayers = [], e.pannels.each(function(t, n) {
						return t = h(t), ("vSlide" == e.effect || "hSlide" == e.effect) && t.css({
							position: "relative"
						}), 0 === t.all('[alt="sublayer"]').length ? void(e.sublayers[n] = []) : (void 0 === e.sublayers[n] && (e.sublayers[n] = []), void t.all('[alt="sublayer"]').each(function(t) {
							t = h(t), e.sublayers[n].push(new i(t))
						}))
					}), e.on("beforeSwitch", function(t) {
						return t.index === e.currentTab ? !1 : void e.subLayerRunin(t.index)
					}), e.on("beforeTailSwitch", function(t) {
						return e.subLayerRunout(t.index), e.getMaxAnimDelay(t.index)
					})
				}
			},
			subLayerRunin: function(e) {
				var t = this,
					n = t.sublayers[e];
				m.each(n, function(e) {
					e.animIn()
				})
			},
			subLayerRunout: function(e) {
				var t = this,
					n = t.sublayers[e];
				m.each(n, function(e) {
					e.animOut()
				})
			},
			buildParam: function(e) {
				function t(t, i) {
					var a = e[i];
					n[i] = void 0 === a || null === a ? t : a
				}
				var n = this;
				return(void 0 === e || null === e) && (e = {}), m.each({
					autoSlide: !1,
					speed: 300,
					timeout: 3e3,
					effect: "none",
					eventType: "click",
					easing: "easeBoth",
					hoverStop: !0,
					invisibleStop: !1,
					selectedClass: "selected",
					conClass: "t-slide",
					navClass: "tab-nav",
					triggerSelector: "li",
					contentClass: "tab-content",
					pannelClass: "tab-pannel",
					before_switch: !0,
					carousel: !1,
					reverse: !1,
					touchmove: !0,
					adaptive_fixed_width: !1,
					adaptive_fixed_height: !1,
					adaptive_fixed_size: !1,
					adaptive_width: !1,
					adaptive_height: !1,
					defaultTab: 0,
					layerSlide: !1,
					layerClass: "tab-animlayer",
					colspan: 1,
					animWrapperAutoHeightSetting: !0,
					webkitOptimize: !0,
					triggerDelay: 300,
					autoActived: !0
				}, t), m.mix(n, {
					tabs: [],
					animcon: null,
					pannels: [],
					timmer: null,
					touching: !1
				}), n.speed = n.speed / 1e3, 0 !== n.defaultTab && (n.defaultTab = Number(n.defaultTab) - 1), n.carousel && (n.defaultTab = 0, n.defaultTab = n.colspan + n.defaultTab, n.effect = "hSlide"), n.currentTab = n.defaultTab, n.transitions = "webkitTransition" in document.body.style && n.webkitOptimize, n
			},
			fix_for_transition_when_carousel: function(e) {
				var t = this;
				"undefined" == typeof e && (e = 0);
				var n = t.con;
				if(t.animcon = t.con.one("." + t.contentClass), t.animwrap = t.animcon.one("div"), t.pannels = n.all("." + t.contentClass + " ." + t.pannelClass), "hSlide" == t.effect) {
					var i = Number(t.animcon.get("region").width / t.colspan);
					t.animwrap.setStyle("width", t.pannels.size() * i + 2 * i);
					var a = t.pannels.item(e).getDOMNode().cloneNode(!0),
						s = t.pannels.item(t.pannels.size() - 1 - e).getDOMNode().cloneNode(!0);
					if(t.animwrap.append(a), t.animwrap.prepend(s), 0 === t.defaultTab) var o = -1 * i * (e / 2 + 1 + t.defaultTab - 1);
					else var o = -1 * i * (e / 2 + 1);
					t.transitions ? t.animwrap.setStyles({
						"-webkit-transition-duration": "0s",
						"-webkit-transform": "translate3d(" + o + "px,0,0)",
						"-webkit-backface-visibility": "hidden",
						left: "0"
					}) : t.animwrap.setStyle("left", o)
				}
				return t.pannels = n.all("." + t.contentClass + " ." + t.pannelClass), t.length = t.pannels.size(), this
			},
			isAming: function() {
				return !1
			},
			previous: function(e) {
				var t = this,
					n = t.currentTab + t.length - 1 - (t.colspan - 1);
				return n >= t.length - t.colspan + 1 && (n %= t.length - t.colspan + 1), t.carousel && t.is_first() ? (t.fix_pre_carousel(), t.previous.call(t), this) : (t.go(n, e), this)
			},
			is_last: function() {
				var e = this;
				return e.currentTab == e.length - (e.colspan - 1) - 1 ? !0 : !1
			},
			is_first: function() {
				var e = this;
				return 0 === e.currentTab ? !0 : !1
			},
			next: function(e) {
				var t = this,
					n = t.currentTab + 1;
				return n >= t.length - t.colspan + 1 && (n %= t.length - t.colspan + 1), t.carousel && t.is_last() ? (t.fix_next_carousel(), t.next.call(t), this) : (t.go(n, e), this)
			},
			fix_next_carousel: function() {
				var e = this;
				e.currentTab = e.colspan;
				var t = e.con;
				"none" != e.effect && (e.pannels = t.all("." + e.contentClass + " ." + e.pannelClass));
				var n = "-" + Number(e.animcon.get("region").width).toString() + "px";
				"hSlide" == e.effect ? e.transitions ? e.animwrap.setStyles({
					"-webkit-transition-duration": "0s",
					"-webkit-transform": "translate3d(" + n + ",0,0)"
				}) : e.animwrap.setStyle("left", n) : "vSlide" == e.effect
			},
			fix_pre_carousel: function() {
				var e = this;
				e.currentTab = e.length - 1 - 2 * e.colspan + 1;
				var t = e.con;
				"none" != e.effect && (e.pannels = t.all("." + e.contentClass + " ." + e.pannelClass));
				var n = "-" + (Number(e.animcon.get("region").width / e.colspan) * e.currentTab).toString() + "px";
				"hSlide" == e.effect ? e.transitions ? e.animwrap.setStyles({
					"-webkit-transition-duration": "0s",
					"-webkit-transform": "translate3d(" + n + ",0,0)"
				}) : e.animwrap.setStyle("left", n) : "vSlide" == e.effect
			},
			highlightNav: function(e) {
				var t = this;
				return t.carousel && t.colspan > 1 ? this : (t.tabs.item(e) && (t.tabs.removeClass(t.selectedClass), t.tabs.item(e).addClass(t.selectedClass)), this)
			},
			hightlightNav: function() {
				var e = this;
				return e.highlightNav.apply(e, arguments), this
			},
			unhighlightNav: function(e) {
				var t = this;
				return t.carousel && t.colspan > 1 ? this : (t.tabs.item(e) && t.tabs.removeClass(t.selectedClass), this)
			},
			unhighlightNavAll: function() {
				var e = this;
				return e.tabs.removeClass(e.selectedClass), this
			},
			switch_to: function(e, t) {
				var n = this;
				if(t === !1) var i = !1;
				else var i = !0;
				var a = function() {
						m.isFunction(t) && t.call(n, n), n.fire("afterSwitch", {
							index: n.currentTab,
							navnode: n.tabs.item(n.getWrappedIndex(n.currentTab)),
							pannelnode: n.pannels.item(n.currentTab)
						})
					},
					s = n.fire("beforeTailSwitch", {
						index: n.currentTab,
						navnode: n.tabs.item(n.getWrappedIndex(n.currentTab)),
						pannelnode: n.pannels.item(n.currentTab)
					});
				if(n.fixSlideSize(e), n.autoSlide && n.stoped === !1 && n.stop().play(), e >= n.length && (e %= n.length), e == n.currentTab) return this;
				if(n.anim) try {
					n.anim.stop(), n.anim = null
				} catch(r) {}
				var l = {
						none: function(e) {
							n.pannels.setStyles({
								display: "none"
							}), n.pannels.item(e).setStyles({
								display: "block"
							}), a()
						},
						vSlide: function(e) {
							n.transitions ? i ? (n.anim = o.one(n.animwrap).css({
								"-webkit-transition-duration": n.speed + "s",
								"-webkit-transition-timing-function": n.easing,
								"-webkit-transform": "translate3d(0," + -1 * e * n.animcon.get("region").height / n.colspan + "px,0)",
								"-webkit-backface-visibility": "hidden",
								opacity: 1
							}), setTimeout(function() {
								a()
							}, 1e3 * n.speed)) : a() : i ? n.anim = o.one(n.animwrap).animate({
								top: -1 * e * n.animcon.get("region").height / n.colspan
							}, n.speed, n.easing, function() {
								a()
							}) : (n.animwrap.css({
								top: -1 * e * n.animcon.get("region").height / n.colspan
							}), a())
						},
						hSlide: function(e) {
							n.transitions ? i ? (n.anim = o.one(n.animwrap).css({
								"-webkit-transition-duration": n.speed + "s",
								"-webkit-transition-timing-function": n.easing,
								"-webkit-transform": "translate3d(" + -1 * e * n.animcon.get("region").width / n.colspan + "px,0,0)",
								"-webkit-backface-visibility": "hidden",
								opacity: 1
							}), setTimeout(function() {
								a()
							}, 1e3 * n.speed)) : a() : i ? n.anim = o.one(n.animwrap).animate({
								left: -1 * e * n.animcon.get("region").width / n.colspan
							}, n.speed, n.easing, function() {
								a()
							}) : (n.animwrap.css({
								left: -1 * e * n.animcon.get("region").width / n.colspan
							}), a())
						},
						fade: function(e) {
							var t = n.currentTab;
							n.pannels.item(e).setStyle({
								display: "block"
							}), n.pannels.item(e).setStyle("opacity", 0), n.pannels.item(t).setStyle("zIndex", 1), n.pannels.item(e).setStyle("zIndex", 2), n.anim = o.one(n.pannels.item(e)).animate({
								opacity: 1
							}, n.speed, n.easing, function() {
								n.pannels.item(t).setStyle("zIndex", 0), n.pannels.item(e).setStyle("zIndex", 1), n.pannels.item(t).setStyle("opacity", 0), n.pannels.item(t).setStyles({
									display: "none"
								}), a(), n.fire("afterSwitch", {
									index: e,
									navnode: n.tabs.item(n.getWrappedIndex(e)),
									pannelnode: n.pannels.item(e)
								})
							})
						}
					},
					c = function() {
						var t = n.fire("beforeSwitch", {
							index: e,
							navnode: n.tabs.item(e),
							pannelnode: n.pannels.item(e)
						});
						t._executeSwitch !== !1 && (e + n.colspan > n.pannels.size() && (e = n.pannels.size() - n.colspan), l[n.effect](e), n.currentTab = e, n.highlightNav(n.getWrappedIndex(e)), n.fire("switch", {
							index: e,
							navnode: n.tabs.item(n.getWrappedIndex(e)),
							pannelnode: n.pannels.item(e)
						}), n.renderPannelTextarea(e))
					};
				m.isNumber(s) ? setTimeout(function() {
					c()
				}, s) : c()
			},
			go: function(e, t) {
				var n = this;
				return n.switch_to(e, t), this
			},
			play: function() {
				var e = this;
				return null !== e.timer && clearTimeout(e.timer), e.timer = setTimeout(function() {
					e.next().play()
				}, Number(e.timeout)), e.stoped = !1, this
			},
			stop: function() {
				var e = this;
				return clearTimeout(e.timer), e.timer = null, e.stoped = !0, this
			}
		}), e = i
	}(), o = function(e) {
		"use strict";
		var t = s;
		return e = t
	}(), n.exports = o
});