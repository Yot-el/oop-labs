export const debounce = (callback: Function, delay: number) => {
  let timeoutId: any;

  return (...rest: Array<any>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, ...rest), delay);
  };
}

export const compareSets = <T>(first: Set<T>, second: Set<T>): boolean => {
  if (first.size !== second.size) {
    return false;
  }

  const difference = new Set([...first].filter((key) => !second.has(key)));
  if (difference.size) {
    return false;
  }

  return true;
}

export const parseKeysString = (keys: string): Set<string> => {
  return new Set(keys.trim().split('+'));
}

export const parseKeysSet = (keys: Set<string>): string => {
  return [...keys].join('+');
}