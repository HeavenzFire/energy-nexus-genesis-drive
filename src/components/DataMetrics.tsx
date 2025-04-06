
import { Progress } from "@/components/ui/progress";

interface DataMetricsProps {
  power: number;
  oscillationRate: number;
  entanglementStrength: number;
  efficiency: number;
}

const DataMetrics = ({ power, oscillationRate, entanglementStrength, efficiency }: DataMetricsProps) => {
  // Calculate theoretical energy output
  const energyOutput = power * (efficiency / 100) * 2.5;
  
  // Calculate various metrics based on the current state
  const calculateMetrics = () => {
    const quantumFlux = oscillationRate * entanglementStrength / 100;
    const stability = Math.min(100, 70 + ((efficiency - 50) / 50) * 30);
    const theoreticalMax = oscillationRate * entanglementStrength * efficiency / (100 * 100);
    
    return {
      quantumFlux: quantumFlux.toFixed(2),
      stability: stability.toFixed(1),
      theoreticalMax: theoreticalMax.toFixed(2)
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <div className="bg-black/40 rounded-2xl p-4 backdrop-blur-sm border border-energy-purple/20">
      <h2 className="text-xl font-semibold mb-4 text-energy-cyan">Energy Output Metrics</h2>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-energy-cyan/90">Energy Output</span>
            <span className="text-xs font-mono text-energy-cyan">{typeof energyOutput === 'number' ? energyOutput.toFixed(2) : 0} kW</span>
          </div>
          <Progress value={energyOutput} max={250} className="h-2"
            style={{
              background: 'rgba(5, 217, 232, 0.2)',
              '--progress-background': 'linear-gradient(90deg, #05D9E8, #FF0099)',
            } as React.CSSProperties}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-black/30 p-3 rounded-lg border border-energy-blue/20">
            <p className="text-xs text-energy-cyan/70 mb-1">Quantum Flux</p>
            <p className="text-lg font-mono text-energy-cyan">{metrics.quantumFlux}</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg border border-energy-blue/20">
            <p className="text-xs text-energy-cyan/70 mb-1">Field Stability</p>
            <p className="text-lg font-mono text-energy-cyan">{metrics.stability}%</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg border border-energy-blue/20">
            <p className="text-xs text-energy-cyan/70 mb-1">Theoretical Max</p>
            <p className="text-lg font-mono text-energy-cyan">{metrics.theoreticalMax} kW</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg border border-energy-blue/20">
            <p className="text-xs text-energy-cyan/70 mb-1">Efficiency Rate</p>
            <p className="text-lg font-mono text-energy-cyan">{efficiency}%</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-energy-purple/20">
          <p className="text-xs text-energy-cyan/60">
            Current oscillation rate: {oscillationRate}% | Entanglement: {entanglementStrength}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataMetrics;
