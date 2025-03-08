// Mock API call for video analysis
export async function analyzeVideo() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    captions: "Vehicle approaching intersection at moderate speed. Multiple pedestrians visible on sidewalk. Traffic signals operating normally.",
    summary: "Normal traffic conditions observed with standard vehicle and pedestrian movement patterns.",
    status: Math.random() > 0.5 ? 'positive' : 'negative'
  };
}