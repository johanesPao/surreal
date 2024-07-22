import { Node } from "mdast";
import util from "util";

export function printTree(node: Node, index?: number) {
  console.log(
    `Node${index ? ` index ${index}` : ""}: `,
    util.inspect(node, { showHidden: false, depth: null, colors: true })
  );
}
