'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectItem } from "../data/portfolioData";

export function QuickDotMenu({ href, label, hoverColor }: { href: string; label: string; hoverColor: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) { projectContainer.scrollTo({ top: 0 }); }
  };
  return (
    <a href={href} onClick={handleClick} className="group relative flex items-center justify-end">
      <span className="absolute right-8 text-white font-black tracking-widest text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">{label}</span>
      <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:scale-150 ${hoverColor} shadow-lg`} />
    </a>
  );
}

export function SocialIcon({ href, icon, src }: { href: string; icon: string; src: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group relative w-4 h-4 flex items-center justify-center">
      <div className="absolute w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:opacity-0 group-hover:scale-0" />
      <motion.div className="absolute w-8 h-8 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125" whileHover={{ rotate: 5 }}>
        <Image src={src} alt={icon} fill className="object-contain" />
      </motion.div>
    </a>
  );
}

export function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-24 md:w-32 text-zinc-400 font-bold tracking-tighter shrink-0">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

export function ProjectCard({ project, onClick }: { project: ProjectItem; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-orange-950/10 backdrop-blur-sm p-10 rounded-[5px] border-[2px] border-orange-900/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-orange-900/20 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(234,88,12,0.15)] flex flex-col justify-between h-full cursor-pointer">
      <div>
        <span className="text-zinc-400 font-bold text-sm group-hover:text-orange-400/80 transition-colors">{project.period}</span>
        <h3 className="text-3xl font-black text-white mt-2 mb-4 group-hover:text-orange-500 transition-colors uppercase">{project.title}</h3>
        <p className="text-zinc-100 font-medium mb-6 leading-relaxed">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-full group-hover:bg-orange-900/30 group-hover:text-orange-200 transition-colors">{skill}</span>
        ))}
      </div>
    </div>
  );
}

export function SkillCategory({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <div onClick={onClick} className="group bg-blue-950/10 backdrop-blur-sm p-6 lg:p-8 rounded-[5px] border-[2px] border-blue-900/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] w-full h-full cursor-pointer">
      <h3 className="text-xl lg:text-2xl font-black text-white group-hover:text-blue-400 mb-6 tracking-tighter border-b-2 border-zinc-700 pb-2 uppercase text-center transition-colors">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export function SkillItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-1">
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden"><Image src={src} alt={name} fill className="object-contain" /></div>
      <span className="text-[10px] lg:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors duration-500 uppercase">{name}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-15 bg-zinc-900/80 backdrop-blur-md text-white flex flex-col items-center justify-center gap-6">
      <div className="flex gap-8">
        <a href="https://github.com/JangYongMin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors font-bold tracking-widest uppercase">GitHub</a>
        <a href="mailto:yongmin0182@gmail.com" className="hover:text-blue-500 transition-colors font-bold tracking-widest uppercase">Email</a>
        <a href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors font-bold tracking-widest uppercase">LinkedIn</a>
      </div>
      <p className="text-sm text-zinc-500 font-medium tracking-widest uppercase">© 2025 Jang Yongmin. All rights reserved.</p>
    </footer>
  );
}

export function TopButton() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <a href="#home" onClick={scrollToTop} className="fixed bottom-10 right-10 z-50 group flex items-center justify-end">
      <span className="absolute right-8 text-white font-black tracking-widest text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">TOP</span>
      <div className="w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:scale-150 shadow-lg" />
    </a>
  );
}