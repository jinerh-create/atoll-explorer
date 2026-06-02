"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Anchor, Mail, Lock, Eye, EyeOff, User, Globe } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { GlassCard } from "@/components/ui/Card";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["TOURIST", "RESORT_OWNER", "GUESTHOUSE_OWNER", "AGENCY", "DIVE_CENTER", "CHARTER_OPERATOR"]),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const roleOptions = [
  { value: "TOURIST", label: "Tourist / Traveler" },
  { value: "RESORT_OWNER", label: "Resort Owner" },
  { value: "GUESTHOUSE_OWNER", label: "Guesthouse Owner" },
  { value: "AGENCY", label: "Travel Agency" },
  { value: "DIVE_CENTER", label: "Dive Center" },
  { value: "CHARTER_OPERATOR", label: "Charter / Boat Operator" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "TOURIST", terms: false },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.error ?? "Registration failed. Please try again.");
        return;
      }

      // Auto sign in after registration
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-deep/90" />
      <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-ocean-teal/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-lagoon/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ocean-teal to-lagoon flex items-center justify-center">
              <Anchor className="h-5 w-5 text-white" />
            </div>
            <span className="font-serif text-2xl font-semibold text-pearl">MTH</span>
          </Link>
          <p className="text-pearl/50 text-sm mt-2">Create your free account</p>
        </div>

        <GlassCard className="p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            variant="secondary"
            size="lg"
            className="w-full mb-6"
            onClick={handleGoogleSignIn}
            loading={googleLoading}
            leftIcon={<Globe className="h-4 w-4" />}
          >
            Sign up with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs text-pearl/40">
              <span className="bg-ocean-mid px-3">or create with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              {...register("name")}
            />

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
              hint="Minimum 8 characters"
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Select
              label="I am a..."
              options={roleOptions}
              error={errors.role?.message}
              {...register("role")}
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 rounded border-white/20 bg-white/5 text-ocean-teal"
                {...register("terms")}
              />
              <span className="text-sm text-pearl/60 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-ocean-turquoise hover:text-lagoon">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-ocean-turquoise hover:text-lagoon">Privacy Policy</Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-400 -mt-2">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isSubmitting}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-pearl/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-ocean-turquoise hover:text-lagoon transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
