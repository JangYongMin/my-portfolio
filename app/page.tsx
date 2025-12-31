import Image from "next/image";

export default function Home() {
  const bgImageUrl = "https://firebasestorage.googleapis.com/v0/b/portfolio-83772.firebasestorage.app/o/bg_portfolio.jpg?alt=media&token=bc3edafa-d2c0-4328-9479-2acdb5e503b7";

  return (
    // main에 contain-paint를 추가하여 자식 요소들이 영역 밖으로 번지는 것을 방지합니다.
    <main className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative">
      
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
          <QuickMenuIcon href="#projects" emoji="🚀" label="PROJECTS" />
        </div>
      </section>

      {/* 3. PROFILE SECTION (중요: bg-white로 배경을 꽉 채워 이전 잔상을 가립니다) */}
      <section id="profile" className="relative h-screen w-full snap-start flex items-center justify-center bg-white z-10">
        <h2 className="text-5xl font-bold text-black font-sans">PROFILE</h2>
      </section>

      {/* 4. STACK SECTION */}
      <section id="stack" className="relative h-screen w-full snap-start flex items-center justify-center bg-zinc-100 z-10">
        <h2 className="text-5xl font-bold text-black font-sans">TECH STACK</h2>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="relative h-screen w-full snap-start flex items-center justify-center bg-white z-10">
        <h2 className="text-5xl font-bold text-black font-sans">PROJECTS</h2>
      </section>

    </main>
  );
}

// 아이콘 컴포넌트 (동일)
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