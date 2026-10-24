import React, { useId } from "react";
import { diagramPoints, getDimensionDiagram } from "@/lib/dimensionDiagram";

export default function ProductDimensionDiagram({ dimensions, values, mode, copy }) {
  const id = useId();
  const { points, guides } = getDimensionDiagram(dimensions);
  const interior = mode === "interior";
  const polygon = (keys) => diagramPoints(points, keys);

  return (
    <svg viewBox="0 0 560 320" className="mx-auto w-full max-w-xl overflow-visible" role="img" aria-labelledby={`${id}-title ${id}-desc`} data-testid="dimension-diagram" data-mode={mode}>
      <title id={`${id}-title`}>{copy.diagram} · {copy[mode]}</title>
      <desc id={`${id}-desc`}>{dimensions.map(({ axis }, index) => `${copy[axis]}: ${values[index]}`).join(", ")}. {copy.schematic}</desc>
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0.7" y2="1">
          <stop stopColor="#ffffff" /><stop offset="1" stopColor="#e6e8e9" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0.2" y2="1">
          <stop stopColor="#d8dcdf" /><stop offset="1" stopColor="#b9bfc3" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0.7">
          <stop stopColor="#9ca4aa" /><stop offset="1" stopColor="#bcc2c6" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" markerWidth="5" markerHeight="5" refX="4" refY="4" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M8 4 0 0 0 8Z" fill="#737b80" />
        </marker>
      </defs>

      {/* Only three matte planes: no ribs, hardware, door outlines or branding. */}
      <polygon points={polygon(["a", "b", "c", "d"])} transform="translate(0 8)" fill="#536068" opacity="0.16" filter={`url(#${id}-shadow)`} />
      {interior && <polyline points={polygon(["a", "d", "c", "d", "D"])} fill="none" stroke="#9aa3a9" strokeWidth="1" strokeDasharray="4 5" />}
      <g strokeLinejoin="miter">
        <polygon data-face="front" points={polygon(["A", "B", "b", "a"])} fill={`url(#${id}-front)`} opacity={interior ? 0.35 : 1} />
        <polygon data-face="side" points={polygon(["B", "C", "c", "b"])} fill={`url(#${id}-side)`} opacity={interior ? 0.45 : 1} />
        <polygon data-face="top" points={polygon(["A", "D", "C", "B"])} fill={`url(#${id}-top)`} opacity={interior ? 0.4 : 1} />
        <polyline points={polygon(["A", "B", "C"])} fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
        {interior && <polygon points={polygon(["A", "D", "C", "c", "b", "a"])} fill="none" stroke="#a4adb3" strokeWidth="0.8" />}
      </g>

      {guides.map(({ axis, from, to, offset, labelOffset, rotate }, index) => {
        const start = from.map((value, i) => value + offset[i]);
        const end = to.map((value, i) => value + offset[i]);
        const label = start.map((value, i) => (value + end[i]) / 2 + labelOffset[i]);
        return (
          <g key={axis} aria-hidden="true" data-axis={axis}>
            <g fill="none" stroke="#aeb5b9" strokeWidth="0.8">
              <path d={`M${from}L${start}M${to}L${end}`} strokeDasharray="2 4" />
              <path d={`M${start}L${end}`} stroke="#737b80" markerStart={`url(#${id}-arrow)`} markerEnd={`url(#${id}-arrow)`} />
            </g>
            <text transform={`translate(${label}) rotate(${rotate})`} fill="#454d52" fontSize="18" fontWeight="500" textAnchor="middle" dominantBaseline="middle">{values[index]}</text>
          </g>
        );
      })}
    </svg>
  );
}
