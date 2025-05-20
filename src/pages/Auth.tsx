import React, { useState, useRef, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const tabs = [
  { id: "signin", label: "Sign In" },
  { id: "signup", label: "Sign Up" },
];

const AuthPage = () => {
  const [tab, setTab] = useState("signin");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = tabs.findIndex((t) => t.id === tab);
    const activeButton = tabRefs.current[index];
    if (activeButton && pillRef.current) {
      const { width } = activeButton.getBoundingClientRect();
      const leftPosition = activeButton.offsetLeft;
      pillRef.current.style.width = `${width}px`;
      pillRef.current.style.transform = `translateX(${leftPosition}px)`;
    }
  }, [tab]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Section (hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-primary text-white p-10">
        <div>
          <h1 className="text-2xl font-semibold mb-8">Admin</h1>
        </div>
        <div className="mb-8">
          <p className="text-lg font-light">“This platform has completely transformed how our team works. The authentication is seamless and the interface is intuitive.”</p>
        </div>
      </div>
      {/* Right Section (form) */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="relative flex mb-8 bg-muted rounded-lg p-1">
            {tabs.map((t, idx) => (
              <button
                key={t.id}
                ref={el => tabRefs.current[idx] = el}
                className={cn(
                  "relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors",
                  tab === t.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setTab(t.id)}
                type="button"
              >
                {t.label}
              </button>
            ))}
            <div
              ref={pillRef}
              className="absolute h-[calc(100%-8px)] top-1 left-0 bg-card rounded-sm shadow transition-all duration-300 z-0"
              style={{ willChange: "transform, width" }}
            />
          </div>
          {/* Tab Content */}
          {tab === "signin" && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">Welcome back</h2>
              <p className="text-muted-foreground text-center mb-6">Enter your credentials to access your account</p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" required />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input id="password" type="password" placeholder="Password" autoComplete="current-password" required />
                </div>
                <Button className="w-full" type="submit">Sign In</Button>
              </form>
              <div className="my-6 flex items-center gap-2">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" type="button">
                  <FcGoogle className="text-lg" /> Google
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" type="button">
                  <FaApple className="text-lg" /> Apple
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </p>
              <p className="text-sm text-center mt-4">
                Don't have an account?{' '}
                <button type="button" className="text-primary hover:underline" onClick={() => setTab('signup')}>Create an account</button>
              </p>
            </>
          )}
          {tab === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-2 text-center">Welcome back</h2>
              <p className="text-muted-foreground text-center mb-6">Enter your credentials to access your account</p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1">Full Name</label>
                  <Input id="name" type="text" placeholder="Your name" autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm mb-1">Password</label>
                  <Input id="password" type="password" placeholder="Password" autoComplete="new-password" required />
                </div>
                <Button className="w-full" type="submit">Create Account</Button>
              </form>
              <div className="my-6 flex items-center gap-2">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" type="button">
                  <FcGoogle className="text-lg" /> Google
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" type="button">
                  <FaApple className="text-lg" /> Apple
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
              </p>
              <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <button type="button" className="text-primary hover:underline" onClick={() => setTab('signin')}>Sign in</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
