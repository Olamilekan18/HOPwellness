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

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-green-700">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.6),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-14 py-10 flex flex-col-reverse lg:flex-row items-center gap-14">
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Build Habits That Actually Stick
            </h1>
            <p className="mt-6 text-base md:text-lg text-emerald-50/90 leading-relaxed max-w-xl">
              HopWellness blends behavior science, gentle accountability and
              adaptive insights so every small action compounds into lasting
              health.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleGetStarted}
                className="cursor-pointer bg-white text-green-700 font-semibold px-7 py-3 rounded-full shadow hover:bg-green-50 transition"
              >
                Get Started
              </button>
              <a
                href="#how-it-works"
                className="px-7 py-3 rounded-full border border-white/40 text-white/90 hover:bg-white/10 transition text-sm font-medium"
              >
                How It Works
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "10K+", v: "Users" },
                { k: "92%", v: "Consistency" },
                { k: "24/7", v: "AI Support" },
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <div className="text-2xl font-bold">{s.k}</div>
                  <div className="text-xs uppercase tracking-wide text-emerald-100">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg"
                className="w-full h-full object-cover rounded-3xl"
                alt="hero Image"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-tr from-white/20 to-transparent blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* DISTINCT VALUE */}
      <section className="bg-white py-20 px-6 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-[11px] font-semibold tracking-wider bg-green-100 text-green-700 border border-green-200">
              WHY HOPWELLNESS
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Science + Support + Simplicity
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Not another tracker. A guided ecosystem that helps you understand,
              adapt and sustain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                title: "Personalized Loops",
                body: "Adaptive nudges tuned to your rhythm—never spammy, always useful.",
                icon: "🧭",
              },
              {
                title: "Whole‑Person Metrics",
                body: "Sleep, mood, recovery, habits—context that reveals real patterns.",
                icon: "📊",
              },
              {
                title: "Community Momentum",
                body: "Micro‑cheers, streak squads and accountability done kindly.",
                icon: "🤝",
              },
              {
                title: "Actionable Insights",
                body: "Plain‑language explanations that turn data into direction.",
                icon: "💡",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative rounded-2xl border border-green-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-3xl">{card.icon}</div>
                  <h3 className="mt-4 font-semibold text-green-700 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="how-it-works"
        className="relative py-24 px-6 md:px-14 bg-gradient-to-b from-green-50 via-white to-white"
      >
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(5,150,105,0.15),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-[11px] font-semibold tracking-wider bg-green-100 text-green-700 border border-green-200">
              SIMPLE FLOW
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              A Loop That Reinforces Itself
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Each phase feeds the next—clarity creates action, action creates
              data, data fuels insight.
            </p>
          </div>
          <ol className="grid md:grid-cols-4 gap-7">
            {[
              {
                step: "01",
                title: "Onboard",
                text: "Context, goals & baselines.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "Track",
                text: "Seamless multi‑metric logging.",
                icon: "📝",
              },
              {
                step: "03",
                title: "Adapt",
                text: "AI + behavioral micro‑nudges.",
                icon: "⚙️",
              },
              {
                step: "04",
                title: "Sustain",
                text: "Celebrate, refine, repeat.",
                icon: "🌱",
              },
            ].map((s, i) => (
              <li
                key={s.step}
                className="group relative rounded-3xl bg-white border border-green-100 p-7 shadow-sm hover:shadow-xl transition"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-semibold tracking-widest text-green-600/80">
                      STEP {s.step}
                    </span>
                    <span className="text-2xl">{s.icon}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {s.text}
                  </p>
                  {i < 3 && (
                    <span className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] text-green-400">
                      →
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl border border-green-100 bg-white/70 backdrop-blur-sm p-10 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                Progress You Feel & See
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                The platform converts routine check‑ins into adaptive
                adjustments. Less guessing, more intentional momentum.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span>✔</span>
                  <span>Pattern surfaced before burnout.</span>
                </li>
                <li className="flex gap-2">
                  <span>✔</span>
                  <span>Contextual micro‑recommendations.</span>
                </li>
                <li className="flex gap-2">
                  <span>✔</span>
                  <span>Celebrated streaks that reinforce identity.</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleGetStarted}
                  className="cursor-pointer px-7 py-3 rounded-full text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition"
                >
                  Start Now
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-tr from-green-100 via-emerald-50 to-white border border-green-100 p-6 flex flex-col justify-center">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "↑ 18%", v: "Sleep Quality" },
                    { k: "2.3x", v: "Habit Retention" },
                    { k: "-27%", v: "Energy Dips" },
                  ].map((m) => (
                    <div
                      key={m.v}
                      className="rounded-xl bg-white shadow-sm p-4 border border-green-100"
                    >
                      <div className="text-lg font-bold text-green-600">
                        {m.k}
                      </div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-gray-500 text-center">
                  Illustrative sample improvements based on aggregated early
                  cohorts.
                </p>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-emerald-200/40 to-transparent blur-2xl rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="bg-gradient-to-r from-green-700 to-emerald-600 py-20 px-6 md:px-14 text-center text-white"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Ready To Build Your Health Operating System?
          </h2>
          <p className="text-emerald-100 leading-relaxed mb-8">
            Join a community turning tiny, consistent actions into compounding
            wellness.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 rounded-full bg-white text-green-700 font-semibold shadow hover:bg-green-50 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer color="bg-white border-t border-green-100 text-gray-700" />
    </>
  );
}
