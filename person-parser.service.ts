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
      r => {
        this.createNodes(r);
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

}