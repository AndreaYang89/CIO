import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-end border-b border-white/10 pb-5">
      <div className="brand">
        <span className="text-xs md:text-sm text-primary-neon tracking-[2px] uppercase font-semibold block mb-1">
          个人资产管理系统
        </span>
        <h1 className="font-mono text-3xl md:text-4xl m-0 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-text-muted">
          CIO 首席投资官终端
        </h1>
      </div>
      <div className="text-right font-mono text-xs text-text-muted leading-relaxed hidden sm:block">
        系统状态: <span className="text-success">在线</span><br />
        接入节点: <span>新加坡</span><br />
        当前用户: <span>管理员</span>
      </div>
    </header>
  );
};