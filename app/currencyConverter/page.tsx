'use client';

import { useState, useCallback } from "react";
import { CurrencyConverter } from "@/components/currencyConverter/CurrencyConverter";
import { ExchangeRateChart } from "@/components/currencyConverter/ExchangeRateChart";
import { useExchangeRate } from "@/hooks/useExchangeRate";

const CurrencyConverterPage = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const handleCurrencyChange = useCallback((from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  }, []);

  const { currentRate, historicalData, percentageChange, loading } = useExchangeRate(
    fromCurrency,
    toCurrency
  );

  return (
    <div className="min-h-screen bg-secondary pt-24">
      {/* Main Content */}
      <main className="container bg-white mx-auto px-4 py-8 space-y-6 rounded-lg shadow-md">
        <CurrencyConverter
          onCurrencyChange={handleCurrencyChange}
          exchangeRate={currentRate}
        />

        <ExchangeRateChart
          data={historicalData}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          percentageChange={percentageChange}
        />
      </main>

      {/* Footer */}
      
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-400">
            Exchange rates provided by <a href="https://www.exchangerate-api.com/" target="blank" >ExchangeRate-API</a> • Data updated in real-time
          </p>
        </div>
      
    </div>
  );
};

export default CurrencyConverterPage;
