import { useRef, useState } from "react";

interface MapQueryProps {
  name: string;
  width: number;
  height: number;
  imagePath: string;
  primaryButtons: Record<string, string>;
  seconderyButtons?: [string, string[]][];
}
interface Point {
  x: number;
  y: number;
  data: Record<string, string>;
}

const MapQuery: React.FC<MapQueryProps> = ({
  name,
  width,
  height,
  imagePath,
  primaryButtons,
  seconderyButtons,
}) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [pressedButtons, setPressedButtons] = useState<
    [string, Record<string, string>]
  >(["", {}]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const context = canvas ? canvas.getContext("2d") : null;

  function isAllFilled(): boolean {
    if (pressedButtons[0] === "") return false;
    for (let key of seconderyButtons || []) {
      if (!pressedButtons[1][key[0]]) {
        return false;
      }
    }
    return true;
  }
  function drawPoint(clickedPoint: Point, color: string, pointRadius: number) {
    if (context) {
      context.fillStyle = color;
      context.beginPath();
      context.arc(clickedPoint.x, clickedPoint.y, pointRadius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  function drawAllPoints() {
    for (let point of points) {
      drawPoint(point, primaryButtons[point.data["primary"]], 5);
    }
  }

  function removeLastPoint() {
    points.pop();
    setPoints((prev) => {
      prev = points;
      return [...prev];
    });
    context?.clearRect(0, 0, width, height);
    drawAllPoints();
  }

  function getPointsAsString(): string {
    let stringValue = "";
    for (let point of points) {
      stringValue += JSON.stringify(point);
    }
    return stringValue;
  }

  function addPoint(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!isAllFilled()) {
      return;
    }
    const [clientX, clientY] = [event.pageX, event.pageY];
    const clickedPoint: Point = {
      x: clientX - event.currentTarget.offsetLeft,
      y: clientY - event.currentTarget.offsetTop,
      data: {
        primary: pressedButtons[0],
        ...pressedButtons[1],
      },
    };
    setPoints((prev) => [...prev, clickedPoint]);
    drawPoint(clickedPoint, primaryButtons[pressedButtons[0]], 5);
  }

  return (
    <>
      <br />
      <div className={name + "-primary"}>
        {Object.entries(primaryButtons).map((option) => (
          <>
            <input
              type="radio"
              name={name + "-primary"}
              id={option[0]}
              value={option[0]}
              onChange={() => setPressedButtons((prev) => [option[0], prev[1]])}
            />
            <label htmlFor={option[0]}>{option[0]}</label>
          </>
        ))}
      </div>
      <div className={name + "-secondary"}>
        {seconderyButtons?.map((button) =>
          button[1].map((option) => (
            <>
              <input
                type="radio"
                name={name + "-" + button[0]}
                id={option}
                value={option}
                onChange={() =>
                  setPressedButtons((prev) => {
                    const previousValue = prev || ["", {}];
                    previousValue[1][button[0]] = option;
                    return [previousValue[0], previousValue[1]];
                  })
                }
              />
              <label htmlFor={option}>{option}</label>
            </>
          ))
        )}
      </div>
      <button type="button" onClick={removeLastPoint}>
        Undo
      </button>
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
          onClick={addPoint}
        ></canvas>
        {
          <input
            type="hidden"
            id={name}
            name={name}
            value={getPointsAsString()}
          />
        }
      </div>
    </>
  );
};
export default MapQuery;
