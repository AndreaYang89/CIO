import React, { useState } from 'react';
    import { Card } from './ui/Card';
    import { Label, Input, Button } from './ui/Input';
    import { Activity, AlertTriangle, TrendingUp } from 'lucide-react';
    
    export const ArbitrageMonitor: React.FC = () => {
      const [usdRate, setUsdRate] = useState<string>('3.19');
      const [cnyRate, setCnyRate] = useState<string>('3.05');
      const [result, setResult] = useState<{ diff: number; isPositive: boolean } | null>(null);
    
      const handleCalculate = () => {
        const usd = parseFloat(usdRate);
        const cny = parseFloat(cnyRate);
        if (isNaN(usd) || isNaN(cny)) return;
        
        setResult({
          diff: parseFloat((usd - cny).toFixed(2)),
          isPositive: usd > cny
        });
      };
    
      return (
        <Card title="套利监控雷达 // ARBITRAGE" icon={<Activity size={20} />}>
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <Label>美元理财收益率 (%)</Label>
              <Input 
                type="number" 
                step="0.01" 
                value={usdRate} 
                onChange={(e) => setUsdRate(e.target.value)} 
              />
            </div>
            <div className="flex-1">
              <Label>人民币借贷成本 (%)</Label>
              <Input 
                type="number" 
                step="0.01" 
                value={cnyRate} 
                onChange={(e) => setCnyRate(e.target.value)} 
              />
            </div>
          </div>
          
          <Button onClick={handleCalculate}>启动利差诊断</Button>
    
          {result !== null && (
            <div className={`mt-5 p-4 rounded-r-lg border-l-2 bg-black/60 font-mono text-sm leading-relaxed animate-fade-in ${result.isPositive ? 'border-success' : 'border-danger'}`}>
              {result.isPositive ? (
                <>
                  <div className="mb-2">
                    <span className="bg-success/20 text-success px-2 py-0.5 rounded text-xs font-bold mr-2">策略激活 (ACTIVE)</span>
                  </div>
                  <p className="mb-2">利差空间 (SPREAD): <strong className="text-white">+{result.diff}%</strong></p>
                  <div className="text-text-muted">
                    <p>>> 建议执行: 保留美元资产，全额使用人民币贷款。</p>
                    <p>>> 状态: <span className="text-success">正向套利 (POSITIVE CARRY)</span></p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2">
                    <span className="bg-danger/20 text-danger px-2 py-0.5 rounded text-xs font-bold mr-2 flex items-center w-fit gap-1"><AlertTriangle size={12}/> 风险警告 (WARNING)</span>
                  </div>
                  <p className="mb-2">利差倒挂 (SPREAD): <strong className="text-white">{result.diff}%</strong></p>
                  <div className="text-text-muted">
                    <p>>> 建议: 若长期倒挂 {'>'}0.5%，考虑结汇还贷。</p>
                    <p>>> 状态: <span className="text-danger">负向损耗 (NEGATIVE CARRY)</span></p>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>
      );
    };