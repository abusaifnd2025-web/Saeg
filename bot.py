import logging
from enum import Enum
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, Filters, ConversationHandler, ContextTypes

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Replace with your bot token
TOKEN = "7753669150:AAEQsU1axxJ6zVgcUj_u6tPRq5vUSsCFSYc"

# Replace with your payment numbers
BKASH_NUMBER = "YOUR_BKASH_PHONE_NUMBER"  # e.g., "01XXXXXXXXX"
NAGAD_NUMBER = "YOUR_NAGAD_PHONE_NUMBER"  # e.g., "01XXXXXXXXX"

# Replace with the channel/group ID where @trxpaybot posts Trx IDs
CHANNEL_ID = "YOUR_CHANNEL_ID"  # e.g., "-1001234567890"

# Conversation states
class States(Enum):
    CHOOSE_METHOD = 1
    CONFIRM = 2
    SEND_PROOF = 3

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Show payment method options."""
    keyboard = [
        [InlineKeyboardButton("bKash", callback_data="bkash"),
         InlineKeyboardButton("Nagad", callback_data="nagad")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Welcome! Choose a payment method:", reply_markup=reply_markup)
    return States.CHOOSE_METHOD.value

async def choose_method(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Show payment number and confirm/cancel buttons."""
    query = update.callback_query
    await query.answer()
    method = query.data
    context.user_data['method'] = method

    number = BKASH_NUMBER if method == "bkash" else NAGAD_NUMBER
    await query.edit_message_text(f"Send payment to: {number}\nAmount: $10 (example)")

    keyboard = [
        [InlineKeyboardButton("Confirm Payment", callback_data="confirm"),
         InlineKeyboardButton("Cancel", callback_data="cancel")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await query.message.reply_text("Confirm or cancel?", reply_markup=reply_markup)
    return States.CONFIRM.value

async def confirm(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handle confirm/cancel and request screenshot and Trx ID."""
    query = update.callback_query
    await query.answer()
    if query.data == "cancel":
        await query.edit_message_text("Payment cancelled.")
        return ConversationHandler.END

    await query.edit_message_text("Please send a screenshot of the payment and the Trx ID as text.")
    context.user_data['screenshot'] = None
    return States.SEND_PROOF.value

async def send_proof(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    """Handle screenshot and Trx ID, then verify Trx ID."""
    if update.message.photo:
        context.user_data['screenshot'] = update.message.photo[-1].file_id
        await update.message.reply_text("Screenshot received. Now send the Trx ID.")
        return States.SEND_PROOF.value
    elif update.message.text:
        trx_id = update.message.text.strip()
        screenshot = context.user_data.get('screenshot')

        if not screenshot:
            await update.message.reply_text("Please send the screenshot first.")
            return States.SEND_PROOF.value

        # Verify Trx ID in channel
        verified = await verify_trx_id(context, trx_id)
        if verified:
            await update.message.reply_text("Payment verified! Thank you.")
        else:
            await update.message.reply_text("Verification failed. Trx ID not found in @trxpaybot messages.")
        return ConversationHandler.END
    else:
        await update.message.reply_text("Please send a photo (screenshot) or text (Trx ID).")
        return States.SEND_PROOF.value

async def verify_trx_id(context: ContextTypes.DEFAULT_TYPE, trx_id: str) -> bool:
    """Check if Trx ID exists in channel messages."""
    try:
        # Fetch recent messages from the channel
        messages = await context.bot.get_chat_history(chat_id=CHANNEL_ID, limit=100)
        for message in messages:
            if message.text and trx_id in message.text:
                return True
        return False
    except Exception as e:
        logger.error(f"Error verifying Trx ID: {e}")
        return False

def main():
    """Run the bot."""
    application = Application.builder().token(TOKEN).build()

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            States.CHOOSE_METHOD.value: [CallbackQueryHandler(choose_method)],
            States.CONFIRM.value: [CallbackQueryHandler(confirm)],
            States.SEND_PROOF.value: [MessageHandler(Filters.photo | Filters.text & ~Filters.command, send_proof)],
        },
        fallbacks=[],
    )
    application.add_handler(conv_handler)

    application.run_polling()

if __name__ == '__main__':
    main()