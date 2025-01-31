"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const [isCallingLoading, setIsCallingLoading] = useState(true);

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallingLoading) return <LoaderUI />;

  return <div>MeetingPage</div>;
}

export default MeetingPage;
