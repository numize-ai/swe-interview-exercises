import { useEffect, useState } from "react";

import { Chart } from "./Chart";
import { Spinner } from "./Spinner";

export function Dashboard({ dashboardId }: any) {
  const [dashboard, setDashboard] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/dashboards/${dashboardId}`)
      .then((response) => response.json())
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      });
  }, []);

  const sortedCharts = dashboard?.charts.sort(
    (a: any, b: any) => a.position - b.position,
  );

  if (loading) return <Spinner />;

  return (
    <div>
      {sortedCharts?.map((chart: any, index: number) => (
        <Chart
          key={index}
          chart={chart}
          onUpdate={() => {
            fetch(`/api/dashboards/${dashboardId}`)
              .then((response) => response.json())
              .then(setDashboard);
          }}
        />
      ))}
    </div>
  );
}
