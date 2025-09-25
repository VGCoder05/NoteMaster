import StatsCard from "../components/Dashboard/StatsCard";
import RecentActivity from "../components/Dashboard/RecentActivity";
import Tags from "../components/common/Tags";
import UpcomingDeadlines from "../components/Dashboard/UpcomingDeadlines";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

function DashboardPg() {
  const stats = [
    {
      title: "Total Notes",
      value: "25",
      icon: "description",
      iconColor: "text-primary",
    },
    {
      title: "Total Tasks",
      value: "42",
      icon: "task",
      iconColor: "text-primary",
    },
    {
      title: "Tasks Completed (this week)",
      value: "18",
      icon: "check_circle",
      iconColor: "text-green-500",
    },
    {
      title: "Tasks Due Soon (next 3 days)",
      value: "5",
      icon: "calendar_today",
      iconColor: "text-primary",
      valueColor: "text-primary",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <main className="flex-1 px-4 py-8 md:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold">Welcome back, Amelia</h2>
            <div className="flex gap-2">
              <Link to="noteEditor">
                <Button variant="secondary" icon="add">
                  New Note
                </Button>
              </Link>
              <Button variant="primary" icon="add_task">
                New Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div>
              <Tags />
            </div>
          </div>

          <UpcomingDeadlines />
        </div>
      </main>
    </div>
  );
}

export default DashboardPg;
