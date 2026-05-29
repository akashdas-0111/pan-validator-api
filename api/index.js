module.exports = (req, res) => {
  const { pan } = req.query;

  if (!pan) {
    return res.json({
      error: "PAN number required",
      example: "/api?pan=ABCDE1234F"
    });
  }

  const panUpper = pan.toUpperCase().trim();
  const panRegex = /^[A-Z]{3}[ABCFGHLJPT][A-Z]\d{4}[A-Z]$/;
  const isValid = panRegex.test(panUpper);

  const panTypes = {
    A: "Association of Persons",
    B: "Body of Individuals",
    C: "Company",
    F: "Firm",
    G: "Government",
    H: "Hindu Undivided Family",
    L: "Local Authority",
    J: "Artificial Juridical Person",
    P: "Individual",
    T: "Trust"
  };

  return res.json({
    success: true,
    pan: panUpper,
    valid: isValid,
    type: isValid ? panTypes[panUpper[3]] : null,
    message: isValid ? "Valid PAN number" : "Invalid PAN number"
  });
};
