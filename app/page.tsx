import { Mail, FileText, ArrowRight, ExternalLink, Globe, GraduationCap, Download,  MapPin  } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen pb-20 selection:bg-orange-100">
      
      
      <nav className="fixed top-0 w-full z-50 bg-[#fdfdfc]/80 backdrop-blur-md border-b border-zinc-100/60">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <span className="text-[19px] uppercase tracking-[0.1em] font-bold">Maja Kokot </span>
          </div>
          <div className="hidden md:flex gap-10 text-[14px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
            <a href="#home" className="hover:text-black transition-colors">Home</a>
            <a href="#geometry" className="hover:text-black transition-colors">Geometry</a>
            <a href="#beyond" className="hover:text-black transition-colors">Beyond the Code</a>

          </div>
          {/* <a href="#" className="text-[14px] uppercase tracking-[0.2em] font-bold border-b border-black pb-0.5">CV</a> */}
        </div>
      </nav>

      <main id="home" className="max-w-6xl mx-auto px-8 pt-40 md:pt-48">
        

        <section  className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-16 md:gap-24 items-start mb-40 relative">
          
  <aside className="flex flex-col items-center text-center space-y-8 md:sticky md:top-40">
    
    
    <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden transition-all duration-700">
      <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-300 italic border border-zinc-100 rounded-full">
        <img 
  src="/profile.png" 
  alt="Maja Kokot" 
  className="w-full h-full object-cover" 
/>
      </div>
    </div>

  
  <div className="space-y-4">
    <div className="space-y-1">
     
      <h1 className="text-[2.9rem] font-crimson tracking-tight text-zinc-900 leading-tight">
        Maja Kokot
      </h1>
    </div>
  </div>


                    <div className="flex gap-4 pt-4">
                <a href="mailto:mk2222@cam.ac.uk" className="p-3 border border-zinc-200 rounded-full hover:bg-black hover:text-white transition-all duration-500"><Mail size={20} /></a>
              </div>
    
</aside>


<div className="space-y-24">
  

  <section  className="space-y-8">
    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">About Me</h2>
    <div className="text-2xl md:text-2xl font-serif leading-relaxed text-zinc-800 space-y-6">
       <p>
                <span className="text-7xl font-serif float-left mr-4 mt-2 text-black leading-[0.7]">I</span>
                'm a fourth year Computer Science student at{" "}
                <a 
    href="https://www.trin.cam.ac.uk/" 
    target="_blank" 
    className="text-zinc-900 font-medium underline decoration-zinc-200 underline-offset-4 hover:decoration-black transition-all"
  >
     Trinity College
  </a>, University of Cambridge.
  I'm a part of{" "}                 
  <a 
    href="https://www.cst.cam.ac.uk/people/tg508" 
    target="_blank" 
    className="text-zinc-900 font-medium underline decoration-zinc-200 underline-offset-4 hover:decoration-black transition-all"
  >Professor Tom Gur</a>{" "}'s research group
  and
  I'm interested in quantum complexity theory and quantum error correction.
              </p>
              
      <p className="text-lg text-zinc-500 leading-relaxed">
        Outside of academics, I am an épée fencer and a member of the{" "}
        <a 
    href="https://cufc.org.uk/" 
    target="_blank" 
    className="text-zinc-500 font-medium underline decoration-zinc-200 underline-offset-4 hover:decoration-black transition-all"
  ><i>Cambridge University Fencing Club</i></a>
         .
      </p>
    </div>
  </section>


  <section id="education" className="space-y-12 pt-12 border-t border-zinc-100">
    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Education</h2>
    
    <div className="space-y-10">
      <div className="flex gap-6 items-start">
        <div className="mt-1 p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
          <GraduationCap size={24} className="text-zinc-400" />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-serif">BA & MEng in Computer Science</h3>
          <p className="text-zinc-900 font-medium text-sm">Trinity College, Cambridge</p>
          <p className="text-zinc-400 text-sm italic font-serif">2023 — 2027</p>
        </div>
      </div>
          </div>


  </section>
      </div>
        </section>


