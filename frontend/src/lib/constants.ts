/* ============================================
   VOTESPHERE AI — CONSTANTS & DATA
   All application data in one place
   ============================================ */

// ─── Election Journey Steps ─────────────────────
export interface JourneyStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  details: string[];
  tips: string[];
  commonMistakes: string[];
  didYouKnow: string;
  deadline?: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: "Voter Registration",
    subtitle: "Your first step to democracy",
    icon: "clipboard-check",
    color: "#3B82F6",
    description: "Register yourself as a voter in the electoral roll. Every eligible citizen aged 18+ can register online or offline through Form 6.",
    details: [
      "Fill Form 6 online at nvsp.in or offline at your nearest ERO office",
      "Provide identity proof (Aadhaar, Passport, Driving License)",
      "Provide address proof for your current constituency",
      "Your application will be verified by the BLO (Booth Level Officer)",
      "Once approved, you receive your EPIC (Voter ID card)"
    ],
    tips: [
      "Register well before the election deadline",
      "Keep your address updated if you move",
      "Check the voter list online before election day",
      "You can track your Form 6 application status online"
    ],
    commonMistakes: [
      "Not checking if your name is already on the voter list",
      "Providing mismatched address on ID and registration",
      "Missing the registration deadline",
      "Not carrying proper documents for verification"
    ],
    didYouKnow: "India has over 950 million registered voters — the largest electorate in the world!",
    deadline: "Registration closes 2–3 weeks before election day"
  },
  {
    id: 2,
    title: "Document Verification",
    subtitle: "Ensuring identity & eligibility",
    icon: "shield-check",
    color: "#8B5CF6",
    description: "Your identity and residential address are verified by election officials to ensure only eligible citizens vote in their designated constituency.",
    details: [
      "BLO (Booth Level Officer) may visit your home for verification",
      "Your documents are cross-checked with government databases",
      "Photo matching is done to prevent duplicate registrations",
      "Your polling station is assigned based on your address",
      "You receive confirmation of your voter registration"
    ],
    tips: [
      "Be available when the BLO visits for verification",
      "Keep original documents ready for inspection",
      "Verify your polling station assignment online",
      "Update your photo if your EPIC photo is outdated"
    ],
    commonMistakes: [
      "Not being available during BLO verification visits",
      "Having outdated photos on voter ID",
      "Not verifying which polling station you're assigned to",
      "Ignoring SMSes or notifications from the election commission"
    ],
    didYouKnow: "The Election Commission uses AI-based facial recognition to detect and remove duplicate voter entries across states."
  },
  {
    id: 3,
    title: "Voter Preparation",
    subtitle: "Know before you go",
    icon: "book-open",
    color: "#06B6D4",
    description: "Before election day, educate yourself on candidates, their manifestos, polling procedures, and what to carry to the booth.",
    details: [
      "Research candidates and their party manifestos",
      "Find your polling booth location on the CEO website",
      "Check the Model Code of Conduct rules",
      "Understand EVM and VVPAT machines",
      "Note the polling time in your state (usually 7 AM to 6 PM)"
    ],
    tips: [
      "Use the Voter Helpline app to find your booth",
      "Carry your EPIC or any of 12 approved ID documents",
      "Reach the booth early to avoid long queues",
      "Read the candidate list displayed outside the booth"
    ],
    commonMistakes: [
      "Not knowing your polling booth location",
      "Going to the wrong polling station",
      "Not carrying a valid photo ID",
      "Not knowing the approved list of alternative IDs"
    ],
    didYouKnow: "Even if you don't have a voter ID card, you can vote using 11 other approved photo IDs including Aadhaar, Passport, and PAN card!"
  },
  {
    id: 4,
    title: "Polling Booth Experience",
    subtitle: "What happens at the booth",
    icon: "building",
    color: "#F59E0B",
    description: "On election day, visit your designated polling station. You'll go through identity verification, ink marking, and proceed to the EVM.",
    details: [
      "Join the queue at your assigned polling station",
      "Present your voter ID to the Polling Officer",
      "Your name is checked against the electoral roll",
      "Indelible ink is applied to your left index finger",
      "You receive a slip and proceed to the voting compartment"
    ],
    tips: [
      "Wear comfortable clothes and carry water",
      "Senior citizens, disabled persons, and pregnant women get priority",
      "Don't carry your phone into the voting compartment",
      "Maintain silence and don't campaign inside the 100m zone"
    ],
    commonMistakes: [
      "Trying to take a selfie or phone into the voting booth",
      "Wearing party symbols or colors to the polling station",
      "Arguing with polling officers about queue priority",
      "Not washing off the ink — it's meant to last 48+ hours"
    ],
    didYouKnow: "The indelible ink used in Indian elections is manufactured exclusively by Mysore Paints & Varnish Limited and contains silver nitrate!"
  },
  {
    id: 5,
    title: "Casting the Vote",
    subtitle: "Your moment of power",
    icon: "vote",
    color: "#10B981",
    description: "Inside the voting compartment, press the button next to your preferred candidate on the EVM. Verify your choice on the VVPAT slip.",
    details: [
      "Enter the voting compartment alone",
      "The EVM displays candidate names with party symbols",
      "Press the blue button next to your chosen candidate",
      "A beep confirms your vote is registered",
      "Check the VVPAT paper slip (visible for 7 seconds) to verify"
    ],
    tips: [
      "Press the button firmly — one press is enough",
      "Wait for the beep before leaving",
      "If the VVPAT shows the wrong candidate, alert the officer immediately",
      "You can press NOTA if you don't support any candidate"
    ],
    commonMistakes: [
      "Pressing the button multiple times (only first press counts)",
      "Not verifying the VVPAT slip",
      "Accidentally pressing the wrong button — take your time",
      "Not knowing about the NOTA option"
    ],
    didYouKnow: "India's EVM machines are standalone, battery-operated, and not connected to any network — making them unhackable over the internet!"
  },
  {
    id: 6,
    title: "Vote Counting",
    subtitle: "Democracy in numbers",
    icon: "calculator",
    color: "#EC4899",
    description: "After polling ends, sealed EVMs are stored securely. On counting day, votes are tallied round by round under strict supervision.",
    details: [
      "EVMs are sealed and stored in strong rooms under CCTV",
      "Armed security guards the strong rooms 24/7",
      "Counting happens on the declared counting day",
      "Votes are counted round by round (usually 14 rounds per table)",
      "Postal ballots are counted first, then EVM votes"
    ],
    tips: [
      "Watch live counting updates on Election Commission's website",
      "Results are available constituency-wise in real-time",
      "VVPAT verification is done for randomly selected booths",
      "Any candidate can request a recount if the margin is narrow"
    ],
    commonMistakes: [
      "Believing exit polls as final results",
      "Confusing trends with final results during counting",
      "Not understanding the difference between leads and wins",
      "Spreading unverified results on social media"
    ],
    didYouKnow: "In close contests, VVPAT paper slips from 5 randomly selected booths per constituency are matched with EVM results for verification!"
  },
  {
    id: 7,
    title: "Result Declaration",
    subtitle: "The people have spoken",
    icon: "trophy",
    color: "#F97316",
    description: "The Returning Officer declares the winning candidate. Results are published officially on the Election Commission website.",
    details: [
      "The candidate with the most votes is declared the winner",
      "The Returning Officer issues the Certificate of Election",
      "Results are updated in real-time on results.eci.gov.in",
      "Winners have to take oath before assuming office",
      "The entire result data becomes public record"
    ],
    tips: [
      "Verify results only from official ECI sources",
      "Understand FPTP (First Past The Post) system",
      "Check the margin of victory in your constituency",
      "Note the NOTA vote count in your area"
    ],
    commonMistakes: [
      "Trusting unofficial WhatsApp forwards for results",
      "Confusing state and central election results",
      "Not understanding coalition and alliance dynamics",
      "Celebrating before official declaration"
    ],
    didYouKnow: "India's 2024 general elections were the largest democratic exercise in history, with over 640 million voters casting ballots!"
  },
  {
    id: 8,
    title: "Post-Election Transparency",
    subtitle: "Accountability continues",
    icon: "eye",
    color: "#14B8A6",
    description: "After elections, citizens can track elected representatives' performance, file RTI queries, and participate in governance.",
    details: [
      "Track your MP's attendance and participation in Parliament",
      "Monitor development work promised during campaigns",
      "File RTI applications for government transparency",
      "Participate in local governance through gram sabhas or ward meetings",
      "Use MyGov platform to share ideas with the government"
    ],
    tips: [
      "Use PRS Legislative Research to track MP performance",
      "File RTI applications online at rtionline.gov.in",
      "Attend public consultations and town halls",
      "Report issues through the CPGRAMS portal"
    ],
    commonMistakes: [
      "Forgetting about democracy after election day",
      "Not holding elected representatives accountable",
      "Ignoring local body elections which directly affect daily life",
      "Not knowing your constitutional rights as a citizen"
    ],
    didYouKnow: "India's Right to Information (RTI) Act is one of the most powerful transparency tools in the world — any citizen can request information from the government!"
  }
];

