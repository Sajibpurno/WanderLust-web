"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaEye, FaGithub, FaHome, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../../lib/auth-client";

const SignupPage = () => {
  const [isShowPass, setIsShowPass] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());
    console.log(user);
    e.currentTarget.reset(); // Submit hoye gele form clear korar jonno

    // main setup for signup
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photo,
    });
    console.log(data, error);

    if (data) {
      redirect("/login");
    }
    if (error) {
      alert("signUp faild");
    }
  };

  const handleGoogleLogin =async () => {
      await authClient.signIn.social({
      provider: "google",
      callbackURL: '/',
      });
    }

  return (
    <section className="min-h-screen flex items-center justify-center p-5 sm:p-8 relative">
      {/* Go Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F6]/90 backdrop-blur-md border border-[#1A1A1A]/10 rounded-full shadow-sm text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:border-cyan-500 transition-all text-sm font-medium"
      >
        <FaHome className="text-cyan-500" />
        <span>Go Home</span>
      </Link>

      <div className="w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-xl shadow-[#1A1A1A]/8 p-8 sm:p-10 ring-1 ring-[#1A1A1A]/[0.06]">
        <div className="text-center mb-10 space-y-2">
          <h1 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">
            Create Account
          </h1>
          <p className="text-[#1A1A1A]/55">
            Join us by filling out the details below
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A]/75 mb-1.5 ml-0.5">
              Full Name
            </label>
            <input
              name="name" // MUST ADD THIS
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A]/75 mb-1.5 ml-0.5">
              Email Address
            </label>
            <input
              name="email" // MUST ADD THIS
              type="email"
              placeholder="name@email.com"
              required
              className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A]/75 mb-1.5 ml-0.5">
              Photo URL (Optional)
            </label>
            <input
              name="photo" // MUST ADD THIS
              type="url"
              placeholder="https://image-link.com"
              className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-[#1A1A1A]/75 mb-1.5 ml-0.5">
              Password
            </label>
            <input
              name="password" // MUST ADD THIS
              type={isShowPass ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
            />
            <span
              className=" absolute right-2 top-10 cursor-pointer"
              onClick={() => setIsShowPass(!isShowPass)}
            >
              {isShowPass ? <FaEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Register Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3.5 shadow-lg shadow-cyan-400/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-[#1A1A1A]/55 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
          >
            Login
          </Link>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1A1A1A]/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-wider">
            <span className="bg-[#FAF9F6] px-4 text-[#1A1A1A]/40 font-medium">
              Or register with{" "}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2">
          <button onClick={handleGoogleLogin}
            type="button"
            className="flex hover:border-cyan-500 hover:ring-2 hover:ring-cyan-500/20 items-center cursor-pointer justify-center gap-2 py-3 border border-[#1A1A1A]/12 rounded-2xl hover:bg-[#1A1A1A]/10 transition-colors text-sm font-semibold text-[#1A1A1A]/80"
          >
            <FcGoogle size={20} />
            Google
          </button>
          <button
            type="button"
            className="flex hover:border-cyan-500 hover:ring-2 hover:ring-cyan-500/20 items-center justify-center gap-2 py-3 border border-[#1A1A1A]/12 rounded-2xl hover:bg-[#1A1A1A]/10 cursor-pointer transition-colors text-sm font-semibold text-[#1A1A1A]/80"
          >
            <FaGithub size={20} />
            Github
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
