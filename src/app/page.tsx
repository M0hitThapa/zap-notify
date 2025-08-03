import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "../components/max-width-wrapper"

const Page = () => {
return <>
<section className="relative py-24 sm:py-32 bg-brand-25">
  <MaxWidthWrapper className="text-center">
    <div className="relative mx-auto flex flex-col text-center items-center gap-10">
<div>
  <Heading>
    Real Time Saas Insights,
  </Heading>
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