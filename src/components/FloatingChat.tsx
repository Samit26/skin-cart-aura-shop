
import { useState } from 'react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col animate-fade-in">
          <div className="bg-jet-black text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-semibold">SkinCart Support</h3>
              <p className="text-sm text-gray-300">We're here to help!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                <p className="text-sm">Hi! How can I help you today?</p>
              </div>
              <div className="text-center text-xs text-gray-500">
                Powered by OpenRouter AI
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow text-sm"
              />
              <button className="bg-cyber-yellow text-jet-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cyber-yellow text-jet-black p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-200 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

export default FloatingChat;
