import { Outlet } from 'react-router';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Moon, Sun, Receipt } from 'lucide-react';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Receipt className="size-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Invoice App</h1>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full transition-transform hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="size-5" />
              ) : (
                <Sun className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-muted-foreground">
            Invoice Management App &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};
