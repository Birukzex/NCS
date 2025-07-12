
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import type { Message, PatientData } from '../types';

// This is a simplified client-side setup. In a real app, API key management
// should be handled securely on a backend.
const getAI = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const formatPatientDataForPrompt = (data: PatientData): string => {
    let prompt = `Patient History: ${data.history || 'Not provided'}\n\n`;
    prompt += `Risk Factors: ${data.riskFactors.length > 0 ? data.riskFactors.join(', ') : 'None listed'}\n\n`;
    prompt += 'NCS Findings:\n';
    data.findings.forEach(f => {
        if (f.nerve) {
             const pathology = f.userPathologyOverride || f.pathology;
             prompt += `- ${f.nerve} (${f.side}, ${f.type}): Amplitude=${f.amplitude}, Latency=${f.latency}, Velocity=${f.velocity}. Interpretation: ${pathology}\n`;
        }
    });
    return prompt;
};

export const generateExpertReview = async (patientData: PatientData): Promise<string> => {
    const ai = getAI();
    
    const prompt = `
You are a neurophysiology expert assisting a General Practitioner with interpreting Nerve Conduction Study (NCS) results.
The user provides qualitative inputs (normal, increased, decreased, absent) instead of exact numbers.
'increased' latency is abnormal (prolonged). 'decreased' velocity is abnormal (slowed). 'decreased' or 'absent' amplitude is abnormal.

Based on the following data, please provide:
1.  **Diagnostic Reasoning:** A brief analysis of the patterns in the findings (e.g., "The pattern of decreased velocities and prolonged latencies is suggestive of a demyelinating process.").
2.  **Suggested Additional Tests:** What other tests might help clarify the diagnosis?
3.  **Draft Report Summary:** A concise summary suitable for a patient's chart.

**Patient Data:**
${formatPatientDataForPrompt(patientData)}

Structure your response clearly with headings for each section.
`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get expert review from AI. Please check your connection and API key.");
    }
};


export const generateChatResponseStream = async (chat: Chat, newMessage: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    try {
        const result = await chat.sendMessageStream({ message: newMessage });
        return result;
    } catch (error) {
        console.error("Error calling Gemini Chat API:", error);
        throw new Error("Failed to get chat response from AI.");
    }
};
