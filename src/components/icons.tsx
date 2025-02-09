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
      strokeLinejoin={"round"}
      style={{ color: "currentcolor" }}
      viewBox={"0 0 16 16"}
      width={"16"}
      {...props}
    >
      <path
        d={
          "M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z"
        }
        clipRule={"evenodd"}
        fill={"currentColor"}
        fillRule={"evenodd"}
      ></path>
    </svg>
  ),
  nextjs: (props: IconProps) => (
    <svg
      fill={"currentColor"}
      height={"1em"}
      role={"img"}
      stroke={"currentColor"}
      strokeWidth={"0"}
      viewBox={"0 0 24 24"}
      width={"1em"}
      xmlns={"http://www.w3.org/2000/svg"}
      {...props}
    >
      <path
        d={
          "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
        }
      ></path>
    </svg>
  ),
  love: (props: IconProps) => (
    <svg
      fill={"currentColor"}
      height={"1em"}
      stroke={"currentColor"}
      strokeWidth={"0"}
      style={{ strokeWidth: 2 }}
      viewBox={"0 0 24 24"}
      width={"1em"}
      xmlns={"http://www.w3.org/2000/svg"}
      {...props}
    >
      <path
        d={
          "M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 0 1-.686 0 16.709 16.709 0 0 1-.465-.252 31.147 31.147 0 0 1-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0 1 14 20.408Z"
        }
      ></path>
    </svg>
  ),
}
