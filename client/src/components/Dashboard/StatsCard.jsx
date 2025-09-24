function StatsCard({ title, value, icon, iconColor = 'text-primary', valueColor = '' }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-custom-light dark:shadow-custom-dark transition-transform hover:scale-105">
      <h3 className="text-sm font-medium text-subtle-light dark:text-subtle-dark">
        {title}
      </h3>
      <p className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</p>
      <span className={`material-symbols-outlined absolute top-4 right-4 ${iconColor} opacity-20`}>
        {icon}
      </span>
    </div>
  );
}

export default StatsCard;