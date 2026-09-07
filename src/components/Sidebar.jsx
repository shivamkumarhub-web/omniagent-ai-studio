import React from 'react';
import { 
  Zap, 
  BrainCircuit, 
  Globe, 
  Code, 
  Database, 
  Send, 
  Plus, 
  Layers,
  Sparkles,
  Sliders,
  Cpu
} from 'lucide-react';

const NODE_TYPES = [
  { id: 'trigger', label: 'Prompt Trigger', icon: Zap, color: '#f59e0b', desc: 'Webhook or HTTP prompt input' },
  { id: 'llm', label: 'LLM Reasoning Node', icon: BrainCircuit, color: '#6366f1', desc: 'GPT-4o / Claude 3.5 / Gemini 1.5' },
  { id: 'web_search', label: 'Web Research Agent', icon: Globe, color: '#06b6d4', desc: 'Live web scraping & search' },
  { id: 'code', label: 'Python / JS Sandbox', icon: Code, color: '#10b981', desc: 'Executes secure isolated code' },
  { id: 'vector_db', label: 'Vector Store RAG', icon: Database, color: '#a855f7', desc: 'Pinecone / Qdrant semantic query' },
  { id: 'action', label: 'Webhook & Action', icon: Send, color: '#f43f5e', desc: 'Post result to API, Slack, or GitHub' }
];

export default function Sidebar({ onAddNode, activeTab, setActiveTab }) {
  return (
    <aside className="glass-panel" style={{ width: '280px', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderBottom: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', overflowY: 'auto' }}>
      <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', padding: '0.25rem', borderRadius: '10px', gap: '0.25rem' }}>
        <button 
          onClick={() => setActiveTab('nodes')}
          style={{ flex: 1, padding: '0.4rem', border: 'none', background: activeTab === 'nodes' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'nodes' ? 'white' : 'var(--text-secondary)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s ease' }}>
          <Layers size={14} /> Nodes
        </button>
        <button 
          onClick={() => setActiveTab('config')}
          style={{ flex: 1, padding: '0.4rem', border: 'none', background: activeTab === 'config' ? 'var(--accent-primary)' : 'transparent', color: activeTab === 'config' ? 'white' : 'var(--text-secondary)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s ease' }}>
          <Sliders size={14} /> Model Config
        </button>
      </div>

      {activeTab === 'nodes' ? (
        <div>
          <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Node Library</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {NODE_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div 
                  key={type.id}
                  onClick={() => onAddNode(type)}
                  className="glass-panel-interactive"
                  style={{ padding: '0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <div style={{ background: `${type.color}20`, border: `1px solid ${type.color}50`, padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={type.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{type.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{type.desc}</div>
                  </div>
                  <Plus size={16} color="var(--text-muted)" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agent Model Parameters</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Default LLM Provider</label>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'white', padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <option>Gemini 1.5 Pro (Google)</option>
              <option>Claude 3.5 Sonnet (Anthropic)</option>
              <option>GPT-4o (OpenAI)</option>
              <option>DeepSeek R1 (Local / Ollama)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Temperature</span>
              <span>0.7</span>
            </label>
            <input type="range" min="0" max="1" step="0.05" defaultValue="0.7" style={{ accentColor: 'var(--accent-primary)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Max Output Tokens</span>
              <span>4096</span>
            </label>
            <input type="range" min="256" max="8192" step="256" defaultValue="4096" style={{ accentColor: 'var(--accent-primary)' }} />
          </div>

          <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <Cpu size={16} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#818cf8' }}>Parallel Agent Execution</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Async streaming worker pools enabled for low-latency node completion.</p>
          </div>
        </div>
      )}
    </aside>
  );
}
