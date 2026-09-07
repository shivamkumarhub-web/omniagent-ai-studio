import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ExecutionConsole from './components/ExecutionConsole';
import TemplateModal from './components/TemplateModal';

const INITIAL_NODES = [
  {
    id: 'n-1',
    title: 'Prompt Trigger',
    type: { id: 'trigger', icon: (props) => <span {...props}>⚡</span>, color: '#f59e0b' },
    x: 80,
    y: 120,
    status: 'completed',
    config: 'POST /api/v1/agent/trigger'
  },
  {
    id: 'n-2',
    title: 'Web Research Agent',
    type: { id: 'web_search', icon: (props) => <span {...props}>🌐</span>, color: '#06b6d4' },
    x: 360,
    y: 120,
    status: 'completed',
    config: 'DuckDuckGo API + Puppeteer'
  },
  {
    id: 'n-3',
    title: 'Gemini 1.5 LLM Reasoner',
    type: { id: 'llm', icon: (props) => <span {...props}>🧠</span>, color: '#6366f1' },
    x: 640,
    y: 120,
    status: 'completed',
    config: 'Model: gemini-1.5-pro, Temp: 0.7'
  },
  {
    id: 'n-4',
    title: 'GitHub PR Comment Action',
    type: { id: 'action', icon: (props) => <span {...props}>🚀</span>, color: '#f43f5e' },
    x: 920,
    y: 120,
    status: 'completed',
    config: 'Octokit REST API'
  }
];

const INITIAL_CONNECTIONS = [
  { source: 'n-1', target: 'n-2' },
  { source: 'n-2', target: 'n-3' },
  { source: 'n-3', target: 'n-4' }
];

export default function App() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [activeTab, setActiveTab] = useState('nodes');
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const [metrics, setMetrics] = useState({ latency: 142, tokens: 2840 });
  const [logs, setLogs] = useState([
    { time: '20:19:42', type: 'info', text: 'System initialized. 4 node pipeline loaded in sandbox.' },
    { time: '20:19:43', type: 'success', text: 'Connected to Gemini 1.5 Pro inference backend.' }
  ]);

  const handleAddNode = (type) => {
    const newNode = {
      id: `n-${Date.now()}`,
      title: type.label,
      type: type,
      x: 100 + (nodes.length % 3) * 260,
      y: 200 + Math.floor(nodes.length / 3) * 100,
      status: 'idle',
      config: 'Custom Configuration'
    };
    setNodes([...nodes, newNode]);

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      setConnections([...connections, { source: lastNode.id, target: newNode.id }]);
    }
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.source !== nodeId && c.target !== nodeId));
  };

  const handleRunWorkflow = () => {
    setIsExecuting(true);
    setLogs(prev => [
      ...prev,
      { time: new Date().toLocaleTimeString(), type: 'info', text: '▶ Initiating visual pipeline execution...' }
    ]);

    nodes.forEach((node, index) => {
      setTimeout(() => {
        setActiveNodeId(node.id);
        setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'running' } : n));
        
        setLogs(prev => [
          ...prev,
          { time: new Date().toLocaleTimeString(), type: 'info', text: `Executing node [${node.title}]...` }
        ]);

        setTimeout(() => {
          setNodes(prev => prev.map(n => n.id === node.id ? { ...n, status: 'completed' } : n));
          setLogs(prev => [
            ...prev,
            { time: new Date().toLocaleTimeString(), type: 'success', text: `✔ Completed [${node.title}] successfully.` }
          ]);

          if (index === nodes.length - 1) {
            setIsExecuting(false);
            setActiveNodeId(null);
            setMetrics({ latency: Math.floor(100 + Math.random() * 80), tokens: Math.floor(2000 + Math.random() * 1500) });
            setLogs(prev => [
              ...prev,
              { time: new Date().toLocaleTimeString(), type: 'success', text: '🎉 Pipeline finished. All agent tasks completed with 0 errors.' }
            ]);
          }
        }, 1000);
      }, index * 1200);
    });
  };

  const handleSelectTemplate = (tmpl) => {
    setLogs(prev => [
      ...prev,
      { time: new Date().toLocaleTimeString(), type: 'info', text: `Loaded template: ${tmpl.title}` }
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Header 
        isExecuting={isExecuting} 
        onRunWorkflow={handleRunWorkflow} 
        onOpenTemplates={() => setIsTemplateOpen(true)} 
        nodeCount={nodes.length}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <Sidebar 
          onAddNode={handleAddNode} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <Canvas 
          nodes={nodes} 
          connections={connections} 
          activeNodeId={activeNodeId} 
          onSelectNode={(id) => setActiveNodeId(id)} 
          onDeleteNode={handleDeleteNode} 
          isExecuting={isExecuting}
        />
      </div>

      <ExecutionConsole logs={logs} isExecuting={isExecuting} metrics={metrics} />

      <TemplateModal 
        isOpen={isTemplateOpen} 
        onClose={() => setIsTemplateOpen(false)} 
        onSelectTemplate={handleSelectTemplate} 
      />
    </div>
  );
}
