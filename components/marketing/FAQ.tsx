export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-32"
    >

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Questions fréquentes
          </span>

          <h2 className="mt-5 text-5xl md:text-7xl font-black text-slate-950">
            FAQ
          </h2>

        </div>

        <div className="mt-20 space-y-6">

          {[
            {
              q: 'GuidePFE utilise-t-il réellement une IA ?',
              a: 'Oui, la plateforme intègre une intelligence artificielle académique.',
            },
            {
              q: 'Puis-je générer un CV ATS ?',
              a: 'Oui, un générateur professionnel ATS est intégré.',
            },
            {
              q: 'La plateforme aide-t-elle pour la soutenance ?',
              a: 'Oui, méthodologie, organisation et préparation sont incluses.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="card-premium p-8"
            >

              <h3 className="text-2xl font-black text-slate-950">
                {item.q}
              </h3>

              <p className="mt-4 text-slate-600 leading-relaxed">
                {item.a}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}