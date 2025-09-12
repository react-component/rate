/* eslint no-console: 0 */
import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import Rate from '@rc-component/slider';
import '../../assets/index.less';

export default () => (
  <div style={{ margin: 100 }}>
    <Rate
      defaultValue={3}
      characterRender={(node, props) => (
        <Tooltip placement="top" overlay={props.index}>
          {node}
        </Tooltip>
      )}
    />
  </div>
);
