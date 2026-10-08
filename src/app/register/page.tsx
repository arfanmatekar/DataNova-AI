import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Create account | DataNova AI",
  description: "Create your DataNova AI account.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
