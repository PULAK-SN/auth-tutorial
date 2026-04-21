"use client";

import FormLayout from "@/components/layouts/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import z from "zod";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be atleast 2 characters!" }),
    email: z.email({ message: "Enter a valid email!" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match!",
    path: ["confirmPassword"],
  });

type formData = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: formData) => {
    console.log(data);
  };
  return (
    <FormLayout title="Create an account" subTitle="Sign up to get started">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white 
              placeholder:gray-500 focus:outline-none focus:ring-2
               ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-teal-500"}`}
          />
          {errors.name && (
            <p className="text-xs mt-2 text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white 
              placeholder:gray-500 focus:outline-none focus:ring-2
              ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-teal-500"}`}
          />
          {errors.email && (
            <p className="text-xs mt-2 text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="********"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white 
              placeholder:gray-500 focus:outline-none focus:ring-2 
              ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-teal-500"}`}
          />
          {errors.password && (
            <p className="text-xs mt-2 text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="********"
            className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm 
                text-white placeholder:gray-500 focus:outline-none focus:ring-2
                ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-teal-500"}`}
          />
          {errors.confirmPassword && (
            <p className="text-xs mt-2 text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white transition 
          font-medium py-2.5 rounded-lg flex items-center justify-center disabled:opacity-70 cursor-pointer"
        >
          Sign up
        </button>
      </form>

      {/* divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* social auth */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-700 
          hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 border border-gray-700 
          hover:bg-gray-800 hover:border-gray-600 transition text-white py-2.5 rounded-lg text-sm cursor-pointer"
        >
          <FaGithub className="h-5 w-5" />
          GitHub
        </button>
      </div>

      {/* footer */}
      <footer className="text-sm text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <Link href={"/sign-in"} className="text-teal-400 hover:text-teal-300">
          Sign in
        </Link>
      </footer>
    </FormLayout>
  );
};

export default SignUpPage;
