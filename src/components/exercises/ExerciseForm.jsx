import { useState } from 'react';
import { allMuscles } from '../../data/initialExercises';

function ExerciseForm({ exercise, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: exercise?.id || '',
    name: exercise?.name || '',
    category: exercise?.category || 'compound',
    muscles: exercise?.muscles || []
  });

  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedWeight, setSelectedWeight] = useState(1);

  const handleAddMuscle = () => {
    if (!selectedMuscle) return;

    const muscleExists = formData.muscles.some((m) => m.muscle === selectedMuscle);
    if (muscleExists) {
      alert('This muscle is already added');
      return;
    }

    setFormData({
      ...formData,
      muscles: [...formData.muscles, { muscle: selectedMuscle, weight: selectedWeight }]
    });
    setSelectedMuscle('');
    setSelectedWeight(1);
  };

  const handleRemoveMuscle = (index) => {
    setFormData({
      ...formData,
      muscles: formData.muscles.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.muscles.length === 0) {
      alert('Please provide exercise name and at least one muscle target');
      return;
    }
    onSubmit(formData);
  };

  const getImpactColor = (weight) => {
    switch (weight) {
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Exercise Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Bench Press"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="compound">Compound</option>
          <option value="isolation">Isolation</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Muscles
        </label>

        <div className="flex gap-2 mb-3">
          <select
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select muscle...</option>
            {allMuscles.map((muscle) => (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            ))}
          </select>

          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={1}>Low Impact</option>
            <option value={2}>Medium Impact</option>
            <option value={3}>High Impact</option>
          </select>

          <button
            type="button"
            onClick={handleAddMuscle}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {formData.muscles.map((muscleTarget, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800 capitalize">
                  {muscleTarget.muscle}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(muscleTarget.weight)}`}>
                  {muscleTarget.weight === 1 ? 'Low' : muscleTarget.weight === 2 ? 'Medium' : 'High'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMuscle(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {formData.muscles.length === 0 && (
          <p className="text-sm text-gray-500 italic">No muscles added yet</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {exercise ? 'Update Exercise' : 'Add Exercise'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ExerciseForm;
