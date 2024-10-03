import { useEffect, useRef, useState } from "react";
import { Point } from "../../../Utils";
import React from "react";
import { localStorageTabName } from "../ScouterQuery";
import CounterQuery from "./CounterQuery";
interface MapQueryProps {
  name: string;
  side: "blue" | "red";
  width: number;
  height: number;
  imagePath: string;
  primaryButtons: Record<string, string>;
}
interface DataPoint extends Point {
  data: string;
  successfulness: boolean;
}

const pointRadius: number = 5;

const MapQuery: React.FC<MapQueryProps> = ({
  name,
  width,
  height,
  imagePath,
  primaryButtons,
  side,
}) => {
  const localStorageKey = localStorageTabName + name + "/Points";
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(
    JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  );
  const [pressedPrimary, setPressedPrimary] = useState<string>("");
  const [lastClickedPoint, setLastClickedEvent] = useState<Point>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current ? canvasRef.current.getContext("2d") : null;

  function isButtonPressed(): boolean {
    return pressedPrimary !== "";
  }

  function addPoint(point: Point, successfulness: boolean) {
    if (!isButtonPressed()) {
      return;
    }
    const clickedPoint: DataPoint = {
      x: point.x,
      y: point.y,
      data: pressedPrimary,
      successfulness: successfulness,
    };
    setLastClickedEvent(undefined);
    setDataPoints((prev) => [...prev, clickedPoint]);
  }

  function removeLastPoint() {
    dataPoints.pop();
    setDataPoints((prev) => {
      prev = dataPoints;
      return [...prev];
    });
  }

  function drawPoints() {
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    for (let point of dataPoints) {
      context.fillStyle = primaryButtons[point.data];
      context.beginPath();
      context.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
      context.fill();
    }
  }

  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const clickedPoint = {
      x: event.pageX - event.currentTarget.offsetLeft,
      y: event.pageY - event.currentTarget.offsetTop,
    };
    setLastClickedEvent(clickedPoint);
  }

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(dataPoints));
    drawPoints();
  }, [dataPoints, addPoint]);

  const buttons = (
    <div className="map-buttons">
      <div>
        {Object.entries(primaryButtons).map((option, index) => {
          const buttonName = option[0];
          return (
            <React.Fragment key={index}>
              <input
                type="radio"
                name={name + "-primary"}
                id={buttonName}
                value={buttonName}
                onChange={() => setPressedPrimary(buttonName)}
              />
              <label htmlFor={buttonName}>{buttonName}</label>
            </React.Fragment>
          );
        })}
      </div>
      <button type="button" onClick={removeLastPoint}>
        Undo
      </button>
      <div className={side === "blue" ? "map-amp-left" : "map-amp-right"}>
        <h2>AMP</h2>
        <br />
        <CounterQuery name={name + "/Amp"} />
      </div>
    </div>
  );

  const successfulnessButtons = lastClickedPoint && (
    <div className="succesfulness">
      <button type="button" onClick={() => addPoint(lastClickedPoint, true)}>
        Successful
      </button>
      <button type="button" onClick={() => addPoint(lastClickedPoint, false)}>
        Unsuccessful
      </button>
      <button type="button" onClick={() => setLastClickedEvent(undefined)}>
        Remove
      </button>
    </div>
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
          onClick={handleClick}
        />
        <input
          type="hidden"
          id={name}
          name={name}
          value={JSON.stringify(dataPoints)}
        />
      </div>
      {successfulnessButtons}

      <br />
    </>
  );
};
export default MapQuery;
