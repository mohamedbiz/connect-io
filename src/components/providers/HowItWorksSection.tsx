
const HowItWorksSection = () => {
  const howItWorksSteps = [
    {
      number: 1,
      title: "Apply & Showcase Results",
      description: "Demonstrate your eCommerce email expertise and track record."
    },
    {
      number: 2,
      title: "Pass Our Expert Vetting",
      description: "We verify your skills, strategic approach, and client success stories."
    },
    {
      number: 3,
      title: "Get Profile Approved",
      description: "Join our curated network and create your expert profile."
    },
    {
      number: 4,
      title: "Receive Qualified Connections",
      description: "Get notified when matched Founders reach out directly."
    },
    {
      number: 5,
      title: "Deliver & Earn",
      description: "Focus on delivering exceptional results for appreciative clients."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2342]">
            Your Simple Path to Better Clients
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
