// use jsx to render html, do not modify simple.html
import Rate from 'rc-rate';
import React from 'react';
import ReactDOM from 'react-dom';

var options = {
    'color': '#0ae',
    'size': 20,
    'initNum': 3.8,
}

ReactDOM.render(<Rate {...options} />, document.getElementById('__react-content'));
