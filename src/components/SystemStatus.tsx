
import { Progress } from "@/components/ui/progress";

interface SystemStatusProps {
  isActive: boolean;
  power: number;
  systemLoad: number;
}

const SystemStatus = ({ isActive, power, systemLoad }: SystemStatusProps) => {
  // Calculate theoretically saved batteries
  const savedBatteries = Math.floor(power * 2.5);
  
  return (
    <div className="bg-black/40 rounded-2xl p-4 backdrop-blur-sm border border-energy-purple/20">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-energy-cyan">
        <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        System Status
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-energy-cyan/90">Core Power</span>
            <span className={`text-xs font-mono ${power > 80 ? 'text-energy-magenta' : 'text-energy-cyan'}`}>
              {power.toFixed(1)}%
            </span>
          </div>
          <Progress value={power} className="h-2" 
            style={{
              background: 'rgba(5, 217, 232, 0.2)',
              '--progress-background': `linear-gradient(90deg, #0E7FFF, ${power > 50 ? '#FF0099' : '#05D9E8'})`,
            } as React.CSSProperties}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-energy-cyan/90">System Load</span>
            <span className="text-xs font-mono text-energy-cyan">{systemLoad.toFixed(1)}%</span>
          </div>
          <Progress value={systemLoad} className="h-2"
            style={{
              background: 'rgba(5, 217, 232, 0.2)',
              '--progress-background': `linear-gradient(90deg, #05D9E8, #0E7FFF)`,
            } as React.CSSProperties}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-energy-cyan/90">Entanglement Field</span>
            <span className={`text-xs font-mono ${isActive ? 'text-energy-cyan' : 'text-gray-500'}`}>
              {isActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          <div className={`h-8 rounded-md border ${
            isActive 
              ? 'border-energy-cyan bg-energy-cyan/10' 
              : 'border-gray-700 bg-black/30'
          } flex items-center justify-center overflow-hidden`}>
            {isActive && (
              <div className="quantum-field w-full h-full animate-pulse"></div>
            )}
            <span className="absolute text-xs font-mono">
              {isActive ? 'Quantum flux stabilized' : 'Field offline'}
            </span>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-black/30 rounded-lg border border-green-500/20">
          <h3 className="text-sm font-semibold text-green-400 mb-2">Battery Replacement Stats</h3>
          <p className="text-2xl font-mono text-green-300">{savedBatteries} <span className="text-xs">units</span></p>
          <p className="text-xs text-green-400/70">Equivalent batteries made obsolete</p>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
