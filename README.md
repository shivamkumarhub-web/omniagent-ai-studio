# ⚡ OmniAgent Studio — Visual AI Agent & Multi-Model Workflow Orchestrator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://reactjs.org/)

**OmniAgent Studio** is a high-performance visual workflow orchestration engine designed for building, testing, and deploying multi-model AI agent pipelines. It enables software engineers to connect LLM reasoning nodes, RAG vector retrieval, live web search, and secure code sandboxes via an intuitive visual canvas.

---

## 🔥 Key Features

- 🧠 **Multi-Model Orchestration**: Seamlessly chain Google Gemini 1.5 Pro, Anthropic Claude 3.5, OpenAI GPT-4o, and local Ollama models.
- 🎨 **Visual Node Canvas**: Drag-and-drop workflow builder with real-time signal propagation and connection routing.
- ⚡ **Live Streaming Console**: Real-time token streaming, execution step timeline, latency tracing, and token usage metrics.
- 🔒 **Isolated Code Sandbox**: Safe Python/JS execution nodes with webhook action triggers (GitHub PRs, Slack alerts, REST endpoints).
- 📦 **Pre-built Agent Templates**:
  - Automated PR & Security Vulnerability Reviewer
  - Enterprise Document RAG Pipeline
  - Autonomous Customer Support Ticket Resolver

---

## 🛠️ Architecture Overview

```
 [ Prompt / HTTP Trigger ]
           │
           ▼
 [ Web Research Agent ] ──► (Scrapes live web / API data)
           │
           ▼
 [ LLM Reasoner (Gemini 1.5) ] ──► (RAG Context + Prompting)
           │
           ▼
 [ GitHub / Slack Webhook Action ]
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/your-username/omniagent-ai-studio.git
cd omniagent-ai-studio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
