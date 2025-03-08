export const accidentsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Number of Accidents',
      data: [12, 19, 15, 8, 13, 10],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

export const violationsData = {
  labels: ['Speed Limit', 'Red Light', 'Wrong Turn', 'No Signal', 'Illegal Parking'],
  datasets: [
    {
      label: 'Number of Violations',
      data: [65, 45, 30, 25, 55],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ]
};