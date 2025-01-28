import axios from "../services/httpClient";
import { SensorData } from "../types/sensor";

const getSensors = async (): Promise<SensorData> => {
  const { data } = await axios.get<SensorData>("/sensors");
  return data;
};

const updateSensors = async (): Promise<void> => {
  const sendSensorData = async () => {
    const sensors = {
      temperature: {
        id: 1,
        type: "temperature",
        value: parseFloat((Math.random() * (35 - 15) + 15).toFixed(1)), // Random temperature between 15 and 35
        timestamp: new Date().toISOString(), // Current timestamp
      },
      humidity: {
        id: 2,
        type: "humidity",
        value: parseFloat((Math.random() * (100 - 30) + 30).toFixed(1)), // Random humidity between 30 and 100
        timestamp: new Date().toISOString(), // Current timestamp
      },
      pressure: {
        id: 3,
        type: "pressure",
        value: parseFloat((Math.random() * (1050 - 950) + 950).toFixed(2)), // Random pressure between 950 and 1050
        timestamp: new Date().toISOString(), // Current timestamp
      },
    };

    await axios.put("/sensors", sensors);
  };

  setInterval(sendSensorData, 2000);
};

export const sensorApi = { getSensors, updateSensors };
