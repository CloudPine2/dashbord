
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
  Plug, Settings, CheckCircle, XCircle, AlertTriangle, Clock, RefreshCw, 
  Save, Edit, Trash2, Share2, Eye, Filter, Search, Plus, Zap, Lightbulb, 
  BarChart3, PieChart, LineChart, TrendingUp, Users, Target, BookOpen,
  Database, Globe, Lock, Unlock, Star, Activity, Shield, Key, 
  Play, Pause, Square, RotateCcw, History, Code, Webhook, Server,
  Cpu, HardDrive, Network, Wifi, Cloud, Smartphone, Monitor, Tablet,
  GitBranch, GitCommit, GitPullRequest, GitMerge, GitCompare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for API integrations
const mockAPIs = [
  {
    id: 1,
    name: "Google Scholar",
    description: "Academic research papers and citations",
    status: "connected",
    category: "Academic Research",
    apiKey: "gsch_****_****_****",
    lastSync: "2 hours ago",
    syncStatus: "success",
    rateLimit: "1000/day",
    usage: 45,
    health: "excellent",
    endpoints: ["/papers", "/citations", "/authors"],
    documentation: "https://scholar.google.com/api",
    pricing: "Free tier available",
    tags: ["Academic", "Research", "Citations"]
  },
  {
    id: 2,
    name: "arXiv",
    description: "Preprint server for physics, mathematics, and computer science",
    status: "connected",
    category: "Preprints",
    apiKey: "arxiv_****_****_****",
    lastSync: "1 day ago",
    syncStatus: "success",
    rateLimit: "5000/day",
    usage: 23,
    health: "good",
    endpoints: ["/search", "/metadata", "/pdf"],
    documentation: "https://arxiv.org/help/api",
    pricing: "Free",
    tags: ["Preprints", "Physics", "Math", "CS"]
  },
  {
    id: 3,
    name: "PubMed",
    description: "Biomedical literature and research papers",
    status: "connected",
    category: "Biomedical",
    apiKey: "pubmed_****_****_****",
    lastSync: "3 hours ago",
    syncStatus: "success",
    rateLimit: "3000/day",
    usage: 67,
    health: "excellent",
    endpoints: ["/search", "/summary", "/abstract"],
    documentation: "https://ncbi.nlm.nih.gov/books/NBK25497/",
    pricing: "Free",
    tags: ["Biomedical", "Medicine", "Health"]
  },
  {
    id: 4,
    name: "IEEE Xplore",
    description: "Engineering and technology research papers",
    status: "available",
    category: "Engineering",
    apiKey: "",
    lastSync: "Never",
    syncStatus: "not_configured",
    rateLimit: "1000/day",
    usage: 0,
    health: "unknown",
    endpoints: ["/search", "/metadata", "/fulltext"],
    documentation: "https://developer.ieee.org/",
    pricing: "Subscription required",
    tags: ["Engineering", "Technology", "IEEE"]
  },
  {
    id: 5,
    name: "OpenAI GPT-4",
    description: "Advanced language model for research assistance",
    status: "connected",
    category: "AI Services",
    apiKey: "sk-****_****_****",
    lastSync: "Just now",
    syncStatus: "success",
    rateLimit: "1000/day",
    usage: 89,
    health: "excellent",
    endpoints: ["/chat/completions", "/embeddings", "/moderations"],
    documentation: "https://platform.openai.com/docs",
    pricing: "Pay per use",
    tags: ["AI", "Language Model", "Research Assistant"]
  },
  {
    id: 6,
    name: "Hugging Face",
    description: "Machine learning models and datasets",
    status: "connected",
    category: "AI Services",
    apiKey: "hf_****_****_****",
    lastSync: "4 hours ago",
    syncStatus: "success",
    rateLimit: "500/day",
    usage: 34,
    health: "good",
    endpoints: ["/models", "/datasets", "/inference"],
    documentation: "https://huggingface.co/docs/api-inference",
    pricing: "Free tier available",
    tags: ["AI", "ML", "Models", "Datasets"]
  },
  {
    id: 7,
    name: "GitHub API",
    description: "Code repositories and version control",
    status: "connected",
    category: "Development",
    apiKey: "ghp_****_****_****",
    lastSync: "1 hour ago",
    syncStatus: "success",
    rateLimit: "5000/hour",
    usage: 12,
    health: "excellent",
    endpoints: ["/repos", "/commits", "/issues", "/pulls"],
    documentation: "https://docs.github.com/en/rest",
    pricing: "Free",
    tags: ["Code", "Git", "Version Control"]
  },
  {
    id: 8,
    name: "MongoDB Atlas",
    description: "Cloud database for research data storage",
    status: "connected",
    category: "Database",
    apiKey: "mongodb_****_****_****",
    lastSync: "5 minutes ago",
    syncStatus: "success",
    rateLimit: "Unlimited",
    usage: 156,
    health: "excellent",
    endpoints: ["/data", "/collections", "/indexes"],
    documentation: "https://docs.atlas.mongodb.com/",
    pricing: "Free tier available",
    tags: ["Database", "Cloud", "NoSQL"]
  }
];

