import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "../../components/max-width-wrapper"
import { Check } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"

const Page = () => {
return <>
<section className="relative py-24 sm:py-32 ">
  <MaxWidthWrapper className="text-center">
    <div className="relative mx-auto flex flex-col text-center items-center gap-10">
<div>
  <Heading className="text-shadow-md">
    <span>Connect your SaaS to Discord.</span>
    <br/>
    <span className="bg-gradient-to-r from-cyan-600 to-cyan-900 bg-clip-text text-transparent">Monitor events in real time.</span>
  </Heading>
</div>
<p className=" text-lg  hidden md:flex md:flex-col max-w-prose text-gray-700 text-pretty text-center">ZapNotify simplifies SaaS monitoring with real-time alerts in Discord.<br/><span className="text-gray-800 font-semibold"> Instantly track users, sales, and system events —no noise, just signal.</span></p>

<div className="w-full max-w-80">
          <ShinyButton href="/sign-up" className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
            Start For Free Today
          </ShinyButton>
        </div>

    </div>
  </MaxWidthWrapper>
</section>
<section></section>
<section></section>
<section></section>
</>
}

export default Page