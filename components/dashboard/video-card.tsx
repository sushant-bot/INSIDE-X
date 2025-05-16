"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/glow-card"

interface VideoCardProps {
  title: string
  username: string
  community: string
  timePosted: string
  content: string
  tags: string[]
  upvotes: number
  comments: number
  isLive?: boolean
  isImage?: boolean
  isVideo?: boolean
  viewers?: number
}

export function VideoCard({
  title,
  username,
  community,
  timePosted,
  content,
  tags,
  upvotes,
  comments,
  isLive = false,
  isImage = false,
  isVideo = false,
  viewers,
}: VideoCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [voteCount, setVoteCount] = useState(upvotes)

  const handleVote = (voteType: "up" | "down") => {
    if (userVote === voteType) {
      // Removing vote
      setUserVote(null)
      setVoteCount(voteType === "up" ? voteCount - 1 : voteCount + 1)
    } else {
      // Changing vote or adding new vote
      const voteChange = userVote === null ? 1 : 2
      setUserVote(voteType)
      setVoteCount(voteType === "up" ? voteCount + voteChange : voteCount - voteChange)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <GlowCard
        className="overflow-hidden"
        glowColor={isVideo ? "rgba(239, 68, 68, 0.5)" : isImage ? "rgba(147, 51, 234, 0.5)" : "rgba(59, 130, 246, 0.5)"}
        glowIntensity={isVideo ? "high" : "medium"}
      >
        {/* Vote buttons */}
        <div className="flex">
          <div className="w-10 bg-black/30 flex flex-col items-center py-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 p-0 ${
                userVote === "up" ? "text-purple-500" : "text-white/60"
              } hover:bg-transparent hover:text-purple-500`}
              onClick={() => handleVote("up")}
            >
              <ArrowBigUp className="h-5 w-5" />
            </Button>
            <span
              className={`text-xs font-medium ${
                userVote === "up" ? "text-purple-500" : userVote === "down" ? "text-pink-500" : "text-white"
              }`}
            >
              {voteCount}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className={`h-6 w-6 p-0 ${
                userVote === "down" ? "text-pink-500" : "text-white/60"
              } hover:bg-transparent hover:text-pink-500`}
              onClick={() => handleVote("down")}
            >
              <ArrowBigDown className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 p-4">
            {/* Post header */}
            <div className="flex items-center text-xs text-white/60 mb-2">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px]">
                  {community.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-white">x/{community}</span>
              </div>
              <span className="mx-1">•</span>
              <span>Posted by u/{username}</span>
              <span className="mx-1">•</span>
              <span>{timePosted}</span>
              {isLive && (
                <>
                  <span className="mx-1">•</span>
                  <Badge className="bg-red-500 text-white text-xs h-4 px-1">LIVE</Badge>
                  {viewers && <span className="ml-1">{viewers} watching</span>}
                </>
              )}
            </div>

            {/* Post title */}
            <h3 className="text-lg font-medium mb-2">{title}</h3>

            {/* Post content */}
            <p className="text-sm mb-3">{content}</p>

            {/* Post image/video placeholder */}
            {(isImage || isVideo) && (
              <div className="bg-black/30 rounded-md mb-3 overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  {isVideo ? (
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <svg
                          className="h-8 w-8 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <path d="M15.5 12L10 16.5V7.5L15.5 12Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <img
                      src="/placeholder.svg?height=300&width=600"
                      alt="Post content"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-white/5 text-white border-white/10 hover:bg-white/10">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Post actions */}
            <div className="flex items-center text-white/60">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                {comments} Comments
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs gap-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
