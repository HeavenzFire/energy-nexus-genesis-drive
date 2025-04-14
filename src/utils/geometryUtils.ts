
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

// NEW FUNCTIONS BELOW

// Create an icosahedron - 20 triangular faces, a Platonic solid
export const createIcosahedron = (size: number) => {
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const points = [];
  
  // 12 vertices of icosahedron
  const vertices = [
    { x: 0, y: size, z: size * phi },
    { x: 0, y: size, z: -size * phi },
    { x: 0, y: -size, z: size * phi },
    { x: 0, y: -size, z: -size * phi },
    { x: size, y: size * phi, z: 0 },
    { x: size, y: -size * phi, z: 0 },
    { x: -size, y: size * phi, z: 0 },
    { x: -size, y: -size * phi, z: 0 },
    { x: size * phi, y: 0, z: size },
    { x: -size * phi, y: 0, z: size },
    { x: size * phi, y: 0, z: -size },
    { x: -size * phi, y: 0, z: -size }
  ];
  
  // Scale vertices to requested size
  for (const vertex of vertices) {
    const scale = size / Math.sqrt(1 + phi * phi);
    points.push({
      x: vertex.x * scale,
      y: vertex.y * scale,
      z: vertex.z * scale
    });
  }
  
  return points;
};

// Create a dodecahedron - 12 pentagonal faces, another Platonic solid
export const createDodecahedron = (size: number) => {
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const points = [];
  
  // 20 vertices of dodecahedron
  const vertices = [
    // Vertices based on cube coordinates (±1, ±1, ±1)
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 1, z: -1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: -1, z: -1 },
    { x: -1, y: 1, z: 1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: -1, y: -1, z: -1 },
    
    // Vertices based on golden rectangles
    { x: 0, y: phi, z: 1/phi },
    { x: 0, y: phi, z: -1/phi },
    { x: 0, y: -phi, z: 1/phi },
    { x: 0, y: -phi, z: -1/phi },
    { x: 1/phi, y: 0, z: phi },
    { x: -1/phi, y: 0, z: phi },
    { x: 1/phi, y: 0, z: -phi },
    { x: -1/phi, y: 0, z: -phi },
    { x: phi, y: 1/phi, z: 0 },
    { x: phi, y: -1/phi, z: 0 },
    { x: -phi, y: 1/phi, z: 0 },
    { x: -phi, y: -1/phi, z: 0 }
  ];
  
  // Scale vertices to requested size
  for (const vertex of vertices) {
    const scale = size / Math.sqrt(3);
    points.push({
      x: vertex.x * scale,
      y: vertex.y * scale,
      z: vertex.z * scale
    });
  }
  
  return points;
};

// Create a Metatron's Cube - sacred geometry structure
export const createMetatronsCube = (size: number) => {
  const points = [];
  
  // Center point
  points.push({ x: 0, y: 0, z: 0 });
  
  // First ring - hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    points.push({
      x: size * Math.cos(angle),
      y: size * Math.sin(angle),
      z: 0
    });
  }
  
  // Second ring - hexagon offset
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + (Math.PI / 6);
    points.push({
      x: size * 2 * Math.cos(angle),
      y: size * 2 * Math.sin(angle),
      z: 0
    });
  }
  
  return points;
};

// Generate Fibonacci spiral points
export const generateFibonacciSpiral = (count: number, scale: number, turns: number) => {
  const points = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const theta = goldenAngle * i * turns;
    const radius = scale * Math.sqrt(i);
    
    points.push({
      x: radius * Math.cos(theta),
      y: radius * Math.sin(theta),
      z: (i / count) * scale // Optional: Add z-dimension for 3D spiral
    });
  }
  
  return points;
};

// Generate a Flower of Life pattern
export const generateFlowerOfLife = (size: number, rings: number) => {
  const points = [];
  const center = { x: 0, y: 0, z: 0 };
  points.push(center);
  
  // First ring
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    points.push({
      x: size * Math.cos(angle),
      y: size * Math.sin(angle),
      z: 0
    });
  }
  
  // Additional rings if requested
  let currentRingPoints = [...points.slice(1)]; // Start with first ring points
  
  for (let ring = 1; ring < rings; ring++) {
    const newRingPoints = [];
    
    for (const point of currentRingPoints) {
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const newPoint = {
          x: point.x + size * Math.cos(angle),
          y: point.y + size * Math.sin(angle),
          z: 0
        };
        
        // Check if point already exists (approximately)
        const isDuplicate = points.some(p => 
          Math.abs(p.x - newPoint.x) < 0.001 && 
          Math.abs(p.y - newPoint.y) < 0.001
        );
        
        if (!isDuplicate) {
          points.push(newPoint);
          newRingPoints.push(newPoint);
        }
      }
    }
    
    currentRingPoints = newRingPoints;
  }
  
  return points;
};

