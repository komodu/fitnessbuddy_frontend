const CalendarWorkout = ({ exercises = [], workoutday }) => {
  const filteredExercise = Array.isArray(exercises.exercises)
    ? exercises.exercises.filter((exercise) => {
        console.log("exercise:", exercise.workoutType.name);

        return workoutday === exercise.workoutType.name;
      })
    : [];

  return (
    <div className="d-flex justify-content-center align-items-center">
      {filteredExercise.length === 0 ? (
        // If workoutday is Rest Day
        workoutday.toLowerCase() == "rest" ? (
          <p>
            Today is
            <span>
              <strong className="text-capitalize"> {workoutday} </strong>
            </span>{" "}
            Day!
          </p>
        ) : (
          // If the WorkoutDay is not Rest Day and no assigned Workout
          <p>
            There is no assigned workout in{" "}
            <span>
              <strong className="text-capitalize"> {workoutday}</strong>
            </span>
          </p>
        )
      ) : (
        // Shows the Filtered Exercises depends with Workout Plan assigned
        <>
          {" "}
          <ul>
            {filteredExercise.map((ex) => {
              return <li key={ex._id}>{ex.title}</li>;
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CalendarWorkout;
