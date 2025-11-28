"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Container } from "./container";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
};

// Enhanced content with more persuasive elements
const heroContent = {
  title: "Welcome to",
  highlightedTitle: "Hildesheim",
  description:
    "Your comprehensive guide for international and national students at University of Hildesheim. Navigate your new journey with confidence.",
  benefits: [
    "Find essential campus resources",
    "Connect with student communities",
    "Access academic support services",
    "Discover events and activities",
  ],
  cta: {
    dashboard: {
      text: "Explore Now",
      href: "/dashboard",
      action: "navigation",
      emphasis: true,
    },
    download: {
      text: "Download Handbook",
      href: "/handbook_v3.pdf",
      action: "download",
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100svh-80px)] flex items-center justify-center py-16 md:py-20"
    >
      <Container className="flex flex-col items-center text-center max-w-3xl">
        {/* Text Content with improved hierarchy */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {heroContent.title}{" "}
            <span className="text-transparent bg-gradient-to-r from-primary to-stone-600 bg-clip-text">
              {heroContent.highlightedTitle}
            </span>
          </h1>

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {heroContent.description}
          </motion.p>
        </motion.div>

        {/* Benefits list */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 text-left max-w-2xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          {heroContent.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{benefit}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Enhanced CTA section with dashboard focus */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6"
        >
          <Button
            asChild
            className="px-8 bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Link href={heroContent.cta.dashboard.href}>
              {heroContent.cta.dashboard.text} &rarr;
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <a href={heroContent.cta.download.href} download>
              {heroContent.cta.download.text}
            </a>
          </Button>
        </motion.div>

        {/* Additional social proof element */}
        <motion.p
          className="text-sm text-muted-foreground mt-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Join over 2,000 students already using the Hildesheim platform
        </motion.p>
      </Container>
    </section>
  );
}
