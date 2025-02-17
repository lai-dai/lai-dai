import NextAuth from "next-auth";
import React from "react";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = React.cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
