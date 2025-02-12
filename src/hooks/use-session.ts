import { type Session } from "next-auth"
import { create } from "zustand"

interface ConfirmAlertStore {
  session?: Session
  getUserSession: () => Session["user"] | undefined
}

export const useSessionStore = create<ConfirmAlertStore>()((_, get) => ({
  session: undefined,
  getUserSession: () => get().session?.user,
}))

export const getUserSession = useSessionStore.getState().getUserSession
