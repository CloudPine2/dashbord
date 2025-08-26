
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, MessageSquare, Share2, Calendar, Search, Plus, 
  BookOpen, Lightbulb, Globe, Award, TrendingUp, FileText,
  MapPin, Clock, Star, MessageCircle, Heart, Eye, Download,
  Filter, SortAsc, Bell, Mail, Video, Phone, Link
} from 'lucide-react';

const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for research teams
  const researchTeams = [
    {
      id: 1,
      name: "Urban Renewable Energy Research Group",
      members: 12,
      projects: 5,
      expertise: ["Renewable Energy", "Urban Planning", "Sustainability"],
      avatar: "🌱",
      status: "active",
      location: "MIT, Cambridge",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "AI Ethics & Governance Consortium",
      members: 8,
      projects: 3,
      expertise: ["AI Ethics", "Policy", "Machine Learning"],
      avatar: "🤖",
      status: "active",
      location: "Stanford, CA",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Climate Change Adaptation Network",
      members: 15,
      projects: 7,
      expertise: ["Climate Science", "Adaptation", "Policy"],
      avatar: "🌍",
      status: "recruiting",
      location: "Global",
      lastActivity: "3 days ago"
    }
  ];

  // Mock data for active discussions
  const activeDiscussions = [
    {
      id: 1,
      title: "Best practices for interdisciplinary research collaboration",
      author: "Dr. Sarah Chen",
      institution: "Harvard University",
      replies: 24,
      views: 156,
      likes: 18,
      tags: ["Collaboration", "Methodology", "Interdisciplinary"],
      lastReply: "1 hour ago"
    },
    {
      id: 2,
      title: "Open source tools for research data management",
      author: "Prof. Michael Rodriguez",
      institution: "UC Berkeley",
      replies: 31,
      views: 203,
      likes: 25,
      tags: ["Open Source", "Data Management", "Tools"],
      lastReply: "3 hours ago"
    },
    {
      id: 3,
      title: "Funding opportunities for collaborative research projects",
      author: "Dr. Emily Watson",
      institution: "Oxford University",
      replies: 19,
      views: 98,
      likes: 12,
      tags: ["Funding", "Grants", "Collaboration"],
      lastReply: "5 hours ago"
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Research Collaboration Summit 2024",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      attendees: 150,
      type: "Conference",
      description: "Annual gathering of researchers, academics, and industry professionals"
    },
    {
      id: 2,
      title: "AI Research Workshop",
      date: "March 22, 2024",
      location: "Virtual",
      attendees: 75,
      type: "Workshop",
      description: "Hands-on workshop on AI research methodologies and collaboration"
    },
    {
      id: 3,
      title: "Sustainability Research Symposium",
      date: "April 5, 2024",
      location: "Boston, MA",
      attendees: 200,
      type: "Symposium",
      description: "Focus on sustainable development and environmental research"
    }
  ];

  // Mock data for shared resources
  const sharedResources = [
    {
      id: 1,
      title: "Research Methodology Handbook",
      author: "Dr. James Wilson",
      downloads: 234,
      rating: 4.8,
      type: "Handbook",
      tags: ["Methodology", "Research Design", "Guide"]
    },
    {
      id: 2,
      title: "Data Analysis Templates",
      author: "Prof. Lisa Thompson",
      downloads: 189,
      rating: 4.6,
      type: "Templates",
      tags: ["Data Analysis", "Templates", "Excel"]
    },
    {
      id: 3,
      title: "Collaboration Best Practices",
      author: "Dr. Robert Kim",
      downloads: 156,
      rating: 4.9,
      type: "Guide",
      tags: ["Collaboration", "Best Practices", "Teamwork"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Collaboration Hub</h1>
            <p className="text-forest-600">Connect with researchers, share insights, and build collaborative research networks</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Find Researchers
            </Button>
            <Button className="bg-forest-600 hover:bg-forest-700">
              <Plus className="w-4 h-4 mr-2" />
              Start Collaboration
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-forest-900">2,847</p>
                  <p className="text-sm text-forest-600">Active Researchers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-forest-900">156</p>
                  <p className="text-sm text-forest-600">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-forest-900">89</p>
                  <p className="text-sm text-forest-600">Discussions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-forest-900">234</p>
                  <p className="text-sm text-forest-600">Shared Resources</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border-forest-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teams">Research Teams</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Research Teams Preview */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-forest-900">
                    <Users className="w-5 h-5" />
                    Featured Research Teams
                  </CardTitle>
                  <CardDescription>Top collaborative research groups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {researchTeams.slice(0, 2).map((team) => (
                    <div key={team.id} className="flex items-center gap-3 p-3 bg-forest-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-lg">{team.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-forest-900">{team.name}</h4>
                        <p className="text-sm text-forest-600">{team.members} members • {team.projects} projects</p>
                      </div>
                      <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                        {team.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Teams
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Discussions Preview */}
              <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-forest-900">
                    <MessageSquare className="w-5 h-5" />
                    Recent Discussions
                  </CardTitle>
                  <CardDescription>Latest research conversations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeDiscussions.slice(0, 2).map((discussion) => (
                    <div key={discussion.id} className="p-3 bg-forest-50 rounded-lg">
                      <h4 className="font-medium text-forest-900 text-sm">{discussion.title}</h4>
                      <p className="text-xs text-forest-600 mt-1">by {discussion.author}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-forest-500">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.views} views</span>
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Discussions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Research Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Input placeholder="Search teams..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Team
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchTeams.map((team) => (
                <Card key={team.id} className="bg-white/60 backdrop-blur-sm border-forest-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-xl">{team.avatar}</AvatarFallback>
                      </Avatar>
                      <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                        {team.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-forest-900">{team.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {team.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      {team.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-forest-600">
                      <span>{team.members} members</span>
                      <span>{team.projects} projects</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-forest-500">
                      <span>Last active: {team.lastActivity}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Input placeholder="Search discussions..." className="w-64" />
                <Button variant="outline">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
            </div>

            <div className="space-y-4">
              {activeDiscussions.map((discussion) => (
                <Card key={discussion.id} className="bg-white/60 backdrop-blur-sm border-forest-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-forest-900 mb-2">{discussion.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-forest-600 mb-3">
                          <span>by {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.institution}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {discussion.lastReply}
                          </span>
                        </div>
                        <div className="flex gap-2 mb-4">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-sm text-forest-600">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {discussion.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {discussion.likes}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Input placeholder="Search events..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-white/60 backdrop-blur-sm border-forest-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="bg-forest-50 text-forest-700 border-forest-200">
                        {event.type}
                      </Badge>
                      <div className="text-right text-sm text-forest-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-forest-900">{event.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-forest-600 mb-4">{event.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Register
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Bell className="w-4 h-4 mr-2" />
                        Remind
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Input placeholder="Search resources..." className="w-64" />
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Share Resource
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sharedResources.map((resource) => (
                <Card key={resource.id} className="bg-white/60 backdrop-blur-sm border-forest-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {resource.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-forest-900">{resource.title}</CardTitle>
                    <CardDescription>by {resource.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-forest-600">
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {resource.downloads} downloads
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Networking Section */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Globe className="w-5 h-5" />
              Research Networking
            </CardTitle>
            <CardDescription>Connect with researchers in your field</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-forest-600" />
                </div>
                <h4 className="font-medium text-forest-900 mb-2">Find Researchers</h4>
                <p className="text-sm text-forest-600 mb-3">Search by expertise, location, or institution</p>
                <Button size="sm" variant="outline">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-medium text-forest-900 mb-2">Direct Messaging</h4>
                <p className="text-sm text-forest-600 mb-3">Connect privately with researchers</p>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </div>

              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-forest-900 mb-2">Video Calls</h4>
                <p className="text-sm text-forest-600 mb-3">Schedule virtual meetings and collaborations</p>
                <Button size="sm" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollaborationHub;
