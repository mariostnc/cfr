import { NextResponse } from 'next/server';
import { getTrenuri } from '@/lib/db';

export async function GET() {
  try {
    const trenuri = await getTrenuri();
    return NextResponse.json(trenuri);
  } catch (error) {
    console.error('Error fetching trenuri:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trenuri' },
      { status: 500 }
    );
  }
} 