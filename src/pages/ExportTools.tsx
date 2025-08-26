
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
  Download, FileText, Image, Database, Calendar, Clock, Settings, RefreshCw, 
  Save, Edit, Trash2, Share2, Eye, Filter, Search, Plus, Zap, Lightbulb, 
  BarChart3, PieChart, LineChart, TrendingUp, Users, Target, BookOpen,
  FileSpreadsheet, FileCode, FileImage, FileArchive, Mail, Cloud, 
  Smartphone, Monitor, Tablet, Globe, Lock, Unlock, Star, CheckCircle,
  AlertTriangle, XCircle, Play, Pause, Square, RotateCcw, History
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for export tools
const mockExportHistory = [
  {
    id: 1,
    name: "AI Research Q1 Report",
    type: "PDF",
    size: "2.4 MB",
    status: "completed",
    timestamp: "2 hours ago",
    downloads: 12,
    category: "Research Report"
  },
  {
    id: 2,
    name: "Climate Data Visualization",
    type: "PNG",
    size: "856 KB",
    status: "completed",
    timestamp: "1 day ago",
    downloads: 8,
    category: "Charts"
  },
  {
    id: 3,
    name: "Blockchain Research Data",
    type: "CSV",
    size: "1.2 MB",
    status: "completed",
    timestamp: "3 days ago",
    downloads: 15,
    category: "Raw Data"
  },
  {
    id: 4,
    name: "Healthcare AI Analysis",
    type: "PDF",
    size: "3.1 MB",
    status: "processing",
    timestamp: "Just now",
    downloads: 0,
    category: "Research Report"
  }
];

const mockExportTemplates = [
  {
    id: 1,
    name: "Academic Research Report",
    description: "Standard academic format with citations and references",
    category: "Academic",
    usage: 234,
    rating: 4.8,
    tags: ["Academic", "Research", "Citations"],
    formats: ["PDF", "DOCX", "LaTeX"]
  },
  {
    id: 2,
    name: "Executive Summary",
    description: "Concise business-focused summary with key insights",
    category: "Business",
    usage: 156,
    rating: 4.6,
    tags: ["Business", "Executive", "Summary"],
    formats: ["PDF", "PPTX", "DOCX"]
  },
  {
    id: 3,
    name: "Data Visualization Package",
    description: "Complete chart and graph export with metadata",
    category: "Visualization",
    usage: 189,
    rating: 4.9,
    tags: ["Charts", "Graphs", "Data"],
    formats: ["PNG", "SVG", "PDF", "PPTX"]
  },
  {
    id: 4,
    name: "Research Dataset",
    description: "Structured data export with documentation",
    category: "Data",
    usage: 98,
    rating: 4.4,
    tags: ["Dataset", "Structured", "Documentation"],
    formats: ["CSV", "JSON", "Excel", "SQL"]
  }
];

const mockScheduledExports = [
  {
    id: 1,
    name: "Weekly Research Summary",
    schedule: "Every Monday at 9:00 AM",
    lastRun: "2 days ago",
    nextRun: "5 days from now",
    status: "active",
    recipients: ["team@research.com", "stakeholders@company.com"],
    format: "PDF"
  },
  {
    id: 2,
    name: "Monthly Data Export",
    schedule: "1st of every month",
    lastRun: "2 weeks ago",
    nextRun: "2 weeks from now",
    status: "active",
    recipients: ["data@research.com"],
    format: "CSV"
  },
  {
    id: 3,
    name: "Quarterly Executive Report",
    schedule: "Quarterly",
    lastRun: "1 month ago",
    nextRun: "2 months from now",
    status: "paused",
    recipients: ["executives@company.com"],
    format: "PDF"
  }
];

