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

// Create Tree of Life (Kabbalah) pattern
export const createTreeOfLife = (size: number) => {
  // The 10 Sephirot positions (normalized coordinates)
  const sephirotPositions = [
    { name: "Keter", x: 0, y: 1, z: 0 },          // Crown
    { name: "Chokhmah", x: -0.5, y: 0.8, z: 0 },  // Wisdom
    { name: "Binah", x: 0.5, y: 0.8, z: 0 },      // Understanding
    { name: "Daat", x: 0, y: 0.6, z: 0 },         // Knowledge (hidden)
    { name: "Chesed", x: -0.5, y: 0.5, z: 0 },    // Kindness
    { name: "Gevurah", x: 0.5, y: 0.5, z: 0 },    // Severity
    { name: "Tiferet", x: 0, y: 0.3, z: 0 },      // Beauty
    { name: "Netzach", x: -0.5, y: 0.2, z: 0 },   // Victory
    { name: "Hod", x: 0.5, y: 0.2, z: 0 },        // Splendor
    { name: "Yesod", x: 0, y: 0.1, z: 0 },        // Foundation
    { name: "Malkuth", x: 0, y: -0.2, z: 0 }      // Kingdom
  ];
  
  // Scale the positions
  const scaledPositions = sephirotPositions.map(pos => ({
    name: pos.name,
    x: pos.x * size,
    y: pos.y * size,
    z: pos.z * size
  }));
  
  // Define the paths connecting the Sephirot
  const paths = [
    [0, 1], [0, 2], [1, 2], [1, 4], [2, 5], 
    [4, 5], [4, 7], [5, 8], [6, 7], [6, 8], 
    [7, 8], [6, 9], [7, 9], [8, 9], [9, 10]
  ];
  
  return { sephirot: scaledPositions, paths };
};

// Generate Sri Yantra (sacred geometry)
export const generateSriYantra = (size: number, is3D: boolean = false) => {
  const points = [];
  const triangles = [];
  
  // Outer square
  points.push({ x: -size, y: -size, z: 0 });
  points.push({ x: size, y: -size, z: 0 });
  points.push({ x: size, y: size, z: 0 });
  points.push({ x: -size, y: size, z: 0 });
  
  // Inner triangles
  const triangleCount = 9; // 9 interlocking triangles in Sri Yantra
  
  for (let i = 0; i < triangleCount; i++) {
    const isUpward = i % 2 === 0;
    const ratio = 0.9 - (i * 0.1);
    const height = size * ratio;
    const base = size * ratio * 1.2;
    const yOffset = isUpward ? -size * 0.2 : size * 0.2;
    
    // Triangle vertices
    const x1 = 0;
    const y1 = isUpward ? height + yOffset : -height + yOffset;
    const z1 = is3D ? i * size * 0.05 : 0;
    
    const x2 = -base / 2;
    const y2 = isUpward ? -height * 0.2 + yOffset : height * 0.2 + yOffset;
    const z2 = z1;
    
    const x3 = base / 2;
    const y3 = y2;
    const z3 = z1;
    
    triangles.push([
      points.length,
      points.length + 1,
      points.length + 2
    ]);
    
    points.push({ x: x1, y: y1, z: z1 });
    points.push({ x: x2, y: y2, z: z2 });
    points.push({ x: x3, y: y3, z: z3 });
  }
  
  // Add the central bindu (point)
  points.push({ x: 0, y: 0, z: is3D ? size * 0.5 : 0 });
  
  return { points, triangles };
};

// Create Merkaba (Star Tetrahedron)
export const createMerkaba = (size: number, rotation: number = 0) => {
  // Create two tetrahedrons - one pointing up, one down
  const upwardTetra = createTetrahedron(size);
  
  // Create downward tetrahedron by inverting the upward one
  const downwardTetra = upwardTetra.map(point => ({
    x: point.x,
    y: -point.y,
    z: point.z
  }));
  
  // Apply rotation if specified
  if (rotation !== 0) {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    
    return [...upwardTetra, ...downwardTetra].map(point => ({
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos
    }));
  }
  
  return [...upwardTetra, ...downwardTetra];
};

