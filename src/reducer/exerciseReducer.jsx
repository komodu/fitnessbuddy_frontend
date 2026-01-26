// Form Reducer Initial State
const initialStates = {
  title: "",
  load: "",
  reps: "",
  workoutType: "",
  workoutTypes: [],
  error: null,
  emptyFields: [],
};

const exercisesReducer = (state, action) => {
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

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
        emptyFields: action.emptyFields || [],
      };
    case "SET_WORKOUT_TYPES":
      return { ...state, workoutTypes: action.payload };
    case "RESET_FORM":
      return {
        ...state,
        title: "",
        load: "",
        reps: "",
        workoutType: "",
      };
    default:
      return state;
  }
}

export { initialStates, formReducer, exercisesReducer };
