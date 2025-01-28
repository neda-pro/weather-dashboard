import React from "react";
import { useGetSensors } from "../hooks/useSensors";
import { Sensor } from "../types/sensor";

const SensorComponent: React.FC = () => {
  const { data: sensors, isLoading } = useGetSensors();

  if (isLoading) return <p>Loading sensors...</p>;

  return (
    <div>
      <h1>Sensors List</h1>
      {sensors?.map((sensor: Sensor) => (
        <div key={sensor.id}>
          <p>
            {sensor.type} - {sensor.timestamp} - {sensor.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SensorComponent;
