import { generateClasses } from "@formkit/themes";

export default generateClasses({
  global: {
    messages: "text-red-1 text-lg text-sm mt-3 [word-break:break-word]",
  },

  "family:text": {
    label:
      "inline-block mb-[15px] text-[22px]/[30px] font-bold tracking-normal",

    inner: "shadow-input relative inverse-navbar bg-white rounded-lg",

    input:
      "bg-transparent h-[62px] w-full text-[18px] font-medium text-[#404040] px-[29px] placeholder:text-[#404040]/50 read-only:opacity-70 read-only:cursor-not-allowed",
  },

  textarea: {
    inner: "shadow-input inverse-navbar bg-white rounded-lg",

    input:
      "bg-transparent resize-none w-full text-[18px]/[calc(24/18)] pt-[30px] px-[29px] pb-[30px] font-medium text-[#404040]! placeholder:text-[#404040]/50",
  },

  submit: {
    input:
      "brand-gradient text-on-accent h-[62px] font-bold text-[22px] rounded-btn shadow-black-15 px-[52px] transition duration-300 ease-[var(--ease-brand)]",
  },
});
