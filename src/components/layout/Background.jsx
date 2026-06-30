import React from 'react';

export function Background() {
    return (
        <>
            {/* Noise Texture Overlay */}
            <div className="bg-noise"></div>

            {/* Aurora Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                {/* Blob 1 - Top Left */}
                <div
                    className="aurora-blob absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] 
                     bg-blue-400/30 dark:bg-indigo-600/20 mix-blend-multiply dark:mix-blend-screen blur-[100px]"
                    style={{ animationDelay: '0s', animationDuration: '25s' }}
                ></div>

                {/* Blob 2 - Top Right */}
                <div
                    className="aurora-blob absolute top-[10%] -right-[10%] w-[45vw] h-[45vw] 
                     bg-purple-400/30 dark:bg-violet-600/20 mix-blend-multiply dark:mix-blend-screen blur-[100px]"
                    style={{ animationDelay: '2s', animationDuration: '20s' }}
                ></div>

                {/* Blob 3 - Bottom Left */}
                <div
                    className="aurora-blob absolute -bottom-[10%] left-[20%] w-[55vw] h-[55vw] 
                     bg-pink-400/30 dark:bg-fuchsia-600/20 mix-blend-multiply dark:mix-blend-screen blur-[100px]"
                    style={{ animationDelay: '4s', animationDuration: '30s' }}
                ></div>

                {/* Blob 4 - Center/Right Accent */}
                <div
                    className="aurora-blob absolute top-[40%] right-[20%] w-[35vw] h-[35vw] 
                     bg-cyan-300/30 dark:bg-cyan-600/10 mix-blend-multiply dark:mix-blend-screen blur-[80px]"
                    style={{ animationDelay: '6s', animationDuration: '22s' }}
                ></div>
            </div>
        </>
    );
}

export default Background;
