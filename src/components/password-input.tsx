import React from "react"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...props }, ref) => {
  const [isPasswordType, setIsPasswordType] = React.useState(true)
  const id = React.useId()

  return (
    <div className={"space-y-2"}>
      <Input
        ref={ref}
        {...props}
        type={isPasswordType ? "password" : "text"}
      />

      <div className={"flex items-center space-x-2"}>
        <Checkbox
          checked={!isPasswordType}
          id={`terms-${id}`}
          onCheckedChange={checked => setIsPasswordType(!checked)}
        />

        <Label
          aria-label={"toggle-password-checkbox"}
          htmlFor={`terms-${id}`}
        >
          {"Show password"}
        </Label>
      </div>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
