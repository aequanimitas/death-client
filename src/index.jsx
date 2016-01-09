import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route, DefaultRoute} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './components/App';
import {Voting, VotingContainer} from './components/Voting';
import {Results, ResultsContainer} from './components/Results';

const store = createStore(reducer);
const socket = io(`${location.protocol}//${location.hostname}:12010`);
socket.on('state', (state) => {
  console.log('Inside socket callback on index.jsx');
  console.log(state);
  store.dispatch({
    type: 'SET_STATE', 
    state: state
  });
});
const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
