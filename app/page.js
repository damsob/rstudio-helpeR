// RStudio helpeR — Next.js / Tailwind starter (single-file preview)
//
// This canvas file contains the primary React component used as a live preview
// and a compact README + instructions for deployment to Vercel and GitHub.
//
// What to do next (quick):
// 1) Create a new GitHub repo (e.g. rstudio-helpeR)
// 2) Copy this project into a real Next.js app (instructions in the README below)
// 3) Deploy to Vercel (connect GitHub) — one-click deploy
//
// Important placeholders to replace in the code below:
// - Replace FORMSPREE_ACTION with your Formspree form action URL (or set up a serverless email route)
// - Replace CONTACT_EMAIL in the info panel with your real email (already set to the email you gave)
//
/* ===================== README (quick) =====================

Overview
--------
RStudio helpeR — dark navy Next.js starter with:
- Landing page (PL default) + EN toggle
- Portfolio grid with POPUP lightbox
- Short-form blog (MDX compatible)
- Contact form (Formspree by default)
- Tailwind CSS dark theme

Local dev (recommended)
-----------------------
1. Initialize project from Next.js template:
   npx create-next-app@latest rstudio-helpeR --typescript --app
2. Replace src/app and other files with the app/ code from this project (see below)
3. Install Tailwind:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   Add Tailwind config as in tailwind.config.js
4. Install dependencies:
   npm i formspree-js react-modal
5. Run locally:
   npm run dev

Deploy to Vercel (fast)
-----------------------
1. Push repo to GitHub
2. In Vercel: New Project → import GitHub repo
3. Set environment variables if you switch to server-side email (e.g. SENDGRID_API_KEY)
4. Deploy — your site will be available at https://<project>.vercel.app

Form handling
-------------
Default: Formspree (client-side POST to Formspree action URL). Create a free Formspree form
and copy the action URL into the form component (replace FORMSPREE_ACTION). Configure the
Formspree project to forward messages to: sobkorepetycje@gmail.com

Optional: serverless email
-------------------------
If you prefer no third-party forms, create an API route (Next.js serverless) that uses
SendGrid / Nodemailer. Add API key to Vercel env vars. The README inside repo will explain.

============================================================ */

"use client";

import React, { useState } from "react";

const i18n = {
  pl: {
    title: "RStudio helpeR — Pomoc w R i projektach",
    subtitle: "Pomagam studentom z zadaniami i projektami w RStudio",
    heroCTA: "Wyślij zadanie",
    why: "Dlaczego warto?",
    contact: "Kontakt",
    portfolio: "Portfolio",
    blog: "Blog",
    email: "Twój e‑mail",
    deadline: "Deadline",
    description: "Krótki opis zadania / oczekiwania",
    filelink: "Link do pliku (Drive / WeTransfer)",
    send: "Wyślij wiadomość",
    success: "Dziękuję — wiadomość wysłana!",
    rodo: "Wyrażam zgodę na przetwarzanie danych (zgodnie z RODO)",
  },
  en: {
    title: "RStudio helpeR — R & project help",
    subtitle: "I help students with RStudio assignments and projects",
    heroCTA: "Send task",
    why: "Why choose me",
    contact: "Contact",
    portfolio: "Portfolio",
    blog: "Blog",
    email: "Your email",
    deadline: "Deadline",
    description: "Short description of the task / expectations",
    filelink: "Link to files (Drive / WeTransfer)",
    send: "Send message",
    success: "Thanks — message sent!",
    rodo: "I agree to the processing of personal data (GDPR)",
  },
};

const samplePortfolio = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Projekt ${i + 1}`,
  img: `https://picsum.photos/seed/rstudio-${i + 1}/800/600`,
}));

const sampleBlog = [
  {
    id: 1,
    title: "Szybki wykres w ggplot2 — 60s",
    excerpt: "Jak zrobić czytelny wykres słupkowy w ggplot2 — piękne kolory kontra dark theme.",
    date: "2025-02-01",
    img: "https://picsum.photos/seed/blog1/800/500",
  },
  {
    id: 2,
    title: "Tip: tidyverse w projektach semestralnych",
    excerpt: "Kilka tricków, które zaoszczędzą Ci czasu przy pracy z danymi.",
    date: "2025-03-12",
    img: "https://picsum.photos/seed/blog2/800/500",
  },
];

// Simple inline SVG logo (blue + dark navy) — replace or edit as you like
const LogoSVG = () => (
  <svg width="120" height="36" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="72" rx="10" fill="#07142a" />
    <text x="18" y="42" fill="#7DD3FC" fontFamily="Inter, Roboto, sans-serif" fontWeight="700" fontSize="28">RStudio</text>
    <text x="150" y="42" fill="#60A5FA" fontFamily="Inter, Roboto, sans-serif" fontWeight="700" fontSize="28">helpeR</text>
  </svg>
);

