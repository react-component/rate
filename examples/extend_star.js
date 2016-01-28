import 'rc-rate/assets/extend.less';
import Rate from 'rc-rate';
import React from 'react';
import ReactDOM from 'react-dom';

const ExtendStar = React.createClass({
    getInitialState:function(){
      return {
        num: 3.5,
      }
    },
    hoverHandler:function(num){
        this.setState({num});
    },
    render:function(){
      const hover = this.hoverHandler;
      return (<div className="extend-starbar">
          <Rate prefixCls="extend" half={true} disableHover={false} onHover={hover} />
          <div className="warn-info">{this.state.num}</div>
        </div>);
    }
})

ReactDOM.render(<ExtendStar />, document.getElementById('__react-content'));
