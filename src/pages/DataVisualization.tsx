
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
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, Activity, 
  Download, Upload, Settings, RefreshCw, Save, Edit, Trash2, Share2, 
  Eye, Filter, Search, Plus, Zap, Lightbulb, Database, FileText, 
  BarChart, PieChart as PieChartIcon, LineChart as LineChartIcon, 
  BarChart4, Star, Link, Palette, Type, Grid, Layers, Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for different chart types
const mockChartData = {
  barChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Research Papers',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2
      },
      {
        label: 'Citations',
        data: [8, 15, 12, 20, 18, 25],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2
      }
    ]
  },
  lineChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'AI Research Growth',
        data: [65, 72, 78, 85, 92, 98],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Climate Research',
        data: [45, 52, 58, 65, 72, 78],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  pieChart: {
    labels: ['Technology', 'Environment', 'Health', 'Finance', 'Education'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2
      }
    ]
  },
  areaChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Research Funding',
        data: [12000, 15000, 18000, 22000, 25000, 30000],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  scatterPlot: {
    datasets: [
      {
        label: 'Research Impact vs Funding',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 35 },
          { x: 20, y: 45 },
          { x: 25, y: 60 },
          { x: 30, y: 75 },
          { x: 35, y: 85 },
          { x: 40, y: 95 }
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)'
      }
    ]
  },
  radarChart: {
    labels: ['Innovation', 'Impact', 'Collaboration', 'Funding', 'Publications', 'Citations'],
    datasets: [
      {
        label: 'AI Research',
        data: [85, 90, 75, 80, 95, 88],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 2
      },
      {
        label: 'Climate Research',
        data: [70, 85, 90, 75, 80, 85],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2
      }
    ]
  }
};

const mockChartTemplates = [
  {
    id: 1,
    name: "Research Trends Analysis",
    type: "line",
    description: "Track research growth over time",
    category: "Trends",
    usage: 156,
    rating: 4.8,
    tags: ["Research", "Growth", "Analysis"]
  },
  {
    id: 2,
    name: "Publication Distribution",
    type: "pie",
    description: "Show research field distribution",
    category: "Distribution",
    usage: 89,
    rating: 4.6,
    tags: ["Publications", "Fields", "Distribution"]
  },
  {
    id: 3,
    name: "Citation Impact",
    type: "bar",
    description: "Compare citation counts",
    category: "Impact",
    usage: 234,
    rating: 4.9,
    tags: ["Citations", "Impact", "Comparison"]
  },
  {
    id: 4,
    name: "Funding Allocation",
    type: "area",
    description: "Visualize funding distribution",
    category: "Finance",
    usage: 67,
    rating: 4.4,
    tags: ["Funding", "Allocation", "Finance"]
  }
];

const mockSavedCharts = [
  {
    id: 1,
    name: "AI Research Growth Q1 2024",
    type: "line",
    lastModified: "2 hours ago",
    views: 45,
    shares: 12,
    category: "Technology"
  },
  {
    id: 2,
    name: "Climate Research Funding",
    type: "area",
    lastModified: "1 day ago",
    views: 23,
    shares: 8,
    category: "Environment"
  },
  {
    id: 3,
    name: "Publication Field Distribution",
    type: "pie",
    lastModified: "3 days ago",
    views: 67,
    shares: 15,
    category: "Research"
  }
];

