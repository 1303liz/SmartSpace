# SmartSpace - Installation & Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/1303liz/SmartSpace.git
   cd SmartSpace
   ```

2. **Install Dependencies**
   ```bash
   # Install project dependencies
   npm install

   # Core dependencies
   npm install react react-dom react-router-dom
   
   # UI and styling
   npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
   npm install tailwindcss @tailwindcss/forms
   
   # Calendar and date handling
   npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
   npm install date-fns
   
   # API and state management
   npm install axios
   
   # Form handling
   npm install react-hook-form yup @hookform/resolvers
   
   # TypeScript support
   npm install --save-dev typescript @types/react @types/react-dom @types/node
   ```


## Configuration

1. **Set Up Environment Variables**
   Create a `.env` file in the root directory:
   ```plaintext
   REACT_APP_API_URL=http://localhost:8000/api
   REACT_APP_ENV=development
   ```

2. **Initialize TailwindCSS**
   ```bash
   # Create tailwind config
   npx tailwindcss init
   ```

3. **Configure TypeScript**
   The `tsconfig.json` file is already set up in the project.

## Running the Application

1. **Start Development Server**
   ```bash
   npm start
   ```
   This will run the app in development mode.
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Build for Production**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build` folder.

## Development Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
smartspace/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── contexts/      # React contexts
│   └── utils/         # Utility functions
```

## Common Issues & Solutions

### Node Module Issues
If you encounter node module issues:
```bash
# Remove node modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Errors
If you see TypeScript errors:
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache/typescript
```

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

## Testing

Run different types of tests:
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/components/BookingForm.test.tsx
```

## Code Formatting

Format your code before committing:
```bash
# Format all files
npm run format

# Check format issues
npm run format:check
```

## Getting Help

If you encounter any issues:
1. Check the [GIT_GUIDE.md](GIT_GUIDE.md) for version control help
2. Refer to the [README.md](README.md) for project overview
3. Check the component documentation in [SKELETON_README.md](SKELETON_README.md)
4. Contact the project maintainers

## Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- TabNine
- GitLens
- React Developer Tools

### Browser Extensions
- React Developer Tools
- Redux DevTools (if using Redux)

## Next Steps

After installation:
1. Review the project structure in SKELETON_README.md
2. Check the implementation plan in README.md
3. Start replacing placeholder components with actual implementations
4. Follow the Git workflow in GIT_GUIDE.md

## Updating Dependencies

Regularly update dependencies to get the latest features and security fixes:
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm update package-name
```