// Generate Torus of Consciousness - representing the self-referential nature of consciousness
export const generateConsciousnessTorus = (
  majorRadius: number, 
  minorRadius: number,
  majorSegments: number = 36, 
  minorSegments: number = 24,
  time: number = 0
) => {
  const points = [];
  const flowVectors = []; // Vector field representing consciousness flow
  
  for (let i = 0; i < majorSegments; i++) {
    const theta = (i / majorSegments) * Math.PI * 2;
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    
    for (let j = 0; j < minorSegments; j++) {
      const phi = (j / minorSegments) * Math.PI * 2;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);
      
      // Basic torus point
      const x = (majorRadius + minorRadius * cosPhi) * cosTheta;
      const y = (majorRadius + minorRadius * cosPhi) * sinTheta;
      const z = minorRadius * sinPhi;
      
      // Add consciousness wave modulation based on time
      const wave = Math.sin(theta * 3 + phi * 2 + time / 1000) * 0.2;
      const modX = x * (1 + wave * 0.1);
      const modY = y * (1 + wave * 0.1);
      const modZ = z + wave * minorRadius * 0.3;
      
      points.push({ x: modX, y: modY, z: modZ });
      
      // Calculate flow vector for this point
      const flowX = -sinTheta * 0.5 + sinPhi * cosTheta * 0.5;
      const flowY = cosTheta * 0.5 + sinPhi * sinTheta * 0.5;
      const flowZ = cosPhi * 0.5;
      
      flowVectors.push({ x: flowX, y: flowY, z: flowZ });
    }
  }
  
  return { points, flowVectors };
};

// Create Golden Spiral in 3D (Fibonacci spiral with divine proportion)
export const createGoldenSpiral3D = (turns: number, pointsPerTurn: number, growth: number = 0.1) => {
  const points = [];
  const totalPoints = turns * pointsPerTurn;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  
  for (let i = 0; i < totalPoints; i++) {
    const t = i / pointsPerTurn;
    const radius = Math.pow(goldenRatio, t / Math.PI * 2) * growth;
    const theta = t * Math.PI * 2;
    
    // Create 3D spiral that rises as it expands
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = t * growth * 0.5; // Gentle rise in z-axis
    
    points.push({ x, y, z });
  }
  
  return points;
};

// Generate Christ Consciousness Grid (geometric representation of higher consciousness)
export const generateChristConsciousnessGrid = (size: number, complexity: number = 3) => {
  const points = [];
  const connections = [];
  
  // Create icosahedral grid as the base
  const icosahedron = createIcosahedron(size);
  points.push(...icosahedron);
  
  // Connect vertices to form the basic grid
  for (let i = 0; i < icosahedron.length; i++) {
    for (let j = i + 1; j < icosahedron.length; j++) {
      const p1 = icosahedron[i];
      const p2 = icosahedron[j];
      
      const distance = Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + 
        Math.pow(p2.y - p1.y, 2) + 
        Math.pow(p2.z - p1.z, 2)
      );
      
      // Create connections between nearby vertices
      if (distance < size * 1.2) {
        connections.push([i, j]);
      }
    }
  }
  
  // For higher complexity, add additional connection points
  if (complexity > 1) {
    // Add points at the midpoints of longer connections
    const additionalPoints = [];
    
    for (let i = 0; i < icosahedron.length; i++) {
      for (let j = i + 1; j < icosahedron.length; j++) {
        const p1 = icosahedron[i];
        const p2 = icosahedron[j];
        
        const distance = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + 
          Math.pow(p2.y - p1.y, 2) + 
          Math.pow(p2.z - p1.z, 2)
        );
        
        if (distance >= size && distance < size * 2) {
          // Create a point in the middle
          additionalPoints.push({
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            z: (p1.z + p2.z) / 2
          });
        }
      }
    }
    
    // Add the additional points and create connections
    const baseLength = points.length;
    points.push(...additionalPoints);
    
    // Connect new points to original vertices
    for (let i = 0; i < baseLength; i++) {
      for (let j = baseLength; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        
        const distance = Math.sqrt(
          Math.pow(p2.x - p1.x, 2) + 
          Math.pow(p2.y - p1.y, 2) + 
          Math.pow(p2.z - p1.z, 2)
        );
        
        if (distance < size * 0.9) {
          connections.push([i, j]);
        }
      }
    }
  }
  
  return { points, connections };
};

