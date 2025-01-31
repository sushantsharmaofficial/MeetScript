import { useRouter } from "next/navigation";
import React, { useState } from "react";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  return <div>MeetingRoom</div>;
}

export default MeetingRoom;
