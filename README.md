# Antigravity Rate Limit Monitor

A visually striking, Neo-Brutalist dashboard for monitoring API rate limits and quotas across multiple Antigravity (OpenCode) accounts.

## 🚀 Features

- **Multi-Account Monitoring**: Track rate limits for unlimited Antigravity accounts in a single view.
- **Auto-Discovery**: Automatically detects and loads accounts from your OpenCode configuration (`~/.config/opencode/antigravity-accounts.json`).
- **Real-Time Tracking**:
  - Request limits per minute.
  - Token usage (Input/Output).
  - Model-specific quotas (Gemini, Claude, Opus, etc.).
- **Live Countdowns**: See exactly when your rate limits and quotas will reset.
- **Smart Alerts**: Get visual toast notifications when your usage exceeds 80%.
- **Neo-Brutalist Theme**: High-contrast, dark-mode-first aesthetic with bold borders and neon accents.

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: v18.17.0 or higher (required for Next.js 16).
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`.
- **OpenCode / Antigravity CLI** (Optional): For automatic account discovery.

## 🛠️ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/antigravity-monitor.git
    cd antigravity-monitor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

The app supports two methods for loading account data:

### 1. Automatic (Recommended)
If you use OpenCode or the Antigravity CLI, the app automatically detects your accounts file at:
- **Windows**: `%USERPROFILE%\.config\opencode\antigravity-accounts.json`
- **Linux/Mac**: `~/.config/opencode/antigravity-accounts.json`

No extra setup required! Just run the app.

### 2. Manual Configuration
To manually configure accounts (e.g., for deployment or testing):

1.  Copy the example config:
    ```bash
    cp config.example.json config.local.json
    ```

2.  Edit `config.local.json` with your API keys:
    ```json
    {
      "accounts": [
        {
          "name": "My Production Account",
          "apiKey": "sk-ant-...",
          "color": "#FF0000"
        }
      ],
      "refreshInterval": 30000,
      "alertThreshold": 80
    }
    ```

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Theme**: Neo-Brutalist (Custom implementation)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🎨 Theme Customization

The app uses a CSS variable-based theme system in `app/globals.css`. It defaults to a high-contrast Dark Mode.

- **Background**: Deep Black (`oklch(0.05 0 0)`)
- **Accents**: Neon Yellow (`oklch(0.9 0.1 85)`) & Bright Red (`oklch(0.6 0.25 25)`)
- **Borders**: Stark White (`#FFFFFF`)

## 📄 License

MIT
