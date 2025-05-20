import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, primaryColor, secondaryColor, toggleTheme, setPrimaryColor, setSecondaryColor } = useTheme();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Toggle Section */}
        <div className="bg-card p-6 rounded-lg  border border-border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Theme Settings</h2>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Color Settings Section */}
        <div className="bg-card p-6 rounded-lg  border border-border">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Color Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <span className="text-muted-foreground">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 w-20 rounded cursor-pointer"
                />
                <span className="text-muted-foreground">{secondaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 