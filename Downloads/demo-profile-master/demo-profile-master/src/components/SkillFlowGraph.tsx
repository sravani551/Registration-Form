"use client";

import { motion } from "framer-motion";
import { graphNodes } from "@/data/resume-data";

export default function SkillFlowGraph() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold">
          <span className="gradient-text gradient-primary">Experience Graph</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A visual representation of my professional journey across domains and companies.
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-12 max-w-6xl mx-auto mt-10">
        {graphNodes.map((node, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="flex flex-col items-center justify-center relative group"
          >
            {/* Connection line placeholder for medium+ screens */}
            {idx > 0 && (
              <div className="hidden md:block absolute -left-[3rem] top-1/2 w-[3rem] h-1 bg-neural-border -z-10" />
            )}
            
            <div 
              className="w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 shadow-lg bg-neural-bg z-10 transition-transform group-hover:scale-110"
              style={{ borderColor: node.color, boxShadow: `0 0 20px ${node.color}40` }}
            >
              <span className="font-bold text-lg text-white text-center px-2">{node.id}</span>
            </div>
            
            <div className="mt-4 text-center">
              <span 
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neural-surface border border-neural-border"
                style={{ color: node.color }}
              >
                {node.domain}
              </span>
              <p className="text-sm text-gray-400 mt-3 font-medium">{node.years}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
