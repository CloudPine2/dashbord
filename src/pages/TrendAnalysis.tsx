
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  TrendingUp, TrendingDown, Activity, BarChart3, PieChart, LineChart, 
  Target, Users, Globe, Calendar, Clock, RefreshCw, Save, Edit, 
  Trash2, Share2, Eye, Filter, Search, Plus, Zap, Lightbulb, 
  Database, BookOpen, FileText, Star, CheckCircle, AlertTriangle, 
  XCircle, Play, Pause, Square, RotateCcw, History, Code, 
  ArrowUpRight, ArrowDownRight, Minus, DollarSign, ChartBar,
  Brain, Cpu, HardDrive, Network, Wifi, Cloud, Smartphone, Monitor
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for trend analysis
const mockResearchTrends = [
  {
    id: 1,
    title: "Artificial Intelligence in Healthcare",
    category: "AI & Healthcare",
    trend: "rising",
    growth: 45.2,
    volume: 1250,
    impact: "high",
    description: "AI applications in medical diagnosis, drug discovery, and patient care",
    keywords: ["AI", "Healthcare", "Machine Learning", "Medical Imaging"],
    publications: 234,
    citations: 1567,
    funding: "$2.4B",
    timeline: "2020-2024",
    regions: ["North America", "Europe", "Asia-Pacific"],
    institutions: ["MIT", "Stanford", "Harvard", "Oxford"],
    sentiment: "positive",
    confidence: 89.5
  },
  {
    id: 2,
    title: "Quantum Computing Applications",
    category: "Quantum Technology",
    trend: "rising",
    growth: 67.8,
    volume: 890,
    impact: "very_high",
    description: "Quantum algorithms, cryptography, and computational breakthroughs",
    keywords: ["Quantum", "Computing", "Cryptography", "Algorithms"],
    publications: 189,
    citations: 2341,
    funding: "$1.8B",
    timeline: "2019-2024",
    regions: ["North America", "Europe"],
    institutions: ["IBM", "Google", "Microsoft", "Intel"],
    sentiment: "positive",
    confidence: 92.3
  },
  {
    id: 3,
    title: "Climate Change Mitigation",
    category: "Environmental Science",
    trend: "stable",
    growth: 12.4,
    volume: 2100,
    impact: "critical",
    description: "Renewable energy, carbon capture, and sustainable technologies",
    keywords: ["Climate", "Renewable Energy", "Sustainability", "Carbon"],
    publications: 456,
    citations: 3120,
    funding: "$4.2B",
    timeline: "2015-2024",
    regions: ["Global"],
    institutions: ["UN", "NASA", "ESA", "Various Universities"],
    sentiment: "positive",
    confidence: 78.9
  },
  {
    id: 4,
    title: "Blockchain in Finance",
    category: "Fintech",
    trend: "declining",
    growth: -8.7,
    volume: 670,
    impact: "medium",
    description: "Cryptocurrency, DeFi, and distributed ledger applications",
    keywords: ["Blockchain", "Cryptocurrency", "DeFi", "Finance"],
    publications: 234,
    citations: 890,
    funding: "$1.2B",
    timeline: "2017-2024",
    regions: ["North America", "Asia-Pacific"],
    institutions: ["Various Fintech Companies", "Universities"],
    sentiment: "neutral",
    confidence: 65.4
  },
  {
    id: 5,
    title: "Space Exploration Technologies",
    category: "Aerospace",
    trend: "rising",
    growth: 34.6,
    volume: 445,
    impact: "high",
    description: "Mars missions, satellite technology, and space tourism",
    keywords: ["Space", "Mars", "Satellites", "Space Tourism"],
    publications: 167,
    citations: 1234,
    funding: "$3.1B",
    timeline: "2018-2024",
    regions: ["North America", "Europe", "Asia"],
    institutions: ["NASA", "SpaceX", "ESA", "Roscosmos"],
    sentiment: "positive",
    confidence: 85.7
  }
];

