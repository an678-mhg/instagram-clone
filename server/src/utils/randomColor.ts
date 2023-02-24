function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const hexColor = r.toString(16) + g.toString(16) + b.toString(16);

  return hexColor;
}

export default getRandomColor;
