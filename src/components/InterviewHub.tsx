import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Target, 
  Mic, 
  Video,
  Brain,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users
} from 'lucide-react';

interface MockTest {
  id: string;
  title: string;
  category: string;
  duration: number;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  score?: number;
}

interface InterviewSession {
  id: string;
  type: 'Technical' | 'Behavioral' | 'Case Study' | 'System Design';
  title: string;
  duration: number;
  completed: boolean;
  score?: number;
  feedback?: string;
}

export function InterviewHub() {
  const [activeTab, setActiveTab] = useState('practice');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const mockTests: MockTest[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      category: 'Technical',
      duration: 45,
      questions: 30,
      difficulty: 'Medium',
      completed: true,
      score: 85
    },
    {
      id: '2',
      title: 'React Interview Questions',
      category: 'Technical',
      duration: 60,
      questions: 25,
      difficulty: 'Hard',
      completed: false
    },
    {
      id: '3',
      title: 'Behavioral Questions',
      category: 'Behavioral',
      duration: 30,
      questions: 15,
      difficulty: 'Easy',
      completed: true,
      score: 92
    },
    {
      id: '4',
      title: 'System Design Basics',
      category: 'System Design',
      duration: 90,
      questions: 10,
      difficulty: 'Hard',
      completed: false
    }
  ];

  const interviewSessions: InterviewSession[] = [
    {
      id: '1',
      type: 'Technical',
      title: 'Frontend Developer Interview',
      duration: 45,
      completed: true,
      score: 88,
      feedback: 'Great understanding of React concepts. Could improve on algorithm optimization.'
    },
    {
      id: '2',
      type: 'Behavioral',
      title: 'Leadership & Communication',
      duration: 30,
      completed: true,
      score: 94,
      feedback: 'Excellent communication skills and strong examples of leadership experience.'
    },
    {
      id: '3',
      type: 'Case Study',
      title: 'Product Strategy Analysis',
      duration: 60,
      completed: false
    }
  ];

  const practiceQuestions = [
    "Tell me about yourself and your background in software development.",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you handle tight deadlines and pressure?",
    "What's your approach to learning new technologies?",
    "Describe a time when you had to work with a difficult team member."
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Behavioral': return 'bg-purple-100 text-purple-800';
      case 'Case Study': return 'bg-orange-100 text-orange-800';
      case 'System Design': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTests = selectedCategory === 'all' 
    ? mockTests 
    : mockTests.filter(test => test.category.toLowerCase() === selectedCategory);

  const stats = {
    totalSessions: interviewSessions.length,
    completedSessions: interviewSessions.filter(s => s.completed).length,
    averageScore: Math.round(interviewSessions
      .filter(s => s.score)
      .reduce((acc, s) => acc + (s.score || 0), 0) / 
      interviewSessions.filter(s => s.score).length) || 0,
    testsCompleted: mockTests.filter(t => t.completed).length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Hub</h1>
        <p className="text-muted-foreground">
          Practice interviews with AI, take mock tests, and improve your interview skills
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Practice Sessions</p>
                <p className="text-3xl font-bold">{stats.completedSessions}</p>
              </div>
              <Video className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                <p className="text-3xl font-bold">{stats.testsCompleted}</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold">{stats.averageScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="practice">AI Practice</TabsTrigger>
          <TabsTrigger value="tests">Mock Tests</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="tips">Interview Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Interview Practice
                  </CardTitle>
                  <CardDescription>
                    Practice with our AI interviewer. Get real-time feedback and improve your responses.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1686771416282-3888ddaf249b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMGludGVydmlldyUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3NTY1MzgyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Interview practice"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        size="lg"
                        onClick={() => setIsRecording(!isRecording)}
                        className={isRecording ? 'bg-red-600 hover:bg-red-700' : ''}
                      >
                        {isRecording ? (
                          <>
                            <Pause className="w-5 h-5 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-2" />
                            Start Practice
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Question {currentQuestion} of 5</span>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 inline mr-1" />
                        2:30 remaining
                      </span>
                    </div>
                    <Progress value={(currentQuestion / 5) * 100} className="mb-4" />
                    <h3 className="font-medium mb-2">Current Question:</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {practiceQuestions[currentQuestion - 1]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Restart
                      </Button>
                      <Button variant="outline" size="sm" disabled={currentQuestion === 1}>
                        Previous
                      </Button>
                    </div>
                    <Button 
                      onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, 5))}
                      disabled={currentQuestion === 5}
                    >
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Recording Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interview Type</label>
                    <Select defaultValue="behavioral">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty Level</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Make eye contact</p>
                      <p className="text-sm text-muted-foreground">Look directly at the camera</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Speak clearly</p>
                      <p className="text-sm text-muted-foreground">Articulate your words</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Take your time</p>
                      <p className="text-sm text-muted-foreground">Think before answering</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Mock Tests</h2>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
                <SelectItem value="system design">System Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(test.category)}>
                          {test.category}
                        </Badge>
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                      </div>
                    </div>
                    {test.completed && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {test.duration} min
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      {test.questions} questions
                    </div>
                  </div>
                  
                  {test.completed && test.score && (
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Your Score</span>
                        <span className="text-lg font-bold text-green-600">{test.score}%</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" variant={test.completed ? 'outline' : 'default'}>
                    {test.completed ? 'Retake Test' : 'Start Test'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <h2 className="text-2xl font-bold">My Interview Sessions</h2>
          <div className="space-y-4">
            {interviewSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold">{session.title}</h3>
                        <Badge className={getTypeColor(session.type)}>
                          {session.type}
                        </Badge>
                        {session.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration} minutes
                        </div>
                        {session.score && (
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Score: {session.score}%
                          </div>
                        )}
                      </div>
                      {session.feedback && (
                        <p className="mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                          <strong>Feedback:</strong> {session.feedback}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {!session.completed && (
                        <Button size="sm">Continue</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Interview Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Research the Company</h4>
                    <p className="text-sm text-muted-foreground">Understand their mission, values, and recent news</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Practice STAR Method</h4>
                    <p className="text-sm text-muted-foreground">Situation, Task, Action, Result framework for stories</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Prepare Questions</h4>
                    <p className="text-sm text-muted-foreground">Have thoughtful questions about the role and team</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  During the Interview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Active Listening</h4>
                    <p className="text-sm text-muted-foreground">Pay attention and ask clarifying questions</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Be Specific</h4>
                    <p className="text-sm text-muted-foreground">Use concrete examples and quantify achievements</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Show Enthusiasm</h4>
                    <p className="text-sm text-muted-foreground">Express genuine interest in the role and company</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}