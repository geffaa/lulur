import { Fragment, computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, h, mergeProps, nextTick, onBeforeUnmount, onMounted, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, watch, withCtx, withDirectives, withKeys, withModifiers } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { Link, createInertiaApp, router, usePage } from "@inertiajs/vue3";
import { ZiggyVue } from "ziggy-js";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// resources/js/Components/Icon.vue
var _sfc_main$29 = {
	__name: "Icon",
	__ssrInlineRender: true,
	props: {
		name: {
			type: String,
			required: true
		},
		sm: Boolean,
		xs: Boolean,
		lg: Boolean
	},
	setup(__props) {
		const props = __props;
		const cls = () => [
			"icon",
			props.sm && "sm",
			props.xs && "xs",
			props.lg && "lg"
		].filter(Boolean);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				class: cls(),
				"aria-hidden": "true"
			}, _attrs))}><use${ssrRenderAttr("href", `#i-${__props.name}`)}></use></svg>`);
		};
	}
};
var _sfc_setup$29 = _sfc_main$29.setup;
_sfc_main$29.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Icon.vue");
	return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
// \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
// resources/js/Components/IconSprite.vue
var _sfc_main$28 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<svg${ssrRenderAttrs(mergeProps({
		width: "0",
		height: "0",
		style: { "position": "absolute" },
		"aria-hidden": "true"
	}, _attrs))}><symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></symbol><symbol id="i-building-2" viewBox="0 0 24 24"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></symbol><symbol id="i-calendar" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></symbol><symbol id="i-calendar-check" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></symbol><symbol id="i-calendar-clock" viewBox="0 0 24 24"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h5"></path><path d="M17.5 17.5 16 16.3V14"></path><circle cx="16" cy="16" r="6"></circle></symbol><symbol id="i-calendar-days" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></symbol><symbol id="i-chart-column" viewBox="0 0 24 24"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></symbol><symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"></path></symbol><symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></symbol><symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></symbol><symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></symbol><symbol id="i-circle-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></symbol><symbol id="i-circle-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></symbol><symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></symbol><symbol id="i-component" viewBox="0 0 24 24"><path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"></path><path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"></path><path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"></path><path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"></path></symbol><symbol id="i-door-closed" viewBox="0 0 24 24"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path><path d="M2 20h20"></path><path d="M14 12v.01"></path></symbol><symbol id="i-door-open" viewBox="0 0 24 24"><path d="M13 4h3a2 2 0 0 1 2 2v14"></path><path d="M2 20h3"></path><path d="M13 20h9"></path><path d="M10 12v.01"></path><path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path></symbol><symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></symbol><symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></symbol><symbol id="i-file-check" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="m9 15 2 2 4-4"></path></symbol><symbol id="i-file-warning" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></symbol><symbol id="i-flower-2" viewBox="0 0 24 24"><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"></path><circle cx="12" cy="8" r="2"></circle><path d="M12 10v12"></path><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"></path><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"></path></symbol><symbol id="i-footprints" viewBox="0 0 24 24"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path><path d="M16 17h4"></path><path d="M4 13h4"></path></symbol><symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></symbol><symbol id="i-hand-coins" viewBox="0 0 24 24"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path><path d="m2 16 6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></symbol><symbol id="i-hourglass" viewBox="0 0 24 24"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></symbol><symbol id="i-id-card" viewBox="0 0 24 24"><path d="M16 10h2"></path><path d="M16 14h2"></path><path d="M6.17 15a3 3 0 0 1 5.66 0"></path><circle cx="9" cy="11" r="2"></circle><rect x="2" y="5" width="20" height="14" rx="2"></rect></symbol><symbol id="i-image-plus" viewBox="0 0 24 24"><path d="M16 5h6"></path><path d="M19 2v6"></path><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path><circle cx="9" cy="9" r="2"></circle></symbol><symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></symbol><symbol id="i-languages" viewBox="0 0 24 24"><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></symbol><symbol id="i-lightbulb" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></symbol><symbol id="i-link-2" viewBox="0 0 24 24"><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" x2="16" y1="12" y2="12"></line></symbol><symbol id="i-list" viewBox="0 0 24 24"><path d="M3 12h.01"></path><path d="M3 18h.01"></path><path d="M3 6h.01"></path><path d="M8 12h13"></path><path d="M8 18h13"></path><path d="M8 6h13"></path></symbol><symbol id="i-log-in" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></symbol><symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></symbol><symbol id="i-megaphone" viewBox="0 0 24 24"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></symbol><symbol id="i-menu" viewBox="0 0 24 24"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></symbol><symbol id="i-message-circle" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></symbol><symbol id="i-pencil" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></symbol><symbol id="i-plus" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="M12 5v14"></path></symbol><symbol id="i-receipt" viewBox="0 0 24 24"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5v-11"></path></symbol><symbol id="i-settings" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></symbol><symbol id="i-smartphone" viewBox="0 0 24 24"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></symbol><symbol id="i-sparkles" viewBox="0 0 24 24"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></symbol><symbol id="i-star" viewBox="0 0 24 24"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></symbol><symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></symbol><symbol id="i-sunrise" viewBox="0 0 24 24"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 6 4-4 4 4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></symbol><symbol id="i-sunset" viewBox="0 0 24 24"><path d="M12 10V2"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m16 6-4 4-4-4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></symbol><symbol id="i-thermometer" viewBox="0 0 24 24"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></symbol><symbol id="i-ticket" viewBox="0 0 24 24"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></symbol><symbol id="i-timer" viewBox="0 0 24 24"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></symbol><symbol id="i-triangle-alert" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></symbol><symbol id="i-user-round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></symbol><symbol id="i-user-x" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="17" x2="22" y1="8" y2="13"></line><line x1="22" x2="17" y1="8" y2="13"></line></symbol><symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></symbol><symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></symbol></svg>`);
}
var _sfc_setup$28 = _sfc_main$28.setup;
_sfc_main$28.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/IconSprite.vue");
	return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
var IconSprite_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$28, [["ssrRender", _sfc_ssrRender]]);
// resources/js/Components/Toast.vue
var _sfc_main$27 = {
	__name: "Toast",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const msg = ref(null);
		let timer = null;
		function show(kind, text) {
			msg.value = {
				kind,
				text
			};
			clearTimeout(timer);
			timer = setTimeout(() => msg.value = null, 5e3);
		}
		watch(() => page.props, (p) => {
			const first = Object.values(p.errors ?? {})[0];
			if (p.flash?.success) show("ok", p.flash.success);
			else if (p.flash?.error) show("bad", p.flash.error);
			else if (first) show("bad", first);
		}, {
			immediate: true,
			deep: false
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "toastw",
				"aria-live": "polite",
				role: "status"
			}, _attrs))}>`);
			if (msg.value) {
				_push(`<div class="${ssrRenderClass([msg.value.kind, "toast"])}">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: msg.value.kind === "ok" ? "circle-check" : "circle-alert"
				}, null, _parent));
				_push(`<span>${ssrInterpolate(msg.value.text)}</span><button type="button" class="x" aria-label="Dismiss">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "x"
				}, null, _parent));
				_push(`</button></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$27 = _sfc_main$27.setup;
_sfc_main$27.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toast.vue");
	return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
// resources/js/Layouts/AdminLayout.vue
var _sfc_main$26 = {
	__name: "AdminLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const page = usePage();
		const modules = [
			{
				key: "calendar",
				label: "Calendar",
				href: "admin.calendar",
				icon: "calendar-days"
			},
			{
				key: "bookings",
				label: "Bookings",
				href: "admin.bookings",
				icon: "list"
			},
			{
				key: "clients",
				label: "Clients",
				href: "admin.clients",
				icon: "users"
			},
			{
				key: "sales",
				label: "Sales",
				href: null,
				icon: "receipt"
			},
			{
				key: "catalog",
				label: "Catalog",
				href: "admin.catalog",
				icon: "flower-2"
			},
			{
				key: "team",
				label: "Team",
				href: "admin.team",
				icon: "id-card"
			},
			{
				key: "rooms",
				label: "Rooms",
				href: "admin.rooms",
				icon: "door-closed"
			},
			{
				key: "marketing",
				label: "Marketing",
				href: "admin.marketing",
				icon: "megaphone"
			},
			{
				key: "reports",
				label: "Reports",
				href: "admin.reports",
				icon: "chart-column"
			}
		];
		const tenant = page.props.tenant;
		const current = () => page.component.replace("Admin/", "").split("/")[0].toLowerCase();
		const isCurrent = (m) => m.key === current();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "adm" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			_push(`<nav class="rail" aria-label="Main">`);
			_push(ssrRenderComponent(unref(Link), {
				class: "tn",
				href: _ctx.route("admin.calendar"),
				"aria-label": "Tirta Spa",
				style: {
					"color": "#fff",
					"padding": "0",
					"width": "40px"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(tenant)?.logo_letter ?? "T")}`);
					else return [createTextVNode(toDisplayString(unref(tenant)?.logo_letter ?? "T"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<!--[-->`);
			ssrRenderList(modules, (m) => {
				_push(ssrRenderComponent(unref(Link), {
					key: m.key,
					href: m.href ? _ctx.route(m.href) : "#",
					"aria-current": isCurrent(m) ? "page" : void 0
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_sfc_main$29, { name: m.icon }, null, _parent, _scopeId));
							_push(`${ssrInterpolate(m.label)}`);
						} else return [createVNode(_sfc_main$29, { name: m.icon }, null, 8, ["name"]), createTextVNode(toDisplayString(m.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--><span class="sp"></span>`);
			_push(ssrRenderComponent(unref(Link), {
				href: _ctx.route("admin.settings"),
				"aria-current": current() === "settings" ? "page" : void 0
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$29, { name: "settings" }, null, _parent, _scopeId));
						_push(`Settings `);
					} else return [createVNode(_sfc_main$29, { name: "settings" }), createTextVNode("Settings ")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="av av-5" aria-hidden="true">${ssrInterpolate(unref(page).props.auth.user?.initials)}</span></nav><div class="main"><header class="mtop"><button class="ib" aria-label="Open navigation">`);
			_push(ssrRenderComponent(_sfc_main$29, { name: "menu" }, null, _parent));
			_push(`</button><span class="tn">${ssrInterpolate(unref(tenant)?.logo_letter ?? "T")}</span><b>${ssrInterpolate(unref(tenant)?.name)}</b><span style="${ssrRenderStyle({ "margin-left": "auto" })}"><span class="av sm av-5" aria-hidden="true">${ssrInterpolate(unref(page).props.auth.user?.initials)}</span></span></header>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
			_push(ssrRenderComponent(_sfc_main$27, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$26 = _sfc_main$26.setup;
_sfc_main$26.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
	return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
// resources/js/Components/Money.vue
var _sfc_main$25 = {
	__name: "Money",
	__ssrInlineRender: true,
	props: {
		amount: {
			type: Number,
			required: true
		},
		currency: {
			type: String,
			default: "IDR"
		},
		credit: Boolean
	},
	setup(__props) {
		const props = __props;
		const fmt = computed(() => {
			const v = props.amount;
			if (props.currency === "IDR") return `${v < 0 ? "−" : ""}Rp ${Math.abs(v).toLocaleString("id-ID")}`;
			return `${v < 0 ? "−" : ""}$${(Math.abs(v) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: [{ credit: __props.credit }, "num"] }, _attrs))}>${ssrInterpolate(fmt.value)}</span>`);
		};
	}
};
var _sfc_setup$25 = _sfc_main$25.setup;
_sfc_main$25.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Money.vue");
	return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
// resources/js/Components/Pick.vue
var _sfc_main$24 = {
	__name: "Pick",
	__ssrInlineRender: true,
	props: {
		modelValue: [
			String,
			Number,
			null
		],
		options: {
			type: Array,
			required: true
		},
		placeholder: {
			type: String,
			default: "Choose…"
		},
		label: String
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = ref(false);
		const active = ref(0);
		const root = ref(null);
		ref(null);
		const current = computed(() => props.options.find((o) => o.value === props.modelValue));
		function outside(e) {
			if (root.value && !root.value.contains(e.target)) close();
		}
		function close() {
			open.value = false;
			document.removeEventListener("mousedown", outside);
		}
		onBeforeUnmount(() => document.removeEventListener("mousedown", outside));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "root",
				ref: root,
				class: "pickw"
			}, _attrs))}><button type="button" class="trigger" role="combobox" aria-haspopup="listbox"${ssrRenderAttr("aria-expanded", String(open.value))}${ssrRenderAttr("aria-label", __props.label)}><span class="${ssrRenderClass([{ phd: !current.value }, "val"])}">${ssrInterpolate(current.value ? current.value.label : __props.placeholder)}</span>`);
			_push(ssrRenderComponent(_sfc_main$29, {
				sm: "",
				name: "chevron-down"
			}, null, _parent));
			_push(`</button>`);
			if (open.value) {
				_push(`<ul class="pop pick-list" role="listbox"><!--[-->`);
				ssrRenderList(__props.options, (o, i) => {
					_push(`<li role="option"${ssrRenderAttr("aria-selected", String(o.value === __props.modelValue))} class="${ssrRenderClass({
						on: i === active.value,
						sel: o.value === __props.modelValue
					})}">${ssrInterpolate(o.label)}`);
					if (o.value === __props.modelValue) _push(ssrRenderComponent(_sfc_main$29, {
						sm: "",
						name: "check"
					}, null, _parent));
					else _push(`<!---->`);
					_push(`</li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$24 = _sfc_main$24.setup;
_sfc_main$24.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pick.vue");
	return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
// resources/js/Components/DatePick.vue
var _sfc_main$23 = {
	__name: "DatePick",
	__ssrInlineRender: true,
	props: {
		modelValue: String,
		placeholder: {
			type: String,
			default: "Pick a date"
		},
		label: String
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
		const parse = (s) => s ? new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)) : null;
		const open = ref(false);
		const root = ref(null);
		const cursor = ref(parse(props.modelValue) || /* @__PURE__ */ new Date());
		const view = computed(() => new Date(cursor.value.getFullYear(), cursor.value.getMonth(), 1));
		const title = computed(() => view.value.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric"
		}));
		const shown = computed(() => props.modelValue ? parse(props.modelValue).toLocaleDateString("en-US", {
			weekday: "short",
			day: "numeric",
			month: "short",
			year: "numeric"
		}) : "");
		const days = computed(() => {
			const first = view.value;
			const start = new Date(first);
			start.setDate(1 - (first.getDay() + 6) % 7);
			return Array.from({ length: 42 }, (_, i) => {
				const d = new Date(start);
				d.setDate(start.getDate() + i);
				return d;
			});
		});
		const today = iso(/* @__PURE__ */ new Date());
		function outside(e) {
			if (root.value && !root.value.contains(e.target)) close();
		}
		function close() {
			open.value = false;
			document.removeEventListener("mousedown", outside);
		}
		onBeforeUnmount(() => document.removeEventListener("mousedown", outside));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "root",
				ref: root,
				class: "pickw"
			}, _attrs))}><button type="button" class="trigger" aria-haspopup="dialog"${ssrRenderAttr("aria-expanded", String(open.value))}${ssrRenderAttr("aria-label", __props.label)}>`);
			_push(ssrRenderComponent(_sfc_main$29, {
				sm: "",
				name: "calendar"
			}, null, _parent));
			_push(`<span class="${ssrRenderClass([{ phd: !shown.value }, "val"])}">${ssrInterpolate(shown.value || __props.placeholder)}</span></button>`);
			if (open.value) {
				_push(`<div class="pop dpick" role="dialog" aria-label="Choose date"><div class="dp-h"><button type="button" class="btn sm" aria-label="Previous month">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "chevron-left"
				}, null, _parent));
				_push(`</button><strong>${ssrInterpolate(title.value)}</strong><button type="button" class="btn sm" aria-label="Next month">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "chevron-right"
				}, null, _parent));
				_push(`</button></div><div class="dp-g" role="grid"><!--[-->`);
				ssrRenderList([
					"Mo",
					"Tu",
					"We",
					"Th",
					"Fr",
					"Sa",
					"Su"
				], (w) => {
					_push(`<span class="dp-w">${ssrInterpolate(w)}</span>`);
				});
				_push(`<!--]--><!--[-->`);
				ssrRenderList(days.value, (d) => {
					_push(`<button type="button" role="gridcell" class="${ssrRenderClass([{
						out: d.getMonth() !== view.value.getMonth(),
						sel: iso(d) === __props.modelValue,
						now: iso(d) === unref(today),
						cur: iso(d) === iso(cursor.value)
					}, "dp-d num"])}"${ssrRenderAttr("aria-selected", String(iso(d) === __props.modelValue))}${ssrRenderAttr("aria-label", d.toDateString())}>${ssrInterpolate(d.getDate())}</button>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$23 = _sfc_main$23.setup;
_sfc_main$23.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DatePick.vue");
	return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Bookings.vue
var Bookings_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$22 });
var _sfc_main$22 = {
	__name: "Bookings",
	__ssrInlineRender: true,
	props: {
		bookings: Array,
		filters: Object,
		statuses: Array
	},
	setup(__props) {
		const props = __props;
		const search = ref(props.filters.search ?? "");
		const status = ref(props.filters.status ?? "");
		function apply() {
			router.get(route("admin.bookings"), {
				search: search.value,
				status: status.value
			}, { preserveState: true });
		}
		const badgeClass = (s) => ({
			confirmed: "info",
			checked_in: "warn",
			in_service: "ok",
			completed: "",
			no_show: "bad",
			held: "brand",
			cancelled: "",
			expired: ""
		})[s] ?? "";
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Bookings</h1><p${_scopeId}>Every booking across locations — open the calendar to manage one.</p></div><div class="acts"${_scopeId}><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New booking</button></div></div><section class="card"${_scopeId}><div class="card-h" style="${ssrRenderStyle({
							"gap": "10px",
							"flex-wrap": "wrap"
						})}"${_scopeId}><div class="input" style="${ssrRenderStyle({
							"max-width": "280px",
							"height": "34px"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "list"
						}, null, _parent, _scopeId));
						_push(`<input${ssrRenderAttr("value", search.value)} placeholder="Search code or client…" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div><div style="${ssrRenderStyle({ "min-width": "180px" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: status.value,
							"onUpdate:modelValue": [($event) => status.value = $event, apply],
							label: "Status",
							options: [{
								value: "",
								label: "All statuses"
							}, ...__props.statuses.map((s) => ({
								value: s.value,
								label: s.label
							}))]
						}, null, _parent, _scopeId));
						_push(`</div><button class="btn sm"${_scopeId}>Search</button></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Code</th><th${_scopeId}>Client</th><th${_scopeId}>Service</th><th${_scopeId}>When</th><th${_scopeId}>Source</th><th${_scopeId}>Status</th><th class="n"${_scopeId}>Total</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.bookings, (b) => {
							_push(`<tr style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}><td${_scopeId}><b${_scopeId}>${ssrInterpolate(b.code)}</b></td><td${_scopeId}>${ssrInterpolate(b.client)}</td><td${_scopeId}>${ssrInterpolate(b.service)}</td><td${_scopeId}>${ssrInterpolate(b.when)}</td><td class="muted"${_scopeId}>${ssrInterpolate(b.source === "online" ? "Online" : b.source === "walk_in" ? "Walk-in" : "Phone")}</td><td${_scopeId}><span class="${ssrRenderClass([badgeClass(b.status), "badge"])}"${_scopeId}>${ssrInterpolate(b.status_label)}</span></td><td class="n"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: b.total,
								currency: b.currency
							}, null, _parent, _scopeId));
							_push(`</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.bookings.length) _push(`<tr${_scopeId}><td colspan="7" class="muted" style="${ssrRenderStyle({
							"text-align": "center",
							"padding": "24px"
						})}"${_scopeId}>No bookings match.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div></section><p class="synthetic"${_scopeId}>Synthetic demo data.</p></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Bookings"), createVNode("p", null, "Every booking across locations — open the calendar to manage one.")]), createVNode("div", { class: "acts" }, [createVNode("button", { class: "btn primary" }, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("New booking")])])]),
						createVNode("section", { class: "card" }, [createVNode("div", {
							class: "card-h",
							style: {
								"gap": "10px",
								"flex-wrap": "wrap"
							}
						}, [
							createVNode("div", {
								class: "input",
								style: {
									"max-width": "280px",
									"height": "34px"
								}
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "list"
							}), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => search.value = $event,
								placeholder: "Search code or client…",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								},
								onKeydown: withKeys(apply, ["enter"])
							}, null, 40, ["onUpdate:modelValue"]), [[vModelText, search.value]])]),
							createVNode("div", { style: { "min-width": "180px" } }, [createVNode(_sfc_main$24, {
								modelValue: status.value,
								"onUpdate:modelValue": [($event) => status.value = $event, apply],
								label: "Status",
								options: [{
									value: "",
									label: "All statuses"
								}, ...__props.statuses.map((s) => ({
									value: s.value,
									label: s.label
								}))]
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])]),
							createVNode("button", {
								class: "btn sm",
								onClick: apply
							}, "Search")
						]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Code"),
							createVNode("th", null, "Client"),
							createVNode("th", null, "Service"),
							createVNode("th", null, "When"),
							createVNode("th", null, "Source"),
							createVNode("th", null, "Status"),
							createVNode("th", { class: "n" }, "Total")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.bookings, (b) => {
							return openBlock(), createBlock("tr", {
								key: b.id,
								style: { "cursor": "pointer" },
								onClick: ($event) => unref(router).get(_ctx.route("admin.calendar", {
									booking: b.id,
									date: new Date(b.when.replace(/,/g, "")).toISOString().slice(0, 10)
								}))
							}, [
								createVNode("td", null, [createVNode("b", null, toDisplayString(b.code), 1)]),
								createVNode("td", null, toDisplayString(b.client), 1),
								createVNode("td", null, toDisplayString(b.service), 1),
								createVNode("td", null, toDisplayString(b.when), 1),
								createVNode("td", { class: "muted" }, toDisplayString(b.source === "online" ? "Online" : b.source === "walk_in" ? "Walk-in" : "Phone"), 1),
								createVNode("td", null, [createVNode("span", { class: ["badge", badgeClass(b.status)] }, toDisplayString(b.status_label), 3)]),
								createVNode("td", { class: "n" }, [createVNode(_sfc_main$25, {
									amount: b.total,
									currency: b.currency
								}, null, 8, ["amount", "currency"])])
							], 8, ["onClick"]);
						}), 128)), !__props.bookings.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
							colspan: "7",
							class: "muted",
							style: {
								"text-align": "center",
								"padding": "24px"
							}
						}, "No bookings match.")])) : createCommentVNode("", true)])])])]),
						createVNode("p", { class: "synthetic" }, "Synthetic demo data.")
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$22 = _sfc_main$22.setup;
_sfc_main$22.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Bookings.vue");
	return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Calendar.vue
