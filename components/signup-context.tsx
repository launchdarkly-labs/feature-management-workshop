"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserData = {
  email: string
  password: string
  firstName: string
  lastName: string
  dob: string
  ssn: string
  phone: string
  address: string
  apt: string
  zip: string
  selectedServices: string[]
}

const initialUserData: UserData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dob: "",
  ssn: "",
  phone: "",
  address: "",
  apt: "",
  zip: "",
  selectedServices: [],
}

type SignupContextType = {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  toggleService: (service: string) => void
}

const SignupContext = createContext<SignupContextType | undefined>(undefined)

export function SignupProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(initialUserData)

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const toggleService = (service: string) => {
    setUserData((prev) => {
      const services = [...prev.selectedServices]

      if (services.includes(service)) {
        return {
          ...prev,
          selectedServices: services.filter((s) => s !== service),
        }
      } else {
        return {
          ...prev,
          selectedServices: [...services, service],
        }
      }
    })
  }

  return <SignupContext.Provider value={{ userData, updateUserData, toggleService }}>{children}</SignupContext.Provider>
}

export function useSignup() {
  const context = useContext(SignupContext)
  if (context === undefined) {
    throw new Error("useSignup must be used within a SignupProvider")
  }
  return context
}

