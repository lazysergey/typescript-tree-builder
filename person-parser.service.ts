import { Person } from "./person";

export const people = {
  John: ["David", "Bob"],
  Bob: ["Alex", "Sergei"],
  Ben: ["John", "Ron"],
  Sergei: ["Jenia", "Kalin"],
  Mark: ["Josef"],
}

export class PersonsParseService {
  public personsParsed: Person[] = [];
  private iterator = 0;
  constructor(private personsInput) { }

  parsePersons(): Person[] {
    this.findRoots().forEach(
      root => {
        this.createNodes(root);
      }
    );
    return this.personsParsed;
  }

  private createNodes(name: string, parent: Person = null) {
    let arrayForCurrentNode = parent ? parent.children : this.personsParsed;
    const newPerson = new Person(name, parent ? parent : null, [], (parent ? (parent.depth + 1) : 0));
    arrayForCurrentNode.push(newPerson);
    if (this.personsInput[name]) {
      this.personsInput[name].forEach(child => {
        this.createNodes(child, newPerson);
      });
    }
  }

  private findRoots() {
    let allChildrenIds = [];
    let allParentsIds = [];
    Object.keys(this.personsInput).forEach(person => {
      allParentsIds.push(person);
      let currentChildren = this.personsInput[person];
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

  public findRelations(tree: Person[], name1: string, name2: string) {
    let branchForName1, branchForName2;
    tree.find(branch => {
      const namesArr = branch.descendants.map(a => a.name);
      return !!(namesArr.indexOf(name1) + 1);// || 
    })
  }

  nodeSearch(treeNodes, searchID) {
    for (var nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      var currentNode = treeNodes[nodeIdx],
        currentId = currentNode.id,
        currentChildren = currentNode.children;
      console.log("Comparing treeNodes element with ID==" +
        currentId + " to SearchID==" + searchID);
      if (currentId == searchID) {
        console.log("Match!");
        return currentNode;
      }
      else {
        console.log("No Match! Trying " + currentChildren.length +
          " Children of Node ID#" + currentId);
        var foundDescendant = this.nodeSearch(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }
    console.log("Done trying " + treeNodes.length + " children. Returning False");
    return false;
  };
}