var Calendar_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$21 });
var _sfc_main$21 = {
	__name: "Calendar",
	__ssrInlineRender: true,
	props: {
		date: String,
		group: String,
		locations: Array,
		location: Object,
		columns: Array,
		bookings: Array,
		selected: Object,
		now: String,
		calendarStart: String,
		calendarEnd: String,
		pxPerHour: Number
	},
	setup(__props) {
		const props = __props;
		const page = usePage();
		const day = ref(props.date);
		const group = ref(props.group);
		const loc = ref(props.location.slug);
		const sel = ref(props.selected);
		computed(() => page.props.flash);
		function navigate() {
			router.get(route("admin.calendar"), {
				date: day.value,
				group: group.value,
				location: loc.value
			}, { preserveState: true });
		}
		function shiftDate(n) {
			const d = /* @__PURE__ */ new Date(day.value + "T00:00:00");
			d.setDate(d.getDate() + n);
			day.value = d.toISOString().slice(0, 10);
			navigate();
		}
		function today() {
			day.value = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			navigate();
		}
		function dateLabel() {
			return (/* @__PURE__ */ new Date(day.value + "T00:00:00")).toLocaleDateString("en-US", {
				weekday: "long",
				month: "short",
				day: "numeric"
			});
		}
		const startHour = parseInt(props.calendarStart);
		const endHour = parseInt(props.calendarEnd);
		const PXH = props.pxPerHour;
		const colH = (endHour - startHour) * PXH;
		const tz = props.location.timezone;
		const minutesInTz = (iso) => {
			const parts = new Intl.DateTimeFormat("en-GB", {
				timeZone: tz,
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			}).formatToParts(new Date(iso));
			const h = parseInt(parts.find((p) => p.type === "hour").value);
			const m = parseInt(parts.find((p) => p.type === "minute").value);
			return h % 24 * 60 + m;
		};
		const top = (iso) => Math.max(0, (minutesInTz(iso) - startHour * 60) / 60 * PXH);
		const height = (isoStart, isoEnd) => Math.max(28, (minutesInTz(isoEnd) - minutesInTz(isoStart)) / 60 * PXH);
		const timeMarks = computed(() => {
			const out = [];
			for (let h = startHour + 1; h <= endHour; h++) out.push({
				label: `${String(h).padStart(2, "0")}:00`,
				top: (h - startHour) * PXH
			});
			return out;
		});
		const nowTop = computed(() => (minutesInTz(props.now) - startHour * 60) / 60 * PXH);
		const nowLabel = computed(() => {
			const parts = new Intl.DateTimeFormat("en-GB", {
				timeZone: tz,
				hour: "2-digit",
				minute: "2-digit",
				hour12: false
			}).formatToParts(new Date(props.now));
			return `${parts.find((p) => p.type === "hour").value}:${parts.find((p) => p.type === "minute").value}`;
		});
		const dayFormatter = new Intl.DateTimeFormat("en-GB", {
			timeZone: tz,
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
		const rangeLabel = (isoS, isoE) => `${dayFormatter.format(new Date(isoS))}–${dayFormatter.format(new Date(isoE))}`;
		const hoursLabel = (min) => `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`;
		const bookingsFor = (col) => props.bookings.filter((b) => group.value === "rooms" ? b.room_id === col.id : b.staff_ids.includes(col.id));
		function open(b) {
			fetch(route("admin.calendar.panel", b.id)).then((r) => r.json()).then((j) => {
				sel.value = j;
			});
		}
		function close() {
			sel.value = null;
		}
		function act(action) {
			router.post(route("admin.bookings.status", sel.value.id), { action }, {
				preserveScroll: true,
				onSuccess: () => {
					close();
					navigate();
				}
			});
		}
		function checkout() {
			const tip = tipMode.value === "p10" ? Math.round(sel.value.total * .1) : tipMode.value === "p5" ? Math.round(sel.value.total * .05) : tipMode.value === "custom" ? customTip.value : 0;
			router.post(route("admin.bookings.checkout", sel.value.id), {
				tip,
				tip_mode: tipMode.value
			}, {
				preserveScroll: true,
				onSuccess: () => {
					close();
					navigate();
				}
			});
		}
		const tipMode = ref("p10");
		const customTip = ref(0);
		const dragging = ref(null);
		function dragStart(b, e) {
			if (![
				"confirmed",
				"held",
				"checked_in"
			].includes(b.status)) return;
			dragging.value = {
				booking: b,
				grabOffsetMin: 0
			};
		}
		function dragEnd(col, e) {
			if (!dragging.value) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const minutes = (e.clientY - rect.top) / PXH * 60;
			const totalMin = startHour * 60 + minutes;
			const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
			const mm = String(Math.round(totalMin % 60 / 15) * 15).padStart(2, "0");
			const start = `${day.value} ${hh}:${mm === "60" ? "45" : mm}`;
			const b = dragging.value.booking;
			const staffIds = group.value === "therapists" ? [col.id] : void 0;
			const roomId = group.value === "rooms" ? col.id : void 0;
			dragging.value = null;
			router.post(route("admin.bookings.move", b.id), {
				start,
				staff_ids: staffIds,
				room_id: roomId
			}, {
				preserveScroll: true,
				onError: (errs) => alert(errs.message ?? "Cannot move this booking."),
				onSuccess: () => navigate()
			});
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="${ssrRenderClass([{ noside: !sel.value }, "calwrap"])}"${_scopeId}><div class="cal-main"${_scopeId}><div class="ctop"${_scopeId}><h1${_scopeId}>Calendar</h1><button class="trigger inline" aria-haspopup="listbox"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "map-pin"
						}, null, _parent, _scopeId));
						_push(`${ssrInterpolate(__props.location.name)}`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "chevron-down"
						}, null, _parent, _scopeId));
						_push(`</button><span class="date"${_scopeId}><button class="ib" aria-label="Previous day"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "chevron-left"
						}, null, _parent, _scopeId));
						_push(`</button><b${_scopeId}>${ssrInterpolate(dateLabel())}</b><button class="ib" aria-label="Next day"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "chevron-right"
						}, null, _parent, _scopeId));
						_push(`</button></span><button class="btn sm"${_scopeId}>Today</button><div class="r"${_scopeId}><div class="seg" role="group" aria-label="Group by"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(group.value === "therapists"))}${_scopeId}>Therapists</button><button${ssrRenderAttr("aria-pressed", String(group.value === "rooms"))}${_scopeId}>Rooms</button></div><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New booking</button></div></div><div class="legend"${_scopeId}><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-conf-bg)",
							"border-color": "var(--c-conf-bd)"
						})}"${_scopeId}></i>Confirmed</span><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-in-bg)",
							"border-color": "var(--c-in-bd)"
						})}"${_scopeId}></i>Checked in</span><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-svc-bg)",
							"border-color": "var(--c-svc-bd)"
						})}"${_scopeId}></i>In service</span><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-done-bg)",
							"border-color": "var(--c-done-bd)"
						})}"${_scopeId}></i>Completed</span><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-dep-bg)",
							"border-color": "var(--c-dep-bd)"
						})}"${_scopeId}></i>Deposit pending</span><span${_scopeId}><i style="${ssrRenderStyle({
							"background": "var(--c-ns-bg)",
							"border-color": "var(--c-ns-bd)"
						})}"${_scopeId}></i>No-show</span><span${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "file-warning"
						}, null, _parent, _scopeId));
						_push(`Form missing</span><span${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "ticket"
						}, null, _parent, _scopeId));
						_push(`Package</span><span${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "link-2"
						}, null, _parent, _scopeId));
						_push(`Linked couples booking</span></div><div class="grid-scroll"${_scopeId}><div class="cgrid" style="${ssrRenderStyle({
							minWidth: 56 + __props.columns.length * 132 + "px",
							gridTemplateColumns: `56px repeat(${__props.columns.length}, minmax(132px, 1fr))`
						})}"${_scopeId}><div class="corner"${_scopeId}></div><!--[-->`);
						ssrRenderList(__props.columns, (col) => {
							_push(`<div class="chead"${_scopeId}>`);
							if (group.value === "therapists") _push(`<!--[--><span class="${ssrRenderClass(["av-" + col.hue, "av sm"])}" aria-hidden="true"${_scopeId}>${ssrInterpolate(col.initials)}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(col.name)}</b><span class="load"${_scopeId}>${ssrInterpolate(col.specialty ?? col.level[0].toUpperCase() + col.level.slice(1))} · ${ssrInterpolate(hoursLabel(col.booked_minutes))}</span></span><!--]-->`);
							else {
								_push(`<!--[--><span class="av sm" style="${ssrRenderStyle({
									"background": "var(--hover)",
									"color": "var(--text-2)"
								})}"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "door-closed"
								}, null, _parent, _scopeId));
								_push(`</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(col.name)}</b><span class="load"${_scopeId}>${ssrInterpolate(col.room_type)} · cap ${ssrInterpolate(col.capacity)}</span></span><!--]-->`);
							}
							_push(`</div>`);
						});
						_push(`<!--]--><div class="times" style="${ssrRenderStyle({ height: colH + "px" })}"${_scopeId}><!--[-->`);
						ssrRenderList(timeMarks.value, (t) => {
							_push(`<span style="${ssrRenderStyle({ top: t.top + "px" })}"${_scopeId}>${ssrInterpolate(t.label)}</span>`);
						});
						_push(`<!--]--></div><!--[-->`);
						ssrRenderList(__props.columns, (col) => {
							_push(`<div class="col" style="${ssrRenderStyle({ height: colH + "px" })}"${_scopeId}>`);
							if (group.value === "therapists" && col.shift_start) _push(`<div class="off" style="${ssrRenderStyle({
								top: 0,
								height: top(day.value + "T" + col.shift_start) + "px"
							})}"${ssrRenderAttr("title", `Shift starts ${col.shift_start}`)}${_scopeId}></div>`);
							else _push(`<!---->`);
							_push(`<!--[-->`);
							ssrRenderList(bookingsFor(col), (b) => {
								_push(`<!--[-->`);
								if (group.value === "therapists" || b.room_id === col.id) {
									_push(`<div class="${ssrRenderClass([[b.status === "held" ? "dep" : b.status === "confirmed" ? "conf" : b.status === "checked_in" ? "in" : b.status === "in_service" ? "inserv" : b.status === "no_show" ? "ns" : "done", { sel: sel.value?.id === b.id }], "bk"])}" style="${ssrRenderStyle({
										top: top(b.start) + "px",
										height: height(b.start, b.end) + "px"
									})}"${ssrRenderAttr("title", b.status_label)} draggable="true"${_scopeId}>`);
									if (b.form_missing) {
										_push(`<span class="flag" title="Consent form missing" style="${ssrRenderStyle({ "color": "var(--warn)" })}"${_scopeId}>`);
										_push(ssrRenderComponent(_sfc_main$29, { name: "file-warning" }, null, _parent, _scopeId));
										_push(`</span>`);
									} else if (b.walk_in) {
										_push(`<span class="flag" title="Walk-in" style="${ssrRenderStyle({ "color": "var(--text-3)" })}"${_scopeId}>`);
										_push(ssrRenderComponent(_sfc_main$29, { name: "footprints" }, null, _parent, _scopeId));
										_push(`</span>`);
									} else if (b.package) {
										_push(`<span class="flag" title="Package session" style="${ssrRenderStyle({ "color": "var(--gold-text)" })}"${_scopeId}>`);
										_push(ssrRenderComponent(_sfc_main$29, { name: "ticket" }, null, _parent, _scopeId));
										_push(`</span>`);
									} else _push(`<!---->`);
									_push(`<b${_scopeId}>${ssrInterpolate(b.client)}</b><span class="s"${_scopeId}>${ssrInterpolate(b.service)} ${ssrInterpolate(b.duration)}</span><span class="m"${_scopeId}>`);
									_push(ssrRenderComponent(_sfc_main$29, {
										xs: "",
										name: b.status === "held" ? "hourglass" : b.status === "in_service" ? "sparkles" : b.status === "no_show" ? "user-x" : b.status === "checked_in" ? "door-open" : "check"
									}, null, _parent, _scopeId));
									_push(`${ssrInterpolate(rangeLabel(b.start, b.end))}<span class="sr"${_scopeId}>, ${ssrInterpolate(b.status_label)}</span></span>`);
									if (b.couples && group.value === "therapists") {
										_push(`<span class="link"${_scopeId}>`);
										_push(ssrRenderComponent(_sfc_main$29, {
											xs: "",
											name: "link-2"
										}, null, _parent, _scopeId));
										_push(`with ${ssrInterpolate(b.staff_names.filter((n) => n !== col.name).join(", "))}</span>`);
									} else _push(`<!---->`);
									_push(`<span class="m"${_scopeId}>`);
									_push(ssrRenderComponent(_sfc_main$29, {
										xs: "",
										name: "door-closed"
									}, null, _parent, _scopeId));
									_push(`${ssrInterpolate(b.room)}</span></div>`);
								} else _push(`<!---->`);
								_push(`<!--]-->`);
							});
							_push(`<!--]-->`);
							if ((/* @__PURE__ */ new Date()).toISOString().slice(0, 10) === day.value.value) _push(`<div class="now" style="${ssrRenderStyle({ top: nowTop.value + "px" })}"${_scopeId}></div>`);
							else _push(`<!---->`);
							if ((/* @__PURE__ */ new Date()).toISOString().slice(0, 10) === day.value.value) _push(`<div class="nowlab" style="${ssrRenderStyle({ top: nowTop.value + "px" })}"${_scopeId}>${ssrInterpolate(nowLabel.value)}</div>`);
							else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div></div></div>`);
						if (sel.value) {
							_push(`<aside class="panel" aria-label="Booking details"${_scopeId}><div class="panel-h"${_scopeId}><div class="top2"${_scopeId}><span class="${ssrRenderClass([{
								ok: ["confirmed", "checked_in"].includes(sel.value.status),
								bad: sel.value.status === "no_show"
							}, "badge"])}"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: sel.value.status === "in_service" ? "sparkles" : sel.value.status === "held" ? "hourglass" : "check" }, null, _parent, _scopeId));
							_push(`${ssrInterpolate(sel.value.status_label)}</span><span class="muted small"${_scopeId}>${ssrInterpolate(sel.value.code)} · booked ${ssrInterpolate(sel.value.online ? "online" : sel.value.source === "walk_in" ? "walk-in" : "phone")} ${ssrInterpolate(sel.value.booked_at)}</span><button class="ib x" aria-label="Close"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: "x" }, null, _parent, _scopeId));
							_push(`</button></div><h2${_scopeId}>${ssrInterpolate(sel.value.service)}</h2><span class="muted small"${_scopeId}>${ssrInterpolate(sel.value.when)}–${ssrInterpolate(sel.value.ends_at)}`);
							if (sel.value.ends_in_min) _push(`<!--[--> · ends in ${ssrInterpolate(sel.value.ends_in_min)} min<!--]-->`);
							else _push(`<!---->`);
							_push(`</span></div><div class="psec"${_scopeId}><h3${_scopeId}>Guests</h3><!--[-->`);
							ssrRenderList(sel.value.guests, (g, i) => {
								_push(`<div class="guest"${_scopeId}><span class="${ssrRenderClass(["av-" + (i % 7 + 1), "av"])}" aria-hidden="true"${_scopeId}>${ssrInterpolate(g.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase())}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(g.name)}</b>`);
								if (g.prefs) _push(`<small${_scopeId}>${ssrInterpolate(g.prefs)}</small>`);
								else _push(`<!---->`);
								_push(`</span>`);
								if (g.form_signed !== null) {
									_push(`<span class="${ssrRenderClass([g.form_signed ? "ok" : "warn", "badge"])}"${_scopeId}>`);
									_push(ssrRenderComponent(_sfc_main$29, { name: g.form_signed ? "file-check" : "file-warning" }, null, _parent, _scopeId));
									_push(`${ssrInterpolate(g.form_signed ? "Form signed" : "Form missing")}</span>`);
								} else _push(`<!---->`);
								_push(`</div>`);
							});
							_push(`<!--]--></div><div class="psec"${_scopeId}><h3${_scopeId}>Resources</h3><div class="res"${_scopeId}><div${_scopeId}><small${_scopeId}>ROOM</small><b${_scopeId}>${ssrInterpolate(sel.value.room.name)}</b><span class="muted small"${_scopeId}>${ssrInterpolate(sel.value.room.type)}</span></div><div${_scopeId}><small${_scopeId}>THERAPISTS</small><b${_scopeId}>${ssrInterpolate(sel.value.therapists.map((t) => t.name).join(" · "))}</b><span class="muted small"${_scopeId}>${ssrInterpolate(sel.value.therapists.map((t) => t.level).join(", "))}</span></div></div>`);
							if (sel.value.moves_resources) {
								_push(`<div class="note brand"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "info"
								}, null, _parent, _scopeId));
								_push(`<span${_scopeId}>Moving this booking also moves both therapists. Lulur checks the suite and both schedules before saving.</span></div>`);
							} else _push(`<!---->`);
							_push(`</div><div class="psec money"${_scopeId}><h3${_scopeId}>Payment</h3><!--[-->`);
							ssrRenderList(sel.value.lines, (l, i) => {
								_push(`<div class="row"${_scopeId}><span${_scopeId}>${ssrInterpolate(l.label)}</span><span class="${ssrRenderClass({ credit: l.credit })}"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: l.credit ? l.amount : l.amount,
									currency: sel.value.currency
								}, null, _parent, _scopeId));
								_push(`</span></div>`);
							});
							_push(`<!--]--><div class="row tot"${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--text)" })}"${_scopeId}>Balance due</span><span${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: sel.value.balance_due,
								currency: sel.value.currency
							}, null, _parent, _scopeId));
							_push(`</span></div></div><div class="psec"${_scopeId}><h3${_scopeId}>Tip for ${ssrInterpolate(sel.value.tip_staff)}</h3><div class="tips" role="group" aria-label="Tip"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(tipMode.value === "none"))}${_scopeId}>None</button><button${ssrRenderAttr("aria-pressed", String(tipMode.value === "p5"))}${_scopeId}>5%</button><button${ssrRenderAttr("aria-pressed", String(tipMode.value === "p10"))}${_scopeId}>10%</button><button${ssrRenderAttr("aria-pressed", String(tipMode.value === "custom"))}${_scopeId}>Custom</button></div>`);
							if (tipMode.value === "custom") _push(`<input${ssrRenderAttr("value", customTip.value)} type="number" class="input" style="${ssrRenderStyle({ "height": "34px" })}" placeholder="Tip amount"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<span class="muted small"${_scopeId}>Split equally · editable at checkout</span></div><div class="pact"${_scopeId}>`);
							if (sel.value.status === "held") {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "check"
								}, null, _parent, _scopeId));
								_push(`Confirm (deposit received)</button>`);
							} else if (sel.value.status === "confirmed") {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "door-open"
								}, null, _parent, _scopeId));
								_push(`Check in</button>`);
							} else if (sel.value.status === "checked_in") {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "sparkles"
								}, null, _parent, _scopeId));
								_push(`Start service</button>`);
							} else if (sel.value.status === "in_service") {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "receipt"
								}, null, _parent, _scopeId));
								_push(`Checkout · `);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: sel.value.balance_due + (tipMode.value === "p10" ? Math.round(sel.value.total * .1) : tipMode.value === "p5" ? Math.round(sel.value.total * .05) : tipMode.value === "custom" ? customTip.value : 0),
									currency: sel.value.currency
								}, null, _parent, _scopeId));
								_push(`</button>`);
							} else if (sel.value.status === "no_show" && ["owner", "manager"].includes(unref(page).props.auth.role)) {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "hand-coins"
								}, null, _parent, _scopeId));
								_push(`Charge no-show fee</button>`);
							} else _push(`<!---->`);
							_push(`<div style="${ssrRenderStyle({
								"display": "grid",
								"grid-template-columns": "1fr 1fr",
								"gap": "8px"
							})}"${_scopeId}>`);
							if (["confirmed", "checked_in"].includes(sel.value.status)) {
								_push(`<button class="btn"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "user-x"
								}, null, _parent, _scopeId));
								_push(`No-show</button>`);
							} else _push(`<!---->`);
							_push(`<button class="btn"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "calendar-clock"
							}, null, _parent, _scopeId));
							_push(`Reschedule</button></div></div></aside>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: ["calwrap", { noside: !sel.value }] }, [createVNode("div", { class: "cal-main" }, [
						createVNode("div", { class: "ctop" }, [
							createVNode("h1", null, "Calendar"),
							createVNode("button", {
								class: "trigger inline",
								"aria-haspopup": "listbox"
							}, [
								createVNode(_sfc_main$29, {
									sm: "",
									name: "map-pin"
								}),
								createTextVNode(toDisplayString(__props.location.name), 1),
								createVNode(_sfc_main$29, {
									sm: "",
									name: "chevron-down"
								})
							]),
							createVNode("span", { class: "date" }, [
								createVNode("button", {
									class: "ib",
									"aria-label": "Previous day",
									onClick: ($event) => shiftDate(-1)
								}, [createVNode(_sfc_main$29, {
									sm: "",
									name: "chevron-left"
								})], 8, ["onClick"]),
								createVNode("b", null, toDisplayString(dateLabel()), 1),
								createVNode("button", {
									class: "ib",
									"aria-label": "Next day",
									onClick: ($event) => shiftDate(1)
								}, [createVNode(_sfc_main$29, {
									sm: "",
									name: "chevron-right"
								})], 8, ["onClick"])
							]),
							createVNode("button", {
								class: "btn sm",
								onClick: today
							}, "Today"),
							createVNode("div", { class: "r" }, [createVNode("div", {
								class: "seg",
								role: "group",
								"aria-label": "Group by"
							}, [createVNode("button", {
								"aria-pressed": String(group.value === "therapists"),
								onClick: ($event) => {
									group.value = "therapists";
									navigate();
								}
							}, "Therapists", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(group.value === "rooms"),
								onClick: ($event) => {
									group.value = "rooms";
									navigate();
								}
							}, "Rooms", 8, ["aria-pressed", "onClick"])]), createVNode("button", {
								class: "btn primary",
								onClick: ($event) => unref(router).get(_ctx.route("admin.bookings"))
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "plus"
							}), createTextVNode("New booking")], 8, ["onClick"])])
						]),
						createVNode("div", { class: "legend" }, [
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-conf-bg)",
								"border-color": "var(--c-conf-bd)"
							} }), createTextVNode("Confirmed")]),
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-in-bg)",
								"border-color": "var(--c-in-bd)"
							} }), createTextVNode("Checked in")]),
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-svc-bg)",
								"border-color": "var(--c-svc-bd)"
							} }), createTextVNode("In service")]),
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-done-bg)",
								"border-color": "var(--c-done-bd)"
							} }), createTextVNode("Completed")]),
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-dep-bg)",
								"border-color": "var(--c-dep-bd)"
							} }), createTextVNode("Deposit pending")]),
							createVNode("span", null, [createVNode("i", { style: {
								"background": "var(--c-ns-bg)",
								"border-color": "var(--c-ns-bd)"
							} }), createTextVNode("No-show")]),
							createVNode("span", null, [createVNode(_sfc_main$29, {
								xs: "",
								name: "file-warning"
							}), createTextVNode("Form missing")]),
							createVNode("span", null, [createVNode(_sfc_main$29, {
								xs: "",
								name: "ticket"
							}), createTextVNode("Package")]),
							createVNode("span", null, [createVNode(_sfc_main$29, {
								xs: "",
								name: "link-2"
							}), createTextVNode("Linked couples booking")])
						]),
						createVNode("div", { class: "grid-scroll" }, [createVNode("div", {
							class: "cgrid",
							style: {
								minWidth: 56 + __props.columns.length * 132 + "px",
								gridTemplateColumns: `56px repeat(${__props.columns.length}, minmax(132px, 1fr))`
							}
						}, [
							createVNode("div", { class: "corner" }),
							(openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (col) => {
								return openBlock(), createBlock("div", {
									key: col.id,
									class: "chead"
								}, [group.value === "therapists" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("span", {
									class: ["av sm", "av-" + col.hue],
									"aria-hidden": "true"
								}, toDisplayString(col.initials), 3), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(col.name), 1), createVNode("span", { class: "load" }, toDisplayString(col.specialty ?? col.level[0].toUpperCase() + col.level.slice(1)) + " · " + toDisplayString(hoursLabel(col.booked_minutes)), 1)])], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("span", {
									class: "av sm",
									style: {
										"background": "var(--hover)",
										"color": "var(--text-2)"
									}
								}, [createVNode(_sfc_main$29, {
									xs: "",
									name: "door-closed"
								})]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(col.name), 1), createVNode("span", { class: "load" }, toDisplayString(col.room_type) + " · cap " + toDisplayString(col.capacity), 1)])], 64))]);
							}), 128)),
							createVNode("div", {
								class: "times",
								style: { height: colH + "px" }
							}, [(openBlock(true), createBlock(Fragment, null, renderList(timeMarks.value, (t) => {
								return openBlock(), createBlock("span", {
									key: t.label,
									style: { top: t.top + "px" }
								}, toDisplayString(t.label), 5);
							}), 128))], 4),
							(openBlock(true), createBlock(Fragment, null, renderList(__props.columns, (col) => {
								return openBlock(), createBlock("div", {
									key: "c" + col.id,
									class: "col",
									style: { height: colH + "px" },
									onDragover: withModifiers(() => {}, ["prevent"]),
									onDrop: withModifiers(($event) => dragEnd(col, $event), ["prevent"])
								}, [
									group.value === "therapists" && col.shift_start ? (openBlock(), createBlock("div", {
										key: 0,
										class: "off",
										style: {
											top: 0,
											height: top(day.value + "T" + col.shift_start) + "px"
										},
										title: `Shift starts ${col.shift_start}`
									}, null, 12, ["title"])) : createCommentVNode("", true),
									(openBlock(true), createBlock(Fragment, null, renderList(bookingsFor(col), (b) => {
										return openBlock(), createBlock(Fragment, { key: b.id }, [group.value === "therapists" || b.room_id === col.id ? (openBlock(), createBlock("div", {
											key: 0,
											class: ["bk", [b.status === "held" ? "dep" : b.status === "confirmed" ? "conf" : b.status === "checked_in" ? "in" : b.status === "in_service" ? "inserv" : b.status === "no_show" ? "ns" : "done", { sel: sel.value?.id === b.id }]],
											style: {
												top: top(b.start) + "px",
												height: height(b.start, b.end) + "px"
											},
											title: b.status_label,
											draggable: "true",
											onDragstart: ($event) => dragStart(b, $event),
											onClick: ($event) => open(b)
										}, [
											b.form_missing ? (openBlock(), createBlock("span", {
												key: 0,
												class: "flag",
												title: "Consent form missing",
												style: { "color": "var(--warn)" }
											}, [createVNode(_sfc_main$29, { name: "file-warning" })])) : b.walk_in ? (openBlock(), createBlock("span", {
												key: 1,
												class: "flag",
												title: "Walk-in",
												style: { "color": "var(--text-3)" }
											}, [createVNode(_sfc_main$29, { name: "footprints" })])) : b.package ? (openBlock(), createBlock("span", {
												key: 2,
												class: "flag",
												title: "Package session",
												style: { "color": "var(--gold-text)" }
											}, [createVNode(_sfc_main$29, { name: "ticket" })])) : createCommentVNode("", true),
											createVNode("b", null, toDisplayString(b.client), 1),
											createVNode("span", { class: "s" }, toDisplayString(b.service) + " " + toDisplayString(b.duration), 1),
											createVNode("span", { class: "m" }, [
												createVNode(_sfc_main$29, {
													xs: "",
													name: b.status === "held" ? "hourglass" : b.status === "in_service" ? "sparkles" : b.status === "no_show" ? "user-x" : b.status === "checked_in" ? "door-open" : "check"
												}, null, 8, ["name"]),
												createTextVNode(toDisplayString(rangeLabel(b.start, b.end)), 1),
												createVNode("span", { class: "sr" }, ", " + toDisplayString(b.status_label), 1)
											]),
											b.couples && group.value === "therapists" ? (openBlock(), createBlock("span", {
												key: 3,
												class: "link"
											}, [createVNode(_sfc_main$29, {
												xs: "",
												name: "link-2"
											}), createTextVNode("with " + toDisplayString(b.staff_names.filter((n) => n !== col.name).join(", ")), 1)])) : createCommentVNode("", true),
											createVNode("span", { class: "m" }, [createVNode(_sfc_main$29, {
												xs: "",
												name: "door-closed"
											}), createTextVNode(toDisplayString(b.room), 1)])
										], 46, [
											"title",
											"onDragstart",
											"onClick"
										])) : createCommentVNode("", true)], 64);
									}), 128)),
									(/* @__PURE__ */ new Date()).toISOString().slice(0, 10) === day.value.value ? (openBlock(), createBlock("div", {
										key: 1,
										class: "now",
										style: { top: nowTop.value + "px" }
									}, null, 4)) : createCommentVNode("", true),
									(/* @__PURE__ */ new Date()).toISOString().slice(0, 10) === day.value.value ? (openBlock(), createBlock("div", {
										key: 2,
										class: "nowlab",
										style: { top: nowTop.value + "px" }
									}, toDisplayString(nowLabel.value), 5)) : createCommentVNode("", true)
								], 44, ["onDragover", "onDrop"]);
							}), 128))
						], 4)])
					]), sel.value ? (openBlock(), createBlock("aside", {
						key: 0,
						class: "panel",
						"aria-label": "Booking details"
					}, [
						createVNode("div", { class: "panel-h" }, [
							createVNode("div", { class: "top2" }, [
								createVNode("span", { class: ["badge", {
									ok: ["confirmed", "checked_in"].includes(sel.value.status),
									bad: sel.value.status === "no_show"
								}] }, [createVNode(_sfc_main$29, { name: sel.value.status === "in_service" ? "sparkles" : sel.value.status === "held" ? "hourglass" : "check" }, null, 8, ["name"]), createTextVNode(toDisplayString(sel.value.status_label), 1)], 2),
								createVNode("span", { class: "muted small" }, toDisplayString(sel.value.code) + " · booked " + toDisplayString(sel.value.online ? "online" : sel.value.source === "walk_in" ? "walk-in" : "phone") + " " + toDisplayString(sel.value.booked_at), 1),
								createVNode("button", {
									class: "ib x",
									"aria-label": "Close",
									onClick: close
								}, [createVNode(_sfc_main$29, { name: "x" })])
							]),
							createVNode("h2", null, toDisplayString(sel.value.service), 1),
							createVNode("span", { class: "muted small" }, [createTextVNode(toDisplayString(sel.value.when) + "–" + toDisplayString(sel.value.ends_at), 1), sel.value.ends_in_min ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" · ends in " + toDisplayString(sel.value.ends_in_min) + " min", 1)], 64)) : createCommentVNode("", true)])
						]),
						createVNode("div", { class: "psec" }, [createVNode("h3", null, "Guests"), (openBlock(true), createBlock(Fragment, null, renderList(sel.value.guests, (g, i) => {
							return openBlock(), createBlock("div", {
								key: i,
								class: "guest"
							}, [
								createVNode("span", {
									class: ["av", "av-" + (i % 7 + 1)],
									"aria-hidden": "true"
								}, toDisplayString(g.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()), 3),
								createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(g.name), 1), g.prefs ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(g.prefs), 1)) : createCommentVNode("", true)]),
								g.form_signed !== null ? (openBlock(), createBlock("span", {
									key: 0,
									class: ["badge", g.form_signed ? "ok" : "warn"]
								}, [createVNode(_sfc_main$29, { name: g.form_signed ? "file-check" : "file-warning" }, null, 8, ["name"]), createTextVNode(toDisplayString(g.form_signed ? "Form signed" : "Form missing"), 1)], 2)) : createCommentVNode("", true)
							]);
						}), 128))]),
						createVNode("div", { class: "psec" }, [
							createVNode("h3", null, "Resources"),
							createVNode("div", { class: "res" }, [createVNode("div", null, [
								createVNode("small", null, "ROOM"),
								createVNode("b", null, toDisplayString(sel.value.room.name), 1),
								createVNode("span", { class: "muted small" }, toDisplayString(sel.value.room.type), 1)
							]), createVNode("div", null, [
								createVNode("small", null, "THERAPISTS"),
								createVNode("b", null, toDisplayString(sel.value.therapists.map((t) => t.name).join(" · ")), 1),
								createVNode("span", { class: "muted small" }, toDisplayString(sel.value.therapists.map((t) => t.level).join(", ")), 1)
							])]),
							sel.value.moves_resources ? (openBlock(), createBlock("div", {
								key: 0,
								class: "note brand"
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "info"
							}), createVNode("span", null, "Moving this booking also moves both therapists. Lulur checks the suite and both schedules before saving.")])) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "psec money" }, [
							createVNode("h3", null, "Payment"),
							(openBlock(true), createBlock(Fragment, null, renderList(sel.value.lines, (l, i) => {
								return openBlock(), createBlock("div", {
									key: i,
									class: "row"
								}, [createVNode("span", null, toDisplayString(l.label), 1), createVNode("span", { class: { credit: l.credit } }, [createVNode(_sfc_main$25, {
									amount: l.credit ? l.amount : l.amount,
									currency: sel.value.currency
								}, null, 8, ["amount", "currency"])], 2)]);
							}), 128)),
							createVNode("div", { class: "row tot" }, [createVNode("span", { style: { "color": "var(--text)" } }, "Balance due"), createVNode("span", null, [createVNode(_sfc_main$25, {
								amount: sel.value.balance_due,
								currency: sel.value.currency
							}, null, 8, ["amount", "currency"])])])
						]),
						createVNode("div", { class: "psec" }, [
							createVNode("h3", null, "Tip for " + toDisplayString(sel.value.tip_staff), 1),
							createVNode("div", {
								class: "tips",
								role: "group",
								"aria-label": "Tip"
							}, [
								createVNode("button", {
									"aria-pressed": String(tipMode.value === "none"),
									onClick: ($event) => tipMode.value = "none"
								}, "None", 8, ["aria-pressed", "onClick"]),
								createVNode("button", {
									"aria-pressed": String(tipMode.value === "p5"),
									onClick: ($event) => tipMode.value = "p5"
								}, "5%", 8, ["aria-pressed", "onClick"]),
								createVNode("button", {
									"aria-pressed": String(tipMode.value === "p10"),
									onClick: ($event) => tipMode.value = "p10"
								}, "10%", 8, ["aria-pressed", "onClick"]),
								createVNode("button", {
									"aria-pressed": String(tipMode.value === "custom"),
									onClick: ($event) => tipMode.value = "custom"
								}, "Custom", 8, ["aria-pressed", "onClick"])
							]),
							tipMode.value === "custom" ? withDirectives((openBlock(), createBlock("input", {
								key: 0,
								"onUpdate:modelValue": ($event) => customTip.value = $event,
								type: "number",
								class: "input",
								style: { "height": "34px" },
								placeholder: "Tip amount"
							}, null, 8, ["onUpdate:modelValue"])), [[
								vModelText,
								customTip.value,
								void 0,
								{ number: true }
							]]) : createCommentVNode("", true),
							createVNode("span", { class: "muted small" }, "Split equally · editable at checkout")
						]),
						createVNode("div", { class: "pact" }, [sel.value.status === "held" ? (openBlock(), createBlock("button", {
							key: 0,
							class: "btn primary",
							onClick: ($event) => act("confirm")
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "check"
						}), createTextVNode("Confirm (deposit received)")], 8, ["onClick"])) : sel.value.status === "confirmed" ? (openBlock(), createBlock("button", {
							key: 1,
							class: "btn primary",
							onClick: ($event) => act("check_in")
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "door-open"
						}), createTextVNode("Check in")], 8, ["onClick"])) : sel.value.status === "checked_in" ? (openBlock(), createBlock("button", {
							key: 2,
							class: "btn primary",
							onClick: ($event) => act("start")
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "sparkles"
						}), createTextVNode("Start service")], 8, ["onClick"])) : sel.value.status === "in_service" ? (openBlock(), createBlock("button", {
							key: 3,
							class: "btn primary",
							onClick: ($event) => checkout()
						}, [
							createVNode(_sfc_main$29, {
								sm: "",
								name: "receipt"
							}),
							createTextVNode("Checkout · "),
							createVNode(_sfc_main$25, {
								amount: sel.value.balance_due + (tipMode.value === "p10" ? Math.round(sel.value.total * .1) : tipMode.value === "p5" ? Math.round(sel.value.total * .05) : tipMode.value === "custom" ? customTip.value : 0),
								currency: sel.value.currency
							}, null, 8, ["amount", "currency"])
						], 8, ["onClick"])) : sel.value.status === "no_show" && ["owner", "manager"].includes(unref(page).props.auth.role) ? (openBlock(), createBlock("button", {
							key: 4,
							class: "btn primary",
							onClick: ($event) => unref(router).post(_ctx.route("admin.bookings.noshowfee", sel.value.id), {}, { onSuccess: () => navigate() })
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "hand-coins"
						}), createTextVNode("Charge no-show fee")], 8, ["onClick"])) : createCommentVNode("", true), createVNode("div", { style: {
							"display": "grid",
							"grid-template-columns": "1fr 1fr",
							"gap": "8px"
						} }, [["confirmed", "checked_in"].includes(sel.value.status) ? (openBlock(), createBlock("button", {
							key: 0,
							class: "btn",
							onClick: ($event) => act("no_show")
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "user-x"
						}), createTextVNode("No-show")], 8, ["onClick"])) : createCommentVNode("", true), createVNode("button", {
							class: "btn",
							onClick: ($event) => unref(router).get(_ctx.route("admin.bookings"))
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "calendar-clock"
						}), createTextVNode("Reschedule")], 8, ["onClick"])])])
					])) : createCommentVNode("", true)], 2)];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$21 = _sfc_main$21.setup;
_sfc_main$21.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Calendar.vue");
	return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Catalog.vue
var Catalog_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$20 });
var _sfc_main$20 = {
	__name: "Catalog",
	__ssrInlineRender: true,
	props: {
		tab: String,
		services: Array,
		packages: Array,
		forms: Array,
		currency: String
	},
	setup(__props) {
		const tab = ref(__props.tab);
		const tabs = [
			{
				id: "services",
				label: "Services"
			},
			{
				id: "packages",
				label: "Packages"
			},
			{
				id: "forms",
				label: "Forms"
			}
		];
		const roomLabel = {
			single: "Single room",
			couples: "Couples suite",
			facial: "Facial room",
			wet: "Wet room",
			any: "Any room"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Catalog</h1><p${_scopeId}>What bookable services need — rooms, therapists, forms and deposit rules.</p></div><div class="acts"${_scopeId}>`);
						if (tab.value === "services") {
							_push(`<button class="btn primary"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "plus"
							}, null, _parent, _scopeId));
							_push(`New service</button>`);
						} else _push(`<!---->`);
						_push(`</div></div><div class="seg" role="tablist" style="${ssrRenderStyle({ "margin-bottom": "16px" })}"${_scopeId}><!--[-->`);
						ssrRenderList(tabs, (t) => {
							_push(`<button${ssrRenderAttr("aria-pressed", String(tab.value === t.id))}${_scopeId}>${ssrInterpolate(t.label)}</button>`);
						});
						_push(`<!--]--></div>`);
						if (tab.value === "services") {
							_push(`<section class="card"${_scopeId}><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Service</th><th${_scopeId}>Category</th><th${_scopeId}>Room</th><th class="n"${_scopeId}>Durations</th><th class="n"${_scopeId}>Prices</th><th${_scopeId}>Form</th><th class="n"${_scopeId}>Skilled staff</th><th${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
							ssrRenderList(__props.services, (s) => {
								_push(`<tr style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}><td${_scopeId}>`);
								_push(ssrRenderComponent(unref(Link), {
									href: _ctx.route("admin.catalog.services.edit", s.id),
									class: "cellp"
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											if (s.photo) _push(`<img${ssrRenderAttr("src", s.photo)} alt="" style="${ssrRenderStyle({
												"width": "40px",
												"height": "40px",
												"border-radius": "8px",
												"object-fit": "cover"
											})}"${_scopeId}>`);
											else _push(`<!---->`);
											_push(`<span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(s.name)} `);
											if (s.badge === "signature") {
												_push(`<span class="badge gold" style="${ssrRenderStyle({ "margin-left": "4px" })}"${_scopeId}>`);
												_push(ssrRenderComponent(_sfc_main$29, {
													xs: "",
													name: "star"
												}, null, _parent, _scopeId));
												_push(`Signature</span>`);
											} else _push(`<!---->`);
											_push(`</b><small${_scopeId}>${ssrInterpolate(s.buffer)} min buffer</small></span>`);
										} else return [s.photo ? (openBlock(), createBlock("img", {
											key: 0,
											src: s.photo,
											alt: "",
											style: {
												"width": "40px",
												"height": "40px",
												"border-radius": "8px",
												"object-fit": "cover"
											}
										}, null, 8, ["src"])) : createCommentVNode("", true), createVNode("span", { class: "t2" }, [createVNode("b", null, [createTextVNode(toDisplayString(s.name) + " ", 1), s.badge === "signature" ? (openBlock(), createBlock("span", {
											key: 0,
											class: "badge gold",
											style: { "margin-left": "4px" }
										}, [createVNode(_sfc_main$29, {
											xs: "",
											name: "star"
										}), createTextVNode("Signature")])) : createCommentVNode("", true)]), createVNode("small", null, toDisplayString(s.buffer) + " min buffer", 1)])];
									}),
									_: 2
								}, _parent, _scopeId));
								_push(`</td><td${_scopeId}>${ssrInterpolate(s.category)}</td><td${_scopeId}>${ssrInterpolate(roomLabel[s.room_type])}`);
								if (s.therapists_needed > 1) _push(`<!--[--> · 2 therapists<!--]-->`);
								else _push(`<!---->`);
								_push(`</td><td class="n"${_scopeId}>${ssrInterpolate(s.variants.map((v) => v.duration).join(" / "))} min</td><td class="n"${_scopeId}>${ssrInterpolate(s.variants.map((v) => __props.currency === "IDR" ? "Rp " + v.price.toLocaleString("id-ID") : "$" + (v.price / 100).toFixed(0)).join(" / "))}</td><td${_scopeId}>${ssrInterpolate(s.form ?? "—")}</td><td class="n"${_scopeId}>${ssrInterpolate(s.skills_count)}</td><td${_scopeId}><span class="${ssrRenderClass([s.bookable_online ? "ok" : "", "badge"])}"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: s.bookable_online ? "globe" : "x"
								}, null, _parent, _scopeId));
								_push(`${ssrInterpolate(s.bookable_online ? "Bookable online" : "Staff only")}</span></td></tr>`);
							});
							_push(`<!--]--></tbody></table></div></section>`);
						} else _push(`<!---->`);
						if (tab.value === "packages") {
							_push(`<section class="card"${_scopeId}><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Package</th><th${_scopeId}>Service</th><th class="n"${_scopeId}>Sessions</th><th class="n"${_scopeId}>Price</th><th class="n"${_scopeId}>Valid</th><th${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
							ssrRenderList(__props.packages, (p) => {
								_push(`<tr${_scopeId}><td${_scopeId}><b${_scopeId}>${ssrInterpolate(p.name)}</b></td><td${_scopeId}>${ssrInterpolate(p.service)}</td><td class="n"${_scopeId}>${ssrInterpolate(p.sessions)}×</td><td class="n"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: p.price,
									currency: __props.currency
								}, null, _parent, _scopeId));
								_push(`</td><td class="n"${_scopeId}>${ssrInterpolate(p.valid_months)} months</td><td${_scopeId}><span class="${ssrRenderClass([p.active ? "ok" : "", "badge"])}"${_scopeId}>${ssrInterpolate(p.active ? "Active" : "Hidden")}</span></td></tr>`);
							});
							_push(`<!--]--></tbody></table></div></section>`);
						} else _push(`<!---->`);
						if (tab.value === "forms") {
							_push(`<section class="card"${_scopeId}><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Form</th><th${_scopeId}>Kind</th><th class="n"${_scopeId}>Version</th><th${_scopeId}>Published</th><th class="n"${_scopeId}>Used by</th></tr></thead><tbody${_scopeId}><!--[-->`);
							ssrRenderList(__props.forms, (f) => {
								_push(`<tr${_scopeId}><td${_scopeId}><b${_scopeId}>${ssrInterpolate(f.name)}</b></td><td class="muted"${_scopeId}>${ssrInterpolate(f.kind)}</td><td class="n"${_scopeId}>v${ssrInterpolate(f.version ?? "—")}</td><td${_scopeId}>${ssrInterpolate(f.published ?? "—")}</td><td class="n"${_scopeId}>${ssrInterpolate(f.services)} services</td></tr>`);
							});
							_push(`<!--]--></tbody></table></div></section>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Catalog"), createVNode("p", null, "What bookable services need — rooms, therapists, forms and deposit rules.")]), createVNode("div", { class: "acts" }, [tab.value === "services" ? (openBlock(), createBlock("button", {
							key: 0,
							class: "btn primary",
							onClick: ($event) => unref(router).get(_ctx.route("admin.catalog.services.create"))
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("New service")], 8, ["onClick"])) : createCommentVNode("", true)])]),
						createVNode("div", {
							class: "seg",
							role: "tablist",
							style: { "margin-bottom": "16px" }
						}, [(openBlock(), createBlock(Fragment, null, renderList(tabs, (t) => {
							return createVNode("button", {
								key: t.id,
								"aria-pressed": String(tab.value === t.id),
								onClick: ($event) => tab.value = t.id
							}, toDisplayString(t.label), 9, ["aria-pressed", "onClick"]);
						}), 64))]),
						tab.value === "services" ? (openBlock(), createBlock("section", {
							key: 0,
							class: "card"
						}, [createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Service"),
							createVNode("th", null, "Category"),
							createVNode("th", null, "Room"),
							createVNode("th", { class: "n" }, "Durations"),
							createVNode("th", { class: "n" }, "Prices"),
							createVNode("th", null, "Form"),
							createVNode("th", { class: "n" }, "Skilled staff"),
							createVNode("th", null, "Status")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.services, (s) => {
							return openBlock(), createBlock("tr", {
								key: s.id,
								style: { "cursor": "pointer" }
							}, [
								createVNode("td", null, [createVNode(unref(Link), {
									href: _ctx.route("admin.catalog.services.edit", s.id),
									class: "cellp"
								}, {
									default: withCtx(() => [s.photo ? (openBlock(), createBlock("img", {
										key: 0,
										src: s.photo,
										alt: "",
										style: {
											"width": "40px",
											"height": "40px",
											"border-radius": "8px",
											"object-fit": "cover"
										}
									}, null, 8, ["src"])) : createCommentVNode("", true), createVNode("span", { class: "t2" }, [createVNode("b", null, [createTextVNode(toDisplayString(s.name) + " ", 1), s.badge === "signature" ? (openBlock(), createBlock("span", {
										key: 0,
										class: "badge gold",
										style: { "margin-left": "4px" }
									}, [createVNode(_sfc_main$29, {
										xs: "",
										name: "star"
									}), createTextVNode("Signature")])) : createCommentVNode("", true)]), createVNode("small", null, toDisplayString(s.buffer) + " min buffer", 1)])]),
									_: 2
								}, 1032, ["href"])]),
								createVNode("td", null, toDisplayString(s.category), 1),
								createVNode("td", null, [createTextVNode(toDisplayString(roomLabel[s.room_type]), 1), s.therapists_needed > 1 ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" · 2 therapists")], 64)) : createCommentVNode("", true)]),
								createVNode("td", { class: "n" }, toDisplayString(s.variants.map((v) => v.duration).join(" / ")) + " min", 1),
								createVNode("td", { class: "n" }, toDisplayString(s.variants.map((v) => __props.currency === "IDR" ? "Rp " + v.price.toLocaleString("id-ID") : "$" + (v.price / 100).toFixed(0)).join(" / ")), 1),
								createVNode("td", null, toDisplayString(s.form ?? "—"), 1),
								createVNode("td", { class: "n" }, toDisplayString(s.skills_count), 1),
								createVNode("td", null, [createVNode("span", { class: ["badge", s.bookable_online ? "ok" : ""] }, [createVNode(_sfc_main$29, {
									xs: "",
									name: s.bookable_online ? "globe" : "x"
								}, null, 8, ["name"]), createTextVNode(toDisplayString(s.bookable_online ? "Bookable online" : "Staff only"), 1)], 2)])
							]);
						}), 128))])])])])) : createCommentVNode("", true),
						tab.value === "packages" ? (openBlock(), createBlock("section", {
							key: 1,
							class: "card"
						}, [createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Package"),
							createVNode("th", null, "Service"),
							createVNode("th", { class: "n" }, "Sessions"),
							createVNode("th", { class: "n" }, "Price"),
							createVNode("th", { class: "n" }, "Valid"),
							createVNode("th", null, "Status")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (p) => {
							return openBlock(), createBlock("tr", { key: p.id }, [
								createVNode("td", null, [createVNode("b", null, toDisplayString(p.name), 1)]),
								createVNode("td", null, toDisplayString(p.service), 1),
								createVNode("td", { class: "n" }, toDisplayString(p.sessions) + "×", 1),
								createVNode("td", { class: "n" }, [createVNode(_sfc_main$25, {
									amount: p.price,
									currency: __props.currency
								}, null, 8, ["amount", "currency"])]),
								createVNode("td", { class: "n" }, toDisplayString(p.valid_months) + " months", 1),
								createVNode("td", null, [createVNode("span", { class: ["badge", p.active ? "ok" : ""] }, toDisplayString(p.active ? "Active" : "Hidden"), 3)])
							]);
						}), 128))])])])])) : createCommentVNode("", true),
						tab.value === "forms" ? (openBlock(), createBlock("section", {
							key: 2,
							class: "card"
						}, [createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Form"),
							createVNode("th", null, "Kind"),
							createVNode("th", { class: "n" }, "Version"),
							createVNode("th", null, "Published"),
							createVNode("th", { class: "n" }, "Used by")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.forms, (f) => {
							return openBlock(), createBlock("tr", { key: f.id }, [
								createVNode("td", null, [createVNode("b", null, toDisplayString(f.name), 1)]),
								createVNode("td", { class: "muted" }, toDisplayString(f.kind), 1),
								createVNode("td", { class: "n" }, "v" + toDisplayString(f.version ?? "—"), 1),
								createVNode("td", null, toDisplayString(f.published ?? "—"), 1),
								createVNode("td", { class: "n" }, toDisplayString(f.services) + " services", 1)
							]);
						}), 128))])])])])) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$20 = _sfc_main$20.setup;
