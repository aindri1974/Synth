"use client"

import { useState } from "react"
import {Link,useLocation} from "react-router"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Code, Settings, LogOut, LayoutDashboard, Users } from "lucide-react"
import { cn } from "@/lib/utils"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = useLocation();
  const user = {
    "name" : "Aindri Singh",
    "email" : "aindrisingh1974@gmail.com"

  }
  function signOut() {
    // Implement sign out logic here
  }

  const navigation = [
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Inspiration", href: "/inspiration" },
  ]

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950/20 backdrop-blur-xl border-b border-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            Synth
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2",
                  pathname.pathname === item.href ? "text-blue-400" : "text-gray-300",
                )}
              >
                {item.name === "Community" && <Users className="w-4 h-4" />}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                >
                  <Link to="/build">Build</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-400">
                        <AvatarFallback className="bg-transparent text-white font-medium">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-gray-900/95 backdrop-blur-xl border-gray-700/50"
                    align="end"
                    forceMount
                  >
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700/50" />
                    <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                      <Link to="/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800/50">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700/50" />
                    <DropdownMenuItem onClick={signOut} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                >
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:bg-gray-800/30"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-gray-900/95 backdrop-blur-xl rounded-lg mt-2 border border-gray-800/30">
            <nav className="flex flex-col gap-4 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-400 flex items-center gap-2",
                    pathname.pathname === item.href ? "text-blue-400" : "text-gray-300",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name === "Community" && <Users className="w-4 h-4" />}
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-800/50">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                  >
                    <Link to="/build">Build</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-gray-800/50">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="justify-start text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
                  >
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="justify-start bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    <Link to="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header