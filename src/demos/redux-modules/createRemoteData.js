const prefix = "my-app/remote-data/";

export const REQUEST_SUBMIT = `${prefix}/REQUEST_SUBMIT`;
export const REQUEST_SUCCESS = `${prefix}/REQUEST_SUCCESS`;
export const REQUEST_ERROR = `${prefix}/REQUEST_ERROR`;

export const InitialState = {
  data: null,
  isLoading: false,
  error: null
};

export default function createRemoteData(options) {
  const { name, asyncRequest } = options;

  return {
    name,

    select: state => state[name],

    requestData: (...args) => async dispatch => {
      dispatch({ type: REQUEST_SUBMIT, meta: { name } });
      try {
        const data = await asyncRequest(...args);
        dispatch({ type: REQUEST_SUCCESS, payload: data, meta: { name } });
      } catch (error) {
        dispatch({ type: REQUEST_ERROR, payload: error, meta: { name } });
      }
    },

    reducer: (state = InitialState, action) => {
      // Check that the action.meta.name key corresponds to this Redux module instance
      if (!action || !action.meta || !action.meta.name === name) return state;

      switch (action.type) {
        case REQUEST_SUBMIT:
          return { ...state, isLoading: true };

        case REQUEST_SUCCESS:
          return { data: action.payload, isLoading: false, error: null };

        case REQUEST_ERROR:
          return { data: null, isLoading: false, error: action.payload };
      }
    }
  };
}
