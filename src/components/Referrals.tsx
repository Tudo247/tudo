import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Gift, 
  Users, 
  Share2, 
  Copy, 
  Mail, 
  Star,
  Trophy,
  Target,
  TrendingUp,
  Check,
  ExternalLink,
  Calendar,
  Zap
} from 'lucide-react';

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'joined' | 'hired';
  dateReferred: string;
  pointsEarned: number;
  position?: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'gift-card' | 'course' | 'premium' | 'merchandise';
  image: string;
  available: boolean;
  claimed?: boolean;
}

export function Referrals() {
  const [referralEmail, setReferralEmail] = useState('');
  const [userPoints] = useState(1250);
  const [referralCode] = useState('ALEX2024');
  const [copied, setCopied] = useState(false);

  const mockReferrals: Referral[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      status: 'hired',
      dateReferred: '2024-01-10',
      pointsEarned: 500,
      position: 'Software Engineer'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      status: 'joined',
      dateReferred: '2024-01-15',
      pointsEarned: 250
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      status: 'pending',
      dateReferred: '2024-01-18',
      pointsEarned: 0
    }
  ];

  const mockRewards: Reward[] = [
    {
      id: '1',
      title: '$50 Amazon Gift Card',
      description: 'Redeem for Amazon shopping',
      pointsCost: 500,
      category: 'gift-card',
      image: '🎁',
      available: true
    },
    {
      id: '2',
      title: 'Premium Course Access',
      description: 'Unlock any premium course',
      pointsCost: 750,
      category: 'course',
      image: '📚',
      available: true
    },
    {
      id: '3',
      title: 'CareerHub Pro (1 Month)',
      description: 'Premium features access',
      pointsCost: 300,
      category: 'premium',
      image: '⭐',
      available: true,
      claimed: true
    },
    {
      id: '4',
      title: 'CareerHub T-Shirt',
      description: 'Official branded merchandise',
      pointsCost: 200,
      category: 'merchandise',
      image: '👕',
      available: true
    },
    {
      id: '5',
      title: '$100 Starbucks Gift Card',
      description: 'Coffee to fuel your career',
      pointsCost: 1000,
      category: 'gift-card',
      image: '☕',
      available: true
    },
    {
      id: '6',
      title: 'Interview Coaching Session',
      description: '1-on-1 session with expert',
      pointsCost: 800,
      category: 'course',
      image: '🎯',
      available: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'joined': return 'bg-blue-100 text-blue-800';
      case 'hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gift-card': return 'bg-green-100 text-green-800';
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'merchandise': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://careerhub.com/join?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendReferral = () => {
    if (referralEmail) {
      // Mock referral sending
      setReferralEmail('');
      alert('Referral sent successfully!');
    }
  };

  const stats = {
    totalReferrals: mockReferrals.length,
    successfulReferrals: mockReferrals.filter(r => r.status === 'hired').length,
    totalPointsEarned: mockReferrals.reduce((acc, r) => acc + r.pointsEarned, 0),
    nextRewardProgress: (userPoints % 500) / 5 // Progress to next 500-point reward
  };

  const rewardsByCategory = {
    'gift-card': mockRewards.filter(r => r.category === 'gift-card'),
    'course': mockRewards.filter(r => r.category === 'course'),
    'premium': mockRewards.filter(r => r.category === 'premium'),
    'merchandise': mockRewards.filter(r => r.category === 'merchandise'),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Referrals & Rewards</h1>
        <p className="text-muted-foreground">
          Earn points by referring friends and redeem amazing rewards
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Points</p>
                <p className="text-3xl font-bold text-primary">{userPoints}</p>
              </div>
              <Gift className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
                <p className="text-3xl font-bold">{stats.totalReferrals}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful Hires</p>
                <p className="text-3xl font-bold">{stats.successfulReferrals}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Points Earned</p>
                <p className="text-3xl font-bold">{stats.totalPointsEarned}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="refer" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="refer">Refer Friends</TabsTrigger>
          <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
          <TabsTrigger value="history">My Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="refer" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Refer a Friend
                </CardTitle>
                <CardDescription>
                  Share CareerHub with friends and earn points for every successful referral
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Referral Code</label>
                    <div className="flex gap-2">
                      <Input 
                        value={`https://careerhub.com/join?ref=${referralCode}`} 
                        readOnly 
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        onClick={copyReferralCode}
                        className="px-3"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    {copied && (
                      <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Send Direct Invitation</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="friend@email.com"
                        value={referralEmail}
                        onChange={(e) => setReferralEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={sendReferral} disabled={!referralEmail}>
                        <Mail className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Link
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Social Media
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Share Your Link</h4>
                      <p className="text-sm text-muted-foreground">
                        Send your unique referral link to friends
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">They Join & Apply</h4>
                      <p className="text-sm text-muted-foreground">
                        Your friend signs up and starts applying for jobs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Earn Rewards</h4>
                      <p className="text-sm text-muted-foreground">
                        Get points for each milestone they achieve
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Point Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Friend signs up</span>
                      <span className="font-medium">100 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friend gets hired</span>
                      <span className="font-medium">500 points</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friend completes course</span>
                      <span className="font-medium">150 points</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress to Next Reward */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Progress to Next Reward
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Next $50 Gift Card</span>
                  <span className="text-sm text-muted-foreground">{userPoints}/1500 points</span>
                </div>
                <Progress value={(userPoints / 1500) * 100} />
                <p className="text-sm text-muted-foreground">
                  {1500 - userPoints} more points to unlock your next reward!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Rewards Store</h2>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold">{userPoints} points available</span>
            </div>
          </div>

          {Object.entries(rewardsByCategory).map(([category, rewards]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">
                {category.replace('-', ' ')} Rewards
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className={`hover:shadow-lg transition-shadow duration-300 ${!reward.available ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{reward.image}</div>
                        <h4 className="font-semibold mb-1">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Badge className={getCategoryColor(reward.category)}>
                            {reward.category.replace('-', ' ')}
                          </Badge>
                          {!reward.available && (
                            <Badge variant="outline">Coming Soon</Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{reward.pointsCost} points</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">Popular</span>
                          </div>
                        </div>

                        <Button 
                          className="w-full" 
                          disabled={!reward.available || userPoints < reward.pointsCost || reward.claimed}
                          variant={reward.claimed ? "outline" : "default"}
                        >
                          {reward.claimed ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Claimed
                            </>
                          ) : userPoints < reward.pointsCost ? (
                            `Need ${reward.pointsCost - userPoints} more points`
                          ) : !reward.available ? (
                            'Coming Soon'
                          ) : (
                            'Redeem Now'
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Referrals</CardTitle>
              <CardDescription>Track the status of your referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{referral.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{referral.email}</span>
                        <span>•</span>
                        <span>Referred {new Date(referral.dateReferred).toLocaleDateString()}</span>
                        {referral.position && (
                          <>
                            <span>•</span>
                            <span>Hired as {referral.position}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-primary">
                          {referral.pointsEarned > 0 ? `+${referral.pointsEarned} pts` : '0 pts'}
                        </div>
                      </div>
                      <Badge className={getStatusColor(referral.status)}>
                        {referral.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson hired</p>
                      <p className="text-sm text-muted-foreground">Jan 20, 2024</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">+500 pts</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Michael Chen joined</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                  </div>
                  <span className="font-semibold text-blue-600">+250 pts</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Redeemed Premium Access</p>
                      <p className="text-sm text-muted-foreground">Jan 12, 2024</p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-600">-300 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}