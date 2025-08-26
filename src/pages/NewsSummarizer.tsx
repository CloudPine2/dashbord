
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Newspaper, Search, Sparkles, Clock, TrendingUp, Globe, Filter, BookOpen, 
  BarChart3, Target, Shield, Users, Calendar, Zap, Eye, Share2, Bookmark,
  AlertTriangle, CheckCircle, XCircle, TrendingDown, Activity, PieChart
} from 'lucide-react';
import { groqService } from '@/services/groqService';
import { useToast } from '@/hooks/use-toast';

const mockNews = [
  {
    id: 1,
    title: "AI Revolution in Healthcare: New Breakthrough in Drug Discovery",
    source: "TechCrunch",
    category: "Technology",
    time: "2 hours ago",
    content: "Researchers have developed an AI system that can predict drug interactions with 95% accuracy...",
    url: "#",
    sentiment: "positive",
    credibility: 95,
    readTime: "3 min",
    views: 15420,
    shares: 234,
    relatedTopics: ["Machine Learning", "Pharmaceuticals", "Healthcare AI"]
  },
  {
    id: 2,
    title: "Climate Change Solutions: Renewable Energy Reaches New Milestone",
    source: "Reuters",
    category: "Environment",
    time: "4 hours ago",
    content: "Global renewable energy capacity increased by 15% this quarter, marking a significant shift...",
    url: "#",
    sentiment: "positive",
    credibility: 98,
    readTime: "4 min",
    views: 12850,
    shares: 189,
    relatedTopics: ["Solar Energy", "Wind Power", "Sustainability"]
  },
  {
    id: 3,
    title: "Financial Markets Show Resilience Amid Economic Uncertainty",
    source: "Bloomberg",
    category: "Finance",
    time: "6 hours ago",
    content: "Despite global economic challenges, major indices continue to show positive trends...",
    url: "#",
    sentiment: "neutral",
    credibility: 92,
    readTime: "5 min",
    views: 9870,
    shares: 156,
    relatedTopics: ["Stock Market", "Economic Recovery", "Global Trade"]
  },
  {
    id: 4,
    title: "Space Tourism Takes Off: First Commercial Space Hotel Announced",
    source: "Space.com",
    category: "Technology",
    time: "8 hours ago",
    content: "A major aerospace company has announced plans to build the world's first commercial space hotel...",
    url: "#",
    sentiment: "positive",
    credibility: 87,
    readTime: "6 min",
    views: 21500,
    shares: 445,
    relatedTopics: ["Space Travel", "Tourism", "Aerospace"]
  },
  {
    id: 5,
    title: "Global Supply Chain Crisis: Impact on Consumer Prices",
    source: "CNBC",
    category: "Finance",
    time: "10 hours ago",
    content: "Supply chain disruptions continue to affect global markets, leading to increased consumer costs...",
    url: "#",
    sentiment: "negative",
    credibility: 94,
    readTime: "4 min",
    views: 11200,
    shares: 267,
    relatedTopics: ["Supply Chain", "Inflation", "Global Trade"]
  }
];

const mockTrendingTopics = [
  { topic: "AI Healthcare", count: 15, trend: "+25%", sentiment: "positive", category: "Technology" },
  { topic: "Climate Tech", count: 12, trend: "+18%", sentiment: "positive", category: "Environment" },
  { topic: "Financial Markets", count: 8, trend: "+5%", sentiment: "neutral", category: "Finance" },
  { topic: "Space Technology", count: 6, trend: "+35%", sentiment: "positive", category: "Technology" },
  { topic: "Supply Chain", count: 9, trend: "-12%", sentiment: "negative", category: "Finance" },
  { topic: "Renewable Energy", count: 11, trend: "+22%", sentiment: "positive", category: "Environment" }
];

const mockSentimentData = {
  positive: 45,
  neutral: 35,
  negative: 20
};

const mockCredibilitySources = [
  { source: "Reuters", score: 98, reliability: "Very High" },
  { source: "Associated Press", score: 97, reliability: "Very High" },
  { source: "BBC News", score: 96, reliability: "Very High" },
  { source: "Bloomberg", score: 94, reliability: "High" },
  { source: "TechCrunch", score: 89, reliability: "High" },
  { source: "Space.com", score: 87, reliability: "High" }
];

