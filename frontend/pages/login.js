import React, { useState } from 'react'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

export default function Login() {
    const { mutateUser } = useUser({
        redirectTo: '/dashboard',
        redirectIfFound: true,
    })
    return (
        <div className="container booking">
            <div className="row">
                <div className="offset-3 col-4 h-100 justify-content-center align-items-center">
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
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
