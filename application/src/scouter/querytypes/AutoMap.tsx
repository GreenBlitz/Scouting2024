import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Point } from "../../Utils";
import { localStorageTabName } from "../ScouterQuery";

interface AutoMapProps {
  side: "blue" | "red";
}
interface Note extends Point {
  color: "green" | "red" | "orange";
}
const noteRadius = 10;
const notePositions: Point[] = [
  { x: 280, y: 250 },
  { x: 280, y: 200 },
  { x: 280, y: 150 },
  { x: 280, y: 100 },
  { x: 280, y: 50 },
];
const blueNotePositions: Point[] = [
  { x: 90, y: 150 },
  { x: 90, y: 100 },
  { x: 90, y: 50 },
];

const width = 360 * 0.8;
const height = 240;
const AutoMap: React.FC<AutoMapProps> = ({ side }) => {
  const localStorageKey = localStorageTabName + "Automap/Notes";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagePath =
    side === "blue"
      ? "./src/assets/Blue Auto Map.png"
      : "./src/assets/Red Auto Map.png";

  function getNotes(): Note[] {
    const newNotes: Note[] = notePositions
      .concat(blueNotePositions)
      .map((note) => {
        return {
          x: side === "blue" ? note.x * 0.8 : width - note.x * 0.8,
          y: note.y * 0.8,
          color: "orange",
        };
      });
    const previousNotesJson = localStorage.getItem(localStorageKey);
    const previousNotes: Note[] = previousNotesJson
      ? JSON.parse(previousNotesJson)
      : newNotes;
    return previousNotes;
  }

  const [notes, setNotes] = useState<Note[]>(getNotes());

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
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleClick}
      />
    </div>
  );
};
export default AutoMap;
