import { positiveMeasurement } from "./productDimensions.js";

// Orthographic projection of a plain volume, not a container model. A single
// scale preserves the product's proportions; missing data uses a generic shape.
export function getDimensionDiagram(dimensions) {
  const values = dimensions.map(({ value }) => positiveMeasurement(value));
  const complete = values.length === 3 && values.every((value) => value !== null);
  const [length, width, height] = complete ? values : [3, 1, 1];
  const yaw = 32 * Math.PI / 180;
  const pitch = 13 * Math.PI / 180;
  const project = (x, y, z) => [
    x * Math.cos(yaw) + y * Math.sin(yaw),
    x * Math.sin(yaw) * Math.sin(pitch) - y * Math.cos(yaw) * Math.sin(pitch) - z * Math.cos(pitch),
  ];
  const raw = {
    a: project(0, 0, 0), b: project(length, 0, 0),
    c: project(length, width, 0), d: project(0, width, 0),
    A: project(0, 0, height), B: project(length, 0, height),
    C: project(length, width, height), D: project(0, width, height),
  };
  const xs = Object.values(raw).map(([x]) => x);
  const ys = Object.values(raw).map(([, y]) => y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min(360 / (maxX - minX), 185 / (maxY - minY));
  const points = Object.fromEntries(Object.entries(raw).map(([key, [x, y]]) => [key, [
    280 + (x - (minX + maxX) / 2) * scale,
    143 + (y - (minY + maxY) / 2) * scale,
  ]]));
  const { a, b, c, A } = points;
  return {
    complete,
    points,
    guides: [
      { axis: "length", from: a, to: b, offset: [-8, 32], labelOffset: [0, 26], rotate: 0 },
      { axis: "width", from: b, to: c, offset: [23, 27], labelOffset: [20, 29], rotate: 0 },
      { axis: "height", from: a, to: A, offset: [-32, 0], labelOffset: [-14, 0], rotate: -90 },
    ],
  };
}

export function diagramPoints(points, keys) {
  return keys.map((key) => points[key].join(",")).join(" ");
}
