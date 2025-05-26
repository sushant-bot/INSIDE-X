"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaPermissions } from "@/hooks/use-media-permissions"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GlowCard } from "@/components/ui/glow-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Users,
  Phone,
  SkipForward,
  Filter,
  Maximize2,
  Minimize2,
  MoreVertical,
  Smile,
  Sticker,
  ImageIcon,
  Settings,
  Share,
  RefreshCw,
  Sliders,
  X,
  SendHorizonal,
  AlertTriangle,
} from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  time: string
  isSticker?: boolean
}

interface RandomVideoChatProps {
  onClose: () => void
  preferences: {
    languages: string[]
    interests: string[]
    safetyLevel: string
    enableVideo: boolean
    enableMic: boolean
    allowRecording: boolean
  }
}

export function RandomVideoChat({ onClose, preferences }: RandomVideoChatProps) {
  // State for video chat features
  const [micEnabled, setMicEnabled] = useState(preferences.enableMic)
  const [videoEnabled, setVideoEnabled] = useState(preferences.enableVideo)
  const [chatOpen, setChatOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "System", content: "You are now connected with a random user", time: getCurrentTime() },
  ])
  const [partner, setPartner] = useState({
    connected: true,
    typing: false,
  })
  const [showEmojis, setShowEmojis] = useState(false)
  const [showStickers, setShowStickers] = useState(false)
  const [isSkippingUser, setIsSkippingUser] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")

  // Video filter state
  const [videoEffect, setVideoEffect] = useState("none")
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const [activeFilter, setActiveFilter] = useState("none")

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const partnerVideoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Access media devices
  const {
    cameraPermission,
    microphonePermission,
    stream,
    requestPermissions,
    stopMediaStream,
    error,
    errorMessage,
  } = useMediaPermissions(true, "both")

  useEffect(() => {
    // Assign stream to video element
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }

    // Mock partner video for demo purposes
    setTimeout(() => {
      if (partnerVideoRef.current) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (partnerVideoRef.current) {
              partnerVideoRef.current.srcObject = stream
            }
          })
          .catch((err) => console.error("Error creating mock partner video:", err))
      }
    }, 1000)

    // Mock partner typing and messages for demo
    const typingTimeout = setTimeout(() => {
      setPartner(prev => ({ ...prev, typing: true }))
      
      setTimeout(() => {
        setPartner(prev => ({ ...prev, typing: false }))
        addMessage({
          id: messages.length + 1,
          sender: "Partner",
          content: "Hi there, how are you doing today?",
          time: getCurrentTime(),
        })
      }, 3000)
    }, 5000)

    return () => {
      clearTimeout(typingTimeout)
      stopMediaStream()
      
      // Clean up partner video stream
      if (partnerVideoRef.current && partnerVideoRef.current.srcObject) {
        const partnerStream = partnerVideoRef.current.srcObject as MediaStream
        partnerStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream, stopMediaStream])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Helper function to get current time
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Add a new message
  function addMessage(message: Message) {
    setMessages(prev => [...prev, message])
  }

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      addMessage({
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        time: getCurrentTime(),
      })
      setNewMessage("")
      
      // Simulate partner typing and response
      setTimeout(() => {
        setPartner(prev => ({ ...prev, typing: true }))
        
        setTimeout(() => {
          setPartner(prev => ({ ...prev, typing: false }))
          const responses = [
            "That's interesting!",
            "I agree with you",
            "Tell me more about that",
            "Cool! I like that too",
            "I've never thought of it that way before",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          
          addMessage({
            id: messages.length + 2,
            sender: "Partner",
            content: randomResponse,
            time: getCurrentTime(),
          })
        }, 2000 + Math.random() * 1000)
      }, 1000)
    }
  }

  // Handle sending a sticker
  const handleSendSticker = (stickerId: string) => {
    addMessage({
      id: messages.length + 1,
      sender: "You",
      content: stickerId,
      time: getCurrentTime(),
      isSticker: true,
    })
    setShowStickers(false)
    
    // Simulate partner responding with a sticker
    setTimeout(() => {
      const stickerIds = ["happy", "thumbsup", "heart", "laugh", "wink"]
      const randomSticker = stickerIds[Math.floor(Math.random() * stickerIds.length)]
      
      addMessage({
        id: messages.length + 2,
        sender: "Partner",
        content: randomSticker,
        time: getCurrentTime(),
        isSticker: true,
      })
    }, 2000 + Math.random() * 2000)
  }

  // Handle adding an emoji to the message
  const handleAddEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji)
    setShowEmojis(false)
  }

  // Skip to next user
  const handleSkipUser = () => {
    setIsSkippingUser(true)
    setMessages([
      { id: 1, sender: "System", content: "Looking for a new user...", time: getCurrentTime() },
    ])
    
    // Simulate finding a new user
    setTimeout(() => {
      setIsSkippingUser(false)
      setMessages([
        { id: 1, sender: "System", content: "You are now connected with a new user", time: getCurrentTime() },
      ])
    }, 2000)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  // Apply video filter
  const applyFilter = (filter: string) => {
    setActiveFilter(filter)
  }

  // Generate filter style based on current settings
  const getVideoStyle = () => {
    let filterStyle = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`

    // Add specific filters
    if (activeFilter === "grayscale") {
      filterStyle += " grayscale(100%)"
    } else if (activeFilter === "sepia") {
      filterStyle += " sepia(70%)"
    } else if (activeFilter === "invert") {
      filterStyle += " invert(80%)"
    } else if (activeFilter === "hue-rotate") {
      filterStyle += " hue-rotate(180deg)"
    }

    return {
      filter: filterStyle,
    }
  }

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  }

  // Sample stickers
  const stickers = [
    { id: "happy", emoji: "😄" },
    { id: "love", emoji: "❤️" },
    { id: "thumbsup", emoji: "👍" },
    { id: "laugh", emoji: "😂" },
    { id: "fire", emoji: "🔥" },
    { id: "clap", emoji: "👏" },
    { id: "wink", emoji: "😉" },
    { id: "heart", emoji: "💖" },
    { id: "cool", emoji: "😎" },
    { id: "wow", emoji: "😮" },
    { id: "sad", emoji: "😢" },
    { id: "angry", emoji: "😡" },
  ]

  // Sample emojis
  const emojis = [
    "😊", "😂", "🥰", "😍", "😎", "🙄", "😢", "😡",
    "👍", "👎", "👏", "🙌", "🤝", "🤞", "✌️", "🤟",
    "❤️", "💖", "💯", "🔥", "✨", "🎉", "🎊", "🎁"
  ]

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center p-4 border-b border-white/10 bg-black/80 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="font-bold text-sm sm:text-base">Random Video Chat</h2>
          
          <div className="hidden sm:flex gap-2">
            {preferences.interests.length > 0 && (
              <>
                <span className="text-xs text-white/60">Interests:</span>
                <div className="flex flex-wrap gap-1">
                  {preferences.interests.map((interest) => (
                    <span key={interest} className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-white/10">
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" onClick={() => setReportModalOpen(true)}>
                <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                Report User
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Share className="h-4 w-4 mr-2" />
                Share Link
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {/* Main chat area with both videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
            {/* Your video */}
            <div className="relative rounded-lg overflow-hidden bg-black/40 border border-white/10">
              {videoEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)", ...getVideoStyle() }}
                ></video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800/80 flex items-center justify-center">
                    <VideoOff className="h-10 w-10 text-white/60" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-xs">
                You {!micEnabled && "(muted)"}
              </div>
            </div>

            {/* Partner's video */}
            <div className="relative rounded-lg overflow-hidden bg-black/40 border border-white/10">
              {!isSkippingUser ? (
                <video
                  ref={partnerVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                ></video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-10 w-10 text-white/60 animate-spin" />
                    <p className="text-white/60 mt-4">Finding a new match...</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-xs">
                Partner
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {(chatOpen || videoEffect !== "none") && (
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-64 md:w-80 border-l border-white/10 bg-black/80 backdrop-blur-md flex flex-col"
            >
              {chatOpen && (
                <div className="flex flex-col h-full">
                  <div className="p-3 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-medium">Chat</h3>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setChatOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <ScrollArea className="flex-1 p-3">
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`${
                            msg.sender === "You"
                              ? "ml-auto bg-purple-500/20 border-purple-500/30"
                              : msg.sender === "System"
                              ? "mx-auto bg-white/10 border-white/20 text-center"
                              : "mr-auto bg-blue-500/20 border-blue-500/30"
                          } p-2 rounded-lg border max-w-[85%]`}
                        >
                          {msg.isSticker ? (
                            <div className="text-4xl text-center">
                              {stickers.find(s => s.id === msg.content)?.emoji || "😊"}
                            </div>
                          ) : (
                            <>
                              <p className="text-xs font-medium mb-1 text-white/70">{msg.sender}</p>
                              <p className="text-sm">{msg.content}</p>
                              <p className="text-[10px] text-white/60 text-right mt-1">{msg.time}</p>
                            </>
                          )}
                        </div>
                      ))}
                      
                      {partner.typing && (
                        <div className="mr-auto bg-blue-500/10 border-blue-500/20 p-2 rounded-lg border">
                          <div className="flex gap-1 items-center">
                            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {showEmojis && (
                    <div className="p-2 border-t border-white/10 bg-white/5">
                      <div className="grid grid-cols-8 gap-1">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            className="hover:bg-white/10 rounded p-1"
                            onClick={() => handleAddEmoji(emoji)}
                          >
                            <span className="text-lg">{emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {showStickers && (
                    <div className="p-2 border-t border-white/10 bg-white/5">
                      <div className="grid grid-cols-4 gap-2">
                        {stickers.map((sticker) => (
                          <button
                            key={sticker.id}
                            className="hover:bg-white/10 rounded p-1 text-2xl"
                            onClick={() => handleSendSticker(sticker.id)}
                          >
                            {sticker.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex flex-col gap-2">
                    <div className="flex gap-1.5">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 shrink-0" 
                        onClick={() => {
                          setShowEmojis(!showEmojis)
                          setShowStickers(false)
                        }}
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 shrink-0" 
                        onClick={() => {
                          setShowStickers(!showStickers)
                          setShowEmojis(false)
                        }}
                      >
                        <Sticker className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="h-8 bg-white/5 border-white/10"
                      />
                      
                      <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <SendHorizonal className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {videoEffect === "filter" && (
                <div className="flex flex-col h-full">
                  <div className="p-3 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-medium">Video Filters</h3>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setVideoEffect("none")}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <ScrollArea className="flex-1 p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={activeFilter === "none" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => applyFilter("none")}
                      >
                        Normal
                      </Button>
                      <Button
                        variant={activeFilter === "grayscale" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => applyFilter("grayscale")}
                      >
                        Grayscale
                      </Button>
                      <Button
                        variant={activeFilter === "sepia" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => applyFilter("sepia")}
                      >
                        Sepia
                      </Button>
                      <Button
                        variant={activeFilter === "invert" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => applyFilter("invert")}
                      >
                        Negative
                      </Button>
                      <Button
                        variant={activeFilter === "hue-rotate" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => applyFilter("hue-rotate")}
                      >
                        Psychedelic
                      </Button>
                      <Button
                        variant={activeFilter === "blur" ? "secondary" : "outline"}
                        className="w-full h-16 text-xs"
                        onClick={() => {
                          applyFilter("blur")
                          setBlur(5)
                        }}
                      >
                        Blur
                      </Button>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setVideoEffect("sliders")}
                      >
                        Advanced Adjustments
                        <Sliders className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </ScrollArea>
                </div>
              )}
              
              {videoEffect === "sliders" && (
                <div className="flex flex-col h-full">
                  <div className="p-3 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-medium">Video Adjustments</h3>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setVideoEffect("none")}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <ScrollArea className="flex-1 px-3 py-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="brightness" className="text-sm">Brightness</Label>
                          <span className="text-xs text-white/60">{brightness}%</span>
                        </div>
                        <Slider
                          id="brightness"
                          min={50}
                          max={150}
                          step={5}
                          value={[brightness]}
                          onValueChange={(values) => setBrightness(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="contrast" className="text-sm">Contrast</Label>
                          <span className="text-xs text-white/60">{contrast}%</span>
                        </div>
                        <Slider
                          id="contrast"
                          min={50}
                          max={150}
                          step={5}
                          value={[contrast]}
                          onValueChange={(values) => setContrast(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="saturation" className="text-sm">Saturation</Label>
                          <span className="text-xs text-white/60">{saturation}%</span>
                        </div>
                        <Slider
                          id="saturation"
                          min={0}
                          max={200}
                          step={5}
                          value={[saturation]}
                          onValueChange={(values) => setSaturation(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="blur" className="text-sm">Blur</Label>
                          <span className="text-xs text-white/60">{blur}px</span>
                        </div>
                        <Slider
                          id="blur"
                          min={0}
                          max={10}
                          step={0.5}
                          value={[blur]}
                          onValueChange={(values) => setBlur(values[0])}
                        />
                      </div>
                      
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => {
                          setBrightness(100)
                          setContrast(100)
                          setSaturation(100)
                          setBlur(0)
                          setActiveFilter("none")
                        }}
                      >
                        Reset All
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setVideoEffect("filter")}
                      >
                        Back to Filters
                      </Button>
                    </div>
                  </ScrollArea>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-4 border-t border-white/10 bg-black/80 backdrop-blur-md"
      >
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${micEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"}`}
            onClick={() => setMicEnabled(!micEnabled)}
          >
            {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${videoEnabled ? "bg-white/10" : "bg-red-500/20 border-red-500/50"}`}
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${chatOpen ? "bg-purple-500/20 border-purple-500/50" : "bg-white/10"}`}
            onClick={() => {
              setChatOpen(!chatOpen)
              setVideoEffect("none")
            }}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full h-12 w-12 ${videoEffect !== "none" ? "bg-purple-500/20 border-purple-500/50" : "bg-white/10"}`}
            onClick={() => {
              setVideoEffect(videoEffect === "none" ? "filter" : "none")
              setChatOpen(false)
            }}
          >
            <Filter className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full h-12 w-12 bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30"
            onClick={handleSkipUser}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full h-12 w-12 bg-red-500 hover:bg-red-600"
            onClick={onClose}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        </div>
      </motion.div>

      {/* Report User Modal */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="bg-gray-900 border-white/10">
          <DialogHeader>
            <DialogTitle>Report User</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <p className="text-sm text-white/70">
              Please provide the reason for reporting this user. Our team will review the report.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason</Label>
              <textarea
                id="report-reason"
                className="w-full bg-black/20 border-white/10 rounded-md p-2 min-h-[100px]"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe why you're reporting this user"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setReportModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setReportModalOpen(false)
                // Handle report submission
              }}
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}