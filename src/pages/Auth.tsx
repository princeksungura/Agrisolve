import { useState } from "react";
import Navbar from "@/components/Navbar";
import AuthForms from "@/components/auth/AuthForms";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Join the Agrisolve Community</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with farmers, access markets, and grow your agricultural knowledge
          </p>
        </div>

        <AuthForms onSuccess={() => setIsOpen(false)} />

        {/* Features Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">What you'll get access to:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold mb-2">Connect with Farmers</h3>
              <p className="text-muted-foreground">Join a community of 2,500+ farmers across Kenya</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="font-semibold mb-2">Access Direct Markets</h3>
              <p className="text-muted-foreground">Buy and sell produce without middlemen</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold mb-2">Expert Knowledge</h3>
              <p className="text-muted-foreground">Get answers from agricultural experts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;