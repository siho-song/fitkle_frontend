"use client";

import React, { useState, useEffect } from 'react';
import { useFriendInviteStore } from '@/store/friendInviteStore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export function FriendInviteForm() {
  const { inviteCode, generateInviteCode, sendInvite } = useFriendInviteStore();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // 초기 초대 코드 생성
  useEffect(() => {
    if (!inviteCode) {
      generateInviteCode();
    }
  }, [inviteCode, generateInviteCode]);

  const inviteLink = `https://fitkle.com/signup?ref=${inviteCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // 폴백: 텍스트 선택
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // 이메일 형식 간단 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    sendInvite(email);
    setEmailSent(true);
    setEmail('');
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleSocialShare = (platform: string) => {
    const message = `안녕! Fitkle에서 함께 새로운 스킬을 배워보지 않을래? 내 초대 링크로 가입하면 특별 혜택도 받을 수 있어! ${inviteLink}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* 초대 링크 공유 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShareIcon className="text-primary" />
          초대 링크 공유
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              내 초대 코드
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <code className="text-lg font-mono font-bold text-primary">{inviteCode}</code>
              </div>
              <button
                onClick={generateInviteCode}
                className="px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                새로 만들기
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              초대 링크
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <span className="text-sm text-gray-700 break-all">{inviteLink}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {copied ? (
                  <>
                    <CheckIcon sx={{ fontSize: 20 }} />
                    복사됨
                  </>
                ) : (
                  <>
                    <ContentCopyIcon sx={{ fontSize: 20 }} />
                    복사
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 이메일 초대 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <EmailIcon className="text-primary" />
          이메일로 초대
        </h2>
        
        <form onSubmit={handleEmailInvite} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              친구 이메일 주소
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={!email.trim()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  emailSent
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                {emailSent ? '전송완료!' : '초대 보내기'}
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            💡 친구가 이메일을 통해 가입하면 자동으로 초대 혜택이 적용됩니다.
          </div>
        </form>
      </div>

      {/* 소셜 미디어 공유 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">소셜 미디어로 공유</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleSocialShare('whatsapp')}
            className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <WhatsAppIcon className="text-green-600" sx={{ fontSize: 24 }} />
            <span className="font-medium text-gray-700">WhatsApp</span>
          </button>
          
          <button
            onClick={() => handleSocialShare('facebook')}
            className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <FacebookIcon className="text-blue-600" sx={{ fontSize: 24 }} />
            <span className="font-medium text-gray-700">Facebook</span>
          </button>
          
          <button
            onClick={() => handleSocialShare('twitter')}
            className="flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <TwitterIcon className="text-blue-400" sx={{ fontSize: 24 }} />
            <span className="font-medium text-gray-700">Twitter</span>
          </button>
        </div>
      </div>

      {/* 초대 팁 */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-3">💡 초대 성공 팁</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 관심사가 비슷한 친구들에게 먼저 초대해보세요</li>
          <li>• 어떤 수업을 함께 들으면 좋을지 구체적으로 제안해보세요</li>
          <li>• 초대 혜택에 대해 명확하게 설명해주세요</li>
          <li>• 초대받은 친구가 30일 내에 가입해야 혜택이 적용됩니다</li>
        </ul>
      </div>
    </div>
  );
}