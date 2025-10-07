/**
 * WebAuthn Authentication Endpoint
 *
 * This endpoint handles passkey authentication.
 * It verifies the credential, updates the counter to prevent replay attacks,
 * and creates a user session.
 */
export default defineWebAuthnAuthenticateEventHandler({
  allowCredentials: async (event, userName) => {
    const { findUserByEmail } = useUser();
    const { findCredentialsByUserId } = useCredential();

    const user = await findUserByEmail(userName);

    if (!user)
      throw createError({ statusCode: 400, message: "User not found" });

    const allCredentials = await findCredentialsByUserId(user.id);

    if (!allCredentials.length)
      throw createError({ statusCode: 400, message: "User not found" });

    return allCredentials;
  },

  // Get the authenticator data for verification
  async getCredential(event, credentialId) {
    const { findCredentialById } = useCredential();

    const credential = await findCredentialById(credentialId);

    if (!credential)
      throw createError({
        statusCode: 400,
        message: "Passkey not associated with a user account",
      });

    return credential;
  },

  // Update counter after successful authentication
  async onSuccess(event, { credential, authenticationInfo }) {
    const { updateCredentialCounter } = useCredential();
    const { findUserById } = useUser();

    await updateCredentialCounter(credential.id, authenticationInfo.newCounter);

    const user = await findUserById(credential.userId);

    if (!user)
      throw createError({ statusCode: 400, message: "User not found" });

    // Set the user session
    await setUserSession(event, {
      user,
      loggedInAt: new Date(),
    });
  },
  async storeChallenge(event, challenge, attemptId) {
    await useStorage().setItem(`attempt:${attemptId}`, challenge);
  },
  async getChallenge(event, attemptId) {
    const challenge =
      ((await useStorage().getItem(`attempt:${attemptId}`)) as string) || "";

    // Make sure to always remove the attempt because they are single use only!
    await useStorage().removeItem(`attempt:${attemptId}`);

    if (!challenge)
      throw createError({ statusCode: 400, message: "Challenge expired" });

    return challenge;
  },
});
