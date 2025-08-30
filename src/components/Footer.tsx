import { Briefcase, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Tudo
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your complete career companion - from job searching to skill development and interview preparation. Build your future with Tudo.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Browse Jobs
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Interview Preparation
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Study Resources
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Career Guidance
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Referral Program
                </Button>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Post Jobs
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Talent Search
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Employer Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Hiring Solutions
                </Button>
              </li>
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                  Company Branding
                </Button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                hello@tudo.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                1-800-TUDO-JOB
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Career Street<br />San Francisco, CA 94105</span>
              </li>
            </ul>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                Help Center
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary justify-start">
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tudo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Privacy Policy
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Terms of Service
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-primary">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}