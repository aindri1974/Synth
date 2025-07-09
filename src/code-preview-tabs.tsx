"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Smartphone,
  Monitor,
  Copy,
  Download,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  RefreshCw,
  ExternalLink,
  Edit3,
  Save,
  RotateCcw,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import JSZip from "jszip"
import { Vercel } from "@vercel/sdk"

const vercel = new Vercel({
  bearerToken: import.meta.env.VITE_VERCEL_TOKEN,
})

interface FileNode {
  name: string
  type: "file" | "folder"
  path: string
  children?: FileNode[]
  additions?: number
  deletions?: number
  isNew?: boolean
}

interface CodeFile {
  name: string
  content: string
}

interface CodePreviewTabsProps {
  code: string
  selectedFile: string
  isGenerated: boolean
  isGenerating: boolean
  files: CodeFile[]
  fileTree: FileNode[]
  onFileSelect: (path: string) => void
  onCodeUpdate: (code: string) => void
}

export default function CodePreviewTabs({
  code,
  selectedFile,
  isGenerated,
  isGenerating,
  files,
  fileTree,
  onFileSelect,
  onCodeUpdate,
}: CodePreviewTabsProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/", "/app", "/components"]))
  const [iframeKey, setIframeKey] = useState(0)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState("")
  const [displayedCode, setDisplayedCode] = useState("")
  const [animatedFiles, setAnimatedFiles] = useState<{ [key: string]: boolean }>({})
  const [hasGeneratedBefore, setHasGeneratedBefore] = useState(false)
  console.log("Hello World");
  // New states for edit functionality
  const [isEditMode, setIsEditMode] = useState(false)
  const [originalCode, setOriginalCode] = useState("")
  const [editedCode, setEditedCode] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [originalGeneratedCode, setOriginalGeneratedCode] = useState("")

  const codeTextareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Generate static preview from files
  useEffect(() => {
    if (!isGenerated || !files.length) return
    setIsLoadingPreview(true)
    try {
      const htmlFile = files.find((file) => file.name === "index.html")?.content || ""
      const cssFiles = files
        .filter((file) => file.name.endsWith(".css"))
        .map((f) => f.content)
        .join("\n")
      const jsFiles = files
        .filter((file) => file.name.endsWith(".js"))
        .map((f) => f.content)
        .join("\n")

      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>${cssFiles}</style>
          </head>
          <body>
            ${htmlFile}
            <script>
              // Prevent navigation and form submissions
              document.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' && e.target.href) {
                  e.preventDefault();
                  return false;
                }
              });
              
              document.addEventListener('submit', function(e) {
                e.preventDefault();
                return false;
              });
              
              // Prevent window.open
              window.open = function() { return null; };
              
              ${jsFiles}
            </script>
          </body>
        </html>
      `
      setPreviewHtml(fullHtml)
    } catch (err) {
      console.error("Error generating preview:", err)
      toast.error("Failed to generate preview")
    } finally {
      setIsLoadingPreview(false)
    }
  }, [files, isGenerated])

  // Handle iframe load to prevent navigation
  const handleIframeLoad = () => {
    setIsLoadingPreview(false)

    try {
      const iframe = iframeRef.current
      if (iframe && iframe.contentWindow) {
        // Additional prevention of navigation
        iframe.contentWindow.addEventListener("beforeunload", (e) => {
          e.preventDefault()
          return false
        })
      }
    } catch {
      // Cross-origin restrictions might prevent this, but that's okay
      console.log("Could not access iframe content (expected for security)")
    }
  }

  // Store original code when code changes
  useEffect(() => {
    if (code && !isEditMode) {
      setOriginalCode(code)
      setEditedCode(code)
      setHasUnsavedChanges(false)
      // Store the original generated code only when it first comes in
      if (!originalGeneratedCode || selectedFile !== selectedFile) {
        setOriginalGeneratedCode(code)
      }
    }
  }, [code, selectedFile])

  // Vercel deployment function
  const deployToVercel = async () => {
    if (!files.length) {
      toast.error("No files to deploy")
      return
    }

    setIsDeploying(true)
    try {
      const flattenFiles = (nodes: FileNode[]): CodeFile[] => {
        let result: CodeFile[] = []
        nodes.forEach((node) => {
          if (node.type === "file") {
            const fileContent = files.find((f) => f.name === node.name)?.content || ""
            result.push({
              name: node.name,
              content: fileContent,
            })
          } else if (node.children) {
            result = result.concat(flattenFiles(node.children))
          }
        })
        return result
      }

      const deploymentFiles = flattenFiles(fileTree)
      const indexHtml = deploymentFiles.find((f) => f.name === "index.html")
      if (indexHtml) {
        let content = indexHtml.content
        content = content.replace(/href="\/?([^"]*\.css)"/g, `href="$1"`)
        content = content.replace(/src="\/?([^"]*\.js)"/g, `src="$1"`)
        indexHtml.content = content
      }

      deploymentFiles.push({
        name: "vercel.json",
        content: JSON.stringify(
          {
            version: 2,
            builds: [
              { src: "index.html", use: "@vercel/static" },
              { src: "*.css", use: "@vercel/static" },
              { src: "*.js", use: "@vercel/static" },
            ],
            routes: [{ src: "/(.*)", dest: "/$1" }],
          },
          null,
          2,
        ),
      })

      const deployment = await vercel.deployments.createDeployment({
        requestBody: {
          name: "synth-project",
          target: "production",
          files: deploymentFiles.map((file) => ({
            file: file.name,
            data: file.content,
          })),
          projectSettings: {
            framework: null,
            buildCommand: null,
            outputDirectory: null,
            installCommand: null,
            rootDirectory: null,
          },
        },
      })

      const deploymentUrl = `https://${deployment.url}`
      setDeploymentUrl(deploymentUrl)
      setShowSuccessDialog(true)
      toast.success("Deployed successfully!")
    } catch (error: unknown) {
      console.error("Deployment error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast.error(`Deployment failed: ${errorMessage}`)
    } finally {
      setIsDeploying(false)
    }
  }

  // Typewriter effect for code display
  // Replace the current typewriter effect useEffect with this:
  useEffect(() => {
    if (!code || hasGeneratedBefore || !isGenerated || isEditMode) return

    // Set a timeout to stop the typewriter effect after 10 seconds
    const timeoutId = setTimeout(() => {
      setDisplayedCode(code)
      setHasGeneratedBefore(true)
    }, 10000) // 10 seconds

    let currentIndex = 0
    const typingSpeed = Math.min(20000 / code.length, 30) // Set a minimum speed so it doesn't go too fast

    const typeCode = () => {
      if (currentIndex < code.length) {
        setDisplayedCode((prev) => prev + code[currentIndex])
        currentIndex++
        setTimeout(typeCode, typingSpeed)
      } else {
        clearTimeout(timeoutId)
        setHasGeneratedBefore(true)
      }
    }

    setDisplayedCode("")
    typeCode()

    return () => {
      clearTimeout(timeoutId)
      currentIndex = code.length // This will stop the typing effect
    }
  }, [code, selectedFile, isGenerated, isEditMode])

  // Update displayed code when not typing
  useEffect(() => {
    if (!code || !hasGeneratedBefore || isEditMode) return
    if (isGenerating) {
      setDisplayedCode("")
    } else {
      setDisplayedCode(code)
      setTimeout(() => {
        if (codeTextareaRef.current) {
          codeTextareaRef.current.scrollTop = codeTextareaRef.current.scrollHeight
        }
      }, 100)
    }
  }, [code, selectedFile, isGenerating, hasGeneratedBefore, isEditMode])

  // File animation effects
  useEffect(() => {
    if (!files.length) return
    files.forEach((file) => {
      if (!animatedFiles[file.name]) {
        setAnimatedFiles((prev) => ({ ...prev, [file.name]: true }))
        setTimeout(() => {
          setAnimatedFiles((prev) => ({ ...prev, [file.name]: false }))
        }, 1000)
      }
    })
  }, [files])

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (codeTextareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = codeTextareaRef.current.scrollTop
    }
  }

  // Generate line numbers
  const generateLineNumbers = (text: string) => {
    const lines = text.split("\n").length
    return Array.from({ length: lines }, (_, i) => i + 1)
  }

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop() || "txt"
  }

  const getLanguageFromExtension = (ext: string) => {
    const languageMap: Record<string, string> = {
      tsx: "typescript",
      ts: "typescript",
      jsx: "javascript",
      js: "javascript",
      css: "css",
      scss: "scss",
      json: "json",
      md: "markdown",
      html: "html",
    }
    return languageMap[ext] || "text"
  }

  const handleCopy = () => {
    const textToCopy = isEditMode ? editedCode : displayedCode
    navigator.clipboard.writeText(textToCopy)
    toast.success("Code copied to clipboard!")
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setEditedCode(displayedCode)
    setOriginalCode(displayedCode)
    setHasUnsavedChanges(false)
  }

  const handleSave = () => {
    onCodeUpdate(editedCode)
    setDisplayedCode(editedCode)
    setOriginalCode(editedCode)
    setIsEditMode(false)
    setHasUnsavedChanges(false)
    toast.success("Changes saved successfully!")
  }

  const handleUndo = () => {
    setEditedCode(originalCode)
    setDisplayedCode(originalCode)
    setHasUnsavedChanges(originalCode !== originalGeneratedCode)
    toast.success("Undid changes!")
  }

  const handleRevert = () => {
    setEditedCode(originalGeneratedCode)
    setDisplayedCode(originalGeneratedCode)
    setOriginalCode(originalGeneratedCode)
    setIsEditMode(false)
    setHasUnsavedChanges(false)
    onCodeUpdate(originalGeneratedCode)
    toast.success("Reverted to original generated code!")
  }

  const handleCodeChange = (value: string) => {
    setEditedCode(value)
    setHasUnsavedChanges(value !== originalCode)
  }

  const handleExportZip = async () => {
    if (!files.length) {
      toast.error("No files to export")
      return
    }

    const zip = new JSZip()
    files.forEach((file) => {
      zip.file(file.name, file.content)
    })

    try {
      const content = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = "synth-project.zip"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Project exported successfully!")
    } catch (err) {
      console.error("Export error:", err)
      toast.error("Failed to export project")
    }
  }

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const refreshPreview = () => {
    setIframeKey((prev) => prev + 1)
  }

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.path)
    const isSelected = selectedFile === node.path
    const isAnimated = animatedFiles[node.path]
    const lineCount = node.type === "file"
      ? files.find(f => f.name === node.name)?.content.split('\n').length
      : 0
    return (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-800/50 transition-all duration-300",
            isSelected && "bg-blue-600/20 text-blue-400",
            isAnimated && "scale-105 bg-blue-500/20",
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.path)
            } else {
              onFileSelect(node.path)
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              {isExpanded ? <FolderOpen className="w-3 h-3" /> : <Folder className="w-3 h-3" />}
            </>
          ) : (
            <>
              <div className="w-3" />
              <File className="w-3 h-3" />
            </>
          )}
          <span className="flex-1 text-xs">{node.name}</span>
          {node.type === "file" && node.isNew && <span className="text-xs text-green-400 ml-2">new</span>}
          {node.type === "file" && (
            <span className="text-xs text-green-400 ml-2">
              +{lineCount} {lineCount !== 1 ? '' : ''}
            </span>
          )}


        </div>
        {node.type === "folder" && isExpanded && node.children && (
          <div>{node.children.map((child) => renderFileNode(child, depth + 1))}</div>
        )}
      </div>
    )
  }

  const currentCode = isEditMode ? editedCode : displayedCode
  const lineNumbers = generateLineNumbers(currentCode)

  return (
    <div className="h-full flex flex-col">
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deployment Successful!</AlertDialogTitle>
            <AlertDialogDescription>Your website has been successfully deployed to Vercel.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <p className="text-sm font-mono break-all">
              <a
                href={deploymentUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {deploymentUrl?.replace("http://", "https://").replace(/\/$/, "")}
              </a>
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                const cleanUrl = deploymentUrl?.replace("http://", "https://").replace(/\/$/, "")
                navigator.clipboard.writeText(cleanUrl || "")
                toast.success("Production URL copied to clipboard!")
              }}
              className="flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                const cleanUrl = deploymentUrl?.replace("http://", "https://").replace(/\/$/, "")
                window.open(cleanUrl || "", "_blank")
              }}
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between border-b border-gray-700/20 px-4 py-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "preview"
                ? "text-white bg-gray-800/50 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "code"
                ? "text-white bg-gray-800/50 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "preview" && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("desktop")}
                className={cn("h-8 w-8 p-0", viewMode === "desktop" ? "bg-white text-black" : "bg-black text-white")}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setViewMode("mobile")}
                className={cn("h-8 w-8 p-0", viewMode === "mobile" ? "bg-white text-black" : "bg-black text-white")}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={refreshPreview} className="h-8 w-8 p-0 bg-black text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </>
          )}

          {activeTab === "code" && selectedFile && (
            <>
              <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-300">
                {getLanguageFromExtension(getFileExtension(selectedFile))}
              </Badge>
              {hasUnsavedChanges && (
                <Badge variant="secondary" className="text-xs bg-yellow-600/20 text-yellow-400">
                  Unsaved
                </Badge>
              )}
              {isEditMode ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-8 px-3 bg-black text-white hover:bg-white hover:text-black"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleUndo}
                    className="h-8 px-3 bg-black text-white hover:bg-white hover:text-black"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Undo
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleRevert}
                    className="h-8 px-3 bg-black text-white hover:bg-white hover:text-black"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Revert
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEdit}
                  className="h-8 px-3 bg-black text-white hover:bg-white hover:text-black"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}

            </>
          )}

          {isGenerated && (
            <>
              <Button size="sm" variant="ghost" onClick={handleExportZip} className="h-8 px-3 bg-black text-white">
                <Download className="w-4 h-4 mr-1" />
                ZIP
              </Button>
              <Button
                size="sm"
                className="bg-black text-white hover:bg-gray-800 px-3 h-8"
                onClick={deployToVercel}
                disabled={isDeploying}
              >
                {isDeploying ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
                {isDeploying ? "Deploying..." : "Deploy to Vercel"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "preview" ? (
          <div className="h-full bg-white relative">
            {isGenerating && (
              <div className="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
                  <p className="text-white">Generating your website...</p>
                </div>
              </div>
            )}
            <div
              className={`h-full ${viewMode === "mobile"
                  ? "max-w-sm mx-auto border-x-8 border-b-8 border-gray-800 rounded-3xl overflow-hidden"
                  : "w-full"
                }`}
            >
              {isGenerated ? (
                previewHtml ? (
                  <>
                    {isLoadingPreview && (
                      <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <RefreshCw className="w-16 h-16 mx-auto mb-4 animate-spin opacity-50" />
                          <h3 className="text-lg font-medium mb-2">Building Preview...</h3>
                          <p className="text-sm">This may take a moment</p>
                        </div>
                      </div>
                    )}
                    <iframe
                      ref={iframeRef}
                      key={iframeKey}
                      srcDoc={previewHtml}
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      className="w-full h-full border-0"
                      title="Live Preview"
                      onLoad={handleIframeLoad}
                    />
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <RefreshCw className="w-16 h-16 mx-auto mb-4 animate-spin opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Preparing Preview...</h3>
                      <p className="text-sm">This may take a moment</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center text-gray-500">
                    <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No preview available</h3>
                    <p className="text-sm">Start a conversation to generate and preview your website</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex">
            {isGenerated && (
              <div className="w-64 border-r border-gray-700/20 bg-gray-950/30 overflow-y-auto">
                <div className="p-3 border-b border-gray-700/30">
                  <h3 className="text-sm font-medium text-white">Files</h3>
                </div>
                <div className="p-2">
                  <div className="space-y-1 text-white">{fileTree.map((node) => renderFileNode(node))}</div>
                </div>
              </div>
            )}
            <div className="flex-1 bg-gray-950/50 text-gray-100 overflow-hidden flex flex-col relative">
              {isGenerating && (
                <div className="absolute inset-0 bg-gray-900/80 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-white mx-auto mb-2" />
                    <p className="text-white">Generating code files...</p>
                  </div>
                </div>
              )}
              {selectedFile && (currentCode || isEditMode) ? (
                <>
                  <div className="p-2 border-b border-gray-700/30 bg-gray-900/50 flex justify-between items-center">
                    <span className="text-sm text-gray-400 truncate max-w-[80%]">{selectedFile}</span>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 w-7 p-0 hover:bg-gray-700">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    {/* Line Numbers */}
                    <div
                      ref={lineNumbersRef}
                      className="w-12 bg-gray-900/70 border-r border-gray-700/30 overflow-hidden text-right pr-2 py-4 text-xs text-gray-500 font-mono leading-5"
                      style={{
                        userSelect: "none",
                        overflowY: "hidden",
                      }}
                    >
                      {lineNumbers.map((num) => (
                        <div key={num} className="h-5 flex items-center justify-end">
                          {num}
                        </div>
                      ))}
                    </div>
                    {/* Code Editor */}
                    <Textarea
                      ref={codeTextareaRef}
                      value={currentCode}
                      onChange={(e) => (isEditMode ? handleCodeChange(e.target.value) : undefined)}
                      readOnly={!isEditMode}
                      onScroll={handleScroll}
                      className={cn(
                        "flex-1 bg-transparent border-0 text-sm font-mono resize-none focus:ring-0 text-gray-100 p-4 leading-5",
                        !isEditMode && "cursor-default",
                        isEditMode && "cursor-text",
                      )}
                      style={{
                        minHeight: "calc(100vh - 200px)",
                        tabSize: 2,
                        outline: "none",
                        boxShadow: "none",
                      }}
                      spellCheck={false}
                    />
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center">{/* Loading content */}</div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-4">📄</div>
                      <h3 className="text-lg font-medium mb-2">
                        {isGenerated ? "Select a file to edit" : "No files generated yet"}
                      </h3>
                      <p className="text-sm">
                        {isGenerated
                          ? "Choose a file from the tree to view and edit its contents"
                          : "Start a conversation to generate code files"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
