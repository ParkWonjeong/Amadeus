import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketChartProps {
    title: string;
    data: { date: string; price: number }[];
    currentPrice: number;
    change: number;
}

const MarketChart: React.FC<MarketChartProps> = ({ title, data, currentPrice, change }) => {
    const isPositive = change >= 0;

    return (
        <div className="bg-amadeus-card border border-gray-800 rounded-xl p-6 hover:border-amadeus-accent/50 transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-amadeus-accent transition-colors">{title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl font-bold text-white">${currentPrice.toLocaleString()}</span>
                        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-amadeus-accent' : 'text-red-500'}`}>
                            {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                            {change}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="date"
                            hide={true}
                        />
                        <YAxis
                            hide={true}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0a1a0a',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#22c55e' }}
                            labelStyle={{ color: '#86efac', marginBottom: '4px' }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: '#22c55e' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MarketChart;
