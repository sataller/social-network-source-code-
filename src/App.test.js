import React from 'react';
import ReactDOM from "react-dom";
import MainAppJS from "./App";

it('render without crashing', () => {
    const div = document.createElement("div");
    ReactDOM.render(<MainAppJS/>, div);
    ReactDOM.unmountComponentAtNode(div)
});
