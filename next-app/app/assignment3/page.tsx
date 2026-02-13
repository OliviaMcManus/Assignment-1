"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Assignment3Home() {
    async function login() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                // REQUIRED: must redirect to /auth/callback
                redirectTo: `${location.origin}/auth/callback`,

                // Forces Supabase to use the PKCE code flow
                // so you get ?code=... instead of #access_token=...
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        });
    }

    return (
        <main style={{ padding: 24, fontFamily: "system-ui" }}>
            <h1>Assignment 3</h1>

            <button onClick={login}>Login with Google</button>

            <p style={{ marginTop: 16 }}>
                <a href="/assignment3/protected">Go to Protected Page</a>
            </p>
        </main>
    );
}