// Generate a Tesla 3-6-9 vortex pattern
export const generateTeslaVortex = (count: number, radius: number, time: number) => {
  const points = [];
  const sequence = [3, 6, 9]; // Tesla's key numbers
  
  for (let i = 0; i < count; i++) {
    const sequenceValue = sequence[i % sequence.length];
    const angle = (2 * Math.PI / sequenceValue) * (i % sequenceValue) + (time / 1000);
    const r = radius * (1 + (i / count));
    
    // Create spiral effect
    const x = r * Math.cos(angle) * (sequenceValue / 9);
    const y = r * Math.sin(angle) * (sequenceValue / 9);
    // z-value creates oscillation based on Tesla sequence
    const z = Math.sin(time / 500 + i * Math.PI / sequence.length) * radius * 0.2 * (sequenceValue / 6);
    
    points.push({ x, y, z });
  }
  
  return points;
};

// Generate quantum entanglement field
export const generateEntanglementField = (particleCount: number, radius: number, time: number) => {
  const particles = [];
  const entanglementPairs = [];
  
  // Generate particles
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random()); // Cubic root for uniform volume distribution
    
    particles.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
      id: i
    });
  }
  
  // Create entanglement pairs
  for (let i = 0; i < Math.floor(particleCount / 2); i++) {
    const particle1 = particles[i];
    const particle2 = particles[i + Math.floor(particleCount / 2)];
    
    // Calculate entanglement strength based on quantum principles
    const distance = Math.sqrt(
      Math.pow(particle1.x - particle2.x, 2) + 
      Math.pow(particle1.y - particle2.y, 2) + 
      Math.pow(particle1.z - particle2.z, 2)
    );
    
    // Quantum entanglement strength follows inverse square law with oscillation
    const entanglementStrength = (1 / (1 + distance)) * Math.abs(Math.sin(time / 1000 + i));
    
    entanglementPairs.push({
      particle1,
      particle2,
      strength: entanglementStrength
    });
  }
  
  return { particles, entanglementPairs };
};

// Generate quantum wave function visualization
export const generateWaveFunction = (gridSize: number, amplitude: number, time: number) => {
  const gridPoints = [];
  const waveValues = [];
  
  const spacing = 10 / gridSize;
  const centerX = 0;
  const centerY = 0;
  
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const posX = (x - gridSize / 2) * spacing + centerX;
      const posY = (y - gridSize / 2) * spacing + centerY;
      
      gridPoints.push({ x: posX, y: posY, z: 0 });
      
      // Complex wave function calculation (simplified)
      const distance = Math.sqrt(posX * posX + posY * posY);
      const phase = distance * 3 - time / 500;
      
      // Calculate probability density (|Ψ|²)
      const probabilityDensity = Math.exp(-distance / 5) * Math.pow(Math.cos(phase), 2) * amplitude;
      waveValues.push(probabilityDensity);
    }
  }
  
  return { gridPoints, waveValues };
};

// Create neural network structure for visualization
export const createNeuralNetworkStructure = (
  layers: number[], 
  width: number, 
  height: number, 
  depth: number
) => {
  const neurons = [];
  const connections = [];
  
  // Create neurons for each layer
  let totalNeurons = 0;
  for (let l = 0; l < layers.length; l++) {
    const layerSize = layers[l];
    const layerX = (l / (layers.length - 1)) * width - width / 2;
    
    for (let n = 0; n < layerSize; n++) {
      const neuronY = ((n / (layerSize - 1)) * height - height / 2) || 0;
      const neuronZ = (Math.random() - 0.5) * depth * 0.5;
      
      neurons.push({
        id: totalNeurons,
        x: layerX,
        y: neuronY,
        z: neuronZ,
        layer: l,
        index: n,
        activation: Math.random() // Initial random activation
      });
      
      totalNeurons++;
    }
  }
  
  // Create connections between layers
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayerStart = neurons.findIndex(n => n.layer === l);
    const nextLayerStart = neurons.findIndex(n => n.layer === l + 1);
    
    const currentLayerSize = layers[l];
    const nextLayerSize = layers[l + 1];
    
    // Connect each neuron in current layer to every neuron in next layer
    for (let i = 0; i < currentLayerSize; i++) {
      const fromNeuron = neurons[currentLayerStart + i];
      
      for (let j = 0; j < nextLayerSize; j++) {
        const toNeuron = neurons[nextLayerStart + j];
        
        // Generate random weight between -1 and 1
        const weight = (Math.random() * 2 - 1);
        connections.push({
          from: fromNeuron.id,
          to: toNeuron.id,
          weight: weight
        });
      }
    }
  }
  
  return { neurons, connections };
};

// Create anatomical structure vertices for visualization
export const createAnatomicalStructure = (type: 'cell'|'nerve'|'muscle'|'bone', size: number) => {
  switch(type) {
    case 'cell':
      return createCell(size);
    case 'nerve':
      return createNerve(size);
    case 'muscle':
      return createMuscle(size);
    case 'bone':
      return createBone(size);
    default:
      return createCell(size);
  }
};

