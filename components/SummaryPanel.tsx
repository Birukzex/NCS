
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../contexts/AppContext';
import { NerveFinding, Pathology } from '../types';
import { generateExpertReview } from '../services/geminiService';
import { PATHOLOGY_COLORS } from '../constants';
import { Icon } from './Icon';

const SummaryPanel: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)!;
  const { patientData, expertReview } = state;

  const abnormalFindings = useMemo(() => {
    return patientData.findings.filter(
      (f) => (f.userPathologyOverride || f.pathology) !== Pathology.Normal && f.nerve
    );
  }, [patientData.findings]);
  
  const handleExpertReview = async () => {
      dispatch({ type: 'SET_EXPERT_REVIEW_LOADING', payload: true });
      try {
        const result = await generateExpertReview(patientData);
        dispatch({ type: 'SET_EXPERT_REVIEW_SUCCESS', payload: result });
      } catch (err) {
        const error = err instanceof Error ? err.message : 'An unknown error occurred.';
        dispatch({ type: 'SET_EXPERT_REVIEW_ERROR', payload: error });
      }
  };
  
  const handleClearData = () => {
      if(window.confirm('Are you sure you want to clear all data for this session? This action cannot be undone.')) {
        dispatch({ type: 'CLEAR_DATA' });
      }
  };

  const renderFinding = (finding: NerveFinding) => {
    const pathology = finding.userPathologyOverride || finding.pathology;
    return (
        <li key={finding.id} className="flex items-start space-x-3">
          <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${PATHOLOGY_COLORS[pathology].replace('text-', 'bg-')}`}></div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-bold">{finding.nerve} ({finding.side}, {finding.type})</span>: {pathology}
          </p>
        </li>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Abnormal Findings Summary</h2>
        {abnormalFindings.length > 0 ? (
          <ul className="space-y-2">
            {abnormalFindings.map(renderFinding)}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No abnormal findings recorded.</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Decision Walkthrough & AI Review</h2>
        
        <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800 rounded-md p-4 min-h-[150px]">
          {expertReview.isLoading && <p>Generating expert review...</p>}
          {expertReview.error && <p className="text-red-500">Error: {expertReview.error}</p>}
          {expertReview.text ? (
             <div dangerouslySetInnerHTML={{ __html: expertReview.text.replace(/\n/g, '<br />') }} />
          ) : !expertReview.isLoading && (
            <p className="text-gray-500">Click "Get Expert Review" for AI-powered analysis, differential diagnosis, and reporting suggestions.</p>
          )}
        </div>

        <button
          onClick={handleExpertReview}
          disabled={expertReview.isLoading}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {expertReview.isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Icon name="bot" className="h-5 w-5" />
          )}
          <span>{expertReview.isLoading ? 'Analyzing...' : 'Get Expert Review'}</span>
        </button>
      </div>

       <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4">
            <button
                onClick={handleClearData}
                className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
            >
                <Icon name="trash" className="h-5 w-5" />
                <span>Clear Current Session</span>
            </button>
        </div>
    </div>
  );
};

export default SummaryPanel;