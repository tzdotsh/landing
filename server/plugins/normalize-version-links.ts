/**
 * The shared shell still renders its two logo links directly from the legacy
 * `/v{version}` project value (they bypass useFormatLink). Normalize those
 * SSR/prerendered hrefs at the HTML boundary until the shared shell is
 * unversioned too, so crawlers never discover a redirecting internal URL.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    for (const section of [
      html.head,
      html.body,
      html.bodyAppend,
      html.bodyPrepend,
    ]) {
      for (let index = 0; index < section.length; index += 1) {
        section[index] = section[index]!.replace(
          /href=(["'])\/(?:(en-en|es-es|pt-pt)\/)?v\d+\1/g,
          (_match, quote: string, locale?: string) =>
            `href=${quote}/${locale ?? ""}${quote}`,
        );
      }
    }
  });
});
