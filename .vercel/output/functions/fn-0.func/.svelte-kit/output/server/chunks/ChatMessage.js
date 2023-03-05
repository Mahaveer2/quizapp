import { c as create_ssr_component, e as escape } from "./index2.js";
const ChatMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { message } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<div class="${"chat " + escape(type === "user" ? "chat-end" : "chat-start", true) + " justify-end"}"><div class="${"chat-image avatar"}"><div class="${"w-10 rounded-full"}"><img src="${"https://ui-avatars.com/api/?name=" + escape(type === "user" ? "Me" : "B", true)}" alt="${escape(type, true) + " avatar"}"></div></div>
	
	<div class="${"chat-bubble " + escape(
    type === "user" ? "chat-bubble-primary" : "chat-bubble-secondary",
    true
  )}">${escape(message)}</div></div>`;
});
export {
  ChatMessage as C
};
