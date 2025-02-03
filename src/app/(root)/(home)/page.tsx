"use client";

import { QUICK_ACTIONS } from "@/constants";
import { action } from "../../../../convex/_generated/server";
import ActionCard from "@/components/ui/ActionCard";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModel from "@/components/MeetingModel";
import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "@/components/LoaderUI";
import MeetingCard from "@/components/MeetingCard";
import { Loader2Icon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  // router
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModel, setShowModel] = useState(false);
  const [modelType, setModelType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModelType("start");
        setShowModel(true);
        break;
      case "Join Interview":
        setModelType("join");
        setShowModel(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
        break;
    }
  };

  if (isLoading) return <LoaderUI />;
  return (
    <div className=" container  max-w-7xl mx-auto p-6 ">
      {/* WELCOME SECTION */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-purple-500/10 blur-3xl" />
        <Card className="relative  dark:bg-black/40 backdrop-blur-xl hover:border-primary/50   overflow-hidden  transition-all duration-300">
          <CardContent className="p-10">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Welcome to your interview hub
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-500">
                  Welcome back!
                </h1>
                <p className="text-zinc-400 max-w-2xl">
                  Manage your interviews and review candidates effectively. Your
                  next great hire could be just a conversation away.
                </p>
                {isInterviewer ? (
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                      onClick={() => handleQuickAction("New Call")}
                    >
                      Start Interview
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <button
                      onClick={() => router.push("/schedule")}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      View Schedule
                    </button>
                  </div>
                ) : (
                  <p className="inline-flex items-center px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors">
                    Wait for Interview
                  </p>
                )}
              </div>
              <div className="hidden lg:block">
                {/* Add illustration or stats here */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isInterviewer ? (
        <>
          <div className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action, index) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModel
            isOpen={showModel}
            onClose={() => setShowModel(false)}
            title={modelType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modelType === "join"}
          />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">
              View and join your scheduled interviews
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}

      <Card className="mt-12 border-0 dark:bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Quick Tips
              </h3>
              <p className="text-sm text-zinc-400">
                Stay organized and keep track of your interviews.
              </p>
            </div>

            <a
              href="https://ung.edu/career-services/online-career-resources/interview-well/tips-for-a-successful-interview.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
            >
              View Materials
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
