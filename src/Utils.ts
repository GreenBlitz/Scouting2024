export interface Point {
  x: number;
  y: number;
}

export const getServerHostname = () => {
  return location.host;
};
