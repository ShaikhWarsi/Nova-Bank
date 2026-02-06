import ResetPasswordPage from "@/components/ResetPasswordPage"
import { Suspense } from "react"

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage/>
    </Suspense>
  )
}

export default page
