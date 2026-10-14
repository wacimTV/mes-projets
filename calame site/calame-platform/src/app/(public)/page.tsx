import Link from 'next/link';
import Image from 'next/image';

const STEPS = [
  ['Prendre rendez-vous', 'Demandez un créneau pour votre test de niveau.'],
  ['Test de niveau', "Un échange d'environ 30 minutes en visioconférence, à l'oral et à l'écrit."],
  ['Validation du niveau', "L'administration pédagogique valide votre niveau (A, B ou C) à partir du compte rendu du professeur."],
  ['Création du compte', "L'académie crée votre accès et vous envoie une invitation."],
  ['Paiement', 'Réglez la formation en une, deux ou trois fois.'],
  ['Accès à la classe', 'Cours en direct, exercices, ressources et suivi pédagogique.'],
];

export default function HomePage() {
  return (
    <>
      <section className="bg-[var(--green-700)] text-white">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div className="reveal">
            <p className="eyebrow !text-[#f0c9a0]">Formation en arabe à distance</p>
            <h1 className="!text-white">Apprenez l&apos;arabe, parlez-le, échangez en classe.</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-[#e3ece3]">
              Une formation de trois mois, six heures de cours par semaine, avec une place centrale accordée au dialogue oral et un accompagnement pédagogique personnalisé.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/rendez-vous" className="btn btn-accent">Prendre rendez-vous pour le test de niveau</Link>
              <Link href="/formation" className="btn border-white/50 text-white hover:bg-white/10">Découvrir la formation</Link>
            </div>
          </div>
          <div className="reveal">
            <Image src="/assets/logo-calame.jpeg" alt="Logo CALAME – قَلَم : Apprenez, Parlez, Échangez" width={800} height={533} className="w-full rounded-2xl shadow-2xl ring-1 ring-white/20" priority />
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['3 mois', 'de formation initiale'],
            ['6 h / semaine', 'soit 72 heures de cours en direct'],
            ['10 à 12', 'élèves par classe, avec leur professeur'],
            ['430 €', 'payables en 1, 2 ou 3 fois'],
          ].map(([a, b]) => (
            <div key={a} className="card card-hover"><div className="stat">{a}</div><p className="muted mt-1 text-sm">{b}</p></div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-10 pb-14 md:grid-cols-2">
        <div>
          <p className="eyebrow">Pour qui ?</p>
          <h2>Adolescents à partir de 15 ans et adultes</h2>
          <p className="mt-3 muted">La formation s&apos;adresse principalement à des débutants. Trois niveaux permettent de constituer des classes homogènes :</p>
          <ul className="mt-4 grid gap-3">
            <li className="card"><strong>Niveau A</strong> — vous ne connaissez pas l&apos;alphabet, vous ne lisez ni n&apos;écrivez l&apos;arabe et vous ne le parlez pas.</li>
            <li className="card"><strong>Niveau B</strong> — vous lisez et écrivez difficilement, mais vous ne parlez pas arabe.</li>
            <li className="card"><strong>Niveau C</strong> — vous lisez et écrivez à un niveau débutant et avez quelques notions d&apos;arabe parlé.</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Nos priorités pédagogiques</p>
          <h2>Comprendre, dialoguer, lire, écrire</h2>
          <ul className="prose-block mt-4">
            <li>Développer la compréhension orale</li>
            <li>Favoriser le dialogue en classe</li>
            <li>Améliorer la lecture et l&apos;écriture</li>
            <li>Encourager le travail personnel entre les séances</li>
            <li>Suivre l&apos;assiduité et donner des appréciations personnalisées</li>
          </ul>
          <p className="muted text-sm">
            CALAME ne promet pas un bilinguisme en trois mois : la formation pose des bases solides et un accompagnement régulier.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <p className="eyebrow">Comment rejoindre l&apos;académie</p>
          <h2>Six étapes, de la première visite au premier cours</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="card card-hover">
                <span className="stat !text-[var(--magenta-600)]">{i + 1}</span>
                <h3 className="mt-2">{t}</h3>
                <p className="muted mt-1 text-sm">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8"><Link href="/rendez-vous" className="btn btn-primary">Demander un rendez-vous</Link></div>
        </div>
      </section>
    </>
  );
}
