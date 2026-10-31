
'use client'

import { Button } from '../ui/button'
import { useState } from 'react'

export function Login() {
    const [form, setForm] = useState(0)

    return (
        <section className="px-4 py-10 mx-auto w-full max-w-md">
            {form === 0 ? (
                <form
                    className="flex flex-col gap-5 p-6 border border-[var(--color-border)] rounded-xl"
                >
                    <h2 className="text-3xl text-center font-semibold">
                        Log in
                    </h2>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <Button
                        text="Log in"
                        className="w-full h-11"
                    />

                    <div className="flex flex-wrap justify-center gap-1 text-sm">
                        <p>Don't have an account?</p>
                        <button
                            type="button"
                            onClick={() => setForm(1)}
                            className="text-[var(--color-blue)] hover:underline"
                        >
                            Registration
                        </button>
                    </div>
                </form>
            ) : (
                <form
                    className="flex flex-col gap-5 p-6 border border-[var(--color-border)] rounded-xl"
                >
                    <h2 className="text-3xl text-center font-semibold">
                        Registration
                    </h2>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="register-name">Name</label>
                        <input
                            id="register-name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="name"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="register-password">Password</label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="repeat-password">Repeat password</label>
                        <input
                            id="repeat-password"
                            name="repeatPassword"
                            type="password"
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            required
                            className="border border-[var(--color-border)] rounded-lg h-11 px-3 outline-none focus:border-[var(--color-blue)]"
                        />
                    </div>

                    <Button
                        text="Create account"
                        className="w-full h-11"
                    />

                    <div className="flex flex-wrap justify-center gap-1 text-sm">
                        <p>Already have an account?</p>
                        <button
                            type="button"
                            onClick={() => setForm(0)}
                            className="text-[var(--color-blue)] hover:underline"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}
