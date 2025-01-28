export interface Sensor {
  id: number;
  type: "temperature" | "humidity" | "pressure";
  value: number;
  timestamp: string;
}

export interface SensorData {
  temperature: Sensor;
  humidity: Sensor;
  pressure: Sensor;
}

export type SensorArray = [Sensor, Sensor, Sensor];
