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

function productColor(name: string, imagePath: string, hoverPath: string): ClothingColor {
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

/** Community-voted pieces — produced only if enough interest */
export const clothingCandidates: ClothingItem[] = [
  interestPiece({
    slug: 'modern-turtleneck',
    collection: 'elegance',
    name: 'Modern Turtleneck',
    teaser: 'A cropped silhouette filed under quiet luxury.',
    description:
      'A chic cropped turtleneck made with sustainable materials. We only put it into production if enough people signal interest.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      productColor('White', 'images/WhiteCroppedTurtuleneck.webp', 'HoverImages/WhiteCroppedTurtuleneckHover.webp'),
      productColor('Black', 'DifferentColors/BlackCroppedTurtuleneck.webp', 'HoverImages/BlackCroppedTurtuleneckHover.jpg'),
      productColor('Beige', 'DifferentColors/BeigeCroppedTurtuleneck.webp', 'HoverImages/BeigeCroppedTurtuleneckHover.webp'),
      productColor('Burgundy', 'DifferentColors/BurgundyCroppedTurtuleneck.webp', 'HoverImages/BurgundyCroppedTurtuleneckHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'classic-turtleneck',
    collection: 'elegance',
    name: 'Turtleneck',
    teaser: 'Warmth without the noise.',
    description:
      'Classic turtleneck built for comfort, warmth, and versatile colorways. Made real only if the interest threshold is met.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      productColor('White', 'images/WhiteMTN.webp', 'HoverImages/WhiteMTNHover.webp'),
      productColor('Black', 'DifferentColors/BlackMTN.webp', 'HoverImages/BlackMTNHover.webp'),
      productColor('Beige', 'DifferentColors/BeigeMTN.jpg', 'HoverImages/BeigeMTNHover.webp'),
      productColor('Burgundy', 'DifferentColors/BurgundyMTN.webp', 'HoverImages/BurgundyMTNHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'tailored-shirt',
    collection: 'elegance',
    name: 'Shirt',
    teaser: 'Tailored lines. Precise fit.',
    description:
      'Premium shirt with tailored cuts and fine fabrics. Waiting on your signal before we commit to a run.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      productColor('White', 'images/WhiteShirt.webp', 'HoverImages/WhiteShirtHover.jpg'),
      productColor('Grey', 'DifferentColors/GreyShirt.webp', 'HoverImages/GreyShirtHover.jpg'),
      productColor('Green', 'DifferentColors/GreenShirt.webp', 'HoverImages/GreenShirtHover.jpg'),
      productColor('Burgundy', 'DifferentColors/BurgundyShirt.jpg', 'HoverImages/BurgundyShirtHover.jpg'),
      productColor('Navy', 'DifferentColors/NavyShirt.webp', 'HoverImages/NavyShirtHover.jpg'),
    ],
  }),
  interestPiece({
    slug: 'bamboo-t-shirt',
    collection: 'elegance',
    name: 'Bamboo T-Shirt',
    teaser: 'Soft signal. Sustainable whisper.',
    description:
      'Bamboo-blend tee — soft, durable, and elegant enough for dinner or every day. Production follows demand.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      productColor('White', 'images/WhiteBambooT.webp', 'HoverImages/WhiteBambooTHover.jpg'),
      productColor('Black', 'DifferentColors/BlackBambooT.webp', 'HoverImages/BlackBambooTHover.webp'),
      productColor('Grey', 'DifferentColors/GreyBambooT.webp', 'HoverImages/GreyBambooTHover.webp'),
      productColor('Green', 'DifferentColors/GreenBambooT.jpg', 'HoverImages/GreenBambooTHover.webp'),
      productColor('Beige', 'DifferentColors/BeigeBambooT.webp', 'HoverImages/BeigeBambooTHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'samurai-pants',
    collection: 'pump-covers',
    name: 'Samurai Pants',
    teaser: 'Movement coded for the gym floor.',
    description:
      'Samurai-inspired pump cover pants cut for training sessions and the walk home. We make them if the count clears the bar.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      productColor('Black', 'images/BlackSamurai.webp', 'HoverImages/BlackSamuraiHover.webp'),
      productColor('Grey', 'DifferentColors/GreySamurai.webp', 'HoverImages/GreySamuraiHover.webp'),
      productColor('White', 'DifferentColors/WhiteSamurai.webp', 'HoverImages/WhiteSamuraiHover.webp'),
      productColor('Brown', 'DifferentColors/BrownSamurai.webp', 'HoverImages/BrownSamuraiHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-hoodie',
    collection: 'pump-covers',
    name: 'Hoodie',
    teaser: 'Oversized. Overdelivered.',
    description:
      'Warm oversized hoodie from the Pump Covers line. Cozy enough for rest days, sharp enough for the mirror.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      productColor('Black', 'images/BlackHoodie.webp', 'HoverImages/BlackHoodieHover.webp'),
      productColor('Grey', 'DifferentColors/GreyHoodie.webp', 'HoverImages/GreyHoodieHover.webp'),
      productColor('White', 'DifferentColors/WhiteHoodie.webp', 'HoverImages/WhiteHoodieHover.webp'),
      productColor('Brown', 'DifferentColors/BrownHoodie.webp', 'HoverImages/BrownHoodieHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-shorts',
    collection: 'pump-covers',
    name: 'Shorts',
    teaser: 'Leg day, elevated.',
    description:
      'Premium training shorts built for sport and street. Production unlocks when interest hits the threshold.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      productColor('Black', 'images/BlackShorts.webp', 'HoverImages/BlackShortsHover.webp'),
      productColor('Grey', 'DifferentColors/GreyShorts.webp', 'HoverImages/GreyShortsHover.webp'),
      productColor('White', 'DifferentColors/WhiteShorts.webp', 'HoverImages/WhiteShortsHover.webp'),
      productColor('Brown', 'DifferentColors/BrownShorts.webp', 'HoverImages/BrownShortsHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'pump-t-shirt',
    collection: 'pump-covers',
    name: 'T-Shirt',
    teaser: 'Everyday armor. Not yet issued.',
    description:
      'Versatile pump-cover tee with gym-floor DNA. Everyday wear — manufactured only if enough people want in.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      productColor('Black', 'images/BlackT.webp', 'HoverImages/BlackTHover.webp'),
      productColor('Grey', 'images/GreyT.webp', 'HoverImages/GreyTHover.webp'),
      productColor('White', 'images/WhiteT.webp', 'HoverImages/WhiteTHover.webp'),
      productColor('Brown', 'images/BrownT.webp', 'HoverImages/BrownTHover.webp'),
    ],
  }),
  interestPiece({
    slug: 'confidence-piece',
    collection: 'confidence',
    name: 'The Statement Piece',
    teaser: 'Confidence you can wear — if the signal is strong enough.',
    description:
      'The showpiece from the Confidence collection. Bold presence and deliberate construction — one hundred signals and we decide whether to run it.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      productColor('Black', 'images/ShowOff.webp', 'images/ShowOff.webp'),
      productColor('White', 'images/ShowOff.webp', 'images/ShowOff.webp'),
      productColor('Burgundy', 'images/ShowOff.webp', 'images/ShowOff.webp'),
    ],
  }),
]

export const clothingCollections: ClothingCollection[] = [
  {
    id: 'elegance',
    title: 'Elegance',
    subtitle: 'Quiet luxury silhouettes for every day.',
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
