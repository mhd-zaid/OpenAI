export default (getOpenAICompletion, getContext, resetContext) => ({
  send: async (req, res) => {
    try {
      const { message } = req.body;
      const response = await getOpenAICompletion(message);
      return res.json(response.choices[0].message);
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
