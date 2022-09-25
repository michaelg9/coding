#!/usr/bin/env node
import { assertEquals, assertArrayEquals } from './assertions.js'

export default class HashTableListBased {
  constructor(length = 13) {
    this.length = length;
    this.list = new Array(length);
    this.s = 0;
  }

  size() {
    return this.s;
  }

  _hash(key) {
    let hash = 0;
    for (let i =0; i < key.length; i++){
        hash = (hash + key.charCodeAt(i) * i) % this.length
    }
    return hash;
  }

  insert(key, value) {
    const hashedKey = this._hash(key);
    if (this.list[hashedKey] == null) {
      this.list[hashedKey] = [];
    }
    this.list[hashedKey].push({ key, value });
    this.s++;
  }

  lookup(key) {
    const hashedKey = this._hash(key);
    const bucket = this.list[hashedKey] || [];
    for (const { key: k, value } of bucket) {
      if (k === key) return value;
    }
    return null;
  }

  delete(key) {
    const hashedKey = this._hash(key);
    const bucket = this.list[hashedKey] || [];
    for (let i = 0; i < bucket.length; i++) {
      const { key: k } = bucket[i];
      if (key === k) {
        bucket.splice(i, 1);
        this.s--;
        return true;
      }
    }
    return false;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.length; i++) {
      const bucket = this.list[i] || [];
      for (const item of bucket) {
        entries.push(item);
      }
    }
    return entries;
  }

  keys() {
    return this.entries().map(k => k.key);
  }

  values() {
    return this.entries().map(k => k.value);
  }
}

function main() {
  const m = new HashTableListBased();
  assertEquals(m.size(), 0);
  m.insert('hello', 'darkness');
  assertEquals(m.size(), 1);
  assertEquals(m.lookup('hello'), 'darkness');
  assertEquals(m.delete('hello'), true);
  assertEquals(m.size(), 0);
  m.insert('name', 'george');
  m.insert('surname', 'iakovidis');
  m.insert('age', 28);
  assertEquals(m.size(), 3);
  assertArrayEquals(m.keys(), ['name', 'surname', 'age']);
  assertArrayEquals(m.values(), ['george', 'iakovidis', 28]);

}

main();