'use client'

import { supabase } from '../utils/supabase'

export default function Home() {

    const signIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    }

    return (
        <div>
            <h1>Public Page</h1>

            <button onClick={signIn}>
                Login with Google
            </button>

            <br/><br/>

            <a href="/protected">
                Go to Protected Page
            </a>
        </div>
    )
}