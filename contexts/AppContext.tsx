import React, { createContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import { AppState, AppAction, AppContextType, NerveFinding, PatientData, Pathology } from '../types';
import { GoogleGenAI, Chat } from '@google/genai';

const getInitialState = (): AppState => {
    const savedData = localStorage.getItem('ncs-gp-guide-data');
    const patientData = savedData ? JSON.parse(savedData) : {
        history: '',
        riskFactors: [],
        findings: [],
    };
    return {
        patientData,
        expertReview: {
            text: '',
            isLoading: false,
            error: null
        },
        saveStatus: 'saved',
    };
};

const classifyPathology = (finding: NerveFinding): Pathology => {
  const isDemyelinating = finding.velocity === 'decreased' || finding.latency === 'increased';
  const isAxonal = finding.amplitude === 'decreased' || finding.amplitude === 'absent';

  if (isDemyelinating && isAxonal) return Pathology.Mixed;
  if (isDemyelinating) return Pathology.Demyelinating;
  if (isAxonal) return Pathology.Axonal;
  
  const isNormal = finding.amplitude === 'normal' && finding.latency === 'normal' && finding.velocity === 'normal';
  if(isNormal) return Pathology.Normal;

  return Pathology.Unclassified;
};


const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_HISTORY':
      return { ...state, patientData: { ...state.patientData, history: action.payload } };
    case 'SET_RISK_FACTORS':
      return { ...state, patientData: { ...state.patientData, riskFactors: action.payload } };
    case 'ADD_FINDING':
      const newFinding: NerveFinding = {
        id: new Date().toISOString(),
        nerve: '',
        side: 'left',
        type: 'motor',
        amplitude: 'normal',
        latency: 'normal',
        velocity: 'normal',
        fWave: 'normal',
        hWave: 'normal',
        pathology: Pathology.Unclassified,
        conflict: false,
        category: 'standard',
      };
      return { ...state, patientData: { ...state.patientData, findings: [...state.patientData.findings, newFinding] } };
    case 'ADD_NORMAL_FINDING': {
        const { nerve, side, type = 'motor', category = 'standard' } = action.payload;
        // Prevent adding duplicate normal nerves
        const exists = state.patientData.findings.some(f => f.nerve === nerve && f.side === side && f.pathology === Pathology.Normal);
        if(exists) return state;

        const normalFinding: NerveFinding = {
             id: new Date().toISOString(),
             nerve,
             side,
             type,
             amplitude: 'normal',
             latency: 'normal',
             velocity: 'normal',
             fWave: type === 'motor' ? 'normal' : undefined,
             hWave: 'normal',
             pathology: Pathology.Normal,
             conflict: false,
             category,
        };
         return { ...state, patientData: { ...state.patientData, findings: [...state.patientData.findings, normalFinding] } };
    }
    case 'REMOVE_FINDING':
      return { ...state, patientData: { ...state.patientData, findings: state.patientData.findings.filter(f => f.id !== action.payload) } };
    case 'UPDATE_FINDING':
      const { id, field, value } = action.payload;
      const updatedFindings = state.patientData.findings.map(f => {
        if (f.id === id) {
          const updatedFinding = { ...f, [field]: value };
          
          if (field !== 'userPathologyOverride') {
            updatedFinding.pathology = classifyPathology(updatedFinding);
          }
          
          updatedFinding.conflict = !!(updatedFinding.userPathologyOverride && updatedFinding.userPathologyOverride !== updatedFinding.pathology);
          return updatedFinding;
        }
        return f;
      });
      return { ...state, patientData: { ...state.patientData, findings: updatedFindings } };
    case 'SET_EXPERT_REVIEW_LOADING':
        return { ...state, expertReview: { ...state.expertReview, isLoading: action.payload, error: null } };
    case 'SET_EXPERT_REVIEW_SUCCESS':
        return { ...state, expertReview: { text: action.payload, isLoading: false, error: null } };
    case 'SET_EXPERT_REVIEW_ERROR':
        return { ...state, expertReview: { ...state.expertReview, error: action.payload, isLoading: false } };
    case 'CLEAR_DATA':
        localStorage.removeItem('ncs-gp-guide-data');
        return getInitialState(); // Reset to clean initial state
    case 'SET_SAVE_STATUS':
        return { ...state, saveStatus: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());
  
  // Auto-save to localStorage
  useEffect(() => {
    if (state.patientData) {
      localStorage.setItem('ncs-gp-guide-data', JSON.stringify(state.patientData));
      dispatch({ type: 'SET_SAVE_STATUS', payload: 'saved' });
    }
  }, [state.patientData]);

  const chat = useMemo(() => {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set.");
      return null;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({ 
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a neurophysiology expert assisting a General Practitioner. Provide clear, concise, and medically accurate advice. Always prioritize patient safety and suggest consulting a specialist neurologist for definitive diagnosis and management.'
        }
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, chat }}>
      {children}
    </AppContext.Provider>
  );
};