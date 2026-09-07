import React from 'react';
import { Trash2, CheckCircle2, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

export default function Canvas({ nodes, connections, activeNodeId, onSelectNode, onDeleteNode, isExecuting }) {
  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.4) 0%, rgba(9, 13, 22, 0.9) 100%)' }}>
      {/* Grid Background Pattern */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Connection Lines between nodes */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        {connections.map((conn, idx) => {
          const sourceNode = nodes.find(n => n.id === conn.source);
          const targetNode = nodes.find(n => n.id === conn.target);
          if (!sourceNode || !targetNode) return null;

          const x1 = sourceNode.x + 220;
          const y1 = sourceNode.y + 40;
          const x2 = targetNode.x;
          const y2 = targetNode.y + 40;

          const dx = Math.abs(x2 - x1) * 0.5;

          return (
            <g key={idx}>
              <path
                d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={isExecuting && activeNodeId === conn.source ? '#6366f1' : 'rgba(99, 102, 241, 0.4)'}
                strokeWidth="3"
                className={isExecuting && activeNodeId === conn.source ? 'connection-active' : ''}
              />
              <circle cx={x2} cy={y2} r="4" fill="#6366f1" />
            </g>
          );
        })}
      </svg>

      {/* Nodes Render Canvas */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', padding: '2rem', zIndex: 20 }}>
        {nodes.map((node) => {
          const Icon = node.type.icon;
          const isCurrentActive = activeNodeId === node.id;
          
          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className={`glass-panel glass-panel-interactive ${isCurrentActive && isExecuting ? 'running-glow' : ''}`}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: '220px',
                padding: '0.85rem 1rem',
                border: isCurrentActive ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-color)',
                borderRadius: '14px',
                cursor: 'pointer',
                background: isCurrentActive ? 'rgba(31, 41, 55, 0.9)' : 'rgba(17, 24, 39, 0.8)',
                boxShadow: isCurrentActive ? '0 8px 30px rgba(99, 102, 241, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ background: `${node.type.color}25`, border: `1px solid ${node.type.color}60`, padding: '0.4rem', borderRadius: '8px' }}>
                    <Icon size={16} color={node.type.color} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white' }}>{node.title}</span>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteNode(node.id); }}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.6 }}
                >
                  <Trash2 size={14} color="var(--text-secondary)" />
                </button>
              </div>

              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                {node.config || 'Default Parameters'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {node.status === 'running' && (
                    <>
                      <Loader2 size={12} className="spin" color="var(--accent-cyan)" />
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: '600' }}>Processing</span>
                    </>
                  )}
                  {node.status === 'completed' && (
                    <>
                      <CheckCircle2 size={12} color="var(--accent-emerald)" />
                      <span style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>Ready (12ms)</span>
                    </>
                  )}
                  {node.status === 'idle' && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Standby</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
