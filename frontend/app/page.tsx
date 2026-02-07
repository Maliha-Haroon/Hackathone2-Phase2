'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-neon-blue/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl w-full space-y-12 relative z-10 slide-in">
        <div className="text-center space-y-6">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 neon-text flicker-animation">
              Neon Todo
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-purple to-transparent neon-glow"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Organize your life with style
          </p>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            A beautiful todo app with stunning neon lights UI. Manage your tasks with elegance and efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/login"
              className="group px-8 py-4 bg-transparent border-2 border-neon-purple text-white font-semibold rounded-lg transition-all duration-300 hover:bg-neon-purple/20 neon-glow hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/20 to-neon-purple/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            
            <Link 
              href="/signup"
              className="group px-8 py-4 bg-transparent border-2 border-neon-pink text-white font-semibold rounded-lg transition-all duration-300 hover:bg-neon-pink/20 neon-glow-pink hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/0 via-neon-pink/20 to-neon-pink/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="glass-effect p-6 rounded-xl border border-neon-purple/30 neon-glow hover:border-neon-purple/50 transition-all duration-300 slide-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Secure</h3>
            </div>
            <p className="text-gray-400">JWT-based authentication ensures your data stays safe and secure.</p>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-neon-pink/30 neon-glow-pink hover:border-neon-pink/50 transition-all duration-300 slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-neon-pink/20 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Organized</h3>
            </div>
            <p className="text-gray-400">Manage all your tasks in one beautiful, intuitive interface.</p>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-neon-blue/30 neon-glow-blue hover:border-neon-blue/50 transition-all duration-300 slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-neon-blue/20 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485m-7 7l-4-4m4 4l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Beautiful</h3>
            </div>
            <p className="text-gray-400">Stunning neon-themed UI that makes task management enjoyable.</p>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-neon-green/30 neon-glow-green hover:border-neon-green/50 transition-all duration-300 slide-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-neon-green/20 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Responsive</h3>
            </div>
            <p className="text-gray-400">Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
}