export default (getOpenAICompletion) => ({
  list: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await getOpenAICompletion(id);
      return res.json(response.choices[0].message);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
});
