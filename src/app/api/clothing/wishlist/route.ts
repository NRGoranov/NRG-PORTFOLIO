import { NextResponse } from 'next/server'
import {
  addWishlistEntry,
  countWishlistEntries,
  isEmailOnWishlist,
  listWishlistEntries,
  removeWishlistEntry,
  verifyClothingAdminPassword,
} from '@/lib/clothing/wishlist-store'
import { getClothingItem } from '@/data/clothing'
import { isClothingPublic } from '@/lib/clothing/visibility'

function hidden() {
  return NextResponse.json({ ok: false, message: 'Not found.' }, { status: 404 })
}

export async function GET(req: Request) {
  if (!isClothingPublic()) return hidden()

  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')?.trim()
    const adminPassword = req.headers.get('x-clothing-admin')?.trim()

    if (!slug) {
      return NextResponse.json({ ok: false, message: 'Missing slug.' }, { status: 400 })
    }

    if (adminPassword && verifyClothingAdminPassword(adminPassword)) {
      const entries = await listWishlistEntries(slug)
      return NextResponse.json({
        ok: true,
        count: entries.length,
        entries: entries.map((entry) => ({
          id: entry.id,
          email: entry.email,
          name: entry.name,
          createdAt: entry.createdAt,
        })),
      })
    }

    const count = await countWishlistEntries(slug)
    return NextResponse.json({
      ok: true,
      count,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load wishlist.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!isClothingPublic()) return hidden()

  try {
    const body = (await req.json()) as {
      intent?: string
      slug?: string
      email?: string
      name?: string
      website?: string
      consent?: boolean
      adminPassword?: string
    }

    if (body.adminPassword !== undefined) {
      if (!verifyClothingAdminPassword(body.adminPassword.trim())) {
        return NextResponse.json({ ok: false, message: 'Invalid admin password.' }, { status: 401 })
      }
      return NextResponse.json({ ok: true, admin: true })
    }

    if (body.website) {
      return NextResponse.json({ ok: false, message: 'Invalid submission.' }, { status: 400 })
    }

    const slug = body.slug?.trim()
    const email = body.email?.trim().toLowerCase()

    if (!slug || !email) {
      return NextResponse.json({ ok: false, message: 'Slug and email are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Invalid email format.' }, { status: 400 })
    }

    if (body.intent === 'status') {
      const onList = await isEmailOnWishlist(slug, email)
      return NextResponse.json({ ok: true, onList })
    }

    if (body.intent === 'withdraw') {
      await removeWishlistEntry(slug, email)
      return NextResponse.json({
        ok: true,
        message: 'If that email was on the list, it has been removed.',
      })
    }

    if (body.consent !== true) {
      return NextResponse.json(
        { ok: false, message: 'Consent to this email is required.' },
        { status: 400 },
      )
    }

    await addWishlistEntry({
      slug,
      email,
      name: body.name?.trim() || null,
      consentAt: new Date().toISOString(),
    })

    const item = getClothingItem(slug)
    const message =
      item?.status === 'interest-gated'
        ? 'Interest signal received. The counter just moved — thank you.'
        : 'You are on the wishlist. We will email you when the drop is ready.'

    return NextResponse.json({
      ok: true,
      message,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to join wishlist.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
