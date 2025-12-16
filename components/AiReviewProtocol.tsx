import React, { useState } from 'react';
    import { Card } from './ui/Card';
    import { Label, Input, Select, Textarea, Button } from './ui/Input';
    import { BrainCircuit, Copy, Sparkles, Loader2 } from 'lucide-react';
    import { GoogleGenAI } from "@google/genai";
    
    export const AiReviewProtocol: React.FC = () => {
      const [ticker, setTicker] = useState('');
      const [action, setAction] = useState('买入');
      const [reason, setReason] = useState('');
      const [emotion, setEmotion] = useState('');
      const [result, setResult] = useState('');
      
      const [generatedPrompt, setGeneratedPrompt] = useState('');
      const [aiResponse, setAiResponse] = useState('');
      const [isLoading, setIsLoading] = useState(false);
    
      const buildPrompt = () => {
        return `**Role: 资深首席交易官 (CIO)**\n请帮我复盘以下交易：\n\n- **标的**: ${ticker}\n- **操作**: ${action}\n- **逻辑**: ${reason}\n- **心理**: ${emotion}\n- **现状**: ${result}\n\n请从逻辑闭环、执行纪律、风控合规、心理建设四个维度进行无情剖析，并给出下一步行动建议。`;
      };
    
      const handleGeneratePrompt = () => {
        setGeneratedPrompt(buildPrompt());
        setAiResponse(''); // Clear previous AI response if any
      };
    
      const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(generatedPrompt || aiResponse);
        alert('内容已复制到剪贴板。');
      };
    
      const handleRunAiAnalysis = async () => {
        if (!process.env.API_KEY) {
            alert("系统错误: 未在环境变量中找到 API_KEY。");
            return;
        }
    
        setIsLoading(true);
        setAiResponse('');
        const prompt = buildPrompt();
        setGeneratedPrompt(prompt); // Also show the prompt
    
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setAiResponse(response.text || "未生成响应。");
        } catch (error) {
            console.error("AI Error:", error);
            setAiResponse("系统故障: 无法连接至神经网络。");
        } finally {
            setIsLoading(false);
        }
      };
    
      return (
        <Card title="智能复盘协议 // AI PROTOCOL" icon={<BrainCircuit size={20} />} className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <Label>交易标的 (ASSET)</Label>
              <Input 
                placeholder="例如: 机器人ETF (159530)" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              />
            </div>
            <div>
              <Label>操作类型 (ACTION)</Label>
              <Select value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="买入">买入 (开仓/加仓)</option>
                <option value="卖出">卖出 (止盈/止损)</option>
                <option value="持有">持有 (观望)</option>
              </Select>
            </div>
          </div>
    
          <div className="mb-5">
            <Label>核心逻辑 (LOGIC)</Label>
            <Textarea 
              rows={2} 
              placeholder="请输入当时的决策逻辑..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <Label>心理状态 (EMOTION)</Label>
              <Input 
                placeholder="请输入当时的情绪状态..."
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
              />
            </div>
            <div>
              <Label>盈亏结果 (RESULT)</Label>
              <Input 
                placeholder="例如: 浮盈 15% / 亏损 2000元..."
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleGeneratePrompt} variant="primary">
                生成提示词 (PROMPT)
            </Button>
            <Button onClick={handleRunAiAnalysis} variant="success" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                {isLoading ? "正在分析中..." : "运行 AI 分析 (GEMINI)"}
            </Button>
          </div>
    
          {(generatedPrompt || aiResponse) && (
            <div className="mt-6 p-5 rounded-r-lg border-l-2 border-primary-neon bg-black/60 font-mono text-sm leading-relaxed text-gray-300 animate-fade-in relative group/output">
                {aiResponse ? (
                    <div className="whitespace-pre-wrap">
                        <div className="mb-2 text-primary-neon font-bold">[GEMINI 智能分析结果]</div>
                        {aiResponse}
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap">{generatedPrompt}</div>
                )}
                
                <button 
                    onClick={handleCopyToClipboard}
                    className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-2 bg-black/50 rounded hover:bg-black/80"
                    title="复制到剪贴板"
                >
                    <Copy size={16} />
                </button>
            </div>
          )}
        </Card>
      );
    };