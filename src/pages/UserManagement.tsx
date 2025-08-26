
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';  
import { Users, Plus, Settings } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">User Management</h1>
            <p className="text-forest-600">Manage users and permissions</p>
          </div>
          <Button className="bg-forest-600 hover:bg-forest-700">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-forest-400 mb-4" />
            <p className="text-forest-600">User management features available in admin panel</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
