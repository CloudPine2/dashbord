
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
  Network, Users, Globe, Calendar, Clock, RefreshCw, Save, Edit, 
  Trash2, Share2, Eye, Filter, Search, Plus, Zap, Lightbulb, 
  BarChart3, PieChart, LineChart, TrendingUp, Target, BookOpen,
  Database, Star, CheckCircle, AlertTriangle, XCircle, Play, 
  Pause, Square, RotateCcw, History, Code, ArrowUpRight, 
  ArrowDownRight, Minus, DollarSign, ChartBar, Brain, Cpu, 
  HardDrive, Wifi, Cloud, Smartphone, Monitor, GitBranch, 
  GitCommit, GitPullRequest, GitMerge, GitCompare, Link, 
  Share, Activity, Shield, Key, Lock, Unlock, Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for network analysis
const mockResearchNetworks = [
  {
    id: 1,
    name: "AI Research Collaboration Network",
    description: "Global network of AI researchers and institutions",
    type: "Collaboration",
    status: "active",
    nodes: 1247,
    edges: 3456,
    density: 0.78,
    centrality: 0.92,
    communities: 23,
    lastUpdated: "2 hours ago",
    category: "Artificial Intelligence",
    keywords: ["AI", "Machine Learning", "Research", "Collaboration"],
    topInstitutions: ["MIT", "Stanford", "Google", "Microsoft", "OpenAI"],
    topResearchers: ["Dr. Andrew Ng", "Dr. Yann LeCun", "Dr. Yoshua Bengio"],
    growthRate: 15.4,
    impact: "very_high",
    funding: "$45.2M"
  },
  {
    id: 2,
    name: "Climate Science Network",
    description: "International climate research collaboration network",
    type: "Research",
    status: "active",
    nodes: 892,
    edges: 2134,
    density: 0.65,
    centrality: 0.87,
    communities: 18,
    lastUpdated: "1 day ago",
    category: "Environmental Science",
    keywords: ["Climate", "Environment", "Sustainability", "Research"],
    topInstitutions: ["NASA", "UN", "ESA", "Various Universities"],
    topResearchers: ["Dr. James Hansen", "Dr. Michael Mann", "Dr. Katharine Hayhoe"],
    growthRate: 12.8,
    impact: "critical",
    funding: "$32.8M"
  },
  {
    id: 3,
    name: "Biomedical Research Network",
    description: "Healthcare and medical research collaboration network",
    type: "Healthcare",
    status: "active",
    nodes: 1567,
    edges: 4234,
    density: 0.82,
    centrality: 0.94,
    communities: 31,
    lastUpdated: "3 hours ago",
    category: "Biomedical",
    keywords: ["Healthcare", "Medicine", "Biotechnology", "Research"],
    topInstitutions: ["NIH", "Harvard Medical", "Johns Hopkins", "Mayo Clinic"],
    topResearchers: ["Dr. Anthony Fauci", "Dr. Francis Collins", "Dr. Jennifer Doudna"],
    growthRate: 18.7,
    impact: "very_high",
    funding: "$67.3M"
  },
  {
    id: 4,
    name: "Quantum Computing Network",
    description: "Quantum technology research and development network",
    type: "Technology",
    status: "active",
    nodes: 445,
    edges: 1234,
    density: 0.71,
    centrality: 0.89,
    communities: 12,
    lastUpdated: "5 hours ago",
    category: "Quantum Technology",
    keywords: ["Quantum", "Computing", "Physics", "Technology"],
    topInstitutions: ["IBM", "Google", "Microsoft", "Intel", "Various Universities"],
    topResearchers: ["Dr. John Preskill", "Dr. Scott Aaronson", "Dr. Michelle Simmons"],
    growthRate: 23.5,
    impact: "high",
    funding: "$28.9M"
  },
  {
    id: 5,
    name: "Blockchain Research Network",
    description: "Distributed ledger and cryptocurrency research network",
    type: "Technology",
    status: "declining",
    nodes: 334,
    edges: 789,
    density: 0.45,
    centrality: 0.67,
    communities: 8,
    lastUpdated: "2 days ago",
    category: "Blockchain",
    keywords: ["Blockchain", "Cryptocurrency", "DeFi", "Distributed Systems"],
    topInstitutions: ["Various Fintech Companies", "Universities"],
    topResearchers: ["Dr. Vitalik Buterin", "Dr. Nick Szabo", "Dr. Emin Gün Sirer"],
    growthRate: -5.2,
    impact: "medium",
    funding: "$12.4M"
  }
];

