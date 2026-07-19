const stats = [
  { value: "2,400+", label: "Recipes Shared" },
  { value: "12,000+", label: "Active Cooks" },
  { value: "45,000+", label: "Reviews Posted" },
  { value: "4.8/5", label: "Average Rating" },
];

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">{s.value}</p>
            <p className="text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}