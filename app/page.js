"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ======= i18n =======
const i18n = {
  pl: {
    title: "RStudio helpeR — Pomoc z programowaniem w R i projektach",
    subtitle: "Pomoc z zadaniami i projektami w RStudio",
    lead: "Profesjonalne podejście, szybkie terminy, jasne wyceny.",
    heroCTA: "Wyślij zadanie",
    why: "Dlaczego warto?",
    contact: "Kontakt",
    portfolio: "Portfolio",
    blog: "Blog",
    email: "Twój adres e-mail:",
    deadline: "Deadline:",
    description: "Krótki opis zadania:",
    filelink: "Link do pliku (OneDrive/iCloud/Dysk Google/Dropbox):",
    send: "Wyślij wiadomość",
    success: "Dziękuję — wiadomość wysłana!",
    rodo: "Wyrażam zgodę na przetwarzanie danych (zgodnie z RODO)",
    portfolioHint: "Screenshoty projektów — kliknij obrazek, aby powiększyć",
    tile1Title: "Szybko",
    tile1Desc: "Możliwie krótki czas realizacji z zachowaniem jakości.",
    tile2Title: "Czytelnie",
    tile2Desc: "Projekty w formie gotowego kodu lub raportu.",
    tile3Title: "Bezpiecznie",
    tile3Desc: "Zero ryzyka — płacisz dopiero, gdy zobaczysz rozwiązanie.",
    quickTitle: "Szybkie instrukcje",
    quick1: "Użytkownik wrzuca plik na OneDrive/iCloud/Dysk Google/Dropbox i wkleja link.",
    quick2:
      "Podajesz deadline i krótki opis — możesz opcjonalnie dołączyć zrzut ekranu.",
    quick3: "Odpowiadam emailem z wyceną / terminem.",
    tag1: "Analiza danych",
    tag2: "Wizualizacja",
    tag3: "Automatyzacja",
  },
  en: {
    title: "RStudio helpeR — Help with R programming and projects",
    subtitle: "Support with RStudio tasks and data projects",
    lead: "Professional approach, fast turnaround, transparent pricing.",
    heroCTA: "Send task",
    why: "Why choose us?",
    contact: "Contact",
    portfolio: "Portfolio",
    blog: "Blog",
    email: "Your email address:",
    deadline: "Deadline:",
    description: "Short description of your task:",
    filelink: "Link to file (OneDrive/iCloud/Google Disc/Dropbox):",
    send: "Send message",
    success: "Thank you — your message has been sent!",
    rodo: "I agree to the processing of personal data (GDPR compliant)",
    portfolioHint: "Project screenshots — click an image to enlarge",
    tile1Title: "Fast",
    tile1Desc: "Short turnaround times while maintaining quality.",
    tile2Title: "Clear",
    tile2Desc: "Projects delivered as clean code or ready-to-use reports.",
    tile3Title: "Safe",
    tile3Desc: "No risk — pay only after you see the final solution.",
    quickTitle: "Quick instructions",
    quick1: "Upload your file to OneDrive/iCloud/Google Disc/Dropbox and paste the link.",
    quick2:
      "Provide your deadline and a short description — optionally attach a screenshot.",
    quick3: "I reply by email with the quote and delivery date.",
    tag1: "Data analysis",
    tag2: "Visualization",
    tag3: "Automation",
  },
};

// ======= Portfolio items =======
const portfolioItems = {
  pl: [
    { id: 1, title: "Analiza danych – RMarkdown", img: "/images/portfolio/post1.png" },
    { id: 2, title: "Wizualizacja danych – ggplot2", img: "/images/portfolio/post2.png" },
    { id: 3, title: "Projekt – Shiny Dashboard", img: "/images/portfolio/post3.png" },
    { id: 4, title: "Eksploracja danych – wykresy", img: "/images/portfolio/post4.png" },
    { id: 5, title: "Analiza statystyczna – raport PDF", img: "/images/portfolio/post5.png" },
    { id: 6, title: "Korelacje – heatmap w R", img: "/images/portfolio/post6.png" },
  ],
  en: [
    { id: 1, title: "Data analysis – RMarkdown", img: "/images/portfolio/post1.png" },
    { id: 2, title: "Data visualization – ggplot2", img: "/images/portfolio/post2.png" },
    { id: 3, title: "Project – Shiny Dashboard", img: "/images/portfolio/post3.png" },
    { id: 4, title: "Exploratory charts – data plots", img: "/images/portfolio/post4.png" },
    { id: 5, title: "Statistical analysis – report PDF", img: "/images/portfolio/post5.png" },
    { id: 6, title: "Correlations – heatmap in R", img: "/images/portfolio/post6.png" },
  ],
};

// ======= Lightbox =======
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full animate-[zoomIn_.15s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700"
        >
          ✕
        </button>
        <img
          src={src}
          alt={alt || "preview"}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
      <style jsx global>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.98);
            opacity: 0.9;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function RStudioHelpeRPreview() {
	const [activeStep, setActiveStep] = useState(0);
	useEffect(() => {
	  const timer = setInterval(() => {
		setActiveStep((prev) => (prev + 1) % 4);
	  }, 2500);
	  return () => clearInterval(timer);
	}, []);
	
  const [lang, setLang] = useState("pl");
  const t = i18n[lang];
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [formStatus, setFormStatus] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await fetch("FORMSPREE_ACTION", {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      setFormStatus(res.ok ? "ok" : "error");
      e.target.reset();
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061124] to-[#07142a] text-slate-100 p-6">
      {/* ======= Header ======= */}
      <header className="max-w-5xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="RStudio helpeR"
            width={200}
            height={60}
            priority
          />
          <p className="text-orange-500 text-lg font-semibold">{t.subtitle}</p>
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
          {/* <a href="#blog" className="text-slate-300 hover:text-white">{t.blog}</a> */}
          <a
            href="#contact"
            className="bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-md text-white font-semibold"
          >
            {t.heroCTA}
          </a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* ======= Hero ======= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div>
            <h2 className="text-4xl font-bold">{t.title}</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              {t.subtitle}.<br />
              {t.lead}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                className="px-5 py-3 rounded-md bg-orange-500 hover:bg-orange-400 text-white font-semibold"
              >
                {t.heroCTA}
              </a>
              <a
                href="#portfolio"
                className="px-5 py-3 rounded-md border border-slate-700 text-slate-200"
              >
                {t.portfolio}
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded">
                <span className="text-2xl">📊</span>
                <p className="mt-2 text-sm text-slate-300">{t.tag1}</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <span className="text-2xl">📈</span>
                <p className="mt-2 text-sm text-slate-300">{t.tag2}</p>
              </div>
              <div className="p-3 bg-slate-900 rounded">
                <span className="text-2xl">💻</span>
                <p className="mt-2 text-sm text-slate-300">{t.tag3}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full h-[320px] md:h-[380px] rounded-lg overflow-hidden shadow-lg border border-slate-800">
              <img
                src="images/hero.png"
                alt="hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ======= Why ======= */}
        <section className="py-8">
          <h3 className="text-2xl font-semibold mb-4">{t.why}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">{t.tile1Title}</h4>
              <p className="mt-2 text-slate-300">{t.tile1Desc}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">{t.tile2Title}</h4>
              <p className="mt-2 text-slate-300">{t.tile2Desc}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded">
              <h4 className="font-semibold">{t.tile3Title}</h4>
              <p className="mt-2 text-slate-300">{t.tile3Desc}</p>
            </div>
          </div>
        </section>

		{/* ======= Proces ======= */}
		<section id="process" className="py-12">
		  <h3 className="text-2xl font-semibold mb-8 text-left text-orange-400">
			Jak to działa?
		  </h3>

		  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
			{[
			  { id: 1, title: "Wysyłasz zadanie", icon: "📤" },
			  { id: 2, title: "Otrzymujesz potwierdzenie", icon: "📩" },
			  { id: 3, title: "Płacisz po akceptacji rozwiązania", icon: "💳" },
			  { id: 4, title: "Dostajesz rozwiązanie", icon: "📘" },
			].map((step, i) => (
			  <div
				key={step.id}
				className={`p-6 rounded-lg border transition-all duration-700 ease-in-out transform w-full
				  ${
					activeStep === i
					  ? "bg-orange-500/20 border-orange-400 shadow-orange-500/30 shadow-lg scale-[1.05] text-orange-200"
					  : "bg-slate-900 border-orange-500/60 hover:bg-slate-800/80 text-orange-300"
				  }`}
				onMouseEnter={() => setActiveStep(i)}
			  >
				<div
				  className={`text-3xl mb-3 transition-colors duration-500 ${
					activeStep === i ? "text-orange-300" : "text-orange-400"
				  }`}
				>
				  {step.icon}
				</div>

				<h4
				  className="font-semibold text-base leading-snug break-words"
				  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
				>
				  {step.title}
				</h4>
			  </div>
			))}
		  </div>
		</section>

        {/* ======= Portfolio ======= */}
        <section id="portfolio" className="py-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">{t.portfolio}</h3>
            <p className="text-sm text-slate-400">{t.portfolioHint}</p>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {portfolioItems[lang].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setLightboxSrc(p.img);
                  setLightboxAlt(p.title);
                }}
                className="group bg-slate-900 p-3 rounded-lg border border-slate-700 shadow-lg hover:border-orange-500 transition"
              >
                <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-700 rounded-full"></div>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded-b-md transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="h-2 bg-slate-800 rounded-b-lg"></div>
                </div>
                <p className="text-center text-slate-300 text-sm mt-3 font-medium group-hover:text-orange-400 transition">
                  {p.title}
                </p>
              </button>
            ))}
          </div>
          <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={() => setLightboxSrc(null)} />
        </section>

        {/* ======= Contact ======= */}
        <section id="contact" className="py-8">
          <h3 className="text-2xl font-semibold">{t.contact}</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <form
              onSubmit={submitForm}
              className="p-6 bg-slate-900 rounded border border-slate-800"
            >
              <label className="block text-sm text-slate-300">{t.email}</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700"
              />
              <label className="block text-sm text-slate-300 mt-4">
                {t.deadline}
              </label>
              <input
                name="deadline"
                type="date"
                className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700"
              />
              <label className="block text-sm text-slate-300 mt-4">
                {t.description}
              </label>
              <textarea
                name="description"
                rows={5}
                className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700"
              />
              <label className="block text-sm text-slate-300 mt-4">
                {t.filelink}
              </label>
              <input
                name="filelink"
                type="url"
                className="mt-1 w-full p-2 rounded bg-slate-800 border border-slate-700"
                placeholder="https://drive.google.com/..."
              />
              <label className="flex items-center gap-2 mt-4 text-slate-300 text-sm">
                <input type="checkbox" name="rodo" required className="w-4 h-4" />
                <span>{t.rodo}</span>
              </label>
              <div className="mt-6">
                <button className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-400 text-white font-semibold">
                  {t.send}
                </button>
              </div>
              {formStatus === "ok" && (
                <p className="mt-4 text-green-400">{t.success}</p>
              )}
              {formStatus === "error" && (
                <p className="mt-4 text-red-400">
                  {lang === "pl"
                    ? "Wystąpił błąd — spróbuj ponownie."
                    : "An error occurred — please try again."}
                </p>
              )}
            </form>
			
			<div className="p-6 bg-slate-900 rounded border border-slate-800">
			  <h4 className="font-semibold text-orange-400 mb-6 text-lg">
				Jak przebiega współpraca
			  </h4>

			<ol className="relative border-l border-orange-500/40 space-y-6 pl-7">
			  {[
				{
				  icon: "📤",
				  title: "Wysyłasz zadanie",
				  desc: "Podajesz deadline i krótki opis. Jeśli są pliki — wrzucasz je na OneDrive, iCloud, Dysk Google lub Dropbox i wklejasz link w formularzu.",
				},
				{
				  icon: "📩",
				  title: "Otrzymujesz potwierdzenie",
				  desc: "W odpowiedzi mailowej dostajesz wstępną wycenę i termin realizacji.",
				},
				{
				  icon: "✅",
				  title: "Akceptujesz warunki",
				  desc: "Po zaakceptowaniu terminu i ceny potwierdzasz zlecenie do wykonania.",
				},
				{
				  icon: "🧩", // zmiana z 🧠 na 🧩 (lepiej widoczne i tematycznie pasuje)
				  title: "Realizacja projektu",
				  desc: "Projekt wykonywany jest zgodnie z ustaleniami. Otrzymujesz wersję podglądową do weryfikacji.",
				},
				{
				  icon: "💳",
				  title: "Płatność",
				  desc: "Po akceptacji efektów dokonujesz płatności.",
				},
				{
				  icon: "📘",
				  title: "Gotowe rozwiązanie",
				  desc: "Po zaksięgowaniu płatności przesyłam pełny projekt — kod, raport i pliki wynikowe.",
				},
			  ].map((step, i) => (
				<li key={i} className="relative flex items-start gap-3 ml-2">
				  {/* Ikona */}
				  <span
					className="absolute -left-[14px] top-1 w-8 h-8 flex items-center justify-center
					bg-orange-500 text-slate-900 text-base font-semibold rounded-full ring-4 ring-[#07142a]"
				  >
					{step.icon}
				  </span>

				  {/* Treść */}
				  <div className="ml-6">
					<h4 className="text-sm font-semibold text-orange-300 leading-snug">
					  {step.title}
					</h4>
					<p className="text-slate-300 text-xs mt-1 leading-relaxed">
					  {step.desc}
					</p>
				  </div>

				  {/* Linia łącząca kroki */}
				  {i < 5 && (
					<span className="absolute left-[3px] top-8 h-8 w-[2px] bg-gradient-to-b from-orange-500/50 to-transparent" />
				  )}
				</li>
			  ))}
			</ol>

			</div>

          </div>
        </section>

        <footer className="py-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} RStudio helpeR —{" "}
          {lang === "pl"
            ? "pomoc w R i statystyce • Projekt roboczy"
            : "R & statistics help • Demo project"}
        </footer>
      </main>
    </div>
  );
}
