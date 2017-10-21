/* eslint-disable import/prefer-default-export */
export function calculateScore(correctAnswer, totalCards) {
  const rawScore = correctAnswer / totalCards;
  return Number(rawScore * 100).toFixed(2);
}
