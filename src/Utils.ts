export interface Point {
    x: number;
    y: number;
}

export const getServerHostName = () => {
    return location.host;
};
