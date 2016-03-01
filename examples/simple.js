import Rate from 'rc-rate';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/index.less';

ReactDOM.render(<div style={{ margin: 100, marginRight: 0 }}>
  <Rate
    style={{ fontSize: 40 }}
    allowHalf
  />
</div>, document.getElementById('__react-content'));
