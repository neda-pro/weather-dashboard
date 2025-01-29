import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { sensorApi } from "../api/sensorsApi";
import { SensorData, SensorArray } from "../types/sensor";

/**
 * Custom hook to fetch sensor data using `useQuery`.
 *
 * @param {number} refetchInterval - The interval in milliseconds for refetching sensor data.
 * @returns {UseQueryResult<SensorArray, Error>} The result of the query containing sensor data.
 *
 * @throws {Error} If no sensor data is received or if the sensor data format is invalid.
 *
 * @example
 * const { data, error, isLoading } = useGetSensors(5000);
 *
 * @remarks
 * This hook uses the `useQuery` hook from `react-query` to fetch sensor data at a regular interval.
 * The `select` function ensures that the received data contains the required properties: `temperature`, `humidity`, and `pressure`.
 */
export const useGetSensors = (
  refetchInterval: number
): UseQueryResult<SensorArray, Error> => {
  return useQuery<SensorData, Error, SensorArray>({
    queryKey: ["sensors"],
    refetchInterval,
    queryFn: sensorApi.getSensors,
    select: (data: SensorData): SensorArray => {
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch sensor data");
      }
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
