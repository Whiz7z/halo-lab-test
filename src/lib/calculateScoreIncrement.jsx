export const calculateScoreIncrement = (
  droneVerticalSpeed = 1,
  complexity,
  scoreMultiplier = 1
) => {
  return Number(scoreMultiplier * (droneVerticalSpeed + Number(complexity)));
};
