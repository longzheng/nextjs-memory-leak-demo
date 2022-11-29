import React from "react";
import { LineChart, Line, CartesianGrid, Legend, YAxis } from "recharts";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MemoryGraph = ({
  memoryUsages,
}: {
  memoryUsages: NodeJS.MemoryUsage[];
}) => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    setRender(true);
  }, []);

  return render ? (
    <LineChart width={1200} height={600} data={memoryUsages}>
      <CartesianGrid />
      <YAxis width={100} />
      <Legend />
      <Line
        type="monotone"
        dataKey="heapTotal"
        stroke="red"
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="heapUsed"
        stroke="green"
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="rss"
        stroke="blue"
        isAnimationActive={false}
      />
    </LineChart>
  ) : null;
};
