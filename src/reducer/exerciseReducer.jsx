export const exercisesReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXERCISES":
      return {
        exercises: action.payload,
      };
    case "CREATE_EXERCISE":
      return {
        exercises: [action.payload, ...state.exercises],
      };
    case "DELETE_EXERCISE":
      return {
        exercises: state.exercises.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};
