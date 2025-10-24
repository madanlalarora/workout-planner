import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Navigation from './components/layout/Navigation';
import Dashboard from './components/plans/Dashboard';
import PlanBuilder from './components/plans/PlanBuilder';
import ExerciseManager from './components/exercises/ExerciseManager';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            onEditPlan={(planId) => {
              setSelectedPlanId(planId);
              setCurrentView('plan-builder');
            }}
            onCreatePlan={() => {
              setSelectedPlanId(null);
              setCurrentView('plan-builder');
            }}
          />
        );
      case 'plan-builder':
        return (
          <PlanBuilder
            planId={selectedPlanId}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'exercises':
        return <ExerciseManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
        <main className="container mx-auto px-4 py-6 flex-1">
          {renderView()}
        </main>
        <footer className="bg-white border-t border-gray-200 py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 text-sm">
              Made with <span className="text-red-500">❤️</span> by{' '}
              <a
                href="https://in.linkedin.com/in/madanlalarora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                Madanlal Arora
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