// Generate Divine Light Rays
export const generateDivineRays = (
  originX: number, 
  originY: number, 
  originZ: number, 
  count: number, 
  length: number, 
  spread: number = Math.PI * 0.5
) => {
  const rays = [];
  
  for (let i = 0; i < count; i++) {
    // Calculate ray direction with golden ratio spacing for optimal distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.4 radians
    const theta = goldenAngle * i;
    const phi = Math.acos(1 - 2 * (i / count) % 1);
    
    // Apply spread factor
    const adjustedPhi = phi * spread;
    
    // Convert spherical to cartesian coordinates
    const dirX = Math.sin(adjustedPhi) * Math.cos(theta);
    const dirY = Math.sin(adjustedPhi) * Math.sin(theta);
    const dirZ = Math.cos(adjustedPhi);
    
    // Calculate end point
    const endX = originX + dirX * length;
    const endY = originY + dirY * length;
    const endZ = originZ + dirZ * length;
    
    rays.push({
      start: { x: originX, y: originY, z: originZ },
      end: { x: endX, y: endY, z: endZ },
      intensity: 0.5 + Math.random() * 0.5 // Varying intensity
    });
  }
  
  return rays;
};

// Generate Spiritual DNA Helix (metaphor for spiritual coding)
export const generateSpiritualDNA = (
  length: number, 
  radius: number, 
  turns: number, 
  pointsPerTurn: number
) => {
  const points1 = []; // First strand
  const points2 = []; // Second strand
  const connections = []; // Connections between strands ("base pairs")
  
  const totalPoints = turns * pointsPerTurn;
  
  for (let i = 0; i < totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * turns * Math.PI * 2;
    const z = length * (0.5 - t); // Center the helix at origin
    
    // First strand
    points1.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      z: z
    });
    
    // Second strand (opposite side of helix - 180° offset)
    points2.push({
      x: radius * Math.cos(angle + Math.PI),
      y: radius * Math.sin(angle + Math.PI),
      z: z
    });
    
    // Create cross-connections ("base pairs") at regular intervals
    if (i % (pointsPerTurn / 4) === 0) {
      connections.push([
        points1.length - 1,
        points2.length - 1
      ]);
    }
  }
  
  return { strand1: points1, strand2: points2, connections };
};

// Generate Unified Field Representation (connecting consciousness and quantum fields)
export const generateUnifiedField = (
  size: number, 
  density: number, 
  time: number, 
  consciousnessCenter: { x: number; y: number; z: number }
) => {
  const gridPoints = [];
  const fieldVectors = [];
  
  const gridStep = size / density;
  
  // Create a 3D grid of points
  for (let x = -size/2; x <= size/2; x += gridStep) {
    for (let y = -size/2; y <= size/2; y += gridStep) {
      for (let z = -size/2; z <= size/2; z += gridStep) {
        gridPoints.push({ x, y, z });
        
        // Calculate distance from consciousness center
        const dx = x - consciousnessCenter.x;
        const dy = y - consciousnessCenter.y;
        const dz = z - consciousnessCenter.z;
        
        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Calculate field influence based on inverse square law and time
        const phaseAngle = distance * 3 - time / 500;
        
        // Calculate quantum field vector (using vortex math principles)
        const qField = vortexFieldVector(x, y, time);
        
        // Calculate consciousness field influence (diminishes with distance)
        const cInfluence = 5 / (1 + distance * distance * 0.1);
        const cField = {
          dx: -dx * cInfluence / Math.max(1, distance),
          dy: -dy * cInfluence / Math.max(1, distance),
          dz: -dz * cInfluence / Math.max(1, distance)
        };
        
        // Combined field vector (quantum + consciousness)
        fieldVectors.push({
          x: qField.dx + cField.dx,
          y: qField.dy + cField.dy,
          z: cField.dz * Math.sin(phaseAngle)
        });
      }
    }
  }
  
  return { gridPoints, fieldVectors };
};

