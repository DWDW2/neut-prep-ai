// pages/chat.tsx

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import BASE_URL from '@/lib/env';

const ChatPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [chat, setChat] = useState<{ sender: string; content: string }[]>([]);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleUpload = async () => {
    if (!file && !message) {
      toast.error('Please enter a message or select a file first');
      return;
    }

    setIsUploading(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append('photo', file);

        const uploadResponse = await fetch(`${BASE_URL}/photo/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('File upload failed');
        }

        const uploadData = await uploadResponse.json();
        const { filepath, mimetype } = uploadData;

        const generateResponse = await fetch(`${BASE_URL}/practice/generate-similar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filepath, mimetype }),
        });

        if (!generateResponse.ok) {
          throw new Error('Failed to generate similar content');
        }

        toast.success('File uploaded and processed successfully');
        setChat([...chat, { sender: 'user', content: 'File uploaded successfully' }]);
      }

      if (message) {
        setChat([...chat, { sender: 'user', content: message }]);
        setMessage('');
      }

    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Chat with File Upload</h1>
      <div className="w-full max-w-md p-4 border rounded-lg shadow">
        <div className="flex flex-col space-y-2 mb-4">
          {chat.map((chatItem, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                chatItem.sender === 'user' ? 'bg-blue-400 text-white self-end' : 'bg-gray-200 text-gray-900'
              }`}
            >
              {chatItem.content}
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="mb-4"
        />
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isUploading ? 'Uploading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
