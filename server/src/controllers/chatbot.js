export default (
  getOpenAICompletion,
  getContext,
  addToContext,
  resetContext,
) => ({
  send: async (req, res) => {
    try {
      const { message } = req.body;
      const response = await getOpenAICompletion(message);

      let allMessages = [];

      for await (const chunk of response) {
        allMessages.push(chunk.choices[0].delta.content);
        res.write(
          `data: ${JSON.stringify({
            content: chunk.choices[0].delta.content,
          })}\n\n`,
        );
      }
      addToContext({ role: 'assistant', content: allMessages.join('') });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getCoversationContext: (req, res) => {
    return res.json(getContext());
  },
  resetConversationContext: (req, res) => {
    resetContext();
    return res.json({ message: 'Conversation context has been reset' });
  },
});
