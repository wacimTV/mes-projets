"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "À Propos", href: "#about" },
  { name: "Projets", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(var(--background), 0.8)"])

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
        style={{
          backgroundColor: "var(--background)",
          opacity: useTransform(scrollY, [0, 100], [0, 0.95]),
        }}
      >
        <div className="absolute inset-0 backdrop-blur-xl" />
      </motion.header>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.a
            href="#"
            className="relative z-10 font-serif text-2xl font-medium tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            WA
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden items-center gap-8 md:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                {item.name}
              </motion.a>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4"
            >
              {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          className="fixed inset-0 z-40 bg-background md:hidden"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="font-serif text-3xl font-medium"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ delay: isOpen ? 0.1 * i : 0 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </header>
    </>
  )
}
