
import { useState, useEffect, useRef } from 'react';
import PowerGeneratorVisual from '@/components/PowerGeneratorVisual';
import ControlPanel from '@/components/ControlPanel';
import DataMetrics from '@/components/DataMetrics';
import SystemStatus from '@/components/SystemStatus';

const Index = () => {
  const [power, setPower] = useState(0);
  const [efficiency, setEfficiency] = useState(80);
  const [oscillationRate, setOscillationRate] = useState(70);
  const [entanglementStrength, setEntanglementStrength] = useState(65);
  const [isActive, setIsActive] = useState(false);
  const [systemLoad, setSystemLoad] = useState(45);
  const powerRef = useRef(0);
  
  useEffect(() => {
    if (!isActive) {
      if (power > 0) {
        const interval = setInterval(() => {
          setPower(prev => Math.max(0, prev - 0.5));
        }, 100);
        return () => clearInterval(interval);
      }
      return;
    }
    
    const generatePower = () => {
      // Using oscillationRate and entanglementStrength to calculate power generation
      const baseGeneration = (oscillationRate / 100) * (entanglementStrength / 100) * 10;
      const efficiencyFactor = efficiency / 100;
      const randomFactor = 0.9 + Math.random() * 0.2; // Some randomness in generation
      
      const newPowerValue = Math.min(100, powerRef.current + (baseGeneration * efficiencyFactor * randomFactor * 0.4));
      powerRef.current = newPowerValue;
      setPower(newPowerValue);
      
      // Dynamically adjust system load based on generation
      setSystemLoad(40 + Math.random() * 10 + (newPowerValue > 80 ? 20 : 0));
    };
    
    const interval = setInterval(generatePower, 300);
    return () => clearInterval(interval);
  }, [isActive, oscillationRate, entanglementStrength, efficiency]);
  
  return (
    <div className="min-h-screen energy-gradient-bg p-4 md:p-8 flex flex-col overflow-hidden">
      <header className="mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-energy-cyan bg-clip-text text-transparent bg-gradient-to-r from-energy-blue to-energy-magenta mb-2">
          Quantum Oscillating Entangled Power Generator
        </h1>
        <p className="text-energy-cyan/80 max-w-2xl">
          The world's first digital power station utilizing quantum entanglement oscillation technology
          to generate clean, limitless energy without the need for batteries.
        </p>
      </header>
      
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Left panel - Visuals */}
        <div className="flex-1 bg-black/40 rounded-2xl backdrop-blur-sm border border-energy-purple/20 overflow-hidden">
          <PowerGeneratorVisual 
            isActive={isActive}
            oscillationRate={oscillationRate}
            entanglementStrength={entanglementStrength}
            power={power}
          />
        </div>
        
        {/* Right panel - Controls & Data */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <ControlPanel 
            isActive={isActive}
            setIsActive={setIsActive}
            oscillationRate={oscillationRate}
            setOscillationRate={setOscillationRate}
            entanglementStrength={entanglementStrength}
            setEntanglementStrength={setEntanglementStrength}
            efficiency={efficiency}
            setEfficiency={setEfficiency}
          />
          
          <DataMetrics 
            power={power}
            oscillationRate={oscillationRate}
            entanglementStrength={entanglementStrength}
            efficiency={efficiency}
          />
          
          <SystemStatus 
            isActive={isActive}
            power={power}
            systemLoad={systemLoad}
          />
        </div>
      </div>
      
      <footer className="mt-8 text-center text-sm text-energy-cyan/60">
        <p>Quantum Entanglement Power Generation System v1.0 | &copy; {new Date().getFullYear()} Cosmic Energy Nexus</p>
      </footer>
    </div>
  );
};

export default Index;
