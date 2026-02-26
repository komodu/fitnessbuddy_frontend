export function aggregateExercisesData(workoutSessions, days = 7) {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - (days - 1));

  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dayString = date.toISOString().split("T")[0];

    // Filter sessions for this day
    const sessionsForDay = workoutSessions.filter((session) => {
      const sessionDate = new Date(session.startTime);
      return sessionDate.toISOString().split("T")[0] === dayString;
    });

    let maxSets = 0;
    let maxReps = 0;
    let maxWeight = 0;

    sessionsForDay.forEach((session) => {
      session.workoutTypes.forEach((type) => {
        type.exercises.forEach((ex) => {
          const setCount = ex.sets.length;
          if (setCount > maxSets) maxSets = setCount;

          ex.sets.forEach((set) => {
            if (set.reps > maxReps) maxReps = set.reps;
            if (set.weight > maxWeight) maxWeight = set.weight;
          });
        });
      });
    });

    data.push({
      date: dayString,
      sets: maxSets,
      reps: maxReps,
      weight: maxWeight,
    });
  }

  return data;
}
