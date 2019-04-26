import { Person } from "./person";

export class TreeBuilderService {
  private _result: Person[] = [];
  private _input: { [name: string]: string[] };
  constructor() { }

  buildTree(input): Person[] {
    this._input = input;
    this._findRoots().forEach(
      root => {
        this._createNodes(root);
      }
    );

    this._result.forEach(node => {
      this._buildHtml(node, null);
    });

    return this._result;
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
    let arrayForCurrentNode = parent ? parent.children : this._result;
    const newPerson = new Person(name, parent ? parent : null, [], (parent ? (parent.depth + 1) : 0));
    arrayForCurrentNode.push(newPerson);
    if (this._input[name]) {
      this._input[name].forEach(child => {
        this._createNodes(child, newPerson);
      });
    }
  }

  private _findRoots() {
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

  // public findRelations(tree: Person[], name1: string, name2: string) {
  //   let branchForName1, branchForName2;
  //   tree.find(branch => {
  //     const namesArr = branch.descendants.map(a => a.name);
  //     return !!(namesArr.indexOf(name1) + 1);// || 
  //   })
  // }

  // nodeSearch(treeNodes, searchID) {
  //   for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
  //     var currentNode = treeNodes[nodeIdx],
  //       currentId = currentNode.id,
  //       currentChildren = currentNode.children;
  //     console.log("Comparing treeNodes element with ID==" +
  //       currentId + " to SearchID==" + searchID);
  //     if (currentId == searchID) {
  //       console.log("Match!");
  //       return currentNode;
  //     }
  //     else {
  //       console.log("No Match! Trying " + currentChildren.length +
  //         " Children of Node ID#" + currentId);
  //       var foundDescendant = this.nodeSearch(currentChildren, searchID);
  //       if (foundDescendant) {
  //         return foundDescendant;
  //       }
  //     }
  //   }
  //   console.log("Done trying " + treeNodes.length + " children. Returning False");
  //   return false;
  // };
}