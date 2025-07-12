import type React from 'react';
import { Chat } from '@google/genai';

export enum Pathology {
  Normal = 'normal',
  Demyelinating = 'demyelinating',
  Axonal = 'axonal',
  Mixed = 'mixed',
  Unclassified = 'unclassified'
}

export type FindingValue = 'normal' | 'increased' | 'decreased' | 'absent';

export type FWaveValue = 'normal' | 'delayed' | 'absent';

export interface NerveFinding {
  id: string;
  nerve: string;
  side: 'left' | 'right';
  type: 'motor' | 'sensory' | 'special';
  amplitude: FindingValue;
  latency: FindingValue;
  velocity: FindingValue;
  fWave?: FWaveValue; // Only for motor nerves
  hWave?: FindingValue; // For H-wave studies
  pathology: Pathology;
  userPathologyOverride?: Pathology;
  conflict: boolean;
  category?: 'standard' | 'special' | 'brachial_plexus' | 'repetitive';
}

export interface PatientData {
  history: string;
  riskFactors: string[];
  findings: NerveFinding[];
}

export interface AppState {
  patientData: PatientData;
  expertReview: {
    text: string;
    isLoading: boolean;
    error: string | null;
  };
  saveStatus: 'saved' | 'saving' | 'unsaved';
}

export type AppAction =
  | { type: 'SET_HISTORY'; payload: string }
  | { type: 'SET_RISK_FACTORS'; payload: string[] }
  | { type: 'ADD_FINDING' }
  | { type: 'ADD_NORMAL_FINDING'; payload: { nerve: string, side: 'left' | 'right', type?: 'motor' | 'sensory' | 'special', category?: 'standard' | 'special' | 'brachial_plexus' | 'repetitive' } }
  | { type: 'UPDATE_FINDING'; payload: { id: string; field: keyof NerveFinding; value: any } }
  | { type: 'REMOVE_FINDING'; payload: string }
  | { type: 'SET_EXPERT_REVIEW_LOADING'; payload: boolean }
  | { type: 'SET_EXPERT_REVIEW_SUCCESS'; payload: string }
  | { type: 'SET_EXPERT_REVIEW_ERROR'; payload: string }
  | { type: 'CLEAR_DATA' }
  | { type: 'SET_SAVE_STATUS'; payload: 'saved' | 'saving' | 'unsaved' };


export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  chat: Chat | null;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}