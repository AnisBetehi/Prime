
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import HandleData from "./handleData";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HandleData>
        <ScrollToTop />
        <Header />
        <Layout /> 
      </HandleData>
    </ThemeProvider>
    </>
  );
}

export default App;
