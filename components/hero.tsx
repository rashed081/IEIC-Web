import { ArrowRight, Globe, Package, TrendingUp } from 'lucide-react';
import heroImage from "@/public/images/hero_background.jpg"
import { Button } from './UI/Button';

export default function Hero() {

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero1.jpg"
          alt="Global trade and logistics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-4 py-2 mb-6">
            <Globe className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Global Trade Solutions</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Gateway to
            <span className="text-amber-500"> Global Commerce</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            Imperial Export Import Company connects businesses worldwide with seamless logistics,
            reliable shipping, and comprehensive trade solutions.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm text-white/80">Countries Served</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="text-sm text-white/80">Shipments Completed</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-lg px-8"
            >
              Start Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-slate-800 text-white border-stone-200 hover:bg-slate-600 hover:text-black text-lg px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent z-10"></div>
    </section>
  )
}