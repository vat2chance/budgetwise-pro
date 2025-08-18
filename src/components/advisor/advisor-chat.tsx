'use client'

import { useState } from 'react'
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your AI financial advisor. I can help you with budgeting tips, expense analysis, and financial planning. What would you like to know?",
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: '2',
    type: 'user',
    content: "I'm spending too much on dining out. How can I cut back?",
    timestamp: new Date(Date.now() - 30000)
  },
  {
    id: '3',
    type: 'assistant',
    content: "I can see you've spent $450 on dining out this month, which is 25% higher than your budget. Here are some suggestions:\n\n1. **Set a weekly limit**: Try $80/week instead of $100\n2. **Cook more at home**: Plan 3-4 home-cooked meals per week\n3. **Use leftovers**: Pack lunch instead of buying\n4. **Find cheaper alternatives**: Look for happy hour deals or lunch specials\n\nWould you like me to help you adjust your dining budget?",
    timestamp: new Date(Date.now() - 15000)
  }
]

const quickQuestions = [
  "How can I save more money?",
  "What's my biggest spending category?",
  "How do I create a catch-up plan?",
  "What are some lower-cost alternatives?"
]

export function AdvisorChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm analyzing your financial data to provide personalized recommendations. This feature will be fully implemented with real AI integration in the next iteration.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">AI Financial Advisor</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="px-6 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your finances..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
