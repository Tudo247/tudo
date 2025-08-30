import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Briefcase, 
  User, 
  ChevronDown, 
  BookOpen, 
  Video, 
  Gift,
  Building2,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { Page, UserRole } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userRole: UserRole;
  isLoggedIn: boolean;
  onLogin: (loggedIn: boolean) => void;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  userRole, 
  isLoggedIn, 
  onLogin,
  onRoleChange 
}: HeaderProps) {
  const [points] = useState(1250); // Mock user points
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'jobs' as Page, label: 'Jobs', icon: Briefcase },
    { id: 'interviews' as Page, label: 'Interview Hub', icon: Video },
    { id: 'study' as Page, label: 'Study Library', icon: BookOpen },
    { id: 'referrals' as Page, label: 'Referrals', icon: Gift },
  ];

  const handleLogin = () => {
    onLogin(!isLoggedIn);
  };

  const handleRoleSwitch = () => {
    const newRole = userRole === 'candidate' ? 'employer' : 'candidate';
    onRoleChange(newRole);
    if (newRole === 'employer') {
      onNavigate('employer');
    } else {
      onNavigate('jobs');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tudo</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 ${currentPage === item.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
            {userRole === 'employer' && (
              <Button
                variant={currentPage === 'employer' ? 'default' : 'ghost'}
                onClick={() => onNavigate('employer')}
                className={`flex items-center gap-2 ${currentPage === 'employer' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0' : ''}`}
              >
                <Building2 className="w-4 h-4" />
                Dashboard
              </Button>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Points Display */}
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-3 py-1.5 rounded-full">
                <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{points} pts</span>
              </div>
            )}

            {/* Role Switch */}
            {isLoggedIn && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRoleSwitch}
                className="hidden sm:flex items-center gap-2"
              >
                {userRole === 'candidate' ? (
                  <>
                    <Building2 className="w-4 h-4" />
                    Switch to Employer
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Switch to Candidate
                  </>
                )}
              </Button>
            )}

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {userRole === 'employer' ? 'E' : 'C'}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === 'light' ? (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleRoleSwitch}>
                    {userRole === 'candidate' ? (
                      <>
                        <Building2 className="w-4 h-4 mr-2" />
                        Employer Mode
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Candidate Mode
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onLogin(false)}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button onClick={handleLogin}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}