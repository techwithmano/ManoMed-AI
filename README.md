# ManoMed AI - Medical Symptom Analysis Tool

ManoMed AI is an AI-powered medical symptom analysis tool that helps users understand potential medical conditions based on their symptoms and medical history. This project was developed as part of a university course to demonstrate the integration of AI in healthcare applications.

## Features

- 🤖 AI-powered symptom analysis
- 📝 Interactive questionnaire generation
- 🏥 Medical condition likelihood assessment
- 💬 User-friendly interface
- 🌙 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI
- **UI Components**: Radix UI
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google GenAI API key

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd mano-med-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google GenAI API key:
```
GOOGLE_GENAI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:9002`

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── ai/              # AI integration and flows
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Usage

1. Enter your symptoms in the main form
2. Optionally provide your medical history
3. Submit to generate a questionnaire
4. Answer the generated questions
5. View potential conditions with likelihood scores

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- University course instructors
- Google GenAI team
- Next.js and React communities
