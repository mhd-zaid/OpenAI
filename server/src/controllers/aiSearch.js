export default getOpenAICompletion => ({
  search: async (req, res) => {
    try {
      const { message } = req.body;
      const response = await getOpenAICompletion(message);
      return res.json(response.choices[0].message);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
});
