# 14-Day No-Code Development Crash Course
## Build Your First Website/PWA Without Writing Code

---

## Course Overview

**Duration:** 14 Days (2–3 hours/day)
**Tech Stack:** Claude AI, VS Code, Github, Vercel
**Final Outcome:** Fully deployed Website/PWA
**Target Audience:** Students (9th grade+) & Professionals

---

## Course Structure

### Week 1 (Days 1–5): Foundation Training
Learn the tools, understand the workflow, master the basics, set up your project

### Week 2 (Days 6–10): Guided Development
Build real components, handle errors, style your site

### Week 3 (Days 11–14): Final Project
Plan, build, test, and deploy your complete Website/PWA

---

# WEEK 1: FOUNDATION TRAINING

---

## Day 1: Introduction to No-Code Development

### Session Objectives
- Understand what No-Code Development means
- Learn the traditional vs no-code approach
- Meet your toolkit: Claude, VS Code, Github, Vercel
- Set up all four tools and accounts

### Session Content

#### What is No-Code Development?
**Analogy:** Imagine building a house. Traditional coding is like being a carpenter who crafts each piece of wood from scratch. No-Code is like using pre-made building blocks and having an expert architect (AI) guide you.

**Key Concept:** You solve problems and create solutions using AI tools and visual interfaces instead of writing complex code line-by-line.

#### The No-Code Toolkit — Meet Your Team

**1. Claude AI — Your Development Partner**
- **Role:** Your intelligent coding assistant and mentor
- **What it does:** Understands your requirements, generates code, explains concepts, debugs issues
- **Think of it as:** A senior developer sitting next to you, ready to help 24/7
- **Real-world example:** You describe "I need a contact form with name, email, message fields" → Claude creates the complete code

**2. VS Code — Your Digital Workshop**
- **Role:** Code editor and project organiser
- **What it does:** Stores your code files, lets you view/edit them, connects to Github
- **Think of it as:** Your organised workbench where all tools and materials are neatly arranged
- **Real-world example:** Like Microsoft Word, but for code files

**3. Github — Your Project Safe**
- **Role:** Version control and code storage
- **What it does:** Saves every version of your project, enables backup and collaboration
- **Think of it as:** Google Drive + Time Machine for code
- **Real-world example:** You can go back to yesterday's version if today's changes break something

**4. Vercel — Your Website Launcher**
- **Role:** Deployment platform
- **What it does:** Takes your code from Github and makes it live on the internet
- **Think of it as:** A publishing house that takes your manuscript and prints books for the world
- **Real-world example:** Your project goes from files on your computer → live website with a URL

#### The Complete Workflow
```
Problem Idea (You)
    ↓
Requirements (You + Claude)
    ↓
Code Generation (Claude)
    ↓
Code Organisation (VS Code)
    ↓
Version Control (Github)
    ↓
Live Website (Vercel)
```

### Quiz (Day 1)

1. **What is the main difference between traditional coding and no-code development?**
   - a) No-code is faster but less powerful
   - b) No-code uses AI assistance and visual tools instead of writing everything manually
   - c) No-code can only build simple websites
   - d) No-code doesn't require any technical understanding

2. **Which tool acts as your "AI development partner"?**
   - a) VS Code
   - b) Github
   - c) Claude
   - d) Vercel

3. **What is Github's primary role in the workflow?**
   - a) Writing code
   - b) Making websites live
   - c) Version control and code storage
   - d) Editing files

4. **Vercel is compared to which real-world concept?**
   - a) A workshop
   - b) A publishing house
   - c) A safe locker
   - d) An architect

5. **In the workflow, what comes immediately after "Code Generation"?**
   - a) Problem Idea
   - b) Live Website
   - c) Code Organisation
   - d) Requirements

**Answers:** 1-b, 2-c, 3-c, 4-b, 5-c

### FAQs

**Q: Do I need to know programming before starting?**
A: No! That's the beauty of no-code. You'll learn concepts as you build.

**Q: Can no-code build professional websites?**
A: Absolutely! Many businesses use no-code tools for production websites and apps.

**Q: Will I need to pay for these tools?**
A: Claude (free tier), VS Code (free), Github (free), Vercel (free tier) — all have free options sufficient for learning.

**Q: Is this course only for students?**
A: No! Professionals looking to quickly prototype ideas or switch careers can benefit equally.

**Q: What if I get stuck?**
A: Claude AI is always available to help. Error-handling techniques are covered in Week 2.

### Activity

**Hands-on Task:** Set Up Your Learning Environment

**Deliverable:** All 4 tools installed and ready

**Steps:**
1. Create a Claude.ai account (https://claude.ai)
2. Download and install VS Code (https://code.visualstudio.com)
3. Create a Github account (https://github.com)
4. Create a Vercel account (https://vercel.com)
5. Open all 4 tabs/windows simultaneously
6. In VS Code, install these extensions:
   - Live Server
   - Prettier — Code Formatter
   - HTML CSS Support
   - Auto Rename Tag
7. Write down in your own words: "What excites me most about building without code?"

**Success Criteria:**
- ✅ All 4 accounts created
- ✅ VS Code installed with extensions
- ✅ All 4 tools open and ready
- ✅ Personal reflection written

---

## Day 2: Mastering AI Prompting with Claude

### Session Objectives
- Understand how to communicate effectively with AI
- Learn prompt engineering basics
- Practice writing clear, specific prompts
- Get quality code from Claude

### Session Content

#### Why Prompting Matters
**Analogy:** Imagine ordering food at a restaurant. "I want something" gets you a random dish. "I want a vegetarian pizza with extra cheese, thin crust, no olives" gets you exactly what you want.

Claude is incredibly smart, but clear communication = better results.

#### The 4 Pillars of Good Prompts

**1. BE SPECIFIC**
❌ Bad: "Make a website"
✅ Good: "Create a landing page for a coffee shop with a hero section, menu, and contact form"

**2. PROVIDE CONTEXT**
❌ Bad: "Add a button"
✅ Good: "Add a 'Download Menu' button below the hero image that's blue with white text"

**3. MENTION TECHNOLOGY (when needed)**
❌ Bad: "Build a contact form"
✅ Good: "Build a contact form using HTML and CSS with name, email, and message fields"

**4. ASK FOR EXPLANATIONS**
✅ "Explain what each part of this code does"
✅ "Why did you use this approach?"

#### Prompting Formula
```
[WHAT you want] + [HOW it should work/look] + [WHY/Context if needed]

Example:
"Create a responsive navigation menu [WHAT]
with Home, About, Services, Contact links that collapses to a hamburger icon on mobile [HOW]
for a photography portfolio website [WHY/Context]"
```

#### Types of Prompts You'll Use

**1. Generation Prompts**
"Create a hero section with heading, subheading, and CTA button"

**2. Modification Prompts**
"Change the button color from blue to green and make it larger"

**3. Debugging Prompts**
"This code shows an error: [paste error]. How do I fix it?"

**4. Explanation Prompts**
"Explain what this CSS flexbox code is doing"

**5. Best Practice Prompts**
"What's the best way to make this form mobile-responsive?"

#### Practice Examples

**Scenario 1:** You need a pricing section
**Weak Prompt:** "Make pricing cards"
**Strong Prompt:** "Create a pricing section with 3 cards (Basic, Pro, Enterprise) displaying price, 5 features each, and a 'Choose Plan' button. Use a modern gradient background."

**Scenario 2:** Something broke
**Weak Prompt:** "It's not working"
**Strong Prompt:** "The contact form submit button doesn't respond when clicked. Here's the code: [paste code]. What's wrong?"

### Quiz (Day 2)

1. **Which prompt is more effective?**
   - a) "Make it look good"
   - b) "Add a blue gradient background with white text for the hero section"

2. **The 4 pillars of good prompts are: Specific, Context, Technology, and ___?**
   - a) Fast
   - b) Ask for Explanations
   - c) Short
   - d) Polite

3. **What type of prompt is: "Why did you use flexbox instead of grid here?"**
   - a) Generation
   - b) Modification
   - c) Debugging
   - d) Explanation

4. **When asking Claude to fix an error, what should you always include?**
   - a) The error message or code
   - b) Your favourite color
   - c) The time of day
   - d) Your computer brand

5. **True or False: "Build a website" is specific enough.**
   - a) True
   - b) False

**Answers:** 1-b, 2-b, 3-d, 4-a, 5-b

### FAQs

**Q: How long should my prompts be?**
A: Long enough to be clear, short enough to be focused. Usually 2–4 sentences is perfect.

**Q: Can I ask Claude to explain its own code?**
A: Yes! "Explain this code line by line" is a great prompt and always encouraged.

**Q: What if Claude's response isn't what I wanted?**
A: Refine your prompt with more details or say "That's close, but can you make it [specific change]?"

**Q: Can I ask Claude for multiple variations?**
A: Yes! "Give me 3 different design options for this button" works great.

**Q: What if I don't understand the code Claude generates?**
A: Ask Claude to explain it! Understanding what you're implementing always improves your project.

### Activity

**Hands-on Task:** Prompt Practice Challenge

**Deliverable:** 5 prompts + Claude's responses (screenshots)

**Steps:**
1. Open Claude.ai
2. Write prompts for these 5 scenarios using the 4 pillars:
   - **Task 1:** Ask Claude to create a simple "About Me" section
   - **Task 2:** Request a navigation menu with specific links
   - **Task 3:** Get a contact form with validation
   - **Task 4:** Ask Claude to explain what HTML tags are
   - **Task 5:** Request 3 different colour schemes for a website
3. For each prompt, screenshot the result and rate yourself: Did I follow the 4 pillars?

**Success Criteria:**
- ✅ 5 prompts written using the formula
- ✅ Each prompt is specific and contextual
- ✅ Screenshots saved
- ✅ Self-reflection: Which prompt worked best and why?

---

## Day 3: Web Basics + VS Code Setup

### Session Objectives
- Learn what HTML, CSS, and JavaScript do
- Recognise code patterns (without writing from scratch)
- Set up your first project folder in VS Code
- Preview your project with Live Server

### Session Content

#### The 3 Building Blocks of Web

**Analogy:** Building a house
- **HTML** = The structure (walls, rooms, doors)
- **CSS** = The decoration (paint, furniture, style)
- **JavaScript** = The functionality (lights, plumbing, appliances)

#### HTML — The Skeleton

**Key Elements You'll See:**
```html
<h1>Heading</h1>           → Main title
<p>Paragraph text</p>      → Text content
<button>Click Me</button>  → Interactive button
<img src="photo.jpg">      → Images
<div>Container</div>       → Boxes to organise content
<a href="url">Link</a>     → Clickable links
```

You don't write this from scratch — Claude generates it. But you should recognise these tags when you see them.

#### CSS — The Stylist

**Key Concepts You'll See:**
```css
color: blue;           → Text colour
background: white;     → Background colour
font-size: 24px;       → Text size
padding: 20px;         → Space INSIDE elements
margin: 10px;          → Space OUTSIDE elements
display: flex;         → Modern layout system
```

