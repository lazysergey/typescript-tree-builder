import './styles/style.css';
import './styles/style-tree.css';
import { Person } from "./person";
import { TreeBuilderService } from "./tree-builder.service";
import { InputHandler } from "./input-handler";

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



const treeBuilder = new TreeBuilderService();
const tree: Person[] = treeBuilder.buildTree(people);

const inputHandler = new InputHandler();
inputHandler.onKeyUp().subscribe(data => 
  inputHandler.result = treeBuilder.findRelations(data.input1, data.input2)
);

console.log("========== DONE ==========");
// console.log(tree);
// console.log(treeBuilder.findPerson('Josef'))
// console.log(treeBuilder.findPerson('Josf'))
// console.log(treeBuilder.findRoot('Ron'))
console.log(treeBuilder.findRelations("Josef", "Mark"));
console.log(treeBuilder.findRelations("Ben", "Kalin"));
console.log(treeBuilder.findRelations("Kalin","Ben"));
console.log(treeBuilder.findRelations("David", "Kalin"));
console.log("==========================");

