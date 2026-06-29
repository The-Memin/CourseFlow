import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm as LoginFormType } from "@/schemas/login.schema";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Topbar from "@/components/dashboard/Topbar";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const { isSubmitting, errors } = form.formState;

	const onSubmit = async(values: LoginFormType) => {
		try {
			await login(
				values.email,
				values.password
			);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Topbar />

			<div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
				{/* Fondo decorativo */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
				</div>

				{/* Card */}
				<div className="relative z-10 w-full max-w-md">
					<div className="rounded-lg border bg-card/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
						<div className="mb-8 text-center">
							<h1 className="text-3xl font-bold tracking-tight">
								Welcome back
							</h1>

							<p className="mt-2 text-sm text-muted-foreground">
								Sign in to continue to your account
							</p>
						</div>

						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Email
								</label>

								<Input
									{...form.register("email")}
									placeholder="john@example.com"
									className="h-11"
								/>

								{errors.email && (
									<p className="text-sm text-destructive">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-sm font-medium">
										Password
									</label>

									<button
										type="button"
										className="text-xs text-muted-foreground hover:text-foreground transition-colors"
									>
										Forgot password?
									</button>
								</div>

								<Input
									type="password"
									{...form.register("password")}
									placeholder="••••••••"
									className="h-11"
								/>

								{errors.password && (
									<p className="text-sm text-destructive">
										{errors.password.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full h-11 cursor-pointer"
							>
								{isSubmitting
									? "Signing in..."
									: "Sign in"}
							</Button>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								Secure access to your dashboard
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}