const CalendarWorkout = ({ exercises = [], workoutday }) => {
  console.log("calendarworkoutday: ", workoutday);
  const filteredExercise = Array.isArray(exercises.exercises)
    ? exercises.exercises.filter((exercise) => {
        console.log("exercise:", exercise.workoutType.name);

        return workoutday === exercise.workoutType.name;
      })
    : [];
  console.log("filteredCalendar: ", filteredExercise);
  console.log(filteredExercise.length);
  console.log(workoutday);
  return (
    <div className="d-flex justify-content-center align-items-center">
      {filteredExercise.length === 0 ? (
        workoutday.toLowerCase() == "rest" ? (
          <p>
            Today is
            <span>
              <strong className="text-capitalize"> {workoutday} </strong>
            </span>{" "}
            Day!
          </p>
        ) : (
          <p>
            There is no assigned workout in{" "}
            <span>
              <strong className="text-capitalize"> {workoutday}</strong>
            </span>
          </p>
        )
      ) : (
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
