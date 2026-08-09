"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/resume-data";

export default function ExperienceTimeline() {
  return (
    <section className="py-20 relative">
      <h2 className="text-3xl font-bold mb-16 text-center">
        <span className="gradient-text gradient-secondary">Career Evolution</span>
      </h2>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neural-border transform md:-translate-x-1/2 z-0" />

        <div className="space-y-12">
          {experience.map((job, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-neural-bg border-2 transform -translate-x-1/2 mt-6 z-10"
                     style={{ borderColor: job.domainColor, boxShadow: `0 0 10px ${job.domainColor}80` }} />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="glass-card p-8 rounded-3xl group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex flex-col mb-4">
                      <span className="text-sm font-semibold tracking-wider uppercase mb-1" style={{ color: job.domainColor }}>
                        {job.period} • {job.companyType}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                      <p className="text-gray-400 text-lg mt-1">{job.company}</p>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400">
                          <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: job.domainColor }} />
                          <span className="flex-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t, i) => (
                        <span key={i} className="text-xs font-medium px-3 py-1 bg-neural-bg/50 border border-neural-border rounded-full text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
