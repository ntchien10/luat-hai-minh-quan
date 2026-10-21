"use client";

import { useEffect } from "react";
import { recordVisit } from "@/lib/api";

export function VisitTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Đếm 1 lượt mỗi phiên truy cập (session)
      const hasTracked = sessionStorage.getItem("hmq_visited_session");
      if (!hasTracked) {
        sessionStorage.setItem("hmq_visited_session", "true");
        recordVisit();
      }
    }
  }, []);

  return null;
}
