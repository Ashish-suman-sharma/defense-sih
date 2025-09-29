import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HypeData {
  title: string;
  hype: string;
}

interface HypeCurveChartProps {
  data: HypeData[];
}

export function HypeCurveChart({ data }: HypeCurveChartProps) {
  // Hype curve phases
  const phases = [
    'Innovation Trigger',
    'Peak of Inflated Expectations', 
    'Trough of Disillusionment',
    'Slope of Enlightenment',
    'Plateau of Productivity'
  ];

  // Generate stable hype curve data based on insights
  const generateHypeValues = () => {
    if (data.length === 0) {
      return [20, 85, 25, 60, 80]; // Default values
    }

    // Create a stable seed based on data
    const seed = data.length + data.reduce((acc, item) => acc + item.title.length, 0);
    
    // Simple seeded random function
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Count technologies in each phase
    const phaseCounts = phases.map(phase => 
      data.filter(insight => insight.hype === phase).length
    );

    // Generate values based on counts with stable randomness
    return phaseCounts.map((count, index) => {
      const baseValue = count > 0 ? Math.min(90, count * 25 + 20) : 15;
      const randomVariation = (seededRandom(seed + index) * 20) - 10; // -10 to +10
      return Math.max(5, Math.min(95, baseValue + randomVariation));
    });
  };

  const hypeValues = generateHypeValues();

  const chartData = {
    labels: phases,
    datasets: [
      {
        label: 'Hype Level',
        data: hypeValues,
        borderColor: 'hsl(214, 100%, 27%)',
        backgroundColor: 'hsl(214, 100%, 27%, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(214, 100%, 27%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(0, 0%, 100%)',
        titleColor: 'hsl(0, 0%, 3.9%)',
        bodyColor: 'hsl(0, 0%, 3.9%)',
        borderColor: 'hsl(0, 0%, 89.8%)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 10,
          },
          maxRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 11,
          },
        },
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Expectations',
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}