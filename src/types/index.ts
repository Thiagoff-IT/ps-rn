export interface ChartDataItem {
  day: string;
  value: number;
  maxValue: number;
}

export interface StepsCardProps {
  stepsConsumed: number;
  onAddSteps: () => void;
}

export interface WaterCardProps {
  waterConsumed: number;
  goalMl: number;
  onAddWater: (amount: number) => void;
}
