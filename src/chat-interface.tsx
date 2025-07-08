"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, User, Bot, Copy, Paperclip, Wand2, Share, FileText, Code, Palette, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"
import { GoogleGenAI } from "@google/genai"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  files?: { name: string; content: string }[]
  steps?: string[]
}

interface ChatInterfaceProps {
  onCodeGenerated: (files: { name: string; content: string }[]) => void
  onGenerationStart: () => void
  initialPrompt?: string | null
}

interface GenerationStep {
  file: string
  description: string
  icon: React.ReactNode
  duration: number
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY })

export function ChatInterface({ onCodeGenerated, onGenerationStart, initialPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Synth. Describe the website or app you'd like to build, and I'll generate the code for you.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [expandedSteps, setExpandedSteps] = useState<{ [key: string]: boolean }>({})
  const [hasInitialized, setHasInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  console.log(completedSteps)
  // Auto-submit initial prompt on first load
  useEffect(() => {
    if (!hasInitialized && initialPrompt && !isGenerating) {
      setHasInitialized(true)
      setInput(initialPrompt)
      handleSubmit(null, initialPrompt)
    }
  }, [initialPrompt, isGenerating, hasInitialized])

  // Generation steps configuration
  const generationSteps: GenerationStep[] = [
    {
      file: "index.html",
      description: "Creating HTML structure",
      icon: <FileText className="w-4 h-4" />,
      duration: 800,
    },
    {
      file: "styles.css",
      description: "Designing visual styles",
      icon: <Palette className="w-4 h-4" />,
      duration: 1000,
    },
    {
      file: "script.js",
      description: "Adding interactivity",
      icon: <Code className="w-4 h-4" />,
      duration: 800
    },
  ]

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle generation steps progress
  useEffect(() => {
    if (!isGenerating) return

    const timer = setTimeout(() => {
      if (currentStep < generationSteps.length) {
        setCompletedSteps(prev => [...prev, currentStep])
        setCurrentStep(prev => prev + 1)
      }
    }, generationSteps[currentStep]?.duration || 1000)

    return () => clearTimeout(timer)
  }, [isGenerating, currentStep])

  // Reset generation state
  const resetGenerationState = () => {
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const toggleSteps = (messageId: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }))
  }

  const generateWithGemini = async (prompt: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{
          role: 'user',
          parts: [{
            text: `Generate complete website code for: "${prompt}". Provide response in this JSON format:
            {
              "files": [
                {
                  "name": "index.html",
                  "content": "<!DOCTYPE html><html>...</html>"
                },
                {
                  "name": "style.css",
                  "content": "body { ... }"
                },
                {
                  "name": "script.js",
                  "content": "function ..."
                }
              ],
              "message": "Your generated website is ready!",
              "steps": [
                "1. Created HTML structure with semantic elements",
                "2. Designed responsive layout with CSS Grid/Flexbox",
                "3. Added interactive functionality with JavaScript",
                "4. Styled components with modern CSS features",
                "5. Optimized for performance and accessibility"
              ]
            } 


          CONTENT REQUIREMENTS:
          1. For ALL websites:
             - Mobile-responsive design
             - Semantic HTML5
             - Functional JavaScript
              - Pixel-perfect alignment using CSS Grid/Flexbox
             - Perfectly styled scrollbars (custom with ::-webkit-scrollbar)
             -Ensure no elements have 'overflow: hidden' that would prevent scrolling
             - Comprehensive color scheme with CSS variables
             - Consistent spacing system (rem units with 62.5% base)
             
          
         2. SPECIAL FOR LEETCODE CLONES:
           - Problem statement panel with:
             * Title, difficulty indicator (Easy/Medium/Hard with color coding)
             * Problem description with proper formatting
             * Examples with input/output boxes
             * Constraints list
             * Company tags (if available)

           - Premium-quality code editor with:
             * Syntax highlighting for multiple languages (JavaScript, Python, Java, etc.)
             * Line numbers
             * Auto-indentation
             * Bracket matching
             * Code completion suggestions
             * Multiple themes (default to dark theme)
             * Resizable editor panel
             * Language selection dropdown that changes syntax highlighting
             * Keyboard shortcuts (Tab, Shift+Tab, etc.)

           - Test case section with:
             * Input/Output fields
             * Add/Remove test case buttons
             * Run/Submit buttons with status indicators
             * Console output area

           - Full UI clone features:
             * Dark/light mode toggle (persistent)
             * Run/Submit buttons with loading states
             * Execution time/memory usage display
             * Submission results with pass/fail indicators
             * Copy code button
             * Reset code button
             * Full-screen toggle for editor

           - Implementation requirements:
             * Use Monaco Editor (like VSCode) or CodeMirror for editor component
             * Implement proper syntax highlighting for all supported languages
             * Add realistic LeetCode branding (logo, colors, etc.)
             * Make editor resizable with split panels
             * Include sample problem data if none specified
             * Add hover tooltips for icons/buttons
             * Implement proper error handling for code execution
             
          3. For social media (Instagram/Twitter):
             - Posts with images: <img src="https://picsum.photos/600/400?random=1">
             - User avatars: <img src="https://i.pravatar.cc/150?img=1">
             - Like/comment buttons
          4. For e-commerce (Amazon/Shopify):
             - Product cards: <img src="https://fakestoreapi.com/img/81.jpg">
             - Shopping cart
             - Product detail pages

             5. For dashboards/games:
             - Banners: <img src="https://placehold.co/1200x400?text=${encodeURIComponent(prompt)}">
             - Interactive elements

             6. SCROLLING REQUIREMENTS:
             - Ensure the page has enough content to naturally scroll vertically
             - Add 'scroll-behavior: smooth' to the HTML element
             - Set 'overflow-y: auto' on the main content container if needed
             - Ensure no parent elements have 'overflow: hidden' that would prevent scrolling
             - Include enough content (at least 3 screen heights worth) to demonstrate scrolling
             - Add proper margin/padding to prevent content from touching viewport edges

             7. For clones of specific platforms (e.g., Instagram, Zomato):
            - Create a pixel-perfect landing page that closely resembles the original platform
            - Use realistic placeholder images for posts, avatars, and banners
            - Follow the original platform's design language and layout structure
            - Ensure all interactive elements (buttons, forms, etc.) are functional
            
          
              
            
            Important:
             - Use the actual brand name, logo (SVG preferred), and color scheme
            - Replicate the exact UI patterns of the original platform
            
            - Implement all key features requested in the prompt
            - Ensure all interactive elements work (buttons, forms, etc.)
- Use realistic placeholder image links automatically in the website where relevant — for example:
  - Profile pictures → https://i.pravatar.cc/150
  - Post or feed images → https://picsum.photos/300
  - Banners or cover images → https://placehold.co/600x200
- Place these image URLs directly in <img> tags wherever appropriate based on the website’s context (e.g., an Instagram clone should show multiple post images and story avatars).
- Assume that images are expected wherever visual content usually appears.`
          }]
        }],
        config: {
          temperature: 0.1,
        },
      })

      const text = response.text
      if (!text) {
        throw new Error("No response text from Gemini API")
      }
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}') + 1
      const jsonString = text.slice(jsonStart, jsonEnd)

      return JSON.parse(jsonString)
    } catch (error) {
      console.error("Error generating with Gemini:", error)
      throw error
    }
  }

  const handleAttachment = () => {
    toast.info("Attachment feature coming soon!")
  }

  const handleEnhancePrompt = async () => {
    if (!input.trim()) {
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
          and functionality. Return ONLY the enhanced version, no additional commentary dont add enhanced or anything like that, just return the enhanced prompt as a string:
          
          Original: "${input}"
          If the prompt includes phrases like “clone Instagram” or “make Zomato,” generate a pixel-perfect landing page of that platform with realistic placeholder images and actual layout structure.`
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

      // Access the text directly from response
      const enhancedText = response.text;
      if (!enhancedText) {
        throw new Error("No enhanced text received");
      }

      // Clean the response
      const cleanedText = enhancedText
        .replace(/"/g, '')
        .trim()
        .replace(/^Enhanced version:\s*/i, '')
        .replace(/^Here(?:'s| is) the improved version:\s*/i, '')
        .trim();

      if (!cleanedText) {
        throw new Error("Empty enhancement result");
      }

      setInput(cleanedText);
      toast.success("Prompt enhanced!");
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast.error(`Failed to enhance prompt: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handlePublishToCommunity = () => {
    toast.info("Coming Soon!", {
      description: "Publish your website to community.",
    })
  }

  const handleSubmit = async (e: React.FormEvent | null, promptText?: string) => {
    if (e) e.preventDefault()
    const messageText = promptText || input.trim()
    if (!messageText || isGenerating) return

    // Reset and start generation
    resetGenerationState()
    setIsGenerating(true)
    onGenerationStart()

    // Add user message and clear input
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput("") // Clear textarea here

    try {
      // Start both generation and minimum loading time
      const generationPromise = generateWithGemini(messageText)
      const minimumLoadTime = new Promise(resolve => setTimeout(resolve, 2500))

      const [result] = await Promise.all([generationPromise, minimumLoadTime])

      // Mark all steps as complete
      setCompletedSteps(Array.from({ length: generationSteps.length }, (_, i) => i))
      setCurrentStep(generationSteps.length)

      if (result.files?.length > 0) {
        onCodeGenerated(result.files)
      }

      // Add completion message
      const completionMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.message || "✅ Website generated successfully!",
        timestamp: new Date(),
        files: result.files,
        steps: result.steps || [
          "1. Created basic HTML structure",
          "2. Added essential CSS styling",
          "3. Implemented core functionality",
          "4. Optimized for different screen sizes",
          "5. Ensured accessibility standards"
        ]
      }
      setMessages(prev => [...prev, completionMessage])
      setExpandedSteps(prev => ({
        ...prev,
        [completionMessage.id]: true
      }))
    } catch (error) {
      console.error("Error generating website:", error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "❌ Failed to generate website. Please try again.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
      setTimeout(resetGenerationState, 1000) // Brief delay before reset
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard!")
  }

  const copyFileContent = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("File content copied!")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8 bg-blue-600 flex-shrink-0">
                <AvatarFallback>
                  <Bot className="w-6 h-6 text-black" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800/50 text-gray-100 border border-gray-700/30"
                }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>

              {message.steps && message.steps.length > 0 && (
                <div className="mt-3 border-t border-gray-700/30 pt-3">
                  <button
                    onClick={() => toggleSteps(message.id)}
                    className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 mb-2"
                  >
                    {expandedSteps[message.id] ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    <span>Development Steps ({message.steps.length})</span>
                  </button>

                  {expandedSteps[message.id] && (
                    <div className="space-y-2">
                      {message.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex items-center justify-center w-5 h-5 bg-blue-600/20 rounded-full mt-0.5 flex-shrink-0">
                            <span className="text-xs text-blue-400">{index + 1}</span>
                          </div>
                          <p className="text-xs text-gray-300">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {message.files && message.files.length > 0 && (
                <div className="mt-3 border-t border-gray-700/30 pt-3">
                  <div className="flex items-center gap-2 text-xs text-blue-400 mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Generated Files ({message.files.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {message.files.map((file, index) => (
                      <div key={index} className="bg-gray-700/30 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-gray-300">{file.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyFileContent(file.content)}
                            className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="mt-1 h-[60px] overflow-y-auto bg-gray-800/50 rounded p-1">
                          <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                            {file.content.length > 200
                              ? `${file.content.substring(0, 200)}...`
                              : file.content}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyMessage(message.content)}
                    className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  {message.role === "assistant" && message.content.includes("✅") && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handlePublishToCommunity}
                      className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                      title="Publish to Community"
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {message.role === "user" && (
              <Avatar className="w-8 h-8 bg-gray-600 flex-shrink-0">
                <AvatarFallback>
                  <User className="w-6 h-6 text-black" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-3 justify-start">
            <Avatar className="w-8 h-8 bg-blue-600">
              <AvatarFallback>
                <Bot className="w-6 h-6 text-black" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-4 min-w-[300px]">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <span className="text-sm text-blue-400 font-medium">
                    {currentStep < generationSteps.length
                      ? generationSteps[currentStep].description
                      : "Finalizing generation..."}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {generationSteps.map((step, index) => (
                    <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-md ${index <= currentStep
                        ? "bg-gray-700/70 text-white"
                        : "bg-gray-800/30 text-white opacity-50"
                      }`}>
                      {step.icon}
                      <span className="text-xs font-mono">{step.file}</span>
                      {index < currentStep && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>
                      {currentStep >= generationSteps.length
                        ? "95%"
                        : `${Math.round((currentStep / generationSteps.length) * 100)}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: currentStep >= generationSteps.length
                          ? '95%'
                          : `${(currentStep / generationSteps.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-700/30 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="min-h-[60px] bg-gray-800/50 border-gray-700/30 text-white placeholder:text-gray-500 resize-none pr-24"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <div className="absolute bottom-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleEnhancePrompt}
                disabled={!input.trim() || isEnhancing}
                className="h-8 w-8 p-0 text-gray-500 hover:bg-white"
                title="Enhance prompt"
              >
                {isEnhancing ? <Wand2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleAttachment}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-500 hover:bg-white"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating || isEnhancing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface