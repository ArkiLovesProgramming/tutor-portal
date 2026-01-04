import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-6">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold mb-4">
            CC
          </div>
          <h1 className="text-2xl font-bold text-foreground">Champ Code Academy</h1>
          <p className="text-muted-foreground mt-2">Tutor Portal</p>
        </div>

        {/* Login Card */}
        <div className={cn(
          "bg-card rounded-xl shadow-lg border border-border p-6",
          "animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}>
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Use any email to login (demo mode)
        </p>
      </div>
    </div>
  );
}
