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
});
