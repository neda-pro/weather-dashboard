import axios from "../services/httpClient";
import { SensorData } from "../types/sensor";

/**
 * Fetches sensor data from the "/sensors" endpoint.
 *
 * @returns {Promise<SensorData>} A promise that resolves to the sensor data.
 */
const getSensors = async (): Promise<SensorData> => {
  const { data } = await axios.get<SensorData>("/sensors");
  return data;
};

/**
 * Updates sensor data at regular intervals by sending random sensor values to the server.
 *
 * The function generates random values for temperature, humidity, and pressure sensors,
 * and sends these values to the server using an HTTP PUT request every 2 seconds.
 *
 * @async
 * @function updateSensors
 * @returns {Promise<void>} A promise that resolves when the function is complete.
 */
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
