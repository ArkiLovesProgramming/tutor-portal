import { LoginLayout } from '../components/layouts/LoginLayout';
import { LoginForm } from '../components/login/LoginForm';
import { useTranslation } from 'react-i18next';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <LoginLayout>
      <div className="space-y-4">
        <div className="text-center animate-in fade-in slide-in-from-top-2 duration-500">
          <h2 className="text-lg font-bold text-foreground">{t('login.title')}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {t('login.description')}
          </p>
        </div>
        <LoginForm />
      </div>
    </LoginLayout>
  );
}
