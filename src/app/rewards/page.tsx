"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, Star, Trophy, Target, TrendingUp, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";

const badges = [
  { id: "explorer", name: "Island Explorer", description: "Visit your first 5 destinations", icon: "🗺️", requiredPoints: 100, color: "from-ocean-teal to-lagoon", earned: true },
  { id: "coral", name: "Coral Adventurer", description: "Complete 10 diving experiences", icon: "🤿", requiredPoints: 500, color: "from-ocean-turquoise to-cyan-400", earned: true },
  { id: "reef", name: "Reef Master", description: "Log 25 dive sites in your dive log", icon: "🦈", requiredPoints: 1000, color: "from-maldives-blue to-blue-400", earned: false },
  { id: "atoll", name: "Atoll Expert", description: "Explore 4 different atolls", icon: "⚓", requiredPoints: 2000, color: "from-gold to-yellow-400", earned: false },
  { id: "legend", name: "Maldives Legend", description: "Complete 50 bookings and 100 reviews", icon: "👑", requiredPoints: 5000, color: "from-coral to-orange-400", earned: false },
  { id: "photographer", name: "Ocean Photographer", description: "Share 20 photos from your trips", icon: "📸", requiredPoints: 300, color: "from-purple-600 to-purple-400", earned: true },
];

const leaderboard = [
  { rank: 1, name: "James R.", points: 8420, badge: "👑", country: "Australia" },
  { rank: 2, name: "Amira A.", points: 7850, badge: "⚓", country: "UAE" },
  { rank: 3, name: "Sarah M.", points: 6920, badge: "🦈", country: "UK" },
  { rank: 4, name: "You", points: 650, badge: "🤿", country: "—", isUser: true },
  { rank: 5, name: "Miguel C.", points: 580, badge: "🤿", country: "Spain" },
];

const recentActivity = [
  { action: "Booked Manta Point Dive", points: 50, date: "2 days ago" },
  { action: "Left a 5-star review", points: 25, date: "5 days ago" },
  { action: "First booking!", points: 100, date: "1 week ago" },
];

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function RewardsPage() {
  const { data: session } = useSession();
  const userPoints = 650;
  const nextBadgePoints = 1000;
  const progress = (userPoints / nextBadgePoints) * 100;

  return (
    <div className="min-h-screen bg-ocean-deep pt-16">
      {/* Hero */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-ocean-mid to-ocean-deep">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Award className="h-12 w-12 text-gold mx-auto mb-4" />
            <h1 className="font-serif text-4xl font-bold text-pearl mb-2">Rewards & Achievements</h1>
            <p className="text-pearl/50 mb-6">Earn points for every booking, review, and adventure in the Maldives.</p>

            {session?.user ? (
              <div className="glass-dark rounded-2xl p-6 max-w-sm mx-auto">
                <p className="text-pearl/40 text-sm mb-1">Your Points Balance</p>
                <p className="text-5xl font-bold text-gradient-gold font-serif">{userPoints.toLocaleString()}</p>
                <p className="text-pearl/40 text-sm mt-2">Level: Coral Adventurer</p>
              </div>
            ) : (
              <div className="glass-dark rounded-2xl p-6 max-w-sm mx-auto">
                <p className="text-pearl/50 mb-4">Sign in to track your rewards</p>
                <Button variant="primary" asChild><Link href="/login">Sign In</Link></Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Progress to next badge */}
        {session?.user && (
          <section>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-pearl">Progress to Reef Master</h3>
                  <p className="text-sm text-pearl/40">{userPoints} / {nextBadgePoints} points</p>
                </div>
                <span className="text-2xl">🦈</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-ocean-teal to-lagoon"
                />
              </div>
              <p className="text-xs text-pearl/40 mt-2">{nextBadgePoints - userPoints} more points to unlock</p>
            </GlassCard>
          </section>
        )}

        {/* Badges grid */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Achievement Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge, i) => (
              <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className={`p-5 text-center h-full flex flex-col items-center relative overflow-hidden ${!badge.earned && "opacity-50"}`}>
                  {badge.earned && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-3 w-3 text-gold fill-gold" />
                    </div>
                  )}
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl mb-3 ${badge.earned ? "shadow-ocean" : "grayscale"}`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-semibold text-pearl text-sm mb-1">{badge.name}</h3>
                  <p className="text-xs text-pearl/40 flex-1 leading-relaxed">{badge.description}</p>
                  <p className="text-xs text-ocean-turquoise mt-2">{badge.requiredPoints} pts</p>
                  {badge.earned && (
                    <span className="mt-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Earned</span>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Two columns: leaderboard + recent activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-pearl mb-6 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              Leaderboard
            </h2>
            <GlassCard className="overflow-hidden">
              <div className="divide-y divide-white/10">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className={`flex items-center gap-4 px-6 py-4 ${entry.isUser ? "bg-ocean-teal/10" : ""}`}>
                    <div className={`w-8 text-center font-bold ${entry.rank === 1 ? "text-gold text-xl" : entry.rank === 2 ? "text-slate-300" : entry.rank === 3 ? "text-amber-600" : "text-pearl/40"}`}>
                      {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
                    </div>
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-ocean-teal to-lagoon flex items-center justify-center text-sm font-bold text-white">
                      {entry.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${entry.isUser ? "text-ocean-turquoise" : "text-pearl"}`}>{entry.name}</p>
                      <p className="text-xs text-pearl/40">{entry.country}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-pearl">{entry.points.toLocaleString()}</span>
                      <span className="text-xs text-pearl/40 ml-1">pts</span>
                    </div>
                    <span className="text-xl">{entry.badge}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>

          {/* Recent activity + how to earn */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-pearl mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-ocean-turquoise" />
              How to Earn Points
            </h2>
            <GlassCard className="p-6 mb-6">
              <div className="space-y-4">
                {[
                  { action: "Make a booking", points: "+100", icon: "🏨" },
                  { action: "Write a review", points: "+25", icon: "⭐" },
                  { action: "Log a dive", points: "+15", icon: "🤿" },
                  { action: "Add a photo", points: "+10", icon: "📸" },
                  { action: "Refer a friend", points: "+200", icon: "👥" },
                  { action: "Complete your profile", points: "+50", icon: "👤" },
                ].map((item) => (
                  <div key={item.action} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm text-pearl/70">{item.action}</span>
                    </div>
                    <span className="text-sm font-bold text-ocean-turquoise">{item.points}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {session?.user && (
              <>
                <h3 className="font-semibold text-pearl mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <GlassCard key={activity.action} className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-pearl">{activity.action}</p>
                        <p className="text-xs text-pearl/40">{activity.date}</p>
                      </div>
                      <span className="text-sm font-bold text-ocean-turquoise">+{activity.points}</span>
                    </GlassCard>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
