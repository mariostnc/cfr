import { NextResponse } from 'next/server';
import { getTarife } from '@/lib/db';

export async function GET() {
  try {
    const tarife = await getTarife();
    return NextResponse.json(tarife);
  } catch (error) {
    console.error('Error fetching tarife:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tarife' },
      { status: 500 }
    );
  }
} 