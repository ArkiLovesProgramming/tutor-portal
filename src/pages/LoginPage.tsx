import { LoginLayout } from '../components/layouts/LoginLayout';
import { LoginForm } from '../components/login/LoginForm';

export function LoginPage() {
  return (
    <LoginLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to access your tutor dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </LoginLayout>
  );
}
