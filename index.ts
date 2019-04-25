import './style.css';
import { Person } from "./person";
import { people, PersonsParseService } from "./person-parser.service";

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log(new PersonsParseService(people).parsePersons());