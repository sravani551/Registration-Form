"use client";

import { motion } from "framer-motion";
import { Linkedin, MapPin, Sparkles, Download, ArrowRight } from "lucide-react";
import { personalInfo, stats } from "@/data/resume-data";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-start text-left px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 z-10 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          <span className="text-white drop-shadow-md">Hi, I'm </span>
          <span className="text-neural-cyan glow-cyan gradient-text gradient-primary">{personalInfo.name}</span>
          <span className="text-neural-cyan animate-pulse">|</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mt-6">
          {personalInfo.summary}
        </p>

        <div className="flex items-center gap-2 text-gray-400 mt-4">
          <MapPin size={18} className="text-neural-pink" />
          <span>{personalInfo.location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-8">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/sravani551?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neural-cyan to-neural-purple text-white transition-all text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.5)]"
          >
            View Projects <ArrowRight size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 glass-card rounded-full transition-all text-sm font-medium hover:text-white border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <Download size={18} />
            Download Resume
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass-card rounded-full transition-all text-sm font-medium hover:text-white border border-white/10 bg-black/40 backdrop-blur-md"
          >
            <Linkedin size={18} />
            LinkedIn
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full max-w-5xl z-10"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center space-y-3"
          >
            <span className="text-4xl font-black text-neural-cyan glow-cyan">{stat.value}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neural-cyan opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neural-purple opacity-10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
