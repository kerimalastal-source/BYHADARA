/**
 * Alerts to the team's Telegram through the bot "BYHADARA Alerts". Without TELEGRAM_BOT_TOKEN and
 * TELEGRAM_CHAT_ID nothing is sent and nothing fails.
 */
export const telegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
/** Sends `text` (Telegram HTML, values already escaped); throws when Telegram refuses it. */
export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
  } catch {
    // The request URL carries the token, so the underlying error is never logged.
    throw new Error('Telegram unreachable.');
  }
  if (!response.ok) {
    // Telegram's description (for example "chat not found") never contains the token.
    const result = await response.json().catch(() => ({}));
    throw new Error(`Telegram error ${response.status}: ${String(result.description ?? '')}`);
  }
}
