
import { Brain, Search, TrendingUp, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    icon: Search,
    title: "NLP Processing",
    description: "Natural language processing of research queries",
    status: "completed"
  },
  {
    icon: Brain,
    title: "Semantic Search",
    description: "AI-powered semantic matching across databases",
    status: "completed"
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Temporal pattern recognition and forecasting",
    status: "in-progress"
  },
  {
    icon: FileText,
    title: "Summary Generation",
    description: "Automated insight synthesis and reporting",
    status: "pending"
  }
];

export function AnalysisMethodology() {
  return (
    <Card className="chart-container animate-fade-in">
      <CardHeader>
        <CardTitle className="font-space text-forest-900">Analysis Methodology</CardTitle>
        <CardDescription className="text-forest-600">
          AI-powered research analysis pipeline
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.status === 'in-progress';
            const isCompleted = step.status === 'completed';
            
            return (
              <div key={index} className="relative">
                <div className={`p-4 rounded-lg border ${
                  isCompleted ? 'bg-forest-50 border-forest-200' :
                  isActive ? 'bg-cream-50 border-cream-200 animate-pulse-slow' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    isCompleted ? 'bg-forest-600 text-white' :
                    isActive ? 'bg-cream-400 text-forest-800' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-semibold text-sm text-forest-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-forest-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-2 w-4 h-px bg-forest-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
