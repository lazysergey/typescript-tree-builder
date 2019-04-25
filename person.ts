export class Person {
  private _descendants: Person[];
  private _name: string;
  private _parent: Person;
  private _children: Person[];
  private _depth: number;

  constructor(
    name: string,
    parent: Person,
    children: Person[],
    depth: number
  ) {
    console.log(`%c--- new Person: ${name} ---`, "border: 1px solid red;color: #444;");
    this._descendants = [];
    this._name = name;
    this._parent = parent;
    this._children = children;
    this._depth = depth;
    this._setDescendantsForAllParents();
  }

  get parent() {
    return this._parent;
  }

  get descendants() {
    return this._descendants;
  }

  get children() {
    return this._children;
  }

  get depth() {
    return this._depth;
  }

  get name() {
    return this._name;
  }

  addDescendant(descendant: Person) {
    this._descendants.push(descendant);
  }

  private _getRandomRGBColor() {
    return `rgb(${this._getRandomRGBChannelValue()}, ${this._getRandomRGBChannelValue()}, ${this._getRandomRGBChannelValue()})`;
  }

  private _getRandomRGBChannelValue() {
    const lowest = 0.8;
    return ((Math.random() * (1 - lowest) + lowest) * 255).toFixed(0);
  }

  private _setDescendantsForAllParents() {
    let node: Person = this;
    const color: string = this._getRandomRGBColor();
    while (node.parent) {
      console.log(`%cadding descendant: ${this.name} > ${node.parent.name} (depth: ${this._depth})`, `background: ${color}`);
      node.parent.addDescendant(this);
      node = node.parent;
    }
  }
}
