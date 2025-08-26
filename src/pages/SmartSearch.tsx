
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, Brain, Filter, History, Bookmark, TrendingUp, Target, Zap, 
  Globe, Calendar, Clock, Eye, Share2, Download, Star, FilterX, 
  Lightbulb, Database, BarChart3, Settings, RefreshCw, Save, 
  Search as SearchIcon, BookOpen, FileText, Users, Tag, Hash
} from 'lucide-react';
import { groqService } from '@/services/groqService';
import { useToast } from '@/hooks/use-toast';

const mockSearchHistory = [
  {
    id: 1,
    query: "AI in healthcare applications",
    timestamp: "2 hours ago",
    results: 1247,
    category: "Technology",
    saved: true,
    tags: ["AI", "Healthcare", "Research"]
  },
  {
    id: 2,
    query: "Climate change renewable energy solutions",
    timestamp: "1 day ago",
    results: 892,
    category: "Environment",
    saved: false,
    tags: ["Climate", "Energy", "Solutions"]
  },
  {
    id: 3,
    query: "Blockchain financial technology trends",
    timestamp: "3 days ago",
    results: 567,
    category: "Finance",
    saved: true,
    tags: ["Blockchain", "FinTech", "Trends"]
  },
  {
    id: 4,
    query: "Machine learning algorithms optimization",
    timestamp: "1 week ago",
    results: 2341,
    category: "Technology",
    saved: false,
    tags: ["ML", "Algorithms", "Optimization"]
  }
];

const mockSavedSearches = [
  {
    id: 1,
    name: "AI Healthcare Research",
    query: "artificial intelligence healthcare applications",
    description: "Research on AI applications in healthcare",
    lastUsed: "2 hours ago",
    results: 1247,
    category: "Technology",
    tags: ["AI", "Healthcare", "Research"]
  },
  {
    id: 2,
    name: "Climate Solutions",
    query: "climate change renewable energy solutions",
    description: "Research on climate change solutions",
    lastUsed: "1 day ago",
    results: 892,
    category: "Environment",
    tags: ["Climate", "Energy", "Solutions"]
  },
  {
    id: 3,
    name: "Blockchain Trends",
    query: "blockchain financial technology trends",
    description: "Research on blockchain and fintech trends",
    lastUsed: "3 days ago",
    results: 567,
    category: "Finance",
    tags: ["Blockchain", "FinTech", "Trends"]
  }
];

const mockSearchAnalytics = {
  totalSearches: 1247,
  thisMonth: 89,
  thisWeek: 23,
  today: 5,
  topCategories: [
    { category: "Technology", count: 45, percentage: 35 },
    { category: "Environment", count: 28, percentage: 22 },
    { category: "Finance", count: 23, percentage: 18 },
    { category: "Health", count: 18, percentage: 14 },
    { category: "Politics", count: 15, percentage: 11 }
  ],
  searchTrends: [
    { day: "Mon", searches: 12 },
    { day: "Tue", searches: 18 },
    { day: "Wed", searches: 15 },
    { day: "Thu", searches: 22 },
    { day: "Fri", searches: 19 },
    { day: "Sat", searches: 8 },
    { day: "Sun", searches: 5 }
  ]
};

const mockSearchResults = [
  {
    id: 1,
    title: "Advanced AI Applications in Modern Healthcare Systems",
    source: "Journal of Medical AI",
    abstract: "This comprehensive study explores the integration of artificial intelligence in healthcare...",
    relevance: 98,
    category: "Technology",
    date: "2024",
    citations: 156,
    authors: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
    tags: ["AI", "Healthcare", "Machine Learning"],
    url: "#"
  },
  {
    id: 2,
    title: "Renewable Energy Solutions for Climate Change Mitigation",
    source: "Environmental Science Review",
    abstract: "A systematic review of renewable energy technologies and their impact on climate change...",
    relevance: 95,
    category: "Environment",
    date: "2024",
    citations: 89,
    authors: ["Dr. Emily Rodriguez", "Prof. David Kim"],
    tags: ["Climate", "Energy", "Sustainability"],
    url: "#"
  },
  {
    id: 3,
    title: "Blockchain Technology in Financial Services: Trends and Applications",
    source: "FinTech Research Quarterly",
    abstract: "Analysis of blockchain adoption in financial services and emerging trends...",
    relevance: 92,
    category: "Finance",
    date: "2024",
    citations: 234,
    authors: ["Dr. James Wilson", "Prof. Lisa Thompson"],
    tags: ["Blockchain", "FinTech", "Innovation"],
    url: "#"
  }
];

const SmartSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedQuery, setAdvancedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [savedSearchName, setSavedSearchName] = useState('');
  const [savedSearchDescription, setSavedSearchDescription] = useState('');
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Filter results based on selected criteria
      const filteredResults = mockSearchResults.filter(result => {
        const categoryMatch = selectedCategory === 'all' || result.category.toLowerCase() === selectedCategory;
        const sourceMatch = selectedSource === 'all' || result.source.toLowerCase().includes(selectedSource.toLowerCase());
        return categoryMatch && sourceMatch;
      });
      
      setSearchResults(filteredResults);
      
      toast({
        title: "Search Complete",
        description: `Found ${filteredResults.length} results for "${searchQuery}"`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to complete search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSearch = async () => {
    if (!advancedQuery.trim()) {
      toast({
        title: "Advanced Query Required",
        description: "Please enter an advanced search query.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate advanced search
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Advanced Search Complete",
        description: "AI-powered search analysis completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Advanced Search Failed",
        description: "Unable to complete advanced search.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSearch = () => {
    if (!savedSearchName.trim()) {
      toast({
        title: "Search Name Required",
        description: "Please provide a name for your saved search.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Search Saved",
      description: `"${savedSearchName}" has been saved to your collection.`,
    });
    
    setSavedSearchName('');
    setSavedSearchDescription('');
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 95) return 'bg-green-100 text-green-700';
    if (relevance >= 85) return 'bg-blue-100 text-blue-700';
    if (relevance >= 75) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Smart Search</h1>
            <p className="text-forest-600">AI-powered intelligent research search with advanced analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Filter className="w-4 h-4 mr-2" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </Button>
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
              <Brain className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">AI Search</h3>
              <p className="text-sm text-forest-600">Smart query understanding</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Precise Results</h3>
              <p className="text-sm text-forest-600">High relevance matching</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Analytics</h3>
              <p className="text-sm text-forest-600">Search insights</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Bookmark className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Save & Share</h3>
              <p className="text-sm text-forest-600">Organize research</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search Interface */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Search */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-forest-900">
                      <Search className="w-5 h-5" />
                      Smart Search
                    </CardTitle>
                    <CardDescription>AI-powered research search with intelligent query understanding</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter your research query..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="bg-forest-600 hover:bg-forest-700"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Search className="w-4 h-4 mr-2" />
                        )}
                        Search
                      </Button>
                    </div>

                    {/* Advanced Search Options */}
                    {showAdvanced && (
                      <div className="space-y-4 p-4 bg-forest-50 rounded-lg border border-forest-200">
                        <h4 className="font-medium text-forest-900">Advanced Search Options</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="environment">Environment</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="politics">Politics</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                            <SelectTrigger>
                              <SelectValue placeholder="Timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Time</SelectItem>
                              <SelectItem value="1y">Last Year</SelectItem>
                              <SelectItem value="5y">Last 5 Years</SelectItem>
                              <SelectItem value="10y">Last 10 Years</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select value={selectedSource} onValueChange={setSelectedSource}>
                            <SelectTrigger>
                              <SelectValue placeholder="Source Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Sources</SelectItem>
                              <SelectItem value="journal">Academic Journals</SelectItem>
                              <SelectItem value="conference">Conference Papers</SelectItem>
                              <SelectItem value="book">Books</SelectItem>
                              <SelectItem value="report">Reports</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Advanced Query Builder */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-forest-900">Advanced Query Builder</h4>
                      <Textarea
                        placeholder="Build complex queries with boolean operators, wildcards, and semantic search..."
                        value={advancedQuery}
                        onChange={(e) => setAdvancedQuery(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleAdvancedSearch}
                          disabled={isLoading}
                          variant="outline"
                          className="border-forest-200"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          AI Analysis
                        </Button>
                        <Button variant="outline" className="border-forest-200">
                          <Zap className="w-4 h-4 mr-2" />
                          Quick Templates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-forest-900">
                        <SearchIcon className="w-5 h-5" />
                        Search Results ({searchResults.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {searchResults.map((result) => (
                        <div key={result.id} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-2">
                              <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                                {result.category}
                              </Badge>
                              <Badge className={getRelevanceColor(result.relevance)}>
                                {result.relevance}% Relevant
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-forest-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {result.date}
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-forest-900 mb-2">{result.title}</h3>
                          <p className="text-forest-600 text-sm mb-3">{result.abstract}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {result.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 text-xs text-forest-500">
                              <span>{result.source}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {result.authors.join(', ')}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {result.citations} citations
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <BookOpen className="w-3 h-3 mr-1" />
                                Read
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Save Search */}
                {searchQuery && (
                  <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                    <CardHeader>
                      <CardTitle className="text-forest-900">Save This Search</CardTitle>
                      <CardDescription>Save your search for future reference</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Search name..."
                          value={savedSearchName}
                          onChange={(e) => setSavedSearchName(e.target.value)}
                        />
                        <Input
                          placeholder="Description (optional)"
                          value={savedSearchDescription}
                          onChange={(e) => setSavedSearchDescription(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSaveSearch} className="bg-forest-600 hover:bg-forest-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Search
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Search Sidebar */}
              <div className="space-y-6">
                {/* Search Tips */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-forest-900">
                      <Lightbulb className="w-5 h-5" />
                      Search Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-forest-600 space-y-2">
                      <p>• Use quotes for exact phrases</p>
                      <p>• Add + before required terms</p>
                      <p>• Use - to exclude terms</p>
                      <p>• Combine with AND, OR, NOT</p>
                      <p>• Use wildcards (*) for variations</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Searches */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Recent Searches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {mockSearchHistory.slice(0, 3).map((search) => (
                      <Button key={search.id} variant="outline" size="sm" className="w-full justify-start text-left h-auto p-2">
                        <div className="text-xs">
                          <div className="font-medium text-forest-900 truncate">{search.query}</div>
                          <div className="text-forest-500">{search.timestamp}</div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Filters */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['Peer Reviewed', 'Open Access', 'High Impact', 'Recent', 'Highly Cited'].map((filter) => (
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

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <History className="w-5 h-5" />
                  Search History
                </CardTitle>
                <CardDescription>Your recent search queries and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSearchHistory.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{search.query}</h4>
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {search.category}
                          </Badge>
                          {search.saved && (
                            <Bookmark className="w-4 h-4 text-forest-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-forest-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {search.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Search className="w-3 h-3" />
                            {search.results} results
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {search.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Search className="w-3 h-3 mr-1" />
                          Repeat
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Bookmark className="w-5 h-5" />
                  Saved Searches
                </CardTitle>
                <CardDescription>Your bookmarked search queries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSavedSearches.map((search) => (
                    <Card key={search.id} className="bg-forest-50 border-forest-200">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm text-forest-900">{search.name}</CardTitle>
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700 text-xs">
                            {search.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-forest-600 mb-3">{search.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {search.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs text-forest-500 mb-3">
                          <span>Last used: {search.lastUsed}</span>
                          <span>{search.results} results</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Search className="w-3 h-3 mr-1" />
                            Search
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-3 h-3" />
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
              {/* Search Statistics */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Search Statistics</CardTitle>
                  <CardDescription>Overview of your search activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockSearchAnalytics.totalSearches}</div>
                      <div className="text-sm text-forest-600">Total Searches</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockSearchAnalytics.thisMonth}</div>
                      <div className="text-sm text-forest-600">This Month</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockSearchAnalytics.thisWeek}</div>
                      <div className="text-sm text-forest-600">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockSearchAnalytics.today}</div>
                      <div className="text-sm text-forest-600">Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Categories */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Top Search Categories</CardTitle>
                  <CardDescription>Most searched research areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSearchAnalytics.topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{category.category}</span>
                        <span className="text-sm text-forest-600">{category.count} searches</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Search Trends Chart */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Search Trends</CardTitle>
                <CardDescription>Weekly search activity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockSearchAnalytics.searchTrends.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-forest-600 rounded-t"
                        style={{ height: `${(day.searches / 25) * 100}%` }}
                      ></div>
                      <span className="text-xs text-forest-600 mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-forest-900">
                    <Brain className="w-5 h-5" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>Intelligent analysis of your search patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-forest-900">Growing Interest</span>
                      </div>
                      <div className="text-sm text-forest-600">AI and healthcare searches increased 25% this month</div>
                    </div>
                    
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-forest-900">Research Focus</span>
                      </div>
                      <div className="text-sm text-forest-600">You're focusing on emerging technology trends</div>
                    </div>
                    
                    <div className="p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-forest-900">Recommendation</span>
                      </div>
                      <div className="text-sm text-forest-600">Consider exploring interdisciplinary research areas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search Optimization */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Search Optimization</CardTitle>
                  <CardDescription>Tips to improve your search results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-forest-900">Use specific keywords</div>
                        <div className="text-sm text-forest-600">Narrow down results with precise terms</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-forest-900">Combine filters</div>
                        <div className="text-sm text-forest-600">Use multiple criteria for better results</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-forest-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-forest-900">Save successful searches</div>
                        <div className="text-sm text-forest-600">Build a library of effective queries</div>
                      </div>
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

export default SmartSearch;
