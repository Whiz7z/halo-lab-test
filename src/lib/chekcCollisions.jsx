//import { Coordinates } from "./drawSegment";

export const checkCollision = (caveData, offsetY, droneX) => {
  const droneYIndex = Math.floor(offsetY / 10);
  if (droneYIndex >= caveData.length) return false;
  const [leftWall, rightWall] = caveData[droneYIndex];

  if (500 - droneX - 10 < 250 - rightWall) {
    return true;
  }

  if (500 - droneX + 10 > 250 - leftWall) {
    return true;
  }
};
