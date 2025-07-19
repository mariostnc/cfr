import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Generic function to read JSON file
export async function readJsonFile<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(dataDir, filename);
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Generic function to write JSON file
export async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Define types for better type safety
export interface Rezervare {
  trenId: string;
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  dataCalatorie: string;
  numarLocuri: number;
  tipBilet: string;
  observatii: string;
  trenInfo?: {
    id: string;
    numar: string;
    tip: string;
    plecare: string;
    destinatie: string;
    oraPlecare: string;
    oraSosire: string;
    durata: string;
    pret: number;
    locuriDisponibile: number;
    operator: string;
  };
  pretTotal?: number;
  id?: string;
  dataCreare?: string;
}

// Specific functions for each data type
export async function getTrenuri() {
  return readJsonFile('trenuri.json');
}

export async function getStatus() {
  return readJsonFile('status.json');
}

export async function getTarife() {
  return readJsonFile('tarife.json');
}

export async function getRezervari() {
  return readJsonFile<Rezervare>('rezervari.json');
}

export async function addRezervare(rezervare: Rezervare): Promise<Rezervare> {
  try {
    // Validare de bază
    if (!rezervare.trenId || !rezervare.nume || !rezervare.prenume || !rezervare.email) {
      throw new Error('Lipsesc câmpurile obligatorii');
    }

    const rezervari = await getRezervari();
    const newRezervare: Rezervare = {
      ...rezervare,
      id: Date.now().toString(),
      dataCreare: new Date().toISOString(),
    };
    
    rezervari.push(newRezervare);
    await writeJsonFile('rezervari.json', rezervari);
    return newRezervare;
  } catch (error) {
    console.error('Error in addRezervare:', error);
    throw error;
  }
} 