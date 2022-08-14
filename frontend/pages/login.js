import React from 'react'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Link from 'next/link'

function Login() {
    const { mutateUser } = useUser({
        redirectTo: '/dashboard',
        redirectIfFound: true,
    })
    return (
        <form onSubmit={
            async function handleSubmit(event) {
                event.preventDefault()
                const body = {
                    username: event.currentTarget.username.value,
                }
                try {
                    mutateUser(
                        await fetchJson('/api/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(body),
                        })
                    )
                } catch (error) {
                    console.error('An unexpected error happened:', error)
                }
            }}>
            <div className="form-outline mb-4">
                <input type="text" id="form2Example1" name="username" className="form-control" />
                <label className="form-label" >Username</label>
            </div>
            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" />
                <label className="form-label" >Password</label>
            </div>
            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
                <div className="col">
                    <Link href="/">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Go Home</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
Login.layout = 'loginLayout'
export default Login