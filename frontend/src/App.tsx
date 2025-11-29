import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import FocusMode from './components/FocusMode';
import MissionLog from './components/MissionLog';
import KnowledgeBase from './components/KnowledgeBase';
import { LayoutDashboard, MessageSquare, Brain, Target, Coffee, Database } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
    { id: 'chat', icon: MessageSquare, label: '채팅' },
    { id: 'focus', icon: Coffee, label: '집중 모드' },
    { id: 'missions', icon: Target, label: '미션 관리' },
    { id: 'knowledge', icon: Database, label: '지식 저장소' },
  ];

  return (
    <div className="flex h-screen bg-amadeus-dark text-amadeus-text overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-amadeus-card border-r border-gray-800 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative">
              <div className="w-10 h-10 bg-amadeus-accent rounded-xl flex items-center justify-center shadow-lg shadow-amadeus-accent/20 z-10 relative">
                <Brain className="text-amadeus-dark" size={24} />
              </div>
              <div className="absolute inset-0 bg-amadeus-accent rounded-xl animate-ping opacity-20"></div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Amadeus</h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-amadeus-accent font-mono tracking-wider">TACTICAL OS v1.0</p>
            <div className="flex items-center space-x-1.5 bg-amadeus-card px-2 py-1 rounded border border-amadeus-accent/20">
              <div className="w-1.5 h-1.5 rounded-full bg-amadeus-accent animate-pulse"></div>
              <span className="text-[10px] text-amadeus-muted font-mono">NEURAL SYNC</span>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                  ? 'bg-amadeus-accent text-white shadow-lg shadow-amadeus-accent/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-700"></div>
            <div>
              <p className="text-sm font-medium text-white">박원정</p>
              <p className="text-xs text-gray-500">온라인</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="h-full overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'focus' && <FocusMode />}
          {activeTab === 'missions' && <MissionLog />}
          {activeTab === 'knowledge' && <KnowledgeBase />}
        </div>
      </main>
    </div>
  );
}

export default App;
