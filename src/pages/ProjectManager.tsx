
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FolderOpen, Plus, Calendar, Users, Target, Clock, CheckCircle, AlertTriangle, 
  TrendingUp, BarChart3, Settings, RefreshCw, Save, Edit, Trash2, Share2, 
  Bookmark, Star, Zap, Lightbulb, Database, FileText, Link, Tag, Hash,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Search, Eye, Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockProjects = [
  {
    id: 1,
    name: "AI Healthcare Research Project",
    description: "Comprehensive study on AI applications in modern healthcare systems",
    status: "active",
    priority: "high",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    team: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Rodriguez"],
    category: "Technology",
    budget: 50000,
    spent: 37500,
    tasks: [
      { id: 1, name: "Literature Review", status: "completed", priority: "high", assignee: "Dr. Sarah Johnson", dueDate: "2024-02-15" },
      { id: 2, name: "Data Collection", status: "in-progress", priority: "medium", assignee: "Prof. Michael Chen", dueDate: "2024-03-30" },
      { id: 3, name: "Model Development", status: "pending", priority: "high", assignee: "Dr. Emily Rodriguez", dueDate: "2024-05-15" },
      { id: 4, name: "Testing & Validation", status: "pending", priority: "medium", assignee: "Dr. Sarah Johnson", dueDate: "2024-06-15" }
    ],
    milestones: [
      { id: 1, name: "Research Proposal Approved", date: "2024-01-15", status: "completed" },
      { id: 2, name: "Initial Data Collection", date: "2024-03-30", status: "in-progress" },
      { id: 3, name: "Prototype Development", date: "2024-05-15", status: "pending" },
      { id: 4, name: "Final Report", date: "2024-06-30", status: "pending" }
    ],
    tags: ["AI", "Healthcare", "Machine Learning", "Research"],
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    name: "Climate Change Impact Study",
    description: "Analysis of climate change effects on coastal ecosystems",
    status: "planning",
    priority: "medium",
    progress: 25,
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    team: ["Dr. David Kim", "Prof. Lisa Thompson", "Dr. James Wilson"],
    category: "Environment",
    budget: 75000,
    spent: 18750,
    tasks: [
      { id: 1, name: "Site Selection", status: "completed", priority: "medium", assignee: "Dr. David Kim", dueDate: "2024-03-15" },
      { id: 2, name: "Equipment Setup", status: "in-progress", priority: "high", assignee: "Prof. Lisa Thompson", dueDate: "2024-04-01" },
      { id: 3, name: "Data Collection", status: "pending", priority: "high", assignee: "Dr. James Wilson", dueDate: "2024-05-01" },
      { id: 4, name: "Analysis & Reporting", status: "pending", priority: "medium", assignee: "Dr. David Kim", dueDate: "2024-12-15" }
    ],
    milestones: [
      { id: 1, name: "Project Planning", date: "2024-03-01", status: "completed" },
      { id: 2, name: "Site Preparation", date: "2024-04-01", status: "in-progress" },
      { id: 3, name: "Field Research", date: "2024-06-01", status: "pending" },
      { id: 4, name: "Final Analysis", date: "2024-12-31", status: "pending" }
    ],
    tags: ["Climate", "Ecosystems", "Research", "Field Study"],
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    name: "Blockchain Financial Innovation",
    description: "Research on blockchain applications in financial services",
    status: "completed",
    priority: "low",
    progress: 100,
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    team: ["Dr. Alex Brown", "Prof. Maria Garcia"],
    category: "Finance",
    budget: 30000,
    spent: 30000,
    tasks: [
      { id: 1, name: "Market Research", status: "completed", priority: "medium", assignee: "Dr. Alex Brown", dueDate: "2023-10-15" },
      { id: 2, name: "Technology Analysis", status: "completed", priority: "high", assignee: "Prof. Maria Garcia", dueDate: "2023-12-01" },
      { id: 3, name: "Prototype Development", status: "completed", priority: "high", assignee: "Dr. Alex Brown", dueDate: "2024-01-15" },
      { id: 4, name: "Final Report", status: "completed", priority: "medium", assignee: "Prof. Maria Garcia", dueDate: "2024-02-28" }
    ],
    milestones: [
      { id: 1, name: "Research Initiation", date: "2023-09-01", status: "completed" },
      { id: 2, name: "Technology Assessment", date: "2023-12-01", status: "completed" },
      { id: 3, name: "Prototype Complete", date: "2024-01-15", status: "completed" },
      { id: 4, name: "Project Delivery", date: "2024-02-28", status: "completed" }
    ],
    tags: ["Blockchain", "FinTech", "Innovation", "Research"],
    lastUpdated: "1 week ago"
  }
];

