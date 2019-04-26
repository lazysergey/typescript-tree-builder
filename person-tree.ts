import { Person } from "./person";

export class PersonTree {
  private _tree: Person[] = [];
  private _input: { [name: string]: string[] };

  constructor(input) { 
    this._buildTree(input);
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

  private _buildTree(input): Person[] {
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

  public findRelations(name1: string, name2: string) {
    let person1: Person = this._findPerson(name1);
    if (!person1) {
      return `${name1} not found`;
    }
    let person2: Person = this._findPerson(name2);
    if (!person2) {
      return `${name2} not found`;
    }

    if(!this._isInSameRoot(name1, name2)){
      return "Not relatives";
    }
    
    let depthDelta = this._getDepthDelta(person1, person2);    
    let relationKey;
    if (depthDelta < 0) {
      if (person1.descendants.includes(person2)){
        relationKey = "Father";
      } else {
        relationKey = "Uncle"
      }
    } else if (depthDelta > 0){
      if (person2.descendants.includes(person1)){
        relationKey = "Child";
      } else {
        relationKey = "Nephew"
      }
    } else {
      relationKey = "Brother";
    }
    return `${person1.name} is <span>${this._getGrandTItle(depthDelta)}${relationKey}</span> of ${person2.name}`
  }

  private _getGrandTItle(depthDelta: number):string{
    const repeatCount = depthDelta === 0 ? 0 : Math.abs(depthDelta) - 1;
    return "Grand".repeat(repeatCount);
  }

  private _getDepthDelta(person1: Person, person2: Person): number {
    return person1.depth - person2.depth;
  }
  private _isInSameRoot(name1: string, name2: string): boolean{	   
    return this._findRoot(name1) === this._findRoot(name2);	
  }

  private _findPerson(nameToSearch: string): Person {
    let root = this._findRoot(nameToSearch);
    return root ? this._searchRecursively(root, nameToSearch) : null;
  }

  private _findRoot(nameToSearch): Person {
    return this._tree.find(root => root.descendants.map(d => d.name.toLowerCase()).includes(nameToSearch.toLowerCase()) || root.name.toLowerCase() == nameToSearch.toLowerCase());
  }

  private _searchRecursively(person, nameToSearch): Person {
    if (person.name.toLowerCase() == nameToSearch.toLowerCase()) {
      return person;
    } else if (person.children) {
      let result = null;
      for (let i = 0; result == null && i < person.children.length; i++) {
        result = this._searchRecursively(person.children[i], nameToSearch);
      }
      return result;
    }
    return null;
  }
}