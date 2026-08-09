"use client";

import HeroSection from "@/components/HeroSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillFlowGraph from "@/components/SkillFlowGraph";
import SkillsSection from "@/components/SkillsSection";
import AIChatWidget from "@/components/AIChatWidget";
import { featuredProjects, certifications } from "@/data/resume-data";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-neural min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div id="about">
          <HeroSection />
        </div>
        
        <div className="space-y-32">
          <div id="skills">
            <SkillsSection />
          </div>

          <div id="experience">
            <ExperienceTimeline />
          </div>
          
          <div id="graph">
            <SkillFlowGraph />
          </div>
          
          {/* Featured Projects */}
          <section id="projects" className="py-20">
            <h2 className="text-3xl font-bold mb-16 text-center">
              <span className="gradient-text gradient-primary">Featured Work</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featuredProjects.map((proj, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card p-8 rounded-3xl group cursor-pointer"
                >
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-neural-cyan transition-colors">{proj.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.domainColor }}></span>
                    <span className="text-sm uppercase tracking-wider" style={{ color: proj.domainColor }}>{proj.domain}</span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tech.map((t, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 bg-neural-surface rounded-full border border-neural-border/50 text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section id="certs" className="py-20">
            <h2 className="text-3xl font-bold mb-16 text-center">
              <span className="gradient-text gradient-secondary">Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-3xl flex flex-col items-start border-t-4 border-t-neural-cyan/50"
                >
                  <h4 className="font-bold text-lg mb-2 text-white">{cert.title}</h4>
                  <p className="text-sm font-medium text-neural-cyan mb-4">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mt-auto">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
          {/* Contact Section */}
          <section id="contact" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-8">
              <span className="gradient-text gradient-primary">Get In Touch</span>
            </h2>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/sravani551" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-card rounded-full font-bold hover:text-neural-cyan transition-colors">
                Connect on GitHub
              </a>
              <a href="https://www.linkedin.com/in/sravani-n-417s987" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-card rounded-full font-bold hover:text-neural-cyan transition-colors">
                Connect on LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>
      
      <AIChatWidget />
    </div>
  );
}
