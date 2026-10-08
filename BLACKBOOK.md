# DataNova AI — Project Black Book

## 1. Executive Summary

**DataNova AI** is an AI-powered data science learning and career-development platform designed to help students, beginners, and working professionals build practical data science skills.

The platform combines structured learning paths, AI-guided mentoring, project-based practice, dataset exploration, interview preparation, resume analysis, and interactive data visualization in one unified experience.

### Product Vision

> Make data science education practical, personalized, and career-focused through AI-assisted guidance.

### Target Users

- Data science beginners
- Undergraduate and postgraduate students
- Career switchers
- Working professionals upskilling in analytics and AI
- Portfolio-focused learners

### Core Value Proposition

1. Structured, role-oriented learning journeys
2. Personalized AI support for concepts, coding, and project decisions
3. Realistic project experiences with measurable outcomes
4. Portfolio-ready datasets and visualization tools
5. Interview and resume preparation in one platform

---

## 2. Current Product Status

### Implemented Frontend

The current application is a responsive, production-oriented Next.js interface with:

- Modern blue and purple gradient design
- Glassmorphism cards and layered visual effects
- Responsive dashboard and sidebar navigation
- Light and dark themes
- Interactive Recharts-based visualizations
- Course and project cards with progress indicators
- AI assistant mock interface
- Dataset library
- Interview preparation area
- Resume analyzer interface
- Mobile-friendly layout

### Current Implementation Status

| Area | Status | Notes |
|---|---|---|
| Authentication | Not connected | Firebase Auth integration is planned |
| Database | Not connected | MongoDB integration is planned |
| AI assistant | Frontend mock | OpenAI API integration is required |
| Dataset downloads | UI mock | Storage and API integration required |
| Resume analysis | Frontend mock | ATS engine and document processing required |
| Firebase integration | Not implemented | Required for authentication and user data |
| MongoDB integration | Not implemented | Required for course, project, and user persistence |
| GitHub integration | UI mock | Requires OAuth and repository APIs |
| Production deployment | Not deployed | Vercel deployment is recommended |

---

## 3. Technology Stack

### Frontend

- React 19
- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- Recharts

### Backend and Data

- Firebase Authentication — user authentication and identity
- MongoDB — application data and user progress
- OpenAI API — AI assistant, code generation, and learning guidance
- GitHub API — project integrations and repository access

### Deployment and Quality

- Vercel — frontend deployment and preview environments
- ESLint — static code analysis
- TypeScript — type safety
- npm — dependency and script management

---

## 4. Architecture

### High-Level Architecture

```text
Browser / Mobile App
        |
        v
Next.js Frontend
        |
        +-------------------------------+
        |                               |
        v                               v
Firebase Auth                 MongoDB
        |                               |
        +-------------------------------+
                        |
                        v
                OpenAI API
                        |
                        v
            AI Assistant Services
```

### Frontend Architecture

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
│       ├── glass-card.tsx
│       ├── page-shell.tsx
│       ├── score-ring.tsx
│       └── section-heading.tsx
├── data/
│   └── platform.ts
└── lib/
    └── future integrations
```

### Recommended Backend Modules

```text
lib/
├── auth/
│   └── firebase.ts
├── db/
│   ├── mongo.ts
│   └── models/
│       ├── User.ts
│       ├── Course.ts
│       ├── Progress.ts
│       └── Project.ts
├── ai/
│   ├── openai.ts
│   ├── prompts.ts
│   └── chat.ts
├── datasets/
│   └── service.ts
├── resume/
│   └── analyzer.ts
└── github/
    └── client.ts
```

---

## 5. Feature Specifications

### 5.1 User Authentication

**Required flow:**

1. User chooses sign up or login.
2. Firebase validates the email and password.
3. Firebase returns a user identity.
4. MongoDB creates or updates the associated profile.
5. The application loads personalized learning data.

**Planned providers:**

- Email and password
- Google OAuth
- GitHub OAuth

**User profile fields:**

- Display name
- Email
- Profile image
- Job role
- Skill level
- Learning goals
- Preferred theme
- Learning streak
- Skill score

### 5.2 Dashboard

The dashboard displays:

- Learning streak
- Completed courses
- Project count
- Skill score
- Learning progress
- Weekly activity
- Career recommendation

### 5.3 Learning Hub

Supported domains:

- Python
- Statistics
- Machine Learning
- Deep Learning
- Data Analytics
- SQL
- Power BI

A course object should contain:

```ts
{
  id: string;
  title: string;
  category: string;
  lessons: number;
  duration: string;
  progress: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  content: [];
  resources: [];
}
```

### 5.4 AI Assistant

The AI assistant should support:

- Data science concept explanations
- Code generation and debugging
- Notebook generation
- Project guidance
- Model evaluation recommendations
- Dataset analysis questions
- Interview preparation

**Recommended API flow:**

```text
User prompt
   -> Request validation
   -> Conversation history
   -> OpenAI API
   -> Structured response
   -> Save conversation
   -> Display response
