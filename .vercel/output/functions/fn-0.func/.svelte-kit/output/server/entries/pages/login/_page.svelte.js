import { c as create_ssr_component } from "../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<form method="${"POST"}" action="${"?/login"}" class="${"flex flex-col gap-5 mt-[100px]"}">Sign up below with demo email
  Email:<strong>test@gmail.com</strong>
  Password:<strong>test</strong>
  <input class="${"p-5 w-full border"}" type="${"email"}" name="${"email"}" required placeholder="${"Enter Email"}">
  <input class="${"p-5 w-full border"}" type="${"password"}" name="${"password"}" placeholder="${"Enter Password"}" required>
  <button class="${"p-5 bg-black text-white"}">Login</button>
  ${form?.invalid ? `<p class="${"error"}">Username and password is required.</p>` : ``}

  ${form?.credentials ? `<p class="${"error"}">You have entered the wrong credentials.</p>` : ``}</form>`;
});
export {
  Page as default
};
