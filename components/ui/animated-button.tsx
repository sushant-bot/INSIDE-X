"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow"
  size?: "default" | "sm" | "lg" | "icon"
  glowColor?: string
  glowIntensity?: "low" | "medium" | "high"
  glowRadius?: number
  hoverScale?: number
  pressScale?: number
}

export function AnimatedButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  glowColor = "rgba(147, 51, 234, 0.5)", // Purple by default
  glowIntensity = "medium",
  glowRadius = 150,
  hoverScale = 1.03,
  pressScale = 0.97,
  ...props
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const intensityMap = {
    low: 0.15,
    medium: 0.25,
    high: 0.4,
  }

  const intensity = intensityMap[glowIntensity]

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Calculate the background gradient based on mouse position
  const getBackgroundStyle = () => {
    if (!isHovered) {
      return {}
    }

    const { x, y } = mousePosition
    const { width, height } = buttonRef.current?.getBoundingClientRect() || { width: 0, height: 0 }

    return {
      background: `radial-gradient(circle ${glowRadius}px at ${x}px ${y}px, ${glowColor}, transparent)`,
      opacity: intensity,
    }
  }

  const getVariant = () => {
    if (variant === "glow") {
      return "default"
    }
    return variant
  }

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: pressScale }}
    >
      <Button
        ref={buttonRef}
        variant={getVariant()}
        size={size}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variant === "glow" &&
            "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {/* Glow effect layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={getBackgroundStyle()}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Button>
    </motion.div>
  )
}
