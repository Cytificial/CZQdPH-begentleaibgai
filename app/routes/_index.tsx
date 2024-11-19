import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Powered Prompt Optimization`,
      description: `Our advanced algorithms transform your basic descriptions into expertly crafted prompts that get optimal results from any AI tool.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Time-Saving Templates`,
      description: `Access pre-built prompt templates for common use cases, saving hours of manual prompt engineering work.`,
      icon: <i className="las la-clock"></i>,
    },
    {
      heading: `Context-Aware Generation`,
      description: `Smart prompt generation that considers your industry, use case, and desired outcome for maximum relevance.`,
      icon: <i className="las la-brain"></i>,
    },
    {
      heading: `Multi-Platform Support`,
      description: `Generate optimized prompts for any AI platform including ChatGPT, DALL-E, Midjourney and more.`,
      icon: <i className="las la-plug"></i>,
    },
    {
      heading: `Real-Time Optimization`,
      description: `Instant feedback and suggestions to improve your prompts for better AI responses.`,
      icon: <i className="las la-bolt"></i>,
    },
    {
      heading: `Enterprise Ready`,
      description: `Team collaboration features, usage analytics, and enterprise-grade security for business users.`,
      icon: <i className="las la-building"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Marketing Director`,
      content: `This tool has revolutionized how our marketing team works with AI. What used to take hours of prompt tweaking now takes minutes.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `James Wilson`,
      designation: `Software Engineer`,
      content: `The quality of AI responses I get using these optimized prompts is incredible. It's like having a prompt engineering expert on call 24/7.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Content Creator`,
      content: `I was skeptical at first, but this tool has become indispensable for my content creation workflow. The time savings alone are worth it.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `David Park`,
      designation: `Product Manager`,
      content: `Our team's productivity skyrocketed after implementing this tool. The ROI was obvious within the first week.`,
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
    {
      name: `Lisa Thompson`,
      designation: `Digital Agency Owner`,
      content: `This has become our secret weapon for delivering consistent, high-quality AI content to our clients.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `Robert Chen`,
      designation: `Startup Founder`,
      content: `The prompt templates and optimization features have helped us scale our AI operations without sacrificing quality.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]


  const questionAnswers = [
    {
      question: `How does the AI prompt generator work?`,
      answer: `Our system analyzes your input and uses advanced algorithms to generate optimized prompts that follow best practices in prompt engineering. It considers context, clarity, and specific requirements for different AI platforms.`,
    },
    {
      question: `Will this work with my existing AI tools?`,
      answer: `Yes! Our prompt generator is compatible with all major AI platforms including ChatGPT, DALL-E, Midjourney, and more. The prompts are optimized for each specific platform.`,
    },
    {
      question: `How much time can I save using this tool?`,
      answer: `Most users report saving 80% of the time they previously spent on prompt creation and refinement. This typically translates to 10-15 minutes saved per prompt.`,
    },
    {
      question: `Do you offer a free trial?`,
      answer: `Yes! New users get 3 free credits to experience the power of our prompt generator. No credit card required to start.`,
    },
  ]

  const steps = [
    {
      heading: `Describe Your Need`,
      description: `Simply tell us what you want to achieve with AI in plain language.`,
    },
    {
      heading: `Generate Optimized Prompt`,
      description: `Our AI analyzes your input and generates a perfectly structured prompt.`,
    },
    {
      heading: `Review and Refine`,
      description: `Fine-tune the generated prompt with our real-time optimization suggestions.`,
    },
    {
      heading: `Get Better Results`,
      description: `Use your optimized prompt with any AI tool for superior outputs.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Spending hours crafting the perfect prompt`,
    },
    {
      emoji: `😤`,
      title: `Getting irrelevant or low-quality AI responses`,
    },
    {
      emoji: `😩`,
      title: `Wasting money on inefficient AI interactions`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Simple Descriptions into Expert-Level AI Prompts`}
        subtitle={`Stop wasting time with trial-and-error prompt writing. Get professionally optimized prompts in seconds.`}
        buttonText={`Start Optimizing For Free`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/CZQdPH-begentleaibgai-krjm`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy prompt engineers`}
          />
        }
      />
      <LandingSocialProof title={`Featured on`} />
      <LandingPainPoints
        title={`Poor prompts reduce AI effectiveness by 70%. Stop leaving your AI results to chance.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks title={`Your Path to Perfect Prompts`} steps={steps} />
      <LandingFeatures
        id="features"
        title={`Everything You Need for Professional-Grade AI Prompts`}
        subtitle={`Powerful features designed to maximize your AI effectiveness`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Users Already Saving Hours on Prompt Engineering`}
        subtitle={`See how our AI prompt generator is transforming workflows`}
        testimonials={testimonials}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Our AI Prompt Generator`}
        subtitle={`Everything you need to know to get started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your AI Experience?`}
        subtitle={`Get started with 3 free credits - no credit card required`}
        buttonText={`Start Generating Better Prompts`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