// ─── Quiz Questions ─────────────────────────────
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum age to register as a voter in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1,
    explanation: "According to the Indian Constitution, any citizen aged 18 or above on the qualifying date (1st January of the year) is eligible to register as a voter.",
    difficulty: 'easy',
    category: 'Registration'
  },
  {
    id: 2,
    question: "What does EVM stand for?",
    options: ["Electronic Verification Machine", "Electronic Voting Machine", "Election Vote Machine", "Electronic Vote Monitor"],
    correctAnswer: 1,
    explanation: "EVM stands for Electronic Voting Machine. India has been using EVMs since the 1990s, replacing paper ballots for faster and more accurate voting.",
    difficulty: 'easy',
    category: 'Voting Process'
  },
  {
    id: 3,
    question: "What is NOTA in the context of Indian elections?",
    options: ["A political party", "None Of The Above option", "National Organization for Transparency", "A voting technique"],
    correctAnswer: 1,
    explanation: "NOTA (None Of The Above) allows voters to officially reject all candidates. It was introduced by the Supreme Court in 2013.",
    difficulty: 'easy',
    category: 'Voting Process'
  },
  {
    id: 4,
    question: "Which body is responsible for conducting elections in India?",
    options: ["Supreme Court", "Election Commission of India", "Parliament", "President of India"],
    correctAnswer: 1,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering all elections at central and state levels.",
    difficulty: 'easy',
    category: 'Administration'
  },
  {
    id: 5,
    question: "What is the purpose of VVPAT?",
    options: ["To count votes faster", "To verify the voter's identity", "To let voters verify their vote was recorded correctly", "To prevent booth capturing"],
    correctAnswer: 2,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the candidate name and symbol, visible for 7 seconds, so voters can verify their vote.",
    difficulty: 'medium',
    category: 'Technology'
  },
  {
    id: 6,
    question: "What is the 'Model Code of Conduct'?",
    options: ["Dress code for voters", "Guidelines for political parties during elections", "Rules for counting votes", "Code for EVM machines"],
    correctAnswer: 1,
    explanation: "The Model Code of Conduct is a set of guidelines issued by ECI that all political parties and candidates must follow during elections to ensure free and fair elections.",
    difficulty: 'medium',
    category: 'Rules & Regulations'
  },
  {
    id: 7,
    question: "How many constituencies are there in the Lok Sabha?",
    options: ["435", "500", "543", "600"],
    correctAnswer: 2,
    explanation: "The Lok Sabha has 543 constituencies. Each constituency elects one Member of Parliament (MP) through direct election.",
    difficulty: 'medium',
    category: 'Administration'
  },
  {
    id: 8,
    question: "Which form is used to register as a new voter?",
    options: ["Form 2", "Form 4", "Form 6", "Form 8"],
    correctAnswer: 2,
    explanation: "Form 6 is used for new voter registration. Form 7 is for objection to inclusion, Form 8 is for corrections, and Form 8A is for transposition.",
    difficulty: 'medium',
    category: 'Registration'
  },
  {
    id: 9,
    question: "What is indelible ink made of?",
    options: ["Carbon black", "Silver nitrate", "Iron oxide", "Potassium permanganate"],
    correctAnswer: 1,
    explanation: "Indelible ink contains silver nitrate, which reacts with skin protein and sunlight to create a dark mark lasting 2-4 weeks. It's manufactured by Mysore Paints & Varnish Ltd.",
    difficulty: 'hard',
    category: 'Technology'
  },
  {
    id: 10,
    question: "What is the FPTP electoral system used in India?",
    options: ["First Past The Post", "Federal Parliament Transfer Policy", "Full Proportional Tallying Process", "Free Public Ticket Platform"],
    correctAnswer: 0,
    explanation: "FPTP (First Past The Post) means the candidate with the most votes in a constituency wins, even without a majority. India uses this for Lok Sabha and state assembly elections.",
    difficulty: 'hard',
    category: 'Rules & Regulations'
  },
  {
    id: 11,
    question: "How many alternative photo IDs can be used if you don't have a voter ID card?",
    options: ["5", "8", "11", "12"],
    correctAnswer: 3,
    explanation: "The Election Commission accepts 12 alternative photo IDs including Aadhaar, Passport, Driving License, PAN card, bank passbook with photo, and more.",
    difficulty: 'hard',
    category: 'Registration'
  },
  {
    id: 12,
    question: "What is a BLO in the election process?",
    options: ["Block Liaison Officer", "Booth Level Officer", "Bureau of Local Operations", "Ballot Logistics Officer"],
    correctAnswer: 1,
    explanation: "A BLO (Booth Level Officer) is a local government official responsible for updating the voter list and verifying voter identities in their assigned area.",
    difficulty: 'medium',
    category: 'Administration'
  },
  {
    id: 13,
    question: "In which year was the NOTA option introduced in India?",
    options: ["2009", "2011", "2013", "2015"],
    correctAnswer: 2,
    explanation: "NOTA was introduced in September 2013 following the Supreme Court's landmark judgment in the PUCL vs Union of India case.",
    difficulty: 'hard',
    category: 'History'
  },
  {
    id: 14,
    question: "What is the maximum number of candidates an EVM can handle?",
    options: ["16", "32", "48", "64"],
    correctAnswer: 3,
    explanation: "The latest M3 EVMs can handle up to 64 candidates using 4 ballot units, each accommodating 16 candidates.",
    difficulty: 'hard',
    category: 'Technology'
  },
  {
    id: 15,
    question: "What does EPIC stand for?",
    options: ["Election Process Identification Card", "Electors Photo Identity Card", "Electronic Polling ID Card", "Election Participation Identity Certificate"],
    correctAnswer: 1,
    explanation: "EPIC stands for Electors Photo Identity Card — commonly known as the Voter ID card. It serves as the primary identity document for voting.",
    difficulty: 'medium',
    category: 'Registration'
  }
];