const mockWebhooks = [
  {
    id: 1,
    name: "Research Data Sync",
    url: "https://api.research.com/webhook/sync",
    events: ["data.updated", "paper.published"],
    status: "active",
    lastTriggered: "2 hours ago",
    successRate: 98.5,
    headers: { "Authorization": "Bearer ****", "Content-Type": "application/json" }
  },
  {
    id: 2,
    name: "Citation Alert",
    url: "https://notifications.research.com/webhook/citations",
    events: ["citation.added", "citation.removed"],
    status: "active",
    lastTriggered: "1 day ago",
    successRate: 95.2,
    headers: { "Authorization": "Bearer ****", "Content-Type": "application/json" }
  },
  {
    id: 3,
    name: "Error Monitoring",
    url: "https://monitoring.research.com/webhook/errors",
    events: ["error.critical", "error.warning"],
    status: "paused",
    lastTriggered: "3 days ago",
    successRate: 100,
    headers: { "Authorization": "Bearer ****", "Content-Type": "application/json" }
  }
];

const mockAPIAnalytics = {
  totalAPIs: 8,
  connectedAPIs: 6,
  availableAPIs: 2,
  totalRequests: 15420,
  thisMonth: 2340,
  thisWeek: 567,
  today: 89,
  topAPIs: [
    { name: "OpenAI GPT-4", requests: 2340, percentage: 35 },
    { name: "PubMed", requests: 1890, percentage: 28 },
    { name: "Google Scholar", requests: 1230, percentage: 19 },
    { name: "Hugging Face", requests: 890, percentage: 14 },
    { name: "arXiv", requests: 670, percentage: 10 }
  ],
  requestTrends: [
    { day: "Mon", requests: 120 },
    { day: "Tue", requests: 145 },
    { day: "Wed", requests: 167 },
    { day: "Thu", requests: 189 },
    { day: "Fri", requests: 156 },
    { day: "Sat", requests: 89 },
    { day: "Sun", requests: 67 }
  ],
  errorRates: [
    { api: "Google Scholar", rate: 0.5 },
    { api: "arXiv", rate: 1.2 },
    { api: "PubMed", rate: 0.8 },
    { api: "OpenAI", rate: 2.1 },
    { api: "Hugging Face", rate: 1.5 }
  ]
};

