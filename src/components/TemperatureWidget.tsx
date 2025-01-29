import { Card, CardContent, Typography } from "@mui/material";

interface TemperatureWidgetProps {
  temperature: number;
  hidden?: boolean;
}

const TemperatureWidget = ({ temperature, hidden }: TemperatureWidgetProps) => (
  <Card hidden={hidden}>
    <CardContent>
      <Typography variant="h5">Temperature</Typography>
      <Typography variant="h2">{temperature}°C</Typography>
    </CardContent>
  </Card>
);

export default TemperatureWidget;
