/* eslint no-console: 0 */
import React from 'react';
import Rate from '../src';
import '../assets/index.less';

function onChange(v: number) {
  console.log('selected star', v);
}

export default () => (
  <div style={{ margin: 50 }}>
    <h2>Base</h2>
    <Rate
      defaultValue={2.5}
      onChange={onChange}
      style={{ fontSize: 40 }}
      allowHalf
      allowClear={false}
    />
    <br />
    <Rate
      defaultValue={2.5}
      onChange={onChange}
      style={{ fontSize: 50, marginTop: 24 }}
      allowHalf
      character="$"
    />
    <br />
    <Rate
      defaultValue={1}
      onChange={onChange}
      style={{ fontSize: 50, marginTop: 24 }}
      character="1"
      iconRender={index => {
        return index + 1;
      }}
    />
    <br />
    <Rate
      defaultValue={2.5}
      onChange={onChange}
      style={{ fontSize: 50, marginTop: 24 }}
      allowHalf
      character={<i className="anticon anticon-star" />}
    />
    <br />
    <Rate
      defaultValue={2}
      onChange={onChange}
      style={{ fontSize: 50, marginTop: 24 }}
      character={<i className="anticon anticon-star" />}
    />
    <h2>RTL</h2>
    <Rate
      defaultValue={1}
      direction="rtl"
      onChange={onChange}
      allowHalf
      style={{ fontSize: 50, marginTop: 24 }}
      character={<i className="anticon anticon-star" />}
    />
  </div>
);
