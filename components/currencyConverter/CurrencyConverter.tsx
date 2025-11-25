'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/UI/Card";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/UI/Button";

interface CurrencyConverterProps {
  onCurrencyChange: (from: string, to: string) => void;
  exchangeRate: number | null;
}

const currencies = [
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", name: "Albanian Lek", symbol: "L" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "BMD", name: "Bermudan Dollar", symbol: "$" },
  { code: "BND", name: "Brunei Dollar", symbol: "$" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "BWP", name: "Botswanan Pula", symbol: "P" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
  { code: "CUP", name: "Cuban Peso", symbol: "₱" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "DZD", name: "Algerian Dinar", symbol: "دج" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
  { code: "FOK", name: "Faroese Króna", symbol: "kr" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "GGP", name: "Guernsey Pound", symbol: "£" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "GYD", name: "Guyanaese Dollar", symbol: "$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "IMP", name: "Manx Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
  { code: "JEP", name: "Jersey Pound", symbol: "£" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "лв" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "KID", name: "Kiribati Dollar", symbol: "$" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "LAK", name: "Laotian Kip", symbol: "₭" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },
  { code: "NAD", name: "Namibian Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PEN", name: "Peruvian Nuevo Sol", symbol: "S/." },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
  { code: "QAR", name: "Qatari Rial", symbol: "﷼" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "RSD", name: "Serbian Dinar", symbol: "Дин." },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
  { code: "SDG", name: "Sudanese Pound", symbol: "£" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "S" },
  { code: "SPL", name: "Seborgan Luigino", symbol: "SPL" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "STN", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { code: "SYP", name: "Syrian Pound", symbol: "£" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "TOP", name: "Tongan Pa'anga", symbol: "T$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$" },
  { code: "TVD", name: "Tuvaluan Dollar", symbol: "$" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },
  { code: "UZS", name: "Uzbekistan Som", symbol: "лв" },
  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT" },
  { code: "WST", name: "Samoan Tala", symbol: "WS$" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "Z$" },
];

export const CurrencyConverter = ({
  onCurrencyChange,
  exchangeRate,
}: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    onCurrencyChange(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, onCurrencyChange]);

  useEffect(() => {
    if (exchangeRate && amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) setConvertedAmount(numAmount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromSymbol = currencies.find((c) => c.code === fromCurrency)?.symbol || "";
  const toSymbol = currencies.find((c) => c.code === toCurrency)?.symbol || "";

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] bg-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-2xl">💱</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Currency Exchange</h1>
              <p className="text-sm text-gray-400">Real-time rates and trends</p>
            </div>
          </div>
        </div>

        {/* Converter Body */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
          {/* From */}
          <div className="space-y-3">
            <Label htmlFor="from-currency" className="text-sm font-medium">
              From
            </Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from-currency" className="bg-secondary">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} — {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {fromSymbol}
              </span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-12 text-lg font-semibold bg-secondary"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-end pb-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapCurrencies}
              className="rounded-full hover:bg-amber-500 hover:text-primary-foreground transition-all"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* To */}
          <div className="space-y-3">
            <Label htmlFor="to-currency" className="text-sm font-medium">
              To
            </Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to-currency" className="bg-secondary">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} — {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {toSymbol}
              </span>
              <div className="pl-12 pr-3 text-lg font-semibold bg-secondary rounded-md border border-border min-h-[42px] flex items-center">
                {convertedAmount !== null ? convertedAmount.toFixed(2) : "0.00"}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange rate info */}
        {exchangeRate && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-gray-400 text-center">
              1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
