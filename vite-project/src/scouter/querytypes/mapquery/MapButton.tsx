export interface MapButtonProps {
  name: string;
  options: Record<string, string>;
  pick?: (key: string, value: string, color: string) => void;
}

const MapButton: React.FC<MapButtonProps> = ({ name, pick }) => {
  return <button id={name} />;
};

export default MapButton;
