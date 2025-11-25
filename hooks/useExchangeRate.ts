'use client';

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ExchangeRateData {
  rate: number;
  timestamp: number;
}

interface HistoricalDataPoint {
  date: string;
  rate: number;
}

export const useExchangeRate = (fromCurrency: string, toCurrency: string) => {
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (!fromCurrency || !toCurrency) return;

      setLoading(true);
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
          { cache: "no-store" } // ✅ avoid caching for Next.js
        );

        if (!res.ok) throw new Error("Failed to fetch exchange rate");

        const data = await res.json();
        const rate = data.rates[toCurrency];
        if (rate) setCurrentRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        toast({
          title: "Error",
          description: "Failed to fetch exchange rate. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, toast]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!fromCurrency || !toCurrency) return;

      try {
        const today = new Date();
        const historicalRates: HistoricalDataPoint[] = [];

        // Fetch mock historical data (replace with a real historical API if needed)
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateString = date.toISOString().split("T")[0];

          const res = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
            { cache: "no-store" }
          );

          if (res.ok) {
            const data = await res.json();
            const baseRate = data.rates[toCurrency];
            const variation = (Math.random() - 0.5) * 0.02;
            const rate = baseRate * (1 + variation);
            historicalRates.push({ date: dateString, rate });
          }

          // Limit requests to reduce load
          if (i % 10 === 0 && historicalRates.length > 0) break;
        }

        // Fill missing data points for a smoother chart
        if (historicalRates.length > 0 && historicalRates.length < 30) {
          const filledData = Array.from({ length: 30 }).map((_, idx) => {
            const date = new Date(today);
            date.setDate(date.getDate() - (29 - idx));
            const dateString = date.toISOString().split("T")[0];
            const baseRate = historicalRates[0].rate;
            const variation = (Math.random() - 0.5) * 0.03;
            return { date: dateString, rate: baseRate * (1 + variation) };
          });
          setHistoricalData(filledData);
        } else {
          setHistoricalData(historicalRates);
        }

        // Calculate percentage change
        if (historicalRates.length >= 2) {
          const oldest = historicalRates[0].rate;
          const newest = historicalRates[historicalRates.length - 1].rate;
          const change = ((newest - oldest) / oldest) * 100;
          setPercentageChange(change);
        }
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [fromCurrency, toCurrency]);

  return { currentRate, historicalData, percentageChange, loading };
};
