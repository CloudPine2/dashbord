
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, Server, Database, Wifi, Cpu, HardDrive, Network, 
  Monitor, Smartphone, Tablet, Globe, Cloud, Shield, AlertTriangle, 
  CheckCircle, XCircle, Clock, RefreshCw, Settings, Zap, TrendingUp, 
  TrendingDown, Minus, BarChart3, PieChart, LineChart, Gauge, 
  Thermometer, Target, Users, Lock, Unlock, Key, AlertCircle,
  WifiOff, ServerCrash, DatabaseIcon, HardDriveIcon, MemoryStick,
  Fan, Temperature, Battery, Power, WifiIcon, Signal, SignalHigh,
  SignalMedium, SignalLow, WifiIcon as WifiIcon2, Play, Pause
} from 'lucide-react';

// Mock data for system health monitoring
const mockSystemMetrics = {
  cpu: {
    usage: 45.2,
    cores: 16,
    temperature: 65,
    frequency: 3.2,
    load: [2.1, 1.8, 2.3, 1.9, 2.0, 2.2, 1.7, 2.4],
    status: 'healthy',
    trend: 'stable'
  },
  memory: {
    total: 32,
    used: 21.4,
    available: 10.6,
    usage: 66.9,
    swap: 8.2,
    status: 'normal',
    trend: 'increasing'
  },
  storage: {
    total: 2000,
    used: 1560,
    available: 440,
    usage: 78.0,
    iops: 1250,
    latency: 2.3,
    status: 'warning',
    trend: 'increasing'
  },
  network: {
    bandwidth: 125,
    latency: 45,
    packetLoss: 0.1,
    throughput: 850,
    connections: 1250,
    status: 'good',
    trend: 'stable'
  },
  gpu: {
    usage: 23.5,
    memory: 8,
    temperature: 58,
    fanSpeed: 45,
    status: 'healthy',
    trend: 'stable'
  },
  power: {
    consumption: 450,
    efficiency: 92.5,
    temperature: 42,
    status: 'healthy',
    trend: 'stable'
  }
};

const mockSystemStatus = {
  overall: 'healthy',
  uptime: '15 days, 8 hours, 32 minutes',
  lastUpdate: '2 seconds ago',
  alerts: 3,
  warnings: 7,
  critical: 0,
  services: {
    web: 'running',
    database: 'running',
    cache: 'running',
    queue: 'running',
    monitoring: 'running',
    backup: 'idle'
  }
};

const mockPerformanceHistory = {
  cpu: [
    { time: '00:00', usage: 42, temperature: 63 },
    { time: '04:00', usage: 38, temperature: 61 },
    { time: '08:00', usage: 67, temperature: 72 },
    { time: '12:00', usage: 89, temperature: 78 },
    { time: '16:00', usage: 76, temperature: 74 },
    { time: '20:00', usage: 58, temperature: 68 },
    { time: '24:00', usage: 45, temperature: 65 }
  ],
  memory: [
    { time: '00:00', usage: 64, available: 11.5 },
    { time: '04:00', usage: 61, available: 12.4 },
    { time: '08:00', usage: 78, available: 7.0 },
    { time: '12:00', usage: 85, available: 4.8 },
    { time: '16:00', usage: 82, available: 5.8 },
    { time: '20:00', usage: 71, available: 9.3 },
    { time: '24:00', usage: 66, available: 10.6 }
  ],
  network: [
    { time: '00:00', bandwidth: 98, latency: 38 },
    { time: '04:00', bandwidth: 45, latency: 42 },
    { time: '08:00', bandwidth: 156, latency: 52 },
    { time: '12:00', bandwidth: 234, latency: 67 },
    { time: '16:00', bandwidth: 198, latency: 58 },
    { time: '20:00', bandwidth: 167, latency: 49 },
    { time: '24:00', bandwidth: 125, latency: 45 }
  ]
};

const mockSystemAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Memory usage has exceeded 80% threshold',
    timestamp: '2 minutes ago',
    severity: 'medium',
    status: 'active'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Storage Space Low',
    message: 'Available storage space is below 20%',
    timestamp: '15 minutes ago',
    severity: 'medium',
    status: 'active'
  },
  {
    id: 3,
    type: 'info',
    title: 'Backup Completed',
    message: 'Daily backup completed successfully',
    timestamp: '1 hour ago',
    severity: 'low',
    status: 'resolved'
  },
  {
    id: 4,
    type: 'critical',
    title: 'Database Connection Lost',
    message: 'Primary database connection timeout',
    timestamp: '3 hours ago',
    severity: 'high',
    status: 'resolved'
  }
];

const mockServiceHealth = [
  {
    name: 'Web Server',
    status: 'healthy',
    uptime: '99.98%',
    responseTime: 45,
    requests: 1250,
    errors: 2,
    lastCheck: '5 seconds ago'
  },
  {
    name: 'Database',
    status: 'healthy',
    uptime: '99.95%',
    responseTime: 12,
    queries: 8900,
    errors: 0,
    lastCheck: '3 seconds ago'
  },
  {
    name: 'Cache Service',
    status: 'healthy',
    uptime: '99.99%',
    responseTime: 3,
    hits: 15600,
    errors: 0,
    lastCheck: '1 second ago'
  },
  {
    name: 'Queue Worker',
    status: 'warning',
    uptime: '98.5%',
    responseTime: 89,
    jobs: 450,
    errors: 12,
    lastCheck: '10 seconds ago'
  },
  {
    name: 'Monitoring',
    status: 'healthy',
    uptime: '100%',
    responseTime: 5,
    checks: 1250,
    errors: 0,
    lastCheck: '1 second ago'
  }
];

const mockResourceUtilization = {
  processes: [
    { name: 'nginx', pid: 1234, cpu: 2.1, memory: 45.2, status: 'running' },
    { name: 'mysql', pid: 1235, cpu: 8.7, memory: 234.1, status: 'running' },
    { name: 'redis', pid: 1236, cpu: 1.2, memory: 12.8, status: 'running' },
    { name: 'node', pid: 1237, cpu: 15.3, memory: 89.4, status: 'running' },
    { name: 'python', pid: 1238, cpu: 3.8, memory: 67.2, status: 'running' }
  ],
  diskUsage: [
    { path: '/', total: 500, used: 380, available: 120, usage: 76.0 },
    { path: '/home', total: 1000, used: 450, available: 550, usage: 45.0 },
    { path: '/var', total: 300, used: 280, available: 20, usage: 93.3 },
    { path: '/tmp', total: 200, used: 50, available: 150, usage: 25.0 }
  ]
};

