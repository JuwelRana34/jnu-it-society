"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // আপনার auth client পাথ চেক করুন
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // বা সাধারণ <label> ট্যাগ ব্যবহার করতে পারেন
import { Terminal, Loader2, ArrowRight, Github } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        router.push("/dashboard"); // সাইনআপ শেষে যেখানে পাঠাতে চান
        router.refresh();
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      
      {/* --- Left Side: Branding & Testimonial --- */}
      <div className="hidden bg-muted lg:block relative h-full flex-col p-10 text-white dark:border-r lg:flex">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-zinc-900" />
        
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Terminal className="mr-2 h-6 w-6" />
          JnU IT Society
        </div>
        
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has completely transformed how we manage our university club events and student database. Ideally structured for developers.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, General Secretary</footer>
          </blockquote>
        </div>
      </div>

      {/* --- Right Side: Registration Form --- */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          
          <form onSubmit={handleSignUp} className="grid gap-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded border border-red-200">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
            
            {/* GitHub Sign Up (Optional placeholder) */}
            <Button variant="outline" className="w-full" type="button" disabled={loading}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}