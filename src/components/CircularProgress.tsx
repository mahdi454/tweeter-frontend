interface CircularProgressProps {
    radius: number;
    strokeWidth: number;
    progress: number;
    color: string;
  }
const CircularProgress = ({ radius, strokeWidth, progress ,color}:CircularProgressProps) => {
    // Calculate the circumference of the circle
    const circumference = 2 * Math.PI * radius;
    // Calculate the stroke-dashoffset based on the progress
    const dashoffset = circumference - (progress / 100) * circumference;
  
    return (
      <svg
        className="w-7 h-7"
        viewBox={`0 0 ${2 * radius} ${2 * radius}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="text-sky-500"
          stroke="#34383f"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
        />
        <circle
          className="text-gray-500"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
    );
  };
  
  export default CircularProgress;