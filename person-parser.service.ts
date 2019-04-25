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
    // let root;
    // this.personsInput.forEach(p => {
    // this.personsParsed.
    // console.log(Object.keys(p)[0])
    // for (var key in p) {
    //   console.log(key);
    //   if (this.personsParsed) {
    //     this.personsParsed.push(new Person(key, null, p[key]))
    //   }
    //   this.personsParsed
    // }
    // })
    this.findRoots().forEach(
      r => {
        // console.log(r);
        const currentChildrenIds = this.personsInput[r];
        this.createNodes(r);
        // currentChildrenIds.forEach()//recursive
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
        
        console.log(`%ccreating ${newPerson.name}`, "background: black;color: white;padding:5px;");
        this.setAncestorsForAllParents(newPerson, Math.random() * 255, Math.random() * 255, Math.random() * 255);
      });
    }
  }

  private setAncestorsForAllParents(node: Person, color1, color2, color3) {
    let initialNode = node;
    while (node.parent) {
      console.log(`%c${initialNode.name} (${initialNode.depth}) > ${node.parent.name}`, `background: rgba(${color1.toFixed(0)},${color2.toFixed(0)},${color3.toFixed(0)})`);
      node.parent.addAncestor(initialNode);
      node = node.parent;
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

  // list_to_tree() {
  //   let list = this.personsInput;
  //   var map = {}, node, roots = [], i;
  //   for (i = 0; i < list.length; i += 1) {
  //     map[list[i].id] = i; // initialize the map
  //     list[i].children = []; // initialize the children
  //   }
  //   for (i = 0; i < list.length; i += 1) {
  //     node = list[i];
  //     if (node.parentId !== "0") {
  //       // if you have dangling branches check that map[node.parentId] exists
  //       list[map[node.parentId]].children.push(node);
  //     } else {
  //       roots.push(node);
  //     }
  //   }
  //   return roots;
  // }

}