import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createRouter as createRouter$1, findRoute, addRoute, NullProtoObj, routeToRegExp } from 'rou3';
import { FastURL, FastResponse } from 'srvx';
import { isServer, ssr, getRequestEvent, renderToString, renderToStream, createComponent, ssrHydrationKey, NoHydration, escape, Hydration, ssrAttribute, HydrationScript, useAssets as useAssets$1, ssrElement, mergeProps, delegateEvents, spread } from 'solid-js/web';
import { createContext, sharedConfig, onCleanup, catchError, ErrorBoundary as ErrorBoundary$1, Suspense, createUniqueId, createMemo, lazy as lazy$1, useContext, createRenderEffect, createSignal, children, getOwner, on, runWithOwner, untrack, Show, createRoot, startTransition, resetErrorBoundaries, batch, createComponent as createComponent$1 } from 'solid-js';
import { c as createRouter$2, p as parseSetCookie$1, j as join } from '../nitro/nitro.mjs';
import { fromJSON, crossSerializeStream, getCrossReferenceHeader } from 'seroval';
import { CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin } from 'seroval-plugins/web';
import { provideRequestEvent } from 'solid-js/web/storage';

//#endregion
//#region src/event.ts
const kEventNS = "h3.internal.event.";
const kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
const kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var H3Event = class {
	/**
	* Access to the H3 application instance.
	*/
	app;
	/**
	* Incoming HTTP request info.
	*
	* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Request)
	*/
	req;
	/**
	* Access to the parsed request URL.
	*
	* [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/URL)
	*/
	url;
	/**
	* Event context.
	*/
	context;
	/**
	* @internal
	*/
	static __is_event__ = true;
	constructor(req, context, app) {
		this.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		this.url = _url && _url instanceof URL ? _url : new FastURL(req.url);
	}
	/**
	* Prepared HTTP response.
	*/
	get res() {
		return this[kEventRes] ||= new H3EventResponse();
	}
	/**
	* Access to runtime specific additional context.
	*
	*/
	get runtime() {
		return this.req.runtime;
	}
	/**
	* Tell the runtime about an ongoing operation that shouldn't close until the promise resolves.
	*/
	waitUntil(promise) {
		this.req.waitUntil?.(promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	/**
	* Access to the raw Node.js req/res objects.
	*
	* @deprecated Use `event.runtime.{node|deno|bun|...}.` instead.
	*/
	get node() {
		return this.req.runtime?.node;
	}
	/**
	* Access to the incoming request headers.
	*
	* @deprecated Use `event.req.headers` instead.
	*
	*/
	get headers() {
		return this.req.headers;
	}
	/**
	* Access to the incoming request url (pathname+search).
	*
	* @deprecated Use `event.url.pathname + event.url.search` instead.
	*
	* Example: `/api/hello?name=world`
	* */
	get path() {
		return this.url.pathname + this.url.search;
	}
	/**
	* Access to the incoming request method.
	*
	* @deprecated Use `event.req.method` instead.
	*/
	get method() {
		return this.req.method;
	}
};
var H3EventResponse = class {
	status;
	statusText;
	get headers() {
		return this[kEventResHeaders] ||= new Headers();
	}
};

//#endregion
//#region src/utils/sanitize.ts
const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
/**
* Make sure the status message is safe to use in a response.
*
* Allowed characters: horizontal tabs, spaces or visible ascii characters: https://www.rfc-editor.org/rfc/rfc7230#section-3.1.2
*/
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
/**
* Make sure the status code is a valid HTTP status code.
*/
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}

//#endregion
//#region src/error.ts
/**
* HTTPError
*/
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	/**
	* HTTP status code in range [200...599]
	*/
	status;
	/**
	* HTTP status text
	*
	* **NOTE:** This should be short (max 512 to 1024 characters).
	* Allowed characters are tabs, spaces, visible ASCII characters, and extended characters (byte value 128–255).
	*
	* **TIP:** Use `message` for longer error descriptions in JSON body.
	*/
	statusText;
	/**
	* Additional HTTP headers to be sent in error response.
	*/
	headers;
	/**
	* Original error object that caused this error.
	*/
	cause;
	/**
	* Additional data attached in the error JSON body under `data` key.
	*/
	data;
	/**
	* Additional top level JSON body properties to attach in the error JSON body.
	*/
	body;
	/**
	* Flag to indicate that the error was not handled by the application.
	*
	* Unhandled error stack trace, data and message are hidden in non debug mode for security reasons.
	*/
	unhandled;
	/**
	* Check if the input is an instance of HTTPError using its constructor name.
	*
	* It is safer than using `instanceof` because it works across different contexts (e.g., if the error was thrown in a different module).
	*/
	static isError(input) {
		return input instanceof Error && input?.name === "HTTPError";
	}
	/**
	* Create a new HTTPError with the given status code and optional status text and details.
	*
	* @example
	*
	* HTTPError.status(404)
	* HTTPError.status(418, "I'm a teapot")
	* HTTPError.status(403, "Forbidden", { message: "Not authenticated" })
	*/
	static status(status, statusText, details) {
		return new HTTPError({
			...details,
			statusText,
			status
		});
	}
	constructor(arg1, arg2) {
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode(details?.status || (details?.cause)?.status || details?.status || details?.statusCode, 500);
		const statusText = sanitizeStatusMessage(details?.statusText || (details?.cause)?.statusText || details?.statusText || details?.statusMessage);
		const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		this.cause = details;
		Error.captureStackTrace?.(this, this.constructor);
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = details?.headers || (details?.cause)?.headers;
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
		this.data = details?.data;
		this.body = details?.body;
	}
	/**
	* @deprecated Use `status`
	*/
	get statusCode() {
		return this.status;
	}
	/**
	* @deprecated Use `statusText`
	*/
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return {
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data,
			...unhandled ? void 0 : this.body
		};
	}
};
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}

//#endregion
//#region src/response.ts
const kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
const kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
	if (typeof val?.then === "function") return (val.catch?.((error) => error) || Promise.resolve(val)).then((resolvedVal) => toResponse(resolvedVal, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof response?.then === "function") return toResponse(response, event, config);
	const { onResponse: onResponse$1 } = config;
	return onResponse$1 ? Promise.resolve(onResponse$1(response, event)).then(() => response) : response;
}
var HTTPResponse = class {
	#headers;
	#init;
	body;
	constructor(body, init) {
		this.body = body;
		this.#init = init;
	}
	get status() {
		return this.#init?.status || 200;
	}
	get statusText() {
		return this.#init?.statusText || "OK";
	}
	get headers() {
		return this.#headers ||= new Headers(this.#init?.headers);
	}
};
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new FastResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError: onError$1 } = config;
		return onError$1 && !nested ? Promise.resolve(onError$1(error, event)).catch((error$1) => error$1).then((newVal) => prepareResponse(newVal ?? val, event, config, true)) : errorResponse(error, config.debug);
	}
	const preparedRes = event[kEventRes];
	const preparedHeaders = preparedRes?.[kEventResHeaders];
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = res.status || preparedRes?.status;
		return new FastResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: res.statusText || preparedRes?.statusText,
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (!preparedHeaders || nested || !val.ok) return val;
	try {
		mergeHeaders$1(val.headers, preparedHeaders, val.headers);
		return val;
	} catch {
		return new FastResponse(nullBody(event.req.method, val.status) ? null : val.body, {
			status: val.status,
			statusText: val.statusText,
			headers: mergeHeaders$1(val.headers, preparedHeaders)
		});
	}
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
const frozenHeaders = () => {
	throw new Error("Headers are frozen");
};
var FrozenHeaders = class extends Headers {
	constructor(init) {
		super(init);
		this.set = this.append = this.delete = frozenHeaders;
	}
};
const emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
const jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (val instanceof HTTPResponse || val?.constructor?.name === "HTTPResponse") return val;
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug) {
	return new FastResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers: error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders)
	});
}
function normalizeMiddleware(input, opts = {}) {
	const matcher = createMatcher$1(opts);
	if (!matcher && (input.length > 1 || input.constructor?.name === "AsyncFunction")) return input;
	return (event, next) => {
		if (matcher && !matcher(event)) return next();
		const res = input(event, next);
		return res === void 0 || res === kNotFound ? next() : res;
	};
}
function createMatcher$1(opts) {
	if (!opts.route && !opts.method && !opts.match) return void 0;
	const routeMatcher = opts.route ? routeToRegExp(opts.route) : void 0;
	const method = opts.method?.toUpperCase();
	return function _middlewareMatcher(event) {
		if (method && event.req.method !== method) return false;
		if (opts.match && !opts.match(event)) return false;
		if (!routeMatcher) return true;
		const match = event.url.pathname.match(routeMatcher);
		if (!match) return false;
		if (match.groups) event.context.middlewareParams = {
			...event.context.middlewareParams,
			...match.groups
		};
		return true;
	};
}
function callMiddleware(event, middleware, handler, index = 0) {
	if (index === middleware.length) return handler(event);
	const fn = middleware[index];
	let nextCalled;
	let nextResult;
	const next = () => {
		if (nextCalled) return nextResult;
		nextCalled = true;
		nextResult = callMiddleware(event, middleware, handler, index + 1);
		return nextResult;
	};
	const ret = fn(event, next);
	return is404(ret) ? next() : typeof ret?.then === "function" ? ret.then((resolved) => is404(resolved) ? next() : resolved) : ret;
}
function is404(val) {
	return val === void 0 || val === kNotFound || val?.status === 404 && val instanceof Response;
}

