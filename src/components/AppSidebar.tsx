
import { 
  BarChart3, 
  Brain, 
  FileText, 
  Home, 
  Newspaper, 
  Calendar,
  Settings,
  TrendingUp,
  AlertTriangle,
  Zap,
  Search,
  Users,
  BookOpen,
  Target,
  Globe,
  Database,
  Lightbulb,
  LineChart,
  PieChart,
  Activity,
  Quote,
  Network,
  Share2,
  FolderOpen,
  Download,
  Plug,
  Shield,
  UserCheck,
  Archive
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Stock Tracker", url: "/stocks", icon: TrendingUp },
  { title: "News Summarizer", url: "/news", icon: Newspaper },
  { title: "Predictive Charts", url: "/charts", icon: BarChart3 },
];

const aiFeatures = [
  { title: "Literature Review", url: "/literature-review", icon: FileText },
  { title: "Data Analysis", url: "/data-analysis", icon: Database },
  { title: "Hypothesis Generation", url: "/hypothesis-generation", icon: Lightbulb },
  { title: "Knowledge Graph", url: "/knowledge-graph", icon: Brain },
  { title: "Citation Tracker", url: "/citation-tracker", icon: Quote },
];

const toolsItems = [
  { title: "Research Trends", url: "/research-trends", icon: TrendingUp },
  { title: "Collaboration Hub", url: "/collaboration-hub", icon: Users },
  { title: "Smart Search", url: "/smart-search", icon: Search },
  { title: "Project Manager", url: "/project-manager", icon: FolderOpen },
  { title: "Data Visualization", url: "/data-visualization", icon: PieChart },
  { title: "Export Tools", url: "/export-tools", icon: Download },
  { title: "API Integrations", url: "/api-integrations", icon: Plug },
];

const insightsItems = [
  { title: "Trend Analysis", url: "/trend-analysis", icon: LineChart },
  { title: "Network Analysis", url: "/network-analysis", icon: Network },
  { title: "Predictive Modeling", url: "/predictive-modeling", icon: Brain },
];

const systemItems = [
  { title: "AI Risk Feed", url: "/risks", icon: AlertTriangle },
  { title: "Planner", url: "/planner", icon: Calendar },
  { title: "System Health", url: "/system-health", icon: Activity },
  { title: "Backup & Restore", url: "/backup-restore", icon: Archive },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-72"}
      collapsible="icon"
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          {collapsed ? (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logoes/siteicon.png" alt="CloudPine AI" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-30 h-16 rounded-lg flex items-center justify-center">
              <img src="/logoes/logo.png" alt="CloudPine AI" className="w-auto h-full max-w-full" />
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed ? "Main" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                          isActive || location.pathname === item.url
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed ? "AI Features" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                          isActive || location.pathname === item.url
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed ? "Tools" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                          isActive || location.pathname === item.url
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed ? "Insights" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {insightsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                          isActive || location.pathname === item.url
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed ? "System" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                          isActive || location.pathname === item.url
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                            : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {collapsed && (
        <div className="p-2">
          <SidebarTrigger className="w-full" />
        </div>
      )}
    </Sidebar>
  );
}
