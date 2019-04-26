  import { Person } from "./person";

  export class TreeBuilderService {
    private _tree: Person[] = [];
    private _input: { [name: string]: string[] };
    constructor() { }

    buildTree(input): Person[] {
      this._input = input;
      this._parseRoots().forEach(
        root => {
          this._createNodes(root);
        }
      );
      this._tree.forEach(node => {
        this._buildHtml(node, null);
      });
      return this._tree;
    }

    private _buildHtml(node: Person, parentElement: HTMLElement) {
      parentElement = parentElement ? parentElement.querySelector('li') : document.getElementById('tree');
      const newUlElement = document.createElement("ul");
      newUlElement.innerHTML += `<li title="depth: ${node.depth}">${node.name}</li>`;
      parentElement.append(newUlElement);
      node.children.forEach(
        child => this._buildHtml(child, newUlElement || parentElement)
      )
    }

    private _createNodes(name: string, parent: Person = null) {
      let arrayForCurrentNode = parent ? parent.children : this._tree;
      const newPerson = new Person(name, parent ? parent : null, [], (parent ? (parent.depth + 1) : 0));
      arrayForCurrentNode.push(newPerson);
      if (this._input[name]) {
        this._input[name].forEach(child => {
          this._createNodes(child, newPerson);
        });
      }
    }

    private _parseRoots() {
      let allChildrenIds = [];
      let allParentsIds = [];
      Object.keys(this._input).forEach(person => {
        allParentsIds.push(person);
        let currentChildren = this._input[person];
        currentChildren.forEach(childId => {
          allChildrenIds.push(childId);
        })
      });

      allChildrenIds.forEach(c => {
        const parentIndex = allParentsIds.findIndex(p => p == c);
        if (parentIndex >= 0) {
          allParentsIds.splice(parentIndex, 1)
        }
      })
      return allParentsIds;
    }

    public findRelations(name1: string, name2: string) {
      let person1: Person = this.findPerson(name1);
      if (!person1) {
        return `${name1} not found`;
      }
      let person2: Person = this.findPerson(name2);
      if (!person2) {
        return `${name2} not found`;
      }
      
      let depth = this._getDepthDelta(person1, person2);    
      let relationKey;
      if (!depth) {
        return "Not relatives";
      } else if (depth < 0) {
        if (person1.descendants.includes(person2)){
          relationKey = "Father";
        } else {
          relationKey = "Uncle"
        }
      } else {
        if (person2.descendants.includes(person1)){
          relationKey = "Child";
        } else {
          relationKey = "Nephew"
        }
      }
      return `${person1.name} is <span>${"Grand".repeat(Math.abs(depth) - 1)}${relationKey}</span> of ${person2.name}`
    }

    private _getDepthDelta(person1: Person, person2: Person): number {
      return person1.depth - person2.depth;
    }

    public findPerson(nameToSearch: string): Person {
      let root = this.findRoot(nameToSearch);
      return root ? this.searchRecursively(root, nameToSearch) : null;
    }

    public findRoot(nameToSearch) {
      return this._tree.find(root => root.descendants.map(d => d.name.toLowerCase()).includes(nameToSearch.toLowerCase()) || root.name.toLowerCase() == nameToSearch.toLowerCase());
    }

    private searchRecursively(person, nameToSearch): Person {
      if (person.name.toLowerCase() == nameToSearch.toLowerCase()) {
        return person;
      } else if (person.children) {
        let result = null;
        for (let i = 0; result == null && i < person.children.length; i++) {
          result = this.searchRecursively(person.children[i], nameToSearch);
        }
        return result;
      }
      return null;
    }
  }