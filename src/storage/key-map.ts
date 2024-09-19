export const keyMap = new Map();

const incrementKeyCount = (key: string) => {
  keyMap.set(key, (keyMap.get(key) || 0) + 1);
};

const getKeyCount = (key: string) => {
  console.log(keyMap);
  return keyMap.get(key) || 0;
};

export { getKeyCount, incrementKeyCount };
