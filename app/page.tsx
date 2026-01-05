'use client';
import {useState} from "react";
import Image from "next/image";

export default function Home() {
  const bgImageUrl = "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/bg_portfolio.jpg?alt=media&token=bc3edafa-d2c0-4328-9479-2acdb5e503b7";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 카테고리별 상세 경험 데이터
  const skillDetails: { [key: string]: { subtitle: string; contents: string[] }[] } = {
    "LANGUAGES": [
      {
        subtitle: "Java",
        contents: [
          "Bcrypt 해시 함수를 이용한 암호화 데이터 저장 및 로그인 검증 로직 구현",
          "TextWebSocketHandler를 상속받은 웹소켓 핸들러로 실시간 1:1 채팅 서버 구축",
          "Builder 패턴을 활용한 도메인 객체(Employee, MessageVO 등) 설계 및 관리"
        ]
      },
      {
        subtitle: "JavaScript",
        contents: [
          "Node.js 환경에서 주식 관련 뉴스 데이터를 실시간으로 수집하고 처리하는 시스템 구축",
          "jQuery Ajax를 활용하여 페이지 새로고침 없는 동적 검색 및 페이징 구현",
          "웹소켓 클라이언트를 통해 수신된 JSON 데이터를 브라우저에 실시간 말풍선 렌더링",
          "문서 작성 시 다중 항목 동적 추가/삭제 및 데이터 유효성 검사 로직 개발"
        ]
      },
      {
        subtitle: "Python",
        contents: [
          "Discord API와 Google Gemini AI를 연동하여 실시간 대화형 봇 서비스 구현",
          "AI 모델의 프롬프트 엔지니어링을 통해 봇의 응답 정확도 및 사용자 경험 최적화",
        ]
      },
    ],
    "FRAMEWORKS": [
      {
        subtitle: "Spring Boot",
        contents: [
          "@PostMapping, @ResponseBody 등을 활용한 RESTful 데이터 통신 컨트롤러 설계",
          "Service-Dao 계층 분리 및 @Transactional을 통한 데이터 무결성 보장",
        ]
      },
      {
        subtitle: "Next.js",
        contents: [
          "Next.js 15 App Router를 활용하여 서버 중심의 효율적인 페이지 구조 설계 및 최적화",
          "Docker 컨테이너 환경에서 Polling 방식을 적용하여 개발 효율을 극대화한 Hot Reload 시스템 구축",
          "Tailwind CSS를 활용하여 일관된 디자인 시스템 구축 및 사용자 경험을 고려한 반응형 UI 구현",
          "사용자 인터랙션을 위한 Client Component와 성능 최적화를 위한 Server Component의 적절한 분리 및 활용"
        ]
      },
      {
        subtitle: "MyBatis",
        contents: [
          "RowBounds를 이용한 효율적인 서버 사이드 페이징 및 검색 동적 쿼리 최적화",
          "foreach 태그를 사용하여 대량의 발주 항목을 하나의 쿼리로 일괄 INSERT 처리",
          "상황별 동적 SQL(<choose>, <when>)을 활용한 다중 조건 검색 매퍼 작성"
        ]
      }
    ],
    "DB & TOOLS": [
      {
        subtitle: "Oracle",
        contents: [
          "ERP 및 도서관 시스템 구축을 위한 ERD 설계 및 테이블 간 관계 설정(FK/PK)",
          "Sequence와 JOIN을 활용한 도서 대출 현황 및 인기 도서 Top 5 조회 쿼리 개발",
          "메신저 기록 및 근태 데이터를 위한 대용량 텍스트(VARCHAR2 4000) 테이블 설계"
        ]
      },
      {
        subtitle: "Docker & GitHub",
        contents: [
          "Docker 컨테이너 환경을 활용한 개발 환경 표준화 및 배포 관리",
          "Git Flow 전략 기반의 팀 프로젝트 수행 및 소스 코드 버전 관리"
        ]
      }
    ]
  };

  return (
    // main에 contain-paint를 추가하여 자식 요소들이 영역 밖으로 번지는 것을 방지합니다.
    <main className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative will-change-scroll">
      
      {/* 1. 배경 이미지 (Hero Section에서만 보임) */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bgImageUrl}
          alt="Background"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* 2. HERO SECTION (수정포인트: bg-transparent) */}
      <section id="home" 
        className="h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center px-10 md:px-20 bg-transparent">
        <div className="flex-1 text-center md:text-left drop-shadow-2xl md:pl-32">
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85]">
            CREATE <br />
            MY <span className="text-blue-500">OWN</span> <br />
            LIFE
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/90 font-medium max-w-lg">
            나만의 가치를 만드는 개발자, 장용민입니다.
          </p>
        </div>

        {/* 사이드 버튼 */}
        <div className="flex flex-row md:flex-col gap-5 mt-12 md:mt-0 z-20">
          <QuickMenuIcon href="#profile" emoji="👤" label="PROFILE" />
          <QuickMenuIcon href="#skills" emoji="🛠️" label="SKILLS" />
          <QuickMenuIcon href="#projects" emoji="📁" label="PROJECTS" />
        </div>
      </section>

      {/* 3. PROFILE SECTION (중요: bg-white로 배경을 꽉 채워 이전 잔상을 가립니다) */}
      <section id="profile" className="relative h-screen w-full snap-start flex items-center justify-center bg-zinc-300 z-10">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          
          {/* 사진과 소셜 아이콘 그룹을 감싸는 컨테이너 */}
          <div className="flex items-center gap-6">
            {/* 소셜 아이콘 세로 배치 (사진의 왼쪽) */}
            <div className="flex flex-col gap-4">
              <SocialIcon 
                href="https://github.com/JangYongMin" 
                icon="github" 
                src="/icons/github-mark.png"
              />
              <SocialIcon 
                href="https://discord.gg/SPamqcaV4d" 
                icon="discord" 
                src="/icons/Discord-Symbol-Black.png" 
              />
              <SocialIcon 
                href="https://www.linkedin.com/in/%EC%9A%A9%EB%AF%BC-%EC%9E%A5-a5b1553a2/" 
                icon="linkedin" 
                src="/icons/InBug-Black.png" 
              />
            </div>

            {/* 왼쪽: 정사각형 사진 영역 */}
            <div className="relative w-64 md:w-96 aspect-square bg-zinc-200 rounded-[5px] shadow-xl overflow-hidden">
              <Image 
                src="https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/profile.jpg?alt=media&token=401a5e0d-4ad0-443e-b822-cca6b9bf85b8" 
                alt="Jang Yongmin" 
                fill
                sizes="(max-width: 768px) 256px, 384px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 오른쪽: 인적 사항 정보 */}
          <div className="flex flex-col gap-6 text-left">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">PROFILE</h2>
            
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

      {/* 4. SKILLS SECTION */}
      <section id="skills" className="relative h-screen w-full snap-start flex items-center justify-center bg-zinc-200 z-10">
        <div className="max-w-6xl w-full flex flex-col items-center">
            
            {/* 중앙 정렬된 섹션 타이틀 */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
                SKILLS
              </h2>
            </div>

            {/* 스킬 그리드 레이아웃 (중앙 정렬 유지) */}
            {/* ... 타이틀 ... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
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

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="relative h-screen w-full snap-start flex items-center justify-center bg-zinc-300 z-10">
        <h2 className="text-5xl font-bold text-black font-sans">PROJECTS</h2>
      </section>
      {/* 푸터를 별도의 스냅 지점으로 추가 (페이지 맨 마지막에 딱 걸리게 함) */}
      <section className="snap-start">
        <Footer />
      </section>
      <TopButton />

      {/* 모달 창 컴포넌트 */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
          onClick={() => setSelectedCategory(null)}>
          <div 
            /* w-fit과 max-w-7xl을 사용하되, 모바일에서는 전체 너비를 사용하도록 설정 */
            className="bg-white w-fit max-w-[95%] md:max-w-[85%] rounded-[5px] border-[2px] border-zinc-200 p-8 md:p-16 shadow-sm max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} >
            <div className="flex justify-between items-center mb-10 md:mb-16 gap-10">
              <h3 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase whitespace-normal md:whitespace-nowrap">
                {selectedCategory} EXPERIENCE
              </h3>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-zinc-400 hover:text-black transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            {/* --- 문단 가로 배치 구역 --- */}
            {/* 1. 문단 개수에 따라 그리드 열을 자동으로 조절 (1개면 1열, 3개면 3열)
                2. break-words를 통해 텍스트가 너비를 넘어가지 않게 방지*/}
            <div className={`grid grid-cols-1 ${
              skillDetails[selectedCategory].length === 3 ? 'md:grid-cols-3' : 
              skillDetails[selectedCategory].length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'
            } gap-x-12 gap-y-10`}>
              {skillDetails[selectedCategory].map((group, i) => (
                <div key={i} className="flex flex-col min-w-0"> {/* min-w-0은 그리드 안에서 텍스트 넘침 방지 필수 */}
                  <h4 className="text-xl md:text-2xl font-black text-black mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-7 bg-blue-500 rounded-full shrink-0"></span>
                    {group.subtitle}
                  </h4>
                  
                  <ul className="space-y-5">
                    {group.contents.map((desc, j) => (
                      <li key={j} className="text-[15px] md:text-[17px] font-medium text-zinc-600 leading-relaxed flex items-start gap-3">
                        <span className="text-blue-500 mt-2.5 text-[10px] shrink-0">●</span>
                        {/* 단어 단위 줄바꿈을 강제하여 박스를 벗어나지 않게 함 */}
                        <span className="break-words overflow-wrap-anywhere">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

// 아이콘 컴포넌트
function QuickMenuIcon({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <a 
      href={href} 
      className="group flex flex-col items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[5px] 
      border border-white/30 hover:bg-white/40 transition-all duration-300 shadow-2xl">
      <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
      <span className="text-[10px] mt-2 font-black text-white group-hover:text-blue-300 tracking-widest">{label}</span>
    </a>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start">
      <span className="w-24 md:w-32 text-zinc-400 font-bold">{label}</span>
      <span className="text-black">{value}</span>
    </div>
  );
}

function SocialIcon({ href, icon, src }: { href: string; icon: string; src: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-100 border border-zinc-200 hover:bg-blue-500 hover:scale-110 transition-all duration-300 overflow-hidden p-2.5 group"
    >
      <div className="relative w-full h-full">
        <Image 
          src={src} 
          alt={icon} 
          fill
          className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
          // 호버 시 아이콘 색상을 흰색으로 반전
        />
      </div>
    </a>
  );
}

function SkillCategory({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    // 'group' 클래스를 추가하여 자식들이 부모의 호버 상태를 알 수 있게 합니다.
    <div className="
      group bg-white p-8 rounded-[5px] border-[2px] border-zinc-100 
      transition-all duration-300 ease-out
      hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
      hover:border-blue-500/30
    ">
      <h3 className="text-2xl font-black text-blue-500 mb-6 tracking-tight border-b-2 border-zinc-50 pb-2">
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
    <div className="flex flex-col items-center gap-2 p-2">
      {/* group-hover:grayscale-0 를 통해 카테고리 전체 호버 시 컬러로 변경됩니다. */}
      <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-500">
        <Image src={src} alt={name} fill className="object-contain" />
      </div>
      <span className="text-xs font-bold text-zinc-400 group-hover:text-black transition-colors duration-500">
        {name}
      </span>
    </div>
  );
}


















function Footer() {
  return (
    <footer className="w-full py-10 bg-zinc-900 text-white flex flex-col items-center justify-center gap-4">
      <div className="flex gap-6">
        <a href="https://github.com/JangYongMin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
        <a href="mailto:yongmin0182@gmail.com" target="_blank" rel="noopener noreferrer"  className="hover:text-blue-500 transition-colors">Email</a>
        <a href="https://www.linkedin.com/in/용민-장-a5b1553a2" target="_blank" rel="noopener noreferrer"  className="hover:text-blue-500 transition-colors">LinkedIn</a>
      </div>
      <p className="text-sm text-zinc-500">
        © 2025 Jang Yongmin. All rights reserved.
      </p>
    </footer>
  );
}

// 상단으로 이동하는 버튼 컴포넌트
function TopButton() {
  return (
    <a
      href="#home"
      className="fixed bottom-10 right-10 z-50 flex flex-col items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-zinc-200 transition-all duration-300 hover:bg-blue-500 hover:scale-110 active:scale-95 group"
      aria-label="Scroll to top"
    >
      {/* 화살표: 기본 상태에서 blue-500 적용, 호버 시 흰색으로 반전 */}
      <span className="text-xl font-bold text-blue-500 group-hover:text-white group-hover:scale-125 transition-all duration-300">
        ↑
      </span>
      {/* 텍스트: 기본 상태에서 blue-500 적용, 호버 시 흰색으로 반전 */}
      <span className="text-[10px] font-black text-blue-500 group-hover:text-white transition-colors duration-300">
        TOP
      </span>
    </a>
  );
}
