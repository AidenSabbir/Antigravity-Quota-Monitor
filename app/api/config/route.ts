import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET() {
  // 1. Try project-local config
  const localConfigPath = path.join(process.cwd(), 'config.local.json');
  if (fs.existsSync(localConfigPath)) {
    try {
      const fileContents = fs.readFileSync(localConfigPath, 'utf8');
      const config = JSON.parse(fileContents);
      return NextResponse.json(config);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON in config.local.json' }, { status: 500 });
    }
  }

  // 2. Try OpenCode/Antigravity global accounts file
  // Windows: %USERPROFILE%/.config/opencode/antigravity-accounts.json
  // Linux/Mac: ~/.config/opencode/antigravity-accounts.json
  const homeDir = os.homedir();
  const globalConfigPath = path.join(homeDir, '.config', 'opencode', 'antigravity-accounts.json');

  if (fs.existsSync(globalConfigPath)) {
    try {
      const fileContents = fs.readFileSync(globalConfigPath, 'utf8');
      const globalData = JSON.parse(fileContents);
      
      // Transform Antigravity accounts to our App Config format
      const accounts = (globalData.accounts || []).map((acc: any) => {
        // Generate color from email hash
        let hash = 0;
        const str = acc.email || 'default';
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = '#' + ((hash & 0x00FFFFFF).toString(16).toUpperCase()).padStart(6, '0');

        return {
          name: acc.email,
          apiKey: 'managed-by-opencode', // Placeholder as we use internal data fetching
          color: color,
          baseUrl: 'https://api.anthropic.com' // Default
        };
      });

      return NextResponse.json({
        accounts,
        refreshInterval: 30000,
        alertThreshold: 80
      });
    } catch (e) {
      console.error("Error reading global config:", e);
      // Fall through to example
    }
  }

  // 3. Fallback to example
  const exampleConfigPath = path.join(process.cwd(), 'config.example.json');
   if (fs.existsSync(exampleConfigPath)) {
    try {
      const fileContents = fs.readFileSync(exampleConfigPath, 'utf8');
      const config = JSON.parse(fileContents);
      return NextResponse.json(config);
    } catch (e) {
       return NextResponse.json({ error: 'Invalid JSON in config.example.json' }, { status: 500 });
    }
  }

  return NextResponse.json({ accounts: [] });
}
