import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle, Search, Star, Plus, BarChart3, Globe, Users, Bell } from 'lucide-react';
import { groqService } from '@/services/groqService';
import { useToast } from '@/hooks/use-toast';

// Mock data for chart
const chartData = [
  { time: '09:00', value: 15000 },
  { time: '10:00', value: 15500 },
  { time: '11:00', value: 16200 },
  { time: '12:00', value: 15900 },
  { time: '13:00', value: 16500 },
  { time: '14:00', value: 17000 },
  { time: '15:00', value: 16800 },
];

// Mock data for stock list
const stockList = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.50, change: 2.45 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 780.00, change: -5.20 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.00, change: 15.75 },
];

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const StockTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAnalyzing) {
      // Simulate AI analysis with a timeout
      setTimeout(() => {
        const mockAnalysis = `
          Market Overview:
          The tech sector is showing strong growth, driven by AI and cloud computing.

          Key Trends:
          - Increased adoption of AI in enterprise solutions.
          - Growing demand for electric vehicles.

          Investment Opportunities:
          Companies focused on renewable energy and sustainable technologies are poised for growth.
        `;
        setAnalysisResult(mockAnalysis);
        setIsAnalyzing(false);
        toast({
          title: "AI Analysis Complete",
          description: "Market analysis and predictions are now available.",
        });
      }, 3000);
    }
  }, [isAnalyzing, toast]);

  return (
    <div className="stock-tracker-page space-y-6 ml-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-space font-bold text-forest-900">Stock Tracker</h1>
          <p className="text-forest-600">AI-powered market analysis and predictions</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAnalyzing(true)} disabled={isAnalyzing} className="bg-forest-600 hover:bg-forest-700">
            {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
          </Button>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
              <Input 
                placeholder="Search stocks (e.g., AAPL, TSLA, GOOGL)" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter by Sector</Button>
            <Button variant="outline">Sort by Performance</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-500 w-5 h-5" />
                  <div>
                    <CardTitle className="text-sm font-medium text-forest-900">
                      S&P 500
                    </CardTitle>
                    <CardDescription className="text-xs text-forest-600">
                      +0.8%
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <TrendingDown className="text-red-500 w-5 h-5" />
                  <div>
                    <CardTitle className="text-sm font-medium text-forest-900">
                      Nasdaq
                    </CardTitle>
                    <CardDescription className="text-xs text-forest-600">
                      -0.2%
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-green-500 w-5 h-5" />
                  <div>
                    <CardTitle className="text-sm font-medium text-forest-900">
                      USD/EUR
                    </CardTitle>
                    <CardDescription className="text-xs text-forest-600">
                      +0.5%
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Activity className="text-blue-500 w-5 h-5" />
                  <div>
                    <CardTitle className="text-sm font-medium text-forest-900">
                      Volatility
                    </CardTitle>
                    <CardDescription className="text-xs text-forest-600">
                      +2.1%
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Performance Chart */}
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-forest-900">Portfolio Performance</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  +12.5% Today
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#059669" 
                    fill="url(#colorGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stock List */}
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Your Watchlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockList.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-forest-900">{stock.name}</p>
                      <p className="text-xs text-forest-600">{stock.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-forest-900">${stock.price}</p>
                      <p className={`text-xs ${stock.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change > 0 ? '+' : ''}{stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Section */}
          {analysisResult && (
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  AI Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-forest-700">
                  {analysisResult.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Market News */}
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Market News
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-forest-50 rounded-lg">
                  <p className="font-medium text-sm text-forest-900">Fed announces rate decision</p>
                  <p className="text-xs text-forest-600 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 bg-cream-50 rounded-lg">
                  <p className="font-medium text-sm text-forest-900">Tech stocks surge on AI news</p>
                  <p className="text-xs text-forest-600 mt-1">4 hours ago</p>
                </div>
                <div className="p-3 bg-forest-50 rounded-lg">
                  <p className="font-medium text-sm text-forest-900">Energy sector outlook positive</p>
                  <p className="text-xs text-forest-600 mt-1">6 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All News
              </Button>
            </CardContent>
          </Card>

          {/* Top Movers */}
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Movers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium text-sm">NVDA</span>
                <span className="text-green-600 text-sm font-bold">+8.2%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium text-sm">AMD</span>
                <span className="text-green-600 text-sm font-bold">+5.7%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium text-sm">NFLX</span>
                <span className="text-red-600 text-sm font-bold">-3.1%</span>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Price Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900">AAPL approaching target</p>
                <p className="text-xs text-orange-700">Current: $185.50 | Target: $190.00</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-3 h-3 mr-2" />
                Add Alert
              </Button>
            </CardContent>
          </Card>

          {/* Portfolio Summary */}
          <Card className="bg-gradient-to-br from-forest-50 to-cream-50 border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Portfolio Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-forest-600">Total Value</span>
                <span className="font-bold text-forest-900">$125,430</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-600">Today's P&L</span>
                <span className="font-bold text-green-600">+$2,341</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-600">Total Return</span>
                <span className="font-bold text-green-600">+18.7%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockTracker;
