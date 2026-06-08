# 🎨 BNHP Web3 Claim Dashboard Design Ideas

本项目旨在将 BNHP 官网原有的静态 Claim 占位页面，升级为符合顶奢 Web3 项目标准、兼具高级动效与极高安全性的全功能 **Claim & Vesting 仪表盘**。

---

## 💎 方案一：金色微光赛博极简风 (Cyberpunk Gold Minimalist) - [已采纳]

### 1. 🎨 设计 Movement 与美学
* **美学风格**：暗黑赛博新主义 (Neo-Cyber Dark Mode) 与金色极简主义 (Gold Minimalist) 的完美融合。
* **色彩哲学**：
  * 背景：绝对深邃的黑 (`#0B0B0B`)，营造太空与加密科技的无限感。
  * 辅色/线条：极细暗灰色 (`#2B2B2B`) 边框，继承 BNHP 现有的折角与几何裁剪（Cut-border）美学。
  * 主色/点缀：奢华金铜色 (`#C6AC6F`) 与发光微光，用于代表 $NPH 代币和可领取额度的核心数值，形成极强的视觉焦点。
* **排版 Paradigm**：非对称左右分栏。左侧为全局代币线性解锁状态与精美倒计时，右侧为多链自适应的 Claim 核心操作面板。

### 2. 🔒 安全钱包连接机制
* **注入式多钱包适配**：原生集成 `ethers.js` v6，支持 MetaMask, OKX Wallet, Trust Wallet, Phantom 等注入钱包。
* **全生命周期监听**：
  * 自动监听账户切换 (`accountsChanged`)。
  * 自动监听链切换 (`chainChanged`)。
  * 自动监听连接断开 (`disconnect`)。
* **多链自适应与网络一键切换**：
  * 自动识别用户当前是在以太坊主网 (`0x1`) 还是 BNB Chain (`0x38`)。
  * 若在不支持的网络，触发高科技折角弹窗，提供一键将钱包网络切换至 Ethereum 或 BSC 链的指令，杜绝用户在错误链上进行交易。

### 3. 📈 顶奢级 Claim 仪表盘与线性释放动效
* **多链数据实时抓取**：
  * 当用户连接钱包后，前端会实时通过对应的销售合约（ETH 链：`0xe704d6ed1a159e20afcc17421257818206413633`，BSC 链：`0x4DF1bF251834b48399cF0EaA8358f4A1C2f64602`）读取用户的 `getUserPurchases` 和 `getClaimableTokens` 链上真实数据。
* **四大核心指标面板 (Grid)**：
  1. **Total Purchased** (总购买额度)：展示用户通过该链销售合约购买的 NPH 总额。
  2. **TGE Released** (20% 即时释放)：购买时已直接发放的额度。
  3. **Vested Locked** (80% 线性锁定)：正在合约中锁定并按秒线性解锁的额度。
  4. **Available to Claim** (当前可领取)：用户当前已解锁、可一键领取的额度。
* **线性解锁进度条 (Linear Progress)**：
  * 结合 Framer Motion，根据合约的 `vestingStartTime`（180天锁定期），动态计算解锁进度。
  * 进度条采用极光金色发光微粒流线，让用户肉眼可见“代币在按秒线性解锁”的流光动效。
* **一键 Claim 交互动效**：
  * 点击 Claim 按钮时，按钮缩放并显示微发光 Loading 环。
  * 唤起钱包签名时，展示“Awaiting Signature...”的极简网格呼吸动效。
  * 交易广播后，显示“Transaction Pending...”并附带以太坊/BscScan 的浏览器直达链接。
  * 交易成功时，弹出金色礼花微粒动画，数值动态增加到已领取额度中，体验极其奢华。

---

## 🚀 实施规范与技术栈

1. **核心库**：Next.js 16 + React 19 + Tailwind CSS v4 + `ethers.js` v6 + `framer-motion`。
2. **零依赖安全**：完全不依赖复杂的第三方庞大钱包连接库（如 RainbowKit/Wagmi，避免版本不兼容和 Vercel 部署超时），采用原生 ethers.js 进行高度可控、极度安全的底层调用，彻底防范网络钓鱼和 RPC 异常。
3. **Logo 保护**：绝对不改动任何静态资源路径，完美沿用 BNHP 原有的 `brand-logo-gold.png` 和 `BNHP-Logo-Gold-Dark.svg`，确保品牌资产 100% 完整显示。
