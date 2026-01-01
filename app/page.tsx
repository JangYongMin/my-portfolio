import Image from "next/image";

export default function Home() {
  const bgImageUrl = "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/bg_portfolio.jpg?alt=media&token=bc3edafa-d2c0-4328-9479-2acdb5e503b7";

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
          <QuickMenuIcon href="#stack" emoji="🛠️" label="STACK" />
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
                src="/icons/github-mark.png" // 또는 파이어베이스 URL
              />
              <SocialIcon 
                href="https://discord.com/users/your-id" 
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
            <div className="relative w-64 md:w-96 aspect-square bg-zinc-200 rounded-[40px] shadow-xl overflow-hidden">
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

      {/* 4. STACK SECTION */}
      <section id="stack" className="relative h-screen w-full snap-start flex items-center justify-center bg-zinc-200 z-10">
        <h2 className="text-5xl font-bold text-black font-sans">TECH STACK</h2>
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
    </main>
  );
}

// 아이콘 컴포넌트
function QuickMenuIcon({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <a 
      href={href} 
      className="group flex flex-col items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 hover:bg-white/40 transition-all duration-300 shadow-2xl"
    >
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
          // 호버 시 아이콘 색상을 흰색으로 반전시키는 팁입니다.
        />
      </div>
    </a>
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
