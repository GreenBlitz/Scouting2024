import React, { useEffect, useRef } from "react";
import { Note } from "../../Utils";

interface AutoChartProps {
  width: number;
  height: number;
  notes: [Note, number][];
}

const noteRadius = 10;
const textSize = 5;
function drawNote(
  note: Note,
  percentage: number,
  context: CanvasRenderingContext2D
) {
  if (!context) return;
  context.strokeStyle = note.color;
  context.lineWidth = 4;
  context.beginPath();
  context.arc(note.x, note.y, noteRadius, 0, 2 * Math.PI);
  context.stroke();
  context.font = `${textSize}px Arial`;
  context.fillText(percentage + "", note.x, note.y);
}

const AutoChart: React.FC<AutoChartProps> = ({ height, width, notes }) => {
  const imagePath = "./src/assets/Blue Auto Map.png";

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawNotes() {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    notes.forEach((note) => drawNote(note[0], note[1], context));
  }

  useEffect(() => drawNotes(), []);
  return (
    <div
      style={{
        backgroundImage: 'url("' + imagePath + '")',
        backgroundSize: "100% 100%",
        width: width,
        height: height,
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default AutoChart;
