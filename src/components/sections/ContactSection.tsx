import SectionWrapper from "../SectionWrapper";
import SectionHeader from "../SectionHeader";
import { Button } from "../ui/button";

const ContactSection = () => (
  <SectionWrapper id="contact">
    <SectionHeader title="Contact" />
    <div className="flex flex-col items-start gap-6 max-w-xl">
      <p className="text-gray-300 text-lg">Let’s build something together! Reach out for collaborations, freelance, or just to connect.</p>
      <div className="flex items-center gap-4">
        <span className="text-white font-semibold">yaqeenwunzaligu@gmail.com</span>
        <Button asChild>
          <a href="mailto:yaqeenwunzaligu@gmail.com">Send Email</a>
        </Button>
      </div>
    </div>
  </SectionWrapper>
);

export default ContactSection;
