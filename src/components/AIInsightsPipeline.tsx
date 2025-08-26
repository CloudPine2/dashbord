
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Search, Lightbulb, Target, CheckCircle, Clock, Zap } from 'lucide-react';

const pipelineSteps = [
  {
    id: 1,
    title: 'Research Question',
    description: 'AI analyzes your query for key concepts and research domains',
    icon: Search,
    status: 'completed',
    duration: '0.3s',
    details: 'Identified 5 key concepts, 3 research domains'
  },
  {
    id: 2,
    title: 'Data Collection',
    description: 'Intelligent search across 50M+ research papers and datasets',
    icon: Brain,
    status: 'completed',
    duration: '1.2s',
    details: 'Processed 1,247 papers, 89 datasets'
  },
  {
    id: 3,
    title: 'AI Analysis',
    description: 'Advanced NLP and ML models extract insights and patterns',
    icon: Zap,
    status: 'active',
    duration: '2.1s',
    details: 'Running 4 analysis models...'
  },
  {
    id: 4,
    title: 'Insight Generation',
    description: 'Generate hypotheses, identify gaps, and suggest directions',
    icon: Lightbulb,
    status: 'pending',
    duration: '0.8s',
    details: 'Waiting for analysis completion'
  },
  {
    id: 5,
    title: 'Research Discovery',
    description: 'Present findings with confidence scores and next steps',
    icon: Target,
    status: 'pending',
    duration: '0.5s',
    details: 'Final synthesis and presentation'
  }
];

export function AIInsightsPipeline() {
  const [currentStep, setCurrentStep] = useState(3);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 5) {
          setIsRunning(false);
          return 5;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const resetPipeline = () => {
    setCurrentStep(1);
    setIsRunning(true);
  };

  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-forest-900">
              <Brain className="w-5 h-5 text-forest-600" />
              AI Research Pipeline
            </CardTitle>
            <CardDescription>Step-by-step AI-powered research process visualization</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={isRunning ? "default" : "secondary"} className="bg-forest-600">
              {isRunning ? 'Processing...' : 'Complete'}
            </Badge>
            {!isRunning && (
              <Button onClick={resetPipeline} size="sm" variant="outline">
                Run Again
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Timeline Visualization */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-forest-600 to-forest-400 transition-all duration-1000"
              style={{ height: `${((currentStep - 1) / 4) * 100}%` }}
            ></div>

            <div className="space-y-8">
              {pipelineSteps.map((step, index) => {
                const status = getStepStatus(step.id);
                return (
                  <div key={step.id} className="relative flex items-start gap-4">
                    {/* Step indicator */}
                    <div className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
                      ${status === 'completed' ? 'bg-forest-600 border-forest-600 text-white' : ''}
                      ${status === 'active' ? 'bg-forest-100 border-forest-600 text-forest-600 animate-pulse' : ''}
                      ${status === 'pending' ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                    `}>
                      {status === 'completed' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-semibold ${
                          status === 'active' ? 'text-forest-900' : 
                          status === 'completed' ? 'text-forest-800' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.duration}
                        </Badge>
                        {status === 'active' && (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        status === 'active' ? 'text-forest-700' : 
                        status === 'completed' ? 'text-forest-600' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                      <p className={`text-xs ${
                        status === 'active' ? 'text-forest-600 font-medium' : 
                        status === 'completed' ? 'text-forest-500' : 'text-gray-400'
                      }`}>
                        {step.details}
                      </p>
                    </div>

                    {/* Arrow for non-last steps */}
                    {index < pipelineSteps.length - 1 && status !== 'pending' && (
                      <ArrowRight className={`w-5 h-5 ${
                        status === 'completed' ? 'text-forest-600' : 'text-forest-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Processing Status */}
          {isRunning && (
            <div className="mt-8 p-4 bg-gradient-to-r from-forest-50 to-cream-50 rounded-lg border border-forest-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-forest-600 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-forest-900">
                    Currently processing: {pipelineSteps[currentStep - 1]?.title}
                  </p>
                  <p className="text-sm text-forest-600">
                    {pipelineSteps[currentStep - 1]?.details}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Completion Summary */}
          {!isRunning && currentStep >= 5 && (
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Research Pipeline Complete!</p>
                  <p className="text-sm text-green-700">
                    Generated 15 insights, identified 3 research gaps, and suggested 7 future directions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
