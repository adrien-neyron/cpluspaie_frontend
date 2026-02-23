import React from "react";
import tw from "twin.macro";
import { motion } from "framer-motion";
import Footer from "components/footers/MiniCenteredFooter.js";


const Heading = tw.h2`text-4xl font-black text-gray-900`;
const SectionWrapper = tw(motion.div)`px-4 py-12`;

export default function AnimationRevealPage() {
  return (
    <>
      <SectionWrapper
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div tw="max-w-screen-xl mx-auto">
          <div tw="text-center mb-12">
            <Heading>
            </Heading>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
