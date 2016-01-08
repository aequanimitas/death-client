import React from 'react';

export default React.createClass({
  render: function() {
    return <div ref="winner"> Winner is {this.props.winner} </div>;
  }
});
