'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectItem } from "../data/portfolioData";

export function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        /* [변경] md:max-w-[60%] -> lg:max-w-[70%]로 변경하여 더 일찍 세로 배치로 전환 */
        className="bg-[#1a0f05]/95 backdrop-blur-xl w-[min(92%,650px)] lg:w-full lg:max-w-[70%] rounded-[5px] border-[2px] border-orange-500/30 p-8 lg:p-16 shadow-sm overflow-y-auto max-h-[90vh] no-scrollbar"
        onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl lg:text-3xl font-black text-zinc-200 uppercase tracking-tighter">{project.title}</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* [변경] md:grid-cols-2 -> lg:grid-cols-2로 상향 (1024px 미만은 무조건 세로) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-left">
          <div>
            <h4 className="text-lg lg:text-xl font-bold text-zinc-200 mb-5 uppercase tracking-tighter">Key Accomplishments</h4>
            <ul className="space-y-4">
              {project.details.map((detail, i) => (
                <li key={i} className="text-zinc-100 font-medium leading-relaxed flex items-start gap-3 text-base lg:text-lg">
                  <span className="text-orange-500 mt-2 text-[8px] shrink-0">●</span>
                  <span className="break-words text-zinc-200">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-zinc-200 mb-5 uppercase tracking-tighter">Used Skills</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 lg:px-4 lg:py-2 bg-orange-900/50 text-orange-200 text-xs lg:text-sm font-bold rounded-lg border border-orange-500/30">{skill}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 lg:py-4 bg-zinc-800 text-zinc-200 text-center font-bold rounded-[5px] hover:bg-zinc-700 transition-colors flex items-center justify-center gap-3 border border-zinc-700">
                  <Image src="/icons/github-mark.svg" alt="GitHub" width={20} height={20}/> GitHub
                </a>
              )}
              {project.pdfUrl && project.pdfUrl !== "" && (
                <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 lg:py-4 bg-orange-600 text-zinc-200 text-center font-bold rounded-[5px] hover:bg-orange-700 transition-colors flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg> PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillModal({ category, details, onClose }: { category: string; details: any[]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        /* [변경] 동일하게 lg 중단점 적용 */
        className="bg-[#0a1120]/95 backdrop-blur-xl w-[min(92%,650px)] lg:w-full lg:max-w-[70%] rounded-[5px] border-[2px] border-blue-500/30 p-8 lg:p-16 shadow-[0_0_50px_rgba(37,99,235,0.15)] max-h-[90vh] overflow-y-auto text-left no-scrollbar"
        onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center mb-10 lg:mb-16 gap-10">
          <h3 className="text-xl lg:text-3xl font-black text-zinc-200 tracking-tighter uppercase">{category} EXPERIENCE</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200 transition-colors shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* [변경] md:grid-cols-X -> lg:grid-cols-X */}
        <div className={`grid grid-cols-1 gap-x-12 gap-y-10 ${details.length === 3 ? 'lg:grid-cols-3' : details.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          {details.map((group, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (i + 1) }} className="flex flex-col min-w-0">
              <h4 className="text-lg lg:text-2xl font-black text-zinc-200 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-blue-500 rounded-full shrink-0"></span> {group.subtitle}
              </h4>
              <ul className="space-y-5">
                {group.contents.map((desc: string, j: number) => (
                  <li key={j} className="text-[14px] lg:text-[17px] font-medium text-zinc-100 leading-relaxed flex items-start gap-3">
                    <span className="text-blue-500 mt-2.5 text-[10px] shrink-0">●</span>
                    <span className="break-words text-zinc-300">{desc}</span>
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