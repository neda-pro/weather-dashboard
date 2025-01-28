import { useQuery } from "@tanstack/react-query";
import { sensorApi } from "../api/sensorsApi";
import { SensorData, SensorArray } from "../types/sensor";

export const useGetSensors = () => {
  return useQuery<SensorData, Error, SensorArray>({
    queryKey: ["sensors"],
    refetchInterval: 5000,
    queryFn: sensorApi.getSensors,
    select: (data: SensorData): SensorArray => {
      if (!data) {
        throw new Error("No sensor data received");
      }

      // Ensure all required properties exist
      if (
        typeof data.temperature === "undefined" ||
        typeof data.humidity === "undefined" ||
        typeof data.pressure === "undefined"
      ) {
        throw new Error("Invalid sensor data format");
      }

      return [data.temperature, data.humidity, data.pressure];
    },
  });
};
