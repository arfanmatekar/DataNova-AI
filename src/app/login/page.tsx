import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign in | DataNova AI",
  description: "Sign in to your DataNova AI workspace.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
