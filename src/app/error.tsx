"use client"

export default function Error({ error }: { error: Error }) {
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
          <p>{"Something went wrong"}</p>

          <p>{"Sorry, an error occurred while processing your request."}</p>

          <pre>{error.message}</pre>
        </code>
      </pre>
    </div>
  )
}

const ascii = `
 _______  _______  _______
|       ||  _    ||  _    |
|   ____|| | |   || | |   |
|  |____ | | |   || | |   |
|_____  || |_|   || |_|   |
 _____| ||       ||       |
|_______||_______||_______|`
