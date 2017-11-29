// import * as AppModule from 'AppModule'; // import all from x
// import { SpecificLibraryObject } from 'assets'; // import 1 from x
// import { objectA, objectB } from 'filepath/LibaryName'; // import 2 from x
// import * as rxjs from 'rxjs';
// import observable from 'rxjs/observable';

export class MyClass {
  // TSLint syntax for variables
  myStringMC: 'This is a string';
  myNumberMC: 7;
  myBooleanMC: true;
  myNumArrayMC1: number[];
  myNumArrayMC2: Array<number>;
  anythingMC: any = 7;
}

// Platform syntax for variables
// var myString = 'This is a string';
// var myNumber = 7;
// var myBoolean = true;
// var myNumArray = number[];
// var myNumArray = Array<number>
// var anything: any = 7;

function testing() {
  let x = 10;
  console.log(x);
  x = 20;
}

if (true) {
  const x = 10;
  console.log(x);
}

const myobj = {
  a: 1,
  b: 2
};

myobj.a = 5;

// Never type never reaches the end of a function
function errorHandler(message: string): never {
  throw new Error(message);
}

// Void returns nothing
function printValue(val: string): void {
  console.log(val);
  return;
}

// Class construction using TS
class SLNode {
  val: number;

  constructor(valueP: number) {
    this.val = valueP;
  }
  doSomethingFun() {
    console.log('This is fun!');
  }
}

const firstSLNode = new SLNode(1);

// export { SampleClassA as NewClassName }; // Export a class with a different name.

// Alternative
// class SampleClassA {
//   sampleMethod(aStr: string): number {
//     return aStr.length();
//   }
// }

// class SampleClassB {
//   sampleMethod(aStr: string): number {
//     return aStr.length();
//   }
// }

// export { SampleClassA, SampleClassB }; // Export 2 Classes.
