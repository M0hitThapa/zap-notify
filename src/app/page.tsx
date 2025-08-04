import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "../components/max-width-wrapper"
import { Check } from "lucide-react"

const Page = () => {
return <>
<section className="relative py-24 sm:py-32 ">
  <MaxWidthWrapper className="text-center">
    <div className="relative mx-auto flex flex-col text-center items-center gap-10">
<div>
  <Heading>
    <span>Connect your SaaS to Discord.</span>
    <br/>
    <span className="bg-gradient-to-r from-emerald-600 to-emerald-900 bg-clip-text text-transparent">Monitor events in real time.</span>
  </Heading>
</div>
<p className="text-base/7   max-w-prose text-gray-600 text-pretty text-center">ZapNotify simplifies SaaS monitoring with real-time alerts in Discord.<br/><span className="text-gray-800 font-semibold"> Instantly track users, sales, and system events</span>—no noise, just signal.</p>
<ul className="space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start">
  {[
    "Real-time Discord alerts for critical events", 
          "Bye once , use forever",
          "Track sales, new users, or any other event"
  ].map((item, index) => (
    <li className="flex gap-1.5 items-center text-left">
      <Check className="size-5 shrink-0 text-emerald-700" />
      {item}</li>
  ))}
</ul>
    </div>
  </MaxWidthWrapper>
</section>
<section></section>
<section></section>
<section></section>
</>
}

export default Page