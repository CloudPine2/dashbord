
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Layout } from '@/components/Layout';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { AuthProvider } from '@/contexts/AuthContext';

// Import all pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import StockTracker from '@/pages/StockTracker';
import NewsSummarizer from '@/pages/NewsSummarizer';
import PredictiveCharts from '@/pages/PredictiveCharts';
import LiteratureReview from '@/pages/LiteratureReview';
import DataAnalysis from '@/pages/DataAnalysis';
import HypothesisGeneration from '@/pages/HypothesisGeneration';
import KnowledgeGraph from '@/pages/KnowledgeGraph';
import CitationTracker from '@/pages/CitationTracker';
import ResearchTrends from '@/pages/ResearchTrends';
import CollaborationHub from '@/pages/CollaborationHub';
import SmartSearch from '@/pages/SmartSearch';
import ProjectManager from '@/pages/ProjectManager';
import DataVisualization from '@/pages/DataVisualization';
import ExportTools from '@/pages/ExportTools';
import APIIntegrations from '@/pages/APIIntegrations';
import TrendAnalysis from '@/pages/TrendAnalysis';
import NetworkAnalysis from '@/pages/NetworkAnalysis';
import PredictiveModeling from '@/pages/PredictiveModeling';
import AIRiskFeed from '@/pages/AIRiskFeed';
import Planner from '@/pages/Planner';
import SystemHealth from '@/pages/SystemHealth';
import UserManagement from '@/pages/UserManagement';
import UserProfile from '@/pages/UserProfile';
import BackupRestore from '@/pages/BackupRestore';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

// Wrapper component for public routes to enable scroll-to-top
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        
        {/* Protected routes with sidebar layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks" element={<StockTracker />} />
          <Route path="/news" element={<NewsSummarizer />} />
          <Route path="/charts" element={<PredictiveCharts />} />
          
          {/* AI Features */}
          <Route path="/literature-review" element={<LiteratureReview />} />
          <Route path="/data-analysis" element={<DataAnalysis />} />
          <Route path="/hypothesis-generation" element={<HypothesisGeneration />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="/citation-tracker" element={<CitationTracker />} />
          
          {/* Tools */}
          <Route path="/research-trends" element={<ResearchTrends />} />
          <Route path="/collaboration-hub" element={<CollaborationHub />} />
          <Route path="/smart-search" element={<SmartSearch />} />
          <Route path="/project-manager" element={<ProjectManager />} />
          <Route path="/data-visualization" element={<DataVisualization />} />
          <Route path="/export-tools" element={<ExportTools />} />
          <Route path="/api-integrations" element={<APIIntegrations />} />
          
          {/* Insights */}
          <Route path="/trend-analysis" element={<TrendAnalysis />} />
          <Route path="/network-analysis" element={<NetworkAnalysis />} />
          <Route path="/predictive-modeling" element={<PredictiveModeling />} />
          
          {/* System */}
          <Route path="/risks" element={<AIRiskFeed />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/system-health" element={<SystemHealth />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/backup-restore" element={<BackupRestore />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
    </AuthProvider>
  );
}

export default App;
