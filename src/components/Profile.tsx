import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Upload, 
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Globe,
  Github,
  Linkedin,
  CheckCircle,
  Clock
} from 'lucide-react';
import type { UserRole } from '../App';

interface ProfileProps {
  userRole: UserRole;
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'reviewing' | 'interview' | 'rejected' | 'offer';
  appliedDate: string;
  location: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  current: boolean;
}

export function Profile({ userRole }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userRole === 'employer' ? 'TechCorp Inc.' : 'Alex Johnson',
    email: userRole === 'employer' ? 'hr@techcorp.com' : 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: userRole === 'employer' 
      ? 'Leading technology company focused on innovation and creating exceptional products.'
      : 'Passionate full-stack developer with 5 years of experience building scalable web applications.',
    website: userRole === 'employer' ? 'https://techcorp.com' : 'https://alexjohnson.dev',
    linkedin: userRole === 'employer' ? 'techcorp' : 'alexjohnson',
    github: userRole === 'employer' ? '' : 'alexjohnson'
  });

  const mockApplications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp',
      status: 'interview',
      appliedDate: '2024-01-18',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      status: 'reviewing',
      appliedDate: '2024-01-15',
      location: 'Remote'
    },
    {
      id: '3',
      jobTitle: 'Frontend Developer',
      company: 'DesignStudio',
      status: 'offer',
      appliedDate: '2024-01-10',
      location: 'New York, NY'
    },
    {
      id: '4',
      jobTitle: 'Software Engineer',
      company: 'BigTech',
      status: 'rejected',
      appliedDate: '2024-01-05',
      location: 'Seattle, WA'
    }
  ];

  const mockExperience: Experience[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Digital Agency',
      duration: '2022 - Present',
      description: 'Lead frontend development for multiple client projects using React, TypeScript, and modern web technologies.',
      current: true
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupCo',
      duration: '2020 - 2022',
      description: 'Built and maintained full-stack applications using Node.js, React, and PostgreSQL.',
      current: false
    },
    {
      id: '3',
      title: 'Junior Developer',
      company: 'WebDev Solutions',
      duration: '2019 - 2020',
      description: 'Developed responsive websites and web applications for small to medium businesses.',
      current: false
    }
  ];

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 
    'AWS', 'Docker', 'Git', 'Agile', 'REST APIs', 'GraphQL'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'offer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'offer': return <CheckCircle className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const profileCompletion = 85;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {userRole === 'employer' ? 'TC' : 'AJ'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
              <p className="text-muted-foreground mb-4">
                {userRole === 'employer' ? 'Technology Company' : 'Full Stack Developer'}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                {userRole === 'candidate' && (
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4" />
                </Button>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </CardContent>
          </Card>

          {userRole === 'candidate' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Profile Strength</span>
                    <span className="font-medium">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Profile photo added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Work experience added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Add portfolio projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {userRole === 'candidate' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Skills
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue={userRole === 'candidate' ? 'overview' : 'company'} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value={userRole === 'candidate' ? 'overview' : 'company'}>
                {userRole === 'candidate' ? 'Overview' : 'Company'}
              </TabsTrigger>
              <TabsTrigger value={userRole === 'candidate' ? 'applications' : 'jobs'}>
                {userRole === 'candidate' ? 'Applications' : 'Posted Jobs'}
              </TabsTrigger>
              <TabsTrigger value={userRole === 'candidate' ? 'experience' : 'candidates'}>
                {userRole === 'candidate' ? 'Experience' : 'Candidates'}
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value={userRole === 'candidate' ? 'overview' : 'company'} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'candidate' ? 'About Me' : 'Company Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      className="min-h-32"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {profileData.bio}
                    </p>
                  )}
                </CardContent>
              </Card>

              {userRole === 'candidate' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Applied to Senior Software Engineer</p>
                        <p className="text-sm text-muted-foreground">TechCorp • 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Completed React Course</p>
                        <p className="text-sm text-muted-foreground">Study Library • 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Earned Interview Practice Badge</p>
                        <p className="text-sm text-muted-foreground">Interview Hub • 2 weeks ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value={userRole === 'candidate' ? 'applications' : 'jobs'} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'candidate' ? 'My Applications' : 'Posted Jobs'}
                  </CardTitle>
                  <CardDescription>
                    {userRole === 'candidate' 
                      ? 'Track your job application status' 
                      : 'Manage your job postings'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userRole === 'candidate' ? (
                    <div className="space-y-4">
                      {mockApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{application.jobTitle}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{application.company}</span>
                              <span>•</span>
                              <span>{application.location}</span>
                              <span>•</span>
                              <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(application.status)}
                              {application.status}
                            </div>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No jobs posted yet.</p>
                      <Button className="mt-4">Post Your First Job</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value={userRole === 'candidate' ? 'experience' : 'candidates'} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === 'candidate' ? 'Work Experience' : 'Candidate Pipeline'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userRole === 'candidate' ? (
                    <div className="space-y-6">
                      {mockExperience.map((exp) => (
                        <div key={exp.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            {exp !== mockExperience[mockExperience.length - 1] && (
                              <div className="w-px h-16 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{exp.title}</h4>
                              {exp.current && (
                                <Badge variant="secondary">Current</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {exp.company} • {exp.duration}
                            </p>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No candidates yet.</p>
                      <Button className="mt-4">Post a Job to Attract Candidates</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {userRole === 'candidate' ? 'Full Name' : 'Company Name'}
                      </label>
                      <Input value={profileData.name} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input value={profileData.email} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input value={profileData.phone} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input value={profileData.location} />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to recruiters</p>
                    </div>
                    <Button variant="outline" size="sm">Public</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Job Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive notifications for new job matches</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Application Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about application status changes</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download your profile data, applications, and activity history.
                  </p>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}