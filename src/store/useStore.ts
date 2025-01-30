import { create } from "zustand";
import { SensorArray } from "../types/sensor";

interface SensorDataWithTimestamp {
  data: SensorArray;
  timestamp: number;
}

interface SensorState {
  latest: SensorArray | null;
  history: SensorDataWithTimestamp[];
  showTemperature: boolean;
  showPressure: boolean;
  showHumidity: boolean;
  refetchInterval: number;
  historyDuration: number;
  addSensorData: (data: SensorArray) => void;
  getLatest: () => SensorArray | null;
  getStatsByType: (
    type: string
  ) => { min: number; max: number; avg: number } | null;
  getHistoryType: (type: string) => { time: number; value: number }[];
  toggleShowTemperature: () => void;
  toggleShowPressure: () => void;
  toggleShowHumidity: () => void;
  isShowTemperature: () => boolean;
  isShowPressure: () => boolean;
  isShowHumidity: () => boolean;
  getRefetchInterval: () => number;
  setRefetchInterval: (interval: number) => void;
  getHistoryDuration: () => number;
  setHistoryDuration: (duration: number) => void;
}

const useStore = create<SensorState>((set, get) => ({
  latest: null,
  history: [],
  showTemperature: true,
  showPressure: true,
  showHumidity: true,
  refetchInterval: 5000,
  historyDuration: 5, // Default to 5 minutes

  // addSensorData will add the new sensor data to the latest and history state
  // it will also remove the old data that is older than the historyDuration
  // and keep the historyDuration in minutes
  addSensorData: (data: SensorArray) => {
    set((state) => {
      const now = Date.now();
      const lastAllowedTime = now - get().historyDuration * 60 * 1000;
      const updatedHistory = [
        ...state.history.filter((entry) => entry.timestamp > lastAllowedTime),
        { data, timestamp: now },
      ];
      return {
        latest: data,
        history: updatedHistory,
      };
    });
  },
  getLatest: () => get().latest,

  // returns the stats for the given type
  // format: { min: number, max: number, avg: number } | null
  getStatsByType: (type: string) => {
    const allValues = get()
      .history.flatMap((entry) => entry.data)
      .filter((sensor) => sensor.type === type)
      .map((sensor) => sensor.value);

    if (allValues.length === 0) return null;

    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const avg =
      allValues.reduce((sum, value) => sum + value, 0) / allValues.length;

    return { min, max, avg };
  },

  // returns the history data by type for the chart
  // format: { time: number, value: number }[]
  getHistoryType: (type: string) => {
    return get().history.flatMap((entry) =>
      entry.data
        .filter((sensor) => sensor.type === type)
        .map((sensor) => ({ time: entry.timestamp, value: sensor.value }))
    );
  },
  toggleShowTemperature: () =>
    set((state) => ({ showTemperature: !state.showTemperature })),
  toggleShowPressure: () =>
    set((state) => ({ showPressure: !state.showPressure })),
  toggleShowHumidity: () =>
    set((state) => ({ showHumidity: !state.showHumidity })),
  isShowTemperature: () => get().showTemperature,
  isShowPressure: () => get().showPressure,
  isShowHumidity: () => get().showHumidity,
  getRefetchInterval: () => get().refetchInterval,
  setRefetchInterval: (interval: number) => set({ refetchInterval: interval }),
  getHistoryDuration: () => get().historyDuration,
  setHistoryDuration: (duration: number) => set({ historyDuration: duration }),
}));

export default useStore;
