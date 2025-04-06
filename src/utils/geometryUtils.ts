
// Create 3D geometry vertex data for various shapes

// Create a tetrahedron - 4 triangular faces
export const createTetrahedron = (size: number) => {
  // Tetrahedron coordinates using golden ratio for perfect form
  const phi = (1 + Math.sqrt(5)) / 2;
  
  return [
    { x: 0, y: -size/2, z: -size/(2*phi) },  // Apex
    { x: -size/2, y: size/2, z: -size/(2*phi) },  // Base vertex 1
    { x: size/2, y: size/2, z: -size/(2*phi) },   // Base vertex 2
    { x: 0, y: 0, z: size/phi }              // Base vertex 3
  ];
};

// Create a pyramid - 4 triangular faces + 1 square base
export const createPyramid = (size: number) => {
  return [
    { x: 0, y: 0, z: size },       // Apex
    { x: -size/2, y: -size/2, z: 0 }, // Base vertex 1
    { x: size/2, y: -size/2, z: 0 },  // Base vertex 2
    { x: size/2, y: size/2, z: 0 },   // Base vertex 3
    { x: -size/2, y: size/2, z: 0 }   // Base vertex 4
  ];
};

// Pre-calculate sphere points using spherical coordinates
export const generateSpherePoints = (count: number, radius: number) => {
  const points = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = 2 * Math.PI * goldenRatio * i;
    
    points.push({
      x: radius * Math.sin(inclination) * Math.cos(azimuth),
      y: radius * Math.sin(inclination) * Math.sin(azimuth),
      z: radius * Math.cos(inclination)
    });
  }
  
  return points;
};

// Generate a vector field based on vortex mathematics
export const vortexFieldVector = (x: number, y: number, time: number) => {
  // Using principles from vortex math (3-6-9) and nonlinear dynamics
  const theta = Math.atan2(y, x);
  const r = Math.sqrt(x*x + y*y);
  
  if (r === 0) return { dx: 0, dy: 0 };
  
  const spiralFactor = Math.sin(time / 1000) * 0.2;
  const vortexStrength = 0.2 + Math.sin(time / 3000) * 0.1;
  
  // Create a spiraling vortex effect
  const dx = -y * vortexStrength + x * spiralFactor;
  const dy = x * vortexStrength + y * spiralFactor;
  
  // Modulate strength based on 3-6-9 sequence
  const modulationFactor = (3 + Math.sin(time / 369) * 6 + Math.cos(time / 321) * 9) / 18;
  
  return { dx: dx * modulationFactor, dy: dy * modulationFactor };
};

// Calculate resonance based on vortex math
export const calculateResonance = (values: number[]) => {
  // Implement resonance calculation using digital root principles from vortex math
  let sum = 0;
  for (const value of values) {
    // Get digital root (1-9)
    let digitalRoot = value % 9;
    if (digitalRoot === 0 && value !== 0) digitalRoot = 9;
    sum += digitalRoot;
  }
  
  // Get final digital root
  let result = sum % 9;
  if (result === 0 && sum !== 0) result = 9;
  
  return result;
};

// Generate symmetric patterns based on 3-6-9 sequence
export const generateSymmetricPattern = (count: number, radius: number, time: number) => {
  const points = [];
  const baseAngles = [3, 6, 9];
  
  for (let i = 0; i < count; i++) {
    const ringIndex = Math.floor(i / baseAngles.length);
    const angleStep = baseAngles[i % baseAngles.length];
    const angleOffset = time / 1000 * (ringIndex % 2 === 0 ? 1 : -1);
    
    const angle = (i * 2 * Math.PI / angleStep) + angleOffset;
    const ringRadius = radius * (0.3 + ringIndex * 0.2);
    
    points.push({
      x: Math.cos(angle) * ringRadius,
      y: Math.sin(angle) * ringRadius,
      z: Math.sin(time / 1000 + i) * radius * 0.1
    });
  }
  
  return points;
};

// Helper function to convert HSL color to HSLA with opacity
export const colorWithOpacity = (hue: number, saturation: number, lightness: number, alpha: number) => {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
};
