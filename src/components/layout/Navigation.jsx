function Navigation({ currentView, onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: 'Workout Plans', icon: '📋' },
    { id: 'exercises', label: 'Exercise Library', icon: '💪' }
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏋️</span>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Workout Dashboard</h1>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-1 sm:mr-2">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