**Common CSS Terms:**
- **Responsive** = Works on all screen sizes (phone, tablet, desktop)
- **Flexbox/Grid** = Modern ways to arrange elements
- **Hover effect** = Changes when you move the mouse over it

#### JavaScript — The Brain

**Common Uses:**
- Form validation (checking if email is valid)
- Button click actions
- Animations and transitions
- Pop-up messages and modals

**You'll see things like:**
```javascript
onclick = "doSomething()"    → When button is clicked
function submitForm()        → A reusable action
if (email.includes("@"))    → Checking conditions
```

#### How They Work Together — A Contact Form

**HTML (Structure):**
```html
<form>
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <button>Submit</button>
</form>
```

**CSS (Style):**
```css
button {
  background: blue;
  color: white;
  padding: 10px 20px;
}
```

**JavaScript (Functionality):**
```javascript
button.onclick = function() {
  alert("Form submitted!");
}
```

#### Setting Up VS Code

**Step 1: Understanding the Interface**

| Area | What it does |
|------|-------------|
| Activity Bar (left) | Switch between Explorer, Search, Source Control |
| Editor Area (centre) | Where files open and you view/edit code |
| Terminal (bottom) | Built-in command line |
| Status Bar (very bottom) | Shows file info, language, errors |

**Step 2: Create Your Project Structure**

Create a new folder called `my-project` and open it in VS Code (File → Open Folder). Then create:

```
my-project/
├── index.html       (Main webpage)
├── css/
│   └── styles.css   (Styling)
├── js/
│   └── script.js    (Functionality)
├── images/          (Photos, icons)
└── README.md        (Project documentation)
```

**Step 3: Key Shortcuts**

| Action | Windows | Mac |
|--------|---------|-----|
| Save file | Ctrl+S | Cmd+S |
| New file | Ctrl+N | Cmd+N |
| Quick file switch | Ctrl+P | Cmd+P |
| Format code | Shift+Alt+F | Shift+Option+F |
| Toggle terminal | Ctrl+` | Ctrl+` |

**Step 4: Use Live Server**
- Right-click `index.html` → "Open with Live Server"
- Browser opens automatically
- Every time you save, the page refreshes instantly

### Quiz (Day 3)

1. **What is HTML responsible for?**
   - a) Making things pretty
   - b) Structure and content
   - c) Button clicks
   - d) Colours and fonts

2. **To change the background colour of a button, which language do you use?**
   - a) HTML
   - b) CSS
   - c) JavaScript
   - d) Python

3. **What does "responsive design" mean?**
   - a) Website loads quickly
   - b) Website works on all screen sizes
   - c) Website responds to voice commands
   - d) Website has animations

4. **What is the standard name for the main HTML file?**
   - a) main.html
   - b) home.html
   - c) index.html
   - d) webpage.html

5. **What does Live Server do?**
   - a) Sends files to Github
   - b) Launches local server and auto-refreshes on save
   - c) Writes code for you
   - d) Formats your code

**Answers:** 1-b, 2-b, 3-b, 4-c, 5-b

### FAQs

**Q: Do I need to memorise all HTML tags?**
A: No! Claude generates the code. You just need to recognise common patterns.

**Q: What's the difference between padding and margin?**
A: Padding is space INSIDE an element; margin is space OUTSIDE. Think: padding is the room inside a box, margin is the gap between boxes.

**Q: Can I mix HTML, CSS, and JavaScript in one file?**
A: Yes, but separating them is cleaner and more professional.

**Q: Do I need to use VS Code, or can I use another editor?**
A: You can use others, but VS Code is the industry standard and has the best extension support.

**Q: What if I accidentally delete a file?**
A: VS Code has "Undo" for file operations. Once we set up Github tomorrow, you'll also have version backups.

### Activity

**Hands-on Task:** Set Up Project + Code Detective Challenge

**Deliverable:** Organised project folder + working Live Server preview

**Steps:**
1. Create your project folder structure (as shown above)
2. Ask Claude: "Create a basic HTML5 starter template with linked CSS and JS files for a [your project type] website"
3. Copy the HTML to `index.html`, CSS to `css/styles.css`, JS to `js/script.js`
4. Open with Live Server — you should see your page!
5. In the HTML Claude gave you, identify:
   - 5 HTML tags and what they do
   - 5 CSS properties and their effects
   - Any JavaScript present
6. Ask Claude: "Explain this code section by section"
7. Compare your guesses with Claude's explanation

**Success Criteria:**
- ✅ Project folder properly structured
- ✅ Starter files created with Claude's help
- ✅ Live Server working and auto-refreshing
- ✅ HTML, CSS, and JS sections identified
- ✅ Claude's explanation reviewed and documented

---

## Day 4: Problem Identification & Requirements Gathering

### Session Objectives
- Learn how to identify problems worth solving
- Define a clear project scope using a project brief
- Break features into components using MoSCoW method
- Complete a full requirements document with Claude's help

### Session Content

#### Why Problem Identification Matters

**Bad Approach:** "I'll build a website because everyone has one"
**Good Approach:** "Delivery customers struggle to track orders → I'll build a tracking dashboard"

The best websites solve real problems. No-code development is fast, but building the wrong thing fast is still a waste.

#### The Problem Identification Framework

**Step 1: Find a Real Problem**

Ask yourself or others:
- What tasks take too much time?
- What's frustrating in daily life?
- What information is hard to find?
- What processes could be simpler?

**Examples:**
- Students: "Finding tutors in my area is confusing" → Tutor directory website
- Professionals: "Our team shares files through email" → File-sharing dashboard
- Business: "Customers ask the same questions repeatedly" → FAQ page or chatbot

**Step 2: Define Your Users**
- Age group and tech skill level
- What device will they use? (phone/desktop)
- What is their main goal?

**Step 3: Create a Project Brief**

```
PROJECT NAME: [Clear, catchy name]

PROBLEM STATEMENT:
[Who] struggles with [what] because [why]

SOLUTION:
A [type of website/app] that helps users [do what]

TARGET USERS:
- Age:
- Tech skill:
- Primary device:
- Main goal:

KEY FEATURES (Top 3–5):
1.
2.
3.

OUT OF SCOPE (What we WON'T build):
- [Feature that's too complex]
- [Feature for later versions]
```

#### From Brief to Requirements: MoSCoW Method

Once you have your brief, list every possible feature and sort them:

| Category | Meaning | Example |
|----------|---------|---------|
| **Must Have** | Can't launch without these | Core feature, minimum viable product |
| **Should Have** | Important but not critical | Improves UX, can add in final days |
| **Could Have** | Nice extras if time allows | Bonus features |
| **Won't Have** | Out of scope | Too complex or for future versions |

#### Feature Specifications

For each Must Have feature, write:

```
FEATURE NAME: [Clear name]

WHAT IT DOES:
[User action → System response]

USER FLOW:
1. User does X
2. System shows Y
3. User completes Z

COMPONENTS NEEDED:
- UI elements (buttons, forms, cards)
- Data to display
- Actions/interactions

ACCEPTANCE CRITERIA:
- [ ] User can do X successfully
- [ ] Error handling for Y
- [ ] Works on mobile and desktop
```

#### Using Claude for Requirements

**Useful Prompts:**
- "Help me brainstorm problems that [students/small businesses/etc.] face daily"
- "Is building [X] feasible with HTML/CSS/JavaScript?"
- "Help me categorise these features using the MoSCoW method: [list]"
- "For this feature: [name and description], create a detailed user flow and list all UI components needed"
- "Review this requirements document. What's missing or unclear? [paste doc]"

### Quiz (Day 4)

1. **Which is a better problem statement?**
   - a) "People need websites"
   - b) "Freelancers struggle to track project deadlines because they use scattered tools"

2. **What does "Must Have" mean in MoSCoW?**
   - a) Nice animation effects
   - b) Core functionality required to launch
   - c) Future version features
   - d) Experimental ideas

3. **Why define "target users"?**
   - a) To sound professional
   - b) To design for their specific needs and devices
   - c) It's not important
   - d) To limit who can use the site

4. **A good acceptance criterion is:**
   - a) "Make it look cool"
   - b) "User can submit the form in under 30 seconds"
   - c) "Add animations"
   - d) "Have lots of features"

5. **What belongs in "Out of Scope"?**
   - a) Core features
   - b) Must-have functionality
   - c) Features too complex or for later versions
   - d) User groups

**Answers:** 1-b, 2-b, 3-b, 4-b, 5-c

### FAQs

**Q: What if I can't think of a problem to solve?**
A: Look at your daily routine. What's annoying? Ask friends what frustrates them. Browse online communities for common complaints.

**Q: Should my project be completely original?**
A: No! Improving existing solutions or combining ideas is great. Don't reinvent the wheel — make it roll smoother.

**Q: How do I know if something is "too complex"?**
A: Ask Claude: "Can I build [X] with HTML/CSS/JavaScript and no backend server?" It'll guide you.

**Q: How detailed should feature specs be?**
A: Detailed enough that someone else (or Claude) could build it without guessing. If there's ambiguity, add clarity.

**Q: Can I change my project idea later?**
A: Try to finalise by end of today. Changing midway wastes precious build time.

### Activity

**Hands-on Task:** Project Brief + Requirements Document

**Deliverable:** Complete requirements document, ready for development

**Steps:**

1. **Brainstorm 3 problem ideas** (15 mins) — use the framework above

2. **Pick the best idea** — ask: Is it solvable with a website? Can I build it in 10 days? Would 10+ people find it useful?

3. **Create your project brief with Claude** (20 mins):
   Prompt: "I want to build [idea]. Help me create a clear project brief with problem statement, solution, target users, and 3–5 key features. Keep it simple for a 10-day build."

4. **MoSCoW categorisation** (20 mins):
   Prompt: "Help me categorise these features for my project: [list all ideas]. Use MoSCoW method and explain your reasoning."

5. **Detail each Must Have feature** (30 mins):
   Write user flows, components, and acceptance criteria for each one.

6. **Claude review** (10 mins):
   Prompt: "Review this requirements document. What's missing or unclear? [paste doc]"

**Success Criteria:**
- ✅ 3 ideas brainstormed, 1 selected with reasoning
- ✅ Complete project brief created
- ✅ All features categorised with MoSCoW
- ✅ 3–5 Must Have features fully specified
- ✅ Document reviewed by Claude

**Pro Tip:** Save this document! You'll reference it constantly during development.

---

## Day 5: Git, Github & Version Control

### Session Objectives
- Understand what version control is and why it matters
- Set up a Github repository for your project
- Make your first commit and push
- Master the daily commit → push workflow

### Session Content

#### What is Version Control?

**Without version control:** Files named `essay_final.doc`, `essay_final_v2.doc`, `essay_FINAL_FINAL.doc`

**With Git:** One file, complete history of every change, ability to go back to any version.

#### Git vs Github — They're Different!

| | Git | Github |
|--|-----|--------|
| What it is | Software on your computer | Website (github.com) |
| What it does | Tracks changes locally | Stores your code online |
| Analogy | Microsoft Word (software) | OneDrive (cloud storage) |

