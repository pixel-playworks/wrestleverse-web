// Ranked-choice results from the WrestleVerse Player Surveys.
// `counts` are the number of players who ranked the option as their
// top, 2nd, 3rd and 4th choice, in that order.
export interface SurveyOption {
  label: string;
  counts: [number, number, number, number];
}

export interface RankedSurvey {
  question: string;
  survey: string;
  options: SurveyOption[];
}

export const december2025Roadmap: RankedSurvey = {
  question: "Rank these roadmap items by importance to you",
  survey: "December 2025 Player Survey",
  options: [
    { label: "Visual Engine", counts: [1, 3, 10, 10] },
    { label: "Sandbox", counts: [8, 10, 6, 7] },
    { label: "Spots v4", counts: [16, 9, 6, 2] },
    { label: "Multiplayer", counts: [3, 3, 3, 6] },
    { label: "Custom Events", counts: [6, 9, 9, 9] },
  ],
};

export const june2026SandboxMechanics: RankedSurvey = {
  question: "Which mechanics would you like to be able to turn off using Sandbox Tools?",
  survey: "June 2026 Player Survey",
  options: [
    { label: "Retirement", counts: [8, 2, 3, 2] },
    { label: "Contracts", counts: [6, 7, 1, 3] },
    { label: "Morale", counts: [1, 2, 10, 3] },
    { label: "Injuries", counts: [2, 6, 3, 7] },
    { label: "Ratings", counts: [2, 2, 2, 4] },
  ],
};

export const june2026Roadmap: RankedSurvey = {
  question: "Rank these roadmap items by importance to you",
  survey: "June 2026 Player Survey",
  options: [
    { label: "Social Feed", counts: [9, 1, 3, 4] },
    { label: "Fatigue", counts: [2, 4, 4, 5] },
    { label: "#1 Contender", counts: [6, 7, 4, 2] },
    { label: "Roster Tags", counts: [2, 4, 4, 1] },
    { label: "Training", counts: [0, 3, 4, 7] },
  ],
};
