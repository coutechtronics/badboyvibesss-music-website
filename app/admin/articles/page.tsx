"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

/* ================= TYPES ================= */
type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  created_at: string;
};

/* ================= HELPERS ================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/* ================= PAGE ================= */
export default function ArticlesAdminPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------- FETCH ARTICLES -------- */
  const fetchArticles = async () => {
    const { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  /* -------- ADD ARTICLE -------- */
  const addArticle = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!content.trim()) {
      alert("Content is required");
      return;
    }

    setLoading(true);

    const slug = slugify(title);

    const { error } = await supabase.from("articles").insert([
      {
        title,
        slug,
        excerpt,
        content,
        published: true,
        published_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setExcerpt("");
    setContent("");
    fetchArticles();
  };

  /* -------- DELETE ARTICLE -------- */
  const deleteArticle = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("articles").delete().eq("id", id);
    fetchArticles();
  };

  /* ================= UI ================= */
  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>📝 Articles Admin</h1>

      {/* CREATE ARTICLE */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 6,
          marginBottom: 40,
        }}
      >
        <h2 style={{ marginBottom: 15 }}>Create New Article</h2>

        <label>Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <label>Excerpt (short summary)</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Optional short preview"
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <label>Content *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full article content"
          style={{ width: "100%", padding: 10, minHeight: 180 }}
        />

        <button
          onClick={addArticle}
          disabled={loading}
          style={{
            marginTop: 15,
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Add Article"}
        </button>
      </div>

      {/* LIST ARTICLES */}
      <div>
        <h2>All Articles</h2>

        {articles.length === 0 && <p>No articles yet.</p>}

        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "15px 0",
            }}
          >
            <h3>{article.title}</h3>
            {article.excerpt && <p>{article.excerpt}</p>}

            <small>Slug: {article.slug}</small>
            <br />

            <button
              onClick={() => deleteArticle(article.id)}
              style={{ marginTop: 10 }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}