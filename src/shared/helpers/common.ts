export function generateRandomValue(min:number, max:number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  if (items.length === 0) {
    return [];
  }

  const startIndex = generateRandomValue(0, items.length - 1);
  const endIndex = generateRandomValue(startIndex + 1, items.length);

  return items.slice(startIndex, endIndex);
}

export function getRandomItem<T>(items:T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}
