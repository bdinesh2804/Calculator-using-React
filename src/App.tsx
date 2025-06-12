import React from 'react';
import { Calculator } from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculator</h1>
          <p className="text-gray-600">Quick Assistant for Calculations</p>
        </div>
        <Calculator />
      </div>
    </div>
  );
}

export default App;