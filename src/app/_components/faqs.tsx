import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "./container";

// Types for better type safety
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Content object for easier maintenance and potential localization
const faqData: FAQItem[] = [
  {
    id: "life-hack",
    question: "Your #1 Overall \"Life Hack\" for Living Your Best Life in Hildesheim?",
    answer: "Don't rush your Master's - aim for 5-6 semesters instead of 4 to reduce stress. Build a diverse friend group for support, especially during tough winter months when daylight is limited. Attend orientation events to meet people - your social circle will be crucial for motivation."
  },
  {
    id: "admin-tips",
    question: "Tips for Smoothing Out Admin & Bureaucracy in Hildesheim?",
    answer: "Embrace German bureaucracy with organized document files. Secure accommodation with a Wohnungsgeberbestätigung (confirmation of address) before arrival, as it's needed for bank accounts and other registrations."
  },
  {
    id: "saving-money",
    question: "Best Tips for Saving Money & Living Affordably in Hildesheim?",
    answer: "Shop at discount supermarkets like Aldi, Lidl, or Netto. Use apps like KaufDA for discounts and shop late for meat markdowns. Buy halal meat from Turkish/Arab stores for better prices. Use student discount platforms like Unideals and Studentbeans."
  },
  {
    id: "social-life",
    question: "How to Make the Most of Social Life & Leisure in Hildesheim?",
    answer: "Join sports, music, or other activities beyond your study circle. Explore Irish pubs (often English-friendly) and Wohnzimmer for its chill vibe. Buy a second-hand bike for summer rides. Visit nearby cities like Braunschweig for more events and activities."
  },
  {
    id: "academic-tips",
    question: "Academic & University-Related Tips for Fellow Students?",
    answer: "Form study groups and use the G building as a workspace. For DA students, remember slides are just excerpts - study referenced materials too. Many feel they'll fail first-semester exams - it's normal. Focus on career goals before part-time jobs."
  },
  {
    id: "additional-tips",
    question: "Anything Else to Share to Make Student Life Better/Easier?",
    answer: "Learn German early for better career opportunities. Get a bike for transportation. Avoid working in first two semesters if possible. Choose your social circle wisely - it greatly impacts your experience in this small city."
  },
];

// Individual FAQ Item Component for better reusability
function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  return (
    <AccordionItem value={faq.id}>
      <AccordionTrigger className="text-left hover:no-underline hover:bg-accent/50 p-4 rounded-lg">
        <span className="font-medium text-lg flex items-start">
          <span className="inline-block mr-3 text-primary font-bold">{index + 1}.</span>
          {faq.question}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="pl-7 border-l-2 border-primary/20">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Main FAQ Component
export function FAQs() {
  return (
    <section id="faqs" className="py-20">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about studying and living in Hildesheim
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center">
              <span className="mr-2">💡</span> Student Guide FAQs
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full" defaultValue="life-hack">
              {faqData.map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index} />
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}