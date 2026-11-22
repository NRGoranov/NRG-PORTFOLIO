import type { LucideIcon } from 'lucide-react'
import {
  Boxes,
  CalendarCheck,
  Eye,
  Globe,
  Headphones,
  Layers,
  ListChecks,
  Megaphone,
  MessageSquare,
  Repeat,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  UserCheck,
  UserX,
  UtensilsCrossed,
} from 'lucide-react'

export type OfferStatus = 'upcoming' | 'planned' | 'available'

export const problems: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Unanswered customer inquiries',
    description: 'Calls, forms, and messages sit unanswered while the team is serving guests.',
    icon: MessageSquare,
  },
  {
    title: 'Repetitive administrative work',
    description: 'The same booking questions, confirmations, and follow-ups are typed by hand.',
    icon: Repeat,
  },
  {
    title: 'Fragmented customer information',
    description: 'Notes live in inboxes, chats, and spreadsheets, so the next person starts from zero.',
    icon: Layers,
  },
  {
    title: 'Missed chances to bring people back',
    description: 'Guests who already visited are easy to forget when there is no simple record of them.',
    icon: UserX,
  },
  {
    title: 'Manual marketing',
    description: 'Promotions depend on whoever has time that week, so they happen unevenly.',
    icon: Megaphone,
  },
  {
    title: 'Limited operational visibility',
    description: 'It is hard to see which inquiries were handled and which ones were dropped.',
    icon: Eye,
  },
]

export const offers: {
  id: string
  name: string
  status: OfferStatus
  statusLabel: string
  summary: string
  icon: LucideIcon
  paragraphs: string[]
  features: { title: string; description: string }[]
}[] = [
  {
    id: 'standard-crm',
    name: 'Standard CRM',
    status: 'upcoming',
    statusLabel: 'Upcoming product',
    summary:
      'AI-assisted customer communication, records, acquisition, loyalty, and marketing. It is meant to sit beside the booking tools you already use, including Rezzo.',
    icon: Headphones,
    paragraphs: [
      'The CRM is being built as its own product. This website does not turn it on for you today.',
      'A consultation can still map how customer messages, records, and follow-up should work with the systems you already run. That includes reservation tools such as Rezzo. The goal is to complement them, not to replace them.',
    ],
    features: [
      {
        title: 'Customer acquisition',
        description: 'Collect inquiries from the site and the channels you already answer, instead of losing them in separate inboxes.',
      },
      {
        title: 'Customer management',
        description: 'Keep who contacted you, what they asked, and what happened next in one record.',
      },
      {
        title: 'AI receptionist',
        description: 'Handle routine questions from the facts you provide, with a person able to review anything that matters.',
      },
      {
        title: 'Communication',
        description: 'Follow up on inquiries so they are not left waiting until someone remembers.',
      },
      {
        title: 'Marketing',
        description: 'Prepare repeatable messages for events and quiet periods. You approve what goes out.',
      },
      {
        title: 'Loyalty',
        description: 'Recognize returning customers. The exact method is chosen for your business during setup.',
      },
      {
        title: 'Business reporting',
        description: 'See inquiries, responses, and repeat contacts so dropped conversations are visible.',
      },
    ],
  },
  {
    id: 'autonomous',
    name: 'Autonomous Platform',
    status: 'planned',
    statusLabel: 'Planned, not in production',
    summary:
      'A wider restaurant operating system. Native reservations, orders, inventory, staffing, and operational automation are intended capabilities.',
    icon: UtensilsCrossed,
    paragraphs: [
      'This is the direction for restaurants that want more than a CRM beside their current tools. It is not a finished system you can switch on.',
      'Nothing on this page means a production-ready autonomous restaurant platform is available today. A consultation can say which parts are realistic to prepare for, and which parts are still ahead.',
    ],
    features: [
      {
        title: 'Native reservations',
        description: 'Reservations owned by the platform, rather than only a connection to an outside booking tool.',
      },
      {
        title: 'Order management',
        description: 'Orders tracked in the same operation as guest communication.',
      },
      {
        title: 'Inventory',
        description: 'Stock visibility tied to what the restaurant actually sells.',
      },
      {
        title: 'Staffing',
        description: 'Schedules and coverage considered alongside service demand.',
      },
      {
        title: 'Operational automation',
        description: 'Repeated service tasks handled by software, with a person still accountable for the result.',
      },
    ],
  },
  {
    id: 'websites',
    name: 'Websites & Integration',
    status: 'available',
    statusLabel: 'Available as a service',
    summary:
      'A professional restaurant website, or a connection added to the website you already have. Buying a new site is optional.',
    icon: Globe,
    paragraphs: [
      'Website work is a service, separate from the CRM product. You can keep the site you have. A widget or a connected section can take inquiries without a redesign.',
      'If you want a new site, it can be built for the restaurant and prepared to connect with NRG services. A live connection to the CRM waits until that product is actually available. The site can still include clear contact and inquiry flows now.',
    ],
    features: [
      {
        title: 'Keep your current website',
        description: 'Add the communication path you need to the site guests already use.',
      },
      {
        title: 'Commission a new website',
        description: 'A professional site for the restaurant, with room to connect NRG services later.',
      },
      {
        title: 'Optional by design',
        description: 'You do not need a new website to talk about CRM, communication, or other automation.',
      },
    ],
  },
]

