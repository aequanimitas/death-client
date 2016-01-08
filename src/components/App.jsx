import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Human', 'Leprosy');
const tally = Map({'Human': 5, 'Leprosy': 4});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
})
