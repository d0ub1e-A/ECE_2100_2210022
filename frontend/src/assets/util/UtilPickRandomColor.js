const randomColorList = ['bg-[#08a0fe]', 'bg-[#b6f745]', 'bg-[#f9ea70]', 'bg-[#e0be8f]', 'bg-[#e0a758]', 'bg-[#13e3f4]'];

export function pickAColor() {
  const randomIndex = Math.floor(Math.random() * 6);
  const randomColor = randomColorList[randomIndex];

  return randomColor;
}