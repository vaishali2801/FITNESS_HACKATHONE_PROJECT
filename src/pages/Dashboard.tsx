import { Navbar } from "@/components/layout/Navbar";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ActiveChallenges } from "@/components/dashboard/ActiveChallenges";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome back, <span className="gradient-text">Adventurer</span>
            </h1>
            <p className="text-muted-foreground">
              Track your progress and conquer today's challenges
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 animate-slide-up">
            <StatsGrid />
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <ActiveChallenges />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
