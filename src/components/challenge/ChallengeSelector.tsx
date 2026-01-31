import { useState } from "react";
import { Target, Flame, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly";
  icon: typeof Target;
  xpReward: number;
  progress: number;
  goal: number;
  unit: string;
  joined?: boolean;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Morning Runner",
    description: "Complete 5km before 8 AM",
    type: "daily",
    icon: Target,
    xpReward: 100,
    progress: 3.2,
    goal: 5,
    unit: "km",
    joined: true,
  },
  {
    id: "2",
    title: "Calorie Crusher",
    description: "Burn 500 calories today",
    type: "daily",
    icon: Flame,
    xpReward: 150,
    progress: 320,
    goal: 500,
    unit: "cal",
    joined: true,
  },
  {
    id: "3",
    title: "Weekly Warrior",
    description: "Complete 50km this week",
    type: "weekly",
    icon: TrendingUp,
    xpReward: 500,
    progress: 32,
    goal: 50,
    unit: "km",
    joined: true,
  },
  {
    id: "4",
    title: "30-Day Streak",
    description: "Work out every day for a month",
    type: "monthly",
    icon: Calendar,
    xpReward: 2000,
    progress: 12,
    goal: 30,
    unit: "days",
  },
];

export function ChallengeSelector() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "daily":
        return "text-primary border-primary/50";
      case "weekly":
        return "text-warning border-warning/50";
      case "monthly":
        return "text-success border-success/50";
      default:
        return "text-muted-foreground border-border";
    }
  };

  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Select Challenge to Submit
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-3">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const progressPercent = Math.min(
              (challenge.progress / challenge.goal) * 100,
              100
            );
            const isSelected = selectedChallenge === challenge.id;

            return (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/10 glow-secondary"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      isSelected ? "bg-primary/20" : "bg-secondary"
                    )}
                  >
                    <Icon className={cn("w-6 h-6", isSelected ? "text-primary" : "text-muted-foreground")} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-semibold truncate">{challenge.title}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="outline" className={cn("text-xs", getTypeColor(challenge.type))}>
                          {challenge.type}
                        </Badge>
                        <span className="text-sm font-display text-primary">
                          +{challenge.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          {challenge.progress} / {challenge.goal} {challenge.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
