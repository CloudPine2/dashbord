
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Brain, TrendingUp, Download, FileText, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockPapers = [
  {
    id: 1,
    title: "Deep Learning Approaches in Natural Language Processing: A Comprehensive Survey",
    authors: ["Zhang, L.", "Smith, J.", "Chen, W."],
    journal: "Nature Machine Intelligence",
    year: 2024,
    citations: 156,
    relevanceScore: 0.95,
    summary: "This paper provides a comprehensive overview of deep learning methodologies in NLP, covering transformer architectures, attention mechanisms, and recent breakthroughs in language model scaling.",
    keyFindings: [
      "Transformer architectures show 23% improvement over RNNs",
      "Attention mechanisms crucial for long-sequence processing",
      "Scaling laws predict performance gains with larger models"
    ],
    tags: ["Deep Learning", "NLP", "Transformers", "Survey"]
  },
  {
    id: 2,
    title: "Quantum Computing Applications in Financial Risk Modeling",
    authors: ["Kumar, R.", "Johnson, M."],
    journal: "Quantum Information Processing",
    year: 2024,
    citations: 89,
    relevanceScore: 0.87,
    summary: "Explores quantum computing applications for portfolio optimization and risk assessment, demonstrating quantum advantage in complex financial scenarios.",
    keyFindings: [
      "Quantum algorithms reduce computation time by 40%",
      "Improved accuracy for multi-asset portfolio optimization",
      "Quantum annealing effective for risk constraint problems"
    ],
    tags: ["Quantum Computing", "Finance", "Risk Modeling", "Optimization"]
  }
];

const LiteratureReview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customQuery, setCustomQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || '');
  const { toast } = useToast();

  const analyzeLiterature = async () => {
    if (!groqKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key to use AI features",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Literature Analysis Complete",
        description: "AI has analyzed the research papers and identified key trends"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">AI Literature Review</h1>
            <p className="text-forest-600">Summarize research papers and identify key trends</p>
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
            <Button onClick={analyzeLiterature} disabled={isAnalyzing} className="bg-forest-600 hover:bg-forest-700 w-full sm:w-auto">
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze Literature
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search and Query */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Search className="w-5 h-5" />
                Paper Search
              </CardTitle>
              <CardDescription>Search for academic papers by keywords or topic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter research topic or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="w-full bg-forest-600 hover:bg-forest-700">
                <Search className="w-4 h-4 mr-2" />
                Search Papers
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <FileText className="w-5 h-5" />
                Custom Analysis
              </CardTitle>
              <CardDescription>Paste research text for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste research abstract or text here..."
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Button className="w-full bg-forest-600 hover:bg-forest-700">
                <Brain className="w-4 h-4 mr-2" />
                Analyze Text
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Research Papers */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <BookOpen className="w-5 h-5" />
              Research Papers
            </CardTitle>
            <CardDescription>AI-curated papers with relevance scoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockPapers.map(paper => (
              <div key={paper.id} className="border border-forest-200 rounded-lg p-4 md:p-6 hover:bg-forest-50 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-900 text-lg mb-2">{paper.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-forest-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {paper.authors.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {paper.journal}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {paper.year}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="default" className="bg-forest-600">
                      Relevance: {(paper.relevanceScore * 100).toFixed(0)}%
                    </Badge>
                    <div className="text-sm text-forest-600">
                      {paper.citations} citations
                    </div>
                  </div>
                </div>

                <p className="text-forest-700 mb-4">{paper.summary}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-forest-900 mb-2">Key Findings:</h4>
                  <ul className="space-y-1">
                    {paper.keyFindings.map((finding, index) => (
                      <li key={index} className="text-sm text-forest-600 pl-2">• {finding}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-forest-600 hover:bg-forest-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Research Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { topic: "Large Language Models", papers: 1247, growth: "+34%" },
                { topic: "Quantum Machine Learning", papers: 856, growth: "+28%" },
                { topic: "Neuromorphic Computing", papers: 642, growth: "+19%" },
                { topic: "Federated Learning", papers: 534, growth: "+15%" }
              ].map((trend, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-forest-50">
                  <div>
                    <div className="font-medium text-forest-900">{trend.topic}</div>
                    <div className="text-sm text-forest-600">{trend.papers} papers</div>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {trend.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="text-forest-900">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-forest-600">Papers Analyzed</span>
                <span className="font-semibold text-forest-900">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-forest-600">Key Trends Identified</span>
                <span className="font-semibold text-forest-900">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-forest-600">Citation Networks</span>
                <span className="font-semibold text-forest-900">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-forest-600">Research Gaps</span>
                <span className="font-semibold text-forest-900">8</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiteratureReview;
