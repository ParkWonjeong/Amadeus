import React, { useState } from 'react';
import { Target, CheckSquare, Plus, Sparkles, Trash2 } from 'lucide-react';

interface Mission {
    id: string;
    title: string;
    completed: boolean;
    subtasks: { id: string; title: string; completed: boolean }[];
}

const MissionLog = () => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const addMission = () => {
        if (!input.trim()) return;

        setIsGenerating(true);
        // Simulate AI generation delay
        setTimeout(() => {
            const newMission: Mission = {
                id: Date.now().toString(),
                title: input,
                completed: false,
                subtasks: [
                    { id: '1', title: '요구사항 분석', completed: false },
                    { id: '2', title: '핵심 개념 연구', completed: false },
                    { id: '3', title: '구현 실행', completed: false },
                ]
            };
            setMissions([newMission, ...missions]);
            setInput('');
            setIsGenerating(false);
        }, 1000);
    };

    const toggleMission = (id: string) => {
        setMissions(missions.map(m =>
            m.id === id ? { ...m, completed: !m.completed } : m
        ));
    };

    const toggleSubtask = (missionId: string, subtaskId: string) => {
        setMissions(missions.map(m => {
            if (m.id === missionId) {
                return {
                    ...m,
                    subtasks: m.subtasks.map(s =>
                        s.id === subtaskId ? { ...s, completed: !s.completed } : s
                    )
                };
            }
            return m;
        }));
    };

    const deleteMission = (id: string) => {
        setMissions(missions.filter(m => m.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-8 h-full flex flex-col">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Target className="text-amadeus-accent" />
                    미션 관리
                </h2>
                <p className="text-amadeus-muted">목표를 정의하십시오. 계획을 실행하십시오.</p>
            </header>

            {/* Input Section */}
            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMission()}
                    placeholder="새로운 목표 입력 (예: 'React Hooks 마스터하기')"
                    className="flex-1 bg-amadeus-card border border-gray-800 text-white rounded-xl px-6 py-4 focus:outline-none focus:border-amadeus-accent focus:ring-1 focus:ring-amadeus-accent transition-all placeholder-gray-600"
                />
                <button
                    onClick={addMission}
                    disabled={!input.trim() || isGenerating}
                    className="bg-amadeus-accent text-white px-8 py-4 rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isGenerating ? <Sparkles className="animate-spin" /> : <Plus />}
                    미션 추가
                </button>
            </div>

            {/* Missions List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {missions.map(mission => (
                    <div key={mission.id} className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleMission(mission.id)}
                                    className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${mission.completed
                                        ? 'bg-amadeus-accent border-amadeus-accent text-white'
                                        : 'border-gray-600 hover:border-amadeus-accent'
                                        }`}
                                >
                                    {mission.completed && <CheckSquare size={14} />}
                                </button>
                                <h3 className={`text-xl font-semibold ${mission.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                                    {mission.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => deleteMission(mission.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Subtasks */}
                        <div className="pl-10 space-y-2">
                            {mission.subtasks.map(subtask => (
                                <div key={subtask.id} className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleSubtask(mission.id, subtask.id)}
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${subtask.completed
                                            ? 'bg-amadeus-accent/50 border-amadeus-accent/50 text-white'
                                            : 'border-gray-700 hover:border-gray-500'
                                            }`}
                                    >
                                        {subtask.completed && <CheckSquare size={10} />}
                                    </button>
                                    <span className={`text-sm ${subtask.completed ? 'text-gray-600 line-through' : 'text-amadeus-muted'}`}>
                                        {subtask.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {missions.length === 0 && (
                    <div className="text-center py-20 text-gray-600">
                        <Target size={48} className="mx-auto mb-4 opacity-20" />
                        <p>활성 미션이 없습니다. 새로운 목표를 시작하십시오.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionLog;