_sfc_main$20.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Catalog.vue");
	return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
// resources/js/Pages/Admin/ClientShow.vue
var ClientShow_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$19 });
var _sfc_main$19 = {
	__name: "ClientShow",
	__ssrInlineRender: true,
	props: {
		client: Object,
		forms: Array,
		packages: Array,
		history: Array,
		currency: String
	},
	setup(__props) {
		const props = __props;
		const badgeClass = (s) => ({
			confirmed: "info",
			checked_in: "warn",
			in_service: "ok",
			completed: "",
			no_show: "bad",
			held: "brand"
		})[s] ?? "";
		const fmtShort = (m) => props.currency === "IDR" ? m >= 1e6 ? "Rp " + (m / 1e6).toFixed(2).replace(/\.?0+$/, "") + " m" : "Rp " + m.toLocaleString("id-ID") : "$" + (m / 100).toFixed(2);
		const spent = fmtShort(props.client.stats.spent);
		function saveNotes(e) {
			router.put(route("admin.clients.update", props.client.id), { notes: e.target.value }, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><div class="crumb"${_scopeId}><a href="/admin/clients"${_scopeId}>Clients</a>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "chevron-right"
						}, null, _parent, _scopeId));
						_push(`${ssrInterpolate(__props.client.name)}</div><h1${_scopeId}>${ssrInterpolate(__props.client.name)} `);
						if (__props.packages.some((p) => p.left > 0)) {
							_push(`<span class="badge gold"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: "ticket" }, null, _parent, _scopeId));
							_push(`Package client</span>`);
						} else _push(`<!---->`);
						_push(`</h1></div><div class="acts"${_scopeId}><button class="btn"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "message-circle"
						}, null, _parent, _scopeId));
						_push(`Message</button><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New booking</button></div></div><div class="cl"${_scopeId}><div${_scopeId}><section class="card who"${_scopeId}><div class="top2"${_scopeId}><span class="${ssrRenderClass(["av-" + __props.client.hue, "av lg"])}" aria-hidden="true"${_scopeId}>${ssrInterpolate(__props.client.initials)}</span><span class="t2"${_scopeId}><h2${_scopeId}>${ssrInterpolate(__props.client.name)}</h2><small${_scopeId}>${ssrInterpolate(__props.client.phone)} · ${ssrInterpolate(__props.client.email ?? "no email")}</small></span></div><div class="stats"${_scopeId}><div${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.client.stats.visits)}</b><span${_scopeId}>visits</span></div><div${_scopeId}><b${_scopeId}>${ssrInterpolate(unref(spent))}</b><span${_scopeId}>spent</span></div><div${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.client.stats.no_shows)}</b><span${_scopeId}>no-shows</span></div></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Preferences</h2></div><ul class="prefs"${_scopeId}><!--[-->`);
						ssrRenderList(__props.client.prefs, (p, i) => {
							_push(`<li class="${ssrRenderClass({ warn: p.warn })}"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: p.icon
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>${p.html ?? ""}</span></li>`);
						});
						_push(`<!--]-->`);
						if (!__props.client.prefs.length) _push(`<li class="muted small" style="${ssrRenderStyle({ "padding": "8px 0" })}"${_scopeId}>No preferences recorded yet.</li>`);
						else _push(`<!---->`);
						_push(`</ul></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Forms</h2></div><ul class="forms"${_scopeId}><!--[-->`);
						ssrRenderList(__props.forms, (f) => {
							_push(`<li${_scopeId}><span class="ic"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: f.valid ? "file-check" : "file-warning"
							}, null, _parent, _scopeId));
							_push(`</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(f.form)}</b><small${_scopeId}>Signed ${ssrInterpolate(f.signed_at)}`);
							if (f.valid_until) _push(`<!--[--> · valid until ${ssrInterpolate(f.valid_until)}<!--]-->`);
							else _push(`<!---->`);
							_push(`</small></span><a class="small strong" href="#"${_scopeId}>View</a></li>`);
						});
						_push(`<!--]-->`);
						if (!__props.forms.length) _push(`<li class="muted small" style="${ssrRenderStyle({ "padding": "8px 0" })}"${_scopeId}>No signed forms yet.</li>`);
						else _push(`<!---->`);
						_push(`</ul></section></div><div${_scopeId}><!--[-->`);
						ssrRenderList(__props.packages, (p) => {
							_push(`<section class="card pkg"${_scopeId}><div style="${ssrRenderStyle({
								"display": "flex",
								"align-items": "center",
								"gap": "10px"
							})}"${_scopeId}><span class="badge gold"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: "ticket" }, null, _parent, _scopeId));
							_push(`Package</span><b${_scopeId}>${ssrInterpolate(p.name)}</b><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>bought ${ssrInterpolate(p.purchased)} · valid until ${ssrInterpolate(p.expires)}</span></div><div class="bar"${ssrRenderAttr("aria-label", `${p.used} used, ${p.left} remaining`)}${_scopeId}><!--[-->`);
							ssrRenderList(p.total, (i) => {
								_push(`<i class="${ssrRenderClass(i <= p.used ? "u" : i === p.used + 1 && p.left > 0 ? "n" : "")}"${_scopeId}></i>`);
							});
							_push(`<!--]--></div><div class="meta"${_scopeId}><span${_scopeId}><b style="${ssrRenderStyle({ "color": "var(--text)" })}"${_scopeId}>${ssrInterpolate(p.used)} used</b> · ${ssrInterpolate(p.left)} left</span><span${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: p.per_session,
								currency: p.currency
							}, null, _parent, _scopeId));
							_push(` per session `);
							if (p.discount) _push(`<!--[-->(${ssrInterpolate(p.discount)}% off)<!--]-->`);
							else _push(`<!---->`);
							_push(`</span></div>`);
							if (p.left > 0 && p.valid) {
								_push(`<div class="note brand"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "bell"
								}, null, _parent, _scopeId));
								_push(`<span${_scopeId}>Lulur will remind ${ssrInterpolate(__props.client.name.split(" ")[0])} to book the next session (every 3–4 weeks).</span></div>`);
							} else _push(`<!---->`);
							_push(`</section>`);
						});
						_push(`<!--]--><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>History</h2></div><div class="tablewrap hist"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Date</th><th${_scopeId}>Service</th><th${_scopeId}>Therapist</th><th${_scopeId}>Room</th><th${_scopeId}>Status</th><th class="n"${_scopeId}>Detail</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.history, (h, i) => {
							_push(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(h.when)}</td><td${_scopeId}><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(h.service)}</b></span></td><td${_scopeId}>${ssrInterpolate(h.staff ?? "—")}</td><td${_scopeId}>${ssrInterpolate(h.room ?? "—")}</td><td${_scopeId}><span class="${ssrRenderClass([badgeClass(h.status), "badge"])}"${_scopeId}>${ssrInterpolate(h.status_label)}</span></td><td class="n"${_scopeId}>`);
							if (h.package) _push(`<!--[-->Package<!--]-->`);
							else {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: h.amount,
									currency: __props.currency
								}, null, _parent, _scopeId));
								if (h.tip) {
									_push(`<!--[--> · tip `);
									_push(ssrRenderComponent(_sfc_main$25, {
										amount: h.tip,
										currency: __props.currency
									}, null, _parent, _scopeId));
									_push(`<!--]-->`);
								} else _push(`<!---->`);
								_push(`<!--]-->`);
							}
							_push(`</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.history.length) _push(`<tr${_scopeId}><td colspan="6" class="muted" style="${ssrRenderStyle({
							"text-align": "center",
							"padding": "24px"
						})}"${_scopeId}>No visits yet.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Internal notes</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><p style="${ssrRenderStyle({
							"font-size": "14px",
							"color": "var(--text-2)"
						})}"${_scopeId}>${ssrInterpolate(__props.client.notes || "No notes yet.")}</p><div class="field"${_scopeId}><label${_scopeId}>Add an internal note (encrypted)</label><div class="input area"${_scopeId}><textarea rows="2" placeholder="Visible to staff only…" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></textarea></div></div></div></section></div></div><p class="synthetic"${_scopeId}>Synthetic demo data.</p></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("div", { class: "crumb" }, [
							createVNode("a", { href: "/admin/clients" }, "Clients"),
							createVNode(_sfc_main$29, {
								xs: "",
								name: "chevron-right"
							}),
							createTextVNode(toDisplayString(__props.client.name), 1)
						]), createVNode("h1", null, [createTextVNode(toDisplayString(__props.client.name) + " ", 1), __props.packages.some((p) => p.left > 0) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "badge gold"
						}, [createVNode(_sfc_main$29, { name: "ticket" }), createTextVNode("Package client")])) : createCommentVNode("", true)])]), createVNode("div", { class: "acts" }, [createVNode("button", { class: "btn" }, [createVNode(_sfc_main$29, {
							sm: "",
							name: "message-circle"
						}), createTextVNode("Message")]), createVNode("button", { class: "btn primary" }, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("New booking")])])]),
						createVNode("div", { class: "cl" }, [createVNode("div", null, [
							createVNode("section", { class: "card who" }, [createVNode("div", { class: "top2" }, [createVNode("span", {
								class: ["av lg", "av-" + __props.client.hue],
								"aria-hidden": "true"
							}, toDisplayString(__props.client.initials), 3), createVNode("span", { class: "t2" }, [createVNode("h2", null, toDisplayString(__props.client.name), 1), createVNode("small", null, toDisplayString(__props.client.phone) + " · " + toDisplayString(__props.client.email ?? "no email"), 1)])]), createVNode("div", { class: "stats" }, [
								createVNode("div", null, [createVNode("b", null, toDisplayString(__props.client.stats.visits), 1), createVNode("span", null, "visits")]),
								createVNode("div", null, [createVNode("b", null, toDisplayString(unref(spent)), 1), createVNode("span", null, "spent")]),
								createVNode("div", null, [createVNode("b", null, toDisplayString(__props.client.stats.no_shows), 1), createVNode("span", null, "no-shows")])
							])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Preferences")]), createVNode("ul", { class: "prefs" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.client.prefs, (p, i) => {
								return openBlock(), createBlock("li", {
									key: i,
									class: { warn: p.warn }
								}, [createVNode(_sfc_main$29, {
									sm: "",
									name: p.icon
								}, null, 8, ["name"]), createVNode("span", { innerHTML: p.html }, null, 8, ["innerHTML"])], 2);
							}), 128)), !__props.client.prefs.length ? (openBlock(), createBlock("li", {
								key: 0,
								class: "muted small",
								style: { "padding": "8px 0" }
							}, "No preferences recorded yet.")) : createCommentVNode("", true)])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Forms")]), createVNode("ul", { class: "forms" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.forms, (f) => {
								return openBlock(), createBlock("li", { key: f.id }, [
									createVNode("span", { class: "ic" }, [createVNode(_sfc_main$29, {
										sm: "",
										name: f.valid ? "file-check" : "file-warning"
									}, null, 8, ["name"])]),
									createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(f.form), 1), createVNode("small", null, [createTextVNode("Signed " + toDisplayString(f.signed_at), 1), f.valid_until ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" · valid until " + toDisplayString(f.valid_until), 1)], 64)) : createCommentVNode("", true)])]),
									createVNode("a", {
										class: "small strong",
										href: "#"
									}, "View")
								]);
							}), 128)), !__props.forms.length ? (openBlock(), createBlock("li", {
								key: 0,
								class: "muted small",
								style: { "padding": "8px 0" }
							}, "No signed forms yet.")) : createCommentVNode("", true)])])
						]), createVNode("div", null, [
							(openBlock(true), createBlock(Fragment, null, renderList(__props.packages, (p) => {
								return openBlock(), createBlock("section", {
									key: p.id,
									class: "card pkg"
								}, [
									createVNode("div", { style: {
										"display": "flex",
										"align-items": "center",
										"gap": "10px"
									} }, [
										createVNode("span", { class: "badge gold" }, [createVNode(_sfc_main$29, { name: "ticket" }), createTextVNode("Package")]),
										createVNode("b", null, toDisplayString(p.name), 1),
										createVNode("span", {
											class: "muted small",
											style: { "margin-left": "auto" }
										}, "bought " + toDisplayString(p.purchased) + " · valid until " + toDisplayString(p.expires), 1)
									]),
									createVNode("div", {
										class: "bar",
										"aria-label": `${p.used} used, ${p.left} remaining`
									}, [(openBlock(true), createBlock(Fragment, null, renderList(p.total, (i) => {
										return openBlock(), createBlock("i", {
											key: i,
											class: i <= p.used ? "u" : i === p.used + 1 && p.left > 0 ? "n" : ""
										}, null, 2);
									}), 128))], 8, ["aria-label"]),
									createVNode("div", { class: "meta" }, [createVNode("span", null, [createVNode("b", { style: { "color": "var(--text)" } }, toDisplayString(p.used) + " used", 1), createTextVNode(" · " + toDisplayString(p.left) + " left", 1)]), createVNode("span", null, [
										createVNode(_sfc_main$25, {
											amount: p.per_session,
											currency: p.currency
										}, null, 8, ["amount", "currency"]),
										createTextVNode(" per session "),
										p.discount ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode("(" + toDisplayString(p.discount) + "% off)", 1)], 64)) : createCommentVNode("", true)
									])]),
									p.left > 0 && p.valid ? (openBlock(), createBlock("div", {
										key: 0,
										class: "note brand"
									}, [createVNode(_sfc_main$29, {
										sm: "",
										name: "bell"
									}), createVNode("span", null, "Lulur will remind " + toDisplayString(__props.client.name.split(" ")[0]) + " to book the next session (every 3–4 weeks).", 1)])) : createCommentVNode("", true)
								]);
							}), 128)),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "History")]), createVNode("div", { class: "tablewrap hist" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
								createVNode("th", null, "Date"),
								createVNode("th", null, "Service"),
								createVNode("th", null, "Therapist"),
								createVNode("th", null, "Room"),
								createVNode("th", null, "Status"),
								createVNode("th", { class: "n" }, "Detail")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.history, (h, i) => {
								return openBlock(), createBlock("tr", { key: i }, [
									createVNode("td", null, toDisplayString(h.when), 1),
									createVNode("td", null, [createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(h.service), 1)])]),
									createVNode("td", null, toDisplayString(h.staff ?? "—"), 1),
									createVNode("td", null, toDisplayString(h.room ?? "—"), 1),
									createVNode("td", null, [createVNode("span", { class: ["badge", badgeClass(h.status)] }, toDisplayString(h.status_label), 3)]),
									createVNode("td", { class: "n" }, [h.package ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode("Package")], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode(_sfc_main$25, {
										amount: h.amount,
										currency: __props.currency
									}, null, 8, ["amount", "currency"]), h.tip ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" · tip "), createVNode(_sfc_main$25, {
										amount: h.tip,
										currency: __props.currency
									}, null, 8, ["amount", "currency"])], 64)) : createCommentVNode("", true)], 64))])
								]);
							}), 128)), !__props.history.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: "6",
								class: "muted",
								style: {
									"text-align": "center",
									"padding": "24px"
								}
							}, "No visits yet.")])) : createCommentVNode("", true)])])])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Internal notes")]), createVNode("div", {
								class: "card-b",
								style: {
									"display": "grid",
									"gap": "10px"
								}
							}, [createVNode("p", { style: {
								"font-size": "14px",
								"color": "var(--text-2)"
							} }, toDisplayString(__props.client.notes || "No notes yet."), 1), createVNode("div", { class: "field" }, [createVNode("label", null, "Add an internal note (encrypted)"), createVNode("div", { class: "input area" }, [createVNode("textarea", {
								rows: "2",
								placeholder: "Visible to staff only…",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								},
								onChange: saveNotes
							}, null, 32)])])])])
						])]),
						createVNode("p", { class: "synthetic" }, "Synthetic demo data.")
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ClientShow.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Clients.vue
var Clients_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$18 });
var _sfc_main$18 = {
	__name: "Clients",
	__ssrInlineRender: true,
	props: {
		clients: Array,
		search: String
	},
	setup(__props) {
		const q = ref(__props.search ?? "");
		function apply() {
			router.get(route("admin.clients"), { search: q.value }, { preserveState: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Clients</h1><p${_scopeId}>Preferences, forms and packages live on each profile.</p></div><div class="acts"${_scopeId}><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New client</button></div></div><section class="card"${_scopeId}><div class="card-h"${_scopeId}><div class="input" style="${ssrRenderStyle({
							"max-width": "280px",
							"height": "34px"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "users"
						}, null, _parent, _scopeId));
						_push(`<input${ssrRenderAttr("value", q.value)} placeholder="Search name, phone or email…" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div><button class="btn sm"${_scopeId}>Search</button></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Client</th><th${_scopeId}>Phone</th><th class="n"${_scopeId}>Visits</th><th${_scopeId}>Package</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.clients, (c) => {
							_push(`<tr style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}><td${_scopeId}>`);
							_push(ssrRenderComponent(unref(Link), {
								href: _ctx.route("admin.clients.show", c.id),
								class: "cellp"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<span class="${ssrRenderClass(["av-" + c.hue, "av"])}"${_scopeId}>${ssrInterpolate(c.initials)}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(c.name)}</b><small${_scopeId}>${ssrInterpolate(c.email ?? "")}</small></span>`);
									else return [createVNode("span", { class: ["av", "av-" + c.hue] }, toDisplayString(c.initials), 3), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(c.name), 1), createVNode("small", null, toDisplayString(c.email ?? ""), 1)])];
								}),
								_: 2
							}, _parent, _scopeId));
							_push(`</td><td class="num"${_scopeId}>${ssrInterpolate(c.phone)}</td><td class="n"${_scopeId}>${ssrInterpolate(c.visits)}</td><td${_scopeId}>`);
							if (c.has_package) {
								_push(`<span class="badge gold"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "ticket"
								}, null, _parent, _scopeId));
								_push(`Active</span>`);
							} else _push(`<span class="muted small"${_scopeId}>—</span>`);
							_push(`</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Clients"), createVNode("p", null, "Preferences, forms and packages live on each profile.")]), createVNode("div", { class: "acts" }, [createVNode("button", { class: "btn primary" }, [createVNode(_sfc_main$29, {
						sm: "",
						name: "plus"
					}), createTextVNode("New client")])])]), createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("div", {
						class: "input",
						style: {
							"max-width": "280px",
							"height": "34px"
						}
					}, [createVNode(_sfc_main$29, {
						sm: "",
						name: "users"
					}), withDirectives(createVNode("input", {
						"onUpdate:modelValue": ($event) => q.value = $event,
						placeholder: "Search name, phone or email…",
						style: {
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						},
						onKeydown: withKeys(apply, ["enter"])
					}, null, 40, ["onUpdate:modelValue"]), [[vModelText, q.value]])]), createVNode("button", {
						class: "btn sm",
						onClick: apply
					}, "Search")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
						createVNode("th", null, "Client"),
						createVNode("th", null, "Phone"),
						createVNode("th", { class: "n" }, "Visits"),
						createVNode("th", null, "Package")
					])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.clients, (c) => {
						return openBlock(), createBlock("tr", {
							key: c.id,
							style: { "cursor": "pointer" }
						}, [
							createVNode("td", null, [createVNode(unref(Link), {
								href: _ctx.route("admin.clients.show", c.id),
								class: "cellp"
							}, {
								default: withCtx(() => [createVNode("span", { class: ["av", "av-" + c.hue] }, toDisplayString(c.initials), 3), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(c.name), 1), createVNode("small", null, toDisplayString(c.email ?? ""), 1)])]),
								_: 2
							}, 1032, ["href"])]),
							createVNode("td", { class: "num" }, toDisplayString(c.phone), 1),
							createVNode("td", { class: "n" }, toDisplayString(c.visits), 1),
							createVNode("td", null, [c.has_package ? (openBlock(), createBlock("span", {
								key: 0,
								class: "badge gold"
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "ticket"
							}), createTextVNode("Active")])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "muted small"
							}, "—"))])
						]);
					}), 128))])])])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Clients.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Marketing.vue
var Marketing_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$17 });
var _sfc_main$17 = {
	__name: "Marketing",
	__ssrInlineRender: true,
	props: {
		templates: Array,
		reminders: Array
	},
	setup(__props) {
		const badge = (s) => ({
			sent: "ok",
			pending: "info",
			skipped: "",
			cancelled: "",
			failed: "bad"
		})[s] ?? "";
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Marketing</h1><p${_scopeId}>Reminder templates per tenant. WhatsApp is simulated in the demo.</p></div></div><div class="mk-grid"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Templates</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.templates, (t) => {
							_push(`<div style="${ssrRenderStyle({
								"border": "1px solid var(--line)",
								"border-radius": "10px",
								"padding": "12px 14px"
							})}"${_scopeId}><div style="${ssrRenderStyle({
								"display": "flex",
								"align-items": "center",
								"gap": "8px"
							})}"${_scopeId}><b${_scopeId}>${ssrInterpolate(t.label)}</b><span class="badge" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>${ssrInterpolate(t.channel)}</span></div><p class="muted small" style="${ssrRenderStyle({ "margin-top": "6px" })}"${_scopeId}>${ssrInterpolate(t.body)}</p></div>`);
						});
						_push(`<!--]--></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Recent reminders</h2></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Booking</th><th${_scopeId}>Kind</th><th${_scopeId}>Channel</th><th${_scopeId}>Send at</th><th${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.reminders, (r, i) => {
							_push(`<tr${_scopeId}><td${_scopeId}><b${_scopeId}>${ssrInterpolate(r.booking)}</b></td><td${_scopeId}>${ssrInterpolate(r.kind)}</td><td class="muted"${_scopeId}>${ssrInterpolate(r.channel)}</td><td${_scopeId}>${ssrInterpolate(r.send_at)}</td><td${_scopeId}><span class="${ssrRenderClass([badge(r.status), "badge"])}"${_scopeId}>${ssrInterpolate(r.status)}</span></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section></div></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Marketing"), createVNode("p", null, "Reminder templates per tenant. WhatsApp is simulated in the demo.")])]), createVNode("div", { class: "mk-grid" }, [createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Templates")]), createVNode("div", {
						class: "card-b",
						style: {
							"display": "grid",
							"gap": "10px"
						}
					}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.templates, (t) => {
						return openBlock(), createBlock("div", {
							key: t.kind,
							style: {
								"border": "1px solid var(--line)",
								"border-radius": "10px",
								"padding": "12px 14px"
							}
						}, [createVNode("div", { style: {
							"display": "flex",
							"align-items": "center",
							"gap": "8px"
						} }, [createVNode("b", null, toDisplayString(t.label), 1), createVNode("span", {
							class: "badge",
							style: { "margin-left": "auto" }
						}, toDisplayString(t.channel), 1)]), createVNode("p", {
							class: "muted small",
							style: { "margin-top": "6px" }
						}, toDisplayString(t.body), 1)]);
					}), 128))])]), createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Recent reminders")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
						createVNode("th", null, "Booking"),
						createVNode("th", null, "Kind"),
						createVNode("th", null, "Channel"),
						createVNode("th", null, "Send at"),
						createVNode("th", null, "Status")
					])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.reminders, (r, i) => {
						return openBlock(), createBlock("tr", { key: i }, [
							createVNode("td", null, [createVNode("b", null, toDisplayString(r.booking), 1)]),
							createVNode("td", null, toDisplayString(r.kind), 1),
							createVNode("td", { class: "muted" }, toDisplayString(r.channel), 1),
							createVNode("td", null, toDisplayString(r.send_at), 1),
							createVNode("td", null, [createVNode("span", { class: ["badge", badge(r.status)] }, toDisplayString(r.status), 3)])
						]);
					}), 128))])])])])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Marketing.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Reports.vue
