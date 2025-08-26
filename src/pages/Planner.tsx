
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Target, Plus, CheckCircle2, Circle, Flag, Users, Brain, Zap } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Market Research: AI Healthcare Trends",
    description: "Analyze emerging AI applications in healthcare sector for Q2 investment decisions",
    dueDate: "2024-02-15",
    priority: "high",
    status: "in-progress",
    category: "Research",
    aiGenerated: true,
    estimatedTime: "4 hours",
    dependencies: []
  },
  {
    id: 2,
    title: "Portfolio Rebalancing Analysis",
    description: "Review current allocation and propose adjustments based on risk metrics",
    dueDate: "2024-02-12",
    priority: "high",
    status: "pending",
    category: "Portfolio Management",
    aiGenerated: false,
    estimatedTime: "2 hours",
    dependencies: [1]
  },
  {
    id: 3,
    title: "Quarterly Risk Assessment Report",
    description: "Compile comprehensive risk analysis for stakeholder presentation",
    dueDate: "2024-02-20",
    priority: "medium",
    status: "pending",
    category: "Reporting",
    aiGenerated: true,
    estimatedTime: "6 hours",
    dependencies: [1, 2]
  },
  {
    id: 4,
    title: "Client Meeting: Investment Strategy Review",
    description: "Present updated investment recommendations to high-net-worth clients",
    dueDate: "2024-02-18",
    priority: "high",
    status: "completed",
    category: "Client Relations",
    aiGenerated: false,
    estimatedTime: "3 hours",
    dependencies: [2]
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Fed Interest Rate Decision",
    date: "2024-02-14",
    time: "14:00",
    type: "Market Event",
    impact: "High"
  },
  {
    id: 2,
    title: "Earnings Call: NVIDIA",
    date: "2024-02-15",
    time: "17:00",
    type: "Earnings",
    impact: "Medium"
  },
  {
    id: 3,
    title: "Team Strategy Meeting",
    date: "2024-02-16",
    time: "10:00",
    type: "Internal",
    impact: "Low"
  }
];

const Planner = () => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const categories = ["all", "Research", "Portfolio Management", "Reporting", "Client Relations"];
  
  const filteredTasks = tasks.filter(task => 
    selectedCategory === "all" || task.category === selectedCategory
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Circle className="w-4 h-4 text-blue-600 fill-blue-200" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-space font-bold text-forest-900">AI Research Planner</h1>
            <p className="text-forest-600">Intelligent task management and research planning</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="border-forest-300"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button className="bg-forest-600 hover:bg-forest-700">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-forest-600" />
                <div>
                  <p className="text-sm text-forest-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-forest-900">
                    {tasks.filter(t => t.status !== 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-forest-600">High Priority</p>
                  <p className="text-2xl font-bold text-forest-900">
                    {tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-forest-600">AI Generated</p>
                  <p className="text-2xl font-bold text-forest-900">
                    {tasks.filter(t => t.aiGenerated).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-forest-600">Completed</p>
                  <p className="text-2xl font-bold text-forest-900">
                    {tasks.filter(t => t.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* AI Assistant Panel */}
            {showAIAssistant && (
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Brain className="w-5 h-5" />
                    AI Research Assistant
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Get intelligent suggestions for your research planning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">🎯 Suggested Tasks</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• Analyze cryptocurrency market trends for institutional adoption</li>
                      <li>• Research ESG impact on portfolio performance metrics</li>
                      <li>• Study correlation between AI stocks and traditional tech indices</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">⚡ Quick Insights</h4>
                    <p className="text-sm text-blue-800">
                      Based on your portfolio, consider researching renewable energy ETFs. 
                      Market sentiment is shifting toward clean energy investments.
                    </p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Research Plan
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Task List */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-forest-900">Research Tasks</CardTitle>
                  <div className="flex gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-forest-600 hover:bg-forest-700" : ""}
                      >
                        {category === "all" ? "All" : category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-semibold text-forest-900">{task.title}</h3>
                        {task.aiGenerated && (
                          <Badge variant="outline" className="border-blue-300 text-blue-700">
                            <Brain className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-forest-600 text-sm mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-forest-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Est: {task.estimatedTime}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>

                    {task.dependencies.length > 0 && (
                      <div className="text-xs text-forest-500 mb-2">
                        Dependencies: Task {task.dependencies.join(", Task ")}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          Edit
                        </Button>
                        {task.status !== 'completed' && (
                          <Button size="sm" className="h-7 text-xs bg-forest-600 hover:bg-forest-700">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      <div className="text-xs text-forest-400">
                        ID: {task.id}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Task */}
                <div className="border-2 border-dashed border-forest-300 rounded-lg p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new research task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1"
                    />
                    <Button className="bg-forest-600 hover:bg-forest-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Calendar Events */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-forest-50 hover:bg-forest-100 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-forest-900 text-sm">{event.title}</h4>
                      <Badge 
                        variant={event.impact === 'High' ? 'destructive' : event.impact === 'Medium' ? 'secondary' : 'default'}
                        className="text-xs"
                      >
                        {event.impact}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-forest-600">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.time}</span>
                      <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Research Progress */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Research Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-forest-600">This Week</span>
                    <span className="text-forest-900 font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-forest-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-forest-600">This Month</span>
                    <span className="text-forest-900 font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-forest-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-forest-200">
                  <div className="text-sm text-forest-600 mb-2">Goals This Quarter</div>
                  <ul className="space-y-1 text-xs text-forest-500">
                    <li>✓ Complete 12 market research reports</li>
                    <li>✓ Analyze 5 emerging sectors</li>
                    <li>• Present 3 investment strategies</li>
                    <li>• Conduct 8 risk assessments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-forest-900">
                  <Zap className="w-5 h-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Consider researching quantum computing stocks - showing 23% increased mentions in financial reports.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    📈 Your research velocity is 15% above average this month. Great progress!
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ 3 high-priority tasks due this week. Consider reallocating time resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
