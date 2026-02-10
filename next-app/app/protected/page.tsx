'use client'

import { supabase } from '../../utils/supabase'
import { useEffect, useState } from 'react'

export default function Protected() {

    const [user, setUser] = useState<any>(null)

    useEffect(() => {

        console.log("PROTECTED PAGE LOADED")

        supabase.auth.getSession().then(({ data, error }) => {

            console.log("SESSION DATA:", data)
            console.log("SESSION ERROR:", error)

            setUser(data.session?.user ?? null)
        })

    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    if (!user) {
        return <p>Access Denied. Please log in.</p>
    }

    return (
        <div>
            <h1>SECRET PAGE</h1>

            <p>Welcome: {user.email}</p>

            <button onClick={signOut}>
                Log out
            </button>
        </div>
    )
}