// Helper function to create cell visualization
const createCell = (size: number) => {
  // Simplified cell structure
  const cellMembrane = generateSpherePoints(24, size);
  const nucleus = generateSpherePoints(12, size * 0.4);
  // Offset nucleus position slightly
  const nucleusOffset = { x: size * 0.1, y: size * -0.05, z: size * 0.1 };
  const offsetNucleus = nucleus.map(p => ({
    x: p.x + nucleusOffset.x,
    y: p.y + nucleusOffset.y,
    z: p.z + nucleusOffset.z
  }));
  
  // Add organelles (simplified as small spheres)
  const organelles = [];
  for (let i = 0; i < 8; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = size * (0.3 + Math.random() * 0.3);
    const organelleSize = size * (0.1 + Math.random() * 0.1);
    const organelle = generateSpherePoints(8, organelleSize).map(p => ({
      x: p.x + Math.cos(angle) * radius,
      y: p.y + Math.sin(angle) * radius,
      z: p.z + (Math.random() - 0.5) * size * 0.5
    }));
    organelles.push(...organelle);
  }
  
  return { membrane: cellMembrane, nucleus: offsetNucleus, organelles };
};

// Helper function to create nerve visualization
const createNerve = (size: number) => {
  const points = [];
  const length = size * 5;
  const segments = 20;
  
  // Create the axon (main nerve strand)
  for (let i = 0; i < segments; i++) {
    const segmentSize = size * (0.8 + Math.sin(i / segments * Math.PI) * 0.2);
    const segmentPoints = generateSpherePoints(8, segmentSize).map(p => ({
      x: p.x,
      y: p.y,
      z: p.z + (i - segments/2) * (length / segments)
    }));
    points.push(...segmentPoints);
  }
  
  // Create dendrites (branches) at one end
  const dendritesCount = 5;
  for (let d = 0; d < dendritesCount; d++) {
    const angle = (Math.PI * 2 * d) / dendritesCount;
    const branchLength = size * 2;
    const branchSegments = 5;
    
    for (let i = 0; i < branchSegments; i++) {
      const segmentSize = size * 0.3 * (1 - i / branchSegments);
      const distance = i * (branchLength / branchSegments);
      const segmentPoints = generateSpherePoints(6, segmentSize).map(p => ({
        x: p.x + Math.cos(angle) * distance,
        y: p.y + Math.sin(angle) * distance,
        z: p.z + length / 2 + distance * 0.5
      }));
      points.push(...segmentPoints);
    }
  }
  
  return points;
};

// Helper function to create muscle visualization
const createMuscle = (size: number) => {
  const points = [];
  const length = size * 4;
  const width = size;
  const height = size * 0.7;
  
  // Create muscle fibers
  const fibersCount = 7;
  for (let f = 0; f < fibersCount; f++) {
    const offsetX = (f / (fibersCount - 1) - 0.5) * width;
    
    // Create fiber segments
    const segments = 15;
    for (let s = 0; s < segments; s++) {
      const z = (s / (segments - 1) - 0.5) * length;
      
      // Add ripple effect to simulate muscle texture
      const ripple = Math.sin(s / segments * Math.PI * 4) * size * 0.1;
      
      // Create cross-section of fiber
      const crossPoints = 6;
      for (let p = 0; p < crossPoints; p++) {
        const angle = (p / crossPoints) * Math.PI * 2;
        points.push({
          x: offsetX + Math.cos(angle) * size * 0.15,
          y: Math.sin(angle) * size * 0.15 + ripple,
          z: z
        });
      }
    }
  }
  
  return points;
};

// Helper function to create bone visualization
const createBone = (size: number) => {
  const points = [];
  const length = size * 5;
  
  // Create bone shaft
  const shaftRadius = size * 0.5;
  const shaftSegments = 12;
  
  for (let s = 0; s < shaftSegments; s++) {
    const z = (s / (shaftSegments - 1) - 0.5) * (length - size * 2);
    const radius = shaftRadius * (0.8 + Math.sin(s / shaftSegments * Math.PI) * 0.2);
    
    const crossPoints = 8;
    for (let p = 0; p < crossPoints; p++) {
      const angle = (p / crossPoints) * Math.PI * 2;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: z
      });
    }
  }
  
  // Create bone ends (joints)
  const jointRadius = size;
  const jointSegments = 6;
  
  for (let end = 0; end < 2; end++) {
    const baseZ = end === 0 ? -length/2 : length/2 - size * 2;
    
    for (let s = 0; s < jointSegments; s++) {
      const z = baseZ + (end === 0 ? s : jointSegments - s) * (size * 2 / jointSegments);
      const progress = s / jointSegments;
      const radius = jointRadius * (end === 0 ? progress : 1 - progress);
      
      const crossPoints = 8;
      for (let p = 0; p < crossPoints; p++) {
        const angle = (p / crossPoints) * Math.PI * 2;
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: z
        });
      }
    }
  }
  
  return points;
};

