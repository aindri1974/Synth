import { Link } from "react-router"
import { Code, Github, Twitter, Linkedin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800/20 bg-gray-950/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              Synth
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Build production-ready websites from a single prompt with AI-powered code generation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/build" className="text-gray-400 hover:text-white transition-colors">
                  Builder
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/inspiration" className="text-gray-400 hover:text-white transition-colors">
                  Inspiration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://www.coderarmy.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Coder Army
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/aindri1974"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/aindrisingh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/aindri-singh-077816320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/30 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              Powered by{" "}
              <a
                href="https://coderarmy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Coder Army
              </a>
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{" "}
              <a
                href="https://www.linkedin.com/in/aindri-singh-077816320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Aindri Singh
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer;