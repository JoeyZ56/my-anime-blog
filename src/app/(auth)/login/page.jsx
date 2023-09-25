import LoginForm from "@/components/Auth/Login/LoginForm";

export const metadata = {
  title: "Login",
  description: "Welcome Back Senpai",
};

export default function Login() {
  return (
    <main>
      <div>
        <LoginForm />
      </div>
    </main>
  );
}
