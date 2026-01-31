import { CheckCircle, Clock, MapPin, Flame, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "run" | "cycle" | "swim" | "workout" | "walk";
  title: string;
  date: string;
  duration: string;
  distance?: string;
  calories: number;
  xpEarned: number;
  source: string;
  verified: boolean;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "run",
    title: "Morning Run",
    date: "Today, 6:30 AM",
    duration: "32 min",
    distance: "5.2 km",
    calories: 420,
    xpEarned: 150,
    source: "Strava",
    verified: true,
  },
  {
    id: "2",
    type: "workout",
    title: "Strength Training",
    date: "Yesterday, 5:00 PM",
    duration: "45 min",
    calories: 280,
    xpEarned: 100,
    source: "Apple Watch",
    verified: true,
  },
  {
    id: "3",
    type: "cycle",
    title: "Evening Ride",
    date: "Yesterday, 7:00 PM",
    duration: "1h 15m",
    distance: "25 km",
    calories: 560,
    xpEarned: 200,
    source: "Garmin",
    verified: true,
  },
  {
    id: "4",
    type: "walk",
    title: "Lunch Walk",
    date: "2 days ago",
    duration: "20 min",
    distance: "1.5 km",
    calories: 85,
    xpEarned: 30,
    source: "Screenshot",
    verified: true,
  },
];

const getTypeEmoji = (type: string) => {
  switch (type) {
    case "run":
      return "🏃";
    case "cycle":
      return "🚴";
    case "swim":
      return "🏊";
    case "workout":
      return "💪";
    case "walk":
      return "🚶";
    default:
      return "🎯";
  }
};

export function RecentActivity() {
  return (
    <Card variant="glass">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                {getTypeEmoji(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      {activity.title}
                      {activity.verified && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <span className="font-display text-sm text-primary flex-shrink-0">
                    +{activity.xpEarned} XP
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Timer className="w-4 h-4" />
                    {activity.duration}
                  </div>
                  {activity.distance && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {activity.distance}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Flame className="w-4 h-4" />
                    {activity.calories} cal
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.source}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
