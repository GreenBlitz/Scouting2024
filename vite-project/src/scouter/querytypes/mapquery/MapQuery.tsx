import { useRef, useState } from "react";
import { MapButtonProps } from "./MapButton";

interface MapQueryProps {
  width: number;
  height: number;
  imagePath: string;
  children:
    | React.ReactElement<MapButtonProps>
    | React.ReactElement<MapButtonProps>[];
}
type Point = {
  x: number;
  y: number;
  color: string;
  data: Record<string, string>;
};

const MapQuery: React.FC<MapQueryProps> = ({
  width,
  height,
  imagePath,
  children,
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [pressedButtons, setPressedButtons] = useState<Record<string, string>>(
    {}
  );
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

  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const [clientX, clientY] = [event.pageX, event.pageY];
    const clickedPoint: Point = {
      x: clientX - event.currentTarget.offsetLeft,
      y: clientY - event.currentTarget.offsetTop,
      color: "#000000",
      data: pressedButtons,
    };
    setPoints([...points, clickedPoint]);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      drawPoint(context, clickedPoint, 5);
    }
  }

  function putOnClickFunction(element: React.ReactElement<MapButtonProps>) {
    element.props.pick = (key, value) => {
      pressedButtons[key] = value;
      setPressedButtons(pressedButtons);
    };
  }
  return (
    <>
      <br />
      {Array.isArray(children)
        ? children.map(putOnClickFunction)
        : putOnClickFunction(children)}
      <div
        style={{
          backgroundImage: 'url("' + imagePath + '")',
          backgroundSize: "100% 100%",
          width: width,
          height: height,
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleClick}
        ></canvas>
      </div>
    </>
  );
};
export default MapQuery;
