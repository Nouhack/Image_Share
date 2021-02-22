const InitialState = {
  userId: null,
  usetToken: null,
  cameraOn: false,
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        userId: action.id,
        usetToken: action.token,
      };
    case 'SET_CAMERA_STATE':
      return {
        ...state,
        cameraOn: action.val,
      };

    default:
      return state;
  }
};

export default reducer;
