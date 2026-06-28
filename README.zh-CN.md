<div align="center">
  <h1>@rc-component/rate</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>📦 ⭐ React 评分组件，支持半星、自定义字符、清除和键盘交互。</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/rate"><img src="https://img.shields.io/npm/v/@rc-component/rate.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://npmjs.org/package/@rc-component/rate"><img src="https://img.shields.io/npm/dm/@rc-component/rate.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/rate/actions"><img src="https://github.com/react-component/rate/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://codecov.io/gh/react-component/rate"><img src="https://img.shields.io/codecov/c/github/react-component/rate/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/rate"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/rate" alt="Bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- 受控和非受控额定值。
- 半星选择、自定义角色和自定义角色渲染。
- 支持键盘交互、焦点/模糊方法、取消状态和RTL。
- props 和命令式引用的 TypeScript 定义。

## 安装

```bash
npm install @rc-component/rate
```

## 使用

```tsx | pure
import Rate from '@rc-component/rate';
export default () => <Rate defaultValue={2.5} allowHalf />;
```

```tsx | pure
import Rate from '@rc-component/rate';
export default () => (
  <Rate
    count={5}
    defaultValue={3}
    character={({ index }) => index + 1}
    onChange={(value) => {
      console.log('selected', value);
    }}
  />
);
```

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### Rate

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `allowClear` | boolean | true | 再次单击所选项目时清除该值。 |
| `allowHalf` | boolean | false | 启用一半项目选择。 |
| `autoFocus` | boolean | false | 将评级重点放在安装上。 |
| `character` | ReactNode \| (props: StarProps) => ReactNode | `'★'` | 每项的自定义字符。 |
| `characterRender` | (origin: ReactElement, props: StarProps) => ReactNode | - | 每项的自定义渲染函数。 |
| `className` | string | - | 附加className。 |
| `count` | number | 5 | 评级项目的数量。 |
| `defaultValue` | number | 0 | 初始不受控值。 |
| `direction` | string | `'ltr'` | 布局方向。使用 `'rtl'` 从右到左显示。 |
| `disabled` | boolean | false | 禁用交互。 |
| `id` | string | - | 根元素 ID。 |
| `keyboard` | boolean | true | 启用键盘控制。 |
| `prefixCls` | string | `'rc-rate'` | 前缀className。 |
| `style` | React.CSSProperties | - | 根样式。 |
| `tabIndex` | number | 0 | 根选项卡索引。 |
| `value` | number | - | 受控值。 |
| `onBlur` | () => void | - | 失焦回调。 |
| `onChange` | （值：数字）=> 无效 | - | 值变化回调。 |
| `onFocus` | () => void | - | 聚焦回调。 |
| `onHoverChange` | （值：数字）=> 无效 | - | 悬浮值回调。 |
| `onKeyDown` | React.KeyboardEventHandler<HTMLUListElement> | - | 按键回调。 |
| `onMouseEnter` | React.MouseEventHandler<HTMLUListElement> | - | 鼠标进入回调。 |
| `onMouseLeave` | React.MouseEventHandler<HTMLUListElement> | - | 鼠标离开回调。 |

### Ref

| 名称    | 类型       | 说明                   |
| ------- | ---------- | ----------------------------- |
| `blur`  | () => void | 移除评分组件焦点。 |
| `focus` | () => void | 聚焦评分组件。             |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/rate 基于 [MIT](./LICENSE) 许可证发布。
