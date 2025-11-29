import React, { useState } from 'react';
import { Database, Search, Plus, Save, Tag } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    date: string;
}

const KnowledgeBase = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'React Hooks 개요',
            content: 'useEffect는 부작용을 처리합니다. useState는 로컬 상태를 관리합니다. useContext는 prop drilling을 방지합니다.',
            tags: ['React', 'Frontend'],
            date: '2023-11-29'
        }
    ]);
    const [isCreating, setIsCreating] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSave = () => {
        if (!newNote.title.trim() || !newNote.content.trim()) return;

        const note: Note = {
            id: Date.now().toString(),
            title: newNote.title,
            content: newNote.content,
            tags: newNote.tags.split(',').map(t => t.trim()).filter(t => t),
            date: new Date().toISOString().split('T')[0]
        };

        setNotes([note, ...notes]);
        setNewNote({ title: '', content: '', tags: '' });
        setIsCreating(false);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto p-8 h-full flex flex-col">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Database className="text-amadeus-accent" />
                        지식 저장소
                    </h2>
                    <p className="text-amadeus-muted">데이터를 저장하십시오. 통찰력을 얻으십시오.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-amadeus-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    새 항목
                </button>
            </header>

            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="신경망 검색..."
                    className="w-full bg-amadeus-card border border-gray-800 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-amadeus-accent focus:ring-1 focus:ring-amadeus-accent transition-all placeholder-gray-600"
                />
            </div>

            {/* Create Modal / Form */}
            {isCreating && (
                <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                    <input
                        type="text"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        placeholder="항목 제목"
                        className="w-full bg-transparent text-2xl font-bold text-white mb-4 focus:outline-none placeholder-gray-600"
                    />
                    <textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        placeholder="데이터 입력..."
                        className="w-full bg-black/20 rounded-lg p-4 text-gray-300 min-h-[150px] mb-4 focus:outline-none resize-none"
                    />
                    <div className="flex items-center gap-2 mb-6">
                        <Tag size={16} className="text-amadeus-accent" />
                        <input
                            type="text"
                            value={newNote.tags}
                            onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                            placeholder="태그 (쉼표로 구분)"
                            className="flex-1 bg-transparent text-sm text-amadeus-muted focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-amadeus-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <Save size={18} />
                            항목 저장
                        </button>
                    </div>
                </div>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4">
                {filteredNotes.map(note => (
                    <div key={note.id} className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/30 transition-all group cursor-pointer h-64 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-amadeus-accent transition-colors line-clamp-1">
                                {note.title}
                            </h3>
                            <span className="text-xs text-gray-600">{note.date}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-4 flex-1 mb-4">
                            {note.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {note.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-amadeus-accent/10 text-amadeus-accent px-2 py-1 rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KnowledgeBase;
