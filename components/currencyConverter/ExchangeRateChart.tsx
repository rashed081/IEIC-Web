'use client';

import * as React from "react";
import { Card } from "@/components/UI/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChartDataPoint {
  date: string;
  rate: number;
}

interface ExchangeRateChartProps {
  data: ChartDataPoint[];
  fromCurrency: string;
  toCurrency: string;
  percentageChange: number | null;
}

export const ExchangeRateChart = ({
  data,
  fromCurrency,
  toCurrency,
  percentageChange,
}: ExchangeRateChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {format(new Date(payload[0].payload.date), "MMM dd, yyyy")}
          </p>
          <p className="text-sm text-gray-400">
            Rate:{" "}
            <span className="font-semibold text-primary">
              {payload[0].value.toFixed(4)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] bg-card">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              30-Day Exchange Rate History
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {fromCurrency} → {toCurrency}
            </p>
          </div>

          {percentageChange !== null && (
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                percentageChange >= 0
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-100 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-100 dark:text-red-400"
              }`}
            >
              {percentageChange >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-semibold">
                {percentageChange >= 0 ? "+" : ""}
                {percentageChange.toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="h-[400px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(107, 114, 128, 0.15)"
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), "MMM dd")}
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => value.toFixed(4)}
                  stroke="#6b7280"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
