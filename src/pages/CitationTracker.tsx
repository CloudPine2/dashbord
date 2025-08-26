
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Quote, TrendingUp, BookOpen, Users, Calendar, ExternalLink } from 'lucide-react';

const CitationTracker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Citation Tracker</h1>
            <p className="text-forest-600">Monitor citation patterns and research impact</p>
          </div>
          <Button className="bg-forest-600 hover:bg-forest-700">
            <Quote className="w-4 h-4 mr-2" />
            Track Citations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">1,247</div>
              <div className="text-sm text-forest-600">Total Citations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">89</div>
              <div className="text-sm text-forest-600">Papers Tracked</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">23%</div>
              <div className="text-sm text-forest-600">Monthly Growth</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">15.2</div>
              <div className="text-sm text-forest-600">H-Index</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <BookOpen className="w-5 h-5" />
              Most Cited Papers
            </CardTitle>
            <CardDescription>Your highest impact research papers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-forest-200 rounded-lg p-4 hover:bg-forest-50 transition-colors">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="font-semibold text-forest-900">Advanced AI Methods in Research Analysis {i}</h3>
                  <Badge variant="default" className="bg-forest-600">{156 - i * 20} citations</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-forest-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Smith, J. et al.
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    2024
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% this month
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitationTracker;
