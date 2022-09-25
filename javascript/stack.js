#!/usr/bin/env node
import LL from './linkedList.js';
import { assertEquals } from './assertions.js'

export class StackArrayBased {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  pop() {
    return this.values.pop();
  }

  peek() {
    return this.values[this.size() - 1];
  }

  push(value) {
    this.values.push(value);
  }
}

export class StackListBased {
  constructor() {
    this.values = new LL();
  }

  size() {
    return this.values.length;
  }

  pop() {
    if (this.size() === 0) throw new Error('empty list');
    return this.values.remove(this.size() - 1);
  }

  peek() {
    if (this.size() === 0) throw new Error('empty list');
    return this.values.tail.value;
  }

  push(value) {
    this.values.append(value);
  }
}

function main(Impl) {
  const sa = new Impl();
  sa.push(10);
  sa.push(1);
  sa.push(5);
  assertEquals(sa.size(), 3);
  assertEquals(sa.peek(), 5);
  assertEquals(sa.pop(), 5);
  assertEquals(sa.pop(), 1);
  assertEquals(sa.pop(), 10);
  assertEquals(sa.size(), 0);
}

main(StackListBased);