// ─── Glossary Terms ────────────────────────────
export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "EVM", definition: "Electronic Voting Machine — a portable electronic device used for casting and counting votes in Indian elections. Runs on battery and is not connected to any network.", category: "Technology" },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail — an independent system attached to the EVM that prints a paper slip showing the candidate voted for, visible to the voter for 7 seconds.", category: "Technology" },
  { term: "NOTA", definition: "None Of The Above — an option on the ballot that allows voters to officially reject all candidates. Introduced by Supreme Court in 2013.", category: "Voting Process" },
  { term: "EPIC", definition: "Electors Photo Identity Card — the official voter ID card issued by the Election Commission. Also known as Voter ID or EPIC card.", category: "Registration" },
  { term: "Constituency", definition: "A geographical area represented by an elected member. India has 543 Lok Sabha constituencies and ~4000 state assembly constituencies.", category: "Administration" },
  { term: "Booth Level Officer (BLO)", definition: "A local government official responsible for voter registration, list maintenance, and door-to-door verification in their assigned polling area.", category: "Administration" },
  { term: "Model Code of Conduct", definition: "A set of guidelines issued by the Election Commission for political parties and candidates to ensure free and fair elections. Comes into force from the announcement of election dates.", category: "Rules" },
  { term: "Returning Officer (RO)", definition: "An officer appointed by the Election Commission responsible for the conduct of elections in a constituency and declaration of results.", category: "Administration" },
  { term: "Electoral Roll", definition: "The official list of all registered voters in a constituency, prepared and revised by the Election Commission. Also called the voter list.", category: "Registration" },
  { term: "Form 6", definition: "The application form for new voter registration. Can be submitted online through NVSP portal or offline at the ERO office.", category: "Registration" },
  { term: "Indelible Ink", definition: "A semi-permanent ink applied to the left index finger of voters to prevent double voting. Contains silver nitrate and lasts 2–4 weeks.", category: "Voting Process" },
  { term: "FPTP", definition: "First Past The Post — the electoral system used in India where the candidate with the most votes in a constituency wins, regardless of vote share.", category: "Rules" },
  { term: "Election Commission of India (ECI)", definition: "An autonomous constitutional body responsible for administering election processes in India. Established on January 25, 1950.", category: "Administration" },
  { term: "Presiding Officer", definition: "The officer in charge of a polling station on election day. Ensures orderly and fair voting procedures.", category: "Administration" },
  { term: "Strong Room", definition: "A secured room where sealed EVMs are stored after polling and before counting. Under 24/7 CCTV surveillance and armed guard.", category: "Voting Process" },
  { term: "Postal Ballot", definition: "A ballot that allows certain voters (military, government officials on election duty, disabled, senior citizens 80+) to vote by mail.", category: "Voting Process" },
  { term: "NVSP", definition: "National Voter Service Portal — the online platform for voter registration, search, corrections, and other voter services at nvsp.in.", category: "Technology" },
  { term: "Polling Agent", definition: "A representative appointed by a candidate to observe the polling process at a booth and ensure fair voting.", category: "Administration" },
  { term: "Counting Agent", definition: "A representative of a candidate who observes the vote counting process to ensure transparency and accuracy.", category: "Administration" },
  { term: "RTI", definition: "Right to Information — a fundamental right that allows Indian citizens to request information from government bodies, promoting transparency.", category: "Governance" },
  { term: "Lok Sabha", definition: "The lower house of India's Parliament (House of the People). Has 543 elected members representing constituencies across India.", category: "Governance" },
  { term: "Rajya Sabha", definition: "The upper house of India's Parliament (Council of States). Members are elected by state legislators, not directly by citizens.", category: "Governance" },
  { term: "Manifesto", definition: "A public declaration of policies, promises, and plans published by a political party before elections to win voter support.", category: "Governance" },
  { term: "Exit Poll", definition: "An opinion poll conducted immediately after voters have cast their votes. Cannot be published until the last phase of voting ends.", category: "Voting Process" },
  { term: "Delimitation", definition: "The process of redrawing constituency boundaries based on census data to ensure roughly equal population representation.", category: "Administration" }
];

