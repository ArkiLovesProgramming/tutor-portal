import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const { login, isLoading, error } = useStore();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setEmailTouched(true);

    // Validate email
    if (!email || !validateEmail(email)) {
      setLocalError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!password) {
      setLocalError('Please enter your password');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setLocalError('Invalid email or password');
    }
  };

  const displayError = localError || error;
  const isEmailValid = !emailTouched || validateEmail(email);

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Email field */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium text-foreground">
          Email
        </label>
        <div className="relative group">
          <Mail className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200",
            emailTouched && !isEmailValid ? "text-destructive" : "text-muted-foreground group-focus-within:text-primary"
          )} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder={t('login.emailPlaceholder')}
            className={cn(
              "w-full pl-10 pr-3 py-2.5 bg-background border rounded-lg transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:border-transparent text-sm",
              "placeholder:text-muted-foreground",
              emailTouched && !isEmailValid
                ? "border-destructive focus:ring-destructive/20"
                : "border-input focus:ring-primary/20 hover:border-primary/50"
            )}
            required
          />
        </div>
        {emailTouched && !isEmailValid && (
          <p className="text-[11px] text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Please enter a valid email
          </p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-medium text-foreground">
            Password
          </label>
          <button
            type="button"
            className="text-[11px] text-primary hover:underline font-medium"
          >
            Forgot?
          </button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('login.passwordPlaceholder')}
            className={cn(
              "w-full pl-10 pr-10 py-2.5 bg-background border border-input rounded-lg text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-transparent",
              "placeholder:text-muted-foreground transition-all duration-200",
              "hover:border-primary/50"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Remember me checkbox */}
      <div className="flex items-center gap-2 pt-0.5">
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-input text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
        />
        <label
          htmlFor="remember"
          className="text-xs text-muted-foreground cursor-pointer select-none"
        >
          Remember me
        </label>
      </div>

      {/* Error message */}
      {displayError && (
        <div className="p-2.5 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg text-sm",
          "font-medium hover:bg-primary/90 active:bg-primary/80 transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg",
          "flex items-center justify-center gap-2 mt-1"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('common.loading')}
          </>
        ) : (
          <>
            {t('login.signInButton')}
          </>
        )}
      </button>
    </form>
  );
}