#### Key Concepts (Simplified)

**Repository (Repo):** Your project folder tracked by Git — contains all files + complete history

**Commit:** A snapshot of your project at a moment in time. Like saving a checkpoint in a game. Each commit has a message describing what changed.

**Push:** Upload your commits to Github — makes your local changes available online

**Pull:** Download changes from Github to your computer

#### The Simple Daily Workflow

```
1. Make changes to files (VS Code)
   ↓
2. Save files
   ↓
3. Stage changes (select what to commit)
   ↓
4. Commit with message ("Add hero section")
   ↓
5. Push to Github (upload)
```

#### Setting Up Git & Github

**Step 1: Install Git**
- Windows: Download from git-scm.com
- Mac: Run `git --version` in Terminal (installs automatically if missing)

**Step 2: Configure Git (one-time)**
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

**Step 3: Create Github Repository**
1. Go to github.com → click "+" → "New repository"
2. Name it to match your local folder
3. Keep it Public — don't initialise with README
4. Click "Create repository"

**Step 4: Connect Local Project to Github**
```bash
git init
git add .
git commit -m "Initial commit: Project setup and structure"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

#### Using VS Code's Built-in Git (Easier!)

1. Click the Source Control icon (Activity Bar)
2. See all changed files listed
3. Click "+" next to a file to stage it
4. Write a commit message in the text box
5. Click "✓" to commit
6. Click "..." → Push

#### Writing Good Commit Messages

| ❌ Bad | ✅ Good |
|--------|---------|
| "stuff" | "Add hero section to homepage" |
| "changes" | "Fix navigation menu on mobile" |
| "fixed it" | "Update colour scheme to blue theme" |
| "asdfasdf" | "Add contact form with validation" |

**Formula:** `[Action] [What] [Where if needed]`

### Quiz (Day 5)

1. **What's the difference between Git and Github?**
   - a) They're the same thing
   - b) Git is local version control, Github is cloud hosting
   - c) Github is a newer version of Git
   - d) Git is for professionals, Github is for beginners

2. **What does "commit" mean?**
   - a) Upload to Github
   - b) Delete files
   - c) Create a snapshot of your project
   - d) Share with others

3. **Which command stages all files?**
   - a) `git commit .`
   - b) `git add .`
   - c) `git push .`
   - d) `git save .`

4. **What's a good commit message?**
   - a) "stuff"
   - b) "Add contact form with validation"
   - c) "changes"
   - d) "code"

5. **What does "push" do?**
   - a) Deletes Github repo
   - b) Creates a commit
   - c) Uploads commits to Github
   - d) Downloads from Github

**Answers:** 1-b, 2-c, 3-b, 4-b, 5-c

### FAQs

**Q: How often should I commit?**
A: After completing each feature or logical chunk. At minimum, daily. Too many commits is better than too few.

**Q: Can others see my code on Github?**
A: If public, yes. That's the point — it's your portfolio! Keep private repos for sensitive projects.

**Q: What if I deleted a file by accident?**
A: If you've committed before, you can restore from Git history. Commit frequently!

**Q: What if I get an authentication error when pushing?**
A: Github requires personal access tokens. Go to Settings → Developer Settings → Personal Access Tokens → Generate new token. Use the token as your password.

**Q: Do I need to learn terminal Git commands?**
A: For this course, VS Code's GUI is enough. But knowing the commands helps with understanding.

### Activity

**Hands-on Task:** Initialise Git & Make First Commit

**Deliverable:** Your project live on Github with at least one commit

**Steps:**
1. Install and configure Git (name + email)
2. Create your Github repository (match your folder name)
3. In VS Code terminal, run the setup commands above
4. Refresh Github — your files should appear!
5. Practice the workflow: make a small change to README.md, stage, commit ("Update README with project description"), push, and verify on Github

**Success Criteria:**
- ✅ Git installed and configured
- ✅ Github repository created
- ✅ Initial commit pushed and visible on Github
- ✅ Practice commit-push cycle completed
- ✅ Comfortable using VS Code's Source Control panel

**Pro Tip:** Ask Claude: "Create a .gitignore file for a basic HTML/CSS/JS project" — this prevents unnecessary files from being tracked.

---

# WEEK 2: GUIDED DEVELOPMENT

---

## Day 6: Navigation + Hero Section

### Session Objectives
- Build a responsive navigation menu
- Create an impactful hero section
- Practice the full workflow: Claude → VS Code → Git → Push
- Understand CSS Flexbox basics and media queries

### Session Content

#### The Development Workflow (Repeat for Every Component)

```
1. Define what you need (from your Day 4 requirements)
2. Prompt Claude for code
3. Copy code to VS Code
4. Test with Live Server
5. Refine with Claude if needed
6. Commit to Git and push to Github
```

#### Part 1: Navigation Menu

**What you'll build:**
- Horizontal links on desktop
- Hamburger icon on mobile
- Smooth toggle animation
- Sticky positioning (stays at top on scroll)

**Prompt Template:**
```
Create a responsive navigation menu:

DESKTOP VIEW:
- Logo on the left
- Horizontal menu links on the right: [your links]
- Sticky positioning (stays at top on scroll)
- Smooth hover effects (underline animation)
- Semi-transparent white background with backdrop blur

MOBILE VIEW (below 768px):
- Logo on left, hamburger icon on right
- When clicked, menu slides down from top
- Links stacked vertically

STYLING:
- Modern, minimal design
- Active link highlighted in [your colour]
- Smooth transitions

Provide complete HTML, CSS, and JavaScript in separate code blocks.
```

**Common Fixes:**

| Issue | Prompt to Claude |
|-------|-----------------|
| Menu doesn't toggle | "The hamburger click doesn't work. Here's my JS: [paste]. Debug this." |
| Looks bad on tablet | "Add a tablet breakpoint (768px–1024px) with compact horizontal menu." |
| Wrong colours | "Change to: Background #1e3a8a, Text white, Active link #10b981" |

#### Part 2: Hero Section

**The hero section** is the first large section visitors see. It must grab attention immediately.

**Essential Elements:**
- Attention-grabbing headline (6–10 words)
- Supporting subtext (15–20 words)
- Call-to-action (CTA) button ("Get Started", "Learn More", etc.)
- Background: gradient, solid colour, or image

**Design Principles:**
- **Visual Hierarchy:** Headline largest → Subtext medium → CTA button contrasting
- **Contrast:** Text must be readable against background
- **Whitespace:** Give elements room to breathe
- **One focal point:** One clear message, one primary action

**Prompt Template:**
```
Create a modern hero section:

CONTENT:
- Headline: "[Your headline]"
- Subtext: "[Your subtext]"
- CTA Button: "[Button text]"

DESIGN:
- Layout: Centred content or text-left / graphic-right
- Background: [gradient / solid / image]
- Style: Modern, minimal, professional
- CTA has hover effect
- Subtle fade-in animation on load
- Fully responsive (stack vertically on mobile)

Provide HTML and CSS in separate blocks.
```

**Working with Background Images:**
```css
/* Option A: CSS background image */
.hero {
  background-image: url('../images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}

/* Option B: Gradient (no image needed) */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

Free stock photos: unsplash.com, pexels.com

#### Understanding Key CSS Concepts

**Flexbox — arranging elements:**
```css
.container {
  display: flex;
  justify-content: center;   /* Horizontal alignment */
  align-items: center;       /* Vertical alignment */
  flex-direction: row;       /* Row or column */
}
```

**Media Queries — responsive design:**
```css
/* Applies only on screens smaller than 768px */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
}
```

### Quiz (Day 6)

1. **What does "responsive design" mean?**
   - a) Website responds quickly
   - b) Design adapts to different screen sizes
   - c) Buttons respond to clicks
   - d) Design is polite

2. **Media queries are used for:**
   - a) Contacting the press
   - b) Asking Claude questions
   - c) Applying different styles at different screen sizes
   - d) Database queries

3. **What is a CTA?**
   - a) Certified Technical Analyst
   - b) Call-to-Action (button/link prompting user action)
   - c) Central Text Area
   - d) Creative Type Arrangement

4. **What is "visual hierarchy"?**
   - a) Listing items from A to Z
   - b) Making everything the same size
   - c) Organising elements by importance through size, colour, position
   - d) Using only one colour

5. **When should you commit your code?**
   - a) Only when completely finished
   - b) After each working component or feature
   - c) Never
   - d) Only once a week

**Answers:** 1-b, 2-c, 3-b, 4-c, 5-b

### FAQs

**Q: Do I need to understand every line of code?**
A: Understand the overall flow and key parts. For now, focus on "what it does" not "exact syntax."

**Q: What if my hero section looks different to what I expected?**
A: Refine with Claude! Describe what you want changed specifically. Iteration is normal.

**Q: Should I use images or gradients?**
A: Gradients are simpler and faster to load. Use images only if they're highly relevant to your project.

**Q: Can I have multiple CTA buttons?**
A: One primary CTA is best. If needed, make secondary actions less prominent (outline button vs solid).

**Q: How do I know if code is "good"?**
A: Ask Claude: "Review this code. Is it following best practices? Any improvements?"

### Activity

**Hands-on Task:** Build Navigation + Hero Section

**Deliverable:** Both components working, responsive, committed to Github

**Steps:**

1. **Navigation (45 mins)**
   - Write your spec (logo name, link labels, colours)
   - Prompt Claude using the template above
   - Implement in VS Code (HTML → CSS → JS)
   - Test desktop view + mobile hamburger toggle
   - Refine any issues with Claude
   - Commit: `"Add responsive navigation menu with mobile hamburger"`

2. **Hero Section (45 mins)**
   - Write your headline, subtext, and CTA text
   - Choose: gradient, solid, or image background
   - Prompt Claude using the template above
   - Implement below navigation in index.html
   - Test responsiveness on multiple sizes
   - Get one person's feedback ("What's your first impression?")
   - Commit: `"Add hero section with headline, CTA, and responsive design"`

**Success Criteria:**
- ✅ Navigation: desktop horizontal, mobile hamburger toggle works
- ✅ Hero: headline clear and impactful, CTA prominent
- ✅ Both components responsive
- ✅ Both committed to Github
- ✅ Design matches your project theme

---

## Day 7: Forms & User Input

### Session Objectives
- Build functional, validated forms
- Understand different form input types
- Learn to handle form submission
- Apply form UX best practices

### Session Content

#### Why Forms Matter

Forms are how users interact beyond clicking links:
- Contact/feedback
- Sign-ups/registrations
- Search functionality
- Data submission

#### Form Anatomy

```html
<form id="contactForm">
  <label for="name">Full Name</label>
  <input type="text" id="name" name="name" placeholder="Your Name" required>

  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" placeholder="Email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" placeholder="Your Message" required></textarea>

  <button type="submit">Send Message</button>
</form>
```

#### Common Input Types

| Type | Use case |
|------|----------|
| `type="text"` | General text |
| `type="email"` | Email (auto-validates format) |
| `type="tel"` | Phone number |
| `type="number"` | Numeric input |
| `type="date"` | Date picker |
| `type="password"` | Hidden text |
| `type="checkbox"` | Check boxes |
| `type="radio"` | Single-choice options |
| `type="textarea"` | Multi-line text |

