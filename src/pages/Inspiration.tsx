"use client"

import { motion } from "framer-motion"
import Header from "../Header"
import Footer from "../Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Lightbulb } from "lucide-react"

export default function Inspiration() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">My Inspiration</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The journey behind Synth and the people who made it possible
            </p>
          </div>

          <div className="space-y-12">
            {/* Rohit Negi Section */}
            <Card className="bg-gray-900/20 border-gray-700/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <img className="rounded-full" src="bhaiya.png" alt="" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Rohit Negi</h2>
                    <p className="text-blue-200">My Mentor & Guide</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Rohit bhaiya is an exceptional mentor who has shaped my journey as a developer. His deep expertise in
                  full-stack development and passion for teaching made complex concepts accessible to me. He introduced
                  me to modern technologies like gemini api and showed me how AI can enhance development workflows. His
                  patient guidance and practical approach to problem-solving have been instrumental in my growth as a
                  developer.
                </p>
              </CardContent>
            </Card>

            {/* Coder Army Section */}
            <Card className="bg-gray-900/20 border-gray-700/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">Coder Army</h2>
                    <p className="text-green-200">The Community That Empowers</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Coder Army is more than just a learning platform—it's a thriving community where developers support
                  each other's growth. Through regular hackathons, coding challenges, and collaborative projects, it has
                  created an environment where learning happens naturally. The community's emphasis on practical skills
                  and real-world applications has been invaluable in my development journey.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <a href="https://coderarmy.com" target="_blank" rel="noopener noreferrer">
                    Join Coder Army
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Personal Journey Section */}
            <Card className="bg-gray-900/20 border-gray-700/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">My Exploration</h2>
                    <p className="text-purple-200">Learning & Building</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With Rohit bhaiya's guidance and the supportive environment of Coder Army, I began exploring the
                  intersection of AI and web development. I dove deep into gemini api, experimented with different AI
                  models, and learned how to integrate them seamlessly into modern web applications. This exploration
                  led to the creation of Synth—a platform that combines the power of AI with intuitive design to make web
                  development accessible to everyone. The journey taught me that with the right mentorship and community
                  support, any ambitious project becomes achievable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}

