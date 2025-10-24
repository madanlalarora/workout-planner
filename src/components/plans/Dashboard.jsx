import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlan } from '../../store/slices/plansSlice';
import PlanCard from './PlanCard';
import ExportPlanModal from './ExportPlanModal';

function Dashboard({ onEditPlan, onCreatePlan }) {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.plans);
  const [exportingPlan, setExportingPlan] = useState(null);

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this workout plan?')) {
      dispatch(deletePlan(planId));
    }
  };

  const handleExportPlan = (plan) => {
    setExportingPlan(plan);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Workout Plans</h2>
          <p className="text-gray-600 mt-1">
            {plans.length} {plans.length === 1 ? 'plan' : 'plans'} created
          </p>
        </div>
        <button
          onClick={onCreatePlan}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Create New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏋️</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Workout Plans Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first workout plan to get started
          </p>
          <button
            onClick={onCreatePlan}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Your First Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => onEditPlan(plan.id)}
              onExport={() => handleExportPlan(plan)}
              onDelete={() => handleDeletePlan(plan.id)}
            />
          ))}
        </div>
      )}

      {/* Export Modal */}
      {exportingPlan && (
        <ExportPlanModal
          plan={exportingPlan}
          onClose={() => setExportingPlan(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
