import React, { useRef, useEffect } from "react";

export interface Point {
  x: number;
  y: number;
}

export interface RadarInput {
  name: string;
  value: number;
  max: number;
}

export interface RadarComponentProps {
  inputs: RadarInput[];
  width: number;
}

export const RadarComponent: React.FC<RadarComponentProps> = ({
  inputs,
  width,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //function that draws the outer regular polygos

  function drawOuterPolygon(
    polygonRadius: number,
    canvas: HTMLCanvasElement
  ): Point[] {
    const context = canvas.getContext("2d");
    const canvasRadius: number = canvas.width / 2;
    const polygonPoints: Point[] = new Array(inputs.length);

    if (!context) {
      return polygonPoints;
    }
    context.beginPath();

    for (let i = 0; i < inputs.length + 1; i++) {
      const currentX: number =
        polygonRadius * Math.sin((i * Math.PI * 2) / inputs.length) +
        canvasRadius;
      const currentY: number =
        polygonRadius * Math.cos((i * Math.PI * 2) / inputs.length) +
        canvasRadius;

      context.lineTo(currentX, currentY);
      context.lineTo(canvasRadius, canvasRadius);
      context.lineTo(currentX, currentY);

      polygonPoints[i] = { x: currentX, y: currentY };
    }
    context.closePath();
    context.stroke();

    return polygonPoints;
  }

  //function that draws the inner regular polygos

  function drawInnerPolygon(
    polygonRadius: number,
    canvas: HTMLCanvasElement
  ): Point[] {
    const context = canvas.getContext("2d");
    const canvasRadius: number = canvas.width / 2;
    const polygonPoints: Point[] = new Array(inputs.length);

    if (!context) {
      return polygonPoints;
    }
    context.beginPath();

    for (let i = 0; i < inputs.length + 1; i++) {
      const currentX: number =
        polygonRadius * Math.sin((i * Math.PI * 2) / inputs.length) +
        canvasRadius;
      const currentY: number =
        polygonRadius * Math.cos((i * Math.PI * 2) / inputs.length) +
        canvasRadius;

      context.lineTo(currentX, currentY);

      polygonPoints[i] = { x: currentX, y: currentY };
    }
    context.closePath();
    context.stroke();

    return polygonPoints;
  }

  // Places regularly-spaced labels around

  function drawLables(polygonRadius: number, canvas: HTMLCanvasElement): void {
    const context = canvas.getContext("2d");
    const canvasRadius: number = canvas.width / 2;

    for (let i = 0; i < inputs.length; i++) {
      const currentX: number =
        polygonRadius * Math.sin((i * Math.PI * 2) / inputs.length) +
        canvasRadius;
      const currentY: number =
        polygonRadius * Math.cos((i * Math.PI * 2) / inputs.length) +
        canvasRadius;

      if (!context) {
        return;
      }
      context.fillText(inputs[i].name, currentX, currentY);
    }
  }

  //functions that findes stat points
  function findeStatPoints(
    canvas: HTMLCanvasElement,
    polygonPoints: Point[]
  ): Point[] {
    const statPoints: Point[] = new Array(inputs.length);

    for (let i = 0; i < inputs.length; i++) {
      const canvasRadius: number = canvas.width / 2;

      let k = inputs[i].value;
      const l = inputs[i].max - inputs[i].value;

      const currentX: number =
        (canvasRadius * l + polygonPoints[i].x * k) / inputs[i].max;
      const currentY: number =
        (canvasRadius * l + polygonPoints[i].y * k) / inputs[i].max;

      statPoints[i] = { x: currentX, y: currentY };
    }

    return statPoints;
  }

  // function that draws inner shape and fills it in
  function drawStatPolygon(
    context: CanvasRenderingContext2D,
    statPoints: Point[]
  ): void {
    context.beginPath();

    for (let i = 0; i < inputs.length; i++) {
      context.lineTo(statPoints[i].x, statPoints[i].y);
    }

    context.lineTo(statPoints[0].x, statPoints[0].y);

    context.closePath();
  }

  //function that places the 10-100 digit
  function placeStatDigits(context: CanvasRenderingContext2D): void {
    const canvasRadius: number = context.canvas.width / 2;
    const polygonRadius: number = canvasRadius * 0.75;

    const digitPoint: Point = {
      x: polygonRadius + polygonRadius / 3.35,
      y: polygonRadius + polygonRadius / 2.3,
    };

    for (let i = 1; i <= 10; i++) {
      context.font = canvasRadius / 27 + "px Arial";
      context.strokeText(String(i * 10), digitPoint.x, digitPoint.y);

      context.fill();

      context.font = canvasRadius / 27 + "px Arial";
      context.fillText(String(i * 10), digitPoint.x, digitPoint.y);

      context.fill();

      digitPoint.y = digitPoint.y + polygonRadius / 10;
      context.moveTo(digitPoint.x, digitPoint.y);
    }
  }

  // draws the commponent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.width = width;
    canvas.height = width;

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    const canvasRadius: number = canvas.width / 2;
    const polygonRadius: number = canvasRadius * 0.75;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draws the inner polygons

    context.moveTo(canvasRadius, canvasRadius);

    context.beginPath();
    context.lineWidth = 1.5;

    context.strokeStyle = "gray";
    for (var i = 1; i < 10; i++) {
      drawInnerPolygon((polygonRadius * i) / 10, canvas);
      context.moveTo(canvasRadius, canvasRadius);
    }

    context.closePath();

    //draws the outter polygon

    context.beginPath();

    context.lineWidth = 3;
    context.strokeStyle = "white";

    const polygonPoints: Point[] = drawOuterPolygon(polygonRadius, canvas);

    context.closePath();

    //puts lablse on the corners

    context.beginPath();
    context.fillStyle = "white";
    context.font = canvasRadius / 27 + "px Arial";

    drawLables(polygonRadius * 1.21, canvas);

    context.closePath();
    context.lineWidth = 3;
    context.fill();
    context.stroke();

    //findes stat points

    context.beginPath();

    const statPoints: Point[] = findeStatPoints(canvas, polygonPoints);

    context.closePath();

    // draws inner shape and fills it in

    context.fillStyle = "rgb(96, 190, 235, 0.5)";
    drawStatPolygon(context, statPoints);

    context.lineWidth = 3;
    context.stroke();
    context.fill();

    //places the 10-100 digit

    context.beginPath();

    context.fillStyle = "white";
    context.strokeStyle = "black";

    placeStatDigits(context);

    context.closePath();
  });

  return (
    <>
      <canvas id="Canvas" ref={canvasRef}></canvas>
    </>
  );
};
export default RadarComponent;
