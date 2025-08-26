
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
  Brain, Zap, Target, TrendingUp, BarChart3, PieChart, LineChart, 
  Activity, Users, Globe, Calendar, Clock, RefreshCw, Save, Edit, 
  Trash2, Share2, Eye, Filter, Search, Plus, Lightbulb, 
  Database, Star, CheckCircle, AlertTriangle, XCircle, Play, 
  Pause, Square, RotateCcw, History, Code, ArrowUpRight, 
  ArrowDownRight, Minus, DollarSign, ChartBar, Cpu, 
  HardDrive, Wifi, Cloud, Smartphone, Monitor, GitBranch, 
  GitCommit, GitPullRequest, GitMerge, GitCompare, Link, 
  Share, Settings, Key, Lock, Unlock, Download, Upload,
  BarChart, PieChart as PieChartIcon, LineChart as LineChartIcon,
  ScatterPlot, AreaChart, Radar, Gauge, Thermometer, Target as TargetIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for predictive modeling
const mockModels = [
  {
    id: 1,
    name: "Customer Churn Prediction",
    description: "ML model to predict customer churn probability",
    type: "Classification",
    algorithm: "Random Forest",
    status: "deployed",
    accuracy: 94.2,
    precision: 91.8,
    recall: 89.5,
    f1Score: 90.6,
    lastUpdated: "2 hours ago",
    category: "Business Intelligence",
    features: ["Age", "Income", "Usage", "Support Tickets", "Payment History"],
    trainingData: "50,000 records",
    version: "2.1.0",
    performance: "excellent",
    deployment: "production",
    apiEndpoint: "/api/v1/predict/churn",
    monitoring: "active"
  },
  {
    id: 2,
    name: "Stock Price Forecasting",
    description: "Time series model for stock price prediction",
    type: "Regression",
    algorithm: "LSTM Neural Network",
    status: "training",
    accuracy: 87.3,
    precision: 85.1,
    recall: 82.7,
    f1Score: 83.9,
    lastUpdated: "1 hour ago",
    category: "Financial",
    features: ["Historical Prices", "Volume", "Technical Indicators", "News Sentiment"],
    trainingData: "100,000 records",
    version: "1.5.2",
    performance: "good",
    deployment: "staging",
    apiEndpoint: "/api/v1/predict/stock",
    monitoring: "active"
  },
  {
    id: 3,
    name: "Fraud Detection System",
    description: "Real-time fraud detection using anomaly detection",
    type: "Anomaly Detection",
    algorithm: "Isolation Forest",
    status: "deployed",
    accuracy: 96.8,
    precision: 94.2,
    recall: 92.1,
    f1Score: 93.1,
    lastUpdated: "3 hours ago",
    category: "Security",
    features: ["Transaction Amount", "Location", "Time", "User Behavior", "Device Info"],
    trainingData: "200,000 records",
    version: "3.0.1",
    performance: "excellent",
    deployment: "production",
    apiEndpoint: "/api/v1/predict/fraud",
    monitoring: "active"
  },
  {
    id: 4,
    name: "Demand Forecasting",
    description: "Predict product demand for inventory optimization",
    type: "Time Series",
    algorithm: "Prophet",
    status: "evaluating",
    accuracy: 89.7,
    precision: 87.3,
    recall: 85.9,
    f1Score: 86.6,
    lastUpdated: "5 hours ago",
    category: "Supply Chain",
    features: ["Historical Sales", "Seasonality", "Promotions", "Market Trends"],
    trainingData: "75,000 records",
    version: "2.0.3",
    performance: "good",
    deployment: "development",
    apiEndpoint: "/api/v1/predict/demand",
    monitoring: "inactive"
  },
  {
    id: 5,
    name: "Sentiment Analysis",
    description: "Analyze customer sentiment from social media",
    type: "NLP",
    algorithm: "BERT",
    status: "deployed",
    accuracy: 91.4,
    precision: 89.7,
    recall: 88.3,
    f1Score: 89.0,
    lastUpdated: "1 day ago",
    category: "Marketing",
    features: ["Text Content", "User Profile", "Platform", "Engagement"],
    trainingData: "150,000 records",
    version: "2.2.0",
    performance: "excellent",
    deployment: "production",
    apiEndpoint: "/api/v1/predict/sentiment",
    monitoring: "active"
  }
];

