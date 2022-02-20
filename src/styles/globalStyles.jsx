import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    body {
        background-color: ${({theme}) => theme.mainBg};
    }

    *, input, select, option, button {
        font-family: ${({theme}) => theme.mainFont};
    }

`

export default GlobalStyles;