//#endregion
//#region src/utils/request.ts
/**
* Convert input into a web [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request).
*
* If input is a relative URL, it will be normalized into a full path based on headers.
*
* If input is already a Request and no options are provided, it will be returned as-is.
*/
function toRequest(input, options) {
	if (typeof input === "string") {
		let url = input;
		if (url[0] === "/") {
			const headers = options?.headers ? new Headers(options.headers) : void 0;
			const host = headers?.get("host") || "localhost";
			const proto = headers?.get("x-forwarded-proto") === "https" ? "https" : "http";
			url = `${proto}://${host}${url}`;
		}
		return new Request(url, options);
	} else if (options || input instanceof URL) return new Request(input, options);
	return input;
}
/**
* Try to get the client IP address from the incoming request.
*
* If `xForwardedFor` is `true`, it will use the `x-forwarded-for` header if it exists.
*
* If IP cannot be determined, it will default to `undefined`.
*
* @example
* app.get("/", (event) => {
*   const ip = getRequestIP(event); // "192.0.2.0"
* });
*/
function getRequestIP(event, opts = {}) {
	if (opts.xForwardedFor) {
		const _header = event.req.headers.get("x-forwarded-for");
		if (_header) {
			const xForwardedFor = _header.split(",")[0].trim();
			if (xForwardedFor) return xForwardedFor;
		}
	}
	return event.req.context?.clientAddress || event.req.ip || void 0;
}

//#endregion
//#region src/handler.ts
function defineHandler(input) {
	if (typeof input === "function") return handlerWithFetch(input);
	const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
		return input.fetch(event.req);
	} : NoHandler);
	return Object.assign(handlerWithFetch(input.middleware?.length ? function _handlerMiddleware(event) {
		return callMiddleware(event, input.middleware, handler);
	} : handler), input);
}
function handlerWithFetch(handler) {
	if ("fetch" in handler) return handler;
	return Object.assign(handler, { fetch: (req) => {
		if (typeof req === "string") req = new URL(req, "http://_");
		if (req instanceof URL) req = new Request(req);
		const event = new H3Event(req);
		try {
			return Promise.resolve(toResponse(handler(event), event));
		} catch (error) {
			return Promise.resolve(toResponse(error, event));
		}
	} });
}
function toEventHandler(handler) {
	if (typeof handler === "function") return handler;
	if (typeof handler?.handler === "function") return handler.handler;
	if (typeof handler?.fetch === "function") return function _fetchHandler(event) {
		return handler.fetch(event.req);
	};
}

