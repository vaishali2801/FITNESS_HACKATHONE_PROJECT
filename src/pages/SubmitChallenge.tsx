import { Navbar } from "@/components/layout/Navbar";
import { FitnessProviderConnect } from "@/components/challenge/FitnessProviderConnect";
import { ScreenshotUpload } from "@/components/challenge/ScreenshotUpload";
import { ChallengeSelector } from "@/components/challenge/ChallengeSelector";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SubmitChallenge = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back Link */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Submit <span className="gradient-text">Challenge Data</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect your fitness apps or upload screenshots to submit your activity data.
              All submissions are verified to ensure fair competition.
            </p>
          </div>

          {/* Challenge Selector */}
          <div className="mb-8 animate-slide-up">
            <ChallengeSelector />
          </div>

          {/* Submission Methods */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <FitnessProviderConnect />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <ScreenshotUpload />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="gap-3">
              <Send className="w-5 h-5" />
              Submit Challenge Data
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitChallenge;
