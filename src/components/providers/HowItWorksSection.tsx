
const HowItWorksSection = () => {
  const howItWorksSteps = [
    {
      number: 1,
      title: "Apply & Showcase Expertise",
      description: "Submit your application detailing your experience, skills (especially Klaviyo), and results."
    },
    {
      number: 2,
      title: "Pass Our Vetting",
      description: "Our team reviews your application, case studies, and may conduct an interview to verify your expertise."
    },
    {
      number: 3,
      title: "Create Your Profile",
      description: "Once approved, build your detailed profile to attract ideal clients."
    },
    {
      number: 4,
      title: "Receive Direct Connections",
      description: "Get notified when qualified Founders initiate contact via our platform."
    },
    {
      number: 5,
      title: "Deliver & Grow",
      description: "Focus on delivering outstanding results and building long-term client relationships."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            Join Our Network of Vetted Experts
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2D82B7] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-[#0A2342]">{step.title}</h3>
                  <p className="text-[#0E3366] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
