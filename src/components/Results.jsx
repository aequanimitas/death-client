import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  getVotes: function(entry) {
    return this.props.tally && this.props.tally.has(entry) ? 
      this.props.tally.get(entry) :
      0;
  },
  render: function() {
    const pair = this.props.pair || [];
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
        {pair.map(entry =>
           <div key={entry} className="entry">
             <h1>{entry}</h1>
             <div className="voteCount">
               {this.getVotes(entry)}
             </div>
           </div>
        )}
        </div>
        <div className="management">
          <button ref="next" className="next" onClick={this.props.next}>Next</button>
        </div>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  };
}

export const ResultsContainer = connect(mapStateToProps)(Results);
