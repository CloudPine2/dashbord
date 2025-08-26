
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Globe, Zap, BookOpen, Target, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const impactData = [
  { month: 'Jan', timeSaved: 45, papersAnalyzed: 234, insightsGenerated: 67, productivity: 78 },
  { month: 'Feb', timeSaved: 67, papersAnalyzed: 345, insightsGenerated: 89, productivity: 82 },
  { month: 'Mar', timeSaved: 89, papersAnalyzed: 456, insightsGenerated: 123, productivity: 87 },
  { month: 'Apr', timeSaved: 123, papersAnalyzed: 567, insightsGenerated: 156, productivity: 91 },
  { month: 'May', timeSaved: 145, papersAnalyzed: 678, insightsGenerated: 189, productivity: 94 },
  { month: 'Jun', timeSaved: 167, papersAnalyzed: 789, insightsGenerated: 212, productivity: 97 },
];

const globalImpactStats = [
  { label: 'Research Hours Saved Globally', value: '2.4M+', icon: Clock, color: 'bg-green-100 text-green-700' },
  { label: 'Active Researchers', value: '15.7K', icon: Users, color: 'bg-blue-100 text-blue-700' },
  { label: 'Papers Processed', value: '847K', icon: BookOpen, color: 'bg-purple-100 text-purple-700' },
  { label: 'Breakthrough Discoveries', value: '1,234', icon: Award, color: 'bg-orange-100 text-orange-700' },
];

const productivityBoosts = [
  { task: 'Literature Review', beforeAI: 8, withAI: 2, improvement: 75 },
  { task: 'Data Analysis', beforeAI: 6, withAI: 1.5, improvement: 75 },
  { task: 'Hypothesis Generation', beforeAI: 4, withAI: 0.5, improvement: 87.5 },
  { task: 'Report Writing', beforeAI: 5, withAI: 1, improvement: 80 },
];

export function ImpactMetrics() {
  const [animatedValues, setAnimatedValues] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValues(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Target className="w-5 h-5 text-forest-600" />
              Impact Analytics Dashboard
            </CardTitle>
            <CardDescription>Comprehensive view of AI-powered research productivity gains</CardDescription>
          </div>
          <Badge variant="default" className="bg-forest-600 hover:bg-forest-700">
            <Zap className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Global Impact Stats */}
        <div>
          <h3 className="text-lg font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Global Research Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {globalImpactStats.map((stat, index) => (
              <div key={stat.label} className="p-4 rounded-lg bg-gradient-to-br from-forest-50 to-cream-50 border border-forest-100 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-forest-900">
                      {animatedValues ? stat.value : '---'}
                    </p>
                    <p className="text-sm text-forest-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div>
          <h3 className="text-lg font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Research Journey
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactData}>
                <defs>
                  <linearGradient id="timeSavedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d2420" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d2420" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="papersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3c8d82" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3c8d82" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="insightsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#57ab9b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#57ab9b" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
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
                  dataKey="timeSaved"
                  stackId="1"
                  stroke="#0d2420"
                  strokeWidth={2}
                  fill="url(#timeSavedGradient)"
                  name="Hours Saved"
                />
                <Area
                  type="monotone"
                  dataKey="papersAnalyzed"
                  stackId="2"
                  stroke="#3c8d82"
                  strokeWidth={2}
                  fill="url(#papersGradient)"
                  name="Papers Analyzed"
                />
                <Area
                  type="monotone"
                  dataKey="insightsGenerated"
                  stackId="3"
                  stroke="#57ab9b"
                  strokeWidth={2}
                  fill="url(#insightsGradient)"
                  name="Insights Generated"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Comparison */}
        <div>
          <h3 className="text-lg font-semibold text-forest-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI Productivity Boost Analysis
          </h3>
          <div className="space-y-4">
            {productivityBoosts.map((item, index) => (
              <div key={item.task} className="p-4 bg-gradient-to-r from-forest-50 to-cream-50 rounded-lg border border-forest-100 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-forest-900">{item.task}</h4>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {item.improvement}% faster
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-forest-600">Before AI: {item.beforeAI}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-forest-600">With AI: {item.withAI}h</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000" 
                      style={{width: animatedValues ? `${item.improvement}%` : '0%'}}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Research Breakthrough</span>
            </div>
            <p className="text-sm text-green-700">AI helped identify a novel approach to renewable energy storage, leading to a Nature publication.</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Team Collaboration</span>
            </div>
            <p className="text-sm text-blue-700">Cross-institutional research collaboration increased by 340% using AI-powered matching algorithms.</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Accuracy Improvement</span>
            </div>
            <p className="text-sm text-purple-700">Hypothesis accuracy increased from 67% to 94% with AI-assisted research methodology.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
