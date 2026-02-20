'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import { ProjectItem, projectData, skillDetails } from "./data/portfolioData";
import { QuickDotMenu, SocialIcon, ProfileItem, ProjectCard, SkillCategory, SkillItem, Footer, TopButton } from "./components/UIComponents";
import { ProjectModal, SkillModal } from "./components/Modals";
import Image from "next/image";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  // 현재 활성화된 섹션 ID를 추적 (리사이즈 시 재계산 기준점)
  const currentSectionRef = useRef<string>("home");
  
  // 도트 메뉴의 Y축 위치 제어
  const yValue = useMotionValue(0); 
  // 부드러운 추적 효과를 위한 스프링 설정
  const springY = useSpring(yValue, { stiffness: 35, damping: 15 }); 

  useEffect(() => {
    // 1. 도트 위치를 현재 섹션의 중앙으로 업데이트하는 함수
    const updateDotPosition = () => {
      const currentSection = document.getElementById(currentSectionRef.current);
      if (currentSection) {
        // 섹션의 시작점 + 브라우저 높이의 절반 = 화면 우측 중앙
        const targetY = currentSection.offsetTop + (window.innerHeight / 2);
        yValue.set(targetY);
      }
    };

    // 2. 초기 로드 시 위치 설정
    updateDotPosition();

    // 3. IntersectionObserver: 스크롤 시 섹션 감지
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          currentSectionRef.current = target.id;
          updateDotPosition();
        } 

        // 섹션을 벗어날 때 내부 스크롤 초기화 (기존 로직 유지)
        if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
          if (target.id === 'skills' || target.id === 'project-container') {
            setTimeout(() => {
              target.scrollTo({ top: 0 });
            }, 400); 
          }
        }
      });
    }, { threshold: [0.1, 0.5, 0.9] });

    sections.forEach((s) => observer.observe(s));

    // 4. [중요] 브라우저 리사이즈 시 변경된 offsetTop 값을 즉시 반영
    window.addEventListener("resize", updateDotPosition);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDotPosition);
    };
  }, [yValue]);

  // 애니메이션 변수 (기존과 동일)
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  const socialContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
  };

  const socialItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const infoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const infoItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const profileImageVariants: Variants = {
    hidden: { x: -50, opacity: 0, scale: 0.9 },
    visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main 
      ref={containerRef} 
      className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar relative bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-zinc-200 scroll-smooth"
      style={{ 
        scrollBehavior: 'smooth', 
        WebkitOverflowScrolling: 'touch' 
      }}
    >
      {/* 사이드 도트 네비게이션: absolute + springY 추적 */}
      <motion.div 
        style={{ 
          top: 0,
          y: springY, 
          translateY: "-50%" 
        }} 
        className="absolute right-6 md:right-10 flex flex-col gap-8 z-[100] pointer-events-auto"
      >
        <QuickDotMenu href="#profile" label="PROFILE" hoverColor="group-hover:bg-pink-600" />
        <QuickDotMenu href="#skills" label="SKILLS" hoverColor="group-hover:bg-blue-600" />
        <QuickDotMenu href="#project-container" label="PROJECTS" hoverColor="group-hover:bg-orange-600" />
      </motion.div>

      {/* Home Section */}
      <section id="home" className="h-screen w-full snap-start snap-always flex flex-col lg:flex-row items-center justify-center px-10 md:px-20 bg-transparent overflow-hidden">
        {/* items-center(모바일 중앙) -> lg:items-start(데스크톱 왼쪽 밀착) */}
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left drop-shadow-2xl lg:pl-32">
          
          <motion.div initial="hidden" whileInView="visible" className="text-6xl md:text-[10rem] font-black tracking-tighter text-zinc-200 leading-[0.85] uppercase">
            <motion.div custom={0} variants={wordVariants} className="text-pink-600 inline-block">CREATE</motion.div><br />
            <motion.div custom={1} variants={wordVariants} className="inline-block">MY</motion.div> 
            <motion.div custom={2} variants={wordVariants} className="text-blue-500 inline-block">OWN</motion.div><br />
            <motion.div custom={3} variants={wordVariants} className="text-orange-600 inline-block">LIFE</motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
            /* mx-auto lg:mx-0: 중앙 정렬 해제
              lg:ml-2: 타이틀 글꼴 두께에 따른 시각적 왼쪽 여백 보정 
            */
            className="mt-8 text-lg md:text-xl text-zinc-200/90 font-medium max-w-lg mx-auto lg:mx-0 lg:ml-2"
          >
            나만의 가치를 만드는 개발자 <br />장용민입니다.
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-transparent z-10 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-6">
            <motion.div className="flex flex-col gap-8 shrink-0 pr-4 z-0" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={socialContainerVariants}>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://github.com/JangYongMin" icon="github" src="/icons/github-mark.svg" /></motion.div>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://discord.gg/SPamqcaV4d" icon="discord" src="/icons/discord-symbol-white.svg" /></motion.div>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" icon="linkedin" src="/icons/InBug-White.png" /></motion.div>
            </motion.div>
            <motion.div className="relative w-64 md:w-80 lg:w-96 aspect-square bg-zinc-200 rounded-[5px] shadow-xl overflow-hidden shrink-0 z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={profileImageVariants}>
              <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/profile2.png?alt=media&token=f8903f84-cdea-4063-ae12-309ce3fdc72b" alt="Jang Yongmin" fill className="object-cover" priority />
            </motion.div>
          </div>
          <motion.div className="flex flex-col items-start gap-6 text-left shrink-0" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoContainerVariants}>
            <motion.div variants={infoItemVariants} className="relative inline-flex mb-4">
              <h2 className="text-4xl md:text-5xl font-black text-zinc-200 tracking-tight uppercase relative z-10">Profile</h2>
              <div className="absolute -bottom-[3px] left-0 w-full h-3 md:h-4 bg-pink-600 -rotate-1"></div>
            </motion.div>
            <div className="space-y-4 text-lg md:text-xl font-medium text-zinc-100">
              <motion.div variants={infoItemVariants}><ProfileItem label="이름" value="장용민" /></motion.div>
              <motion.div variants={infoItemVariants}><ProfileItem label="생년월일" value="01.08.02" /></motion.div>
              <motion.div variants={infoItemVariants}><ProfileItem label="위치" value="서울특별시 영등포구" /></motion.div>
              <motion.div variants={infoItemVariants}><ProfileItem label="연락처" value="010-3234-3971" /></motion.div>
              <motion.div variants={infoItemVariants}><ProfileItem label="이메일" value="yongmin0182@gmail.com" /></motion.div>
              <motion.div variants={infoItemVariants}><ProfileItem label="학력" value="중원대학교 컴퓨터공학 학사" /></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative h-screen w-full snap-start snap-always flex flex-col items-center justify-center bg-transparent z-10 px-10 md:px-20 py-8 md:py-0 overflow-hidden">
        <div className="max-w-6xl w-full h-full md:h-auto flex flex-col items-center justify-center">
          <motion.div className="text-center mb-6 md:mb-20 shrink-0" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoItemVariants}>
            <div className="relative inline-flex">
              <h2 className="text-4xl md:text-7xl font-black text-zinc-200 mb-2 tracking-tighter uppercase relative z-10">Skills</h2>
              <div className="absolute -bottom-[-8px] left-0 w-full h-3 md:h-5 bg-blue-600 -rotate-1"></div>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <SkillCategory title="LANGUAGES" onClick={() => setSelectedCategory("LANGUAGES")}>
              <SkillItem name="Java" src="/icons/java-logo.png" /><SkillItem name="JavaScript" src="/icons/javascript-logo.svg" /><SkillItem name="Python" src="/icons/python-logo-only.svg" />
            </SkillCategory>
            <SkillCategory title="FRAMEWORKS" onClick={() => setSelectedCategory("FRAMEWORKS")}>
              <SkillItem name="Spring Boot" src="/icons/spring-boot.png" /><SkillItem name="Next.js" src="/icons/nextjs-logo.png" /><SkillItem name="MyBatis" src="/icons/logo-bird-ninja.svg" />
            </SkillCategory>
            <SkillCategory title="DB & TOOLS" onClick={() => setSelectedCategory("DB & TOOLS")}>
              <SkillItem name="Oracle" src="/icons/oracle-logo.svg" /><SkillItem name="Docker" src="/icons/docker-mark-blue.svg" /><SkillItem name="GitHub" src="/icons/github-mark.svg" />
            </SkillCategory>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project-container" className="h-screen w-full snap-start snap-always overflow-y-auto no-scrollbar bg-transparent z-20 overflow-hidden">
        <div className="flex flex-col min-h-full">
          <div id="projects" className="min-h-screen w-full flex flex-col items-center px-10 py-32 shrink-0">
            <div className="max-w-6xl w-full flex flex-col items-center">
              <div className="text-center mb-16">
                <motion.div className="relative inline-flex" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoItemVariants}>
                  <h2 className="text-5xl md:text-7xl font-black text-zinc-200 tracking-tighter uppercase relative z-10">Projects</h2>
                  <div className="absolute -bottom-[2px] left-0 w-full h-4 md:h-5 bg-orange-600 -rotate-1"></div>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-20">
                {projectData.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} /> 
                ))}
              </div>
            </div>
          </div>
          <div className="w-full shrink-0"><Footer /></div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {selectedCategory && <SkillModal category={selectedCategory} details={skillDetails[selectedCategory]} onClose={() => setSelectedCategory(null)} />}
      </AnimatePresence>
      <TopButton />
    </main>
  );
}