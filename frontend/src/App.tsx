import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import { LayoutDashboard, MessageSquare } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat'>('dashboard');

  return (
    <div className="flex h-screen bg-amadeus-dark text-amadeus-text overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-amadeus-card border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tighter text-white">AMADEUS</h1>
          <p className="text-xs text-amadeus-muted mt-1">개인 AI 비서</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard'
              ? 'bg-amadeus-accent/10 text-amadeus-accent'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">대시보드</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'chat'
              ? 'bg-amadeus-accent/10 text-amadeus-accent'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">채팅</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
            <div>
              <p className="text-sm font-medium text-white">사용자</p>
              <p className="text-xs text-gray-500">온라인</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="h-full overflow-y-auto p-8">
          {activeTab === 'dashboard' ? <Dashboard /> : <ChatInterface />}
        </div>
      </main>
    </div>
  );
}

export default App;
