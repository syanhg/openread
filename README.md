# OpenRead - Personal CV Platform

A read.cv-like platform for creating beautiful personal CV websites. Built with Next.js 15, React 19, Tailwind CSS v4, and inspired by the Nim template.

## Features

- ✨ Beautiful, minimal CV design matching read.cv style
- 📝 Full CV editor with all sections:
  - Basic Information (Name, Title, Location, About)
  - Work Experience
  - Writing/Blog Posts
  - Speaking Engagements
  - Side Projects
  - Volunteer Experience
  - Certificates
  - Education
  - Contact Information
- 💾 Local storage persistence
- 🎨 Clean, responsive design
- ⚡ Fast and lightweight

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd openread
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click "Edit CV" to start editing your CV
2. Fill in your information across all sections
3. Click "Save & Close" to save your changes
4. Your CV is automatically saved to localStorage
5. View your CV by clicking "View CV"

## Project Structure

```
openread/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Main page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── cv-view.tsx   # CV display component
│   ├── cv-editor.tsx # CV editor component
│   └── sections/     # Individual section components
├── lib/              # Utilities
│   ├── cv-data.ts    # Data management
│   └── sample-data.ts # Sample CV data
├── types/            # TypeScript types
│   └── cv.ts         # CV data types
└── public/           # Static assets
```

## Customization

The CV design can be customized by modifying:
- `app/globals.css` - Global styles and theme
- `components/sections/*.tsx` - Individual section components
- `tailwind.config.ts` - Tailwind configuration

## Deployment

You can deploy this to any platform that supports Next.js:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy!

### Other Platforms

```bash
npm run build
npm start
```

## License

MIT

## Credits

Built with inspiration from:
- [Nim Template](https://github.com/ibelick/nim) by ibelick
- [read.cv](https://read.cv) design patterns
