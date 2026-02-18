import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const usePushNotifications = () => {
  const { user } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const isSupported = "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
    setSupported(isSupported);
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!supported) return false;

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === "granted") {
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await (registration as any).pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: undefined, // Replace with VAPID public key when ready
        });
        setSubscription(sub);

        // Store subscription in database for later use with webhooks
        if (user) {
          await supabase.from("support_messages").insert({
            user_id: user.id,
            message: `[PUSH_SUB] ${JSON.stringify(sub.toJSON())}`,
            is_from_user: true,
          });
        }
        return true;
      } catch (err) {
        console.error("Push subscription failed:", err);
        return false;
      }
    }
    return false;
  };

  return { permission, subscription, supported, requestPermission };
};