var Reports_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$16 });
var _sfc_main$16 = {
	__name: "Reports",
	__ssrInlineRender: true,
	props: {
		range: Object,
		kpi: Object,
		utilisation: Array,
		heatmap: Array,
		revenue_by_service: Array,
		tips: Array,
		no_shows: Array,
		currency: String
	},
	setup(__props) {
		const props = __props;
		const from = ref(props.range.from);
		const to = ref(props.range.to);
		function apply() {
			router.get(route("admin.reports"), {
				from: from.value,
				to: to.value
			}, { preserveState: true });
		}
		const fmt = (m) => props.currency === "IDR" ? "Rp " + m.toLocaleString("id-ID") : "$" + (m / 100).toFixed(2);
		const hours = (min) => `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`;
		const heatColor = (n) => [
			"",
			"var(--brand-tint)",
			"var(--brand-soft)",
			"#F0CFD6",
			"var(--brand-light)",
			"var(--brand-mid)"
		][Math.min(n, 5)];
		const hoursRange = Array.from({ length: 12 }, (_, i) => 9 + i);
		const maxRevenue = Math.max(1, ...props.revenue_by_service.map((r) => r.revenue));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Reports</h1><p${_scopeId}>Utilisation, revenue, no-shows and tips — computed from real bookings.</p></div><div class="acts"${_scopeId}><div style="${ssrRenderStyle({ "width": "190px" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$23, {
							modelValue: from.value,
							"onUpdate:modelValue": ($event) => from.value = $event,
							label: "From"
						}, null, _parent, _scopeId));
						_push(`</div><div style="${ssrRenderStyle({ "width": "190px" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$23, {
							modelValue: to.value,
							"onUpdate:modelValue": ($event) => to.value = $event,
							label: "To"
						}, null, _parent, _scopeId));
						_push(`</div><button class="btn sm"${_scopeId}>Apply</button><button class="btn"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "download"
						}, null, _parent, _scopeId));
						_push(`Export</button></div></div><div class="kpis"${_scopeId}><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>Revenue</span><span class="v"${_scopeId}>${ssrInterpolate(fmt(__props.kpi.revenue))}</span><span class="d"${_scopeId}>deposits + balances + tips</span></div><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>Completed visits</span><span class="v"${_scopeId}>${ssrInterpolate(__props.kpi.completed)}</span><span class="d"${_scopeId}>in the selected range</span></div><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>No-show rate</span><span class="v"${_scopeId}>${ssrInterpolate(__props.kpi.no_show_rate)}%</span><span class="d"${_scopeId}>${ssrInterpolate(__props.kpi.no_shows)} no-shows</span></div><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>Rebooking</span><span class="v"${_scopeId}>${ssrInterpolate(__props.kpi.rebooking_rate)}%</span><span class="d"${_scopeId}>returned within 90 days</span></div></div><div class="rp-grid"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Therapist utilisation</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>booked vs shift minutes</span></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "12px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.utilisation, (u) => {
							_push(`<div style="${ssrRenderStyle({
								"display": "grid",
								"gap": "4px"
							})}"${_scopeId}><div style="${ssrRenderStyle({
								"display": "flex",
								"align-items": "center",
								"gap": "8px",
								"font-size": "13px"
							})}"${_scopeId}><b${_scopeId}>${ssrInterpolate(u.name)}</b><span class="muted small"${_scopeId}>${ssrInterpolate(u.specialty ?? u.level)}</span><span class="muted small num" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>${ssrInterpolate(hours(u.booked_min))} / ${ssrInterpolate(hours(u.shift_min))}</span></div><div class="bar-outer"${_scopeId}><div class="bar-fill" style="${ssrRenderStyle({ width: (u.shift_min ? Math.min(100, Math.round(u.booked_min / u.shift_min * 100)) : 0) + "%" })}"${_scopeId}></div></div></div>`);
						});
						_push(`<!--]--></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Rooms by hour</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>deeper rosewood = busier</span></div><div class="card-b" style="${ssrRenderStyle({ "overflow-x": "auto" })}"${_scopeId}><table class="heat"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Room</th><!--[-->`);
						ssrRenderList(unref(hoursRange), (h) => {
							_push(`<th${_scopeId}>${ssrInterpolate(h)}</th>`);
						});
						_push(`<!--]--></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.heatmap, (r) => {
							_push(`<tr${_scopeId}><td class="strong"${_scopeId}>${ssrInterpolate(r.name)}</td><!--[-->`);
							ssrRenderList(unref(hoursRange), (h) => {
								_push(`<td style="${ssrRenderStyle({ background: heatColor(r.cells[h - 9]) })}"${ssrRenderAttr("title", `${r.name} ${h}:00 — ${r.cells[h - 9]} bookings`)}${_scopeId}>${ssrInterpolate(r.cells[h - 9] || "")}</td>`);
							});
							_push(`<!--]--></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Revenue by service</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.revenue_by_service, (r) => {
							_push(`<div style="${ssrRenderStyle({
								"display": "grid",
								"gap": "4px"
							})}"${_scopeId}><div style="${ssrRenderStyle({
								"display": "flex",
								"font-size": "13px",
								"gap": "8px"
							})}"${_scopeId}><b${_scopeId}>${ssrInterpolate(r.service)}</b><span class="muted small num"${_scopeId}>${ssrInterpolate(r.bookings)}×</span><span class="num" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>${ssrInterpolate(fmt(r.revenue))}</span></div><div class="bar-outer"${_scopeId}><div class="bar-fill" style="${ssrRenderStyle({ width: Math.round(r.revenue / unref(maxRevenue) * 100) + "%" })}"${_scopeId}></div></div></div>`);
						});
						_push(`<!--]-->`);
						if (!__props.revenue_by_service.length) _push(`<p class="muted small"${_scopeId}>No completed bookings in this range.</p>`);
						else _push(`<!---->`);
						_push(`</div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Tips per therapist</h2></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Therapist</th><th class="n"${_scopeId}>Tips</th><th class="n"${_scopeId}>Amount</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.tips, (t) => {
							_push(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(t.staff)}</td><td class="n"${_scopeId}>${ssrInterpolate(t.count)}</td><td class="n"${_scopeId}>${ssrInterpolate(fmt(t.amount))}</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.tips.length) _push(`<tr${_scopeId}><td colspan="3" class="muted" style="${ssrRenderStyle({
							"text-align": "center",
							"padding": "16px"
						})}"${_scopeId}>No tips in this range.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Recent no-shows</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "lightbulb"
						}, null, _parent, _scopeId));
						_push(`fees are manager-only and audited</span></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Client</th><th${_scopeId}>Service</th><th${_scopeId}>When</th><th class="n"${_scopeId}>Fee charged</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.no_shows, (n, i) => {
							_push(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(n.client)}</td><td${_scopeId}>${ssrInterpolate(n.service)}</td><td${_scopeId}>${ssrInterpolate(n.when)}</td><td class="n"${_scopeId}>${ssrInterpolate(n.fee ? fmt(n.fee) : "—")}</td></tr>`);
						});
						_push(`<!--]-->`);
						if (!__props.no_shows.length) _push(`<tr${_scopeId}><td colspan="4" class="muted" style="${ssrRenderStyle({
							"text-align": "center",
							"padding": "16px"
						})}"${_scopeId}>No no-shows in this range.</td></tr>`);
						else _push(`<!---->`);
						_push(`</tbody></table></div></section></div></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Reports"), createVNode("p", null, "Utilisation, revenue, no-shows and tips — computed from real bookings.")]), createVNode("div", { class: "acts" }, [
							createVNode("div", { style: { "width": "190px" } }, [createVNode(_sfc_main$23, {
								modelValue: from.value,
								"onUpdate:modelValue": ($event) => from.value = $event,
								label: "From"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							createVNode("div", { style: { "width": "190px" } }, [createVNode(_sfc_main$23, {
								modelValue: to.value,
								"onUpdate:modelValue": ($event) => to.value = $event,
								label: "To"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							createVNode("button", {
								class: "btn sm",
								onClick: apply
							}, "Apply"),
							createVNode("button", { class: "btn" }, [createVNode(_sfc_main$29, {
								sm: "",
								name: "download"
							}), createTextVNode("Export")])
						])]),
						createVNode("div", { class: "kpis" }, [
							createVNode("div", { class: "card kpi" }, [
								createVNode("span", { class: "l" }, "Revenue"),
								createVNode("span", { class: "v" }, toDisplayString(fmt(__props.kpi.revenue)), 1),
								createVNode("span", { class: "d" }, "deposits + balances + tips")
							]),
							createVNode("div", { class: "card kpi" }, [
								createVNode("span", { class: "l" }, "Completed visits"),
								createVNode("span", { class: "v" }, toDisplayString(__props.kpi.completed), 1),
								createVNode("span", { class: "d" }, "in the selected range")
							]),
							createVNode("div", { class: "card kpi" }, [
								createVNode("span", { class: "l" }, "No-show rate"),
								createVNode("span", { class: "v" }, toDisplayString(__props.kpi.no_show_rate) + "%", 1),
								createVNode("span", { class: "d" }, toDisplayString(__props.kpi.no_shows) + " no-shows", 1)
							]),
							createVNode("div", { class: "card kpi" }, [
								createVNode("span", { class: "l" }, "Rebooking"),
								createVNode("span", { class: "v" }, toDisplayString(__props.kpi.rebooking_rate) + "%", 1),
								createVNode("span", { class: "d" }, "returned within 90 days")
							])
						]),
						createVNode("div", { class: "rp-grid" }, [
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Therapist utilisation"), createVNode("span", {
								class: "muted small",
								style: { "margin-left": "auto" }
							}, "booked vs shift minutes")]), createVNode("div", {
								class: "card-b",
								style: {
									"display": "grid",
									"gap": "12px"
								}
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.utilisation, (u) => {
								return openBlock(), createBlock("div", {
									key: u.id,
									style: {
										"display": "grid",
										"gap": "4px"
									}
								}, [createVNode("div", { style: {
									"display": "flex",
									"align-items": "center",
									"gap": "8px",
									"font-size": "13px"
								} }, [
									createVNode("b", null, toDisplayString(u.name), 1),
									createVNode("span", { class: "muted small" }, toDisplayString(u.specialty ?? u.level), 1),
									createVNode("span", {
										class: "muted small num",
										style: { "margin-left": "auto" }
									}, toDisplayString(hours(u.booked_min)) + " / " + toDisplayString(hours(u.shift_min)), 1)
								]), createVNode("div", { class: "bar-outer" }, [createVNode("div", {
									class: "bar-fill",
									style: { width: (u.shift_min ? Math.min(100, Math.round(u.booked_min / u.shift_min * 100)) : 0) + "%" }
								}, null, 4)])]);
							}), 128))])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Rooms by hour"), createVNode("span", {
								class: "muted small",
								style: { "margin-left": "auto" }
							}, "deeper rosewood = busier")]), createVNode("div", {
								class: "card-b",
								style: { "overflow-x": "auto" }
							}, [createVNode("table", { class: "heat" }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, "Room"), (openBlock(true), createBlock(Fragment, null, renderList(unref(hoursRange), (h) => {
								return openBlock(), createBlock("th", { key: h }, toDisplayString(h), 1);
							}), 128))])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.heatmap, (r) => {
								return openBlock(), createBlock("tr", { key: r.id }, [createVNode("td", { class: "strong" }, toDisplayString(r.name), 1), (openBlock(true), createBlock(Fragment, null, renderList(unref(hoursRange), (h) => {
									return openBlock(), createBlock("td", {
										key: h,
										style: { background: heatColor(r.cells[h - 9]) },
										title: `${r.name} ${h}:00 — ${r.cells[h - 9]} bookings`
									}, toDisplayString(r.cells[h - 9] || ""), 13, ["title"]);
								}), 128))]);
							}), 128))])])])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Revenue by service")]), createVNode("div", {
								class: "card-b",
								style: {
									"display": "grid",
									"gap": "10px"
								}
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.revenue_by_service, (r) => {
								return openBlock(), createBlock("div", {
									key: r.service,
									style: {
										"display": "grid",
										"gap": "4px"
									}
								}, [createVNode("div", { style: {
									"display": "flex",
									"font-size": "13px",
									"gap": "8px"
								} }, [
									createVNode("b", null, toDisplayString(r.service), 1),
									createVNode("span", { class: "muted small num" }, toDisplayString(r.bookings) + "×", 1),
									createVNode("span", {
										class: "num",
										style: { "margin-left": "auto" }
									}, toDisplayString(fmt(r.revenue)), 1)
								]), createVNode("div", { class: "bar-outer" }, [createVNode("div", {
									class: "bar-fill",
									style: { width: Math.round(r.revenue / unref(maxRevenue) * 100) + "%" }
								}, null, 4)])]);
							}), 128)), !__props.revenue_by_service.length ? (openBlock(), createBlock("p", {
								key: 0,
								class: "muted small"
							}, "No completed bookings in this range.")) : createCommentVNode("", true)])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Tips per therapist")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
								createVNode("th", null, "Therapist"),
								createVNode("th", { class: "n" }, "Tips"),
								createVNode("th", { class: "n" }, "Amount")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.tips, (t) => {
								return openBlock(), createBlock("tr", { key: t.staff }, [
									createVNode("td", null, toDisplayString(t.staff), 1),
									createVNode("td", { class: "n" }, toDisplayString(t.count), 1),
									createVNode("td", { class: "n" }, toDisplayString(fmt(t.amount)), 1)
								]);
							}), 128)), !__props.tips.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: "3",
								class: "muted",
								style: {
									"text-align": "center",
									"padding": "16px"
								}
							}, "No tips in this range.")])) : createCommentVNode("", true)])])])]),
							createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Recent no-shows"), createVNode("span", {
								class: "muted small",
								style: { "margin-left": "auto" }
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "lightbulb"
							}), createTextVNode("fees are manager-only and audited")])]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
								createVNode("th", null, "Client"),
								createVNode("th", null, "Service"),
								createVNode("th", null, "When"),
								createVNode("th", { class: "n" }, "Fee charged")
							])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.no_shows, (n, i) => {
								return openBlock(), createBlock("tr", { key: i }, [
									createVNode("td", null, toDisplayString(n.client), 1),
									createVNode("td", null, toDisplayString(n.service), 1),
									createVNode("td", null, toDisplayString(n.when), 1),
									createVNode("td", { class: "n" }, toDisplayString(n.fee ? fmt(n.fee) : "—"), 1)
								]);
							}), 128)), !__props.no_shows.length ? (openBlock(), createBlock("tr", { key: 0 }, [createVNode("td", {
								colspan: "4",
								class: "muted",
								style: {
									"text-align": "center",
									"padding": "16px"
								}
							}, "No no-shows in this range.")])) : createCommentVNode("", true)])])])])
						])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Reports.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Rooms.vue
var Rooms_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$15 });
var _sfc_main$15 = {
	__name: "Rooms",
	__ssrInlineRender: true,
	props: {
		rooms: Array,
		locations: Array
	},
	setup(__props) {
		const props = __props;
		const form = ref({
			name: "",
			location_id: props.locations[0]?.id,
			room_type: "single",
			capacity: 1
		});
		const adding = ref(false);
		const typeLabel = {
			single: "Single",
			couples: "Couples suite",
			facial: "Facial",
			wet: "Wet room"
		};
		function save() {
			router.post(route("admin.rooms.store"), form.value, { onSuccess: () => {
				adding.value = false;
				form.value = {
					name: "",
					location_id: props.locations[0]?.id,
					room_type: "single",
					capacity: 1
				};
			} });
		}
		function toggle(r) {
			router.put(route("admin.rooms.update", r.id), {
				...r,
				active: !r.active
			}, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Rooms</h1><p${_scopeId}>Where treatments happen. Couples suites hold one booking with two therapists.</p></div><div class="acts"${_scopeId}><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New room</button></div></div>`);
						if (adding.value) {
							_push(`<section class="card" style="${ssrRenderStyle({ "margin-bottom": "16px" })}"${_scopeId}><div class="card-b" style="${ssrRenderStyle({
								"display": "grid",
								"gap": "12px",
								"max-width": "520px"
							})}"${_scopeId}><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Name</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", form.value.name)} placeholder="e.g. Kamboja 1" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></div><div class="field"${_scopeId}><label${_scopeId}>Location</label>`);
							_push(ssrRenderComponent(_sfc_main$24, {
								modelValue: form.value.location_id,
								"onUpdate:modelValue": ($event) => form.value.location_id = $event,
								label: "Location",
								options: __props.locations.map((l) => ({
									value: l.id,
									label: l.name
								}))
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Type</label>`);
							_push(ssrRenderComponent(_sfc_main$24, {
								modelValue: form.value.room_type,
								"onUpdate:modelValue": ($event) => form.value.room_type = $event,
								label: "Room type",
								options: [
									{
										value: "single",
										label: "Single"
									},
									{
										value: "couples",
										label: "Couples suite"
									},
									{
										value: "facial",
										label: "Facial"
									},
									{
										value: "wet",
										label: "Wet room"
									}
								]
							}, null, _parent, _scopeId));
							_push(`</div><div class="field"${_scopeId}><label${_scopeId}>Capacity</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", form.value.capacity)} type="number" min="1" max="4" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></div></div><button class="btn primary" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Add room</button></div></section>`);
						} else _push(`<!---->`);
						_push(`<section class="card"${_scopeId}><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Room</th><th${_scopeId}>Location</th><th${_scopeId}>Type</th><th class="n"${_scopeId}>Capacity</th><th${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.rooms, (r) => {
							_push(`<tr${_scopeId}><td${_scopeId}><span class="cellp"${_scopeId}><span class="av" style="${ssrRenderStyle({
								"background": "var(--hover)",
								"color": "var(--text-2)"
							})}"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "door-closed"
							}, null, _parent, _scopeId));
							_push(`</span><b${_scopeId}>${ssrInterpolate(r.name)}</b></span></td><td${_scopeId}>${ssrInterpolate(r.location)}</td><td${_scopeId}>${ssrInterpolate(typeLabel[r.room_type])}</td><td class="n"${_scopeId}>${ssrInterpolate(r.capacity)}</td><td${_scopeId}><span class="${ssrRenderClass([r.active ? "ok" : "", "badge"])}" style="${ssrRenderStyle({ "cursor": "pointer" })}"${_scopeId}>${ssrInterpolate(r.active ? "Active" : "Blocked")}</span></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Rooms"), createVNode("p", null, "Where treatments happen. Couples suites hold one booking with two therapists.")]), createVNode("div", { class: "acts" }, [createVNode("button", {
							class: "btn primary",
							onClick: ($event) => adding.value = !adding.value
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("New room")], 8, ["onClick"])])]),
						adding.value ? (openBlock(), createBlock("section", {
							key: 0,
							class: "card",
							style: { "margin-bottom": "16px" }
						}, [createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "12px",
								"max-width": "520px"
							}
						}, [
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Name"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => form.value.name = $event,
								placeholder: "e.g. Kamboja 1",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, form.value.name]])])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Location"), createVNode(_sfc_main$24, {
								modelValue: form.value.location_id,
								"onUpdate:modelValue": ($event) => form.value.location_id = $event,
								label: "Location",
								options: __props.locations.map((l) => ({
									value: l.id,
									label: l.name
								}))
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])])]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Type"), createVNode(_sfc_main$24, {
								modelValue: form.value.room_type,
								"onUpdate:modelValue": ($event) => form.value.room_type = $event,
								label: "Room type",
								options: [
									{
										value: "single",
										label: "Single"
									},
									{
										value: "couples",
										label: "Couples suite"
									},
									{
										value: "facial",
										label: "Facial"
									},
									{
										value: "wet",
										label: "Wet room"
									}
								]
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Capacity"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => form.value.capacity = $event,
								type: "number",
								min: "1",
								max: "4",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, form.value.capacity]])])])]),
							createVNode("button", {
								class: "btn primary",
								style: { "width": "max-content" },
								onClick: save
							}, "Add room")
						])])) : createCommentVNode("", true),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Room"),
							createVNode("th", null, "Location"),
							createVNode("th", null, "Type"),
							createVNode("th", { class: "n" }, "Capacity"),
							createVNode("th", null, "Status")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.rooms, (r) => {
							return openBlock(), createBlock("tr", { key: r.id }, [
								createVNode("td", null, [createVNode("span", { class: "cellp" }, [createVNode("span", {
									class: "av",
									style: {
										"background": "var(--hover)",
										"color": "var(--text-2)"
									}
								}, [createVNode(_sfc_main$29, {
									sm: "",
									name: "door-closed"
								})]), createVNode("b", null, toDisplayString(r.name), 1)])]),
								createVNode("td", null, toDisplayString(r.location), 1),
								createVNode("td", null, toDisplayString(typeLabel[r.room_type]), 1),
								createVNode("td", { class: "n" }, toDisplayString(r.capacity), 1),
								createVNode("td", null, [createVNode("span", {
									class: ["badge", r.active ? "ok" : ""],
									style: { "cursor": "pointer" },
									onClick: ($event) => toggle(r)
								}, toDisplayString(r.active ? "Active" : "Blocked"), 11, ["onClick"])])
							]);
						}), 128))])])])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Rooms.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
// resources/js/Components/Cbx.vue
var _sfc_main$14 = {
	__name: "Cbx",
	__ssrInlineRender: true,
	props: {
		modelValue: Boolean,
		label: String
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "cbx",
				role: "checkbox",
				"aria-checked": String(__props.modelValue),
				tabindex: "0"
			}, _attrs))}><span class="box">`);
			if (__props.modelValue) _push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent));
			else _push(`<!---->`);
			_push(`</span>`);
			if (__props.label) _push(`<span>${ssrInterpolate(__props.label)}</span>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</span>`);
		};
	}
};
var _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Cbx.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
// resources/js/Pages/Admin/ServiceEdit.vue
var ServiceEdit_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$13 });
var _sfc_main$13 = {
	__name: "ServiceEdit",
	__ssrInlineRender: true,
	props: {
		service: Object,
		categories: Array,
		forms: Array,
		addons: Array,
		staff: Array,
		currency: String
	},
	setup(__props) {
		const props = __props;
		const isNew = !props.service;
		const f = ref(props.service ? JSON.parse(JSON.stringify(props.service)) : {
			name: "",
			description: "",
			category_id: props.categories[0]?.id,
			photo: null,
			badge: null,
			room_type: "single",
			therapists_needed: 1,
			max_guests: 1,
			price_basis: "per_guest",
			buffer: 15,
			form_id: null,
			active: true,
			bookable_online: true,
			variants: [{
				duration: 60,
				price: props.currency === "IDR" ? 3e5 : 5e3,
				master_surcharge: 0,
				senior_surcharge: 0
			}],
			addon_ids: [],
			skill_ids: []
		});
		const fmt = (m) => props.currency === "IDR" ? "Rp " + m.toLocaleString("id-ID") : "$" + (m / 100).toFixed(2);
		function save() {
			const payload = {
				...f.value,
				buffer: Number(f.value.buffer)
			};
			payload.variants = f.value.variants.map((v) => ({
				...v,
				duration: Number(v.duration),
				price: Number(v.price)
			}));
			router[isNew ? "post" : "put"](isNew ? route("admin.catalog.services.store") : route("admin.catalog.services.update", props.service.id), payload, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><div class="crumb"${_scopeId}><a href="/admin/catalog"${_scopeId}>Catalog</a>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "chevron-right"
						}, null, _parent, _scopeId));
						_push(`<a href="/admin/catalog"${_scopeId}>Services</a>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "chevron-right"
						}, null, _parent, _scopeId));
						_push(`${ssrInterpolate(isNew ? "New" : "Edit")}</div><h1${_scopeId}>${ssrInterpolate(f.value.name || "New service")} `);
						if (f.value.bookable_online) {
							_push(`<span class="badge ok"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: "globe" }, null, _parent, _scopeId));
							_push(`Bookable online</span>`);
						} else _push(`<!---->`);
						_push(`</h1></div><div class="acts"${_scopeId}><a class="btn" href="/"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "eye"
						}, null, _parent, _scopeId));
						_push(`Preview</a><button class="btn primary"${_scopeId}>Save</button></div></div><div class="sv"${_scopeId}><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "16px"
						})}"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Basics</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "14px"
						})}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Name</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", f.value.name)} placeholder="e.g. Balinese Massage" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div></div><div class="field"${_scopeId}><label${_scopeId}>Description</label><div class="input area"${_scopeId}><textarea rows="2" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit",
							"resize": "vertical"
						})}"${_scopeId}>${ssrInterpolate(f.value.description)}</textarea></div></div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Category</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: f.value.category_id,
							"onUpdate:modelValue": ($event) => f.value.category_id = $event,
							label: "Category",
							options: __props.categories.map((c) => ({
								value: c.id,
								label: c.name
							}))
						}, null, _parent, _scopeId));
						_push(`</div><div class="field"${_scopeId}><label${_scopeId}>Badge</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: f.value.badge,
							"onUpdate:modelValue": ($event) => f.value.badge = $event,
							label: "Badge",
							options: [{
								value: null,
								label: "None"
							}, {
								value: "signature",
								label: "Signature (gold)"
							}]
						}, null, _parent, _scopeId));
						_push(`</div></div></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Durations &amp; prices</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>Master surcharge from price_by_level</span></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><table class="t" style="${ssrRenderStyle({ "font-size": "13px" })}"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Duration</th><th${_scopeId}>Price</th><th${_scopeId}>Master surcharge</th><th${_scopeId}>Senior surcharge</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(f.value.variants, (v, i) => {
							_push(`<tr${_scopeId}><td${_scopeId}><div class="input" style="${ssrRenderStyle({ "width": "110px" })}"${_scopeId}><input${ssrRenderAttr("value", v.duration)} type="number" min="15" step="15" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></td><td${_scopeId}><div class="input" style="${ssrRenderStyle({ "width": "140px" })}"${_scopeId}><input${ssrRenderAttr("value", v.price)} type="number" min="0" step="1000" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></td><td${_scopeId}><div class="input" style="${ssrRenderStyle({ "width": "140px" })}"${_scopeId}><input${ssrRenderAttr("value", v.master_surcharge)} type="number" min="0" step="1000" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></td><td${_scopeId}><div class="input" style="${ssrRenderStyle({ "width": "140px" })}"${_scopeId}><input${ssrRenderAttr("value", v.senior_surcharge)} type="number" min="0" step="1000" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></td><td${_scopeId}><button class="ib" aria-label="Remove"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "x"
							}, null, _parent, _scopeId));
							_push(`</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table><button class="btn sm" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`Add duration</button></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Skills required</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>Only these therapists can be assigned</span></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "8px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.staff, (s) => {
							_push(`<label class="cbx" role="checkbox"${ssrRenderAttr("aria-checked", String(f.value.skill_ids.includes(s.id)))}${_scopeId}><span class="box"${_scopeId}>`);
							if (f.value.skill_ids.includes(s.id)) _push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span> ${ssrInterpolate(s.display_name)} <span class="muted small"${_scopeId}>· ${ssrInterpolate(s.level)}</span></label>`);
						});
						_push(`<!--]--></div></section></div><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "16px",
							"align-content": "start"
						})}"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Resources</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "14px"
						})}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Room type</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: f.value.room_type,
							"onUpdate:modelValue": ($event) => f.value.room_type = $event,
							label: "Room type",
							options: [
								{
									value: "single",
									label: "Single room"
								},
								{
									value: "couples",
									label: "Couples suite"
								},
								{
									value: "facial",
									label: "Facial room"
								},
								{
									value: "wet",
									label: "Wet room"
								},
								{
									value: "any",
									label: "Any room"
								}
							]
						}, null, _parent, _scopeId));
						_push(`</div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Therapists needed</label><div class="seg" role="group"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(f.value.therapists_needed === 1))}${_scopeId}>1</button><button${ssrRenderAttr("aria-pressed", String(f.value.therapists_needed === 2))}${_scopeId}>2</button></div></div><div class="field"${_scopeId}><label${_scopeId}>Guests</label><div class="seg" role="group"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(f.value.max_guests === 1))}${_scopeId}>1</button><button${ssrRenderAttr("aria-pressed", String(f.value.max_guests === 2))}${_scopeId}>For 2</button></div></div></div><div class="field"${_scopeId}><label${_scopeId}>Price basis</label><div class="seg" role="group"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(f.value.price_basis === "per_guest"))}${_scopeId}>Per guest</button><button${ssrRenderAttr("aria-pressed", String(f.value.price_basis === "per_booking"))}${_scopeId}>Per booking (for two)</button></div></div><div class="field"${_scopeId}><label${_scopeId}>Buffer after treatment</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", f.value.buffer)} type="number" min="0" step="5" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}><span class="phd"${_scopeId}>min</span></div><span class="hint"${_scopeId}>Gap kept free before the next booking.</span></div></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Add-ons</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "8px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.addons, (a) => {
							_push(`<label class="cbx" role="checkbox"${ssrRenderAttr("aria-checked", String(f.value.addon_ids.includes(a.id)))}${_scopeId}><span class="box"${_scopeId}>`);
							if (f.value.addon_ids.includes(a.id)) _push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span><span class="t2"${_scopeId}>${ssrInterpolate(a.name)}<small class="num"${_scopeId}>${ssrInterpolate(a.duration)} min · ${ssrInterpolate(fmt(a.price))}</small></span></label>`);
						});
						_push(`<!--]--></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Booking rules</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "12px"
						})}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Required form</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: f.value.form_id,
							"onUpdate:modelValue": ($event) => f.value.form_id = $event,
							label: "Form",
							options: [{
								value: null,
								label: "None"
							}, ...__props.forms.map((fo) => ({
								value: fo.id,
								label: fo.name
							}))]
						}, null, _parent, _scopeId));
						_push(`<span class="hint"${_scopeId}>Bookings show &quot;Form missing&quot; in the calendar until signed.</span></div><label class="swt" role="switch"${ssrRenderAttr("aria-checked", String(f.value.active))}${_scopeId}><span class="track"${_scopeId}></span> Service active </label><label class="swt" role="switch"${ssrRenderAttr("aria-checked", String(f.value.bookable_online))}${_scopeId}><span class="track"${_scopeId}></span> Bookable online </label></div></section></div></div></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("div", { class: "crumb" }, [
						createVNode("a", { href: "/admin/catalog" }, "Catalog"),
						createVNode(_sfc_main$29, {
							xs: "",
							name: "chevron-right"
						}),
						createVNode("a", { href: "/admin/catalog" }, "Services"),
						createVNode(_sfc_main$29, {
							xs: "",
							name: "chevron-right"
						}),
						createTextVNode(toDisplayString(isNew ? "New" : "Edit"), 1)
					]), createVNode("h1", null, [createTextVNode(toDisplayString(f.value.name || "New service") + " ", 1), f.value.bookable_online ? (openBlock(), createBlock("span", {
						key: 0,
						class: "badge ok"
					}, [createVNode(_sfc_main$29, { name: "globe" }), createTextVNode("Bookable online")])) : createCommentVNode("", true)])]), createVNode("div", { class: "acts" }, [createVNode("a", {
						class: "btn",
						href: "/"
					}, [createVNode(_sfc_main$29, {
						sm: "",
						name: "eye"
					}), createTextVNode("Preview")]), createVNode("button", {
						class: "btn primary",
						onClick: save
					}, "Save")])]), createVNode("div", { class: "sv" }, [createVNode("div", { style: {
						"display": "grid",
						"gap": "16px"
					} }, [
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Basics")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "14px"
							}
						}, [
							createVNode("div", { class: "field" }, [createVNode("label", null, "Name"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => f.value.name = $event,
								placeholder: "e.g. Balinese Massage",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, f.value.name]])])]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Description"), createVNode("div", { class: "input area" }, [withDirectives(createVNode("textarea", {
								"onUpdate:modelValue": ($event) => f.value.description = $event,
								rows: "2",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit",
									"resize": "vertical"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, f.value.description]])])]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Category"), createVNode(_sfc_main$24, {
								modelValue: f.value.category_id,
								"onUpdate:modelValue": ($event) => f.value.category_id = $event,
								label: "Category",
								options: __props.categories.map((c) => ({
									value: c.id,
									label: c.name
								}))
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Badge"), createVNode(_sfc_main$24, {
								modelValue: f.value.badge,
								"onUpdate:modelValue": ($event) => f.value.badge = $event,
								label: "Badge",
								options: [{
									value: null,
									label: "None"
								}, {
									value: "signature",
									label: "Signature (gold)"
								}]
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])])
						])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Durations & prices"), createVNode("span", {
							class: "muted small",
							style: { "margin-left": "auto" }
						}, "Master surcharge from price_by_level")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "10px"
							}
						}, [createVNode("table", {
							class: "t",
							style: { "font-size": "13px" }
						}, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Duration"),
							createVNode("th", null, "Price"),
							createVNode("th", null, "Master surcharge"),
							createVNode("th", null, "Senior surcharge"),
							createVNode("th")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(f.value.variants, (v, i) => {
							return openBlock(), createBlock("tr", { key: i }, [
								createVNode("td", null, [createVNode("div", {
									class: "input",
									style: { "width": "110px" }
								}, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => v.duration = $event,
									type: "number",
									min: "15",
									step: "15",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, v.duration]])])]),
								createVNode("td", null, [createVNode("div", {
									class: "input",
									style: { "width": "140px" }
								}, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => v.price = $event,
									type: "number",
									min: "0",
									step: "1000",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, v.price]])])]),
								createVNode("td", null, [createVNode("div", {
									class: "input",
									style: { "width": "140px" }
								}, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => v.master_surcharge = $event,
									type: "number",
									min: "0",
									step: "1000",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, v.master_surcharge]])])]),
								createVNode("td", null, [createVNode("div", {
									class: "input",
									style: { "width": "140px" }
								}, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => v.senior_surcharge = $event,
									type: "number",
									min: "0",
									step: "1000",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, v.senior_surcharge]])])]),
								createVNode("td", null, [createVNode("button", {
									class: "ib",
									"aria-label": "Remove",
									onClick: ($event) => f.value.variants.length > 1 && f.value.variants.splice(i, 1)
								}, [createVNode(_sfc_main$29, {
									sm: "",
									name: "x"
								})], 8, ["onClick"])])
							]);
						}), 128))])]), createVNode("button", {
							class: "btn sm",
							style: { "width": "max-content" },
							onClick: ($event) => f.value.variants.push({
								duration: 90,
								price: f.value.variants[0].price,
								master_surcharge: 0,
								senior_surcharge: 0
							})
						}, [createVNode(_sfc_main$29, {
							xs: "",
							name: "plus"
						}), createTextVNode("Add duration")], 8, ["onClick"])])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Skills required"), createVNode("span", {
							class: "muted small",
							style: { "margin-left": "auto" }
						}, "Only these therapists can be assigned")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "8px"
							}
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.staff, (s) => {
							return openBlock(), createBlock("label", {
								key: s.id,
								class: "cbx",
								role: "checkbox",
								"aria-checked": String(f.value.skill_ids.includes(s.id)),
								onClick: ($event) => f.value.skill_ids.includes(s.id) ? f.value.skill_ids.splice(f.value.skill_ids.indexOf(s.id), 1) : f.value.skill_ids.push(s.id)
							}, [
								createVNode("span", { class: "box" }, [f.value.skill_ids.includes(s.id) ? (openBlock(), createBlock(_sfc_main$29, {
									key: 0,
									name: "check"
								})) : createCommentVNode("", true)]),
								createTextVNode(" " + toDisplayString(s.display_name) + " ", 1),
								createVNode("span", { class: "muted small" }, "· " + toDisplayString(s.level), 1)
							], 8, ["aria-checked", "onClick"]);
						}), 128))])])
					]), createVNode("div", { style: {
						"display": "grid",
						"gap": "16px",
						"align-content": "start"
					} }, [
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Resources")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "14px"
							}
						}, [
							createVNode("div", { class: "field" }, [createVNode("label", null, "Room type"), createVNode(_sfc_main$24, {
								modelValue: f.value.room_type,
								"onUpdate:modelValue": ($event) => f.value.room_type = $event,
								label: "Room type",
								options: [
									{
										value: "single",
										label: "Single room"
									},
									{
										value: "couples",
										label: "Couples suite"
									},
									{
										value: "facial",
										label: "Facial room"
									},
									{
										value: "wet",
										label: "Wet room"
									},
									{
										value: "any",
										label: "Any room"
									}
								]
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Therapists needed"), createVNode("div", {
								class: "seg",
								role: "group"
							}, [createVNode("button", {
								"aria-pressed": String(f.value.therapists_needed === 1),
								onClick: ($event) => {
									f.value.therapists_needed = 1;
									f.value.max_guests = 1;
								}
							}, "1", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(f.value.therapists_needed === 2),
								onClick: ($event) => {
									f.value.therapists_needed = 2;
									f.value.max_guests = 2;
								}
							}, "2", 8, ["aria-pressed", "onClick"])])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Guests"), createVNode("div", {
								class: "seg",
								role: "group"
							}, [createVNode("button", {
								"aria-pressed": String(f.value.max_guests === 1),
								onClick: ($event) => f.value.max_guests = 1
							}, "1", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(f.value.max_guests === 2),
								onClick: ($event) => f.value.max_guests = 2
							}, "For 2", 8, ["aria-pressed", "onClick"])])])]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Price basis"), createVNode("div", {
								class: "seg",
								role: "group"
							}, [createVNode("button", {
								"aria-pressed": String(f.value.price_basis === "per_guest"),
								onClick: ($event) => f.value.price_basis = "per_guest"
							}, "Per guest", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(f.value.price_basis === "per_booking"),
								onClick: ($event) => f.value.price_basis = "per_booking"
							}, "Per booking (for two)", 8, ["aria-pressed", "onClick"])])]),
							createVNode("div", { class: "field" }, [
								createVNode("label", null, "Buffer after treatment"),
								createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => f.value.buffer = $event,
									type: "number",
									min: "0",
									step: "5",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, f.value.buffer]]), createVNode("span", { class: "phd" }, "min")]),
								createVNode("span", { class: "hint" }, "Gap kept free before the next booking.")
							])
						])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Add-ons")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "8px"
							}
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.addons, (a) => {
							return openBlock(), createBlock("label", {
								key: a.id,
								class: "cbx",
								role: "checkbox",
								"aria-checked": String(f.value.addon_ids.includes(a.id)),
								onClick: ($event) => f.value.addon_ids.includes(a.id) ? f.value.addon_ids.splice(f.value.addon_ids.indexOf(a.id), 1) : f.value.addon_ids.push(a.id)
							}, [createVNode("span", { class: "box" }, [f.value.addon_ids.includes(a.id) ? (openBlock(), createBlock(_sfc_main$29, {
								key: 0,
								name: "check"
							})) : createCommentVNode("", true)]), createVNode("span", { class: "t2" }, [createTextVNode(toDisplayString(a.name), 1), createVNode("small", { class: "num" }, toDisplayString(a.duration) + " min · " + toDisplayString(fmt(a.price)), 1)])], 8, ["aria-checked", "onClick"]);
						}), 128))])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Booking rules")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "12px"
							}
						}, [
							createVNode("div", { class: "field" }, [
								createVNode("label", null, "Required form"),
								createVNode(_sfc_main$24, {
									modelValue: f.value.form_id,
									"onUpdate:modelValue": ($event) => f.value.form_id = $event,
									label: "Form",
									options: [{
										value: null,
										label: "None"
									}, ...__props.forms.map((fo) => ({
										value: fo.id,
										label: fo.name
									}))]
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options"
								]),
								createVNode("span", { class: "hint" }, "Bookings show \"Form missing\" in the calendar until signed.")
							]),
							createVNode("label", {
								class: "swt",
								role: "switch",
								"aria-checked": String(f.value.active),
								onClick: ($event) => f.value.active = !f.value.active
							}, [createVNode("span", { class: "track" }), createTextVNode(" Service active ")], 8, ["aria-checked", "onClick"]),
							createVNode("label", {
								class: "swt",
								role: "switch",
								"aria-checked": String(f.value.bookable_online),
								onClick: ($event) => f.value.bookable_online = !f.value.bookable_online
							}, [createVNode("span", { class: "track" }), createTextVNode(" Bookable online ")], 8, ["aria-checked", "onClick"])
						])])
					])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/ServiceEdit.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Settings.vue
var Settings_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$12 });
var _sfc_main$12 = {
	__name: "Settings",
	__ssrInlineRender: true,
	props: {
		business: Object,
		policy: Object,
		locations: Array,
		users: Array,
		audit: Array,
		payments: Object
	},
	setup(__props) {
		const props = __props;
		const business = ref({ ...props.business });
		const policy = ref({ ...props.policy });
		const days = [
			"mon",
			"tue",
			"wed",
			"thu",
			"fri",
			"sat",
			"sun"
		];
		const dayLabel = {
			mon: "Mon",
			tue: "Tue",
			wed: "Wed",
			thu: "Thu",
			fri: "Fri",
			sat: "Sat",
			sun: "Sun"
		};
		function saveBusiness() {
			router.put(route("admin.settings.business"), business.value, { preserveScroll: true });
		}
		function savePolicy() {
			router.put(route("admin.settings.policy"), policy.value, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Settings</h1><p${_scopeId}>Business, booking policy, locations, staff and audit trail.</p></div></div><div class="st-grid"${_scopeId}><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "16px"
						})}"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Business</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "12px"
						})}"${_scopeId}><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Name</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", business.value.name)} style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div></div><div class="field"${_scopeId}><label${_scopeId}>Plan · currency · timezone</label><div class="input"${_scopeId}><span class="phd"${_scopeId}>${ssrInterpolate(business.value.plan)} · ${ssrInterpolate(business.value.currency)} · ${ssrInterpolate(business.value.timezone)}</span></div></div></div><div class="field"${_scopeId}><label${_scopeId}>Booking page tagline</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", business.value.branding.tagline)} style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div></div><button class="btn primary" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Save business</button></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Booking policy</h2><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>snapshotted into new bookings</span></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "12px"
						})}"${_scopeId}><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Deposit</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", policy.value.deposit_percent)} type="number" min="0" max="100" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}><span class="phd"${_scopeId}>%</span></div></div><div class="field"${_scopeId}><label${_scopeId}>Free cancellation window</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", policy.value.cancel_window_hours)} type="number" min="0" max="168" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}><span class="phd"${_scopeId}>h before</span></div></div></div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>No-show fee</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", policy.value.no_show_fee_percent)} type="number" min="0" max="100" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}><span class="phd"${_scopeId}>% of total</span></div></div><div class="field"${_scopeId}><label${_scopeId}>Saved card</label><div class="seg" role="group"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(policy.value.saved_card_mode === "optional"))}${_scopeId}>Optional</button><button${ssrRenderAttr("aria-pressed", String(policy.value.saved_card_mode === "required"))}${_scopeId}>Required</button></div></div></div><button class="btn primary" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Save policy</button></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Payments</h2></div><div class="card-b kv" style="${ssrRenderStyle({
							"display": "grid",
							"grid-template-columns": "170px 1fr",
							"gap": "8px",
							"font-size": "13px"
						})}"${_scopeId}><span class="muted"${_scopeId}>USD gateway</span><b${_scopeId}>${ssrInterpolate(__props.payments.gateway_usd)}</b><span class="muted"${_scopeId}>IDR gateway</span><b${_scopeId}>${ssrInterpolate(__props.payments.gateway_idr)}</b><span class="muted"${_scopeId}>Mode</span><b${_scopeId}>${ssrInterpolate(__props.payments.sandbox ? "Sandbox (simulated provider pages)" : "Live")}</b></div></section></div><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "16px",
							"align-content": "start"
						})}"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Locations &amp; hours</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "14px"
						})}"${_scopeId}><!--[-->`);
						ssrRenderList(__props.locations, (l) => {
							_push(`<div style="${ssrRenderStyle({
								"border": "1px solid var(--line)",
								"border-radius": "10px",
								"padding": "14px",
								"display": "grid",
								"gap": "8px"
							})}"${_scopeId}><div style="${ssrRenderStyle({
								"display": "flex",
								"gap": "8px",
								"align-items": "center"
							})}"${_scopeId}><b${_scopeId}>${ssrInterpolate(l.name)}</b><span class="muted small" style="${ssrRenderStyle({ "margin-left": "auto" })}"${_scopeId}>${ssrInterpolate(l.timezone)}</span></div><div style="${ssrRenderStyle({
								"font-size": "12px",
								"color": "var(--text-3)",
								"display": "grid",
								"gap": "2px"
							})}"${_scopeId}><!--[-->`);
							ssrRenderList(days, (d) => {
								_push(`<div style="${ssrRenderStyle({
									"display": "grid",
									"grid-template-columns": "36px 1fr",
									"gap": "8px"
								})}"${_scopeId}><span${_scopeId}>${ssrInterpolate(dayLabel[d])}</span><span class="num"${_scopeId}>${ssrInterpolate((l.opening_hours?.[d] ?? []).map((r) => r.join("–")).join(", ") || "Closed")}</span></div>`);
							});
							_push(`<!--]--></div></div>`);
						});
						_push(`<!--]--></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Staff &amp; roles</h2></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>User</th><th${_scopeId}>Role</th><th${_scopeId}>Therapist</th><th${_scopeId}>2FA</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.users, (u) => {
							_push(`<tr${_scopeId}><td${_scopeId}><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(u.name)}</b><small${_scopeId}>${ssrInterpolate(u.email)}</small></span></td><td${_scopeId}><span class="badge"${_scopeId}>${ssrInterpolate(u.role.replace("_", " "))}</span></td><td${_scopeId}>${ssrInterpolate(u.staff ?? "—")}</td><td${_scopeId}><span class="${ssrRenderClass([u.twofa ? "ok" : "", "badge"])}"${_scopeId}>${ssrInterpolate(u.twofa ? "On" : "Off")}</span></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Audit trail</h2></div><ul class="audit"${_scopeId}><!--[-->`);
						ssrRenderList(__props.audit, (a, i) => {
							_push(`<li${_scopeId}><span class="av sm av-5" aria-hidden="true"${_scopeId}>${ssrInterpolate((a.who ?? "S").slice(0, 2).toUpperCase())}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(a.what)}</b><small${_scopeId}>by ${ssrInterpolate(a.who ?? "system")}</small></span><time${_scopeId}>${ssrInterpolate(a.when)}</time></li>`);
						});
						_push(`<!--]-->`);
						if (!__props.audit.length) _push(`<li class="muted small" style="${ssrRenderStyle({ "padding": "8px 0" })}"${_scopeId}>No audited events yet.</li>`);
						else _push(`<!---->`);
						_push(`</ul></section></div></div></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Settings"), createVNode("p", null, "Business, booking policy, locations, staff and audit trail.")])]), createVNode("div", { class: "st-grid" }, [createVNode("div", { style: {
						"display": "grid",
						"gap": "16px"
					} }, [
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Business")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "12px"
							}
						}, [
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Name"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => business.value.name = $event,
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, business.value.name]])])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Plan · currency · timezone"), createVNode("div", { class: "input" }, [createVNode("span", { class: "phd" }, toDisplayString(business.value.plan) + " · " + toDisplayString(business.value.currency) + " · " + toDisplayString(business.value.timezone), 1)])])]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Booking page tagline"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => business.value.branding.tagline = $event,
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, business.value.branding.tagline]])])]),
							createVNode("button", {
								class: "btn primary",
								style: { "width": "max-content" },
								onClick: saveBusiness
							}, "Save business")
						])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Booking policy"), createVNode("span", {
							class: "muted small",
							style: { "margin-left": "auto" }
						}, "snapshotted into new bookings")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "12px"
							}
						}, [
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Deposit"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => policy.value.deposit_percent = $event,
								type: "number",
								min: "0",
								max: "100",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, policy.value.deposit_percent]]), createVNode("span", { class: "phd" }, "%")])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Free cancellation window"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => policy.value.cancel_window_hours = $event,
								type: "number",
								min: "0",
								max: "168",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, policy.value.cancel_window_hours]]), createVNode("span", { class: "phd" }, "h before")])])]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "No-show fee"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => policy.value.no_show_fee_percent = $event,
								type: "number",
								min: "0",
								max: "100",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, policy.value.no_show_fee_percent]]), createVNode("span", { class: "phd" }, "% of total")])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Saved card"), createVNode("div", {
								class: "seg",
								role: "group"
							}, [createVNode("button", {
								"aria-pressed": String(policy.value.saved_card_mode === "optional"),
								onClick: ($event) => policy.value.saved_card_mode = "optional"
							}, "Optional", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(policy.value.saved_card_mode === "required"),
								onClick: ($event) => policy.value.saved_card_mode = "required"
							}, "Required", 8, ["aria-pressed", "onClick"])])])]),
							createVNode("button", {
								class: "btn primary",
								style: { "width": "max-content" },
								onClick: savePolicy
							}, "Save policy")
						])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Payments")]), createVNode("div", {
							class: "card-b kv",
							style: {
								"display": "grid",
								"grid-template-columns": "170px 1fr",
								"gap": "8px",
								"font-size": "13px"
							}
						}, [
							createVNode("span", { class: "muted" }, "USD gateway"),
							createVNode("b", null, toDisplayString(__props.payments.gateway_usd), 1),
							createVNode("span", { class: "muted" }, "IDR gateway"),
							createVNode("b", null, toDisplayString(__props.payments.gateway_idr), 1),
							createVNode("span", { class: "muted" }, "Mode"),
							createVNode("b", null, toDisplayString(__props.payments.sandbox ? "Sandbox (simulated provider pages)" : "Live"), 1)
						])])
					]), createVNode("div", { style: {
						"display": "grid",
						"gap": "16px",
						"align-content": "start"
					} }, [
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Locations & hours")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "14px"
							}
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.locations, (l) => {
							return openBlock(), createBlock("div", {
								key: l.id,
								style: {
									"border": "1px solid var(--line)",
									"border-radius": "10px",
									"padding": "14px",
									"display": "grid",
									"gap": "8px"
								}
							}, [createVNode("div", { style: {
								"display": "flex",
								"gap": "8px",
								"align-items": "center"
							} }, [createVNode("b", null, toDisplayString(l.name), 1), createVNode("span", {
								class: "muted small",
								style: { "margin-left": "auto" }
							}, toDisplayString(l.timezone), 1)]), createVNode("div", { style: {
								"font-size": "12px",
								"color": "var(--text-3)",
								"display": "grid",
								"gap": "2px"
							} }, [(openBlock(), createBlock(Fragment, null, renderList(days, (d) => {
								return createVNode("div", {
									key: d,
									style: {
										"display": "grid",
										"grid-template-columns": "36px 1fr",
										"gap": "8px"
									}
								}, [createVNode("span", null, toDisplayString(dayLabel[d]), 1), createVNode("span", { class: "num" }, toDisplayString((l.opening_hours?.[d] ?? []).map((r) => r.join("–")).join(", ") || "Closed"), 1)]);
							}), 64))])]);
						}), 128))])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Staff & roles")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "User"),
							createVNode("th", null, "Role"),
							createVNode("th", null, "Therapist"),
							createVNode("th", null, "2FA")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.users, (u) => {
							return openBlock(), createBlock("tr", { key: u.email }, [
								createVNode("td", null, [createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(u.name), 1), createVNode("small", null, toDisplayString(u.email), 1)])]),
								createVNode("td", null, [createVNode("span", { class: "badge" }, toDisplayString(u.role.replace("_", " ")), 1)]),
								createVNode("td", null, toDisplayString(u.staff ?? "—"), 1),
								createVNode("td", null, [createVNode("span", { class: ["badge", u.twofa ? "ok" : ""] }, toDisplayString(u.twofa ? "On" : "Off"), 3)])
							]);
						}), 128))])])])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Audit trail")]), createVNode("ul", { class: "audit" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.audit, (a, i) => {
							return openBlock(), createBlock("li", { key: i }, [
								createVNode("span", {
									class: "av sm av-5",
									"aria-hidden": "true"
								}, toDisplayString((a.who ?? "S").slice(0, 2).toUpperCase()), 1),
								createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(a.what), 1), createVNode("small", null, "by " + toDisplayString(a.who ?? "system"), 1)]),
								createVNode("time", null, toDisplayString(a.when), 1)
							]);
						}), 128)), !__props.audit.length ? (openBlock(), createBlock("li", {
							key: 0,
							class: "muted small",
							style: { "padding": "8px 0" }
						}, "No audited events yet.")) : createCommentVNode("", true)])])
					])])])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Settings.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