const mockTeamMembers = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Principal Investigator", email: "sarah.johnson@university.edu", avatar: "SJ", status: "online" },
  { id: 2, name: "Prof. Michael Chen", role: "Co-Investigator", email: "michael.chen@university.edu", avatar: "MC", status: "online" },
  { id: 3, name: "Dr. Emily Rodriguez", role: "Research Associate", email: "emily.rodriguez@university.edu", avatar: "ER", status: "away" },
  { id: 4, name: "Dr. David Kim", role: "Research Scientist", email: "david.kim@university.edu", avatar: "DK", status: "offline" },
  { id: 5, name: "Prof. Lisa Thompson", role: "Senior Researcher", email: "lisa.thompson@university.edu", avatar: "LT", status: "online" }
];

const mockProjectAnalytics = {
  totalProjects: 12,
  activeProjects: 8,
  completedProjects: 3,
  planningProjects: 1,
  totalBudget: 450000,
  totalSpent: 287500,
  averageProgress: 68,
  upcomingDeadlines: [
    { project: "AI Healthcare Research", task: "Data Collection", dueDate: "2024-03-30", assignee: "Prof. Michael Chen" },
    { project: "Climate Change Impact Study", task: "Equipment Setup", dueDate: "2024-04-01", assignee: "Prof. Lisa Thompson" },
    { project: "AI Healthcare Research", task: "Model Development", dueDate: "2024-05-15", assignee: "Dr. Emily Rodriguez" }
  ],
  teamWorkload: [
    { member: "Dr. Sarah Johnson", projects: 3, tasks: 8, workload: 85 },
    { member: "Prof. Michael Chen", projects: 2, tasks: 6, workload: 70 },
    { member: "Dr. Emily Rodriguez", projects: 2, tasks: 5, workload: 60 },
    { member: "Dr. David Kim", projects: 1, tasks: 4, workload: 45 },
    { member: "Prof. Lisa Thompson", projects: 1, tasks: 3, workload: 35 }
  ]
};

