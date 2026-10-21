"use client";

import { useState, useEffect } from "react";
import { TeamMember, teamMembersList } from "@/data/mockData";
import { fetchTeamMembers, DbTeamMember } from "@/lib/api";

export function useLiveTeam(): { members: TeamMember[]; isLive: boolean } {
  const [members, setMembers] = useState<TeamMember[]>(teamMembersList);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLive = async () => {
      // 1. Lấy dữ liệu từ SQLite API trên hosting (hoặc local fallback)
      const res = await fetchTeamMembers();
      if (isMounted && res.members && res.members.length > 0) {
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
      }
    };

    loadLive();

    return () => {
      isMounted = false;
    };
  }, []);

  return { members, isLive };
}
