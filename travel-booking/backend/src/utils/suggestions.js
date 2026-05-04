// Rule-based travel suggestion engine
const packages = [
  {
    id: 1,
    name: 'Bali Paradise Escape',
    destination: 'bali',
    region: 'asia',
    travelTypes: ['relaxing', 'adventure', 'romantic'],
    minDays: 5, maxDays: 14,
    costPerPersonPerDay: 120,
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur Sunrise Trek'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  },
  {
    id: 2,
    name: 'Paris Romance & Culture',
    destination: 'paris',
    region: 'europe',
    travelTypes: ['romantic', 'relaxing', 'family'],
    minDays: 4, maxDays: 10,
    costPerPersonPerDay: 250,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Versailles Palace'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  },
  {
    id: 3,
    name: 'Maldives Luxury Retreat',
    destination: 'maldives',
    region: 'asia',
    travelTypes: ['relaxing', 'romantic', 'luxury'],
    minDays: 5, maxDays: 10,
    costPerPersonPerDay: 400,
    highlights: ['Overwater Bungalows', 'Snorkeling & Diving', 'Sunset Dolphin Cruise', 'Spa & Wellness'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
  },
  {
    id: 4,
    name: 'Swiss Alps Adventure',
    destination: 'switzerland',
    region: 'europe',
    travelTypes: ['adventure', 'family'],
    minDays: 6, maxDays: 14,
    costPerPersonPerDay: 300,
    highlights: ['Jungfraujoch Top of Europe', 'Skiing & Snowboarding', 'Lucerne Old Town', 'Rhine Falls'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  },
  {
    id: 5,
    name: 'Thailand Explorer',
    destination: 'thailand',
    region: 'asia',
    travelTypes: ['adventure', 'family', 'relaxing'],
    minDays: 7, maxDays: 21,
    costPerPersonPerDay: 90,
    highlights: ['Grand Palace Bangkok', 'Phi Phi Islands', 'Chiang Mai Temples', 'Thai Cooking Class'],
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
  },
  {
    id: 6,
    name: 'Dubai Luxury & Thrills',
    destination: 'dubai',
    region: 'middle-east',
    travelTypes: ['luxury', 'adventure', 'family'],
    minDays: 4, maxDays: 10,
    costPerPersonPerDay: 350,
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall & Aquarium', 'Palm Jumeirah'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  },
  {
    id: 7,
    name: 'New York City Break',
    destination: 'new york',
    region: 'americas',
    travelTypes: ['family', 'adventure', 'romantic'],
    minDays: 4, maxDays: 10,
    costPerPersonPerDay: 280,
    highlights: ['Times Square', 'Central Park', 'Statue of Liberty', 'Broadway Show'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
  },
  {
    id: 8,
    name: 'Rajasthan Royal Tour',
    destination: 'india',
    region: 'asia',
    travelTypes: ['family', 'adventure', 'relaxing'],
    minDays: 7, maxDays: 14,
    costPerPersonPerDay: 60,
    highlights: ['Jaipur Pink City', 'Udaipur Lake Palace', 'Jaisalmer Desert Camp', 'Agra Taj Mahal'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
  },
  {
    id: 9,
    name: 'Santorini Sunset Escape',
    destination: 'greece',
    region: 'europe',
    travelTypes: ['romantic', 'relaxing', 'luxury'],
    minDays: 5, maxDays: 12,
    costPerPersonPerDay: 220,
    highlights: ['Oia Sunset Views', 'Caldera Boat Tour', 'Wine Tasting', 'Black Sand Beaches'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
  },
  {
    id: 10,
    name: 'Amazon Jungle Adventure',
    destination: 'brazil',
    region: 'americas',
    travelTypes: ['adventure'],
    minDays: 7, maxDays: 14,
    costPerPersonPerDay: 150,
    highlights: ['Amazon River Cruise', 'Wildlife Safari', 'Indigenous Village Visit', 'Canopy Trekking'],
    image: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800',
  },
];

const getSuggestions = ({ destination, days, people, budget, travelType }) => {
  const budgetPerPersonPerDay = budget / (people * days);
  const destLower = destination.toLowerCase();
  const typeLower = travelType ? travelType.toLowerCase() : null;

  let scored = packages.map((pkg) => {
    let score = 0;

    // Destination match
    if (pkg.destination.includes(destLower) || destLower.includes(pkg.destination)) score += 50;
    if (pkg.region.includes(destLower) || destLower.includes(pkg.region)) score += 20;

    // Travel type match
    if (typeLower && pkg.travelTypes.includes(typeLower)) score += 30;

    // Days fit
    if (days >= pkg.minDays && days <= pkg.maxDays) score += 20;
    else if (days >= pkg.minDays - 2 && days <= pkg.maxDays + 2) score += 10;

    // Budget fit (within 30% over)
    if (budgetPerPersonPerDay >= pkg.costPerPersonPerDay * 0.7 &&
        budgetPerPersonPerDay <= pkg.costPerPersonPerDay * 1.3) score += 25;
    else if (budgetPerPersonPerDay >= pkg.costPerPersonPerDay) score += 15;

    const totalCost = pkg.costPerPersonPerDay * people * days;
    return { ...pkg, score, totalCost, duration: `${days} Days / ${days - 1} Nights` };
  });

  // Sort by score desc, return top 4
  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ score, ...rest }) => rest);
};

module.exports = { getSuggestions };
