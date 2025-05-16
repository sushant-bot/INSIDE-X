"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { X, User, Bell, Shield, Monitor, Palette, Volume2, Save, RefreshCw } from "lucide-react"

export function DashboardSettings({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("account")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [accentColor, setAccentColor] = useState("#9333ea")
  const [notificationSettings, setNotificationSettings] = useState({
    directMessages: true,
    mentions: true,
    newFollowers: true,
    liveNotifications: true,
    emailDigest: false,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-md rounded-lg overflow-hidden w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Settings
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
            <div className="border-b md:border-b-0 md:border-r border-gray-800 p-2 md:w-64 md:min-h-[500px]">
              <TabsList className="flex flex-row md:flex-col w-full bg-transparent space-y-0 md:space-y-1 p-0">
                <TabsTrigger
                  value="account"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Safety
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="audio"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Audio & Video
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="w-full justify-start data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 p-6">
              <TabsContent value="account" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue="Anonymous429" className="bg-gray-800 border-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="anonymous429" className="bg-gray-800 border-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="anonymous@example.com"
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        rows={3}
                        defaultValue="Digital creator and privacy enthusiast"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Account Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Change Password
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-red-500 hover:text-red-400 hover:bg-red-950"
                    >
                      Deactivate Account
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="direct-messages" className="block mb-1">
                          Direct Messages
                        </Label>
                        <p className="text-sm text-gray-400">Get notified when you receive a direct message</p>
                      </div>
                      <Switch
                        id="direct-messages"
                        checked={notificationSettings.directMessages}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, directMessages: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mentions" className="block mb-1">
                          Mentions
                        </Label>
                        <p className="text-sm text-gray-400">Get notified when you are mentioned</p>
                      </div>
                      <Switch
                        id="mentions"
                        checked={notificationSettings.mentions}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, mentions: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="new-followers" className="block mb-1">
                          New Followers
                        </Label>
                        <p className="text-sm text-gray-400">Get notified when someone follows you</p>
                      </div>
                      <Switch
                        id="new-followers"
                        checked={notificationSettings.newFollowers}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, newFollowers: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="live-notifications" className="block mb-1">
                          Live Notifications
                        </Label>
                        <p className="text-sm text-gray-400">Get notified when someone you follow goes live</p>
                      </div>
                      <Switch
                        id="live-notifications"
                        checked={notificationSettings.liveNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, liveNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-digest" className="block mb-1">
                          Email Digest
                        </Label>
                        <p className="text-sm text-gray-400">Receive a weekly email digest of your activity</p>
                      </div>
                      <Switch
                        id="email-digest"
                        checked={notificationSettings.emailDigest}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailDigest: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="private-account" className="block mb-1">
                          Private Account
                        </Label>
                        <p className="text-sm text-gray-400">Only approved followers can see your content</p>
                      </div>
                      <Switch id="private-account" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="activity-status" className="block mb-1">
                          Activity Status
                        </Label>
                        <p className="text-sm text-gray-400">Show when you're active on the platform</p>
                      </div>
                      <Switch id="activity-status" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="read-receipts" className="block mb-1">
                          Read Receipts
                        </Label>
                        <p className="text-sm text-gray-400">Let others know when you've read their messages</p>
                      </div>
                      <Switch id="read-receipts" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Safety</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="content-filter" className="block mb-1">
                          Content Filter
                        </Label>
                        <p className="text-sm text-gray-400">Filter potentially sensitive content</p>
                      </div>
                      <select id="content-filter" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="strict">Strict</option>
                        <option value="moderate" selected>
                          Moderate
                        </option>
                        <option value="off">Off</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="block mb-1">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="blocked-users" className="block mb-1">
                          Blocked Users
                        </Label>
                        <p className="text-sm text-gray-400">Manage your list of blocked users</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode" className="block mb-1">
                          Dark Mode
                        </Label>
                        <p className="text-sm text-gray-400">Use dark theme for the interface</p>
                      </div>
                      <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color" className="block">
                        Accent Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="accent-color"
                          value={accentColor}
                          onChange={(e) => setAccentColor(e.target.value)}
                          className="w-10 h-10 rounded-md overflow-hidden bg-transparent border-0"
                        />
                        <div className="flex-1 grid grid-cols-6 gap-2">
                          {["#9333ea", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setAccentColor(color)}
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: color }}
                              aria-label={`Set accent color to ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-size" className="block">
                        Font Size
                      </Label>
                      <Slider id="font-size" defaultValue={[16]} min={12} max={20} step={1} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduced-motion" className="block mb-1">
                          Reduced Motion
                        </Label>
                        <p className="text-sm text-gray-400">Minimize animations throughout the interface</p>
                      </div>
                      <Switch id="reduced-motion" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Layout</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compact-view" className="block mb-1">
                          Compact View
                        </Label>
                        <p className="text-sm text-gray-400">Show more content with less spacing</p>
                      </div>
                      <Switch id="compact-view" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sidebar-position" className="block mb-1">
                          Sidebar Position
                        </Label>
                        <p className="text-sm text-gray-400">Choose where the sidebar appears</p>
                      </div>
                      <select id="sidebar-position" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="left" selected>
                          Left
                        </option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Audio Settings</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="input-volume">Input Volume</Label>
                        <span className="text-sm text-gray-400">80%</span>
                      </div>
                      <Slider id="input-volume" defaultValue={[80]} max={100} step={1} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="output-volume">Output Volume</Label>
                        <span className="text-sm text-gray-400">70%</span>
                      </div>
                      <Slider id="output-volume" defaultValue={[70]} max={100} step={1} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="input-device" className="block mb-1">
                          Input Device
                        </Label>
                      </div>
                      <select id="input-device" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="default" selected>
                          Default Microphone
                        </option>
                        <option value="headset">Headset Microphone</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="output-device" className="block mb-1">
                          Output Device
                        </Label>
                      </div>
                      <select id="output-device" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="default" selected>
                          Default Speakers
                        </option>
                        <option value="headset">Headset</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Video Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="camera" className="block mb-1">
                          Camera
                        </Label>
                      </div>
                      <select id="camera" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="default" selected>
                          Default Camera
                        </option>
                        <option value="external">External Webcam</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="video-quality" className="block mb-1">
                          Video Quality
                        </Label>
                      </div>
                      <select id="video-quality" className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1">
                        <option value="720p" selected>
                          720p
                        </option>
                        <option value="1080p">1080p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="background-blur" className="block mb-1">
                          Background Blur
                        </Label>
                      </div>
                      <Switch id="background-blur" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-saver" className="block mb-1">
                          Data Saver
                        </Label>
                        <p className="text-sm text-gray-400">Reduce data usage when using the app</p>
                      </div>
                      <Switch id="data-saver" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="hardware-acceleration" className="block mb-1">
                          Hardware Acceleration
                        </Label>
                        <p className="text-sm text-gray-400">Use your GPU to improve performance</p>
                      </div>
                      <Switch id="hardware-acceleration" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="debug-mode" className="block mb-1">
                          Debug Mode
                        </Label>
                        <p className="text-sm text-gray-400">Enable detailed logging for troubleshooting</p>
                      </div>
                      <Switch id="debug-mode" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Clear Cache
                    </Button>

                    <Button variant="outline" className="w-full sm:w-auto">
                      Export Data
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-red-500 hover:text-red-400 hover:bg-red-950"
                    >
                      Delete All Data
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
