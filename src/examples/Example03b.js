// Original from: https://d3-graph-gallery.com/graph/donut_label.html

import * as d3 from "d3";

export default function PieChart({ data, width = 650, height = 400 }) {
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

  const labelArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {pie(data).map((d) => {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          const posLabel = (delta) =>
            radius * delta * (midangle < Math.PI ? 1 : -1);
          const lineEnd = labelArc.centroid(d);
          const labelStart = labelArc.centroid(d);
          lineEnd[0] = posLabel(0.95);
          labelStart[0] = posLabel(0.99);
          return (
            <g key={d.index}>
              <path
                d={arc(d)}
                fill={color(d.data.category)}
                stroke="white"
                strokeWidth={2}
                opacity={0.7}
              />
              <polyline
                points={[arc.centroid(d), labelArc.centroid(d), lineEnd].join(
                  " "
                )}
                fill="none"
                stroke="black"
                strokeWidth={1.2}
                strokeOpacity={0.7}
              />
              <text
                transform={`translate(${labelStart})`}
                textAnchor={midangle < Math.PI ? "start" : "end"}
              >
                {d.data.category}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
