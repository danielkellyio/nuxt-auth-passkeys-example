import { z } from "zod";

/**
 * WebAuthn Registration Endpoint
 *
 * This endpoint handles passkey registration for new or existing users.
 * It creates the user if they don't exist, then stores the authenticator
 * credentials in the database.
 */
export default defineWebAuthnRegisterEventHandler({
  async validateUser(userBody, event) {
    // bonus: check if the user is already authenticated to link a credential to his account
    // We first check if the user is already authenticated by getting the session
    // And verify that the email is the same as the one in session
    const session = await getUserSession(event);
    if (session.user?.email && session.user.email !== userBody.userName) {
      throw createError({
        statusCode: 400,
        message: "Email not matching curent session",
      });
    }

    // If he registers a new account with credentials
    return z
      .object({
        // we want the userName to be a valid email
        userName: z.email(),
      })
      .parse(userBody);
  },
  async onSuccess(event, { credential, user }) {
    const { createUser, findUserByEmail } = useUser();
    const { saveCredential } = useCredential();

    let dbUser = await findUserByEmail(user.userName);

    if (!dbUser) {
      dbUser = await createUser({
        email: user.userName,
      });
    }

    await saveCredential({
      userId: dbUser.id,
      ...credential,
      transports: credential.transports || [],
    });

    // Set the user session
    await setUserSession(event, {
      user: dbUser,
      loggedInAt: Date.now(),
    });
  },
});
