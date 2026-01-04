import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { cn } from '../../lib/utils';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">
          {languages.find(l => l.code === currentLang)?.label || 'Language'}
        </span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors",
                currentLang === lang.code && "bg-accent font-medium"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