<section id="geometry" className="pt-40 pb-20  border-zinc-100">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif italic text-zinc-900 tracking-tight">
              Geometry 
            </h1>
            <p className="max-w-2xl text-xl text-zinc-500 font-serif leading-relaxed">
              My favourite part of Mathematical Olympiads has always been Euclidean Geometry.
              Below, you can find some of my olympiad handouts and initiatives.
            </p>
          </div>
          
        </section>


        <section  className="space-y-16 pt-16 border-zinc-100">
          {/* <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Mentorship Timeline</h2>
           */}
          <div className="space-y-16">
            <div className="flex gap-8 items-start">
              <div className="w-px h-24 bg-zinc-100 relative mt-2">
                 <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-zinc-900" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  <MapPin size={10} /> Eger, Hungary · 2022
                </div>
                <h3 className="text-2xl font-serif font-bold">EGMO Silver Medalist</h3>
                <p className="text-zinc-500 max-w-2xl font-serif leading-relaxed italic">
 One of the only 7 out of 222 contestants to give a perfect solution 
 and receive full marks for Problem 6.


                </p>
              </div>

                        <div className="pt-4">
            <a 
              href="https://www.egmo.org/people/person2081/" 
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-200 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all shadow-sm"
            >
              EGMO Official Profile <ExternalLink size={14} />
            </a>
          </div>
            </div>

            <div className="flex gap-8 items-start">
              <div className="w-px h-24 bg-zinc-100 relative mt-2">
                 <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-zinc-900" />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                  <MapPin size={10} /> Krakow, Poland · 2025-now
                </div>
                <h3 className="text-2xl font-serif font-bold">EGMO Training Camp organiser</h3>
                <p className="text-zinc-500 max-w-2xl font-serif leading-relaxed italic">

                  Lecturer and mentor
                  on training camp for
  talented high school girls from Poland,
  Czechia, Hungary, Lithuania and Slovakia,
  preparing them for participation in EGMO.

                </p>
              </div>
            </div>
          </div>
        </section>



        <section className="pt-32 space-y-12">
           <div className="flex items-center gap-4">
              <h2 className="font-serif text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Handouts</h2>
              <div className="h-px flex-1 bg-zinc-100" />
           </div>

           <div className="divide-y divide-zinc-100 border-b border-zinc-100">
              {[
                { 
                  title: "Book of Lemmas", 
                  context: "Collection",
                  desc: "My 120 pages long geometry compendium with 92 diagrams.",
                  file: "/handouts/book_of_lemmas.pdf" 
                },
                { 
                  title: "Cyclic Quadrilateral", 
                  context: "EGMO Training Camp 2025",
                  desc: "Properties of spiral similarity and Miquel point.",
                  file: "/handouts/quad.pdf" 
                }
              ].map((handout, i) => (
                <div key={i} className="py-10 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 group">
                   <div className="space-y-3">
                      <h3 className="text-2xl font-serif font-bold text-zinc-900 group-hover:text-brand-primary transition-colors">
                        {handout.title}
                      </h3>
                      <p className="text-sm font-bold uppercase tracking-widest text-brand-primary/60">{handout.context}</p>
                      <p className="text-zinc-500 font-serif italic text-base leading-relaxed max-w-xl">{handout.desc}</p>
                   </div>
                   <div className="md:text-right self-center">
                      <a 
                        href={handout.file} target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all shadow-sm"
                      >
                        View PDF <ExternalLink size={12} />
                      </a>
                   </div>
                </div>
              ))}
           </div>
        </section>

          <section id="beyond" className="pt-40 pb-20 border-t border-zinc-100">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif italic text-zinc-900 tracking-tight">Beyond the Code</h1>
              <p className="max-w-2xl text-xl text-zinc-500 font-serif leading-relaxed">
                Photos of my cat.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                         <div className="space-y-4">
                    <div className="aspect-square bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 flex items-center justify-center ">
                  <img src="/cat_1.png" className="w-full h-full object-cover  " />
               </div>
              {/* <p className="text-xs font-bold uppercase tracking-widest text-center">The Lab Assistant</p> */}
           </div>
           <div className="space-y-4 pt-12">
              <div className="aspect-square bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100 flex items-center justify-center ">
                  <img src="/cat_3.PNG" className="w-full h-full object-cover  " />
               </div>
 
           </div>

            </div>
          </div>
        </section>




      </main>


    </div>
  )
}