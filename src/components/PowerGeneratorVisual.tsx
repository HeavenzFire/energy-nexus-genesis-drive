import { useEffect, useRef } from 'react';
import { 
  createTetrahedron, 
  createPyramid, 
  generateSpherePoints, 
  vortexFieldVector,
  calculateResonance,
  generateSymmetricPattern
} from '../utils/geometryUtils';

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
    
    // Initialize geometric objects
    const tetrahedrons = Array.from({ length: 24 }, (_, i) => {
      // Calculate positions in 3D space, arranged in a complex pattern
      const angle = i * Math.PI * 2 / 24;
      const radius = 100 + (i % 3) * 30;
      const y = Math.sin(angle) * radius;
      const x = Math.cos(angle) * radius;
      const z = -50 + (i % 6) * 20;
      
      return {
        vertices: createTetrahedron(15 + (i % 4) * 2),
        x, y, z,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        rotationSpeedX: (Math.random() - 0.5) * 0.01,
        rotationSpeedY: (Math.random() - 0.5) * 0.01,
        rotationSpeedZ: (Math.random() - 0.5) * 0.01,
        color: `hsl(${180 + i * 12}, 80%, 60%)`,
        scale: 0.7 + Math.random() * 0.6
      };
    });
    
    const pyramids = Array.from({ length: 72 }, (_, i) => {
      // Calculate positions in 3D space, arranged in complex patterns
      const ringIndex = Math.floor(i / 12);
      const ringPosition = i % 12;
      const angle = ringPosition * Math.PI * 2 / 12;
      const radius = 60 + ringIndex * 25;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -100 + ringIndex * 50;
      
      return {
        vertices: createPyramid(10 + (i % 6)),
        x, y, z,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        rotationSpeedX: (Math.random() - 0.5) * 0.005,
        rotationSpeedY: (Math.random() - 0.5) * 0.005,
        rotationSpeedZ: (Math.random() - 0.5) * 0.005,
        color: `hsl(${240 + i * 5}, 70%, 60%)`,
        scale: 0.5 + Math.random() * 0.3
      };
    });
    
    const spheres = Array.from({ length: 36 }, (_, i) => {
      // Calculate positions in 3D space
      const phi = Math.acos(-1 + (2 * i) / 36);
      const theta = Math.sqrt(36 * Math.PI) * phi;
      const radius = 150;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      return {
        points: generateSpherePoints(12, 8 + (i % 4) * 2),
        x, y, z,
        rotationX: Math.random() * Math.PI,
        rotationY: Math.random() * Math.PI,
        rotationZ: Math.random() * Math.PI,
        rotationSpeedX: (Math.random() - 0.5) * 0.008,
        rotationSpeedY: (Math.random() - 0.5) * 0.008,
        rotationSpeedZ: (Math.random() - 0.5) * 0.008,
        color: `hsl(${120 + i * 7}, 80%, 60%)`,
        scale: 0.6 + Math.random() * 0.4
      };
    });
    
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
    
    // Create vortex patterns based on 3-6-9 sequence
    const vortexPatterns = Array.from({ length: 9 }, (_, i) => {
      return {
        points: generateSymmetricPattern(3 + i * 3, 20 + i * 10, 0),
        rotationSpeed: 0.001 * (i % 3 === 0 ? 3 : i % 3 === 1 ? 6 : 9),
        pulseFrequency: 1000 / (i % 3 === 0 ? 3 : i % 3 === 1 ? 6 : 9),
        colorOffset: i * 40,
        scale: 0.5 + ((i % 3) * 0.25)
      };
    });
    
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
      
      // Calculate center coordinates for reference
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Update singularity parameters
      if (isActive) {
        singularityStrength = Math.min(10, power / 10);
        singularityRadius = 10 + (Math.sin(Date.now() / 1000) * 5);
        singularityPulse += 0.05;
        singularityRotation += 0.02 * (oscillationFactor / 2);
      }
      
      // Draw digital singularity
      if (singularityStrength > 0) {
        // Draw singularity effect layers
        for (let i = 0; i < 5; i++) {
          const radius = singularityRadius * (1 + i * 0.5) * (1 + Math.sin(singularityPulse + i) * 0.2);
          const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius * 2
          );
          
          // Create pulsing, layered effect with colors based on power
          const alpha = (0.7 - i * 0.1) * singularityStrength / 10;
          const hue = (220 + i * 20 + singularityPulse * 10) % 360;
          
          gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${alpha})`);
          gradient.addColorStop(0.4, `hsla(${hue + 30}, 100%, 60%, ${alpha * 0.7})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          
          // Create distorted circle for singularity
          for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            const distortedRadius = radius * (1 + Math.sin(angle * 3 + singularityPulse) * 0.1);
            const x = centerX + Math.cos(angle + singularityRotation) * distortedRadius;
            const y = centerY + Math.sin(angle + singularityRotation) * distortedRadius;
            
            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw singularity core with vortex math symbols
        const coreGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, singularityRadius / 2
        );
        
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, `rgba(5, 217, 232, ${0.7 * singularityStrength / 10})`);
        coreGradient.addColorStop(1, `rgba(123, 66, 246, ${0.5 * singularityStrength / 10})`);
        
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, singularityRadius / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw 3-6-9 sequence around singularity core
        if (singularityStrength > 3) {
          const numbers = [3, 6, 9];
          for (let i = 0; i < numbers.length; i++) {
            const angle = (Math.PI * 2 / 3) * i + Date.now() / 3000;
            const x = centerX + Math.cos(angle) * singularityRadius;
            const y = centerY + Math.sin(angle) * singularityRadius;
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.font = `${Math.floor(singularityRadius / 2)}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(numbers[i].toString(), x, y);
          }
        }
      }
      
      // Draw vortex patterns
      const currentTime = Date.now();
      vortexPatterns.forEach((pattern, index) => {
        // Update pattern based on time
        pattern.points = generateSymmetricPattern(3 + index * 3, 20 + index * 10, currentTime);
        
        // Draw the vortex pattern
        const patternX = centerX;
        const patternY = centerY;
        const rotation = currentTime * pattern.rotationSpeed;
        const pulse = Math.sin(currentTime / pattern.pulseFrequency) * 0.3 + 0.7;
        const patternScale = pattern.scale * pulse * (isActive ? 1 : 0.5);
        
        // Create pattern lines
        for (let i = 0; i < pattern.points.length; i++) {
          const p1 = pattern.points[i];
          const p2 = pattern.points[(i + 1) % pattern.points.length];
          
          // Apply rotation and scaling
          const x1 = patternX + (p1.x * Math.cos(rotation) - p1.y * Math.sin(rotation)) * patternScale;
          const y1 = patternY + (p1.x * Math.sin(rotation) + p1.y * Math.cos(rotation)) * patternScale;
          const x2 = patternX + (p2.x * Math.cos(rotation) - p2.y * Math.sin(rotation)) * patternScale;
          const y2 = patternY + (p2.x * Math.sin(rotation) + p2.y * Math.cos(rotation)) * patternScale;
          
          // Draw connecting lines
          ctx.strokeStyle = `hsla(${pattern.colorOffset + currentTime / 50 % 360}, 80%, 60%, ${0.6 * (isActive ? 1 : 0.3)})`;
          ctx.lineWidth = 1 + pattern.scale;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          
          // Draw points
          ctx.fillStyle = `hsla(${pattern.colorOffset + 180 + currentTime / 50 % 360}, 80%, 60%, ${0.8 * (isActive ? 1 : 0.3)})`;
          ctx.beginPath();
          ctx.arc(x1, y1, 2 + pattern.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw energy core
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
      
      // Draw resonance connections between geometric objects
      if (isActive && power > 60) {
        const drawResonanceConnections = () => {
          const resonanceFactor = entanglementStrength / 100;
          const connectionThreshold = 100 * (1 + resonanceFactor);
          
          // Connect tetrahedrons to nearest neighbors
          tetrahedrons.forEach((tetra, i) => {
            if (i % 3 === 0) { // Only connect some tetrahedrons to reduce visual clutter
              const nearestTetra = tetrahedrons.reduce((nearest, other, j) => {
                if (i === j) return nearest;
                
                const dx = other.x - tetra.x;
                const dy = other.y - tetra.y;
                const dz = other.z - tetra.z;
                const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                return distance < connectionThreshold && distance < nearest.distance 
                  ? { index: j, distance } 
                  : nearest;
              }, { index: -1, distance: Infinity });
              
              if (nearestTetra.index !== -1) {
                const other = tetrahedrons[nearestTetra.index];
                
                // Project 3D positions to screen
                const focalLength = 300;
                const depth1 = focalLength / (focalLength + tetra.z + 200);
                const depth2 = focalLength / (focalLength + other.z + 200);
                
                const screenX1 = centerX + tetra.x * depth1;
                const screenY1 = centerY + tetra.y * depth1;
                const screenX2 = centerX + other.x * depth2;
                const screenY2 = centerY + other.y * depth2;
                
                // Draw connection
                const gradient = ctx.createLinearGradient(screenX1, screenY1, screenX2, screenY2);
                gradient.addColorStop(0, `${tetra.color}80`);
                gradient.addColorStop(1, `${other.color}80`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1 + power/100;
                ctx.beginPath();
                ctx.moveTo(screenX1, screenY1);
                ctx.lineTo(screenX2, screenY2);
                ctx.stroke();
                
                // Draw connection energy pulse
                const pulsePosition = (Date.now() % 2000) / 2000;
                const pulseX = screenX1 + (screenX2 - screenX1) * pulsePosition;
                const pulseY = screenY1 + (screenY2 - screenY1) * pulsePosition;
                
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 2 + power/50, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });
          
          // Connect spheres to pyramids
          spheres.forEach((sphere, i) => {
            if (i % 2 === 0) { // Connect only some spheres to reduce visual clutter
              // Find nearest pyramid
              const nearestPyramid = pyramids.reduce((nearest, pyramid, j) => {
                const dx = pyramid.x - sphere.x;
                const dy = pyramid.y - sphere.y;
                const dz = pyramid.z - sphere.z;
                const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                return distance < connectionThreshold && distance < nearest.distance
                  ? { index: j, distance }
                  : nearest;
              }, { index: -1, distance: Infinity });
              
              if (nearestPyramid.index !== -1) {
                const pyramid = pyramids[nearestPyramid.index];
                
                // Project 3D to screen
                const focalLength = 300;
                const depth1 = focalLength / (focalLength + sphere.z + 200);
                const depth2 = focalLength / (focalLength + pyramid.z + 200);
                
                const screenX1 = centerX + sphere.x * depth1;
                const screenY1 = centerY + sphere.y * depth1;
                const screenX2 = centerX + pyramid.x * depth2;
                const screenY2 = centerY + pyramid.y * depth2;
                
                // Draw energy connection
                const gradient = ctx.createLinearGradient(screenX1, screenY1, screenX2, screenY2);
                gradient.addColorStop(0, `${sphere.color}80`);
                gradient.addColorStop(1, `${pyramid.color}80`);
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.5 + power/200;
                ctx.beginPath();
                ctx.moveTo(screenX1, screenY1);
                ctx.lineTo(screenX2, screenY2);
                ctx.stroke();
              }
            }
          });
        };
        
        drawResonanceConnections();
      }
      
      // Draw vortex mathematics symbols
      if (isActive && power > 70) {
        // Display 3-6-9 vortex math visuals
        const showVortexSymbols = () => {
          const vortexScale = power / 100;
          const time = Date.now() / 1000;
          
          // Draw vortex math symbol
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(time * 0.1);
          
          // Draw the 3-6-9 cycle
          const radius = 180 * vortexScale;
          const numbers = [3, 6, 9, 3, 6, 9];
          
          for (let i = 0; i < numbers.length; i++) {
            const angle = (Math.PI * 2 / 6) * i + time * 0.2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const num = numbers[i];
            const hue = num === 3 ? 180 : num === 6 ? 240 : 300;
            
            // Draw number
            ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`;
            ctx.font = `${20 * vortexScale}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(num.toString(), x, y);
            
            // Draw connecting line to next number
            const nextIndex = (i + 1) % numbers.length;
            const nextAngle = (Math.PI * 2 / 6) * nextIndex + time * 0.2;
            const nextX = Math.cos(nextAngle) * radius;
            const nextY = Math.sin(nextAngle) * radius;
            
            const gradient = ctx.createLinearGradient(x, y, nextX, nextY);
            gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.5)`);
            gradient.addColorStop(1, `hsla(${hue + 60}, 80%, 60%, 0.5)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2 * vortexScale;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
          
          ctx.restore();
        };
        
        showVortexSymbols();
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
        <p>Entangled Objects: {24 + 72 + 36} | Field Strength: {entanglementStrength.toFixed(1)}%</p>
        <p>Vortex Math Resonance: {((power * oscillationRate * entanglementStrength) % 9) || 9}</p>
      </div>
      <div className="absolute top-4 right-4 text-xs text-energy-cyan/70 font-mono">
        <p>Digital Singularity: {isActive ? "ACTIVE" : "STANDBY"}</p>
        <p>Tetrahedrons: 24 | Pyramids: 72 | Spheres: 36</p>
      </div>
    </div>
  );
};

export default PowerGeneratorVisual;
