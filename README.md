# ManoMed AI - Medical Symptom Analysis Tool

ManoMed AI is an AI-powered medical symptom analysis tool that helps users understand potential medical conditions based on their symptoms and medical history. This project was developed as part of a university course to demonstrate the integration of AI in healthcare applications.
 
## Guide and testing 📼: 
 
 https://youtu.be/rHkbJoBnmPk?si=lFO8nr5jbJWZbyQu

## Deployments:
 
 🔗 https://manomedai.com
 
## Preview

### Landing page 
![Screenshot (589)](https://github.com/user-attachments/assets/262d3445-8097-4003-a325-3bef59417f2b)
![Screenshot (582)](https://github.com/user-attachments/assets/3d396d8b-c05e-432d-8d7f-32bef332f32a)


### Questionaire
![Screenshot (583)](https://github.com/user-attachments/assets/c5b48f64-015b-4cec-bff2-db10c6df908e)
![Screenshot (588)](https://github.com/user-attachments/assets/04261959-3fd0-4dc5-abab-726dd268981f)
![Screenshot (587)](https://github.com/user-attachments/assets/5cf76c15-0541-4830-b7b6-1fa97aa94ef7)
![Screenshot (584)](https://github.com/user-attachments/assets/02672aca-6309-4ca1-8295-bceeb6dfc6ae)

### Analysis
![Screenshot (585)](https://github.com/user-attachments/assets/067a5ce6-eca0-44d2-b27e-b653d4337138)
![Screenshot (586)](https://github.com/user-attachments/assets/e97115ad-7e21-4087-b9ed-f61de1c983bf)

## Features

- 🤖 AI-powered symptom analysis
- 📝 Interactive questionnaire generation
- 🏥 Medical condition likelihood assessment
- 💬 User-friendly interface
- 🌙 Dark/Light mode support
- �� Responsive design
- 🎨 Custom branding and favicon

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Deployment**: Vercel

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
│   ├── layout.tsx    # Root layout with favicon and metadata
│   └── page.tsx      # Main page component
├── components/       # React components
├── ai/              # AI integration and flows
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
public/
├── icon.ico         # Custom favicon
└── ...              # Other static assets
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

## Deployment

The application is deployed on Vercel and automatically updates when changes are pushed to the main branch. The deployment includes:

- Custom favicon and branding
- Environment variable configuration
- Automatic HTTPS
- Global CDN distribution

## License & Usage Terms

**This project is protected under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).**

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

### You are allowed to:
- View and explore the project for personal, non-commercial, read-only purposes.
- Share the project **as-is** with **proper credit** to the original creator.

### You are **not** allowed to:
- Copy or fork this repository.
- Modify, reuse, or create derivatives of any part of the code.
- Use this project (or parts of it) for academic, commercial, research, or educational purposes.
- Rebrand, rename, or redistribute this project under any form.

> **This work is the intellectual property of Abdulrahman (a.k.a. Mano), founder of Tech with Mano.**
> Any unauthorized use, reproduction, or distribution may result in a DMCA takedown and legal consequences.

For inquiries or permissions beyond this license, please contact the author directly.

## Acknowledgments

- University course instructors
- Google GenAI team
- Next.js and React communities