const APIIntegrations = () => {
  const [activeTab, setActiveTab] = useState('apis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddAPIDialog, setShowAddAPIDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [newAPI, setNewAPI] = useState({
    name: '',
    description: '',
    category: '',
    apiKey: '',
    endpoints: [],
    documentation: '',
    pricing: ''
  });
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [],
    headers: {}
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const { toast } = useToast();

  // Filter APIs based on search and category
  const filteredAPIs = mockAPIs.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(mockAPIs.map(api => api.category)))];

  const handleAddAPI = () => {
    if (!newAPI.name.trim() || !newAPI.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide API name and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "API Added",
      description: `"${newAPI.name}" has been added successfully.`,
    });
    
    setShowAddAPIDialog(false);
    setNewAPI({ name: '', description: '', category: '', apiKey: '', endpoints: [], documentation: '', pricing: '' });
  };

  const handleAddWebhook = () => {
    if (!newWebhook.name.trim() || !newWebhook.url.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide webhook name and URL.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Webhook Added",
      description: `"${newWebhook.name}" has been added successfully.`,
    });
    
    setShowWebhookDialog(false);
    setNewWebhook({ name: '', url: '', events: [], headers: {} });
  };

  const handleTestAPI = async (apiId: number) => {
    setIsTesting(true);
    setTestResults(null);
    
    // Simulate API test
    setTimeout(() => {
      setTestResults({
        success: true,
        responseTime: Math.floor(Math.random() * 500) + 100,
        status: 200,
        message: "API connection successful"
      });
      setIsTesting(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'available': return 'bg-blue-100 text-blue-700';
      case 'error': return 'bg-red-100 text-red-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'available': return <Plug className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'fair': return 'bg-yellow-100 text-yellow-700';
      case 'poor': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">API Integrations</h1>
            <p className="text-forest-600">Comprehensive API management for your Raas research platform</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddAPIDialog} onOpenChange={setShowAddAPIDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add API
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New API Integration</DialogTitle>
                  <DialogDescription>Configure a new API connection for your research platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="API Name"
                      value={newAPI.name}
                      onChange={(e) => setNewAPI({...newAPI, name: e.target.value})}
                    />
                    <Select value={newAPI.category} onValueChange={(value) => setNewAPI({...newAPI, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Academic Research">Academic Research</SelectItem>
                        <SelectItem value="AI Services">AI Services</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Biomedical">Biomedical</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="API Description"
                    value={newAPI.description}
                    onChange={(e) => setNewAPI({...newAPI, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="API Key (optional)"
                      value={newAPI.apiKey}
                      onChange={(e) => setNewAPI({...newAPI, apiKey: e.target.value})}
                    />
                    <Input
                      placeholder="Documentation URL"
                      value={newAPI.documentation}
                      onChange={(e) => setNewAPI({...newAPI, documentation: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddAPI} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add API
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddAPIDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Webhook className="w-4 h-4 mr-2" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Webhook</DialogTitle>
                  <DialogDescription>Configure a webhook for real-time notifications</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Webhook Name"
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                    />
                    <Input
                      placeholder="Webhook URL"
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddWebhook} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Add Webhook
                    </Button>
                    <Button variant="outline" onClick={() => setShowWebhookDialog(false)}>
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
              <Plug className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Connected APIs</h3>
              <p className="text-sm text-forest-600">{mockAPIs.filter(api => api.status === 'connected').length} active</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Webhook className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Webhooks</h3>
              <p className="text-sm text-forest-600">{mockWebhooks.length} configured</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">API Health</h3>
              <p className="text-sm text-forest-600">Monitor status</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Analytics</h3>
              <p className="text-sm text-forest-600">Usage insights</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search APIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
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
            <TabsTrigger value="apis">APIs</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* APIs Tab */}
          <TabsContent value="apis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* API List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredAPIs.map((api) => (
                  <Card key={api.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-forest-900 text-lg">{api.name}</h3>
                            <Badge className={getStatusColor(api.status)}>
                              {getStatusIcon(api.status)}
                              <span className="ml-1 capitalize">{api.status}</span>
                            </Badge>
                            <Badge className={getHealthColor(api.health)}>
                              {api.health}
                            </Badge>
                          </div>
                          <p className="text-forest-600 mb-3">{api.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {api.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-forest-500">Category:</span>
                              <div className="font-medium text-forest-900">{api.category}</div>
                            </div>
                            <div>
                              <span className="text-forest-500">Rate Limit:</span>
                              <div className="font-medium text-forest-900">{api.rateLimit}</div>
                            </div>
                            <div>
                              <span className="text-forest-500">Last Sync:</span>
                              <div className="font-medium text-forest-900">{api.lastSync}</div>
                            </div>
                            <div>
                              <span className="text-forest-500">Usage:</span>
                              <div className="font-medium text-forest-900">{api.usage} requests</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {api.status === 'connected' ? (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleTestAPI(api.id)}>
                              <Activity className="w-4 h-4 mr-1" />
                              Test
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Configure
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Logs
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="bg-forest-600 hover:bg-forest-700">
                            <Plug className="w-4 h-4 mr-1" />
                            Connect
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Docs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* API Details Sidebar */}
              <div className="space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">API Endpoints</CardTitle>
                    <CardDescription>Available API endpoints</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {filteredAPIs[0]?.endpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-forest-50 rounded">
                          <Code className="w-4 h-4 text-forest-600" />
                          <span className="font-mono text-sm">{endpoint}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync All APIs
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Check
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Export Config
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      API Status
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Webhook Configurations</CardTitle>
                <CardDescription>Manage real-time notifications and data sync</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWebhooks.map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{webhook.name}</h4>
                          <Badge className={webhook.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {webhook.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-forest-600 mb-2">
                          <div>URL: {webhook.url}</div>
                          <div>Events: {webhook.events.join(', ')}</div>
                          <div>Last Triggered: {webhook.lastTriggered} • Success Rate: {webhook.successRate}%</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Activity className="w-4 h-4 mr-1" />
                          Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">API Health Status</CardTitle>
                  <CardDescription>Real-time monitoring of API connections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAPIs.slice(0, 4).map((api) => (
                    <div key={api.id} className="flex items-center justify-between p-3 bg-forest-50 rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          api.health === 'excellent' ? 'bg-green-500' :
                          api.health === 'good' ? 'bg-blue-500' :
                          api.health === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-forest-900">{api.name}</span>
                      </div>
                      <div className="text-sm text-forest-600">
                        {api.lastSync} • {api.usage} requests
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">System Resources</CardTitle>
                  <CardDescription>Platform resource utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-600">CPU Usage</span>
                      <span className="text-sm font-medium text-forest-900">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-600">Memory Usage</span>
                      <span className="text-sm font-medium text-forest-900">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-600">Network I/O</span>
                      <span className="text-sm font-medium text-forest-900">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">API Documentation</CardTitle>
                <CardDescription>Comprehensive guides and examples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockAPIs.slice(0, 6).map((api) => (
                    <Card key={api.id} className="bg-forest-50 border-forest-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4 text-forest-600" />
                          <h4 className="font-medium text-forest-900">{api.name}</h4>
                        </div>
                        <p className="text-sm text-forest-600 mb-3">{api.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <BookOpen className="w-4 h-4 mr-1" />
                            View Docs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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
                  <CardTitle className="text-forest-900">API Usage Statistics</CardTitle>
                  <CardDescription>Overview of API activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockAPIAnalytics.totalRequests}</div>
                      <div className="text-sm text-forest-600">Total Requests</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockAPIAnalytics.thisMonth}</div>
                      <div className="text-sm text-forest-600">This Month</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockAPIAnalytics.thisWeek}</div>
                      <div className="text-sm text-forest-600">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockAPIAnalytics.today}</div>
                      <div className="text-sm text-forest-600">Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Top API Usage</CardTitle>
                  <CardDescription>Most used APIs this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAPIAnalytics.topAPIs.map((api, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{api.name}</span>
                        <span className="text-sm text-forest-600">{api.requests} requests</span>
                      </div>
                      <Progress value={api.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Request Trends */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Request Trends</CardTitle>
                <CardDescription>Weekly API request patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockAPIAnalytics.requestTrends.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-forest-600 rounded-t"
                        style={{ height: `${(day.requests / 200) * 100}%` }}
                      ></div>
                      <span className="text-xs text-forest-600 mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Error Rates */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Error Rates</CardTitle>
                <CardDescription>API error monitoring and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockAPIAnalytics.errorRates.map((api, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{api.api}</span>
                        <span className="text-sm text-forest-600">{api.rate}%</span>
                      </div>
                      <Progress value={api.rate * 10} className="h-2" />
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

export default APIIntegrations;