// ─── Quiz Badge System ─────────────────────────
export interface Badge {
  name: string;
  description: string;
  icon: string;
  minScore: number;
  color: string;
}

export const BADGES: Badge[] = [
  { name: "Democracy Beginner", description: "Starting your civic journey", icon: "🌱", minScore: 0, color: "#64748B" },
  { name: "Informed Citizen", description: "Growing civic awareness", icon: "📚", minScore: 30, color: "#3B82F6" },
  { name: "Democracy Advocate", description: "Strong understanding of elections", icon: "⭐", minScore: 50, color: "#8B5CF6" },
  { name: "Civic Champion", description: "Impressive election knowledge", icon: "🏆", minScore: 70, color: "#F59E0B" },
  { name: "Democracy Guardian", description: "Election expert and leader", icon: "🛡️", minScore: 90, color: "#10B981" },
];

export function getBadge(percentage: number): Badge {
  const sorted = [...BADGES].sort((a, b) => b.minScore - a.minScore);
  return sorted.find(b => percentage >= b.minScore) || BADGES[0];
}

// ─── AI Chat Suggested Prompts ─────────────────
export const SUGGESTED_PROMPTS = [
  "How do I register to vote in India?",
  "What happens if my name is missing from the voter list?",
  "How are votes counted after an election?",
  "What is the NOTA option and how does it work?",
  "What documents do I need to vote?",
  "How does an EVM machine work?",
  "What is the Model Code of Conduct?",
  "Can I vote without a Voter ID card?",
];

