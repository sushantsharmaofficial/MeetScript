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
    <div className=" container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
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
          <div className=" ">{/* candidate views goes here */}</div>
        </>
      )}
    </div>
  );
}
