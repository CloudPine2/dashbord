
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Brain, Globe, Calendar, Zap, BarChart3, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trendData = [
  { month: 'Jan', ai: 4000, quantum: 2400, biotech: 2400 },
  { month: 'Feb', ai: 3000, quantum: 1398, biotech: 2210 },
  { month: 'Mar', ai: 2000, quantum: 9800, biotech: 2290 },
  { month: 'Apr', ai: 2780, quantum: 3908, biotech: 2000 },
  { month: 'May', ai: 1890, quantum: 4800, biotech: 2181 },
  { month: 'Jun', ai: 2390, quantum: 3800, biotech: 2500 },
];

const emergingTopics = [
  { topic: "Quantum Machine Learning", growth: 234, papers: 1247, trend: "up" },
  { topic: "Neuromorphic Computing", growth: 189, papers: 856, trend: "up" },
  { topic: "Federated Learning", growth: 167, papers: 642, trend: "up" },
  { topic: "Explainable AI", growth: 145, papers: 1089, trend: "up" },
  { topic: "Edge Computing", growth: 123, papers: 934, trend: "up" },
  { topic: "Blockchain in Healthcare", growth: -12, papers: 567, trend: "down" },
];

const researchAreas = [
  { area: "Artificial Intelligence", citations: 89247, impact: 9.2, color: "bg-blue-500" },
  { area: "Quantum Computing", citations: 45678, impact: 8.9, color: "bg-purple-500" },
  { area: "Biotechnology", citations: 67890, impact: 8.5, color: "bg-green-500" },
  { area: "Climate Science", citations: 34567, impact: 8.8, color: "bg-orange-500" },
  { area: "Space Technology", citations: 23456, impact: 7.9, color: "bg-red-500" },
];

const ResearchTrends = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Research Trends</h1>
            <p className="text-forest-600">Global research patterns and emerging topics</p>
          </div>
          <div className="flex gap-2">
            {['1month', '6months', '1year', '5years'].map((period) => (
              <Button
                key={period}
                variant={selectedTimeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(period)}
                className={selectedTimeframe === period ? 'bg-forest-600 hover:bg-forest-700' : ''}
              >
                {period === '1month' ? '1M' : period === '6months' ? '6M' : period === '1year' ? '1Y' : '5Y'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-forest-900">+23%</div>
              <div className="text-sm text-forest-600">Research Growth</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-forest-900">1,247</div>
              <div className="text-sm text-forest-600">AI Papers</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-forest-900">89K</div>
              <div className="text-sm text-forest-600">Active Researchers</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-forest-900">156</div>
              <div className="text-sm text-forest-600">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Trend Visualization */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <BarChart3 className="w-5 h-5" />
              Research Volume Trends
            </CardTitle>
            <CardDescription>Publications by field over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
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
                  <Area type="monotone" dataKey="ai" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="quantum" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="biotech" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-forest-600">Artificial Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-sm text-forest-600">Quantum Computing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-forest-600">Biotechnology</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emerging Topics and Research Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Zap className="w-5 h-5" />
                Emerging Topics
              </CardTitle>
              <CardDescription>Fastest growing research areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergingTopics.map((topic, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-forest-50 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-forest-900">{topic.topic}</div>
                    <div className="text-sm text-forest-600">{topic.papers} papers</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {topic.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <Badge variant={topic.trend === 'up' ? 'default' : 'destructive'} className={topic.trend === 'up' ? 'bg-green-100 text-green-800' : ''}>
                      {topic.growth > 0 ? '+' : ''}{topic.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Globe className="w-5 h-5" />
                Research Impact
              </CardTitle>
              <CardDescription>Citation impact by research area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {researchAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-forest-900">{area.area}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-forest-600">{area.citations.toLocaleString()}</span>
                      <Badge variant="outline">Impact: {area.impact}</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${area.color} transition-all duration-500`}
                      style={{ width: `${(area.impact / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Predictions */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Brain className="w-5 h-5" />
              AI Trend Predictions
            </CardTitle>
            <CardDescription>Machine learning predictions for future research directions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Next 6 Months</span>
                </div>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Quantum AI research surge (+180%)</li>
                  <li>• Edge computing applications expand</li>
                  <li>• Sustainable AI focus increases</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Next Year</span>
                </div>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Neuromorphic computing breakthrough</li>
                  <li>• Brain-computer interfaces advance</li>
                  <li>• Automated scientific discovery</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Long Term</span>
                </div>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• Quantum supremacy applications</li>
                  <li>• AGI research acceleration</li>
                  <li>• Interdisciplinary fusion trends</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchTrends;
