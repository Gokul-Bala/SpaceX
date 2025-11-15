export interface CelestialData {
  id: string;
  name: string;
  radius: number; // km
  description: string;
  textureId: string;
  distance?: number; // in 10^6 km from sun
  orbitalPeriod?: number; // days
  rotationPeriod?: number; // hours
  ringTextureId?: string;
}

export const SUN_DATA: CelestialData = {
  id: 'sun',
  name: 'Sun',
  radius: 696340,
  description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
  textureId: 'sun_texture',
};

export const solarSystemData: CelestialData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    radius: 2439.7,
    distance: 57.9,
    orbitalPeriod: 88.0,
    rotationPeriod: 1407.6,
    description: 'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth\'s Moon.',
    textureId: 'mercury_texture',
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 6051.8,
    distance: 108.2,
    orbitalPeriod: 224.7,
    rotationPeriod: -5832.5, // Retrograde
    description: 'Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.',
    textureId: 'venus_texture',
  },
  {
    id: 'earth',
    name: 'Earth',
    radius: 6371,
    distance: 149.6,
    orbitalPeriod: 365.2,
    rotationPeriod: 24.0,
    description: 'Our home planet is the only place we know of so far that’s inhabited by living things. It\'s also the only planet in our solar system with liquid water on the surface.',
    textureId: 'earth_texture',
  },
  {
    id: 'mars',
    name: 'Mars',
    radius: 3389.5,
    distance: 227.9,
    orbitalPeriod: 687.0,
    rotationPeriod: 24.7,
    description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—a wetter, warmer world.',
    textureId: 'mars_texture',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    radius: 69911,
    distance: 778.6,
    orbitalPeriod: 4331,
    rotationPeriod: 9.9,
    description: 'Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet\'s Great Red Spot is a centuries-old storm bigger than Earth.',
    textureId: 'jupiter_texture',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    radius: 58232,
    distance: 1433.5,
    orbitalPeriod: 10747,
    rotationPeriod: 10.7,
    description: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn\'s.',
    textureId: 'saturn_texture',
    ringTextureId: 'saturn_ring_texture',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    radius: 25362,
    distance: 2872.5,
    orbitalPeriod: 30589,
    rotationPeriod: -17.2, // Retrograde
    description: 'Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.',
    textureId: 'uranus_texture',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    radius: 24622,
    distance: 4495.1,
    orbitalPeriod: 59800,
    rotationPeriod: 16.1,
    description: 'Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold, and whipped by supersonic winds. It was the first planet located through mathematical calculation.',
    textureId: 'neptune_texture',
  },
];
