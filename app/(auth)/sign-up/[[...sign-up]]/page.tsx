import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container">
      <SignUp signInUrl="/sign-in" />;
    </div>
  );
}
