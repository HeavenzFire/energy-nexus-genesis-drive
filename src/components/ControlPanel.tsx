
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ControlPanelProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  oscillationRate: number;
  setOscillationRate: (rate: number) => void;
  entanglementStrength: number;
  setEntanglementStrength: (strength: number) => void;
  efficiency: number;
  setEfficiency: (efficiency: number) => void;
}

const ControlPanel = ({
  isActive,
  setIsActive,
  oscillationRate,
  setOscillationRate,
  entanglementStrength,
  setEntanglementStrength,
  efficiency,
  setEfficiency
}: ControlPanelProps) => {
  const [activationSequence, setActivationSequence] = useState(false);
  
  const handleActivation = () => {
    if (isActive) {
      setIsActive(false);
      return;
    }
    
    // Start activation sequence
    setActivationSequence(true);
    
    // Simulate initialization sequence
    setTimeout(() => {
      setIsActive(true);
      setActivationSequence(false);
    }, 2000);
  };

  return (
    <div className="bg-black/40 rounded-2xl p-4 backdrop-blur-sm border border-energy-purple/20">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-energy-cyan">
        <div className="w-2 h-2 rounded-full bg-energy-cyan mr-2 animate-pulse"></div>
        System Controls
      </h2>
      
      <div className="mb-6">
        <Button 
          variant={isActive ? "destructive" : "default"}
          className={`w-full py-6 text-lg font-bold relative overflow-hidden ${
            isActive 
              ? "bg-red-600 hover:bg-red-700" 
              : "bg-gradient-to-r from-energy-purple to-energy-blue hover:from-energy-blue hover:to-energy-purple"
          }`}
          disabled={activationSequence}
          onClick={handleActivation}
        >
          {activationSequence ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse">Initiating</span>
              <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
              <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </span>
          ) : isActive ? "Shutdown System" : "Activate System"}
          
          {activationSequence && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-flow"></span>
          )}
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-energy-cyan/90">Oscillation Rate</label>
            <span className="text-sm font-mono bg-black/30 px-2 rounded">
              {oscillationRate.toFixed(1)}%
            </span>
          </div>
          <Slider
            value={[oscillationRate]}
            min={10} 
            max={100} 
            step={0.1}
            onValueChange={(value) => setOscillationRate(value[0])}
            className={`${isActive ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!isActive}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-energy-cyan/90">Entanglement Strength</label>
            <span className="text-sm font-mono bg-black/30 px-2 rounded">
              {entanglementStrength.toFixed(1)}%
            </span>
          </div>
          <Slider 
            value={[entanglementStrength]}
            min={10} 
            max={100} 
            step={0.1}
            onValueChange={(value) => setEntanglementStrength(value[0])}
            className={`${isActive ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!isActive}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-energy-cyan/90">System Efficiency</label>
            <span className="text-sm font-mono bg-black/30 px-2 rounded">
              {efficiency.toFixed(1)}%
            </span>
          </div>
          <Slider 
            value={[efficiency]}
            min={40} 
            max={95} 
            step={0.1}
            onValueChange={(value) => setEfficiency(value[0])}
            className={`${isActive ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            disabled={!isActive}
          />
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-energy-purple/20 text-xs text-energy-cyan/60">
        <p className="mb-1">Control Module v2.5.3 | Quantum Interface</p>
        <p>Firmware: QES-2025.04</p>
      </div>
    </div>
  );
};

export default ControlPanel;
