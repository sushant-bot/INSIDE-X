"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Sparkles, TrendingUp, Plus, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Community {
  name: string
  members: number
  isJoined: boolean
}

interface RedditSidebarProps {
  communities: Community[]
  username: string
  isPremium?: boolean
}

export function RedditSidebar({ communities, username, isPremium = false }: RedditSidebarProps) {
  const [showAllCommunities, setShowAllCommunities] = useState(false)

  const joinedCommunities = communities.filter((c) => c.isJoined)
  const displayedCommunities = showAllCommunities ? joinedCommunities : joinedCommunities.slice(0, 5)

  return (
    <aside className="w-64 space-y-4">
      <div className="bg-[#1A1A1B] rounded-md border border-[#343536] overflow-hidden">
        <div className="p-2">
          <div className="text-sm font-medium text-[#818384] px-2 py-1">FEEDS</div>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href="/popular">
              <Sparkles className="h-4 w-4 mr-2" />
              Popular
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href="/all">
              <TrendingUp className="h-4 w-4 mr-2" />
              All
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-[#1A1A1B] rounded-md border border-[#343536] overflow-hidden">
        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="text-sm font-medium text-[#818384]">YOUR COMMUNITIES</div>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-[#D7DADC]" asChild>
              <Link href="/communities/create">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {displayedCommunities.map((community) => (
            <Button
              key={community.name}
              variant="ghost"
              className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]"
              asChild
            >
              <Link href={`/x/${community.name}`}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2">
                  {community.name.charAt(0).toUpperCase()}
                </div>
                x/{community.name}
              </Link>
            </Button>
          ))}

          {joinedCommunities.length > 5 && (
            <Button
              variant="ghost"
              className="w-full justify-center text-[#D7DADC] hover:bg-[#272729] text-sm"
              onClick={() => setShowAllCommunities(!showAllCommunities)}
            >
              {showAllCommunities ? "Show Less" : `See ${joinedCommunities.length - 5} More`}
            </Button>
          )}
        </div>
      </div>

      <div className="bg-[#1A1A1B] rounded-md border border-[#343536] overflow-hidden">
        <div className="p-2">
          <div className="text-sm font-medium text-[#818384] px-2 py-1">PROFILE</div>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href={`/user/${username}`}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]" asChild>
            <Link href="/help">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-[#1A1A1B] rounded-md border border-[#343536] p-4">
        <div className="text-xs text-[#818384]">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Inside X Premium
            </a>
            <a href="#" className="hover:underline">
              Communities
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <p>© 2023 Inside X, Inc. All rights reserved</p>
        </div>
      </div>
    </aside>
  )
}
