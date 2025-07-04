"use client"

import { motion } from "framer-motion"
import {Header} from "../Header"
import Footer from "../Footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Zap, Brain, Rocket, Users, Globe, Shield, Sparkles } from "lucide-react"

export default function AboutPage() {
  const technologies = [
    "React 14",
    "TypeScript",
    "Tailwind CSS",
    "ShadCN UI",
    "Framer Motion",
    "Web Containers",
    "Gemini API",
    "Vercel",
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Generation",
      description:
        "Leveraging Gemini's advanced AI models to generate production-ready code from natural language descriptions.",
    },
    {
      icon: Code,
      title: "Modern Tech Stack",
      description:
        "Built with React, TypeScript, and the latest web technologies for optimal performance and developer experience.",
    },
    {
      icon: Zap,
      title: "Real-time Experience",
      description:
        "Watch your ideas come to life with streaming code generation and live file tree updates in real-time.",
    },
    {
      icon: Rocket,
      title: "Instant Deployment",
      description: "Deploy your generated websites to Vercel with a single click or export as downloadable projects.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Websites Generated", icon: Globe },
    { number: "5K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "< 30s", label: "Average Generation Time", icon: Zap },
  ]

  return (
      <motion.div
      className="min-h-screen bg-gray-950 relative overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
    
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About Synth</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Revolutionizing web development through the power of artificial intelligence and modern web technologies.
            </p>
          </div>

          <div className="space-y-16">
            {/* Mission Section */}
            <div className="relative">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-8 hover:border-gray-700/50 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Synth was created to democratize web development by making it accessible to everyone, regardless of
                  their coding experience. We believe that great ideas shouldn't be limited by technical barriers, and
                  our AI-powered platform bridges that gap by transforming natural language descriptions into fully
                  functional, production-ready websites.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Powered by Google's advanced AI models, Synth represents the next generation of
                  development tools that understand context, generate clean code, and deliver exceptional results in
                  seconds rather than hours.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-900/20 border border-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gray-900/60 hover:border-gray-700/50 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-gray-900/20 border-gray-800/30 backdrop-blur-sm h-full rounded-xl hover:bg-gray-900/60 hover:border-gray-700/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What Makes Us Different */}
            <div className="relative">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-8 md:p-12 hover:border-gray-700/50 transition-all duration-700">
                <div className="text-center mb-8">
                  <Sparkles className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-4">What Makes Synth Different</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <p>
                        <strong className="text-white">Gemini API  Integration:</strong> Unlike other platforms, we use
                        Google's Gemini API for superior code generation, understanding context and nuance in your
                        requirements.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <p>
                        <strong className="text-white">Real-time Streaming:</strong> Watch your code being generated
                        live with our streaming interface, providing transparency and engagement throughout the process.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <p>
                        <strong className="text-white">One-Click Deployment:</strong> Seamlessly deploy your generated
                        websites to Vercel with integrated deployment pipeline and automatic optimization.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <p>
                        <strong className="text-white">Modern Architecture:</strong> Built with React, TypeScript,
                        and cutting-edge web technologies for unmatched performance and reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Section */}
            <div className="relative">
              <div className="bg-gray-900/20 border border-gray-800/30 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-900/60 hover:border-gray-700/50 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Powered By Modern Technology</h2>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:bg-gray-700/50 hover:text-white transition-all duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-300 text-center max-w-2xl mx-auto">
                  We leverage cutting-edge technologies including Gemini API for AI-powered code generation, ensuring
                  your websites are fast, modern, and built with industry best practices. Our platform combines the
                  power of web containers with proven web development frameworks to deliver exceptional results.
                </p>
              </div>
            </div>

            {/* Vision Section */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 md:p-12 hover:border-gray-700/50 transition-all duration-700">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center shadow-xl mx-auto border border-blue-500/30">
                      <Rocket className="w-12 h-12 text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">The Future of Web Development</h2>
                  <p className="text-blue-200 text-xl mb-6">Where Innovation Meets Simplicity</p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
                    Synth represents a paradigm shift in how we approach web development. By combining the creativity and
                    vision of human developers with the speed and precision of AI, we're creating a future where anyone
                    can bring their digital ideas to life.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                    Whether you're a seasoned developer looking to accelerate your workflow or a complete beginner with
                    a great idea, Synth empowers you to create professional, scalable web applications with unprecedented
                    ease and speed.
                  </p>
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl">
                    <a href="/build">Start Building Today</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}
