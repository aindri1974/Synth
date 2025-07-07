"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../Header"
import Footer from "../Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Eye,
  Copy,
  Heart,
  Download,
  Code,
  Layout,
  Navigation,
  CreditCard,
  Users,
  Star,
  Filter,
  Construction,
} from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Component {
  id: string
  name: string
  description: string
  category: "navigation" | "hero" | "footer" | "card" | "form" | "layout"
  likes: number
  views: number
  author: string
  code: string
  preview: string
  tags: string[]
  type: string
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)

  const components: Component[] = [
    // Navigation Components
    {
      id: "nav-1",
      name: "Top Navigation Bar",
      description: "Clean horizontal navigation with logo and menu items",
      category: "navigation",
      type: "Top Navigation",
      likes: 124,
      views: 1250,
      author: "Synth",
      tags: ["responsive", "horizontal", "clean"],
      code: `<nav className="bg-white shadow-lg border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>`,
      preview: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "nav-2",
      name: "Sidebar Navigation",
      description: "Vertical sidebar navigation with icons and labels",
      category: "navigation",
      type: "Sidebar Navigation",
      likes: 89,
      views: 890,
      author: "Synth",
      tags: ["sidebar", "vertical", "icons"],
      code: `<div className="flex h-screen bg-gray-100">
  <div className="w-64 bg-white shadow-lg">
    <div className="flex items-center justify-center h-16 border-b">
      <span className="text-xl font-semibold">Dashboard</span>
    </div>
    <nav className="mt-5">
      <a href="#" className="flex items-center px-6 py-2 text-gray-700 bg-gray-200">
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
        </svg>
        Dashboard
      </a>
      <a href="#" className="flex items-center px-6 py-2 mt-1 text-gray-600 hover:bg-gray-200">
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
        Users
      </a>
    </nav>
  </div>
</div>`,
      preview: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "hero-1",
      name: "Gradient Hero with CTA",
      description: "Eye-catching hero section with gradient background and call-to-action",
      category: "hero",
      type: "Gradient Hero",
      likes: 189,
      views: 2890,
      author: "Synth",
      tags: ["gradient", "cta", "modern"],
      code: `<section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
  <div className="container mx-auto px-6 py-20">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6">
        Build Amazing Websites
      </h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Create stunning web experiences with our powerful tools and beautiful templates.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Get Started Free
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600">
          Watch Demo
        </button>
      </div>
    </div>
  </div>
</section>`,
      preview: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "card-1",
      name: "Feature Cards Grid",
      description: "Responsive grid of feature cards with icons and descriptions",
      category: "card",
      type: "Feature Cards",
      likes: 156,
      views: 2100,
      author: "Synth",
      tags: ["grid", "features", "icons"],
      code: `<div className="grid md:grid-cols-3 gap-8 p-8">
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Performance</h3>
    <p className="text-gray-600">Lightning fast loading times with optimized code.</p>
  </div>
</div>`,
      preview: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "footer-1",
      name: "Clean Footer",
      description: "Professional footer with links and social icons",
      category: "footer",
      type: "Multi-column Footer",
      likes: 67,
      views: 450,
      author: "Synth",
      tags: ["footer", "social", "links"],
      code: `<footer className="bg-gray-800 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Company</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
          <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
      <p className="text-gray-400">&copy; 2024 Company. All rights reserved.</p>
    </div>
  </div>
</footer>`,
      preview: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    { id: "all", name: "All Components", icon: Layout },
    { id: "navigation", name: "Navigation", icon: Navigation },
    { id: "hero", name: "Hero Sections", icon: Star },
    { id: "card", name: "Cards", icon: CreditCard },
    { id: "footer", name: "Footers", icon: Layout },
    { id: "form", name: "Forms", icon: Code },
  ]

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard!")
  }

  // const handleDownload = (component: Component) => {
  //   const blob = new Blob([component.code], { type: "text/plain" })
  //   const url = URL.createObjectURL(blob)
  //   const a = document.createElement("a")
  //   a.href = url
  //   a.download = `${component.name.toLowerCase().replace(/\s+/g, "-")}.tsx`
  //   document.body.appendChild(a)
  //   a.click()
  //   document.body.removeChild(a)
  //   URL.revokeObjectURL(url)
  //   toast.success("Component downloaded!")
  // }

  return (
    <motion.div
      className="min-h-screen bg-gray-950 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      
      <Header />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Maintenance Notice */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Alert className="bg-yellow-900/30 border-yellow-600/30 backdrop-blur-sm">
            <Construction className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>Under Maintenance</strong> - The community components library is currently being upgraded. You can browse components but downloads are temporarily disabled.
            </AlertDescription>
          </Alert>
        </motion.div>

        <div>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community Components</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover and share pre-built components created by the Synth community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400"
                />
              </div>
              <Button
                variant="outline"
                className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Fixed Category Tabs */}
            <div className="relative z-20">
              <Tabs 
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value)
                  toast.info(`Showing ${value === 'all' ? 'all' : value} components`)
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-gray-800/50 pointer-events-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 text-white text-xs md:text-sm data-[state=active]:bg-blue-600 relative z-30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <category.icon className="w-4 h-4" />
                      <span className="hidden md:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component) => (
              <Card
                key={component.id}
                className="bg-gray-900/40 border-gray-700/30 backdrop-blur-sm hover:bg-gray-900/60 hover:border-gray-600/50 transition-all duration-300 h-full"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-white mb-2">{component.name}</CardTitle>
                      <p className="text-sm text-gray-400 mb-3">{component.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{component.author}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                      {component.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Preview */}
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                    <div className="bg-white rounded p-2 text-xs font-mono text-gray-800 overflow-hidden">
                      <div className="truncate">{component.code.slice(0, 100)}...</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {component.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-gray-800/50 text-gray-400 border-gray-600/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-700/30">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{component.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{component.views}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-3 text-gray-400 hover:text-blue-400"
                            onClick={() => setSelectedComponent(component)}
                          >
                            <Code className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900 border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-white flex items-center justify-between">
                              <span>{selectedComponent?.name}</span>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => selectedComponent && handleCopyCode(selectedComponent.code)}
                                  className="text-gray-400 hover:text-blue-400"
                                >
                                  <Copy className="w-4 h-4 mr-1" />
                                  Copy
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    toast.warning("Feature disabled", {
                                      description: "Downloads are temporarily unavailable during maintenance",
                                    })
                                  }}
                                  className="text-gray-400 hover:text-green-400"
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96">
                              <pre className="text-sm text-gray-300">
                                <code>{selectedComponent?.code}</code>
                              </pre>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                              <div className="text-sm text-gray-600 mb-2">Preview:</div>
                              <div dangerouslySetInnerHTML={{ __html: selectedComponent?.code || "" }} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No components found</h3>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-600/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Share Your Components</h2>
                <p className="text-blue-200 mb-6">
                  Help the community grow by sharing your amazing components and designs
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => {
                    toast.warning("Maintenance Notice", {
                      description: "We're upgrading our submission system. Contributions will reopen soon.",
                      action: {
                        label: "Learn More",
                        onClick: () => window.open("/status", "_blank")
                      },
                    })
                  }}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Contribute Component
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}