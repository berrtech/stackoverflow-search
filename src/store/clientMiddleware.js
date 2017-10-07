export default function clientMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ payload: { ...rest }, type: REQUEST });

      const actionPromise = promise(dispatch);
      actionPromise.then(
        (payload) => {
          try {
            return next({ payload: { result: payload && payload.body ? payload.body : payload, ...rest }, type: SUCCESS });
          } catch (e) {
            console.error(e, REQUEST);
          }
        },
        (error) => {
          return next({ payload: { ...rest }, error, type: FAILURE });
        }
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ payload: { ...rest }, error, type: FAILURE });
      });

      return actionPromise;
    };
  };
}
