export interface ChartDataItem {
  day: string;
  value: number;
  maxValue: number;
}

export interface StepsCardProps {
  stepsConsumed: number;
  onAddSteps: () => void;
}
