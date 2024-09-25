export interface Point {
  x: number;
  y: number;
}

export const getServerHostname = () => {
  return location.host;
};

export function matchToSheet(match: Record<string, string>) {
  let keys = "";
  let values = "";
  for (const [key, value] of Object.entries(match)) {
    keys += key + "	";
    values += value + "	";
  }
  return `${keys}\n${values}`;
}

export function matchValuesToSheet(match: Record<string, string>) {
  let values = "";
  for (const [key, value] of Object.entries(match)) {
    values += value + "	";
  }
  return values;
}