const mockModelMetrics = {
  totalModels: 156,
  deployedModels: 89,
  trainingModels: 23,
  evaluatingModels: 18,
  failedModels: 26,
  averageAccuracy: 91.2,
  averagePrecision: 89.4,
  averageRecall: 87.8,
  averageF1Score: 88.6,
  totalPredictions: 2456789,
  successfulPredictions: 2345678,
  failedPredictions: 111111,
  successRate: 95.5,
  topPerformance: [
    { metric: "Model Accuracy", value: 91.2, trend: "increasing", percentage: 8.5 },
    { metric: "Prediction Success", value: 95.5, trend: "increasing", percentage: 12.3 },
    { metric: "Deployment Rate", value: 57.1, trend: "stable", percentage: 2.1 },
    { metric: "Training Efficiency", value: 87.3, trend: "increasing", percentage: 15.7 }
  ],
  modelTrends: [
    { month: "Jan", models: 142, accuracy: 89.2, predictions: 198234 },
    { month: "Feb", models: 145, accuracy: 89.8, predictions: 201567 },
    { month: "Mar", models: 148, accuracy: 90.3, predictions: 205890 },
    { month: "Apr", models: 151, accuracy: 90.7, predictions: 210234 },
    { month: "May", models: 153, accuracy: 91.0, predictions: 215123 },
    { month: "Jun", models: 156, accuracy: 91.2, predictions: 220456 }
  ]
};

const mockModelPerformance = [
  {
    id: 1,
    modelName: "Customer Churn Prediction",
    timestamp: "2024-06-15 14:30:00",
    inputData: { customerId: "CUST001", age: 35, income: 75000, usage: "high" },
    prediction: { churnProbability: 0.23, confidence: 0.89, riskLevel: "low" },
    actual: { churned: false, actualProbability: 0.18 },
    accuracy: 0.95,
    latency: 45,
    status: "success"
  },
  {
    id: 2,
    modelName: "Stock Price Forecasting",
    timestamp: "2024-06-15 14:25:00",
    inputData: { symbol: "AAPL", price: 185.50, volume: 45678900 },
    prediction: { nextDayPrice: 187.20, confidence: 0.76, trend: "up" },
    actual: { actualPrice: 186.80, actualTrend: "up" },
    accuracy: 0.88,
    latency: 67,
    status: "success"
  },
  {
    id: 3,
    modelName: "Fraud Detection System",
    timestamp: "2024-06-15 14:20:00",
    inputData: { amount: 2500.00, location: "NYC", time: "14:20:00" },
    prediction: { fraudProbability: 0.87, confidence: 0.94, riskLevel: "high" },
    actual: { isFraud: true, actualProbability: 0.92 },
    accuracy: 0.98,
    latency: 23,
    status: "success"
  }
];

const mockModelDeployments = [
  {
    id: 1,
    modelName: "Customer Churn Prediction",
    environment: "production",
    version: "2.1.0",
    status: "healthy",
    uptime: 99.8,
    responseTime: 45,
    throughput: 1250,
    errorRate: 0.2,
    lastDeployed: "2024-06-10 10:00:00",
    deployedBy: "Data Science Team",
    monitoring: "active",
    scaling: "auto",
    resources: { cpu: 45, memory: 60, gpu: 0 }
  },
  {
    id: 2,
    modelName: "Fraud Detection System",
    environment: "production",
    version: "3.0.1",
    status: "healthy",
    uptime: 99.9,
    responseTime: 23,
    throughput: 2100,
    errorRate: 0.1,
    lastDeployed: "2024-06-12 14:30:00",
    deployedBy: "ML Engineering Team",
    monitoring: "active",
    scaling: "auto",
    resources: { cpu: 78, memory: 85, gpu: 0 }
  },
  {
    id: 3,
    modelName: "Sentiment Analysis",
    environment: "production",
    version: "2.2.0",
    status: "warning",
    uptime: 98.5,
    responseTime: 89,
    throughput: 890,
    errorRate: 1.2,
    lastDeployed: "2024-06-08 09:15:00",
    deployedBy: "NLP Team",
    monitoring: "active",
    scaling: "manual",
    resources: { cpu: 65, memory: 72, gpu: 0 }
  }
];

