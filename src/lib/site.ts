export const SITE_URL = 'https://www.nrgtrw.com'

export const CONSULT_HREF = '/contact#consultation-form'

export const CONSULT_LABEL = 'Book a Consultation'

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const

export const person = {
  name: 'Nikolay Goranov',
  email: 'nrgoranov@gmail.com',
  phone: '+359 89 733 8635',
  phoneHref: 'tel:+359897338635',
  location: 'Sofia, Bulgaria',
  github: 'https://github.com/NRGoranov',
  linkedin: 'https://www.linkedin.com/in/nikolay-goranov-a5a0411a7',
  instagram: 'https://www.instagram.com/nrgoranov',
} as const
