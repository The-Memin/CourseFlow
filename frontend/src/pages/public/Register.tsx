import Topbar from "@/components/dashboard/Topbar";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterForm as RegisterFormType,
} from "@/schemas/register.schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";


export default function Register() {
  const { register } = useAuth();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (values: RegisterFormType) => {;
    try{
      await register(
        values.name,
        values.email,
        values.password
      );

      toast.success("Account created successfully");
    }catch(error){
      console.error(error);
      toast.error("Failed to create account. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Topbar />

      <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-lg border bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Start tracking your learning goals today.
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Name
                </label>

                <Input
                  {...form.register("name")}
                  autoComplete="name"
                  placeholder="John Doe"
                  className="h-11"
                />

                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email
                </label>

                <Input
                  {...form.register("email")}
                  autoComplete="email"
                  placeholder="john@example.com"
                  className="h-11"
                />

                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Password
                </label>

                <Input
                  type="password"
                  {...form.register("password")}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="h-11"
                />

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Confirm password
                </label>

                <Input
                  type="password"
                  {...form.register("confirmPassword")}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="h-11"
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full cursor-pointer"
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}