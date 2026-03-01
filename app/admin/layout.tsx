"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabase-browser";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // allow /admin/login without redirect loop
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }

    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else setReady(true);
    });
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}