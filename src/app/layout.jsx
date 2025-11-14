import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { JobsProvider } from '@/context/JobsContext';

export const metadata = {
  title: 'SeniorConnect',
  description: 'Employment platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 🌟 JobsProvider moved to the outermost layer to ensure it loads immediately 🌟 */}
        <JobsProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </JobsProvider>
      </body>
    </html>
  );
};