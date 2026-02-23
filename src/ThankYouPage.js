import React, { useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, Content2Xl } from "../components/misc/Layouts";
import GitHubButton from "react-github-btn";
import { SectionHeading as HeadingBase } from "../components/misc/Headings";
import { SectionDescription as DescriptionBase } from "../components/misc/Typography";

export default function LandingPage() {
  useEffect(() => {
    // Google Analytics
    window.gtag?.("js", new Date());
    window.gtag?.("config", "UA-45799926-9");
  }, []);

  return (
    <AnimationRevealPage disabled>
      <Container className="-mx-8 -mt-8 pt-8 px-8">
        <Content2Xl>
          {/* Navigation */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
            <div className="flex flex-col lg:flex-row items-center">
              <a
                target="_blank"
                href="https://owaiskhan.me/post/free-tailwindcss-react-ui-kit"
                className="mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hover:border-gray-700"
              >
                License & Usage
              </a>
              <a
                target="_blank"
                href="https://twitter.com/owaiswiz"
                className="mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hover:border-gray-700"
              >
                Twitter
              </a>
              <a
                target="_blank"
                href="https://owaiskhan.me"
                className="mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 lg:mr-12 last:mr-0 text-gray-700 border-gray-400 hover:border-gray-700"
              >
                Who Am I ?
              </a>
              <a
                target="_blank"
                href="https://gum.co/QaruQ"
                className="mt-4 lg:mt-0 text-gray-100 bg-primary-500 px-6 py-3 rounded hover:bg-primary-900 focus:outline-none focus:shadow-outline border-none"
              >
                Download Now
              </a>
            </div>
          </div>

          {/* Hero */}
          <div className="max-w-xl flex flex-col justify-between items-center py-20 lg:py-24 mx-auto text-center">
            <h1 className="text-primary-900 text-4xl font-extrabold leading-snug">
              Thank You!
            </h1>
            <p className="mt-4 text-gray-700 lg:text-base max-w-lg mx-auto lg:mx-0">
              Your Download Will Begin Shortly. If it does not, .
            </p>

            <div className="mt-12 text-center">
              I am working on another library similar to Treact, with{" "}
              <span className="font-bold">more components</span> and a much{" "}
              <span className="font-bold">better developer experience</span>.
            </div>

            <div className="mt-12 text-center">
              If you liked Treact and would like to get updates on the library I am
              working on among other things, do <span className="font-bold">follow</span> me
              on Twitter/GitHub.

              <div className="mt-12 flex flex-col items-center">
                <a
                  href="https://twitter.com/owaiswiz?ref_src=twsrc%5Etfw"
                  className="twitter-follow-button"
                  data-size="large"
                  data-show-count="true"
                >
                  Follow @TwitterDev
                </a>

                <div className="mt-8">
                  <GitHubButton
                    href="https://github.com/owaiswiz"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Follow @owaiswiz on GitHub"
                  >
                    Follow @owaiswiz
                  </GitHubButton>
                </div>
              </div>
            </div>
          </div>
        </Content2Xl>
      </Container>
    </AnimationRevealPage>
  );
}