const mockNetworkMetrics = {
  totalNetworks: 156,
  activeNetworks: 134,
  totalNodes: 45678,
  totalEdges: 123456,
  averageDensity: 0.72,
  averageCentrality: 0.84,
  totalCommunities: 456,
  networkGrowth: 12.4,
  collaborationIndex: 0.78,
  researchImpact: 0.91,
  topMetrics: [
    { metric: "Network Density", value: 0.72, trend: "increasing", percentage: 8.5 },
    { metric: "Centrality Score", value: 0.84, trend: "stable", percentage: 2.1 },
    { metric: "Community Count", value: 456, trend: "increasing", percentage: 15.3 },
    { metric: "Collaboration Rate", value: 0.78, trend: "increasing", percentage: 12.7 }
  ],
  networkTrends: [
    { month: "Jan", networks: 142, nodes: 42345, edges: 118234 },
    { month: "Feb", networks: 145, nodes: 43123, edges: 119567 },
    { month: "Mar", networks: 148, nodes: 43890, edges: 120890 },
    { month: "Apr", networks: 151, nodes: 44567, edges: 122234 },
    { month: "May", networks: 153, nodes: 45123, edges: 123456 },
    { month: "Jun", networks: 156, nodes: 45678, edges: 123456 }
  ]
};

const mockNetworkConnections = [
  {
    id: 1,
    source: "MIT AI Lab",
    target: "Stanford AI Lab",
    type: "Collaboration",
    strength: 0.95,
    publications: 45,
    citations: 1234,
    lastActivity: "2 days ago",
    status: "active"
  },
  {
    id: 2,
    source: "Google Research",
    target: "OpenAI",
    type: "Partnership",
    strength: 0.87,
    publications: 23,
    citations: 890,
    lastActivity: "1 week ago",
    status: "active"
  },
  {
    id: 3,
    source: "Harvard Medical",
    target: "Johns Hopkins",
    type: "Research",
    strength: 0.92,
    publications: 67,
    citations: 2345,
    lastActivity: "3 days ago",
    status: "active"
  },
  {
    id: 4,
    source: "NASA Climate",
    target: "UN Environment",
    type: "Policy",
    strength: 0.78,
    publications: 34,
    citations: 567,
    lastActivity: "2 weeks ago",
    status: "active"
  }
];

const mockNetworkCommunities = [
  {
    id: 1,
    name: "AI Research Community",
    size: 234,
    density: 0.85,
    centrality: 0.91,
    topics: ["Machine Learning", "Deep Learning", "Neural Networks"],
    topMembers: ["Dr. Andrew Ng", "Dr. Yann LeCun", "Dr. Yoshua Bengio"],
    publications: 456,
    citations: 12345,
    growth: 18.7
  },
  {
    id: 2,
    name: "Climate Science Community",
    size: 189,
    density: 0.72,
    centrality: 0.84,
    topics: ["Climate Change", "Sustainability", "Environmental Policy"],
    topMembers: ["Dr. James Hansen", "Dr. Michael Mann", "Dr. Katharine Hayhoe"],
    publications: 234,
    citations: 6789,
    growth: 12.4
  },
  {
    id: 3,
    name: "Biomedical Research Community",
    size: 312,
    density: 0.89,
    centrality: 0.93,
    topics: ["Healthcare", "Biotechnology", "Medical Research"],
    topMembers: ["Dr. Anthony Fauci", "Dr. Francis Collins", "Dr. Jennifer Doudna"],
    publications: 567,
    citations: 15678,
    growth: 22.1
  }
];

