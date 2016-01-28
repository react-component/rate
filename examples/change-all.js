// use jsx to render html, do not modify simple.html
import Rate from 'rc-rate';
import React from 'react';
import ReactDOM from 'react-dom';

var options = {
    'initNum': 3.5,
    'starNum': 20,
    'half': true,
    'style': {'backGround': '#000'},
}

ReactDOM.render(<Rate {...options} />, document.getElementById('__react-content'));
