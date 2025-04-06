
import { useEffect, useRef } from 'react';

interface PowerGeneratorVisualProps {
  isActive: boolean;
  oscillationRate: number;
  entanglementStrength: number;
  power: number;
}

const PowerGeneratorVisual = ({
  isActive,
  oscillationRate,
  entanglementStrength,
  power
}: PowerGeneratorVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement as HTMLElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particles setup
    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      entangled?: { x: number; y: number; size: number; speedX: number; speedY: number; color: string };
    }> = [];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 1 + Math.random() * 3;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.5;
      
      // Gradient colors for particles
      const colors = ['#0E7FFF', '#7B42F6', '#05D9E8', '#FF0099'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particles.push({ x, y, size, speedX, speedY, color });
    }
    
    // Create entangled pairs
    const entangledCount = Math.floor(particleCount / 2);
    for (let i = 0; i < entangledCount; i++) {
      const particleA = particles[i];
      const particleB = particles[i + entangledCount];
      
      if (particleA && particleB) {
        particleA.entangled = particleB;
        particleB.entangled = particleA;
      }
    }
    
    let animationFrameId: number;
    
    // Digital Singularity effect parameters
    const singularityX = canvas.width / 2;
    const singularityY = canvas.height / 2;
    let singularityStrength = 0;
    let singularityRadius = 10;
    let singularityPulse = 0;
    let singularityRotation = 0;
    
    // Animation loop
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Skip animation if system is inactive and power is low
      if (!isActive && power < 5) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      // Calculate oscillation and entanglement factors based on controls
      const oscillationFactor = isActive ? oscillationRate / 100 : Math.max(0.1, power / 200);
      const entanglementFactor = isActive ? entanglementStrength / 100 : Math.max(0.1, power / 200);
      
      // Update singularity parameters
      if (isActive) {
        singularityStrength = Math.min(singularityStrength + 0.01, power / 50);
        singularityRadius = 10 + (Math.sin(Date.now() / 1000) * 5);
        singularityPulse += 0.05;
        singularityRotation += 0.02 * (oscillationFactor / 2);
      } else {
        singularityStrength = Math.max(0, singularityStrength - 0.01);
      }
      
      // Draw digital singularity
      if (singularityStrength > 0) {
        // Draw singularity effect layers
        for (let i = 0; i < 5; i++) {
          const radius = singularityRadius * (1 + i * 0.5) * (1 + Math.sin(singularityPulse + i) * 0.2);
          const gradient = ctx.createRadialGradient(
            singularityX, singularityY, 0,
            singularityX, singularityY, radius * 2
          );
          
          // Create pulsing, layered effect with colors based on power
          const alpha = (0.7 - i * 0.1) * singularityStrength;
          const hue = (220 + i * 20 + singularityPulse * 10) % 360;
          
          gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${alpha})`);
          gradient.addColorStop(0.4, `hsla(${hue + 30}, 100%, 60%, ${alpha * 0.7})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          
          // Create distorted circle for singularity
          for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            const distortedRadius = radius * (1 + Math.sin(angle * 3 + singularityPulse) * 0.1);
            const x = singularityX + Math.cos(angle + singularityRotation) * distortedRadius;
            const y = singularityY + Math.sin(angle + singularityRotation) * distortedRadius;
            
            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw singularity core
        const coreGradient = ctx.createRadialGradient(
          singularityX, singularityY, 0,
          singularityX, singularityY, singularityRadius / 2
        );
        
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, `rgba(5, 217, 232, ${0.7 * singularityStrength})`);
        coreGradient.addColorStop(1, `rgba(123, 66, 246, ${0.5 * singularityStrength})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(singularityX, singularityY, singularityRadius / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw energy core
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const coreRadius = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Draw outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, coreRadius * 0.5,
        centerX, centerY, coreRadius * 2
      );
      glowGradient.addColorStop(0, `rgba(123, 66, 246, ${0.2 + (oscillationFactor * 0.4)})`);
      glowGradient.addColorStop(0.5, `rgba(11, 127, 255, ${0.1 + (oscillationFactor * 0.2)})`);
      glowGradient.addColorStop(1, 'rgba(5, 217, 232, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw core
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreRadius
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 + (power / 500)})`);
      coreGradient.addColorStop(0.4, `rgba(5, 217, 232, ${0.7 + (power / 500)})`);
      coreGradient.addColorStop(0.8, `rgba(11, 127, 255, ${0.4 + (oscillationFactor * 0.3)})`);
      coreGradient.addColorStop(1, `rgba(123, 66, 246, ${0.2 + (oscillationFactor * 0.2)})`);
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * (0.8 + Math.sin(Date.now() / 1000) * 0.1), 0, Math.PI * 2);
      ctx.fill();
      
      // Draw energy orbits
      for (let i = 1; i <= 3; i++) {
        const orbitRadius = coreRadius * (1.5 + i * 0.5);
        ctx.strokeStyle = `rgba(5, 217, 232, ${0.1 + (oscillationFactor * 0.2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        // Only update if the system is active or has power
        if (isActive || power > 0) {
          // Apply circular motion tendency
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 10) {
            const gravitationalPull = 0.02 * (isActive ? 1 : power / 100);
            particle.speedX += (dx / distance) * gravitationalPull;
            particle.speedY += (dy / distance) * gravitationalPull;
          }
          
          // Apply singularity effect - pulling particles towards the center
          if (singularityStrength > 0) {
            const singDx = singularityX - particle.x;
            const singDy = singularityY - particle.y;
            const singDistance = Math.sqrt(singDx * singDx + singDy * singDy);
            
            // Calculate singularity force based on distance
            const forceFactor = (1 / (singDistance + 10)) * singularityStrength * 5;
            
            // Apply singularity force - stronger as particles get closer
            if (singDistance > 5) {
              particle.speedX += (singDx / singDistance) * forceFactor;
              particle.speedY += (singDy / singDistance) * forceFactor;
              
              // Add some spiral effect
              particle.speedX += (singDy / singDistance) * forceFactor * 0.3;
              particle.speedY -= (singDx / singDistance) * forceFactor * 0.3;
              
              // If particle gets too close to singularity, it gets "consumed" and respawns
              if (singDistance < 20 && Math.random() < 0.1 * singularityStrength) {
                // Reset particle to edge of screen with inward velocity
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.min(canvas.width, canvas.height) * 0.4;
                
                particle.x = centerX + Math.cos(angle) * distance;
                particle.y = centerY + Math.sin(angle) * distance;
                
                // Direct velocity towards center
                particle.speedX = -Math.cos(angle) * 0.5;
                particle.speedY = -Math.sin(angle) * 0.5;
              }
            }
          }
          
          // Apply oscillation effect
          particle.speedY += Math.sin(Date.now() / 1000) * 0.01 * oscillationFactor;
          particle.speedX += Math.cos(Date.now() / 1000 + particle.x) * 0.01 * oscillationFactor;
          
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Apply dampening
          particle.speedX *= 0.99;
          particle.speedY *= 0.99;
          
          // Keep particles within bounds
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -0.8;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -0.8;
          }
          
          // Entanglement effect - synchronized movement
          if (particle.entangled && entanglementFactor > 0.1) {
            const entangled = particle.entangled;
            
            // Calculate average speed based on entanglement strength
            const avgSpeedX = (particle.speedX + entangled.speedX) / 2 * entanglementFactor;
            const avgSpeedY = (particle.speedY + entangled.speedY) / 2 * entanglementFactor;
            
            // Apply entanglement influence
            particle.speedX = particle.speedX * (1 - entanglementFactor) + avgSpeedX;
            particle.speedY = particle.speedY * (1 - entanglementFactor) + avgSpeedY;
            entangled.speedX = entangled.speedX * (1 - entanglementFactor) + avgSpeedX;
            entangled.speedY = entangled.speedY * (1 - entanglementFactor) + avgSpeedY;
          }
        }
        
        // Draw particle
        const glowSize = particle.size * (1 + oscillationFactor);
        const glow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize * 3
        );
        glow.addColorStop(0, particle.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw entanglement lines
        if (particle.entangled && entanglementFactor > 0) {
          const entangled = particle.entangled;
          
          // Calculate distance
          const dx = entangled.x - particle.x;
          const dy = entangled.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < canvas.width * 0.5) {
            // Create line gradient
            const lineOpacity = Math.max(0.05, Math.min(0.5, (1 - distance / (canvas.width * 0.5)) * entanglementFactor));
            const gradient = ctx.createLinearGradient(particle.x, particle.y, entangled.x, entangled.y);
            gradient.addColorStop(0, `${particle.color}${Math.floor(lineOpacity * 255).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, `${entangled.color}${Math.floor(lineOpacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + entanglementFactor * 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(entangled.x, entangled.y);
            ctx.stroke();
          }
        }
      });
      
      // Draw pixel collapse effect for singularity
      if (singularityStrength > 0) {
        // Add pixel fragments being "forced" into the singularity
        const fragmentCount = Math.floor(singularityStrength * 3);
        
        for (let i = 0; i < fragmentCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 100 + 20;
          const x = singularityX + Math.cos(angle) * distance;
          const y = singularityY + Math.sin(angle) * distance;
          
          // Create a path from the pixel to the singularity
          const gradient = ctx.createLinearGradient(x, y, singularityX, singularityY);
          const colorIndex = Math.floor(Math.random() * 4);
          const colors = ['#0E7FFF', '#7B42F6', '#05D9E8', '#FF0099'];
          
          gradient.addColorStop(0, `${colors[colorIndex]}20`);
          gradient.addColorStop(1, `${colors[colorIndex]}90`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1 + Math.random() * 2;
          
          // Draw a curved path to show pixels being pulled in
          ctx.beginPath();
          ctx.moveTo(x, y);
          
          // Control points for curved path
          const cp1x = x - (x - singularityX) * 0.3 + (Math.random() - 0.5) * 20;
          const cp1y = y - (y - singularityY) * 0.3 + (Math.random() - 0.5) * 20;
          const cp2x = singularityX + (x - singularityX) * 0.2 + (Math.random() - 0.5) * 10;
          const cp2y = singularityY + (y - singularityY) * 0.2 + (Math.random() - 0.5) * 10;
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, singularityX, singularityY);
          ctx.stroke();
          
          // Draw small square "pixel" at start point
          const pixelSize = 2 + Math.random() * 3;
          ctx.fillStyle = colors[colorIndex];
          ctx.fillRect(x - pixelSize/2, y - pixelSize/2, pixelSize, pixelSize);
        }
      }
      
      // Draw power rays from core when system is active
      if (isActive && power > 20) {
        const rayCount = 8;
        const rayLength = coreRadius * 3 * (power / 100);
        
        for (let i = 0; i < rayCount; i++) {
          const angle = (Math.PI * 2 / rayCount) * i + Date.now() / 2000;
          const endX = centerX + Math.cos(angle) * rayLength;
          const endY = centerY + Math.sin(angle) * rayLength;
          
          const gradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          gradient.addColorStop(0.2, 'rgba(5, 217, 232, 0.7)');
          gradient.addColorStop(1, 'rgba(11, 127, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 + (power / 50);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, oscillationRate, entanglementStrength, power]);
  
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
      <div className="absolute bottom-4 left-4 text-xs text-energy-cyan/70">
        <p>Active Quantum Particles: {Math.floor(20 + (power / 5))}</p>
        <p>Entanglement Field Strength: {entanglementStrength.toFixed(1)}%</p>
      </div>
      <div className="absolute top-4 right-4 text-xs text-energy-cyan/70 font-mono">
        <p>Digital Singularity: {isActive ? "ACTIVE" : "STANDBY"}</p>
      </div>
    </div>
  );
};

export default PowerGeneratorVisual;