#### Form Validation

**HTML5 Built-in Validation (free, no code needed):**
```html
<input type="email" required>
<input type="text" minlength="3" maxlength="50">
<input type="number" min="1" max="100">
```

**JavaScript Custom Validation (Claude generates this):**
- Custom error messages
- Real-time feedback as you type
- Rules beyond HTML5 can handle

#### Handling Form Submission — 3 Approaches

**Option 1: FormSpree (Easiest — emails you submissions)**
- Free service, no backend needed
- Sign up at formspree.io, get your form endpoint
- Prompt Claude: "Create a contact form that submits to FormSpree endpoint [your-endpoint]. Include name, email, subject, message with validation."

**Option 2: localStorage (Saves in browser — great for practice)**
- Data saved on user's device
- Great for session lists, to-do items, form drafts
- Prompt Claude: "Create a form that saves submissions to localStorage and displays them below the form in a card layout."

**Option 3: Display Only (Simplest — just shows success message)**
- Form validates but doesn't send anywhere
- Perfect for learning UX and validation patterns
- Prompt Claude: "Create a contact form with full validation that shows a success confirmation on submit. No actual backend needed."

#### Form UX Best Practices

**DO:**
- ✅ Use clear labels above each field
- ✅ Show helpful placeholder text
- ✅ Mark required fields (with asterisk *)
- ✅ Show validation errors clearly below fields
- ✅ Confirm successful submission
- ✅ Keep forms short — only ask what you need
- ✅ Use appropriate input types

**DON'T:**
- ❌ Hide error messages
- ❌ Use confusing or technical labels
- ❌ Make input fields too small to tap on mobile
- ❌ Require unnecessary information
- ❌ Submit without any confirmation

#### Prompt Template
```
Create a [form type] with these specifications:

FIELDS:
1. [Field name]: [type], [required/optional], [constraints if any]
2. [Field name]: [type], [required/optional], [constraints if any]
(list all fields)

VALIDATION:
- All required fields must be filled before submission
- Email must be valid format
- [Any custom rules, e.g. "Date must be in the future"]

DESIGN:
- Modern, clean form design
- Clear labels above each field
- Placeholder text in inputs
- Visible red error messages below invalid fields
- Prominent submit button
- Success message after submission

FUNCTIONALITY:
- [FormSpree / localStorage / display only]
- Prevent submission if validation fails
- Clear form after successful submission

RESPONSIVE:
- Full-width inputs on mobile
- Comfortable touch-friendly spacing

Provide complete HTML, CSS, and JavaScript.
```

### Quiz (Day 7)

1. **What does the `required` attribute do?**
   - a) Makes field larger
   - b) Makes field mandatory to fill before submitting
   - c) Makes field hidden
   - d) Removes field

2. **Which input type auto-validates email format?**
   - a) type="text"
   - b) type="email"
   - c) type="mail"
   - d) type="validation"

3. **What is FormSpree?**
   - a) A form design tool
   - b) A service that handles form submissions and emails the results to you
   - c) A JavaScript library
   - d) A CSS framework

4. **Where does localStorage save data?**
   - a) On the server
   - b) In the cloud
   - c) In the user's browser
   - d) In a database

5. **Good form UX includes:**
   - a) Hiding error messages
   - b) Long, complex forms
   - c) Clear labels and visible validation feedback
   - d) Tiny input fields

**Answers:** 1-b, 2-b, 3-b, 4-c, 5-c

### FAQs

**Q: Do I need a database for forms?**
A: Not for this course. Use FormSpree for contact forms or localStorage for practice.

**Q: What if users submit spam?**
A: For learning, not a concern. In production, use Google reCAPTCHA.

**Q: Can forms work without JavaScript?**
A: Basic forms yes, but modern validation and UX features require JavaScript.

**Q: How do I receive form submissions?**
A: FormSpree emails them to you. It's the simplest solution for static websites.

**Q: How do I style error messages?**
A: Claude will include CSS for error states. Typically: red text, small font, below the field.

### Activity

**Hands-on Task:** Build a Functional, Validated Form

**Deliverable:** Working form with validation + committed to Github

**Steps:**
1. Choose your form type based on your project requirements (contact, session creator, sign-up, etc.)
2. List all fields with types, required/optional status, and validation rules
3. Choose submission method (FormSpree recommended for contact forms)
4. Prompt Claude using the template above
5. Implement HTML, CSS, and JS in your project
6. **Test these scenarios:**
   - Submit completely empty → errors should appear
   - Enter invalid email → email error appears
   - Fill all correctly → success message shows
   - Test on mobile via DevTools
7. Have someone else use the form and watch where they get confused
8. Refine based on feedback
9. Commit: `"Add [form type] with validation and success confirmation"`

**Success Criteria:**
- ✅ All required fields validate correctly
- ✅ Clear error messages appear on invalid input
- ✅ Success confirmation shows on valid submission
- ✅ Responsive on mobile
- ✅ User-tested with at least one person
- ✅ Committed to Github

---

## Day 8: Content Sections — Cards, Lists & Data Display

### Session Objectives
- Build reusable content card components
- Display structured data attractively
- Implement filtering and search functionality
- Create section layouts using CSS Grid

### Session Content

#### What Are Content Sections?

Content sections are the core of your website — where your main information lives. After the hero grabs attention, content sections deliver on the promise.

**Common Types:**
- **Cards:** Products, profiles, sessions, articles, features
- **Lists:** FAQs, steps, features, results
- **Grids:** Portfolios, menus, galleries
- **Tables:** Comparisons, schedules, data

#### Building Card Components

Cards are one of the most reusable UI patterns. Every card shares the same structure, just different content.

**Anatomy of a Card:**
```html
<div class="card">
  <img src="images/thumbnail.jpg" alt="Description" class="card-img">
  <div class="card-body">
    <span class="card-tag">Category</span>
    <h3 class="card-title">Title Here</h3>
    <p class="card-text">Brief description goes here...</p>
    <div class="card-meta">
      <span>📅 Date</span>
      <span>📍 Location</span>
    </div>
    <button class="card-btn">Action</button>
  </div>
</div>
```

**Card Grid with CSS Grid:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 40px 20px;
}
```

This automatically creates as many columns as fit, and collapses to 1 column on mobile — no media query needed!

#### Prompt Template for Cards + Grid

```
Create a content section for my [project type] with these requirements:

SECTION PURPOSE:
[What this section displays, e.g. "Browse study sessions", "View our services", "See portfolio projects"]

CARD CONTENT (each card shows):
- [Field 1, e.g. title]
- [Field 2, e.g. date/time]
- [Field 3, e.g. category tag]
- [Field 4, e.g. description]
- [Action button text]

SAMPLE DATA:
Include 6 sample cards with realistic content

LAYOUT:
- CSS Grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards have subtle shadow and hover lift effect
- Consistent card height (equal heights in each row)

FILTERING (if needed):
- Filter buttons above the grid (by category/type)
- Clicking a filter shows only matching cards
- "All" button shows everything

STYLE:
- Modern, clean design
- Match this colour scheme: [your colours]

Provide complete HTML, CSS, and JavaScript.
```

#### Adding Search Functionality

**Simple client-side search:**
```javascript
// Claude will generate something like this
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});
```

**Prompt for search:**
"Add a search bar above the card grid that filters cards in real time by title and description as the user types."

#### Creating FAQ or Steps Sections

**For FAQ sections:**
```
Create an FAQ accordion section with these questions and answers:
Q1: [Question]
A1: [Answer]
(list all Q&As)

Each question is clickable. Clicking expands the answer. Clicking again collapses it.
Only one answer open at a time.
```

**For feature/steps sections:**
```
Create a "How it works" section with 4 numbered steps:
Step 1: [Title] — [Brief description]
Step 2: [Title] — [Brief description]
...

Use icons (emoji or SVG) for each step.
Horizontal layout on desktop, vertical on mobile.
```

#### Working with localStorage for Dynamic Cards

If your project lets users add content (study sessions, to-do items, listings):

```
Create a section that:
1. Reads items from localStorage and displays them as cards
2. Has an "Add New [item]" button that opens the form from yesterday
3. When a new item is saved, the card grid automatically updates
4. Each card has a "Delete" button that removes it from localStorage and the display
5. Shows a friendly empty state message when there are no items

Provide complete HTML, CSS, and JavaScript.
```

### Quiz (Day 8)

1. **What CSS property creates a responsive grid that auto-collapses on mobile?**
   - a) `display: flex`
   - b) `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
   - c) `float: left`
   - d) `position: relative`

2. **What is a "card component"?**
   - a) A payment card
   - b) A reusable UI element displaying structured content in a contained box
   - c) A CSS card property
   - d) A JavaScript function

3. **Client-side search means:**
   - a) Data is sent to a server
   - b) Filtering happens in the browser without server requests
   - c) Search is done by the user
   - d) Only admins can search

4. **What does `display: none` do to a card?**
   - a) Deletes it permanently
   - b) Hides it but keeps it in the HTML
   - c) Makes it transparent
   - d) Moves it off screen

5. **An accordion FAQ section is useful because:**
   - a) It requires no CSS
   - b) It shows all answers at once
   - c) It keeps the page compact, revealing answers only when needed
   - d) It is faster to build

**Answers:** 1-b, 2-b, 3-b, 4-b, 5-c

### FAQs

**Q: What if I don't have real data yet?**
A: Ask Claude to generate realistic sample data for your project type. It's perfect for prototyping.

**Q: How do I add real images to cards?**
A: Save images to your `images/` folder and update the `src` path in the HTML. Use unsplash.com for free stock photos.

**Q: How do I make cards link to detail pages?**
A: Wrap the card in an `<a>` tag, or add an onclick handler. For now, linking to a separate detail page is an extension challenge.

**Q: Is localStorage permanent?**
A: It persists until the user clears their browser data. It's browser-specific — data doesn't sync across devices.

**Q: My grid doesn't look even. How do I fix it?**
A: Ask Claude: "My CSS Grid cards have uneven heights. How do I make all cards in a row the same height?" (Hint: `align-items: stretch` on the grid container).

### Activity

**Hands-on Task:** Build Your Core Content Section

**Deliverable:** Card grid or list section with filtering, committed to Github

**Steps:**
1. Identify what your content section displays (from your requirements doc)
2. Write the spec: what does each card/item show?
3. Decide: do you need filtering? Search? Dynamic add/delete?
4. Prompt Claude using the appropriate template above
5. Implement in VS Code — test with Live Server
6. If using localStorage: test the full cycle (add item → see card → delete card)
7. Check responsiveness: desktop grid → tablet → mobile
8. Refine any visual inconsistencies
9. Commit: `"Add [content type] grid section with filtering"`

**Success Criteria:**
- ✅ Cards display with realistic sample content
- ✅ Grid is responsive across screen sizes
- ✅ Filtering or search works (if applicable)
- ✅ Cards have hover effects
- ✅ localStorage integration works (if applicable)
- ✅ Committed to Github

