// components/CodeSnippet.tsx
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
    <div className="col-span-3 p-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl relative">
        {/* Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
              <span className="text-gray-300"> button = </span>
              <span className="text-yellow-400">document</span>
              <span className="text-gray-300">.</span>
              <span className="text-blue-300">querySelector</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-400">'#sendBtn'</span>
              <span className="text-gray-300">);</span>

              <div className="mt-4"></div>

              <span className="text-blue-400">const</span>
              <span className="text-gray-300"> message = </span>
              <span className="text-gray-300">&#123;</span>

              <div className="ml-4 mt-2">
                <div>
                  <span className="text-purple-400">name</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">"{formData.name}"</span>
                  <span className="text-gray-300">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">email</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">"{formData.email}"</span>
                  <span className="text-gray-300">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">message</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">"{formData.message}"</span>
                  <span className="text-gray-300">,</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">date</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-green-400">"{formData.date}"</span>
                </div>
              </div>

              <div className="mt-2">
                <span className="text-gray-300">&#125;;</span>
              </div>

              <div className="mt-4"></div>

              <span className="text-yellow-400">button</span>
              <span className="text-gray-300">.</span>
              <span className="text-blue-300">addEventListener</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-400">'click'</span>
              <span className="text-gray-300">, () </span>
              <span className="text-blue-400">{"=>"}</span>
              <span className="text-gray-300"> &#123;</span>

              <div className="ml-4 mt-2">
                <span className="text-yellow-400">form</span>
                <span className="text-gray-300">.</span>
                <span className="text-blue-300">send</span>
                <span className="text-gray-300">(</span>
                <span className="text-yellow-400">message</span>
                <span className="text-gray-300">);</span>
              </div>

              <div className="mt-2">
                <span className="text-gray-300">&#125;);</span>
              </div>
            </motion.div>
          </pre>
        </div>

        {/* Line Numbers */}
        {/* <div className="absolute left-0 top-16 pt-4 pb-4 pr-4 text-gray-500 text-sm font-mono select-none pointer-events-none">
          {codeString.split("\n").map((_, index) => (
            <div key={index} className="leading-relaxed">
              {index + 1}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CodeSnippet;
