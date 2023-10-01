function getValueByDotKey(obj, key) {
    const keys = key.split('.');
    let result = obj;
  
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return undefined; // Key not found
      }
    }
  
    return result;
  }
  
  // Example usage:
  const object1 = { a: { b: { c: { d: 'e' } } } };
  const key1 = 'a.b.c.d';
  const value1 = getValueByDotKey(object1, key1);
  console.log(value1); // Output: "d"
  
  const object2 = { x: { m: { z: 'y' } } };
  const key2 = 'x.m.z';
  const value2 = getValueByDotKey(object2, key2);
  console.log(value2); 
  