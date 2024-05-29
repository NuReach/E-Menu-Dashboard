import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
      <div className="w-full flex h-screen justify-center items-center">
        <SignIn />
      </div>
  )
}