const mockModelInsights = [
  {
    id: 1,
    title: "Model Performance Degradation",
    insight: "Customer Churn model shows 3% accuracy decline over the last week, possibly due to data drift.",
    type: "performance",
    severity: "medium",
    confidence: 87.5,
    recommendations: ["Retrain model with recent data", "Check for data quality issues", "Update feature engineering"],
    affectedModels: ["Customer Churn Prediction"],
    estimatedImpact: "5-10% accuracy loss if not addressed"
  },
  {
    id: 2,
    title: "High Prediction Latency",
    insight: "Stock Price model experiencing increased response times, affecting real-time trading decisions.",
    type: "latency",
    severity: "high",
    confidence: 92.3,
    recommendations: ["Optimize model architecture", "Implement caching", "Scale compute resources"],
    affectedModels: ["Stock Price Forecasting"],
    estimatedImpact: "15-20% user experience degradation"
  },
  {
    id: 3,
    title: "Data Drift Detection",
    insight: "Fraud Detection model showing signs of concept drift in transaction patterns.",
    type: "data_quality",
    severity: "medium",
    confidence: 78.9,
    recommendations: ["Monitor data distributions", "Retrain with recent data", "Implement drift detection"],
    affectedModels: ["Fraud Detection System"],
    estimatedImpact: "3-7% accuracy decline"
  }
];

const mockChartData = {
  accuracyTrends: [
    { date: "2024-01", churn: 92.1, stock: 85.3, fraud: 94.8, demand: 87.2, sentiment: 89.5 },
    { date: "2024-02", churn: 92.8, stock: 86.1, fraud: 95.2, demand: 87.8, sentiment: 90.1 },
    { date: "2024-03", churn: 93.2, stock: 86.7, fraud: 95.5, demand: 88.3, sentiment: 90.6 },
    { date: "2024-04", churn: 93.7, stock: 87.1, fraud: 95.8, demand: 88.8, sentiment: 91.0 },
    { date: "2024-05", churn: 94.0, stock: 87.6, fraud: 96.2, demand: 89.2, sentiment: 91.3 },
    { date: "2024-06", churn: 94.2, stock: 87.3, fraud: 96.8, demand: 89.7, sentiment: 91.4 }
  ],
  predictionVolume: [
    { hour: "00:00", volume: 1250, success: 1187, failed: 63 },
    { hour: "06:00", volume: 890, success: 845, failed: 45 },
    { hour: "12:00", volume: 2100, success: 1995, failed: 105 },
    { hour: "18:00", volume: 1800, success: 1710, failed: 90 },
    { hour: "24:00", volume: 1250, success: 1187, failed: 63 }
  ],
  modelDistribution: [
    { category: "Business Intelligence", count: 45, accuracy: 92.1 },
    { category: "Financial", count: 38, accuracy: 87.3 },
    { category: "Security", count: 32, accuracy: 96.8 },
    { category: "Supply Chain", count: 28, accuracy: 89.7 },
    { category: "Marketing", count: 13, accuracy: 91.4 }
  ]
};

