
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Brain, Zap, Target, Users, BookOpen, Clock, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const performanceData = [
  { time: '00:00', queries: 45, insights: 38, accuracy: 94 },
  { time: '04:00', queries: 67, insights: 59, accuracy: 96 },
  { time: '08:00', queries: 123, insights: 118, accuracy: 98 },
  { time: '12:00', queries: 156, insights: 149, accuracy: 97 },
  { time: '16:00', queries: 189, insights: 182, accuracy: 99 },
  { time: '20:00', queries: 134, insights: 128, accuracy: 98 },
];

const researchCategories = [
  { name: 'AI & ML', value: 35, color: '#0d2420' },
  { name: 'Energy', value: 28, color: '#3c8d82' },
  { name: 'Healthcare', value: 22, color: '#57ab9b' },
  { name: 'Climate', value: 15, color: '#8cc9ba' },
];

const impactMetrics = [
  { metric: 'Time Saved', value: '247h', change: '+18%', icon: Clock, color: 'text-green-600' },
  { metric: 'Papers Analyzed', value: '3,847', change: '+24%', icon: BookOpen, color: 'text-blue-600' },
  { metric: 'Insights Generated', value: '1,293', change: '+31%', icon: Brain, color: 'text-purple-600' },
  { metric: 'Accuracy Rate', value: '97.8%', change: '+2.1%', icon: Target, color: 'text-emerald-600' },
];

export function InteractiveStats() {
  const [activeMetric, setActiveMetric] = useState('queries');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Real-time Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactMetrics.map((item, index) => (
          <Card key={item.metric} className="glass-card hover:shadow-lg transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-forest-600">{item.metric}</p>
                  <p className="text-3xl font-bold text-forest-900 mt-1">
                    {animationComplete ? item.value : '---'}
                  </p>
                  <p className={`text-sm mt-1 ${item.color} flex items-center gap-1`}>
                    <TrendingUp className="w-3 h-3" />
                    {item.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br from-forest-50 to-forest-100`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Performance Dashboard */}
      <Card className="glass-card animate-fade-in">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Zap className="w-5 h-5 text-forest-600" />
                Real-time AI Performance
              </CardTitle>
              <CardDescription>Live metrics from your AI research assistant</CardDescription>
            </div>
            <div className="flex gap-2">
              {['queries', 'insights', 'accuracy'].map((metric) => (
                <Button
                  key={metric}
                  variant={activeMetric === metric ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMetric(metric)}
                  className={`capitalize ${activeMetric === metric ? 'bg-forest-600 hover:bg-forest-700' : ''}`}
                >
                  {metric}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d2420" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d2420" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#0d2420"
                  strokeWidth={3}
                  fill="url(#performanceGradient)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Research Categories & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Award className="w-5 h-5 text-forest-600" />
              Research Focus Areas
            </CardTitle>
            <CardDescription>Current research distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={researchCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {researchCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {researchCategories.map((category, index) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: category.color}}></div>
                  <span className="text-sm text-forest-700">{category.name}</span>
                  <span className="text-xs text-forest-500">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Users className="w-5 h-5 text-forest-600" />
              Live Research Activity
            </CardTitle>
            <CardDescription>Real-time collaboration and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-forest-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-forest-900">New insight generated</p>
                  <p className="text-xs text-forest-600">Climate change mitigation strategies</p>
                </div>
                <span className="text-xs text-forest-500 ml-auto">2m ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-forest-900">Paper analysis completed</p>
                  <p className="text-xs text-forest-600">Renewable energy storage solutions</p>
                </div>
                <span className="text-xs text-forest-500 ml-auto">5m ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-forest-900">Hypothesis validated</p>
                  <p className="text-xs text-forest-600">AI model performance improvement</p>
                </div>
                <span className="text-xs text-forest-500 ml-auto">8m ago</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-forest-600 to-forest-700 rounded-lg text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">AI Efficiency Score</p>
                  <p className="text-2xl font-bold">98.7%</p>
                </div>
                <Brain className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-xs opacity-90 mt-2">Your research productivity is exceptional today!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
