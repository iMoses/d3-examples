import styled from "styled-components";
import Example1 from "./examples/Example01";
import Example2 from "./examples/Example02";
import Example3a from "./examples/Example03a";
import Example3b from "./examples/Example03b";
import Example4 from "./examples/Example04";
import Example5 from "./examples/Example05";
import Example6 from "./examples/Example06";
import barChartData from "./data/barchart";
import pieData from "./data/pie";

export default function App() {
  return (
    <Container>
      <Title>SVG/d3 Components</Title>
      <Example1 data={barChartData} />
      <Example2 data={barChartData} />
      <Example3a data={pieData} />
      <Example3b data={pieData} />
      <Example4 data={pieData} />
      <Example5 value={90} label="Benchmark" />
      <Example6 data={barChartData} />
    </Container>
  );
}

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
`;
