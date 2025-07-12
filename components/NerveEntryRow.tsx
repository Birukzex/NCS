
import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { NerveFinding, Pathology, FindingValue, FWaveValue } from '../types';
import { NERVE_LIST, PATHOLOGY_COLORS, STANDARD_NERVES, SPECIAL_INVESTIGATIONS, BRACHIAL_PLEXUS_NERVES, REPETITIVE_STIMULATION } from '../constants';
import { Icon } from './Icon';

interface NerveEntryRowProps {
  finding: NerveFinding;
}

const ValueSelector: React.FC<{
    label: string;
    value: FindingValue;
    onChange: (value: FindingValue) => void;
}> = ({ label, value, onChange }) => {
    const options: {label: string, value: FindingValue}[] = [
        { label: 'N', value: 'normal' },
        { label: '↑', value: 'increased' },
        { label: '↓', value: 'decreased' },
        { label: 'Abs', value: 'absent' },
    ];
    
    const tooltip: {[key: string]: string} = {
        'N': 'Normal',
        '↑': label === 'Latency' ? 'Increased (Prolonged)' : 'Increased',
        '↓': label === 'Velocity' ? 'Decreased (Slowed)' : 'Decreased',
        'Abs': 'Absent'
    }

    return (
        <div>
            <label className="text-xs font-medium text-gray-500">{label}</label>
            <div className="mt-1 flex items-center space-x-1 bg-gray-200 dark:bg-gray-900 rounded-md p-1">
                {options.map(opt => (
                    <button
                        key={opt.value}
                        title={tooltip[opt.label]}
                        onClick={() => onChange(opt.value)}
                        className={`w-full text-xs font-semibold py-1 rounded transition-colors ${
                            value === opt.value
                                ? 'bg-blue-500 text-white shadow'
                                : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FWaveSelector: React.FC<{
    value: FWaveValue;
    onChange: (value: FWaveValue) => void;
}> = ({ value, onChange }) => {
    const options: {label: string, value: FWaveValue}[] = [
        { label: 'N', value: 'normal' },
        { label: 'Del', value: 'delayed' },
        { label: 'Abs', value: 'absent' },
    ];
    
    const tooltip: {[key: string]: string} = {
        'N': 'Normal',
        'Del': 'Delayed',
        'Abs': 'Absent'
    }

    return (
        <div>
            <label className="text-xs font-medium text-gray-500">F-Wave</label>
            <div className="mt-1 flex items-center space-x-1 bg-gray-200 dark:bg-gray-900 rounded-md p-1">
                {options.map(opt => (
                    <button
                        key={opt.value}
                        title={tooltip[opt.label]}
                        onClick={() => onChange(opt.value)}
                        className={`w-full text-xs font-semibold py-1 rounded transition-colors ${
                            value === opt.value
                                ? 'bg-blue-500 text-white shadow'
                                : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};


const NerveEntryRow: React.FC<NerveEntryRowProps> = ({ finding }) => {
  const { dispatch } = useContext(AppContext)!;
  const [showInfo, setShowInfo] = useState(false);

  const updateField = (field: keyof NerveFinding, value: any) => {
    dispatch({ type: 'UPDATE_FINDING', payload: { id: finding.id, field, value } });
  };
  
  const removeFinding = () => {
      dispatch({ type: 'REMOVE_FINDING', payload: finding.id });
  };
  
  const pathologyText = finding.userPathologyOverride ? finding.userPathologyOverride : finding.pathology;
  const pathologyColor = PATHOLOGY_COLORS[pathologyText];

  // Create comprehensive nerve list
  const getAllNerves = () => {
    const nerves: string[] = [];
    
    // Standard nerves
    Object.values(STANDARD_NERVES.upperLimb.motor).forEach(n => nerves.push(n.name));
    Object.values(STANDARD_NERVES.upperLimb.sensory).forEach(n => nerves.push(n.name));
    Object.values(STANDARD_NERVES.lowerLimb.motor).forEach(n => nerves.push(n.name));
    Object.values(STANDARD_NERVES.lowerLimb.sensory).forEach(n => nerves.push(n.name));
    
    // Special investigations
    Object.values(SPECIAL_INVESTIGATIONS.lowerLimb).forEach(n => nerves.push(n.name));
    Object.values(SPECIAL_INVESTIGATIONS.upperLimb).forEach(n => nerves.push(n.name));
    Object.values(SPECIAL_INVESTIGATIONS.other).forEach(n => nerves.push(n.name));
    
    // Brachial plexus nerves
    BRACHIAL_PLEXUS_NERVES.forEach(n => nerves.push(n.name));
    
    // Repetitive stimulation
    REPETITIVE_STIMULATION.forEach(n => nerves.push(n.name));
    
    return nerves.sort();
  };

  const teachingText: {[key: string]: string} = {
      'Sural Sensory': "Sural nerve sparing is a classic sign in certain demyelinating conditions like CIDP.",
      'Peroneal Motor': "The peroneal nerve is susceptible to compression at the fibular head.",
      'Median Motor': "Prolonged median motor latency across the wrist is a key indicator of Carpal Tunnel Syndrome.",
      'Tibial Motor': "Tibial nerve studies are important for evaluating lumbosacral radiculopathy.",
      'Ulnar Motor': "Ulnar nerve compression commonly occurs at the elbow (cubital tunnel).",
      'Facial Nerve Motor': "Facial nerve studies help evaluate Bell's palsy and other facial nerve disorders.",
      'Blink Reflex': "Blink reflex evaluates the trigeminal-facial reflex arc.",
      'H-Wave Study': "H-wave studies evaluate the monosynaptic reflex arc and can indicate radiculopathy."
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 relative">
      {/* Top row for selections */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
         {/* Nerve, Side, Type */}
        <div className="col-span-2 md:col-span-1 grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-500">Nerve</label>
              <select value={finding.nerve} onChange={(e) => updateField('nerve', e.target.value)} className="w-full mt-1 text-sm rounded-md border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select...</option>
                {getAllNerves().map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Side</label>
              <select value={finding.side} onChange={(e) => updateField('side', e.target.value)} className="w-full mt-1 text-sm rounded-md border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Type</label>
              <select value={finding.type} onChange={(e) => updateField('type', e.target.value)} className="w-full mt-1 text-sm rounded-md border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                <option value="motor">Motor</option>
                <option value="sensory">Sensory</option>
                <option value="special">Special</option>
              </select>
            </div>
        </div>
        
        {/* Measurements */}
        <div className="col-span-2 md:col-span-2 grid grid-cols-3 gap-3">
            <ValueSelector label="Amplitude" value={finding.amplitude} onChange={(v) => updateField('amplitude', v)} />
            <ValueSelector label="Latency" value={finding.latency} onChange={(v) => updateField('latency', v)} />
            <ValueSelector label="Velocity" value={finding.velocity} onChange={(v) => updateField('velocity', v)} />
        </div>
      </div>
      
      {/* F-Wave and H-Wave row */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {finding.type === 'motor' && (
          <FWaveSelector 
            value={finding.fWave || 'normal'} 
            onChange={(v) => updateField('fWave', v)} 
          />
        )}
        <ValueSelector 
          label="H-Wave" 
          value={finding.hWave || 'normal'} 
          onChange={(v) => updateField('hWave', v)} 
        />
      </div>
      
      {/* Bottom row for pathology and actions */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold">Pathology:</span>
            <span className={`text-sm font-bold capitalize ${pathologyColor}`}>{pathologyText.replace('_', ' ')}</span>
            {finding.conflict && (
                <div className="flex items-center text-yellow-600 dark:text-yellow-400" title="Conflict detected: Auto-classification and manual override disagree.">
                    <Icon name="warning" className="h-5 w-5" />
                </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
                <label className="text-xs font-medium text-gray-500 mr-2">Override:</label>
                <select value={finding.userPathologyOverride || ''} onChange={(e) => updateField('userPathologyOverride', e.target.value || undefined)} className="text-sm rounded-md border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Auto</option>
                    {Object.values(Pathology).filter(p => p !== 'unclassified').map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
                </select>
            </div>
             <div className="relative">
                <button onClick={() => setShowInfo(!showInfo)} className="p-1 text-gray-400 hover:text-blue-500">
                    <Icon name="info" className="h-5 w-5" />
                </button>
                {showInfo && teachingText[finding.nerve] && (
                    <div className="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 right-0">
                        {teachingText[finding.nerve]}
                    </div>
                )}
            </div>
            <button onClick={removeFinding} className="p-1 text-gray-400 hover:text-red-500">
                <Icon name="trash" className="h-5 w-5" />
            </button>
          </div>
      </div>
    </div>
  );
};

export default NerveEntryRow;
