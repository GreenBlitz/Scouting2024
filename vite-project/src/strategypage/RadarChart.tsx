import React, { useRef, useEffect } from "react";

export interface point {
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
}

export const RadarComponent: React.FC<RadarComponentProps> = ({ inputs }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const polygonPoints: point[] = new Array(inputs.length);
  const statPoints: point[] = new Array(inputs.length);

  //function that draws the outer regular polygos

  function drawOuterPolygon(
    polygonRadius: number,
    canvas: HTMLCanvasElement,
    polygonPoints: point[],
    stokeColor: string
  ): void {
    const context = canvas.getContext("2d");
    const canvasRadius: number = canvas.width / 2;
    if (context) {
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

        const currentPoint: point = { x: currentX, y: currentY };

        polygonPoints[i] = currentPoint;
      }
      context.closePath();
      context.strokeStyle = stokeColor;
      context.stroke();
    }
  }

  //function that draws the inner regular polygos

  function drawInnerPolygon(
    polygonRadius: number,
    canvas: HTMLCanvasElement,
    stokeColor: string
  ): void {
    const context = canvas.getContext("2d");
    const canvasRadius: number = canvas.width / 2;
    if (context) {
      context.beginPath();

      for (let i = 0; i < inputs.length + 1; i++) {
        const currentX: number =
          polygonRadius * Math.sin((i * Math.PI * 2) / inputs.length) +
          canvasRadius;
        const currentY: number =
          polygonRadius * Math.cos((i * Math.PI * 2) / inputs.length) +
          canvasRadius;

        context.lineTo(currentX, currentY);

        const currentPoint: point = { x: currentX, y: currentY };

        polygonPoints[i] = currentPoint;
      }
      context.closePath();
      context.strokeStyle = stokeColor;
      context.stroke();
    }
  }

  //function that puts lables in a regular shape placement

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

      if (context) {
        context.fillText(inputs[i].name, currentX, currentY);
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const canvasRadius: number = canvas.width / 2;
        const polygonRadius: number = canvasRadius * 0.75;
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.moveTo(canvasRadius, canvasRadius);

        context.beginPath();
        context.lineWidth = 1.5;

        for (var i = 1; i < 10; i++) {
          drawInnerPolygon((polygonRadius * i) / 10, canvas, "gray");
          context.moveTo(canvasRadius, canvasRadius);
        }

        context.closePath();

        context.beginPath();

        context.lineWidth = 3;

        drawOuterPolygon(polygonRadius, canvas, polygonPoints, "white");

        context.closePath();

        context.beginPath();
        context.font = "15px Arial";

        //puts lablse on the corners
        drawLables(polygonRadius * 1.21, canvas);

        context.closePath();
        context.lineWidth = 3;
        context.fill();
        context.stroke();

        context.beginPath();

        //findes stat points
        for (let i = 0; i < inputs.length; i++) {
          var k = inputs[i].value;
          const l = inputs[i].max - inputs[i].value;

          const currentX: number =
            (canvasRadius * l + polygonPoints[i].x * k) / inputs[i].max;
          const currentY: number =
            (canvasRadius * l + polygonPoints[i].y * k) / inputs[i].max;

          const currentPoint: point = { x: currentX, y: currentY };
          statPoints[i] = currentPoint;
        }

        context.closePath();

        context.beginPath();
        context.fillStyle = "rgb(96, 190, 235, 0.5)";

        // draws inner shape and fills it in
        for (let i = 0; i < inputs.length; i++) {
          context.lineTo(statPoints[i].x, statPoints[i].y);
        }

        context.lineTo(statPoints[0].x, statPoints[0].y);

        context.closePath();
        context.lineWidth = 3;
        context.stroke();
        context.fill();

        context.beginPath();
        //places the 10-100 digit
        const digitPoint: point = {
          x: polygonRadius + polygonRadius / 3.35,
          y: polygonRadius + polygonRadius / 2.3,
        };

        context.strokeStyle = "black";
        context.fillStyle = "white";

        for (let i = 1; i <= 10; i++) {
          context.font = "15px Arial";
          context.strokeText(String(i * 10), digitPoint.x, digitPoint.y);

          context.fill();

          context.font = "15px Arial";
          context.fillText(String(i * 10), digitPoint.x, digitPoint.y);

          context.fill();

          digitPoint.y = digitPoint.y + polygonRadius / 10;
          context.moveTo(digitPoint.x, digitPoint.y);
        }
      }
    }
  });

  return (
    <>
      <canvas id="Canvas" ref={canvasRef} height="800" width="800"></canvas>
    </>
  );
};

export default RadarComponent;
