type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      viewBox={"0 0 256 256"}
      xmlns={"http://www.w3.org/2000/svg"}
      {...props}
    >
      <rect
        fill={"none"}
        height={"256"}
        width={"256"}
      />

      <line
        fill={"none"}
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"32"}
        x1={"90"}
        x2={"40"}
        y1={"40"}
        y2={"90"}
      />

      <line
        fill={"none"}
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"32"}
        x1={"208"}
        x2={"128"}
        y1={"128"}
        y2={"208"}
      />

      <line
        fill={"none"}
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"32"}
        x1={"192"}
        x2={"40"}
        y1={"40"}
        y2={"192"}
      />
    </svg>
  ),
  geist: (props: IconProps) => (
    <svg
      height={"16"}
      stroke-linejoin={"round"}
      style={{ color: "currentcolor" }}
      viewBox={"0 0 16 16"}
      width={"16"}
      {...props}
    >
      <path
        d={
          "M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z"
        }
        clip-rule={"evenodd"}
        fill={"currentColor"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  ),
}