**Extension Challenge (Optional):**
- Add a "Sort by" dropdown (by date, alphabetically, etc.)
- Add pagination ("Show more" button that reveals more cards)

---

## Day 9: Styling, Animations & Responsive Polish

### Session Objectives
- Establish a consistent visual design system
- Add animations and micro-interactions
- Ensure full responsiveness across all breakpoints
- Apply professional finishing touches

### Session Content

#### Why Polish Matters

A site that works is good. A site that works *and* feels good to use is memorable. Today you transform your functional components into a polished, professional product.

**The difference:**
- Unpolished: Inconsistent colours, abrupt transitions, awkward spacing
- Polished: Consistent typography, smooth animations, perfect spacing, clear hierarchy

#### Building a Design System

A design system is a set of rules for your visual style. Define these once and use them everywhere.

**CSS Variables (your design system):**
```css
:root {
  /* Colours */
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --bg-white: #ffffff;
  --bg-light: #f9fafb;
  --border: #e5e7eb;

  /* Typography */
  --font-base: 'Inter', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Other */
  --radius: 8px;
  --radius-lg: 16px;
  --shadow: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
  --transition: 0.3s ease;
}
```

**Prompt for design system:**
"Create a CSS variables design system for my [project type]. I want a [modern/playful/professional/minimal] style with a [your primary colour] accent. Include variables for colours, typography scale, spacing, border radius, shadows, and transitions."

#### Adding Animations

**Types of animations to add:**

**1. Hover Effects (CSS only)**
```css
.card {
  transition: transform var(--transition), box-shadow var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.btn {
  transition: background var(--transition), transform var(--transition);
}
.btn:hover {
  background: var(--primary-dark);
  transform: scale(1.02);
}
```

**2. Scroll-Triggered Fade-In (JavaScript)**
```
Add a scroll animation: as the user scrolls down, each section fades in and slides up smoothly. Use Intersection Observer API. Elements start invisible (opacity: 0, translateY: 30px) and animate to visible when they enter the viewport.
```

**3. Loading States**
```
Add a loading spinner that appears while content is being processed (form submission, filtering). Disappears when action completes.
```

**4. Smooth Page Scrolling**
```css
html {
  scroll-behavior: smooth;
}
```

**Prompt for animations:**
"Add professional micro-animations to my website:
1. Cards lift on hover with shadow
2. Buttons scale slightly and darken on hover
3. Navigation links get an underline slide-in on hover
4. Sections fade in as user scrolls down
5. Form inputs get a coloured border glow on focus

All animations should be subtle, not distracting. Use CSS transitions and Intersection Observer."

#### Full Responsiveness Checklist

Test your site at these breakpoints using DevTools (F12 → device toolbar):

| Breakpoint | Size | Check |
|-----------|------|-------|
| Mobile S | 320px | Text readable, no horizontal scroll |
| Mobile M | 375px | Most common phone size |
| Mobile L | 425px | Larger phones |
| Tablet | 768px | Grid adjusts, nav changes |
| Laptop | 1024px | Desktop layout begins |
| Desktop | 1440px | Wide screen looks balanced |

**Common Responsive Fixes:**

| Problem | Ask Claude |
|---------|-----------|
| Text too small on mobile | "Increase base font size to 16px on mobile and adjust heading scales" |
| Buttons too small to tap | "Make all buttons minimum 44px height on mobile for accessibility" |
| Cards overflow screen | "Fix card grid to single column on screens below 480px" |
| Navigation breaks | "Debug this navigation at 768px: [paste CSS]" |
| Images stretch | "Make all images use max-width: 100% and height: auto" |

#### Typography Polish

**Good typography rules:**
- Maximum 2 fonts: one for headings, one for body
- Body text: minimum 16px
- Line height: 1.5–1.7 for body, 1.2–1.3 for headings
- Paragraph max-width: 65–75 characters (use `max-width: 65ch`)
- Colour contrast: dark text on light background or vice versa

**Prompt:**
"Improve the typography on my website:
- Use Google Fonts: [Heading font] for headings, [Body font] for body text
- Set body font size to 16px with line-height 1.6
- Set heading line-heights to 1.2
- Add letter-spacing: -0.02em to large headings
- Limit paragraph width to 65ch for readability
Show me the HTML link tag and the CSS to add."

#### Footer Component

Every site needs a footer. Build it today as part of the polish pass.

**Prompt:**
"Create a footer for my [project type] website with:
- Logo or project name on the left
- Quick links in the centre: [your links]
- Copyright text on the right
- Social media icons (optional)
- Dark background (#1f2937) with white text
- Responsive: stack vertically on mobile
Provide complete HTML and CSS."

### Quiz (Day 9)

1. **What are CSS variables used for?**
   - a) Storing JavaScript data
   - b) Defining reusable design tokens like colours, spacing, and fonts
   - c) Creating animations
   - d) Setting page size

2. **What does `scroll-behavior: smooth` do?**
   - a) Makes the page load faster
   - b) Makes anchor link navigation animate smoothly instead of jumping
   - c) Adds a scroll bar
   - d) Removes page scroll

3. **Why is 44px the recommended minimum button height on mobile?**
   - a) It looks better
   - b) It matches the average adult fingertip size for accurate tapping
   - c) CSS requirement
   - d) It is the browser default

4. **What does `max-width: 65ch` on a paragraph do?**
   - a) Limits to 65 characters per line for readability
   - b) Makes the font 65px
   - c) Sets the page width
   - d) Adds 65px of padding

5. **A micro-interaction is:**
   - a) A tiny website
   - b) A subtle visual response to user action (hover, click, focus)
   - c) A loading screen
   - d) A JavaScript error

**Answers:** 1-b, 2-b, 3-b, 4-a, 5-b

### FAQs

**Q: How many animations are too many?**
A: If the user notices the animations more than the content, that's too many. Aim for subtle and purposeful.

**Q: Should I use a CSS framework like Bootstrap?**
A: For this course, pure CSS is better for learning. Bootstrap is great for speed later, but it can hide important concepts.

**Q: How do I import Google Fonts?**
A: Ask Claude: "How do I add [Font Name] from Google Fonts to my HTML and CSS?" It will give you the exact link and CSS.

**Q: My animations feel choppy. Why?**
A: Always animate `transform` and `opacity` — never `width`, `height`, `margin`, or `top/left`. Claude will use the right properties.

**Q: What's the minimum colour contrast for readability?**
A: WCAG standard is 4.5:1 for normal text. Ask Claude: "Check if my text colour [X] on background [Y] meets accessibility contrast standards."

### Activity

**Hands-on Task:** Full Design Polish Pass

**Deliverable:** Visually consistent, animated, fully responsive site committed to Github

**Steps:**
1. **Design System (20 mins):** Generate CSS variables and apply them across all your CSS files. Replace any hardcoded colours or sizes.
2. **Animations (20 mins):** Add hover effects to cards and buttons. Add scroll fade-in to your main sections.
3. **Responsiveness audit (30 mins):** Test every page at every breakpoint. List all issues found.
4. **Fix all responsiveness issues (20 mins):** Prompt Claude with each specific issue.
5. **Typography (15 mins):** Apply Google Fonts and proper type scale.
6. **Footer (15 mins):** Build and add footer.
7. **Final visual review:** Open your site and scroll through. Does it look professional?
8. Commit: `"Polish: design system, animations, responsive fixes, footer"`

**Success Criteria:**
- ✅ CSS variables used consistently
- ✅ Hover animations on cards and buttons
- ✅ Scroll fade-in on sections
- ✅ No layout breaks at any standard breakpoint
- ✅ Footer present and responsive
- ✅ Typography clean and readable
- ✅ Committed to Github

---

## Day 10: Error Handling, Debugging & Code Review

### Session Objectives
- Learn to identify and fix common errors
- Use browser DevTools for debugging
- Improve code quality through review
- Test your site thoroughly before final build

### Session Content

#### Types of Errors You'll Encounter

**1. HTML Errors**
- Unclosed tags
- Incorrect file paths (images not loading)
- Missing required attributes

**2. CSS Errors**
- Typos in property names
- Wrong selector targeting wrong element
- Units missing (writing `20` instead of `20px`)
- Specificity conflicts

**3. JavaScript Errors**
- Missing closing brackets or semicolons
- Trying to use an element before the page loads
- Null errors (`Cannot read property of null`)
- Event listeners not attached

**4. Layout Errors**
- Content overflowing its container
- Elements overlapping
- Broken responsiveness at certain sizes

#### Using Browser DevTools

Open DevTools: Press `F12` (or right-click → Inspect)

**Key Panels:**

**Elements Tab**
- See the full HTML structure
- Click any element to inspect it
- Edit HTML live to test changes

**Styles Panel (inside Elements)**
- See all CSS applied to selected element
- Toggle properties on/off by clicking the checkbox
- Edit values live
- See which styles are being overridden (shown with strikethrough)

**Console Tab**
- See JavaScript errors (red text)
- Copy the error message to paste into Claude
- Test JavaScript snippets

**Network Tab**
- See if files are loading (images, CSS, JS)
- Red rows = failed to load (check file path)

**Device Toolbar**
- Toggle mobile view
- Test at specific screen sizes

#### The Debugging Process

**Step 1: Reproduce the problem**
"Does this always happen, or only sometimes? What exact steps cause it?"

**Step 2: Identify where the problem is**
- Visual problem → Elements/Styles tab
- JavaScript not working → Console tab
- File not loading → Network tab

**Step 3: Read the error**
Console errors tell you exactly what went wrong and which line.

**Step 4: Fix with Claude**
```
Prompt template:
"I'm getting this error: [paste exact error message]

Here's the relevant code: [paste code]

The error happens when: [describe what triggers it]

Help me fix this."
```

#### Common Fixes Reference

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Image not showing | Wrong file path | Check path matches exactly — case sensitive! |
| CSS not applying | Wrong selector or typo | Inspect element, check which CSS is applied |
| Button click does nothing | JS file not linked or JS error | Check Console for errors |
| Mobile layout broken | Missing viewport meta tag | Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Font not loading | Wrong Google Fonts link | Regenerate the link from fonts.google.com |
| Form doesn't submit | Missing `name` attributes on inputs | Add `name="fieldname"` to each input |

#### Code Review with Claude

Before moving to the final project week, do a full code review:

**Prompts:**
- "Review my HTML for accessibility issues and best practices. Here's the code: [paste]"
- "Review my CSS for redundancy or improvements. Suggest optimisations: [paste]"
- "Is there anything insecure or problematic in this form handler? [paste JS]"
- "Check my file structure and linking — is everything connected correctly? [paste index.html]"
- "My page scores low on mobile performance. What can I improve? [describe your setup]"

#### Performance Quick Wins