const NewsSummarizer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customArticles, setCustomArticles] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const { toast } = useToast();

  const generateSummary = async (articles: string) => {
    if (!groqService.isConfigured()) {
      toast({
        title: "API Key Required",
        description: "Please configure your Groq API key in Settings to use AI features.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Analyze these news articles and provide:
1. Executive summary with key points
2. Sentiment analysis
3. Emerging trends and patterns
4. Potential implications
5. Related topics for further research

Articles: ${articles}`;
      const result = await groqService.generateResponse(prompt);
      setSummary(result);
      
      toast({
        title: "Analysis Complete",
        description: "AI-powered news analysis generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to generate analysis. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSummary = async () => {
    const articlesText = mockNews
      .filter(article => selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory)
      .map(article => `${article.title}: ${article.content}`)
      .join('\n\n');
    
    await generateSummary(articlesText);
  };

  const handleCustomSummary = async () => {
    if (!customArticles.trim()) {
      toast({
        title: "No Content",
        description: "Please paste some articles to analyze.",
        variant: "destructive"
      });
      return;
    }
    await generateSummary(customArticles);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-700';
      case 'negative': return 'bg-red-100 text-red-700';
      case 'neutral': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      case 'neutral': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 95) return 'bg-green-100 text-green-700';
    if (score >= 85) return 'bg-blue-100 text-blue-700';
    if (score >= 75) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const filteredNews = mockNews.filter(article => 
    (selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory) &&
    (searchQuery === '' || article.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">News Summarizer</h1>
            <p className="text-forest-600">AI-powered news analysis, sentiment tracking, and trend identification</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="technology">Tech</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1h</SelectItem>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7d</SelectItem>
                <SelectItem value="30d">30d</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">AI Analysis</h3>
              <p className="text-sm text-forest-600">Smart news insights</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Sentiment</h3>
              <p className="text-sm text-forest-600">Mood analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Trends</h3>
              <p className="text-sm text-forest-600">Pattern detection</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Credibility</h3>
              <p className="text-sm text-forest-600">Source verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* News Feed */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2 text-forest-900">
                        <Newspaper className="w-5 h-5" />
                        Latest News
                      </CardTitle>
                      <Button 
                        onClick={handleQuickSummary}
                        disabled={isLoading}
                        size="sm"
                        className="bg-forest-600 hover:bg-forest-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredNews.map((article) => (
                      <div key={article.id} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                              {article.category}
                            </Badge>
                            <Badge className={getSentimentColor(article.sentiment)}>
                              {getSentimentIcon(article.sentiment)}
                              <span className="ml-1 capitalize">{article.sentiment}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-forest-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.time}
                          </div>
                        </div>
                        <h3 className="font-semibold text-forest-900 mb-2">{article.title}</h3>
                        <p className="text-forest-600 text-sm mb-3">{article.content}</p>
                        
                        {/* Enhanced Article Metadata */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.relatedTopics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span>{article.source}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views.toLocaleString()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              {article.shares}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Bookmark className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline">
                              <BookOpen className="w-3 h-3 mr-1" />
                              Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Custom Article Input */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Custom Article Analysis</CardTitle>
                    <CardDescription>Paste your own articles for comprehensive AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Paste news articles here for custom analysis..."
                      value={customArticles}
                      onChange={(e) => setCustomArticles(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <Button 
                      onClick={handleCustomSummary}
                      disabled={isLoading}
                      className="w-full bg-forest-600 hover:bg-forest-700"
                    >
                      {isLoading ? (
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      Generate AI Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* AI Summary */}
                {summary && (
                  <Card className="bg-gradient-to-br from-forest-50 to-cream-50 border-forest-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-forest-900">
                        <Sparkles className="w-5 h-5" />
                        AI Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none text-forest-700">
                        {summary.split('\n').map((line, index) => (
                          <p key={index} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sentiment Overview */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-forest-900">
                      <BarChart3 className="w-5 h-5" />
                      Sentiment Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-forest-700">Positive</span>
                        <span className="text-sm font-medium text-forest-900">{mockSentimentData.positive}%</span>
                      </div>
                      <Progress value={mockSentimentData.positive} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-forest-700">Neutral</span>
                        <span className="text-sm font-medium text-forest-900">{mockSentimentData.neutral}%</span>
                      </div>
                      <Progress value={mockSentimentData.neutral} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-forest-700">Negative</span>
                        <span className="text-sm font-medium text-forest-900">{mockSentimentData.negative}%</span>
                      </div>
                      <Progress value={mockSentimentData.negative} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-forest-900">
                      <TrendingUp className="w-5 h-5" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockTrendingTopics.slice(0, 6).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded hover:bg-forest-50">
                        <div>
                          <div className="font-medium text-forest-900">{item.topic}</div>
                          <div className="text-xs text-forest-600">{item.count} articles</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSentimentColor(item.sentiment)}>
                            {getSentimentIcon(item.sentiment)}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Filters */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['Breaking News', 'Analysis', 'Opinion', 'Research', 'Verified', 'Trending'].map((filter) => (
                      <Button key={filter} variant="outline" size="sm" className="w-full justify-start">
                        <Filter className="w-3 h-3 mr-2" />
                        {filter}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">AI-Powered Insights</CardTitle>
                  <CardDescription>Advanced analysis using machine learning</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-forest-600" />
                        <span className="font-medium">Pattern Recognition</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-forest-600" />
                        <span className="font-medium">Trend Prediction</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-forest-600" />
                        <span className="font-medium">Audience Analysis</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Learning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Analysis Metrics</CardTitle>
                  <CardDescription>Performance and accuracy indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">94.2%</div>
                      <div className="text-sm text-forest-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">2.3s</div>
                      <div className="text-sm text-forest-600">Avg Response</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">1,247</div>
                      <div className="text-sm text-forest-600">Articles Analyzed</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">89%</div>
                      <div className="text-sm text-forest-600">User Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sentiment Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Sentiment Analysis Dashboard</CardTitle>
                  <CardDescription>Real-time sentiment tracking across news sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sentiment Distribution */}
                    <div>
                      <h4 className="font-medium text-forest-900 mb-3">Sentiment Distribution</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-3xl font-bold text-green-700">{mockSentimentData.positive}%</div>
                          <div className="text-sm text-green-600">Positive</div>
                          <div className="text-xs text-green-500 mt-1">↑ +5% from yesterday</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-3xl font-bold text-gray-700">{mockSentimentData.neutral}%</div>
                          <div className="text-sm text-gray-600">Neutral</div>
                          <div className="text-xs text-gray-500 mt-1">→ No change</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="text-3xl font-bold text-red-700">{mockSentimentData.negative}%</div>
                          <div className="text-sm text-red-600">Negative</div>
                          <div className="text-xs text-red-500 mt-1">↓ -3% from yesterday</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Sentiment by Category */}
                    <div>
                      <h4 className="font-medium text-forest-900 mb-3">Sentiment by Category</h4>
                      <div className="space-y-3">
                        {['Technology', 'Environment', 'Finance', 'Health', 'Politics'].map((category, index) => (
                          <div key={category} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                            <span className="font-medium text-forest-900">{category}</span>
                            <div className="flex items-center gap-2">
                              <Badge className={index % 3 === 0 ? 'bg-green-100 text-green-700' : index % 3 === 1 ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'}>
                                {index % 3 === 0 ? 'Positive' : index % 3 === 1 ? 'Neutral' : 'Negative'}
                              </Badge>
                              <span className="text-sm text-forest-600">{65 + (index * 7)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Sentiment Trends</CardTitle>
                  <CardDescription>Historical sentiment patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-forest-700">Last 24 hours</span>
                      <Badge className="bg-green-100 text-green-700">+2.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-forest-700">Last 7 days</span>
                      <Badge className="bg-green-100 text-green-700">+5.3%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-forest-700">Last 30 days</span>
                      <Badge className="bg-red-100 text-red-700">-1.2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Emerging Trends</CardTitle>
                  <CardDescription>Topics gaining momentum in the news</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div>
                        <div className="font-medium text-forest-900">{topic.topic}</div>
                        <div className="text-sm text-forest-600">{topic.category} • {topic.count} articles</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSentimentColor(topic.sentiment)}>
                          {getSentimentIcon(topic.sentiment)}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {topic.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Trend Analysis</CardTitle>
                  <CardDescription>Pattern detection and forecasting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-forest-900">Rising Topics</span>
                      </div>
                      <div className="text-sm text-forest-600">AI Healthcare, Climate Tech, Space Tourism</div>
                    </div>
                    
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-forest-900">Declining Topics</span>
                      </div>
                      <div className="text-sm text-forest-600">Supply Chain Issues, Economic Uncertainty</div>
                    </div>
                    
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-forest-900">Stable Topics</span>
                      </div>
                      <div className="text-sm text-forest-600">Financial Markets, Technology Innovation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Source Credibility</CardTitle>
                  <CardDescription>Reliability scores for news sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCredibilitySources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div>
                        <div className="font-medium text-forest-900">{source.source}</div>
                        <div className="text-sm text-forest-600">{source.reliability}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getCredibilityColor(source.score)}>
                          {source.score}/100
                        </Badge>
                        {source.score >= 95 ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : source.score >= 85 ? (
                          <Shield className="w-4 h-4 text-blue-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Source Categories</CardTitle>
                  <CardDescription>News source classification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-forest-900">Verified Sources</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">24</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-forest-900">Reliable Sources</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">18</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-forest-900">Moderate Sources</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700">12</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-forest-900">Low Reliability</span>
                      </div>
                      <Badge className="bg-red-100 text-red-700">6</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewsSummarizer;
