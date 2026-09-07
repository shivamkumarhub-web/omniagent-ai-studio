import React from 'react';
import { X, Sparkles, Code2, MessageSquare, FileText, ArrowRight } from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    id: 'code-review',
    title: 'Automated PR & Security Reviewer',
    desc: 'Fetches GitHub pull requests, runs AST static analysis, evaluates security vulnerability, and posts PR comments.',
    category: 'DevOps & Engineering',
    icon: Code2,
    color: '#6366f1',
    nodes: 4
  },
  {
    id: 'rag-qa',
    title: 'Enterprise Document RAG Pipeline',
    desc: 'Indexes PDF & Notion docs into Qdrant vector database, performs semantic search, and synthesizes answers using Claude 3.5.',
    category: 'Knowledge Graph',
    icon: FileText,
    color: '#06b6d4',
    nodes: 5
  },
  {
    id: 'support-agent',
    title: 'Autonomous Support Ticket Resolver',
    desc: 'Monitors Zendesk tickets, searches internal API schemas, crafts resolution steps, and alerts Slack on escalation.',
    category: 'Customer Ops',
    icon: MessageSquare,
    color: '#a855f7',
    nodes: 4
  }
];

export default function TemplateModal({ isOpen, onClose, onSelectTemplate }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '1.75rem', borderRadius: '18px', background: '#111827', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--accent-secondary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white' }}>Choose AI Workflow Template</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {PRESET_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <div
                key={tmpl.id}
                onClick={() => { onSelectTemplate(tmpl); onClose(); }}
                className="glass-panel-interactive"
                style={{ padding: '1rem 1.25rem', borderRadius: '12px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: `${tmpl.color}20`, border: `1px solid ${tmpl.color}50`, padding: '0.6rem', borderRadius: '10px' }}>
                    <Icon size={20} color={tmpl.color} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white' }}>{tmpl.title}</h3>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{tmpl.category}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{tmpl.desc}</p>
                  </div>
                </div>
                <ArrowRight size={18} color="var(--accent-primary)" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
