
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function PublicationTrends() {
  // More realistic publication data
  const data = [
    { year: '2018', lithiumIon: 1250, solidState: 180, flowBatteries: 420, total: 1850 },
    { year: '2019', lithiumIon: 1380, solidState: 280, flowBatteries: 480, total: 2140 },
    { year: '2020', lithiumIon: 1580, solidState: 420, flowBatteries: 520, total: 2520 },
    { year: '2021', lithiumIon: 1720, solidState: 680, flowBatteries: 580, total: 2980 },
    { year: '2022', lithiumIon: 1650, solidState: 950, flowBatteries: 640, total: 3240 },
    { year: '2023', lithiumIon: 1580, solidState: 1350, flowBatteries: 680, total: 3610 },
    { year: '2024', lithiumIon: 1520, solidState: 1820, flowBatteries: 720, total: 4060 },
  ];

  const chartConfig = {
    lithiumIon: {
      label: "Lithium-ion",
      color: "#0d2420",
    },
    solidState: {
      label: "Solid-state",
      color: "#e8d0c4",
    },
    flowBatteries: {
      label: "Flow Batteries",
      color: "#57ab9b",
    },
  };

  // Growth rates for insights
  const solidStateGrowth = ((1820 - 180) / 180 * 100).toFixed(0);
  const lithiumDecline = ((1520 - 1250) / 1250 * 100).toFixed(0);

  return (
    <Card className="chart-container animate-scale-in hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-forest-600" />
            <CardTitle className="font-space text-forest-900">Publication Trends</CardTitle>
          </div>
          <div className="text-right">
            <p className="text-sm text-forest-600">2018-2024</p>
            <p className="text-xs text-forest-500">Research Papers Published</p>
          </div>
        </div>
        <CardDescription className="text-forest-600">
          Energy storage research evolution over the past 7 years
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main chart */}
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="lithiumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d2420" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d2420" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="solidStateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e8d0c4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#e8d0c4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#57ab9b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#57ab9b" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="year" 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
              />
              
              <Area
                type="monotone"
                dataKey="lithiumIon"
                stackId="1"
                stroke="#0d2420"
                strokeWidth={2}
                fill="url(#lithiumGradient)"
              />
              <Area
                type="monotone"
                dataKey="solidState"
                stackId="1"
                stroke="#d4b5a3"
                strokeWidth={2}
                fill="url(#solidStateGradient)"
              />
              <Area
                type="monotone"
                dataKey="flowBatteries"
                stackId="1"
                stroke="#57ab9b"
                strokeWidth={2}
                fill="url(#flowGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Insights cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-forest-50 to-forest-100/50 p-4 rounded-lg border border-forest-200/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-forest-600 rounded-full"></div>
              <span className="font-semibold text-forest-800 text-sm">Lithium-ion</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">1,520</p>
            <p className="text-xs text-forest-600">+{lithiumDecline}% since 2018</p>
            <p className="text-xs text-forest-500 mt-1">Mature technology</p>
          </div>

          <div className="bg-gradient-to-r from-cream-50 to-cream-100/50 p-4 rounded-lg border border-cream-200/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-cream-600 rounded-full"></div>
              <span className="font-semibold text-forest-800 text-sm">Solid-state</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">1,820</p>
            <p className="text-xs text-green-600">+{solidStateGrowth}% since 2018</p>
            <p className="text-xs text-forest-500 mt-1">Emerging leader</p>
          </div>

          <div className="bg-gradient-to-r from-forest-100/50 to-forest-50 p-4 rounded-lg border border-forest-200/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-forest-400 rounded-full"></div>
              <span className="font-semibold text-forest-800 text-sm">Flow Batteries</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">720</p>
            <p className="text-xs text-forest-600">+71% since 2018</p>
            <p className="text-xs text-forest-500 mt-1">Steady growth</p>
          </div>
        </div>

        {/* Research focus indicators */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-xs font-medium">
            🔋 Next-gen batteries
          </span>
          <span className="px-3 py-1 bg-cream-100 text-forest-700 rounded-full text-xs font-medium">
            ⚡ Fast charging
          </span>
          <span className="px-3 py-1 bg-forest-50 text-forest-700 rounded-full text-xs font-medium">
            🌱 Sustainability
          </span>
          <span className="px-3 py-1 bg-orange-50 text-forest-700 rounded-full text-xs font-medium">
            🏭 Manufacturing
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