// resources/js/Pages/Admin/Team.vue
var Team_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$11 });
var _sfc_main$11 = {
	__name: "Team",
	__ssrInlineRender: true,
	props: {
		staff: Array,
		time_off: Array,
		week: String,
		services: Array,
		locations: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const adding = ref(false);
		const form = ref({
			display_name: "",
			gender: "female",
			level: "junior",
			specialty: "",
			skill_ids: []
		});
		const shiftForm = ref({
			staff_id: "",
			location_id: props.locations[0]?.id ?? "",
			day: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"),
			start: "09:00",
			end: "21:00"
		});
		const offForm = ref({
			staff_id: "",
			fromDay: "",
			fromTime: "09:00",
			toDay: "",
			toTime: "21:00",
			reason: ""
		});
		const times = Array.from({ length: 96 }, (_, i) => {
			const v = `${String(Math.floor(i / 4)).padStart(2, "0")}:${String(i % 4 * 15).padStart(2, "0")}`;
			return {
				value: v,
				label: v
			};
		});
		function saveStaff() {
			router.post(route("admin.team.staff.store"), form.value, { onSuccess: () => {
				adding.value = false;
				form.value = {
					display_name: "",
					gender: "female",
					level: "junior",
					specialty: "",
					skill_ids: []
				};
			} });
		}
		function toggleSkill(id) {
			const i = form.value.skill_ids.indexOf(id);
			i >= 0 ? form.value.skill_ids.splice(i, 1) : form.value.skill_ids.push(id);
		}
		function addShift() {
			router.post(route("admin.team.shifts.store"), shiftForm.value, { preserveScroll: true });
		}
		function addTimeOff() {
			const o = offForm.value;
			router.post(route("admin.team.timeoff.store"), {
				staff_id: o.staff_id,
				reason: o.reason,
				from: `${o.fromDay} ${o.fromTime}`,
				to: `${o.toDay} ${o.toTime}`
			}, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Team</h1><p${_scopeId}>Therapists, skills, weekly shifts and time off.</p></div><div class="acts"${_scopeId}><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`New therapist</button></div></div>`);
						if (adding.value) {
							_push(`<section class="card" style="${ssrRenderStyle({ "margin-bottom": "16px" })}"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>New therapist</h2></div><div class="card-b" style="${ssrRenderStyle({
								"display": "grid",
								"gap": "12px"
							})}"${_scopeId}><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Name</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", form.value.display_name)} placeholder="e.g. Made Artana" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}></div></div><div class="row2" style="${ssrRenderStyle({
								"grid-template-columns": "1fr 1fr",
								"gap": "12px"
							})}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Gender</label><div class="seg"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(form.value.gender === "female"))}${_scopeId}>Female</button><button${ssrRenderAttr("aria-pressed", String(form.value.gender === "male"))}${_scopeId}>Male</button></div></div><div class="field"${_scopeId}><label${_scopeId}>Level</label>`);
							_push(ssrRenderComponent(_sfc_main$24, {
								modelValue: form.value.level,
								"onUpdate:modelValue": ($event) => form.value.level = $event,
								label: "Level",
								options: [
									{
										value: "junior",
										label: "Junior"
									},
									{
										value: "senior",
										label: "Senior"
									},
									{
										value: "master",
										label: "Master"
									}
								]
							}, null, _parent, _scopeId));
							_push(`</div></div></div><div class="field"${_scopeId}><label${_scopeId}>Skills</label><div style="${ssrRenderStyle({
								"display": "flex",
								"gap": "6px",
								"flex-wrap": "wrap"
							})}"${_scopeId}><!--[-->`);
							ssrRenderList(__props.services, (s) => {
								_push(`<span class="chip" role="checkbox"${ssrRenderAttr("aria-checked", String(form.value.skill_ids.includes(s.id)))}${_scopeId}>${ssrInterpolate(s.name)}</span>`);
							});
							_push(`<!--]--></div></div><button class="btn primary" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Add therapist</button></div></section>`);
						} else _push(`<!---->`);
						_push(`<div class="tm-grid"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Therapists</h2></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Therapist</th><th${_scopeId}>Level</th><th${_scopeId}>Skills</th><th class="n"${_scopeId}>Shifts this week</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.staff, (s) => {
							_push(`<tr${_scopeId}><td${_scopeId}><span class="cellp"${_scopeId}><span class="${ssrRenderClass(["av-" + s.hue, "av"])}"${_scopeId}>${ssrInterpolate(s.initials)}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(s.name)}</b><small${_scopeId}>${ssrInterpolate(s.gender)}</small></span></span></td><td${_scopeId}>${ssrInterpolate(s.level)}`);
							if (s.specialty) _push(`<!--[--> · ${ssrInterpolate(s.specialty)}<!--]-->`);
							else _push(`<!---->`);
							_push(`</td><td class="muted"${_scopeId}>${ssrInterpolate(s.skills.slice(0, 2).join(", "))}`);
							if (s.skills.length > 2) _push(`<!--[--> +${ssrInterpolate(s.skills.length - 2)}<!--]-->`);
							else _push(`<!---->`);
							_push(`</td><td class="n"${_scopeId}>${ssrInterpolate(s.shifts.length)}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "16px",
							"align-content": "start"
						})}"${_scopeId}><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Add a shift</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Therapist</label>`);
						if (__props.locations.length > 1) _push(ssrRenderComponent(_sfc_main$24, {
							modelValue: shiftForm.value.location_id,
							"onUpdate:modelValue": ($event) => shiftForm.value.location_id = $event,
							label: "Location",
							options: __props.locations.map((l) => ({
								value: l.id,
								label: l.name
							})),
							style: { "margin-bottom": "10px" }
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: shiftForm.value.staff_id,
							"onUpdate:modelValue": ($event) => shiftForm.value.staff_id = $event,
							label: "Therapist",
							options: __props.staff.map((s) => ({
								value: s.id,
								label: s.name
							}))
						}, null, _parent, _scopeId));
						_push(`</div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>Date</label>`);
						_push(ssrRenderComponent(_sfc_main$23, {
							modelValue: shiftForm.value.day,
							"onUpdate:modelValue": ($event) => shiftForm.value.day = $event,
							label: "Shift date"
						}, null, _parent, _scopeId));
						_push(`</div><div class="row2" style="${ssrRenderStyle({ "gap": "8px" })}"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>From</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: shiftForm.value.start,
							"onUpdate:modelValue": ($event) => shiftForm.value.start = $event,
							label: "Shift start",
							options: unref(times)
						}, null, _parent, _scopeId));
						_push(`</div><div class="field"${_scopeId}><label${_scopeId}>To</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: shiftForm.value.end,
							"onUpdate:modelValue": ($event) => shiftForm.value.end = $event,
							label: "Shift end",
							options: unref(times)
						}, null, _parent, _scopeId));
						_push(`</div></div></div><button class="btn primary" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Add shift</button></div></section><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Time off</h2></div><div class="card-b" style="${ssrRenderStyle({
							"display": "grid",
							"gap": "10px"
						})}"${_scopeId}><ul class="forms"${_scopeId}><!--[-->`);
						ssrRenderList(__props.time_off, (t) => {
							_push(`<li${_scopeId}><span class="ic"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "calendar-days"
							}, null, _parent, _scopeId));
							_push(`</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(t.staff)}</b><small${_scopeId}>${ssrInterpolate(t.from)} → ${ssrInterpolate(t.to)} · ${ssrInterpolate(t.reason)}</small></span></li>`);
						});
						_push(`<!--]-->`);
						if (!__props.time_off.length) _push(`<li class="muted small"${_scopeId}>No upcoming time off.</li>`);
						else _push(`<!---->`);
						_push(`</ul><div class="field"${_scopeId}><label${_scopeId}>Therapist</label>`);
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: offForm.value.staff_id,
							"onUpdate:modelValue": ($event) => offForm.value.staff_id = $event,
							label: "Time off therapist",
							options: __props.staff.map((s) => ({
								value: s.id,
								label: s.name
							}))
						}, null, _parent, _scopeId));
						_push(`</div><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${_scopeId}>From</label><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "6px"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$23, {
							modelValue: offForm.value.fromDay,
							"onUpdate:modelValue": ($event) => offForm.value.fromDay = $event,
							label: "Time off from date"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: offForm.value.fromTime,
							"onUpdate:modelValue": ($event) => offForm.value.fromTime = $event,
							label: "Time off from time",
							options: unref(times)
						}, null, _parent, _scopeId));
						_push(`</div></div><div class="field"${_scopeId}><label${_scopeId}>To</label><div style="${ssrRenderStyle({
							"display": "grid",
							"gap": "6px"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$23, {
							modelValue: offForm.value.toDay,
							"onUpdate:modelValue": ($event) => offForm.value.toDay = $event,
							label: "Time off to date"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$24, {
							modelValue: offForm.value.toTime,
							"onUpdate:modelValue": ($event) => offForm.value.toTime = $event,
							label: "Time off to time",
							options: unref(times)
						}, null, _parent, _scopeId));
						_push(`</div></div></div><button class="btn sm" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}>Record time off</button></div></section></div></div></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, "Team"), createVNode("p", null, "Therapists, skills, weekly shifts and time off.")]), createVNode("div", { class: "acts" }, [createVNode("button", {
							class: "btn primary",
							onClick: ($event) => adding.value = !adding.value
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("New therapist")], 8, ["onClick"])])]),
						adding.value ? (openBlock(), createBlock("section", {
							key: 0,
							class: "card",
							style: { "margin-bottom": "16px" }
						}, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "New therapist")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "12px"
							}
						}, [
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Name"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => form.value.display_name = $event,
								placeholder: "e.g. Made Artana",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, form.value.display_name]])])]), createVNode("div", {
								class: "row2",
								style: {
									"grid-template-columns": "1fr 1fr",
									"gap": "12px"
								}
							}, [createVNode("div", { class: "field" }, [createVNode("label", null, "Gender"), createVNode("div", { class: "seg" }, [createVNode("button", {
								"aria-pressed": String(form.value.gender === "female"),
								onClick: ($event) => form.value.gender = "female"
							}, "Female", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(form.value.gender === "male"),
								onClick: ($event) => form.value.gender = "male"
							}, "Male", 8, ["aria-pressed", "onClick"])])]), createVNode("div", { class: "field" }, [createVNode("label", null, "Level"), createVNode(_sfc_main$24, {
								modelValue: form.value.level,
								"onUpdate:modelValue": ($event) => form.value.level = $event,
								label: "Level",
								options: [
									{
										value: "junior",
										label: "Junior"
									},
									{
										value: "senior",
										label: "Senior"
									},
									{
										value: "master",
										label: "Master"
									}
								]
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])])]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Skills"), createVNode("div", { style: {
								"display": "flex",
								"gap": "6px",
								"flex-wrap": "wrap"
							} }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.services, (s) => {
								return openBlock(), createBlock("span", {
									key: s.id,
									class: "chip",
									role: "checkbox",
									"aria-checked": String(form.value.skill_ids.includes(s.id)),
									onClick: ($event) => toggleSkill(s.id)
								}, toDisplayString(s.name), 9, ["aria-checked", "onClick"]);
							}), 128))])]),
							createVNode("button", {
								class: "btn primary",
								style: { "width": "max-content" },
								onClick: saveStaff
							}, "Add therapist")
						])])) : createCommentVNode("", true),
						createVNode("div", { class: "tm-grid" }, [createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Therapists")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Therapist"),
							createVNode("th", null, "Level"),
							createVNode("th", null, "Skills"),
							createVNode("th", { class: "n" }, "Shifts this week")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.staff, (s) => {
							return openBlock(), createBlock("tr", { key: s.id }, [
								createVNode("td", null, [createVNode("span", { class: "cellp" }, [createVNode("span", { class: ["av", "av-" + s.hue] }, toDisplayString(s.initials), 3), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(s.name), 1), createVNode("small", null, toDisplayString(s.gender), 1)])])]),
								createVNode("td", null, [createTextVNode(toDisplayString(s.level), 1), s.specialty ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" · " + toDisplayString(s.specialty), 1)], 64)) : createCommentVNode("", true)]),
								createVNode("td", { class: "muted" }, [createTextVNode(toDisplayString(s.skills.slice(0, 2).join(", ")), 1), s.skills.length > 2 ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(" +" + toDisplayString(s.skills.length - 2), 1)], 64)) : createCommentVNode("", true)]),
								createVNode("td", { class: "n" }, toDisplayString(s.shifts.length), 1)
							]);
						}), 128))])])])]), createVNode("div", { style: {
							"display": "grid",
							"gap": "16px",
							"align-content": "start"
						} }, [createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Add a shift")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "10px"
							}
						}, [
							createVNode("div", { class: "field" }, [
								createVNode("label", null, "Therapist"),
								__props.locations.length > 1 ? (openBlock(), createBlock(_sfc_main$24, {
									key: 0,
									modelValue: shiftForm.value.location_id,
									"onUpdate:modelValue": ($event) => shiftForm.value.location_id = $event,
									label: "Location",
									options: __props.locations.map((l) => ({
										value: l.id,
										label: l.name
									})),
									style: { "margin-bottom": "10px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options"
								])) : createCommentVNode("", true),
								createVNode(_sfc_main$24, {
									modelValue: shiftForm.value.staff_id,
									"onUpdate:modelValue": ($event) => shiftForm.value.staff_id = $event,
									label: "Therapist",
									options: __props.staff.map((s) => ({
										value: s.id,
										label: s.name
									}))
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options"
								])
							]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "Date"), createVNode(_sfc_main$23, {
								modelValue: shiftForm.value.day,
								"onUpdate:modelValue": ($event) => shiftForm.value.day = $event,
								label: "Shift date"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", {
								class: "row2",
								style: { "gap": "8px" }
							}, [createVNode("div", { class: "field" }, [createVNode("label", null, "From"), createVNode(_sfc_main$24, {
								modelValue: shiftForm.value.start,
								"onUpdate:modelValue": ($event) => shiftForm.value.start = $event,
								label: "Shift start",
								options: unref(times)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])]), createVNode("div", { class: "field" }, [createVNode("label", null, "To"), createVNode(_sfc_main$24, {
								modelValue: shiftForm.value.end,
								"onUpdate:modelValue": ($event) => shiftForm.value.end = $event,
								label: "Shift end",
								options: unref(times)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])])])]),
							createVNode("button", {
								class: "btn primary",
								style: { "width": "max-content" },
								onClick: addShift
							}, "Add shift")
						])]), createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Time off")]), createVNode("div", {
							class: "card-b",
							style: {
								"display": "grid",
								"gap": "10px"
							}
						}, [
							createVNode("ul", { class: "forms" }, [(openBlock(true), createBlock(Fragment, null, renderList(__props.time_off, (t) => {
								return openBlock(), createBlock("li", { key: t.id }, [createVNode("span", { class: "ic" }, [createVNode(_sfc_main$29, {
									sm: "",
									name: "calendar-days"
								})]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(t.staff), 1), createVNode("small", null, toDisplayString(t.from) + " → " + toDisplayString(t.to) + " · " + toDisplayString(t.reason), 1)])]);
							}), 128)), !__props.time_off.length ? (openBlock(), createBlock("li", {
								key: 0,
								class: "muted small"
							}, "No upcoming time off.")) : createCommentVNode("", true)]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Therapist"), createVNode(_sfc_main$24, {
								modelValue: offForm.value.staff_id,
								"onUpdate:modelValue": ($event) => offForm.value.staff_id = $event,
								label: "Time off therapist",
								options: __props.staff.map((s) => ({
									value: s.id,
									label: s.name
								}))
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])]),
							createVNode("div", { class: "row2" }, [createVNode("div", { class: "field" }, [createVNode("label", null, "From"), createVNode("div", { style: {
								"display": "grid",
								"gap": "6px"
							} }, [createVNode(_sfc_main$23, {
								modelValue: offForm.value.fromDay,
								"onUpdate:modelValue": ($event) => offForm.value.fromDay = $event,
								label: "Time off from date"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_sfc_main$24, {
								modelValue: offForm.value.fromTime,
								"onUpdate:modelValue": ($event) => offForm.value.fromTime = $event,
								label: "Time off from time",
								options: unref(times)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])])]), createVNode("div", { class: "field" }, [createVNode("label", null, "To"), createVNode("div", { style: {
								"display": "grid",
								"gap": "6px"
							} }, [createVNode(_sfc_main$23, {
								modelValue: offForm.value.toDay,
								"onUpdate:modelValue": ($event) => offForm.value.toDay = $event,
								label: "Time off to date"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_sfc_main$24, {
								modelValue: offForm.value.toTime,
								"onUpdate:modelValue": ($event) => offForm.value.toTime = $event,
								label: "Time off to time",
								options: unref(times)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])])])]),
							createVNode("button", {
								class: "btn sm",
								style: { "width": "max-content" },
								onClick: addTimeOff
							}, "Record time off")
						])])])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Team.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
