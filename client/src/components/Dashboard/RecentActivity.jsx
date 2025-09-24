import ActivityItem from './ActivityItem';

function RecentActivity() {
  const activities = [
    {
      type: 'note',
      title: 'Project Proposal',
      subtitle: 'Edited 2 days ago',
      icon: 'description',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      type: 'note',
      title: 'Meeting Notes',
      subtitle: 'Edited 3 days ago',
      icon: 'description',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      type: 'task',
      title: 'Submit Report',
      subtitle: 'Completed 1 day ago',
      icon: 'task_alt',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-500',
    },
    {
      type: 'note',
      title: 'Grocery List',
      subtitle: 'Edited 5 days ago',
      icon: 'description',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      type: 'task',
      title: 'Schedule Meeting',
      subtitle: 'Completed 2 days ago',
      icon: 'task_alt',
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-500',
    },
  ];

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </>
  );
}

export default RecentActivity;