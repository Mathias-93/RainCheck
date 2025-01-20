export const uvIndexLevels = [
  {
    min: 0,
    max: 2,
    label: "Low",
    color: "text-green-500",
    advice: "No protection needed.",
  },
  {
    min: 3,
    max: 5,
    label: "Moderate",
    color: "text-yellow-500",
    advice: "Use sunscreen, sunglasses, and stay in shade around midday.",
  },
  {
    min: 6,
    max: 7,
    label: "High",
    color: "text-orange-500",
    advice:
      "Wear a hat, SPF 30+ sunscreen, and limit sun exposure from 10 AM - 4 PM.",
  },
  {
    min: 8,
    max: 10,
    label: "Very High",
    color: "text-red-500",
    advice:
      "SPF 50+ sunscreen, protective clothing, and avoid sun between 10 AM - 4 PM.",
  },
  {
    min: 11,
    max: Infinity,
    label: "Extreme",
    color: "text-purple-500",
    advice: "Avoid sun exposure; full protection is necessary!",
  },
];

export const modalData = [
  {
    id: "uv",
    title: "UV Index (UVI) - What Does It Mean?",
    info: "The UV Index measures the strength of the sun’s ultraviolet (UV) radiation at a specific location and time. A higher UV index means a greater risk of sunburn and skin damage.",
    bullets: [
      "0-2 (Low): Minimal risk, no protection needed.",
      "3-5 (Moderate): Some risk; use sunscreen and sunglasses.",
      "6-7 (High): Protection recommended; wear a hat, sunglasses, and SPF 30+ sunscreen.",
      "8-10 (Very High): Extra protection needed; seek shade, use SPF 50+, and cover up.",
      "11+ (Extreme): Avoid sun exposure if possible; full sun protection required.",
    ],
  },
  {
    id: "visibility",
    title: "Visibility - What Does It Mean?",
    info: "Visibility refers to how far you can clearly see ahead in the atmosphere. It is measured in kilometers (km) or miles (mi) and is affected by weather conditions like fog, rain, snow, and air pollution.",
    bullets: [
      "10 km (6+ mi) or more: Excellent visibility, clear conditions.",
      "4-10 km (2.5-6 mi): Moderate visibility, slight haze or mist.",
      "1-4 km (0.6-2.5 mi): Reduced visibility, could be caused by light fog, rain, or pollution.",
      "Below 1 km (less than 0.6 mi): Poor visibility, hazardous conditions for travel, likely due to thick fog, heavy rain, or snow.",
    ],
  },
];
