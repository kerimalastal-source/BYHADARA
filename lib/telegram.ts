/**
 * Alerts to the team's Telegram through the bot "BYHADARA Alerts". Without TELEGRAM_BOT_TOKEN and
 * TELEGRAM_CHAT_ID nothing is sent and nothing fails.
 */
export const telegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
/** Calls a Bot API method for the team's chat; throws when Telegram refuses it. */
async function telegram(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return undefined;
  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        ...body,
      }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
  } catch {
    // The request URL carries the token, so the underlying error is never logged.
    throw new Error('Telegram unreachable.');
  }
  const result = await response.json().catch(() => ({}));
  // Telegram's description (for example "chat not found") never contains the token.
  if (!response.ok)
    throw new Error(`Telegram error ${response.status}: ${String(result.description ?? '')}`);
  return result.result as { message_id?: number } | undefined;
}
/**
 * Sends `text` (Telegram HTML, values already escaped), as a reply when `replyTo` is given, and
 * returns the new message's id.
 */
export async function sendTelegramMessage(text: string, replyTo?: number | null) {
  const result = await telegram('sendMessage', {
    text,
    ...(replyTo
      ? { reply_parameters: { message_id: replyTo, allow_sending_without_reply: true } }
      : {}),
  });
  return result?.message_id;
}
/** Replaces the text of an earlier message; editing sends no new notification. */
export async function editTelegramMessage(messageId: number, text: string) {
  await telegram('editMessageText', { message_id: messageId, text });
}
