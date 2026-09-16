export interface ChartModel {
  id: string;
  title: string;
  position: number;
}

export interface DashboardModel {
  id: string;
  title: string;
  charts: ChartModel[];
}
