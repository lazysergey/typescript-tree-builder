import './style.css';
import { Person } from "./person";
import { TreeBuilderService } from "./tree-builder.service";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Tree Builder</h1>`;

const people = {
  John: ["David", "Bob"],
  Bob: ["Alex", "Sergei"],
  Ben: ["John", "Ron"],
  Sergei: ["Jenia", "Kalin"],
  Mark: ["Josef"],
};

const tree: Person[] = new TreeBuilderService().buildTree(people);


console.log("========== DONE ==========");
console.log(tree);
console.log("==========================");

tree.forEach(node => {
  treeToHtml(node, null);
});

function treeToHtml(node: Person, parentElement: HTMLElement) {
  parentElement = parentElement ? parentElement : document.getElementById('tree');
  const newUlElement = document.createElement("ul");
  newUlElement.innerHTML += `<li data-depth="${node.depth}">${node.name}</li>`;
  parentElement.append(newUlElement);
  node.children.forEach(
    child => treeToHtml(child, newUlElement || parentElement)
  )
}