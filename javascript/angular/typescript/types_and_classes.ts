const myNum: number = 5;
const myString: string = "Hello Universe";
const myArr: Array<number> = [1, 2, 3, 4];

let myObj: { [key: string]: string | number } = { name: "Bill" };

let anythingVariable: any = "Hey";
anythingVariable = 25;

const arrayOne: boolean[] = [true, false, true, true];
const arrayTwo: any[] = [1, "abc", true, 2];
const arrayThree: (number | string | boolean)[] = [1, "abc", true, 2];

myObj = { x: 5, y: 10 };

class MyNode {
  private _priv: number;

  constructor(public val: number) {}
  doSomething(): void {
    this._priv = 10;
  }
}

var myNodeInstance = new MyNode(1);
