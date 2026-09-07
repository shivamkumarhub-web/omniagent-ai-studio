import React from 'react';
import { Terminal, Cpu, Clock, CheckCircle, Zap, ShieldCheck, Copy } from 'lucide-react';

export default function ExecutionConsole({ logs, isExecuting, metrics }) {
  return (
    <div className="glass-panel" style={{ height: '220px', borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0.5rem 1.25rem', background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Terminal size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Execution Output & Stream Log</span>
          {isExecuting && (
            <span style={{ fontSize: '0.65rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '0.1rem 0.5rem', borderRadius: '999px', border: '1px solid rgba(6, 182, 212, 0.3)', fontWeight: '600' }}>Live Stream</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={13} color="var(--accent-amber)" />
            <span>Latency: <strong style={{ color: 'white' }}>{metrics.latency}ms</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Zap size={13} color="var(--accent-emerald)" />
            <span>Tokens: <strong style={{ color: 'white' }}>{metrics.tokens}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={13} color="var(--accent-primary)" />
            <span>Sandbox: <strong style={{ color: 'var(--accent-emerald)' }}>Isolated</strong></span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0.85rem 1.25rem', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(9, 13, 22, 0.95)', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>▶ Press "Run Pipeline" to execute visual agent graph...</span>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: '1.4' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', minWidth: '70px' }}>{log.time}</span>
              <span style={{ 
                color: log.type === 'error' ? 'var(--accent-rose)' : log.type === 'success' ? 'var(--accent-emerald)' : log.type === 'info' ? 'var(--accent-cyan)' : '#e5e7eb' 
              }}>
                {log.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
