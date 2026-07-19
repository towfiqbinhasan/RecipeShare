"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CategoryStat {
  category: string;
  count: number;
}

export default function CategoryChart() {
  const [data, setData] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/recipes/stats");
        const result = await res.json();
        if (result.success) {
          setData(result.stats);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Recipes by Category</h2>
        <p className="text-gray-600">A quick look at what our community is cooking</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {loading ? (
          <div className="h-72 bg-gray-100 rounded-xl animate-pulse" />
        ) : data.length === 0 ? (
          <p className="text-center text-gray-400 py-16 text-sm">
            No data yet. Add some recipes to see this chart come alive!
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "#fff7ed" }}
                contentStyle={{ borderRadius: 8, borderColor: "#fed7aa", fontSize: 13 }}
              />
              <Bar dataKey="count" fill="#ea580c" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}