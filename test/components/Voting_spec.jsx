import React from 'react'
import ReactDOM from 'react-dom'
import {List} from 'immutable';
import ReactTestUtils from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = ReactTestUtils;

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(<Voting pair={["Human", "Leprosy"]} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Human');
    expect(buttons[1].textContent).to.equal('Leprosy');
  });

  it('invoke callback when button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;
    const component = renderIntoDocument(<Voting pair={["Human", "Leprosy"]} vote={vote}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Human');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(<Voting hasVoted="Human" pair={["Human", "Leprosy"]} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to voted entry', () => {
    const component = renderIntoDocument(<Voting hasVoted="Human" pair={["Human", "Leprosy"]} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Voted');
  });
  
  it('just renders winner if a winner is present', () => {
    const component = renderIntoDocument(<Voting winner="Human" pair={["Human", "Leprosy"]} />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Human');
  });

  it('renders as a pure component', () => {
    const pair = List.of('Human', 'Leprosy');
    let component = renderIntoDocument(<Voting pair={pair} />);
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Human');

    let newPair = pair.set(0, 'Screamy Bloody Gore');
    component = renderIntoDocument(<Voting pair={newPair} />);
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Screamy Bloody Gore');
  });
});
