import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';

interface DataMetricsProps {
  power: number;
  oscillationRate: number;
  entanglementStrength: number;
  efficiency: number;
}

const DataMetrics = ({ power, oscillationRate, entanglementStrength, efficiency }: DataMetricsProps) => {
  const [powerData, setPowerData] = useState<Array<{ time: number; value: number }>>([]);
  
  useEffect(() => {
    // Add new data point
    setPowerData(prevData => {
      const newData = [...prevData, { 
        time: Date.now(), 
        value: power
      }];
      
      // Keep only the last 50 data points
      if (newData.length > 50) {
        return newData.slice(-50);
      }
      return newData;
    });
  }, [power]);
  
  // Calculate metrics
  const outputWatts = Math.round(power * 20 * efficiency / 100);
  const predictedDaily = Math.round(outputWatts * 24 * (efficiency / 100));
  
  return (
    <div className="bg-black/40 rounded-2xl p-4 backdrop-blur-sm border border-energy-purple/20">
      <h2 className="text-xl font-semibold mb-1 flex items-center text-energy-cyan">
        <div className="w-2 h-2 rounded-full bg-energy-cyan mr-2 animate-pulse"></div>
        Output Metrics
      </h2>
      
      <div className="h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={powerData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={[0, 100]} hide={true} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-black/80 border border-energy-cyan/30 p-2 text-xs rounded">
                      <p className="text-energy-cyan">{`Power: ${payload[0].value.toFixed(1)}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#powerLine)" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <defs>
              <linearGradient id="powerLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#05D9E8" />
                <stop offset="100%" stopColor="#FF0099" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-xs text-energy-cyan/70">Current Output</p>
          <p className="text-xl font-mono text-energy-cyan">
            {outputWatts} <span className="text-xs">kW</span>
          </p>
        </div>
        
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-xs text-energy-cyan/70">Efficiency</p>
          <p className="text-xl font-mono text-energy-cyan">
            {efficiency.toFixed(1)}<span className="text-xs">%</span>
          </p>
        </div>
        
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-xs text-energy-cyan/70">Est. Daily Output</p>
          <p className="text-xl font-mono text-energy-cyan">
            {predictedDaily} <span className="text-xs">kWh</span>
          </p>
        </div>
        
        <div className="bg-black/30 p-2 rounded-lg">
          <p className="text-xs text-energy-cyan/70">Oscillation</p>
          <p className="text-xl font-mono text-energy-cyan">
            {oscillationRate.toFixed(1)}<span className="text-xs">Hz</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataMetrics;