const mockMarketTrends = [
  {
    id: 1,
    sector: "Technology",
    trend: "rising",
    marketCap: "$12.4T",
    growth: 23.4,
    volume: "High",
    volatility: "Medium",
    keyDrivers: ["AI Adoption", "Cloud Computing", "Cybersecurity"],
    topCompanies: ["Apple", "Microsoft", "Google", "Amazon"],
    riskFactors: ["Regulation", "Competition", "Economic Uncertainty"],
    opportunities: ["AI Integration", "Digital Transformation", "Emerging Markets"],
    sentiment: "positive",
    confidence: 87.2
  },
  {
    id: 2,
    sector: "Healthcare",
    trend: "stable",
    marketCap: "$8.7T",
    growth: 15.8,
    volume: "Medium",
    volatility: "Low",
    keyDrivers: ["Aging Population", "Medical Innovation", "Digital Health"],
    topCompanies: ["Johnson & Johnson", "Pfizer", "UnitedHealth", "Novartis"],
    riskFactors: ["Regulatory Changes", "Patent Expirations", "Clinical Failures"],
    opportunities: ["Personalized Medicine", "Telemedicine", "Biotechnology"],
    sentiment: "positive",
    confidence: 76.8
  },
  {
    id: 3,
    sector: "Energy",
    trend: "rising",
    marketCap: "$6.2T",
    growth: 18.9,
    volume: "High",
    volatility: "High",
    keyDrivers: ["Energy Transition", "Renewable Adoption", "Geopolitical Factors"],
    topCompanies: ["ExxonMobil", "Chevron", "NextEra Energy", "BP"],
    riskFactors: ["Oil Price Volatility", "Climate Policy", "Geopolitical Tensions"],
    opportunities: ["Renewable Energy", "Energy Storage", "Smart Grid"],
    sentiment: "neutral",
    confidence: 68.4
  }
];

const mockTrendAnalytics = {
  totalTrends: 156,
  risingTrends: 89,
  decliningTrends: 23,
  stableTrends: 44,
  topCategories: [
    { category: "AI & Machine Learning", count: 34, percentage: 22 },
    { category: "Healthcare", count: 28, percentage: 18 },
    { category: "Environmental", count: 23, percentage: 15 },
    { category: "Technology", count: 19, percentage: 12 },
    { category: "Finance", count: 16, percentage: 10 }
  ],
  regionalDistribution: [
    { region: "North America", trends: 67, percentage: 43 },
    { region: "Europe", trends: 45, percentage: 29 },
    { region: "Asia-Pacific", trends: 34, percentage: 22 },
    { region: "Other", trends: 10, percentage: 6 }
  ],
  fundingTrends: [
    { year: "2020", amount: "$45.2B" },
    { year: "2021", amount: "$52.8B" },
    { year: "2022", amount: "$48.9B" },
    { year: "2023", amount: "$61.4B" },
    { year: "2024", amount: "$58.7B" }
  ],
  publicationGrowth: [
    { month: "Jan", publications: 1234 },
    { month: "Feb", publications: 1345 },
    { month: "Mar", publications: 1456 },
    { month: "Apr", publications: 1567 },
    { month: "May", publications: 1678 },
    { month: "Jun", publications: 1789 }
  ]
};

const mockPredictions = [
  {
    id: 1,
    title: "AI Healthcare Market Growth",
    prediction: "The AI healthcare market will reach $45.8B by 2028",
    confidence: 87.5,
    timeframe: "2024-2028",
    factors: ["Increasing AI adoption", "Growing healthcare data", "Regulatory support"],
    impact: "high",
    category: "Healthcare AI"
  },
  {
    id: 2,
    title: "Quantum Computing Breakthrough",
    prediction: "Commercial quantum advantage achieved by 2026",
    confidence: 72.3,
    timeframe: "2024-2026",
    factors: ["Rapid technological progress", "Increased funding", "Industry collaboration"],
    impact: "very_high",
    category: "Quantum Technology"
  },
  {
    id: 3,
    title: "Renewable Energy Dominance",
    prediction: "Renewables will provide 60% of global energy by 2030",
    confidence: 68.9,
    timeframe: "2024-2030",
    factors: ["Policy support", "Cost reduction", "Climate urgency"],
    impact: "critical",
    category: "Energy"
  }
];

const TrendAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [showAddTrendDialog, setShowAddTrendDialog] = useState(false);
  const [showPredictionDialog, setShowPredictionDialog] = useState(false);
  const [newTrend, setNewTrend] = useState({
    title: '',
    category: '',
    description: '',
    keywords: [],
    impact: 'medium',
    timeline: ''
  });
  const [newPrediction, setNewPrediction] = useState({
    title: '',
    prediction: '',
    timeframe: '',
    factors: [],
    impact: 'medium',
    category: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  // Filter trends based on search and filters
  const filteredResearchTrends = mockResearchTrends.filter(trend => {
    const matchesSearch = trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trend.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || trend.category === selectedCategory;
    const matchesTrend = selectedTrend === 'all' || trend.trend === selectedTrend;
    const matchesImpact = selectedImpact === 'all' || trend.impact === selectedImpact;
    return matchesSearch && matchesCategory && matchesTrend && matchesImpact;
  });

  // Get unique categories and trends
  const categories = ['all', ...Array.from(new Set(mockResearchTrends.map(trend => trend.category)))];
  const trends = ['all', 'rising', 'stable', 'declining'];
  const impacts = ['all', 'low', 'medium', 'high', 'very_high', 'critical'];

  const handleAddTrend = () => {
    if (!newTrend.title.trim() || !newTrend.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide trend title and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trend Added",
      description: `"${newTrend.title}" has been added successfully.`,
    });
    
    setShowAddTrendDialog(false);
    setNewTrend({ title: '', category: '', description: '', keywords: [], impact: 'medium', timeline: '' });
  };

  const handleAddPrediction = () => {
    if (!newPrediction.title.trim() || !newPrediction.prediction.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide prediction title and content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Prediction Added",
      description: `"${newPrediction.title}" has been added successfully.`,
    });
    
    setShowPredictionDialog(false);
    setNewPrediction({ title: '', prediction: '', timeframe: '', factors: [], impact: 'medium', category: '' });
  };

  const handleAnalyzeTrends = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate trend analysis
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({
            title: "Analysis Complete",
            description: "Trend analysis has been completed successfully.",
          });
          return 0;
        }
        return prev + Math.random() * 20;
      });
    }, 500);
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising': return 'bg-green-100 text-green-700';
      case 'stable': return 'bg-blue-100 text-blue-700';
      case 'declining': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4" />;
      case 'stable': return <Activity className="w-4 h-4" />;
      case 'declining': return <TrendingDown className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-yellow-100 text-yellow-700';
      case 'very_high': return 'bg-orange-100 text-orange-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-700';
      case 'neutral': return 'bg-blue-100 text-blue-700';
      case 'negative': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Trend Analysis</h1>
            <p className="text-forest-600">Advanced research and market trend analysis with AI-powered insights</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddTrendDialog} onOpenChange={setShowAddTrendDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trend
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Research Trend</DialogTitle>
                  <DialogDescription>Track and analyze emerging research trends</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Trend Title"
                      value={newTrend.title}
                      onChange={(e) => setNewTrend({...newTrend, title: e.target.value})}
                    />
                    <Select value={newTrend.category} onValueChange={(value) => setNewTrend({...newTrend, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI & Healthcare">AI & Healthcare</SelectItem>
                        <SelectItem value="Quantum Technology">Quantum Technology</SelectItem>
                        <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                        <SelectItem value="Aerospace">Aerospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Trend Description"
                    value={newTrend.description}
                    onChange={(e) => setNewTrend({...newTrend, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newTrend.impact} onValueChange={(value) => setNewTrend({...newTrend, impact: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Impact Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very_high">Very High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Timeline (e.g., 2020-2024)"
                      value={newTrend.timeline}
                      onChange={(e) => setNewTrend({...newTrend, timeline: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddTrend} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add Trend
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddTrendDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showPredictionDialog} onOpenChange={setShowPredictionDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Add Prediction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Market Prediction</DialogTitle>
                  <DialogDescription>Create AI-powered market predictions and forecasts</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Prediction Title"
                      value={newPrediction.title}
                      onChange={(e) => setNewPrediction({...newPrediction, title: e.target.value})}
                    />
                    <Select value={newPrediction.category} onValueChange={(value) => setNewPrediction({...newPrediction, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthcare AI">Healthcare AI</SelectItem>
                        <SelectItem value="Quantum Technology">Quantum Technology</SelectItem>
                        <SelectItem value="Energy">Energy</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Prediction Content"
                    value={newPrediction.prediction}
                    onChange={(e) => setNewPrediction({...newPrediction, prediction: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newPrediction.impact} onValueChange={(value) => setNewPrediction({...newPrediction, impact: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Impact Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very_high">Very High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Timeframe (e.g., 2024-2028)"
                      value={newPrediction.timeframe}
                      onChange={(e) => setNewPrediction({...newPrediction, timeframe: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddPrediction} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add Prediction
                    </Button>
                    <Button variant="outline" onClick={() => setShowPredictionDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleAnalyzeTrends} disabled={isAnalyzing} className="bg-forest-600 hover:bg-forest-700">
              <Zap className="w-4 h-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Trends'}
            </Button>
          </div>
        </div>
        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Rising Trends</h3>
              <p className="text-sm text-forest-600">{mockTrendAnalytics.risingTrends} trends</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Stable Trends</h3>
              <p className="text-sm text-forest-600">{mockTrendAnalytics.stableTrends} trends</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Declining Trends</h3>
              <p className="text-sm text-forest-600">{mockTrendAnalytics.decliningTrends} trends</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Total Trends</h3>
              <p className="text-sm text-forest-600">{mockTrendAnalytics.totalTrends} analyzed</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Trend Analysis Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-forest-600">Analyzing trends...</span>
                  <span className="font-medium text-forest-900">{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="w-4 h-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="outline">
                  <Square className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTrend} onValueChange={setSelectedTrend}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Trend" />
              </SelectTrigger>
              <SelectContent>
                {trends.map((trend) => (
                  <SelectItem key={trend} value={trend}>
                    {trend === 'all' ? 'All' : trend}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedImpact} onValueChange={setSelectedImpact}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Impact" />
              </SelectTrigger>
              <SelectContent>
                {impacts.map((impact) => (
                  <SelectItem key={impact} value={impact}>
                    {impact === 'all' ? 'All' : impact}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Trend Summary</CardTitle>
                  <CardDescription>Overview of current research and market trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{mockTrendAnalytics.risingTrends}</div>
                      <div className="text-sm text-green-600">Rising Trends</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{mockTrendAnalytics.stableTrends}</div>
                      <div className="text-sm text-blue-600">Stable Trends</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-700">{mockTrendAnalytics.decliningTrends}</div>
                      <div className="text-sm text-red-600">Declining Trends</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="text-2xl font-bold text-forest-700">{mockTrendAnalytics.totalTrends}</div>
                      <div className="text-sm text-forest-600">Total Trends</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Top Categories</CardTitle>
                  <CardDescription>Most active research categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrendAnalytics.topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{category.category}</span>
                        <span className="text-sm text-forest-600">{category.count} trends</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Trends */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Recent Research Trends</CardTitle>
                <CardDescription>Latest trends in research and development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResearchTrends.slice(0, 3).map((trend) => (
                    <div key={trend.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{trend.title}</h4>
                          <Badge className={getTrendColor(trend.trend)}>
                            {getTrendIcon(trend.trend)}
                            <span className="ml-1 capitalize">{trend.trend}</span>
                          </Badge>
                          <Badge className={getImpactColor(trend.impact)}>
                            {trend.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-forest-600 mb-2">{trend.description}</p>
                        <div className="flex items-center gap-4 text-xs text-forest-500">
                          <span>📚 {trend.publications} publications</span>
                          <span>📖 {trend.citations} citations</span>
                          <span>💰 {trend.funding} funding</span>
                          <span>🌍 {trend.regions.length} regions</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="space-y-4">
              {filteredResearchTrends.map((trend) => (
                <Card key={trend.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-forest-900 text-lg">{trend.title}</h3>
                          <Badge className={getTrendColor(trend.trend)}>
                            {getTrendIcon(trend.trend)}
                            <span className="ml-1 capitalize">{trend.trend}</span>
                          </Badge>
                          <Badge className={getImpactColor(trend.impact)}>
                            {trend.impact}
                          </Badge>
                          <Badge className={getSentimentColor(trend.sentiment)}>
                            {trend.sentiment}
                          </Badge>
                        </div>
                        <p className="text-forest-600 mb-3">{trend.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {trend.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-forest-500">Category:</span>
                            <div className="font-medium text-forest-900">{trend.category}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Growth:</span>
                            <div className="font-medium text-forest-900">{trend.growth}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Timeline:</span>
                            <div className="font-medium text-forest-900">{trend.timeline}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Confidence:</span>
                            <div className="font-medium text-forest-900">{trend.confidence}%</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                          <div>
                            <span className="text-forest-500">Publications:</span>
                            <div className="font-medium text-forest-900">{trend.publications}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Citations:</span>
                            <div className="font-medium text-forest-900">{trend.citations}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Funding:</span>
                            <div className="font-medium text-forest-900">{trend.funding}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Volume:</span>
                            <div className="font-medium text-forest-900">{trend.volume}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Research
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <div className="space-y-4">
              {mockMarketTrends.map((market) => (
                <Card key={market.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-forest-900 text-lg">{market.sector}</h3>
                          <Badge className={getTrendColor(market.trend)}>
                            {getTrendIcon(market.trend)}
                            <span className="ml-1 capitalize">{market.trend}</span>
                          </Badge>
                          <Badge className={getSentimentColor(market.sentiment)}>
                            {market.sentiment}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-forest-500">Market Cap:</span>
                            <div className="font-medium text-forest-900">{market.marketCap}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Growth:</span>
                            <div className="font-medium text-forest-900">{market.growth}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Volume:</span>
                            <div className="font-medium text-forest-900">{market.volume}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Volatility:</span>
                            <div className="font-medium text-forest-900">{market.volatility}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-forest-900">Key Drivers:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {market.keyDrivers.map((driver, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {driver}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-forest-900">Top Companies:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {market.topCompanies.map((company, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Market Analysis
                      </Button>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Growth Forecast
                      </Button>
                      <Button size="sm" variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Risk Assessment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">AI-Powered Predictions</CardTitle>
                <CardDescription>Market and technology predictions with confidence scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPredictions.map((prediction) => (
                    <div key={prediction.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-forest-900 mb-1">{prediction.title}</h4>
                          <p className="text-sm text-forest-600 mb-2">{prediction.prediction}</p>
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span>⏰ {prediction.timeframe}</span>
                            <span>🎯 {prediction.impact} impact</span>
                            <span>📊 {prediction.confidence}% confidence</span>
                          </div>
                        </div>
                        <Badge className={getImpactColor(prediction.impact)}>
                          {prediction.impact}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-forest-900">Supporting Factors:</span>
                        <div className="flex flex-wrap gap-1">
                          {prediction.factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analyze
                        </Button>
                        <Button size="sm" variant="outline">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Regional Distribution</CardTitle>
                  <CardDescription>Trend distribution across regions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTrendAnalytics.regionalDistribution.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{region.region}</span>
                        <span className="text-sm text-forest-600">{region.trends} trends</span>
                      </div>
                      <Progress value={region.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Funding Trends</CardTitle>
                  <CardDescription>Research funding over the years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {mockTrendAnalytics.fundingTrends.map((year, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-forest-600 rounded-t"
                          style={{ height: `${(parseFloat(year.amount.replace('$', '').replace('B', '')) / 70) * 100}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{year.year}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Publication Growth */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Publication Growth</CardTitle>
                <CardDescription>Monthly publication trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockTrendAnalytics.publicationGrowth.map((month, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-forest-600 rounded-t"
                        style={{ height: `${(month.publications / 2000) * 100}%` }}
                      ></div>
                      <span className="text-xs text-forest-600 mt-1">{month.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrendAnalysis;