**1. Image Optimisation**
- Use appropriately sized images (don't use 3000px wide images for a 400px card)
- Ask Claude: "What's the recommended image size and format for web hero sections?"

**2. Clean Up Unused Code**
- Remove CSS properties you commented out but never deleted
- Remove `console.log()` statements
- Remove unused JavaScript variables

**3. Proper Meta Tags**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Brief description of your site">
  <title>Your Site Name</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
```

**4. Link Verification**
- Click every navigation link — does it work?
- Test every button
- Submit the form with valid and invalid data

### Quiz (Day 10)

1. **Where do you find JavaScript errors in DevTools?**
   - a) Elements tab
   - b) Console tab
   - c) Network tab
   - d) Sources tab

2. **If an image is not showing, the most likely cause is:**
   - a) The image is too large
   - b) Wrong or mismatched file path
   - c) CSS is hiding it
   - d) Javascript is broken

3. **What does a strikethrough on a CSS property in DevTools mean?**
   - a) The property is working
   - b) The property is overridden by a more specific rule
   - c) The browser doesn't support it
   - d) The file is corrupted

4. **What is the viewport meta tag for?**
   - a) Setting page colours
   - b) Ensuring correct scaling on mobile devices
   - c) Loading Google Fonts
   - d) Enabling JavaScript

5. **When asking Claude to debug, you should always include:**
   - a) Your name and country
   - b) The exact error message and relevant code
   - c) How long you've been learning
   - d) The colour scheme you used

**Answers:** 1-b, 2-b, 3-b, 4-b, 5-b

### FAQs

**Q: What if I can't find the error?**
A: Paste your entire file to Claude and say "Find all errors and issues in this code." It will audit the full file.

**Q: My DevTools shows hundreds of things. Where do I start?**
A: Always start with the Console. Red error messages are your top priority. Address them first.

**Q: How do I copy an error from the Console?**
A: Right-click the error → "Copy message" or just select and copy the text.

**Q: Should I fix every warning (yellow) in the Console?**
A: Fix errors (red) first. Warnings (yellow) are lower priority but good to address before launch.

**Q: How do I know if my site is fast enough?**
A: In Chrome DevTools → Lighthouse tab → Generate Report. Aim for 80+ on performance and accessibility.

### Activity

**Hands-on Task:** Full Debug & Code Review Session

**Deliverable:** Clean, error-free project ready for final week

**Steps:**
1. **Console check (15 mins):** Open your site, open DevTools Console. Fix every red error.
2. **Link & button audit (10 mins):** Click every link and button. Document anything that doesn't work.
3. **Form test (15 mins):** Test all form validation paths. Fix any that behave unexpectedly.
4. **Responsiveness final check (15 mins):** DevTools device toolbar — check 320px, 375px, 768px, 1024px.
5. **Claude code review (20 mins):** Paste each major file to Claude for a review. Apply its suggestions.
6. **Performance check (10 mins):** Run Lighthouse in DevTools. Note your score. Ask Claude for the top 3 improvements.
7. **Clean up (10 mins):** Remove commented-out code, `console.log()` statements, and unused files.
8. Commit: `"Debug: fix errors, code review, performance improvements"`

**Success Criteria:**
- ✅ Zero red errors in Console
- ✅ All links and buttons work
- ✅ Form validation tested and passing
- ✅ Site renders correctly at all standard breakpoints
- ✅ Lighthouse score noted
- ✅ Code reviewed and cleaned up
- ✅ All changes committed to Github

---

# WEEK 3: FINAL PROJECT

---

## Day 11: Final Project Planning & Sprint Setup

### Session Objectives
- Review your requirements document from Day 4
- Assess what's been built vs. what remains
- Plan a realistic 4-day development sprint
- Set up your final project structure

### Session Content

#### Where You Are Now

By the end of Week 2, you have:
- ✅ A working navigation and hero section
- ✅ A functional, validated form
- ✅ A content section (cards/lists)
- ✅ Consistent styling and animations
- ✅ Clean, reviewed code on Github

Now you build the **complete, cohesive project** — connecting all components and completing your Must Have features.

#### Progress Audit

Open your requirements document from Day 4. For each Must Have feature, mark its status:

| Status | Meaning |
|--------|---------|
| ✅ Complete | Built and working |
| 🔄 Partial | Started but needs work |
| ❌ Not Started | Needs to be built |

Be honest. Overestimating progress leads to a rushed launch.

#### Building a 4-Day Sprint Plan

After auditing, plan Days 12–14:

**Sprint Planning Template:**
```
DAY 12 — CORE DEVELOPMENT SPRINT
Focus: Build all remaining Must Have features
Tasks:
  - [ ] Feature: [name] — Est. time: [X] hrs
  - [ ] Feature: [name] — Est. time: [X] hrs
  - [ ] Connect components (navigation links, page flow)
  Total estimate: [X] hrs

DAY 13 — TESTING, ACCESSIBILITY & POLISH
Focus: Quality, not new features
Tasks:
  - [ ] Full user journey test
  - [ ] Accessibility audit
  - [ ] Mobile polish
  - [ ] Content review (spelling, clarity)
  - [ ] Performance optimisation

DAY 14 — DEPLOYMENT & LAUNCH
Focus: Making it live
Tasks:
  - [ ] Final commit
  - [ ] Deploy to Vercel
  - [ ] Test live URL
  - [ ] Share with others
  - [ ] Course retrospective
```

#### Scoping Your Final 4 Days Honestly

**If you're behind:** Focus only on Must Haves. A simple, complete, working project is better than a complex, broken one.

**If you're ahead:** Pick 1–2 Should Have features to add. Don't over-scope.

**What to cut if time is short:**
- Complex animations (static still works)
- Extra pages (a great single page beats multiple broken pages)
- Optional features (move to "future version" list)

#### Finalising Multi-Page vs Single-Page Structure

**Single Page Application (SPA):**
- Everything on one `index.html`
- Sections scroll into view
- Simpler to build and deploy
- Recommended for most projects in this course

**Multi-Page:**
- Separate HTML files (`index.html`, `about.html`, `contact.html`)
- Navigation links to different pages
- Better for content-heavy sites

**Prompt to Claude (if multi-page):**
"Help me create a consistent navigation and footer across multiple HTML pages. I have: index.html, [page2.html], [page3.html]. How do I keep the header and footer in sync without copy-pasting?"

#### Site Content Review

Before building, finalise all your content:
- Headline and subtext copy
- Section headings
- Card descriptions (even if sample data for now)
- CTA button labels
- Form labels and placeholders
- Footer text and links

**Prompt:**
"Review this website copy for clarity and professionalism. Suggest improvements for each section: [paste all text content]"

### Quiz (Day 11)

1. **What is a "sprint" in development?**
   - a) Running code quickly
   - b) A focused, time-boxed period to complete specific tasks
   - c) A type of error
   - d) A design technique

2. **If you're behind on your Must Have features, what should you do?**
   - a) Add new features to compensate
   - b) Focus only on Must Haves; cut Should Haves
   - c) Skip Day 12 and go straight to deployment
   - d) Restart the project

3. **A single-page application (SPA) means:**
   - a) Only one person can use the site
   - b) All content lives on one HTML file, navigated by scrolling
   - c) The site only works on one browser
   - d) No CSS is used

4. **Why do a progress audit before final week?**
   - a) To feel bad about unfinished work
   - b) To honestly assess what remains and plan realistic next steps
   - c) It is required by Github
   - d) Claude needs it

5. **What is the most important quality for a final project?**
   - a) Number of features
   - b) Complex animations
   - c) Being complete, functional, and working correctly
   - d) Number of pages

**Answers:** 1-b, 2-b, 3-b, 4-b, 5-c

### FAQs

**Q: What if I'm significantly behind?**
A: That's okay! Simplify your project scope. Tell Claude: "I have 3 days left. Here's what I've built and what I planned. What can I realistically finish?" It will give you an honest scope.

**Q: Can I change my project idea at this stage?**
A: No — you don't have enough time. Polish and complete what you have.

**Q: Do I need all the features from my requirements?**
A: Only Must Haves. A polished site with 3 working features beats an unfinished site with 8 broken ones.

**Q: What if my site is mostly done?**
A: Excellent! Use the extra time on Day 13 to nail the details — accessibility, performance, copy, and mobile experience. These make a huge difference.

**Q: Should I add a backend or database?**
A: No. localStorage is sufficient for this course. A backend is a separate skillset and would delay your deployment.

### Activity

**Hands-on Task:** Sprint Plan + Site Structure Setup

**Deliverable:** Complete sprint plan document + final project structure committed to Github

**Steps:**
1. **Progress audit (20 mins):** Review each Must Have feature — Complete, Partial, or Not Started
2. **Gap analysis (10 mins):** List exactly what needs to be built
3. **Time estimate (15 mins):** For each remaining task, estimate hours needed. Be realistic.
4. **Build your 4-day sprint plan** using the template above
5. **Content audit (20 mins):** Review and finalise all text content with Claude's help
6. **Project structure cleanup (20 mins):**
   - Organise all files correctly
   - Remove any test or junk files
   - Ensure all CSS variables are consistent
   - Check all file links in index.html
7. Commit: `"Day 11: Sprint plan ready, project structure finalised"`

**Success Criteria:**
- ✅ Progress audit complete and honest
- ✅ Sprint plan written with tasks and time estimates
- ✅ All text content finalised
- ✅ File structure clean and organised
- ✅ Ready to build efficiently for Days 12–13

---

## Day 12: Core Development Sprint

### Session Objectives
- Build all remaining Must Have features
- Connect all components into a cohesive experience
- Commit working code frequently
- Stay focused on the sprint plan

### Session Content

#### Sprint Execution Rules

1. **Work from your sprint plan** — don't get distracted by new ideas
2. **Commit after every completed feature** — never lose progress
3. **If stuck for more than 15 minutes**, paste the problem to Claude — don't sit on it
4. **Mark tasks complete** as you finish them
5. **No perfecting yet** — get it working, polish on Day 13

#### Connecting Components

By now you have separate components. Today you wire them together into a full experience.

**Page flow considerations:**

**Navigation → Sections**
All navigation links should scroll to or open the correct section:
```html
<!-- Navigation link -->
<a href="#features">Features</a>

<!-- Target section -->
<section id="features">...</section>
```

With `scroll-behavior: smooth` in CSS, clicking the nav link smoothly scrolls to the section.

**Prompt:**
"My navigation links don't scroll to my page sections. Here's my nav HTML: [paste]. Here are my section IDs: [list IDs]. How do I connect them?"

**CTA Buttons → Key Actions**

Your hero CTA button should link to the most important action (browse content, open form, sign up).

**Form → Confirmation → Content Update**

If your project uses a form that adds content:
```
After form submission:
1. Save to localStorage
2. Show success message
3. Clear form
4. Redirect or scroll to content section showing the new item
```

**Prompt:**
"Connect my form submission to my content section. When the form is successfully submitted and saved to localStorage, scroll the user to the #content section and refresh the card grid to show the new item."

#### Tackling Remaining Features

For each remaining feature on your sprint plan, use this approach:

**1. Define it precisely**
"I need to build [feature name]. Here's the spec: [paste from requirements doc]"

**2. Generate with Claude**
"Create this feature for my existing project. Here's the current HTML structure: [paste relevant HTML]. Here's my existing CSS theme: [paste variables]. Build the feature to match my existing style."

**3. Implement and test immediately**
Don't accumulate multiple features without testing. Test after each one.

**4. Commit**
`"Add [feature name] feature"`

#### Common Remaining Features and Prompts

**About/Team section:**
"Create an about section for [project name] with a brief description, key values or features (3 cards with icons), and a team member card. Match my existing design system with these CSS variables: [paste variables]."

**Testimonials/Reviews section:**
"Create a testimonials section with 3 quote cards. Each has: quote text, name, and role. Style with large quotation marks and a subtle card design. Responsive — 3 across on desktop, 1 on mobile."

**Stats/Numbers section:**
"Create a statistics section with 4 numbers: [stat 1], [stat 2], [stat 3], [stat 4]. Add a count-up animation that triggers when the section scrolls into view. Clean, bold style."

**Modal/Popup:**
"Add a modal popup that opens when the [button name] is clicked. It contains [content]. Close it by clicking the X button or clicking outside. Include smooth open/close animation."

**Search page or results display:**
"Create a search results section that filters my localStorage items based on a search query. Display results as cards. Show a 'No results found' message when nothing matches."

#### Debugging Checklist for Today

After each feature:
- [ ] Does it display correctly on desktop?
- [ ] Does it display correctly on mobile?
- [ ] Does the JavaScript work without errors? (Check Console)
- [ ] Is it linked/connected to the rest of the site?
- [ ] Did I commit?

### Quiz (Day 12)

1. **What does `scroll-behavior: smooth` combined with anchor links do?**
   - a) Nothing visible
   - b) Animates the scroll when clicking internal navigation links
   - c) Loads external pages smoothly
   - d) Makes images load faster

2. **Why commit after every completed feature?**
   - a) It is not necessary
   - b) To create save points so no work is lost if something breaks
   - c) Github requires it
   - d) To tell Vercel to deploy

3. **If you are stuck on a problem for more than 15 minutes, you should:**
   - a) Give up on the feature
   - b) Keep trying silently
   - c) Paste the problem to Claude with your code and error details
   - d) Start the project over

4. **"Connecting components" means:**
   - a) Using USB cables
   - b) Wiring navigation links, form submissions, and buttons to work together
   - c) Combining CSS files
   - d) Merging Github commits

5. **On sprint day, what should you avoid?**
   - a) Testing your work
   - b) Committing code
   - c) Getting distracted by new feature ideas not in your plan
   - d) Asking Claude for help

**Answers:** 1-b, 2-b, 3-c, 4-b, 5-c

### FAQs

**Q: What if a feature is taking much longer than estimated?**
A: Timebox it — give it one more focused hour. If still stuck, simplify or cut it. Prompt Claude: "Give me a simpler version of [feature] that achieves the same goal."

**Q: My localStorage data doesn't persist between page refreshes. Is that normal?**
A: LocalStorage DOES persist across refreshes. If data disappears, check that you're saving before navigating away. Prompt Claude to debug your save/load functions.

**Q: Can I use a CDN library for a complex feature?**
A: Yes! Libraries from cdnjs.cloudflare.com are safe to use. Just ask Claude: "I want to add [feature]. Is there a lightweight library I can include via CDN? Show me how."

**Q: My site has multiple pages. How do I share a navigation across all of them?**
A: Copy the navigation HTML into each page's `<header>` section. Update the active link class for each page. For automation, see JS template injection (ask Claude for a snippet).

**Q: I finished all my features ahead of schedule. What should I work on?**
A: Add your top Should Have feature from your requirements doc. Or spend the time on a thorough mobile polish pass.

### Activity

**Hands-on Task:** Full Sprint Day

**Deliverable:** All Must Have features complete, site connected and functional

**Steps:**
Work through your sprint plan tasks from Day 11 in order. For each task:

1. Review the feature spec
2. Prompt Claude with full context (existing HTML, CSS variables, feature spec)
3. Implement and test immediately
4. Fix any issues (Console + DevTools)
5. Test on mobile (DevTools device toolbar)
6. Commit with descriptive message

**End of day check:**
- [ ] All Must Have features implemented
- [ ] All navigation links work
- [ ] CTA buttons connect to correct sections/actions
- [ ] No Console errors
- [ ] Committed all work to Github

**Success Criteria:**
- ✅ Sprint plan tasks completed
- ✅ Site functions as a cohesive whole (not disconnected components)
- ✅ All internal links and buttons work
- ✅ Zero Console errors
- ✅ All code committed to Github

---

## Day 13: Testing, Accessibility & Polish

### Session Objectives
- Conduct a thorough end-to-end user journey test
- Identify and fix accessibility issues
- Final mobile and cross-browser polish
- Prepare for deployment

### Session Content

#### End-to-End User Journey Testing

Step into your user's shoes and test the complete experience:

**Journey Test Steps:**

1. **Arrive at the site** — What's the first impression?
2. **Read the hero** — Is the value clear in 5 seconds?
3. **Navigate** — Click every nav link. Do they all work?
4. **Browse content** — Scroll through all sections. Is anything broken?
5. **Use the form** — Submit with invalid data, then valid data.
6. **Use all buttons** — Every CTA, filter, and action button.
7. **Check on mobile** — Repeat the full journey on a phone screen.

**Write down every issue you find.** Fix them all before deployment.

#### Accessibility Basics

Accessibility (a11y) means your site works for everyone, including people who use screen readers, keyboard navigation, or have visual impairments.

**Essential Accessibility Checks:**

**1. Alt text on all images**
```html
<!-- Bad -->
<img src="hero.jpg">

<!-- Good -->
<img src="hero.jpg" alt="A group of students studying together in a library">
```

**2. Form labels properly associated**
```html
<!-- Bad -->
<p>Name</p>
<input type="text">

<!-- Good -->
<label for="name">Name</label>
<input type="text" id="name" name="name">
```

**3. Sufficient colour contrast**
- Use WebAIM Contrast Checker: webaim.org/resources/contrastchecker/
- Or ask Claude: "Check if text colour [hex] on background [hex] meets WCAG AA standard"

**4. Keyboard navigation**
- Tab through your entire site
- Can you reach every button and link with Tab?
- Can you activate them with Enter/Space?

**5. Semantic HTML**
```html
<!-- Bad (divs for everything) -->
<div class="header">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- Good (semantic tags) -->
<header>...</header>
<main>...</main>
<footer>...</footer>
```

**Accessibility audit prompt:**
"Review my HTML for accessibility issues. Check for: missing alt text, unlabelled form inputs, missing ARIA labels, poor heading hierarchy, and non-semantic HTML. Here's the code: [paste HTML]"

#### Cross-Browser Testing

Your site should work in at least the 3 main browsers:
- Chrome (most common)
- Firefox
- Safari (important for iOS users)
- Edge

**Quick cross-browser check:**
Open your Live Server URL in each browser. Look for any visual differences.

**Common cross-browser issues Claude can fix:**
- "My CSS grid looks different in Safari — here's the CSS: [paste]"
- "My animation works in Chrome but not Firefox: [paste CSS]"

#### Content & Copy Final Review

Read every word on your site:
- No typos or spelling errors
- Clear, professional language
- No placeholder text left (like "Lorem ipsum")
- No broken links showing 404
- Contact information accurate

**Spell check prompt:**
"Proofread all text content on my website for spelling, grammar, and clarity. Here's all the text: [paste all visible text content]"

#### Lighthouse Score Audit

In Chrome DevTools → Lighthouse tab → Select "Mobile" → Generate Report.

**Target scores:**
| Category | Target |
|----------|--------|
| Performance | 70+ |
| Accessibility | 90+ |
| Best Practices | 80+ |
| SEO | 80+ |

**Top performance improvements:**
- Add `loading="lazy"` to images below the fold
- Compress large images (use squoosh.app)
- Add `<meta name="description">` tag

**SEO basics prompt:**
"Add proper SEO meta tags to my HTML head section for a site about [your project description]. Include title, description, Open Graph tags for social sharing, and favicon placeholder."

#### Pre-Deployment Checklist

Before Day 14, verify everything:

**Code Quality:**
- [ ] No Console errors in any browser
- [ ] No TODO or debugging comments left in code
- [ ] No unused CSS or JavaScript
- [ ] All files properly linked

**Content:**
- [ ] No Lorem ipsum placeholder text
- [ ] No broken images
- [ ] All links work (internal and external)
- [ ] Favicon present (even a simple emoji one)

**Responsive:**
- [ ] Looks good at 320px (narrowest phones)
- [ ] Looks good at 768px (tablets)
- [ ] Looks good at 1440px (wide desktops)

**Accessibility:**
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Site is navigable by keyboard

**Performance:**
- [ ] No image files over 500KB
- [ ] CSS and JS files linked correctly

### Quiz (Day 13)

1. **What does "alt text" on an image do?**
   - a) Changes image colour
   - b) Describes the image for screen readers and when the image fails to load
   - c) Makes the image load faster
   - d) Adds a caption below the image

2. **WCAG accessibility standards exist to:**
   - a) Make sites load faster
   - b) Ensure websites are usable by people with disabilities
   - c) Improve Google rankings
   - d) Standardise CSS

3. **What is the Lighthouse tool used for?**
   - a) Making sites brighter
   - b) Auditing site performance, accessibility, best practices, and SEO
   - c) Debugging JavaScript
   - d) Uploading to Github

4. **Which HTML element is more semantic for the main content area?**
   - a) `<div class="main">`
   - b) `<section class="content">`
   - c) `<main>`
   - d) `<body>`

5. **Which of these should you fix before deployment?**
   - a) Lorem ipsum placeholder text still visible on the page
   - b) Adding more features
   - c) Changing the colour scheme
   - d) Rewriting all the CSS

**Answers:** 1-b, 2-b, 3-b, 4-c, 5-a

### FAQs

**Q: What if my Lighthouse performance score is very low?**
A: Ask Claude: "My Lighthouse performance score is [X]. Here's my setup: [describe images, fonts, scripts]. Give me the top 5 improvements I can make without changing functionality."

**Q: Do I really need to test in multiple browsers?**
A: At minimum, Chrome and one other. Safari is especially important if your audience includes iPhone users.

**Q: How do I add a favicon?**
A: Ask Claude: "How do I add a simple emoji favicon to my HTML? I want to use the [emoji] emoji."

**Q: What if I find a big bug on Day 13?**
A: Fix it now. This is exactly why Day 13 exists. Don't skip testing to save time.

**Q: Is accessibility really that important for a learning project?**
A: Yes! It's a professional standard, it improves your Lighthouse score, and it teaches you habits that matter in real jobs.

### Activity

**Hands-on Task:** Full Testing & Polish Session

**Deliverable:** Deployment-ready site with Lighthouse scores, committed to Github

**Steps:**
1. **User journey test (30 mins):** Follow every step in the user journey list above. Document issues.
2. **Fix all found issues (20 mins):** Use Claude for each specific fix.
3. **Accessibility audit (20 mins):** Run Claude's accessibility review on your HTML. Apply all suggestions.
4. **Keyboard test (10 mins):** Tab through your entire site. Fix any unreachable elements.
5. **Cross-browser check (15 mins):** Open in Chrome, Firefox, and Safari. Note differences.
6. **Content proofread (15 mins):** Read every word. Fix spelling, grammar, placeholder text.
7. **Lighthouse audit (15 mins):** Generate report on desktop and mobile. Note scores. Fix top 3 issues.
8. **Pre-deployment checklist:** Check every item above.
9. Final commit: `"Day 13: Testing complete, accessibility fixes, pre-deployment polish"`

**Success Criteria:**
- ✅ Full user journey tested with no broken paths
- ✅ Lighthouse Accessibility score 85+
- ✅ No placeholder text visible anywhere
- ✅ All images have alt text
- ✅ No Console errors in Chrome or Firefox
- ✅ Site navigable by keyboard
- ✅ Pre-deployment checklist complete
- ✅ All committed to Github

---

## Day 14: Vercel Deployment & Launch

### Session Objectives
- Deploy your site live to the internet with Vercel
- Understand the deployment process and how it connects to Github
- Test the live URL thoroughly
- Celebrate and reflect on your 14-day journey

### Session Content

#### What is Vercel?

Vercel is a cloud platform that takes your code from Github and makes it available on the internet instantly. Best of all:
- Free for personal projects
- Automatic HTTPS (secure connection)
- Auto-deploys when you push to Github
- Global CDN (fast loading worldwide)
- Custom domain support

#### How Vercel Works with Github

```
You push code to Github
       ↓
Vercel detects the change automatically
       ↓
Vercel builds and deploys your site
       ↓
Live URL updated within 30 seconds
```

This means every future `git push` automatically updates your live site!

#### Deploying to Vercel — Step by Step

**Step 1: Sign in to Vercel**
- Go to vercel.com
- Click "Sign Up" and choose "Continue with Github"
- Authorise Vercel to access your Github

**Step 2: Import Your Repository**
1. Click "Add New" → "Project"
2. You'll see your Github repositories listed
3. Find your project and click "Import"

**Step 3: Configure the Project**
- **Framework Preset:** Select "Other" (since we use plain HTML/CSS/JS)
- **Root Directory:** Leave as is (your project root)
- **Build & Output Settings:** Leave as defaults
- Click "Deploy"

**Step 4: Watch the Deployment**
- Vercel shows a live build log
- Takes 30–60 seconds
- When complete, you'll see a confetti animation and your live URL! 🎉

**Your URL will be:**
`https://your-project-name.vercel.app`

**Step 5: Open and Test**

Immediately open your live URL and test:
- [ ] Site loads correctly
- [ ] All images appear
- [ ] CSS is applied (page doesn't look unstyled)
- [ ] JavaScript works (navigation toggle, form, etc.)
- [ ] Form submission works on the live site
- [ ] Mobile looks correct (test on your actual phone)

#### If Something Breaks on the Live Site

Things sometimes work locally but break on Vercel. Common causes:

| Problem | Cause | Fix |
|---------|-------|-----|
| CSS not loading | Wrong file path | Check case — `Styles.css` ≠ `styles.css` (Linux is case-sensitive) |
| Images missing | Wrong path or missing file | Verify all images are in your Github repo |
| JavaScript error | Relative path issue | Check browser Console on live URL |
| Font not loading | Font file not uploaded | Use Google Fonts CDN link instead of local font files |

**Debugging live site:**
Open DevTools on the live URL — errors will show the exact same way as locally.

#### Adding a Custom Domain (Optional)

Vercel lets you connect a custom domain for free:
1. In your Vercel project → Settings → Domains
2. Add your domain (e.g. `myproject.com`)
3. Follow DNS instructions from your domain registrar

For now, `yourproject.vercel.app` is a perfectly professional URL for sharing.

#### Continuous Deployment in Action

Test that auto-deploy works:
1. Make a small change locally (update a heading text)
2. Save → `git add .` → `git commit -m "Test auto-deploy"` → `git push`
3. Go to Vercel dashboard — you'll see a new deployment start automatically
4. Within 60 seconds, your live site shows the change

This is the power of the full workflow!

#### Sharing Your Work

Your site is live. Share it!

**Where to share:**
- Send the URL to friends and family
- Post on LinkedIn: "I built and deployed my first website in 14 days using no-code tools — without writing code from scratch!"
- Add to your resume or portfolio
- Share in your school, college, or workplace

**What to include when sharing:**
- Live URL
- Brief description of what problem it solves
- What you built (navigation, hero, forms, content sections)
- How you built it (Claude AI, VS Code, Github, Vercel)

#### Course Retrospective

Take 20 minutes to reflect on your 14-day journey. Answer these questions in writing:

**What I built:**
- What does my project do?
- What features does it have?

**What I learned:**
- What was the most useful skill I gained?
- What concept clicked for me that was confusing at the start?

**What challenged me:**
- What was the hardest moment? How did I overcome it?
- What would I do differently next time?

**What's next:**
- What features would I add in a "version 2"?
- What do I want to learn next? (Backend? React? Mobile apps?)
- How could I use this skill in my studies or career?

#### Your Path Forward

You've completed a 14-day no-code crash course. Here's what you're now capable of:

| Skill | What you can do |
|-------|----------------|
| AI Prompting | Communicate clearly with Claude to generate any web component |
| HTML/CSS | Read, organise, and modify web code |
| Responsive Design | Build sites that work on all devices |
| Git/Github | Track, backup, and share your code professionally |
| Vercel Deployment | Launch any static site to the internet in minutes |
| Problem Solving | Debug issues with DevTools and Claude |

**Continue learning:**
- **JavaScript deeper:** freeCodeCamp.org (free)
- **React:** Official React documentation (react.dev)
- **Backend:** Node.js or Python + Flask
- **Databases:** Firebase (free tier) or Supabase
- **CSS Frameworks:** Tailwind CSS or Bootstrap
- **More projects:** Keep building! Every project teaches you more.

### Quiz (Day 14)

1. **What does Vercel do?**
   - a) Writes code
   - b) Tracks code versions
   - c) Deploys your code from Github to a live website
   - d) Edits HTML files

