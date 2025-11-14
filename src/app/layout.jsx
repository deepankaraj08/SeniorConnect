import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { JobsProvider } from '@/context/JobsContext';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'SeniorConnect',
  description: 'Employment platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white">

        <JobsProvider>
          <ThemeProvider>
            <AuthProvider>

              {/* ⭐ NAVBAR HERE ⭐ */}
              <Navbar />

              <main>
                {children}
              </main>

              {/* ⭐ OPTIONAL FOOTER ⭐ */}
              <Footer />

            </AuthProvider>
          </ThemeProvider>
        </JobsProvider>

      </body>
    </html>
  );
}
