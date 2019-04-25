export class Person {
  private _ancestors: Person[];
  private aname: string
  constructor(
    name: string,
    public parent: Person,
    public children: Person[],
    public depth: number
  ) {
    console.log(`%ccreating ${name}`, "background: black;color: white;padding:5px;");
    this._ancestors = [];
    this.aname = name;
    this.setAncestorsForAllParents(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }

  getParent() {
    return this.parent;
  }

  get ancestors() {
    return this._ancestors;
  }

  addAncestor(ancestor: Person) {
    // console.log(`pushing ancestor: ${ancestor.name} to: ${this.name} depth: ${this.depth}`)
    this._ancestors.push(ancestor.name);
  }

  get name() {
    return this.aname;
  }

  addChildren(child) {
    this.children.push(child);
  }

  private setAncestorsForAllParents(color1, color2, color3) {
    let node = this;
    while (node.parent) {
      console.log(`%c${this.name} (${this.depth}) > ${node.parent.name}`, `background: rgba(${color1.toFixed(0)},${color2.toFixed(0)},${color3.toFixed(0)})`);
      node.parent.addAncestor(this);      
      node = node.parent; 
    }
  }


}