import type { ClothingCollection, ClothingColor, ClothingItem } from '@/types/clothing'

const S3_BASE = 'https://nrgtrw-images.s3.eu-central-1.amazonaws.com'

const hueMap: Record<string, number> = {
  White: 40,
  Black: 220,
  Beige: 32,
  Burgundy: 350,
  Grey: 240,
  Green: 145,
  Navy: 225,
  Brown: 28,
}

function archiveColor(
  name: string,
  imagePath: string,
  hoverPath: string,
): ClothingColor {
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    hue: hueMap[name] ?? 220,
    imageUrl: `${S3_BASE}/${imagePath}`,
    hoverImageUrl: `${S3_BASE}/${hoverPath}`,
  }
}

function interestPiece(
  input: Omit<ClothingItem, 'status' | 'priceLabel' | 'interestGoal'> & { interestGoal?: number },
): ClothingItem {
  return {
    ...input,
    status: 'interest-gated',
    priceLabel: 'Signal interest',
    interestGoal: input.interestGoal ?? 100,
  }
}

/** Pieces from the DiplomnaWork clothing archive — produced only if enough interest */
export const clothingCandidates: ClothingItem[] = [
  interestPiece({
    slug: 'modern-turtleneck',
    codename: 'ARCHIVE // E-01',
    collection: 'elegance',
    name: 'Modern Turtleneck',
    teaser: 'A cropped silhouette filed under quiet luxury.',
    description:
      'Recovered from the Elegance line — a chic cropped turtleneck made with sustainable materials. Production unlocks only if enough people signal interest.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('White', 'images/WhiteCroppedTurtuleneck.webp', 'HoverImages/WhiteCroppedTurtuleneckHover.webp'),
      archiveColor('Black', 'DifferentColors/BlackCroppedTurtuleneck.webp', 'HoverImages/BlackCroppedTurtuleneckHover.jpg'),
      archiveColor('Beige', 'DifferentColors/BeigeCroppedTurtuleneck.webp', 'HoverImages/BeigeCroppedTurtuleneckHover.webp'),
      archiveColor('Burgundy', 'DifferentColors/BurgundyCroppedTurtuleneck.webp', 'HoverImages/BurgundyCroppedTurtuleneckHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'classic-turtleneck',
    codename: 'ARCHIVE // E-02',
    collection: 'elegance',
    name: 'Turtleneck',
    teaser: 'Warmth without the noise.',
    description:
      'Classic turtleneck from the archive vault — comfort, warmth, and versatile colorways. Made real only if the interest threshold is met.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('White', 'images/WhiteMTN.webp', 'HoverImages/WhiteMTNHover.webp'),
      archiveColor('Black', 'DifferentColors/BlackMTN.webp', 'HoverImages/BlackMTNHover.webp'),
      archiveColor('Beige', 'DifferentColors/BeigeMTN.jpg', 'HoverImages/BeigeMTNHover.webp'),
      archiveColor('Burgundy', 'DifferentColors/BurgundyMTN.webp', 'HoverImages/BurgundyMTNHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'tailored-shirt',
    codename: 'ARCHIVE // E-03',
    collection: 'elegance',
    name: 'Shirt',
    teaser: 'Tailored lines from the original study.',
    description:
      'Premium shirt with tailored cuts from the Diplomna Elegance collection. Fine fabrics, precise fit — waiting on your signal.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('White', 'images/WhiteShirt.webp', 'HoverImages/WhiteShirtHover.jpg'),
      archiveColor('Grey', 'DifferentColors/GreyShirt.webp', 'HoverImages/GreyShirtHover.jpg'),
      archiveColor('Green', 'DifferentColors/GreenShirt.webp', 'HoverImages/GreenShirtHover.jpg'),
      archiveColor('Burgundy', 'DifferentColors/BurgundyShirt.jpg', 'HoverImages/BurgundyShirtHover.jpg'),
      archiveColor('Navy', 'DifferentColors/NavyShirt.webp', 'HoverImages/NavyShirtHover.jpg'),
    ],
  }),
  interestPiece({
    slug: 'bamboo-t-shirt',
    codename: 'ARCHIVE // E-04',
    collection: 'elegance',
    name: 'Bamboo T-Shirt',
    teaser: 'Soft signal. Sustainable whisper.',
    description:
      'Bamboo-blend tee from the original NRG apparel study — soft, durable, and elegant enough for dinner or every day.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('White', 'images/WhiteBambooT.webp', 'HoverImages/WhiteBambooTHover.jpg'),
      archiveColor('Black', 'DifferentColors/BlackBambooT.webp', 'HoverImages/BlackBambooTHover.webp'),
      archiveColor('Grey', 'DifferentColors/GreyBambooT.webp', 'HoverImages/GreyBambooTHover.webp'),
      archiveColor('Green', 'DifferentColors/GreenBambooT.jpg', 'HoverImages/GreenBambooTHover.webp'),
      archiveColor('Beige', 'DifferentColors/BeigeBambooT.webp', 'HoverImages/BeigeBambooTHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'samurai-pants',
    codename: 'ARCHIVE // P-01',
    collection: 'pump-covers',
    name: 'Samurai Pants',
    teaser: 'Movement coded for the gym floor.',
    description:
      'Samurai-inspired pump cover pants from the Diplomna archive. Cut for training sessions and the walk home.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('Black', 'images/BlackSamurai.webp', 'HoverImages/BlackSamuraiHover.webp'),
      archiveColor('Grey', 'DifferentColors/GreySamurai.webp', 'HoverImages/GreySamuraiHover.webp'),
      archiveColor('White', 'DifferentColors/WhiteSamurai.webp', 'HoverImages/WhiteSamuraiHover.webp'),
      archiveColor('Brown', 'DifferentColors/BrownSamurai.webp', 'HoverImages/BrownSamuraiHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-hoodie',
    codename: 'ARCHIVE // P-02',
    collection: 'pump-covers',
    name: 'Hoodie',
    teaser: 'Oversized. Overdelivered.',
    description:
      'Warm oversized hoodie from the Pump Covers line. Cozy enough for rest days, sharp enough for the mirror.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('Black', 'images/BlackHoodie.webp', 'HoverImages/BlackHoodieHover.webp'),
      archiveColor('Grey', 'DifferentColors/GreyHoodie.webp', 'HoverImages/GreyHoodieHover.webp'),
      archiveColor('White', 'DifferentColors/WhiteHoodie.webp', 'HoverImages/WhiteHoodieHover.webp'),
      archiveColor('Brown', 'DifferentColors/BrownHoodie.webp', 'HoverImages/BrownHoodieHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-shorts',
    codename: 'ARCHIVE // P-03',
    collection: 'pump-covers',
    name: 'Shorts',
    teaser: 'Leg day, elevated.',
    description:
      'Premium training shorts from the Pump Covers vault. Built for sport and street — production unlocks at the interest threshold.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('Black', 'images/BlackShorts.webp', 'HoverImages/BlackShortsHover.webp'),
      archiveColor('Grey', 'DifferentColors/GreyShorts.webp', 'HoverImages/GreyShortsHover.webp'),
      archiveColor('White', 'DifferentColors/WhiteShorts.webp', 'HoverImages/WhiteShortsHover.webp'),
      archiveColor('Brown', 'DifferentColors/BrownShorts.webp', 'HoverImages/BrownShortsHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-t-shirt',
    codename: 'ARCHIVE // P-04',
    collection: 'pump-covers',
    name: 'T-Shirt',
    teaser: 'Everyday armor. Not yet issued.',
    description:
      'Versatile pump-cover tee from the Diplomna study. Everyday wear with gym-floor DNA.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('Black', 'images/BlackT.webp', 'HoverImages/BlackTHover.webp'),
      archiveColor('Grey', 'images/GreyT.webp', 'HoverImages/GreyTHover.webp'),
      archiveColor('White', 'images/WhiteT.webp', 'HoverImages/WhiteTHover.webp'),
      archiveColor('Brown', 'images/BrownT.webp', 'HoverImages/BrownTHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'confidence-piece',
    codename: 'ARCHIVE // C-01',
    collection: 'confidence',
    name: 'The Statement Piece',
    teaser: 'Confidence you can wear — if the signal is strong enough.',
    description:
      'The showpiece from the Confidence collection. Bold presence, archive-grade construction — one hundred signals and we decide whether it leaves the vault.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      archiveColor('Black', 'images/ShowOff.webp', 'images/ShowOff.webp'),
      archiveColor('White', 'images/ShowOff.webp', 'images/ShowOff.webp'),
      archiveColor('Burgundy', 'images/ShowOff.webp', 'images/ShowOff.webp'),
    ],
  }),
]

export const clothingCollections: ClothingCollection[] = [
  {
    id: 'elegance',
    title: 'Elegance',
    subtitle: 'Quiet luxury silhouettes from the original NRG study.',
  },
  {
    id: 'pump-covers',
    title: 'Pump Covers',
    subtitle: 'Gym-floor pieces with streetwear restraint.',
  },
  {
    id: 'confidence',
    title: 'Confidence',
    subtitle: 'Bold when you are — if the room demands it.',
  },
]
