import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header";
import ChatInterface from "../chat-interface";
import CodePreviewTabs from "../code-preview-tabs";
import Footer from "@/Footer";

interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
  additions?: number;
  deletions?: number;
  isNew?: boolean;
}

interface CodeFile {
  name: string;
  content: string;
}

export default function BuildPage() {
  const [currentCode, setCurrentCode] = useState("");
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get("prompt");

  const handleGenerationStart = () => {
    setIsGenerating(true);
  };

  const handleCodeGenerated = (generatedFiles: CodeFile[]) => {
    setFiles(generatedFiles);
    setSelectedFile(generatedFiles[0]?.name || "");
    setCurrentCode(generatedFiles[0]?.content || "");
    setIsGenerated(true);
    setIsGenerating(false);

    // Create file tree structure
    const tree: FileNode[] = [];
    
    generatedFiles.forEach(file => {
      const pathParts = file.name.split('/');
      let currentLevel = tree;
      
      pathParts.forEach((part, index) => {
        const existingPath = currentLevel.find(item => item.name === part);
        
        if (existingPath) {
          currentLevel = existingPath.children || [];
        } else {
          const newItem: FileNode = {
            name: part,
            type: index === pathParts.length - 1 ? "file" : "folder",
            path: pathParts.slice(0, index + 1).join('/'),
            additions: index === pathParts.length - 1 ? Math.floor(Math.random() * 20) + 1 : undefined,
            deletions: index === pathParts.length - 1 ? Math.floor(Math.random() * 5) : undefined,
            isNew: true
          };
          
          if (index !== pathParts.length - 1) {
            newItem.children = [];
          }
          
          currentLevel.push(newItem);
          currentLevel = newItem.children || [];
        }
      });
    });
    
    setFileTree(tree);
  };

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    const file = files.find((f) => f.name === path);
    if (file) {
      setCurrentCode(file.content);
    }
  };

  const handleCodeUpdate = (newCode: string) => {
    setCurrentCode(newCode);
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.name === selectedFile ? { ...file, content: newCode } : file)),
    );
  };

  return (
    <motion.div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="min-h-screen dark-bg-pattern">
        <Header />

    

        <div className="flex h-[calc(100vh-64px)]">
          <div className="w-96 border-r border-gray-700/20 bg-gray-900/20 backdrop-blur-sm">
            <div className="h-full">
              <ChatInterface 
                onCodeGenerated={handleCodeGenerated} 
                onGenerationStart={handleGenerationStart}
                initialPrompt={initialPrompt} 
              />
            </div>
          </div>

          <div className="flex-1 bg-gray-900/20 backdrop-blur-sm">
            <CodePreviewTabs
              code={currentCode}
              selectedFile={selectedFile}
              isGenerated={isGenerated}
              isGenerating={isGenerating}
              files={files}
              fileTree={fileTree}
              onFileSelect={handleFileSelect}
              onCodeUpdate={handleCodeUpdate}
            />
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}