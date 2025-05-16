"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Sparkles, TrendingUp, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface Community {
  name: string
  members: number
  isJoined: boolean
}

interface RedditMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  communities: Community[]
  username: string
  isPremium?: boolean
}

export function RedditMobileMenu({ isOpen, onClose, communities, username, isPremium = false }: RedditMobileMenuProps) {
  const [showAllCommunities, setShowAllCommunities] = useState(false)

  const joinedCommunities = communities.filter((c) => c.isJoined)
  const displayedCommunities = showAllCommunities ? joinedCommunities : joinedCommunities.slice(0, 5)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] p-0 bg-[#1A1A1B] border-[#343536]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#343536] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                X
              </div>
              <span className="font-semibold">Inside X</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4">
            <Input
              type="search"
              placeholder="Search Inside X"
              className="bg-[#272729] border-[#343536] text-[#D7DADC] focus-visible:ring-[#343536]"
            />
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-2">
              <div className="text-sm font-medium text-[#818384] px-2 py-1">FEEDS</div>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]"
                asChild
                onClick={onClose}
              >
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]"
                asChild
                onClick={onClose}
              >
                <Link href="/popular">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Popular
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#D7DADC] hover:bg-[#272729]"
                asChild
                onClick={onClose}
              >
                <Link href="/all">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  All
                </Link>
              </Button>
            </div>

            <Separator className="bg-[#343536] my-2" />

            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-1">
                <div className="text-sm font-medium text-[#818384]">YOUR COMMUNITIES</div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-[#D7DADC]" asChild onClick={onClose}>
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
                  onClick={onClose}
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

          <div className="p-4 border-t border-[#343536]">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{username}</div>
                <div className="text-xs text-[#818384]">{isPremium ? "Premium Member" : "Member"}</div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
