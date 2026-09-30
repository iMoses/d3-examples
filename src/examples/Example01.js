import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BarChart({
  data,
  width = 500,
  height = 500,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40
}) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);

    const scaleX = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .rangeRound([marginLeft, width - marginRight])
      .padding(0.1);

    const scaleY = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sales)])
      .rangeRound([height - marginBottom, marginTop]);

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${height - marginBottom})`).call(
        d3
          .axisBottom(scaleX)
          .tickValues(
            d3
              .ticks(...d3.extent(scaleX.domain()), width / 50)
              .filter((v) => scaleX(v) !== undefined)
          )
          .tickSizeOuter(0)
      );

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${marginLeft},0)`)
        .style("color", "steelblue")
        .call(d3.axisLeft(scaleY).ticks(null, "s"))
        .call((g) => g.select(".domain").remove());

    svg.selectAll("*").remove();
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => scaleX(d.year))
      .attr("width", scaleX.bandwidth())
      .attr("y", (d) => scaleY(d.sales))
      .attr("height", (d) => scaleY(0) - scaleY(d.sales));
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft]);

  return <svg ref={ref} width={width} height={height} />;
}
