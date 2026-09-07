import React from 'react';
import { Bot, Play, Save, Download, Sparkles, Activity, Code2, Github } from 'lucide-react';

export default function Header({ isExecuting, onRunWorkflow, onOpenTemplates, nodeCount }) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}>
          <Bot size={24} color="white" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>OmniAgent Studio</h1>
            <span style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', fontSize: '0.7rem', fontWeight: '700', padding: '0.15rem 0.5rem', borderRadius: '999px', textTransform: 'uppercase' }}>v2.4 Pro</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Visual AI Agent & Multi-Model Workflow Orchestrator</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <button onClick={onOpenTemplates} className="btn-secondary">
          <Sparkles size={16} color="#a855f7" />
          <span>Templates</span>
        </button>

        <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }}></div>

        <button 
          onClick={onRunWorkflow} 
          disabled={isExecuting}
          className="gradient-button"
          style={{ opacity: isExecuting ? 0.7 : 1, cursor: isExecuting ? 'not-allowed' : 'pointer' }}
        >
          <Play size={16} fill="white" />
          <span>{isExecuting ? 'Executing Flow...' : 'Run Pipeline'}</span>
        </button>
      </div>
    </header>
  );
}
