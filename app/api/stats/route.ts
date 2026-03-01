import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function GET() {
  const { data, error } = await supabaseServer
    .from('scans')
    .select('verdict, produce_type')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 1️⃣ Average weight per produce item (in kg)
  const AVERAGE_WEIGHT_KG: Record<string, number> = {
    Banana: 0.12,
    Carrot: 0.08,
    Cucumber: 0.30,
    Kiwi: 0.075,
    Orange: 0.18,
    Potato: 0.20,
    Tomato: 0.15,
    Other: 0.15,
  }

  // 2️⃣ CO₂ conversion factor
  const CO2_PER_KG = 2.5

  const good = data.filter(s => s.verdict === 'GOOD').length
  const goingBad = data.filter(s => s.verdict === 'GOING_BAD').length
  const bad = data.filter(s => s.verdict === 'BAD').length

  // 3️⃣ Calculate total kg saved (only GOING_BAD items)
  const savedItems = data.filter(s => s.verdict === 'GOING_BAD')

  const totalKgSaved = savedItems.reduce((sum, item) => {
    const weight = AVERAGE_WEIGHT_KG[item.produce_type] ?? 0.15
    return sum + weight
  }, 0)

  // 4️⃣ Convert to CO₂
  const totalCO2Saved = totalKgSaved * CO2_PER_KG

  return NextResponse.json({
    good,
    goingBad,
    bad,
    totalKgSaved,
    totalCO2Saved,
  })
}