import { ChevronDown } from 'lucide-react'
import { faqs } from '@/content/offer'

export function FaqList() {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border">
      {faqs.map((item) => (
        <details key={item.question} className="group px-5 open:bg-secondary/40 sm:px-6">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span>{item.question}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
