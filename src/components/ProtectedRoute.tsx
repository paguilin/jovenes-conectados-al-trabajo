"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const sessionResult = useSession();
const session = sessionResult?.data;
const status = sessionResult?.status;
  const router = useRouter()

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login")
    }
  }, [status, session, router])

  if (status === "loading") return null

  return <>{children}</>
}