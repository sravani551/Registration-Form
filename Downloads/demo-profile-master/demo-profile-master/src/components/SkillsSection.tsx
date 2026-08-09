"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/resume-data";

export default function SkillsSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold">
          <span className="gradient-text gradient-primary">Technical Expertise</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A multi-dimensional view of my technical capabilities across different architectural layers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card p-8 rounded-3xl relative overflow-hidden group"
          >
            {/* Background glow based on category color */}
            <div 
              className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10 blur-[80px] transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: category.color }}
            />
            
            <div className="flex items-center gap-4 mb-6 z-10 relative">
              <div 
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-neural-bg border border-neural-border text-2xl shadow-lg"
                style={{ boxShadow: `0 4px 20px ${category.color}40` }}
              >
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold" style={{ color: category.color }}>
                {category.name}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 z-10 relative">
              {category.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-neural-border/50 bg-neural-surface/50 text-gray-200 backdrop-blur-md cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
