export async function waitForMockDelay(delayMs = 350) {
  const normalizedDelay = Math.max(0, delayMs);

  if (normalizedDelay === 0) {
    return;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, normalizedDelay);
  });
}
