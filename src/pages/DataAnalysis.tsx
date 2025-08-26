
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Brain, Upload, Download, Zap, PieChart, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const mockData = [
  { month: 'Jan', value: 400, category: 'Research', efficiency: 85 },
  { month: 'Feb', value: 300, category: 'Development', efficiency: 78 },
  { month: 'Mar', value: 600, category: 'Testing', efficiency: 92 },
  { month: 'Apr', value: 800, category: 'Analysis', efficiency: 88 },
  { month: 'May', value: 700, category: 'Deployment', efficiency: 95 },
  { month: 'Jun', value: 900, category: 'Optimization', efficiency: 89 }
];

const pieData = [
  { name: 'Successful', value: 65, color: '#059669' },
  { name: 'In Progress', value: 25, color: '#0ea5e9' },
  { name: 'Failed', value: 10, color: '#ef4444' }
];

const DataAnalysis = () => {
  const [selectedModel, setSelectedModel] = useState('regression');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || '');

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Data Analysis Assistant</h1>
            <p className="text-forest-600">AI-guided statistical models and visual insights</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Input
              placeholder="Enter Groq API Key..."
              type="password"
              value={groqKey}
              onChange={(e) => {
                setGroqKey(e.target.value);
                localStorage.setItem('groq_api_key', e.target.value);
              }}
              className="w-full sm:w-64"
            />
            <Button onClick={runAnalysis} disabled={isAnalyzing} className="bg-forest-600 hover:bg-forest-700 w-full sm:w-auto">
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Model Selection & Data Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <BarChart3 className="w-5 h-5" />
                Statistical Models
              </CardTitle>
              <CardDescription>Choose your analysis approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regression">Linear Regression</SelectItem>
                  <SelectItem value="logistic">Logistic Regression</SelectItem>
                  <SelectItem value="clustering">K-Means Clustering</SelectItem>
                  <SelectItem value="neural">Neural Networks</SelectItem>
                  <SelectItem value="random-forest">Random Forest</SelectItem>
                  <SelectItem value="svm">Support Vector Machine</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Zap className="w-5 h-5" />
                Quick Insights
              </CardTitle>
              <CardDescription>AI-generated statistical insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-900 mb-1">Correlation Detected</div>
                <div className="text-sm text-blue-700">Strong positive correlation (r=0.87) between research investment and efficiency.</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-900 mb-1">Trend Analysis</div>
                <div className="text-sm text-green-700">Upward trend in optimization metrics over the last 6 months.</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="font-medium text-orange-900 mb-1">Anomaly Alert</div>
                <div className="text-sm text-orange-700">February shows unusual dip in development efficiency.</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <LineChart className="w-5 h-5" />
                Trend Analysis
              </CardTitle>
              <CardDescription>Monthly performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} />
                    <Line type="monotone" dataKey="efficiency" stroke="#0ea5e9" strokeWidth={2} strokeDasharray="5 5" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <PieChart className="w-5 h-5" />
                Success Distribution
              </CardTitle>
              <CardDescription>Project completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Brain className="w-5 h-5" />
              AI Analysis Results
            </CardTitle>
            <CardDescription>Statistical findings and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-forest-50 rounded-lg">
                <div className="text-2xl font-bold text-forest-900">R² = 0.92</div>
                <div className="text-sm text-forest-600">Model Accuracy</div>
              </div>
              <div className="text-center p-4 bg-forest-50 rounded-lg">
                <div className="text-2xl font-bold text-forest-900">p &lt; 0.001</div>
                <div className="text-sm text-forest-600">Statistical Significance</div>
              </div>
              <div className="text-center p-4 bg-forest-50 rounded-lg">
                <div className="text-2xl font-bold text-forest-900">95%</div>
                <div className="text-sm text-forest-600">Confidence Interval</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-forest-600 pl-4">
                <h3 className="font-semibold text-forest-900 mb-2">Key Findings</h3>
                <ul className="space-y-1 text-forest-700">
                  <li>• Strong positive correlation between research investment and project success</li>
                  <li>• Optimization phase shows highest efficiency gains (89% average)</li>
                  <li>• February dip attributed to seasonal workforce adjustments</li>
                  <li>• Predictive model suggests 15% improvement potential</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-forest-900 mb-2">Recommendations</h3>  
                <ul className="space-y-1 text-forest-700">
                  <li>• Increase investment in research phase by 20%</li>
                  <li>• Implement optimization strategies in development phase</li>
                  <li>• Consider workforce planning for seasonal variations</li>
                  <li>• Deploy predictive monitoring for early anomaly detection</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="bg-forest-600">High Confidence</Badge>
              <Badge variant="outline">Regression Analysis</Badge>
              <Badge variant="outline">Time Series</Badge>
              <Badge variant="outline">Predictive Model</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalysis;
