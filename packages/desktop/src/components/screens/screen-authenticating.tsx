import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/loader";
import { useConvexAuth } from "convex/react";

export default function ScreenAuthenticating() {
  const [deviceId, setDeviceId] = useState<string | null>(
    localStorage.getItem("deviceId")
  );
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthActions();
  const { isLoading, isAuthenticated } = useConvexAuth();

  async function signInWithDeviceId() {
    if (isAuthenticated) return;
    if (deviceId) {
      try {
        await signIn("deviceAuth", {
          flow: "register",
          deviceId: deviceId,
        });
        setError("authed");
      } catch (e: any) {
        setError(e.message);
      }
    } else {
      let newId = uuidv4();
      localStorage.setItem("deviceId", newId);
      setDeviceId(newId);
    }
  }

  useEffect(() => {
    if (isLoading) return;
    signInWithDeviceId();
  }, [deviceId, isLoading, isAuthenticated]);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-16">
      <Loader description="Authenticating..." />
      {JSON.stringify({ isLoading, isAuthenticated })}
      {error && (
        <div className="m-4 border-red-600 rounded-lg bg-red-100 p-4">
          ERROR: {error}
        </div>
      )}
    </div>
  );
}
