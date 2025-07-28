"use client";

import React, { useState, useEffect } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const ChatLearningSection: React.FC = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [typingAnimation, setTypingAnimation] = useState(false);

  const chatExamples = [
    {
      category: "프로그래밍",
      icon: <CodeIcon sx={{ fontSize: 20 }} />,
      color: "blue",
      messages: [
        { sender: "tutor", text: "React에서 useState는 어떻게 사용하나요? 🤔", time: "14:23" },
        { sender: "student", text: "const [count, setCount] = useState(0) 이렇게 하면 되나요?", time: "14:24" },
        { sender: "tutor", text: "정확해요! 실제 예제로 보여드릴게요 💻", time: "14:24", code: true },
        { sender: "tutor", text: "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>\n}", time: "14:25", isCode: true }
      ]
    },
    {
      category: "영어회화",
      icon: <SchoolIcon sx={{ fontSize: 20 }} />,
      color: "green",
      messages: [
        { sender: "tutor", text: "How was your weekend? 😊", time: "10:15" },
        { sender: "student", text: "It was great! I went to the park.", time: "10:16" },
        { sender: "tutor", text: "That sounds lovely! 'Went to the park' is perfect. You could also say 'I visited the park' 📚", time: "10:16" },
        { sender: "student", text: "Oh, that's a good alternative! Thank you 🙏", time: "10:17" }
      ]
    },
    {
      category: "디자인",
      icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />,
      color: "purple",
      messages: [
        { sender: "tutor", text: "색상 조합에 대해 궁금한 게 있나요? 🎨", time: "16:30" },
        { sender: "student", text: "보색 조합을 사용할 때 주의점이 있을까요?", time: "16:31" },
        { sender: "tutor", text: "좋은 질문이에요! 보색은 강렬하니까 포인트로만 사용하는 게 좋아요. 예시 이미지 보내드릴게요! 📸", time: "16:32" },
        { sender: "tutor", text: "[이미지: 보색 조합 예시]", time: "16:32", isImage: true }
      ]
    }
  ];

  const benefits = [
    {
      icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
      title: "실시간 피드백",
      description: "궁금한 점을 즉시 물어보고 답변을 받을 수 있어요",
      color: "blue"
    },
    {
      icon: <PersonIcon sx={{ fontSize: 32 }} />,
      title: "개인 맞춤 학습",
      description: "나의 학습 속도와 스타일에 완벽하게 맞춰진 레슨",
      color: "green"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
      title: "24/7 접근 가능",
      description: "언제든지 편한 시간에 학습을 이어갈 수 있어요",
      color: "purple"
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "빠른 성장",
      description: "1:1 집중 케어로 더 빠르고 효과적인 학습 경험",
      color: "orange"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChat((prev) => (prev + 1) % chatExamples.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTypingAnimation(true);
    const timeout = setTimeout(() => setTypingAnimation(false), 1000);
    return () => clearTimeout(timeout);
  }, [activeChat]);

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500', 
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-14">
        
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20 mb-6">
            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
            <span>실시간 1:1 채팅</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            나만의 속도로
            <br />
            <span className="text-primary">깊이 있게</span> 배우기
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            궁금한 순간 바로 질문하고, 막히는 부분을 즉시 해결받는 학습 경험.
            <br className="hidden md:block" />
            <span className="font-semibold text-gray-800">자연스러운 대화</span>가 만드는 확실한 이해.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* 왼쪽: 채팅 시뮬레이션 */}
          <div className="relative">
            {/* 채팅 카테고리 탭 */}
            <div className="flex gap-3 mb-6">
              {chatExamples.map((chat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChat(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                             ${activeChat === index 
                               ? 'bg-primary text-white shadow-lg' 
                               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                             }`}
                >
                  {chat.icon}
                  <span>{chat.category}</span>
                </button>
              ))}
            </div>

            {/* 채팅 인터페이스 */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* 헤더 */}
              <div className="flex items-center gap-3 p-6 bg-gray-50 border-b border-gray-100">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <PersonIcon className="text-primary" sx={{ fontSize: 20 }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {chatExamples[activeChat].category} 튜터
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">온라인</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <ChatBubbleOutlineIcon className="text-gray-400" sx={{ fontSize: 20 }} />
                </div>
              </div>

              {/* 메시지들 */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {chatExamples[activeChat].messages.map((message, msgIndex) => (
                  <div key={msgIndex} className={`flex gap-3 ${message.sender === 'student' ? 'justify-end' : ''}`}>
                    {message.sender === 'tutor' && (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <PersonIcon className="text-primary" sx={{ fontSize: 16 }} />
                      </div>
                    )}
                    
                    <div className={`max-w-xs lg:max-w-sm ${message.sender === 'student' ? 'order-1' : ''}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'tutor' 
                          ? 'bg-gray-100 text-gray-800 rounded-tl-md' 
                          : 'bg-primary text-white rounded-tr-md'
                      }`}>
                        {(message as { isCode?: boolean }).isCode ? (
                          <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded-lg overflow-x-auto">
                            <code>{message.text}</code>
                          </pre>
                        ) : (message as { isImage?: boolean }).isImage ? (
                          <div className="bg-gray-200 p-4 rounded-lg text-center text-sm text-gray-600">
                            {message.text}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                    </div>

                    {message.sender === 'student' && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                        <PersonIcon className="text-blue-600" sx={{ fontSize: 16 }} />
                      </div>
                    )}
                  </div>
                ))}

                {/* 타이핑 애니메이션 */}
                {typingAnimation && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <PersonIcon className="text-primary" sx={{ fontSize: 16 }} />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 입력창 */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    placeholder="질문을 입력해보세요..."
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled
                  />
                  <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                    <PlayArrowIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 장점들 */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                왜 채팅 학습인가요?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                실시간으로 이어지는 질문과 답변, 맞춤형 설명과 즉시 피드백. 
                진정한 이해가 생기는 순간을 경험해보세요.
              </p>
            </div>

            <div className="grid gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${colorClasses[benefit.color as keyof typeof colorClasses]} text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};