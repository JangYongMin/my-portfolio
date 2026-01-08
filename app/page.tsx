'use client';
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import { ProjectItem, projectData, skillDetails } from "./data/portfolioData";
import { QuickDotMenu, SocialIcon, ProfileItem, ProjectCard, SkillCategory, SkillItem, Footer, TopButton } from "./components/UIComponents";
import { ProjectModal, SkillModal } from "./components/Modals";
import Image from "next/image";

export default function Home() {
  // 스킬 상세 모달 제어를 위한 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 프로젝트 상세 모달 제어를 위한 프로젝트 데이터 상태
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  // 스냅 스크롤 제어를 위한 메인 컨테이너 참조
  const containerRef = useRef<HTMLElement>(null);
  // 우측 도트 네비게이션의 위치 계산을 위한 모션 값
  const yValue = useMotionValue(0); 
  // 네비게이션 이동 시 부드러운 애니메이션 효과 적용
  const springY = useSpring(yValue, { stiffness: 40, damping: 15 }); 

  useEffect(() => {
    // 각 섹션 요소들을 모두 선택
    const sections = document.querySelectorAll("section");
    // 현재 화면에 보이는 섹션을 감지하여 인덱스 업데이트
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 섹션이 화면 중앙에 위치하면 해당 섹션의 상단 좌표값을 yValue에 저장
        if (entry.isIntersecting) yValue.set((entry.target as HTMLElement).offsetTop);
      });
    }, { threshold: 0.5 });
    // 모든 섹션에 관찰자 등록
    sections.forEach((s) => observer.observe(s));
    // 컴포넌트 언마운트 시 관찰자 해제
    return () => observer.disconnect();
  }, [yValue]);



  
  // 메인 타이틀의 텍스트가 순차적으로 나타나는 애니메이션 설정
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  // 소셜 링크 아이콘 그룹의 애니메이션 시작 설정
  const socialContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.8 }
    }
  };

  // 개별 소셜 아이콘이 옆에서 나타나는 애니메이션 효과
  const socialItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // 프로필 상세 정보 리스트의 순차적 등장 설정
  const infoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  // 프로필 각 항목이 아래에서 위로 올라오는 효과
  const infoItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // 스킬 카테고리 카드들이 차례대로 등장하는 설정
  const skillContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  // 개별 스킬 카드가 살짝 올라오며 나타나는 효과
  const skillCardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // 프로필 이미지가 왼쪽에서 부드럽게 커지며 나타나는 효과
  const profileImageVariants: Variants = {
    hidden: { x: -50, opacity: 0, scale: 0.9 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // 프로젝트 리스트 컨테이너의 등장 애니메이션 설정
  const projectContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };

  return (
    // 전체 페이지 스냅 스크롤 및 배경 그라데이션 설정
    <main ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative will-change-scroll bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-white">
      {/* Home Section */}
      <section id="home" className="h-screen w-full snap-start snap-always flex flex-col md:flex-row items-center justify-center px-10 md:px-20 bg-transparent overflow-hidden">
        <div className="flex-1 text-center md:text-left drop-shadow-2xl md:pl-32">
          {/* 메인 텍스트 애니메이션 영역 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85] uppercase">
            <motion.div custom={0} variants={wordVariants} className="text-pink-600 inline-block">
              CREATE
            </motion.div><br />
            <motion.div custom={1} variants={wordVariants} className="inline-block">
              MY
            </motion.div> 
            <motion.div custom={2} variants={wordVariants} className="text-blue-500 inline-block">
              OWN
            </motion.div><br />
            <motion.div custom={3} variants={wordVariants} className="text-orange-600 inline-block">
              LIFE
            </motion.div>
          </motion.div>
          {/* 서브 설명 문구 애니메이션 */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} viewport={{ once: false }} className="mt-8 text-lg md:text-xl text-white/90 font-medium max-w-lg">
            나만의 가치를 만드는 개발자, 장용민입니다.
          </motion.p>
        </div>
        {/* 우측 도트 퀵 네비게이션 메뉴 */}
        <motion.div style={{ top: "50%", marginTop: springY }} className="absolute right-10 flex flex-col gap-8 z-50 pointer-events-auto">
          <QuickDotMenu href="#profile" label="PROFILE" hoverColor="group-hover:bg-pink-600" />
          <QuickDotMenu href="#skills" label="SKILLS" hoverColor="group-hover:bg-blue-600" />
          <QuickDotMenu href="#project-container" label="PROJECTS" hoverColor="group-hover:bg-orange-600" />
        </motion.div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-transparent z-10 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-6">
            {/* 좌측 세로형 소셜 링크 버튼 리스트 */}
            <motion.div className="flex flex-col gap-8 shrink-0 pr-4 z-0" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={socialContainerVariants}>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://github.com/JangYongMin" icon="github" src="/icons/github-mark.svg" /></motion.div>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://discord.gg/SPamqcaV4d" icon="discord" src="/icons/discord-symbol-white.svg" /></motion.div>
              <motion.div variants={socialItemVariants}><SocialIcon href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" icon="linkedin" src="/icons/InBug-White.png" /></motion.div>
            </motion.div>
            {/* 프로필 이미지 박스 */}
            <motion.div className="relative w-64 md:w-80 lg:w-96 aspect-square bg-zinc-200 rounded-[5px] shadow-xl overflow-hidden shrink-0 z-10" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={profileImageVariants}>
              <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/profile.jpg?alt=media&token=401a5e0d-4ad0-443e-b822-cca6b9bf85b8" alt="Jang Yongmin" fill className="object-cover" priority />
            </motion.div>
          </div>
          {/* 프로필 인적 사항 텍스트 정보 */}
          <motion.div className="flex flex-col gap-6 text-left shrink-0" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoContainerVariants}>
            <motion.div variants={infoItemVariants} className="relative inline-flex mb-4">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase relative z-10">Profile</h2>
              <div className="absolute -bottom-[3px] left-0 w-55 h-3 md:h-4 bg-pink-600 -rotate-1"></div>
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
      <section id="skills" className="relative min-h-screen md:h-screen w-full snap-start snap-always flex flex-col items-center justify-start md:justify-center bg-transparent z-10 px-10 md:px-20 py-20 md:py-0 overflow-visible">
        <div className="max-w-6xl w-full flex flex-col items-center">
          {/* 섹션 타이틀 애니메이션 */}
          <motion.div className="text-center mb-10 md:mb-16" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoItemVariants}>
            <div className="relative inline-flex">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase relative z-10">Skills</h2>
              <div className="absolute -bottom-[-15px] left-0 w-full h-4 md:h-5 bg-blue-600 -rotate-1"></div>
            </div>
          </motion.div>
          {/* 기술 스택 카테고리 그리드 레이아웃 */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 lg:gap-18 w-full" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={skillContainerVariants}>
            <motion.div variants={skillCardVariants}>
              <SkillCategory title="LANGUAGES" onClick={() => setSelectedCategory("LANGUAGES")}>
                <SkillItem name="Java" src="/icons/java-logo.png" />
                <SkillItem name="JavaScript" src="/icons/javascript-logo.svg" />
                <SkillItem name="Python" src="/icons/python-logo-only.svg" />
              </SkillCategory>
            </motion.div>

            <motion.div variants={skillCardVariants}>
              <SkillCategory title="FRAMEWORKS" onClick={() => setSelectedCategory("FRAMEWORKS")}>
                <SkillItem name="Spring Boot" src="/icons/spring-boot.png" />
                <SkillItem name="Next.js" src="/icons/nextjs-logo.png" />
                <SkillItem name="MyBatis" src="/icons/logo-bird-ninja.svg" />
              </SkillCategory>
            </motion.div>

            <motion.div variants={skillCardVariants}>
              <SkillCategory title="DB & TOOLS" onClick={() => setSelectedCategory("DB & TOOLS")}>
                <SkillItem name="Oracle" src="/icons/oracle-logo.svg" />
                <SkillItem name="Docker" src="/icons/docker-mark-blue.svg" />
                <SkillItem name="GitHub" src="/icons/github-mark.svg" />
              </SkillCategory>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="project-container" className="h-screen w-full snap-start snap-always overflow-y-auto no-scrollbar bg-transparent z-20 overflow-hidden">
        <div className="flex flex-col min-h-full">
          <div id="projects" className="min-h-screen w-full flex flex-col items-center px-10 py-32 shrink-0">
            <div className="max-w-6xl w-full flex flex-col items-center">
              {/* 프로젝트 섹션 타이틀 애니메이션 */}
              <div className="text-center mb-16">
                <motion.div className="relative inline-flex" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={infoItemVariants}>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative z-10">Projects</h2>
                  <div className="absolute -bottom-[2px] left-0 w-full h-4 md:h-5 bg-orange-600 -rotate-1"></div>
                </motion.div>
              </div>
              {/* 프로젝트 카드 그리드 및 데이터 맵핑 */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-20" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={projectContainerVariants}>
                {projectData.map((project) => (
                  <motion.div key={project.id} variants={skillCardVariants}>
                    <ProjectCard project={project} onClick={() => setSelectedProject(project)} /> 
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          {/* 하단 푸터 영역 */}
          <div className="w-full shrink-0">
            <Footer />
          </div>
        </div>
      </section>

      {/* 프로젝트 또는 스킬 상세 모달 애니메이션 출력 */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {selectedCategory && <SkillModal category={selectedCategory} details={skillDetails[selectedCategory]} onClose={() => setSelectedCategory(null)} />}
      </AnimatePresence>
      {/* 화면 우측 하단 최상단 이동 버튼 */}
      <TopButton />
    </main>
  );
}