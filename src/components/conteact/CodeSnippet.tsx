"use client";
import React, { useState } from "react";
import { useFormStore } from "@/stores/formStore";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const CodeSnippet = () => {
  const { formData } = useFormStore();
  const [copied, setCopied] = useState(false);

  const codeString = `const button = document.querySelector('#sendBtn');

const message = {
  name: "${formData.name}",
  email: "${formData.email}",
  subject: "${formData.subject}",
  message: "${formData.message}",
  date: "${formData.date}"
};

button.addEventListener('click', () => {
  form.send(message);
});`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div dir="ltr" className="col-span-3 p-4">
      <div className="bg-popover rounded-lg overflow-hidden shadow-xl relative">
        {/* Header */}
        <div className="bg-secondary px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm font-medium">
            form-handler.js
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300 leading-relaxed">
            <motion.div
              key={codeString}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-blue-400">const</span>
              <span className="text-popover-foreground/80"> button = </span>
              <span className="text-yellow-400">document</span>
              <span className="text-popover-foreground/60">.</span>
              <span className="text-primary/80">querySelector</span>
              <span className="text-popover-foreground">(</span>
              <span className="text-green-400">'#sendBtn'</span>
              <span className="text-popover-foreground/60">);</span>

              <div className="mt-4"></div>

              <span className="text-blue-400">const</span>
              <span className="text-popover-foreground/80"> message = </span>
              <span className="text-popover-foreground/60">&#123;</span>

              <div className="ml-4 mt-2">
                <div>
                  <span className="text-purple-400">name</span>
                  <span className="text-popover-foreground/60">: </span>
                  <span className="text-green-400">"{formData.name}"</span>
                  <span className="text-popover-foreground/60">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">email</span>
                  <span className="text-popover-foreground/60">: </span>
                  <span className="text-green-400">"{formData.email}"</span>
                  <span className="text-popover-foreground/60">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">subject</span>
                  <span className="text-popover-foreground/60">: </span>
                  <span className="text-green-400">"{formData.subject}"</span>
                  <span className="text-popover-foreground/60">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">message</span>
                  <span className="text-popover-foreground/60">: </span>
                  <span className="text-green-400">"{formData.message}"</span>
                  <span className="text-popover-foreground/60">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">date</span>
                  <span className="text-popover-foreground/60">: </span>
                  <span className="text-green-400">"{formData.date}"</span>
                </div>
              </div>

              <div className="mt-2">
                <span className="text-popover-foreground/60">&#125;;</span>
              </div>

              <div className="mt-4"></div>

              <span className="text-yellow-400">button</span>
              <span className="text-popover-foreground/60">.</span>
              <span className="text-primary/80">addEventListener</span>
              <span className="text-popover-foreground/60">(</span>
              <span className="text-green-400">'click'</span>
              <span className="text-popover-foreground/60">, () </span>
              <span className="text-blue-400">{"=>"}</span>
              <span className="text-popover-foreground/60"> &#123;</span>

              <div className="ml-4 mt-2">
                <span className="text-yellow-400">form</span>
                <span className="text-popover-foreground/60">.</span>
                <span className="text-primary/80">send</span>
                <span className="text-popover-foreground/60">(</span>
                <span className="text-yellow-400">message</span>
                <span className="text-popover-foreground/60">);</span>
              </div>

              <div className="mt-2">
                <span className="text-popover-foreground/60">&#125;);</span>
              </div>
            </motion.div>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
