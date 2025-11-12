"use client";

import Link from "next/link";

const blogPosts = {
  1: {
    title: "Szybki wykres w ggplot2 — 60 sekund do wizualizacji",
    date: "2025-11-11",
    img: "/images/blog/post1.webp",
    content: (
      <>
        <p className="mb-4">
          W ggplot2 można stworzyć czytelny, atrakcyjny wykres w mniej niż minutę.
          Użycie motywu <code>theme_minimal()</code> oraz palety{" "}
          <code>scale_fill_brewer()</code> pozwala zachować czytelność nawet przy dużych zbiorach danych.
        </p>
        <p>
          📊 Dodaj tytuł, etykiety osi i legendę — to 90% sukcesu w prezentacji danych.
        </p>
      </>
    ),
  },
  2: {
    title: "Tidyverse w projektach semestralnych — szybciej i czytelniej",
    date: "2025-10-01",
    img: "/images/blog/post2.webp",
    content: (
      <>
        <p className="mb-4">
          Tidyverse to zestaw pakietów R, który rewolucjonizuje analizę danych.
        </p>
        <p>
          Używaj <code>dplyr</code> do filtracji, <code>ggplot2</code> do wizualizacji i
          <code>readr</code> do wczytywania danych — kod stanie się krótki, logiczny i piękny.
        </p>
      </>
    ),
  },
};

export default async function BlogPost({ params }) {
  const { id } = await params; // ✅ NOWA SKŁADNIA DLA NEXT 14+
  console.log("ID z URL:", id);

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-200">
        <h2 className="text-2xl font-semibold mb-4">Nie znaleziono artykułu</h2>
        <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
          Wróć na stronę główną
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061124] text-slate-100 font-sans p-6">
      <main className="max-w-3xl mx-auto">
        {/* 🧭 Breadcrumb */}
        <div className="text-sm text-slate-400 mb-4">
          <Link href="/" className="hover:text-blue-400">🏠 Strona główna</Link> /{" "}
          <Link href="/#blog" className="hover:text-blue-400">Blog</Link> /{" "}
          <span className="text-slate-200">{post.title}</span>
        </div>

        {/* 📝 Treść wpisu */}
        <article>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-slate-400 text-sm mb-6">{post.date}</p>
          <img
            src={post.img}
            alt={post.title}
            className="rounded-lg border border-slate-800 shadow mb-6"
          />
          <div className="prose prose-invert max-w-none leading-relaxed text-slate-200">
            {post.content}
          </div>
        </article>

        {/* 🔙 Powrót */}
        <div className="mt-8">
          <Link
            href="/#blog"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            ← Wróć do bloga
          </Link>
        </div>
      </main>
    </div>
  );
}
