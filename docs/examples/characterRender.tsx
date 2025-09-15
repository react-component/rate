/* eslint no-console: 0 */
import Rate from '@rc-component/rate';
import Tooltip from '@rc-component/tooltip';
import '@rc-component/tooltip/assets/bootstrap_white.css';
import React from 'react';
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
