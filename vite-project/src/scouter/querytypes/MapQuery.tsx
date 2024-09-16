import { useEffect, useRef, useState } from "react";

interface MapQueryProps {
  name: string;
  width: number;
  height: number;
  imagePath: string;
  primaryButtons: Record<string, string>;
  secondaryButtons?: Record<string, string[]>;
}
interface Point {
  x: number;
  y: number;
  data: Record<string, string>;
}

const pointRadius: number = 5;

const MapQuery: React.FC<MapQueryProps> = ({
  name,
  width,
  height,
  imagePath,
  primaryButtons,
  secondaryButtons: secondaryButtons,
}) => {
  const localStorageKey = "Queries/" + name + "/Points";
  const [points, setPoints] = useState<Point[]>(
    JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  );
  const [pressedPrimary, setPressedPrimary] = useState<string>("");
  const [pressedSeconderies] = useState<Record<string, string>>({});

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current ? canvasRef.current.getContext("2d") : null;

  function isAllFilled(): boolean {
    if (pressedPrimary === "") return false;
    for (let key of Object.entries(secondaryButtons || {})) {
      if (!pressedSeconderies[key[0]]) {
        return false;
      }
    }
    return true;
  }

  function addPoint(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!isAllFilled()) {
      return;
    }
    const clickedPoint: Point = {
      x: event.pageX - event.currentTarget.offsetLeft,
      y: event.pageY - event.currentTarget.offsetTop,
      data: {
        primary: pressedPrimary,
        ...pressedSeconderies,
      },
    };
    setPoints((prev) => [...prev, clickedPoint]);
  }

  function removeLastPoint() {
    points.pop();
    setPoints((prev) => {
      prev = points;
      return [...prev];
    });
  }

  function drawPoints() {
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    for (let point of points) {
      context.fillStyle = primaryButtons[point.data["primary"]];
      context.beginPath();
      context.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  function getPointsAsString(): string {
    let value: string = "";
    for (let point of points) {
      value += JSON.stringify(point);
    }
    return value;
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(points));
    drawPoints();
  }, [points, addPoint]);

  const buttons = (
    <>
      <div className={name + "-primary"}>
        {Object.entries(primaryButtons).map((option) => {
          const buttonName = option[0];
          return (
            <>
              <input
                type="radio"
                name={name + "-primary"}
                id={buttonName}
                value={buttonName}
                onChange={() => setPressedPrimary(buttonName)}
              />
              <label htmlFor={buttonName}>{buttonName}</label>
            </>
          );
        })}
      </div>
      <div className={name + "-secondary"}>
        {Object.entries(secondaryButtons || {}).map((button) =>
          button[1].map((option) => (
            <>
              <input
                type="radio"
                name={name + "-" + button[0]}
                id={option}
                value={option}
                onChange={() => (pressedSeconderies[button[0]] = option)}
              />
              <label htmlFor={option}>{option}</label>
            </>
          ))
        )}
      </div>
      <button type="button" onClick={removeLastPoint}>
        Undo
      </button>
    </>
  );

  return (
    <>
      <br />
      {buttons}
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
        />
        <input
          type="hidden"
          id={name}
          name={name}
          value={getPointsAsString()}
        />
      </div>
    </>
  );
};
export default MapQuery;
