import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

const FocusMode = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === 'focus') {
                // Focus session ended, switch to break
                setMode('break');
                setTimeLeft(5 * 60);
                new Notification("집중 세션 완료", { body: "잠시 휴식을 취하세요!" });
            } else {
                // Break ended, switch to focus
                setMode('focus');
                setTimeLeft(25 * 60);
                new Notification("휴식 종료", { body: "다시 집중할 준비가 되셨나요?" });
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setMode('focus');
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = mode === 'focus'
        ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
        : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    {mode === 'focus' ? <Brain className="text-amadeus-accent" size={40} /> : <Coffee className="text-yellow-500" size={40} />}
                    {mode === 'focus' ? '전술적 집중' : '시스템 재충전'}
                </h2>
                <p className="text-amadeus-muted text-lg">
                    {mode === 'focus' ? '방해 요소를 제거하십시오. 목표를 실행하십시오.' : '에너지를 회복하십시오. 다음 사이클을 준비하십시오.'}
                </p>
            </div>

            {/* Timer Display */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                {/* Circular Progress Background */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#0a1a0a"
                        strokeWidth="8"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={mode === 'focus' ? '#22c55e' : '#eab308'}
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * progress) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                <div className="text-7xl font-mono font-bold text-white tracking-wider z-10">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
                <button
                    onClick={toggleTimer}
                    className={`p-6 rounded-full transition-all transform hover:scale-105 ${isActive
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                        : 'bg-amadeus-accent/20 text-amadeus-accent hover:bg-amadeus-accent/30'
                        }`}
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="p-6 rounded-full bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white transition-all transform hover:scale-105"
                >
                    <RotateCcw size={32} />
                </button>
            </div>
        </div>
    );
};

export default FocusMode;
