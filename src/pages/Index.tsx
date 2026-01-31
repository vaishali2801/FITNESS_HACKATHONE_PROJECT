import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Trophy, Flame, Target, ChevronRight, Users, Star, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Target, value: "2M+", label: "Challenges Completed" },
  { icon: Trophy, value: "500K+", label: "Badges Unlocked" },
  { icon: Flame, value: "12 Days", label: "Avg. Streak" },
];

const features = [
  {
    icon: TrendingUp,
    title: "Earn XP & Level Up",
    description: "Every workout, every step counts. Watch your XP grow and level up like a true fitness hero.",
  },
  {
    icon: Flame,
    title: "Streak Rewards",
    description: "Maintain daily streaks for bonus rewards. The longer your streak, the bigger the bonuses!",
  },
  {
    icon: Trophy,
    title: "Unlock Badges",
    description: "Complete milestones to unlock exclusive badges. Show off your achievements to the world.",
  },
  {
    icon: Target,
    title: "Daily Challenges",
    description: "Fresh challenges every day keep your routine exciting. Never get bored again!",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center glow-secondary group-hover:glow-primary transition-shadow">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide">FitQuest</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="default">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm">Transform your fitness journey into an adventure</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-slide-up">
            Boost Your Activity,
            <br />
            <span className="gradient-text">Level Up Your Life</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Turn boring workouts into exciting quests. Earn XP, unlock badges, maintain streaks, and compete with friends. Fitness has never been this fun!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="gap-2">
                Start Your Quest
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="glass" size="xl">
                Continue Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl glass-card animate-slide-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="font-display text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why You'll Love <span className="gradient-text">FitQuest</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've gamified every aspect of fitness to keep you motivated and engaged
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-card border border-border hover:border-primary/50 hover:glow-secondary transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="py-20 px-4 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Collect <span className="gradient-text">Epic Badges</span>
            </h2>
            <p className="text-muted-foreground">
              Unlock achievements as you progress. Each badge tells the story of your dedication.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: "👟", name: "First Steps", desc: "Complete your first workout" },
              { emoji: "⚔️", name: "Week Warrior", desc: "Maintain a 7-day streak" },
              { emoji: "⭐", name: "Rising Star", desc: "Reach level 5" },
              { emoji: "💪", name: "Power Up", desc: "Earn 1,000 XP" },
              { emoji: "🏆", name: "Challenge Master", desc: "Complete 50 challenges" },
              { emoji: "🔥", name: "Unstoppable", desc: "Maintain a 30-day streak" },
            ].map((badge, index) => (
              <div
                key={index}
                className="p-4 rounded-xl glass-card text-center group hover:glow-secondary transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="text-4xl mb-3 group-hover:animate-float">{badge.emoji}</div>
                <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl relative z-10">
          <Star className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who've turned their fitness journey into an exciting adventure.
          </p>
          <Link to="/dashboard">
            <Button variant="hero" size="xl" className="gap-2">
              Begin Your Adventure
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
