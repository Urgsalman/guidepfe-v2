'use client'

import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import jsPDF from 'jspdf'

import {
  FileText,
  Plus,
  Trash2,
  Save,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Layers3,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'

import {
  useProject,
} from '@/components/context/ProjectContext'

type CV = {
  id: string
  title: string
  full_name: string
  email: string
  phone: string
  profile: string
  skills: string
  experience: string
  education: string
  projects: string
  qualities: string
  extracurricular: string
  created_at: string
}

export default function CVBuilderPage() {

  const {
    currentProject,
  } = useProject()

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [cvs, setCVs] =
    useState<CV[]>([])

  const [
    selectedCV,
    setSelectedCV,
  ] = useState<string | null>(null)

  const [fullName, setFullName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [profile, setProfile] =
    useState('')

  const [skills, setSkills] =
    useState('')

  const [experience, setExperience] =
    useState('')

  const [education, setEducation] =
    useState('')

  const [projects, setProjects] =
    useState('')

  const [qualities, setQualities] =
    useState('')

  const [
    extracurricular,
    setExtracurricular,
  ] = useState('')

  useEffect(() => {

    loadCVs()

  }, [])

  async function loadCVs() {

    setLoading(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      setLoading(false)

      return
    }

    const { data } =
      await supabase
        .from('cvs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false,
        })


    if (data) {

      setCVs(data)

      if (data.length > 0) {

        loadCVData(data[0])
      }
    }

    setLoading(false)
  }

  function loadCVData(cv: CV) {

    setSelectedCV(cv.id)

    setFullName(
      cv.full_name || ''
    )

    setEmail(
      cv.email || ''
    )

    setPhone(
      cv.phone || ''
    )

    setProfile(
      cv.profile || ''
    )

    setSkills(
      cv.skills || ''
    )

    setExperience(
      cv.experience || ''
    )

    setEducation(
      cv.education || ''
    )

    setProjects(
      cv.projects || ''
    )

    setQualities(
      cv.qualities || ''
    )

    setExtracurricular(
      cv.extracurricular || ''
    )
  }

  function resetForm() {

    setSelectedCV(null)

    setFullName('')
    setEmail('')
    setPhone('')
    setProfile('')
    setSkills('')
    setExperience('')
    setEducation('')
    setProjects('')
    setQualities('')
    setExtracurricular('')
  }

  function createNewCV() {

    resetForm()
  }

  async function saveCV() {

    setSaving(true)

    const {
      data: { user },
    } =
      await supabase.auth.getUser()

    if (!user) {

      setSaving(false)

      return
    }

    const payload = {

      user_id: user.id,

      project_id:
        currentProject?.id || null,

      title:
        fullName ||
        'CV sans titre',

      full_name: fullName,

      email,

      phone,

      profile,

      skills,

      experience,

      education,

      projects,

      qualities,

      extracurricular,
    }

    if (selectedCV) {

      await supabase
        .from('cvs')
        .update(payload)
        .eq('id', selectedCV)

    } else {

      const { data } =
        await supabase
          .from('cvs')
          .insert([payload])
          .select()

      if (
        data &&
        data.length > 0
      ) {

        setSelectedCV(
          data[0].id
        )
      }
    }

    window.dispatchEvent(
      new Event(
        'guidepfe-cv-updated'
      )
    )

    await loadCVs()

    alert(
      'CV sauvegardé avec succès'
    )

    setSaving(false)
  }

  async function deleteCV(
    id: string
  ) {

    const confirmDelete =
      confirm(
        'Supprimer ce CV ?'
      )

    if (!confirmDelete)
      return

    await supabase
      .from('cvs')
      .delete()
      .eq('id', id)

    if (selectedCV === id) {

      resetForm()
    }

    await loadCVs()

    window.dispatchEvent(
      new Event(
        'guidepfe-cv-updated'
      )
    )
  }

  function exportPDF() {

    const doc =
      new jsPDF()

    doc.setFontSize(22)

    doc.text(
      fullName || 'CV',
      20,
      20
    )

    doc.setFontSize(12)

    let y = 40

    const sections = [
      [
        'Email',
        email,
      ],
      [
        'Téléphone',
        phone,
      ],
      [
        'Profil',
        profile,
      ],
      [
        'Compétences',
        skills,
      ],
      [
        'Expériences',
        experience,
      ],
      [
        'Formation',
        education,
      ],
      [
        'Projets',
        projects,
      ],
      [
        'Qualités',
        qualities,
      ],
      [
        'Activités',
        extracurricular,
      ],
    ]

    sections.forEach(
      ([title, content]) => {

        doc.setFont(
          'helvetica',
          'bold'
        )

        doc.text(
          title,
          20,
          y
        )

        y += 8

        doc.setFont(
          'helvetica',
          'normal'
        )

        const lines =
          doc.splitTextToSize(
            content || '-',
            170
          )

        doc.text(
          lines,
          20,
          y
        )

        y +=
          lines.length * 7 + 10
      }
    )

    doc.save(
      `${fullName || 'cv'}.pdf`
    )
  }

  const score =
    useMemo(() => {

      let total = 0

      if (
        fullName.length > 3
      )
        total += 10

      if (
        email.length > 5
      )
        total += 10

      if (
        phone.length > 5
      )
        total += 10

      if (
        profile.length > 30
      )
        total += 15

      if (
        skills.length > 20
      )
        total += 15

      if (
        experience.length > 30
      )
        total += 15

      if (
        education.length > 20
      )
        total += 10

      if (
        projects.length > 20
      )
        total += 10

      if (
        qualities.length > 10
      )
        total += 5

      return Math.min(
        total,
        100
      )

    }, [
      fullName,
      email,
      phone,
      profile,
      skills,
      experience,
      education,
      projects,
      qualities,
    ])

  return (

    <section className="space-y-10">

      {/* HERO */}

      <div className="
        rounded-[40px]
        border
        border-slate-200
        bg-gradient-to-r
        from-blue-50
        to-purple-50
        p-10
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-8
        ">

          <div>

            <span className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-blue-100
              text-blue-700
              font-semibold
              text-sm
            ">

              <Sparkles size={16} />

              Générateur ATS intelligent

            </span>

            <h1 className="
              mt-6
              text-6xl
              font-black
              leading-tight
            ">
              CV ATS
              <br />

              <span className="
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                bg-clip-text
                text-transparent
              ">
                Builder
              </span>

            </h1>

            <p className="
              mt-6
              text-slate-600
              text-lg
            ">
              Créez plusieurs CV professionnels optimisés ATS.
            </p>

          </div>

          <button
            onClick={createNewCV}
            className="
              flex
              items-center
              gap-3
              px-6
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              font-semibold
              hover:scale-105
              transition
            "
          >

            <Plus size={20} />

            Nouveau CV

          </button>

        </div>

      </div>

      {/* LISTE CVS */}

      <div className="
        grid
        md:grid-cols-3
        gap-5
      ">

        {cvs.map((cv) => (

          <div
            key={cv.id}
            className={`
              rounded-3xl
              border
              p-6
              transition
              ${
                selectedCV === cv.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white'
              }
            `}
          >

            <button
              onClick={() =>
                loadCVData(cv)
              }
              className="w-full text-left"
            >

              <h3 className="
                text-xl
                font-black
              ">
                {cv.title}
              </h3>

              <p className="
                mt-2
                text-slate-500
              ">
                {cv.email}
              </p>

            </button>

            <button
              onClick={() =>
                deleteCV(cv.id)
              }
              className="
                mt-5
                flex
                items-center
                gap-2
                text-red-500
                font-semibold
              "
            >

              <Trash2 size={18} />

              Supprimer

            </button>

          </div>

        ))}

      </div>

      {/* CONTENT */}

      <div className="
        grid
        xl:grid-cols-[1fr_380px]
        gap-8
      ">

        {/* FORM */}

        <div className="
          bg-white
          rounded-[40px]
          border
          border-slate-200
          p-10
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <div className="
              w-16
              h-16
              rounded-3xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              flex
              items-center
              justify-center
            ">

              <FileText size={30} />

            </div>

            <div>

              <h2 className="
                text-4xl
                font-black
              ">
                Informations
              </h2>

              <p className="
                text-slate-500
                mt-2
              ">
                Construisez votre CV intelligent.
              </p>

            </div>

          </div>

          <div className="
            mt-10
            space-y-7
          ">

            <InputField
              label="Nom complet"
              value={fullName}
              onChange={setFullName}
              icon={User}
            />

            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">

              <InputField
                label="Email"
                value={email}
                onChange={setEmail}
                icon={Mail}
              />

              <InputField
                label="Téléphone"
                value={phone}
                onChange={setPhone}
                icon={Phone}
              />

            </div>

            <TextareaField
              label="Profil"
              value={profile}
              onChange={setProfile}
            />

            <TextareaField
              label="Compétences"
              value={skills}
              onChange={setSkills}
            />

            <TextareaField
              label="Expériences professionnelles"
              value={experience}
              onChange={setExperience}
            />

            <TextareaField
              label="Formation"
              value={education}
              onChange={setEducation}
            />

            <TextareaField
              label="Projets réalisés"
              value={projects}
              onChange={setProjects}
            />

            <TextareaField
              label="Qualités"
              value={qualities}
              onChange={setQualities}
            />

            <TextareaField
              label="Expériences parauniversitaires"
              value={extracurricular}
              onChange={
                setExtracurricular
              }
            />

            <div className="
              flex
              flex-wrap
              gap-4
              pt-4
            ">

              <button
                onClick={exportPDF}
                className="
                  flex
                  items-center
                  gap-3
                  px-8
                  py-4
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  font-semibold
                "
              >

                <Download size={20} />

                Export PDF

              </button>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="
          space-y-6
        ">

          {/* SCORE */}

          <div className="
            bg-white
            rounded-[32px]
            border
            border-slate-200
            p-8
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  text-slate-500
                ">
                  ATS Score
                </p>

                <h2 className="
                  text-7xl
                  font-black
                  mt-3
                ">
                  {score}%
                </h2>

              </div>

              <div className="
                w-16
                h-16
                rounded-2xl
                bg-red-100
                text-red-500
                flex
                items-center
                justify-center
              ">

                {
                  score >= 70
                    ? (
                      <CheckCircle2 />
                    )
                    : (
                      <AlertCircle />
                    )
                }

              </div>

            </div>

            <div className="
              mt-6
              h-4
              rounded-full
              bg-slate-100
              overflow-hidden
            ">

              <div
                style={{
                  width:
                    `${score}%`,
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                "
              />

            </div>

          </div>

          {/* PREVIEW */}

          <div className="
            bg-white
            rounded-[32px]
            border
            border-slate-200
            p-8
          ">

            <h2 className="
              text-4xl
              font-black
            ">
              Aperçu CV
            </h2>

            <div className="
              mt-8
              space-y-7
            ">

              <div>

                <h3 className="
                  text-3xl
                  font-black
                ">
                  {
                    fullName ||
                    'Votre nom'
                  }
                </h3>

                <p className="
                  mt-2
                  text-slate-500
                ">
                  {email}
                </p>

                <p className="
                  text-slate-500
                ">
                  {phone}
                </p>

              </div>

              <PreviewSection
                title="Profil"
                icon={User}
                content={profile}
              />

              <PreviewSection
                title="Compétences"
                icon={Layers3}
                content={skills}
              />

              <PreviewSection
                title="Expérience"
                icon={Briefcase}
                content={experience}
              />

              <PreviewSection
                title="Formation"
                icon={GraduationCap}
                content={education}
              />

              <PreviewSection
                title="Qualités"
                icon={Award}
                content={qualities}
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}

function InputField({
  label,
  value,
  onChange,
  icon: Icon,
}: any) {

  return (

    <div>

      <label className="
        flex
        items-center
        gap-2
        font-semibold
        mb-3
      ">

        <Icon size={18} />

        {label}

      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
          py-4
          outline-none
          focus:border-blue-500
        "
      />

    </div>

  )
}

function TextareaField({
  label,
  value,
  onChange,
}: any) {

  return (

    <div>

      <label className="
        font-semibold
        block
        mb-3
      ">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        rows={5}
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          px-5
          py-4
          outline-none
          resize-none
          focus:border-blue-500
        "
      />

    </div>

  )
}

function PreviewSection({
  title,
  icon: Icon,
  content,
}: any) {

  return (

    <div>

      <div className="
        flex
        items-center
        gap-2
      ">

        <Icon size={18} />

        <h4 className="
          text-xl
          font-black
        ">
          {title}
        </h4>

      </div>

      <p className="
        mt-3
        text-slate-600
        leading-relaxed
        whitespace-pre-wrap
      ">
        {
          content ||
          'Aucune information'
        }
      </p>

    </div>

  )
}