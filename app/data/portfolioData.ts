export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  description: string;
  skills: string[];
  pdfUrl: string;
  githubUrl: string;
  details: string[];
}

// 프로젝트 섹션 카드에 표시될 데이터 모음
export const projectData: ProjectItem[] = [
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
    period: "2025.12.31 ~ 2026.01.08", 
    description: "Next.js 16 기반 반응형 포트폴리오 웹사이트(개인)", 
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"], 
    pdfUrl: "", 
    githubUrl: "https://github.com/JangYongMin/my-portfolio", 
    details: [
      "Framer Motion을 이용한 고도화된 스크롤 애니메이션 구현",
      "Next.js App Router 기반의 최적화된 컴포넌트 구조 설계",
      "Tailwind CSS를 활용한 반응형 UI/UX 디자인 (Mobile/PC 최적화)",
      "Intersection Observer API를 활용한 섹션 감지 네비게이션 구현",
      "Vercel을 통한 CI/CD 배포 자동화 및 성능 최적화"
    ] 
  }
];

// 스킬 섹션 모달에 표시될 상세 데이터
export const skillDetails: { [key: string]: { subtitle: string; contents: string[] }[] } = {
  "LANGUAGES": [
    { subtitle: "Java", contents: ["Bcrypt 해시 함수를 이용한 암호화 데이터 저장 및 로그인 검증 로직 구현", "TextWebSocketHandler를 상속받은 웹소켓 핸들러로 실시간 1:1 채팅 서버 구축", "Builder 패턴을 활용한 도메인 객체(Employee, MessageVO 등) 설계 및 관리"] },
    { subtitle: "JavaScript", contents: ["Node.js 환경에서 주식 관련 뉴스 데이터를 실시간으로 수집하고 처리하는 시스템 구축", "jQuery Ajax를 활용하여 페이지 새로고침 없는 동적 검색 및 페이징 구현", "웹소켓 클라이언트를 통해 수신된 JSON 데이터를 브라우저에 실시간 말풍선 렌더링", "문서 작성 시 다중 항목 동적 추가/삭제 및 데이터 유효성 검사 로직 개발"] },
    { subtitle: "Python", contents: ["Discord API와 Google Gemini AI를 연동하여 실시간 대화형 봇 서비스 구현", "AI 모델의 프롬프트 엔지니어링을 통해 봇의 응답 정확도 및 사용자 경험 최적화"] },
  ],
  "FRAMEWORKS": [
    { subtitle: "Spring Boot", contents: ["@PostMapping, @ResponseBody 등을 활용한 RESTful 데이터 통신 컨트롤러 설계", "Service-Dao 계층 분리 및 @Transactional을 통한 데이터 무결성 보장"] },
    { subtitle: "Next.js", contents: ["Next.js 15 App Router를 활용하여 서버 중심의 효율적인 페이지 구조 설계 및 최적화", "Docker 컨테이너 환경에서 Polling 방식을 적용하여 개발 효율을 극대화한 Hot Reload 시스템 구축", "Tailwind CSS를 활용하여 일관된 디자인 시스템 구축 및 사용자 경험을 고려한 반응형 UI 구현", "사용자 인터랙션을 위한 Client Component와 성능 최적화를 위한 Server Component의 적절한 분리 및 활용"] },
    { subtitle: "MyBatis", contents: ["RowBounds를 이용한 효율적인 서버 사이드 페이징 및 검색 동적 쿼리 최적화", "foreach 태그를 사용하여 대량의 발주 항목을 하나의 쿼리로 일괄 INSERT 처리", "상황별 동적 SQL(<choose>, <when>)을 활용한 다중 조건 검색 매퍼 작성"] }
  ],
  "DB & TOOLS": [
    { subtitle: "Oracle", contents: ["ERP 및 도서관 시스템 구축을 위한 ERD 설계 및 테이블 간 관계 설정(FK/PK)", "Sequence와 JOIN을 활용한 도서 대출 현황 및 인기 도서 Top 5 조회 쿼리 개발", "메신저 기록 및 근태 데이터를 위한 대용량 텍스트(VARCHAR2 4000) 테이블 설계"] },
    { subtitle: "Docker & GitHub", contents: ["Docker 컨테이너 환경을 활용한 개발 환경 표준화 및 배포 관리", "Git Flow 전략 기반의 팀 프로젝트 수행 및 소스 코드 버전 관리"] }
  ]
};