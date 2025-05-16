"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Bell, User, Home, Sparkles, TrendingUp, ChevronDown, Settings, LogOut, Menu } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface RedditHeaderProps {
  username: string
  isPremium?: boolean
  onMobileMenuToggle?: (isOpen: boolean) => void
}

export function RedditHeader({ username, isPremium = false, onMobileMenuToggle }: RedditHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen)
    if (onMobileMenuToggle) {
      onMobileMenuToggle(isOpen)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#343536] transition-all duration-300 ${
        isScrolled ? "bg-[#1A1A1B]" : "bg-[#1A1A1B]"
      }`}
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between">
        {/* Left section - Logo and mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#D7DADC]"
            onClick={() => handleMobileMenuToggle(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              X
            </div>
            <span className="font-semibold hidden md:block text-[#D7DADC]">Inside X</span>
          </Link>

          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 gap-1 text-sm text-[#D7DADC]">
                  Home
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-[#1A1A1B] border-[#343536]">
                <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Popular
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Middle section - Search */}
        <div className="hidden md:flex items-center max-w-xl w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#818384]" />
            <Input
              type="search"
              placeholder="Search Inside X"
              className="pl-10 bg-[#272729] border-[#343536] text-[#D7DADC] w-full focus-visible:ring-[#343536] h-9"
            />
          </div>
        </div>

        {/* Right section - User actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-[#D7DADC] hover:bg-[#272729]">
            <Sparkles className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-[#D7DADC] hover:bg-[#272729]">
            <Bell className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-[#D7DADC] hover:bg-[#272729] md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-8 px-2 text-[#D7DADC] hover:bg-[#272729]">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-xs hidden md:flex">
                  <span className="font-medium">{username}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[#818384]">Online</span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1B] border-[#343536]">
              <div className="px-2 py-1.5 text-sm text-[#818384]">
                <div className="font-medium text-[#D7DADC]">{username}</div>
                <div className="text-xs">{isPremium ? "Premium Member" : "Member"}</div>
              </div>
              <DropdownMenuSeparator className="bg-[#343536]" />
              <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#343536]" />
              <DropdownMenuItem className="text-[#D7DADC] focus:bg-[#272729] focus:text-[#D7DADC]">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