```

The current implementation provides a front-end mock interaction and must be connected to a secure backend API.

### 5.5 Dataset Library

Each dataset should include:

- Title
- Category
- Row count
- File size
- Last update date
- Quality rating
- Data schema
- Source attribution
- Download URL

Recommended datasets include:

- Sales and e-commerce
- Healthcare outcomes
- Financial risk
- Movie recommendations
- Computer vision
- Public government data

### 5.6 Data Visualization

Planned chart types:

- Bar chart
- Line chart
- Area chart
- Pie chart
- Scatter plot
- Heat map
- Histogram

The visualization engine should support:

- Drag-and-drop fields
- CSV upload
- Data type detection
- Chart configuration
- Download as PNG
- Shareable dashboard links

### 5.7 Projects

Projects are grouped into:

- Beginner
- Intermediate
- Advanced

Each project should contain:

- Problem statement
- Learning objectives
- Required tools
- Task steps
- Dataset references
- Evaluation criteria
- Submission template
- GitHub repository link

### 5.8 Interview Preparation

Available practice types:

- Multiple-choice questions
- Coding questions
- Machine learning concepts
- Mock interview simulations

Recommended interview workflow:

```text
Select question
  -> Answer or code
  -> AI evaluation
  -> Personalized feedback
  -> Suggested improvement
  -> Save result
```

### 5.9 Resume Analyzer

The resume analyzer should:

1. Accept PDF or DOCX files.
2. Extract text safely.
3. Detect the target role.
4. Analyze skills, keywords, and structure.
5. Generate an ATS score.
6. Produce improvement suggestions.
7. Store a versioned analysis result.

Suggested scoring model:

```text
ATS compatibility: 30%
Skills alignment: 25%
Project evidence: 20%
Leadership signals: 15%
Readability and structure: 10%
```

---

## 6. Data Model

### User

```ts
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  skillLevel?: string;
  goal?: string;
  streak: number;
  skillScore: number;
  completedCourses: string[];
  completedProjects: string[];
}
```

### Learning Progress

```ts
interface LearningProgress {
  userId: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
  updatedAt: Date;
}
```

### Project Submission

```ts
interface ProjectSubmission {
  id: string;
  userId: string;
  projectId: string;
  repositoryUrl?: string;
  status: "Draft" | "Submitted" | "Reviewed";
  score?: number;
  feedback?: string;
}
```

### Conversation

```ts
interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 7. Security Considerations

### Authentication

- Use Firebase Authentication.
- Do not store raw passwords.
- Prefer secure OAuth providers.
- Apply server-side authorization checks.

### AI Assistant

- Never send API keys to the browser.
- Keep OpenAI requests on a server API route.
- Validate user input.
- Apply rate limiting.
- Limit conversation size.
- Restrict document uploads.

### Resume Processing

- Validate MIME types and file extensions.
- Enforce file size limits.
- Store user documents in Firebase Storage or an equivalent secure service.
- Remove temporary files after processing.
- Avoid exposing raw resumes through logs.

### Environment Variables

Required variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=

MONGODB_URI=

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 8. Development Setup

### Prerequisites

- Node.js 20 or newer
- npm
- Git
- A GitHub account
- Firebase project
- MongoDB Atlas account or MongoDB instance
- OpenAI API access

### Installation

```bash
npm install
npm run dev
```

### Build and Quality Checks

```bash
npm run lint
npm run build
npm run start
```

### Local Development Commands

```bash
npm run dev
npm run build
npm run lint
```

---

## 9. Production Deployment

### Recommended Deployment

Deploy the frontend to **Vercel**:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Configure environment variables.
4. Select the production branch.
5. Configure custom domain if needed.
6. Enable preview deployments.

### Production Environment Checklist

- Remove debug logs.
- Configure secure environment variables.
- Add HTTPS.
- Configure CSP headers.
- Enable rate limiting.
- Add request monitoring.
- Configure API error handling.
- Set up automated backups.
- Configure cron jobs for content updates.

