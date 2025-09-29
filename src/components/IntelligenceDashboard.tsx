import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechRadarChart } from "./charts/TechRadarChart";
import { TRLChart } from "./charts/TRLChart";
import { HypeCurveChart } from "./charts/HypeCurveChart";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

interface IntelligenceDashboardProps {
  searchResults: any[];
  summaries: string[];
  isAnalyzing: boolean;
  overview: {
    keyFindings: string[];
    trends: string[];
    strategicImplications: string;
  } | null;
}

export function IntelligenceDashboard({ searchResults, summaries, isAnalyzing, overview }: IntelligenceDashboardProps) {
  // Generate stable insights that only change when search results change
  const dynamicInsights = useMemo(() => {
    if (searchResults.length === 0) {
      return [
        {
          title: "AI Threat Detection",
          trl: 8,
          hype: "Peak of Inflated Expectations",
          category: "Emerging",
          relevance: 95,
          icon: Brain
        },
        {
          title: "Autonomous Defense Systems",
          trl: 6,
          hype: "Innovation Trigger",
          category: "Emerging", 
          relevance: 88,
          icon: Zap
        },
        {
          title: "Cyber Warfare AI",
          trl: 7,
          hype: "Trough of Disillusionment",
          category: "Maturing",
          relevance: 92,
          icon: Target
        }
      ];
    }

    // Create a stable seed based on search results
    const seed = searchResults.length + searchResults.reduce((acc, result) => acc + result.title.length, 0);
    
    // Simple seeded random function
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Generate insights based on search results with stable randomness
    const insights = searchResults.slice(0, 3).map((result, index) => {
      const icons = [Brain, Zap, Target];
      const hypePhases = [
        "Innovation Trigger",
        "Peak of Inflated Expectations", 
        "Trough of Disillusionment",
        "Slope of Enlightenment",
        "Plateau of Productivity"
      ];
      const categories = ["Emerging", "Maturing", "Mature"];
      
      // Use seeded random for consistent results
      const random1 = seededRandom(seed + index);
      const random2 = seededRandom(seed + index + 100);
      const random3 = seededRandom(seed + index + 200);
      
      return {
        title: result.title,
        trl: Math.floor(random1 * 4) + 5, // TRL 5-8
        hype: hypePhases[Math.floor(random2 * hypePhases.length)],
        category: categories[Math.floor(random3 * categories.length)],
        relevance: result.relevance || Math.floor(random1 * 30) + 70,
        icon: icons[index % icons.length]
      };
    });

    // Fill remaining slots with generated insights if needed
    while (insights.length < 3) {
      const techTitles = [
        "Advanced Radar Systems",
        "Quantum Encryption",
        "Autonomous Vehicles",
        "AI-Powered Surveillance",
        "Cyber Defense Networks"
      ];
      
      const random1 = seededRandom(seed + insights.length + 300);
      const random2 = seededRandom(seed + insights.length + 400);
      const random3 = seededRandom(seed + insights.length + 500);
      
      insights.push({
        title: techTitles[insights.length % techTitles.length],
        trl: Math.floor(random1 * 4) + 5,
        hype: hypePhases[Math.floor(random2 * hypePhases.length)],
        category: categories[Math.floor(random3 * categories.length)],
        relevance: Math.floor(random1 * 30) + 70,
        icon: icons[insights.length % icons.length]
      });
    }

    return insights;
  }, [searchResults]); // Only recalculate when searchResults change

  return (
    <main className="flex-1 bg-dashboard-main p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* AI Analysis Summary */}
        {summaries.length > 0 && !isAnalyzing && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Analysis Summary
              </CardTitle>
              <CardDescription>
                Automated insights from latest intelligence data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summaries.map((summary, index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg border border-border">
                    <MarkdownRenderer 
                      content={summary}
                      className="text-sm text-foreground leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Data Message */}
        {summaries.length === 0 && !isAnalyzing && searchResults.length === 0 && (
          <Card className="border-border">
            <CardContent className="py-12">
              <div className="text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Intelligence Data</h3>
                <p className="text-muted-foreground">
                  Configure your Gemini API key and search for defense technologies to see AI-powered analysis.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Loading Skeleton */}
        {isAnalyzing && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Analysis Summary
              </CardTitle>
              <CardDescription>
                Generating insights from intelligence data...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Skeleton loading for 3 summary items */}
                {[1, 2, 3].map((index) => (
                  <div key={index} className="p-4 bg-surface rounded-lg border border-border">
                    <div className="space-y-3">
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dynamicInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{insight.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      TRL {insight.trl}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Relevance:</span>
                      <span className="font-medium">{insight.relevance}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium">{insight.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Technology Readiness Levels
              </CardTitle>
              <CardDescription>
                Distribution of defense technologies by maturity level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TRLChart data={dynamicInsights} />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Gartner Hype Curve</CardTitle>
              <CardDescription>
                Technology adoption lifecycle analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HypeCurveChart data={dynamicInsights} />
            </CardContent>
          </Card>
        </div>

        {/* Tech Radar - Full Width */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Defense Technology Radar</CardTitle>
            <CardDescription>
              Strategic positioning of emerging defense technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TechRadarChart data={dynamicInsights} />
          </CardContent>
        </Card>



        {isAnalyzing && (
          <Card className="border-border shadow-lg">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20"></div>
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent absolute top-0 left-0"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Generating Summary</h3>
                  <p className="text-muted-foreground">AI is analyzing intelligence data and generating insights...</p>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}