
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Brain, Activity, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const predictiveData = [
  { month: 'Jan', actual: 4000, predicted: 4200, confidence: 85 },
  { month: 'Feb', actual: 3000, predicted: 3100, confidence: 88 },
  { month: 'Mar', actual: 2000, predicted: 2200, confidence: 82 },
  { month: 'Apr', actual: 2780, predicted: 2900, confidence: 90 },
  { month: 'May', actual: 1890, predicted: 1950, confidence: 87 },
  { month: 'Jun', actual: 2390, predicted: 2500, confidence: 92 },
  { month: 'Jul', predicted: 3200, confidence: 89 },
  { month: 'Aug', predicted: 3800, confidence: 85 },
  { month: 'Sep', predicted: 4100, confidence: 91 },
];

const modelPerformance = [
  { model: 'LSTM', accuracy: 94, speed: 85, reliability: 92 },
  { model: 'Prophet', accuracy: 89, speed: 95, reliability: 88 },
  { model: 'ARIMA', accuracy: 82, speed: 90, reliability: 85 },
  { model: 'Random Forest', accuracy: 87, speed: 88, reliability: 90 },
];

const riskFactors = [
  { factor: 'Market Volatility', impact: 'High', probability: 65, color: '#ef4444' },
  { factor: 'Economic Policy', impact: 'Medium', probability: 45, color: '#f59e0b' },
  { factor: 'Global Events', impact: 'High', probability: 30, color: '#ef4444' },
  { factor: 'Seasonal Trends', impact: 'Low', probability: 80, color: '#10b981' },
];

const PredictiveCharts = () => {
  const [selectedModel, setSelectedModel] = useState('LSTM');
  const [timeHorizon, setTimeHorizon] = useState('3months');
  const [chartType, setChartType] = useState('line');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Predictive Charts</h1>
            <p className="text-forest-600">AI-powered forecasting and trend analysis</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LSTM">LSTM Neural Net</SelectItem>
                <SelectItem value="Prophet">Prophet</SelectItem>
                <SelectItem value="ARIMA">ARIMA</SelectItem>
                <SelectItem value="RandomForest">Random Forest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeHorizon} onValueChange={setTimeHorizon}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-forest-600 hover:bg-forest-700">
              <Brain className="w-4 h-4 mr-2" />
              Generate Forecast
            </Button>
          </div>
        </div>

        {/* Model Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Forecast Accuracy</p>
                  <p className="text-2xl font-bold text-forest-900">94.2%</p>
                  <Badge className="bg-green-100 text-green-700 mt-1">Excellent</Badge>
                </div>
                <Target className="w-8 h-8 text-forest-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Confidence Level</p>
                  <p className="text-2xl font-bold text-forest-900">89%</p>
                  <Badge className="bg-blue-100 text-blue-700 mt-1">High</Badge>
                </div>
                <Brain className="w-8 h-8 text-forest-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Processing Speed</p>
                  <p className="text-2xl font-bold text-forest-900">2.3s</p>
                  <Badge className="bg-green-100 text-green-700 mt-1">Fast</Badge>
                </div>
                <Zap className="w-8 h-8 text-forest-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest-600">Data Points</p>
                  <p className="text-2xl font-bold text-forest-900">15.2K</p>
                  <Badge className="bg-purple-100 text-purple-700 mt-1">Rich Dataset</Badge>
                </div>
                <Activity className="w-8 h-8 text-forest-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Predictive Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-forest-900">Predictive Forecast</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={chartType === 'line' ? 'default' : 'outline'}
                      onClick={() => setChartType('line')}
                    >
                      Line
                    </Button>
                    <Button 
                      size="sm" 
                      variant={chartType === 'area' ? 'default' : 'outline'}
                      onClick={() => setChartType('area')}
                    >
                      Area
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Historical data vs AI predictions with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  {chartType === 'line' ? (
                    <LineChart data={predictiveData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#059669" 
                        strokeWidth={3}
                        name="Actual Data"
                        dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Predicted"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  ) : (
                    <AreaChart data={predictiveData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.2}
                        name="Predicted Range"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#059669" 
                        fill="#059669" 
                        fillOpacity={0.4}
                        name="Actual Data"
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Model Comparison */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Model Performance Comparison</CardTitle>
                <CardDescription>Accuracy, speed, and reliability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={modelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="model" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#059669" name="Accuracy %" />
                    <Bar dataKey="speed" fill="#3b82f6" name="Speed %" />
                    <Bar dataKey="reliability" fill="#f59e0b" name="Reliability %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Risk Analysis & Settings */}
          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <TrendingUp className="w-5 h-5" />
                  Prediction Confidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-forest-600">Next Month</span>
                    <Badge className="bg-green-100 text-green-700">92%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-forest-600">3 Months</span>
                    <Badge className="bg-blue-100 text-blue-700">85%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-forest-600">6 Months</span>
                    <Badge className="bg-yellow-100 text-yellow-700">72%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Risk Factors</CardTitle>
                <CardDescription>Potential impact on predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg border border-forest-100">
                    <div>
                      <div className="font-medium text-forest-900 text-sm">{risk.factor}</div>
                      <Badge 
                        variant="secondary" 
                        className="mt-1"
                        style={{ 
                          backgroundColor: `${risk.color}20`, 
                          color: risk.color,
                          border: `1px solid ${risk.color}40`
                        }}
                      >
                        {risk.impact} Impact
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-forest-900">{risk.probability}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Forecast
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Model Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2" />
                  Set Alerts
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Brain className="w-4 h-4 mr-2" />
                  Retrain Model
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveCharts;
