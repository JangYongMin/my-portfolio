'use client';
import { useState } from "react";
import Image from "next/image";

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
  const bgImageUrl = "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/bg_portfolio.jpg?alt=media&token=bc3edafa-d2c0-4328-9479-2acdb5e503b7";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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
      period: "2025.12", 
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
      period: "2025.12", 
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
      period: "2025.12.31 ~ 2026.01.06", 
      description: "Next.js 16 기반 반응형 포트폴리오 웹사이트(개인)", 
      skills: ["Next.js 16", "TypeScript", "Tailwind CSS", "Firebase"], 
      pdfUrl: "", githubUrl: "https://github.com/JangYongMin/my-portfolio", 
      details: ["App Router 및 Server/Client Component 최적화 설계", 
        "Docker 환경 기반의 효율적인 개발 프로세스 구축"
      ] 
    }
  ];


  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative will-change-scroll">
      

      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image src={bgImageUrl} alt="Background" fill priority className="object-cover opacity-60" />
      </div>



      {/* 1. HERO SECTION */}
      <section id="home" className="h-screen w-full snap-start snap-always flex flex-col md:flex-row items-center justify-center 
      px-10 md:px-20 bg-transparent overflow-hidden">
        <div className="flex-1 text-center md:text-left drop-shadow-2xl md:pl-32">
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85]">
            CREATE <br /> MY <span className="text-blue-500">OWN</span> <br /> LIFE
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/90 font-medium max-w-lg">나만의 가치를 만드는 개발자, 장용민입니다.</p>
        </div>
        <div className="flex flex-row md:flex-col gap-5 mt-12 md:mt-0 z-20">
          <QuickMenuIcon href="#profile" emoji="👤" label="PROFILE" />
          <QuickMenuIcon href="#skills" emoji="🛠️" label="SKILLS" />
          <QuickMenuIcon href="#projects" emoji="📁" label="PROJECTS" />
        </div>
      </section>



      {/* 2. PROFILE SECTION */}
      <section id="profile" className="relative h-screen w-full snap-start snap-always flex items-center justify-center bg-zinc-100 z-10 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-4 shrink-0">
              <SocialIcon href="https://github.com/JangYongMin" icon="github" src="/icons/github-mark.png" />
              <SocialIcon href="https://discord.gg/SPamqcaV4d" icon="discord" src="/icons/Discord-Symbol-Black.png" />
              <SocialIcon href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" icon="linkedin" src="/icons/InBug-Black.png" />
            </div>
            <div className="relative w-64 md:w-80 lg:w-96 aspect-square bg-zinc-200 rounded-[5px] shadow-xl overflow-hidden shrink-0">
              <Image src="https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/profile.jpg?alt=media&token=401a5e0d-4ad0-443e-b822-cca6b9bf85b8" 
              alt="Jang Yongmin" fill className="object-cover" priority />
            </div>
          </div>
          <div className="flex flex-col gap-6 text-left shrink-0">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight uppercase">Profile</h2>
            <div className="space-y-4 text-lg md:text-xl font-medium text-zinc-800">
              <ProfileItem label="이름" value="장용민" />
              <ProfileItem label="생년월일" value="01.08.02" />
              <ProfileItem label="위치" value="서울특별시 영등포구" />
              <ProfileItem label="연락처" value="010-3234-3971" />
              <ProfileItem label="이메일" value="yongmin0182@gmail.com" />
              <ProfileItem label="학력" value="중원대학교 컴퓨터공학 학사" />
            </div>
          </div>
        </div>
      </section>



      {/* 3. SKILLS SECTION */}
      <section id="skills" className="relative h-screen w-full snap-start snap-always flex items-center justify-center 
      bg-zinc-200 z-10 overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-black mb-4 tracking-tighter uppercase">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-18 cursor-pointer w-full">
            <div onClick={() => setSelectedCategory("LANGUAGES")}>
              <SkillCategory title="LANGUAGES">
              <SkillItem name="Java" src="/icons/java-logo.png" />
              <SkillItem name="JavaScript" src="/icons/javaScript-logo.png" />
              <SkillItem name="Python" src="/icons/python-logo-only.png" />
              </SkillCategory>
            </div>
            <div onClick={() => setSelectedCategory("FRAMEWORKS")}>
              <SkillCategory title="FRAMEWORKS">
              <SkillItem name="Spring Boot" src="/icons/spring-boot.png" />
              <SkillItem name="Next.js" src="/icons/nextjs-logo.png" />
              <SkillItem name="MyBatis" src="/icons/logo-bird-ninja.png" />
              </SkillCategory>
            </div>
            <div onClick={() => setSelectedCategory("DB & TOOLS")}>
              <SkillCategory title="DB & TOOLS">
              <SkillItem name="Oracle" src="/icons/oracleDB-logo.png" />
              <SkillItem name="Docker" src="/icons/docker-mark-blue.png" />
              <SkillItem name="GitHub" src="/icons/github-mark.png" />
              </SkillCategory>
            </div>
          </div>
        </div>
      </section>



      {/* 4. PROJECTS + FOOTER 통합 섹션 (자유스크롤)*/}
      <section id="project-container" className="h-screen w-full snap-start snap-always overflow-y-auto no-scrollbar bg-white z-20 overflow-hidden">
        <div className="flex flex-col min-h-full">
          <div id="projects" className="min-h-screen w-full flex flex-col items-center px-10 py-32 shrink-0">
            <div className="max-w-6xl w-full flex flex-col items-center">

              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase">
                  Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-20">
                {projectData.map((project: ProjectItem) => (
                  <div key={project.id} onClick={() => setSelectedProject(project)} 
                  className="group bg-white p-10 rounded-[5px] border-[2px] border-zinc-100 cursor-pointer transition-all 
                  duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-blue-500/30 
                  flex flex-col justify-between h-full">
                    
                    <div>
                      <span className="text-zinc-400 font-bold text-sm">{project.period}</span>
                      <h3 className="text-3xl font-black text-black mt-2 mb-4 group-hover:text-blue-500 transition-colors uppercase">{project.title}</h3>
                      <p className="text-zinc-600 font-medium mb-6 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-zinc-100 text-zinc-500 text-xs font-bold rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>


          {/* 푸터 영역 */}
          <div className="w-full shrink-0">
            <Footer />
          </div>
        </div>
      </section>

      {/* 상세 모달 창들 */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedCategory && <SkillModal category={selectedCategory} details={skillDetails[selectedCategory]} onClose={() => setSelectedCategory(null)} />}

      <TopButton />
    </main>
  );
}




//상세 모달 컴포넌트 (Project)
function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4" onClick={onClose}>
      <div className="bg-white w-fit max-w-[95%] md:max-w-[70%] rounded-[5px] border-[2px] border-zinc-200 p-8 md:p-16 shadow-sm overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-black text-black uppercase">
            {project.title}
          </h3>

          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div>
            <h4 className="text-xl font-bold text-black mb-5 uppercase tracking-tighter">Key Accomplishments</h4>

            <ul className="space-y-4">
              {project.details.map((detail, i) => (
                <li key={i} className="text-zinc-600 font-medium leading-relaxed flex items-start gap-3 text-lg">
                  <span className="text-blue-500 mt-2 text-[8px] shrink-0">●</span><span className="break-words">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold text-black mb-5 uppercase tracking-tighter">
                Used Skills
              </h4>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                className="w-full py-4 bg-zinc-100 text-black text-center font-bold rounded-[5px] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 border border-zinc-200">
                  <Image src="/icons/github-mark.png" alt="GitHub" width={20} height={20} />
                  GitHub
                </a>
              )}

              {project.pdfUrl && project.pdfUrl !== "" && (
                <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" 
                className="w-full py-4 bg-black text-white text-center font-bold rounded-[5px] hover:bg-blue-600 transition-colors flex items-center justify-center gap-3">
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
      </div>
    </div>
  );
}




//상세 모달 컴포넌트 (Skill)
function SkillModal({ category, details, onClose }: { category: string; details: any[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4" onClick={onClose}>
      <div className="bg-white w-fit max-w-[95%] md:max-w-[85%] rounded-[5px] border-[2px] border-zinc-200 
      p-8 md:p-16 shadow-sm max-h-[90vh] overflow-y-auto text-left" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center mb-10 md:mb-16 gap-10">
          <h3 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase">
            {category} EXPERIENCE
          </h3>

          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className={`grid grid-cols-1 ${details.length === 3 ? 'md:grid-cols-3' : details.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-x-12 gap-y-10`}>
          {details.map((group, i) => (
            <div key={i} className="flex flex-col min-w-0">
              <h4 className="text-xl md:text-2xl font-black text-black mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-blue-500 rounded-full shrink-0"></span>
                {group.subtitle}
              </h4>

              <ul className="space-y-5">
                {group.contents.map((desc: string, j: number) => (
                  <li key={j} className="text-[15px] md:text-[17px] font-medium text-zinc-600 leading-relaxed flex items-start gap-3">
                    <span className="text-blue-500 mt-2.5 text-[10px] shrink-0">
                      ●
                    </span>
                    <span className="break-words overflow-wrap-anywhere">
                      {desc}
                    </span>
                  </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



//컴포넌트
function QuickMenuIcon({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <a href={href} 
    className="group flex flex-col items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[5px] 
    border border-white/30 hover:bg-white/40 transition-all duration-300 shadow-2xl">
      <span className="text-3xl group-hover:scale-110 transition-transform">
        {emoji}
      </span>
      <span className="text-[10px] mt-2 font-black text-white group-hover:text-blue-300 tracking-widest uppercase">
        {label}
      </span>
    </a>
  );
}



function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-24 md:w-32 text-zinc-400 font-bold tracking-tighter shrink-0">
        {label}
      </span>
      <span className="text-black font-semibold">
        {value}
      </span>
    </div>
  );
}



function SocialIcon({ href, icon, src }: { href: string; icon: string; src: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" 
    className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 hover:bg-blue-500 
    hover:scale-110 transition-all duration-300 overflow-hidden p-2.5 group">
      <div className="relative w-full h-full">
        <Image src={src} alt={icon} fill className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
      </div>
    </a>
  );
}



function SkillCategory({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="group bg-white p-6 lg:p-8 rounded-[5px] border-[2px] border-zinc-100 transition-all duration-300 ease-out 
    hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-blue-500/30">
      <h3 className="text-xl lg:text-2xl font-black text-blue-500 mb-6 tracking-tighter border-b-2 border-zinc-50 pb-2 uppercase text-center">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}



function SkillItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-1">
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 grayscale group-hover:grayscale-0 transition-all duration-500">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <span className="text-[10px] lg:text-xs font-bold text-zinc-400 group-hover:text-black transition-colors duration-500 uppercase">
        {name}
      </span>
    </div>
  );
}



function Footer() {
  return (
    <footer className="w-full py-15 bg-zinc-900 text-white flex flex-col items-center justify-center gap-6">
      <div className="flex gap-8">
        <a href="https://github.com/JangYongMin" target="_blank" rel="noopener noreferrer" 
        className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">
          GitHub
        </a>
        <a href="mailto:yongmin0182@gmail.com" target="_blank" rel="noopener noreferrer" 
        className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">
          Email
        </a>
        <a href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2" target="_blank" rel="noopener noreferrer" 
        className="hover:text-blue-500 transition-colors uppercase font-bold tracking-widest">
          LinkedIn
        </a>
      </div>
      <p className="text-sm text-zinc-500 font-medium tracking-widest uppercase">
        © 2025 Jang Yongmin. All rights reserved.
      </p>
    </footer>
  );
}




function TopButton() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // 1. 전체 페이지 부모 스크롤 최상단 이동
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }

    // 2. 프로젝트 묶음 섹션 내부 스크롤 최상단 초기화
    const projectContainer = document.getElementById('project-container');
    if (projectContainer) {
      projectContainer.scrollTo({ 
        top: 0 
      }); // 내부 위치 리셋
    }
  };

  return (
    <a href="#home" onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-50 flex flex-col items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-md rounded-[5px] 
      shadow-2xl border border-zinc-200 transition-all duration-300 hover:bg-blue-500 hover:scale-110 active:scale-95 group" 
      aria-label="Scroll to top">
      <span className="text-xl font-bold text-blue-500 group-hover:text-white group-hover:scale-125 transition-all duration-300">
        ↑
      </span>
      <span className="text-[10px] font-black text-blue-500 group-hover:text-white transition-colors duration-300 uppercase">
        Top
      </span>
    </a>
  );
}