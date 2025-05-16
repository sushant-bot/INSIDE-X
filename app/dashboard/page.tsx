"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Search,
  Bell,
  User,
  Home,
  Sparkles,
  TrendingUp,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  X,
  Video,
  Users,
  Zap,
  Flame,
  Clock,
  Filter,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  ImageIcon,
  BarChart2,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { GlowCard } from "@/components/ui/glow-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedText } from "@/components/ui/animated-text"
import { VideoChat } from "@/components/dashboard/video-chat"
import { DashboardSettings } from "@/components/dashboard/dashboard-settings"

export default function DashboardPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSort, setActiveSort] = useState("hot")
  const [activeView, setActiveView] = useState("card")
  const [videoChatOpen, setVideoChatOpen] = useState(false)
  const [randomChatOpen, setRandomChatOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")
  const videoRef = useRef(null)
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [showSessionSummary, setShowSessionSummary] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock data for posts
  const posts = [
    {
      id: 1,
      community: "photography",
      author: "Anonymous429",
      timePosted: "2 hours ago",
      title: "Check out this amazing sunset I captured yesterday!",
      content: "I've been experimenting with long exposure photography and finally got the perfect shot.",
      upvotes: 324,
      comments: 42,
      isImage: true,
      isVideo: false,
      tags: ["Photography", "Sunset", "LongExposure"],
      userVote: null,
    },
    {
      id: 2,
      community: "musicproducers",
      author: "BeatMaker92",
      timePosted: "5 hours ago",
      title: "Just released my first anonymous EP - would love your feedback!",
      content:
        "After months of work, I finally released my first EP. I'd love to hear what you all think without any bias based on who I am.",
      upvotes: 156,
      comments: 28,
      isImage: false,
      isVideo: true,
      tags: ["Music", "Production", "Feedback"],
      userVote: "up",
    },
    {
      id: 3,
      community: "anonymousart",
      author: "CreativeX",
      timePosted: "1 day ago",
      title: "How anonymity has changed my artistic expression",
      content:
        "Being able to share my art without revealing my identity has completely transformed how I approach creativity.",
      upvotes: 892,
      comments: 134,
      isImage: true,
      isVideo: false,
      tags: ["Art", "Creativity", "Identity"],
      userVote: "down",
    },
    {
      id: 4,
      community: "techtalks",
      author: "CodeNinja",
      timePosted: "3 hours ago",
      title: "Live coding session tonight - Building an anonymous messaging app",
      content:
        "Join me tonight at 8PM EST for a live coding session where I'll build a secure, anonymous messaging application from scratch.",
      upvotes: 213,
      comments: 37,
      isImage: false,
      isVideo: false,
      tags: ["Programming", "LiveStream", "Security"],
      userVote: null,
    },
    {
      id: 5,
      community: "traveltips",
      author: "Wanderlust23",
      timePosted: "12 hours ago",
      title: "How to travel anonymously in the digital age",
      content:
        "With so much of our lives online, here are some tips for maintaining privacy while documenting your travels.",
      upvotes: 421,
      comments: 89,
      isImage: true,
      isVideo: false,
      tags: ["Travel", "Privacy", "DigitalNomad"],
      userVote: "up",
    },
  ]

  // Mock data for communities
  const communities = [
    { name: "photography", members: 12543, isJoined: true },
    { name: "musicproducers", members: 8762, isJoined: true },
    { name: "anonymousart", members: 21568, isJoined: true },
    { name: "techtalks", members: 15324, isJoined: false },
    { name: "traveltips", members: 9876, isJoined: false },
    { name: "videocreators", members: 18432, isJoined: false },
    { name: "writersanonymous", members: 7654, isJoined: false },
    { name: "gamingcommunity", members: 32145, isJoined: false },
  ]

  // Mock data for live streams
  const liveStreams = [
    {
      id: 1,
      title: "Live Music Session - Piano Improvisation",
      username: "PianoMaster",
      viewers: 423,
      tags: ["Music", "Piano", "Live"],
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 2,
      title: "Anonymous Q&A - Ask Me Anything",
      username: "MysteryPerson",
      viewers: 1256,
      tags: ["AMA", "Anonymous", "Chat"],
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 3,
      title: "Digital Art Creation - Character Design",
      username: "ArtistX",
      viewers: 782,
      tags: ["Art", "Digital", "Character"],
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: 4,
      title: "Travel Vlog - Hidden Gems in Tokyo",
      username: "Wanderer42",
      viewers: 934,
      tags: ["Travel", "Tokyo", "Vlog"],
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ]

  // Function to handle voting
  const handleVote = (postId, voteType) => {
    // In a real app, this would call an API to update the vote
    console.log(`Voted ${voteType} on post ${postId}`)
  }

  // Function to start random chat
  const startRandomChat = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setRandomChatOpen(true)
    }, 2000)
  }

  // Function to handle closing the video chat
  const handleCloseVideoChat = () => {
    setSessionEnded(true)
    setShowSessionSummary(true)

    // Clean up video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
    }

    // After showing summary for a few seconds, close the chat
    setTimeout(() => {
      setVideoChatOpen(false)
      setSessionEnded(false)
      setShowSessionSummary(false)
    }, 3000)
  }

  return (
    <AnimatedBackgroundContainer
      particleCount={60}
      connectionDistance={120}
      colorScheme="purple"
      density={0.7}
      className="min-h-screen bg-black"
    >
      <div className="min-h-screen text-white backdrop-blur-sm">
        {/* Top Navigation Bar */}
        <header
          className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
            isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/50 backdrop-blur-sm"
          }`}
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left section - Logo and mobile menu */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  X
                </div>
                <AnimatedText
                  text="Inside X"
                  className="font-bold hidden md:block text-lg"
                  animation="fade"
                  color="text-white"
                />
              </Link>

              <div className="hidden md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 gap-1 text-sm hover:bg-white/10">
                      Home
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-black/90 backdrop-blur-md border-white/10">
                    <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Popular
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      All
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Middle section - Search */}
            <div className="hidden md:flex items-center max-w-xl w-full mx-4">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                <Input
                  type="search"
                  placeholder="Search Inside X"
                  className="pl-10 bg-white/5 border-white/10 text-white w-full focus-visible:ring-purple-500/50 h-10 rounded-full transition-all duration-200 group-hover:bg-white/10"
                />
              </div>
            </div>

            {/* Right section - User actions */}
            <div className="flex items-center gap-2">
              <AnimatedButton
                variant="glow"
                size="sm"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-4"
                onClick={() => setVideoChatOpen(true)}
                glowColor="rgba(147, 51, 234, 0.5)"
              >
                <Video className="h-4 w-4" />
                Go Live
              </AnimatedButton>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 relative"
                onClick={() => startRandomChat()}
              >
                <Users className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 h-10 px-2 text-white hover:bg-white/10">
                    <Avatar className="h-8 w-8 border-2 border-purple-500">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">A</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-xs hidden md:flex">
                      <span className="font-medium">Anonymous429</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-white/60">Online</span>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md border-white/10">
                  <div className="px-2 py-1.5 text-sm text-white/60">
                    <div className="font-medium text-white">Anonymous429</div>
                    <div className="text-xs">Premium Member</div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white focus:bg-white/10 focus:text-white"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Analytics
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="text-white focus:bg-white/10 focus:text-white">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[300px] p-0 bg-black/90 backdrop-blur-md border-white/10">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                    X
                  </div>
                  <span className="font-bold">Inside X</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50 group-hover:text-purple-400 transition-colors duration-200" />
                  <Input
                    type="search"
                    placeholder="Search Inside X"
                    className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-purple-500/50 rounded-full transition-all duration-200 group-hover:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <div className="p-2">
                  <div className="text-sm font-medium text-white/60 px-2 py-1">FEEDS</div>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Popular
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    All
                  </Button>
                </div>

                <Separator className="bg-white/10 my-2" />

                <div className="p-2">
                  <div className="flex items-center justify-between px-2 py-1">
                    <div className="text-sm font-medium text-white/60">YOUR COMMUNITIES</div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {communities
                    .filter((c) => c.isJoined)
                    .map((community) => (
                      <Button
                        key={community.name}
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2">
                          {community.name.charAt(0).toUpperCase()}
                        </div>
                        x/{community.name}
                      </Button>
                    ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-purple-500">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">A</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Anonymous429</div>
                    <div className="text-xs text-white/60">Premium Member</div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - Communities */}
          <aside className="hidden md:block w-64 space-y-6">
            <GlowCard className="overflow-hidden" glowColor="rgba(147, 51, 234, 0.5)" glowIntensity="medium">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <h2 className="font-bold text-white text-lg">Home</h2>
              </div>
              <div className="p-4">
                <p className="text-sm">
                  Your personal Inside X frontpage. Come here to check in with your favorite communities.
                </p>

                <div className="mt-4 space-y-2">
                  <AnimatedButton
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    glowColor="rgba(147, 51, 234, 0.5)"
                  >
                    Create Post
                  </AnimatedButton>
                  <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                    Create Community
                  </Button>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="overflow-hidden" glowColor="rgba(219, 39, 119, 0.5)" glowIntensity="medium">
              <div className="p-3 border-b border-white/10">
                <h3 className="font-medium">Your Communities</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {communities
                  .filter((c) => c.isJoined)
                  .map((community) => (
                    <div
                      key={community.name}
                      className="flex items-center justify-between p-3 hover:bg-white/5 cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs">
                          {community.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">x/{community.name}</div>
                          <div className="text-xs text-white/60">{community.members.toLocaleString()} members</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="p-3 border-t border-white/10">
                <Button variant="ghost" className="w-full justify-center text-white hover:bg-white/10">
                  See More
                </Button>
              </div>
            </GlowCard>

            <GlowCard className="overflow-hidden" glowColor="rgba(139, 92, 246, 0.5)" glowIntensity="medium">
              <div className="p-3 border-b border-white/10">
                <h3 className="font-medium">Random Video Chat</h3>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm mb-4">Connect with random users anonymously through video chat.</p>
                <AnimatedButton
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => startRandomChat()}
                  glowColor="rgba(147, 51, 234, 0.5)"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Start Random Chat
                </AnimatedButton>
              </div>
            </GlowCard>
          </aside>

          {/* Main Feed */}
          <div className="flex-1 max-w-3xl mx-auto w-full">
            {/* Tabs for Feed/Live/Discover */}
            <Tabs defaultValue="feed" onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-black/50 backdrop-blur-sm border border-white/10 p-1 rounded-full w-full">
                <TabsTrigger
                  value="feed"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Feed
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Live
                </TabsTrigger>
                <TabsTrigger
                  value="discover"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Discover
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed">
                {/* Create Post Card */}
                <GlowCard className="p-2 mb-6" glowColor="rgba(147, 51, 234, 0.3)" glowIntensity="low">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 border-2 border-purple-500">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      placeholder="Create Post"
                      className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500/50 rounded-full"
                    />
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 10L20 15L15 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 4V9C4 10.0609 4.42143 11.0783 5.17157 11.8284C5.92172 12.5786 6.93913 13 8 13H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </GlowCard>

                {/* Sort Options */}
                <GlowCard className="p-2 mb-6" glowColor="rgba(147, 51, 234, 0.3)" glowIntensity="low">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`text-sm gap-1 ${
                        activeSort === "hot" ? "text-white" : "text-white/60"
                      } hover:bg-white/10`}
                      onClick={() => setActiveSort("hot")}
                    >
                      <Flame className="h-4 w-4" />
                      Hot
                    </Button>
                    <Button
                      variant="ghost"
                      className={`text-sm gap-1 ${
                        activeSort === "new" ? "text-white" : "text-white/60"
                      } hover:bg-white/10`}
                      onClick={() => setActiveSort("new")}
                    >
                      <Clock className="h-4 w-4" />
                      New
                    </Button>
                    <Button
                      variant="ghost"
                      className={`text-sm gap-1 ${
                        activeSort === "top" ? "text-white" : "text-white/60"
                      } hover:bg-white/10`}
                      onClick={() => setActiveSort("top")}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Top
                    </Button>

                    <div className="ml-auto flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${activeView === "card" ? "bg-white/10" : ""}`}
                        onClick={() => setActiveView("card")}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                          <path d="M9 21L9 9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${activeView === "classic" ? "bg-white/10" : ""}`}
                        onClick={() => setActiveView("classic")}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 12H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 6H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 18H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </GlowCard>

                {/* Posts */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <GlowCard
                        className="overflow-hidden"
                        glowColor={
                          post.isVideo
                            ? "rgba(239, 68, 68, 0.5)"
                            : post.isImage
                              ? "rgba(147, 51, 234, 0.5)"
                              : "rgba(59, 130, 246, 0.5)"
                        }
                        glowIntensity={post.isVideo ? "high" : "medium"}
                      >
                        {/* Vote buttons */}
                        <div className="flex">
                          <div className="w-10 bg-black/30 flex flex-col items-center py-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                post.userVote === "up" ? "text-purple-500" : "text-white/60"
                              } hover:bg-transparent hover:text-purple-500`}
                              onClick={() => handleVote(post.id, "up")}
                            >
                              <ArrowBigUp className="h-5 w-5" />
                            </Button>
                            <span
                              className={`text-xs font-medium ${
                                post.userVote === "up"
                                  ? "text-purple-500"
                                  : post.userVote === "down"
                                    ? "text-pink-500"
                                    : "text-white"
                              }`}
                            >
                              {post.upvotes}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 p-0 ${
                                post.userVote === "down" ? "text-pink-500" : "text-white/60"
                              } hover:bg-transparent hover:text-pink-500`}
                              onClick={() => handleVote(post.id, "down")}
                            >
                              <ArrowBigDown className="h-5 w-5" />
                            </Button>
                          </div>

                          <div className="flex-1 p-4">
                            {/* Post header */}
                            <div className="flex items-center text-xs text-white/60 mb-2">
                              <div className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px]">
                                  {post.community.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-white">x/{post.community}</span>
                              </div>
                              <span className="mx-1">•</span>
                              <span>Posted by u/{post.author}</span>
                              <span className="mx-1">•</span>
                              <span>{post.timePosted}</span>
                            </div>

                            {/* Post title */}
                            <h3 className="text-lg font-medium mb-2">{post.title}</h3>

                            {/* Post content */}
                            <p className="text-sm mb-3">{post.content}</p>

                            {/* Post image/video placeholder */}
                            {(post.isImage || post.isVideo) && (
                              <div className="bg-black/30 rounded-md mb-3 overflow-hidden">
                                <div className="aspect-video flex items-center justify-center">
                                  {post.isVideo ? (
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
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-white/5 text-white border-white/10 hover:bg-white/10"
                                >
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
                                {post.comments} Comments
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
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="live">
                <div className="mb-6">
                  <GlowCard className="p-4" glowColor="rgba(239, 68, 68, 0.5)" glowIntensity="medium">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Live Streams</h2>
                      <AnimatedButton
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => setVideoChatOpen(true)}
                        glowColor="rgba(147, 51, 234, 0.5)"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Go Live
                      </AnimatedButton>
                    </div>
                    <p className="text-sm text-white/60 mb-4">
                      Watch live streams from other users or start your own stream to connect with the community.
                    </p>
                  </GlowCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveStreams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <GlowCard className="overflow-hidden" glowColor="rgba(239, 68, 68, 0.5)" glowIntensity="medium">
                        <div className="relative">
                          <img
                            src={stream.thumbnail || "/placeholder.svg"}
                            alt={stream.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-2">
                            <Badge className="bg-red-500 text-white">LIVE</Badge>
                            <Badge className="bg-black/50 backdrop-blur-sm text-white">{stream.viewers} viewers</Badge>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button className="bg-white text-black hover:bg-white/90">Watch Stream</Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-1">{stream.title}</h3>
                          <p className="text-sm text-white/60 mb-2">Streaming by u/{stream.username}</p>
                          <div className="flex flex-wrap gap-2">
                            {stream.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-white/5 text-white border-white/10 hover:bg-white/10"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discover">
                <GlowCard className="p-4 mb-6" glowColor="rgba(147, 51, 234, 0.5)" glowIntensity="medium">
                  <h2 className="text-xl font-bold mb-4">Discover</h2>
                  <p className="text-sm text-white/60 mb-4">
                    Find new communities, trending topics, and interesting content from across Inside X.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Photography",
                      "Music",
                      "Travel",
                      "Gaming",
                      "Art",
                      "Cooking",
                      "Technology",
                      "Fashion",
                      "Science",
                      "Movies",
                    ].map((topic) => (
                      <Badge
                        key={topic}
                        className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-white/10 hover:bg-white/10 cursor-pointer"
                      >
                        #{topic}
                      </Badge>
                    ))}
                  </div>
                </GlowCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communities
                    .filter((c) => !c.isJoined)
                    .map((community) => (
                      <motion.div
                        key={community.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <GlowCard className="overflow-hidden" glowColor="rgba(147, 51, 234, 0.3)" glowIntensity="low">
                          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
                                  {community.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">x/{community.name}</h3>
                                  <p className="text-sm text-white/60">{community.members.toLocaleString()} members</p>
                                </div>
                              </div>
                              <AnimatedButton
                                size="sm"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                glowColor="rgba(147, 51, 234, 0.5)"
                              >
                                Join
                              </AnimatedButton>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm mb-4">
                              A community for {community.name} enthusiasts to share their work, get feedback, and
                              connect with others.
                            </p>
                            <div className="flex items-center text-white/60 text-sm">
                              <div className="flex items-center gap-1 mr-4">
                                <Users className="h-4 w-4" />
                                <span>Created Jan 2023</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                <span>Very Active</span>
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <GlowCard className="p-4 mb-6" glowColor="rgba(147, 51, 234, 0.5)" glowIntensity="medium">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Your Analytics</h2>
                    <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Track your performance and engagement across Inside X.</p>
                </GlowCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <GlowCard className="p-4" glowColor="rgba(147, 51, 234, 0.3)" glowIntensity="low">
                    <div className="flex flex-col items-center">
                      <h3 className="text-sm font-medium text-white/60 mb-2">Total Views</h3>
                      <p className="text-3xl font-bold">12.4K</p>
                      <span className="text-xs text-green-500 mt-1">↑ 24% this week</span>
                    </div>
                  </GlowCard>

                  <GlowCard className="p-4" glowColor="rgba(219, 39, 119, 0.3)" glowIntensity="low">
                    <div className="flex flex-col items-center">
                      <h3 className="text-sm font-medium text-white/60 mb-2">Engagement Rate</h3>
                      <p className="text-3xl font-bold">8.7%</p>
                      <span className="text-xs text-green-500 mt-1">↑ 3.2% this week</span>
                    </div>
                  </GlowCard>

                  <GlowCard className="p-4" glowColor="rgba(139, 92, 246, 0.3)" glowIntensity="low">
                    <div className="flex flex-col items-center">
                      <h3 className="text-sm font-medium text-white/60 mb-2">New Followers</h3>
                      <p className="text-3xl font-bold">156</p>
                      <span className="text-xs text-green-500 mt-1">↑ 12% this week</span>
                    </div>
                  </GlowCard>
                </div>

                <GlowCard className="p-4 mb-6" glowColor="rgba(147, 51, 234, 0.3)" glowIntensity="low">
                  <h3 className="font-medium mb-4">Content Performance</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{post.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                            <span>x/{post.community}</span>
                            <span>•</span>
                            <span>{post.timePosted}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">{post.upvotes}</span>
                            <span className="text-xs text-white/60">Upvotes</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">{post.comments}</span>
                            <span className="text-xs text-white/60">Comments</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden lg:block w-80 space-y-6">
            <GlowCard className="overflow-hidden" glowColor="rgba(147, 51, 234, 0.5)" glowIntensity="medium">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600">
                <h2 className="font-bold text-white text-lg">About Inside X</h2>
              </div>
              <div className="p-4">
                <p className="text-sm mb-4">
                  Inside X is an anonymous video-first social media platform for authentic connections.
                </p>

                <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                  <span>Created</span>
                  <span>January 15, 2023</span>
                </div>

                <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                  <span>Members</span>
                  <span>124,532</span>
                </div>

                <div className="flex items-center justify-between text-sm py-2 border-t border-white/10">
                  <span>Online</span>
                  <span>3,421</span>
                </div>

                <AnimatedButton
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  glowColor="rgba(147, 51, 234, 0.5)"
                >
                  Join
                </AnimatedButton>
              </div>
            </GlowCard>

            <GlowCard className="overflow-hidden" glowColor="rgba(219, 39, 119, 0.5)" glowIntensity="medium">
              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                <h3 className="font-medium">Video Chat Features</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Video className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Go Live</h4>
                      <p className="text-sm text-white/60">Start your own live stream and connect with viewers</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Random Chat</h4>
                      <p className="text-sm text-white/60">Connect with random users anonymously</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Filter className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Filters & Effects</h4>
                      <p className="text-sm text-white/60">Enhance your video with filters and effects</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <AnimatedButton
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    onClick={() => setVideoChatOpen(true)}
                    glowColor="rgba(147, 51, 234, 0.5)"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Try Video Chat
                  </AnimatedButton>
                </div>
              </div>
            </GlowCard>

            <GlowCard className="overflow-hidden" glowColor="rgba(139, 92, 246, 0.5)" glowIntensity="medium">
              <div className="p-3 border-b border-white/10">
                <h3 className="font-medium">Trending Live Streams</h3>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {liveStreams.slice(0, 3).map((stream) => (
                    <div key={stream.id} className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-md">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={stream.thumbnail || "/placeholder.svg"}
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-1">LIVE</div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{stream.title}</h4>
                        <p className="text-xs text-white/60">
                          {stream.viewers} viewers • u/{stream.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-2 text-xs text-white hover:bg-white/10">
                  View All Live Streams
                </Button>
              </div>
            </GlowCard>
          </aside>
        </main>

        {/* Video Chat Modal */}
        <AnimatePresence>
          {videoChatOpen &&
            (sessionEnded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-8 max-w-md w-full text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Video className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Live Session Ended</h2>
                  <p className="text-white/60 mb-6">
                    Your live session has ended. Thank you for connecting with the Inside X community!
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>Session Duration</span>
                      <span className="font-medium">00:15:32</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>Peak Viewers</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>Comments</span>
                      <span className="font-medium">42</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <VideoChat onClose={handleCloseVideoChat} />
            ))}
        </AnimatePresence>

        {/* Random Chat Modal */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Finding a match...</h2>
                  <p className="text-white/60 mb-6">
                    We're connecting you with another anonymous user. This might take a moment.
                  </p>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {randomChatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl max-w-4xl w-full overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                    <h2 className="font-bold">Anonymous Video Chat</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setRandomChatOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="relative rounded-lg overflow-hidden bg-black/30 aspect-video">
                    {videoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                        style={{ transform: "scaleX(-1)" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                        <Avatar className="w-24 h-24">
                          <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500">
                            YOU
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">You</span>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden bg-black/30 aspect-video">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="text-4xl bg-gradient-to-r from-purple-500 to-pink-500">
                          ?
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Anonymous User</span>
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      micEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"
                    }`}
                    onClick={() => setMicEnabled(!micEnabled)}
                  >
                    {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full h-12 w-12 ${
                      videoEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"
                    }`}
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
                    onClick={() => setRandomChatOpen(false)}
                  >
                    <Phone className="h-5 w-5 rotate-135" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <AnimatePresence>
          {settingsOpen && <DashboardSettings onClose={() => setSettingsOpen(false)} />}
        </AnimatePresence>
      </div>
    </AnimatedBackgroundContainer>
  )
}
