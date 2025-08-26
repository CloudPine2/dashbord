
import { FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ExecutiveSummary() {
  return (
    <Card className="chart-container animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-forest-600" />
          <CardTitle className="font-space text-forest-900">Executive Summary</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          AI-generated insights and key findings
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none text-forest-700">
          <p>
            <strong className="text-forest-900">Key Finding:</strong> Current research indicates that 
            lithium-ion battery technology dominates urban renewable energy storage, 
            but emerging solid-state alternatives show 40% higher energy density potential.
          </p>
          
          <p>
            <strong className="text-forest-900">Research Gap:</strong> Limited studies examine 
            the integration challenges of large-scale storage systems in existing urban infrastructure, 
            with only 23% of reviewed papers addressing retrofitting scenarios.
          </p>
          
          <p>
            <strong className="text-forest-900">Scientific Consensus:</strong> 89% agreement 
            among researchers that grid-scale storage is critical for urban sustainability, 
            though cost-effectiveness remains debated (confidence interval: 76-94%).
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-forest-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-forest-700 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Trend</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">+23%</p>
            <p className="text-xs text-forest-600">Growth Rate</p>
          </div>
          
          <div className="text-center p-3 bg-cream-100 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-forest-700 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Papers</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">1,247</p>
            <p className="text-xs text-forest-600">Analyzed</p>
          </div>
          
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-forest-700 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Gaps</span>
            </div>
            <p className="text-2xl font-bold text-forest-900">7</p>
            <p className="text-xs text-forest-600">Identified</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
