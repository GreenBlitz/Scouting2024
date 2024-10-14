import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Point } from "../../Utils";
import { localStorageTabName } from "../ScouterQuery";

interface AutoMapProps {
  imagePath: string;
  side: "blue" | "red";
}
interface Note extends Point {
  color: "green" | "red" | "orange";
}
const noteRadius = 10;
const notePositions: Point[] = [
  { x: 270, y: 120 },
  { x: 270, y: 80 },
  { x: 270, y: 40 },
  { x: 270, y: 160 },
  { x: 270, y: 200 },
];
const blueNotePositions: Point[] = [
  { x: 90, y: 120 },
  { x: 90, y: 80 },
  { x: 90, y: 40 },
];

const redNotePositions: Point[] = [
  { x: 450, y: 120 },
  { x: 450, y: 80 },
  { x: 450, y: 40 },
];

const width = 540 * 0.8;
const height = 240 * 0.8;
const AutoMap: React.FC<AutoMapProps> = ({ imagePath, side }) => {
  const localStorageKey = localStorageTabName + "Automap/Notes";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousNotes = localStorage.getItem(localStorageKey);
  const [notes, setNotes] = useState<Note[]>(
    previousNotes
      ? JSON.parse(previousNotes)
      : notePositions
          .concat(side === "blue" ? blueNotePositions : redNotePositions)
          .map((note) => {
            return { x: note.x * 0.8, y: note.y * 0.8, color: "orange" };
          })
  );

  function getClosestNote(position: Point) {
    let [min, closestNote]: [number, Note] = [
      100000,
      { x: 0, y: 0, color: "orange" },
    ];
    notes.forEach((note) => {
      const distanceSquared =
        (note.x - position.x) ** 2 + (note.y - position.y) ** 2;
      if (min > distanceSquared) {
        min = distanceSquared;
        closestNote = note;
      }
    });
    if (min > 30 ** 2) {
      return null;
    }
    return closestNote;
  }

  function handleClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const clickedPoint: Point = {
      x: event.pageX - event.currentTarget.offsetLeft,
      y: event.pageY - event.currentTarget.offsetTop,
    };
    const closestNote = getClosestNote(clickedPoint);
    if (!closestNote) {
      return;
    }
    if (closestNote.color === "orange") closestNote.color = "green";
    else if (closestNote.color === "green") {
      closestNote.color = "red";
    } else {
      closestNote.color = "orange";
    }
    setNotes(notes);
    drawNotes();
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }

  useEffect(() => {
    drawNotes();
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
  }, [notes, canvasRef]);

  function drawNote(note: Note, context: CanvasRenderingContext2D) {
    if (!context) return;
    context.strokeStyle = note.color;
    context.lineWidth = 4;
    context.beginPath();
    context.arc(note.x, note.y, noteRadius, 0, 2 * Math.PI);
    context.stroke();
  }

  function drawNotes() {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    notes.forEach((note) => drawNote(note, context));
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
      <canvas ref={canvasRef} width={width} height={height} onClick={handleClick} />
    </div>
  );
};
export default AutoMap;
