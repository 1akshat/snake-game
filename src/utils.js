
export const getRandomCoords = () => {
  const [min, max] = [1, 97];
  // Reference: https://gist.github.com/kerimdzhanov/7529623
  const xCord = Math.round((Math.random() * (max - min) + min)/2) * 2;
  const yCord = Math.round((Math.random() * (max - min) + min)/2) * 2;
  return [xCord, yCord]
}