
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Network, Zap, Globe, Target, BookOpen, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockNodes = [
  { id: 1, name: "Machine Learning", type: "field", connections: 8, strength: 0.9 },
  { id: 2, name: "Neural Networks", type: "concept", connections: 12, strength: 0.85 },
  { id: 3, name: "Deep Learning", type: "technique", connections: 15, strength: 0.92 },
  { id: 4, name: "Natural Language Processing", type: "field", connections: 6, strength: 0.78 },
  { id: 5, name: "Computer Vision", type: "field", connections: 9, strength: 0.82 },
  { id: 6, name: "Reinforcement Learning", type: "technique", connections: 7, strength: 0.75 }
];

const mockConnections = [
  { from: "Machine Learning", to: "Neural Networks", weight: 0.9, type: "foundational" },
  { from: "Neural Networks", to: "Deep Learning", weight: 0.95, type: "evolution" },
  { from: "Deep Learning", to: "Computer Vision", weight: 0.88, type: "application" },
  { from: "Deep Learning", to: "Natural Language Processing", weight: 0.85, type: "application" },
  { from: "Machine Learning", to: "Reinforcement Learning", weight: 0.75, type: "branch" }
];

const KnowledgeGraph = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || '');
  const { toast } = useToast();

  const generateGraph = async () => {
    if (!groqKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key to use AI features",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Knowledge Graph Generated",
        description: "AI has mapped research connections and patterns"
      });
    }, 3000);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'field': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'concept': return 'bg-green-100 border-green-300 text-green-800';
      case 'technique': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'foundational': return 'border-blue-400';
      case 'evolution': return 'border-green-400';
      case 'application': return 'border-purple-400';
      case 'branch': return 'border-orange-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Knowledge Graph</h1>
            <p className="text-forest-600">Interactive research network visualization</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Input
              placeholder="Enter Groq API Key..."
              type="password"
              value={groqKey}
              onChange={(e) => {
                setGroqKey(e.target.value);
                localStorage.setItem('groq_api_key', e.target.value);
              }}
              className="w-full sm:w-64"
            />
            <Button onClick={generateGraph} disabled={isGenerating} className="bg-forest-600 hover:bg-forest-700 w-full sm:w-auto">
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Graph
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Search className="w-5 h-5" />
                Search Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search knowledge graph..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              <div className="space-y-2">
                <Button size="sm" className="w-full bg-forest-600 hover:bg-forest-700">
                  <Target className="w-4 h-4 mr-2" />
                  Focus on Node
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Expand Network
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Network className="w-5 h-5" />
                Graph Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-forest-600">Total Nodes</span>
                <span className="font-semibold text-forest-900">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-600">Connections</span>
                <span className="font-semibold text-forest-900">1,856</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-600">Clusters</span>
                <span className="font-semibold text-forest-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-forest-600">Density</span>
                <span className="font-semibold text-forest-900">0.73</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Zap className="w-5 h-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm p-2 bg-blue-50 border border-blue-200 rounded">
                <strong>Central Hub:</strong> Deep Learning shows highest connectivity
              </div>
              <div className="text-sm p-2 bg-green-50 border border-green-200 rounded">
                <strong>Emerging:</strong> Quantum ML gaining rapid connections
              </div>
              <div className="text-sm p-2 bg-purple-50 border border-purple-200 rounded">
                <strong>Gap:</strong> Weak link between Ethics and Implementation
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Graph Visualization */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Brain className="w-5 h-5" />
              Interactive Knowledge Network
            </CardTitle>
            <CardDescription>Click nodes to explore connections and relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
              {/* Simulated Graph Visualization */}
              <div className="absolute inset-0 p-6">
                <div className="grid grid-cols-3 gap-8 h-full items-center">
                  {mockNodes.map((node, index) => (
                    <div
                      key={node.id}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${getNodeColor(node.type)} ${
                        selectedNode === node.id ? 'ring-4 ring-forest-400 scale-110' : ''
                      }`}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    >
                      <div className="text-sm font-medium text-center">{node.name}</div>
                      <div className="text-xs text-center mt-1 opacity-70">
                        {node.connections} connections
                      </div>
                      
                      {/* Connection Lines (simplified visualization) */}
                      {index < mockNodes.length - 1 && (
                        <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-forest-400 opacity-60"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Central hub indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-forest-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Node Details and Connections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <BookOpen className="w-5 h-5" />
                Research Concepts
              </CardTitle>
              <CardDescription>Explore key nodes in the knowledge graph</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockNodes.map(node => (
                <div key={node.id} className="flex justify-between items-center p-3 rounded-lg hover:bg-forest-50 cursor-pointer transition-colors">
                  <div>
                    <div className="font-medium text-forest-900">{node.name}</div>
                    <div className="text-sm text-forest-600">{node.connections} connections</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getNodeColor(node.type)}>{node.type}</Badge>
                    <div className="text-sm text-forest-600">{(node.strength * 100).toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Network className="w-5 h-5" />
                Connection Patterns
              </CardTitle>
              <CardDescription>Analyze relationships between concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockConnections.map((conn, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-forest-900">
                      {conn.from} → {conn.to}
                    </div>
                    <Badge variant="outline" className={getConnectionColor(conn.type)}>
                      {conn.type}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-forest-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${conn.weight * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-forest-600">
                    Strength: {(conn.weight * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Research Impact Analysis */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <TrendingUp className="w-5 h-5" />
              Research Impact Analysis
            </CardTitle>
            <CardDescription>Discover trending research areas and emerging connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Users className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-900">15,247</div>
                <div className="text-sm text-blue-700">Researchers Connected</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <BookOpen className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-900">89,356</div>
                <div className="text-sm text-green-700">Papers Analyzed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <Brain className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-purple-900">2,847</div>
                <div className="text-sm text-purple-700">AI Insights Generated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