const mockDataSources = [
  {
    id: 1,
    name: "Research Database API",
    type: "API",
    status: "active",
    lastSync: "5 minutes ago",
    records: 15420,
    category: "Academic"
  },
  {
    id: 2,
    name: "Citation Index",
    type: "Database",
    status: "active",
    lastSync: "1 hour ago",
    records: 8920,
    category: "Citations"
  },
  {
    id: 3,
    name: "Funding Database",
    type: "CSV",
    status: "syncing",
    lastSync: "2 hours ago",
    records: 5670,
    category: "Financial"
  }
];

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState('charts');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [chartData, setChartData] = useState(mockChartData.barChart);
  const [chartConfig, setChartConfig] = useState({
    title: 'Research Data Visualization',
    description: 'Interactive chart showing research trends',
    theme: 'light',
    animation: true,
    responsive: true
  });
  const [customData, setCustomData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update some chart data randomly
      if (Math.random() > 0.7) {
        setChartData(prev => ({
          ...prev,
          datasets: prev.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.map(value => value + Math.floor(Math.random() * 3) - 1)
          }))
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateChart = () => {
    if (!chartConfig.title.trim()) {
      toast({
        title: "Chart Title Required",
        description: "Please provide a title for your chart.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Chart Created",
        description: `"${chartConfig.title}" has been created successfully.`,
      });
      setIsLoading(false);
      setShowCreateDialog(false);
    }, 2000);
  };

  const handleChartTypeChange = (type: string) => {
    setSelectedChartType(type);
    setChartData(mockChartData[type as keyof typeof mockChartData] || mockChartData.barChart);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setChartConfig({
      ...chartConfig,
      title: template.name,
      description: template.description
    });
    handleChartTypeChange(template.type);
  };

  const handleExportChart = (format: string) => {
    toast({
      title: "Chart Exported",
      description: `Chart exported as ${format.toUpperCase()} successfully.`,
    });
  };

  const handleDataUpload = () => {
    toast({
      title: "Data Uploaded",
      description: "New data has been uploaded and processed.",
    });
  };

  const renderChartPreview = (type: string) => {
    const data = mockChartData[type as keyof typeof mockChartData];
    if (!data) return null;

    const colors = [
      'rgba(34, 197, 94, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(251, 146, 60, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ];

    switch (type) {
      case 'bar':
        return (
          <div className="h-48 flex items-end justify-center gap-2 p-4">
            {data.datasets[0].data.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-green-500 rounded-t"
                  style={{ height: `${(value / 30) * 100}%` }}
                ></div>
                <span className="text-xs text-forest-600 mt-1">{data.labels[index]}</span>
              </div>
            ))}
          </div>
        );
      case 'line':
        return (
          <div className="h-48 flex items-center justify-center p-4">
            <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-forest-600" />
            </div>
          </div>
        );
      case 'pie':
        return (
          <div className="h-48 flex items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
              <PieChartIcon className="w-16 h-16 text-white" />
            </div>
          </div>
        );
      case 'area':
        return (
          <div className="h-48 flex items-center justify-center p-4">
            <div className="w-full h-32 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-forest-600" />
            </div>
          </div>
        );
      case 'scatter':
        return (
          <div className="h-48 flex items-center justify-center p-4">
            <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-forest-600" />
            </div>
          </div>
        );
      case 'radar':
        return (
          <div className="h-48 flex items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <PieChart className="w-16 h-16 text-white" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getChartTypeIcon = (type: string) => {
    switch (type) {
      case 'bar': return <BarChart3 className="w-6 h-6" />;
      case 'line': return <LineChart className="w-6 h-6" />;
      case 'pie': return <PieChart className="w-6 h-6" />;
      case 'area': return <BarChart3 className="w-6 h-6" />;
      case 'scatter': return <BarChart3 className="w-6 h-6" />;
      case 'radar': return <PieChart className="w-6 h-6" />;
      default: return <BarChart3 className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Data Visualization</h1>
            <p className="text-forest-600">Create interactive charts and visualizations with advanced analytics</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Chart
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Chart</DialogTitle>
                  <DialogDescription>Set up a new data visualization with custom configuration</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Chart Title"
                      value={chartConfig.title}
                      onChange={(e) => setChartConfig({...chartConfig, title: e.target.value})}
                    />
                    <Select value={selectedChartType} onValueChange={handleChartTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chart Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                        <SelectItem value="scatter">Scatter Plot</SelectItem>
                        <SelectItem value="radar">Radar Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Chart Description"
                    value={chartConfig.description}
                    onChange={(e) => setChartConfig({...chartConfig, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={chartConfig.theme} onValueChange={(value) => setChartConfig({...chartConfig, theme: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="animation" 
                        checked={chartConfig.animation}
                        onCheckedChange={(checked) => setChartConfig({...chartConfig, animation: checked as boolean})}
                      />
                      <label htmlFor="animation" className="text-sm">Animation</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="responsive" 
                        checked={chartConfig.responsive}
                        onCheckedChange={(checked) => setChartConfig({...chartConfig, responsive: checked as boolean})}
                      />
                      <label htmlFor="responsive" className="text-sm">Responsive</label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateChart} disabled={isLoading} className="bg-forest-600 hover:bg-forest-700">
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Create Chart
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
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
              <BarChart4 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Chart Types</h3>
              <p className="text-sm text-forest-600">6+ visualization types</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Database className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Data Sources</h3>
              <p className="text-sm text-forest-600">3 active connections</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Real-time</h3>
              <p className="text-sm text-forest-600">Live data updates</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Download className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Export</h3>
              <p className="text-sm text-forest-600">Multiple formats</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Types */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Chart Types</CardTitle>
                    <CardDescription>Choose from various visualization types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['bar', 'line', 'pie', 'area', 'scatter', 'radar'].map((type) => (
                        <div 
                          key={type}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedChartType === type 
                              ? 'border-forest-600 bg-forest-50' 
                              : 'border-forest-200 hover:border-forest-300'
                          }`}
                          onClick={() => handleChartTypeChange(type)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {getChartTypeIcon(type)}
                            <span className="font-medium text-forest-900 capitalize">{type} Chart</span>
                          </div>
                          {renderChartPreview(type)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Chart Preview */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-forest-900">Chart Preview</CardTitle>
                        <CardDescription>{chartConfig.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleExportChart('png')}>
                          <Download className="w-4 h-4 mr-1" />
                          PNG
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleExportChart('pdf')}>
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleExportChart('svg')}>
                          <Download className="w-4 h-4 mr-1" />
                          SVG
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-forest-50 rounded-lg border-2 border-dashed border-forest-200 flex items-center justify-center">
                      {renderChartPreview(selectedChartType)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart Configuration */}
              <div className="space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Chart Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Title</label>
                      <Input 
                        value={chartConfig.title}
                        onChange={(e) => setChartConfig({...chartConfig, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Theme</label>
                      <Select value={chartConfig.theme} onValueChange={(value) => setChartConfig({...chartConfig, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="animation" 
                            checked={chartConfig.animation}
                            onCheckedChange={(checked) => setChartConfig({...chartConfig, animation: checked as boolean})}
                          />
                          <label htmlFor="animation" className="text-sm">Enable Animation</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="responsive" 
                            checked={chartConfig.responsive}
                            onCheckedChange={(checked) => setChartConfig({...chartConfig, responsive: checked as boolean})}
                          />
                          <label htmlFor="responsive" className="text-sm">Responsive</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Customize Colors
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Type className="w-4 h-4 mr-2" />
                      Font Settings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Grid className="w-4 h-4 mr-2" />
                      Grid Options
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Layers className="w-4 h-4 mr-2" />
                      Layer Management
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Chart Templates</CardTitle>
                <CardDescription>Pre-built templates for common visualization needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockChartTemplates.map((template) => (
                    <Card key={template.id} className="bg-forest-50 border-forest-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getChartTypeIcon(template.type)}
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {template.category}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-forest-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-forest-600 mb-3">{template.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1 text-sm text-forest-500">
                            <Eye className="w-3 h-3" />
                            {template.usage}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-forest-500">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            {template.rating}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-forest-600 hover:bg-forest-700"
                          onClick={() => handleTemplateSelect(template)}
                        >
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Data Sources</CardTitle>
                  <CardDescription>Connected data sources and their status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDataSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div>
                        <div className="font-medium text-forest-900">{source.name}</div>
                        <div className="text-sm text-forest-600">{source.type} • {source.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={source.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {source.status}
                        </Badge>
                        <span className="text-xs text-forest-500">{source.records.toLocaleString()} records</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Data Upload</CardTitle>
                  <CardDescription>Upload new data files or connect to APIs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-forest-200 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 mx-auto text-forest-400 mb-4" />
                    <p className="text-forest-600 mb-2">Drag and drop files here or click to browse</p>
                    <p className="text-sm text-forest-500">Supports CSV, JSON, Excel files</p>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleDataUpload} className="w-full bg-forest-600 hover:bg-forest-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Link className="w-4 h-4 mr-2" />
                      Connect API
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Custom Data Input */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Custom Data Input</CardTitle>
                <CardDescription>Manually input or paste custom data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your data here in JSON, CSV, or custom format..."
                  value={customData}
                  onChange={(e) => setCustomData(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex gap-2">
                  <Button className="bg-forest-600 hover:bg-forest-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Process Data
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    Validate Format
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Saved Charts</CardTitle>
                <CardDescription>Your saved and shared visualizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSavedCharts.map((chart) => (
                    <Card key={chart.id} className="bg-forest-50 border-forest-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getChartTypeIcon(chart.type)}
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {chart.category}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-forest-900 mb-2">{chart.name}</h4>
                        <div className="flex justify-between items-center text-xs text-forest-500 mb-3">
                          <span>Modified: {chart.lastModified}</span>
                          <span>{chart.type.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1 text-xs text-forest-500">
                            <Eye className="w-3 h-3" />
                            {chart.views}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-forest-500">
                            <Share2 className="w-3 h-3" />
                            {chart.shares}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
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
                  <CardTitle className="text-forest-900">Chart Usage Analytics</CardTitle>
                  <CardDescription>Overview of chart creation and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">24</div>
                      <div className="text-sm text-forest-600">Charts Created</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">156</div>
                      <div className="text-sm text-forest-600">Total Views</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">8</div>
                      <div className="text-sm text-forest-600">Shared Charts</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">3</div>
                      <div className="text-sm text-forest-600">Data Sources</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Popular Chart Types</CardTitle>
                  <CardDescription>Most used visualization types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: 'Bar Charts', usage: 45, percentage: 45 },
                    { type: 'Line Charts', usage: 32, percentage: 32 },
                    { type: 'Pie Charts', usage: 18, percentage: 18 },
                    { type: 'Area Charts', usage: 5, percentage: 5 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{item.type}</span>
                        <span className="text-sm text-forest-600">{item.usage} charts</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Performance Metrics</CardTitle>
                <CardDescription>Chart rendering and data processing performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-forest-50 rounded-lg">
                    <div className="text-3xl font-bold text-forest-900">2.3s</div>
                    <div className="text-sm text-forest-600">Avg Render Time</div>
                    <div className="text-xs text-forest-500 mt-1">↓ 15% from last month</div>
                  </div>
                  <div className="text-center p-4 bg-forest-50 rounded-lg">
                    <div className="text-3xl font-bold text-forest-900">99.2%</div>
                    <div className="text-sm text-forest-600">Uptime</div>
                    <div className="text-xs text-forest-500 mt-1">↑ 2% from last month</div>
                  </div>
                  <div className="text-center p-4 bg-forest-50 rounded-lg">
                    <div className="text-3xl font-bold text-forest-900">1.8s</div>
                    <div className="text-sm text-forest-600">Data Load Time</div>
                    <div className="text-xs text-forest-500 mt-1">↓ 8% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataVisualization;
