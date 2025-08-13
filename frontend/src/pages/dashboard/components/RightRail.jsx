export default function RightRail({ events = [], chats = [], contacts = [] }) {
  return (
    <>
      <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
        <h4 className="font-semibold text-emerald-900 mb-3">Upcoming events</h4>
        <div className="space-y-3">
          {events.length ? events.map((e) => (
            <div key={e.id} className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
              <div className="text-sm font-medium text-emerald-900">{e.title}</div>
              <div className="text-xs text-emerald-900/70">{e.when}</div>
            </div>
          )) : <div className="text-sm text-emerald-900/70">No events yet.</div>}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
        <h4 className="font-semibold text-emerald-900 mb-3">Community chats</h4>
        <ul className="space-y-2">
          {(chats.length ? chats : ["Dog Lovers", "Music in the City", "Sneaker Freaks"]).map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span className="h-6 w-6 rounded-full bg-emerald-200 inline-block" />
              <span className="text-emerald-900">{typeof c === "string" ? c : c.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
        <h4 className="font-semibold text-emerald-900 mb-3">Online contacts</h4>
        <ul className="space-y-2">
          {(contacts.length ? contacts : ["Mark", "Ethan", "Ava", "Pablo"]).map((n, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="relative h-7 w-7 rounded-full bg-emerald-200 inline-block">
                <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </span>
              <span className="text-sm text-emerald-900">{typeof n === "string" ? n : n.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
