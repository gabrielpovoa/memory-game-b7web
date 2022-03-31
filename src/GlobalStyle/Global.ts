import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
    transition: all .3s linear;
    outline: none;
    border: 0;
    text-decoration: none;
    text-transform: capitalize;
}
html {  
    font-size: 62.5%;
}
body {
    background: #F3F3F3;
    color: #333;
    font-family: sans-serif;
}
`;