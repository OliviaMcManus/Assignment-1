import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ProtectedPage() {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    return (
        <main style={{ padding: 24, fontFamily: "system-ui" }}>
            <h1>Protected</h1>

            {!user ? (
                <>
                    <p>You must log in to view this page.</p>
                    <Link href="/assignment3">Back to login</Link>
                </>
            ) : (
                <>
                    <p>
                        Logged in as: <b>{user.email}</b>
                    </p>

                    <form action="/logout" method="post">
                        <button type="submit">Log out</button>
                    </form>

                    <p style={{ marginTop: 16 }}>
                        <a href="/assignment2">Back to captions</a>
                    </p>
                </>
            )}
        </main>
    );
}