//#endregion
//#region src/h3.ts
const NoHandler = () => kNotFound;
const H3Core = /* @__PURE__ */ (() => {
	const HTTPMethods = [
		"GET",
		"POST",
		"PUT",
		"DELETE",
		"PATCH",
		"HEAD",
		"OPTIONS",
		"CONNECT",
		"TRACE"
	];
	class H3Core$1 {
		_middleware;
		_routes = [];
		config;
		constructor(config = {}) {
			this._middleware = [];
			this.config = config;
			this.fetch = this.fetch.bind(this);
			this.request = this.request.bind(this);
			this.handler = this.handler.bind(this);
			config.plugins?.forEach((plugin) => plugin(this));
		}
		fetch(request) {
			return this._request(request);
		}
		request(_req, _init, context) {
			return this._request(toRequest(_req, _init), context);
		}
		_request(request, context) {
			const event = new H3Event(request, context, this);
			let handlerRes;
			try {
				if (this.config.onRequest) {
					const hookRes = this.config.onRequest(event);
					handlerRes = typeof hookRes?.then === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
				} else handlerRes = this.handler(event);
			} catch (error) {
				handlerRes = Promise.reject(error);
			}
			return toResponse(handlerRes, event, this.config);
		}
		/**
		* Immediately register an H3 plugin.
		*/
		register(plugin) {
			plugin(this);
			return this;
		}
		_findRoute(_event) {}
		_addRoute(_route) {
			this._routes.push(_route);
		}
		_getMiddleware(_event, route) {
			return route?.data.middleware ? [...this._middleware, ...route.data.middleware] : this._middleware;
		}
		handler(event) {
			const route = this._findRoute(event);
			if (route) {
				event.context.params = route.params;
				event.context.matchedRoute = route.data;
			}
			const routeHandler = route?.data.handler || NoHandler;
			const middleware = this._getMiddleware(event, route);
			return middleware.length > 0 ? callMiddleware(event, middleware, routeHandler) : routeHandler(event);
		}
		mount(base, input) {
			if ("handler" in input) {
				if (input._middleware.length > 0) this._middleware.push((event, next) => {
					return event.url.pathname.startsWith(base) ? callMiddleware(event, input._middleware, next) : next();
				});
				for (const r of input._routes) this._addRoute({
					...r,
					route: base + r.route
				});
			} else {
				const fetchHandler = "fetch" in input ? input.fetch : input;
				this.all(`${base}/**`, function _mountedMiddleware(event) {
					const url = new URL(event.url);
					url.pathname = url.pathname.slice(base.length) || "/";
					return fetchHandler(new Request(url, event.req));
				});
			}
			return this;
		}
		all(route, handler, opts) {
			return this.on("", route, handler, opts);
		}
		on(method, route, handler, opts) {
			const _method = (method || "").toUpperCase();
			route = new URL(route, "http://_").pathname;
			this._addRoute({
				method: _method,
				route,
				handler: toEventHandler(handler),
				middleware: opts?.middleware,
				meta: {
					...handler.meta,
					...opts?.meta
				}
			});
			return this;
		}
		_normalizeMiddleware(fn, _opts) {
			return fn;
		}
		use(arg1, arg2, arg3) {
			let route;
			let fn;
			let opts;
			if (typeof arg1 === "string") {
				route = arg1;
				fn = arg2;
				opts = arg3;
			} else {
				fn = arg1;
				opts = arg2;
			}
			this._middleware.push(this._normalizeMiddleware(fn, {
				...opts,
				route
			}));
			return this;
		}
	}
	for (const method of HTTPMethods) H3Core$1.prototype[method.toLowerCase()] = function(route, handler, opts) {
		return this.on(method, route, handler, opts);
	};
	return H3Core$1;
})();
var H3 = class extends H3Core {
	/** @internal */
	_rou3;
	constructor(config = {}) {
		super(config);
		this._rou3 = createRouter$1();
	}
	_findRoute(_event) {
		return findRoute(this._rou3, _event.req.method, _event.url.pathname);
	}
	_addRoute(_route) {
		addRoute(this._rou3, _route.method, _route.route, _route);
		super._addRoute(_route);
	}
	_normalizeMiddleware(fn, opts) {
		return normalizeMiddleware(fn, opts);
	}
};
function fromWebHandler(handler) {
	return function _webHandler(event) {
		return handler(event.req, event.context);
	};
}
/**
* Send a redirect response to the client.
*
* It adds the `location` header to the response and sets the status code to 302 by default.
*
* In the body, it sends a simple HTML page with a meta refresh tag to redirect the client in case the headers are ignored.
*
* @example
* app.get("/", () => {
*   return redirect("https://example.com");
* });
*
* @example
* app.get("/", () => {
*   return redirect("https://example.com", 301); // Permanent redirect
* });
*/
function redirect(location, status = 302, statusText) {
	const encodedLoc = location.replace(/"/g, "%22");
	const body = `<html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}" /></head></html>`;
	return new HTTPResponse(body, {
		status,
		statusText: (status === 301 ? "Moved Permanently" : "Found"),
		headers: {
			"content-type": "text/html; charset=utf-8",
			location
		}
	});
}

//#endregion
//#region node_modules/.pnpm/cookie-es@2.0.0/node_modules/cookie-es/dist/index.mjs
function parse(str, options) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const obj = {};
	const opt = {};
	const dec = opt.decode || decode;
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (opt?.filter && !opt?.filter(key)) {
			index = endIdx + 1;
			continue;
		}
		if (void 0 === obj[key]) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			obj[key] = tryDecode(val, dec);
		}
		index = endIdx + 1;
	}
	return obj;
}
function decode(str) {
	return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
	try {
		return decode2(str);
	} catch {
		return str;
	}
}
const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
	const opt = options || {};
	const enc = opt.encode || encodeURIComponent;
	if (typeof enc !== "function") throw new TypeError("option encode is invalid");
	if (!fieldContentRegExp.test(name)) throw new TypeError("argument name is invalid");
	const encodedValue = enc(value);
	if (encodedValue && !fieldContentRegExp.test(encodedValue)) throw new TypeError("argument val is invalid");
	let str = name + "=" + encodedValue;
	if (void 0 !== opt.maxAge && opt.maxAge !== null) {
		const maxAge = opt.maxAge - 0;
		if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) throw new TypeError("option maxAge is invalid");
		str += "; Max-Age=" + Math.floor(maxAge);
	}
	if (opt.domain) {
		if (!fieldContentRegExp.test(opt.domain)) throw new TypeError("option domain is invalid");
		str += "; Domain=" + opt.domain;
	}
	if (opt.path) {
		if (!fieldContentRegExp.test(opt.path)) throw new TypeError("option path is invalid");
		str += "; Path=" + opt.path;
	}
	if (opt.expires) {
		if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) throw new TypeError("option expires is invalid");
		str += "; Expires=" + opt.expires.toUTCString();
	}
	if (opt.httpOnly) str += "; HttpOnly";
	if (opt.secure) str += "; Secure";
	if (opt.priority) {
		const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
		switch (priority) {
			case "low": {
				str += "; Priority=Low";
				break;
			}
			case "medium": {
				str += "; Priority=Medium";
				break;
			}
			case "high": {
				str += "; Priority=High";
				break;
			}
			default: throw new TypeError("option priority is invalid");
		}
	}
	if (opt.sameSite) {
		const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
		switch (sameSite) {
			case true: {
				str += "; SameSite=Strict";
				break;
			}
			case "lax": {
				str += "; SameSite=Lax";
				break;
			}
			case "strict": {
				str += "; SameSite=Strict";
				break;
			}
			case "none": {
				str += "; SameSite=None";
				break;
			}
			default: throw new TypeError("option sameSite is invalid");
		}
	}
	if (opt.partitioned) str += "; Partitioned";
	return str;
}
function isDate(val) {
	return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function parseSetCookie(setCookieValue, options) {
	const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
	const nameValuePairStr = parts.shift() || "";
	const parsed = _parseNameValuePair(nameValuePairStr);
	const name = parsed.name;
	let value = parsed.value;
	try {
		value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
	} catch {}
	const cookie = {
		name,
		value
	};
	for (const part of parts) {
		const sides = part.split("=");
		const partKey = (sides.shift() || "").trimStart().toLowerCase();
		const partValue = sides.join("=");
		switch (partKey) {
			case "expires": {
				cookie.expires = new Date(partValue);
				break;
			}
			case "max-age": {
				cookie.maxAge = Number.parseInt(partValue, 10);
				break;
			}
			case "secure": {
				cookie.secure = true;
				break;
			}
			case "httponly": {
				cookie.httpOnly = true;
				break;
			}
			case "samesite": {
				cookie.sameSite = partValue;
				break;
			}
			default: cookie[partKey] = partValue;
		}
	}
	return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
	let name = "";
	let value = "";
	const nameValueArr = nameValuePairStr.split("=");
	if (nameValueArr.length > 1) {
		name = nameValueArr.shift();
		value = nameValueArr.join("=");
	} else value = nameValuePairStr;
	return {
		name,
		value
	};
}
/**
* Parse the request to get HTTP Cookie header string and returning an object of all cookie name-value pairs.
* @param event {HTTPEvent} H3 event or req passed by h3 handler
* @returns Object of cookie name-value pairs
* ```ts
* const cookies = parseCookies(event)
* ```
*/
function parseCookies(event) {
	return parse(event.req.headers.get("cookie") || "");
}
/**
* Get a cookie value by name.
* @param event {HTTPEvent} H3 event or req passed by h3 handler
* @param name Name of the cookie to get
* @returns {*} Value of the cookie (String or undefined)
* ```ts
* const authorization = getCookie(request, 'Authorization')
* ```
*/
function getCookie(event, name) {
	return parseCookies(event)[name];
}
/**
* Set a cookie value by name.
* @param event {H3Event} H3 event or res passed by h3 handler
* @param name Name of the cookie to set
* @param value Value of the cookie to set
* @param options {CookieSerializeOptions} Options for serializing the cookie
* ```ts
* setCookie(res, 'Authorization', '1234567')
* ```
*/
function setCookie(event, name, value, options) {
	const newCookie = serialize(name, value, {
		path: "/",
		...options
	});
	const currentCookies = event.res.headers.getSetCookie();
	if (currentCookies.length === 0) {
		event.res.headers.set("set-cookie", newCookie);
		return;
	}
	const newCookieKey = _getDistinctCookieKey(name, options || {});
	event.res.headers.delete("set-cookie");
	for (const cookie of currentCookies) {
		const _key = _getDistinctCookieKey(cookie.split("=")?.[0], parseSetCookie(cookie));
		if (_key === newCookieKey) continue;
		event.res.headers.append("set-cookie", cookie);
	}
	event.res.headers.append("set-cookie", newCookie);
}
/**
* Cookies are unique by "cookie-name, domain-value, and path-value".
*
* @see https://httpwg.org/specs/rfc6265.html#rfc.section.4.1.2
*/
function _getDistinctCookieKey(name, options) {
	return [
		name,
		options.domain || "",
		options.path || "/"
	].join(";");
}

const clientViteManifest = { "_routing-DCFTiylN.js": { "file": "_build/assets/routing-DCFTiylN.js", "name": "routing" }, "src/entry-client.tsx": { "file": "_build/assets/entry-client-C8Aom6p1.js", "name": "entry-client", "src": "src/entry-client.tsx", "isEntry": true, "imports": ["_routing-DCFTiylN.js"], "dynamicImports": ["src/routes/index.tsx?pick=default&pick=$css", "src/routes/index.tsx?pick=default&pick=$css"] }, "src/routes/index.tsx?pick=default&pick=$css": { "file": "_build/assets/index-CiTGjREJ.js", "name": "index", "src": "src/routes/index.tsx?pick=default&pick=$css", "isEntry": true, "isDynamicEntry": true, "imports": ["_routing-DCFTiylN.js"] } };
function getSsrProdManifest() {
  const viteManifest = clientViteManifest;
  return {
    path(id) {
      if (id.startsWith("./")) id = id.slice(2);
      const viteManifestEntry = clientViteManifest[
        id
        /*globalThis._importMeta_.env.START_CLIENT_ENTRY*/
      ];
      if (!viteManifestEntry) throw new Error(`No entry found in vite manifest for '${id}'`);
      return join("/", viteManifestEntry.file);
    },
    async getAssets(id) {
      if (id.startsWith("./")) id = id.slice(2);
      return createHtmlTagsForAssets(findAssetsInViteManifest(clientViteManifest, id));
    },
    async json() {
      const json = {};
      const entryKeys = Object.keys(viteManifest).filter((id) => {
        var _a, _b;
        return ((_a = viteManifest[id]) == null ? void 0 : _a.isEntry) || ((_b = viteManifest[id]) == null ? void 0 : _b.isDynamicEntry);
      }).map((id) => id);
      for (const entryKey of entryKeys) {
        json[entryKey] = {
          output: join("/", viteManifest[entryKey].file),
          assets: await this.getAssets(entryKey)
        };
      }
      return json;
    }
  };
}
function createHtmlTagsForAssets(assets) {
  return assets.filter((asset) => asset.endsWith(".css") || asset.endsWith(".js") || asset.endsWith(".ts") || asset.endsWith(".mjs")).map((asset) => ({
    tag: "link",
    attrs: {
      href: "/" + asset,
      key: asset,
      ...asset.endsWith(".css") ? {
        rel: "stylesheet"
      } : {
        rel: "modulepreload"
      }
    }
  }));
}
const entryId = "./src/entry-client.tsx".slice(2);
let entryImports = void 0;
function findAssetsInViteManifest(manifest2, id, assetMap2 = /* @__PURE__ */ new Map(), stack = []) {
  var _a, _b, _c;
  if (stack.includes(id)) {
    return [];
  }
  const cached = assetMap2.get(id);
  if (cached) {
    return cached;
  }
  const chunk = manifest2[id];
  if (!chunk) {
    return [];
  }
  if (!entryImports) {
    entryImports = [entryId, ...(_b = (_a = manifest2[entryId]) == null ? void 0 : _a.imports) != null ? _b : []];
  }
  const excludeEntryImports = id !== entryId;
  const assets = ((_c = chunk.css) == null ? void 0 : _c.filter(Boolean)) || [];
  if (chunk.imports) {
    stack.push(id);
    for (let i = 0, l = chunk.imports.length; i < l; i++) {
      const importId = chunk.imports[i];
      if (!importId || excludeEntryImports && entryImports.includes(importId)) continue;
      assets.push(...findAssetsInViteManifest(manifest2, importId, assetMap2, stack));
    }
    stack.pop();
  }
  assets.push(chunk.file);
  const all = Array.from(new Set(assets));
  assetMap2.set(id, all);
  return all;
}
function getSsrManifest(target) {
  return getSsrProdManifest();
}
var _tmpl$$3 = " ";
const assetMap = {
  style: (props) => ssrElement("style", props.attrs, () => props.children, true),
  link: (props) => ssrElement("link", props.attrs, void 0, true),
  script: (props) => {
    return props.attrs.src ? ssrElement("script", mergeProps(() => props.attrs, {
      get id() {
        return props.key;
      }
    }), () => ssr(_tmpl$$3), true) : null;
  },
  noscript: (props) => ssrElement("noscript", props.attrs, () => escape(props.children), true)
};
function renderAsset(asset, nonce) {
  let {
    tag,
    attrs: {
      key,
      ...attrs
    } = {
      key: void 0
    },
    children: children2
  } = asset;
  return assetMap[tag]({
    attrs: {
      ...attrs,
      nonce
    },
    key,
    children: children2
  });
}
const REGISTRY = /* @__PURE__ */ Symbol("assetRegistry");
const NOOP = () => "";
const keyAttrs = ["href", "rel", "data-vite-dev-id"];
const getEntity = (registry, asset) => {
  var _a;
  let key = asset.tag;
  for (const k of keyAttrs) {
    if (!(k in asset.attrs)) continue;
    key += `[${k}='${asset.attrs[k]}']`;
  }
  const entity = (_a = registry[key]) != null ? _a : registry[key] = {
    key,
    consumers: 0
  };
  return entity;
};
const useAssets = (assets, nonce) => {
  var _a, _b, _c;
  if (!assets.length) return;
  const registry = (_b = (_a = getRequestEvent().locals)[REGISTRY]) != null ? _b : _a[REGISTRY] = {};
  const ssrRequestAssets = (_c = sharedConfig.context) == null ? void 0 : _c.assets;
  const cssKeys = [];
  for (const asset of assets) {
    const entity = getEntity(registry, asset);
    const isCSSLink = asset.tag === "link" && asset.attrs.rel === "stylesheet";
    const isCSS = isCSSLink || asset.tag === "style";
    if (isCSS) {
      cssKeys.push(entity.key);
    }
    entity.consumers++;
    if (entity.consumers > 1) continue;
    useAssets$1(() => renderAsset(asset, nonce));
    entity.ssrIdx = ssrRequestAssets.length - 1;
  }
  onCleanup(() => {
    for (const key of cssKeys) {
      const entity = registry[key];
      entity.consumers--;
      if (entity.consumers != 0) {
        continue;
      }
      ssrRequestAssets.splice(entity.ssrIdx, 1, NOOP);
      delete registry[key];
    }
  });
};
const assetsById = {};
const getAssets = async (id) => {
  if (assetsById[id]) return assetsById[id];
  const manifest2 = getSsrManifest();
  const assets = await manifest2.getAssets(id);
  assetsById[id] = assets;
  return assets;
};
const withAssets = function(fn) {
  const wrapper = async () => {
    const mod = await fn();
    const id = mod.id$$;
    if (!id) return mod;
    if (!mod.default) {
      console.error(`Module ${id} does not export default`);
      return {
        default: () => []
      };
    }
    const assets = await getAssets(id);
    if (!assets.length) return mod;
    return {
      default: (props) => {
        const {
          nonce
        } = getRequestEvent();
        useAssets(assets, nonce);
        return mod.default(props);
      }
    };
  };
  return wrapper;
};
const lazy = !isServer ? lazy$1 : (fn) => lazy$1(withAssets(fn));
const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const titleTagProperties = [];
const metaTagProperties = (
  // https://html.spec.whatwg.org/multipage/semantics.html#the-meta-element
  ["name", "http-equiv", "content", "charset", "media"].concat(["property"])
);
const getTagKey = (tag, properties) => {
  const tagProps = Object.fromEntries(Object.entries(tag.props).filter(([k]) => properties.includes(k)).sort());
  if (Object.hasOwn(tagProps, "name") || Object.hasOwn(tagProps, "property")) {
    tagProps.name = tagProps.name || tagProps.property;
    delete tagProps.property;
  }
  return tag.tag + JSON.stringify(tagProps);
};
function initClientProvider() {
  if (!sharedConfig.context) {
    const ssrTags = document.head.querySelectorAll(`[data-sm]`);
    Array.prototype.forEach.call(ssrTags, (ssrTag) => ssrTag.parentNode.removeChild(ssrTag));
  }
  const cascadedTagInstances = /* @__PURE__ */ new Map();
  function getElement(tag) {
    if (tag.ref) {
      return tag.ref;
    }
    let el = document.querySelector(`[data-sm="${tag.id}"]`);
    if (el) {
      if (el.tagName.toLowerCase() !== tag.tag) {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
        el = document.createElement(tag.tag);
      }
      el.removeAttribute("data-sm");
    } else {
      el = document.createElement(tag.tag);
    }
    return el;
  }
  return {
    addTag(tag) {
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        const properties = tag.tag === "title" ? titleTagProperties : metaTagProperties;
        const tagKey = getTagKey(tag, properties);
        if (!cascadedTagInstances.has(tagKey)) {
          cascadedTagInstances.set(tagKey, []);
        }
        let instances = cascadedTagInstances.get(tagKey);
        let index = instances.length;
        instances = [...instances, tag];
        cascadedTagInstances.set(tagKey, instances);
        let element2 = getElement(tag);
        tag.ref = element2;
        spread(element2, tag.props);
        let lastVisited = null;
        for (var i = index - 1; i >= 0; i--) {
          if (instances[i] != null) {
            lastVisited = instances[i];
            break;
          }
        }
        if (element2.parentNode != document.head) {
          document.head.appendChild(element2);
        }
        if (lastVisited && lastVisited.ref && lastVisited.ref.parentNode) {
          document.head.removeChild(lastVisited.ref);
        }
        return index;
      }
      let element = getElement(tag);
      tag.ref = element;
      spread(element, tag.props);
      if (element.parentNode != document.head) {
        document.head.appendChild(element);
      }
      return -1;
    },
    removeTag(tag, index) {
      const properties = tag.tag === "title" ? titleTagProperties : metaTagProperties;
      const tagKey = getTagKey(tag, properties);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagKey);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagKey, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
}
function initServerProvider() {
  const tags = [];
  useAssets$1(() => ssr(renderTags(tags)));
  return {
    addTag(tagDesc) {
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const properties = tagDesc.tag === "title" ? titleTagProperties : metaTagProperties;
        const tagDescKey = getTagKey(tagDesc, properties);
        const index = tags.findIndex((prev) => prev.tag === tagDesc.tag && getTagKey(prev, properties) === tagDescKey);
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
      return tags.length;
    },
    removeTag(tag, index) {
    }
  };
}
const MetaProvider = (props) => {
  const actions2 = !isServer ? initClientProvider() : initServerProvider();
  return createComponent(MetaContext.Provider, {
    value: actions2,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props, setting) => {
  useHead({
    tag,
    props,
    setting,
    id: createUniqueId(),
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const index = c.addTag(tagDesc);
    onCleanup(() => c.removeTag(tagDesc, index));
  });
}
function renderTags(tags) {
  return tags.map((tag) => {
    var _a, _b;
    const keys = Object.keys(tag.props);
    const props = keys.map((k) => k === "children" ? "" : ` ${k}="${// @ts-expect-error
    escape(tag.props[k], true)}"`).join("");
    let children2 = tag.props.children;
    if (Array.isArray(children2)) {
      children2 = children2.join("");
    }
    if ((_a = tag.setting) == null ? void 0 : _a.close) {
      return `<${tag.tag} data-sm="${tag.id}"${props}>${// @ts-expect-error
      ((_b = tag.setting) == null ? void 0 : _b.escape) ? escape(children2) : children2 || ""}</${tag.tag}>`;
    }
    return `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = (props) => MetaTag("title", props, {
  escape: true,
  close: true
});
const Meta = (props) => MetaTag("meta", props);
function createBeforeLeave() {
  let listeners = /* @__PURE__ */ new Set();
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  let ignore = false;
  function confirm(to, options) {
    if (ignore) return !(ignore = false);
    const e = {
      to,
      options,
      defaultPrevented: false,
      preventDefault: () => e.defaultPrevented = true
    };
    for (const l of listeners) l.listener({
      ...e,
      from: l.location,
      retry: (force) => {
        force && (ignore = true);
        l.navigate(to, {
          ...options,
          resolve: false
        });
      }
    });
    return !e.defaultPrevented;
  }
  return {
    subscribe,
    confirm
  };
}
let depth;
function saveCurrentDepth() {
  if (!window.history.state || window.history.state._depth == null) {
    window.history.replaceState({
      ...window.history.state,
      _depth: window.history.length - 1
    }, "");
  }
  depth = window.history.state._depth;
}
if (!isServer) {
  saveCurrentDepth();
}
function keepDepth(state) {
  return {
    ...state,
    _depth: window.history.state && window.history.state._depth
  };
}
function notifyIfNotBlocked(notify, block) {
  let ignore = false;
  return () => {
    const prevDepth = depth;
    saveCurrentDepth();
    const delta = prevDepth == null ? null : depth - prevDepth;
    if (ignore) {
      ignore = false;
      return;
    }
    if (delta && block(delta)) {
      ignore = true;
      window.history.go(-delta);
    } else {
      notify();
    }
  };
}
const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|(\/)\/+$/g;
const mockBase = "http://sr";
function normalizePath(path, omitSlash = false) {
  const s = path.replace(trimPathRegex, "$1");
  return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
}
function resolvePath(base, path, from) {
  if (hasSchemeRegex.test(path)) {
    return void 0;
  }
  const basePath = normalizePath(base);
  const fromPath = from && normalizePath(from);
  let result = "";
  if (!fromPath || path.startsWith("/")) {
    result = basePath;
  } else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
    result = basePath + fromPath;
  } else {
    result = fromPath;
  }
  return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}
function joinPaths(from, to) {
  return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
  const params = {};
  url.searchParams.forEach((value, key) => {
    if (key in params) {
      if (Array.isArray(params[key])) params[key].push(value);
      else params[key] = [params[key], value];
    } else params[key] = value;
  });
  return params;
}
function createMatcher(path, partial, matchFilters) {
  const [pattern, splat] = path.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  const len = segments.length;
  return (location) => {
    const locSegments = location.split("/").filter(Boolean);
    const lenDiff = locSegments.length - len;
    if (lenDiff < 0 || lenDiff > 0 && splat === void 0 && !partial) {
      return null;
    }
    const match = {
      path: len ? "" : "/",
      params: {}
    };
    const matchFilter = (s) => matchFilters === void 0 ? void 0 : matchFilters[s];
    for (let i = 0; i < len; i++) {
      const segment = segments[i];
      const dynamic = segment[0] === ":";
      const locSegment = dynamic ? locSegments[i] : locSegments[i].toLowerCase();
      const key = dynamic ? segment.slice(1) : segment.toLowerCase();
      if (dynamic && matchSegment(locSegment, matchFilter(key))) {
        match.params[key] = locSegment;
      } else if (dynamic || !matchSegment(locSegment, key)) {
        return null;
      }
      match.path += `/${locSegment}`;
    }
    if (splat) {
      const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
      if (matchSegment(remainder, matchFilter(splat))) {
        match.params[splat] = remainder;
      } else {
        return null;
      }
    }
    return match;
  };
}
function matchSegment(input, filter) {
  const isEqual = (s) => s === input;
  if (filter === void 0) {
    return true;
  } else if (typeof filter === "string") {
    return isEqual(filter);
  } else if (typeof filter === "function") {
    return filter(input);
  } else if (Array.isArray(filter)) {
    return filter.some(isEqual);
  } else if (filter instanceof RegExp) {
    return filter.test(input);
  }
  return false;
}
function scoreRoute(route) {
  const [pattern, splat] = route.pattern.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === void 0 ? 0 : 1));
}
function createMemoObject(fn) {
  const map = /* @__PURE__ */ new Map();
  const owner = getOwner();
  return new Proxy({}, {
    get(_, property) {
      if (!map.has(property)) {
        runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
      }
      return map.get(property)();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    ownKeys() {
      return Reflect.ownKeys(fn());
    },
    has(_, property) {
      return property in fn();
    }
  });
}
function expandOptionals(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match) return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map((p) => p + expansion)], []);
}
const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "<A> and 'use' router primitives can be only used inside a Route.");
const useRoute = () => useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
  const route = useRoute();
  return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
  const router2 = useRouter();
  return createMemo(() => {
    const to_ = to();
    return to_ !== void 0 ? router2.renderPath(to_) : to_;
  });
};
const useLocation = () => useRouter().location;
function createRoutes$1(routeDef, base = "") {
  const {
    component,
    preload,
    load,
    children: children2,
    info
  } = routeDef;
  const isLeaf = !children2 || Array.isArray(children2) && !children2.length;
  const shared = {
    key: routeDef,
    component,
    preload: preload || load,
    info
  };
  return asArray(routeDef.path).reduce((acc, originalPath) => {
    for (const expandedPath of expandOptionals(originalPath)) {
      const path = joinPaths(base, expandedPath);
      let pattern = isLeaf ? path : path.split("/*", 1)[0];
      pattern = pattern.split("/").map((s) => {
        return s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s);
      }).join("/");
      acc.push({
        ...shared,
        originalPath,
        pattern,
        matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
      });
    }
    return acc;
  }, []);
}
function createBranch(routes2, index = 0) {
  return {
    routes: routes2,
    score: scoreRoute(routes2[routes2.length - 1]) * 1e4 - index,
    matcher(location) {
      const matches = [];
      for (let i = routes2.length - 1; i >= 0; i--) {
        const route = routes2[i];
        const match = route.matcher(location);
        if (!match) {
          return null;
        }
        matches.unshift({
          ...match,
          route
        });
      }
      return matches;
    }
  };
}
function asArray(value) {
  return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", stack = [], branches = []) {
  const routeDefs = asArray(routeDef);
  for (let i = 0, len = routeDefs.length; i < len; i++) {
    const def = routeDefs[i];
    if (def && typeof def === "object") {
      if (!def.hasOwnProperty("path")) def.path = "";
      const routes2 = createRoutes$1(def, base);
      for (const route of routes2) {
        stack.push(route);
        const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
        if (def.children && !isEmptyArray) {
          createBranches(def.children, route.pattern, stack, branches);
        } else {
          const branch = createBranch([...stack], branches.length);
          branches.push(branch);
        }
        stack.pop();
      }
    }
  }
  return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
  for (let i = 0, len = branches.length; i < len; i++) {
    const match = branches[i].matcher(location);
    if (match) {
      return match;
    }
  }
  return [];
}
function createLocation(path, state, queryWrapper) {
  const origin = new URL(mockBase);
  const url = createMemo((prev) => {
    const path_ = path();
    try {
      return new URL(path_, origin);
    } catch (err) {
      console.error(`Invalid path ${path_}`);
      return prev;
    }
  }, origin, {
    equals: (a, b) => a.href === b.href
  });
  const pathname = createMemo(() => url().pathname);
  const search = createMemo(() => url().search, true);
  const hash = createMemo(() => url().hash);
  const key = () => "";
  const queryFn = on(search, () => extractSearchParams(url()));
  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    get hash() {
      return hash();
    },
    get state() {
      return state();
    },
    get key() {
      return key();
    },
    query: queryWrapper ? queryWrapper(queryFn) : createMemoObject(queryFn)
  };
}
let intent;
function getIntent() {
  return intent;
}
function createRouterContext(integration, branches, getContext, options = {}) {
  const {
    signal: [source, setSource],
    utils = {}
  } = integration;
  const parsePath = utils.parsePath || ((p) => p);
  const renderPath = utils.renderPath || ((p) => p);
  const beforeLeave = utils.beforeLeave || createBeforeLeave();
  const basePath = resolvePath("", options.base || "");
  if (basePath === void 0) {
    throw new Error(`${basePath} is not a valid base path`);
  } else if (basePath && !source().value) {
    setSource({
      value: basePath,
      replace: true,
      scroll: false
    });
  }
  const [isRouting, setIsRouting] = createSignal(false);
  let lastTransitionTarget;
  const transition = (newIntent, newTarget) => {
    if (newTarget.value === reference() && newTarget.state === state()) return;
    if (lastTransitionTarget === void 0) setIsRouting(true);
    intent = newIntent;
    lastTransitionTarget = newTarget;
    startTransition(() => {
      if (lastTransitionTarget !== newTarget) return;
      setReference(lastTransitionTarget.value);
      setState(lastTransitionTarget.state);
      resetErrorBoundaries();
      if (!isServer) submissions[1]((subs) => subs.filter((s) => s.pending));
    }).finally(() => {
      if (lastTransitionTarget !== newTarget) return;
      batch(() => {
        intent = void 0;
        if (newIntent === "navigate") navigateEnd(lastTransitionTarget);
        setIsRouting(false);
        lastTransitionTarget = void 0;
      });
    });
  };
  const [reference, setReference] = createSignal(source().value);
  const [state, setState] = createSignal(source().state);
  const location = createLocation(reference, state, utils.queryWrapper);
  const referrers = [];
  const submissions = createSignal(isServer ? initFromFlash2() : []);
  const matches = createMemo(() => {
    if (typeof options.transformUrl === "function") {
      return getRouteMatches(branches(), options.transformUrl(location.pathname));
    }
    return getRouteMatches(branches(), location.pathname);
  });
  const buildParams = () => {
    const m = matches();
    const params2 = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params2, m[i].params);
    }
    return params2;
  };
  const params = utils.paramsWrapper ? utils.paramsWrapper(buildParams, branches) : createMemoObject(buildParams);
  const baseRoute = {
    pattern: basePath,
    path: () => basePath,
    outlet: () => null,
    resolvePath(to) {
      return resolvePath(basePath, to);
    }
  };
  createRenderEffect(on(source, (source2) => transition("native", source2), {
    defer: true
  }));
  return {
    base: baseRoute,
    location,
    params,
    isRouting,
    renderPath,
    parsePath,
    navigatorFactory,
    matches,
    beforeLeave,
    preloadRoute,
    singleFlight: options.singleFlight === void 0 ? true : options.singleFlight,
    submissions
  };
  function navigateFromRoute(route, to, options2) {
    untrack(() => {
      if (typeof to === "number") {
        if (!to) ;
        else if (utils.go) {
          utils.go(to);
        } else {
          console.warn("Router integration does not support relative routing");
        }
        return;
      }
      const queryOnly = !to || to[0] === "?";
      const {
        replace,
        resolve,
        scroll,
        state: nextState
      } = {
        replace: false,
        resolve: !queryOnly,
        scroll: true,
        ...options2
      };
      const resolvedTo = resolve ? route.resolvePath(to) : resolvePath(queryOnly && location.pathname || "", to);
      if (resolvedTo === void 0) {
        throw new Error(`Path '${to}' is not a routable path`);
      } else if (referrers.length >= MAX_REDIRECTS) {
        throw new Error("Too many redirects");
      }
      const current = reference();
      if (resolvedTo !== current || nextState !== state()) {
        if (isServer) {
          const e = getRequestEvent();
          e && (e.response = {
            status: 302,
            headers: new Headers({
              Location: resolvedTo
            })
          });
          setSource({
            value: resolvedTo,
            replace,
            scroll,
            state: nextState
          });
        } else if (beforeLeave.confirm(resolvedTo, options2)) {
          referrers.push({
            value: current,
            replace,
            scroll,
            state: state()
          });
          transition("navigate", {
            value: resolvedTo,
            state: nextState
          });
        }
      }
    });
  }
  function navigatorFactory(route) {
    route = route || useContext(RouteContextObj) || baseRoute;
    return (to, options2) => navigateFromRoute(route, to, options2);
  }
  function navigateEnd(next) {
    const first = referrers[0];
    if (first) {
      setSource({
        ...next,
        replace: first.replace,
        scroll: first.scroll
      });
      referrers.length = 0;
    }
  }
  function preloadRoute(url, preloadData) {
    const matches2 = getRouteMatches(branches(), url.pathname);
    const prevIntent = intent;
    intent = "preload";
    for (let match in matches2) {
      const {
        route,
        params: params2
      } = matches2[match];
      route.component && route.component.preload && route.component.preload();
      const {
        preload
      } = route;
      preloadData && preload && runWithOwner(getContext(), () => preload({
        params: params2,
        location: {
          pathname: url.pathname,
          search: url.search,
          hash: url.hash,
          query: extractSearchParams(url),
          state: null,
          key: ""
        },
        intent: "preload"
      }));
    }
    intent = prevIntent;
  }
  function initFromFlash2() {
    const e = getRequestEvent();
    return e && e.router && e.router.submission ? [e.router.submission] : [];
  }
}
function createRouteContext(router2, parent, outlet, match) {
  const {
    base,
    location,
    params
  } = router2;
  const {
    pattern,
    component,
    preload
  } = match().route;
  const path = createMemo(() => match().path);
  component && component.preload && component.preload();
  const data = preload ? preload({
    params,
    location,
    intent: intent || "initial"
  }) : void 0;
  const route = {
    parent,
    pattern,
    path,
    outlet: () => component ? createComponent$1(component, {
      params,
      location,
      data,
      get children() {
        return outlet();
      }
    }) : outlet(),
    resolvePath(to) {
      return resolvePath(base.path(), to, path());
    }
  };
  return route;
}
const createRouterComponent = (router2) => (props) => {
  const {
    base
  } = props;
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), props.base || ""));
  let context;
  const routerState = createRouterContext(router2, branches, () => context, {
    base,
    singleFlight: props.singleFlight,
    transformUrl: props.transformUrl
  });
  router2.create && router2.create(routerState);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return createComponent(Root, {
        routerState,
        get root() {
          return props.root;
        },
        get preload() {
          return props.rootPreload || props.rootLoad;
        },
        get children() {
          return [(context = getOwner()) && null, createComponent(Routes, {
            routerState,
            get branches() {
              return branches();
            }
          })];
        }
      });
    }
  });
};
function Root(props) {
  const location = props.routerState.location;
  const params = props.routerState.params;
  const data = createMemo(() => props.preload && untrack(() => {
    props.preload({
      params,
      location,
      intent: getIntent() || "initial"
    });
  }));
  return createComponent(Show, {
    get when() {
      return props.root;
    },
    keyed: true,
    get fallback() {
      return props.children;
    },
    children: (Root2) => createComponent(Root2, {
      params,
      location,
      get data() {
        return data();
      },
      get children() {
        return props.children;
      }
    })
  });
}
function Routes(props) {
  if (isServer) {
    const e = getRequestEvent();
    if (e && e.router && e.router.dataOnly) {
      dataOnly(e, props.routerState, props.branches);
      return;
    }
    e && ((e.router || (e.router = {})).matches || (e.router.matches = props.routerState.matches().map(({
      route,
      path,
      params
    }) => ({
      path: route.originalPath,
      pattern: route.pattern,
      match: path,
      params,
      info: route.info
    }))));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(props.routerState.matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot((dispose) => {
          disposers[i] = dispose;
          next[i] = createRouteContext(props.routerState, next[i - 1] || props.routerState.base, createOutlet(() => routeStates()[i + 1]), () => {
            var _a;
            const routeMatches = props.routerState.matches();
            return (_a = routeMatches[i]) != null ? _a : routeMatches[0];
          });
        });
      }
    }
    disposers.splice(nextMatches.length).forEach((dispose) => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createOutlet(() => routeStates() && root)();
}
const createOutlet = (child) => {
  return () => createComponent(Show, {
    get when() {
      return child();
    },
    keyed: true,
    children: (child2) => createComponent(RouteContextObj.Provider, {
      value: child2,
      get children() {
        return child2.outlet();
      }
    })
  });
};
function dataOnly(event, routerState, branches) {
  const url = new URL(event.request.url);
  const prevMatches = getRouteMatches(branches, new URL(event.router.previousUrl || event.request.url).pathname);
  const matches = getRouteMatches(branches, url.pathname);
  for (let match = 0; match < matches.length; match++) {
    if (!prevMatches[match] || matches[match].route !== prevMatches[match].route) event.router.dataOnly = true;
    const {
      route,
      params
    } = matches[match];
    route.preload && route.preload({
      params,
      location: routerState.location,
      intent: "preload"
    });
  }
}
function intercept([value, setValue], get, set) {
  return [value, set ? (v) => setValue(set(v)) : setValue];
}
function createRouter(config) {
  let ignore = false;
  const wrap = (value) => typeof value === "string" ? {
    value
  } : value;
  const signal = intercept(createSignal(wrap(config.get()), {
    equals: (a, b) => a.value === b.value && a.state === b.state
  }), void 0, (next) => {
    !ignore && config.set(next);
    if (sharedConfig.registry && !sharedConfig.done) sharedConfig.done = true;
    return next;
  });
  config.init && onCleanup(config.init((value = config.get()) => {
    ignore = true;
    signal[1](wrap(value));
    ignore = false;
  }));
  return createRouterComponent({
    signal,
    create: config.create,
    utils: config.utils
  });
}
function bindEvent(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
function scrollToHash(hash, fallbackTop) {
  const el = hash && document.getElementById(hash);
  if (el) {
    el.scrollIntoView();
  } else if (fallbackTop) {
    window.scrollTo(0, 0);
  }
}
function getPath(url) {
  const u = new URL(url);
  return u.pathname + u.search;
}
function StaticRouter(props) {
  let e;
  const obj = {
    value: props.url || (e = getRequestEvent()) && getPath(e.request.url) || ""
  };
  return createRouterComponent({
    signal: [() => obj, (next) => Object.assign(obj, next)]
  })(props);
}
const actions = /* @__PURE__ */ new Map();
function setupNativeEvents(preload = true, explicitLinks = false, actionBase = "/_server", transformUrl) {
  return (router2) => {
    const basePath = router2.base.path();
    const navigateFromRoute = router2.navigatorFactory(router2.base);
    let preloadTimeout;
    let lastElement;
    function isSvg(el) {
      return el.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function handleAnchor(evt) {
      if (evt.defaultPrevented || evt.button !== 0 || evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) return;
      const a = evt.composedPath().find((el) => el instanceof Node && el.nodeName.toUpperCase() === "A");
      if (!a || explicitLinks && !a.hasAttribute("link")) return;
      const svg = isSvg(a);
      const href = svg ? a.href.baseVal : a.href;
      const target = svg ? a.target.baseVal : a.target;
      if (target || !href && !a.hasAttribute("state")) return;
      const rel = (a.getAttribute("rel") || "").split(/\s+/);
      if (a.hasAttribute("download") || rel && rel.includes("external")) return;
      const url = svg ? new URL(href, document.baseURI) : new URL(href);
      if (url.origin !== window.location.origin || basePath && url.pathname && !url.pathname.toLowerCase().startsWith(basePath.toLowerCase())) return;
      return [a, url];
    }
    function handleAnchorClick(evt) {
      const res = handleAnchor(evt);
      if (!res) return;
      const [a, url] = res;
      const to = router2.parsePath(url.pathname + url.search + url.hash);
      const state = a.getAttribute("state");
      evt.preventDefault();
      navigateFromRoute(to, {
        resolve: false,
        replace: a.hasAttribute("replace"),
        scroll: !a.hasAttribute("noscroll"),
        state: state ? JSON.parse(state) : void 0
      });
    }
    function handleAnchorPreload(evt) {
      const res = handleAnchor(evt);
      if (!res) return;
      const [a, url] = res;
      transformUrl && (url.pathname = transformUrl(url.pathname));
      router2.preloadRoute(url, a.getAttribute("preload") !== "false");
    }
    function handleAnchorMove(evt) {
      clearTimeout(preloadTimeout);
      const res = handleAnchor(evt);
      if (!res) return lastElement = null;
      const [a, url] = res;
      if (lastElement === a) return;
      transformUrl && (url.pathname = transformUrl(url.pathname));
      preloadTimeout = setTimeout(() => {
        router2.preloadRoute(url, a.getAttribute("preload") !== "false");
        lastElement = a;
      }, 20);
    }
    function handleFormSubmit(evt) {
      if (evt.defaultPrevented) return;
      let actionRef = evt.submitter && evt.submitter.hasAttribute("formaction") ? evt.submitter.getAttribute("formaction") : evt.target.getAttribute("action");
      if (!actionRef) return;
      if (!actionRef.startsWith("https://action/")) {
        const url = new URL(actionRef, mockBase);
        actionRef = router2.parsePath(url.pathname + url.search);
        if (!actionRef.startsWith(actionBase)) return;
      }
      if (evt.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const handler = actions.get(actionRef);
      if (handler) {
        evt.preventDefault();
        const data = new FormData(evt.target, evt.submitter);
        handler.call({
          r: router2,
          f: evt.target
        }, evt.target.enctype === "multipart/form-data" ? data : new URLSearchParams(data));
      }
    }
    delegateEvents(["click", "submit"]);
    document.addEventListener("click", handleAnchorClick);
    if (preload) {
      document.addEventListener("mousemove", handleAnchorMove, {
        passive: true
      });
      document.addEventListener("focusin", handleAnchorPreload, {
        passive: true
      });
      document.addEventListener("touchstart", handleAnchorPreload, {
        passive: true
      });
    }
    document.addEventListener("submit", handleFormSubmit);
    onCleanup(() => {
      document.removeEventListener("click", handleAnchorClick);
      if (preload) {
        document.removeEventListener("mousemove", handleAnchorMove);
        document.removeEventListener("focusin", handleAnchorPreload);
        document.removeEventListener("touchstart", handleAnchorPreload);
      }
      document.removeEventListener("submit", handleFormSubmit);
    });
  };
}
function Router(props) {
  if (isServer) return StaticRouter(props);
  const getSource = () => {
    const url = window.location.pathname.replace(/^\/+/, "/") + window.location.search;
    const state = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return {
      value: url + window.location.hash,
      state
    };
  };
  const beforeLeave = createBeforeLeave();
  return createRouter({
    get: getSource,
    set({
      value,
      replace,
      scroll,
      state
    }) {
      if (replace) {
        window.history.replaceState(keepDepth(state), "", value);
      } else {
        window.history.pushState(state, "", value);
      }
      scrollToHash(decodeURIComponent(window.location.hash.slice(1)), scroll);
      saveCurrentDepth();
    },
    init: (notify) => bindEvent(window, "popstate", notifyIfNotBlocked(notify, (delta) => {
      if (delta) {
        return !beforeLeave.confirm(delta);
      } else {
        const s = getSource();
        return !beforeLeave.confirm(s.value, {
          state: s.state
        });
      }
    })),
    create: setupNativeEvents(props.preload, props.explicitLinks, props.actionBase, props.transformUrl),
    utils: {
      go: (delta) => window.history.go(delta),
      beforeLeave
    }
  })(props);
}
const fileRoutes = [{ "page": true, "$component": { "src": "src/routes/index.tsx?pick=default&pick=$css", "build": () => import(
  /* @vite-ignore */
  '../_/index-QgCUysx0.mjs'
), "import": () => import(
  /* @vite-ignore */
  '../_/index-QgCUysx0.mjs'
) }, "path": "/" }];
const pageRoutes = defineRoutes(fileRoutes.filter((o) => o.page));
function defineRoutes(fileRoutes2) {
  function processRoute(routes2, route, id, full) {
    const parentRoute = Object.values(routes2).find((o) => {
      return id.startsWith(o.id + "/");
    });
    if (!parentRoute) {
      routes2.push({
        ...route,
        id,
        path: id.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/")
      });
      return routes2;
    }
    processRoute(parentRoute.children || (parentRoute.children = []), route, id.slice(parentRoute.id.length));
    return routes2;
  }
  return fileRoutes2.sort((a, b) => a.path.length - b.path.length).reduce((prevRoutes, route) => {
    return processRoute(prevRoutes, route, route.path, route.path);
  }, []);
}
const router = createRouter$2({
  routes: fileRoutes.reduce((memo, route) => {
    if (!containsHTTP(route)) return memo;
    const path = route.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (_, m) => `**:${m}`).split("/").map((s) => s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s)).join("/");
    if (/:[^/]*\?/g.test(path)) {
      throw new Error(`Optional parameters are not supported in API routes: ${path}`);
    }
    if (memo[path]) {
      throw new Error(`Duplicate API routes for "${path}" found at "${memo[path].route.path}" and "${route.path}"`);
    }
    memo[path] = {
      route
    };
    return memo;
  }, {})
});
function containsHTTP(route) {
  return route["$HEAD"] || route["$GET"] || route["$POST"] || route["$PUT"] || route["$PATCH"] || route["$DELETE"];
}
function matchAPIRoute(path, method) {
  const match = router.lookup(path);
  if (match && match.route) {
    const route = match.route;
    const handler = method === "HEAD" ? route.$HEAD || route.$GET : route[`$${method}`];
    if (handler === void 0) return;
    const isPage = route.page === true && route.$component !== void 0;
    return {
      handler,
      params: match.params,
      isPage
    };
  }
  return void 0;
}
const components = {};
function createRoutes() {
  function createRoute(route) {
    var _a, _b;
    const component = route.$component && ((_b = components[_a = route.$component.src]) != null ? _b : components[_a] = lazy(route.$component.import));
    return {
      ...route,
      ...route.$$route ? route.$$route.require().route : void 0,
      info: {
        ...route.$$route ? route.$$route.require().route.info : {},
        filesystem: true
      },
      component,
      children: route.children ? route.children.map(createRoute) : void 0
    };
  }
  const routes2 = pageRoutes.map(createRoute);
  return routes2;
}
let routes;
const FileRoutes = isServer ? () => getRequestEvent().routes : () => routes || (routes = createRoutes());
function App$1() {
  return createComponent(Router, {
    root: (props) => createComponent(MetaProvider, {
      get children() {
        return [createComponent(Title, {
          children: "Dev Agrawal"
        }), createComponent(Suspense, {
          get children() {
            return props.children;
          }
        })];
      }
    }),
    get children() {
      return createComponent(FileRoutes, {});
    }
  });
}
const app = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1
}, Symbol.toStringTag, { value: "Module" }));
const HttpStatusCode = isServer ? (props) => {
  const event = getRequestEvent();
  event.response.status = props.code;
  event.response.statusText = props.text;
  onCleanup(() => (
    // !event.nativeEvent.handled &&
    !event.complete && (event.response.status = 200)
  ));
  return null;
} : (_props) => null;
var _tmpl$$2 = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">', "</span>"], _tmpl$2$1 = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const ErrorBoundary = (props) => {
  const message = isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception";
  return createComponent(ErrorBoundary$1, {
    fallback: (error) => {
      console.error(error);
      return [ssr(_tmpl$$2, ssrHydrationKey(), escape(message)), createComponent(HttpStatusCode, {
        code: 500
      })];
    },
    get children() {
      return props.children;
    }
  });
};
const TopErrorBoundary = (props) => {
  let isError = false;
  const res = catchError(() => props.children, (err) => {
    console.error(err);
    isError = !!err;
  });
  return isError ? [ssr(_tmpl$2$1, ssrHydrationKey()), createComponent(HttpStatusCode, {
    code: 500
  })] : res;
};
const PatchVirtualDevStyles = (props) => {
};
var _tmpl$$1 = ["<script", ' type="module"', " async", "><\/script>"];
const docType = ssr("<!DOCTYPE html>");
function StartServer(props) {
  const context = getRequestEvent();
  const nonce = context.nonce;
  useAssets(context.assets, nonce);
  return createComponent(NoHydration, {
    get children() {
      return [docType, createComponent(TopErrorBoundary, {
        get children() {
          return createComponent(props.document, {
            get assets() {
              return createComponent(HydrationScript, {});
            },
            get scripts() {
              return [createComponent(PatchVirtualDevStyles, {
                nonce
              }), ssr(_tmpl$$1, ssrHydrationKey(), ssrAttribute("nonce", escape(nonce, true), false), ssrAttribute("src", escape(getSsrManifest().path("./src/entry-client.tsx"), true), false))];
            },
            get children() {
              return createComponent(Hydration, {
                get children() {
                  return createComponent(ErrorBoundary, {
                    get children() {
                      return createComponent(App$1, {});
                    }
                  });
                }
              });
            }
          });
        }
      })];
    }
  });
}
const middleware = {};
const FETCH_EVENT_CONTEXT = "solidFetchEvent";
function createFetchEvent(event) {
  return {
    request: event.req,
    response: event.res,
    clientAddress: getRequestIP(event),
    locals: {},
    nativeEvent: event
  };
}
function getFetchEvent(h3Event) {
  if (!h3Event.context[FETCH_EVENT_CONTEXT]) {
    const fetchEvent = createFetchEvent(h3Event);
    h3Event.context[FETCH_EVENT_CONTEXT] = fetchEvent;
  }
  return h3Event.context[FETCH_EVENT_CONTEXT];
}
function mergeResponseHeaders(h3Event, headers) {
  for (const [key, value] of headers.entries()) {
    h3Event.res.headers.append(key, value);
  }
}
const decorateHandler = (fn) => (event) => provideRequestEvent(getFetchEvent(event), () => fn(event));
const decorateMiddleware = (fn) => (event, next) => provideRequestEvent(getFetchEvent(event), () => fn(event, next));
const manifest = {};
async function getServerFnById(id) {
  const serverFnInfo = manifest[id];
  if (!serverFnInfo) {
    throw new Error("Server function info not found for " + id);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + id);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(
      `Server function module export not resolved for serverFn ID: ${id}`
    );
  }
  return action;
}
const validRedirectStatuses = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function getExpectedRedirectStatus(response) {
  if (response.status && validRedirectStatuses.has(response.status)) {
    return response.status;
  }
  return 302;
}
function createChunk(data) {
  const encodeData = new TextEncoder().encode(data);
  const bytes = encodeData.length;
  const baseHex = bytes.toString(16);
  const totalHex = "00000000".substring(0, 8 - baseHex.length) + baseHex;
  const head = new TextEncoder().encode(`;0x${totalHex};`);
  const chunk = new Uint8Array(12 + bytes);
  chunk.set(head);
  chunk.set(encodeData, 12);
  return chunk;
}
function serializeToStream(id, value) {
  return new ReadableStream({
    start(controller) {
      crossSerializeStream(value, {
        scopeId: id,
        plugins: [CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin],
        onSerialize(data, initial) {
          controller.enqueue(createChunk(initial ? `(${getCrossReferenceHeader(id)},${data})` : data));
        },
        onDone() {
          controller.close();
        },
        onError(error) {
          controller.error(error);
        }
      });
    }
  });
}
async function handleServerFunction(h3Event) {
  const event = getFetchEvent(h3Event);
  const request = event.request;
  const serverReference = request.headers.get("X-Server-Id");
  const instance = request.headers.get("X-Server-Instance");
  const singleFlight = request.headers.has("X-Single-Flight");
  const url = new URL(request.url);
  let functionId;
  if (serverReference) {
    [functionId] = serverReference.split("#");
  } else {
    functionId = url.searchParams.get("id");
    if (!functionId) {
      return new Response(null, {
        status: 404
      });
    }
  }
  const serverFunction = await getServerFnById(functionId);
  let parsed = [];
  if (!instance || h3Event.method === "GET") {
    const args = url.searchParams.get("args");
    if (args) {
      const json = JSON.parse(args);
      (json.t ? fromJSON(json, {
        plugins: [CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin]
      }) : json).forEach((arg) => {
        parsed.push(arg);
      });
    }
  }
  if (h3Event.method === "POST") {
    const contentType = request.headers.get("content-type");
    if ((contentType == null ? void 0 : contentType.startsWith("multipart/form-data")) || (contentType == null ? void 0 : contentType.startsWith("application/x-www-form-urlencoded"))) {
      parsed.push(await event.request.formData());
    } else if (contentType == null ? void 0 : contentType.startsWith("application/json")) {
      parsed = fromJSON(await event.request.json(), {
        plugins: [CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin]
      });
    }
  }
  try {
    let result = await provideRequestEvent(event, async () => {
      sharedConfig.context = {
        event
      };
      event.locals.serverFunctionMeta = {
        id: functionId
      };
      return serverFunction(...parsed);
    });
    if (singleFlight && instance) {
      result = await handleSingleFlight(event, result);
    }
    if (result instanceof Response) {
      if (result.headers && result.headers.has("X-Content-Raw")) return result;
      if (instance) {
        if (result.headers) mergeResponseHeaders(h3Event, result.headers);
        if (result.status && (result.status < 300 || result.status >= 400)) h3Event.res.status = result.status;
        if (result.customBody) {
          result = await result.customBody();
        } else if (result.body == void 0) result = null;
      }
    }
    if (!instance) return handleNoJS(result, request, parsed);
    h3Event.res.headers.set("content-type", "text/javascript");
    return serializeToStream(instance, result);
  } catch (x) {
    if (x instanceof Response) {
      if (singleFlight && instance) {
        x = await handleSingleFlight(event, x);
      }
      if (x.headers) mergeResponseHeaders(h3Event, x.headers);
      if (x.status && (!instance || x.status < 300 || x.status >= 400)) h3Event.res.status = x.status;
      if (x.customBody) {
        x = x.customBody();
      } else if (x.body === void 0) x = null;
      h3Event.res.headers.set("X-Error", "true");
    } else if (instance) {
      const error = x instanceof Error ? x.message : typeof x === "string" ? x : "true";
      h3Event.res.headers.set("X-Error", error.replace(/[\r\n]+/g, ""));
    } else {
      x = handleNoJS(x, request, parsed, true);
    }
    if (instance) {
      h3Event.res.headers.set("content-type", "text/javascript");
      return serializeToStream(instance, x);
    }
    return x;
  }
}
function handleNoJS(result, request, parsed, thrown) {
  const url = new URL(request.url);
  const isError = result instanceof Error;
  let statusCode = 302;
  let headers;
  if (result instanceof Response) {
    headers = new Headers(result.headers);
    if (result.headers.has("Location")) {
      headers.set(`Location`, new URL(result.headers.get("Location"), url.origin + "/").toString());
      statusCode = getExpectedRedirectStatus(result);
    }
  } else headers = new Headers({
    Location: new URL(request.headers.get("referer")).toString()
  });
  if (result) {
    headers.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({
      url: url.pathname + url.search,
      result: isError ? result.message : result,
      thrown,
      error: isError,
      input: [...parsed.slice(0, -1), [...parsed[parsed.length - 1].entries()]]
    }))}; Secure; HttpOnly;`);
  }
  return new Response(null, {
    status: statusCode,
    headers
  });
}
let App;
function createSingleFlightHeaders(sourceEvent) {
  const headers = sourceEvent.request.headers;
  const cookies = parseCookies(sourceEvent.nativeEvent);
  const SetCookies = sourceEvent.response.headers.getSetCookie();
  headers.delete("cookie");
  SetCookies.forEach((cookie) => {
    if (!cookie) return;
    const {
      maxAge,
      expires,
      name,
      value
    } = parseSetCookie$1(cookie);
    if (maxAge != null && maxAge <= 0) {
      delete cookies[name];
      return;
    }
    if (expires != null && expires.getTime() <= Date.now()) {
      delete cookies[name];
      return;
    }
    cookies[name] = value;
  });
  Object.entries(cookies).forEach(([key, value]) => {
    headers.append("cookie", `${key}=${value}`);
  });
  return headers;
}
async function handleSingleFlight(sourceEvent, result) {
  let revalidate;
  let url = new URL(sourceEvent.request.headers.get("referer")).toString();
  if (result instanceof Response) {
    if (result.headers.has("X-Revalidate")) revalidate = result.headers.get("X-Revalidate").split(",");
    if (result.headers.has("Location")) url = new URL(result.headers.get("Location"), new URL(sourceEvent.request.url).origin + "/").toString();
  }
  const event = {
    ...sourceEvent
  };
  event.request = new Request(url, {
    headers: createSingleFlightHeaders(sourceEvent)
  });
  return await provideRequestEvent(event, async () => {
    await createPageEvent(event);
    App || (App = (await Promise.resolve().then(() => app)).default);
    event.router.dataOnly = revalidate || true;
    event.router.previousUrl = sourceEvent.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = event;
        App();
      });
    } catch (e) {
      console.log(e);
    }
    const body = event.router.data;
    if (!body) return result;
    let containsKey = false;
    for (const key in body) {
      if (body[key] === void 0) delete body[key];
      else containsKey = true;
    }
    if (!containsKey) return result;
    if (!(result instanceof Response)) {
      body["_$value"] = result;
      result = new Response(null, {
        status: 200
      });
    } else if (result.customBody) {
      body["_$value"] = result.customBody();
    }
    result.customBody = () => body;
    result.headers.set("X-Single-Flight", "true");
    return result;
  });
}
const SERVER_FN_BASE = "/_server";
function createBaseHandler(createPageEvent2, fn, options = {}) {
  const handler = defineHandler({
    middleware: middleware.length ? middleware.map(decorateMiddleware) : void 0,
    handler: decorateHandler(async (e) => {
      const event = getRequestEvent();
      const url = new URL(event.request.url);
      const pathname = stripBaseUrl(url.pathname);
      if (pathname.startsWith(SERVER_FN_BASE)) {
        const serverFnResponse = await handleServerFunction(e);
        if (serverFnResponse instanceof Response) return produceResponseWithEventHeaders(serverFnResponse);
        return new Response(serverFnResponse, {
          headers: e.res.headers
        });
      }
      const match = matchAPIRoute(pathname, event.request.method);
      if (match) {
        const mod = await match.handler.import();
        const fn2 = event.request.method === "HEAD" ? mod["HEAD"] || mod["GET"] : mod[event.request.method];
        event.params = match.params || {};
        sharedConfig.context = {
          event
        };
        const res = await fn2(event);
        if (res !== void 0) {
          if (res instanceof Response) return produceResponseWithEventHeaders(res);
          return res;
        }
        if (event.request.method !== "GET") {
          throw new Error(`API handler for ${event.request.method} "${event.request.url}" did not return a response.`);
        }
        if (!match.isPage) return;
      }
      const context = await createPageEvent2(event);
      const resolvedOptions = typeof options === "function" ? await options(context) : {
        ...options
      };
      const mode = resolvedOptions.mode || "stream";
      if (resolvedOptions.nonce) context.nonce = resolvedOptions.nonce;
      if (mode === "sync" || false) {
        const html = renderToString(() => {
          sharedConfig.context.event = context;
          return fn(context);
        }, resolvedOptions);
        context.complete = true;
        if (context.response && context.response.headers.get("Location")) {
          const status = getExpectedRedirectStatus(context.response);
          return redirect(context.response.headers.get("Location"), status);
        }
        event.response.headers.set("content-type", "text/html");
        return html;
      }
      if (resolvedOptions.onCompleteAll) {
        const og = resolvedOptions.onCompleteAll;
        resolvedOptions.onCompleteAll = (options2) => {
          handleStreamCompleteRedirect(context)(options2);
          og(options2);
        };
      } else resolvedOptions.onCompleteAll = handleStreamCompleteRedirect(context);
      if (resolvedOptions.onCompleteShell) {
        const og = resolvedOptions.onCompleteShell;
        resolvedOptions.onCompleteShell = (options2) => {
          handleShellCompleteRedirect(context, e)();
          og(options2);
        };
      } else resolvedOptions.onCompleteShell = handleShellCompleteRedirect(context, e);
      const _stream = renderToStream(() => {
        sharedConfig.context.event = context;
        return fn(context);
      }, resolvedOptions);
      const stream = _stream;
      if (context.response && context.response.headers.get("Location")) {
        const status = getExpectedRedirectStatus(context.response);
        return redirect(context.response.headers.get("Location"), status);
      }
      if (mode === "async") return await stream;
      delete stream.then;
      if (globalThis.USING_SOLID_START_DEV_SERVER) return stream;
      const {
        writable,
        readable
      } = new TransformStream();
      stream.pipeTo(writable);
      return readable;
    })
  });
  const app2 = new H3();
  app2.use(handler);
  return app2;
}
function createHandler(fn, options = {}) {
  return createBaseHandler(createPageEvent, fn, options);
}
async function createPageEvent(ctx) {
  ctx.response.headers.set("Content-Type", "text/html");
  const manifest2 = getSsrManifest();
  const mergedCSS = await manifest2.getAssets("style.css");
  const assets = [
    ...mergedCSS,
    ...await manifest2.getAssets("./src/entry-client.tsx"),
    ...await manifest2.getAssets("/Users/devagr/workspace/portfolio-revamp/portfolio/rewrite/src/app.tsx")
    // ...(globalThis._importMeta_.env.START_ISLANDS
    //   ? (await serverManifest.inputs[serverManifest.handler]!.assets()).filter(
    //       s => (s as any).attrs.rel !== "modulepreload"
    //     )
    //   : [])
  ];
  const pageEvent = Object.assign(ctx, {
    assets,
    router: {
      submission: initFromFlash(ctx)
    },
    routes: createRoutes(),
    // prevUrl: prevPath || "",
    // mutation: mutation,
    // $type: FETCH_EVENT,
    complete: false,
    $islands: /* @__PURE__ */ new Set()
  });
  return pageEvent;
}
function initFromFlash(ctx) {
  const flash = getCookie(ctx.nativeEvent, "flash");
  if (!flash) return;
  try {
    const param = JSON.parse(flash);
    if (!param || !param.result) return;
    const input = [...param.input.slice(0, -1), new Map(param.input[param.input.length - 1])];
    const result = param.error ? new Error(param.result) : param.result;
    return {
      input,
      url: param.url,
      pending: false,
      result: param.thrown ? void 0 : result,
      error: param.thrown ? result : void 0
    };
  } catch (e) {
    console.error(e);
  } finally {
    setCookie(ctx.nativeEvent, "flash", "", {
      maxAge: 0
    });
  }
}
function handleShellCompleteRedirect(context, e) {
  return () => {
    if (context.response && context.response.headers.get("Location")) {
      const status = getExpectedRedirectStatus(context.response);
      e.res.status = status;
      e.res.headers.set("Location", context.response.headers.get("Location"));
    }
  };
}
function handleStreamCompleteRedirect(context) {
  return ({
    write
  }) => {
    context.complete = true;
    const to = context.response && context.response.headers.get("Location");
    to && write(`<script>window.location="${to}"<\/script>`);
  };
}
function produceResponseWithEventHeaders(res) {
  var _a, _b, _c, _d, _e, _f;
  const event = getRequestEvent();
  let ret = res;
  if (300 <= res.status && res.status < 400) {
    const cookies = (_c = (_b = (_a = res.headers).getSetCookie) == null ? void 0 : _b.call(_a)) != null ? _c : [];
    const headers = new Headers();
    res.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "set-cookie") {
        headers.set(key, value);
      }
    });
    for (const cookie of cookies) {
      headers.append("Set-Cookie", cookie);
    }
    ret = new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers
    });
  }
  const eventCookies = (_f = (_e = (_d = event.response.headers).getSetCookie) == null ? void 0 : _e.call(_d)) != null ? _f : [];
  for (const cookie of eventCookies) {
    ret.headers.append("Set-Cookie", cookie);
  }
  for (const [name, value] of event.response.headers) {
    if (name.toLowerCase() !== "set-cookie") {
      ret.headers.set(name, value);
    }
  }
  return ret;
}
function stripBaseUrl(path) {
  return path;
}
var _tmpl$ = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.ico">', "</head>"], _tmpl$2 = ["<html", ' lang="en">', '<body><div id="app">', "</div><!--$-->", "<!--/--></body></html>"];
const entryServer = createHandler(() => createComponent(StartServer, {
  document: ({
    assets,
    children: children2,
    scripts
  }) => ssr(_tmpl$2, ssrHydrationKey(), createComponent(NoHydration, {
    get children() {
      return ssr(_tmpl$, escape(assets));
    }
  }), escape(children2), escape(scripts))
}));

const entry = fromWebHandler(entryServer.fetch);

const entry$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: entry
});

export { Meta as M, Title as T, useHref as a, useLocation as b, entry$1 as e, normalizePath as n, useResolvedPath as u };
//# sourceMappingURL=entry.mjs.map
