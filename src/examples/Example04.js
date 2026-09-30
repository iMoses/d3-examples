// Original from: https://d3-graph-gallery.com/graph/donut_label.html

import * as d3 from "d3";
import styled from "styled-components";

export default function PieChart({ data, width = 500, height = 400 }) {
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal(
    data.map((d) => d.category),
    d3.schemeTableau10
  );

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        {pie(data).map((d) => (
          <ArcGroup key={d.index} style={{ "--arc-radius": radius }}>
            <clipPath id={`pie-clip-${d.index}`}>
              <circle />
            </clipPath>
            <path
              d={arc(d)}
              fill={color(d.data.category)}
              clipPath={`url(#pie-clip-${d.index})`}
            />
          </ArcGroup>
        ))}
      </g>
    </svg>
  );
}

const ArcGroup = styled.g`
  stroke: white;
  stroke-width: 2;
  opacity: 0.8;

  circle {
    r: calc(var(--arc-radius) * 0.9);
    transition: r 200ms cubic-bezier(0.45, 0, 0.55, 1);
  }

  &:hover circle {
    r: var(--arc-radius);
  }
`;
