import { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  Menu,
  Moon,
  Sun,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui/sheet';
import { Sidebar } from './Sidebar';

export function TopBar() {
  const user = useStore(state => state.user);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left section - Mobile menu + Search */}
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Search (desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-accent/50 rounded-lg px-4 py-2 w-80">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="p-2 hover:bg-accent rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3 ml-2">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user?.name || 'Guest'}</p>
            <p className="text-xs text-muted-foreground">Tutor</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            {user?.name?.charAt(0) || 'G'}
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
