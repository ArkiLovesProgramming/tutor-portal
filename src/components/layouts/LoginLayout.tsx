import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const stored = localStorage.getItem('theme');
    const shouldBeDark = stored === 'dark';

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      {/* Top right controls */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
        {/* Language switcher */}
        <LanguageSwitcher />

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-200 shadow-sm"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-[420px]">
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-primary-foreground text-xl font-bold shadow-lg">
            TP
          </div>
          <h1 className="text-xl font-bold text-foreground mt-3">TutorPortal</h1>
          <p className="text-xs text-muted-foreground mt-1">Teaching Management Platform</p>
        </div>

        {/* Login Card */}
        <div className={cn(
          "bg-card rounded-xl shadow-lg border border-border p-6"
        )}>
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-muted-foreground/60 mt-4">
          © 2025 TutorPortal
        </p>
      </div>
    </div>
  );
}
