import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('pdf') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'uploads');
    await createUploadDirectory(uploadDir);

    const filePath = path.join(uploadDir, file.name);

    await writeFile(filePath, buffer);
    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      path: filePath 
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error saving file' 
    }, { status: 500 });
  }
}

async function createUploadDirectory(uploadDir: string) {
  try {
    await writeFile(path.join(uploadDir, '.gitkeep'), '', { flag: 'wx' });
  } catch (error) {
    // Directory or file already exists, ignore error
  }
}