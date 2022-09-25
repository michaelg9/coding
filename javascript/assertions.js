
export function assertEquals(a,b) {
  if (a !== b) {
    throw new Error(`${a} is not equal to ${b}`);
  }
}

export function assertArrayEquals(a=[], b=[]) {
  if (a.length !== b.length) throw new Error(`${a} is not equal to ${b}`);
  for (const i of a) {
    if (!b.includes(i)) throw new Error(`${a} is not equal to ${b}`);
  }
  return true;
}