// Create Sacred Geometry Physics Integrations 
export const createPhysicsIntegration = (centerPoint: { x: number; y: number; z: number }, size: number, time: number) => {
  // Physics constants (with sacred number ratios)
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const e = 2.71828; // Euler's number
  const pi = Math.PI;
  
  // Create geometric basis
  const tetrahedron = createTetrahedron(size * 0.7).map(p => ({
    x: p.x + centerPoint.x,
    y: p.y + centerPoint.y,
    z: p.z + centerPoint.z
  }));
  
  const cube = [];
  for (let i = 0; i < 8; i++) {
    cube.push({
      x: centerPoint.x + size * 0.8 * ((i & 1) ? 1 : -1),
      y: centerPoint.y + size * 0.8 * ((i & 2) ? 1 : -1),
      z: centerPoint.z + size * 0.8 * ((i & 4) ? 1 : -1)
    });
  }
  
  const octahedron = [
    { x: centerPoint.x + size, y: centerPoint.y, z: centerPoint.z },
    { x: centerPoint.x - size, y: centerPoint.y, z: centerPoint.z },
    { x: centerPoint.x, y: centerPoint.y + size, z: centerPoint.z },
    { x: centerPoint.x, y: centerPoint.y - size, z: centerPoint.z },
    { x: centerPoint.x, y: centerPoint.y, z: centerPoint.z + size },
    { x: centerPoint.x, y: centerPoint.y, z: centerPoint.z - size }
  ];
  
  // Create dynamic integration field
  const fieldPoints = [];
  for (let i = 0; i < 72; i++) {
    const theta = i * pi / 36;
    const phi = i * pi * phi / 30;
    
    // Spiraling field effect
    const radius = size * (0.5 + 0.3 * Math.sin(time / 1000 + i / 10));
    const x = centerPoint.x + radius * Math.sin(theta) * Math.cos(phi);
    const y = centerPoint.y + radius * Math.sin(theta) * Math.sin(phi);
    const z = centerPoint.z + radius * Math.cos(theta);
    
    fieldPoints.push({ x, y, z });
  }
  
  // Energy paths connecting the geometries
  const energyPaths = [];
  
  // Connect tetrahedron vertices to cube
  for (let i = 0; i < tetrahedron.length; i++) {
    const nearestCubeVertex = cube.reduce((nearest, vertex, index) => {
      const distance = Math.sqrt(
        Math.pow(vertex.x - tetrahedron[i].x, 2) +
        Math.pow(vertex.y - tetrahedron[i].y, 2) +
        Math.pow(vertex.z - tetrahedron[i].z, 2)
      );
      
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: -1, distance: Infinity });
    
    if (nearestCubeVertex.index !== -1) {
      energyPaths.push({
        start: tetrahedron[i],
        end: cube[nearestCubeVertex.index],
        phase: (i / tetrahedron.length + time / 3000) % 1
      });
    }
  }
  
  // Connect cube vertices to octahedron
  for (let i = 0; i < cube.length; i++) {
    const nearestOctaVertex = octahedron.reduce((nearest, vertex, index) => {
      const distance = Math.sqrt(
        Math.pow(vertex.x - cube[i].x, 2) +
        Math.pow(vertex.y - cube[i].y, 2) +
        Math.pow(vertex.z - cube[i].z, 2)
      );
      
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: -1, distance: Infinity });
    
    if (nearestOctaVertex.index !== -1) {
      energyPaths.push({
        start: cube[i],
        end: octahedron[nearestOctaVertex.index],
        phase: (i / cube.length + time / 4000) % 1
      });
    }
  }
  
  return {
    tetrahedron,
    cube,
    octahedron,
    fieldPoints,
    energyPaths
  };
};

