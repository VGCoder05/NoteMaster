function UpcomingDeadlines() {
  const deadlines = [
    {
      name: 'Finalize Presentation',
      dueDate: '2024-03-15',
      status: 'Urgent',
      statusColor: 'red',
    },
    {
      name: 'Submit Expense Report',
      dueDate: '2024-03-18',
      status: 'Due Soon',
      statusColor: 'amber',
    },
    {
      name: 'Follow Up with Client',
      dueDate: '2024-03-20',
      status: 'Normal',
      statusColor: 'green',
    },
  ];

  const statusColors = {
    red: 'bg-red-500/20 text-red-500',
    amber: 'bg-amber-500/20 text-amber-500',
    green: 'bg-green-500/20 text-green-500',
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Upcoming Deadlines</h3>
      <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-light dark:border-border-dark">
            <tr>
              <th className="px-6 py-4 font-medium">Task Name</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {deadlines.map((deadline, index) => (
              <tr
                key={index}
                className={index < deadlines.length - 1 ? 'border-b border-border-light dark:border-border-dark' : ''}
              >
                <td className="px-6 py-4">{deadline.name}</td>
                <td className="px-6 py-4 text-subtle-light dark:text-subtle-dark">
                  {deadline.dueDate}
                </td>
                <td className="px-6 py-4 flex">
                  <span className={`rounded-full  px-3 py-1 text-xs font-medium ${statusColors[deadline.statusColor]}`}>
                    {deadline.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpcomingDeadlines;