function ActivityItem({ title, subtitle, icon, iconBg, iconColor }) {
  return (
    <div className="group flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-4 hover:bg-surface-light/50 dark:hover:bg-primary/10 transition-colors cursor-pointer">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
        <span className={`material-symbols-outlined ${iconColor}`}>
          {icon}
        </span>
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-subtle-light dark:text-subtle-dark">{subtitle}</p>
      </div>
      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
        arrow_forward_ios
      </span>
    </div>
  );
}

export default ActivityItem;