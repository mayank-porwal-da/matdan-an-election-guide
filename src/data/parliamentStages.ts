import { Stage } from "../types";

export const TOTAL_PARLIAMENT_STAGES = 4;

export const parliamentStages: Stage[] = [
  {
    id: 1,
    code: "LOKSABHA",
    title: "Lok Sabha",
    subtitle: "The directly elected house of Parliament",
    emoji: "🏛️",
    accent: "#e63946",
    hook: "543 people. One chamber. They decide who governs India.",
    overview: "The Lok Sabha is the lower house of India's Parliament. Its 543 members — called Members of Parliament (MPs) — are directly elected by voters, one from each constituency, using First Past The Post. Whoever commands a majority here forms the government.",
    keyFacts: [
      "543 elected MPs + up to 2 nominated members (Anglo-Indian — now discontinued post 2020)",
      "MPs serve a 5-year term unless the house is dissolved earlier",
      "Lok Sabha can be dissolved by the President on PM's advice — triggering early elections",
      "Money Bills (Budget) can ONLY originate in Lok Sabha — Rajya Sabha cannot amend them",
      "A no-confidence motion passed here can bring down the government"
    ],
    whyItMatters: "Lok Sabha is where real power sits. The PM must command its confidence at all times. Lose a no-confidence vote here, and the government falls — regardless of Rajya Sabha support. This is why winning 272+ seats is everything.",
    quickPrompts: [
      "What is First Past The Post?",
      "How are money bills different?",
      "What is a no-confidence motion?"
    ],
    quiz: [
      {
        q: "How many members are directly elected to the Lok Sabha?",
        options: ["500", "543", "250", "550"],
        answer: 1,
        explanation: "There are 543 constituencies in India, each electing one Member of Parliament directly."
      },
      {
        q: "Which type of Bill can ONLY originate in the Lok Sabha?",
        options: ["Constitutional Amendment Bill", "Private Member Bill", "Money Bill", "Ordinary Bill"],
        answer: 2,
        explanation: "Money Bills, including the Budget, can only be introduced in the Lok Sabha."
      },
      {
        q: "What is the consequence of a no-confidence motion passing in the Lok Sabha?",
        options: ["Fresh elections in 1 week", "The government must resign", "The PM's salary is cut", "The house is suspended for a day"],
        answer: 1,
        explanation: "If a government loses a no-confidence motion, it indicates they no longer have the majority support, and they must resign."
      }
    ],
    systemPrompt: "You are an expert on the Lok Sabha — India's lower house of Parliament. Answer only questions about: Lok Sabha composition (543 seats), how MPs are elected (FPTP), the 5-year term, dissolution, Money Bills, no-confidence motions, and why Lok Sabha majority matters. Use plain English."
  },
  {
    id: 2,
    code: "MPROLE",
    title: "Role of an MP",
    subtitle: "What your elected representative actually does",
    emoji: "👤",
    accent: "#4cc9f0",
    hook: "You elected them. Here's what they're supposed to do with that.",
    overview: "A Member of Parliament (MP) has three core roles: legislating (voting on laws), representing their constituency's interests in Parliament, and holding the government accountable through questions, debates, and committees.",
    keyFacts: [
      "MPs participate in debates and vote on Bills before they become law",
      "Question Hour (first hour of each session): MPs question ministers directly",
      "MPs get ₹55,000/month salary + ₹45,000 constituency allowance + office/travel expenses",
      "MPLADS: Each MP gets ₹5 crore/year to spend on development works in their constituency",
      "MPs who miss 60+ consecutive days of sessions without permission can lose their seat"
    ],
    whyItMatters: "Your MP controls ₹5 crore/year of public money for your area (MPLADS). They also raise issues in Parliament through questions and private member bills. An active MP can force a minister to answer for a local hospital, road, or scam — publicly, on record.",
    quickPrompts: [
      "What is MPLADS?",
      "How much do MPs earn?",
      "What happens in Question Hour?"
    ],
    quiz: [
      {
        q: "What is the annual MPLADS fund amount given to an MP?",
        options: ["₹1 Crore", "₹5 Crore", "₹10 Crore", "₹50 Lakh"],
        answer: 1,
        explanation: "Each MP is entitled to ₹5 crore per year for development works in their constituency under MPLADS."
      },
      {
        q: "What is the 'Question Hour' in Parliament?",
        options: ["A break for lunch", "First hour dedicated to questioning ministers", "A quiz for MPs", "The last hour of the day"],
        answer: 1,
        explanation: "The first hour of every parliamentary sitting is Question Hour, where MPs can ask questions about government functioning."
      },
      {
        q: "After how many days of consecutive unauthorized absence can an MP lose their seat?",
        options: ["30 days", "60 days", "90 days", "100 days"],
        answer: 1,
        explanation: "Under Article 101 of the Constitution, if an MP is absent for 60 days without permission, their seat can be declared vacant."
      }
    ],
    systemPrompt: "You are an expert on the role of Indian MPs. Answer only questions about: what MPs do in Parliament (legislation, Question Hour, debates), MPLADS funds (₹5 crore/year), MP salary and allowances, parliamentary committees, attendance rules, and how voters can engage with their MP."
  },
  {
    id: 3,
    code: "RAJYASABHA",
    title: "Rajya Sabha",
    subtitle: "The upper house — elected by states, not voters",
    emoji: "⚖️",
    accent: "#b5179e",
    hook: "You've never voted for a Rajya Sabha MP. Here's who did.",
    overview: "The Rajya Sabha is the upper house of Parliament. Its 245 members are NOT directly elected by voters. Instead, they are elected by the elected MLAs of each state assembly — making it a house of states, not a house of the people. It is a permanent house — it never dissolves.",
    keyFacts: [
      "245 total members: 233 elected by state assemblies + 12 nominated by the President",
      "Each state's seats are proportional to its population (UP has 31, small states have 1)",
      "Members serve 6-year terms; one-third retire every 2 years (staggered rotation)",
      "Rajya Sabha CANNOT be dissolved — it is a permanent body",
      "Elected by Single Transferable Vote (STV) among MLAs of that state — not public voters",
      "President nominates 12 members from fields of literature, science, art, and social service"
    ],
    whyItMatters: "A party can win a Lok Sabha majority but still face a hostile Rajya Sabha — because Rajya Sabha members were elected by older state assemblies. This is why reformist governments often struggle to pass laws: they need both houses to agree (except Money Bills).",
    quickPrompts: [
      "Who nominates 12 members?",
      "Why is it a permanent house?",
      "How are seats distributed?"
    ],
    quiz: [
      {
        q: "How many members of Rajya Sabha are nominated by the President?",
        options: ["2", "10", "12", "15"],
        answer: 2,
        explanation: "12 members are nominated by the President for their contributions to art, literature, science, or social service."
      },
      {
        q: "What is the term length for a Rajya Sabha member?",
        options: ["5 years", "6 years", "4 years", "Life term"],
        answer: 1,
        explanation: "Rajya Sabha members are elected for a term of 6 years."
      },
      {
        q: "How often do one-third of Rajya Sabha members retire?",
        options: ["Every year", "Every 2 years", "Every 5 years", "Never"],
        answer: 1,
        explanation: "Rajya Sabha is a permanent body where one-third of members retire every two years."
      }
    ],
    systemPrompt: "You are an expert on the Rajya Sabha — India's upper house. Answer only questions about: how Rajya Sabha members are elected (by MLAs using STV), the 245-seat composition, 6-year terms and staggered retirement, the 12 nominated members, why Rajya Sabha can't be dissolved, and how it differs from Lok Sabha in powers."
  },
  {
    id: 4,
    code: "MPVSMLA",
    title: "MP vs MLA",
    subtitle: "Parliament vs state assembly — who does what",
    emoji: "🔀",
    accent: "#06d6a0",
    hook: "Same election season. Very different jobs.",
    overview: "India has two tiers of elected representatives: MPs (Members of Parliament) at the national level, and MLAs (Members of the Legislative Assembly) at the state level. They are elected separately, answer to different governments, and control different subjects.",
    keyFacts: [
      "MPs make laws on Union List subjects: defence, foreign affairs, railways, income tax",
      "MLAs make laws on State List subjects: police, public health, agriculture, land",
      "Concurrent List subjects (education, forests, marriage law) — both can legislate",
      "An MLA votes to elect Rajya Sabha members — indirect link between the two tiers",
      "You can vote for both in the same election season — they are separate ballots"
    ],
    whyItMatters: "When your local road is broken, that's your MLA's job — state subject. When your passport is delayed, that's central government — your MP's domain. Knowing who to approach saves time and holds the right person accountable.",
    quickPrompts: [
      "What is the State List?",
      "Who handles education?",
      "Can I talk to my MP about a local road?"
    ],
    quiz: [
      {
        q: "Which of these is a subject on the Union List (managed by MPs)?",
        options: ["Police", "Agriculture", "Defence", "Public Health"],
        answer: 2,
        explanation: "Defence is a Union List subject, managed by the Central Government and Parliament."
      },
      {
        q: "Who handles 'Police' and 'Public Health' in India?",
        options: ["MPs", "MLAs", "The President", "The Army"],
        answer: 1,
        explanation: "Police and Public Health are State List subjects, managed by MLAs and state governments."
      },
      {
        q: "Where do subjects like 'Education' and 'Forests' fall?",
        options: ["Union List", "State List", "Concurrent List", "No List"],
        answer: 2,
        explanation: "Education and Forests are in the Concurrent List, where both Parliament and State Assemblies can make laws."
      }
    ],
    systemPrompt: "You are an expert on the difference between Indian MPs and MLAs. Answer only questions about: Union List vs State List vs Concurrent List subjects, what MPs handle vs what MLAs handle, how MLAs elect Rajya Sabha members, and practical examples of which representative to contact for which problem."
  }
];
