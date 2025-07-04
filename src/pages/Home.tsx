

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Paperclip, Github, X, Wand2 } from "lucide-react"
import { Header } from "@/Header"
import { Footer } from "@/Footer"
import { useState } from "react"
import { GoogleGenAI } from "@google/genai"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })
export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const navigate = useNavigate()
  const [showSignupPrompt, setShowSignupPrompt] = useState(true)
  const [isEnhancing, setIsEnhancing] = useState(false)

  const examplePrompts = [
    "Create a financial app",
    "Design a directory website",
    "Build a project management app",
    "Make a landing page",
    "Generate a CRM",
    "Build a mobile app",
  ]

  const handleImport = (platform: string) => {
    console.log(`Importing from ${platform}`)
    toast.success("Coming Soon!", {
      description: `${platform} import will be available soon.`,
    })
  }

  const handleGenerate = () => {
    if (prompt.trim()) {
      navigate(`/build?prompt=${encodeURIComponent(prompt.trim())}`)
    }
  }

  const handleAttachment = () => {
    toast.info("Attachment feature coming soon!")
  }
  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsEnhancing(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
          role: 'user',
          parts: [{
            text: `Improve this website prompt to make it more detailed and specific in maximum 4-5 lines. 
          Keep the same core idea but add more concrete details about features, styling, 
          and functionality. Return ONLY the enhanced version, no additional commentary or labels:
          
          Original: "${prompt}"`
          }]
        },
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
          thinkingConfig: {
            thinkingBudget: 0 // Disables thinking
          }
        }
      });

      // Extract and clean the response text
      const enhancedText = response.text;



      if (!enhancedText) {
        throw new Error("No enhanced text received");
      }

      // More aggressive cleaning of the response
      const cleanedText = enhancedText
        .replace(/"/g, '') // Remove all quotes
        .replace(/^['"]|['"]$/g, '') // Remove surrounding quotes
        .replace(/^(Enhanced|Improved)( version)?:\s*/i, '') // Remove prefixes
        .replace(/^Here(?:'s| is)( the)? (enhanced|improved) (version|prompt):\s*/i, '')
        .replace(/^['"]\s*|\s*['"]$/g, '') // Trim whitespace and quotes
        .trim();

      if (!cleanedText) {
        throw new Error("Empty enhancement result after cleaning");
      }

      // Set the cleaned prompt
      setPrompt(cleanedText);
      toast.success("Prompt enhanced!");
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast.error(`Failed to enhance prompt: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsEnhancing(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && prompt.trim()) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-950 relative overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />



      <Header />

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-blue-200 text-sm">
            🚀 Join Coder Army - Frequent hackathons with amazing prizes and learning opportunities!
          </p>
        </div>
      </div>

      {/* Signup Prompt Banner */}
      {showSignupPrompt && (
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-b border-gray-800/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Save your progress and access your projects anywhere</p>
                  <p className="text-blue-200 text-sm">Sign up to keep track of your AI-generated websites</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-blue-200 hover:text-white hover:bg-blue-800/30"
                >
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  <Link to="/signup">Sign Up Free</Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowSignupPrompt(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-800/30 ml-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">What do you want to build?</h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Create stunning apps & websites by chatting with AI.
          </p>

          {/* Main Input */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can Synth help you today?"
                className="min-h-[120px] bg-gray-900/60 border-gray-800/50 text-white placeholder:text-gray-500 text-lg p-6 pr-16 resize-none backdrop-blur-sm rounded-xl hover:border-gray-700/50 focus:border-blue-500/50 transition-all duration-200"
              />
              <div className="absolute bottom-4 right-4">
                <Button size="icon" variant="ghost" className="text-gray-500 hover:text-blue-400 hover:bg-gray-800/50" onClick={handleAttachment}>
                  <Paperclip className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={handleEnhancePrompt}
                disabled={!prompt.trim() || isEnhancing}
                className="bg-gray-900/40 border-gray-800/50 text-gray-400 hover:bg-gray-800/60 hover:text-white hover:border-gray-700/50 rounded-xl transition-all duration-200"
              >
                {isEnhancing ? (
                  <>
                    <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance Prompt
                  </>
                )}
              </Button>
              <Button
                size="lg"
                onClick={handleGenerate}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                disabled={!prompt.trim()}
              >
                Generate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Import Options */}
          <div className="mb-12">
            <p className="text-gray-500 mb-4">or import from</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="bg-gray-900/40 border-gray-800/50 text-gray-400 hover:bg-gray-800/60 hover:text-white hover:border-gray-700/50 rounded-xl transition-all duration-200"
                onClick={() => handleImport("Figma")}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z" />
                </svg>
                Figma
              </Button>
              <Button
                variant="outline"
                className="bg-gray-900/40 border-gray-800/50 text-gray-400 hover:bg-gray-800/60 hover:text-white hover:border-gray-700/50 rounded-xl transition-all duration-200"
                onClick={() => handleImport("GitHub")}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="flex flex-wrap justify-center gap-3">
            {examplePrompts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(example)}
                className="bg-gray-900/40 border-gray-800/50 text-gray-400 hover:bg-gray-800/60 hover:text-white hover:border-gray-700/50 rounded-xl transition-all duration-200"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Footer />


    </motion.div>
  )
}
