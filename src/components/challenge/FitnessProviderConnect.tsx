import { Check, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Provider {
  id: string;
  name: string;
  icon: string;
  description: string;
  variant: "strava" | "garmin" | "apple" | "googlefit" | "fitbit";
  connected?: boolean;
}

const providers: Provider[] = [
  {
    id: "strava",
    name: "Strava",
    icon: "🚴",
    description: "Sync runs, rides, and activities",
    variant: "strava",
  },
  {
    id: "garmin",
    name: "Garmin Connect",
    icon: "⌚",
    description: "Import from Garmin devices",
    variant: "garmin",
  },
  {
    id: "apple",
    name: "Apple Health",
    icon: "🍎",
    description: "Connect Apple Watch data",
    variant: "apple",
  },
  {
    id: "googlefit",
    name: "Google Fit",
    icon: "💚",
    description: "Sync Google Fit activities",
    variant: "googlefit",
  },
  {
    id: "fitbit",
    name: "Fitbit",
    icon: "💙",
    description: "Import Fitbit tracking data",
    variant: "fitbit",
  },
];

export function FitnessProviderConnect() {
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (providerId: string) => {
    setConnecting(providerId);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConnectedProviders((prev) => [...prev, providerId]);
    setConnecting(null);
  };

  const handleDisconnect = (providerId: string) => {
    setConnectedProviders((prev) => prev.filter((id) => id !== providerId));
  };

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Link2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Connect Fitness Apps</CardTitle>
            <CardDescription>
              Sync your activities directly from your favorite tracking apps
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-3">
          {providers.map((provider) => {
            const isConnected = connectedProviders.includes(provider.id);
            const isConnecting = connecting === provider.id;

            return (
              <div
                key={provider.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                  isConnected
                    ? "border-success/50 bg-success/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{provider.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{provider.name}</h4>
                      {isConnected && (
                        <Badge variant="outline" className="text-success border-success/50 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                  </div>
                </div>
                <div>
                  {isConnected ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(provider.id)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      variant={provider.variant}
                      size="sm"
                      onClick={() => handleConnect(provider.id)}
                      disabled={isConnecting}
                      className="gap-2"
                    >
                      {isConnecting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
