// Original from: https://d3-graph-gallery.com/graph/donut_label.html

import * as d3 from "d3";

export default function PieChart({ data, width = 500, height = 400 }) {
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal(
    data.map((d) => d.category),
    d3.schemeDark2
  );

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {pie(data).map((d) => (
          <g key={d.index}>
            <path
              d={arc(d)}
              fill={color(d.data.category)}
              stroke="white"
              strokeWidth={2}
              opacity={0.7}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
