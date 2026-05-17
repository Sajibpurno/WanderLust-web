import React from 'react';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6 py-16">
            <div className="text-center max-w-lg">
                <p className="text-xs uppercase tracking-[0.28em] text-[#1A1A1A]/40 mb-6">Error</p>
                <h1 className="font-heading text-[clamp(5rem,18vw,10rem)] leading-none text-[#1A1A1A]/12 tracking-tight select-none">
                    404 eror
                </h1>

                <div className="relative inline-block -mt-4 mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-500/25 rotate-[-3deg]">
                        Page Not Found
                    </span>
                </div>

                <h2 className="font-heading text-3xl text-[#1A1A1A] mb-4">
                    This page isn&apos;t available
                </h2>
                <p className="text-[#1A1A1A]/55 mb-10 leading-relaxed">
                    The page you are looking for might have been removed, renamed, or is temporarily unavailable.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#FF8C00] text-white font-semibold shadow-lg shadow-[#FF8C00]/25 hover:bg-[#e67e00] transition-all duration-300 hover:scale-[1.02]"
                >
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;