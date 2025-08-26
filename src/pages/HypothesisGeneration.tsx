
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Brain, Target, Beaker, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockHypotheses = [
  {
    id: 1,
    hypothesis: "Increasing AI model training frequency will improve prediction accuracy by 15-25%",
    confidence: 0.87,
    testability: "High",
    framework: "A/B Testing",
    variables: ["Training Frequency", "Prediction Accuracy", "Model Complexity"],
    methodology: "Compare models trained weekly vs monthly over 3-month period",
    expectedOutcome: "Statistical significance in accuracy improvement",
    timeframe: "3 months",
    resources: "Medium",
    tags: ["Machine Learning", "Performance", "Training"]
  },
  {
    id: 2,
    hypothesis: "Collaborative research environments enhance innovation output by 30%",
    confidence: 0.74,
    testability: "Medium",
    framework: "Controlled Experiment",
    variables: ["Team Collaboration", "Innovation Metrics", "Environment Type"],
    methodology: "Compare isolated vs collaborative teams using innovation scoring",
    expectedOutcome: "Measurable increase in innovative solutions",
    timeframe: "6 months",
    resources: "High",
    tags: ["Collaboration", "Innovation", "Team Dynamics"]
  }
];

const HypothesisGeneration = () => {
  const [researchTopic, setResearchTopic] = useState('');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || '');
  const { toast } = useToast();

  const generateHypotheses = async () => {
    if (!groqKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key to use AI features",
        variant: "destructive"
      });
      return;
    }

    if (!researchTopic.trim()) {
      toast({
        title: "Research Topic Required",
        description: "Please enter a research topic to generate hypotheses",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Hypotheses Generated",
        description: "AI has generated testable hypotheses for your research topic"
      });
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTestabilityIcon = (testability: string) => {
    switch (testability) {
      case 'High': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Medium': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-forest-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space font-bold text-forest-900">Hypothesis Generation</h1>
            <p className="text-forest-600">AI-powered testable questions and experimental frameworks</p>
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
            <Button onClick={generateHypotheses} disabled={isGenerating} className="bg-forest-600 hover:bg-forest-700 w-full sm:w-auto">
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate Hypotheses
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Brain className="w-5 h-5" />
                Research Topic
              </CardTitle>
              <CardDescription>Enter your research area or question</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="e.g., Machine learning performance optimization..."
                value={researchTopic}
                onChange={(e) => setResearchTopic(e.target.value)}
              />
              <Textarea
                placeholder="Provide additional context, background, or constraints..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-forest-900">
                <Target className="w-5 h-5" />
                Generation Settings
              </CardTitle>
              <CardDescription>Customize hypothesis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-forest-700 mb-2 block">Research Type</label>
                  <select className="w-full p-2 border border-forest-200 rounded-md">
                    <option>Experimental</option>
                    <option>Observational</option>
                    <option>Correlational</option>
                    <option>Case Study</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-forest-700 mb-2 block">Complexity</label>
                  <select className="w-full p-2 border border-forest-200 rounded-md">
                    <option>Simple</option>
                    <option>Moderate</option>
                    <option>Complex</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-forest-700 mb-2 block">Number of Hypotheses</label>
                <input type="range" min="1" max="10" defaultValue="3" className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Hypotheses */}
        <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Beaker className="w-5 h-5" />
              Generated Hypotheses
            </CardTitle>
            <CardDescription>AI-generated testable hypotheses with experimental frameworks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockHypotheses.map(hyp => (
              <div key={hyp.id} className="border border-forest-200 rounded-lg p-4 md:p-6 hover:bg-forest-50 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest-900 text-lg mb-2">{hyp.hypothesis}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge className={getConfidenceColor(hyp.confidence)}>
                        {(hyp.confidence * 100).toFixed(0)}% Confidence
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getTestabilityIcon(hyp.testability)}
                        <span className="text-sm text-forest-600">{hyp.testability} Testability</span>
                      </div>
                      <Badge variant="outline">{hyp.framework}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-medium text-forest-900 mb-2">Variables</h4>
                    <div className="flex flex-wrap gap-1">
                      {hyp.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900 mb-2">Study Details</h4>
                    <div className="space-y-1 text-sm text-forest-600">
                      <div>Timeframe: {hyp.timeframe}</div>
                      <div>Resources: {hyp.resources}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-forest-900 mb-1">Methodology</h4>
                    <p className="text-sm text-forest-700">{hyp.methodology}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-forest-900 mb-1">Expected Outcome</h4>
                    <p className="text-sm text-forest-700">{hyp.expectedOutcome}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {hyp.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit Hypothesis
                    </Button>
                    <Button size="sm" className="bg-forest-600 hover:bg-forest-700">
                      Design Experiment
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">247</div>
              <div className="text-sm text-forest-600">Hypotheses Generated</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">89%</div>
              <div className="text-sm text-forest-600">Average Testability</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">156</div>
              <div className="text-sm text-forest-600">Experiments Designed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-forest-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-forest-900 mb-1">73%</div>
              <div className="text-sm text-forest-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HypothesisGeneration;
