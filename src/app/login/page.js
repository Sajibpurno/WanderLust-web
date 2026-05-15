"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaGithub, FaHome, FaRegEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '../../lib/auth-client';
import { toast } from 'react-toastify';
// import { redirect } from 'next/navigation';

const LoginPage = () => {
    const [isShowPass, setIsShowPass] = useState(false);

    // Form submission logic
    const onSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            
            const user = Object.fromEntries(formData.entries());
            // console.log(user); 
            e.currentTarget.reset(); // Submit hoye gele form clear korar jonno
    
            // main setup for signup
            const { data, error } = await authClient.signIn.email
            ({
            email: user.email,
            password: user.password,
            rememberMe: true,
            callbackURL: "/"        
        })

         console.log(data, error);
    
         if (error) {
            toast.warning(error.message)
         }
         if(data){
            toast.suc("Login Successful");
         }
        }
    const handleGoogleLogin =async () => {
    await authClient.signIn.social({
    provider: "google",
    });
}
    const handleGithubLogin =async () => {
    await authClient.signIn.social({
    provider: "github",
    });
}
    return (
        <div className="min-h-screen flex items-center justify-center p-5 sm:p-8 relative bg-[#FAF9F6]">

            {/* Go Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-[#1A1A1A]/10 rounded-full shadow-sm text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:border-cyan-500 transition-all text-sm font-medium"
            >
                <FaHome className="text-cyan-500" />
                <span>Go Home</span>
            </Link>

            <div className="w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-xl shadow-[#1A1A1A]/8 p-8 sm:p-10 ring-1 ring-[#1A1A1A]/[0.06]">

                <div className="text-center mb-10 space-y-2">
                    <h1 className="font-heading text-3xl sm:text-4xl text-[#1A1A1A] tracking-tight">Welcome Back</h1>
                    <p className="text-[#1A1A1A]/55">Please enter your details to sign in</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">

                    {/* Email Address */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A]/75 mb-1.5 ml-0.5">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="name@email.com"
                            required
                            className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <div className="flex justify-between items-center mb-1.5 ml-0.5">
                            <label className="block text-sm font-semibold text-[#1A1A1A]/75">Password</label>
                            {/* ERROR FIXED: 'disable' attribute removed */}
                            <Link href="/forgot-password" title="Feature coming soon" className="text-xs text-cyan-500 hover:text-cyan-600 font-medium transition-colors">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                type={isShowPass ? "text" : "password"}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3.5 rounded-2xl border border-[#1A1A1A]/12 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all bg-[#FAF9F6] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
                            />
                            <span 
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#1A1A1A]/40 hover:text-cyan-500 transition-colors" 
                                onClick={() => setIsShowPass(!isShowPass)}
                            >
                                {isShowPass ? <FaEye size={18} /> : <FaRegEyeSlash size={18} />}
                            </span>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center ml-0.5">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className="h-4 w-4 rounded border-[#1A1A1A]/25 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-[#1A1A1A]/60 cursor-pointer">
                            Remember me
                        </label>
                    </div>

                    {/* Sign In Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3.5 shadow-lg shadow-cyan-400/20 transition-all active:scale-[0.98] cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center text-sm text-[#1A1A1A]/55 font-medium">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors">
                        Signup now
                    </Link>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#1A1A1A]/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="bg-[#FAF9F6] px-4 text-[#1A1A1A]/40 font-medium">Or login with</span>
                    </div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                    <button onClick={handleGoogleLogin}
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 border border-[#1A1A1A]/12 rounded-2xl hover:border-cyan-500 hover:ring-2 hover:ring-cyan-500/20 hover:bg-[#1A1A1A]/[0.02] transition-all text-sm font-semibold text-[#1A1A1A]/80 cursor-pointer"
                    >
                        <FcGoogle size={20} />
                        Google
                    </button>
                    <button onClick={handleGithubLogin}
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 border border-[#1A1A1A]/12 rounded-2xl hover:border-cyan-500 hover:ring-2 hover:ring-cyan-500/20 hover:bg-[#1A1A1A]/[0.02] transition-all text-sm font-semibold text-[#1A1A1A]/80 cursor-pointer"
                    >
                        <FaGithub size={20} />
                        Github
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;