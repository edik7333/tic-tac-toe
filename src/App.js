import logo from "./logo.svg";
import "./App.css";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import Main from "./components/Router";
import { createContext, useState } from "react";

export const whiteTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#32d6ab",
    },
    secondary: {
      main: "#4f9bff",
    },
    blue: {
      main: "#398eb3",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export const themeContext = createContext();

function App() {
  let defaultTheme = whiteTheme;
  if (localStorage.getItem("theme") == "darkTheme") defaultTheme = darkTheme;
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <themeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
          <Main />
        </themeContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
