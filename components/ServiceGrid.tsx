'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Ship, Package, Globe, TrendingUp, Shield, Clock } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Reliable sea cargo shipping with competitive rates for FCL and LCL shipments worldwide.",
      features: ["Full Container Load", "Less Container Load", "Door-to-Door Service"],
    },
    {
      icon: Package,
      title: "Air Freight",
      description: "Fast and secure air cargo solutions for time-sensitive shipments across the globe.",
      features: ["Express Delivery", "Customs Clearance", "Track & Trace"],
    },
    {
      icon: Globe,
      title: "Import Services",
      description: "Complete import management from documentation to final delivery at your doorstep.",
      features: ["Documentation", "Quality Inspection", "Warehouse Storage"],
    },
    {
      icon: TrendingUp,
      title: "Export Solutions",
      description: "Comprehensive export services ensuring your products reach global markets efficiently.",
      features: ["Market Research", "Packaging Solutions", "Compliance Support"],
    },
    {
      icon: Shield,
      title: "Customs Brokerage",
      description: "Expert customs clearance services to ensure smooth and compliant border crossings.",
      features: ["Duty Calculation", "Documentation", "Compliance Review"],
    },
    {
      icon: Clock,
      title: "Warehousing",
      description: "Secure storage facilities with inventory management and distribution capabilities.",
      features: ["Climate Control", "24/7 Security", "Inventory Management"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-amber-500 text-sm uppercase tracking-wider font-semibold mb-2">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comprehensive Trade Solutions
          </h2>
          <p className="text-gray-500 text-lg">
            From shipping to customs clearance, we handle every aspect of your international trade needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 border-border hover:border-amber-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4 p-3 bg-amber-50 rounded-lg w-fit group-hover:bg-amber-100 transition-colors">
                    <Icon className="h-8 w-8 text-amber-500" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-gray-500">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
