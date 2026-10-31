'use client'

import { Button } from '../ui/button'
import { useState } from 'react'

export function Login() {
    const [form, setForm] = useState<0 | 1>(0)

    return (
        <section className="px-4 py-8 sm:py-12 mx-auto w-full max-w-md">
            {form === 0 ? (
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="bg-white border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-5"
                >
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
                            Log in
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Welcome back! Enter your details to continue.
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="login-email">
                            Email
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="login-password">
                            Password
                        </label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        text="Log in"
                        className="w-full h-11 text-base font-semibold shadow-xs mt-1"
                    />

                    <div className="flex flex-wrap justify-center gap-1.5 text-sm text-[var(--color-text-muted)] pt-2">
                        <p>Don&apos;t have an account?</p>
                        <button
                            type="button"
                            onClick={() => setForm(1)}
                            className="cursor-pointer font-semibold text-[var(--color-blue)] hover:underline"
                        >
                            Register
                        </button>
                    </div>
                </form>
            ) : (
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="bg-white border border-[var(--color-border)] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-5"
                >
                    <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
                            Create account
                        </h1>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">
                            Join us to order fresh cheese and dairy products.
                        </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="register-name">
                            Name
                        </label>
                        <input
                            id="register-name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="name"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="register-email">
                            Email
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="register-password">
                            Password
                        </label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]" htmlFor="repeat-password">
                            Repeat password
                        </label>
                        <input
                            id="repeat-password"
                            name="repeatPassword"
                            type="password"
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            required
                            className="border border-[var(--color-border)] rounded-xl h-11 px-3.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-blue)] focus:ring-2 focus:ring-[var(--color-blue)]/10 transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        text="Create account"
                        className="w-full h-11 text-base font-semibold shadow-xs mt-1"
                    />

                    <div className="flex flex-wrap justify-center gap-1.5 text-sm text-[var(--color-text-muted)] pt-2">
                        <p>Already have an account?</p>
                        <button
                            type="button"
                            onClick={() => setForm(0)}
                            className="cursor-pointer font-semibold text-[var(--color-blue)] hover:underline"
                        >
                            Log in
                        </button>
                    </div>
                </form>
            )}
        </section>
    )
}
