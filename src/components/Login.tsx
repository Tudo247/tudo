import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  User, 
  Building, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Briefcase,
  UserCheck
} from 'lucide-react';
import type { UserRole } from '../App';
import { signInWithEmail, signUpWithEmail, getCurrentUser, getUserRole } from '@/services/auth';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: 'home') => void;
}

export function Login({ onLogin, onNavigate }: LoginProps) {
  const [isEmployer, setIsEmployer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const role: UserRole = isEmployer ? 'employer' : 'candidate';
      await signInWithEmail(email, password);
      const user = await getCurrentUser();
      const dbRole = user ? await getUserRole(user.id) : role;
      onLogin((dbRole as UserRole) ?? role);
      onNavigate('home');
    } catch (err) {
      console.error('Login failed', err);
    }
    //didate';
    onLogin(role);
    onNavigate('home');
  };

  const handleDemoLogin = (role: UserRole) => {
    setIsEmployer(role === 'employer');
    setEmail(role === 'employer' ? 'employer@company.com' : 'candidate@email.com');
    setPassword('demo123');
    setTimeout(() => {
      onLogin(role);
      onNavigate('home');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome to Tudo
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue your career journey
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            {/* Role Toggle */}
            <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className={`flex items-center space-x-2 transition-all duration-300 ${!isEmployer ? 'text-purple-600' : 'text-muted-foreground'}`}>
                <UserCheck className="w-5 h-5" />
                <span className="font-medium">Job Seeker</span>
              </div>
              
              <div className="relative">
                <Switch
                  checked={isEmployer}
                  onCheckedChange={setIsEmployer}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                />
              </div>
              
              <div className={`flex items-center space-x-2 transition-all duration-300 ${isEmployer ? 'text-purple-600' : 'text-muted-foreground'}`}>
                <Building className="w-5 h-5" />
                <span className="font-medium">Employer</span>
              </div>
            </div>

            <div className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                {isEmployer ? (
                  <>
                    <Building className="w-5 h-5 text-purple-600" />
                    Employer Login
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 text-purple-600" />
                    Job Seeker Login
                  </>
                )}
              </CardTitle>
              <CardDescription className="mt-2">
                {isEmployer 
                  ? 'Access your company dashboard and manage job postings'
                  : 'Find your dream job and track your applications'
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={isEmployer ? 'company@email.com' : 'your@email.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                size="lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Sign In as {isEmployer ? 'Employer' : 'Job Seeker'}
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-sm text-muted-foreground">
                  Or try demo
                </span>
              </div>
            </div>

            {/* Demo Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('candidate')}
                className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <UserCheck className="w-4 h-4" />
                Job Seeker Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('employer')}
                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Building className="w-4 h-4" />
                Employer Demo
              </Button>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-2">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  Sign up here
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-medium">10,000+ Jobs</div>
            <div className="text-xs text-muted-foreground">Find your perfect match</div>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-medium">AI Matching</div>
            <div className="text-xs text-muted-foreground">Smart job recommendations</div>
          </div>
        </div>
      </div>
    </div>
  );
}