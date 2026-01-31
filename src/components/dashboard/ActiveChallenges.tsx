import { Trophy, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  title: string;
  progress: number;
  goal: number;
  unit: string;
  xpReward: number;
  endsIn: string;
  type: "daily" | "weekly" | "monthly";
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Morning Runner",
    progress: 3.2,
    goal: 5,
    unit: "km",
    xpReward: 100,
    endsIn: "6 hours",
    type: "daily",
  },
  {
    id: "2",
    title: "Calorie Crusher",
    progress: 320,
    goal: 500,
    unit: "cal",
    xpReward: 150,
    endsIn: "6 hours",
    type: "daily",
  },
  {
    id: "3",
    title: "Weekly Warrior",
    progress: 32,
    goal: 50,
    unit: "km",
    xpReward: 500,
    endsIn: "3 days",
    type: "weekly",
  },
];

export function ActiveChallenges() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Active Challenges
          </CardTitle>
          <Link to="/submit">
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              Submit Data
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const progressPercent = Math.min(
              (challenge.progress / challenge.goal) * 100,
              100
            );
            const remaining = Math.max(challenge.goal - challenge.progress, 0);

            return (
              <div
                key={challenge.id}
                className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          challenge.type === "daily" && "border-primary/50 text-primary",
                          challenge.type === "weekly" && "border-warning/50 text-warning",
                          challenge.type === "monthly" && "border-success/50 text-success"
                        )}
                      >
                        {challenge.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {challenge.endsIn}
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-sm text-primary">
                    +{challenge.xpReward} XP
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-hero rounded-full transition-all duration-500 relative"
                      style={{ width: `${progressPercent}%` }}
                    >
                      {progressPercent > 20 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {challenge.progress} / {challenge.goal} {challenge.unit}
                    </span>
                    <span className="font-medium">
                      {remaining.toFixed(1)} {challenge.unit} to go
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
