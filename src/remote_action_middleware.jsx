export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('inside moddleware: ' + action);
    socket.emit('action', action);
  }
  return next(action);
}
