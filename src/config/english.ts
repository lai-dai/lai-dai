import { NavItemWithChildren } from "~/types/nav"

export interface EnglishConfig {
  grammarNav: NavItemWithChildren[]
}

export const englishConfig: EnglishConfig = {
  grammarNav: [
    {
      title: "Grammar",
      items: [
        {
          title: "For Beginners",
          items: [
            {
              title: "Danh từ và mạo từ",
              href: "/english/grammar/nouns",
              items: [],
            },
          ],
        },
        {
          title: "For Advancers",
          items: [
            {
              title: "Present and Past",
              items: [
                {
                  title: "Present Continuous",
                  href: "/english/grammar/present-continuous",
                  items: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
