import { siteConfig } from "~/config/site"
import { cn } from "~/lib/utils"

interface BuyMeACoffeeProps {
  width?: number
  height?: number
  className?: string
}

export function BuyMeACoffee({
  width = 250,
  height = 50,
  className,
}: BuyMeACoffeeProps) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <a
        href={siteConfig.links.buyMeACoffee}
        target={"_blank"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={"buy me a coffee"}
          className={"my-4"}
          height={height}
          src={"https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=laidai&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"}
          width={width}/>

          <span className={"sr-only"}>{"Buy me a coffee"}</span>
      </a>
    </div>
  )
}
