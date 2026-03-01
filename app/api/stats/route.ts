import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function GET() {
  const { data, error } = await supabaseServer
    .from('scans')
    .select('verdict')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const good = data.filter(s => s.verdict === 'GOOD').length
  const goingBad = data.filter(s => s.verdict === 'GOING_BAD').length
  const bad = data.filter(s => s.verdict === 'BAD').length

  return NextResponse.json({
    good,
    goingBad,
    bad,
  })
}