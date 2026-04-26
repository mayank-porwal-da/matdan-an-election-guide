export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Stage {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  emoji: string;
  accent: string;
  hook: string;
  overview: string;
  keyFacts: string[];
  whyItMatters: string;
  quickPrompts: string[];
  quiz: QuizQuestion[];
  systemPrompt: string;
}

export const TOTAL_STAGES = 7;

export const stages: Stage[] = [
  {
    id: 1,
    code: "ECI",
    title: "The Guardians",
    subtitle: "Election Commission of India (ECI)",
    emoji: "🏛️",
    accent: "#4cc9f0",
    hook: "The architects of the world's largest democratic exercise.",
    overview: "The Election Commission of India is a permanent constitutional body established by Article 324. It operates independently of the government to ensure free and fair elections for the Lok Sabha and State Legislative Assemblies.",
    keyFacts: [
      "Established directly by the Constitution of India in 1950.",
      "Led by the Chief Election Commissioner (CEC) and two commissioners.",
      "Enforces the Model Code of Conduct (MCC) for all parties.",
      "Manages over 1 million polling stations across the country.",
      "Decides the election schedule, symbols, and constituency boundaries."
    ],
    whyItMatters: "Institutional independence ensures that no political party can manipulate the voting process, preserving the sanctity of your voice in the government.",
    quickPrompts: [
      "What is the role of the CEC?",
      "Is the ECI part of the government?",
      "What happens if someone breaks the Code of Conduct?"
    ],
    quiz: [
      {
        q: "Which Article of the Constitution gives ECI its powers?",
        options: ["Article 370", "Article 324", "Article 15", "Article 21"],
        answer: 1,
        explanation: "Article 324 provides the ECI with the power of superintendence, direction, and control of elections."
      },
      {
        q: "Who is the administrative head of the Election Commission?",
        options: ["Prime Minister", "President", "Chief Election Commissioner", "Home Minister"],
        answer: 2,
        explanation: "The Chief Election Commissioner (CEC) leads the ECI along with two other Election Commissioners."
      },
      {
        q: "What is the 'Model Code of Conduct'?",
        options: ["A law passed by Parliament", "Guidelines for candidate behavior", "The voting law book", "A set of tech rules"],
        answer: 1,
        explanation: "The MCC is a set of guidelines issued by ECI for the conduct of political parties and candidates during elections."
      }
    ],
    systemPrompt: "You are Mitra, an AI guide for Stage 1: The ECI. Your goal is to explain the powers and independence of the Election Commission of India. Keep your language simple and avoid complex legal jargon. If a user asks about registration, campaigning, or results, politely tell them that those topics are covered in the upcoming stages of this guide. Focus strictly on the ECI's constitutional role and the Model Code of Conduct."
  },
  {
    id: 2,
    code: "REGISTER",
    title: "Your Identity",
    subtitle: "Voter Registration & EPIC",
    emoji: "💳",
    accent: "#ffd166",
    hook: "The gateway to democracy begins with your name on the roll.",
    overview: "Registration is the first step to becoming a voter. Every eligible citizen must be included in the 'Electoral Roll'—a list maintained by the ECI for every constituency.",
    keyFacts: [
      "You must be 18 years old to register as a voter.",
      "Form 6 is the application for new voter registration.",
      "EPIC is the Voter ID card (Electors Photo Identity Card).",
      "Registration is done via the Voters' Service Portal or App.",
      "The BLO (Booth Level Officer) verifies your physical address."
    ],
    whyItMatters: "Without your name on the roll, you cannot vote, even if you have a Voter ID card. It is the definitive proof of your right to participate.",
    quickPrompts: [
      "How do I apply for Form 6?",
      "What is the qualifying date for age?",
      "Can I get a digital Voter ID?"
    ],
    quiz: [
      {
        q: "What is the primary form for new voter registration?",
        options: ["Form 4", "Form 7", "Form 6", "Form 8"],
        answer: 2,
        explanation: "Form 6 is specifically for the inclusion of a name in the electoral roll for the first time."
      },
      {
        q: "Who conducts the field verification of your address?",
        options: ["The Police", "Booth Level Officer (BLO)", "The Mayor", "District Magistrate"],
        answer: 1,
        explanation: "The BLO is a local government/semi-government official who performs field verification for the ECI."
      },
      {
        q: "What does EPIC stand for?",
        options: ["Election Power Card", "Electronic People Identity", "Electors Photo Identity Card", "Every Person Is Counting"],
        answer: 2,
        explanation: "EPIC is the official term for your Voter ID card."
      }
    ],
    systemPrompt: "You are Mitra, focusing on Stage 2: Voter Registration. Explain Form 6, EPIC, and the role of the BLO. If users ask about EVMs or election results, guide them to move to the later stages. Ensure they understand that matching the name on the Electoral Roll is more important than just having the ID card. Use plain English."
  },
  {
    id: 3,
    code: "SCHEDULE",
    title: "The Battlelines",
    subtitle: "Election Schedule & Phases",
    emoji: "📅",
    accent: "#06d6a0",
    hook: "Why India votes in phases over several weeks.",
    overview: "Elections in India are massive logistical challenges. The ECI announces the schedule, dividing the country into phases to manage security and administration effectively.",
    keyFacts: [
      "General elections are usually held in multiple phases.",
      "Phases allow security forces to move across regions safely.",
      "MCC kicks in the moment the schedule is announced.",
      "2024 elections had 7 phases from April to June.",
      "Results for all phases are declared on a single day."
    ],
    whyItMatters: "The Model Code of Conduct (MCC) prevents the ruling government from announcing new schemes or using official machinery to influence voters during this period.",
    quickPrompts: [
      "Why can't we vote on one day?",
      "What is the 'Silent Period'?",
      "When does the MCC start?"
    ],
    quiz: [
      {
        q: "When does the Model Code of Conduct (MCC) activate?",
        options: ["On polling day", "When results are out", "When ECI announces the schedule", "When PM resigns"],
        answer: 2,
        explanation: "The MCC comes into force immediately after the ECI announces the election dates."
      },
      {
        q: "How many phases did the 2024 General Election have?",
        options: ["1 phase", "3 phases", "7 phases", "10 phases"],
        answer: 2,
        explanation: "The 2024 Lok Sabha elections were conducted in 7 phases to manage the vast geography and voter base."
      },
      {
        q: "Who decides the election dates in India?",
        options: ["The President", "The Supreme Court", "The Prime Minister", "Election Commission of India"],
        answer: 3,
        explanation: "The ECI has the sole constitutional authority to announce and manage the election schedule."
      }
    ],
    systemPrompt: "You are Mitra, expert on Stage 3: Schedules and Phases. Explain why multi-phase voting is necessary for India's scale. Focus on the MCC and how it levels the playing field. If asked about how to vote or who won, redirect to Stage 5 or 6."
  },
  {
    id: 4,
    code: "CAMPAIGN",
    title: "The Pitch",
    subtitle: "Nominations & Campaigning",
    emoji: "📢",
    accent: "#e63946",
    hook: "From security deposits to the 48-hour silence.",
    overview: "Candidates must file nominations and undergo scrutiny. Once approved, they get a limited time to campaign, reaching out to voters with their vision and promises.",
    keyFacts: [
      "Candidates must pay a ₹25,000 security deposit (General).",
      "Candidate spending is limited (e.g., ₹95 Lakh for big states).",
      "Political ads must be pre-certified by the ECI.",
      "Campaigning must stop 48 hours before the poll ends.",
      "Candidates are allotted unique symbols to help identify them."
    ],
    whyItMatters: "Spending limits ensure that wealthy candidates don't have an unfair advantage over others, keeping the competition balanced.",
    quickPrompts: [
      "What is the security deposit?",
      "Why is there a silence period?",
      "How much can a candidate spend?"
    ],
    quiz: [
      {
        q: "What is the security deposit for a General candidate in Lok Sabha?",
        options: ["₹10,000", "₹25,000", "₹1,00,000", "₹50,000"],
        answer: 1,
        explanation: "Candidates in the General category must deposit ₹25,000, while SC/ST candidates pay ₹12,500."
      },
      {
        q: "When must all campaigning stop before voting?",
        options: ["12 hours before", "24 hours before", "48 hours before", "1 week before"],
        answer: 2,
        explanation: "Public campaigning must cease 48 hours before the conclusion of the poll to allow voters a silent period."
      },
      {
        q: "What is the main purpose of election symbols?",
        options: ["Decoration", "To help illiterate voters identify parties", "Just for stickers", "Secret codes"],
        answer: 1,
        explanation: "Symbols are crucial in India, allowing voters who cannot read to easily identify their preferred party or candidate."
      }
    ],
    systemPrompt: "You are Mitra for Stage 4: Campaigning. Explain the nomination process, spending limits, and the importance of the silent period. Use ₹ symbols for currency. Redirect questions about actual voting mechanics to Stage 5."
  },
  {
    id: 5,
    code: "VOTING",
    title: "The Moment",
    subtitle: "EVMs, VVPATs & Polling Day",
    emoji: "🗳️",
    accent: "#4cc9f0",
    hook: "Your 7 seconds with the VVPAT slip.",
    overview: "Polling day is the culmination of the process. Voters go to designated booths to cast their vote using Electronic Voting Machines (EVMs) and Verify them via VVPAT.",
    keyFacts: [
      "EVMs consist of a Ballot Unit and a Control Unit.",
      "VVPAT prints a slip for 7 seconds to verify your vote.",
      "Indelible ink is applied to your finger to prevent double voting.",
      "12 types of IDs are accepted if you don't have a Voter ID.",
      "Home voting is available for 85+ seniors and disabled voters."
    ],
    whyItMatters: "The secret ballot ensures you can vote for whoever you want without fear or pressure. The VVPAT adds a layer of physical proof to the digital vote.",
    quickPrompts: [
      "What if I don't have my Voter ID card?",
      "How does the EVM stay secure?",
      "What is VVPAT?"
    ],
    quiz: [
      {
        q: "How long does the VVPAT slip show your selection?",
        options: ["3 seconds", "7 seconds", "15 seconds", "Until you leave"],
        answer: 1,
        explanation: "The VVPAT slip is visible through a glass window for 7 seconds before falling into a sealed box."
      },
      {
        q: "Which of these is NOT required to vote if you are on the roll?",
        options: ["Aadhaar Card", "Voter ID Card", "Ration Card", "Driving License"],
        answer: 2,
        explanation: "While the others are valid photo IDs, the Ration Card is generally not accepted as a standalone photo ID for voting."
      },
      {
        q: "What is used to mark a voter's finger after they vote?",
        options: ["Regular ink", "Indelible ink", "A sticker", "A digital stamp"],
        answer: 1,
        explanation: "Indelible ink (silver nitrate) stays on the skin for weeks and is used to prevent multiple voting."
      }
    ],
    systemPrompt: "You are Mitra, helping users through the 'anxiety' of Stage 5: Voting. Use very reassuring, friendly language. Explain the EVM-VVPAT process step-by-step. Reassure them that their vote is secret and secure. If they ask about results, guide them to Stage 6."
  },
  {
    id: 6,
    code: "COUNT",
    title: "The Verdict",
    subtitle: "Counting & FPTP System",
    emoji: "📈",
    accent: "#06d6a0",
    hook: "Most votes wins—the First Past The Post system.",
    overview: "After polling, EVMs are kept in 'Strong Rooms' under 24/7 guard. On counting day, votes are tallied, and the candidate with the most votes in each constituency is declared the winner.",
    keyFacts: [
      "India uses the First Past The Post (FPTP) system.",
      "Winners don't need 51%—just more votes than anyone else.",
      "Political agents monitor every single counting table.",
      "The RO (Returning Officer) declares the official winner.",
      "The magic number for a Lok Sabha majority is 272."
    ],
    whyItMatters: "The counting process is transparent and observable by all competing parties, ensuring that the results reflect the actual votes cast.",
    quickPrompts: [
      "What is First Past The Post?",
      "How are EVMs guarded?",
      "What is a 'Strong Room'?"
    ],
    quiz: [
      {
        q: "What is the 'Magic Number' for a majority in Lok Sabha?",
        options: ["250", "300", "272", "543"],
        answer: 2,
        explanation: "With 543 seats, the house majority requires more than 50%, which is 272 seats."
      },
      {
        q: "What does 'First Past The Post' mean?",
        options: ["Candidate with the most votes wins", "Must get 50% of the votes", "Oldest candidate wins"],
        answer: 0,
        explanation: "In FPTP, the candidate with the highest number of votes is declared elected, regardless of the percentage."
      },
      {
        q: "Who is responsible for declaring the winner of a seat?",
        options: ["The Prime Minister", "Returning Officer (RO)", "The News Media", "Police Chief"],
        answer: 1,
        explanation: "The Returning Officer is the ECI official in charge of the election and counting for a specific constituency."
      }
    ],
    systemPrompt: "You are Mitra for Stage 6: Counting. Your goal is to explain how votes are counted and what 'First Past The Post' means. Explain that FPTP is simple: most votes wins. If asked about the new government, move them to Stage 7."
  },
  {
    id: 7,
    code: "GOVT",
    title: "The Mandate",
    subtitle: "Government Formation",
    emoji: "🇮🇳",
    accent: "#e63946",
    hook: "The President invites, the Prime Minister leads.",
    overview: "Once results are in, the President invites the leader of the largest party or coalition to form the government. The Prime Minister and Council of Ministers take an oath of office.",
    keyFacts: [
      "The President of India appoints the Prime Minister.",
      "Coalitions happen if no single party reaches 272 seats.",
      "The PM must command the confidence of the Lok Sabha.",
      "Opposition parties form a 'Shadow' or constructive check.",
      "2024 saw the formation of a NDA coalition government."
    ],
    whyItMatters: "This is the final transition of power from the people's mandate to executive action. It completes the democratic circle every 5 years.",
    quickPrompts: [
      "How is the PM chosen?",
      "What is a coalition?",
      "What does the President do here?"
    ],
    quiz: [
      {
        q: "Who invites the leader of the majority party to form the government?",
        options: ["The outgoing PM", "Chief Justice", "President of India", "CEC"],
        answer: 2,
        explanation: "The President, as the head of state, invites the party with the majority to form the government."
      },
      {
        q: "What is a 'Coalition Government'?",
        options: ["Multiple parties joining for a majority", "Government by one party", "Military rule", "Government by ECI"],
        answer: 0,
        explanation: "A coalition occurs when two or more parties join forces to reach the required number of seats (272)."
      },
      {
        q: "What official certificate signifies that a candidate has won?",
        options: ["A crown", "Form 21C from the RO", "A gold medal", "A new car"],
        answer: 1,
        explanation: "The Return of Election (Form 21C) is the official certificate provided by the RO to the winner."
      }
    ],
    systemPrompt: "You are Mitra for Stage 7: Government Formation. Explain the final step of the election process. Since this is the final stage, you can reference any previous stage if the user wants a full summary. Congratulate the user on completing the Matdan Journey and encourage them to be active citizens!"
  }
];
