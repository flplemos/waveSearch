import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// 1. Define o formato dos dados
interface TideData {
  time: string;
  height: number;
}

// 2. Define que o componente aceita 'data' como propriedade
interface TideChartProps {
  data?: TideData[];
}

export const TideChart: React.FC<TideChartProps> = ({ data }) => {
  
  // 3. Se não vier dados (ou lista vazia), mostra aviso
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[200px] mt-6 flex flex-col items-center justify-center text-gray-400 bg-white/5 rounded-xl border border-white/10">
        <p>Aguardando dados...</p>
      </div>
    );
  }

  // 4. Calcula min/max para o gráfico não ficar achatado
  const heights = data.map(d => d.height);
  const maxVal = Math.max(...heights) + 0.2;
  const minVal = Math.min(...heights) - 0.2;

  return (
    <div className="w-full h-[200px] mt-6">
      <div className="flex justify-between items-end mb-4 px-2">
        <h3 className="text-white text-lg font-medium">Tábua de Marés (Hoje)</h3>
        <span className="text-xs text-gray-400">Nível do Mar (m)</span>
      </div>
      
      <div className="w-full h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          {/* 5. Passa os dados recebidos para o gráfico */}
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5EADED" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#5EADED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              interval={3} 
            />
            <YAxis hide domain={[minVal, maxVal]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#5EADED' }}
              formatter={(value: number) => [`${value.toFixed(2)}m`, 'Altura']}
            />
            <Area 
              type="monotone" 
              dataKey="height" 
              stroke="#5EADED" 
              fillOpacity={1} 
              fill="url(#colorHeight)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};