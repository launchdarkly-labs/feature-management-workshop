"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignup } from "@/components/signup-context"
import { COMPANY_LOGOS, BANK } from "@/utils/constants"
import Image from "next/image"

export default function SignUpPage() {
  const router = useRouter()
  const { userData, updateUserData } = useSignup()
  const [email, setEmail] = useState(userData.email)
  const [password, setPassword] = useState(userData.password)
  const [acceptedTerms, setAcceptedTerms] = useState(true)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    updateUserData({ email, password })
    router.push("/personal-details")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 p-4">
      <div className="relative flex w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Close button */}
        {/* <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button> */}

        {/* Left side - Sign up form */}
        <div className="flex w-full flex-col p-8 md:w-7/12 md:p-12">
          {/* Logo */}
          {/* <div className="mb-10 flex items-center">
            <div className="mr-2 flex h-8 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-500 p-1">
              <div className="flex h-6 w-10 items-center justify-end rounded-full bg-white p-1">
                <DollarSign className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <span className="text-xl font-semibold">
              Toggle<span className="font-bold">Bank</span>
            </span>
          </div> */}

          <Image src={COMPANY_LOGOS[BANK].horizontal} alt="ToggleBank Logo" className="h-full" height={40}/>

          {/* Progress indicator */}
          {/* <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">1</div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">2</div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500">3</div>
            </div>
          </div> */}

          {/* Heading */}
          <h1 className="mb-8 text-2xl font-bold text-gray-800 md:text-3xl">Start banking in less than five minutes</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                readOnly 
                onFocus={(e) => { (e.target as HTMLInputElement).removeAttribute('readOnly'); }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                readOnly 
                onFocus={(e) => { (e.target as HTMLInputElement).removeAttribute('readOnly'); }}
              />
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I accept the{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              className="w-full rounded-full bg-blue-500 py-3 text-center font-medium text-white transition-colors hover:bg-blue-600"
            >
              Sign Up
            </button>
            <Link href="/" className="mt-4 text-sm text-gray-500 hover:text-gray-700">
              Back
            </Link>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>

        {/* Right side - Promo */}
        <div className="hidden w-5/12 bg-blue-50 p-12 md:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-600">Sign up for an account today to receive</h2>
              <p className="text-3xl font-bold text-purple-600">50,000 reward points</p>
              <p className="mt-2 text-sm text-gray-600">Offer ends 12/31</p>
            </div>

            {/* Credit card image */}
            <div className="relative mt-8 h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-4 shadow-lg">
              <div className="absolute bottom-4 right-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-xl font-bold text-white">$</span>
                </div>
              </div>
              <div className="absolute right-4 top-4 flex items-center">
                <div className="mr-1 h-3 w-6 rounded-full bg-white/50"></div>
                <span className="text-xs font-medium text-white">ToggleBank</span>
              </div>
              <div className="absolute bottom-12 left-4 text-lg font-medium tracking-widest text-white">
                4562 7710 2321
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-white">02/30</div>
              <div className="absolute bottom-4 right-12">
                <div className="grid h-6 w-10 grid-cols-2 gap-1">
                  <div className="rounded-sm bg-white/30"></div>
                  <div className="rounded-sm bg-white/30"></div>
                  <div className="rounded-sm bg-white/30"></div>
                  <div className="rounded-sm bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