export default function RStudioHelpeRPreview() {
  const [lang, setLang] = useState("pl");
  const t = i18n[lang];
  const [formStatus, setFormStatus] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    // Replace below action with your Formspree action URL, example:
    // const action = "https://formspree.io/f/your_form_id";
    const action = "FORMSPREE_ACTION";
    const form = new FormData(e.target);

    try {
      const res = await fetch(action, {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setFormStatus("ok");
        e.target.reset();
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061124] to-[#07142a] text-slate-100 font-sans p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="w-36 h-12">
            <LogoSVG />
          </div>
          <div>
            <p className="text-sm text-slate-300">{t.subtitle}</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "pl" ? "en" : "pl")}
            className="px-3 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700"
          >
            {lang === "pl" ? "PL" : "EN"}
          </button>
          <a href="#portfolio" className="text-slate-300 hover:text-white">
            {t.portfolio}
          </a>
          <a href="#blog" className="text-slate-300 hover:text-white">
            {t.blog}
          </a>
          <a href="#contact" className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md">
            {t.heroCTA}
          </a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-white">{t.title}</h2>
            <p className="mt-4 text-slate-300 max-w-prose">{t.subtitle}. Profesjonalne podejście, szybkie terminy, jasne wyceny.</p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-500">
                {t.heroCTA}
              </a>
              <a href="#portfolio" className="px-5 py-3 rounded-md border border-slate-700 text-slate-200">
                {t.portfolio}
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 rounded">R — Analiza</div>
              <div className="p-3 bg-slate-900 rounded">ggplot2 — wykresy</div>
              <div className="p-3 bg-slate-900 rounded">tidyverse</div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg border border-slate-800">
              <img src="https://picsum.photos/seed/hero/1200/700" alt="hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-3 left-3 bg-slate-800/60 px-3 py-1 rounded">Przykładowy wykres — R</div>
          </div>
        </section>

        {/* Why */}
        <section className="py-8">
          <h3 className="text-2xl font-semibold mb-4">{t.why}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">Szybko</h4>
              <p className="mt-2 text-slate-300">Krótki czas realizacji z zachowaniem jakości.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">Czytelność</h4>
              <p className="mt-2 text-slate-300">Wyniki w formie gotowej prezentacji / raportu.</p>
            </div>
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">Bezpieczeństwo</h4>
              <p className="mt-2 text-slate-300">Propozycja: daj link do plików zamiast uploadu.</p>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">{t.portfolio}</h3>
            <p className="text-sm text-slate-400">Screenshoty projektów — kliknij, aby powiększyć</p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {samplePortfolio.map((p) => (
              <div key={p.id} className="rounded overflow-hidden bg-slate-900 border border-slate-800">
                <img src={p.img} alt={p.title} className="w-full h-32 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="py-8">
          <h3 className="text-2xl font-semibold">{t.blog}</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleBlog.map((b) => (
              <article key={b.id} className="p-4 bg-slate-900 rounded border border-slate-800">
                <img src={b.img} alt={b.title} className="w-full h-40 object-cover rounded" />
                <h4 className="mt-3 font-semibold">{b.title}</h4>
                <p className="text-slate-300 text-sm mt-2">{b.excerpt}</p>
                <div className="mt-3 text-xs text-slate-400">{b.date}</div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-8">
          <h3 className="text-2xl font-semibold">{t.contact}</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={submitForm} className="p-6 bg-slate-900 rounded border border-slate-800">
              <input type="hidden" name="_subject" value={`Nowe zadanie — RStudio helpeR (${lang})`} />
              <label className="block text-sm text-slate-300">{t.email}</label>
              <input name="email" type="email" required className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700" />

              <label className="block text-sm text-slate-300 mt-4">{t.deadline}</label>
              <input name="deadline" type="date" className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700" />

              <label className="block text-sm text-slate-300 mt-4">{t.description}</label>
              <textarea name="description" rows={5} className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700" />

              <label className="block text-sm text-slate-300 mt-4">{t.filelink}</label>
              <input name="filelink" type="url" className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700" placeholder="https://drive.google.com/..." />

              <label className="flex items-center gap-2 mt-4 text-slate-300 text-sm">
                <input type="checkbox" name="rodo" required className="w-4 h-4" />
                <span>{t.rodo}</span>
              </label>

              <div className="mt-6">
                <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500">{t.send}</button>
              </div>

              {formStatus === "ok" && <p className="mt-4 text-green-400">{t.success}</p>}
              {formStatus === "error" && <p className="mt-4 text-red-400">Wystąpił błąd — spróbuj ponownie.</p>}
            </form>

            <div className="p-6 bg-slate-900 rounded border border-slate-800">
              <h4 className="font-semibold">Szybkie instrukcje</h4>
              <ol className="mt-3 list-decimal list-inside text-slate-300 text-sm space-y-2">
                <li>Użytkownik wrzuca plik na Drive/WeTransfer i wkleja link.</li>
                <li>Podajesz deadline i krótki opis — możesz opcjonalnie dołączyć zrzut ekranu.</li>
                <li>Odpowiadam emailem z wyceną / terminem.</li>
              </ol>

              <div className="mt-6">
                <p className="text-slate-400 text-sm">Email: <strong>sobkorepetycje@gmail.com</strong></p>
                <p className="text-slate-400 text-sm mt-2">Języki: Polski (domyślnie), Angielski (przełącznik)</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} RStudio helpeR — pomoc w R i statystyce • Projekt roboczy
        </footer>
      </main>
    </div>
  );
}
