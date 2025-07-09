"use client";

import React from 'react';
import Image from 'next/image';

const posts = Array.from({ length: 3 }).map((_, i) => ({
  category: '질문 & 답변',
  title: `이런 질문에 답변해주실 수 있나요? ${i + 1}`,
  content: '내용입니다. 커뮤니티 게시글의 내용이 여기에 표시됩니다. 길어질 경우 여러 줄로 표시될 수 있습니다.',
  likes: (i + 1) * 5,
  comments: (i + 1) * 2,
  imageUrl: `https://picsum.photos/seed/post${i}/100/100`,
}));

export function CommunitySection() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">핏클 커뮤니티에 들어보세요</h3>
        <button className="text-sm text-gray-400 hover:underline">전체보기 &gt;</button>
      </div>
      <div className="space-y-8">
        {posts.map((post, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-blue-500 font-semibold mb-1">[{post.category}]</div>
              <div className="font-bold text-base mb-1 truncate">{post.title}</div>
              <div className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>좋아요 {post.likes}</span>
                <span>댓글 {post.comments}</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 