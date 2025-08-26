
import { useEffect, useRef } from 'react';
import { Network, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function KnowledgeGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Mock knowledge graph data
    const nodes = [
      { id: 'center', label: 'Urban Renewable Storage', x: width/2, y: height/2, size: 60, color: '#0d2420' },
      { id: 'battery', label: 'Battery Tech', x: width/2 - 120, y: height/2 - 60, size: 40, color: '#3c8d82', docs: 42 },
      { id: 'grid', label: 'Grid Integration', x: width/2 + 120, y: height/2 - 60, size: 35, color: '#57ab9b', docs: 38 },
      { id: 'policy', label: 'Policy', x: width/2 - 80, y: height/2 + 80, size: 30, color: '#8cc9ba', docs: 25 },
      { id: 'materials', label: 'Material Science', x: width/2 + 100, y: height/2 + 70, size: 35, color: '#57ab9b', docs: 31 },
      { id: 'sustainability', label: 'Sustainability', x: width/2, y: height/2 - 120, size: 32, color: '#8cc9ba', docs: 29 }
    ];

    const links = [
      { source: 'center', target: 'battery' },
      { source: 'center', target: 'grid' },
      { source: 'center', target: 'policy' },
      { source: 'center', target: 'materials' },
      { source: 'center', target: 'sustainability' },
      { source: 'battery', target: 'materials' },
      { source: 'grid', target: 'policy' }
    ];

    // Clear existing content
    svg.innerHTML = '';

    // Draw links
    links.forEach(link => {
      const sourceNode = nodes.find(n => n.id === link.source);
      const targetNode = nodes.find(n => n.id === link.target);
      if (sourceNode && targetNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x.toString());
        line.setAttribute('y1', sourceNode.y.toString());
        line.setAttribute('x2', targetNode.x.toString());
        line.setAttribute('y2', targetNode.y.toString());
        line.setAttribute('stroke', '#bbf0e8');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.7');
        svg.appendChild(line);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x.toString());
      circle.setAttribute('cy', node.y.toString());
      circle.setAttribute('r', (node.size / 2).toString());
      circle.setAttribute('fill', node.color);
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '3');
      circle.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))';
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + node.size/2 + 20).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#0d2420');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', '500');
      text.textContent = node.label;
      
      if ('docs' in node) {
        const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        tooltip.textContent = `${node.label} - ${node.docs} documents`;
        g.appendChild(tooltip);
      }
      
      g.appendChild(circle);
      g.appendChild(text);
      svg.appendChild(g);
    });

  }, []);

  return (
    <Card className="chart-container animate-scale-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-forest-600" />
          <CardTitle className="font-space text-forest-900">Knowledge Graph</CardTitle>
        </div>
        <CardDescription className="text-forest-600">
          Interactive visualization of research connections
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="relative w-full h-80 bg-gradient-to-br from-forest-50 to-cream-50 rounded-lg border border-forest-100">
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid meet"
          />
          
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30">
            <p className="text-xs text-forest-600 font-medium">Hover nodes for details</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
