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
    const depth = this._getDepthDifference(name1, name2);
    let relationKey;
    if(!depth){
      return "not relatives";
    }
    if(depth < 0) {
      relationKey = "Father";
    } else {
      relationKey = "Child";
    }      
    return `${name1} is ${"Grand".repeat(Math.abs(depth) - 1)}${relationKey} of ${name2}`
  }

  private _getDepthDifference(name1: string, name2: string){
    let person1: Person, person2: Person;
    if(this._isInSameRoot(name1, name2)){
      person1 = this.findPerson(name1);
      // console.log(person1);
      person2 = this.findPerson(name2);
      //  console.log(person2);
      return person1.depth - person2.depth;
    } else {
      return null;
    }
  }

  private _isInSameRoot(name1, name2){
    const root1 = this.findRoot(name1);
    // console.log(root1)
    const root2 = this.findRoot(name2);
    // console.log(root2);
    // console.log("sameroot: ",root1 === root2);
    return root1 === root2;
  }

  public findPerson(nameToSearch: string) {
    let root = this.findRoot(nameToSearch);
    return root? this.searchRecursively(root, nameToSearch) : null;
  }

  public findRoot(nameToSearch){
    return this._tree.find(root => root.descendants.map(d => d.name).includes(nameToSearch) || root.name == nameToSearch);
  }

  private searchRecursively(person, nameToSearch) {
    if (person.name == nameToSearch) {
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