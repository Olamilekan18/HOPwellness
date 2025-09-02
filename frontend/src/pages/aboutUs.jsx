import HomeNav from "../componet/header";
import Footer from "../componet/home/footer";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();
  function handleGetStarted() {
    navigate("/signup");
  }

  return (
    <>
      <HomeNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-500 to-green-700" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-14 py-24 flex flex-col items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            Wellness. Simplified.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-green-50/90 leading-relaxed">
            HopWellness helps you build sustainable habits with clarity,
            community, and guidance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-white cursor-pointer text-green-700 font-medium px-7 py-3 rounded-full shadow hover:shadow-lg hover:bg-green-50 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 md:px-14 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { k: "10K+", v: "Active Users" },
            { k: "92%", v: "Habit Success" },
            { k: "50+", v: "Expert Resources" },
            { k: "24/7", v: "AI Support" },
          ].map((item) => (
            <div key={item.k} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-green-600">
                {item.k}
              </span>
              <span className="mt-1 text-sm md:text-base text-gray-600">
                {item.v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Us / Mission • Vision • Values */}
      <section
        id="about"
        className="relative bg-gradient-to-b from-green-50 via-white to-white py-24 px-6 md:px-14"
      >
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(5,150,105,0.15),transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-[11px] font-semibold tracking-wider bg-green-100 text-green-700 border border-green-200">
              ABOUT US
            </span>
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              About HopWellness
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              We blend behavioral science, community support, and intelligent
              insights to help you translate intention into sustainable wellness
              progress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mission",
                body: "Empower healthier lives by making wellness actionable, personalized, and encouraging—one consistent habit at a time.",
                icon: "🚀",
                accent: "from-emerald-500/15",
              },
              {
                title: "Vision",
                body: "A world where daily self‑care feels natural, rewarding, and community-fueled—turning small wins into lifelong momentum.",
                icon: "🌍",
                accent: "from-green-500/15",
              },
              {
                title: "Values",
                body: "Authenticity, inclusivity, measurable impact, and continuous, data‑informed improvement for real human growth.",
                icon: "💚",
                accent: "from-teal-500/15",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur border border-green-100 shadow-sm hover:shadow-xl transition"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-green-200/40 to-transparent blur-2xl" />
                <div className="relative p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl drop-shadow-sm select-none">
                      {card.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-green-700 tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-gray-600">
                    {card.body}
                  </p>
                  <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-x-110 origin-left transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 md:px-14">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-white" />
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_20%_25%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.15),transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider bg-green-100 text-green-700 border border-green-200">
              SIMPLE • ACTIONABLE • SUSTAINABLE
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              How HopWellness Guides Your Growth
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
              A structured, supportive loop that turns small daily wins into
              lasting transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-7">
            {[
              {
                step: "01",
                title: "Onboard",
                text: "Define goals, lifestyle context, and baseline metrics.",
                icon: "🎯",
                accent: "from-emerald-500/15 to-transparent",
              },
              {
                step: "02",
                title: "Track",
                text: "Log habits, sleep, nutrition, mood & recovery effortlessly.",
                icon: "📊",
                accent: "from-green-500/15 to-transparent",
              },
              {
                step: "03",
                title: "Improve",
                text: "Adaptive insights, pattern surfacing, and gentle nudges.",
                icon: "⚡",
                accent: "from-teal-500/15 to-transparent",
              },
              {
                step: "04",
                title: "Sustain",
                text: "Community accountability, streaks & progress celebrations.",
                icon: "🌱",
                accent: "from-lime-500/15 to-transparent",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl bg-white border border-green-100 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-green-200/40 to-transparent blur-2xl" />
                <div className="relative p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-semibold tracking-widest text-green-600/80">
                      STEP {s.step}
                    </span>
                    <span className="text-2xl md:text-3xl drop-shadow-sm select-none">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-gray-600">
                    {s.text}
                  </p>
                  <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 group-hover:scale-x-110 origin-left transition-transform" />
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 translate-y-[-50%] w-6 h-6">
                      <span className="absolute inset-0 flex items-center justify-center text-green-400">
                        →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl border border-green-100 bg-white/70 backdrop-blur-sm px-8 py-10 shadow-sm">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                Progress You Can Feel & Measure
              </h3>
              <p className="mt-3 text-gray-600 max-w-xl">
                Every interaction feeds a feedback loop—clarity, action,
                insight, refinement. Your routine compounds into lasting
                wellness.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGetStarted}
                className="px-6 cursor-pointer py-3 rounded-full text-sm font-semibold border border-green-300 text-green-700 bg-white hover:bg-green-50 transition"
              >
                Start Your Flow
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-700 to-emerald-600 py-16 px-6 md:px-14 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Join the HopWellness Journey
          </h2>
          <p className="text-green-100 leading-relaxed mb-8">
            Build momentum, celebrate progress, and unlock a healthier you with
            data-backed guidance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 rounded-full bg-white text-green-700 font-semibold shadow hover:bg-green-50 transition"
            >
              Get Started
            </button>
            <a
              href="#mission"
              className="px-8 py-3 rounded-full border border-white/40 hover:bg-white/10 transition"
            >
              Explore More
            </a>
          </div>
        </div>
      </section>

      <Footer color="bg-white border-t border-green-100 text-gray-700" />
    </>
  );
}
