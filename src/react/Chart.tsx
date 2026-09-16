import type { ChartModel } from "./types";

interface ChartProps {
  chart: ChartModel;
  onUpdate: () => void;
}

export function Chart({ chart, onUpdate }: ChartProps) {
  return (
    <figure>
      <figcaption>{chart.title}</figcaption>
      <button onClick={onUpdate} type="button">
        Refresh
      </button>
    </figure>
  );
}
