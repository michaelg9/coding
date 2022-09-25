#!/usr/bin/env node
import { assertEquals } from './assertions.js'

class Node {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this. previous = previous;
  }
}

 export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  reverse() {
    if (this.length === 0) return;
    let idx = 0;
    let previous = this.head;
    let next = previous.next;
    while (idx < this.length - 1) {
      const nextNext = next.next;
      next.next = previous;
      previous.previous = next;
      previous = next;
      next = nextNext;
      idx++;
    }
    const head = this.tail;
    this.tail = this.head;
    this.head = head;
    this.head.previous = null;
    this.tail.next = null;
  }

  insert(index, value) {
    if (this.length < index) throw new Error('wrong index');
    if (this.length === 0) {
      this.head = new Node(value, null, null);
      this.tail = this.head;
      this.length++;
      return;
    }
    const dummyHead =  new Node(null, this.head, null);
    let beforeNode = dummyHead;
    for (let c = 0; c < index; c ++) {
      beforeNode = beforeNode.next;
    }
    const nextNode = beforeNode.next;
    const newNode = new Node(value, nextNode, beforeNode);
    beforeNode.next = newNode;
    if (nextNode != null) nextNode.previous = newNode;
    else this.tail = newNode;
    if (index === 0) {
      this.head = newNode;
      this.head.previous = null;
    }
    dummyHead.next = null;
    this.length++;
  }

  append(value) {
    this.length++;
    const newNode = new Node(value, null, this.tail);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  prepend(value) {
    const newNode = new Node(value, this.head, null);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.head.previous = newNode;
    this.head = newNode;
    this.length++;
  }

  remove(idx) {
    if (idx < 0 || idx > this.length - 1) throw new Error('wrong index');
    if (this.length === 1) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }
    let cIdx = 0;
    let node = this.head;
    while (cIdx <  idx) {
      node = node.next;
      cIdx++;
    }
    const previous = node.previous;
    const next = node.next;
    node.next = null;
    node.previous = null;
    if (previous != null) {
      previous.next = next;
    } else {
      this.head = next;
    }
    if (next != null) {
      next.previous = previous;
    } else {
      this.tail = previous;
    }
    this.length--;
    return node.value;
  }

  toString() {
    if (this.length === 0) return '';
    const string = ['F: ', this.head.value];
    let node = this.head;
    while (node.next != null) {
      node = node.next;
      string.push('-->')
      string.push(node.value);
    }
    string.push('\nB: ');
    node = this.tail;
    string.push(node.value);
    while (node.previous != null) {
      node = node.previous;
      string.push('<--')
      string.push(node.value);
    }
    return string.join('');
  }
}

function main() {
  const list = new LinkedList();
  assertEquals(list.length, 0);
  list.append(3);
  assertEquals(list.length, 1);
  list.append(4);
  assertEquals(list.length, 2);
  list.append(5);
  assertEquals(list.length, 3);
  list.append(6);
  assertEquals(list.length, 4);
  list.prepend(1);
  assertEquals(list.length, 5);
  list.insert(1, 2);
  assertEquals(list.length, 6);
  const r = list.remove(4);
  assertEquals(r, 5);
  assertEquals(list.length, 5);
  list.reverse();
  assertEquals(list.length, 5);
  assertEquals(list.head.value, 6);
  assertEquals(list.tail.value, 1);
}

main();
