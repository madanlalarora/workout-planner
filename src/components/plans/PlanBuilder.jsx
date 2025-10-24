import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPlan, updatePlan, addWorkoutToPlan, deleteWorkoutFromPlan } from '../../store/slices/plansSlice';
import WorkoutBuilder from '../workouts/WorkoutBuilder';
import MuscleAnalytics from '../analytics/MuscleAnalytics';

function PlanBuilder({ planId, onBack }) {
  const dispatch = useDispatch();
  const plan = useSelector((state) =>
    state.plans.plans.find((p) => p.id === planId)
  );

  const [planName, setPlanName] = useState(plan?.name || '');
  const [planDescription, setPlanDescription] = useState(plan?.description || '');
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const isNewPlan = !plan;

  const handleSavePlan = () => {
    if (!planName.trim()) {
      alert('Please enter a plan name');
      return;
    }

    if (isNewPlan) {
      dispatch(createPlan({ name: planName, description: planDescription }));
      alert('Plan created! You can now add workouts.');
      onBack();
    } else {
      dispatch(updatePlan({ id: planId, name: planName, description: planDescription }));
      alert('Plan updated!');
    }
  };

  const handleAddWorkout = () => {
    if (isNewPlan) {
      alert('Please save the plan first before adding workouts');
      return;
    }
    const workoutName = prompt('Enter workout name (e.g., "Chest Day", "Leg Day"):');
    if (workoutName) {
      dispatch(addWorkoutToPlan({
        planId,
        workout: { name: workoutName, exercises: [] }
      }));
    }
  };

  const handleDeleteWorkout = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      dispatch(deleteWorkoutFromPlan({ planId, workoutId }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          ← Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold text-gray-800">
          {isNewPlan ? 'Create New Plan' : 'Edit Plan'}
        </h2>
      </div>

      {/* Plan Details Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Plan Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Push Pull Legs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your workout plan..."
              rows={3}
            />
          </div>
          <button
            onClick={handleSavePlan}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isNewPlan ? 'Create Plan' : 'Update Plan Details'}
          </button>
        </div>
      </div>

      {/* Workouts Section */}
      {!isNewPlan && plan && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Workouts</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex-1 sm:flex-none bg-green-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </button>
              <button
                onClick={handleAddWorkout}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Muscle Analytics */}
          {showAnalytics && (
            <div className="mb-6">
              <MuscleAnalytics plan={plan} />
            </div>
          )}

          {/* Workout List */}
          {plan.workouts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-6xl mb-4">💪</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">
                No Workouts Yet
              </h4>
              <p className="text-gray-500 mb-4">
                Add your first workout to get started
              </p>
              <button
                onClick={handleAddWorkout}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Workout
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {plan.workouts.map((workout) => (
                <WorkoutBuilder
                  key={workout.id}
                  planId={planId}
                  workout={workout}
                  isExpanded={editingWorkoutId === workout.id}
                  onToggle={() =>
                    setEditingWorkoutId(
                      editingWorkoutId === workout.id ? null : workout.id
                    )
                  }
                  onDelete={() => handleDeleteWorkout(workout.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PlanBuilder;
