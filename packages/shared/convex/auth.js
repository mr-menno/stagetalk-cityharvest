import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import {
  convexAuth,
  createAccount,
  retrieveAccount,
} from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    ConvexCredentials({
      id: "deviceAuth",
      authorize: async ({ deviceId, flow }, ctx) => {
        if (flow === "register" && deviceId) {
          const { account } = await createAccount(ctx, {
            provider: "deviceAuth",
            account: {
              id: deviceId,
            },
            profile: {},
            shouldLinkViaEmail: false,
            shouldLinkViaPhone: false,
          });
          console.log("created account", account);
          return {
            userId: account.userId,
          };
        }
        // }
        // console.log("creds", credentials);
        // const { account } = await retrieveAccount(ctx, {
        //   provider: "deviceAuth",
        //   account: {
        //     id: credentials.deviceId,
        //   },
        // });

        // console.log("account", account);
      },
    }),
  ],
});
