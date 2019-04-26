import './styles/style.css';
import './styles/style-tree.css';
import { Person } from "./person";
import { PersonTree } from "./person-tree";
import { InputHandler } from "./input-handler";

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Tree Builder</h1>`;

const people = {
  John: ["David", "Bob"],
  Bob: ["Alex", "Sergei"],
  Ben: ["John", "Ron"],
  Sergei: ["Jenia", "Kalin"],
  Mark: ["Josef"],
};

const personTree = new PersonTree(people);

const inputHandler = new InputHandler();
inputHandler.onKeyUp().subscribe(data =>
  inputHandler.result = personTree.findRelations(data.input1, data.input2)
);

console.log("%cGenerated tree:", "background:rgba(0,255,0,0.5);padding:4px 8px; border-radius: 4px;", personTree.tree)
