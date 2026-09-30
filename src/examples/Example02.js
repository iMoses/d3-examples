import * as d3 from "d3";
import Axis from "../Axis";

export default function BarChart({
  data,
  width = 500,
  height = 500,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40
}) {
  const scaleX = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .rangeRound([marginLeft, width - marginRight])
    .padding(0.1);

  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.sales))])
    .rangeRound([height - marginBottom, marginTop]);

  return (
    <svg width={width} height={height}>
      <g fill="steelblue">
        {data.map((d) => (
          <rect
            key={d.year}
            x={scaleX(d.year)}
            y={scaleY(d.sales)}
            width={scaleX.bandwidth()}
            height={scaleY(0) - scaleY(d.sales)}
          />
        ))}
      </g>
      <Axis
        orientation={Axis.Bottom}
        scale={scaleX}
        transform={`translate(0,${height - marginBottom})`}
        tickValues={d3
          .ticks(
            Math.min(...scaleX.domain()),
            Math.max(...scaleX.domain()),
            width / 50
          )
          .filter((v) => typeof scaleX(v) !== "undefined")}
        tickSizeOuter={0}
      />
      <Axis
        orientation={Axis.Left}
        scale={scaleY}
        tickSizeOuter={0}
        tickArguments={[null, "s"]}
        color="steelblue"
        transform={`translate(${marginLeft},0)`}
        noDomain
      />
    </svg>
  );
}
