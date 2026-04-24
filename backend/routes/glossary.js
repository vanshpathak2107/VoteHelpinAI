const express = require('express');
const router = express.Router();

// Built-in glossary data (also served from Firestore when configured)
const GLOSSARY = [
  { term: "EVM", definition: "Electronic Voting Machine — a portable device for casting and counting votes. Battery-operated, not connected to any network.", category: "Technology" },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail — prints a paper slip showing the candidate voted for, visible for 7 seconds.", category: "Technology" },
  { term: "NOTA", definition: "None Of The Above — allows voters to reject all candidates. Introduced in 2013.", category: "Voting Process" },
  { term: "EPIC", definition: "Electors Photo Identity Card — the official voter ID card issued by the Election Commission.", category: "Registration" },
  { term: "Constituency", definition: "A geographical area represented by an elected member. India has 543 Lok Sabha constituencies.", category: "Administration" },
  { term: "BLO", definition: "Booth Level Officer — responsible for voter registration and verification in their assigned area.", category: "Administration" },
  { term: "Model Code of Conduct", definition: "Guidelines for political parties during elections to ensure free and fair process.", category: "Rules" },
  { term: "Returning Officer", definition: "Officer responsible for conducting elections and declaring results in a constituency.", category: "Administration" },
  { term: "Electoral Roll", definition: "Official list of all registered voters in a constituency.", category: "Registration" },
  { term: "Form 6", definition: "Application form for new voter registration, available on NVSP portal.", category: "Registration" },
  { term: "Indelible Ink", definition: "Semi-permanent ink with silver nitrate applied to voter's finger to prevent double voting.", category: "Voting Process" },
  { term: "FPTP", definition: "First Past The Post — electoral system where the candidate with most votes wins.", category: "Rules" },
  { term: "ECI", definition: "Election Commission of India — autonomous body administering all elections. Established Jan 25, 1950.", category: "Administration" },
  { term: "Strong Room", definition: "Secured room where sealed EVMs are stored under 24/7 CCTV and armed guard.", category: "Voting Process" },
  { term: "Postal Ballot", definition: "Allows certain voters (military, disabled, seniors 80+) to vote by mail.", category: "Voting Process" },
  { term: "NVSP", definition: "National Voter Service Portal — online platform for voter services at nvsp.in.", category: "Technology" },
  { term: "Lok Sabha", definition: "Lower house of Parliament (House of the People). 543 elected members.", category: "Governance" },
  { term: "Rajya Sabha", definition: "Upper house of Parliament (Council of States). Members elected by state legislators.", category: "Governance" },
  { term: "Delimitation", definition: "Process of redrawing constituency boundaries based on census data.", category: "Administration" },
  { term: "RTI", definition: "Right to Information — allows citizens to request information from government bodies.", category: "Governance" },
];

/**
 * GET /api/glossary
 * Returns glossary terms, optionally filtered by search query or category
 */
router.get('/glossary', (req, res) => {
  try {
    let results = [...GLOSSARY];
    const { q, category } = req.query;

    if (q && typeof q === 'string') {
      const search = q.toLowerCase().trim();
      results = results.filter(t =>
        t.term.toLowerCase().includes(search) ||
        t.definition.toLowerCase().includes(search)
      );
    }

    if (category && typeof category === 'string') {
      results = results.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    res.json({ terms: results, total: results.length });
  } catch (error) {
    console.error('Glossary error:', error.message);
    res.status(500).json({ error: 'Failed to fetch glossary' });
  }
});

module.exports = router;
