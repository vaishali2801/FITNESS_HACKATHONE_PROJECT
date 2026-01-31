import { Flame, Footprints, Clock, Trophy, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCard {
  icon: typeof Flame;
  label: string;
  value: string;
  subValue?: string;
  trend?: { value: string; positive: boolean };
  color: string;
}

const stats: StatCard[] = [
  {
    icon: Zap,
    label: "Total XP",
    value: "12,450",
    subValue: "Level 24",
    trend: { value: "+320", positive: true },
    color: "text-primary",
  },
  {
    icon: Flame,
    label: "Calories Burned",
    value: "2,840",
    subValue: "Today",
    trend: { value: "+12%", positive: true },
    color: "text-warning",
  },
  {
    icon: Footprints,
    label: "Distance",
    value: "8.5 km",
    subValue: "This Week",
    trend: { value: "+2.3 km", positive: true },
    color: "text-success",
  },
  {
    icon: Clock,
    label: "Active Time",
    value: "4h 32m",
    subValue: "This Week",
    color: "text-primary",
  },
  {
    icon: Trophy,
    label: "Challenges Won",
    value: "47",
    subValue: "All Time",
    trend: { value: "+3", positive: true },
    color: "text-warning",
  },
  {
    icon: TrendingUp,
    label: "Current Streak",
    value: "12 Days",
    subValue: "Personal Best!",
    color: "text-success",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            variant="glass"
            className="hover:glow-secondary transition-all duration-300 group"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors", stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.trend && (
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      stat.trend.positive
                        ? "bg-success/20 text-success"
                        : "bg-destructive/20 text-destructive"
                    )}
                  >
                    {stat.trend.value}
                  </span>
                )}
              </div>
              <div className="font-display text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              {stat.subValue && (
                <div className="text-xs text-primary mt-1">{stat.subValue}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
