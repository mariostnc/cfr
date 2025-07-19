import { NextRequest, NextResponse } from 'next/server';
import { addRezervare, getRezervari, type Rezervare } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validare de bază
    if (!body.trenId || !body.nume || !body.prenume || !body.email) {
      return NextResponse.json(
        { error: 'Lipsesc câmpurile obligatorii' },
        { status: 400 }
      );
    }

    const rezervare = await addRezervare(body as Rezervare);
    
    return NextResponse.json(rezervare, { status: 201 });
  } catch (error) {
    console.error('Error adding rezervare:', error);
    return NextResponse.json(
      { error: 'Failed to add rezervare', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rezervari = await getRezervari();
    return NextResponse.json(rezervari);
  } catch (error) {
    console.error('Error fetching rezervari:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rezervari', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 