// ─── Election Countdown ────────────────────────
export const ELECTION_EVENTS = [
  {
    name: "Voter Registration Deadline",
    date: "2026-06-15T00:00:00",
    description: "Last date to register as a new voter",
    type: "deadline" as const,
  },
  {
    name: "Model Code of Conduct Begins",
    date: "2026-07-01T00:00:00",
    description: "Political parties must follow election guidelines",
    type: "event" as const,
  },
  {
    name: "Phase 1 — Polling Day",
    date: "2026-08-01T07:00:00",
    description: "First phase of general elections",
    type: "election" as const,
  },
  {
    name: "Phase 2 — Polling Day",
    date: "2026-08-08T07:00:00",
    description: "Second phase of general elections",
    type: "election" as const,
  },
  {
    name: "Counting Day",
    date: "2026-08-20T08:00:00",
    description: "Votes counted and results declared",
    type: "result" as const,
  },
];

// ─── Learning Modes ────────────────────────────
export const LEARNING_MODES = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: 'Simple, jargon-free explanations',
    icon: '🌱',
    color: '#10B981',
  },
  {
    id: 'student',
    label: 'Student',
    description: 'Academic preparation & exam focus',
    icon: '📖',
    color: '#3B82F6',
  },
  {
    id: 'expert',
    label: 'Expert',
    description: 'Detailed civic & legal analysis',
    icon: '🎓',
    color: '#8B5CF6',
  },
] as const;

