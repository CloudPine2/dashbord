
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResearchInput } from '@/components/ResearchInput';
import { ExecutiveSummary } from '@/components/ExecutiveSummary';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { RelatedPapers } from '@/components/RelatedPapers';
import { AnalysisMethodology } from '@/components/AnalysisMethodology';
import { PublicationTrends } from '@/components/PublicationTrends';
import { SentimentGauge } from '@/components/SentimentGauge';
import { ResearchHypotheses } from '@/components/ResearchHypotheses';
import { CollaborativeWorkspace } from '@/components/CollaborativeWorkspace';
import { ExportBar } from '@/components/ExportBar';
import { InteractiveStats } from '@/components/InteractiveStats';
import { ImpactMetrics } from '@/components/ImpactMetrics';
import { AIInsightsPipeline } from '@/components/AIInsightsPipeline';
import { ResearchTimeline } from '@/components/ResearchTimeline';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Clock, BarChart3, Users, FileText, TrendingUp, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { fixGoogleProfilePicture, getInitials, getAvatarColor } from '@/lib/imageUtils';

const Dashboard = () => {
  const [currentQuery, setCurrentQuery] = useState("AI-powered renewable energy optimization for smart cities");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Single loading state with proper timing
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "AI Dashboard Activated",
        description: "Your advanced research environment is now ready with AI-powered insights",
      });
    }, 2500); // Slightly longer to ensure smooth transition

    return () => clearTimeout(timer);
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="text-center space-y-8">
          {/* Two circular loading indicators */}
          <div className="flex justify-center space-x-8">
            {/* Left circle - beige/brown */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cream-200 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-cream-400 rounded-full" 
                   style={{
                     clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
                     transform: 'rotate(45deg)'
                   }}></div>
            </div>
            
            {/* Right circle - teal/green */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-forest-200 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-forest-400 rounded-full" 
                   style={{
                     clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
                     transform: 'rotate(90deg)'
                   }}></div>
            </div>
          </div>
          
          {/* Main title */}
          <h2 className="text-2xl font-bold text-gray-900">Initializing AI Research Hub</h2>
          
          {/* Subtitle */}
          <p className="text-forest-600">Loading advanced analytics and insights...</p>
          
          {/* Three dots at bottom */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="animate-fade-in">
        <Card className="bg-gradient-to-r from-forest-50 to-cream-50 border-forest-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {user?.photoURL && user.photoURL !== 'null' ? (
                <img 
                  src={fixGoogleProfilePicture(user.photoURL) || user.photoURL} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full object-cover border-4 border-forest-100"
                  onError={(e) => {
                    console.log('Dashboard image failed to load, falling back to initials:', user.photoURL);
                    e.currentTarget.style.display = 'none';
                    // Show fallback avatar
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-16 h-16 rounded-full ${getAvatarColor(user?.displayName || user?.email || 'User')} flex items-center justify-center border-4 border-forest-100 text-white text-2xl font-bold ${user?.photoURL && user.photoURL !== 'null' ? 'hidden' : ''}`}>
                {getInitials(user?.displayName, user?.email)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-forest-900">
                  Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Researcher'}! 👋
                </h1>
                <p className="text-forest-600 text-lg">
                  Ready to continue your AI-powered research journey?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research input with enhanced styling */}
      <div className="animate-fade-in">
        <ResearchInput query={currentQuery} onQueryChange={setCurrentQuery} />
      </div>

      {/* Project Info Card */}
      <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-forest-400 to-forest-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-forest-900">Project Apollo</h3>
                  <p className="text-forest-600 text-sm">Created: May 24, 2023 • Last Analyzed: Today • Status: Active</p>
                </div>
              </div>
              <Button className="bg-forest-600 hover:bg-forest-700 text-white">
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Pipeline */}
      <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <AIInsightsPipeline />
      </div>

      {/* Main content grid with proper right sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content area - spans 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Interactive Stats Overview */}
          <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <InteractiveStats />
          </div>

          {/* Executive summary */}
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <ExecutiveSummary />
          </div>
          
          {/* Knowledge graph */}
          <div className="animate-fade-in" style={{animationDelay: '0.5s'}}>
            <KnowledgeGraph />
          </div>

          {/* Research Timeline */}
          <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <ResearchTimeline />
          </div>
          
          {/* Charts grid - responsive 2 columns */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{animationDelay: '0.7s'}}>
              <PublicationTrends />
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.8s'}}>
              <SentimentGauge />
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="animate-fade-in" style={{animationDelay: '0.9s'}}>
            <ImpactMetrics />
          </div>
          
          {/* Analysis methodology */}
          <div className="animate-fade-in" style={{animationDelay: '1.0s'}}>
            <AnalysisMethodology />
          </div>
        </div>
        
        {/* Right sidebar - spans 1 column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="animate-fade-in" style={{animationDelay: '1.1s'}}>
            <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/literature-review')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Literature Review
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/data-analysis')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Data Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/collaboration-hub')}>
                  <Users className="w-4 h-4 mr-2" />
                  Collaboration Hub
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in" style={{animationDelay: '1.2s'}}>
            <RelatedPapers />
          </div>
          <div className="animate-fade-in" style={{animationDelay: '1.3s'}}>
            <ResearchHypotheses />
          </div>
          <div className="animate-fade-in" style={{animationDelay: '1.4s'}}>
            <CollaborativeWorkspace />
          </div>

          {/* AI Dashboard Status */}
          <div className="animate-fade-in" style={{animationDelay: '1.5s'}}>
            <Card className="bg-gradient-to-br from-forest-50 to-cream-50 border-forest-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-forest-900">AI Dashboard Activated</p>
                    <p className="text-sm text-forest-600">Ready with AI-powered insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Fixed export bar */}
      <div className="animate-slide-in-right">
        <ExportBar />
      </div>
    </div>
  );
};

export default Dashboard;
