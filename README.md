<div align="center">
  <h1>@rc-component/rate</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Part of the Ant Design ecosystem.</sub></p>
  <p>📦 ⭐ Accessible React rating component with half-star and keyboard support.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/rate"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/rate.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/rate"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/rate.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/rate/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/rate/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/rate"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/rate/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/rate"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/rate?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- Controlled and uncontrolled rating values.
- Half-star selection, custom characters, and custom character rendering.
- Keyboard interaction, focus/blur methods, disabled state, and RTL support.
- TypeScript definitions for props and imperative refs.

## Install

```bash
npm install @rc-component/rate
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### Rate

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allowClear` | boolean | true | Clear the value when clicking the selected item again. |
| `allowHalf` | boolean | false | Enable half item selection. |
| `autoFocus` | boolean | false | Focus the rating on mount. |
| `character` | ReactNode \| (props: StarProps) => ReactNode | `'★'` | Custom character for each item. |
| `characterRender` | (origin: ReactElement, props: StarProps) => ReactNode | - | Custom renderer for each item. |
| `className` | string | - | Additional class name. |
| `count` | number | 5 | Number of rating items. |
| `defaultValue` | number | 0 | Initial uncontrolled value. |
| `direction` | string | `'ltr'` | Layout direction. Use `'rtl'` for right-to-left display. |
| `disabled` | boolean | false | Disable interaction. |
| `id` | string | - | Root element id. |
| `keyboard` | boolean | true | Enable keyboard control. |
| `prefixCls` | string | `'rc-rate'` | Prefix class name. |
| `style` | React.CSSProperties | - | Root style. |
| `tabIndex` | number | 0 | Root tab index. |
| `value` | number | - | Controlled value. |
| `onBlur` | () => void | - | Blur callback. |
| `onChange` | (value: number) => void | - | Value change callback. |
| `onFocus` | () => void | - | Focus callback. |
| `onHoverChange` | (value: number) => void | - | Hover value callback. |
| `onKeyDown` | React.KeyboardEventHandler<HTMLUListElement> | - | Keydown callback. |
| `onMouseEnter` | React.MouseEventHandler<HTMLUListElement> | - | Mouse enter callback. |
| `onMouseLeave` | React.MouseEventHandler<HTMLUListElement> | - | Mouse leave callback. |

### Ref

| Name    | Type       | Description                   |
| ------- | ---------- | ----------------------------- |
| `blur`  | () => void | Remove focus from the rating. |
| `focus` | () => void | Focus the rating.             |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/rate is released under the [MIT](./LICENSE) license.
