"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink, Calendar, Construction } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "../Header"
import { Footer } from "../Footer"
import { Link } from "react-router"

export default function DashboardPage() {
  return (
    <motion.div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Maintenance Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Alert className="bg-yellow-900/30 border-yellow-600/30 backdrop-blur-sm">
            <Construction className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>Under Maintenance</strong> - Project dashboard is currently being upgraded. You can view existing projects but editing is temporarily disabled.
            </AlertDescription>
          </Alert>
        </motion.div>

        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Projects</h1>
              <p className="text-muted-foreground">Manage your AI-generated websites</p>
            </div>
            <Button disabled className="opacity-50 cursor-not-allowed">
              New Project (Coming Soon)
            </Button>
          </div>

          {/* Mock projects data */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg hover:bg-gray-900/30 backdrop-blur-sm transition-shadow opacity-50 cursor-not-allowed">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">E-commerce Landing Page</CardTitle>
                  <Badge variant="default">completed</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Modern landing page for online store with product showcase</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  Updated 01/16/2024
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" disabled>
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open (Coming Soon)
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:bg-gray-900/30 backdrop-blur-sm transition-shadow opacity-50 cursor-not-allowed">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Portfolio Website</CardTitle>
                  <Badge variant="secondary">draft</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Personal portfolio with project gallery and contact form</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  Updated 01/14/2024
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" disabled>
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open (Coming Soon)
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Temporary Access Notice */}
          <div className="mt-8 text-center p-4 bg-blue-900/20 rounded-lg border border-blue-600/30">
            <p className="text-blue-200 text-sm">
              <strong>Good news!</strong> You can still use Synth without saving projects.
              <br />
              <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
                Start building now →
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}