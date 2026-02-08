import { supabase } from "@/lib/supabaseClient";

export default async function ListPage() {
    const { data, error } = await supabase
        .from("captions")
        .select("id, content, created_datetime_utc, like_count, is_public")
        .order("created_datetime_utc", { ascending: false })
        .limit(25);

    if (error) {
        return (
            <main style={{ padding: 24, fontFamily: "system-ui" }}>
                <h1 style={{ marginBottom: 8 }}>Captions</h1>
                <p style={{ color: "crimson" }}>{error.message}</p>
            </main>
        );
    }

    return (
        <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 800, margin: "0 auto" }}>
            <h1 style={{ marginBottom: 16 }}>Captions</h1>

            <div style={{ display: "grid", gap: 12 }}>
                {data?.map((row) => (
                    <div
                        key={row.id}
                        style={{
                            border: "1px solid #e5e5e5",
                            borderRadius: 12,
                            padding: 16,
                            background: "white",
                        }}
                    >
                        <div style={{ fontSize: 16, lineHeight: 1.4, marginBottom: 10 }}>
                            {row.content}
                        </div>

                        <div style={{ display: "flex", gap: 12, fontSize: 13, color: "#666" }}>
                            <span>👍 {row.like_count ?? 0}</span>
                            <span>{row.is_public ? "Public" : "Private"}</span>
                            <span>
                {row.created_datetime_utc
                    ? new Date(row.created_datetime_utc).toLocaleString()
                    : ""}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}