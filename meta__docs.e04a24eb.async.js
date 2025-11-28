"use strict";(self.webpackChunk_rc_component_rate=self.webpackChunk_rc_component_rate||[]).push([[904],{36750:function(f,a,e){e.r(a),e.d(a,{demos:function(){return R}});var c=e(67294),R={}},46010:function(f,a,e){var c;e.r(a),e.d(a,{demos:function(){return W}});var R=e(15009),D=e.n(R),O=e(99289),j=e.n(O),u=e(67294),H=e(76645),T=e(77369),L=e(34135),h=e(69945),W={"docs-demo-character-render-demo-characterrender":{component:u.memo(u.lazy(function(){return e.e(433).then(e.bind(e,61704))})),asset:{type:"BLOCK",id:"docs-demo-character-render-demo-characterrender",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(12391).Z},"@rc-component/rate":{type:"NPM",value:"1.0.1"},"@rc-component/tooltip":{type:"NPM",value:"1.3.4"},react:{type:"NPM",value:"16.14.0"},"../../assets/index.less":{type:"FILE",value:e(86834).Z}},entry:"index.tsx"},context:{"../../assets/index.less":h,"@rc-component/rate":H,"@rc-component/tooltip":T,"@rc-component/tooltip/assets/bootstrap_white.css":L,react:c||(c=e.t(u,2)),"/Users/afc163/Projects/rate/assets/index.less":h},renderOpts:{compile:function(){var A=j()(D()().mark(function V(){var N,g=arguments;return D()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,e.e(250).then(e.bind(e,90250));case 2:return _.abrupt("return",(N=_.sent).default.apply(N,g));case 3:case"end":return _.stop()}},V)}));function r(){return A.apply(this,arguments)}return r}()}}}},19128:function(f,a,e){var c;e.r(a),e.d(a,{demos:function(){return L}});var R=e(15009),D=e.n(R),O=e(99289),j=e.n(O),u=e(67294),H=e(76645),T=e(69945),L={"docs-demo-simple-demo-simple":{component:u.memo(u.lazy(function(){return e.e(433).then(e.bind(e,23527))})),asset:{type:"BLOCK",id:"docs-demo-simple-demo-simple",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(25133).Z},react:{type:"NPM",value:"16.14.0"},"@rc-component/rate":{type:"NPM",value:"1.0.1"},"../../assets/index.less":{type:"FILE",value:e(86834).Z}},entry:"index.tsx"},context:{"../../assets/index.less":T,react:c||(c=e.t(u,2)),"@rc-component/rate":H,"/Users/afc163/Projects/rate/assets/index.less":T},renderOpts:{compile:function(){var h=j()(D()().mark(function A(){var r,V=arguments;return D()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return g.next=2,e.e(250).then(e.bind(e,90250));case 2:return g.abrupt("return",(r=g.sent).default.apply(r,V));case 3:case"end":return g.stop()}},A)}));function W(){return h.apply(this,arguments)}return W}()}}}},11171:function(f,a,e){e.r(a),e.d(a,{demos:function(){return R}});var c=e(67294),R={}},76645:function(f,a,e){e.r(a),e.d(a,{default:function(){return Ee}});var c=e(67333),R=e.n(c),D=e(9783),O=e.n(D),j=e(5574),u=e.n(j),H=e(13769),T=e.n(H),L=e(96607),h=e(65306),W=e(3921),A=e(90512),r=e(67294);function V(n,d){var l=n.disabled,o=n.prefixCls,y=n.character,M=n.characterRender,v=n.index,z=n.count,m=n.value,Z=n.allowHalf,b=n.focused,$=n.onHover,G=n.onClick,w=function(P){$(P,v)},J=function(P){G(P,v)},X=function(P){P.keyCode===h.Z.ENTER&&G(P,v)},B=v+1,C=new Set([o]);m===0&&v===0&&b?C.add("".concat(o,"-focused")):Z&&m+.5>=B&&m<B?(C.add("".concat(o,"-half")),C.add("".concat(o,"-active")),b&&C.add("".concat(o,"-focused"))):(B<=m?C.add("".concat(o,"-full")):C.add("".concat(o,"-zero")),B===m&&b&&C.add("".concat(o,"-focused")));var i=typeof y=="function"?y(n):y,S=r.createElement("li",{className:(0,A.W)(Array.from(C)),ref:d},r.createElement("div",{onClick:l?null:J,onKeyDown:l?null:X,onMouseMove:l?null:w,role:"radio","aria-checked":m>v?"true":"false","aria-posinset":v+1,"aria-setsize":z,tabIndex:l?-1:0},r.createElement("div",{className:"".concat(o,"-first")},i),r.createElement("div",{className:"".concat(o,"-second")},i)));return M&&(S=M(S,n)),S}var N=r.forwardRef(V);function g(){var n=r.useRef({});function d(o){return n.current[o]}function l(o){return function(y){n.current[o]=y}}return[d,l]}function te(n){var d=n.pageXOffset,l="scrollLeft";if(typeof d!="number"){var o=n.document;d=o.documentElement[l],typeof d!="number"&&(d=o.body[l])}return d}function _(n){var d,l,o=n.ownerDocument,y=o.body,M=o&&o.documentElement,v=n.getBoundingClientRect();return d=v.left,l=v.top,d-=M.clientLeft||y.clientLeft||0,l-=M.clientTop||y.clientTop||0,{left:d,top:l}}function he(n){var d=_(n),l=n.ownerDocument,o=l.defaultView||l.parentWindow;return d.left+=te(o),d.left}var ge=["prefixCls","className","defaultValue","value","count","allowHalf","allowClear","keyboard","character","characterRender","disabled","direction","tabIndex","autoFocus","onHoverChange","onChange","onFocus","onBlur","onKeyDown","onMouseLeave"];function ye(n,d){var l=n.prefixCls,o=l===void 0?"rc-rate":l,y=n.className,M=n.defaultValue,v=n.value,z=n.count,m=z===void 0?5:z,Z=n.allowHalf,b=Z===void 0?!1:Z,$=n.allowClear,G=$===void 0?!0:$,w=n.keyboard,J=w===void 0?!0:w,X=n.character,B=X===void 0?"\u2605":X,C=n.characterRender,i=n.disabled,S=n.direction,U=S===void 0?"ltr":S,P=n.tabIndex,Re=P===void 0?0:P,Pe=n.autoFocus,K=n.onHoverChange,Q=n.onChange,Y=n.onFocus,k=n.onBlur,q=n.onKeyDown,ee=n.onMouseLeave,_e=T()(n,ge),De=g(),oe=u()(De,2),Me=oe[0],be=oe[1],ne=r.useRef(null),re=function(){if(!i){var t;(t=ne.current)===null||t===void 0||t.focus()}};r.useImperativeHandle(d,function(){return{focus:re,blur:function(){if(!i){var t;(t=ne.current)===null||t===void 0||t.blur()}}}});var Oe=(0,L.Z)(M||0,v),le=u()(Oe,2),E=le[0],Te=le[1],Le=(0,L.Z)(null),de=u()(Le,2),Ae=de[0],ae=de[1],ce=function(t,x){var s=U==="rtl",I=t+1;if(b){var me=Me(t),pe=he(me),xe=me.clientWidth;(s&&x-pe>xe/2||!s&&x-pe<xe/2)&&(I-=.5)}return I},F=function(t){Te(t),Q==null||Q(t)},Be=r.useState(!1),se=u()(Be,2),Se=se[0],ue=se[1],Ue=function(){ue(!0),Y==null||Y()},Ke=function(){ue(!1),k==null||k()},je=r.useState(null),ie=u()(je,2),fe=ie[0],ve=ie[1],He=function(t,x){var s=ce(x,t.pageX);s!==Ae&&(ve(s),ae(null)),K==null||K(s)},Ie=function(t){i||(ve(null),ae(null),K==null||K(void 0)),t&&(ee==null||ee(t))},We=function(t,x){var s=ce(x,t.pageX),I=!1;G&&(I=s===E),Ie(),F(I?0:s),ae(I?s:null)},Ve=function(t){var x=t.keyCode,s=U==="rtl",I=b?.5:1;J&&(x===h.Z.RIGHT&&E<m&&!s?(F(E+I),t.preventDefault()):x===h.Z.LEFT&&E>0&&!s||x===h.Z.RIGHT&&E>0&&s?(F(E-I),t.preventDefault()):x===h.Z.LEFT&&E<m&&s&&(F(E+I),t.preventDefault())),q==null||q(t)};r.useEffect(function(){Pe&&!i&&re()},[]);var Ne=new Array(m).fill(0).map(function(p,t){return r.createElement(N,{ref:be(t),index:t,count:m,disabled:i,prefixCls:"".concat(o,"-star"),allowHalf:b,value:fe===null?E:fe,onClick:We,onHover:He,key:p||t,character:B,characterRender:C,focused:Se})}),Fe=(0,A.W)(o,y,O()(O()({},"".concat(o,"-disabled"),i),"".concat(o,"-rtl"),U==="rtl"));return r.createElement("ul",R()({className:Fe,onMouseLeave:Ie,tabIndex:i?-1:Re,onFocus:i?null:Ue,onBlur:i?null:Ke,onKeyDown:i?null:Ve,ref:ne},(0,W.Z)(_e,{aria:!0,data:!0,attr:!0})),Ne)}var Ce=r.forwardRef(ye),Ee=Ce},69945:function(f,a,e){e.r(a)},40717:function(f,a,e){e.r(a),e.d(a,{texts:function(){return c}});const c=[{value:"2020-11-17",paraId:0,tocIndex:1},{value:"fix: character type ",paraId:1,tocIndex:1},{value:"#102",paraId:1,tocIndex:1},{value:"2020-11-02",paraId:2,tocIndex:2},{value:"Update devDependencies include np/typescript/rc-tooltip",paraId:3,tocIndex:2},{value:"Add peerDependencies ",paraId:3,tocIndex:2},{value:"#97",paraId:3,tocIndex:2},{value:"2020-06-15",paraId:4,tocIndex:3},{value:"fix: improve defaultvalue more than half ",paraId:5,tocIndex:3},{value:"#86",paraId:5,tocIndex:3},{value:"fix: star tabindex when disabled ",paraId:6,tocIndex:3},{value:"#87",paraId:6,tocIndex:3},{value:"2020-06-12",paraId:7,tocIndex:4},{value:"feat: character support props ",paraId:8,tocIndex:4},{value:"#85",paraId:8,tocIndex:4},{value:"2020-06-10",paraId:9,tocIndex:5},{value:"feat: expand character ",paraId:10,tocIndex:5},{value:"#84",paraId:10,tocIndex:5},{value:"2020-05-29",paraId:11,tocIndex:6},{value:"\u{1F199} upgrade rc-util to 5.x",paraId:12,tocIndex:6},{value:"2020-04-16",paraId:13,tocIndex:7},{value:"feat: add direction rtl ",paraId:14,tocIndex:7},{value:"#80",paraId:14,tocIndex:7},{value:"chore: use father ",paraId:14,tocIndex:7},{value:"#81",paraId:14,tocIndex:7},{value:"Better accessibility support.",paraId:15,tocIndex:8},{value:"Add allowClear support.",paraId:16,tocIndex:9},{value:"Add keyboard support.",paraId:17,tocIndex:10},{value:"Add focus() blur() and autoFocus.",paraId:17,tocIndex:10},{value:"Fix typo ",paraId:18,tocIndex:11},{value:"charactor",paraId:18,tocIndex:11},{value:" to ",paraId:18,tocIndex:11},{value:"character",paraId:18,tocIndex:11},{value:".",paraId:18,tocIndex:11},{value:"Add ",paraId:19,tocIndex:12},{value:"character",paraId:19,tocIndex:12},{value:".",paraId:19,tocIndex:12},{value:"Add ",paraId:19,tocIndex:12},{value:"className",paraId:19,tocIndex:12},{value:".",paraId:19,tocIndex:12},{value:"Add ",paraId:19,tocIndex:12},{value:"onHoverChange(value)",paraId:19,tocIndex:12},{value:".",paraId:19,tocIndex:12}]},80597:function(f,a,e){e.r(a),e.d(a,{texts:function(){return c}});const c=[]},49726:function(f,a,e){e.r(a),e.d(a,{texts:function(){return c}});const c=[]},51446:function(f,a,e){e.r(a),e.d(a,{texts:function(){return c}});const c=[{value:"React Rate Component",paraId:0,tocIndex:0},{value:"CHANGELOG",paraId:1,tocIndex:2},{value:`npm install
npm start
`,paraId:2,tocIndex:3},{value:"Local: ",paraId:3,tocIndex:4},{value:"http://localhost:9001/",paraId:3,tocIndex:4},{value:"Online: ",paraId:4,tocIndex:4},{value:"http://react-component.github.io/rate/",paraId:4,tocIndex:4},{value:`import React from 'react';
import ReactDOM from 'react-dom';
import Rate from '@rc-component/rate';

ReactDOM.render(
  <Rate />,
  document.getElementById('root')
)
`,paraId:5,tocIndex:6},{value:"styled-components",paraId:6},{value:`import React from 'react';
import ReactDOM from 'react-dom';
import Rate from '@rc-component/rate';
import styled from 'styled-components';

const StyledRate = styled(Rate)\`
  &.rc-rate {
    font-size: \${({ size }) => size}px;
  }
\`

ReactDOM.render(
  <StyledRate size="24" />,
  document.getElementById('root')
)
`,paraId:7,tocIndex:7},{value:"name",paraId:8,tocIndex:9},{value:"type",paraId:8,tocIndex:9},{value:"default",paraId:8,tocIndex:9},{value:"description",paraId:8,tocIndex:9},{value:"count",paraId:8,tocIndex:9},{value:"number",paraId:8,tocIndex:9},{value:"5",paraId:8,tocIndex:9},{value:"Star numbers",paraId:8,tocIndex:9},{value:"value",paraId:8,tocIndex:9},{value:"number",paraId:8,tocIndex:9},{value:"-",paraId:8,tocIndex:9},{value:"Controlled value",paraId:8,tocIndex:9},{value:"defaultValue",paraId:8,tocIndex:9},{value:"number",paraId:8,tocIndex:9},{value:"0",paraId:8,tocIndex:9},{value:"Initial value",paraId:8,tocIndex:9},{value:"allowHalf",paraId:8,tocIndex:9},{value:"boolean",paraId:8,tocIndex:9},{value:"false",paraId:8,tocIndex:9},{value:"Support half star",paraId:8,tocIndex:9},{value:"allowClear",paraId:8,tocIndex:9},{value:"boolean",paraId:8,tocIndex:9},{value:"true",paraId:8,tocIndex:9},{value:"Reset when click again",paraId:8,tocIndex:9},{value:"style",paraId:8,tocIndex:9},{value:"object",paraId:8,tocIndex:9},{value:"{}",paraId:8,tocIndex:9},{value:"onChange",paraId:8,tocIndex:9},{value:"function",paraId:8,tocIndex:9},{value:"(value) => {}",paraId:8,tocIndex:9},{value:"onChange",paraId:8,tocIndex:9},{value:" will be triggered when click",paraId:8,tocIndex:9},{value:"onHoverChange",paraId:8,tocIndex:9},{value:"function",paraId:8,tocIndex:9},{value:"(value) => {}",paraId:8,tocIndex:9},{value:"onHoverChange",paraId:8,tocIndex:9},{value:" will be triggered when hover on stars",paraId:8,tocIndex:9},{value:"character",paraId:8,tocIndex:9},{value:"ReactNode | (props) => ReactNode",paraId:8,tocIndex:9},{value:"\u2605",paraId:8,tocIndex:9},{value:"The each character of rate",paraId:8,tocIndex:9},{value:"disabled",paraId:8,tocIndex:9},{value:"boolean",paraId:8,tocIndex:9},{value:"false",paraId:8,tocIndex:9},{value:"direction",paraId:8,tocIndex:9},{value:"string",paraId:8,tocIndex:9},{value:"ltr",paraId:8,tocIndex:9},{value:"The direction of rate",paraId:8,tocIndex:9},{value:`npm test
npm run chrome-test
`,paraId:9,tocIndex:10},{value:`npm run coverage
`,paraId:10,tocIndex:11},{value:"open coverage/ dir",paraId:11,tocIndex:11},{value:"rc-rate is released under the MIT license.",paraId:12,tocIndex:12}]},86834:function(f,a){a.Z=`@rate-prefix-cls: rc-rate;
@rate-star-color: #f5a623;
@font-size-base: 13px;

.@{rate-prefix-cls} {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
  font-weight: normal;
  font-style: normal;
  outline: none;

  &-rtl {
    direction: rtl;
  }

  &-disabled &-star {
    cursor: default;
    &:before,
    &-content:before {
      cursor: default;
    }
    &:hover {
      transform: scale(1);
    }
  }

  &-star {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 8px;
    position: relative;
    transition: all .3s;
    color: #e9e9e9;
    cursor: pointer;
    line-height: 1.5;

    .@{rate-prefix-cls}-rtl & {
      margin-right: 0;
      margin-left: 8px;
      float: right;
    }

    &-first,
    &-second {
      transition: all .3s;
    }

    &-focused, &:hover {
      transform: scale(1.1);
    }

    &-first {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      opacity: 0;

      .@{rate-prefix-cls}-rtl & {
        right: 0;
        left: auto;
      }
    }

    &-half &-first,
    &-half &-second {
      opacity: 1;
    }

    &-half &-first,
    &-full &-second {
      color: @rate-star-color;
    }

    &-half:hover &-first,
    &-full:hover &-second {
      color: tint(@rate-star-color,30%);
    }
  }
}

@icon-url: "//at.alicdn.com/t/font_r5u29ls31bgldi";

@font-face {
  font-family: 'anticon';
  src: url('@{icon-url}.eot'); /* IE9*/
  src: url('@{icon-url}.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('@{icon-url}.woff') format('woff'), /* chrome\u3001firefox */ url('@{icon-url}.ttf') format('truetype'), /* chrome\u3001firefox\u3001opera\u3001Safari, Android, iOS 4.2+*/ url('@{icon-url}.svg#iconfont') format('svg'); /* iOS 4.1- */
}

.anticon {
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  text-transform: none;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &:before {
    display: block;
    font-family: "anticon" !important;
  }
}

.anticon-star:before { content: "\\e660"; };
`},12391:function(f,a){a.Z=`/* eslint no-console: 0 */
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
`},25133:function(f,a){a.Z=`/* eslint no-console: 0 */
import React from 'react';
import Rate from '@rc-component/rate';
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
  </div>
);
`}}]);
