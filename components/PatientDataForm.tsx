
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { DEFAULT_RISK_FACTORS, STANDARD_NERVES, SPECIAL_INVESTIGATIONS, BRACHIAL_PLEXUS_NERVES, REPETITIVE_STIMULATION } from '../constants';
import NerveEntryRow from './NerveEntryRow';

const PatientDataForm: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)!;
  const { patientData } = state;

  const handleHistoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_HISTORY', payload: e.target.value });
  };

  const handleRiskFactorToggle = (factor: string) => {
    const newFactors = patientData.riskFactors.includes(factor)
      ? patientData.riskFactors.filter((f) => f !== factor)
      : [...patientData.riskFactors, factor];
    dispatch({ type: 'SET_RISK_FACTORS', payload: newFactors });
  };
  
  const addFinding = () => {
    dispatch({ type: 'ADD_FINDING' });
  };
  
  const addNormalFinding = (nerve: string, side: 'left' | 'right', type: 'motor' | 'sensory' | 'special' = 'motor', category: 'standard' | 'special' | 'brachial_plexus' | 'repetitive' = 'standard') => {
      dispatch({ type: 'ADD_NORMAL_FINDING', payload: { nerve, side, type, category } });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Patient History & Risk Factors</h2>
        
        <div className="mb-4">
          <label htmlFor="history" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Clinical History</label>
          <textarea
            id="history"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-800"
            value={patientData.history}
            onChange={handleHistoryChange}
            placeholder="e.g., 55 y/o male with 6 months of numbness and tingling in feet..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Common Risk Factors</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {DEFAULT_RISK_FACTORS.map((factor) => (
              <button
                key={factor}
                onClick={() => handleRiskFactorToggle(factor)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  patientData.riskFactors.includes(factor)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Special Investigations */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Special Investigations</h3>
        
        {/* Lower Limb Special */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Lower Limb Special</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {SPECIAL_INVESTIGATIONS.lowerLimb.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', nerve.hasFWave ? 'motor' : 'sensory', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', nerve.hasFWave ? 'motor' : 'sensory', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">R</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upper Limb Special */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Upper Limb Special</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {SPECIAL_INVESTIGATIONS.upperLimb.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', nerve.hasFWave ? 'motor' : 'sensory', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', nerve.hasFWave ? 'motor' : 'sensory', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">R</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Special */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Other Special Studies</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {SPECIAL_INVESTIGATIONS.other.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', 'special', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', 'special', 'special')} className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">R</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brachial Plexus */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Brachial Plexus Studies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {BRACHIAL_PLEXUS_NERVES.map(nerve => (
            <div key={nerve.name} className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
              <div className="flex justify-around">
                <button onClick={() => addNormalFinding(nerve.name, 'left', nerve.hasFWave ? 'motor' : 'sensory', 'brachial_plexus')} className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 rounded hover:bg-purple-200 dark:hover:bg-purple-700">L</button>
                <button onClick={() => addNormalFinding(nerve.name, 'right', nerve.hasFWave ? 'motor' : 'sensory', 'brachial_plexus')} className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 rounded hover:bg-purple-200 dark:hover:bg-purple-700">R</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repetitive Stimulation */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Repetitive Stimulation Studies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {REPETITIVE_STIMULATION.map(nerve => (
            <div key={nerve.name} className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
              <div className="flex justify-around">
                <button onClick={() => addNormalFinding(nerve.name, 'left', 'special', 'repetitive')} className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 rounded hover:bg-orange-200 dark:hover:bg-orange-700">L</button>
                <button onClick={() => addNormalFinding(nerve.name, 'right', 'special', 'repetitive')} className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 rounded hover:bg-orange-200 dark:hover:bg-orange-700">R</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Add Standard Nerves</h3>
        
        {/* Upper Limb */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Upper Limb</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {STANDARD_NERVES.upperLimb.motor.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', 'motor', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', 'motor', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">R</button>
                </div>
              </div>
            ))}
            {STANDARD_NERVES.upperLimb.sensory.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', 'sensory', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', 'sensory', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">R</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Limb */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Lower Limb</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {STANDARD_NERVES.lowerLimb.motor.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', 'motor', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', 'motor', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">R</button>
                </div>
              </div>
            ))}
            {STANDARD_NERVES.lowerLimb.sensory.map(nerve => (
              <div key={nerve.name} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-center text-gray-600 dark:text-gray-300">{nerve.name}</span>
                <div className="flex justify-around">
                  <button onClick={() => addNormalFinding(nerve.name, 'left', 'sensory', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">L</button>
                  <button onClick={() => addNormalFinding(nerve.name, 'right', 'sensory', 'standard')} className="px-3 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700">R</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Nerve Conduction Findings</h2>
        <div className="space-y-4">
          {patientData.findings.length > 0 ? (
            patientData.findings.map((finding) => (
              <NerveEntryRow key={finding.id} finding={finding} />
            ))
          ) : (
             <p className="text-center text-gray-500 dark:text-gray-400 py-4">No findings added. Use "Quick Add" for normal nerves or "Add Nerve Test" for abnormals.</p>
          )}
        </div>
        <button
          onClick={addFinding}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          + Add Abnormal/Custom Nerve Test
        </button>
      </div>
    </div>
  );
};

export default PatientDataForm;