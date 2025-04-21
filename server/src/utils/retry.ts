export const retry = async <T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 1000
  ): Promise<T> => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        if (attempt >= retries) throw error;
        console.warn(`Retrying DB operation... (${attempt}/${retries})`);
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
    throw new Error('Failed after retries');
  };