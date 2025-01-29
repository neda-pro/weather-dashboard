import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  CssBaseline,
  useMediaQuery,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  Slider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import Dashboard from "./components/Dashboard";
import useStore from "./store/useStore";

const drawerWidth = 260;

function valueTextRefresh(value: number) {
  return `${value / 1000} sec`;
}
function valueTextHistory(value: number) {
  return `${value / 1000} min`;
}

function App() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(!isMobile);

  const store = useStore();
  const isShowTemperature = store.isShowTemperature();
  const isShowPressure = store.isShowPressure();
  const isShowHumidity = store.isShowHumidity();
  const toggleShowPressure = store.toggleShowPressure;
  const toggleShowTemperature = store.toggleShowTemperature;
  const toggleShowHumidity = store.toggleShowHumidity;
  const refreshSliderValue = store.getRefetchInterval();
  const setRefetchInterval = store.setRefetchInterval;
  const getHistoryDuration = store.getHistoryDuration();
  const setHistoryDuration = store.setHistoryDuration;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleRefreshSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setRefetchInterval(newValue as number);
  };
  const handleHistorySliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setHistoryDuration(newValue as number);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          transition: "width 0.3s, margin 0.3s",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: open ? "none" : "block" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <FormControl component="fieldset" variant="standard" sx={{ p: 2 }}>
          <FormLabel component="legend">Adjust Dashboard</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isShowTemperature}
                  onChange={toggleShowTemperature}
                  name="temperture"
                />
              }
              label={`${isShowTemperature ? "Hide" : "Show"} Temperature`}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isShowPressure}
                  onChange={toggleShowPressure}
                  name="Pressure"
                />
              }
              label={`${isShowPressure ? "Hide" : "Show"} Pressure`}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isShowHumidity}
                  onChange={toggleShowHumidity}
                  name="Humidity"
                />
              }
              label={`${isShowHumidity ? "Hide" : "Show"} Humidity`}
            />
          </FormGroup>
        </FormControl>
        <Typography px={2} color="text.secondary" gutterBottom>
          Refresh Interval
        </Typography>
        <Box sx={{ px: 3 }}>
          <Slider
            aria-label="Custom marks"
            value={refreshSliderValue}
            onChange={handleRefreshSliderChange}
            getAriaValueText={valueTextRefresh}
            step={1000}
            min={1000}
            max={5000}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 1000,
                label: "1 sec",
              },
              {
                value: 2000,
                label: "2 sec",
              },
              {
                value: 3000,
                label: "3 sec",
              },
              {
                value: 4000,
                label: "4 sec",
              },
              {
                value: 5000,
                label: "5 sec",
              },
            ]}
          />
        </Box>

        <Typography px={2} color="text.secondary" gutterBottom>
          History Duration
        </Typography>
        <Box sx={{ px: 3 }}>
          <Slider
            aria-label="Custom marks"
            value={getHistoryDuration}
            onChange={handleHistorySliderChange}
            getAriaValueText={valueTextHistory}
            step={1}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 20,
          p: 3,
        }}
      >
        <Dashboard />
      </Box>
    </Box>
  );
}

export default App;
