#!/usr/bin/env node
import LL from './linkedList.js';
import { assertEquals } from './assertions.js'

export default class Queue {
  constructor() {
    this.list = new LL();
  }

  enqueue(v) {
    this.list.append(v);
  }

  dequeue() {
    if (this.list.length === 0) throw new Error('empty queue')
    const value = this.list.head.value;
    this.list.remove(0);
    return value;
  }

  peek() {
    if (this.list.length === 0) throw new Error('empty queue')
    return this.list.head.value
  }

  size() {
    return this.list.length;
  }
}

function main() {
  const q = new Queue();
  q.enqueue(10);
  q.enqueue(1);
  q.enqueue(5);
  assertEquals(q.size(), 3);
  assertEquals(q.peek(), 10);
  assertEquals(q.size(), 3);
  assertEquals(q.dequeue(), 10);
  assertEquals(q.size(), 2);
  assertEquals(q.dequeue(), 1);
  assertEquals(q.size(), 1);
  assertEquals(q.dequeue(), 5);
  assertEquals(q.size(), 0);
}

// main();