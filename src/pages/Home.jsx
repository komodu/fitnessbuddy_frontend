import { useEffect, useState, useContext } from "react";
import { ExercisesContext, ModalContext } from "@/context/Context";
import ExerciseDetails from "@/components/ExerciseDetails";
import UniversalModal from "@/components/UniversalModal";
import ExerciseForm from "@/components/ExerciseForm";
import LoaderSVG from "@/assets/img/loader.svg";

const Home = () => {
  const { exercises, dispatch } = useContext(ExercisesContext);
  const { openModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercise");
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_EXERCISES", payload: json });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchWorkoutTypes = async () => {
      try {
        const response = await fetch("/api/workouttypes");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUT_TYPES", payload: json });
        }
      } catch (err) {
        console.err(err);
      }
    };
    fetchWorkoutTypes();
    fetchExercises();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container-fluid home d-flex justify-content-center align-items-center min-vh-100">
        <img src={LoaderSVG} style={{ width: 60, height: 60 }} />
      </div>
    );
  }

  return (
    <div className="container-fluid home px-3 px-md-5">
      <UniversalModal />
      {/* Action Button */}
      <div className="row mb-4 ">
        <div className="col d-flex justify-content-center justify-content-md-end">
          <button
            className="btn btn-primary btn-lg w-100 w-md-auto"
            onClick={() => openModal("Exercise Form", <ExerciseForm />)}
          >
            Add Exercise
          </button>
        </div>
      </div>
      <div className="card p-4 shadow-sm">
        {/* Empty State */}
        {!exercises || exercises.length === 0 ? (
          <div className="row text-center">
            <div className="col">
              <img src="./images/warning.png" height="80" alt="No data" />
              <p className="mt-2">No Data fetched</p>
            </div>
          </div>
        ) : (
          /* Exercise Grid */
          <div className="row g-3">
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <ExerciseDetails exercise={exercise} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
