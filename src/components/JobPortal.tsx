import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Heart,
  Filter,
  Star,
  Users,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Calendar
} from 'lucide-react';
import type { UserRole } from '../App';

interface JobPortalProps {
  userRole: UserRole;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  applicants: number;
  logo: string;
  featured: boolean;
  remote: boolean;
}

export function JobPortal({ userRole }: JobPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('any');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Helper function to get time-sensitive styling for job posting dates
  const getDateInfo = (posted: string) => {
    const now = new Date();
    const match = posted.match(/(\d+)\s*(day|week|month)s?\s*ago/);
    
    if (!match) return { color: 'text-muted-foreground', urgency: 'normal', icon: Clock };
    
    const [, num, unit] = match;
    const number = parseInt(num);
    
    if (unit === 'day' && number <= 2) {
      return { color: 'text-green-600 dark:text-green-400', urgency: 'new', icon: AlertCircle };
    } else if (unit === 'day' && number <= 7) {
      return { color: 'text-blue-600 dark:text-blue-400', urgency: 'recent', icon: Clock };
    } else if (unit === 'week' && number <= 2) {
      return { color: 'text-amber-600 dark:text-amber-400', urgency: 'moderate', icon: Clock };
    } else {
      return { color: 'text-muted-foreground', urgency: 'old', icon: Calendar };
    }
  };

  // Helper function to categorize and style requirements
  const getRequirementStyle = (requirement: string) => {
    const req = requirement.toLowerCase();
    
    // Technical skills
    if (req.includes('react') || req.includes('node') || req.includes('python') || req.includes('java') || req.includes('aws') || req.includes('cloud') || req.includes('sql')) {
      return { variant: 'default' as const, className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800' };
    }
    
    // Experience requirements
    if (req.includes('year') || req.includes('experience')) {
      return { variant: 'secondary' as const, className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800' };
    }
    
    // Leadership/soft skills
    if (req.includes('leadership') || req.includes('team') || req.includes('management')) {
      return { variant: 'outline' as const, className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
    }
    
    // Education or certifications
    if (req.includes('degree') || req.includes('certification') || req.includes('bachelor') || req.includes('master')) {
      return { variant: 'outline' as const, className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800' };
    }
    
    // Default
    return { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700' };
  };

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $180K',
      description: 'We are looking for a senior software engineer to join our growing team. You will be responsible for designing and implementing scalable web applications.',
      requirements: ['5+ years experience', 'React/Node.js', 'AWS/Cloud', 'Team leadership', 'Bachelor degree'],
      benefits: ['Health insurance', 'Stock options', 'Flexible hours', 'Remote work'],
      posted: '1 day ago',
      applicants: 23,
      logo: 'TC',
      featured: true,
      remote: true
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90K - $130K',
      description: 'Join our product team to drive strategy and execution for our flagship products. Work closely with engineering and design teams.',
      requirements: ['3+ years PM experience', 'Technical background', 'Data analysis', 'Agile methodology', 'Management experience'],
      benefits: ['Health & dental', 'Equity', 'Learning budget', 'Gym membership'],
      posted: '2 weeks ago',
      applicants: 45,
      logo: 'IL',
      featured: false,
      remote: false
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Austin, TX',
      type: 'Contract',
      salary: '$70 - $90/hour',
      description: 'Create beautiful and intuitive user experiences for our client projects. Work with diverse teams on exciting design challenges.',
      requirements: ['Portfolio', 'Figma/Sketch', 'User research', 'Prototyping'],
      benefits: ['Flexible schedule', 'Creative freedom', 'Top tools', 'Team events'],
      posted: '2 days ago',
      applicants: 12,
      logo: 'DS',
      featured: true,
      remote: true
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'DataCorp',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$100K - $150K',
      description: 'Analyze large datasets to extract insights and build predictive models. Work on cutting-edge AI/ML projects.',
      requirements: ['Python/R', 'Machine Learning', 'Statistics', 'SQL', '2+ years experience', 'PhD preferred'],
      benefits: ['Research time', 'Conference budget', 'Latest hardware', 'Team lunches'],
      posted: '1 week ago',
      applicants: 31,
      logo: 'DC',
      featured: false,
      remote: true
    },
    {
      id: '5',
      title: 'Frontend Developer',
      company: 'WebTech Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80K - $120K',
      description: 'Join our frontend team to build responsive and interactive web applications using modern frameworks.',
      requirements: ['3+ years React', 'TypeScript', 'CSS/Sass', 'Git'],
      benefits: ['Remote work', 'Health insurance', 'Learning stipend', 'Flexible hours'],
      posted: '6 hours ago',
      applicants: 8,
      logo: 'WS',
      featured: true,
      remote: true
    },
    {
      id: '6',
      title: 'DevOps Engineer',
      company: 'CloudOps Inc',
      location: 'Denver, CO',
      type: 'Full-time',
      salary: '$95K - $140K',
      description: 'Manage and optimize our cloud infrastructure. Work with containerization, CI/CD pipelines, and monitoring systems.',
      requirements: ['Docker/Kubernetes', 'AWS/Azure', '5+ years experience', 'Bachelor degree'],
      benefits: ['Stock options', 'Health & dental', 'Relocation assistance', 'Training budget'],
      posted: '1 month ago',
      applicants: 67,
      logo: 'CO',
      featured: false,
      remote: false
    }
  ];

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !jobTypeFilter || jobTypeFilter === 'all' || job.type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
            <p className="text-muted-foreground">
              {filteredJobs.length} jobs found {searchQuery && `for "${searchQuery}"`}
            </p>
          </div>
          {userRole === 'candidate' && (
            <Button>
              <Heart className="w-4 h-4 mr-2" />
              Saved Jobs ({savedJobs.length})
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="grid lg:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title or Company</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="e.g. Software Engineer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="e.g. San Francisco"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Type</label>
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary Range</label>
            <Select value={salaryFilter} onValueChange={setSalaryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Any salary" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any salary</SelectItem>
                <SelectItem value="0-50k">$0 - $50K</SelectItem>
                <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                <SelectItem value="100k-150k">$100K - $150K</SelectItem>
                <SelectItem value="150k+">$150K+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className={`hover:shadow-lg transition-shadow duration-300 ${job.featured ? 'border-primary' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center font-semibold text-primary">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {job.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {job.remote && (
                        <Badge variant="secondary">Remote</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        {(() => {
                          const dateInfo = getDateInfo(job.posted);
                          const Icon = dateInfo.icon;
                          return (
                            <>
                              <Icon className={`w-4 h-4 ${dateInfo.color}`} />
                              <span className={dateInfo.color}>{job.posted}</span>
                              {dateInfo.urgency === 'new' && (
                                <Badge className="ml-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-1.5 py-0.5">
                                  New
                                </Badge>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {userRole === 'candidate' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveJob(job.id)}
                      className={savedJobs.includes(job.id) ? 'text-red-500' : ''}
                    >
                      <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                    </Button>
                  )}
                  <div className="text-right">
                    <div className="font-semibold text-lg flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {job.applicants} applicants
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed">
                {job.description}
              </CardDescription>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Requirements
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                      {job.requirements.length} required
                    </Badge>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => {
                      const style = getRequirementStyle(req);
                      return (
                        <Badge 
                          key={index} 
                          variant={style.variant}
                          className={`text-xs ${style.className}`}
                        >
                          {req}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Benefits
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className={`text-sm ${getDateInfo(job.posted).color}`}>
                    Posted {job.posted}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {userRole === 'candidate' && (
                    <Button size="sm">
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
}