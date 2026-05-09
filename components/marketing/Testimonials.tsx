const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Étudiante Master',
    text: 'GuidePFE a complètement changé ma manière de préparer mon mémoire.',
  },
  {
    name: 'Yassine A.',
    role: 'Étudiant ingénieur',
    text: 'Le planning intelligent et l’assistant IA sont incroyables.',
  },
  {
    name: 'Nadia K.',
    role: 'Doctorante',
    text: 'Une plateforme moderne et professionnelle pour réussir son PFE.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-32">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            Témoignages
          </span>

          <h2 className="mt-5 text-5xl md:text-7xl font-black text-slate-950">
            Ils utilisent
            <span className="gradient-text"> GuidePFE</span>
          </h2>

        </div>

        <div className="
          mt-24
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        ">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="card-premium p-10 card-hover"
            >

              <div className="flex items-center gap-4">

                <div className="
                  w-16
                  h-16
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                " />

                <div>

                  <h3 className="text-xl font-black text-slate-950">
                    {item.name}
                  </h3>

                  <p className="text-slate-500">
                    {item.role}
                  </p>

                </div>

              </div>

              <p className="
                mt-8
                text-slate-600
                text-lg
                leading-relaxed
              ">
                “{item.text}”
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}