export const steps = [
  {
    title: 'Consultation',
    description: 'We look at how customers reach you, which tools you already pay for, and where time is lost.',
    icon: MessageSquare,
  },
  {
    title: 'Setup and configuration',
    description: 'The agreed workflows are configured around those tools. You do not need to run a technical project.',
    icon: Settings2,
  },
  {
    title: 'Launch and ongoing management',
    description: 'The work goes live with a named point of contact, and automation stays under human review.',
    icon: CalendarCheck,
  },
]

export const principles: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Adapted to the business',
    description: 'The setup starts from your floor, your menu, and your current tools.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Clear onboarding',
    description: 'You get a plain sequence of what happens before anything is switched on.',
    icon: ListChecks,
  },
  {
    title: 'Careful with information',
    description: 'Customer and business details are collected for the service you asked for, and are not sold.',
    icon: ShieldCheck,
  },
  {
    title: 'People stay in charge',
    description: 'Automation can draft and route routine work. A person still owns exceptions and important replies.',
    icon: UserCheck,
  },
  {
    title: 'Built to be maintained',
    description: 'The work uses ordinary, documented web technology so it can be changed later.',
    icon: Boxes,
  },
  {
    title: 'Practical results',
    description: 'The measure is fewer dropped inquiries and less repeated admin, not a demo that looks busy.',
    icon: Target,
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Can I keep my existing website?',
    answer:
      'Yes. A new website is optional. NRG can add a widget or a connected section to the site you already use, or build a separate site if you want one.',
  },
  {
    question: 'Can I continue using Rezzo?',
    answer:
      'Yes. Standard CRM is meant to work beside reservation systems such as Rezzo. It is not a requirement that you leave the booking tool you have.',
  },
  {
    question: 'Do I need technical experience?',
    answer:
      'No. The consultation and setup are done with you in plain language. You do not need to configure servers or write prompts.',
  },
  {
    question: 'Can I manage the system from my phone?',
    answer:
      'Reviewing messages and customer records from a phone is part of the intended workflow. The CRM product is still being built, so the exact screens are confirmed during setup rather than offered as a finished app.',
  },
  {
    question: 'How does the AI learn about my business?',
    answer:
      'It should answer from what you supply: hours, menu, policies, tone, and the tasks you want handled. It does not replace checking important replies. A person stays in the loop.',
  },
  {
    question: 'Can I upgrade later?',
    answer:
      'Yes. You can start with communication, a CRM plan, or a website, and expand toward the autonomous platform when those capabilities are actually available.',
  },
  {
    question: 'What happens to my customer data?',
    answer:
      'It would be used to answer customers, keep records, and report on that work. It is not sold. You can ask for a copy or deletion. Customer data is not stored by a live CRM on this website today. How a future system holds it is agreed before that system is used. The privacy notice covers the consultation form.',
  },
]
