import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const root = document.querySelector('#root');
console.log(root);

ReactDom.render(<App />, root);
