import { Card, CardContent, Typography, Skeleton } from "@mui/material";

interface PressureWidgetProps {
  minPressure: number | null;
  maxPressure: number | null;
  avgPressure: number | null;
  hidden?: boolean;
}

const PressureWidget: React.FC<PressureWidgetProps> = ({
  minPressure,
  maxPressure,
  avgPressure,
  hidden,
}) => (
  <Card hidden={hidden}>
    <CardContent>
      <Typography variant="h5">Pressure</Typography>
      <Typography variant="body1">
        Min:{" "}
        {minPressure !== null ? (
          `${minPressure.toFixed(2)} hPa`
        ) : (
          <Skeleton width={40} />
        )}
      </Typography>
      <Typography variant="body1">
        Max:{" "}
        {maxPressure !== null ? (
          `${maxPressure.toFixed(2)} hPa`
        ) : (
          <Skeleton width={40} />
        )}
      </Typography>
      <Typography variant="body1">
        Avg:{" "}
        {avgPressure !== null ? (
          `${avgPressure.toFixed(2)} hPa`
        ) : (
          <Skeleton width={40} />
        )}
      </Typography>
    </CardContent>
  </Card>
);

export default PressureWidget;