---

## 10. Testing Strategy

### Recommended Test Layers

- Unit tests for utility functions
- Component tests for UI behavior
- API route integration tests
- Database and authentication integration tests
- End-to-end tests for onboarding and learning flows

### Suggested Tools

- Jest
- React Testing Library
- Playwright
- Supertest
- MongoDB Memory Server

### Critical Test Cases

- User registration and login
- Google OAuth flow
- Course progression persistence
- AI assistant API failures
- Resume upload validation
- Dataset authorization
- Interview scoring
- Project submission workflow
- Theme switching
- Mobile responsiveness

---

## 11. Business and Monetization Model

### Potential Revenue Models

1. Free tier with limited learning content
2. Premium subscription for full courses
3. Pro membership with mock interviews
4. Course marketplace
5. Corporate learning packages
6. Certification and assessment programs
7. Resume review and job coaching premium services
8. API access for educational institutions

### Value-Based Pricing Ideas

| Plan | Target User | Features |
|---|---|---|
| Free | Learners | Basic courses, limited AI requests |
| Pro | Individual learners | Full courses, projects, interviews |
| Career Pro | Job seekers | Resume analysis, mock interviews, feedback |
| Team | Institutions | Team dashboard, analytics, assignments |

---

## 12. Future Roadmap

### Phase 1 — Core Platform

- Firebase authentication
- MongoDB user profile
- Learning progress persistence
- Course content management
- Project submissions

### Phase 2 — AI Intelligence

- Secure OpenAI chat backend
- Context-aware lesson recommendations
- Automated code review
- Personalized learning paths
- AI-generated interview questions

### Phase 3 — Career Services

- Resume parsing and scoring
- Job role recommendations
- Portfolio scoring
- GitHub analysis
- Career milestone tracking

### Phase 4 — Community and Ecosystem

- Community discussions
- Peer reviews
- Mentor matching
- Certification system
- Instructor dashboards
- Course marketplace

### Phase 5 — Enterprise

- Team analytics
- Organization accounts
- Skill gap analysis
- Custom learning paths
- Admin reporting

---

## 13. Open Issues and Risks

### Technical Risks

- API keys exposed in frontend code
- Unvalidated file uploads
- Incomplete authentication flow
- Slow AI response times
- High database access costs
- Poorly structured content metadata

### Product Risks

- Too much content without personalization
- Weak user retention
- Low project completion rates
- AI responses that are inaccurate
- Difficulty finding relevant datasets

### Mitigation

- Use secure server-side APIs
- Add central error monitoring
- Use rate limiting and quotas
- Track user engagement
- Add feedback and rating systems
- Keep AI responses grounded on course context
- Add clear quality controls for generated content

---

## 14. Success Metrics

Recommended key metrics:

- Monthly active users
- Course completion rate
- Average learning streak
- Daily AI assistant usage
- Project completion rate
- Resume analysis completion rate
- Interview practice completion
- User retention after 30 days
- Average skill score improvement
- Number of portfolio projects completed

---

## 15. Ownership and Responsibilities

### Current Project Roles

| Role | Responsibility |
|---|---|
| Product Owner | Product direction and roadmap |
| Frontend Engineer | UI, responsive design, and React components |
| Backend Engineer | Authentication, API, database, and integrations |
| AI Engineer | OpenAI workflows, prompts, and evaluation |
| Data Engineer | Dataset management and visualization pipelines |
| QA Engineer | Automated and manual testing |
| DevOps Engineer | Deployment, monitoring, and environment configuration |

---

## 16. Project Summary

DataNova AI is a strong foundation for a modern data science learning platform. The current frontend demonstrates the intended user experience and product positioning. The next critical phase is the implementation of secure backend services, user authentication, persistent progress tracking, and OpenAI-powered AI assistance.

The platform has a clear path from a polished prototype to a production-ready SaaS product. Its most valuable differentiator is the combination of structured learning, project-based practice, AI mentoring, career preparation, and measurable skill improvement.

---

## 17. Final Recommendation

The project should proceed in the following order:

1. Add Firebase authentication.
2. Create MongoDB models and API endpoints.
3. Move AI assistant calls behind a server route.
4. Add secure user progress persistence.
5. Connect dataset downloads and metadata.
6. Implement resume analysis with safe document processing.
7. Add GitHub integration and project submissions.
8. Add robust testing and monitoring.
9. Deploy to Vercel through a production workflow.
10. Launch an MVP with free and premium plans.
