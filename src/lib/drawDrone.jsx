export const drawDrone = (ctx, droneX) => {
  const droneHeight = 15;
  const droneWidth = 10;
  const droneTopY = 0;

  ctx.fillStyle = "limegreen";
  ctx.beginPath();
  ctx.moveTo(droneX, droneHeight);
  ctx.lineTo(droneX - droneWidth, droneTopY);
  ctx.lineTo(droneX + droneWidth, droneTopY);
  ctx.closePath();
  ctx.fill();
};