const PredictiveModeling = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModelDialog, setShowCreateModelDialog] = useState(false);
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    algorithm: '',
    features: []
  });
  const [deployConfig, setDeployConfig] = useState({
    environment: 'staging',
    version: '',
    scaling: 'auto',
    monitoring: true
  });
  const [testInput, setTestInput] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState(null);
  const { toast } = useToast();

  // Filter models based on search and filters
  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    const matchesType = selectedType === 'all' || model.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || model.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesType && matchesStatus;
  });

  // Get unique categories, types, and statuses
  const categories = ['all', ...Array.from(new Set(mockModels.map(model => model.category)))];
  const types = ['all', ...Array.from(new Set(mockModels.map(model => model.type)))];
  const statuses = ['all', 'deployed', 'training', 'evaluating', 'failed'];

  const handleCreateModel = () => {
    if (!newModel.name.trim() || !newModel.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide model name and description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Model Created",
      description: `"${newModel.name}" has been created successfully.`,
    });
    
    setShowCreateModelDialog(false);
    setNewModel({ name: '', description: '', category: '', type: '', algorithm: '', features: [] });
  };

  const handleDeployModel = () => {
    if (!deployConfig.version.trim()) {
      toast({
        title: "Missing Version",
        description: "Please provide a version number for deployment.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Model Deployed",
      description: `Model has been deployed to ${deployConfig.environment} successfully.`,
    });
    
    setShowDeployDialog(false);
    setDeployConfig({ environment: 'staging', version: '', scaling: 'auto', monitoring: true });
  };

  const handleTestModel = () => {
    if (!testInput.trim()) {
      toast({
        title: "Missing Input",
        description: "Please provide test input data.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Model Tested",
      description: "Model prediction completed successfully.",
    });
    
    setShowTestDialog(false);
    setTestInput('');
  };

  const handleTrainModel = async (modelId: number) => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate model training
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: "Training Complete",
            description: "Model training has been completed successfully.",
          });
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-700';
      case 'training': return 'bg-blue-100 text-blue-700';
      case 'evaluating': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'average': return 'bg-yellow-100 text-yellow-700';
      case 'poor': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Classification': return 'bg-blue-100 text-blue-700';
      case 'Regression': return 'bg-green-100 text-green-700';
      case 'Anomaly Detection': return 'bg-purple-100 text-purple-700';
      case 'Time Series': return 'bg-orange-100 text-orange-700';
      case 'NLP': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'critical': return 'bg-red-200 text-red-800';
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

  const getChartTypeIcon = (chartType: string) => {
    switch (chartType) {
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      case 'LineChart': return <LineChartIcon className="w-5 h-5" />;
      case 'PieChart': return <PieChartIcon className="w-5 h-5" />;
      case 'ScatterPlot': return <BarChart3 className="w-5 h-5" />;
      case 'AreaChart': return <BarChart3 className="w-5 h-5" />;
      case 'Radar': return <TargetIcon className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Predictive Modeling</h1>
            <p className="text-forest-600">Advanced ML model building, deployment, and monitoring platform</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCreateModelDialog} onOpenChange={setShowCreateModelDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Model
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Predictive Model</DialogTitle>
                  <DialogDescription>Build and configure a new machine learning model</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Model Name"
                      value={newModel.name}
                      onChange={(e) => setNewModel({...newModel, name: e.target.value})}
                    />
                    <Select value={newModel.category} onValueChange={(value) => setNewModel({...newModel, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Business Intelligence">Business Intelligence</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Model Description"
                    value={newModel.description}
                    onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newModel.type} onValueChange={(value) => setNewModel({...newModel, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Model Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Classification">Classification</SelectItem>
                        <SelectItem value="Regression">Regression</SelectItem>
                        <SelectItem value="Anomaly Detection">Anomaly Detection</SelectItem>
                        <SelectItem value="Time Series">Time Series</SelectItem>
                        <SelectItem value="NLP">NLP</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Algorithm"
                      value={newModel.algorithm}
                      onChange={(e) => setNewModel({...newModel, algorithm: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateModel} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Create Model
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateModelDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showDeployDialog} onOpenChange={setShowDeployDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Deploy Model
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Deploy Model</DialogTitle>
                  <DialogDescription>Deploy model to production or staging environment</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={deployConfig.environment} onValueChange={(value) => setDeployConfig({...deployConfig, environment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Version (e.g., 1.0.0)"
                      value={deployConfig.version}
                      onChange={(e) => setDeployConfig({...deployConfig, version: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={deployConfig.scaling} onValueChange={(value) => setDeployConfig({...deployConfig, scaling: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Scaling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-scaling</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="monitoring"
                        checked={deployConfig.monitoring}
                        onCheckedChange={(checked) => setDeployConfig({...deployConfig, monitoring: checked as boolean})}
                      />
                      <label htmlFor="monitoring" className="text-sm font-medium">Enable Monitoring</label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleDeployModel} className="bg-forest-600 hover:bg-forest-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Deploy
                    </Button>
                    <Button variant="outline" onClick={() => setShowDeployDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Zap className="w-4 h-4 mr-2" />
                  Test Model
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Test Model</DialogTitle>
                  <DialogDescription>Test model predictions with sample input data</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter test input data (JSON format)"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleTestModel} className="bg-forest-600 hover:bg-forest-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Run Prediction
                    </Button>
                    <Button variant="outline" onClick={() => setShowTestDialog(false)}>
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
              <Brain className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Total Models</h3>
              <p className="text-sm text-forest-600">{mockModelMetrics.totalModels} models</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Upload className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Deployed</h3>
              <p className="text-sm text-forest-600">{mockModelMetrics.deployedModels} models</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Success Rate</h3>
              <p className="text-sm text-forest-600">{mockModelMetrics.successRate}%</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Avg Accuracy</h3>
              <p className="text-sm text-forest-600">{mockModelMetrics.averageAccuracy}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Progress */}
        {isTraining && (
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Model Training Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-forest-600">Training model...</span>
                  <span className="font-medium text-forest-900">{trainingProgress}%</span>
                </div>
                <Progress value={trainingProgress} className="h-2" />
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
              placeholder="Search models..."
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Model Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockModelMetrics.averageAccuracy}%</div>
                      <div className="text-sm text-forest-600">Avg Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockModelMetrics.averagePrecision}%</div>
                      <div className="text-sm text-forest-600">Avg Precision</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockModelMetrics.averageRecall}%</div>
                      <div className="text-sm text-forest-600">Avg Recall</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockModelMetrics.averageF1Score}%</div>
                      <div className="text-sm text-forest-600">Avg F1 Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Top Performance</CardTitle>
                  <CardDescription>Performance trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockModelMetrics.topPerformance.map((metric, index) => (
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

            {/* Recent Models */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Recent Models</CardTitle>
                <CardDescription>Latest models added to the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockModels.slice(0, 3).map((model) => (
                    <div key={model.id} className="flex items-center justify-between p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-forest-900">{model.name}</h4>
                          <Badge className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                          <Badge className={getTypeColor(model.type)}>
                            {model.type}
                          </Badge>
                          <Badge className={getPerformanceColor(model.performance)}>
                            {model.performance}
                          </Badge>
                        </div>
                        <p className="text-sm text-forest-600 mb-2">{model.description}</p>
                        <div className="flex items-center gap-4 text-xs text-forest-500">
                          <span>🎯 {model.accuracy}% accuracy</span>
                          <span>📊 {model.algorithm}</span>
                          <span>🔄 {model.lastUpdated}</span>
                          <span>📈 {model.deployment}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleTrainModel(model.id)}>
                          <Zap className="w-4 h-4 mr-1" />
                          Train
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

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="space-y-4">
              {filteredModels.map((model) => (
                <Card key={model.id} className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-forest-900 text-lg">{model.name}</h3>
                          <Badge className={getStatusColor(model.status)}>
                            {model.status}
                          </Badge>
                          <Badge className={getTypeColor(model.type)}>
                            {model.type}
                          </Badge>
                          <Badge className={getPerformanceColor(model.performance)}>
                            {model.performance}
                          </Badge>
                        </div>
                        <p className="text-forest-600 mb-3">{model.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {model.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-forest-500">Algorithm:</span>
                            <div className="font-medium text-forest-900">{model.algorithm}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Accuracy:</span>
                            <div className="font-medium text-forest-900">{model.accuracy}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Precision:</span>
                            <div className="font-medium text-forest-900">{model.precision}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Recall:</span>
                            <div className="font-medium text-forest-900">{model.recall}%</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                          <div>
                            <span className="text-forest-500">F1 Score:</span>
                            <div className="font-medium text-forest-900">{model.f1Score}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Version:</span>
                            <div className="font-medium text-forest-900">{model.version}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Training Data:</span>
                            <div className="font-medium text-forest-900">{model.trainingData}</div>
                          </div>
                          <div>
                            <span className="text-forest-500">API Endpoint:</span>
                            <div className="font-medium text-forest-900">{model.apiEndpoint}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleTrainModel(model.id)}>
                        <Zap className="w-4 h-4 mr-1" />
                        Train
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

          {/* Deployments Tab */}
          <TabsContent value="deployments" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Model Deployments</CardTitle>
                <CardDescription>Active model deployments and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockModelDeployments.map((deployment) => (
                    <div key={deployment.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-forest-900">{deployment.modelName}</h4>
                          <Badge className={deployment.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {deployment.status}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-700">
                            {deployment.environment}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-700">
                            v{deployment.version}
                          </Badge>
                        </div>
                        <div className="text-sm text-forest-500">
                          Deployed: {deployment.lastDeployed}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-forest-500">Uptime:</span>
                          <div className="font-medium text-forest-900">{deployment.uptime}%</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Response Time:</span>
                          <div className="font-medium text-forest-900">{deployment.responseTime}ms</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Throughput:</span>
                          <div className="font-medium text-forest-900">{deployment.throughput}/min</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Error Rate:</span>
                          <div className="font-medium text-forest-900">{deployment.errorRate}%</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-forest-500">CPU Usage:</span>
                          <div className="font-medium text-forest-900">{deployment.resources.cpu}%</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Memory:</span>
                          <div className="font-medium text-forest-900">{deployment.resources.memory}%</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Scaling:</span>
                          <div className="font-medium text-forest-900">{deployment.scaling}</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Monitoring:</span>
                          <div className="font-medium text-forest-900">{deployment.monitoring ? 'Active' : 'Inactive'}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Logs
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Metrics
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Model Performance</CardTitle>
                <CardDescription>Real-time prediction performance and accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockModelPerformance.map((performance) => (
                    <div key={performance.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-forest-900">{performance.modelName}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={performance.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {performance.status}
                          </Badge>
                          <span className="text-sm text-forest-500">{performance.timestamp}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-forest-500">Input Data:</span>
                          <div className="font-medium text-forest-900 text-xs">
                            {JSON.stringify(performance.inputData, null, 2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-forest-500">Prediction:</span>
                          <div className="font-medium text-forest-900 text-xs">
                            {JSON.stringify(performance.prediction, null, 2)}
                          </div>
                        </div>
                        <div>
                          <span className="text-forest-500">Actual:</span>
                          <div className="font-medium text-forest-900 text-xs">
                            {JSON.stringify(performance.actual, null, 2)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-forest-500">Accuracy:</span>
                          <div className="font-medium text-forest-900">{(performance.accuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Latency:</span>
                          <div className="font-medium text-forest-900">{performance.latency}ms</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">AI-Powered Model Insights</CardTitle>
                <CardDescription>Intelligent analysis and optimization recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockModelInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-forest-900 mb-1">{insight.title}</h4>
                          <p className="text-sm text-forest-600 mb-2">{insight.insight}</p>
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span>🎯 {insight.severity} severity</span>
                            <span>📊 {insight.confidence}% confidence</span>
                            <span>📈 {insight.estimatedImpact}</span>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(insight.severity)}>
                          {insight.severity}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-forest-900">Affected Models:</span>
                        <div className="flex flex-wrap gap-1">
                          {insight.affectedModels.map((model, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {model}
                            </Badge>
                          ))}
                        </div>
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

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Model Accuracy Trends</CardTitle>
                  <CardDescription>Accuracy performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChartData.accuracyTrends.map((trend, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-forest-600">{trend.date}</span>
                          <div className="flex gap-4">
                            <span className="text-blue-600">Churn: {trend.churn}%</span>
                            <span className="text-green-600">Stock: {trend.stock}%</span>
                            <span className="text-purple-600">Fraud: {trend.fraud}%</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div className="flex-1 bg-blue-200 rounded" style={{ height: `${trend.churn}%` }}></div>
                          <div className="flex-1 bg-green-200 rounded" style={{ height: `${trend.stock}%` }}></div>
                          <div className="flex-1 bg-purple-200 rounded" style={{ height: `${trend.fraud}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Prediction Volume</CardTitle>
                  <CardDescription>Hourly prediction volume and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockChartData.predictionVolume.map((volume, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-forest-600">{volume.hour}</span>
                          <div className="flex gap-4">
                            <span className="text-green-600">Success: {volume.success}</span>
                            <span className="text-red-600">Failed: {volume.failed}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div 
                            className="bg-green-200 rounded" 
                            style={{ width: `${(volume.success / volume.volume) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-red-200 rounded" 
                            style={{ width: `${(volume.failed / volume.volume) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Model Distribution */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Model Distribution by Category</CardTitle>
                <CardDescription>Distribution and performance by model category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChartData.modelDistribution.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-forest-600">{category.category}</span>
                        <div className="flex gap-4">
                          <span className="text-blue-600">Count: {category.count}</span>
                          <span className="text-green-600">Accuracy: {category.accuracy}%</span>
                        </div>
                      </div>
                      <div className="flex gap-1 h-3">
                        <div 
                          className="bg-blue-200 rounded" 
                          style={{ width: `${(category.count / 156) * 100}%` }}
                        ></div>
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
                  <CardTitle className="text-forest-900">Model Growth Trends</CardTitle>
                  <CardDescription>Monthly model expansion patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {mockModelMetrics.modelTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-forest-600 rounded-t"
                          style={{ height: `${(month.models / 160) * 100}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Accuracy Trends</CardTitle>
                  <CardDescription>Monthly accuracy improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {mockModelMetrics.modelTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-blue-600 rounded-t"
                          style={{ height: `${(month.accuracy / 100) * 100}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction Volume Trends */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Prediction Volume Trends</CardTitle>
                <CardDescription>Monthly prediction volume patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {mockModelMetrics.modelTrends.map((month, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-green-600 rounded-t"
                        style={{ height: `${(month.predictions / 250000) * 100}%` }}
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

export default PredictiveModeling;
