import {Map, List} from 'immutable';

function setState(state, newState) {
  return state.merge(state, newState);
}

function resetVote(state) {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

function vote(state, entry) {
  console.log('Inside vote: ' + entry);
  let temp = state.getIn(['vote', 'pair']);
  if (temp && temp.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch(action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}
