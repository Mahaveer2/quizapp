import { c as create_ssr_component, b as subscribe, v as validate_component, d as each, f as add_attribute } from "../../../chunks/index2.js";
import { C as ChatMessage } from "../../../chunks/ChatMessage.js";
import { p as page } from "../../../chunks/stores.js";
import "sse.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let query = "";
  let chatMessages = [];
  let scrollToDiv;
  $$unsubscribe_page();
  return `TEST

${$page.data.user ? `<div class="${"flex flex-col pt-4 w-full px-8 items-center gap-2"}"><div><a href="${"/"}" class="${"mt-[100px] p-3 flex justify-center items-center bg-black text-white"}">Learn</a>
			<h1 class="${"text-2xl font-bold w-full text-center"}">Chatty</h1>
			<p class="${"text-sm italic"}">Powered by gpt-3.5-turbo</p></div>
		<div class="${"h-[500px] w-full bg-gray-900 rounded-md p-4 overflow-y-auto flex flex-col gap-4"}"><div class="${"flex flex-col gap-2"}">${validate_component(ChatMessage, "ChatMessage").$$render(
    $$result,
    {
      type: "assistant",
      message: "Type start to continue start"
    },
    {},
    {}
  )}
				${each(chatMessages, (message) => {
    return `${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        type: message.role,
        message: message.content
      },
      {},
      {}
    )}`;
  })}
				${``}
				${``}</div>
			<div class="${""}"${add_attribute("this", scrollToDiv, 0)}></div></div>
		<form class="${"flex w-full rounded-md gap-4 bg-gray-900 p-4"}"><input type="${"text"}" class="${"input input-bordered w-full"}"${add_attribute("value", query, 0)}>
			<button type="${"submit"}" class="${"btn btn-accent"}">Send </button></form></div>` : `<a href="${"/login"}" class="${"mt-[100px] p-3 flex justify-center items-center bg-black text-white"}">Login to Continue</a>
	<p>This is just a prototype of your requirements.</p>`}`;
});
export {
  Page as default
};
