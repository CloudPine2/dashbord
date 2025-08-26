
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavbar } from '@/components/TopNavbar';
import { Outlet } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function Layout() {
  useScrollToTop();
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-cream-50 via-white to-forest-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          
          <main className="flex-1 overflow-auto p-4 md:p-6 pl-8 md:pl-12">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
