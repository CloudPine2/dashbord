
import { Users, Plus, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const projects = [
  {
    id: 'apollo',
    name: 'Project Apollo',
    members: [
      { name: 'Dr. Alex Chen', initials: 'AC', color: 'bg-forest-600' },
      { name: 'Prof. Smith', initials: 'PS', color: 'bg-cream-500' },
      { name: 'Research Team', initials: 'RT', color: 'bg-forest-400' }
    ],
    status: 'active'
  },
  {
    id: 'gemini',
    name: 'Project Gemini',
    members: [
      { name: 'Dr. Sarah Johnson', initials: 'SJ', color: 'bg-forest-500' },
      { name: 'Mike Wilson', initials: 'MW', color: 'bg-cream-400' }
    ],
    status: 'draft'
  },
  {
    id: 'artemis',
    name: 'Project Artemis',
    members: [
      { name: 'Dr. Lisa Park', initials: 'LP', color: 'bg-forest-700' },
      { name: 'Tom Brown', initials: 'TB', color: 'bg-cream-600' },
      { name: 'AI Team', initials: 'AT', color: 'bg-forest-300' }
    ],
    status: 'completed'
  }
];

export function CollaborativeWorkspace() {
  return (
    <Card className="chart-container animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-forest-600" />
              <CardTitle className="font-space text-forest-900">Workspace</CardTitle>
            </div>
            <CardDescription className="text-forest-600">
              Collaborative research projects
            </CardDescription>
          </div>
          <Button size="sm" className="accent-button">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
              project.status === 'active' 
                ? 'bg-forest-50 border-forest-200' 
                : project.status === 'completed'
                ? 'bg-cream-50 border-cream-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-forest-900">{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'active' 
                    ? 'bg-green-100 text-green-700'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {project.status}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-forest-400 hover:text-forest-600 p-1">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {project.members.slice(0, 3).map((member, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-white">
                    <AvatarFallback className={`${member.color} text-white text-xs`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 3 && (
                  <Avatar className="w-6 h-6 border-2 border-white">
                    <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                      +{project.members.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <span className="text-xs text-forest-600 ml-2">
                {project.members.length} member{project.members.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
