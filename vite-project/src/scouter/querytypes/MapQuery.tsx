import { useRef, useState } from "react";

interface MapQueryProps {
  width: number;
  height: number;
  imagePath: string;
}
type Point = {
  x: number;
  y: number;
  color: string;
};

const MapQuery: React.FC<MapQueryProps> = ({ width, height, imagePath }) => {
  const [points, setPoints] = useState<Point[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  function draw(ctx: CanvasRenderingContext2D | null, clickedPoint: Point) {
    if (ctx) {
      ctx.fillStyle = clickedPoint.color;
      ctx.beginPath();
      ctx.arc(clickedPoint.x / 5, clickedPoint.y / 5, 20, 0, 2 * Math.PI);
      ctx.fill();
      console.log(clickedPoint);
    }
  }
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    const clickedPoint: Point = { x: clientX, y: clientY, color: "#000000" };
    setPoints([...points, clickedPoint]);

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      var background = new Image();
      background.src = imagePath;
      if (context) {
        background.onload = function () {
          context.drawImage(background, 0, 0);
        };
      }

      draw(context, clickedPoint);
    }
  }

  return (
    <>
      <br />
      <div
        onClick={handleClick}
        style={{
          // backgroundImage: 'url("' + imagePath + '")',
          width: width,
          height: height,
          position: "relative",
        }}
      >
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </>
  );
};
export default MapQuery;
