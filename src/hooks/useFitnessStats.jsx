import { useMemo } from "react";

export function useFitnessStats({
  workoutSessions,
  strengthBenchmark = 100,
  mobilityBenchmark = 5,
  volumeBenchmark = 5000,
}) {
  return useMemo(() => {
    let totalVolume = 0;
    let totalReps = 0;
    let totalTUT = 0;
    let totalRest = 0;
    let completedSessions = 0;

    workoutSessions.forEach((session) => {
      if (session.status === "completed") {
        completedSessions++;
      }

      session.workoutTypes.forEach((type) => {
        type.exercises.forEach((ex) => {
          ex.sets.forEach((set) => {
            totalVolume += set.reps * set.weight;
            totalReps += set.reps;
            totalTUT += set.duration;
            totalRest += set.restTime;
          });
        });
      });
    });
    // Average weight lifted
    const avgLoad = totalReps > 0 ? totalVolume / totalReps : 0;

    const strengthScore = Math.min(100, (avgLoad / strengthBenchmark) * 100);

    const cardioRatio = totalTUT > 0 ? totalTUT / (totalTUT + totalRest) : 0;

    const cardioScore = cardioRatio * 100;

    const avgRepTime = totalReps > 0 ? totalTUT / totalReps : 0;

    const mobilityScore = Math.min(100, (avgRepTime / mobilityBenchmark) * 100);

    const volumeScore = Math.min(100, (totalVolume / volumeBenchmark) * 100);

    const consistencyScore =
      workoutSessions.length > 0
        ? (completedSessions / workoutSessions.length) * 100
        : 0;

    return {
      strengthScore,
      cardioScore,
      mobilityScore,
      volumeScore,
      consistencyScore,
    };
  }, [workoutSessions, strengthBenchmark, mobilityBenchmark, volumeBenchmark]);
}
