export class Person {
  private _ancestors: Person[] | String[];
  private aname: string
  constructor(
    name: string,
    public parent: Person,
    public children: Person[],
    public depth: number
  ) {
    this._ancestors = [];
    this.aname = name
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

  get name(){
    return this.aname;
  }

  addChildren(child) {
    this.children.push(child);
  }

}