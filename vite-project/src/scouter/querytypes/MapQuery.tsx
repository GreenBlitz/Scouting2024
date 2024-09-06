import { useState } from "react";

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

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { clientX, clientY } = event;
    setPoints([...points, { x: clientX, y: clientY, color: "yellow" }]);
    console.log(points);
  }
  return (
    <>
      <br />
      <div
        onClick={handleClick}
        style={{
          background: "url('" + imagePath + "');",
          width: width,
          height: height,
          position: "relative",
        }}
      >
        <img src={imagePath} width={width} height={height}></img>
      </div>
    </>
  );
};
export default MapQuery;
