import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "monthly";
  participants: number;
  xpReward: number;
  endsIn: string;
  progress?: number;
  goal?: number;
  unit?: string;
  joined: boolean;
  difficulty: "easy" | "medium" | "hard";
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Morning Runner",
    description: "Complete 5km run before 8 AM to start your day right",
    type: "daily",
    participants: 1234,
    xpReward: 100,
    endsIn: "6 hours",
    progress: 3.2,
    goal: 5,
    unit: "km",
    joined: true,
    difficulty: "medium",
  },
  {
    id: "2",
    title: "Calorie Crusher",
    description: "Burn 500 calories in a single day through any activity",
    type: "daily",
    participants: 2341,
    xpReward: 150,
    endsIn: "6 hours",
    progress: 320,
    goal: 500,
    unit: "cal",
    joined: true,
    difficulty: "easy",
  },
  {
    id: "3",
    title: "Weekly Warrior",
    description: "Cover 50km through running, cycling, or walking this week",
    type: "weekly",
    participants: 856,
    xpReward: 500,
    endsIn: "3 days",
    progress: 32,
    goal: 50,
    unit: "km",
    joined: true,
    difficulty: "hard",
  },
  {
    id: "4",
    title: "30-Day Streak",
    description: "Work out every single day for an entire month",
    type: "monthly",
    participants: 432,
    xpReward: 2000,
    endsIn: "18 days",
    joined: false,
    difficulty: "hard",
  },
  {
    id: "5",
    title: "Step Master",
    description: "Achieve 10,000 steps daily for a week straight",
    type: "weekly",
    participants: 1567,
    xpReward: 350,
    endsIn: "5 days",
    joined: false,
    difficulty: "medium",
  },
  {
    id: "6",
    title: "Early Bird",
    description: "Complete any workout before 6 AM",
    type: "daily",
    participants: 678,
    xpReward: 75,
    endsIn: "12 hours",
    joined: false,
    difficulty: "easy",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "text-success border-success/50";
    case "medium":
      return "text-warning border-warning/50";
    case "hard":
      return "text-destructive border-destructive/50";
    default:
      return "text-muted-foreground border-border";
  }
};

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

const Challenges = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              <span className="gradient-text">Challenges</span>
            </h1>
            <p className="text-muted-foreground">
              Join challenges, compete with others, and earn XP rewards
            </p>
          </div>

          {/* Challenge Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => {
              const progressPercent = challenge.progress && challenge.goal
                ? Math.min((challenge.progress / challenge.goal) * 100, 100)
                : 0;

              return (
                <Card
                  key={challenge.id}
                  variant={challenge.joined ? "glow" : "glass"}
                  className="animate-slide-up overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-xs", getTypeColor(challenge.type))}>
                          {challenge.type}
                        </Badge>
                        <Badge variant="outline" className={cn("text-xs", getDifficultyColor(challenge.difficulty))}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <span className="font-display text-sm text-primary">
                        +{challenge.xpReward} XP
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-2">{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress bar (for joined challenges) */}
                    {challenge.joined && challenge.progress !== undefined && (
                      <div className="space-y-2">
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-hero rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {challenge.progress} / {challenge.goal} {challenge.unit}
                          </span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {challenge.participants.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {challenge.endsIn}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {challenge.joined ? (
                      <Link to="/submit">
                        <Button variant="default" className="w-full gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Submit Progress
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="glass" className="w-full gap-2">
                        <Trophy className="w-4 h-4" />
                        Join Challenge
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Challenges;
