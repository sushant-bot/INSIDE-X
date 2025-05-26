"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { RandomVideoChat } from "@/components/random-chat/random-video-chat"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedText } from "@/components/ui/animated-text"
import { GlowCard } from "@/components/ui/glow-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  ArrowRight,
  Sparkles,
  Video,
  Wand2,
  Globe,
  Languages,
  Shield,
  Camera,
  VideoOff,
  Users,
  MicOff,
  Mic,
  X,
} from "lucide-react"

export default function RandomChatPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [preferences, setPreferences] = useState<{
    languages: string[],
    interests: string[],
    safetyLevel: string,
    enableVideo: boolean,
    enableMic: boolean,
    allowRecording: boolean,
  }>({
    languages: ["English"],
    interests: [],
    safetyLevel: "moderate",
    enableVideo: true,
    enableMic: true,
    allowRecording: false,
  })

  const handleStartChat = () => {
    setIsSearching(true)
    
    // Simulate finding a match after a short delay
    setTimeout(() => {
      setIsSearching(false)
      setIsStarted(true)
    }, 3000)
  }

  const handleStopChat = () => {
    setIsStarted(false)
  }

  if (isStarted) {
    return <RandomVideoChat onClose={handleStopChat} preferences={preferences} />
  }

  const interestOptions = [
    "Music", "Art", "Gaming", "Technology", "Travel", 
    "Movies", "Sports", "Cooking", "Books", "Fashion",
    "Fitness", "Photography", "Dance", "Education", "Science"
  ]

  return (
    <AnimatedBackgroundContainer
      particleCount={80}
      connectionDistance={150}
      colorScheme="purple"
      className="min-h-screen"
    >
      <div className="min-h-screen flex flex-col">
        <header className="relative z-10 border-b border-white/10 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Inside X</h1>
              <Button variant="ghost" size="sm" className="text-white/60" onClick={() => window.history.back()}>
                <X className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative z-10 container mx-auto px-4 py-8 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <AnimatedText 
              text="Random Video Chat" 
              animation="slide" 
              className="text-3xl font-bold" 
              as="h2" 
            />
            <p className="text-white/60 mt-2">
              Connect with random users anonymously through video chat
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center"
              >
                <GlowCard
                  className="max-w-md w-full p-8 text-center"
                  glowColor="rgba(147, 51, 234, 0.5)"
                  glowIntensity="high"
                >
                  <div className="flex flex-col items-center gap-6">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1] 
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                    >
                      <Users className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Finding Your Match</h3>
                      <p className="text-white/60">
                        Looking for someone with similar interests...
                      </p>
                    </div>
                    
                    <Button variant="outline" onClick={() => setIsSearching(false)}>
                      Cancel
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            ) : (
              <motion.div
                key="preferences"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center"
              >
                <GlowCard
                  className="max-w-3xl w-full overflow-hidden"
                  glowColor="rgba(147, 51, 234, 0.5)"
                >
                  <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl">
                    <div className="p-6 border-b border-white/10">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-purple-400" />
                        Set Your Chat Preferences
                      </h3>
                      <p className="text-white/60 text-sm">
                        Customize your experience to find better matches
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <Tabs defaultValue="basic" className="mb-6">
                        <TabsList className="grid grid-cols-3 mb-4 bg-black/20">
                          <TabsTrigger value="basic">Basic</TabsTrigger>
                          <TabsTrigger value="interests">Interests</TabsTrigger>
                          <TabsTrigger value="safety">Safety</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="basic" className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm text-white/70 mb-2 block">
                                Languages
                              </Label>
                              <Select 
                                defaultValue="english" 
                                onValueChange={(value) => setPreferences({...preferences, languages: [value]})}
                              >
                                <SelectTrigger className="bg-white/5 border-white/10">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 border-white/10">
                                  <SelectItem value="english">English</SelectItem>
                                  <SelectItem value="spanish">Spanish</SelectItem>
                                  <SelectItem value="french">French</SelectItem>
                                  <SelectItem value="german">German</SelectItem>
                                  <SelectItem value="chinese">Chinese</SelectItem>
                                  <SelectItem value="japanese">Japanese</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="video" className="text-sm text-white/70">
                                  Enable Video
                                </Label>
                                <p className="text-xs text-white/40">
                                  Show your video during chat
                                </p>
                              </div>
                              <Switch 
                                id="video" 
                                checked={preferences.enableVideo}
                                onCheckedChange={(checked) => setPreferences({...preferences, enableVideo: checked})}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label htmlFor="mic" className="text-sm text-white/70">
                                  Enable Microphone
                                </Label>
                                <p className="text-xs text-white/40">
                                  Allow others to hear your voice
                                </p>
                              </div>
                              <Switch 
                                id="mic" 
                                checked={preferences.enableMic}
                                onCheckedChange={(checked) => setPreferences({...preferences, enableMic: checked})}
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="interests" className="space-y-6">
                          <div>
                            <Label className="text-sm text-white/70 mb-3 block">
                              Select Your Interests (Up to 5)
                            </Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {interestOptions.map((interest) => (
                                <div key={interest} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`interest-${interest}`} 
                                    checked={preferences.interests.includes(interest)}
                                    onCheckedChange={(checked) => {
                                      if (checked && preferences.interests.length < 5) {
                                        setPreferences({
                                          ...preferences, 
                                          interests: [...preferences.interests, interest]
                                        })
                                      } else if (!checked) {
                                        setPreferences({
                                          ...preferences, 
                                          interests: preferences.interests.filter(i => i !== interest)
                                        })
                                      }
                                    }}
                                  />
                                  <Label 
                                    htmlFor={`interest-${interest}`}
                                    className="text-sm"
                                  >
                                    {interest}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 p-3 rounded-md">
                            <p className="text-xs text-white/60">
                              Selected interests: {preferences.interests.length === 0 ? 
                                "None" : 
                                preferences.interests.join(", ")}
                            </p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="safety" className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm text-white/70 mb-3 block">
                                Safety Level
                              </Label>
                              <RadioGroup 
                                defaultValue="moderate"
                                value={preferences.safetyLevel}
                                onValueChange={(value) => setPreferences({...preferences, safetyLevel: value})}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md">
                                  <RadioGroupItem value="strict" id="strict" />
                                  <Label htmlFor="strict" className="font-medium">Strict</Label>
                                  <p className="text-xs text-white/60 ml-2">
                                    Maximum filtering of inappropriate content
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md">
                                  <RadioGroupItem value="moderate" id="moderate" />
                                  <Label htmlFor="moderate" className="font-medium">Moderate</Label>
                                  <p className="text-xs text-white/60 ml-2">
                                    Standard filtering (recommended)
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-md">
                                  <RadioGroupItem value="minimal" id="minimal" />
                                  <Label htmlFor="minimal" className="font-medium">Minimal</Label>
                                  <p className="text-xs text-white/60 ml-2">
                                    Basic safety protections only
                                  </p>
                                </div>
                              </RadioGroup>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="space-y-1">
                                <Label htmlFor="recording" className="text-sm text-white/70">
                                  Allow Recording
                                </Label>
                                <p className="text-xs text-white/40">
                                  Not recommended for privacy reasons
                                </p>
                              </div>
                              <Switch 
                                id="recording" 
                                checked={preferences.allowRecording}
                                onCheckedChange={(checked) => setPreferences({...preferences, allowRecording: checked})}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="p-6 border-t border-white/10 flex justify-end">
                      <AnimatedButton
                        onClick={handleStartChat}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        glowColor="rgba(147, 51, 234, 0.5)"
                      >
                        Start Random Chat
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </AnimatedButton>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </AnimatedBackgroundContainer>
  )
}