/** Single source of truth for the About page FAQ: rendered as HTML and as
    FAQPage schema, which Google requires to match the visible content. */
export const faqs = [
  {
    question: "Is WrestleVerse similar to Total Extreme Wrestling?",
    answer:
      "WrestleVerse is inspired by classic wrestling booking simulators like Total Extreme Wrestling and Extreme Warfare Revenge, but is designed specifically for mobile devices with a more streamlined and modern interface, along with innovative features that push the boundaries of the genre.",
  },
  {
    question: "Is WrestleVerse similar to Football Manager?",
    answer:
      "Yes. Players manage long-term progression, talent development, strategy, and promotion growth in a similar way to sports management games like Football Manager.",
  },
  {
    question: "Can I create my own wrestling promotion?",
    answer:
      "Yes. WrestleVerse features a deep and integrated Creation Suite that allows players to create a whole custom universe of promotions, championships, shows, and wrestlers.",
  },
  {
    question: "Does WrestleVerse use real wrestlers?",
    answer:
      "WrestleVerse features original fictional content built into the game, but players can also share and explore community-created Custom Scenarios.",
  },
];

export const faqPage = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
