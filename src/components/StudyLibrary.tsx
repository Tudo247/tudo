import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Users, 
  Award,
  Download,
  Bookmark,
  Filter,
  TrendingUp,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  price: number;
  image: string;
  progress?: number;
  completed?: boolean;
  description: string;
  skills: string[];
}

interface Resource {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'PDF' | 'Interactive';
  category: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  author: string;
  bookmarked: boolean;
}

export function StudyLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>(['1', '3']);

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Complete React Developer Course',
      instructor: 'Sarah Johnson',
      category: 'Frontend Development',
      level: 'Intermediate',
      duration: '12 hours',
      lessons: 45,
      rating: 4.8,
      students: 15420,
      price: 89,
      image: 'https://images.unsplash.com/photo-1611504263279-6fac8c25909e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWR5fGVufDF8fHx8MTc1NjUzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      progress: 65,
      description: 'Master React from basics to advanced concepts. Build real-world projects and learn modern React patterns.',
      skills: ['React', 'JavaScript', 'Redux', 'Hooks']
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms',
      instructor: 'Michael Chen',
      category: 'Computer Science',
      level: 'Advanced',
      duration: '20 hours',
      lessons: 60,
      rating: 4.9,
      students: 8950,
      price: 129,
      image: 'https://images.unsplash.com/photo-1611504263279-6fac8c25909e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWR5fGVufDF8fHx8MTc1NjUzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Essential algorithms and data structures for technical interviews and software development.',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving', 'Big O']
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      category: 'Design',
      level: 'Beginner',
      duration: '8 hours',
      lessons: 25,
      rating: 4.7,
      students: 12350,
      price: 69,
      image: 'https://images.unsplash.com/photo-1611504263279-6fac8c25909e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWR5fGVufDF8fHx8MTc1NjUzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: true,
      description: 'Learn the principles of good design and create beautiful, user-friendly interfaces.',
      skills: ['Figma', 'Design Principles', 'User Research', 'Prototyping']
    },
    {
      id: '4',
      title: 'Python for Data Science',
      instructor: 'David Park',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '15 hours',
      lessons: 40,
      rating: 4.6,
      students: 9800,
      price: 99,
      image: 'https://images.unsplash.com/photo-1611504263279-6fac8c25909e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHN0dWR5fGVufDF8fHx8MTc1NjUzODI0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Use Python for data analysis, visualization, and machine learning projects.',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib']
    }
  ];

  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Complete Guide to Technical Interviews',
      type: 'Article',
      category: 'Career Development',
      readTime: '15 min',
      difficulty: 'Intermediate',
      author: 'Tech Career Pro',
      bookmarked: true
    },
    {
      id: '2',
      title: 'JavaScript ES6+ Features Explained',
      type: 'Video',
      category: 'Frontend Development',
      readTime: '25 min',
      difficulty: 'Intermediate',
      author: 'Code Academy',
      bookmarked: false
    },
    {
      id: '3',
      title: 'System Design Interview Cheat Sheet',
      type: 'PDF',
      category: 'System Design',
      readTime: '30 min',
      difficulty: 'Advanced',
      author: 'System Design Hub',
      bookmarked: true
    },
    {
      id: '4',
      title: 'CSS Grid Layout Interactive Tutorial',
      type: 'Interactive',
      category: 'Frontend Development',
      readTime: '45 min',
      difficulty: 'Beginner',
      author: 'CSS Masters',
      bookmarked: false
    }
  ];

  const categories = ['all', 'Frontend Development', 'Backend Development', 'Data Science', 'Design', 'Career Development', 'System Design'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article': return <BookOpen className="w-4 h-4" />;
      case 'Video': return <PlayCircle className="w-4 h-4" />;
      case 'PDF': return <Download className="w-4 h-4" />;
      case 'Interactive': return <Play className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const stats = {
    totalCourses: mockCourses.length,
    completedCourses: mockCourses.filter(c => c.completed).length,
    totalHours: mockCourses.reduce((acc, course) => acc + parseInt(course.duration), 0),
    certificates: mockCourses.filter(c => c.completed).length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Study Library</h1>
        <p className="text-muted-foreground">
          Access courses, guides, and resources to advance your skills and career
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                <p className="text-3xl font-bold">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{stats.completedCourses}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                <p className="text-3xl font-bold">{stats.totalHours}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-3xl font-bold">{stats.certificates}</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="grid lg:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Level</label>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select defaultValue="popular">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {course.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>

                  {course.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-lg font-bold">
                      ${course.price}
                    </div>
                    <Button size="sm" className="flex items-center gap-2">
                      {course.progress ? (
                        <>
                          <Play className="w-4 h-4" />
                          Continue
                        </>
                      ) : course.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Enroll
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-muted rounded-lg">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{resource.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>by {resource.author}</span>
                          <span>•</span>
                          <span>{resource.readTime}</span>
                          <span>•</span>
                          <Badge className={getLevelColor(resource.difficulty)} >
                            {resource.difficulty}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className={bookmarkedResources.includes(resource.id) ? 'text-blue-600' : ''}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedResources.includes(resource.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button size="sm">
                        {resource.type === 'Video' ? 'Watch' : 'Read'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">3 of 4 courses</span>
                    </div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">This Week</span>
                      <span className="text-sm text-muted-foreground">8.5 hours</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">This Month</span>
                      <span className="text-sm text-muted-foreground">34 hours</span>
                    </div>
                    <Progress value={68} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">First Course Completed</p>
                      <p className="text-sm text-muted-foreground">UI/UX Design Fundamentals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">7-Day Streak</p>
                      <p className="text-sm text-muted-foreground">Learning consistently</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Top Performer</p>
                      <p className="text-sm text-muted-foreground">95% average score</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses
                  .filter(course => course.progress !== undefined && !course.completed)
                  .map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Progress value={course.progress} />
                          </div>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm">
                        Continue
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}