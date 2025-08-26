
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Shield, TrendingUp, TrendingDown, Clock, Bell, Filter, Search, Zap, Brain } from 'lucide-react';

const riskAlerts = [
  {
    id: 1,
    title: "High Volatility Detected in Tech Sector",
    severity: "high",
    category: "Market Risk",
    timestamp: "2 minutes ago",
    description: "Unusual trading volume and price movements detected in major technology stocks. VIX has increased by 15% in the last hour.",
    probability: 0.87,
    impact: "High",
    recommendation: "Consider reducing exposure to growth stocks and increasing defensive positions.",
    affectedAssets: ["AAPL", "GOOGL", "MSFT", "NVDA"],
    source: "AI Risk Model v3.2"
  },
  {
    id: 2,
    title: "Credit Spread Widening Alert",
    severity: "medium",
    category: "Credit Risk",
    timestamp: "15 minutes ago",
    description: "Investment grade credit spreads have widened by 8 basis points, indicating potential stress in corporate bond markets.",
    probability: 0.72,
    impact: "Medium",
    recommendation: "Monitor corporate bond holdings and consider duration hedging strategies.",
    affectedAssets: ["HYG", "LQD", "JNK", "AGG"],
    source: "Fixed Income Monitor"
  },
  {
    id: 3,
    title: "Currency Risk: USD Strength",
    severity: "low",
    category: "FX Risk",
    timestamp: "1 hour ago",
    description: "USD index showing unusual strength against major currencies, potentially impacting international equity returns.",
    probability: 0.65,
    impact: "Low",
    recommendation: "Review international exposure and consider currency hedging for foreign investments.",
    affectedAssets: ["EFA", "VWO", "FXI", "EWJ"],
    source: "FX Risk Engine"
  },
  {
    id: 4,
    title: "Liquidity Stress Indicator",
    severity: "high",
    category: "Liquidity Risk",
    timestamp: "3 hours ago",
    description: "Bid-ask spreads widening across multiple asset classes, suggesting potential liquidity constraints.",
    probability: 0.91,
    impact: "High",
    recommendation: "Increase cash positions and avoid illiquid investments. Review portfolio liquidity requirements.",
    affectedAssets: ["REITs", "Small-cap", "Emerging Markets"],
    source: "Liquidity Risk Monitor"
  }
];

const riskMetrics = [
  { name: "Portfolio VaR (1-day)", value: "2.34%", change: 0.12, status: "warning" },
  { name: "Expected Shortfall", value: "3.87%", change: 0.23, status: "danger" },
  { name: "Maximum Drawdown", value: "15.6%", change: -0.45, status: "good" },
  { name: "Sharpe Ratio", value: "1.42", change: 0.08, status: "good" },
  { name: "Beta", value: "1.18", change: 0.03, status: "neutral" },
  { name: "Correlation Risk", value: "0.76", change: 0.04, status: "warning" }
];

const riskCategories = ["All", "Market Risk", "Credit Risk", "Liquidity Risk", "FX Risk", "Operational Risk"];
const severityLevels = ["All", "High", "Medium", "Low"];

const AIRiskFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlerts = riskAlerts.filter(alert => {
    const matchesCategory = selectedCategory === "All" || alert.category === selectedCategory;
    const matchesSeverity = selectedSeverity === "All" || alert.severity === selectedSeverity;
    const matchesSearch = searchTerm === "" || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSeverity && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'good': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-space font-bold text-forest-900">AI Risk Feed</h1>
            <p className="text-forest-600">Real-time risk monitoring and alerting system</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-forest-300">
              <Bell className="w-4 h-4 mr-2" />
              Configure Alerts
            </Button>
            <Button className="bg-forest-600 hover:bg-forest-700">
              <Shield className="w-4 h-4 mr-2" />
              Risk Dashboard
            </Button>
          </div>
        </div>

        {/* Risk Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskMetrics.map((metric) => (
            <Card key={metric.name} className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-forest-600 mb-1">{metric.name}</p>
                    <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${metric.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {metric.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
                <Input
                  placeholder="Search risk alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {riskCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Alerts Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <AlertTriangle className="w-5 h-5" />
                  Active Risk Alerts
                  <Badge variant="destructive" className="ml-2">
                    {filteredAlerts.filter(alert => alert.severity === 'high').length} High
                  </Badge>
                </CardTitle>
                <CardDescription>AI-powered risk detection and monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.category}</Badge>
                        <div className="flex items-center gap-1 text-forest-500 text-sm">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-forest-600">Probability</div>
                        <div className="font-semibold text-forest-900">{(alert.probability * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-forest-900 mb-2">{alert.title}</h3>
                    <p className="text-forest-600 text-sm mb-3">{alert.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs font-medium text-forest-700 mb-1">Impact Level</div>
                        <Badge variant={alert.impact === 'High' ? 'destructive' : alert.impact === 'Medium' ? 'secondary' : 'default'}>
                          {alert.impact}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-forest-700 mb-1">Affected Assets</div>
                        <div className="flex flex-wrap gap-1">
                          {alert.affectedAssets.slice(0, 3).map((asset, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{asset}</Badge>
                          ))}
                          {alert.affectedAssets.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{alert.affectedAssets.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-blue-800 font-medium mb-1">
                        <Brain className="w-4 h-4" />
                        AI Recommendation
                      </div>
                      <p className="text-sm text-blue-700">{alert.recommendation}</p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-forest-500">
                      <span>Source: {alert.source}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Acknowledge
                        </Button>
                        <Button size="sm" className="h-7 text-xs bg-forest-600 hover:bg-forest-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk Summary Sidebar */}
          <div className="space-y-4">
            {/* Risk Score */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Shield className="w-5 h-5" />
                  Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">76</div>
                <div className="text-sm text-forest-600 mb-4">Medium Risk</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <p className="text-xs text-forest-500">
                  Based on current market conditions and portfolio exposure
                </p>
              </CardContent>
            </Card>

            {/* Alert Summary */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">High Severity</span>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Medium Severity</span>
                  <Badge variant="secondary">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-forest-600">Low Severity</span>
                  <Badge variant="default">1</Badge>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-forest-200">
                  <span className="text-forest-600 font-medium">Total Active</span>
                  <Badge variant="outline">4</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Risk Report
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Update Alert Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Run Stress Test
                </Button>
                <Button className="w-full justify-start text-sm bg-forest-600 hover:bg-forest-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Protocols
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRiskFeed;
