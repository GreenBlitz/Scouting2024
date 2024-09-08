import { useRef, useState } from "react";

//In my home computer it is 20 for some reason?? im gonna have to understand why
const HEIGHT_IMAGE_OFFSET = 0;

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
  function drawPoint(
    context: CanvasRenderingContext2D | null,
    clickedPoint: Point,
    pointRadius: number
  ) {
    if (context) {
      context.fillStyle = clickedPoint.color;
      context.beginPath();
      context.arc(clickedPoint.x, clickedPoint.y, pointRadius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    const clickedPoint: Point = {
      x: clientX - event.currentTarget.offsetLeft,
      y: clientY - event.currentTarget.offsetTop + HEIGHT_IMAGE_OFFSET,
      color: "#000000",
    };
    setPoints([...points, clickedPoint]);

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      drawPoint(context, clickedPoint, 5);
    }
  }

  return (
    <>
      <br />
      <div
        onClick={handleClick}
        style={{
          backgroundImage: 'url("' + imagePath + '")',
          backgroundSize: "100% 100%",
          width: width,
          height: height,
        }}
      >
        <canvas ref={canvasRef} width={width} height={height}></canvas>
      </div>
    </>
  );
};
export default MapQuery;
