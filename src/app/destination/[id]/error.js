'use strict';
'use client'; // ⚠️ Next.js error component oboshoy client component hote hobe

import React, { useEffect } from 'react';

// Next.js error page automatic "error" ar "reset" propty receive kore
function Error({ error, reset }) {
    
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Caught by Global Error Boundary:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-6 py-16">
            <div className="text-center max-w-lg">
                <p className="text-xs uppercase tracking-[0.28em] text-[#FF4500] font-semibold mb-6">
                    Something went wrong
                </p>
                
                {/* 500 ba OOPS text responsive styling */}
                <h1 className="font-heading text-[clamp(4rem,15vw,8rem)] font-bold leading-none text-[#1A1A1A]/10 tracking-tight select-none">
                    OOPS!
                </h1>

                {/* Status Badge - Red/Orange theme for errors */}
                <div className="relative inline-block -mt-4 mb-8">
                    <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-[#FF4500] text-white rounded-full shadow-lg shadow-[#FF4500]/25 rotate-[2deg]">
                        System Error
                    </span>
                </div>

                <h2 className="font-heading text-3xl text-[#1A1A1A] mb-4">
                    An unexpected error occurred
                </h2>
                <p className="text-[#1A1A1A]/55 mb-10 leading-relaxed text-sm">
                    {error?.message || "We apologize for the inconvenience. Our server encountered an internal glitch. Please try again or return home."}
                </p>

                {/* Dui ta action button: Ekta current page reset korbe, arekta home-e nibe */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => reset()} // Next.js built-in function to re-render the segment
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-semibold transition-all duration-300 hover:bg-[#333333] active:scale-[0.98]"
                    >
                        Try Again
                    </button>
                    
                    <a
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border-2 border-[#1A1A1A]/20 text-[#1A1A1A] font-semibold transition-all duration-300 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 active:scale-[0.98]"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Error;