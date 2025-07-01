import {useCall} from "@stream-io/video-react-sdk";
import {useState} from "react";
import {Card} from "./ui/card";
import {Button} from "./ui/button";
import {CopyIcon, CheckIcon, LinkIcon, XIcon} from "lucide-react";
import toast from "react-hot-toast";

function MeetingUrlCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const call = useCall();

  if (!call) return null;

  const meetingUrl = `${window.location.origin}/meeting/${call.id}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      setCopied(true);
      toast.success("Meeting URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isVisible && (
        <div className="fixed top-3 right-14 z-50">
          <Button
            variant="outline"
            size="icon"
            className="size-[40px] rounded-lg  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 hover:bg-accent"
            onClick={() => setIsVisible(true)}
          >
            <LinkIcon className="size-5" />
          </Button>
        </div>
      )}

      {/* Floating URL card */}
      {isVisible && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-80 p-4 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="size-4 text-primary" />
                <h3 className="font-semibold text-sm">Meeting Link</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={() => setIsVisible(false)}
              >
                <XIcon className="size-3" />
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Share this link with others to join the meeting
              </p>

              {/* URL display and copy section */}
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md border">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono truncate text-muted-foreground">
                    {meetingUrl}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 flex-shrink-0"
                  onClick={handleCopyUrl}
                >
                  {copied ? (
                    <CheckIcon className="size-3 text-green-600" />
                  ) : (
                    <CopyIcon className="size-3" />
                  )}
                </Button>
              </div>

              {/* Full copy button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCopyUrl}
                disabled={copied}
              >
                {copied ? (
                  <>
                    <CheckIcon className="size-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-4 mr-2" />
                    Copy Meeting Link
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default MeetingUrlCard;
