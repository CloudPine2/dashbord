
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, Lightbulb, Users, Target, TrendingUp, Award } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    date: '2024-01-15',
    time: '09:30',
    type: 'discovery',
    title: 'Novel Battery Chemistry Identified',
    description: 'AI analysis revealed promising lithium-sulfur variants with 45% higher energy density',
    impact: 'high',
    metrics: { papers: 23, citations: 156, confidence: 94 },
    tags: ['Battery Tech', 'Materials Science']
  },
  {
    id: 2,
    date: '2024-02-03',
    time: '14:15',
    type: 'collaboration',
    title: 'Cross-Institution Research Match',
    description: 'Connected with Stanford team working on complementary solid-state research',
    impact: 'medium',
    metrics: { researchers: 8, institutions: 3, synergy: 87 },
    tags: ['Collaboration', 'Solid State']
  },
  {
    id: 3,
    date: '2024-02-18',
    time: '11:45',
    type: 'hypothesis',
    title: 'AI-Generated Research Hypothesis',
    description: 'Machine learning identified potential breakthrough in grid integration efficiency',
    impact: 'high',
    metrics: { accuracy: 91, feasibility: 78, novelty: 85 },
    tags: ['Grid Integration', 'AI Hypothesis']
  },
  {
    id: 4,
    date: '2024-03-05',
    time: '16:20',
    type: 'trend',
    title: 'Emerging Trend Detected',
    description: 'Significant uptick in quantum battery research publications (340% increase)',
    impact: 'medium',
    metrics: { growth: 340, papers: 89, momentum: 92 },
    tags: ['Quantum Batteries', 'Trend Analysis']
  },
  {
    id: 5,
    date: '2024-03-12',
    time: '10:00',
    type: 'breakthrough',
    title: 'Research Gap Successfully Filled',
    description: 'Comprehensive analysis bridged knowledge gap in urban storage deployment',
    impact: 'high',
    metrics: { gap_score: 85, impact_factor: 7.2, citations: 234 },
    tags: ['Urban Storage', 'Research Gap']
  }
];

const typeConfig = {
  discovery: { icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700 border-yellow-200', iconColor: 'text-yellow-600' },
  collaboration: { icon: Users, color: 'bg-blue-100 text-blue-700 border-blue-200', iconColor: 'text-blue-600' },
  hypothesis: { icon: Target, color: 'bg-purple-100 text-purple-700 border-purple-200', iconColor: 'text-purple-600' },
  trend: { icon: TrendingUp, color: 'bg-green-100 text-green-700 border-green-200', iconColor: 'text-green-600' },
  breakthrough: { icon: Award, color: 'bg-orange-100 text-orange-700 border-orange-200', iconColor: 'text-orange-600' }
};

export function ResearchTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'details'>('timeline');

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Calendar className="w-5 h-5 text-forest-600" />
              Research Discovery Timeline
            </CardTitle>
            <CardDescription>Interactive timeline of AI-powered research breakthroughs and insights</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('timeline')}
              className={viewMode === 'timeline' ? 'bg-forest-600 hover:bg-forest-700' : ''}
            >
              Timeline
            </Button>
            <Button
              variant={viewMode === 'details' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('details')}
              className={viewMode === 'details' ? 'bg-forest-600 hover:bg-forest-700' : ''}
            >
              Details
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === 'timeline' ? (
          <div className="space-y-6">
            {/* Timeline visualization */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-forest-200 via-forest-300 to-forest-200"></div>

              <div className="space-y-8">
                {timelineEvents.map((event, index) => {
                  const config = typeConfig[event.type as keyof typeof typeConfig];
                  const Icon = config.icon;

                  return (
                    <div key={event.id} className="relative flex items-start gap-6">
                      {/* Timeline node */}
                      <div className={`
                        relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg
                        ${selectedEvent === event.id ? 'ring-4 ring-forest-200' : ''}
                        transition-all duration-300 cursor-pointer hover:scale-105
                        ${config.color.replace('text-', 'bg-').replace('border-', 'bg-')}
                      `}
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      >
                        <Icon className={`w-8 h-8 ${config.iconColor}`} />
                      </div>

                      {/* Event content */}
                      <div className={`
                        flex-1 min-w-0 p-4 rounded-lg border transition-all duration-300 cursor-pointer
                        ${selectedEvent === event.id ? 'bg-forest-50 border-forest-300 shadow-md' : 'bg-white border-gray-200 hover:bg-gray-50'}
                      `}
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-forest-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-forest-600">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                            </div>
                          </div>
                          <Badge 
                            variant={event.impact === 'high' ? 'default' : 'secondary'}
                            className={event.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}
                          >
                            {event.impact} impact
                          </Badge>
                        </div>

                        <p className="text-forest-700 mb-3">{event.description}</p>

                        {/* Metrics */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(event.metrics).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs">
                              {key.replace('_', ' ')}: {value}{key.includes('score') || key.includes('confidence') || key.includes('accuracy') ? '%' : ''}
                            </Badge>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-forest-100 text-forest-700 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Expanded details */}
                        {selectedEvent === event.id && (
                          <div className="mt-4 pt-4 border-t border-forest-200 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-forest-100 rounded-lg">
                                <BookOpen className="w-5 h-5 mx-auto mb-1 text-forest-600" />
                                <p className="text-sm font-medium text-forest-900">
                                  {event.metrics.papers || event.metrics.researchers || 'N/A'}
                                </p>
                                <p className="text-xs text-forest-600">
                                  {event.metrics.papers ? 'Papers' : event.metrics.researchers ? 'Researchers' : 'Items'}
                                </p>
                              </div>
                              <div className="text-center p-3 bg-cream-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-forest-600" />
                                <p className="text-sm font-medium text-forest-900">
                                  {event.metrics.confidence || event.metrics.synergy || event.metrics.momentum || 'N/A'}%
                                </p>
                                <p className="text-xs text-forest-600">Confidence</p>
                              </div>
                              <div className="text-center p-3 bg-orange-100 rounded-lg">
                                <Award className="w-5 h-5 mx-auto mb-1 text-forest-600" />
                                <p className="text-sm font-medium text-forest-900">
                                  {event.metrics.citations || event.metrics.growth || event.metrics.impact_factor || 'N/A'}
                                </p>
                                <p className="text-xs text-forest-600">
                                  {event.metrics.citations ? 'Citations' : event.metrics.growth ? '% Growth' : 'Impact'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Details view */}
            {timelineEvents.map(event => {
              const config = typeConfig[event.type as keyof typeof typeConfig];
              const Icon = config.icon;

              return (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-forest-900">{event.title}</h3>
                      <p className="text-sm text-forest-600">{new Date(event.date).toLocaleDateString()} • {event.type}</p>
                    </div>
                    <Badge variant={event.impact === 'high' ? 'default' : 'secondary'}>
                      {event.impact}
                    </Badge>
                  </div>
                  <p className="text-forest-700 mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-forest-100 text-forest-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