const mockNetworkInsights = [
  {
    id: 1,
    title: "AI Research Network Expansion",
    insight: "The AI research network has grown 23% this quarter, with increased collaboration between academic and industry institutions.",
    type: "growth",
    confidence: 89.5,
    impact: "high",
    recommendations: ["Increase funding for AI research", "Foster industry-academic partnerships", "Expand international collaboration"]
  },
  {
    id: 2,
    title: "Climate Science Collaboration Gap",
    insight: "Regional gaps in climate science collaboration identified, with limited connections between developing and developed nations.",
    type: "gap",
    confidence: 76.8,
    impact: "medium",
    recommendations: ["Bridge regional collaboration gaps", "Increase funding for developing nations", "Create international research programs"]
  },
  {
    id: 3,
    title: "Biomedical Network Efficiency",
    insight: "Biomedical research network shows optimal efficiency with high collaboration rates and strong community formation.",
    type: "efficiency",
    confidence: 92.3,
    impact: "high",
    recommendations: ["Maintain current collaboration levels", "Share best practices with other networks", "Expand successful partnerships"]
  }
];

const NetworkAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [showAddNetworkDialog, setShowAddNetworkDialog] = useState(false);
  const [showConnectionDialog, setShowConnectionDialog] = useState(false);
  const [newNetwork, setNewNetwork] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    keywords: []
  });
  const [newConnection, setNewConnection] = useState({
    source: '',
    target: '',
    type: '',
    strength: 0.5
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const { toast } = useToast();

  // Filter networks based on search and filters
  const filteredNetworks = mockResearchNetworks.filter(network => {
    const matchesSearch = network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         network.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || network.category === selectedCategory;
    const matchesType = selectedType === 'all' || network.type === selectedType;
    const matchesImpact = selectedImpact === 'all' || network.impact === selectedImpact;
    return matchesSearch && matchesCategory && matchesType && matchesImpact;
  });

  // Get unique categories, types, and impacts
  const categories = ['all', ...Array.from(new Set(mockResearchNetworks.map(network => network.category)))];
  const types = ['all', ...Array.from(new Set(mockResearchNetworks.map(network => network.type)))];
  const impacts = ['all', 'low', 'medium', 'high', 'very_high', 'critical'];

  const handleAddNetwork = () => {
    if (!newNetwork.name.trim() || !newNetwork.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide network name and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Network Added",
      description: `"${newNetwork.name}" has been added successfully.`,
    });
    
    setShowAddNetworkDialog(false);
    setNewNetwork({ name: '', description: '', category: '', type: '', keywords: [] });
  };

  const handleAddConnection = () => {
    if (!newConnection.source.trim() || !newConnection.target.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide source and target nodes.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Connection Added",
      description: `Connection between ${newConnection.source} and ${newConnection.target} has been added successfully.`,
    });
    
    setShowConnectionDialog(false);
    setNewConnection({ source: '', target: '', type: '', strength: 0.5 });
  };

  const handleAnalyzeNetwork = async (networkId: number) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate network analysis
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          toast({
            title: "Analysis Complete",
            description: "Network analysis has been completed successfully.",
          });
          return 0;
        }
        return prev + Math.random() * 20;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'declining': return 'bg-red-100 text-red-700';
      case 'stable': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Collaboration': return 'bg-blue-100 text-blue-700';
      case 'Research': return 'bg-green-100 text-green-700';
      case 'Healthcare': return 'bg-purple-100 text-purple-700';
      case 'Technology': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-blue-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Network Analysis</h1>
            <p className="text-forest-600">Advanced research network analysis with AI-powered insights and visualization</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddNetworkDialog} onOpenChange={setShowAddNetworkDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Network
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Research Network</DialogTitle>
                  <DialogDescription>Create and configure a new research network for analysis</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Network Name"
                      value={newNetwork.name}
                      onChange={(e) => setNewNetwork({...newNetwork, name: e.target.value})}
                    />
                    <Select value={newNetwork.category} onValueChange={(value) => setNewNetwork({...newNetwork, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                        <SelectItem value="Biomedical">Biomedical</SelectItem>
                        <SelectItem value="Quantum Technology">Quantum Technology</SelectItem>
                        <SelectItem value="Blockchain">Blockchain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Network Description"
                    value={newNetwork.description}
                    onChange={(e) => setNewNetwork({...newNetwork, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newNetwork.type} onValueChange={(value) => setNewNetwork({...newNetwork, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Network Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Collaboration">Collaboration</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Keywords (comma-separated)"
                      value={newNetwork.keywords.join(', ')}
                      onChange={(e) => setNewNetwork({...newNetwork, keywords: e.target.value.split(',').map(k => k.trim())})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddNetwork} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add Network
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddNetworkDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showConnectionDialog} onOpenChange={setShowConnectionDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Link className="w-4 h-4 mr-2" />
                  Add Connection
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Network Connection</DialogTitle>
                  <DialogDescription>Create a new connection between network nodes</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Source Node"
                      value={newConnection.source}
                      onChange={(e) => setNewConnection({...newConnection, source: e.target.value})}
                    />
                    <Input
                      placeholder="Target Node"
                      value={newConnection.target}
                      onChange={(e) => setNewConnection({...newConnection, target: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newConnection.type} onValueChange={(value) => setNewConnection({...newConnection, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Connection Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Collaboration">Collaboration</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Connection Strength</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={newConnection.strength}
                        onChange={(e) => setNewConnection({...newConnection, strength: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                      <span className="text-sm text-forest-600">{newConnection.strength}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddConnection} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add Connection
                    </Button>
                    <Button variant="outline" onClick={() => setShowConnectionDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Network className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Total Networks</h3>
              <p className="text-sm text-forest-600">{mockNetworkMetrics.totalNetworks} networks</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Total Nodes</h3>
              <p className="text-sm text-forest-600">{mockNetworkMetrics.totalNodes.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Link className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Total Connections</h3>
              <p className="text-sm text-forest-600">{mockNetworkMetrics.totalEdges.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Communities</h3>
              <p className="text-sm text-forest-600">{mockNetworkMetrics.totalCommunities}</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Network Analysis Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-forest-600">Analyzing networks...</span>
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
              placeholder="Search networks..."
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedImpact} onValueChange={setSelectedImpact}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Impact" />
              </SelectTrigger>
              <SelectContent>
                {impacts.map((impact) => (
                  <SelectItem key={impact} value={impact}>
                    {impact === 'all' ? 'All Impact' : impact}
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="networks">Networks</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Network Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockNetworkMetrics.averageDensity}</div>
                      <div className="text-sm text-forest-600">Avg Density</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockNetworkMetrics.averageCentrality}</div>
                      <div className="text-sm text-forest-600">Avg Centrality</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockNetworkMetrics.collaborationIndex}</div>
                      <div className="text-sm text-forest-600">Collaboration</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockNetworkMetrics.researchImpact}</div>
                      <div className="text-sm text-forest-600">Research Impact</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Top Metrics</CardTitle>
                  <CardDescription>Performance trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockNetworkMetrics.topMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{metric.metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-forest-600">{metric.value}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                      <Progress value={metric.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Networks */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Recent Research Networks</CardTitle>
                <CardDescription>Latest networks added to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResearchNetworks.slice(0, 3).map((network) => (
                    <div key={network.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{network.name}</h4>
                          <Badge className={getStatusColor(network.status)}>
                            {network.status}
                          </Badge>
                          <Badge className={getTypeColor(network.type)}>
                            {network.type}
                          </Badge>
                          <Badge className={getImpactColor(network.impact)}>
                            {network.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-forest-600 mb-2">{network.description}</p>
                        <div className="flex items-center gap-4 text-xs text-forest-500">
                          <span>🕸️ {network.nodes} nodes</span>
                          <span>🔗 {network.edges} edges</span>
                          <span>👥 {network.communities} communities</span>
                          <span>📈 {network.growthRate}% growth</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleAnalyzeNetwork(network.id)}>
                          <Zap className="w-4 h-4 mr-1" />
                          Analyze
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Networks Tab */}
          <TabsContent value="networks" className="space-y-6">
            <div className="space-y-4">
              {filteredNetworks.map((network) => (
                <Card key={network.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-forest-900 text-lg">{network.name}</h3>
                          <Badge className={getStatusColor(network.status)}>
                            {network.status}
                          </Badge>
                          <Badge className={getTypeColor(network.type)}>
                            {network.type}
                          </Badge>
                          <Badge className={getImpactColor(network.impact)}>
                            {network.impact}
                          </Badge>
                        </div>
                        <p className="text-forest-600 mb-3">{network.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {network.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-forest-500">Category:</span>
                            <div className="font-medium text-forest-900">{network.category}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Growth Rate:</span>
                            <div className="font-medium text-forest-900">{network.growthRate}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Density:</span>
                            <div className="font-medium text-forest-900">{network.density}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Centrality:</span>
                            <div className="font-medium text-forest-900">{network.centrality}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                          <div>
                            <span className="text-forest-500">Nodes:</span>
                            <div className="font-medium text-forest-900">{network.nodes}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Edges:</span>
                            <div className="font-medium text-forest-900">{network.edges}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Communities:</span>
                            <div className="font-medium text-forest-900">{network.communities}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Funding:</span>
                            <div className="font-medium text-forest-900">{network.funding}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleAnalyzeNetwork(network.id)}>
                        <Zap className="w-4 h-4 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Metrics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Network Connections</CardTitle>
                <CardDescription>Key connections and relationships between network nodes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNetworkConnections.map((connection) => (
                    <div key={connection.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{connection.source}</h4>
                          <ArrowUpRight className="w-4 h-4 text-forest-600" />
                          <h4 className="font-medium text-forest-900">{connection.target}</h4>
                          <Badge className="bg-blue-100 text-blue-700">
                            {connection.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-forest-600">
                          <span>Strength: {connection.strength}</span>
                          <span>📚 {connection.publications} publications</span>
                          <span>📖 {connection.citations} citations</span>
                          <span>⏰ {connection.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analyze
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="space-y-6">
            <div className="space-y-4">
              {mockNetworkCommunities.map((community) => (
                <Card key={community.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-forest-900 text-lg">{community.name}</h3>
                          <Badge className="bg-purple-100 text-purple-700">
                            {community.size} members
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-forest-500">Density:</span>
                            <div className="font-medium text-forest-900">{community.density}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Centrality:</span>
                            <div className="font-medium text-forest-900">{community.centrality}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Publications:</span>
                            <div className="font-medium text-forest-900">{community.publications}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Growth:</span>
                            <div className="font-medium text-forest-900">{community.growth}%</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-forest-900">Topics:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {community.topics.map((topic, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-forest-900">Top Members:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {community.topMembers.map((member, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Users className="w-4 h-4 mr-1" />
                        View Members
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">AI-Powered Network Insights</CardTitle>
                <CardDescription>Intelligent analysis and recommendations for network optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNetworkInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-forest-900 mb-1">{insight.title}</h4>
                          <p className="text-sm text-forest-600 mb-2">{insight.insight}</p>
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span>🎯 {insight.impact} impact</span>
                            <span>📊 {insight.confidence}% confidence</span>
                          </div>
                        </div>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-forest-900">Recommendations:</span>
                        <div className="flex flex-wrap gap-1">
                          {insight.recommendations.map((rec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {rec}
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
                          <Lightbulb className="w-4 h-4 mr-1" />
                          Implement
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
                  <CardTitle className="text-forest-900">Network Growth Trends</CardTitle>
                  <CardDescription>Monthly network expansion patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {mockNetworkMetrics.networkTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-forest-600 rounded-t"
                          style={{ height: `${(month.networks / 160) * 100}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Node Growth</CardTitle>
                  <CardDescription>Monthly node expansion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {mockNetworkMetrics.networkTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-blue-600 rounded-t"
                          style={{ height: `${(month.nodes / 50000) * 100}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Edge Growth */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Connection Growth</CardTitle>
                <CardDescription>Monthly edge expansion patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockNetworkMetrics.networkTrends.map((month, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-green-600 rounded-t"
                        style={{ height: `${(month.edges / 130000) * 100}%` }}
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

export default NetworkAnalysis;
