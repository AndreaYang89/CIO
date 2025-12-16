import React, { useState } from 'react';
    import { Card } from './ui/Card';
    import { Label, Input, Button } from './ui/Input';
    import { RefreshCw } from 'lucide-react';
    
    export const RebalanceCalc: React.FC = () => {
      const [holdingValue, setHoldingValue] = useState<string>('');
      const [profitPct, setProfitPct] = useState<string>('15');
      const [sellPct, setSellPct] = useState<number>(50);
      const [result, setResult] = useState<{ cashIn: string; keep: string } | null>(null);
    
      const handleCalculate = () => {
        const value = parseFloat(holdingValue);
        if (isNaN(value)) return;
    
        const fraction = sellPct / 100;
        const cashIn = (value * fraction).toFixed(0);
        const keep = (value * (1 - fraction)).toFixed(0);
    
        setResult({ cashIn, keep });
      };
    
      return (
        <Card title="高低切换计算器 // REBALANCE" icon={<RefreshCw size={20} />}>
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <Label>当前持仓市值 (CNY)</Label>
              <Input 
                type="number" 
                placeholder="例如: 50000" 
                value={holdingValue}
                onChange={(e) => setHoldingValue(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label>当前浮盈比例 (%)</Label>
              <Input 
                type="number" 
                value={profitPct} 
                onChange={(e) => setProfitPct(e.target.value)}
              />
            </div>
          </div>
    
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <Label>目标止盈比例 (%)</Label>
              <span className="font-mono text-primary-neon text-sm">{sellPct}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sellPct} 
              onChange={(e) => setSellPct(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-neon hover:accent-secondary-neon"
            />
          </div>
    
          <Button variant="success" onClick={handleCalculate}>计算执行方案</Button>
    
          {result && (
            <div className="mt-5 p-4 rounded-r-lg border-l-2 border-text-muted bg-black/60 font-mono text-sm leading-relaxed animate-fade-in text-text-muted">
              <p className="mb-1">{'>'} 现金回笼 (CASH IN): <span className="text-white font-bold text-lg">{result.cashIn} CNY</span></p>
              <p className="mb-4">{'>'} 保留持仓 (HOLDING): {result.keep} CNY</p>
              <div className="border-t border-white/10 pt-3">
                <p className="text-xs uppercase tracking-wider mb-1 text-primary-neon">[下一步建议]</p>
                <p>等待目标标的（如机器人ETF）企稳，分批买入释放的资金。</p>
              </div>
            </div>
          )}
        </Card>
      );
    };