import React, { useEffect } from "react";
import { useRef } from "react";
import { Point } from "../../Utils";

interface AutoMapProps {
  imagePath: string;
}
const noteRadius = 10;
const notePositions: Point[] = [{ x: 100, y: 100 }];
const width = 540;
const height = 240;
const AutoMap: React.FC<AutoMapProps> = ({ imagePath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current ? canvasRef.current.getContext("2d") : null;

  function handleClick() {}

  useEffect(() => {
    drawNotes();
  }, [canvasRef]);

  function drawNote(position: Point) {
    if (!context) return;
    context.strokeStyle = "orange";
    context.lineWidth = 4;
    context.beginPath();
    context.arc(position.x, position.y, noteRadius, 0, 2 * Math.PI);
    context.stroke();
  }

  function drawNotes() {
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    notePositions.forEach((note) => drawNote(note));
  }

  return (
    <div
      style={{
        backgroundImage: 'url("' + imagePath + '")',
        backgroundSize: "100% 100%",
        width: width,
        height: height,
      }}
    >
      <canvas ref={canvasRef} width={540} height={240} onClick={handleClick} />
    </div>
  );
};
export default AutoMap;
