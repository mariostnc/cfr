import { NextRequest, NextResponse } from 'next/server';
import { addRezervare } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rezervare = await addRezervare(body);
    
    return NextResponse.json(rezervare, { status: 201 });
  } catch (error) {
    console.error('Error adding rezervare:', error);
    return NextResponse.json(
      { error: 'Failed to add rezervare' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getRezervari } = await import('@/lib/db');
    const rezervari = await getRezervari();
    return NextResponse.json(rezervari);
  } catch (error) {
    console.error('Error fetching rezervari:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rezervari' },
      { status: 500 }
    );
  }
} 