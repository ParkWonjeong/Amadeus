import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sun, Cloud, CloudRain, Newspaper, Activity, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface BriefingData {
    news: { title: string; source: string; time: string }[];
    weather: { temp: number; condition: string; location: string; humidity: number };
    status: string;
}

const Dashboard = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "좋은 아침입니다.";
        if (hour >= 12 && hour < 18) return "좋은 오후입니다.";
        if (hour >= 18 && hour < 22) return "좋은 저녁입니다.";
        return "편안한 밤 되세요.";
    };

    const [data, setData] = useState<BriefingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/briefing');
                setData(response.data);
            } catch (err) {
                setError('브리핑 데이터를 불러오는데 실패했습니다. 백엔드가 실행 중인가요?');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amadeus-accent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{getGreeting()}</h2>
                <p className="text-amadeus-muted">오늘의 데일리 브리핑입니다.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weather Card */}
                <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-amadeus-accent transition-colors">날씨</h3>
                        {data?.weather.condition === 'Sunny' ? <Sun className="text-yellow-500" /> : <Cloud className="text-gray-400" />}
                    </div>
                    <div className="flex items-end space-x-2">
                        <span className="text-4xl font-bold text-white">{data?.weather.temp}°C</span>
                        <span className="text-amadeus-muted mb-1">{data?.weather.location}</span>
                    </div>
                    <p className="text-sm text-amadeus-muted mt-2">{data?.weather.condition}, Humidity {data?.weather.humidity}%</p>
                </div>

                {/* System Status Card */}
                <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-amadeus-accent transition-colors">시스템 상태</h3>
                        <Activity className="text-green-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-white font-medium">정상 작동 중</span>
                    </div>
                    <p className="text-sm text-amadeus-muted mt-2">{data?.status}</p>
                </div>

                {/* Time Card */}
                <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/50 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-amadeus-accent transition-colors">시간</h3>
                        <Clock className="text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <p className="text-sm text-amadeus-muted mt-2">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* News Section */}
            <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <Newspaper className="text-amadeus-accent" />
                    <h3 className="text-xl font-bold text-white">시장 정보</h3>
                </div>

                <div className="space-y-4">
                    {data?.news.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-gray-700">
                            <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                <div className="flex items-center space-x-3 text-xs text-amadeus-muted">
                                    <span className="bg-amadeus-accent/10 text-amadeus-accent px-2 py-0.5 rounded">{item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
