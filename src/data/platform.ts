export type CourseCategory = "Python" | "Statistics" | "Machine Learning" | "Deep Learning" | "Data Analytics" | "SQL" | "Power BI";

export type LearningPath = {
  id: string;
  title: string;
  category: CourseCategory;
  lessons: number;
  duration: string;
  progress: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  accent: string;
};

export type LearningStat = {
  label: string;
  value: string;
  detail: string;
  change: string;
};

export type Project = {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  description: string;
  duration: string;
  tools: string[];
  metrics: { label: string; value: string }[];
};

export type Dataset = {
  title: string;
  category: string;
  rows: string;
  updated: string;
  size: string;
  tags: string[];
  quality: "Excellent" | "High" | "Good";
};

export type InterviewItem = {
  id: string;
  type: "MCQ" | "Coding" | "ML" | "Mock";
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
};

export type ResumeInsight = {
  title: string;
  score: number;
  detail: string;
  priority: "High" | "Medium" | "Low";
};

export const learningStats: LearningStat[] = [
  { label: "Learning streak", value: "18 days", detail: "Strong momentum", change: "+3 days" },
  { label: "Courses completed", value: "24", detail: "Across 7 tracks", change: "+4 this month" },
  { label: "Skill score", value: "86%", detail: "AI ready", change: "+6 pts" },
  { label: "Projects shipped", value: "9", detail: "3 published", change: "+2" },
];

export const learningPaths: LearningPath[] = [
  { id: "python", title: "Python for Data Science", category: "Python", lessons: 28, duration: "4 weeks", progress: 82, level: "Beginner", accent: "from-cyan-500 to-blue-500" },
  { id: "statistics", title: "Statistics Foundations", category: "Statistics", lessons: 19, duration: "3 weeks", progress: 71, level: "Intermediate", accent: "from-violet-500 to-purple-500" },
  { id: "ml", title: "Machine Learning Essentials", category: "Machine Learning", lessons: 32, duration: "6 weeks", progress: 64, level: "Intermediate", accent: "from-indigo-500 to-violet-500" },
  { id: "dl", title: "Deep Learning Lab", category: "Deep Learning", lessons: 24, duration: "5 weeks", progress: 38, level: "Advanced", accent: "from-fuchsia-500 to-pink-500" },
  { id: "analytics", title: "Data Analytics Practice", category: "Data Analytics", lessons: 16, duration: "2 weeks", progress: 92, level: "Beginner", accent: "from-teal-500 to-cyan-500" },
  { id: "sql", title: "SQL for Analysis", category: "SQL", lessons: 20, duration: "3 weeks", progress: 58, level: "Intermediate", accent: "from-emerald-500 to-green-500" },
  { id: "powerbi", title: "Power BI Storytelling", category: "Power BI", lessons: 14, duration: "2 weeks", progress: 80, level: "Beginner", accent: "from-yellow-500 to-orange-500" },
];

export const projects: Project[] = [
  { title: "Customer Churn Predictor", level: "Beginner", category: "Machine Learning", description: "Build a classification model and explain the most important drivers of churn.", duration: "7 days", tools: ["Python", "Scikit-learn", "Pandas"], metrics: [{ label: "Accuracy", value: "91.4%" }, { label: "AUC", value: "0.94" }] },
  { title: "Retail Sales Dashboard", level: "Intermediate", category: "Data Analytics", description: "Create an executive dashboard with KPI trends, segmentation, and forecast insights.", duration: "10 days", tools: ["SQL", "Power BI", "Excel"], metrics: [{ label: "KPI coverage", value: "94%" }, { label: "Insights", value: "28" }] },
  { title: "Vision QA Assistant", level: "Advanced", category: "Deep Learning", description: "Deploy a computer vision workflow to detect defects and generate review summaries.", duration: "3 weeks", tools: ["PyTorch", "OpenCV", "FastAPI"], metrics: [{ label: "mAP", value: "0.89" }, { label: "Latency", value: "210ms" }] },
];

export const datasets: Dataset[] = [
  { title: "Global Sales Trends", category: "E-commerce", rows: "245K", updated: "2 days ago", size: "18 MB", tags: ["Sales", "Forecasting", "CSV"], quality: "Excellent" },
  { title: "Healthcare Patient Outcomes", category: "Healthcare", rows: "96K", updated: "1 week ago", size: "24 MB", tags: ["Clinical", "Analytics", "SQL"], quality: "High" },
  { title: "Movie Recommendation Data", category: "Recommender Systems", rows: "1.2M", updated: "3 days ago", size: "67 MB", tags: ["Recommendation", "ML", "JSON"], quality: "Excellent" },
  { title: "Financial Risk Signals", category: "Finance", rows: "520K", updated: "5 days ago", size: "39 MB", tags: ["Risk", "Classification", "Parquet"], quality: "Good" },
];

export const interviewQuestions: InterviewItem[] = [
  { id: "q1", type: "MCQ", question: "Which metric is preferred for imbalanced classification problems?", difficulty: "Medium", duration: "2 min" },
  { id: "q2", type: "Coding", question: "Implement a function to find the top-k elements in a streaming data set.", difficulty: "Hard", duration: "15 min" },
  { id: "q3", type: "ML", question: "Explain variance bias trade-off and how regularization affects model complexity.", difficulty: "Medium", duration: "8 min" },
  { id: "q4", type: "Mock", question: "Walk through a complete end-to-end data science project review.", difficulty: "Hard", duration: "20 min" },
];

export const resumeInsights: ResumeInsight[] = [
  { title: "ATS compatibility", score: 92, detail: "Strong keyword coverage and clean document structure.", priority: "High" },
  { title: "Skills impact", score: 84, detail: "Add measurable results for machine learning initiatives.", priority: "Medium" },
  { title: "Project evidence", score: 76, detail: "Include architecture diagrams and deployment outcomes.", priority: "Medium" },
  { title: "Leadership signals", score: 68, detail: "Add collaboration and stakeholder communication evidence.", priority: "Low" },
];

export const aiMessages = [
  { role: "assistant", text: "Welcome back, Aria. Ask me about a dataset, ML concept, code bug, or project roadmap." },
  { role: "user", text: "Help me build a customer churn prediction model with explainability." },
  { role: "assistant", text: "I can help with that. Start by profiling churn drivers, then compare Logistic Regression, XGBoost, and SHAP feature importance." },
];
