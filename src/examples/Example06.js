// Original from: https://d3-graph-gallery.com/graph/donut_label.html

import * as d3 from "d3";
import styled from "styled-components";

export default function LineChart({
  data,
  width = 450,
  height = 200,
  padding = 10,
}) {
  const scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.year)))
    .rangeRound([padding, width - padding]);

  const scaleY = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.sales)))
    .rangeRound([height - padding, padding]);

  const points = data.map((d) => [scaleX(d.year), scaleY(d.sales)]);

  return (
    <svg width={width} height={height}>
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="steelblue"
        strokeWidth="2"
      />
      {points.map(([cx, cy], i) => (
        <Marker
          key={i}
          cx={cx}
          cy={cy}
          onClick={() => console.log("click!", i)}
        />
      ))}
    </svg>
  );
}

const Marker = styled.circle`
  transition: r 200ms, fill 200ms;
  fill: maroon;
  r: 3;

  :hover {
    fill: magenta;
    r: 6;
  }
`;
