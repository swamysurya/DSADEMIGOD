import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ success: true, message: 'Not running in development environment.' });
  }
  try {
    const srcDir = 'C:\\Users\\swamy\\.gemini\\antigravity-ide\\brain\\ae1be8b5-6619-4744-9fe5-2b0fa47abad5';
    const destDir = 'c:\\Users\\swamy\\Desktop\\ReactProjects-dont delete\\DSA_DEMI_GOD\\public\\images\\setup';

    const files = [
      { src: 'vscode_open_folder_1785754303145.png', dest: 'step1.png' },
      { src: 'vscode_create_file_1785754315812.png', dest: 'step2.png' },
      { src: 'vscode_write_code_1785754330893.png', dest: 'step3.png' },
      { src: 'vscode_compile_code_1785754342229.png', dest: 'step4.png' },
      { src: 'vscode_run_code_1785754357820.png', dest: 'step5.png' }
    ];

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const copied: string[] = [];
    files.forEach(f => {
      const srcPath = path.join(srcDir, f.src);
      const destPath = path.join(destDir, f.dest);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copied.push(f.dest);
      }
    });

    return NextResponse.json({ success: true, copied });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
