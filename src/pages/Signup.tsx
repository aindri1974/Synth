"use client"

import { motion } from "framer-motion"
import {Link} from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Github, Code, ArrowLeft, Construction } from "lucide-react"

export default function SignUpPage() {
  return (
    <motion.div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          {/* Maintenance Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Alert className="bg-yellow-900/30 border-yellow-600/30 backdrop-blur-sm">
              <Construction className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                <strong>Under Maintenance</strong> - Authentication system is currently being upgraded. We'll be back soon
                with enhanced security features!
              </AlertDescription>
            </Alert>
          </motion.div>

          <Card className="bg-gray-900/40 border-gray-700/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">Create your account</CardTitle>
              <p className="text-gray-400">Start building amazing websites with AI</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Sign Up */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    disabled
                    className="bg-gray-800/30 border-gray-600/30 text-white placeholder:text-gray-400 opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled
                    className="bg-gray-800/30 border-gray-600/30 text-white placeholder:text-gray-400 opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    disabled
                    className="bg-gray-800/30 border-gray-600/30 text-white placeholder:text-gray-400 opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white opacity-50"
                  disabled={true}
                >
                  Create account (Coming Soon)
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-gray-700/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="flex justify-center gap-4">
                <button
                  disabled
                  className="w-12 h-12 bg-gray-800/30 border border-gray-600/50 rounded-lg flex items-center justify-center hover:bg-gray-700/50 transition-colors opacity-50 cursor-not-allowed"
                  title="Sign up with Google (Coming Soon)"
                >
                  <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                <button
                  disabled
                  className="w-12 h-12 bg-gray-800/30 border border-gray-600/50 rounded-lg flex items-center justify-center hover:bg-gray-700/50 transition-colors opacity-50 cursor-not-allowed"
                  title="Sign up with GitHub (Coming Soon)"
                >
                  <Github className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-400 hover:text-blue-300 underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Temporary Access Notice */}
              <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-600/30">
                <p className="text-blue-200 text-sm">
                  <strong>Good news!</strong> You can still use Synth without an account.
                  <br />
                  <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
                    Start building now →
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}