
import { CheckSquare, Square, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const papers = [
  {
    id: 1,
    title: "Solid-State Battery Integration in Urban Microgrids",
    authors: "Chen, L., Martinez, R., Park, S.",
    journal: "Nature Energy",
    year: "2023",
    matchScore: 94,
    selected: true
  },
  {
    id: 2,
    title: "Cost-Effective Energy Storage for Smart Cities",
    authors: "Johnson, M., Wu, X.",
    journal: "Science",
    year: "2023", 
    matchScore: 89,
    selected: false
  },
  {
    id: 3,
    title: "Grid-Scale Battery Systems: A Comprehensive Review",
    authors: "Thompson, K., et al.",
    journal: "Renewable Energy",
    year: "2022",
    matchScore: 87,
    selected: true
  },
  {
    id: 4,
    title: "Urban Energy Storage: Policy and Implementation",
    authors: "Davis, A., Kumar, P.",
    journal: "Energy Policy",
    year: "2023",
    matchScore: 82,
    selected: false
  },
  {
    id: 5,
    title: "Lithium-Ion vs. Flow Batteries in Urban Applications",
    authors: "Rodriguez, C., Singh, R.",
    journal: "Journal of Power Sources",
    year: "2022",
    matchScore: 78,
    selected: true
  }
];

export function RelatedPapers() {
  return (
    <Card className="chart-container animate-fade-in">
      <CardHeader>
        <CardTitle className="font-space text-forest-900 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-forest-600" />
          Top Related Papers
        </CardTitle>
        <CardDescription className="text-forest-600">
          AI-matched sources ranked by relevance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {papers.map((paper) => (
          <div key={paper.id} className="p-3 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-all duration-200">
            <div className="flex items-start gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-1 p-0 w-6 h-6"
              >
                {paper.selected ? (
                  <CheckSquare className="w-4 h-4 text-forest-600" />
                ) : (
                  <Square className="w-4 h-4 text-forest-400" />
                )}
              </Button>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-forest-900 italic leading-tight mb-1">
                  {paper.title}
                </h4>
                <p className="text-xs text-forest-600 mb-2">
                  {paper.authors} • {paper.journal} • {paper.year}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-forest-600">AI Match:</span>
                  <Progress value={paper.matchScore} className="flex-1 h-2" />
                  <span className="text-xs font-medium text-forest-800">{paper.matchScore}%</span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-forest-400 hover:text-forest-600 p-1">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4 text-forest-600 border-forest-200 hover:bg-forest-50">
          Load More Papers
        </Button>
      </CardContent>
    </Card>
  );
}
