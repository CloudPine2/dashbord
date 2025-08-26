
import { Lightbulb, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const hypotheses = [
  {
    id: 1,
    text: "Solid-state batteries will achieve cost parity with lithium-ion by 2026, making them viable for large-scale urban deployment.",
    confidence: "Medium-High"
  },
  {
    id: 2,
    text: "Integration of AI-driven energy management systems can improve storage efficiency by 25-30% in smart city environments.",
    confidence: "High"
  },
  {
    id: 3,
    text: "Hybrid storage solutions combining multiple technologies will become the dominant approach for urban renewable energy systems.",
    confidence: "Medium"
  }
];

export function ResearchHypotheses() {
  return (
    <Card className="chart-container animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-forest-600" />
          <CardTitle className="font-space text-forest-900">AI-Generated Hypotheses</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          Research directions based on current analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {hypotheses.map((hypothesis, index) => (
          <div key={hypothesis.id} className="p-4 bg-white/60 rounded-lg border border-white/30">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-forest-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm text-forest-800 leading-relaxed mb-2">
                  {hypothesis.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-forest-100 text-forest-700 rounded-full">
                    Confidence: {hypothesis.confidence}
                  </span>
                  <Button variant="ghost" size="sm" className="text-forest-600 hover:text-forest-800 p-1">
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full text-forest-600 border-forest-200 hover:bg-forest-50">
          Generate More Hypotheses
        </Button>
      </CardContent>
    </Card>
  );
}
