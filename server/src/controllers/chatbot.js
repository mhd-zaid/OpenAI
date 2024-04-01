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
        console.log(chunk.choices[0].delta.content);
        allMessages.push(chunk.choices[0].delta.content);
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
