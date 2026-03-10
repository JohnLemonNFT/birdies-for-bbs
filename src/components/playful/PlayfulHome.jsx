import { useState } from "react";

export function PlayfulHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-sky-100 overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 bg-sky-100/90 sm:bg-white/80 backdrop-blur-md sm:shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Birdies for BBS" className="h-12 w-auto" />
            <span className="font-black text-xl text-gray-800 tracking-tight">Birdies for BBS</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#story" className="text-gray-600 hover:text-emerald-600 font-bold transition">Meet Wyatt</a>
            <a href="#event" className="text-gray-600 hover:text-emerald-600 font-bold transition">The Event</a>
            <a href="#sponsors" className="text-gray-600 hover:text-emerald-600 font-bold transition">Register</a>
            <a href="#donate" className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <span className="relative z-10">Donate</span>
              <HeartIcon className="absolute -top-1 -right-1 w-5 h-5 text-pink-300 animate-pulse" />
            </a>
          </div>

          <button
            className="md:hidden text-gray-600 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-bold py-2 hover:text-emerald-600 transition">Meet Wyatt</a>
            <a href="#event" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-bold py-2 hover:text-emerald-600 transition">The Event</a>
            <a href="#sponsors" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-bold py-2 hover:text-emerald-600 transition">Register / Sponsor</a>
            <a
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full text-center shadow-lg"
            >
              Donate Now
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Sky gradient - with warm tones on right to blend with Wyatt */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-200" />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 85% 35%, rgba(253,230,220,0.7) 0%, transparent 60%)' }}
        />

        {/* Clouds - fewer on mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <Cloud className="absolute top-20 left-[5%] w-32 sm:w-48 animate-float-slow" />
          <Cloud className="absolute top-12 right-[12%] w-24 sm:w-36 animate-float-medium hidden sm:block" style={{ animationDelay: '-2s' }} />
          <Cloud className="absolute top-36 left-[45%] w-20 sm:w-32 animate-float-fast hidden sm:block" style={{ animationDelay: '-1s' }} />
          <Cloud className="absolute top-8 left-[25%] w-20 sm:w-28 animate-float-medium" style={{ animationDelay: '-3s' }} />
          <Cloud className="absolute top-28 right-[35%] w-16 sm:w-24 animate-float-slow hidden md:block" style={{ animationDelay: '-4s' }} />
        </div>

        {/* Sun - clean, no emoji */}
        <div className="absolute top-2 -right-4 sm:top-16 sm:right-16 lg:top-20 lg:right-24">
          <div className="relative w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-400 rounded-full shadow-2xl animate-pulse-glow" />
          <div className="absolute inset-0 w-20 h-20 sm:w-28 sm:h-28 bg-yellow-300/30 rounded-full blur-xl" />
        </div>

        {/* Golf course landscape */}
        <div className="absolute bottom-0 left-0 right-0">
          {/* Back hill (rough) */}
          <svg viewBox="0 0 1440 140" fill="none" className="absolute bottom-8 w-full h-auto" preserveAspectRatio="none">
            <path d="M0 80 Q300 40 600 70 T1200 50 T1440 80 L1440 140 L0 140 Z" fill="#16a34a" />
          </svg>

          {/* Front fairway */}
          <svg viewBox="0 0 1440 120" fill="none" className="relative w-full h-auto" preserveAspectRatio="none">
            <path d="M0 60 Q360 20 720 50 T1440 40 L1440 120 L0 120 Z" fill="#22c55e" />
          </svg>

          {/* Flag - left side, close */}
          <div className="absolute bottom-6 left-[10%] sm:left-[15%]">
            <svg width="50" height="70" viewBox="0 0 50 70" fill="none">
              <rect x="23" y="8" width="3" height="52" fill="#374151" />
              <path d="M26 8 L48 18 L26 28 Z" fill="#ef4444" />
              <ellipse cx="24" cy="62" rx="16" ry="5" fill="#15803d" />
              <ellipse cx="24" cy="62" rx="8" ry="3" fill="#1a1a1a" />
            </svg>
          </div>

          {/* Flag - right side, distance (smaller) */}
          <div className="absolute bottom-8 sm:bottom-16 right-[15%] sm:right-[25%] opacity-80">
            <svg width="25" height="35" viewBox="0 0 50 70" fill="none">
              <rect x="23" y="8" width="3" height="52" fill="#374151" />
              <path d="M26 8 L48 18 L26 28 Z" fill="#fbbf24" />
              <ellipse cx="24" cy="62" rx="16" ry="5" fill="#15803d" />
            </svg>
          </div>

          {/* Golf ball on green */}
          <div className="absolute bottom-10 left-[18%] sm:left-[22%]">
            <div className="w-4 h-4 bg-white rounded-full shadow-md border border-gray-200" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-5 py-2 mb-6 shadow-lg">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" />
                <span className="text-emerald-700 font-bold text-sm">June 22, 2026 • Wrightstown, WI</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-800 mb-6 leading-none">
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-emerald-600">Wyatt!</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20" fill="none">
                    <path d="M0 15 Q50 0 100 15 T200 15" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                Welcome to my golf tournament
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Every birdie helps fund research for Bardet-Biedl Syndrome.
                Join us for a day of golf, fun, and making a <span className="text-emerald-600 font-bold">real difference</span>!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#event"
                  className="group relative bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    <GolfBallIcon className="w-5 h-5" />
                    Join the Tournament
                  </span>
                </a>
                <a
                  href="#story"
                  className="bg-white/90 backdrop-blur text-gray-800 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Our Story
                </a>
              </div>
            </div>

            {/* Wyatt photos - real + illustrated */}
            <div className="flex-shrink-0 relative mt-4 lg:mt-0">
              {/* Main real photo */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
                <img
                  src="/images/wyatt-original.png"
                  alt="Wyatt smiling"
                  className="w-52 sm:w-64 md:w-72 lg:w-80 h-auto rounded-xl sm:rounded-2xl object-cover"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg whitespace-nowrap">
                  Meet Wyatt! ⛳
                </div>
              </div>
              {/* Small illustrated version - hidden on very small screens */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-xl transform rotate-6 hover:rotate-3 transition-transform hidden xs:block">
                <img
                  src="/images/playful/wyatt-pixar-waving.png"
                  alt="Wyatt waving"
                  className="w-16 sm:w-24 md:w-28 h-auto rounded-lg sm:rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== STORY ===== */}
      <section id="story" className="relative bg-emerald-500 py-20 sm:py-32">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/20 text-white font-bold text-sm px-4 py-2 rounded-full mb-4">
              OUR STORY
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              Meet Wyatt
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl transform -rotate-3" />
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform">
                <img
                  src="/images/playful/wyatt-pixar-golfing.png"
                  alt="Wyatt playing golf"
                  className="w-full rounded-2xl"
                />
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🎂", label: "Born", value: "Oct 2020", bg: "bg-pink-100" },
                    { emoji: "🧬", label: "Diagnosis", value: "BBS1", bg: "bg-purple-100" },
                    { emoji: "⚽", label: "Loves", value: "Sports!", bg: "bg-blue-100" },
                  ].map((item) => (
                    <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                      <div className="font-bold text-gray-800 text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                Our journey with <span className="font-bold text-yellow-300">Bardet-Biedl Syndrome</span> began before Wyatt was born. His twenty-week ultrasound showed enlarged, bright kidneys — leading us to discover we are both carriers of the BBS1 gene mutation.
              </p>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                When we first got the news, we were devastated. But our son Wyatt is a <span className="font-bold text-yellow-300">happy, loving little boy</span>. He's 5 years old, always on the go, and loves basketball, soccer, hockey, and golf.
              </p>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                Wyatt was born with an extra toe — removed before his first birthday. His vision is stable now, but BBS often leads to blindness by the teenage years. Not knowing what the future holds is frightening.
              </p>

              <blockquote className="relative bg-white/10 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <p className="text-sm sm:text-base lg:text-lg italic relative z-10">
                  "People like Wyatt didn't do anything wrong — they were simply born with a couple letters different in their genetic code. Science however is catching up."
                </p>
                <cite className="block mt-3 sm:mt-4 text-yellow-300 font-bold not-italic text-sm sm:text-base">— Josh & Brittany Vanden Heuvel</cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Wave transition to white */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 30 Q360 60 720 30 T1440 30 L1440 60 L0 60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===== WHAT IS BBS ===== */}
      <section className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block bg-purple-100 text-purple-700 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              THE CONDITION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-3 sm:mb-4">
              What is Bardet-Biedl Syndrome?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              BBS is a rare recessive genetic disorder presenting with a wide range of symptoms. Each child with BBS can have very different challenges.
            </p>
          </div>

          {/* Symptoms grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
            {[
              {
                symptom: "Progressive Vision Loss",
                note: "Many people with BBS progress to legal blindness by the time they are teenagers.",
                icon: "👁️",
                color: "from-purple-400 to-purple-600"
              },
              {
                symptom: "Genetic Obesity",
                note: "Weight gain that begins at a young age and is difficult to control.",
                icon: "⚖️",
                color: "from-amber-400 to-orange-500"
              },
              {
                symptom: "Insatiable Hunger",
                note: "A constant, overwhelming feeling of hunger that doesn't go away.",
                icon: "🍽️",
                color: "from-red-400 to-rose-500"
              },
              {
                symptom: "Extra Digits",
                note: "Extra toes or fingers at birth, called polydactyly.",
                icon: "✋",
                color: "from-teal-400 to-cyan-500"
              },
              {
                symptom: "Learning Disabilities",
                note: "Cognitive challenges that vary by individual.",
                icon: "📚",
                color: "from-blue-400 to-indigo-500"
              },
              {
                symptom: "Kidney Problems",
                note: "Can sometimes be detected via prenatal ultrasound.",
                icon: "🏥",
                color: "from-pink-400 to-rose-500"
              },
            ].map((item) => (
              <div key={item.symptom} className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-shadow">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 text-lg sm:text-xl lg:text-2xl`}>
                  {item.icon}
                </div>
                <div className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{item.symptom}</div>
                <div className="text-gray-600 text-xs sm:text-sm leading-relaxed hidden sm:block">{item.note}</div>
              </div>
            ))}
          </div>

          {/* The Hope Section */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left - Photo */}
              <div className="lg:col-span-2 relative min-h-[180px] sm:min-h-[250px] lg:min-h-full">
                <img
                  src="/images/wyatt-bbs-3.png"
                  alt="Wyatt and his brother"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-500/50 lg:block hidden" />
              </div>

              {/* Right - Content */}
              <div className="lg:col-span-3 p-5 sm:p-8 lg:p-12 text-white">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 sm:mb-4">Science Is Catching Up</h3>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-8 text-emerald-100">
                  With the correct funding, children like Wyatt could keep their vision through gene therapy and other emerging treatments.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-8">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 text-gray-800">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center text-lg sm:text-xl">💊</div>
                      <h4 className="font-black text-sm sm:text-lg">Setmelanotide</h4>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">Curbing insatiable hunger and reducing obesity.</p>
                  </div>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 text-gray-800">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg sm:text-xl">🧬</div>
                      <h4 className="font-black text-sm sm:text-lg">Gene Therapy</h4>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">Preserving vision by targeting the retina.</p>
                  </div>
                </div>

                {/* Visual Pipeline */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold">
                  <span className="bg-yellow-400 text-yellow-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">Funding</span>
                  <span className="text-white/60">→</span>
                  <span className="bg-amber-400 text-amber-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">Research</span>
                  <span className="text-white/60">→</span>
                  <span className="bg-orange-400 text-orange-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">Trials</span>
                  <span className="text-white/60">→</span>
                  <span className="bg-rose-400 text-rose-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full">Therapies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 30 Q360 0 720 30 T1440 30 L1440 60 L0 60 Z" fill="#e0f2fe" />
          </svg>
        </div>
      </section>

      {/* ===== EVENT ===== */}
      <section id="event" className="relative bg-sky-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block bg-emerald-100 text-emerald-700 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              5TH ANNUAL EVENT
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-3 sm:mb-4">
              Join the Tournament
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              June 22, 2026 at Royal St. Patrick's Golf Course
            </p>
          </div>

          {/* Main event card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left side - Details */}
              <div className="lg:col-span-3 p-5 sm:p-8 lg:p-12">
                {/* Venue */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-black text-xl sm:text-2xl text-gray-800 mb-1 sm:mb-2">Royal St. Patrick's Golf Course</h3>
                  <p className="text-gray-500 text-sm sm:text-base">201 Royal Saint Pats Dr, Wrightstown, WI</p>
                </div>

                {/* Key details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <div className="text-gray-400 text-sm font-medium mb-1">Date</div>
                    <div className="font-bold text-gray-800">June 22, 2026</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm font-medium mb-1">Format</div>
                    <div className="font-bold text-gray-800">Scramble</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm font-medium mb-1">Registration</div>
                    <div className="font-bold text-gray-800">8:30 AM</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm font-medium mb-1">Shotgun Start</div>
                    <div className="font-bold text-gray-800">10:00 AM</div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-emerald-50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-emerald-600 text-xs sm:text-sm font-medium">Individual</div>
                    <div className="font-black text-xl sm:text-2xl text-emerald-700">$150</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-amber-600 text-xs sm:text-sm font-medium">Foursome</div>
                    <div className="font-black text-xl sm:text-2xl text-amber-700">$550</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                    <div className="text-gray-500 text-xs sm:text-sm font-medium">Includes</div>
                    <div className="font-bold text-sm sm:text-base text-gray-700">Lunch & Dinner</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full text-center shadow-lg hover:shadow-xl transition-all"
                  >
                    Register Now
                  </a>
                  <a
                    href="#sponsors"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full text-center transition"
                  >
                    Become a Sponsor
                  </a>
                </div>
              </div>

              {/* Right side - Family photo */}
              <div className="lg:col-span-2 relative overflow-hidden">
                <img
                  src="/images/wyatt-bbs-2.png"
                  alt="The Vanden Heuvel family at Birdies for BBS"
                  className="w-full h-full object-cover min-h-[300px] lg:min-h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg drop-shadow-lg">
                    The Vanden Heuvel Family
                  </p>
                  <p className="text-white/90 text-sm drop-shadow-lg">
                    Join us for a day of golf & giving!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION & SPONSORS ===== */}
      <section id="sponsors" className="relative bg-gradient-to-b from-emerald-100 via-emerald-50 to-white py-20 sm:py-32 overflow-hidden">
        {/* Decorative grass bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-200/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-500 text-white font-bold text-sm px-6 py-2 rounded-full mb-4 shadow-lg">
              🎟️ GET YOUR SPOT
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 mb-4">
              Grab Your Clubs!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for a day of golf, great food, and making memories — all while supporting BBS research.
            </p>
          </div>

          {/* Registration Options - Fun Cards */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
            {/* Individual Golfer */}
            <div className="group relative bg-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              <div>
                <div className="flex items-end justify-between mb-4 sm:mb-6">
                  <div>
                    <h3 className="font-black text-gray-800 text-xl sm:text-2xl">Solo Golfer</h3>
                    <p className="text-emerald-600 font-semibold text-sm sm:text-base">Hit the course</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-black text-emerald-500">$150</div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">⛳</span>
                      <span className="text-gray-700">18 holes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">🥪</span>
                      <span className="text-gray-700">Box lunch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">🍽️</span>
                      <span className="text-gray-700">Dinner</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">🎁</span>
                      <span className="text-gray-700">Raffles</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base sm:text-lg text-center py-3 sm:py-4 rounded-full transition shadow-lg hover:shadow-xl"
                >
                  Sign Me Up!
                </a>
              </div>
            </div>

            {/* Foursome */}
            <div className="group relative bg-gradient-to-br from-amber-400 to-yellow-400 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
              {/* Best value ribbon */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-rose-500 text-white text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg transform rotate-12">
                BEST VALUE!
              </div>

              <div className="pt-2 sm:pt-4">
                <div className="flex items-end justify-between mb-4 sm:mb-6">
                  <div>
                    <h3 className="font-black text-gray-800 text-xl sm:text-2xl">Foursome</h3>
                    <p className="text-amber-800 font-semibold text-sm sm:text-base">Bring your crew!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-black text-gray-800">$550</div>
                    <div className="text-xs sm:text-sm font-bold text-amber-800">Save $50!</div>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span className="text-gray-800 font-medium">4 golfers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⛳</span>
                      <span className="text-gray-800 font-medium">18 holes each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🥪</span>
                      <span className="text-gray-800 font-medium">Lunch for all</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🍽️</span>
                      <span className="text-gray-800 font-medium">Dinner for all</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-800 hover:bg-gray-900 text-white font-black text-lg text-center py-4 rounded-full transition shadow-lg hover:shadow-xl"
                >
                  Register Our Team!
                </a>
              </div>
            </div>
          </div>

          {/* Sponsorship Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
              <div className="grid lg:grid-cols-3">
                {/* Left - Photo */}
                <div className="relative min-h-[180px] sm:min-h-[200px] lg:min-h-full">
                  <img
                    src="/images/wyatt-bbs-1.png"
                    alt="Wyatt and his brother"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6">
                    <p className="text-white font-bold text-base sm:text-lg">Support Wyatt's Journey</p>
                  </div>
                </div>

                {/* Right - Content */}
                <div className="lg:col-span-2 p-5 sm:p-8 lg:p-12 text-white">
                  <div className="text-center lg:text-left mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">Be a Sponsor!</h3>
                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Get your business recognized while supporting BBS research</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {/* Hole Sponsor */}
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-gray-800">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">🚩</div>
                        <div>
                          <h4 className="font-black text-base sm:text-lg">Hole Sponsor</h4>
                          <p className="text-gray-500 text-xs sm:text-sm">Course Recognition</p>
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-2 sm:mb-3">$600</div>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Your business sign at a designated hole.</p>
                      <a
                        href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center text-sm sm:text-base py-2.5 sm:py-3 rounded-full transition"
                      >
                        Sponsor a Hole
                      </a>
                    </div>

                    {/* Sponsorship Team */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white relative">
                      <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-full shadow-lg">
                        BEST DEAL
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl">🏆</div>
                        <div>
                          <h4 className="font-black text-base sm:text-lg">Sponsorship Team</h4>
                          <p className="text-emerald-100 text-xs sm:text-sm">Play + Sponsor</p>
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">$1,000</div>
                      <p className="text-emerald-100 text-xs sm:text-sm mb-3 sm:mb-4">Foursome + hole sponsor + all meals!</p>
                      <a
                        href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-white text-emerald-600 font-bold text-center text-sm sm:text-base py-2.5 sm:py-3 rounded-full hover:bg-gray-100 transition"
                      >
                        Get the Best Package
                      </a>
                    </div>
                  </div>

                  {/* Last year stats */}
                  <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Last year we raised</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">$23,500+</p>
                    <p className="text-white font-bold text-sm sm:text-base mt-1 sm:mt-2">Help us beat it this year!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DONATE CTA ===== */}
      <section id="donate" className="relative bg-gray-900 py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Animated stars - fewer on mobile */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Glow effects - smaller on mobile */}
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-6 sm:mb-10">
            <img
              src="/images/playful/wyatt-pixar-celebrating.png"
              alt="Wyatt celebrating"
              className="w-36 sm:w-44 md:w-56 h-auto rounded-xl sm:rounded-2xl"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
            Help Wyatt<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">See His Future</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
            <span className="text-white font-bold">100% of your proceeds</span> go to the Bardet-Biedl Syndrome Foundation — a 501(c)(3) non-profit funding research to drive therapies for BBS forward.
          </p>

          <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Every dollar brings us closer to therapies that could save Wyatt's sight.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <a
              href="https://www.bardetbiedl.org/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-full shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1 transition-all"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform" />
                Donate Now
              </span>
            </a>
            <a
              href="https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur text-white font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-full hover:bg-white/20 transition"
            >
              Join Tournament
            </a>
          </div>

          {/* Contact for raffle donations */}
          <div className="mt-8 sm:mt-12 bg-white/5 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
            <p className="text-gray-300 text-center text-sm sm:text-base">
              <span className="block text-white font-bold mb-1 sm:mb-2">Want to donate for our raffle?</span>
              Contact Josh Vanden Heuvel at{" "}
              <a href="tel:920-427-6504" className="text-emerald-400 font-bold hover:text-emerald-300 transition">
                920-427-6504
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img src="/images/logo.png" alt="Birdies for BBS" className="h-10 sm:h-12 w-auto" />
                <span className="font-black text-white text-base sm:text-lg">Birdies for BBS</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                A charity golf tournament supporting the Bardet-Biedl Syndrome Foundation. 100% of proceeds fund BBS research.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <a href="#story" className="block text-gray-400 hover:text-emerald-400 transition text-sm">Meet Wyatt</a>
                <a href="#event" className="block text-gray-400 hover:text-emerald-400 transition text-sm">Event Details</a>
                <a href="#sponsors" className="block text-gray-400 hover:text-emerald-400 transition text-sm">Register / Sponsor</a>
                <a href="#donate" className="block text-gray-400 hover:text-emerald-400 transition text-sm">Donate</a>
              </div>
            </div>

            {/* Contact & Foundation */}
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Learn More</h4>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <a
                  href="https://www.bardetbiedl.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-emerald-400 transition"
                >
                  BBS Foundation Website →
                </a>
                <a
                  href="https://www.bardetbiedl.org/birdies-for-bbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-emerald-400 transition"
                >
                  Official Birdies for BBS Page →
                </a>
                <p className="text-gray-500 pt-1 sm:pt-2">
                  Questions? Contact Josh at{" "}
                  <a href="tel:920-427-6504" className="text-emerald-400 hover:text-emerald-300">
                    920-427-6504
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © 2026 Birdies for BBS. All proceeds benefit the{" "}
              <a href="https://www.bardetbiedl.org" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                Bardet-Biedl Syndrome Foundation
              </a>
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">Made with 💚 for Wyatt</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ===== CUSTOM SVG COMPONENTS =====

function Cloud({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 60" fill="none">
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>
      <g filter="url(#cloudShadow)">
        {/* Main fluffy cloud shape */}
        <ellipse cx="35" cy="40" rx="28" ry="18" fill="url(#cloudGrad)" />
        <ellipse cx="60" cy="30" rx="24" ry="22" fill="url(#cloudGrad)" />
        <ellipse cx="85" cy="40" rx="28" ry="18" fill="url(#cloudGrad)" />
        <ellipse cx="48" cy="22" rx="18" ry="16" fill="url(#cloudGrad)" />
        <ellipse cx="72" cy="22" rx="16" ry="14" fill="url(#cloudGrad)" />
        <ellipse cx="60" cy="45" rx="35" ry="14" fill="url(#cloudGrad)" />
      </g>
    </svg>
  );
}

function GolfFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 50 80" fill="none">
      {/* Pole */}
      <rect x="23" y="10" width="3" height="65" fill="#374151" />
      {/* Flag */}
      <path d="M26 10 L48 20 L26 30 Z" fill="#ef4444" />
      {/* Hole */}
      <ellipse cx="25" cy="75" rx="15" ry="5" fill="#1f2937" />
    </svg>
  );
}

function GolfBallIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="9" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="8" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="13" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
      <path d="M19 12l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
    </svg>
  );
}

function TrophyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function FlagIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function HandshakeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 17a4 4 0 0 1-4-4V5" />
      <path d="M7 5h4" />
      <path d="M13 7a4 4 0 0 1 4 4v8" />
      <path d="M17 19h-4" />
      <path d="m9 12 3 3 3-3" />
      <path d="m15 12-3 3-3-3" />
    </svg>
  );
}
