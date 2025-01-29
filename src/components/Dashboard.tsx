import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Skeleton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useGetSensors } from "../hooks/useSensors";
import { Sensor } from "../types/sensor";
import TemperatureWidget from "./TemperatureWidget";
import PressureWidget from "./PressureWidget";
import HumidityWidget from "./HumidityWidget";
import useStore from "../store/useStore";

const Dashboard: React.FC = () => {
  const store = useStore();
  const {
    data: sensors,
    isLoading,
    isError,
  } = useGetSensors(store.getRefetchInterval());
  const addSensorData = store.addSensorData;
  const getPressureStates = store.getStatsByType("pressure");
  const getHumidityHistory = store.getHistoryType("humidity");
  const isShowTemperature = store.isShowTemperature();
  const isShowPressure = store.isShowPressure();
  const isShowHumidity = store.isShowHumidity();

  useEffect(() => {
    if (sensors) {
      addSensorData(sensors);
    }
  }, [sensors, addSensorData]);

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Error fetching sensor data — <strong>retrying...</strong>
          </Alert>
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Box key={item}>
                <Skeleton variant="rectangular" height={200} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Weather Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {sensors?.map((sensor: Sensor) => (
            <Box
              key={sensor.id}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              {sensor.type === "temperature" &&
              !isShowTemperature ? null : sensor.type === "pressure" &&
                !isShowPressure ? null : sensor.type === "humidity" &&
                !isShowHumidity ? null : (
                <Box sx={{ flex: 1 }}>
                  {sensor.type === "temperature" ? (
                    <TemperatureWidget temperature={sensor.value} />
                  ) : sensor.type === "pressure" ? (
                    <PressureWidget
                      minPressure={getPressureStates?.min ?? null}
                      maxPressure={getPressureStates?.max ?? null}
                      avgPressure={getPressureStates?.avg ?? null}
                    />
                  ) : (
                    <HumidityWidget data={getHumidityHistory} />
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
