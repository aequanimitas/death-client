import React from 'react'
import ReactDOM from 'react-dom'
import {Map, List} from 'immutable';
import ReactTestUtils from 'react-addons-test-utils';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {
  renderIntoDocument, 
  scryRenderedDOMComponentsWithTag, 
  scryRenderedDOMComponentsWithClass, 
  Simulate
} = ReactTestUtils;

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Human', 'Leprosy');
    const tally = Map({'Human': 5});
    const component = renderIntoDocument(<Results pair={pair} tally={tally} />);
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [human, lepro] = entries.map(e => e.textContent);
    
    expect(entries.length).to.equal(2);
    expect(human).to.contain('Human');
    expect(human).to.contain('5');
    expect(lepro).to.contain('Leprosy');
    expect(lepro).to.contain('0');
  });

  it('renders entries with vote counts or zero', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = List.of('Human', 'Leprosy');
    const component = renderIntoDocument(<Results pair={pair} tally={Map()} next={next}/>);
    Simulate.click(React.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const pair = List.of('Human', 'Leprosy');
    const component = renderIntoDocument(<Results pair={pair} tally={Map()} winner="Human" />);
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Human');
  });

});
