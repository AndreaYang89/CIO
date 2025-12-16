import React from 'react';
import { Header } from './components/Header';
import { ArbitrageMonitor } from './components/ArbitrageMonitor';
import { RebalanceCalc } from './components/RebalanceCalc';
import { AiReviewProtocol } from './components/AiReviewProtocol';

export default function App() {
  return (
    <div className="flex justify-center p-5 md:p-10 min-h-screen">
      <div className="w-full max-w-[1000px] relative z-10 flex flex-col gap-8">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArbitrageMonitor />
          <RebalanceCalc />
          <div className="md:col-span-2">
            <AiReviewProtocol />
          </div>
        </div>

        <footer className="text-center text-text-muted text-xs font-mono mt-10 opacity-50">
          CIO 终端 // 系统版本 V2026 // 传输结束
        </footer>
      </div>
    </div>
  );
}