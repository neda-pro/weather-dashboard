import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface HumidityData {
  time: number;
  value: number;
}

interface HumidityWidgetProps {
  data: HumidityData[];
  hidden?: boolean;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({ data, hidden }) => {
  const formatXAxis = (tickItem: number) => {
    return new Date(tickItem).toLocaleTimeString();
  };

  return (
    <Card hidden={hidden}>
      <CardContent>
        <Typography variant="h5">Humidity</Typography>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip labelFormatter={formatXAxis} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default HumidityWidget;
