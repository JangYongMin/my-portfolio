'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, Variants, AnimatePresence } from "framer-motion";

// 프로젝트 데이터의 규격을 정의하는 인터페이스
interface ProjectItem {
  id: string;
  title: string;
  period: string;
  description: string;
  skills: string[];
  pdfUrl: string;
  githubUrl: string;
  details: string[];
}

export default function Home() {
  // 포트폴리오 배경 이미지 주소
  const bgImageUrl = "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/bg_portfolio.jpg?alt=media&token=bc3edafa-d2c0-4328-9479-2acdb5e503b7";
  // 선택된 스킬 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 선택된 프로젝트 상세 정보 상태 관리
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // 메인 컨테이너 참조 변수
  const containerRef = useRef<HTMLElement>(null);
  // 스크롤 위치값 연동을 위한 모션 밸류
  const yValue = useMotionValue(0); 
  // 우측 네비게이터의 부드러운 움직임을 위한 스프링 애니메이션
  const springY = useSpring(yValue, { stiffness: 40, damping: 15 }); 

  // 섹션 진입 시 스크롤 위치를 감지하여 상태 업데이트
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetY = (entry.target as HTMLElement).offsetTop;
          yValue.set(targetY);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [yValue]);

  // 스킬 섹션 모달에 표시될 상세 경력 데이터
  const skillDetails: { [key: string]: { subtitle: string; contents: string[] }[] } = {
    "LANGUAGES": [
      { 
        subtitle: "Java", contents: [
          "Bcrypt 해시 함수를 이용한 암호화 데이터 저장 및 로그인 검증 로직 구현", 
          "TextWebSocketHandler를 상속받은 웹소켓 핸들러로 실시간 1:1 채팅 서버 구축", 
          "Builder 패턴을 활용한 도메인 객체(Employee, MessageVO 등) 설계 및 관리"
        ] 
      },
      { 
        subtitle: "JavaScript", contents: [
          "Node.js 환경에서 주식 관련 뉴스 데이터를 실시간으로 수집하고 처리하는 시스템 구축", 
          "jQuery Ajax를 활용하여 페이지 새로고침 없는 동적 검색 및 페이징 구현", 
          "웹소켓 클라이언트를 통해 수신된 JSON 데이터를 브라우저에 실시간 말풍선 렌더링", 
          "문서 작성 시 다중 항목 동적 추가/삭제 및 데이터 유효성 검사 로직 개발"
        ] 
      },
      { 
        subtitle: "Python", contents: [
          "Discord API와 Google Gemini AI를 연동하여 실시간 대화형 봇 서비스 구현", 
          "AI 모델의 프롬프트 엔지니어링을 통해 봇의 응답 정확도 및 사용자 경험 최적화"
        ] 
      },
    ],
    "FRAMEWORKS": [
      { 
        subtitle: "Spring Boot", contents: [
          "@PostMapping, @ResponseBody 등을 활용한 RESTful 데이터 통신 컨트롤러 설계", 
          "Service-Dao 계층 분리 및 @Transactional을 통한 데이터 무결성 보장"
        ] 
      },
      { 
        subtitle: "Next.js", contents: [
          "Next.js 15 App Router를 활용하여 서버 중심의 효율적인 페이지 구조 설계 및 최적화", 
          "Docker 컨테이너 환경에서 Polling 방식을 적용하여 개발 효율을 극대화한 Hot Reload 시스템 구축", 
          "Tailwind CSS를 활용하여 일관된 디자인 시스템 구축 및 사용자 경험을 고려한 반응형 UI 구현", 
          "사용자 인터랙션을 위한 Client Component와 성능 최적화를 위한 Server Component의 적절한 분리 및 활용"
        ] 
      },
      { 
        subtitle: "MyBatis", contents: [
          "RowBounds를 이용한 효율적인 서버 사이드 페이징 및 검색 동적 쿼리 최적화", 
          "foreach 태그를 사용하여 대량의 발주 항목을 하나의 쿼리로 일괄 INSERT 처리", 
          "상황별 동적 SQL(<choose>, <when>)을 활용한 다중 조건 검색 매퍼 작성"
        ] 
      }
    ],
    "DB & TOOLS": [
      { 
        subtitle: "Oracle", contents: [
          "ERP 및 도서관 시스템 구축을 위한 ERD 설계 및 테이블 간 관계 설정(FK/PK)",
          "Sequence와 JOIN을 활용한 도서 대출 현황 및 인기 도서 Top 5 조회 쿼리 개발", 
          "메신저 기록 및 근태 데이터를 위한 대용량 텍스트(VARCHAR2 4000) 테이블 설계"
        ] 
      },
      { 
        subtitle: "Docker & GitHub", contents: [
          "Docker 컨테이너 환경을 활용한 개발 환경 표준화 및 배포 관리",
          "Git Flow 전략 기반의 팀 프로젝트 수행 및 소스 코드 버전 관리"
        ] 
      }
    ]
  };

  // 프로젝트 섹션 카드에 표시될 데이터 모음
  const projectData: ProjectItem[] = [
    { 
      id: "library", 
      title: "KH Library", 
      period: "2024.10.31 ~ 2024.11.15", 
      description: "도서 검색, 대출, 예약 및 관리자 기능을 통합한 도서관 웹 서비스(팀장, 5인)", 
      skills: ["Java 11", "JSP/Servlet", "Oracle 11g", "jQuery", "Ajax"], 
      pdfUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/Project(KHLibrary).pdf?alt=media&token=cf4daa93-3352-49f0-849d-eb1d4854eea2", 
      githubUrl: "https://github.com/JangYongMin/KH_Library", 
      details: [
        "도서 대출/반납/예약 로직 및 대출 수 제한 등 마이페이지 기능 통합 구현", 
        "관리자 전용 도서 CRUD 및 카테고리 동적 추가/삭제 시스템 개발", 
        "Ajax 통신을 통한 인기 도서 Top 5 및 실시간 서평 추천 기능 구현"
      ] 
    },
    { 
      id: "erp", 
      title: "ERP Project", 
      period: "2024.12.16 ~ 2025.01.15", 
      description: "기업의 업무 전산화를 위한 통합 ERP 프로그램 개발(팀장, 3인)", 
      skills: ["Java 11", "SpringBoot", "MyBatis", "Oracle 11g", "JS"], 
      pdfUrl: "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/Project(ERP).pdf?alt=media&token=ca563242-e085-4887-9453-0d809142a480", 
      githubUrl: "https://github.com/Leeine/KHfianl", 
      details: [
        "Bcrypt 해시 함수를 이용한 암호화 로그인 및 보안 검증 로직 구현", 
        "WebSocket을 이용한 1:1 실시간 채팅 및 관리자 공지 시스템 개발", 
        "MyBatis 동적 쿼리를 활용한 사원 검색 및 발주 관리 시스템 최적화"
      ] 
    },
    { 
      id: "discord-bot", 
      title: "Discord Gemini Bot", 
      period: "2025.11.24", 
      description: "Google Gemini AI를 연동한 실시간 대화형 디스코드 봇(개인)", 
      skills: ["Python", "Discord API", "Google Gemini AI", "Asyncio"], 
      pdfUrl: "", githubUrl: "https://github.com/JangYongMin/discord_gemini_bot", 
      details: [
        "Gemini AI 연동으로 실시간 대화 및 메시지 송수신 구현", 
        "비동기 프로그래밍을 통한 효율적인 봇 응답 처리 최적화"
      ] 
    },
    { 
      id: "stock-news", 
      title: "Stock News View", 
      period: "2025.11.25", 
      description: "실시간 주식 뉴스 수집기(개인)", 
      skills: ["JavaScript", "Node.js", "Web Scraping"], 
      pdfUrl: "", 
      githubUrl: "https://github.com/JangYongMin/stock_news", 
      details: [
        "Node.js 환경에서 실시간 주식 관련 뉴스 데이터 수집 구축", 
        "비동기 통신 및 데이터 필터링 로직 구현"
      ] 
    },
    { 
      id: "portfolio", 
      title: "Portfolio Web", 
      period: "2025.12.31 ~ 2026.01.07", 
      description: "Next.js 16 기반 반응형 포트폴리오 웹사이트(개인)", 
      skills: ["Next.js 16", "TypeScript", "Tailwind CSS", "Firebase"], 
      pdfUrl: "", 
      githubUrl: "https://github.com/JangYongMin/my-portfolio", 
      details: [
        "App Router 및 Server/Client Component 최적화 설계", 
        "Docker 환경 기반의 효율적인 개발 프로세스 구축"
      ] 
    }
  ];

  // 메인 타이틀 단어들이 순차적으로 올라오는 애니메이션 설정
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    })
  };

  // 소셜 아이콘 그룹이 순차적으로 나타나는 컨테이너 애니메이션
  const socialContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.8    
      }
    }
  };

  // 개별 소셜 아이콘이 옆에서 튀어나오는 애니메이션
  const socialItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 }, 
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  // 프로필 정보 항목들이 순차적으로 나타나는 컨테이너 애니메이션
  const infoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.3    
      }
    }
  };

  // 개별 프로필 정보가 위로 올라오며 나타나는 애니메이션
  const infoItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 }, 
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // 스킬 카드 그룹 등장 애니메이션 설정
  const skillContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.2
      }
    }
  };

  // 개별 스킬 및 프로젝트 카드가 위로 올라오는 애니메이션
  const skillCardVariants: Variants = {
    hidden: { y: 30, opacity: 0 }, 
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // 프로필 사진이 옆에서 나타나는 등장 애니메이션
  const profileImageVariants: Variants = {
    hidden: { x: -50, opacity: 0, scale: 0.9 }, 
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // 프로젝트 카드들이 순차적으로 나타나는 컨테이너 애니메이션
  const projectContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  return (
    <main ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative will-change-scroll bg-gradient-to-b from-zinc-800 via-zinc-900 to-black text-white">
      
      {/* 히어로 섹션: 메인 타이틀과 슬로건 표시 */}
      <section id="home" className="h-screen w-full snap-start snap-always flex flex-col md:flex-row items-center justify-center 
      px-10 md:px-20 bg-transparent overflow-hidden">
        <div className="flex-1 text-center md:text-left drop-shadow-2xl md:pl-32">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            <motion.div custom={0} variants={wordVariants} className="text-pink-600 inline-block">CREATE</motion.div>
            <br />
            <motion.div custom={1} variants={wordVariants} className="inline-block">MY</motion.div>{" "}
            <motion.div custom={2} variants={wordVariants} className="text-blue-500 inline-block">OWN</motion.div>
            <br />
            <motion.div custom={3} variants={wordVariants} className="text-orange-600 inline-block">LIFE</motion.div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
            className="mt-8 text-lg md:text-xl text-white/90 font-medium max-w-lg"
          >
            나만의 가치를 만드는 개발자, 장용민입니다.
          </motion.p>
        </div>
        
        {/* 우측 퀵 네비게이터 도트 메뉴 */}
        <motion.div 
          style={{ top: "50%", marginTop: springY }}
          className="absolute right-10 flex flex-col gap-8 z-50 pointer-events-auto"
        >
          <QuickDotMenu href="#profile" label="PROFILE" hoverColor="group-hover:bg-pink-600" />
          <QuickDotMenu href="#skills" label="SKILLS" hoverColor="group-hover:bg-blue-600" />
          <QuickDotMenu href="#projects" label="PROJECTS" hoverColor="group-hover:bg-orange-600" />
        </motion.div>
      </section>

      {/* 프로필 섹션: 사진, 소셜 링크, 인적 사항 표시 */}
      <section id="profile" className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-transparent z-10 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-6">
            <motion.div 
              className="flex flex-col gap-8 shrink-0 pr-4 z-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={socialContainerVariants}
            >
              <motion.div variants={socialItemVariants}>
                <SocialIcon href="https://github.com/JangYongMin" icon="github" src="/icons/github-mark.svg" />
              </motion.div>
              <motion.div variants={socialItemVariants}>
                <SocialIcon href="https://discord.gg/SPamqcaV4d" icon="discord" src="/icons/Discord-Symbol-White.svg" />
              </motion.div>
              <motion.div variants={socialItemVariants}>
                <SocialIcon href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" icon="linkedin" src="/icons/InBug-White.png" />
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative w-64 md:w-80 lg:w-96 aspect-square bg-zinc-200 rounded-[5px] shadow-xl overflow-hidden shrink-0 z-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={profileImageVariants}
            >
              <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/profile.jpg?alt=media&token=401a5e0d-4ad0-443e-b822-cca6b9bf85b8" 
              alt="Jang Yongmin" fill className="object-cover" priority />
            </motion.div>
          </div>

          <motion.div 
            className="flex flex-col gap-6 text-left shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={infoContainerVariants}
          >
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

      {/* 스킬 섹션: 주요 기술 스택 카테고리별 카드 표시 */}
      <section id="skills" className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-transparent z-10 px-10 md:px-20 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={infoItemVariants}
          >
            <div className="relative inline-flex">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase relative z-10">
                Skills
              </h2>
              <div className="absolute -bottom-[-15px] left-0 w-full h-4 md:h-5 bg-blue-600 -rotate-1"></div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-18 cursor-pointer w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={skillContainerVariants}
          >
            <motion.div variants={skillCardVariants} onClick={() => setSelectedCategory("LANGUAGES")}>
              <SkillCategory title="LANGUAGES">
                <SkillItem name="Java" src="/icons/java-logo.png" />
                <SkillItem name="JavaScript" src="/icons/JavaScript-logo.svg" />
                <SkillItem name="Python" src="/icons/python-logo-only.svg" />
              </SkillCategory>
            </motion.div>
            <motion.div variants={skillCardVariants} onClick={() => setSelectedCategory("FRAMEWORKS")}>
              <SkillCategory title="FRAMEWORKS">
                <SkillItem name="Spring Boot" src="/icons/spring-boot.png" />
                <SkillItem name="Next.js" src="/icons/nextjs-logo.png" />
                <SkillItem name="MyBatis" src="/icons/logo-bird-ninja.svg" />
              </SkillCategory>
            </motion.div>
            <motion.div variants={skillCardVariants} onClick={() => setSelectedCategory("DB & TOOLS")}>
              <SkillCategory title="DB & TOOLS">
                <SkillItem name="Oracle" src="/icons/Oracle-logo.svg" />
                <SkillItem name="Docker" src="/icons/docker-mark-blue.svg" />
                <SkillItem name="GitHub" src="/icons/github-mark.svg" />
              </SkillCategory>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 프로젝트 섹션: 수행한 프로젝트 목록 및 상세 정보 제공 */}
      <section id="project-container" className="h-screen w-full snap-start snap-always overflow-y-auto no-scrollbar bg-transparent z-20 overflow-hidden">
        <div className="flex flex-col min-h-full">
          <div id="projects" className="min-h-screen w-full flex flex-col items-center px-10 py-32 shrink-0">
            <div className="max-w-6xl w-full flex flex-col items-center">
              <div className="text-center mb-16">
                <motion.div 
                  className="relative inline-flex"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  variants={infoItemVariants}
                >
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase relative z-10">
                    Projects
                  </h2>
                  <div className="absolute -bottom-[2px] left-0 w-full h-4 md:h-5 bg-orange-600 -rotate-1"></div>
                </motion.div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={projectContainerVariants}
              >
                {projectData.map((project: ProjectItem) => (
                  <motion.div key={project.id} variants={skillCardVariants}>
                    <ProjectCard 
                      project={project} 
                      onClick={() => setSelectedProject(project)} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="w-full shrink-0">
            <Footer />
          </div>
        </div>
      </section>

      {/* 모달 애니메이션 처리를 위한 AnimatePresence 영역 */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        {selectedCategory && <SkillModal category={selectedCategory} details={skillDetails[selectedCategory]} onClose={() => setSelectedCategory(null)} />}
      </AnimatePresence>

      <TopButton />
    </main>
  );
}




// --------------------------------------------------------------------------
// UI 컴포넌트 정의
// --------------------------------------------------------------------------




// 우측 네비게이터 도트 컴포넌트
function QuickDotMenu({ href, label, hoverColor }: { href: string; label: string; hoverColor: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) { projectContainer.scrollTo({ top: 0 }); }
  };
  return (
    <a href={href} onClick={handleClick} className="group relative flex items-center justify-end">
      <span className="absolute right-8 text-white font-black tracking-widest text-sm opacity-0 -translate-x-2 
      group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
        {label}
      </span>
      <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:scale-150 ${hoverColor} shadow-lg`} />
    </a>
  );
}

// 프로필 섹션의 소셜 미디어 아이콘 컴포넌트
function SocialIcon({ href, icon, src }: { href: string; icon: string; src: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
    className="group relative w-4 h-4 flex items-center justify-center">
      <div className="absolute w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:opacity-0 group-hover:scale-0" />
      <motion.div className="absolute w-8 h-8 opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125" whileHover={{ rotate: 5 }}>
        <Image src={src} alt={icon} fill className="object-contain" />
      </motion.div>
    </a>
  );
}

// 프로필 상세 텍스트 정보 레이아웃 컴포넌트
function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-24 md:w-32 text-zinc-400 font-bold tracking-tighter shrink-0">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

// 개별 프로젝트 정보 요약 카드 컴포넌트
function ProjectCard({ project, onClick }: { project: ProjectItem; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-orange-950/10 backdrop-blur-sm p-10 rounded-[5px] border-[2px] border-orange-900/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-orange-900/20 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(234,88,12,0.15)] flex flex-col justify-between h-full cursor-pointer">
      <div>
        <span className="text-zinc-400 font-bold text-sm group-hover:text-orange-400/80 transition-colors">{project.period}</span>
        <h3 className="text-3xl font-black text-white mt-2 mb-4 group-hover:text-orange-500 transition-colors uppercase">{project.title}</h3>
        <p className="text-zinc-100 font-medium mb-6 leading-relaxed">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.skills.map((skill: string) => (
          <span key={skill} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-bold rounded-full group-hover:bg-orange-900/30 group-hover:text-orange-200 transition-colors">{skill}</span>
        ))}
      </div>
    </div>
  );
}

// 프로젝트 상세 내용을 보여주는 모달 컴포넌트
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: ProjectItem; 
  onClose: () => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        transition={{ type: "spring", damping: 25, stiffness: 300 }} 
        className="bg-[#1a0f05]/95 backdrop-blur-xl w-full max-w-[95%] md:max-w-[60%] 
                   rounded-[5px] border-[2px] border-orange-500/30 p-8 md:p-16 
                   shadow-sm overflow-y-auto max-h-[90vh] no-scrollbar" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더: 프로젝트 제목 및 닫기 버튼 */}
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black text-white uppercase">
            {project.title}
          </h3>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* 모달 컨텐츠: 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* 왼쪽 컬럼: 주요 성과 리스트 */}
          <div>
            <h4 className="text-xl font-bold text-white mb-5 uppercase tracking-tighter">
              Key Accomplishments
            </h4>
            <ul className="space-y-4">
              {project.details.map((detail, i) => (
                <li 
                  key={i} 
                  className="text-zinc-100 font-medium leading-relaxed flex items-start gap-3 text-lg"
                >
                  <span className="text-orange-500 mt-2 text-[8px] shrink-0">●</span>
                  <span className="break-words text-white">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 컬럼: 사용 기술 및 링크 버튼 */}
          <div className="flex flex-col justify-between">
            {/* 사용 기술 태그 영역 */}
            <div>
              <h4 className="text-xl font-bold text-white mb-5 uppercase tracking-tighter">
                Used Skills
              </h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-orange-900/50 text-orange-200 text-sm 
                               font-bold rounded-lg border border-orange-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 외부 링크 버튼 그룹 */}
            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-4 bg-zinc-800 text-white text-center font-bold 
                             rounded-[5px] hover:bg-zinc-700 transition-colors 
                             flex items-center justify-center gap-3 border border-zinc-700"
                >
                  <Image src="/icons/github-mark.svg" alt="GitHub" width={20} height={20} className="invert" />
                  GitHub
                </a>
              )}
              
              {project.pdfUrl && project.pdfUrl !== "" && (
                <a 
                  href={project.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-4 bg-orange-600 text-white text-center font-bold 
                             rounded-[5px] hover:bg-orange-700 transition-colors 
                             flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 스킬 상세 경력을 보여주는 모달 컴포넌트
function SkillModal({ 
  category, 
  details, 
  onClose 
}: { 
  category: string; 
  details: any[]; 
  onClose: () => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0 }} 
        transition={{ type: "spring", damping: 25, stiffness: 300 }} 
        className="bg-[#0a1120]/95 backdrop-blur-xl w-full max-w-[95%] md:max-w-[60%] 
                   rounded-[5px] border-[2px] border-blue-500/30 p-8 md:p-16 
                   shadow-[0_0_50px_rgba(37,99,235,0.15)] max-h-[90vh] 
                   overflow-y-auto text-left no-scrollbar" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더: 카테고리 제목 및 닫기 버튼 */}
        <div className="flex justify-between items-center mb-10 md:mb-16 gap-10">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
            {category} EXPERIENCE
          </h3>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* 모달 컨텐츠: 상세 항목 그리드 레이아웃 */}
        <div className={`grid grid-cols-1 gap-x-12 gap-y-10 ${
          details.length === 3 ? 'md:grid-cols-3' : 
          details.length === 2 ? 'md:grid-cols-2' : 
          'md:grid-cols-1'
        }`}>
          {details.map((group, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 * (i + 1) }} 
              className="flex flex-col min-w-0"
            >
              {/* 소제목 (Java, Next.js 등) */}
              <h4 className="text-xl md:text-2xl font-black text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-blue-500 rounded-full shrink-0"></span>
                {group.subtitle}
              </h4>

              {/* 상세 설명 리스트 */}
              <ul className="space-y-5">
                {group.contents.map((desc: string, j: number) => (
                  <li 
                    key={j} 
                    className="text-[15px] md:text-[17px] font-medium text-zinc-100 
                               leading-relaxed flex items-start gap-3"
                  >
                    <span className="text-blue-500 mt-2.5 text-[10px] shrink-0">●</span>
                    <span className="break-words overflow-wrap-anywhere text-zinc-300">
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// 스킬 카테고리 레이아웃 컴포넌트
function SkillCategory({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group bg-blue-950/10 backdrop-blur-sm p-6 lg:p-8 rounded-[5px] border-[2px] border-blue-900/20 transition-all duration-500 ease-out hover:-translate-y-3 hover:bg-blue-900/20 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] w-full h-full">
      <h3 className="text-xl lg:text-2xl font-black text-white group-hover:text-blue-400 mb-6 tracking-tighter border-b-2 border-zinc-700 pb-2 uppercase text-center transition-colors">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// 스킬 아이콘과 이름을 표시하는 개별 아이템 컴포넌트
function SkillItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-1">
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden"><Image src={src} alt={name} fill className="object-contain" /></div>
      <span className="text-[10px] lg:text-xs font-bold text-zinc-400 group-hover:text-white transition-colors duration-500 uppercase">{name}</span>
    </div>
  );
}

// 페이지 하단 푸터 컴포넌트
function Footer() {
  return (
    <footer className="w-full py-15 bg-zinc-900/80 backdrop-blur-md text-white flex flex-col items-center justify-center gap-6">
      <div className="flex gap-8">
        <a href="https://github.com/JangYongMin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">GitHub</a>
        <a href="mailto:yongmin0182@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">Email</a>
        <a href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">LinkedIn</a>
      </div>
      <p className="text-sm text-zinc-500 font-medium tracking-widest uppercase">© 2025 Jang Yongmin. All rights reserved.</p>
    </footer>
  );
}

// 최상단 이동 버튼 컴포넌트
function TopButton() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) { mainContent.scrollTo({ top: 0, behavior: 'smooth' }); }
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) { projectContainer.scrollTo({ top: 0 }); }
  };
  return (
    <a href="#home" onClick={scrollToTop} className="fixed bottom-10 right-10 z-50 group flex items-center justify-end" aria-label="Scroll to top">
      <span className="absolute right-8 text-white font-black tracking-widest text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">TOP</span>
      <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 group-hover:scale-150 shadow-lg`} />
    </a>
  );
}