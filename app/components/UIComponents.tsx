'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectItem } from "../data/portfolioData";

export function QuickDotMenu({ href, label, hoverColor }: { href: string; label: string; hoverColor: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. 기본 이동은 앵커 태그가 처리하도록 두거나, 부드러운 이동을 위해 scrollIntoView 사용 가능
    // 2. 스크롤 초기화 로직에 딜레이 부여
    const projectContainer = document.getElementById('project-container');
    
    if (projectContainer) {
      // 페이지가 스냅되어 올라가는 시간을 고려하여 500ms(0.5초) 정도 딜레이를 줍니다.
      // 이 시간은 CSS scroll-behavior 속도에 맞춰 조절 가능합니다.
      setTimeout(() => {
        projectContainer.scrollTo({ 
          top: 0, 
          behavior: 'instant' // 이미 이동한 후이므로 instant로 처리하여 깜빡임을 방지
        });
      }, 500); 
    }
  };

  return (
    <a href={href} onClick={handleClick} className="group relative flex items-center justify-end">
      <span className="absolute right-8 text-zinc-200 font-black tracking-widest text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
        {label}
      </span>
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
      <span className="text-zinc-200 font-semibold">{value}</span>
    </div>
  );
}

export function ProjectCard({ project, onClick }: { project: ProjectItem; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-orange-950/10 backdrop-blur-sm p-10 rounded-[5px] border-[2px] border-orange-900/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-orange-900/20 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(234,88,12,0.15)] flex flex-col justify-between h-full cursor-pointer">
      <div>
        <span className="text-zinc-400 font-bold text-sm group-hover:text-orange-400/80 transition-colors">{project.period}</span>
        <h3 className="text-3xl font-black text-zinc-200 mt-2 mb-4 group-hover:text-orange-500 transition-colors uppercase">{project.title}</h3>
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
    <div 
      onClick={onClick} 
      // group/card 접두사를 추가하여 하위 요소들이 이 카드의 호버를 감지하게 함
      className="group/card bg-blue-950/10 backdrop-blur-sm p-5 md:px-6 lg:p-8 rounded-[5px] border-[2px] border-blue-900/20 
                 transition-all duration-300 ease-out 
                 hover:-translate-y-3 hover:bg-blue-900/20 hover:border-blue-500/50 
                 w-full h-full md:h-auto md:min-h-[320px] cursor-pointer flex flex-col"
    >
      <h3 className="text-lg lg:text-2xl font-black text-zinc-200 mb-4 tracking-tighter border-b-2 border-zinc-700 pb-2 uppercase text-center shrink-0 transition-colors group-hover/card:text-blue-400">
        {title}
      </h3>
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-y-4 md:gap-y-8 gap-x-2 items-center justify-items-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SkillItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300">
        <Image 
          src={src} 
          alt={name} 
          fill 
          // [핵심] group-hover/card:grayscale-0 로 변경
          // 이제 개별 아이콘이 아닌 '카드'에 마우스가 올라가면 모든 아이콘의 그레이스케일이 풀립니다.
          className="object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-500" 
        />
      </div>
      <span className="text-[10px] md:text-xs font-bold text-zinc-500 transition-colors uppercase tracking-tighter whitespace-nowrap group-hover/card:text-zinc-200">
        {name}
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full py-15 bg-zinc-900/80 backdrop-blur-md text-zinc-200 flex flex-col items-center justify-center gap-6">
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
      <span className="absolute right-8 text-zinc-200 font-black tracking-widest text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">TOP</span>
      <div className="w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:scale-150 shadow-lg" />
    </a>
  );
}