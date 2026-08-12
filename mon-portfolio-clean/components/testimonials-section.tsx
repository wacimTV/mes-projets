"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    content:
      "Alex delivered exceptional work that exceeded our expectations. Their attention to detail and technical expertise transformed our vision into reality.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    avatar: "/professional-woman-headshot.png",
  },
  {
    content:
      "Working with Alex was a game-changer for our product. They brought creative solutions and deep technical knowledge that elevated our entire platform.",
    author: "Michael Chen",
    role: "Product Lead, InnovateCo",
    avatar: "/professional-man-headshot.png",
  },
  {
    content:
      "The best developer I've worked with. Alex combines design sensibility with engineering excellence to create truly remarkable digital experiences.",
    author: "Emily Rodriguez",
    role: "Design Director, CreativeHub",
    avatar: "/professional-woman-designer-headshot.png",
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">What Clients Say</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
            <Quote className="mb-6 h-10 w-10 text-accent/30" />

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="mb-8 font-serif text-xl leading-relaxed md:text-2xl">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{testimonials[currentIndex].author}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === currentIndex ? "bg-accent" : "bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
