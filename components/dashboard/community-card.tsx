"use client"

import { Button } from "@/components/ui/button"

interface CommunityCardProps {
  name: string
  members: number
  isJoined: boolean
  description?: string
}

export function CommunityCard({ name, members, isJoined, description }: CommunityCardProps) {
  return (
    <div className="bg-[#1A1A1B] rounded-md border border-[#343536] overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">x/{name}</div>
            <div className="text-xs text-[#818384]">{members.toLocaleString()} members</div>
          </div>
        </div>
        <Button
          size="sm"
          className={
            isJoined
              ? "h-7 bg-transparent border border-[#343536] text-[#D7DADC] hover:bg-[#272729]"
              : "h-7 bg-[#D7DADC] text-[#1A1A1B] hover:bg-[#c8cbcd]"
          }
        >
          {isJoined ? "Joined" : "Join"}
        </Button>
      </div>

      {description && <div className="px-3 pb-3 text-sm text-[#D7DADC]">{description}</div>}
    </div>
  )
}
