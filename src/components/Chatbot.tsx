import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  User, 
  Bot,
  HelpCircle,
  Briefcase,
  BookOpen,
  Calendar
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m your CareerHub assistant. I can help you with job searches, applications, interview preparation, and learning resources. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Find software engineer jobs',
        'Help with my resume',
        'Interview tips',
        'Course recommendations'
      ]
    }
  ]);

  const quickActions = [
    { icon: Briefcase, label: 'Job Search Help', query: 'Help me find relevant jobs' },
    { icon: BookOpen, label: 'Learning Resources', query: 'Recommend courses for my career' },
    { icon: Calendar, label: 'Interview Prep', query: 'How can I prepare for interviews?' },
    { icon: HelpCircle, label: 'General Support', query: 'I need help navigating the platform' }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('job') || lowerMessage.includes('position')) {
      response = 'I can help you find jobs! Based on your profile, I\'d recommend checking out our job portal. You can filter by location, salary, and job type. Would you like me to show you some specific positions?';
      suggestions = ['Show me remote jobs', 'Frontend developer roles', 'Jobs in my area'];
    } else if (lowerMessage.includes('interview')) {
      response = 'Great question! Our Interview Hub offers AI-powered practice sessions and mock tests. I recommend starting with behavioral questions and then moving to technical ones. Would you like specific interview tips?';
      suggestions = ['Start practice interview', 'Common interview questions', 'Technical interview prep'];
    } else if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      response = 'Our Study Library has amazing courses! Based on current trends, I\'d recommend React, Python, or Data Science courses. What skills are you looking to develop?';
      suggestions = ['Show React courses', 'Python for beginners', 'Data science path'];
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      response = 'I can help optimize your profile! Make sure to highlight your key skills, add relevant experience, and keep your summary compelling. Would you like specific resume tips?';
      suggestions = ['Resume templates', 'Skills optimization', 'Profile review'];
    } else if (lowerMessage.includes('referral') || lowerMessage.includes('points')) {
      response = 'You can earn points by referring friends! Share your referral link and earn 100 points for signups, 500 for successful hires. Check the Referrals section for more details.';
      suggestions = ['How to refer friends', 'Redeem rewards', 'Point structure'];
    } else {
      response = 'I\'m here to help with your career journey! I can assist with job searches, interview preparation, course recommendations, profile optimization, and referrals. What would you like to explore?';
      suggestions = ['Find jobs', 'Prepare for interviews', 'Learn new skills', 'Optimize profile'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    sendMessage();
  };

  const handleQuickAction = (query: string) => {
    setMessage(query);
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 shadow-xl z-50 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">CareerHub Assistant</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-full p-0">
          {/* Quick Actions */}
          <div className="px-4 pb-3">
            <p className="text-sm text-muted-foreground mb-2">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center gap-2 text-xs h-8"
                  >
                    <Icon className="w-3 h-3" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-2 overflow-y-auto space-y-4 max-h-96">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === 'user' 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="w-3 h-3 text-primary-foreground" />
                    ) : (
                      <Bot className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].suggestions && (
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs h-7"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm" disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI assistant • Available 24/7 • Response time: ~2 seconds
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}