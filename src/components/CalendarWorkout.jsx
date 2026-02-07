const CalendarWorkout = ({ exercises = [], workoutday }) => {
  console.log("calendarworkoutday: ", workoutday);
  const filteredExercise = Array.isArray(exercises.exercises)
    ? exercises.exercises.filter((exercise) => {
        console.log("exercise:", exercise.workoutType.name);

        return workoutday === exercise.workoutType.name;
      })
    : [];
  console.log("filteredCalendar: ", filteredExercise);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ul>
        {filteredExercise &&
          filteredExercise.map((ex) => {
            return <li key={ex._id}>{ex.title}</li>;
          })}
      </ul>
    </div>
  );
};

export default CalendarWorkout;
