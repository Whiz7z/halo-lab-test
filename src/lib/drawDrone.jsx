export const drawDrone = (ctx, droneX) => {
  //const centerX = ctx.canvas.width / 2;
  const droneHeight = 15;
  const droneWidth = 10;
  const droneTopY = 0; // Fixed position at the top of the canvas

  ctx.fillStyle = "limegreen";
  ctx.beginPath();
  ctx.moveTo(droneX, droneHeight); // Top point of the triangle
  ctx.lineTo(droneX - droneWidth, droneTopY); // Bottom left
  ctx.lineTo(droneX + droneWidth, droneTopY); // Bottom right
  ctx.closePath();
  ctx.fill();
};