2. **What happens automatically every time you push code to Github (after Vercel is set up)?**
   - a) Nothing
   - b) Vercel rebuilds and deploys your live site
   - c) Github emails you
   - d) VS Code restarts

3. **Why might a site work locally but break on Vercel?**
   - a) Vercel uses a different programming language
   - b) File paths are case-sensitive on Vercel's Linux servers
   - c) Vercel doesn't support HTML
   - d) CSS is not supported on Vercel

4. **What is a CDN?**
   - a) Code Debugging Network
   - b) Content Delivery Network — distributes your site globally for fast loading
   - c) Claude Developer Node
   - d) CSS Design Notation

5. **After 14 days, what have you demonstrated?**
   - a) You can write all code by hand
   - b) You can plan, design, build, debug, and deploy a real website using modern tools
   - c) You are an expert programmer
   - d) You know every HTML tag

**Answers:** 1-c, 2-b, 3-b, 4-b, 5-b

### FAQs

**Q: Is my Vercel site really live for the public?**
A: Yes! Anyone with the URL can access it from anywhere in the world, immediately.

**Q: Will my site stay live after the course?**
A: Yes, as long as your Vercel account is active. The free tier has no time limit.

**Q: Can I update my site after today?**
A: Absolutely! Just make changes locally, commit, and push. Vercel auto-updates within seconds.

