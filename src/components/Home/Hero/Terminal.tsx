import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/components/hooks/axiosPublic";
import { TypewriterText } from "./TypewriterText";

// Define TypeScript interfaces
interface CommandStep {
  text: string;
  delay: number;
}

interface Command {
  command: string;
  result?: string;
  resultSteps?: CommandStep[];
}

interface ApiResponse {
  commands: Command[];
}

const fetchCommands = async (): Promise<Command[]> => {
  const response = await axiosPublic.get<ApiResponse>("/comands.json");
  return response.data.commands;
};

const Terminal: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState<Command | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const {
    data: commands,
    isLoading,
    error,
  } = useQuery<Command[], Error>({
    queryKey: ["commands"],
    queryFn: fetchCommands,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const startNewCommand = () => {
    if (!commands || commands.length === 0) return;

    const randomIndex = Math.floor(Math.random() * commands.length);
    setCurrentCommand(commands[randomIndex]);
    setIsTyping(true);
    setShowResult(false);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    setShowResult(true);

    setTimeout(() => {
      setFadeOut(true);
    }, 3000);
  };

  const handleFadeOutComplete = () => {
    setFadeOut(false);
    startNewCommand();
  };

  useEffect(() => {
    if (commands) {
      startNewCommand();
    }
  }, [commands]);

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4">
        <p className="text-gray-400 font-mono">Loading terminal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4">
        <p className="text-red-400 font-mono">
          Error loading terminal: {error.message}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-[#0a0a0a] rounded-lg border border-gray-800 backdrop-blur-sm overflow-hidden box-shadow"
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-400">~ zsh</span>
        </div>
      </div>
      <div className="p-4 text-white font-mono text-sm space-y-2 min-h-[320px] relative">
        <AnimatePresence mode="wait" onExitComplete={handleFadeOutComplete}>
          {currentCommand && !fadeOut && (
            <motion.div
              key={currentCommand.command}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-purple-400">~/</span>
                {isTyping ? (
                  <>
                    <TypewriterText
                      text={currentCommand.command}
                      delay={100}
                      onComplete={handleTypingComplete}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-5 bg-white"
                    />
                  </>
                ) : (
                  <span className="text-white">{currentCommand.command}</span>
                )}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 whitespace-pre-wrap pl-6"
                >
                  {currentCommand.resultSteps ? (
                    <TypewriterText
                      text={currentCommand.resultSteps
                        .map((step) => step.text)
                        .join("\n")}
                      delay={50}
                      onComplete={() => {}}
                    />
                  ) : (
                    currentCommand.result
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Terminal;
