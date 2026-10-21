"use client";

import { useState, useEffect } from "react";
import { TeamMember, teamMembersList } from "@/data/mockData";
import { fetchTeamMembersFromSupabase, isSupabaseConfigured, DbTeamMember } from "@/lib/supabase";

export function useLiveTeam(): { members: TeamMember[]; isLive: boolean } {
  const [members, setMembers] = useState<TeamMember[]>(teamMembersList);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLive = async () => {
      // 1. Kiểm tra Supabase
      if (isSupabaseConfigured()) {
        const res = await fetchTeamMembersFromSupabase();
        if (isMounted && res.members.length > 0) {
          const activeOnes = res.members.filter((m) => m.is_active);
          const mapped: TeamMember[] = activeOnes.map((m: DbTeamMember) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            imageUrl: m.image_url,
            link: m.link || `/thanh-vien/${m.slug}/`,
            phone: m.phone,
            email: m.email,
            cardNo: m.card_no,
            qualifications: m.qualifications,
            experience: m.experience,
            expertise: m.expertise,
            bio: m.bio,
          }));
          setMembers(mapped);
          setIsLive(true);
          return;
        }
      }

      // 2. Fallback local storage
      if (typeof window !== "undefined") {
        const local = localStorage.getItem("hmq_local_members");
        if (local && isMounted) {
          try {
            const parsed: DbTeamMember[] = JSON.parse(local);
            const activeOnes = parsed.filter((m) => m.is_active);
            const mapped: TeamMember[] = activeOnes.map((m) => ({
              id: m.id,
              name: m.name,
              role: m.role,
              imageUrl: m.image_url,
              link: m.link || `/thanh-vien/${m.slug}/`,
              phone: m.phone,
              email: m.email,
              cardNo: m.card_no,
              qualifications: m.qualifications,
              experience: m.experience,
              expertise: m.expertise,
              bio: m.bio,
            }));
            setMembers(mapped);
            setIsLive(true);
          } catch (e) {
            console.error(e);
          }
        }
      }
    };

    loadLive();

    return () => {
      isMounted = false;
    };
  }, []);

  return { members, isLive };
}