const mockExportAnalytics = {
  totalExports: 1247,
  thisMonth: 89,
  thisWeek: 23,
  today: 5,
  popularFormats: [
    { format: "PDF", count: 45, percentage: 35 },
    { format: "CSV", count: 28, percentage: 22 },
    { format: "PNG", count: 23, percentage: 18 },
    { format: "Excel", count: 18, percentage: 14 },
    { format: "JSON", count: 15, percentage: 11 }
  ],
  exportTrends: [
    { day: "Mon", exports: 12 },
    { day: "Tue", exports: 18 },
    { day: "Wed", exports: 15 },
    { day: "Thu", exports: 22 },
    { day: "Fri", exports: 19 },
    { day: "Sat", exports: 8 },
    { day: "Sun", exports: 5 }
  ],
  topCategories: [
    { category: "Research Reports", count: 156, percentage: 40 },
    { category: "Data Visualizations", count: 98, percentage: 25 },
    { category: "Raw Data", count: 78, percentage: 20 },
    { category: "Presentations", count: 45, percentage: 12 },
    { category: "Other", count: 15, percentage: 3 }
  ]
};

const ExportTools = () => {
  const [activeTab, setActiveTab] = useState('export');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    name: '',
    description: '',
    format: 'pdf',
    template: '',
    includeMetadata: true,
    includeCharts: true,
    includeData: true,
    includeCitations: true,
    watermark: false,
    password: '',
    compression: 'medium'
  });
  const [scheduleConfig, setScheduleConfig] = useState({
    name: '',
    schedule: 'weekly',
    time: '09:00',
    day: 'monday',
    recipients: '',
    format: 'pdf',
    active: true
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { toast } = useToast();

  // Simulate export progress
  useEffect(() => {
    if (isExporting && exportProgress < 100) {
      const timer = setTimeout(() => {
        setExportProgress(prev => Math.min(prev + Math.random() * 20, 100));
      }, 500);
      return () => clearTimeout(timer);
    } else if (exportProgress >= 100) {
      setIsExporting(false);
      setExportProgress(0);
      toast({
        title: "Export Complete",
        description: "Your export has been completed successfully.",
      });
    }
  }, [isExporting, exportProgress, toast]);

  const handleExport = async (type: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    toast({
      title: "Export Started",
      description: `Starting ${type} export...`,
    });
  };

  const handleBatchExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    toast({
      title: "Batch Export Started",
      description: "Processing multiple exports...",
    });
  };

  const handleCreateExport = () => {
    if (!exportConfig.name.trim()) {
      toast({
        title: "Export Name Required",
        description: "Please provide a name for your export.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Created",
      description: `"${exportConfig.name}" export configuration saved.`,
    });
    
    setShowCreateDialog(false);
  };

  const handleScheduleExport = () => {
    if (!scheduleConfig.name.trim()) {
      toast({
        title: "Schedule Name Required",
        description: "Please provide a name for your scheduled export.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Scheduled",
      description: `"${scheduleConfig.name}" has been scheduled successfully.`,
    });
    
    setShowScheduleDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'csv': return <FileSpreadsheet className="w-4 h-4" />;
      case 'json': return <FileCode className="w-4 h-4" />;
      case 'png': return <FileImage className="w-4 h-4" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Export Tools</h1>
            <p className="text-forest-600">Comprehensive export capabilities for your Raas platform research data</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Export
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Custom Export</DialogTitle>
                  <DialogDescription>Configure a custom export with advanced options</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Export Name"
                      value={exportConfig.name}
                      onChange={(e) => setExportConfig({...exportConfig, name: e.target.value})}
                    />
                    <Select value={exportConfig.format} onValueChange={(value) => setExportConfig({...exportConfig, format: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Export Description"
                    value={exportConfig.description}
                    onChange={(e) => setExportConfig({...exportConfig, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="space-y-3">
                    <h4 className="font-medium text-forest-900">Export Options</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="metadata" 
                          checked={exportConfig.includeMetadata}
                          onCheckedChange={(checked) => setExportConfig({...exportConfig, includeMetadata: checked as boolean})}
                        />
                        <label htmlFor="metadata" className="text-sm">Include Metadata</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="charts" 
                          checked={exportConfig.includeCharts}
                          onCheckedChange={(checked) => setExportConfig({...exportConfig, includeCharts: checked as boolean})}
                        />
                        <label htmlFor="charts" className="text-sm">Include Charts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="data" 
                          checked={exportConfig.includeData}
                          onCheckedChange={(checked) => setExportConfig({...exportConfig, includeData: checked as boolean})}
                        />
                        <label htmlFor="data" className="text-sm">Include Raw Data</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="citations" 
                          checked={exportConfig.includeCitations}
                          onCheckedChange={(checked) => setExportConfig({...exportConfig, includeCitations: checked as boolean})}
                        />
                        <label htmlFor="citations" className="text-sm">Include Citations</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateExport} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Create Export
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Export
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule Recurring Export</DialogTitle>
                  <DialogDescription>Set up automated exports on a schedule</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Schedule Name"
                      value={scheduleConfig.name}
                      onChange={(e) => setScheduleConfig({...scheduleConfig, name: e.target.value})}
                    />
                    <Select value={scheduleConfig.schedule} onValueChange={(value) => setScheduleConfig({...scheduleConfig, schedule: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="time"
                      value={scheduleConfig.time}
                      onChange={(e) => setScheduleConfig({...scheduleConfig, time: e.target.value})}
                    />
                    <Input
                      placeholder="Recipients (comma-separated emails)"
                      value={scheduleConfig.recipients}
                      onChange={(e) => setScheduleConfig({...scheduleConfig, recipients: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleScheduleExport} className="bg-forest-600 hover:bg-forest-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Export
                    </Button>
                    <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
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
              <FileText className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Reports</h3>
              <p className="text-sm text-forest-600">PDF & DOCX exports</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Visualizations</h3>
              <p className="text-sm text-forest-600">Charts & graphs</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Database className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Data</h3>
              <p className="text-sm text-forest-600">CSV, JSON, Excel</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Scheduled</h3>
              <p className="text-sm text-forest-600">Automated exports</p>
            </CardContent>
          </Card>
        </div>

        {/* Export Progress */}
        {isExporting && (
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Export Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-forest-600">Processing...</span>
                  <span className="font-medium text-forest-900">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
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

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Export Options */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Export Options</CardTitle>
                    <CardDescription>Export your research data in various formats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="w-8 h-8 text-forest-600" />
                          <div>
                            <h4 className="font-medium text-forest-900">Research Report</h4>
                            <p className="text-sm text-forest-600">Complete research document</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleExport('PDF')} className="bg-forest-600 hover:bg-forest-700">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            DOCX
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <BarChart3 className="w-8 h-8 text-forest-600" />
                          <div>
                            <h4 className="font-medium text-forest-900">Data Visualizations</h4>
                            <p className="text-sm text-forest-600">Charts and graphs</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleExport('PNG')} className="bg-forest-600 hover:bg-forest-700">
                            <Download className="w-4 h-4 mr-1" />
                            PNG
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            SVG
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <Database className="w-8 h-8 text-forest-600" />
                          <div>
                            <h4 className="font-medium text-forest-900">Raw Data</h4>
                            <p className="text-sm text-forest-600">Structured datasets</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleExport('CSV')} className="bg-forest-600 hover:bg-forest-700">
                            <Download className="w-4 h-4 mr-1" />
                            CSV
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            JSON
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border border-forest-200 rounded-lg hover:bg-forest-50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <FileSpreadsheet className="w-8 h-8 text-forest-600" />
                          <div>
                            <h4 className="font-medium text-forest-900">Spreadsheets</h4>
                            <p className="text-sm text-forest-600">Excel and Google Sheets</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleExport('Excel')} className="bg-forest-600 hover:bg-forest-700">
                            <Download className="w-4 h-4 mr-1" />
                            Excel
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Sheets
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Batch Export */}
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Batch Export</CardTitle>
                    <CardDescription>Export multiple items at once</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="reports" defaultChecked />
                        <label htmlFor="reports" className="text-sm">Research Reports</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="charts" defaultChecked />
                        <label htmlFor="charts" className="text-sm">Data Charts</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="data" defaultChecked />
                        <label htmlFor="data" className="text-sm">Raw Data</label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleBatchExport} className="bg-forest-600 hover:bg-forest-700">
                        <Download className="w-4 h-4 mr-2" />
                        Export All Selected
                      </Button>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Select All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Export Settings */}
              <div className="space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Export Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Default Format</label>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Compression</label>
                      <Select value={exportConfig.compression} onValueChange={(value) => setExportConfig({...exportConfig, compression: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Fast)</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High (Small)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-forest-900">Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="watermark" checked={exportConfig.watermark} onCheckedChange={(checked) => setExportConfig({...exportConfig, watermark: checked as boolean})} />
                          <label htmlFor="watermark" className="text-sm">Add Watermark</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="password" />
                          <label htmlFor="password" className="text-sm">Password Protect</label>
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
                      <Mail className="w-4 h-4 mr-2" />
                      Email Export
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Cloud className="w-4 h-4 mr-2" />
                      Cloud Storage
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Security Settings
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
                <CardTitle className="text-forest-900">Export Templates</CardTitle>
                <CardDescription>Pre-configured export templates for common use cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockExportTemplates.map((template) => (
                    <Card key={template.id} className="bg-forest-50 border-forest-200 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {template.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-forest-500">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            {template.rating}
                          </div>
                        </div>
                        <h4 className="font-medium text-forest-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-forest-600 mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-forest-500">{template.usage} uses</span>
                          <span className="text-xs text-forest-500">{template.formats.join(', ')}</span>
                        </div>
                        <Button size="sm" className="w-full bg-forest-600 hover:bg-forest-700">
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Tab */}
          <TabsContent value="scheduled" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Scheduled Exports</CardTitle>
                <CardDescription>Automated exports that run on a schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockScheduledExports.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{schedule.name}</h4>
                          <Badge className={getStatusColor(schedule.status)}>
                            {getStatusIcon(schedule.status)}
                            <span className="ml-1">{schedule.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-forest-600 mb-2">
                          <div>Schedule: {schedule.schedule}</div>
                          <div>Last Run: {schedule.lastRun} • Next Run: {schedule.nextRun}</div>
                          <div>Recipients: {schedule.recipients.join(', ')}</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-forest-500">
                          <span className="flex items-center gap-1">
                            {getFormatIcon(schedule.format)}
                            {schedule.format}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-1" />
                          Run Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Export History</CardTitle>
                <CardDescription>Track all your previous exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExportHistory.map((export_) => (
                    <div key={export_.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{export_.name}</h4>
                          <Badge className={getStatusColor(export_.status)}>
                            {getStatusIcon(export_.status)}
                            <span className="ml-1">{export_.status}</span>
                          </Badge>
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {export_.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-forest-600">
                          <span className="flex items-center gap-1">
                            {getFormatIcon(export_.type)}
                            {export_.type}
                          </span>
                          <span>•</span>
                          <span>{export_.size}</span>
                          <span>•</span>
                          <span>{export_.timestamp}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {export_.downloads} downloads
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Export Statistics</CardTitle>
                  <CardDescription>Overview of your export activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockExportAnalytics.totalExports}</div>
                      <div className="text-sm text-forest-600">Total Exports</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockExportAnalytics.thisMonth}</div>
                      <div className="text-sm text-forest-600">This Month</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockExportAnalytics.thisWeek}</div>
                      <div className="text-sm text-forest-600">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockExportAnalytics.today}</div>
                      <div className="text-sm text-forest-600">Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Popular Export Formats</CardTitle>
                  <CardDescription>Most used export formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockExportAnalytics.popularFormats.map((format, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{format.format}</span>
                        <span className="text-sm text-forest-600">{format.count} exports</span>
                      </div>
                      <Progress value={format.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Export Trends */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Export Trends</CardTitle>
                <CardDescription>Weekly export activity patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockExportAnalytics.exportTrends.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-forest-600 rounded-t"
                        style={{ height: `${(day.exports / 25) * 100}%` }}
                      ></div>
                      <span className="text-xs text-forest-600 mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Categories */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Top Export Categories</CardTitle>
                <CardDescription>Most exported content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockExportAnalytics.topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{category.category}</span>
                        <span className="text-sm text-forest-600">{category.count} exports</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
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

export default ExportTools;