export type LearningMode = typeof LEARNING_MODES[number]['id'];

// ─── Navigation Links ──────────────────────────
export const NAV_LINKS = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/journey', label: 'Election Journey', icon: 'map' },
  { href: '/chat', label: 'AI Assistant', icon: 'bot' },
  { href: '/quiz', label: 'Quiz', icon: 'brain' },
  { href: '/glossary', label: 'Glossary', icon: 'book-open' },
  { href: '/dashboard', label: 'Dashboard', icon: 'bar-chart-3' },
];

// ─── Simulation Steps ──────────────────────────
export const SIMULATION_SCENES = [
  {
    id: 'arrive',
    title: 'Arriving at Polling Station',
    description: 'Voters queue up at their designated polling station',
    duration: 3000,
    emoji: '🏛️',
  },
  {
    id: 'verify',
    title: 'Identity Verification',
    description: 'Polling officer checks your voter ID and electoral roll',
    duration: 3000,
    emoji: '🪪',
  },
  {
    id: 'ink',
    title: 'Ink Application',
    description: 'Indelible ink is applied to your left index finger',
    duration: 2000,
    emoji: '✋',
  },
  {
    id: 'booth',
    title: 'Entering Voting Compartment',
    description: 'You enter the private voting compartment alone',
    duration: 2000,
    emoji: '🚶',
  },
  {
    id: 'vote',
    title: 'Casting Your Vote',
    description: 'Press the button next to your chosen candidate on the EVM',
    duration: 3000,
    emoji: '🗳️',
  },
  {
    id: 'vvpat',
    title: 'VVPAT Verification',
    description: 'Paper slip shows your vote for 7 seconds — verify it!',
    duration: 3000,
    emoji: '📄',
  },
  {
    id: 'counting',
    title: 'Vote Counting',
    description: 'EVMs opened on counting day, votes tallied round by round',
    duration: 4000,
    emoji: '📊',
  },
  {
    id: 'result',
    title: 'Result Declaration',
    description: 'Winner declared! Democracy completes its journey.',
    duration: 3000,
    emoji: '🎉',
  },
];
