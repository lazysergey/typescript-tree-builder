import './styles/style.css';
import './styles/style-tree.css';
import { Person } from "./person";
import { PersonTree } from "./person-tree";
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



const treeBuilder = new PersonTree(people);

const inputHandler = new InputHandler();
inputHandler.onKeyUp().subscribe(data => 
  inputHandler.result = treeBuilder.findRelations(data.input1, data.input2)
);
