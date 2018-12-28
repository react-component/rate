/* eslint no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Rate from 'rc-rate';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

import '../assets/index.less';

ReactDOM.render(
  <div style={{ margin: 100 }}>
    <Rate
      defaultValue={3}
      characterRender={(node, props) => (
        <Tooltip placement="top" overlay={props.index}>
          {node}
        </Tooltip>
      )}
    />
  </div>,
  document.getElementById('__react-content'),
);
