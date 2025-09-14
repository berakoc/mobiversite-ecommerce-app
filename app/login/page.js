"use client";

import { Button, TextInput, Toast } from "../../ui";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/api";
import { Fragment, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const loginFormSchema = z.object({
  username: z.string().min(4, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    mutate: login,
    isPending: isLoginPending,
    error: loginError,
    isError: isLoginError,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/login", data);
    },
    onSuccess() {
      const redirectTo = searchParams.get("redirectTo");
      router.push(redirectTo ?? "/");
    },
  });
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = handleFormSubmit((data) => {
    login(data);
  });

  const [showLoginError, setShowLoginError] = useState(isLoginError);

  useEffect(() => {
    setShowLoginError(isLoginError);
  }, [isLoginError]);

  return (
    <Fragment>
      <Toast
        isOpen={showLoginError}
        status="error"
        message={loginError?.response?.data?.message || "Login failed"}
        onClose={() => setShowLoginError(false)}
        errorStatus={loginError?.response?.status}
      />
      <div className="min-h-screen flex items-center justify-center bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-md px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <div className="space-y-4">
            <div>
              <TextInput
                type="text"
                placeholder="Enter username"
                {...register("username")}
                label="Username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <TextInput
                type="password"
                placeholder="Enter password"
                {...register("password")}
                label="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button loading={isLoginPending} type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