**Q: My images aren't loading on the live site. Why?**
A: Check that all images are committed to Github (they should be in your `images/` folder with no `.gitignore` exclusion). Also check that your file paths use lowercase and match exactly.

**Q: Can I use a free custom domain with Vercel?**
A: Vercel doesn't provide free custom domains, but many domain registrars offer free or cheap domains. You can connect any domain to Vercel. Your `.vercel.app` URL is free forever.

**Q: What should I build next?**
A: Build another project! The second is always better than the first. Pick a new problem, apply everything you learned, and add one new skill each time.

### Activity

**Hands-on Task:** Deploy & Celebrate!

**Deliverable:** Live website URL + completed retrospective

**Steps:**

1. **Final local test (10 mins)**
   - Open with Live Server — everything working?
   - Run one last Console check — zero errors?
   - Complete final pre-deployment checklist from Day 13

2. **Push final code to Github (5 mins)**
   ```bash
   git add .
   git commit -m "Final version: [project name] — 14-Day No-Code Course"
   git push
   ```

3. **Deploy to Vercel (15 mins)**
   - Sign into vercel.com with Github
   - Import your repository
   - Configure (Framework: Other)
   - Click Deploy
   - Wait for success screen

4. **Test live URL (20 mins)**
   - Open on your computer
   - Open on your actual phone
   - Click every link and button
   - Submit the form
   - Fix any live-specific issues (see table above), push fix, auto-deploy

5. **Share with 3 people (10 mins)**
   - Send the URL to 3 friends, classmates, or family members
   - Ask them: "What does this site do?" and "What would you improve?"
   - Note their feedback

6. **Write retrospective (20 mins)**
   - Answer all reflection questions above
   - This is your learning record — keep it!

7. **Celebrate! 🎉**
   You built and launched a real website in 14 days.

**Success Criteria:**
- ✅ Site deployed and accessible at a live Vercel URL
- ✅ Live site tested on desktop and mobile
- ✅ No critical errors on the live version
- ✅ URL shared with at least 3 people
- ✅ Retrospective written
- ✅ Proud of what you built!

---

## Course Completion Summary

### What You've Accomplished in 14 Days

| Week | Focus | Output |
|------|-------|--------|
| Week 1 (Days 1–5) | Foundation: Tools, Prompting, Web Basics, Planning, Git | Project brief, requirements doc, project on Github |
| Week 2 (Days 6–10) | Development: Navigation, Hero, Forms, Content, Polish | All major components built, debugged, and styled |
| Week 3 (Days 11–14) | Final Project: Sprint, Connect, Test, Deploy | Live website with custom URL |

### Skills You've Developed

- **AI Collaboration:** Writing effective prompts to generate and refine code
- **Web Literacy:** Reading and understanding HTML, CSS, and JavaScript
- **UI Development:** Building responsive components (navigation, hero, forms, cards)
- **Design Thinking:** Identifying user problems and planning solutions
- **Version Control:** Using Git and Github professionally
- **Deployment:** Launching live websites with Vercel
- **Debugging:** Using DevTools and Claude to solve problems
- **Accessibility:** Building sites that work for everyone

### Recommended Next Steps

1. **Build a second project** applying everything learned
2. **Learn JavaScript more deeply** — freeCodeCamp JavaScript Algorithms certification
3. **Explore React** — The most popular JavaScript framework for building UIs
4. **Study backend basics** — What makes databases and servers work
5. **Join communities** — Dev.to, GitHub, LinkedIn tech communities

---

*Course designed for 2–3 hours of learning and building per day. Adjust pace to your schedule — the skills matter more than the timeline.*