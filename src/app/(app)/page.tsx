import Link from "next/link"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header"
import { Button } from "~/components/ui/button"

export default async function HomePage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>
          {"Hi, Mình là Lại Đài 👋"}

          <br />

          <pre className={"whitespace-pre-line text-lg md:text-3xl"}>
            {"Front-end Developer / Content Creator"}
          </pre>
        </PageHeaderHeading>

        <PageHeaderDescription>
          {"Mình thường chia sẻ nhưng thứ hay ho trên Internet 🐋."}
        </PageHeaderDescription>

        <PageActions>
          <Button
            asChild={true}
            size={"sm"}
          >
            <Link href={"/docs"}>{"Bắt đầu thôi"}</Link>
          </Button>

          <Button
            asChild={true}
            size={"sm"}
            variant={"ghost"}
          >
            <Link href={"/blocks"}>{"My Components"}</Link>
          </Button>
        </PageActions>
      </PageHeader>

      <div className={"border-grid border-b"}>
        <div className={"container-wrapper"}>
          <div className={"container py-4"}>
            <h3 className={"text-lg"}>{"My Project"}</h3>

            <div className={"flex flex-col gap-3"}>
              <Link href={"/grammar"}>{"Grammar"}</Link>

              <Link href={"/menu"}>{"Menu"}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
