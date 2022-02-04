import React, {Fragment} from 'react';
import Map from '../components/Map';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body, html {
        font-family: 'Roboto';
    }
`;

const App = () => {
    <Fragment>
        <GlobalStyles />
        <Map />
    </Fragment>
};

export default App;
