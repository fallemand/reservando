const format = (node, level) => {
  const indentBefore = new Array(level++ + 1).join("  "); // eslint-disable-line no-plusplus, no-param-reassign
  const indentAfter = new Array(level - 1).join("  ");
  let textNode;
  for (let i = 0; i < node.children.length; i++) {
    // eslint-disable-line no-plusplus
    textNode = document.createTextNode(`\n${indentBefore}`);
    node.insertBefore(textNode, node.children[i]);
    format(node.children[i], level);
    if (node.lastElementChild === node.children[i]) {
      textNode = document.createTextNode(`\n${indentAfter}`);
      node.appendChild(textNode);
    }
  }
  return node;
};

const process = (str) => {
  const div = document.createElement("div");
  div.innerHTML = str ? str.trim() : "";
  return format(div, 0).innerHTML;
};

export default (wrapper) =>
  process(wrapper.html())
    .replace(/^\s*$(?:\r\n?|\n)/gm, "")
    .replace(/"/g, "'")
    .replace(/(((function .*\(.*\))|(\(.*\) =>))? {)(\n.*?)*(}')/gm, "[function cleaned]'");
