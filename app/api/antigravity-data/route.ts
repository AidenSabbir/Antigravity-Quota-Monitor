import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const ACCOUNTS_FILE_PATH = path.join(os.homedir(), ".config", "opencode", "antigravity-accounts.json");

export async function GET() {
  try {
    if (!fs.existsSync(ACCOUNTS_FILE_PATH)) {
      return NextResponse.json({ error: 'Accounts file not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(ACCOUNTS_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (e) {
    console.error("Error reading antigravity accounts file:", e);
    return NextResponse.json({ error: 'Failed to read accounts data' }, { status: 500 });
  }
}
