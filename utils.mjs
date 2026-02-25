export const sortArrayinDescendingOrder = (a, b) => b[1] - a[1];

export const objectToArray = (obj) => {
  // Create empty arr
  const arr = [];
  // Loop through the object
  for (const key in obj) {
    arr.push([key, obj[key]]);
  }
  return arr;
};
