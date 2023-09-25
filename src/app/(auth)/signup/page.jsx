import SignupForm from "@/components/Auth/Signup/SignupForm";

export const metadata = {
  title: "Signup",
  description: "Join the Community Today",
};

export default function Signup() {
  return (
    <main>
      <div>
        <SignupForm />
      </div>
    </main>
  );
}
