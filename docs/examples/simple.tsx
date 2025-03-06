/* eslint no-console: 0 */
import Rate from 'rc-rate';
import React from 'react';
import '../../assets/index.less';

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
      character={({ index }) => {
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
    <h2>Disabled</h2>
    <Rate
      defaultValue={2}
      onChange={onChange}
      disabled
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
    <h2>Precision</h2>
    <Rate
      defaultValue={1.2}
      precision={0.1}
      onChange={onChange}
      count={10}
      style={{ fontSize: 50, marginTop: 24 }}
      character={<i className="anticon anticon-star" />}
    />
  </div>
);
