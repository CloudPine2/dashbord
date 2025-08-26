
import { useState } from 'react';
import { Search, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface ResearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function ResearchInput({ query, onQueryChange }: ResearchInputProps) {
  const [inputValue, setInputValue] = useState(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQueryChange(inputValue);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-forest-400 h-5 w-5" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your research question or topic (e.g., 'Impact of microplastics on marine biodiversity')"
            className="input-glass pl-12 pr-24 py-4 text-lg"
          />
          <Button 
            type="submit" 
            className="glass-button absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            Analyze
          </Button>
        </div>
      </form>

      <Card className="glass-card animate-fade-in">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-100 to-forest-200 rounded-full flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <h3 className="font-space font-semibold text-forest-900">Project Apollo</h3>
              <p className="text-sm text-forest-600">
                Created: May 24, 2023 • Last Analyzed: Today • Status: Active
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
