import { cn } from '../../lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Calendar,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('common.dashboard') },
    { path: '/calendar', icon: Calendar, label: t('common.calendar') },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold">
          TP
        </div>
        <div className="hidden md:block">
          <p className="font-semibold text-foreground">TutorPortal</p>
          <p className="text-xs text-muted-foreground">Teaching Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-accent",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <GraduationCap className="w-5 h-5 text-muted-foreground" />
          <span className="hidden md:block text-sm text-muted-foreground">
            {t('sidebar.tutorPortalVersion', { version: '1.0' })}
          </span>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden md:block font-medium">{t('common.logout')}</span>
        </button>
      </div>
    </div>
  );
}