// Create Resurrection Light Pattern (symbolic representation)
export const createResurrectionLight = (
  origin: { x: number; y: number; z: number }, 
  size: number, 
  intensity: number, 
  time: number
) => {
  const { x, y, z } = origin;
  const rays = [];
  const auraPoints = [];
  const energyField = [];
  
  // Create the central point (representing the divine spark)
  const centralPoint = { x, y, z };
  
  // Generate rays of light emanating from the center
  const rayCount = Math.floor(12 + intensity * 24); // More rays with higher intensity
  const rayLength = size * (0.8 + intensity * 2.0); // Longer rays with higher intensity
  
  for (let i = 0; i < rayCount; i++) {
    const theta = Math.PI * 2 * (i / rayCount);
    const phi = Math.PI * (1 - Math.sqrt(i / rayCount)); // Better distribution
    
    const dirX = Math.sin(phi) * Math.cos(theta);
    const dirY = Math.sin(phi) * Math.sin(theta);
    const dirZ = Math.cos(phi);
    
    // Add time-based oscillation
    const oscFactor = 0.2 * Math.sin(time / 1000 + i);
    const length = rayLength * (1 + oscFactor);
    
    rays.push({
      start: centralPoint,
      end: {
        x: x + dirX * length,
        y: y + dirY * length,
        z: z + dirZ * length
      },
      intensity: 0.7 + Math.random() * 0.3 // Varying brightness
    });
  }
  
  // Create aura effect (concentric spheres with golden ratio spacing)
  const auraLayers = Math.floor(3 + intensity * 4);
  for (let layer = 1; layer <= auraLayers; layer++) {
    const layerRadius = size * 0.3 * Math.pow(1.618, layer / auraLayers); // Golden ratio growth
    const pointsInLayer = 10 * layer;
    
    for (let i = 0; i < pointsInLayer; i++) {
      const theta = Math.PI * 2 * (i / pointsInLayer);
      const phi = Math.PI * (i / pointsInLayer);
      
      // Add wave motion to aura
      const waveOffset = 0.1 * Math.sin(time / 800 + theta * 3);
      
      auraPoints.push({
        x: x + (layerRadius + waveOffset) * Math.sin(phi) * Math.cos(theta),
        y: y + (layerRadius + waveOffset) * Math.sin(phi) * Math.sin(theta),
        z: z + (layerRadius + waveOffset) * Math.cos(phi),
        layer,
        brightness: 1 - (layer / (auraLayers + 1)) // Diminishing brightness with distance
      });
    }
  }
  
  // Create energy field (spiraling particles)
  const particleCount = Math.floor(30 + intensity * 70);
  for (let i = 0; i < particleCount; i++) {
    // Spiral pattern
    const angle = i * 0.1 + time / 1000;
    const radius = size * 0.05 * Math.sqrt(i);
    const height = size * (-0.5 + i / particleCount) + 0.1 * Math.sin(i + time / 500);
    
    energyField.push({
      x: x + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle),
      z: z + height,
      velocity: {
        dx: 0.01 * Math.sin(angle + Math.PI/2),
        dy: 0.01 * Math.cos(angle + Math.PI/2),
        dz: 0.02 * Math.cos(i / 5)
      },
      size: 0.02 * size * (0.5 + Math.random()),
      brightness: 0.7 + 0.3 * Math.sin(i / 5 + time / 1000)
    });
  }
  
  return { centralPoint, rays, auraPoints, energyField };
};
