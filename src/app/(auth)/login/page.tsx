"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Anchor, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-deep/90" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-ocean-teal/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-lagoon/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ocean-teal to-lagoon flex items-center justify-center">
              <Anchor className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-2xl font-semibold text-pearl">MTH</span>
          </Link>
          <p className="text-pearl/50 text-sm mt-2">Sign in to your account</p>
        </div>

        <GlassCard className="p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full mb-6"
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            leftIcon={<Globe className="h-4 w-4" />}
          >
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs text-pearl/40">
              <span className="bg-ocean-mid px-3">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-pearl/60 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 text-ocean-teal" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-ocean-turquoise hover:text-lagoon transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isSubmitting}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-pearl/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-ocean-turquoise hover:text-lagoon transition-colors font-medium">
              Create one free
            </Link>
          </p>
        </GlassCard>

        <p className="text-center text-xs text-pearl/30 mt-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="hover:text-pearl/50 transition-colors">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-pearl/50 transition-colors">Privacy Policy</Link>
        </p>
      </motion.div>
    </div>
  );
}
