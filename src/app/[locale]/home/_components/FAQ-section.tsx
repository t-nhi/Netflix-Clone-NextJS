import { useFaqList } from '@/app/[locale]/home/_constants/index'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FAQSectionProps {
    className?: string
}

export default function FAQSection({ className }: FAQSectionProps) {
    const faqList = useFaqList()

    return (
        <Accordion type='single' collapsible className={cn('w-full flex flex-col gap-2', className)}>
            {faqList.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} className='border-none bg-background ' key={`faq-${index}`}>
                    <AccordionTrigger className='text-lg md:text-2xl  text-left no-underline hover:no-underline p-6 rounded-none! [&_svg]:size-9 bg-muted font-normal hover:bg-muted/90'>
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='flex font-light flex-col gap-4 text-balance text-lg md:text-2xl bg-muted p-6 mt-1'>
                        <p>{faq.answer}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
