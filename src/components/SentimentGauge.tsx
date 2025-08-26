
import { Gauge, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function SentimentGauge() {
  const momentum = 82; // High
  const viability = 68; // Medium-High
  const confidence = 75; // High
  const investment = 71; // Growing
  const readiness = 58; // Moderate
  
  const createGaugeArc = (value: number, color: string) => {
    const angle = (value / 100) * 180;
    const radians = (angle * Math.PI) / 180;
    const x = 50 + 35 * Math.cos(radians - Math.PI);
    const y = 50 - 35 * Math.sin(radians - Math.PI);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M 15 50 A 35 35 0 ${largeArcFlag} 1 ${x} ${y}`;
  };

  const getGaugeColor = (value: number) => {
    if (value >= 80) return '#0d2420'; // Dark forest
    if (value >= 60) return '#57ab9b'; // Medium forest
    if (value >= 40) return '#e8d0c4'; // Cream
    return '#d4b5a3'; // Light cream
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (current < previous) return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-500" />;
  };

  const metrics = [
    { 
      label: 'Market Confidence', 
      value: confidence, 
      previous: 68, 
      status: 'Strong',
      description: 'Investor and market sentiment'
    },
    { 
      label: 'Investment Interest', 
      value: investment, 
      previous: 65, 
      status: 'Growing',
      description: 'Funding and VC activity'
    },
    { 
      label: 'Technical Readiness', 
      value: readiness, 
      previous: 52, 
      status: 'Moderate',
      description: 'Technology maturity level'
    },
  ];
  
  return (
    <Card className="chart-container animate-scale-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-forest-600" />
            <CardTitle className="font-space text-forest-900">Market Sentiment</CardTitle>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-forest-700">Overall Score</p>
            <p className="text-2xl font-bold text-forest-900">{Math.round((momentum + viability) / 2)}</p>
          </div>
        </div>
        <CardDescription className="text-forest-600">
          Research momentum and commercial viability indicators
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main gauges */}
        <div className="grid grid-cols-2 gap-6">
          {/* Research Momentum Gauge */}
          <div className="text-center space-y-3">
            <div className="relative">
              <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 60">
                {/* Background arc */}
                <path
                  d="M 15 50 A 35 35 0 0 1 85 50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Value arc with gradient */}
                <defs>
                  <linearGradient id="momentumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#57ab9b" />
                    <stop offset="100%" stopColor="#0d2420" />
                  </linearGradient>
                </defs>
                <path
                  d={createGaugeArc(momentum, '#0d2420')}
                  fill="none"
                  stroke="url(#momentumGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="drop-shadow-sm"
                />
                {/* Center text */}
                <text x="50" y="45" textAnchor="middle" className="text-lg font-bold fill-forest-900">
                  {momentum}%
                </text>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-forest-900">Research Momentum</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <p className="text-xs text-forest-600">High</p>
                {getTrendIcon(momentum, 78)}
              </div>
            </div>
          </div>
          
          {/* Commercial Viability Gauge */}
          <div className="text-center space-y-3">
            <div className="relative">
              <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 60">
                {/* Background arc */}
                <path
                  d="M 15 50 A 35 35 0 0 1 85 50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Value arc */}
                <defs>
                  <linearGradient id="viabilityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8d0c4" />
                    <stop offset="100%" stopColor="#d4b5a3" />
                  </linearGradient>
                </defs>
                <path
                  d={createGaugeArc(viability, '#e8d0c4')}
                  fill="none"
                  stroke="url(#viabilityGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="drop-shadow-sm"
                />
                {/* Center text */}
                <text x="50" y="45" textAnchor="middle" className="text-lg font-bold fill-forest-900">
                  {viability}%
                </text>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-forest-900">Commercial Viability</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <p className="text-xs text-forest-600">Medium-High</p>
                {getTrendIcon(viability, 65)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-forest-800 mb-3">Detailed Analysis</h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-forest-700">{metric.label}</span>
                  {getTrendIcon(metric.value, metric.previous)}
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-forest-900">{metric.status}</span>
                  <p className="text-xs text-forest-600">{metric.value}%</p>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={metric.value} 
                  className="h-2 bg-gray-200"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${metric.value}%`,
                    backgroundColor: getGaugeColor(metric.value)
                  }}
                />
              </div>
              <p className="text-xs text-forest-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Key insights */}
        <div className="bg-gradient-to-r from-forest-50/50 to-cream-50/50 p-4 rounded-lg border border-forest-200/30">
          <h5 className="font-semibold text-sm text-forest-800 mb-2">Key Insights</h5>
          <ul className="text-xs text-forest-600 space-y-1">
            <li>• Strong research momentum driven by breakthrough in solid-state technology</li>
            <li>• Growing commercial interest with major automotive partnerships</li>
            <li>• Technical challenges remain in manufacturing scalability</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
