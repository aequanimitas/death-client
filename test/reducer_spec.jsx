import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Human', 'Leprosy'),
          tally: Map({Human: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Human', 'Leprosy'],
        tally: {Human: 1}
      }
    }));
  });

  it('handles SET_STATE even with plain js payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',                      
      state: {
        vote: {
          pair: 'Human Leprosy'.split(' '),
          tally: {
            Human: 1
          }
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Human', 'Leprosy'],
        tally: {Human: 1}
      }
    }));
  });

  it('handles SET_STATE with undefined initial state', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',                      
      state: {
        vote: {
          pair: 'Human Leprosy'.split(' '),
          tally: {
            Human: 1
          }
        }
      }
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Human', 'Leprosy'],
        tally: {Human: 1}
      }
    }));
  });

  it('handles VOTE by changing has Voted', () => {
    const state = fromJS({
      vote: {
        pair: 'Human Leprosy'.split(' '),
        tally: {Human: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Human'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Human', 'Leprosy'],
        tally: {Human: 1}
      },
      hasVoted: 'Human'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: 'Human Leprosy'.split(' '),
        tally: {Human: 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Spiritual Healing'};
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Human', 'Leprosy'],
        tally: {Human: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const state = fromJS({
      vote: {
        pair: 'Human Leprosy'.split(' '),
        tally: {Human: 1}
      },
      hasVoted: 'Human'
    });
    const action = {
      type: 'SET_STATE', 
      state: {
        vote: {
          pair: ['Spiritual Healing', 'Screamy Bloody Gore']
        }
      }
    };
    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Spiritual Healing', 'Screamy Bloody Gore']
      }
    }));
  });
});