const ProjectManager = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    category: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: '',
    team: []
  });
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'planning': return 'bg-yellow-100 text-yellow-700';
      case 'on-hold': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredProjects = projects.filter(project => {
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus;
    const categoryMatch = selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory;
    const searchMatch = searchQuery === '' || project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && categoryMatch && searchMatch;
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please provide a name for your project.",
        variant: "destructive"
      });
      return;
    }

    const project = {
      id: projects.length + 1,
      ...newProject,
      status: 'planning',
      progress: 0,
      tasks: [],
      milestones: [],
      tags: [],
      lastUpdated: 'Just now',
      spent: 0
    };

    setProjects([...projects, project]);
    setNewProject({
      name: '',
      description: '',
      category: '',
      priority: 'medium',
      startDate: '',
      endDate: '',
      budget: '',
      team: []
    });
    setShowNewProjectDialog(false);

    toast({
      title: "Project Created",
      description: `"${project.name}" has been created successfully.`,
    });
  };

  const handleDeleteProject = (projectId: number) => {
    const projectName = projects.find(p => p.id === projectId)?.name;
    setProjects(projects.filter(p => p.id !== projectId));
    
    toast({
      title: "Project Deleted",
      description: `"${projectName}" has been removed.`,
    });
  };

  const handleUpdateProgress = (projectId: number, newProgress: number) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, progress: newProgress } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Project Manager</h1>
            <p className="text-forest-600">Organize and manage research projects with advanced collaboration tools</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
              <DialogTrigger asChild>
                <Button className="bg-forest-600 hover:bg-forest-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>Set up a new research project with all necessary details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    />
                    <Select value={newProject.category} onValueChange={(value) => setNewProject({...newProject, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Environment">Environment</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Politics">Politics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="min-h-[100px]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="date"
                      placeholder="Start Date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    />
                    <Input
                      type="date"
                      placeholder="End Date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Budget"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateProject} className="bg-forest-600 hover:bg-forest-700">
                      <Save className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Active Projects</h3>
              <p className="text-sm text-forest-600">{mockProjectAnalytics.activeProjects} running</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Completed</h3>
              <p className="text-sm text-forest-600">{mockProjectAnalytics.completedProjects} finished</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Progress</h3>
              <p className="text-sm text-forest-600">{mockProjectAnalytics.averageProgress}% avg</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-forest-600 mb-2" />
              <h3 className="font-semibold text-forest-900">Budget</h3>
              <p className="text-sm text-forest-600">${(mockProjectAnalytics.totalSpent / 1000).toFixed(0)}k spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Content with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Summary */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Recent Projects</CardTitle>
                    <CardDescription>Latest project updates and progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredProjects.slice(0, 3).map((project) => (
                      <div key={project.id} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2">
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                            <Badge className={getPriorityColor(project.priority)}>
                              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-forest-500">
                            <Clock className="w-3 h-3" />
                            {project.lastUpdated}
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-forest-900 mb-2">{project.name}</h3>
                        <p className="text-forest-600 text-sm mb-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-forest-600">Progress</span>
                            <span className="font-medium text-forest-900">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-xs text-forest-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {project.team.length} members
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {project.startDate} - {project.endDate}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockProjectAnalytics.totalProjects}</div>
                      <div className="text-sm text-forest-600">Total Projects</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">${(mockProjectAnalytics.totalBudget / 1000).toFixed(0)}k</div>
                      <div className="text-sm text-forest-600">Total Budget</div>
                    </div>
                    <div className="text-center p-3 bg-forest-50 rounded-lg">
                      <div className="text-2xl font-bold text-forest-900">{mockProjectAnalytics.teamWorkload.length}</div>
                      <div className="text-sm text-forest-600">Team Members</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-900">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockProjectAnalytics.upcomingDeadlines.slice(0, 3).map((deadline, index) => (
                      <div key={index} className="p-2 bg-forest-50 rounded hover:bg-forest-100">
                        <div className="font-medium text-forest-900 text-sm">{deadline.task}</div>
                        <div className="text-xs text-forest-600">{deadline.project}</div>
                        <div className="text-xs text-forest-500">Due: {deadline.dueDate}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">All Projects</CardTitle>
                <CardDescription>Complete project list with detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="border border-forest-200 rounded-lg p-6 hover:bg-forest-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                          </Badge>
                          <Badge variant="secondary" className="bg-forest-100 text-forest-700">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-forest-900 mb-2">{project.name}</h3>
                      <p className="text-forest-600 mb-4">{project.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-forest-900">Progress</div>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="flex-1 h-2" />
                            <span className="text-sm font-medium text-forest-900">{project.progress}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-forest-900">Budget</div>
                          <div className="text-sm text-forest-600">
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-forest-900">Timeline</div>
                          <div className="text-sm text-forest-600">
                            {project.startDate} - {project.endDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-forest-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {project.team.join(', ')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {project.lastUpdated}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Project Tasks</CardTitle>
                <CardDescription>Manage and track individual project tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="border border-forest-200 rounded-lg p-4">
                      <h4 className="font-semibold text-forest-900 mb-3">{project.name}</h4>
                      <div className="space-y-2">
                        {project.tasks.map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Checkbox />
                              <div>
                                <div className="font-medium text-forest-900">{task.name}</div>
                                <div className="text-sm text-forest-600">Assigned to: {task.assignee}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <span className="text-sm text-forest-500">Due: {task.dueDate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Team Members</CardTitle>
                  <CardDescription>Current team composition and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-forest-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-forest-600 text-white rounded-full flex items-center justify-center font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-forest-900">{member.name}</div>
                          <div className="text-sm text-forest-600">{member.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          member.status === 'online' ? 'bg-green-500' : 
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Workload Distribution</CardTitle>
                  <CardDescription>Team member workload and project allocation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjectAnalytics.teamWorkload.map((workload, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-forest-900">{workload.member}</span>
                        <span className="text-sm text-forest-600">{workload.workload}%</span>
                      </div>
                      <Progress value={workload.workload} className="h-2" />
                      <div className="text-xs text-forest-500">
                        {workload.projects} projects, {workload.tasks} tasks
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Project Status Distribution</CardTitle>
                  <CardDescription>Overview of project statuses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{mockProjectAnalytics.activeProjects}</div>
                      <div className="text-sm text-green-600">Active</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{mockProjectAnalytics.completedProjects}</div>
                      <div className="text-sm text-blue-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-700">{mockProjectAnalytics.planningProjects}</div>
                      <div className="text-sm text-yellow-600">Planning</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-700">0</div>
                      <div className="text-sm text-gray-600">On Hold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-900">Budget Overview</CardTitle>
                  <CardDescription>Financial tracking and spending analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-700">Total Budget</span>
                      <span className="font-medium text-forest-900">${mockProjectAnalytics.totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-700">Total Spent</span>
                      <span className="font-medium text-forest-900">${mockProjectAnalytics.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-forest-700">Remaining</span>
                      <span className="font-medium text-forest-900">${(mockProjectAnalytics.totalBudget - mockProjectAnalytics.totalSpent).toLocaleString()}</span>
                    </div>
                    <Progress value={(mockProjectAnalytics.totalSpent / mockProjectAnalytics.totalBudget) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Trends */}
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900">Project Progress Trends</CardTitle>
                <CardDescription>Monthly progress tracking across all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                    <div key={month} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-forest-600 rounded-t"
                        style={{ height: `${(60 + index * 8) / 100 * 100}%` }}
                      ></div>
                      <span className="text-xs text-forest-600 mt-1">{month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectManager;
