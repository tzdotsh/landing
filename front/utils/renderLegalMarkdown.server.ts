import { parseMarkdown } from "@nuxtjs/mdc/runtime";

type MdcNode = {
  type: string;
  tag?: string;
  value?: string;
  props?: Record<string, unknown>;
  children?: MdcNode[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderProps(props: Record<string, unknown> = {}) {
  return Object.entries(props)
    .filter(([, value]) => value != null && value !== false)
    .map(([key, value]) => {
      if (value === true) {
        return ` ${key}`;
      }

      return ` ${key}="${escapeHtml(String(value))}"`;
    })
    .join("");
}

function renderMdcAst(node: MdcNode): string {
  if (node.type === "text") {
    return escapeHtml(node.value ?? "");
  }

  if (node.type === "comment") {
    return "";
  }

  if (node.type === "root" || node.type === "element") {
    const tag = node.tag ?? "div";
    const children = (node.children ?? []).map(renderMdcAst).join("");

    return `<${tag}${renderProps(node.props)}>${children}</${tag}>`;
  }

  return "";
}

export async function renderLegalMarkdown(content: string) {
  const ast = await parseMarkdown(content);

  if (!ast?.body) {
    return "";
  }

  return renderMdcAst(ast.body);
}
