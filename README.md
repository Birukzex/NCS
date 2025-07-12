# NCS GP Guide

A comprehensive neurophysiology guide for General Practitioners to assist with Nerve Conduction Study (NCS) interpretation and patient management.

## Features

- **Comprehensive Nerve Studies**: Support for all major nerves including:
  - **Standard Nerves**: Median, Ulnar, Peroneal, Tibial, Sural (motor and sensory)
  - **Special Investigations**: Anterior Tibial, Superficial Peroneal, Transcarpal, Ulnar Inching, Facial Nerve, Blink Reflex, SSR, Femoral Lateral Cutaneous, Plantar, H-Wave Studies
  - **Brachial Plexus Studies**: Complete brachial plexus nerve testing including Musculocutaneous, Axillary, Suprascapular, and more
  - **Repetitive Stimulation**: For myasthenia gravis evaluation
- **F-Wave Analysis**: Automatic F-wave testing for motor nerves (normal, delayed, absent)
- **H-Wave Studies**: H-wave evaluation for radiculopathy assessment
- **Automated Pathology Classification**: Automatically classify findings as normal, demyelinating, axonal, or mixed
- **Expert Review**: Get AI-powered expert analysis using Google's Gemini AI
- **Interactive Chat**: Chat with an AI neurophysiology expert for guidance
- **Offline Capable**: Works offline with PWA features
- **Responsive Design**: Works on desktop and mobile devices

## Run Locally

**Prerequisites:** Node.js (version 16 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Data Entry**: Start by entering patient history and risk factors
2. **Add Standard Nerves**: Use "Quick Add" buttons for common nerves (Median, Ulnar, Peroneal, Tibial, Sural)
3. **Special Investigations**: Add specialized tests like F-wave studies, H-wave studies, and brachial plexus testing
4. **F-Wave Analysis**: Motor nerves automatically include F-wave testing (normal, delayed, absent)
5. **Review**: Check the summary panel for automated pathology classification
6. **Expert Analysis**: Get AI-powered expert review of the findings
7. **Chat**: Use the chat feature for additional guidance

### Nerve Categories

- **Standard Nerves**: Basic motor and sensory nerve conduction studies
- **Special Investigations**: Advanced studies for specific conditions
- **Brachial Plexus**: Complete brachial plexus evaluation
- **Repetitive Stimulation**: For neuromuscular junction disorders

## Build for Production

```bash
npm run build
npm run preview
```

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- React Router
- PWA Support