const SystemHealth = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [systemMetrics, setSystemMetrics] = useState(mockSystemMetrics);
  const [systemStatus, setSystemStatus] = useState(mockSystemStatus);
  const [performanceHistory, setPerformanceHistory] = useState(mockPerformanceHistory);
  const [systemAlerts, setSystemAlerts] = useState(mockSystemAlerts);
  const [serviceHealth, setServiceHealth] = useState(mockServiceHealth);

  // Real-time updates simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setSystemMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.max(20, Math.min(95, prev.cpu.usage + (Math.random() - 0.5) * 10)),
          temperature: Math.max(50, Math.min(85, prev.cpu.temperature + (Math.random() - 0.5) * 5))
        },
        memory: {
          ...prev.memory,
          usage: Math.max(50, Math.min(90, prev.memory.usage + (Math.random() - 0.5) * 8))
        },
        network: {
          ...prev.network,
          latency: Math.max(30, Math.min(80, prev.network.latency + (Math.random() - 0.5) * 10))
        }
      }));

      setLastUpdate(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isLive, refreshInterval]);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
      case 'running':
        return 'bg-green-100 text-green-700';
      case 'warning':
      case 'normal':
        return 'bg-yellow-100 text-yellow-700';
      case 'critical':
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'idle':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'critical': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-blue-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good':
      case 'running':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
      case 'normal':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical':
      case 'error':
        return <XCircle className="w-5 h-4 text-red-600" />;
      case 'idle':
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (uptime: string) => {
    return uptime;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header with Live Status */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">System Health</h1>
            <p className="text-forest-600">Real-time system monitoring and performance analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-forest-600">
                {isLive ? 'Live' : 'Paused'} • Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={isLive ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}
            >
              {isLive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isLive ? 'Pause' : 'Resume'}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {getStatusIcon(systemStatus.overall)}
              </div>
              <h3 className="font-semibold text-forest-900">Overall Status</h3>
              <Badge className={getStatusColor(systemStatus.overall)}>
                {systemStatus.overall}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Uptime</h3>
              <p className="text-sm text-forest-600">{systemStatus.uptime}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Active Alerts</h3>
              <p className="text-sm text-forest-600">{systemStatus.alerts} alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <Activity className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Last Update</h3>
              <p className="text-sm text-forest-600">{systemStatus.lastUpdate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Cpu className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">CPU Usage</h3>
              <div className="text-2xl font-bold text-forest-900 mb-2">{systemMetrics.cpu.usage.toFixed(1)}%</div>
              <Progress value={systemMetrics.cpu.usage} className="h-2 mb-2" />
              <div className="flex items-center justify-center gap-1 text-xs text-forest-500">
                <span>🌡️ {systemMetrics.cpu.temperature}°C</span>
                <span>⚡ {systemMetrics.cpu.frequency}GHz</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <MemoryStick className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Memory</h3>
              <div className="text-2xl font-bold text-forest-900 mb-2">{systemMetrics.memory.usage.toFixed(1)}%</div>
              <Progress value={systemMetrics.memory.usage} className="h-2 mb-2" />
              <div className="flex items-center justify-center gap-1 text-xs text-forest-500">
                <span>📊 {systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <HardDrive className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Storage</h3>
              <div className="text-2xl font-bold text-forest-900 mb-2">{systemMetrics.storage.usage.toFixed(1)}%</div>
              <Progress value={systemMetrics.storage.usage} className="h-2 mb-2" />
              <div className="flex items-center justify-center gap-1 text-xs text-forest-500">
                <span>💾 {systemMetrics.storage.used}GB / {systemMetrics.storage.total}GB</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Network className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Network</h3>
              <div className="text-2xl font-bold text-forest-900 mb-2">{systemMetrics.network.latency}ms</div>
              <div className="flex items-center justify-center gap-1 text-xs text-forest-500">
                <span>📡 {systemMetrics.network.bandwidth} Mbps</span>
                <span>📊 {systemMetrics.network.throughput} MB/s</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">System Performance</CardTitle>
                  <CardDescription>Real-time performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-forest-900">CPU Load Average</span>
                      <span className="text-sm text-forest-600">{systemMetrics.cpu.load.slice(-3).join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-forest-900">Memory Available</span>
                      <span className="text-sm text-forest-600">{systemMetrics.memory.available} GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-forest-900">Storage Available</span>
                      <span className="text-sm text-forest-600">{systemMetrics.storage.available} GB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-forest-900">Network Connections</span>
                      <span className="text-sm text-forest-600">{systemMetrics.network.connections}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Service Status</CardTitle>
                  <CardDescription>Key service health indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(systemStatus.services).map(([service, status]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-forest-900 capitalize">{service}</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          <Badge className={getStatusColor(status)}>
                            {status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">CPU Performance</CardTitle>
                  <CardDescription>24-hour CPU usage and temperature trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceHistory.cpu.map((point, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-forest-600">{point.time}</span>
                          <div className="flex gap-4">
                            <span className="text-blue-600">Usage: {point.usage}%</span>
                            <span className="text-red-600">Temp: {point.temperature}°C</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div 
                            className="bg-blue-200 rounded" 
                            style={{ width: `${point.usage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Memory Performance</CardTitle>
                  <CardDescription>24-hour memory usage trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceHistory.memory.map((point, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-forest-600">{point.time}</span>
                          <div className="flex gap-4">
                            <span className="text-green-600">Usage: {point.usage}%</span>
                            <span className="text-blue-600">Available: {point.available}GB</span>
                          </div>
                        </div>
                        <div className="flex gap-1 h-3">
                          <div 
                            className="bg-green-200 rounded" 
                            style={{ width: `${point.usage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Performance */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Network Performance</CardTitle>
                <CardDescription>24-hour network bandwidth and latency trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceHistory.network.map((point, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-forest-600">{point.time}</span>
                        <div className="flex gap-4">
                          <span className="text-purple-600">Bandwidth: {point.bandwidth} Mbps</span>
                          <span className="text-orange-600">Latency: {point.latency}ms</span>
                        </div>
                      </div>
                      <div className="flex gap-1 h-3">
                        <div 
                          className="bg-purple-200 rounded" 
                          style={{ width: `${(point.bandwidth / 250) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Service Health Dashboard</CardTitle>
                <CardDescription>Real-time service status and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceHealth.map((service, index) => (
                    <div key={index} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-forest-900">{service.name}</h4>
                          {getStatusIcon(service.status)}
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-forest-500">
                          Last check: {service.lastCheck}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-forest-500">Uptime:</span>
                          <div className="font-medium text-forest-900">{service.uptime}</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Response Time:</span>
                          <div className="font-medium text-forest-900">{service.responseTime}ms</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Requests/Queries:</span>
                          <div className="font-medium text-forest-900">{service.requests || service.queries || service.hits || service.jobs || service.checks}</div>
                        </div>
                        <div>
                          <span className="text-forest-500">Errors:</span>
                          <div className="font-medium text-forest-900">{service.errors}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">System Alerts & Notifications</CardTitle>
                <CardDescription>Active alerts and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-forest-50 rounded-lg border border-forest-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-forest-900 mb-1">{alert.title}</h4>
                          <p className="text-sm text-forest-600 mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span>⏰ {alert.timestamp}</span>
                            <span>📊 {alert.severity} severity</span>
                            <span>📈 {alert.status}</span>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Process Monitoring</CardTitle>
                  <CardDescription>Active processes and resource usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResourceUtilization.processes.map((process, index) => (
                      <div key={index} className="p-3 bg-forest-50 rounded-lg border border-forest-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-forest-900">{process.name}</h5>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              PID: {process.pid}
                            </Badge>
                          </div>
                          <Badge className={getStatusColor(process.status)}>
                            {process.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-forest-500">CPU:</span>
                            <div className="font-medium text-forest-900">{process.cpu}%</div>
                          </div>
                          <div>
                            <span className="text-forest-500">Memory:</span>
                            <div className="font-medium text-forest-900">{process.memory} MB</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Disk Usage</CardTitle>
                  <CardDescription>Storage utilization by mount point</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResourceUtilization.diskUsage.map((disk, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-forest-600">{disk.path}</span>
                          <div className="flex gap-4">
                            <span className="text-blue-600">{disk.used}GB / {disk.total}GB</span>
                            <span className="text-green-600">{disk.available}GB free</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-forest-500">
                            <span>Usage: {disk.usage}%</span>
                          </div>
                          <Progress value={disk.usage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">System Health Trends</CardTitle>
                  <CardDescription>Weekly system health score trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between h-32">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-forest-600 rounded-t"
                          style={{ height: `${Math.random() * 30 + 70}%` }}
                        ></div>
                        <span className="text-xs text-forest-600 mt-1">{day}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Resource Utilization</CardTitle>
                  <CardDescription>Current resource allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forest-600">CPU Cores</span>
                        <span className="text-forest-900">{systemMetrics.cpu.cores} cores</span>
                      </div>
                      <Progress value={(systemMetrics.cpu.usage / 100) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forest-600">Memory</span>
                        <span className="text-forest-900">{systemMetrics.memory.total} GB</span>
                      </div>
                      <Progress value={(systemMetrics.memory.usage / 100) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forest-600">Storage</span>
                        <span className="text-forest-900">{systemMetrics.storage.total} GB</span>
                      </div>
                      <Progress value={(systemMetrics.storage.usage / 100) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemHealth;
