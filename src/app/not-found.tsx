export default function NotFoundPage() {
  return (
    <div className="mx-auto grid min-h-svh max-w-7xl place-content-center border-dashed xl:border-x">
      <pre
        className={
          "flex h-full flex-col items-center justify-center space-y-5 whitespace-pre-wrap"
        }>
        <code className={"text-[1.4dvh] leading-[0.9] tracking-[-0.1em]"}>
          {ascii}
        </code>

        <code className={"text-center"}>
          <p>{"Page not found"}</p>

          <p>{"Sorry, the page you are looking for could not be found."}</p>
        </code>
      </pre>
    </div>
  )
}

const ascii = `
    ___    _______     ___
   /   )  (  __   )   /   )
  / /) |  | (  )  |  / /) |
 / (_) (_ | | /   | / (_) (_
(____   _)| (/ /) |(____   _)
     ) (  |   / | |     ) (
     | |  |  (__) |     | |
     (_)  (_______)     (_) `