// resources/js/Pages/Auth/Login.vue
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$10 });
var _sfc_main$10 = {
	__name: "Login",
	__ssrInlineRender: true,
	props: {
		brand: Object,
		redirect: String
	},
	setup(__props) {
		const email = ref("");
		const password = ref("");
		const busy = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "book" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			_push(`<div style="${ssrRenderStyle({
				"min-height": "100vh",
				"display": "grid",
				"place-items": "center",
				"padding": "24px"
			})}"><div class="card" style="${ssrRenderStyle({
				"width": "min(400px,100%)",
				"padding": "28px",
				"display": "grid",
				"gap": "14px"
			})}"><div class="blogo" style="${ssrRenderStyle({
				"display": "flex",
				"align-items": "center",
				"gap": "10px",
				"font": "600 20px var(--serif)"
			})}"><i style="${ssrRenderStyle({
				"width": "34px",
				"height": "34px",
				"border-radius": "10px",
				"background": "var(--brand)",
				"color": "#fff",
				"display": "grid",
				"place-items": "center",
				"font-style": "normal",
				"font-size": "16px"
			})}">${ssrInterpolate(__props.brand?.logo_letter ?? "L")}</i> ${ssrInterpolate(__props.brand?.name ?? "Lulur")}</div><h1 style="${ssrRenderStyle({ "font-size": "22px" })}">Staff sign-in</h1><p class="muted small">Front desk, managers and therapists. Demo users are in the README.</p><form class="grid" style="${ssrRenderStyle({ "gap": "12px" })}"><div class="field"><label for="email">Email</label><div class="input"><input id="email"${ssrRenderAttr("value", email.value)} type="email" autocomplete="username" required style="${ssrRenderStyle({
				"border": "0",
				"outline": "0",
				"background": "none",
				"width": "100%",
				"font": "inherit"
			})}"></div></div><div class="field"><label for="password">Password</label><div class="input"><input id="password"${ssrRenderAttr("value", password.value)} type="password" autocomplete="current-password" required style="${ssrRenderStyle({
				"border": "0",
				"outline": "0",
				"background": "none",
				"width": "100%",
				"font": "inherit"
			})}"></div></div>`);
			if (_ctx.$page.props.errors?.email) _push(`<div class="err" style="${ssrRenderStyle({
				"color": "var(--bad)",
				"font-size": "13px"
			})}">${ssrInterpolate(_ctx.$page.props.errors.email)}</div>`);
			else _push(`<!---->`);
			_push(`<button class="btn primary" style="${ssrRenderStyle({ "height": "44px" })}"${ssrIncludeBooleanAttr(busy.value) ? " disabled" : ""}>Sign in</button></form><p class="muted small">Booking pages don&#39;t need an account — this is for ${ssrInterpolate(__props.brand?.name ?? "the spa")} staff only.</p></div></div></div>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
// resources/js/Pages/Auth/TwoFactor.vue
var TwoFactor_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$9 });
var _sfc_main$9 = {
	__name: "TwoFactor",
	__ssrInlineRender: true,
	setup(__props) {
		const code = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "book" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			_push(`<div style="${ssrRenderStyle({
				"min-height": "100vh",
				"display": "grid",
				"place-items": "center",
				"padding": "24px"
			})}"><div class="card" style="${ssrRenderStyle({
				"width": "min(400px,100%)",
				"padding": "28px",
				"display": "grid",
				"gap": "14px"
			})}"><h1 style="${ssrRenderStyle({ "font-size": "22px" })}">Two-factor code</h1><p class="muted small">Enter the 6-digit code from your authenticator app.</p><form style="${ssrRenderStyle({
				"display": "grid",
				"gap": "12px"
			})}"><div class="input"><input${ssrRenderAttr("value", code.value)} inputmode="numeric" maxlength="6" placeholder="123456" style="${ssrRenderStyle({
				"border": "0",
				"outline": "0",
				"background": "none",
				"width": "100%",
				"font": "inherit",
				"letter-spacing": ".3em"
			})}"></div>`);
			if (_ctx.$page.props.errors?.code) _push(`<div style="${ssrRenderStyle({
				"color": "var(--bad)",
				"font-size": "13px"
			})}">${ssrInterpolate(_ctx.$page.props.errors.code)}</div>`);
			else _push(`<!---->`);
			_push(`<button class="btn primary" style="${ssrRenderStyle({ "height": "44px" })}">Verify</button></form></div></div></div>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/TwoFactor.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
// resources/js/Components/LulurMark.vue
var _sfc_main$8 = {
	__name: "LulurMark",
	__ssrInlineRender: true,
	props: { size: {
		type: Number,
		default: 20
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(mergeProps({
				width: __props.size,
				height: __props.size,
				viewBox: "0 0 48 48",
				"aria-hidden": "true",
				style: { "flex": "none" }
			}, _attrs))}><circle cx="18" cy="24" r="14" fill="var(--brand-soft)" stroke="var(--brand)" stroke-width="2.5"></circle><circle cx="30" cy="24" r="14" fill="var(--brand-soft)" stroke="var(--brand)" stroke-width="2.5"></circle><path d="M24 11.35A14 14 0 0 1 24 36.65A14 14 0 0 1 24 11.35Z" fill="var(--brand)"></path></svg>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LulurMark.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
// resources/js/Layouts/BookingLayout.vue
var _sfc_main$7 = {
	__name: "BookingLayout",
	__ssrInlineRender: true,
	props: {
		step: {
			type: Number,
			default: 1
		},
		brand: {
			type: Object,
			default: () => ({})
		},
		location: {
			type: Object,
			default: null
		}
	},
	setup(__props) {
		const props = __props;
		const steps = [
			{
				n: 1,
				label: "Service"
			},
			{
				n: 2,
				label: "Time"
			},
			{
				n: 3,
				label: "Details"
			}
		];
		const stateOf = (s) => s.n < props.step ? "done" : s.n === props.step ? "on" : "";
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "book" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			_push(`<header class="bhdr"><div class="w">`);
			_push(ssrRenderComponent(unref(Link), {
				class: "blogo",
				href: _ctx.route("booking.index")
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i${_scopeId}>${ssrInterpolate(__props.brand.logo_letter ?? "T")}</i>${ssrInterpolate(__props.brand.name ?? "Spa")}`);
					else return [createVNode("i", null, toDisplayString(__props.brand.logo_letter ?? "T"), 1), createTextVNode(toDisplayString(__props.brand.name ?? "Spa"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="steps" aria-label="Booking steps"><!--[-->`);
			ssrRenderList(steps, (s, i) => {
				_push(`<!--[-->`);
				if (i > 0) _push(`<span class="sepl"></span>`);
				else _push(`<!---->`);
				_push(`<span class="${ssrRenderClass(stateOf(s))}"><b>`);
				if (s.n < __props.step) _push(ssrRenderComponent(_sfc_main$29, {
					xs: "",
					name: "check"
				}, null, _parent));
				else _push(`<!--[-->${ssrInterpolate(s.n)}<!--]-->`);
				_push(`</b><span class="lab">${ssrInterpolate(s.label)}</span></span><!--]-->`);
			});
			_push(`<!--]--></nav><div class="r">`);
			if (__props.location && __props.location.name) {
				_push(`<button class="trigger inline" aria-haspopup="listbox">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "map-pin"
				}, null, _parent));
				_push(`${ssrInterpolate(__props.location.name)}`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "chevron-down"
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`<a class="btn ghost" href="#">My booking</a></div></div></header><main class="bw"><div>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
			ssrRenderSlot(_ctx.$slots, "aside", {}, null, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "mbar", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(_sfc_main$27, null, null, _parent));
			_push(`<footer class="bfoot">`);
			_push(ssrRenderComponent(_sfc_main$8, { size: 20 }, null, _parent));
			_push(`<span>Booking by <b>Lulur</b></span></footer></div>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/BookingLayout.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
// resources/js/Pages/Booking/Checkout.vue
var Checkout_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$6 });
var _sfc_main$6 = {
	__name: "Checkout",
	__ssrInlineRender: true,
	props: {
		booking: Object,
		form: Object,
		policy: Object,
		currency: String,
		payment_methods: Array,
		tenant: Object,
		location: Object
	},
	setup(__props) {
		const props = __props;
		const guestsCount = props.booking.guests;
		const guests = ref(Array.from({ length: guestsCount }, (_, i) => ({
			name: i === 0 ? "" : "",
			answers: {},
			pressure: "medium",
			allergies_note: "",
			avoid: "",
			note: "",
			signed: false,
			signature: ""
		})));
		const activeGuest = ref(0);
		const contact = ref({
			name: "",
			phone: "",
			email: "",
			marketing_consent: false
		});
		const method = ref(props.payment_methods[0].id);
		const agreePolicy = ref(false);
		const saving = ref(false);
		const paying = ref(false);
		const boolFields = computed(() => (props.form?.fields ?? []).filter((f) => f.type === "bool_seg"));
		computed(() => (props.form?.fields ?? []).filter((f) => f.type === "segment"));
		computed(() => (props.form?.fields ?? []).filter((f) => f.type === "textarea"));
		const warnNote = computed(() => {
			const f = boolFields.value.find((f) => /allerg/i.test(f.label));
			if (f && guests.value[activeGuest.value]?.answers[f.id]) return "Allergy noted: your therapist will adapt oils and products used during the treatment.";
			return null;
		});
		const total = props.booking.total;
		const depositDue = props.booking.deposit_due;
		async function saveDetails() {
			saving.value = true;
			const payload = {
				name: contact.value.name || guests.value[0]?.name || "",
				phone: contact.value.phone,
				email: contact.value.email,
				marketing_consent: contact.value.marketing_consent,
				guests: guests.value.map((g, i) => ({
					name: g.name || (guestsCount > 1 ? `Guest ${i + 1}` : contact.value.name),
					pressure: g.pressure,
					allergies_note: g.allergies_note || null,
					avoid: g.avoid || null,
					note: g.note || null,
					answers: g.answers,
					signature: g.signature || null
				}))
			};
			const ok = await new Promise((resolve) => {
				let accepted = true;
				router.post(`/book/${props.booking.code}/details`, payload, {
					preserveScroll: true,
					onError: () => {
						accepted = false;
					},
					onFinish: () => resolve(accepted)
				});
			});
			saving.value = false;
			return ok;
		}
		async function pay() {
			if (!agreePolicy.value) return;
			paying.value = true;
			if (!await saveDetails()) {
				paying.value = false;
				return;
			}
			const json = await (await fetch(`/book/${props.booking.code}/pay`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": document.querySelector("meta[name=csrf-token]")?.content ?? ""
				},
				body: JSON.stringify({ method: method.value })
			})).json();
			if (json.redirect) window.location = json.redirect;
			paying.value = false;
		}
		function initPad(el, gi) {
			if (!el || el.dataset.init) return;
			el.dataset.init = 1;
			const svg = el.querySelector("svg");
			const path = svg.querySelector("path");
			let drawing = false;
			let d = "";
			const pt = (e) => {
				const r = svg.getBoundingClientRect();
				const x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width * 300;
				const y = ((e.touches ? e.touches[0].clientY : e.clientY) - r.top) / r.height * 80;
				return `${x.toFixed(1)} ${y.toFixed(1)}`;
			};
			const start = (e) => {
				drawing = true;
				d = `M${pt(e)}`;
				e.preventDefault();
			};
			const move = (e) => {
				if (!drawing) return;
				d += ` L${pt(e)}`;
				path.setAttribute("d", d);
				e.preventDefault();
			};
			const stop = () => {
				if (!drawing) return;
				drawing = false;
				if (d.length > 20) {
					guests.value[gi].signature = d;
					guests.value[gi].signed = true;
				}
			};
			svg.addEventListener("pointerdown", start);
			svg.addEventListener("pointermove", move);
			window.addEventListener("pointerup", stop);
		}
		const holdMins = computed(() => Math.max(0, Math.ceil((props.booking.hold_seconds_left ?? 0) / 60)));
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$7, mergeProps({
				step: 3,
				brand: __props.tenant,
				location: __props.location
			}, _attrs), {
				aside: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<aside class="summary card" aria-label="Your booking"${_scopeId}><h2${_scopeId}>Your booking</h2><div class="it"${_scopeId}><img${ssrRenderAttr("src", __props.booking.service.photo)} alt=""${_scopeId}><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.booking.service.name)} · ${ssrInterpolate(__props.booking.service.duration)} min</b><small${_scopeId}>${ssrInterpolate(__props.booking.guests > 1 ? "2 guests" : "1 guest")}</small></span></div><!--[-->`);
						ssrRenderList(__props.booking.addons, (a, i) => {
							_push(`<div class="row"${_scopeId}><span${_scopeId}>${ssrInterpolate(a.name)}</span><span${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: a.price,
								currency: __props.currency
							}, null, _parent, _scopeId));
							_push(`</span></div>`);
						});
						_push(`<!--]--><div class="row"${_scopeId}><span${_scopeId}>When</span><span${_scopeId}>${ssrInterpolate(__props.booking.when)}–${ssrInterpolate(__props.booking.end)}</span></div><div class="row tot"${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--text)" })}"${_scopeId}>Total</span><span${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(total),
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(`</span></div><div class="dep"${_scopeId}><span${_scopeId}>Pay now (${ssrInterpolate(__props.policy.deposit_percent)}% deposit)</span><b${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(depositDue),
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(`</b><span class="muted small"${_scopeId}>Balance `);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(total) - unref(depositDue),
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(` at the spa · free cancellation until 24 h before</span></div><button class="btn primary block"${ssrIncludeBooleanAttr(!agreePolicy.value || paying.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(depositDue) ? `Pay deposit ` : "Confirm booking")}`);
						if (unref(depositDue)) _push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(depositDue),
							currency: __props.currency
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</button></aside>`);
					} else return [createVNode("aside", {
						class: "summary card",
						"aria-label": "Your booking"
					}, [
						createVNode("h2", null, "Your booking"),
						createVNode("div", { class: "it" }, [createVNode("img", {
							src: __props.booking.service.photo,
							alt: ""
						}, null, 8, ["src"]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(__props.booking.service.name) + " · " + toDisplayString(__props.booking.service.duration) + " min", 1), createVNode("small", null, toDisplayString(__props.booking.guests > 1 ? "2 guests" : "1 guest"), 1)])]),
						(openBlock(true), createBlock(Fragment, null, renderList(__props.booking.addons, (a, i) => {
							return openBlock(), createBlock("div", {
								key: i,
								class: "row"
							}, [createVNode("span", null, toDisplayString(a.name), 1), createVNode("span", null, [createVNode(_sfc_main$25, {
								amount: a.price,
								currency: __props.currency
							}, null, 8, ["amount", "currency"])])]);
						}), 128)),
						createVNode("div", { class: "row" }, [createVNode("span", null, "When"), createVNode("span", null, toDisplayString(__props.booking.when) + "–" + toDisplayString(__props.booking.end), 1)]),
						createVNode("div", { class: "row tot" }, [createVNode("span", { style: { "color": "var(--text)" } }, "Total"), createVNode("span", null, [createVNode(_sfc_main$25, {
							amount: unref(total),
							currency: __props.currency
						}, null, 8, ["amount", "currency"])])]),
						createVNode("div", { class: "dep" }, [
							createVNode("span", null, "Pay now (" + toDisplayString(__props.policy.deposit_percent) + "% deposit)", 1),
							createVNode("b", null, [createVNode(_sfc_main$25, {
								amount: unref(depositDue),
								currency: __props.currency
							}, null, 8, ["amount", "currency"])]),
							createVNode("span", { class: "muted small" }, [
								createTextVNode("Balance "),
								createVNode(_sfc_main$25, {
									amount: unref(total) - unref(depositDue),
									currency: __props.currency
								}, null, 8, ["amount", "currency"]),
								createTextVNode(" at the spa · free cancellation until 24 h before")
							])
						]),
						createVNode("button", {
							class: "btn primary block",
							disabled: !agreePolicy.value || paying.value,
							onClick: pay
						}, [createTextVNode(toDisplayString(unref(depositDue) ? `Pay deposit ` : "Confirm booking"), 1), unref(depositDue) ? (openBlock(), createBlock(_sfc_main$25, {
							key: 0,
							amount: unref(depositDue),
							currency: __props.currency
						}, null, 8, ["amount", "currency"])) : createCommentVNode("", true)], 8, ["disabled"])
					])];
				}),
				mbar: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mbar"${_scopeId}><span class="t"${_scopeId}><b${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(total),
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(`</b><small${_scopeId}>Deposit `);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(depositDue),
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(` today</small></span><button class="btn primary"${ssrIncludeBooleanAttr(!agreePolicy.value || paying.value) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(depositDue) ? "Pay deposit" : "Confirm")} `);
						if (unref(depositDue)) _push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(depositDue),
							currency: __props.currency
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</button></div>`);
					} else return [createVNode("div", { class: "mbar" }, [createVNode("span", { class: "t" }, [createVNode("b", null, [createVNode(_sfc_main$25, {
						amount: unref(total),
						currency: __props.currency
					}, null, 8, ["amount", "currency"])]), createVNode("small", null, [
						createTextVNode("Deposit "),
						createVNode(_sfc_main$25, {
							amount: unref(depositDue),
							currency: __props.currency
						}, null, 8, ["amount", "currency"]),
						createTextVNode(" today")
					])]), createVNode("button", {
						class: "btn primary",
						disabled: !agreePolicy.value || paying.value,
						onClick: pay
					}, [createTextVNode(toDisplayString(unref(depositDue) ? "Pay deposit" : "Confirm") + " ", 1), unref(depositDue) ? (openBlock(), createBlock(_sfc_main$25, {
						key: 0,
						amount: unref(depositDue),
						currency: __props.currency
					}, null, 8, ["amount", "currency"])) : createCommentVNode("", true)], 8, ["disabled"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div${_scopeId}><h1${_scopeId}>Almost done</h1><p class="lead"${_scopeId}>${ssrInterpolate(__props.booking.when)}–${ssrInterpolate(__props.booking.end)} · hold expires in ${ssrInterpolate(holdMins.value)} min</p><section class="sec card"${_scopeId}><h2${_scopeId}><span class="n"${_scopeId}>1</span>Contact</h2><div class="row2"${_scopeId}><div class="field"${_scopeId}><label${ssrRenderAttr("for", `gname-${activeGuest.value}`)}${_scopeId}>${ssrInterpolate(unref(guestsCount) > 1 ? "First guest" : "Full name")}</label><div class="${ssrRenderClass([{ focus: true }, "input"])}"${_scopeId}><input${ssrRenderAttr("id", `gname-${activeGuest.value}`)}${ssrRenderAttr("value", guests.value[activeGuest.value].name)} placeholder="Your name" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div></div>`);
						if (unref(guestsCount) > 1) {
							_push(`<div class="field"${_scopeId}><label${_scopeId}>Second guest</label><div class="input"${_scopeId}>`);
							if (unref(guestsCount) > 1 && activeGuest.value === 1) _push(`<input${ssrRenderAttr("value", guests.value[1].name)} placeholder="Second guest" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit"
							})}"${_scopeId}>`);
							else _push(`<span class="phd"${_scopeId}>${ssrInterpolate(guests.value[0].name || "First guest")}&#39;s partner</span>`);
							_push(`</div></div>`);
						} else _push(`<!---->`);
						_push(`<div class="field"${_scopeId}><label${_scopeId}>WhatsApp</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", contact.value.phone)} placeholder="+44 7700 900 418" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div><span class="hint"${_scopeId}>Confirmation and reminders arrive here</span></div><div class="field"${_scopeId}><label${_scopeId}>Email</label><div class="input"${_scopeId}><input${ssrRenderAttr("value", contact.value.email)} type="email" placeholder="you@example.com" style="${ssrRenderStyle({
							"border": "0",
							"outline": "0",
							"background": "none",
							"width": "100%",
							"font": "inherit"
						})}"${_scopeId}></div></div></div></section>`);
						if (__props.form) {
							_push(`<section class="sec card"${_scopeId}><h2${_scopeId}><span class="n"${_scopeId}>2</span>Health &amp; preferences <span class="muted small"${_scopeId}>${ssrInterpolate(__props.form.name)} v${ssrInterpolate(__props.form.version)}</span></h2>`);
							if (unref(guestsCount) > 1) {
								_push(`<div class="gtabs" role="tablist"${_scopeId}><!--[-->`);
								ssrRenderList(guests.value, (g, i) => {
									_push(`<button role="tab"${ssrRenderAttr("aria-selected", String(activeGuest.value === i))} class="${ssrRenderClass([{ on: activeGuest.value === i }, "chip"])}"${_scopeId}>${ssrInterpolate(g.name || (i === 0 ? "Guest 1" : "Guest 2"))} `);
									if (!g.signed) _push(ssrRenderComponent(_sfc_main$29, {
										xs: "",
										name: "circle-alert"
									}, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</button>`);
								});
								_push(`<!--]--></div>`);
							} else _push(`<!---->`);
							_push(`<div class="health"${_scopeId}><!--[-->`);
							ssrRenderList(boolFields.value, (f) => {
								_push(`<div class="q"${_scopeId}><span${_scopeId}>${ssrInterpolate(f.label)}</span><span class="seg" role="radiogroup"${ssrRenderAttr("aria-label", f.label)}${_scopeId}><button${ssrRenderAttr("aria-pressed", String(guests.value[activeGuest.value].answers[f.id] === false))}${_scopeId}>No</button><button${ssrRenderAttr("aria-pressed", String(guests.value[activeGuest.value].answers[f.id] === true))}${_scopeId}>Yes</button></span></div>`);
							});
							_push(`<!--]--></div><div class="field"${_scopeId}><label${_scopeId}>Pressure</label><div class="seg" role="radiogroup" aria-label="Pressure" style="${ssrRenderStyle({ "width": "max-content" })}"${_scopeId}><!--[-->`);
							ssrRenderList([
								"light",
								"medium",
								"firm"
							], (p) => {
								_push(`<button${ssrRenderAttr("aria-pressed", String(guests.value[activeGuest.value].pressure === p))}${_scopeId}>${ssrInterpolate(p[0].toUpperCase() + p.slice(1))}</button>`);
							});
							_push(`<!--]--></div></div><div class="field"${_scopeId}><label${_scopeId}>Anything we should know?</label><div class="input area"${_scopeId}><textarea rows="2" placeholder="Injuries, sensitivities, requests…" style="${ssrRenderStyle({
								"border": "0",
								"outline": "0",
								"background": "none",
								"width": "100%",
								"font": "inherit",
								"resize": "vertical"
							})}"${_scopeId}>${ssrInterpolate(guests.value[activeGuest.value].note)}</textarea></div></div>`);
							if (warnNote.value) {
								_push(`<div class="note warn"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "triangle-alert"
								}, null, _parent, _scopeId));
								_push(`<span${_scopeId}>${ssrInterpolate(warnNote.value)}</span></div>`);
							} else _push(`<!---->`);
							_push(`</section>`);
						} else _push(`<!---->`);
						_push(`<section class="sec card"${_scopeId}><h2${_scopeId}><span class="n"${_scopeId}>3</span>Consent</h2>`);
						if (__props.form) {
							_push(`<p style="${ssrRenderStyle({
								"font-size": "14px",
								"color": "var(--text-2)"
							})}"${_scopeId}> I confirm the information above is correct and agree to the ${ssrInterpolate(__props.form.name)} (v${ssrInterpolate(__props.form.version)}`);
							if (__props.form.updated) _push(`<!--[-->, updated ${ssrInterpolate(__props.form.updated)}<!--]-->`);
							else _push(`<!---->`);
							_push(`). </p>`);
						} else _push(`<!---->`);
						_push(`<div class="sig"${_scopeId}><svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true"${_scopeId}><path vector-effect="non-scaling-stroke" d="" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"${_scopeId}></path></svg>`);
						if (!guests.value[activeGuest.value].signature) _push(`<span class="sighint"${_scopeId}>Draw your signature here</span>`);
						else _push(`<!---->`);
						_push(`<span class="x"${_scopeId}>Sign here · ${ssrInterpolate(guests.value[activeGuest.value].name || contact.value.name || "your name")}</span></div>`);
						if (unref(guestsCount) > 1) _push(`<span class="muted small"${_scopeId}>The second guest signs the same form from the link in your confirmation, or at the spa.</span>`);
						else _push(`<!---->`);
						_push(`</section><section class="sec card"${_scopeId}><h2${_scopeId}><span class="n"${_scopeId}>4</span>Deposit</h2><ul class="policy"${_scopeId}><li${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "check"
						}, null, _parent, _scopeId));
						_push(`${ssrInterpolate(unref(depositDue) ? `Pay ${__props.policy.deposit_percent}% now, the rest at the spa` : "No deposit — your card on file covers no-shows per policy")}</li><li${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "check"
						}, null, _parent, _scopeId));
						_push(`Free cancellation or reschedule until ${ssrInterpolate(__props.policy.cancel_deadline)}</li><li${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "check"
						}, null, _parent, _scopeId));
						_push(`Later cancellations or no-shows ${ssrInterpolate(unref(depositDue) ? "keep the deposit" : "are charged " + __props.policy.no_show_fee_percent + "% from the saved card")}</li></ul><div role="radiogroup" aria-label="Payment method"${_scopeId}><!--[-->`);
						ssrRenderList(__props.payment_methods, (m) => {
							_push(`<div class="opt" role="radio"${ssrRenderAttr("aria-checked", String(method.value === m.id))}${_scopeId}><span class="rdo" aria-hidden="true"${_scopeId}><span class="o"${_scopeId}></span></span><span class="t"${_scopeId}><b${_scopeId}>${ssrInterpolate(m.label)}</b><small${_scopeId}>${ssrInterpolate(m.hint)}</small></span>`);
							if (unref(depositDue)) {
								_push(`<span class="r"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: unref(depositDue),
									currency: __props.currency
								}, null, _parent, _scopeId));
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div><span class="cbx" role="checkbox"${ssrRenderAttr("aria-checked", String(agreePolicy.value))} tabindex="0"${_scopeId}><span class="box"${_scopeId}>`);
						if (agreePolicy.value) _push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</span> I agree to the cancellation policy </span></section></div>`);
					} else return [createVNode("div", null, [
						createVNode("h1", null, "Almost done"),
						createVNode("p", { class: "lead" }, toDisplayString(__props.booking.when) + "–" + toDisplayString(__props.booking.end) + " · hold expires in " + toDisplayString(holdMins.value) + " min", 1),
						createVNode("section", { class: "sec card" }, [createVNode("h2", null, [createVNode("span", { class: "n" }, "1"), createTextVNode("Contact")]), createVNode("div", { class: "row2" }, [
							createVNode("div", { class: "field" }, [createVNode("label", { for: `gname-${activeGuest.value}` }, toDisplayString(unref(guestsCount) > 1 ? "First guest" : "Full name"), 9, ["for"]), createVNode("div", { class: ["input", { focus: true }] }, [withDirectives(createVNode("input", {
								id: `gname-${activeGuest.value}`,
								"onUpdate:modelValue": ($event) => guests.value[activeGuest.value].name = $event,
								placeholder: "Your name",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["id", "onUpdate:modelValue"]), [[vModelText, guests.value[activeGuest.value].name]])])]),
							unref(guestsCount) > 1 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "field"
							}, [createVNode("label", null, "Second guest"), createVNode("div", { class: "input" }, [unref(guestsCount) > 1 && activeGuest.value === 1 ? withDirectives((openBlock(), createBlock("input", {
								key: 0,
								"onUpdate:modelValue": ($event) => guests.value[1].name = $event,
								placeholder: "Second guest",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"])), [[vModelText, guests.value[1].name]]) : (openBlock(), createBlock("span", {
								key: 1,
								class: "phd"
							}, toDisplayString(guests.value[0].name || "First guest") + "'s partner", 1))])])) : createCommentVNode("", true),
							createVNode("div", { class: "field" }, [
								createVNode("label", null, "WhatsApp"),
								createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => contact.value.phone = $event,
									placeholder: "+44 7700 900 418",
									style: {
										"border": "0",
										"outline": "0",
										"background": "none",
										"width": "100%",
										"font": "inherit"
									}
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, contact.value.phone]])]),
								createVNode("span", { class: "hint" }, "Confirmation and reminders arrive here")
							]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Email"), createVNode("div", { class: "input" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => contact.value.email = $event,
								type: "email",
								placeholder: "you@example.com",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, contact.value.email]])])])
						])]),
						__props.form ? (openBlock(), createBlock("section", {
							key: 0,
							class: "sec card"
						}, [
							createVNode("h2", null, [
								createVNode("span", { class: "n" }, "2"),
								createTextVNode("Health & preferences "),
								createVNode("span", { class: "muted small" }, toDisplayString(__props.form.name) + " v" + toDisplayString(__props.form.version), 1)
							]),
							unref(guestsCount) > 1 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "gtabs",
								role: "tablist"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(guests.value, (g, i) => {
								return openBlock(), createBlock("button", {
									key: i,
									class: ["chip", { on: activeGuest.value === i }],
									role: "tab",
									"aria-selected": String(activeGuest.value === i),
									onClick: ($event) => activeGuest.value = i
								}, [createTextVNode(toDisplayString(g.name || (i === 0 ? "Guest 1" : "Guest 2")) + " ", 1), !g.signed ? (openBlock(), createBlock(_sfc_main$29, {
									key: 0,
									xs: "",
									name: "circle-alert"
								})) : createCommentVNode("", true)], 10, ["aria-selected", "onClick"]);
							}), 128))])) : createCommentVNode("", true),
							createVNode("div", { class: "health" }, [(openBlock(true), createBlock(Fragment, null, renderList(boolFields.value, (f) => {
								return openBlock(), createBlock("div", {
									key: f.id,
									class: "q"
								}, [createVNode("span", null, toDisplayString(f.label), 1), createVNode("span", {
									class: "seg",
									role: "radiogroup",
									"aria-label": f.label
								}, [createVNode("button", {
									"aria-pressed": String(guests.value[activeGuest.value].answers[f.id] === false),
									onClick: ($event) => guests.value[activeGuest.value].answers[f.id] = false
								}, "No", 8, ["aria-pressed", "onClick"]), createVNode("button", {
									"aria-pressed": String(guests.value[activeGuest.value].answers[f.id] === true),
									onClick: ($event) => guests.value[activeGuest.value].answers[f.id] = true
								}, "Yes", 8, ["aria-pressed", "onClick"])], 8, ["aria-label"])]);
							}), 128))]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Pressure"), createVNode("div", {
								class: "seg",
								role: "radiogroup",
								"aria-label": "Pressure",
								style: { "width": "max-content" }
							}, [(openBlock(), createBlock(Fragment, null, renderList([
								"light",
								"medium",
								"firm"
							], (p) => {
								return createVNode("button", {
									key: p,
									"aria-pressed": String(guests.value[activeGuest.value].pressure === p),
									onClick: ($event) => guests.value[activeGuest.value].pressure = p
								}, toDisplayString(p[0].toUpperCase() + p.slice(1)), 9, ["aria-pressed", "onClick"]);
							}), 64))])]),
							createVNode("div", { class: "field" }, [createVNode("label", null, "Anything we should know?"), createVNode("div", { class: "input area" }, [withDirectives(createVNode("textarea", {
								"onUpdate:modelValue": ($event) => guests.value[activeGuest.value].note = $event,
								rows: "2",
								placeholder: "Injuries, sensitivities, requests…",
								style: {
									"border": "0",
									"outline": "0",
									"background": "none",
									"width": "100%",
									"font": "inherit",
									"resize": "vertical"
								}
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, guests.value[activeGuest.value].note]])])]),
							warnNote.value ? (openBlock(), createBlock("div", {
								key: 1,
								class: "note warn"
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "triangle-alert"
							}), createVNode("span", null, toDisplayString(warnNote.value), 1)])) : createCommentVNode("", true)
						])) : createCommentVNode("", true),
						createVNode("section", { class: "sec card" }, [
							createVNode("h2", null, [createVNode("span", { class: "n" }, "3"), createTextVNode("Consent")]),
							__props.form ? (openBlock(), createBlock("p", {
								key: 0,
								style: {
									"font-size": "14px",
									"color": "var(--text-2)"
								}
							}, [
								createTextVNode(" I confirm the information above is correct and agree to the " + toDisplayString(__props.form.name) + " (v" + toDisplayString(__props.form.version), 1),
								__props.form.updated ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(", updated " + toDisplayString(__props.form.updated), 1)], 64)) : createCommentVNode("", true),
								createTextVNode("). ")
							])) : createCommentVNode("", true),
							(openBlock(), createBlock("div", {
								ref: (el) => initPad(el, activeGuest.value),
								class: "sig",
								key: activeGuest.value
							}, [
								(openBlock(), createBlock("svg", {
									viewBox: "0 0 300 80",
									preserveAspectRatio: "none",
									"aria-hidden": "true"
								}, [createVNode("path", {
									"vector-effect": "non-scaling-stroke",
									d: "",
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "2.4",
									"stroke-linecap": "round"
								})])),
								!guests.value[activeGuest.value].signature ? (openBlock(), createBlock("span", {
									key: 0,
									class: "sighint"
								}, "Draw your signature here")) : createCommentVNode("", true),
								createVNode("span", { class: "x" }, "Sign here · " + toDisplayString(guests.value[activeGuest.value].name || contact.value.name || "your name"), 1)
							])),
							unref(guestsCount) > 1 ? (openBlock(), createBlock("span", {
								key: 1,
								class: "muted small"
							}, "The second guest signs the same form from the link in your confirmation, or at the spa.")) : createCommentVNode("", true)
						]),
						createVNode("section", { class: "sec card" }, [
							createVNode("h2", null, [createVNode("span", { class: "n" }, "4"), createTextVNode("Deposit")]),
							createVNode("ul", { class: "policy" }, [
								createVNode("li", null, [createVNode(_sfc_main$29, {
									xs: "",
									name: "check"
								}), createTextVNode(toDisplayString(unref(depositDue) ? `Pay ${__props.policy.deposit_percent}% now, the rest at the spa` : "No deposit — your card on file covers no-shows per policy"), 1)]),
								createVNode("li", null, [createVNode(_sfc_main$29, {
									xs: "",
									name: "check"
								}), createTextVNode("Free cancellation or reschedule until " + toDisplayString(__props.policy.cancel_deadline), 1)]),
								createVNode("li", null, [createVNode(_sfc_main$29, {
									xs: "",
									name: "check"
								}), createTextVNode("Later cancellations or no-shows " + toDisplayString(unref(depositDue) ? "keep the deposit" : "are charged " + __props.policy.no_show_fee_percent + "% from the saved card"), 1)])
							]),
							createVNode("div", {
								role: "radiogroup",
								"aria-label": "Payment method"
							}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.payment_methods, (m) => {
								return openBlock(), createBlock("div", {
									key: m.id,
									class: "opt",
									role: "radio",
									"aria-checked": String(method.value === m.id),
									onClick: ($event) => method.value = m.id
								}, [
									createVNode("span", {
										class: "rdo",
										"aria-hidden": "true"
									}, [createVNode("span", { class: "o" })]),
									createVNode("span", { class: "t" }, [createVNode("b", null, toDisplayString(m.label), 1), createVNode("small", null, toDisplayString(m.hint), 1)]),
									unref(depositDue) ? (openBlock(), createBlock("span", {
										key: 0,
										class: "r"
									}, [createVNode(_sfc_main$25, {
										amount: unref(depositDue),
										currency: __props.currency
									}, null, 8, ["amount", "currency"])])) : createCommentVNode("", true)
								], 8, ["aria-checked", "onClick"]);
							}), 128))]),
							createVNode("span", {
								class: "cbx",
								role: "checkbox",
								"aria-checked": String(agreePolicy.value),
								tabindex: "0",
								onClick: ($event) => agreePolicy.value = !agreePolicy.value,
								onKeydown: withKeys(withModifiers(($event) => agreePolicy.value = !agreePolicy.value, ["prevent"]), ["space"])
							}, [createVNode("span", { class: "box" }, [agreePolicy.value ? (openBlock(), createBlock(_sfc_main$29, {
								key: 0,
								name: "check"
							})) : createCommentVNode("", true)]), createTextVNode(" I agree to the cancellation policy ")], 40, [
								"aria-checked",
								"onClick",
								"onKeydown"
							])
						])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Booking/Checkout.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
