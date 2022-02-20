
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import HandleData from "./handleData";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HandleData>
        <Header />
        <Layout /> 
      </HandleData>
    </ThemeProvider>
    </>
  );
}

export default App;
