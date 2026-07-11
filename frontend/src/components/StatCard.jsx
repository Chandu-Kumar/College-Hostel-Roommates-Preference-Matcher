function StatCard({
  icon,
  title,
  status,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className={`mt-3 font-semibold ${color}`}>
        {status}
      </p>

    </div>
  );
}

export default StatCard;