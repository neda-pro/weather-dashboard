# Weather Dashboard

This project is a weather dashboard that displays temperature, humidity, and pressure data using React, Zustand, and Material-UI. The data is fetched from a backend API and updated at regular intervals.

## Installation

1. **Clone the repository:**

```sh
git clone https://github.com/neda-pro/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies:**

```sh
yarn
```

3. **Start the development server:**

```sh
yarn dev
```

4. **Run the backend server:**
   Ensure you have a backend server running that provides the sensor data. You can use the provided `updateSensors` function in `src/api/sensorsApi.ts` to simulate sensor data updates.

5. **Run the JSON server:**
   To simulate a backend API, you can use `json-server`. Ensure you have a `db.json` file in the root of your project with the necessary data structure. Then, run the following command:

```sh
yarn dev:api
```

## Explanation of Choices

- **React and Zustand:** React is used for building the user interface, and Zustand is used for state management. Zustand provides a simple and scalable way to manage global state without the boilerplate of other state management libraries.
- **Material-UI:** Material-UI is used for the UI components to ensure a consistent and responsive design. It provides a wide range of pre-built components that are easy to customize.

- **React Query:** React Query is used for data fetching and caching. It simplifies the process of fetching, caching, and updating data in React applications.

- **TypeScript:** TypeScript is used for type safety and better developer experience. It helps catch errors early and provides better tooling support.

- **API Integration:** The project integrates with a backend API to fetch sensor data. The `httpClient` in `src/services/httpClient.ts` is configured to communicate with the backend server.

- **Widgets:** The dashboard includes three widgets for displaying temperature, humidity, and pressure data. Each widget is conditionally rendered based on the user's preferences.

- **Customization:** Users can customize the dashboard by toggling the visibility of each widget and adjusting the data refresh interval and history duration using sliders.

## Folder Structure

```sh
.
├── README.md
├── db.json
├── eslint.config.js
├── index.html
├── node_modules
├── package.json
├── public
├── src
│   ├── api
│   ├── components
│   ├── hooks
│   ├── services
│   ├── store
│   ├── types
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

- `src/components`: Contains the React components for the dashboard and widgets.
- `src/hooks`: Contains custom hooks for data fetching.
- `src/store`: Contains the Zustand store for state management.
- `src/types`: Contains TypeScript type definitions.
- `src/services`: Contains the HTTP client configuration.
- `src/api`: Contains API functions for fetching and updating sensor data.

## License

This project is licensed under the MIT License.
