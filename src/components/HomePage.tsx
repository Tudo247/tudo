import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Briefcase, 
  Video, 
  BookOpen, 
  MessageCircle, 
  Gift,
  Users,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import type { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      title: 'Job Portal',
      description: 'Find your dream job with advanced search filters and AI-powered matching.',
      icon: Briefcase,
      page: 'jobs' as Page,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      stats: '10,000+ Jobs'
    },
    {
      title: 'Interview Hub',
      description: 'Practice interviews with AI and take mock tests to boost your confidence.',
      icon: Video,
      page: 'interviews' as Page,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      stats: '500+ Questions'
    },
    {
      title: 'Study Library',
      description: 'Access courses, guides, and resources for continuous skill development.',
      icon: BookOpen,
      page: 'study' as Page,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      stats: '200+ Courses'
    },
    {
      title: 'Referrals & Rewards',
      description: 'Earn points for referrals and redeem amazing rewards.',
      icon: Gift,
      page: 'referrals' as Page,
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      stats: '1000+ Rewards'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Job Placements', value: '25K+', icon: TrendingUp },
    { label: 'Success Rate', value: '94%', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">🚀 Your Career Journey Starts Here</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Find Jobs,
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Build Skills,</span>
                  <br />
                  Grow Career
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Complete ecosystem for job seekers and employers. Search jobs, practice interviews, 
                  learn new skills, and earn rewards - all in one platform with Tudo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('jobs')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                >
                  <Search className="w-5 h-5" />
                  Find Jobs
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('study')}
                  className="flex items-center gap-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  <BookOpen className="w-5 h-5" />
                  Start Learning
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="flex justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1752170080773-fed7758395c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NTY1MzgyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional team meeting"
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-background rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">24/7 AI Support</div>
                    <div className="text-sm text-muted-foreground">Always here to help</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-background rounded-lg shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">Earn Rewards</div>
                    <div className="text-sm text-muted-foreground">Points for referrals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From job searching to skill building, we've got you covered with comprehensive tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                  onClick={() => onNavigate(feature.page)}
                >
                  <CardHeader className="space-y-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center justify-between">
                        {feature.title}
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {feature.stats}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of professionals who have found their dream jobs and advanced their careers with Tudo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => onNavigate('jobs')}
                className="flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Explore Jobs
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate('study')}
                className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-purple-600"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}