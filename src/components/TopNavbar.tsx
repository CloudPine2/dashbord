
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { fixGoogleProfilePicture, getInitials, getAvatarColor } from '@/lib/imageUtils';

export function TopNavbar() {
  const { user } = useAuth();
  
  // Debug logging
  console.log('TopNavbar user object:', user);
  console.log('User photoURL:', user?.photoURL);
  console.log('User displayName:', user?.displayName);
  
  const handleLogout = async () => {
    try {
      await signOutUser();
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback to localStorage logout
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <header className="h-16 border-b border-white/20 bg-white/80 backdrop-blur-sm px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-forest-600 hover:text-forest-800" />
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 h-4 w-4" />
          <Input
            placeholder="Search research topics..."
            className="input-glass pl-10 w-64 lg:w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-800 hover:bg-forest-50">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-800 hover:bg-forest-50 flex items-center gap-2">
              {user?.photoURL && user.photoURL !== 'null' ? (
                <img 
                  src={fixGoogleProfilePicture(user.photoURL) || user.photoURL} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover"
                  onError={(e) => {
                    console.log('Image failed to load, falling back to initials:', user.photoURL);
                    e.currentTarget.style.display = 'none';
                    // Show fallback avatar
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-6 h-6 rounded-full ${getAvatarColor(user?.displayName || user?.email || 'User')} flex items-center justify-center text-white text-xs font-semibold ${user?.photoURL && user.photoURL !== 'null' ? 'hidden' : ''}`}>
                {getInitials(user?.displayName, user?.email)}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card w-56">
            <div className="p-3 border-b border-forest-200/20">
              <div className="flex items-center gap-3">
                {user?.photoURL && user.photoURL !== 'null' ? (
                  <img 
                    src={fixGoogleProfilePicture(user.photoURL) || user.photoURL} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      console.log('Dropdown image failed to load, falling back to initials:', user.photoURL);
                      e.currentTarget.style.display = 'none';
                      // Show fallback avatar
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(user?.displayName || user?.email || 'User')} flex items-center justify-center text-white text-sm font-semibold ${user?.photoURL && user.photoURL !== 'null' ? 'hidden' : ''}`}>
                  {getInitials(user?.displayName, user?.email)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest-800">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-forest-600">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenuLabel className="text-forest-800">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-forest-600 hover:text-forest-800">
              <Link to="/profile">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-forest-600 hover:text-forest-800">
              <Link to="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
