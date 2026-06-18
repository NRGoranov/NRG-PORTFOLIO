import { NextResponse } from 'next/server'
import {
  addWishlistEntry,
  isEmailOnWishlist,
  listWishlistEntries,
  verifyClothingAdminPassword,
} from '@/lib/clothing/wishlist-store'
import { getClothingItem } from '@/data/clothing'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')?.trim()
    const email = searchParams.get('email')?.trim().toLowerCase()
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

    const entries = await listWishlistEntries(slug)
    const onList = email ? await isEmailOnWishlist(slug, email) : false

    return NextResponse.json({
      ok: true,
      count: entries.length,
      onList,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load wishlist.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      slug?: string
      email?: string
      name?: string
      website?: string
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

    await addWishlistEntry({
      slug,
      email,
      name: body.name?.trim() || null,
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
