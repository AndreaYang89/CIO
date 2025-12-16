# CIO Terminal (个人资产管理系统)

**CIO Terminal** 是一个基于 Cyberpunk 风格的现代化个人投资组合管理仪表盘，专为需要快速决策和深度复盘的个人投资者设计。本项目将原本的静态 HTML 原型升级为基于 React + TypeScript + Tailwind CSS 的全功能 Web 应用。

## 🎯 项目目标

本项目旨在协助个人投资者（充当自己的 CIO - 首席投资官）进行：
1.  **套利监控**：实时计算美元理财与人民币贷款之间的利差，辅助决策是否进行跨境套利。
2.  **仓位管理**：在高位止盈时，科学计算留存仓位与套现金额，执行“高低切换”策略。
3.  **交易复盘**：利用 AI（Google Gemini）生成专业的交易复盘报告，从逻辑、纪律、风控、心理四个维度剖析每一笔交易。

## 🛠️ 功能模块

### 1. Arbitrage Monitor (套利雷达)
- **输入**：USD Yield (美元理财收益率), CNY Cost (人民币借贷成本)。
- **输出**：计算利差 (Spread)。
- **逻辑**：
  - 若 `Spread > 0`，显示 "POSITIVE CARRY"（正套利），建议保留美元资产并使用贷款。
  - 若 `Spread < 0`，显示 "NEGATIVE CARRY"（负套利），建议考虑结汇还贷。
- **视觉反馈**：正收益显示绿色霓虹状态，负收益显示红色警告状态。

### 2. Rebalance Calc (高低切换计算器)
- **输入**：当前持仓市值、浮盈比例、目标止盈比例（通过滑块调节）。
- **输出**：
  - **CASH IN**: 本次卖出操作能回笼的现金。
  - **HOLDING**: 剩余持仓市值。
- **策略建议**：自动生成下一步操作建议（如等待企稳接回）。

### 3. AI Review Protocol (AI 复盘协议)
- **输入**：
  - 标的 (Asset)
  - 操作 (Action: 买入/卖出/持有)
  - 逻辑面 (Logic)
  - 心理面 (Emotion)
  - 结果 (Result)
- **功能**：
  - **Generate Prompt**: 生成标准化的 Prompt 文本，可用于复制到 ChatGPT/Claude 等模型。
  - **Run AI Analysis**: 集成 **Google Gemini 2.5 Flash** 模型，直接在应用内流式生成专业的复盘分析报告。
- **分析维度**：逻辑闭环、执行纪律、风控合规、心理建设。

## 🎨 视觉风格 (Cyberpunk UI)

- **配色**：深黑背景 (`#050505`) 搭配青色 (`#00f2ff`) 与紫色 (`#7000ff`) 霓虹点缀。
- **材质**：使用了 Glassmorphism (玻璃拟态) 效果，半透明卡片背景 + 模糊滤镜。
- **排版**：标题使用 `JetBrains Mono` 等宽字体，正文使用 `Inter`，营造终端控制台的专业感。
- **交互**：悬停发光效果、平滑过渡动画、自定义滚动条。

## 🚀 技术栈

- **Core**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React
- **Build Tool**: Vite (Recommended)

## 📦 如何运行

1.  确保已配置 `process.env.API_KEY` (Google Gemini API Key)。
2.  安装依赖：
    ```bash
    npm install
    ```
3.  启动开发服务器：
    ```bash
    npm start
    ```

---
*System Version: V2026 // Status: ONLINE*