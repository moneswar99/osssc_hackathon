import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTIONS: Record<string, string[]> = {
  en: [
    'What crops should I plant this season?',
    'How to prevent fungal diseases?',
    'Tell me about PM-KISAN scheme',
    'Current cotton market price?',
    'When should I irrigate paddy?',
  ],
  te: [
    'Ee season lo em panta vesukovali?',
    'Panta vyadhulanu ela nirodinchali?',
    'PM-KISAN gurrchi cheppandi',
    'Patti neeti dharalu em unnayee?',
  ],
  hi: [
    'Is mausam mein kaunsi fasal ugayen?',
    'Fasal rogon se kaise bachen?',
    'PM-KISAN yojana ke baare mein batao',
    'Kapas ka aaj ka bhav kya hai?',
  ],
};

const GREETINGS: Record<string, string> = {
  en: "Namaste! 🙏 I'm KisanMitra AI, your farming assistant. I can help with crop advice, weather information, disease detection, market prices, and government schemes. Ask me anything!",
  te: "నమస్కారం! 🙏 నేను KisanMitra AI, మీ వ్యవసాయ సహాయకుడు. పంట సలహా, వాతావరణం, వ్యాధి గుర్తింపు, మార్కెట్ ధరలు మరియు ప్రభుత్వ పథకాల గురించి మీకు సహాయం చేయగలను!",
  hi: "नमस्ते! 🙏 मैं KisanMitra AI हूं, आपका कृषि सहायक। फसल सलाह, मौसम, रोग पहचान, बाजार भाव और सरकारी योजनाओं में मदद कर सकता हूं!",
};

let msgId = 1;

// Web Speech API types — extend Window for browser compatibility
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function ChatPage() {
  const { language } = useApp();
  const prevLang = useRef(language);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: msgId++,
      role: 'assistant',
      text: GREETINGS[language] ?? GREETINGS.en,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Update greeting when language changes
  useEffect(() => {
    if (prevLang.current !== language) {
      prevLang.current = language;
      setMessages([{
        id: msgId++,
        role: 'assistant',
        text: GREETINGS[language] ?? GREETINGS.en,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Text-to-speech
  const speak = useCallback((text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
    utter.lang = langMap[language] ?? 'en-IN';
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  }, [language, ttsEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: msgId++, role: 'user', text: text.trim(), timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chat(text.trim(), language);
      const assistantMsg: Message = {
        id: msgId++,
        role: 'assistant',
        text: res.response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      speak(res.response);
    } catch {
      const errMsg: Message = {
        id: msgId++,
        role: 'assistant',
        text: language === 'te'
          ? 'క్షమించండి, సర్వర్‌కు కనెక్ట్ కాలేకపోయాను. Demo data చూపిస్తున్నాను.'
          : language === 'hi'
          ? 'क्षमा करें, सर्वर से कनेक्ट नहीं हो सका। Demo mode में जवाब दे रहा हूं।'
          : 'Sorry, I could not connect to the server. Running in offline demo mode.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [language, loading, speak]);

  // Voice input
  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      alert('Speech recognition is not supported in your browser. Try Chrome.');
      return;
    }
    const recognition = new SpeechRecognitionCtor();
    const langMap: Record<string, string> = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
    recognition.lang = langMap[language] ?? 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [language, sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const suggestions = SUGGESTIONS[language] ?? SUGGESTIONS.en;

  return (
    <div className="flex flex-col max-w-2xl mx-auto" style={{ height: 'calc(100vh - 130px)' }}>
      {/* Voice controls bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span>KisanMitra AI</span>
          {language === 'te' && <span className="text-blue-600 font-medium">• తెలుగు</span>}
          {language === 'hi' && <span className="text-blue-600 font-medium">• हिंदी</span>}
          {language === 'en' && <span className="text-blue-600 font-medium">• English</span>}
        </div>
        <button
          onClick={() => {
            setTtsEnabled(!ttsEnabled);
            if (ttsEnabled) window.speechSynthesis?.cancel();
          }}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${ttsEnabled ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
          title={ttsEnabled ? 'Disable voice response' : 'Enable voice response'}
        >
          {ttsEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          {ttsEnabled ? 'Voice On' : 'Voice Off'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-green-600' : 'bg-blue-600'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">
            {language === 'te' ? 'సూచించిన ప్రశ్నలు:' : language === 'hi' ? 'सुझाए गए प्रश्न:' : 'Suggested questions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1.5 hover:bg-green-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2">
        {/* Voice button */}
        <button
          onClick={listening ? stopListening : startListening}
          className={`p-3 rounded-xl transition-all flex-shrink-0 ${
            listening
              ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={listening ? 'Stop listening' : 'Speak your question'}
          aria-label={listening ? 'Stop voice input' : 'Start voice input'}
        >
          {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder={
            listening ? '🎙 Listening…'
            : language === 'te' ? 'వ్యవసాయం గురించి అడగండి…'
            : language === 'hi' ? 'खेती के बारे में पूछें…'
            : 'Ask anything about farming…'
          }
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {listening && (
        <p className="text-xs text-center text-red-500 mt-2 flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
          Listening in {language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}… Speak clearly
        </p>
      )}
    </div>
  );
}
