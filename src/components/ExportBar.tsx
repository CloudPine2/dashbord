
import { Download, Save, Share, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ExportBar() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col sm:flex-row items-center gap-2 p-3 glass-card rounded-full shadow-lg animate-slide-in-right z-50 max-w-[calc(100vw-2rem)]">
      {/* Mobile: Stack vertically, Desktop: Horizontal row */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <Button size="sm" className="glass-button w-full sm:w-auto min-w-[120px]">
          <Download className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
        
        <Button variant="outline" size="sm" className="text-forest-600 border-forest-200 hover:bg-forest-50 w-full sm:w-auto min-w-[120px]">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-forest-600 border-forest-200 hover:bg-forest-50 w-full sm:w-auto min-w-[120px]">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card">
            <DropdownMenuItem className="text-forest-600 hover:text-forest-800">
              View Only
            </DropdownMenuItem>
            <DropdownMenuItem className="text-forest-600 hover:text-forest-800">
              Comment
            </DropdownMenuItem>
            <DropdownMenuItem className="text-forest-600 hover:text-forest-800">
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button size="sm" className="accent-button w-full sm:w-auto min-w-[120px]">
          <Plus className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">New Analysis</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>
    </div>
  );
}
