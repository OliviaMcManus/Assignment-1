import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    // Always redirect to /protected after callback
    const response = NextResponse.redirect(new URL('/protected', request.url))

    if (code) {
        // In your Next version, cookies() returns a Promise, so we await it
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll() as any
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        await supabase.auth.exchangeCodeForSession(code)
    }

    return response
}