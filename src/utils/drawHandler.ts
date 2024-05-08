function drawHandler(
  ctx: CanvasRenderingContext2D,
  posX: number,
  posY: number,
  width: number,
  height: number,
  handleSize: number
) {
  //handle
  ctx.strokeStyle = "blue";
  ctx.strokeRect(posX - 1.5, posY - 1.5, width + 3, height + 3);

  ctx.fillStyle = "blue";

  //top left
  ctx.fillRect(
    //
    posX - handleSize / 2 - 4,
    posY - handleSize / 2 - 4,
    handleSize + 3,
    handleSize + 3
  );

  //leftMiddle
  ctx.fillRect(
    posX - handleSize / 2 - 4,
    posY + height / 2 - 4,
    handleSize + 3,
    handleSize + 3
  );

  //top Middle
  ctx.fillRect(
    //
    posX + width / 2 - 4,
    posY - handleSize / 2 - 4,
    handleSize + 3,
    handleSize + 3
  );

  //rotation handler
  {
    ctx.beginPath();
    ctx.moveTo(posX + width / 2, posY - handleSize / 2);
    ctx.lineTo(posX + width / 2, posY - 30);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(posX + width / 2, posY - 30, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  ctx.fillStyle = "blue";
  //top right
  ctx.fillRect(
    posX + width - handleSize / 2 + 1,
    posY - handleSize / 2 - 4,
    handleSize + 3,
    handleSize + 3
  );

  //right mid
  ctx.fillRect(
    posX + width - handleSize / 2 + 1,
    posY + height / 2 - 4,
    handleSize + 3,
    handleSize + 3
  );

  //bottom right
  ctx.fillRect(
    posX + width - handleSize / 2 + 1,
    posY + height - handleSize / 2 + 1,
    handleSize + 3,
    handleSize + 3
  );

  //bottom left
  ctx.fillRect(
    posX - handleSize / 2 - 4,
    posY + height - handleSize / 2 + 1,
    handleSize + 3,
    handleSize + 3
  );

  //bottom mid
  ctx.fillRect(
    posX + width / 2 - 4,
    posY + height - handleSize / 2 + 1,
    handleSize + 3,
    handleSize + 3
  );
}

export { drawHandler };
