import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { checkBackendHealth } from './services/api';
import { HealthStatus } from './types';

export const App: React.FC = () => {
  const [backendHealth, setBackendHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkBackendHealth();
      setBackendHealth(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to backend server');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">StudyForge</span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Phase 1 Foundation
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Monorepo Baseline
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900/40 via-slate-800/40 to-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered College Learning Platform
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Study smarter with grounded RAG, AI quizzes, and weakness tracking.
            </h1>
            <p className="mt-3 text-slate-300 text-base leading-relaxed">
              StudyForge empowers university students to upload course lecture notes, ask grounded questions with page-accurate citations via <strong className="text-white">Google Gemini 3.8 Flash</strong>, and test their mastery through automated quiz generation.
            </p>
          </div>
        </section>

        {/* System Architecture Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Foundation Architecture & Health Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* React Frontend Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 flex flex-col justify-between hover:border-slate-600 transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Cpu className="w-5 h-5" />
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active (Vite + React)
                  </span>
                </div>
                <h3 className="font-semibold text-white text-base">Frontend Tier</h3>
                <p className="text-xs text-slate-400 mt-1">
                  React 18 SPA with TypeScript, Tailwind CSS, Lucide icons, and Axios API layer.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-400">
                Port: <code className="text-cyan-300 bg-slate-900/60 px-1.5 py-0.5 rounded">5173</code>
              </div>
            </div>

            {/* Spring Boot Backend Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 flex flex-col justify-between hover:border-slate-600 transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Server className="w-5 h-5" />
                  </span>
                  {loading ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Checking...
                    </span>
                  ) : backendHealth?.status === 'UP' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> UP
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-400 border border-slate-600">
                      <AlertCircle className="w-3 h-3" /> Standby
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-white text-base">Spring Boot 3 Core</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Maven-built enterprise Java backend with Spring Security, Spring Data JPA, and Flyway.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Port: <code className="text-emerald-300 bg-slate-900/60 px-1.5 py-0.5 rounded">8080</code></span>
                <button 
                  onClick={fetchHealth} 
                  disabled={loading}
                  className="hover:text-white flex items-center gap-1 transition"
                  title="Check connection"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Ping
                </button>
              </div>
            </div>

            {/* AI Service & PostgreSQL Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 flex flex-col justify-between hover:border-slate-600 transition">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Database className="w-5 h-5" />
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    FastAPI + pgvector
                  </span>
                </div>
                <h3 className="font-semibold text-white text-base">AI Engine & pgvector</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Python FastAPI microservice, Gemini 3.8 Flash, and 768-dim Gemini Embedding 2 vectors in PostgreSQL 16.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/60 text-xs text-slate-400">
                Port: <code className="text-indigo-300 bg-slate-900/60 px-1.5 py-0.5 rounded">8000</code> & <code className="text-indigo-300 bg-slate-900/60 px-1.5 py-0.5 rounded">5432</code>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <span>Notice: Backend is in standby ({error}). Start the Spring Boot backend (`mvnw.cmd spring-boot:run` or docker compose) to link services.</span>
              <button 
                onClick={fetchHealth} 
                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 rounded font-medium transition"
              >
                Retry
              </button>
            </div>
          )}
        </section>

        {/* Security & Portfolio Practices Banner */}
        <section className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Phase 1 Foundation Standards Verified
          </h3>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Strict secret isolation (zero API keys or credentials in Git)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>PostgreSQL 16 + pgvector configured for 768-dim embeddings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Docker Compose ready for one-command local orchestration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>All 3 tiers independently buildable and testable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Spring Boot 3 + Maven foundation with Flyway V1 migration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Python FastAPI initialized with Gemini 3.8 Flash config</span>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        StudyForge — Academic AI Learning Platform • Designed for Portfolio & Engineering Interviews
      </footer>
    </div>
  );
};

export default App;