// resources/js/Pages/Booking/Manage.vue
var Manage_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$5 });
var _sfc_main$5 = {
	__name: "Manage",
	__ssrInlineRender: true,
	props: {
		welcome: Boolean,
		booking: Object,
		policy: Object,
		currency: String,
		brand: Object
	},
	setup(__props) {
		usePage();
		const token = new URLSearchParams(window.location.search).get("t");
		ref(null);
		const reschedule = ref(false);
		const days = ref([]);
		const slots = ref({});
		const chosen = ref(null);
		const cancelConfirm = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "book" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			_push(`<header class="bhdr"><div class="w"><a class="blogo" href="/"><i>${ssrInterpolate(__props.brand.logo_letter)}</i>${ssrInterpolate(__props.brand.name)}</a><div class="r"><a class="btn ghost" href="/">Book another visit</a></div></div></header><main class="bw" style="${ssrRenderStyle({ "grid-template-columns": "minmax(0,1fr)" })}"><div>`);
			if (__props.welcome && __props.booking.status === "confirmed") {
				_push(`<div class="card" style="${ssrRenderStyle({
					"padding": "24px",
					"display": "grid",
					"gap": "12px"
				})}"><span class="badge ok" style="${ssrRenderStyle({ "width": "max-content" })}">`);
				_push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent));
				_push(`Confirmed</span><h1 style="${ssrRenderStyle({ "font": "600 30px/1.15 var(--serif)" })}">You&#39;re booked${ssrInterpolate(__props.booking.guest_names[0] ? ", " + __props.booking.guest_names[0] : "")}!</h1><p class="muted">${ssrInterpolate(__props.booking.service.name)} · ${ssrInterpolate(__props.booking.when)}–${ssrInterpolate(__props.booking.end)} · ${ssrInterpolate(__props.booking.room)}</p><div style="${ssrRenderStyle({
					"display": "flex",
					"gap": "8px",
					"flex-wrap": "wrap"
				})}"><a class="btn"${ssrRenderAttr("href", `/b/${__props.booking.code}/ics?t=${unref(token)}`)}>`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "download"
				}, null, _parent));
				_push(`Add to calendar (.ics)</a><a class="btn" href="#manage">Manage booking</a></div><div class="note brand">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "info"
				}, null, _parent));
				_push(`<span>A WhatsApp confirmation is on its way, with reminders the day before and 2 hours before.`);
				if (__props.booking.unsigned_guests?.length) _push(`<!--[-->${ssrInterpolate(__props.booking.unsigned_guests.join(", "))} can sign the consent form below.<!--]-->`);
				else _push(`<!---->`);
				_push(`</span></div></div>`);
			} else _push(`<!---->`);
			if (__props.booking.status === "cancelled") {
				_push(`<div class="note warn" style="${ssrRenderStyle({ "margin-top": "16px" })}">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "triangle-alert"
				}, null, _parent));
				_push(`<span>This booking was cancelled. ${ssrInterpolate(__props.policy.deposit_kept ? "The deposit is kept per the cancellation policy." : "Your deposit will be refunded.")}</span></div>`);
			} else _push(`<!---->`);
			_push(`<section id="manage" class="sec card" style="${ssrRenderStyle({ "margin-top": "16px" })}"><h2 style="${ssrRenderStyle({
				"display": "flex",
				"align-items": "center",
				"gap": "8px"
			})}">${ssrInterpolate(__props.booking.service.name)} · ${ssrInterpolate(__props.booking.service.duration)} min <span class="badge" style="${ssrRenderStyle({ "margin-left": "auto" })}">${ssrInterpolate(__props.booking.status_label)}</span></h2><div style="${ssrRenderStyle({
				"display": "grid",
				"grid-template-columns": "130px 1fr",
				"gap": "10px",
				"font-size": "14px"
			})}"><span class="muted">When</span><b>${ssrInterpolate(__props.booking.when)}–${ssrInterpolate(__props.booking.end)}</b><span class="muted">Room</span><b>${ssrInterpolate(__props.booking.room || "—")}</b><span class="muted">Therapists</span><b>${ssrInterpolate(__props.booking.therapists.join(" · ") || "Any")}</b><span class="muted">Guests</span><b>${ssrInterpolate(__props.booking.guest_names.join(" & ") || "—")}</b><span class="muted">Total</span><b>`);
			_push(ssrRenderComponent(_sfc_main$25, {
				amount: __props.booking.total,
				currency: __props.currency
			}, null, _parent));
			_push(`</b>`);
			if (__props.booking.deposit_paid) {
				_push(`<!--[--><span class="muted">Deposit paid</span><b style="${ssrRenderStyle({ "color": "var(--ok)" })}">`);
				_push(ssrRenderComponent(_sfc_main$25, {
					amount: -__props.booking.deposit_paid,
					currency: __props.currency
				}, null, _parent));
				_push(`</b><!--]-->`);
			} else _push(`<!---->`);
			_push(`<span class="muted">${ssrInterpolate(__props.booking.deposit_paid ? "Balance at the spa" : "Paid today")}</span><b>`);
			_push(ssrRenderComponent(_sfc_main$25, {
				amount: __props.booking.deposit_paid ? __props.booking.balance : __props.booking.total,
				currency: __props.currency
			}, null, _parent));
			_push(`</b>`);
			if (__props.booking.package_left !== null && __props.booking.package_left !== void 0) _push(`<!--[--><span class="muted">Package</span><b>${ssrInterpolate(__props.booking.package_left)} sessions left</b><!--]-->`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (__props.booking.form_missing) {
				_push(`<div class="note warn">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "file-warning"
				}, null, _parent));
				_push(`<span>Consent form missing — please sign below before your visit (takes 30 seconds).</span></div>`);
			} else _push(`<!---->`);
			if (["held", "confirmed"].includes(__props.booking.status)) {
				_push(`<div style="${ssrRenderStyle({
					"display": "flex",
					"gap": "8px",
					"flex-wrap": "wrap",
					"margin-top": "8px"
				})}"><button class="btn">`);
				_push(ssrRenderComponent(_sfc_main$29, {
					sm: "",
					name: "calendar-clock"
				}, null, _parent));
				_push(`Reschedule</button>`);
				if (!cancelConfirm.value) {
					_push(`<button class="btn">`);
					_push(ssrRenderComponent(_sfc_main$29, {
						sm: "",
						name: "x"
					}, null, _parent));
					_push(`Cancel booking</button>`);
				} else _push(`<!--[--><span class="note warn" style="${ssrRenderStyle({ "padding": "8px 12px" })}">${ssrInterpolate(__props.policy.inside_window ? `Free cancellation until ${__props.policy.cancel_deadline}. Deposit refunded.` : `You are past the free window (${__props.policy.cancel_deadline}) — the deposit is kept.`)}</span><button class="btn">Keep booking</button><button class="btn primary">Confirm cancellation</button><!--]-->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</section>`);
			if (reschedule.value) {
				_push(`<section class="sec card"><h2>Pick a new time</h2><div class="days" role="radiogroup"><!--[-->`);
				ssrRenderList(days.value, (d) => {
					_push(`<span class="day" role="radio" aria-checked="false"${ssrRenderAttr("aria-disabled", String(d.disabled))}>${ssrInterpolate(d.dow)}<b>${ssrInterpolate(d.num)}</b><i class="${ssrRenderClass(d.level)}"></i></span>`);
				});
				_push(`<!--]--></div><!--[-->`);
				ssrRenderList(slots.value, (list, part) => {
					_push(`<!--[-->`);
					if (list.length) _push(`<h3 class="muted small strong" style="${ssrRenderStyle({ "margin-top": "14px" })}">${ssrInterpolate(part[0].toUpperCase() + part.slice(1))}</h3>`);
					else _push(`<!---->`);
					if (list.length) {
						_push(`<div class="sg"><!--[-->`);
						ssrRenderList(list, (t) => {
							_push(`<button class="sl">${ssrInterpolate(t)}</button>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--><div style="${ssrRenderStyle({
					"display": "flex",
					"gap": "8px",
					"margin-top": "14px"
				})}"><button class="btn">Back</button><button class="btn primary"${ssrIncludeBooleanAttr(!chosen.value) ? " disabled" : ""}>Move booking</button></div></section>`);
			} else _push(`<!---->`);
			if (__props.booking.unsigned_guests?.length) {
				_push(`<section class="sec card"><h2>Sign the consent form</h2><p class="muted small">For ${ssrInterpolate(__props.booking.unsigned_guests.join(" and "))} — draw your signature below.</p><!--[-->`);
				ssrRenderList(__props.booking.unsigned_guests, (name) => {
					_push(`<div style="${ssrRenderStyle({
						"display": "grid",
						"gap": "8px",
						"margin-top": "10px"
					})}"><div class="sig"><svg viewBox="0 0 300 80"><path d="" fill="none" stroke="currentColor" stroke-width="2.4"></path></svg><span class="x">${ssrInterpolate(name)}</span></div><button class="btn sm" style="${ssrRenderStyle({ "width": "max-content" })}">Submit signature for ${ssrInterpolate(name)}</button></div>`);
				});
				_push(`<!--]--></section>`);
			} else _push(`<!---->`);
			_push(`<p class="synthetic">Manage link is signed and expires with the visit. Fictional demo data.</p></div></main></div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Booking/Manage.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
// resources/js/Pages/Booking/Services.vue
var Services_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$4 });
var _sfc_main$4 = {
	__name: "Services",
	__ssrInlineRender: true,
	props: {
		tenant: Object,
		services: Array,
		location: Object
	},
	setup(__props) {
		const props = __props;
		const cat = ref("all");
		const forTwo = ref(false);
		const inParty = computed(() => props.services.filter((s) => forTwo.value ? s.for_two : !s.for_two));
		const cats = computed(() => {
			return [{
				value: "all",
				label: "All"
			}, ...[...new Set(inParty.value.map((s) => s.category).filter(Boolean))].map((c) => ({
				value: c,
				label: c
			}))];
		});
		const visible = computed(() => inParty.value.filter((s) => cat.value === "all" || s.category === cat.value));
		watch(forTwo, () => {
			cat.value = "all";
			selected.value = null;
			variant.value = null;
			addons.value = [];
		});
		const catsEl = ref(null);
		const moreRight = ref(false);
		function measure() {
			const el = catsEl.value;
			moreRight.value = !!el && el.scrollWidth - el.clientWidth - el.scrollLeft > 4;
		}
		function pickCat(v, e) {
			cat.value = v;
			e?.currentTarget?.scrollIntoView({
				inline: "center",
				block: "nearest",
				behavior: "smooth"
			});
		}
		onMounted(() => {
			measure();
			window.addEventListener("resize", measure);
		});
		onBeforeUnmount(() => window.removeEventListener("resize", measure));
		watch(cats, () => nextTick(measure));
		const selected = ref(null);
		const variant = ref(null);
		const addons = ref([]);
		const guests = computed(() => selected.value?.for_two ? 2 : 1);
		function pick(service) {
			selected.value = service;
			variant.value = service.variants[0];
			addons.value = [];
		}
		function toggleAddon(a) {
			const i = addons.value.findIndex((x) => x.id === a.id);
			i >= 0 ? addons.value.splice(i, 1) : addons.value.push(a);
		}
		const addonTotal = computed(() => addons.value.reduce((n, a) => n + a.price, 0));
		const linePrice = computed(() => {
			if (!selected.value || !variant.value) return 0;
			return (selected.value.price_basis === "per_booking" ? variant.value.price : variant.value.price * guests.value) + addonTotal.value;
		});
		const depositDue = computed(() => Math.round(linePrice.value * (props.tenant.deposit_percent ?? 30) / 100));
		const canContinue = computed(() => selected.value && variant.value);
		function continueToTime() {
			sessionStorage.setItem("lulur.flow", JSON.stringify({
				service: {
					name: selected.value.name,
					photo: selected.value.photo
				},
				variant_id: variant.value.id,
				duration: variant.value.duration,
				addon_ids: addons.value.map((a) => a.id),
				guests: guests.value,
				for_two: selected.value.for_two,
				total: linePrice.value
			}));
			router.get("/time");
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$7, mergeProps({
				step: 1,
				brand: __props.tenant,
				location: __props.location
			}, _attrs), {
				aside: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (canContinue.value) {
							_push(`<aside class="summary card" aria-label="Your booking"${_scopeId}><h2${_scopeId}>Your booking</h2><div class="it"${_scopeId}><img${ssrRenderAttr("src", selected.value.photo)} alt=""${_scopeId}><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(selected.value.name)} · ${ssrInterpolate(variant.value.duration)} min</b><small${_scopeId}>${ssrInterpolate(guests.value > 1 ? "2 guests" : "1 guest")}${ssrInterpolate(selected.value.for_two ? " · Couples suite" : "")}</small></span></div><div class="row"${_scopeId}><span${_scopeId}>${ssrInterpolate(selected.value.name)}${ssrInterpolate(guests.value > 1 ? ` × ${guests.value}` : "")}</span><span${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: linePrice.value - addonTotal.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(`</span></div>`);
							if (addonTotal.value) {
								_push(`<div class="row"${_scopeId}><span${_scopeId}>Add-ons</span><span${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: addonTotal.value,
									currency: __props.tenant.currency
								}, null, _parent, _scopeId));
								_push(`</span></div>`);
							} else _push(`<!---->`);
							_push(`<div class="row tot"${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--text)" })}"${_scopeId}>Total</span><span${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: linePrice.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(`</span></div>`);
							if (depositDue.value) {
								_push(`<div class="dep"${_scopeId}><span${_scopeId}>Pay now (${ssrInterpolate(__props.tenant.deposit_percent)}% deposit)</span><b${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: depositDue.value,
									currency: __props.tenant.currency
								}, null, _parent, _scopeId));
								_push(`</b><span class="muted small"${_scopeId}>Balance `);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: linePrice.value - depositDue.value,
									currency: __props.tenant.currency
								}, null, _parent, _scopeId));
								_push(` at the spa · free cancellation until 24 h before</span></div>`);
							} else _push(`<!---->`);
							_push(`<button class="btn primary block"${_scopeId}>Choose a time</button></aside>`);
						} else _push(`<!---->`);
					} else return [canContinue.value ? (openBlock(), createBlock("aside", {
						key: 0,
						class: "summary card",
						"aria-label": "Your booking"
					}, [
						createVNode("h2", null, "Your booking"),
						createVNode("div", { class: "it" }, [createVNode("img", {
							src: selected.value.photo,
							alt: ""
						}, null, 8, ["src"]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(selected.value.name) + " · " + toDisplayString(variant.value.duration) + " min", 1), createVNode("small", null, toDisplayString(guests.value > 1 ? "2 guests" : "1 guest") + toDisplayString(selected.value.for_two ? " · Couples suite" : ""), 1)])]),
						createVNode("div", { class: "row" }, [createVNode("span", null, toDisplayString(selected.value.name) + toDisplayString(guests.value > 1 ? ` × ${guests.value}` : ""), 1), createVNode("span", null, [createVNode(_sfc_main$25, {
							amount: linePrice.value - addonTotal.value,
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"])])]),
						addonTotal.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "row"
						}, [createVNode("span", null, "Add-ons"), createVNode("span", null, [createVNode(_sfc_main$25, {
							amount: addonTotal.value,
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"])])])) : createCommentVNode("", true),
						createVNode("div", { class: "row tot" }, [createVNode("span", { style: { "color": "var(--text)" } }, "Total"), createVNode("span", null, [createVNode(_sfc_main$25, {
							amount: linePrice.value,
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"])])]),
						depositDue.value ? (openBlock(), createBlock("div", {
							key: 1,
							class: "dep"
						}, [
							createVNode("span", null, "Pay now (" + toDisplayString(__props.tenant.deposit_percent) + "% deposit)", 1),
							createVNode("b", null, [createVNode(_sfc_main$25, {
								amount: depositDue.value,
								currency: __props.tenant.currency
							}, null, 8, ["amount", "currency"])]),
							createVNode("span", { class: "muted small" }, [
								createTextVNode("Balance "),
								createVNode(_sfc_main$25, {
									amount: linePrice.value - depositDue.value,
									currency: __props.tenant.currency
								}, null, 8, ["amount", "currency"]),
								createTextVNode(" at the spa · free cancellation until 24 h before")
							])
						])) : createCommentVNode("", true),
						createVNode("button", {
							class: "btn primary block",
							onClick: continueToTime
						}, "Choose a time")
					])) : createCommentVNode("", true)];
				}),
				mbar: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (canContinue.value) {
							_push(`<div class="mbar"${_scopeId}><span class="t"${_scopeId}><b${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: linePrice.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(`</b>`);
							if (depositDue.value) {
								_push(`<small${_scopeId}>Deposit `);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: depositDue.value,
									currency: __props.tenant.currency
								}, null, _parent, _scopeId));
								_push(` today</small>`);
							} else _push(`<!---->`);
							_push(`</span><button class="btn primary"${_scopeId}>Choose a time</button></div>`);
						} else _push(`<!---->`);
					} else return [canContinue.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "mbar"
					}, [createVNode("span", { class: "t" }, [createVNode("b", null, [createVNode(_sfc_main$25, {
						amount: linePrice.value,
						currency: __props.tenant.currency
					}, null, 8, ["amount", "currency"])]), depositDue.value ? (openBlock(), createBlock("small", { key: 0 }, [
						createTextVNode("Deposit "),
						createVNode(_sfc_main$25, {
							amount: depositDue.value,
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"]),
						createTextVNode(" today")
					])) : createCommentVNode("", true)]), createVNode("button", {
						class: "btn primary",
						onClick: continueToTime
					}, "Choose a time")])) : createCommentVNode("", true)];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div${_scopeId}>`);
						if (__props.tenant.hero) {
							_push(`<div class="hero"${_scopeId}><img${ssrRenderAttr("src", __props.tenant.hero)} alt="Treatment room with a massage bed and soft curtains"${_scopeId}><div class="tx"${_scopeId}><h1${_scopeId}>${ssrInterpolate(__props.tenant.tagline)}</h1><div class="m"${_scopeId}>`);
							if (__props.tenant.rating) {
								_push(`<span class="stars"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "star"
								}, null, _parent, _scopeId));
								_push(`</span>`);
							} else _push(`<!---->`);
							if (__props.tenant.rating) _push(`<span${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.tenant.rating)}</b> · ${ssrInterpolate(__props.tenant.reviews)} reviews</span>`);
							else _push(`<!---->`);
							if (__props.tenant.open_today) {
								_push(`<span${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "clock"
								}, null, _parent, _scopeId));
								_push(`Open today ${ssrInterpolate(__props.tenant.open_today)}</span>`);
							} else _push(`<!---->`);
							if (__props.tenant.address) {
								_push(`<span${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "map-pin"
								}, null, _parent, _scopeId));
								_push(`${ssrInterpolate(__props.tenant.address)}</span>`);
							} else _push(`<!---->`);
							_push(`</div></div></div>`);
						} else _push(`<!---->`);
						_push(`<h1 style="${ssrRenderStyle({ "font-size": "24px" })}"${_scopeId}>Choose a treatment</h1><div class="party" role="group" aria-label="Who is coming?"${_scopeId}><button type="button"${ssrRenderAttr("aria-pressed", String(!forTwo.value))}${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "user-round"
						}, null, _parent, _scopeId));
						_push(`Just me</button><button type="button"${ssrRenderAttr("aria-pressed", String(forTwo.value))}${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "users"
						}, null, _parent, _scopeId));
						_push(`For two</button></div>`);
						if (cats.value.length > 2) {
							_push(`<div class="catbar"${_scopeId}><div class="${ssrRenderClass([{ fade: moreRight.value }, "cats"])}" role="radiogroup" aria-label="Category"${_scopeId}><!--[-->`);
							ssrRenderList(cats.value, (c) => {
								_push(`<button type="button" class="chip" role="radio"${ssrRenderAttr("aria-checked", String(cat.value === c.value))}${_scopeId}>${ssrInterpolate(c.label)}</button>`);
							});
							_push(`<!--]--></div></div>`);
						} else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList(visible.value, (s) => {
							_push(`<article class="${ssrRenderClass([{ sel: selected.value?.id === s.id }, "svc card"])}"${_scopeId}><img${ssrRenderAttr("src", s.photo)} alt=""${_scopeId}><div${_scopeId}><div class="top2"${_scopeId}><h2 class="sn"${_scopeId}>${ssrInterpolate(s.name)}</h2>`);
							if (s.for_two) {
								_push(`<span class="badge brand"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "users"
								}, null, _parent, _scopeId));
								_push(`For 2</span>`);
							} else _push(`<!---->`);
							if (s.badge === "signature") {
								_push(`<span class="badge gold"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "star"
								}, null, _parent, _scopeId));
								_push(`Signature</span>`);
							} else _push(`<!---->`);
							_push(`</div><p${_scopeId}>${ssrInterpolate(s.description)}</p><div class="row" role="radiogroup"${ssrRenderAttr("aria-label", `${s.name} duration`)}${_scopeId}><!--[-->`);
							ssrRenderList(s.variants, (v) => {
								_push(`<span class="chip" role="radio"${ssrRenderAttr("aria-checked", String(selected.value?.id === s.id && variant.value?.id === v.id))}${_scopeId}>${ssrInterpolate(v.duration)} min</span>`);
							});
							_push(`<!--]--><span class="r"${_scopeId}><span class="price"${_scopeId}>`);
							if (s.price_basis === "per_booking") {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(_sfc_main$25, {
									amount: selected.value?.id === s.id ? variant.value.price : s.variants[0].price,
									currency: __props.tenant.currency
								}, null, _parent, _scopeId));
								_push(` for two <!--]-->`);
							} else _push(ssrRenderComponent(_sfc_main$25, {
								amount: selected.value?.id === s.id ? variant.value.price : s.variants[0].price,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(`</span>`);
							if (selected.value?.id === s.id) {
								_push(`<span class="badge ok"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent, _scopeId));
								_push(`Added</span>`);
							} else {
								_push(`<button class="btn sm"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "plus"
								}, null, _parent, _scopeId));
								_push(`Add</button>`);
							}
							_push(`</span></div>`);
							if (selected.value?.id === s.id && s.addons.length) {
								_push(`<div class="addons"${_scopeId}><span class="muted small strong"${_scopeId}>Add-ons for this booking</span><!--[-->`);
								ssrRenderList(s.addons, (a) => {
									_push(`<span class="a"${_scopeId}><span class="cbx" role="checkbox"${ssrRenderAttr("aria-checked", String(addons.value.some((x) => x.id === a.id)))}${_scopeId}><span class="box"${_scopeId}>`);
									if (addons.value.some((x) => x.id === a.id)) _push(ssrRenderComponent(_sfc_main$29, { name: "check" }, null, _parent, _scopeId));
									else _push(`<!---->`);
									_push(`</span> ${ssrInterpolate(a.name)}`);
									if (a.duration) _push(`<!--[-->, ${ssrInterpolate(a.duration)} min<!--]-->`);
									else _push(`<!---->`);
									_push(`</span><span class="p num"${_scopeId}>+`);
									_push(ssrRenderComponent(_sfc_main$25, {
										amount: a.price,
										currency: __props.tenant.currency
									}, null, _parent, _scopeId));
									_push(`</span></span>`);
								});
								_push(`<!--]--></div>`);
							} else _push(`<!---->`);
							_push(`</div></article>`);
						});
						_push(`<!--]--><p class="synthetic"${_scopeId}>Fictional spa and synthetic data · photos: see IMAGES.md</p></div>`);
					} else return [createVNode("div", null, [
						__props.tenant.hero ? (openBlock(), createBlock("div", {
							key: 0,
							class: "hero"
						}, [createVNode("img", {
							src: __props.tenant.hero,
							alt: "Treatment room with a massage bed and soft curtains"
						}, null, 8, ["src"]), createVNode("div", { class: "tx" }, [createVNode("h1", null, toDisplayString(__props.tenant.tagline), 1), createVNode("div", { class: "m" }, [
							__props.tenant.rating ? (openBlock(), createBlock("span", {
								key: 0,
								class: "stars"
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "star"
							})])) : createCommentVNode("", true),
							__props.tenant.rating ? (openBlock(), createBlock("span", { key: 1 }, [createVNode("b", null, toDisplayString(__props.tenant.rating), 1), createTextVNode(" · " + toDisplayString(__props.tenant.reviews) + " reviews", 1)])) : createCommentVNode("", true),
							__props.tenant.open_today ? (openBlock(), createBlock("span", { key: 2 }, [createVNode(_sfc_main$29, {
								xs: "",
								name: "clock"
							}), createTextVNode("Open today " + toDisplayString(__props.tenant.open_today), 1)])) : createCommentVNode("", true),
							__props.tenant.address ? (openBlock(), createBlock("span", { key: 3 }, [createVNode(_sfc_main$29, {
								xs: "",
								name: "map-pin"
							}), createTextVNode(toDisplayString(__props.tenant.address), 1)])) : createCommentVNode("", true)
						])])])) : createCommentVNode("", true),
						createVNode("h1", { style: { "font-size": "24px" } }, "Choose a treatment"),
						createVNode("div", {
							class: "party",
							role: "group",
							"aria-label": "Who is coming?"
						}, [createVNode("button", {
							type: "button",
							"aria-pressed": String(!forTwo.value),
							onClick: ($event) => forTwo.value = false
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "user-round"
						}), createTextVNode("Just me")], 8, ["aria-pressed", "onClick"]), createVNode("button", {
							type: "button",
							"aria-pressed": String(forTwo.value),
							onClick: ($event) => forTwo.value = true
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "users"
						}), createTextVNode("For two")], 8, ["aria-pressed", "onClick"])]),
						cats.value.length > 2 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "catbar"
						}, [createVNode("div", {
							ref_key: "catsEl",
							ref: catsEl,
							class: ["cats", { fade: moreRight.value }],
							role: "radiogroup",
							"aria-label": "Category",
							onScrollPassive: measure
						}, [(openBlock(true), createBlock(Fragment, null, renderList(cats.value, (c) => {
							return openBlock(), createBlock("button", {
								key: c.value,
								type: "button",
								class: "chip",
								role: "radio",
								"aria-checked": String(cat.value === c.value),
								onClick: ($event) => pickCat(c.value, $event)
							}, toDisplayString(c.label), 9, ["aria-checked", "onClick"]);
						}), 128))], 34)])) : createCommentVNode("", true),
						(openBlock(true), createBlock(Fragment, null, renderList(visible.value, (s) => {
							return openBlock(), createBlock("article", {
								key: s.id,
								class: ["svc card", { sel: selected.value?.id === s.id }]
							}, [createVNode("img", {
								src: s.photo,
								alt: ""
							}, null, 8, ["src"]), createVNode("div", null, [
								createVNode("div", { class: "top2" }, [
									createVNode("h2", { class: "sn" }, toDisplayString(s.name), 1),
									s.for_two ? (openBlock(), createBlock("span", {
										key: 0,
										class: "badge brand"
									}, [createVNode(_sfc_main$29, {
										xs: "",
										name: "users"
									}), createTextVNode("For 2")])) : createCommentVNode("", true),
									s.badge === "signature" ? (openBlock(), createBlock("span", {
										key: 1,
										class: "badge gold"
									}, [createVNode(_sfc_main$29, {
										xs: "",
										name: "star"
									}), createTextVNode("Signature")])) : createCommentVNode("", true)
								]),
								createVNode("p", null, toDisplayString(s.description), 1),
								createVNode("div", {
									class: "row",
									role: "radiogroup",
									"aria-label": `${s.name} duration`
								}, [(openBlock(true), createBlock(Fragment, null, renderList(s.variants, (v) => {
									return openBlock(), createBlock("span", {
										key: v.id,
										class: "chip",
										role: "radio",
										"aria-checked": String(selected.value?.id === s.id && variant.value?.id === v.id),
										onClick: ($event) => {
											pick(s);
											variant.value = v;
										}
									}, toDisplayString(v.duration) + " min", 9, ["aria-checked", "onClick"]);
								}), 128)), createVNode("span", { class: "r" }, [createVNode("span", { class: "price" }, [s.price_basis === "per_booking" ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode(_sfc_main$25, {
									amount: selected.value?.id === s.id ? variant.value.price : s.variants[0].price,
									currency: __props.tenant.currency
								}, null, 8, ["amount", "currency"]), createTextVNode(" for two ")], 64)) : (openBlock(), createBlock(_sfc_main$25, {
									key: 1,
									amount: selected.value?.id === s.id ? variant.value.price : s.variants[0].price,
									currency: __props.tenant.currency
								}, null, 8, ["amount", "currency"]))]), selected.value?.id === s.id ? (openBlock(), createBlock("span", {
									key: 0,
									class: "badge ok"
								}, [createVNode(_sfc_main$29, { name: "check" }), createTextVNode("Added")])) : (openBlock(), createBlock("button", {
									key: 1,
									class: "btn sm",
									onClick: ($event) => pick(s)
								}, [createVNode(_sfc_main$29, {
									xs: "",
									name: "plus"
								}), createTextVNode("Add")], 8, ["onClick"]))])], 8, ["aria-label"]),
								selected.value?.id === s.id && s.addons.length ? (openBlock(), createBlock("div", {
									key: 0,
									class: "addons"
								}, [createVNode("span", { class: "muted small strong" }, "Add-ons for this booking"), (openBlock(true), createBlock(Fragment, null, renderList(s.addons, (a) => {
									return openBlock(), createBlock("span", {
										key: a.id,
										class: "a"
									}, [createVNode("span", {
										class: "cbx",
										role: "checkbox",
										"aria-checked": String(addons.value.some((x) => x.id === a.id)),
										onClick: ($event) => toggleAddon(a)
									}, [
										createVNode("span", { class: "box" }, [addons.value.some((x) => x.id === a.id) ? (openBlock(), createBlock(_sfc_main$29, {
											key: 0,
											name: "check"
										})) : createCommentVNode("", true)]),
										createTextVNode(" " + toDisplayString(a.name), 1),
										a.duration ? (openBlock(), createBlock(Fragment, { key: 0 }, [createTextVNode(", " + toDisplayString(a.duration) + " min", 1)], 64)) : createCommentVNode("", true)
									], 8, ["aria-checked", "onClick"]), createVNode("span", { class: "p num" }, [createTextVNode("+"), createVNode(_sfc_main$25, {
										amount: a.price,
										currency: __props.tenant.currency
									}, null, 8, ["amount", "currency"])])]);
								}), 128))])) : createCommentVNode("", true)
							])], 2);
						}), 128)),
						createVNode("p", { class: "synthetic" }, "Fictional spa and synthetic data · photos: see IMAGES.md")
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Booking/Services.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
// resources/js/Pages/Booking/Time.vue
var Time_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$3 });
var _sfc_main$3 = {
	__name: "Time",
	__ssrInlineRender: true,
	props: {
		tenant: Object,
		location: Object,
		today: String
	},
	setup(__props) {
		const props = __props;
		const flow = JSON.parse(sessionStorage.getItem("lulur.flow") || "null");
		const todayStr = props.today;
		const dayNames = [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
		];
		const therapistMode = ref("any");
		const gender = ref(null);
		const days = ref([]);
		const activeDate = ref(todayStr);
		const slots = ref({
			morning: [],
			afternoon: [],
			evening: []
		});
		const chosen = ref(null);
		const loading = ref(false);
		const dayOpen = ref(true);
		async function loadSummary() {
			const q = new URLSearchParams({
				service_variant: flow.variant_id,
				from: todayStr
			});
			if (gender.value) q.set("gender", gender.value);
			const json = await (await fetch(`/availability/summary?${q}`)).json();
			days.value = json.days.map((d) => {
				const date = /* @__PURE__ */ new Date(d.date + "T00:00:00");
				return {
					date: d.date,
					dow: dayNames[date.getDay()],
					num: date.getDate(),
					level: d.count === 0 ? "none" : d.count <= 4 ? "low" : "",
					disabled: d.count === 0
				};
			});
			if (!days.value.some((d) => d.date === activeDate.value && !d.disabled)) {
				const firstOpen = days.value.find((d) => !d.disabled);
				if (firstOpen) activeDate.value = firstOpen.date;
			}
		}
		async function loadSlots() {
			loading.value = true;
			const q = new URLSearchParams({
				service_variant: flow.variant_id,
				date: activeDate.value
			});
			if (gender.value) q.set("gender", gender.value);
			const json = await (await fetch(`/availability?${q}`)).json();
			slots.value = json.slots;
			dayOpen.value = json.open;
			chosen.value = null;
			loading.value = false;
		}
		watch(activeDate, loadSlots);
		watch(gender, () => {
			loadSummary();
			loadSlots();
		});
		loadSummary();
		loadSlots();
		const activeDateFormatted = computed(() => {
			if (!chosen.value) return "Pick a time";
			const d = /* @__PURE__ */ new Date(activeDate.value + "T00:00:00");
			return `${d.toLocaleDateString("en-US", { weekday: "short" })} ${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })} · ${chosen.value}`;
		});
		const monthLabel = computed(() => {
			return (/* @__PURE__ */ new Date(activeDate.value + "T00:00:00")).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric"
			});
		});
		const partLabels = {
			morning: ["sunrise", "Morning"],
			afternoon: ["sun", "Afternoon"],
			evening: ["sunset", "Evening"]
		};
		const hold = ref(null);
		const holding = ref(false);
		async function continueToCheckout() {
			if (!chosen.value) return;
			holding.value = true;
			const body = {
				service_variant: flow.variant_id,
				addons: flow.addon_ids,
				date: activeDate.value,
				start: chosen.value,
				previous: hold.value?.code
			};
			if (gender.value) body.gender = gender.value;
			const res = await fetch("/holds", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": document.querySelector("meta[name=csrf-token]")?.content ?? ""
				},
				body: JSON.stringify(body)
			});
			holding.value = false;
			if (res.status === 409) {
				const j = await res.json();
				alert(j.message);
				loadSlots();
				return;
			}
			const json = await res.json();
			hold.value = json;
			sessionStorage.setItem("lulur.hold", JSON.stringify({
				code: json.code,
				date: activeDate.value,
				start: chosen.value
			}));
			router.get(json.redirect);
		}
		const total = flow?.total ?? 0;
		const depositDue = computed(() => Math.round(total * (props.tenant.deposit_percent ?? 30) / 100));
		const sel = {
			name: flow?.service?.name,
			duration: flow?.duration,
			photo: flow?.service?.photo,
			guests: flow?.guests
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$7, mergeProps({
				step: 2,
				brand: __props.tenant,
				location: __props.location
			}, _attrs), {
				aside: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<aside class="summary card" aria-label="Your booking"${_scopeId}><h2${_scopeId}>Your booking</h2><div class="it"${_scopeId}><img${ssrRenderAttr("src", sel.photo)} alt=""${_scopeId}><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(sel.name)} · ${ssrInterpolate(sel.duration)} min</b><small${_scopeId}>${ssrInterpolate(sel.guests > 1 ? "2 guests" : "1 guest")}</small></span></div><div class="row"${_scopeId}><span${_scopeId}>When</span><span${_scopeId}>${ssrInterpolate(activeDateFormatted.value)}</span></div><div class="row tot"${_scopeId}><span style="${ssrRenderStyle({ "color": "var(--text)" })}"${_scopeId}>Total</span><span${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(total),
							currency: __props.tenant.currency
						}, null, _parent, _scopeId));
						_push(`</span></div>`);
						if (depositDue.value) {
							_push(`<div class="dep"${_scopeId}><span${_scopeId}>Pay now (${ssrInterpolate(__props.tenant.deposit_percent)}% deposit)</span><b${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: depositDue.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(`</b><span class="muted small"${_scopeId}>Balance `);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: unref(total) - depositDue.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(` at the spa · free cancellation until 24 h before</span></div>`);
						} else _push(`<!---->`);
						_push(`<button class="btn primary block"${ssrIncludeBooleanAttr(!chosen.value || holding.value) ? " disabled" : ""}${_scopeId}>Continue</button></aside>`);
					} else return [createVNode("aside", {
						class: "summary card",
						"aria-label": "Your booking"
					}, [
						createVNode("h2", null, "Your booking"),
						createVNode("div", { class: "it" }, [createVNode("img", {
							src: sel.photo,
							alt: ""
						}, null, 8, ["src"]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(sel.name) + " · " + toDisplayString(sel.duration) + " min", 1), createVNode("small", null, toDisplayString(sel.guests > 1 ? "2 guests" : "1 guest"), 1)])]),
						createVNode("div", { class: "row" }, [createVNode("span", null, "When"), createVNode("span", null, toDisplayString(activeDateFormatted.value), 1)]),
						createVNode("div", { class: "row tot" }, [createVNode("span", { style: { "color": "var(--text)" } }, "Total"), createVNode("span", null, [createVNode(_sfc_main$25, {
							amount: unref(total),
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"])])]),
						depositDue.value ? (openBlock(), createBlock("div", {
							key: 0,
							class: "dep"
						}, [
							createVNode("span", null, "Pay now (" + toDisplayString(__props.tenant.deposit_percent) + "% deposit)", 1),
							createVNode("b", null, [createVNode(_sfc_main$25, {
								amount: depositDue.value,
								currency: __props.tenant.currency
							}, null, 8, ["amount", "currency"])]),
							createVNode("span", { class: "muted small" }, [
								createTextVNode("Balance "),
								createVNode(_sfc_main$25, {
									amount: unref(total) - depositDue.value,
									currency: __props.tenant.currency
								}, null, 8, ["amount", "currency"]),
								createTextVNode(" at the spa · free cancellation until 24 h before")
							])
						])) : createCommentVNode("", true),
						createVNode("button", {
							class: "btn primary block",
							disabled: !chosen.value || holding.value,
							onClick: continueToCheckout
						}, "Continue", 8, ["disabled"])
					])];
				}),
				mbar: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mbar"${_scopeId}><span class="t"${_scopeId}><b${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: unref(total),
							currency: __props.tenant.currency
						}, null, _parent, _scopeId));
						_push(`</b>`);
						if (depositDue.value) {
							_push(`<small${_scopeId}>Deposit `);
							_push(ssrRenderComponent(_sfc_main$25, {
								amount: depositDue.value,
								currency: __props.tenant.currency
							}, null, _parent, _scopeId));
							_push(` today</small>`);
						} else _push(`<!---->`);
						_push(`</span><button class="btn primary"${ssrIncludeBooleanAttr(!chosen.value || holding.value) ? " disabled" : ""}${_scopeId}>Continue</button></div>`);
					} else return [createVNode("div", { class: "mbar" }, [createVNode("span", { class: "t" }, [createVNode("b", null, [createVNode(_sfc_main$25, {
						amount: unref(total),
						currency: __props.tenant.currency
					}, null, 8, ["amount", "currency"])]), depositDue.value ? (openBlock(), createBlock("small", { key: 0 }, [
						createTextVNode("Deposit "),
						createVNode(_sfc_main$25, {
							amount: depositDue.value,
							currency: __props.tenant.currency
						}, null, 8, ["amount", "currency"]),
						createTextVNode(" today")
					])) : createCommentVNode("", true)]), createVNode("button", {
						class: "btn primary",
						disabled: !chosen.value || holding.value,
						onClick: continueToCheckout
					}, "Continue", 8, ["disabled"])])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div${_scopeId}><h1${_scopeId}>When would you like to come?</h1><p class="lead"${_scopeId}>${ssrInterpolate(sel.name)} · ${ssrInterpolate(sel.duration)} min · ${ssrInterpolate(sel.guests > 1 ? "2 guests" : "1 guest")}</p><section class="tblk"${_scopeId}><h2${_scopeId}>Therapists</h2><div class="ther" role="radiogroup" aria-label="Therapists"${_scopeId}><div class="opt" role="radio"${ssrRenderAttr("aria-checked", String(therapistMode.value === "any"))}${_scopeId}><span class="rdo" aria-hidden="true"${_scopeId}><span class="o"${_scopeId}></span></span><span class="av sm" style="${ssrRenderStyle({
							"background": "var(--brand-soft)",
							"color": "var(--brand-strong)"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "sparkles"
						}, null, _parent, _scopeId));
						_push(`</span><span class="t"${_scopeId}><b${_scopeId}>Any two therapists</b><small${_scopeId}>Most available times</small></span></div><div class="opt" role="radio"${ssrRenderAttr("aria-checked", String(therapistMode.value === "per"))}${_scopeId}><span class="rdo" aria-hidden="true"${_scopeId}><span class="o"${_scopeId}></span></span><span class="av sm av-6" aria-hidden="true"${_scopeId}>MA</span><span class="t"${_scopeId}><b${_scopeId}>Choose per guest</b><small${_scopeId}>Meet the team on the next screen</small></span></div><div class="opt" role="radio"${ssrRenderAttr("aria-checked", String(therapistMode.value === "gender"))}${_scopeId}><span class="rdo" aria-hidden="true"${_scopeId}><span class="o"${_scopeId}></span></span><span class="av sm" style="${ssrRenderStyle({
							"background": "var(--hover)",
							"color": "var(--text-2)"
						})}"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							xs: "",
							name: "users"
						}, null, _parent, _scopeId));
						_push(`</span><span class="t"${_scopeId}><b${_scopeId}>Gender preference</b><small${_scopeId}>Female or male therapists</small></span></div></div>`);
						if (therapistMode.value === "gender") _push(`<div class="seg" role="group" aria-label="Gender" style="${ssrRenderStyle({ "margin-top": "10px" })}"${_scopeId}><button${ssrRenderAttr("aria-pressed", String(gender.value === "female"))}${_scopeId}>Female</button><button${ssrRenderAttr("aria-pressed", String(gender.value === "male"))}${_scopeId}>Male</button></div>`);
						else _push(`<!---->`);
						_push(`</section><section class="tblk"${_scopeId}><h2${_scopeId}>${ssrInterpolate(monthLabel.value)} <span style="${ssrRenderStyle({
							"margin-left": "auto",
							"display": "flex",
							"gap": "2px"
						})}"${_scopeId}><button class="ib" aria-label="Previous week"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "chevron-left"
						}, null, _parent, _scopeId));
						_push(`</button><button class="ib" aria-label="Next week"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "chevron-right"
						}, null, _parent, _scopeId));
						_push(`</button></span></h2><div class="days" role="radiogroup" aria-label="Day"${_scopeId}><!--[-->`);
						ssrRenderList(days.value, (d) => {
							_push(`<span class="day" role="radio"${ssrRenderAttr("aria-checked", String(activeDate.value === d.date))}${ssrRenderAttr("aria-disabled", String(d.disabled))}${_scopeId}>${ssrInterpolate(d.dow)}<b${_scopeId}>${ssrInterpolate(d.num)}</b><i class="${ssrRenderClass(d.level)}"${_scopeId}></i></span>`);
						});
						_push(`<!--]--></div></section><section class="tblk slots"${_scopeId}><!--[-->`);
						ssrRenderList(slots.value, (list, part) => {
							_push(`<!--[-->`);
							if (list.length) {
								_push(`<div${_scopeId}><h3${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: partLabels[part][0]
								}, null, _parent, _scopeId));
								_push(`${ssrInterpolate(partLabels[part][1])}</h3><div class="sg" role="radiogroup"${ssrRenderAttr("aria-label", partLabels[part][1])}${_scopeId}><!--[-->`);
								ssrRenderList(list, (t) => {
									_push(`<button class="sl" role="radio"${ssrRenderAttr("aria-checked", String(chosen.value === t))}${_scopeId}>${ssrInterpolate(t)}</button>`);
								});
								_push(`<!--]--></div></div>`);
							} else _push(`<!---->`);
							_push(`<!--]-->`);
						});
						_push(`<!--]-->`);
						if (loading.value) {
							_push(`<p class="why"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "info"
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>Finding times when the room and therapist are both free…</span></p>`);
						} else if (!dayOpen.value) {
							_push(`<p class="why"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "info"
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>We&#39;re closed that day — pick another date.</span></p>`);
						} else if (!slots.value.morning.length && !slots.value.afternoon.length && !slots.value.evening.length) {
							_push(`<p class="why"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "info"
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>Fully booked that day. Join the waitlist by messaging us — cancellations open up slots.</span></p>`);
						} else _push(`<!---->`);
						_push(`<p class="why"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "info"
						}, null, _parent, _scopeId));
						_push(`<span${_scopeId}> Only times when a suitable room and ${ssrInterpolate(sel.guests > 1 ? "two therapists" : "a therapist")} are free for the full ${ssrInterpolate(sel.duration)} minutes are shown.</span></p></section></div>`);
					} else return [createVNode("div", null, [
						createVNode("h1", null, "When would you like to come?"),
						createVNode("p", { class: "lead" }, toDisplayString(sel.name) + " · " + toDisplayString(sel.duration) + " min · " + toDisplayString(sel.guests > 1 ? "2 guests" : "1 guest"), 1),
						createVNode("section", { class: "tblk" }, [
							createVNode("h2", null, "Therapists"),
							createVNode("div", {
								class: "ther",
								role: "radiogroup",
								"aria-label": "Therapists"
							}, [
								createVNode("div", {
									class: "opt",
									role: "radio",
									"aria-checked": String(therapistMode.value === "any"),
									onClick: ($event) => {
										therapistMode.value = "any";
										gender.value = null;
									}
								}, [
									createVNode("span", {
										class: "rdo",
										"aria-hidden": "true"
									}, [createVNode("span", { class: "o" })]),
									createVNode("span", {
										class: "av sm",
										style: {
											"background": "var(--brand-soft)",
											"color": "var(--brand-strong)"
										}
									}, [createVNode(_sfc_main$29, {
										xs: "",
										name: "sparkles"
									})]),
									createVNode("span", { class: "t" }, [createVNode("b", null, "Any two therapists"), createVNode("small", null, "Most available times")])
								], 8, ["aria-checked", "onClick"]),
								createVNode("div", {
									class: "opt",
									role: "radio",
									"aria-checked": String(therapistMode.value === "per"),
									onClick: ($event) => therapistMode.value = "per"
								}, [
									createVNode("span", {
										class: "rdo",
										"aria-hidden": "true"
									}, [createVNode("span", { class: "o" })]),
									createVNode("span", {
										class: "av sm av-6",
										"aria-hidden": "true"
									}, "MA"),
									createVNode("span", { class: "t" }, [createVNode("b", null, "Choose per guest"), createVNode("small", null, "Meet the team on the next screen")])
								], 8, ["aria-checked", "onClick"]),
								createVNode("div", {
									class: "opt",
									role: "radio",
									"aria-checked": String(therapistMode.value === "gender"),
									onClick: ($event) => therapistMode.value = "gender"
								}, [
									createVNode("span", {
										class: "rdo",
										"aria-hidden": "true"
									}, [createVNode("span", { class: "o" })]),
									createVNode("span", {
										class: "av sm",
										style: {
											"background": "var(--hover)",
											"color": "var(--text-2)"
										}
									}, [createVNode(_sfc_main$29, {
										xs: "",
										name: "users"
									})]),
									createVNode("span", { class: "t" }, [createVNode("b", null, "Gender preference"), createVNode("small", null, "Female or male therapists")])
								], 8, ["aria-checked", "onClick"])
							]),
							therapistMode.value === "gender" ? (openBlock(), createBlock("div", {
								key: 0,
								class: "seg",
								role: "group",
								"aria-label": "Gender",
								style: { "margin-top": "10px" }
							}, [createVNode("button", {
								"aria-pressed": String(gender.value === "female"),
								onClick: ($event) => gender.value = gender.value === "female" ? null : "female"
							}, "Female", 8, ["aria-pressed", "onClick"]), createVNode("button", {
								"aria-pressed": String(gender.value === "male"),
								onClick: ($event) => gender.value = gender.value === "male" ? null : "male"
							}, "Male", 8, ["aria-pressed", "onClick"])])) : createCommentVNode("", true)
						]),
						createVNode("section", { class: "tblk" }, [createVNode("h2", null, [createTextVNode(toDisplayString(monthLabel.value) + " ", 1), createVNode("span", { style: {
							"margin-left": "auto",
							"display": "flex",
							"gap": "2px"
						} }, [createVNode("button", {
							class: "ib",
							"aria-label": "Previous week",
							onClick: loadSummary
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "chevron-left"
						})]), createVNode("button", {
							class: "ib",
							"aria-label": "Next week",
							onClick: loadSummary
						}, [createVNode(_sfc_main$29, {
							sm: "",
							name: "chevron-right"
						})])])]), createVNode("div", {
							class: "days",
							role: "radiogroup",
							"aria-label": "Day"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(days.value, (d) => {
							return openBlock(), createBlock("span", {
								key: d.date,
								class: "day",
								role: "radio",
								"aria-checked": String(activeDate.value === d.date),
								"aria-disabled": String(d.disabled),
								onClick: ($event) => !d.disabled && (activeDate.value = d.date)
							}, [
								createTextVNode(toDisplayString(d.dow), 1),
								createVNode("b", null, toDisplayString(d.num), 1),
								createVNode("i", { class: d.level }, null, 2)
							], 8, [
								"aria-checked",
								"aria-disabled",
								"onClick"
							]);
						}), 128))])]),
						createVNode("section", { class: "tblk slots" }, [
							(openBlock(true), createBlock(Fragment, null, renderList(slots.value, (list, part) => {
								return openBlock(), createBlock(Fragment, { key: part }, [list.length ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("h3", null, [createVNode(_sfc_main$29, {
									sm: "",
									name: partLabels[part][0]
								}, null, 8, ["name"]), createTextVNode(toDisplayString(partLabels[part][1]), 1)]), createVNode("div", {
									class: "sg",
									role: "radiogroup",
									"aria-label": partLabels[part][1]
								}, [(openBlock(true), createBlock(Fragment, null, renderList(list, (t) => {
									return openBlock(), createBlock("button", {
										key: t,
										class: "sl",
										role: "radio",
										"aria-checked": String(chosen.value === t),
										onClick: ($event) => chosen.value = t
									}, toDisplayString(t), 9, ["aria-checked", "onClick"]);
								}), 128))], 8, ["aria-label"])])) : createCommentVNode("", true)], 64);
							}), 128)),
							loading.value ? (openBlock(), createBlock("p", {
								key: 0,
								class: "why"
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "info"
							}), createVNode("span", null, "Finding times when the room and therapist are both free…")])) : !dayOpen.value ? (openBlock(), createBlock("p", {
								key: 1,
								class: "why"
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "info"
							}), createVNode("span", null, "We're closed that day — pick another date.")])) : !slots.value.morning.length && !slots.value.afternoon.length && !slots.value.evening.length ? (openBlock(), createBlock("p", {
								key: 2,
								class: "why"
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "info"
							}), createVNode("span", null, "Fully booked that day. Join the waitlist by messaging us — cancellations open up slots.")])) : createCommentVNode("", true),
							createVNode("p", { class: "why" }, [createVNode(_sfc_main$29, {
								sm: "",
								name: "info"
							}), createVNode("span", null, " Only times when a suitable room and " + toDisplayString(sel.guests > 1 ? "two therapists" : "a therapist") + " are free for the full " + toDisplayString(sel.duration) + " minutes are shown.", 1)])
						])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Booking/Time.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
// resources/js/Pages/Platform/Tenants.vue
var Tenants_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main$2 });
var _sfc_main$2 = {
	__name: "Tenants",
	__ssrInlineRender: true,
	props: {
		tenants: Array,
		kpi: Object
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$26, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(IconSprite_default, null, null, _parent, _scopeId));
						_push(`<div class="content"${_scopeId}><div class="ph"${_scopeId}><div${_scopeId}><h1${_scopeId}>Tenants <span class="badge" style="${ssrRenderStyle({ "vertical-align": "middle" })}"${_scopeId}>Platform admin · phase 2</span></h1><p${_scopeId}>${ssrInterpolate(__props.tenants.length)} businesses · each tenant&#39;s data is isolated by tenant id and row-level security</p></div><div class="acts"${_scopeId}><button class="btn primary"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, {
							sm: "",
							name: "plus"
						}, null, _parent, _scopeId));
						_push(`Invite business</button></div></div><div class="kpis"${_scopeId}><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>MRR</span><span class="v"${_scopeId}>\$${ssrInterpolate(__props.kpi.mrr)}</span><span class="d"${_scopeId}>across all tenants</span></div><div class="card kpi"${_scopeId}><span class="l"${_scopeId}>Bookings, 30 days</span><span class="v"${_scopeId}>${ssrInterpolate(__props.kpi.bookings_30d.toLocaleString())}</span><span class="d"${_scopeId}>across all tenants</span></div></div><section class="card"${_scopeId}><div class="card-h"${_scopeId}><h2${_scopeId}>Businesses</h2></div><div class="tablewrap"${_scopeId}><table class="t"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Business</th><th${_scopeId}>Region</th><th${_scopeId}>Currency · zone</th><th class="n"${_scopeId}>Locations</th><th${_scopeId}>Plan</th><th class="n"${_scopeId}>Bookings 30 d</th><th${_scopeId}>Status</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(__props.tenants, (t) => {
							_push(`<tr${_scopeId}><td${_scopeId}><span class="cellp"${_scopeId}><span class="av" style="${ssrRenderStyle({
								"background": "var(--brand-soft)",
								"color": "var(--brand-strong)",
								"font-family": "var(--serif)"
							})}"${_scopeId}>${ssrInterpolate(t.name[0])}</span><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(t.name)}</b><small${_scopeId}>${ssrInterpolate(t.slug)}.lulur.app</small></span></span></td><td${_scopeId}>${ssrInterpolate(t.region)}</td><td class="muted"${_scopeId}>${ssrInterpolate(t.currency)} · ${ssrInterpolate(t.timezone)}</td><td class="n"${_scopeId}>${ssrInterpolate(t.locations)}</td><td${_scopeId}>${ssrInterpolate(t.plan)}</td><td class="n"${_scopeId}>${ssrInterpolate(t.bookings_30d.toLocaleString())}</td><td${_scopeId}><span class="${ssrRenderClass([t.status === "active" ? "ok" : "warn", "badge"])}"${_scopeId}>${ssrInterpolate(t.status)}</span></td><td class="n"${_scopeId}><button class="btn sm"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								xs: "",
								name: "log-in"
							}, null, _parent, _scopeId));
							_push(`Support login</button></td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section><p class="synthetic"${_scopeId}>Synthetic demo data. Phase 2 screen, shown to explain the multi-tenant design.</p></div>`);
					} else return [createVNode(IconSprite_default), createVNode("div", { class: "content" }, [
						createVNode("div", { class: "ph" }, [createVNode("div", null, [createVNode("h1", null, [createTextVNode("Tenants "), createVNode("span", {
							class: "badge",
							style: { "vertical-align": "middle" }
						}, "Platform admin · phase 2")]), createVNode("p", null, toDisplayString(__props.tenants.length) + " businesses · each tenant's data is isolated by tenant id and row-level security", 1)]), createVNode("div", { class: "acts" }, [createVNode("button", { class: "btn primary" }, [createVNode(_sfc_main$29, {
							sm: "",
							name: "plus"
						}), createTextVNode("Invite business")])])]),
						createVNode("div", { class: "kpis" }, [createVNode("div", { class: "card kpi" }, [
							createVNode("span", { class: "l" }, "MRR"),
							createVNode("span", { class: "v" }, "$" + toDisplayString(__props.kpi.mrr), 1),
							createVNode("span", { class: "d" }, "across all tenants")
						]), createVNode("div", { class: "card kpi" }, [
							createVNode("span", { class: "l" }, "Bookings, 30 days"),
							createVNode("span", { class: "v" }, toDisplayString(__props.kpi.bookings_30d.toLocaleString()), 1),
							createVNode("span", { class: "d" }, "across all tenants")
						])]),
						createVNode("section", { class: "card" }, [createVNode("div", { class: "card-h" }, [createVNode("h2", null, "Businesses")]), createVNode("div", { class: "tablewrap" }, [createVNode("table", { class: "t" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Business"),
							createVNode("th", null, "Region"),
							createVNode("th", null, "Currency · zone"),
							createVNode("th", { class: "n" }, "Locations"),
							createVNode("th", null, "Plan"),
							createVNode("th", { class: "n" }, "Bookings 30 d"),
							createVNode("th", null, "Status"),
							createVNode("th")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(__props.tenants, (t) => {
							return openBlock(), createBlock("tr", { key: t.slug }, [
								createVNode("td", null, [createVNode("span", { class: "cellp" }, [createVNode("span", {
									class: "av",
									style: {
										"background": "var(--brand-soft)",
										"color": "var(--brand-strong)",
										"font-family": "var(--serif)"
									}
								}, toDisplayString(t.name[0]), 1), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(t.name), 1), createVNode("small", null, toDisplayString(t.slug) + ".lulur.app", 1)])])]),
								createVNode("td", null, toDisplayString(t.region), 1),
								createVNode("td", { class: "muted" }, toDisplayString(t.currency) + " · " + toDisplayString(t.timezone), 1),
								createVNode("td", { class: "n" }, toDisplayString(t.locations), 1),
								createVNode("td", null, toDisplayString(t.plan), 1),
								createVNode("td", { class: "n" }, toDisplayString(t.bookings_30d.toLocaleString()), 1),
								createVNode("td", null, [createVNode("span", { class: ["badge", t.status === "active" ? "ok" : "warn"] }, toDisplayString(t.status), 3)]),
								createVNode("td", { class: "n" }, [createVNode("button", { class: "btn sm" }, [createVNode(_sfc_main$29, {
									xs: "",
									name: "log-in"
								}), createTextVNode("Support login")])])
							]);
						}), 128))])])])]),
						createVNode("p", { class: "synthetic" }, "Synthetic demo data. Phase 2 screen, shown to explain the multi-tenant design.")
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Platform/Tenants.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
// resources/js/Layouts/TherapistLayout.vue
var _sfc_main$1 = {
	__name: "TherapistLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "phone" }, _attrs))}>`);
			_push(ssrRenderComponent(IconSprite_default, null, null, _parent));
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`<nav class="tabbar" aria-label="Therapist">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/today",
				"aria-current": "page"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$29, { name: "calendar-days" }, null, _parent, _scopeId));
						_push(`Today`);
					} else return [createVNode(_sfc_main$29, { name: "calendar-days" }), createTextVNode("Today")];
				}),
				_: 1
			}, _parent));
			_push(`<a href="#">`);
			_push(ssrRenderComponent(_sfc_main$29, { name: "users" }, null, _parent));
			_push(`Clients</a><a href="#">`);
			_push(ssrRenderComponent(_sfc_main$29, { name: "hand-coins" }, null, _parent));
			_push(`Tips</a></nav></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/TherapistLayout.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
// resources/js/Pages/Therapist/Today.vue
var Today_exports = /* @__PURE__ */ __exportAll({ default: () => _sfc_main });
var _sfc_main = {
	__name: "Today",
	__ssrInlineRender: true,
	props: {
		staff: Object,
		date_label: String,
		stats: Object,
		bookings: Array,
		currency: String
	},
	setup(__props) {
		const props = __props;
		const now = computed(() => props.bookings.find((b) => b.is_now));
		const next = computed(() => props.bookings.find((b) => !b.past && !b.is_now && ["confirmed", "checked_in"].includes(b.status)));
		const earlier = computed(() => props.bookings.filter((b) => b.past || b.status === "no_show").reverse());
		function finish(b) {
			router.post(`/admin/bookings/${b.id}/status`, { action: "complete" }, { preserveScroll: true });
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<header class="th-top"${_scopeId}><div class="r1"${_scopeId}><span class="${ssrRenderClass(["av-7", "av"])}" aria-hidden="true"${_scopeId}>${ssrInterpolate(__props.staff.initials)}</span><div${_scopeId}><small${_scopeId}>${ssrInterpolate(__props.date_label)}</small><b${_scopeId}>Selamat siang, ${ssrInterpolate(__props.staff.name.split(" ")[0])}</b></div><button class="ib" style="${ssrRenderStyle({
							"margin-left": "auto",
							"color": "#fff"
						})}" aria-label="Notifications"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$29, { name: "bell" }, null, _parent, _scopeId));
						_push(`</button></div><div class="stat"${_scopeId}><div${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.stats.clients)}</b><span${_scopeId}>clients today</span></div><div${_scopeId}><b${_scopeId}>${ssrInterpolate(__props.stats.booked_label)}</b><span${_scopeId}>booked</span></div><div${_scopeId}><b${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$25, {
							amount: __props.stats.tips,
							currency: __props.currency
						}, null, _parent, _scopeId));
						_push(`</b><span${_scopeId}>tips today</span></div></div></header><div class="list"${_scopeId}>`);
						if (now.value) {
							_push(`<!--[--><h2${_scopeId}>Now</h2><div class="card it now"${_scopeId}><div class="r1"${_scopeId}><time${_scopeId}>${ssrInterpolate(now.value.time)}</time><span class="muted small"${_scopeId}>until ${ssrInterpolate(now.value.until)} · ${ssrInterpolate(now.value.room)}</span><span class="badge ok"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, { name: now.value.status === "in_service" ? "sparkles" : "door-open" }, null, _parent, _scopeId));
							_push(`${ssrInterpolate(now.value.status_label)}</span></div><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(now.value.client)} · ${ssrInterpolate(now.value.service)}</b><small${_scopeId}>${ssrInterpolate(now.value.prefs)}</small></span><div class="timer"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$29, {
								sm: "",
								name: "timer"
							}, null, _parent, _scopeId));
							_push(`<span${_scopeId}>${ssrInterpolate(now.value.progress)} of 100%</span><span class="bar"${_scopeId}><i style="${ssrRenderStyle({ width: now.value.progress + "%" })}"${_scopeId}></i></span></div>`);
							if (now.value.status === "checked_in") {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "sparkles"
								}, null, _parent, _scopeId));
								_push(`Start session</button>`);
							} else {
								_push(`<button class="btn primary"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									sm: "",
									name: "check"
								}, null, _parent, _scopeId));
								_push(`Finish session</button>`);
							}
							_push(`</div><!--]-->`);
						} else _push(`<!---->`);
						if (next.value) {
							_push(`<!--[--><h2${_scopeId}>Next</h2><div class="card it"${_scopeId}><div class="r1"${_scopeId}><time${_scopeId}>${ssrInterpolate(next.value.time)}</time><span class="muted small"${_scopeId}>until ${ssrInterpolate(next.value.until)} · ${ssrInterpolate(next.value.room)}</span><span class="${ssrRenderClass([next.value.status === "confirmed" ? "info" : "ok", "badge"])}"${_scopeId}>${ssrInterpolate(next.value.status_label)}</span></div><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(next.value.client)} · ${ssrInterpolate(next.value.service)}</b><small${_scopeId}>${ssrInterpolate(next.value.prefs)}</small></span><div class="tags"${_scopeId}>`);
							if (!next.value.form_signed) {
								_push(`<span class="badge warn"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "triangle-alert"
								}, null, _parent, _scopeId));
								_push(`Form missing</span>`);
							} else {
								_push(`<span class="badge ok"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "file-check"
								}, null, _parent, _scopeId));
								_push(`Form signed</span>`);
							}
							if (next.value.prefs?.includes("allerg")) {
								_push(`<span class="badge warn"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, {
									xs: "",
									name: "triangle-alert"
								}, null, _parent, _scopeId));
								_push(`Allergy — check notes</span>`);
							} else _push(`<!---->`);
							_push(`</div></div><!--]-->`);
						} else _push(`<!---->`);
						if (earlier.value.length) {
							_push(`<!--[--><h2${_scopeId}>Earlier</h2><!--[-->`);
							ssrRenderList(earlier.value, (b) => {
								_push(`<div class="card it past"${_scopeId}><div class="r1"${_scopeId}><time${_scopeId}>${ssrInterpolate(b.time)}</time><span class="muted small"${_scopeId}>${ssrInterpolate(b.room)}</span><span class="${ssrRenderClass([b.status === "no_show" ? "bad" : "", "badge"])}"${_scopeId}>`);
								_push(ssrRenderComponent(_sfc_main$29, { name: b.status === "no_show" ? "user-x" : "check" }, null, _parent, _scopeId));
								_push(`${ssrInterpolate(b.status_label)}</span></div><span class="t2"${_scopeId}><b${_scopeId}>${ssrInterpolate(b.client)} · ${ssrInterpolate(b.service)}</b>`);
								if (b.tip) {
									_push(`<small${_scopeId}>Tip `);
									_push(ssrRenderComponent(_sfc_main$25, {
										amount: b.tip,
										currency: __props.currency
									}, null, _parent, _scopeId));
									_push(`</small>`);
								} else if (b.status === "no_show") _push(`<small${_scopeId}>Deposit kept per policy</small>`);
								else _push(`<!---->`);
								_push(`</span></div>`);
							});
							_push(`<!--]--><!--]-->`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("header", { class: "th-top" }, [createVNode("div", { class: "r1" }, [
						createVNode("span", {
							class: ["av", "av-7"],
							"aria-hidden": "true"
						}, toDisplayString(__props.staff.initials), 1),
						createVNode("div", null, [createVNode("small", null, toDisplayString(__props.date_label), 1), createVNode("b", null, "Selamat siang, " + toDisplayString(__props.staff.name.split(" ")[0]), 1)]),
						createVNode("button", {
							class: "ib",
							style: {
								"margin-left": "auto",
								"color": "#fff"
							},
							"aria-label": "Notifications"
						}, [createVNode(_sfc_main$29, { name: "bell" })])
					]), createVNode("div", { class: "stat" }, [
						createVNode("div", null, [createVNode("b", null, toDisplayString(__props.stats.clients), 1), createVNode("span", null, "clients today")]),
						createVNode("div", null, [createVNode("b", null, toDisplayString(__props.stats.booked_label), 1), createVNode("span", null, "booked")]),
						createVNode("div", null, [createVNode("b", null, [createVNode(_sfc_main$25, {
							amount: __props.stats.tips,
							currency: __props.currency
						}, null, 8, ["amount", "currency"])]), createVNode("span", null, "tips today")])
					])]), createVNode("div", { class: "list" }, [
						now.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [createVNode("h2", null, "Now"), createVNode("div", { class: "card it now" }, [
							createVNode("div", { class: "r1" }, [
								createVNode("time", null, toDisplayString(now.value.time), 1),
								createVNode("span", { class: "muted small" }, "until " + toDisplayString(now.value.until) + " · " + toDisplayString(now.value.room), 1),
								createVNode("span", { class: "badge ok" }, [createVNode(_sfc_main$29, { name: now.value.status === "in_service" ? "sparkles" : "door-open" }, null, 8, ["name"]), createTextVNode(toDisplayString(now.value.status_label), 1)])
							]),
							createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(now.value.client) + " · " + toDisplayString(now.value.service), 1), createVNode("small", null, toDisplayString(now.value.prefs), 1)]),
							createVNode("div", { class: "timer" }, [
								createVNode(_sfc_main$29, {
									sm: "",
									name: "timer"
								}),
								createVNode("span", null, toDisplayString(now.value.progress) + " of 100%", 1),
								createVNode("span", { class: "bar" }, [createVNode("i", { style: { width: now.value.progress + "%" } }, null, 4)])
							]),
							now.value.status === "checked_in" ? (openBlock(), createBlock("button", {
								key: 0,
								class: "btn primary",
								onClick: ($event) => unref(router).post(`/admin/bookings/${now.value.id}/status`, { action: "start" }, { preserveScroll: true })
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "sparkles"
							}), createTextVNode("Start session")], 8, ["onClick"])) : (openBlock(), createBlock("button", {
								key: 1,
								class: "btn primary",
								onClick: ($event) => finish(now.value)
							}, [createVNode(_sfc_main$29, {
								sm: "",
								name: "check"
							}), createTextVNode("Finish session")], 8, ["onClick"]))
						])], 64)) : createCommentVNode("", true),
						next.value ? (openBlock(), createBlock(Fragment, { key: 1 }, [createVNode("h2", null, "Next"), createVNode("div", { class: "card it" }, [
							createVNode("div", { class: "r1" }, [
								createVNode("time", null, toDisplayString(next.value.time), 1),
								createVNode("span", { class: "muted small" }, "until " + toDisplayString(next.value.until) + " · " + toDisplayString(next.value.room), 1),
								createVNode("span", { class: ["badge", next.value.status === "confirmed" ? "info" : "ok"] }, toDisplayString(next.value.status_label), 3)
							]),
							createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(next.value.client) + " · " + toDisplayString(next.value.service), 1), createVNode("small", null, toDisplayString(next.value.prefs), 1)]),
							createVNode("div", { class: "tags" }, [!next.value.form_signed ? (openBlock(), createBlock("span", {
								key: 0,
								class: "badge warn"
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "triangle-alert"
							}), createTextVNode("Form missing")])) : (openBlock(), createBlock("span", {
								key: 1,
								class: "badge ok"
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "file-check"
							}), createTextVNode("Form signed")])), next.value.prefs?.includes("allerg") ? (openBlock(), createBlock("span", {
								key: 2,
								class: "badge warn"
							}, [createVNode(_sfc_main$29, {
								xs: "",
								name: "triangle-alert"
							}), createTextVNode("Allergy — check notes")])) : createCommentVNode("", true)])
						])], 64)) : createCommentVNode("", true),
						earlier.value.length ? (openBlock(), createBlock(Fragment, { key: 2 }, [createVNode("h2", null, "Earlier"), (openBlock(true), createBlock(Fragment, null, renderList(earlier.value, (b) => {
							return openBlock(), createBlock("div", {
								key: b.id,
								class: "card it past"
							}, [createVNode("div", { class: "r1" }, [
								createVNode("time", null, toDisplayString(b.time), 1),
								createVNode("span", { class: "muted small" }, toDisplayString(b.room), 1),
								createVNode("span", { class: ["badge", b.status === "no_show" ? "bad" : ""] }, [createVNode(_sfc_main$29, { name: b.status === "no_show" ? "user-x" : "check" }, null, 8, ["name"]), createTextVNode(toDisplayString(b.status_label), 1)], 2)
							]), createVNode("span", { class: "t2" }, [createVNode("b", null, toDisplayString(b.client) + " · " + toDisplayString(b.service), 1), b.tip ? (openBlock(), createBlock("small", { key: 0 }, [createTextVNode("Tip "), createVNode(_sfc_main$25, {
								amount: b.tip,
								currency: __props.currency
							}, null, 8, ["amount", "currency"])])) : b.status === "no_show" ? (openBlock(), createBlock("small", { key: 1 }, "Deposit kept per policy")) : createCommentVNode("", true)])]);
						}), 128))], 64)) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Therapist/Today.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// resources/js/ssr.js
createInertiaApp({
	title: (title) => title ? `${title} · Lulur` : "Lulur",
	resolve: (name) => {
		return (/* @__PURE__ */ Object.assign({
			"./Pages/Admin/Bookings.vue": Bookings_exports,
			"./Pages/Admin/Calendar.vue": Calendar_exports,
			"./Pages/Admin/Catalog.vue": Catalog_exports,
			"./Pages/Admin/ClientShow.vue": ClientShow_exports,
			"./Pages/Admin/Clients.vue": Clients_exports,
			"./Pages/Admin/Marketing.vue": Marketing_exports,
			"./Pages/Admin/Reports.vue": Reports_exports,
			"./Pages/Admin/Rooms.vue": Rooms_exports,
			"./Pages/Admin/ServiceEdit.vue": ServiceEdit_exports,
			"./Pages/Admin/Settings.vue": Settings_exports,
			"./Pages/Admin/Team.vue": Team_exports,
			"./Pages/Auth/Login.vue": Login_exports,
			"./Pages/Auth/TwoFactor.vue": TwoFactor_exports,
			"./Pages/Booking/Checkout.vue": Checkout_exports,
			"./Pages/Booking/Manage.vue": Manage_exports,
			"./Pages/Booking/Services.vue": Services_exports,
			"./Pages/Booking/Time.vue": Time_exports,
			"./Pages/Platform/Tenants.vue": Tenants_exports,
			"./Pages/Therapist/Today.vue": Today_exports
		}))[`./Pages/${name}.vue`];
	},
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin).use(ZiggyVue);
	}
});
export {};
