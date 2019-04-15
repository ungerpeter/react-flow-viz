export const objectToMap = (object: any): Map<string, any> => {
  const map = new Map();
  Object.keys(object).forEach((key) => {
    map.set(key, object[key]);
  });
  return map;
};

export const mapToObject = (map: Map<string, any>): any => {
  const object: { [key: string]: any } = {};
  for (const key of map.keys()) {
    object[key] = map.get(key);
  }
  return object;
};

export const cartesianProduct = (a: any[], b: any[]): any[] => {
  const product: any[] = [];
  if (!a || !b || !a.length || !b.length) {
    return product;
  }
  for (let idxA = 0; idxA < a.length; idxA++) {
    for (let idxB = 0; idxB < b.length; idxB++) {
      product.push([a[idxA], b[idxB]]);
    }
  }
  return product;
};

export const valuesChanged = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return true;
  let changed = false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      changed = true;
      break;
    }
  }
  return changed;
};

export const getPosition = (portRef: React.RefObject<HTMLDivElement>): DOMRect => {
  return (portRef && portRef.current ? 
    portRef.current.getBoundingClientRect() as DOMRect :
    new DOMRect()
  );
};

export const isSetsEqual = (a: Set<any>, b: Set<any>) => a.size === b.size && [...a].every(value => b.has(value));