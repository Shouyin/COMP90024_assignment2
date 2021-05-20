import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import HomePage from "./pages/homepage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00695c",
    },
    secondary: {
      main: "#009688",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{fontFamily: ["-apple-system", "BlinkMacSystemFont", 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', "sans-serif"]}}>
        <HomePage />
        </div>
    </ThemeProvider>
  );
}

export default App;
