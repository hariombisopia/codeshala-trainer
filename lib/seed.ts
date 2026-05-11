import { db } from './db'
import { makeBlock, p, h, bullets, numbered, code, callout, divider, mcq, trueFalse, activity, faqs } from './seed-helpers'
import type { CurriculumLevel, Session, Block } from './types'

const LEVEL_ID = 'level-14d-fixed'
const S = Array.from({ length: 14 }, (_, i) => `session-14d-day${i + 1}`)

export async function seedCurriculum(): Promise<void> {
  try {
    await db.transaction('rw', [db.curriculum_levels, db.sessions, db.blocks], async () => {
      const blockCount = await db.blocks.count()
      const existing = await db.curriculum_levels.get(LEVEL_ID)
      if (existing && blockCount > 0) return

      const NOW = new Date().toISOString()

      if (existing && blockCount === 0) {
        await db.sessions.where('level_id').equals(LEVEL_ID).delete()
        await db.curriculum_levels.delete(LEVEL_ID)
      }

      const level: CurriculumLevel = {
        id: LEVEL_ID,
        code: '14D',
        title: '14-Day No-Code Development Crash Course',
        description: 'Build your first website/PWA without writing code. Using Claude AI, VS Code, Github, and Vercel.',
        order_index: 0,
        badge_color: 'green',
        total_sessions: 14,
        created_at: NOW,
      }

      const sessions: Session[] = buildSessions(NOW)
      const blocks: Block[] = buildAllBlocks()

      if (!blocks || blocks.length === 0) throw new Error('Block data missing')

      await db.curriculum_levels.add(level)
      await db.sessions.bulkAdd(sessions)
      await db.blocks.bulkAdd(blocks)
    })
  } catch (error) {
    console.error('Failed to seed curriculum:', error)
    throw error
  }
}

function buildSessions(NOW: string): Session[] {
  const data = [
    { title: 'Introduction to No-Code Development', tools: [] },
    { title: 'Mastering AI Prompting with Claude', tools: ['Claude.ai'] },
    { title: 'Web Basics + VS Code Setup', tools: ['VS Code'] },
    { title: 'Problem Identification & Requirements Gathering', tools: ['Claude.ai'] },
    { title: 'Git, Github & Version Control', tools: ['GitHub', 'VS Code'] },
    { title: 'Navigation + Hero Section', tools: ['Claude.ai', 'VS Code', 'GitHub'] },
    { title: 'Forms & User Input', tools: ['Claude.ai', 'VS Code'] },
    { title: 'Content Sections — Cards, Lists & Data Display', tools: ['Claude.ai', 'VS Code'] },
    { title: 'Styling, Animations & Responsive Polish', tools: ['Claude.ai', 'VS Code'] },
    { title: 'Error Handling, Debugging & Code Review', tools: ['VS Code', 'Chrome DevTools'] },
    { title: 'Final Project Planning & Sprint Setup', tools: ['Claude.ai', 'VS Code'] },
    { title: 'Core Development Sprint', tools: ['Claude.ai', 'VS Code', 'GitHub'] },
    { title: 'Testing, Accessibility & Polish', tools: ['VS Code', 'Chrome DevTools'] },
    { title: 'Vercel Deployment & Launch', tools: ['GitHub', 'Vercel'] },
  ]

  return data.map((d, i) => ({
    id: S[i],
    level_id: LEVEL_ID,
    title: d.title,
    description: `Day ${i + 1} of the 14-Day No-Code Crash Course`,
    session_number: i + 1,
    duration_minutes: i === 13 ? 180 : 120,
    objectives: [],
    tools_used: d.tools,
    outcome: '',
    order_index: i,
    created_at: NOW,
  }))
}

function buildAllBlocks(): Block[] {
  return [
    ...day1(), ...day2(), ...day3(), ...day4(), ...day5(),
    ...day6(), ...day7(), ...day8(), ...day9(), ...day10(),
    ...day11(), ...day12(), ...day13(), ...day14(),
  ]
}

// ─── DAY 1: Introduction to No-Code Development ───────────────────────────────
function day1(): Block[] {
  const sid = S[0]
  return [
    makeBlock(sid, 0, 'intro', 'Welcome to the 14-Day No-Code Crash Course', [
      h('Build Your First Website/PWA Without Writing Code'),
      p('Duration: 14 Days (2–3 hours/day) | Stack: Claude AI, VS Code, Github, Vercel'),
      p('Final Outcome: A fully deployed Website or PWA live on the internet.'),
      bullets(['Target: Students (9th grade+) and Professionals', 'Week 1 (Days 1–5): Foundation Training', 'Week 2 (Days 6–10): Guided Development', 'Week 3 (Days 11–14): Final Project']),
      callout('You will not memorise syntax. You will learn to direct AI to build for you.', 'tip'),
    ], 'Start with energy. Ask: "How many of you have ever built a website?" Then say: "By Day 14, every single one of you will have a live product on the internet."', 10),

    makeBlock(sid, 1, 'concept', 'What is No-Code Development?', [
      h('Traditional Coding vs No-Code'),
      p('Analogy: Building a house. Traditional coding is like being a carpenter who crafts each piece of wood from scratch. No-Code is like using pre-made building blocks and having an expert architect (AI) guide you.'),
      callout('Key Concept: You solve problems and create solutions using AI tools and visual interfaces instead of writing complex code line-by-line.', 'info'),
      divider(),
      h('The No-Code Toolkit — Meet Your Team'),
      bullets([
        'Claude AI — Your Development Partner: Understands requirements, generates code, explains concepts, debugs issues. Think of it as a senior developer sitting next to you 24/7.',
        'VS Code — Your Digital Workshop: Stores your code files, lets you view/edit them, connects to Github. Like Microsoft Word, but for code files.',
        'Github — Your Project Safe: Saves every version of your project, enables backup and collaboration. Like Google Drive + Time Machine for code.',
        'Vercel — Your Website Launcher: Takes your code from Github and makes it live on the internet. Like a publishing house that prints your book for the world.',
      ]),
    ], 'Show each tool on screen. Ask if anyone has heard of any of them. Normalise that it\'s okay to know none of them.', 25),

    makeBlock(sid, 2, 'demo', 'The Complete Workflow', [
      h('From Idea to Live Website'),
      numbered([
        'Problem Idea (You)',
        'Requirements (You + Claude)',
        'Code Generation (Claude)',
        'Code Organisation (VS Code)',
        'Version Control (Github)',
        'Live Website (Vercel)',
      ]),
      callout('This workflow is what you will repeat for every feature you build in this course.', 'tip'),
    ], 'Draw this on the whiteboard. Ask students: "Where do you think most of your time will be spent?" Answer: Requirements and testing — not code generation.', 15),

    makeBlock(sid, 3, 'activity', 'Set Up Your Learning Environment', [
      h('Hands-on Task: Set Up All 4 Tools'),
      numbered([
        'Create a Claude.ai account — https://claude.ai',
        'Download and install VS Code — https://code.visualstudio.com',
        'Create a Github account — https://github.com',
        'Create a Vercel account — https://vercel.com',
        'Open all 4 tabs/windows simultaneously',
        'In VS Code, install: Live Server, Prettier, HTML CSS Support, Auto Rename Tag',
        'Write down: "What excites me most about building without code?"',
      ]),
      callout('All 4 tools are free. You will use all of them every day from Day 5 onwards.', 'info'),
    ], 'Walk around the room. Help anyone stuck on account creation. Common issue: VS Code extension search not finding results — check internet connection.', 30,
    { activity_data: activity('Set Up Your Learning Environment', 'Create accounts for all 4 tools and install VS Code extensions.', 30, 'Walk the room. Help with account creation. Ensure everyone has VS Code open with extensions installed.', 'All 4 accounts created, VS Code installed with extensions, all tools open and ready.') }),

    makeBlock(sid, 4, 'quiz', 'Day 1 Knowledge Check', [
      p('Let\'s see what you remember from today\'s session.'),
    ], 'Read each question aloud. Give 20 seconds to think. Reveal the answer and explain.', 10,
    { quiz_data: mcq('What is Github\'s primary role in the no-code workflow?', [
      { text: 'Writing code for you' },
      { text: 'Making your website live on the internet' },
      { text: 'Version control and code storage', correct: true },
      { text: 'Editing your HTML files' },
    ], 'Github is your project safe — it stores every version of your code online. Vercel is what makes it live. VS Code is where you edit. Claude writes the code.') }),

    makeBlock(sid, 5, 'faq', 'Day 1 FAQs', [
      p('Common questions from students on Day 1:'),
    ], 'Pull up this panel when these questions come up. Address them proactively if you see confusion.', 10,
    { faq_items: faqs([
      { q: 'Do I need to know programming before starting?', a: 'No! That\'s the beauty of no-code. You\'ll learn concepts as you build. Prior experience helps but is not required.' },
      { q: 'Can no-code build professional websites?', a: 'Absolutely! Many businesses use no-code tools for production websites and apps. The sites you build in this course will be real, live, professional products.' },
      { q: 'Will I need to pay for these tools?', a: 'Claude (free tier), VS Code (free), Github (free), Vercel (free tier) — all have free options that are more than sufficient for this course.' },
      { q: 'Is this course only for students?', a: 'No! Professionals looking to quickly prototype ideas, switch careers, or add digital skills can benefit equally.' },
      { q: 'What if I get stuck?', a: 'Claude AI is always available to help. Error-handling techniques are covered in Week 2. And your trainer is here every session.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 1 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['What no-code development is and why it matters', 'Your 4-tool stack: Claude, VS Code, Github, Vercel', 'The complete workflow from idea to live website', 'All tools installed and ready']),
      divider(),
      h('Homework'),
      p('Think about a problem you face daily — at school, at home, or in your community. Write 3 sentences about it. Tomorrow you\'ll start turning it into a project idea.'),
      callout('Tomorrow: Mastering AI Prompting with Claude. The better you prompt, the better your results.', 'info'),
    ], 'End on energy. Ask: "What\'s one thing that surprised you today?" Collect attendance. Share tomorrow\'s time.', 10),
  ]
}

// ─── DAY 2: Mastering AI Prompting with Claude ────────────────────────────────
function day2(): Block[] {
  const sid = S[1]
  return [
    makeBlock(sid, 0, 'intro', 'Day 2 — Mastering AI Prompting with Claude', [
      h('Day 2 — Mastering AI Prompting with Claude'),
      p('Analogy: Ordering food at a restaurant. "I want something" gets you a random dish. "I want a vegetarian pizza with extra cheese, thin crust, no olives" gets you exactly what you want.'),
      bullets(['The 4 Pillars of Good Prompts', 'The Prompting Formula', '5 Types of Prompts you will use', 'Practice with real scenarios']),
      callout('Claude is incredibly smart, but clear communication = better results. This is the most important skill in this course.', 'tip'),
    ], 'Start by showing a bad prompt and a good prompt side by side in Claude. Let students see the difference in output quality before teaching the theory.', 10),

    makeBlock(sid, 1, 'concept', 'The 4 Pillars of Good Prompts', [
      h('Pillar 1: BE SPECIFIC'),
      bullets(['Bad: "Make a website"', 'Good: "Create a landing page for a coffee shop with a hero section, menu, and contact form"']),
      divider(),
      h('Pillar 2: PROVIDE CONTEXT'),
      bullets(['Bad: "Add a button"', 'Good: "Add a Download Menu button below the hero image that\'s blue with white text"']),
      divider(),
      h('Pillar 3: MENTION TECHNOLOGY'),
      bullets(['Bad: "Build a contact form"', 'Good: "Build a contact form using HTML and CSS with name, email, and message fields"']),
      divider(),
      h('Pillar 4: ASK FOR EXPLANATIONS'),
      bullets(['"Explain what each part of this code does"', '"Why did you use this approach?"']),
    ], 'Write these 4 pillars on the whiteboard. They stay there for the rest of the course. Every time a student asks "how do I prompt Claude?", point to the board.', 20),

    makeBlock(sid, 2, 'concept', 'The Prompting Formula + 5 Prompt Types', [
      h('The Formula'),
      code('[WHAT you want] + [HOW it should work/look] + [WHY/Context if needed]\n\nExample:\n"Create a responsive navigation menu [WHAT]\nwith Home, About, Services, Contact links that collapses to a hamburger icon on mobile [HOW]\nfor a photography portfolio website [WHY/Context]"', 'text'),
      divider(),
      h('5 Types of Prompts'),
      bullets([
        'Generation: "Create a hero section with heading, subheading, and CTA button"',
        'Modification: "Change the button color from blue to green and make it larger"',
        'Debugging: "This code shows an error: [paste error]. How do I fix it?"',
        'Explanation: "Explain what this CSS flexbox code is doing"',
        'Best Practice: "What\'s the best way to make this form mobile-responsive?"',
      ]),
    ], 'Show each prompt type live in Claude. The debugging prompt is especially important — students will use it constantly.', 20),

    makeBlock(sid, 3, 'demo', 'Bad Prompt vs Good Prompt — Live Comparison', [
      h('Live Demo: See the Difference'),
      numbered([
        'Open Claude.ai',
        'Send this BAD prompt: "Make pricing cards"',
        'Show the generic output',
        'Now send this GOOD prompt: "Create a pricing section with 3 cards (Basic, Pro, Enterprise) displaying price, 5 features each, and a Choose Plan button. Use a modern gradient background."',
        'Show the dramatically better output',
        'Discuss: same task, completely different results',
      ]),
      callout('The only difference was specificity. This is why prompting is a skill worth mastering.', 'tip'),
    ], 'Use this demo to make the lesson concrete. Students should feel the difference viscerally, not just understand it intellectually.', 15),

    makeBlock(sid, 4, 'activity', 'Prompt Practice Challenge', [
      h('Hands-on Task: 5 Prompts Using the 4 Pillars'),
      p('Open Claude.ai and write prompts for these 5 scenarios:'),
      numbered([
        'Ask Claude to create a simple "About Me" section',
        'Request a navigation menu with specific links',
        'Get a contact form with validation',
        'Ask Claude to explain what HTML tags are',
        'Request 3 different colour schemes for a website',
      ]),
      p('For each prompt: write it, get Claude\'s response, screenshot it, and rate yourself — did you follow the 4 pillars?'),
      callout('Self-reflection: Which prompt worked best and why?', 'info'),
    ], 'Walk around and read students\' prompts. Give real-time feedback. Common issue: prompts that are too vague. Push them to add more specificity.', 35,
    { activity_data: activity('Prompt Practice Challenge', 'Write 5 prompts using the 4-pillar formula and screenshot Claude\'s responses.', 35, 'Walk the room. Give real-time feedback on prompt quality. Highlight the best prompts to the class.', '5 prompts written using the formula, each specific and contextual, screenshots saved.') }),

    makeBlock(sid, 5, 'quiz', 'Day 2 Knowledge Check', [], 'Read aloud. Give 20 seconds per question.', 10,
    { quiz_data: mcq('When asking Claude to fix an error, what should you always include?', [
      { text: 'Your favourite colour' },
      { text: 'The error message or the broken code', correct: true },
      { text: 'The time of day' },
      { text: 'Your computer brand' },
    ], 'Always paste the exact error message and the relevant code. Claude can only fix what it can see. "It\'s not working" gives Claude nothing to work with.') }),

    makeBlock(sid, 6, 'faq', 'Day 2 FAQs', [], 'Common prompting questions.', 5,
    { faq_items: faqs([
      { q: 'How long should my prompts be?', a: 'Long enough to be clear, short enough to be focused. Usually 2–4 sentences is perfect. Clarity matters more than length.' },
      { q: 'Can I ask Claude to explain its own code?', a: 'Yes! "Explain this code line by line" is a great prompt and always encouraged. Understanding what you\'re implementing improves your project.' },
      { q: 'What if Claude\'s response isn\'t what I wanted?', a: 'Refine your prompt with more details or say "That\'s close, but can you make it [specific change]?" Iteration is normal and expected.' },
      { q: 'Can I ask Claude for multiple variations?', a: 'Yes! "Give me 3 different design options for this button" works great. More options = better chance of finding what you want.' },
      { q: 'What if I don\'t understand the code Claude generates?', a: 'Ask Claude to explain it! Understanding what you\'re implementing always improves your project and helps you debug later.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 2 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['The 4 Pillars: Specific, Context, Technology, Ask for Explanations', 'The prompting formula: WHAT + HOW + WHY', '5 types of prompts: Generation, Modification, Debugging, Explanation, Best Practice', 'Practiced with 5 real scenarios']),
      divider(),
      h('Homework'),
      p('Use Claude tonight to ask about your problem idea from yesterday. Ask: "What features should a website solving [your problem] have?" Save Claude\'s response.'),
      callout('Tomorrow: Web Basics + VS Code Setup. You\'ll write your first HTML and see it in a browser.', 'info'),
    ], 'Students now have the most important skill in the course. Celebrate that. Tomorrow they start building.', 10),
  ]
}

// ─── DAY 3: Web Basics + VS Code Setup ────────────────────────────────────────
function day3(): Block[] {
  const sid = S[2]
  return [
    makeBlock(sid, 0, 'intro', 'Day 3 — Web Basics + VS Code Setup', [
      h('Day 3 — Web Basics + VS Code Setup'),
      p('Analogy: Building a house. HTML = structure (walls, rooms, doors). CSS = decoration (paint, furniture, style). JavaScript = functionality (lights, plumbing, appliances).'),
      bullets(['The 3 building blocks: HTML, CSS, JavaScript', 'Recognise code patterns without memorising', 'Set up your first project folder in VS Code', 'Preview your project with Live Server']),
      callout('You don\'t write this from scratch — Claude generates it. But you need to recognise these patterns to review and modify Claude\'s output.', 'info'),
    ], 'Open VS Code before class. Have a simple HTML file ready to show. Students should see code on screen from the first minute.', 10),

    makeBlock(sid, 1, 'concept', 'HTML, CSS, and JavaScript', [
      h('HTML — The Skeleton'),
      code('<h1>Heading</h1>          → Main title\n<p>Paragraph text</p>      → Text content\n<button>Click Me</button>  → Interactive button\n<img src="photo.jpg">      → Images\n<div>Container</div>       → Boxes to organise content\n<a href="url">Link</a>     → Clickable links', 'html'),
      divider(),
      h('CSS — The Stylist'),
      code('color: blue;           → Text colour\nbackground: white;     → Background colour\nfont-size: 24px;       → Text size\npadding: 20px;         → Space INSIDE elements\nmargin: 10px;          → Space OUTSIDE elements\ndisplay: flex;         → Modern layout system', 'css'),
      divider(),
      h('JavaScript — The Brain'),
      bullets(['Form validation (checking if email is valid)', 'Button click actions', 'Animations and transitions', 'Pop-up messages and modals']),
      callout('Padding is space INSIDE an element. Margin is space OUTSIDE. Think: padding is the room inside a box, margin is the gap between boxes.', 'tip'),
    ], 'Show each language in a real file. Point to the tags, properties, and functions. Ask students to guess what each line does before explaining.', 25),

    makeBlock(sid, 2, 'concept', 'VS Code Interface + Project Structure', [
      h('VS Code Interface'),
      bullets([
        'Activity Bar (left): Switch between Explorer, Search, Source Control',
        'Editor Area (centre): Where files open and you view/edit code',
        'Terminal (bottom): Built-in command line',
        'Status Bar (very bottom): Shows file info, language, errors',
      ]),
      divider(),
      h('Your Project Structure'),
      code('my-project/\n├── index.html       (Main webpage)\n├── css/\n│   └── styles.css   (Styling)\n├── js/\n│   └── script.js    (Functionality)\n├── images/          (Photos, icons)\n└── README.md        (Project documentation)', 'text'),
      divider(),
      h('Key Shortcuts'),
      bullets(['Save file: Ctrl+S (Windows) / Cmd+S (Mac)', 'New file: Ctrl+N', 'Quick file switch: Ctrl+P', 'Format code: Shift+Alt+F', 'Toggle terminal: Ctrl+`']),
      callout('Enable Auto Save: File → Auto Save. Never lose work again!', 'tip'),
    ], 'Create the folder structure live while students follow along. The physical act of creating the folder makes it real.', 20),

    makeBlock(sid, 3, 'demo', 'Live Server in Action', [
      h('Demo: See Your Code in the Browser Instantly'),
      numbered([
        'Create folder: my-project on Desktop',
        'Open in VS Code (File → Open Folder)',
        'Create index.html inside the folder',
        'Ask Claude: "Create a basic HTML5 starter template with linked CSS and JS files for a portfolio website"',
        'Copy the HTML to index.html',
        'Right-click index.html → "Open with Live Server"',
        'Browser opens automatically showing your page',
        'Make a change in the HTML, save (Ctrl+S), watch the browser refresh instantly',
      ]),
      callout('Live Server is a game changer. No more manual refreshing. Every save = instant preview.', 'tip'),
    ], 'Do this live. The moment students see their code appear in a browser is always exciting. Let the reaction happen.', 15),

    makeBlock(sid, 4, 'activity', 'Set Up Project + Code Detective Challenge', [
      h('Hands-on Task: Project Setup + Code Analysis'),
      numbered([
        'Create your project folder structure (as shown above)',
        'Ask Claude: "Create a basic HTML5 starter template with linked CSS and JS files for a [your project type] website"',
        'Copy HTML to index.html, CSS to css/styles.css, JS to js/script.js',
        'Open with Live Server — you should see your page!',
        'In the HTML Claude gave you, identify: 5 HTML tags and what they do, 5 CSS properties and their effects, any JavaScript present',
        'Ask Claude: "Explain this code section by section"',
        'Compare your guesses with Claude\'s explanation',
      ]),
    ], 'Walk around. Common issues: wrong file extensions (.html.txt), CSS not linking. Check that everyone has Live Server working before moving on.', 35,
    { activity_data: activity('Set Up Project + Code Detective', 'Create project folder, generate starter code with Claude, open with Live Server, identify HTML/CSS/JS sections.', 35, 'Check folder structure. Ensure Live Server is working for everyone. Help with file linking issues.', 'Project folder structured correctly, Live Server working, HTML/CSS/JS sections identified and understood.') }),

    makeBlock(sid, 5, 'quiz', 'Day 3 Knowledge Check', [], 'Quick check on web basics.', 5,
    { quiz_data: mcq('What is the standard name for the main HTML file?', [
      { text: 'main.html' },
      { text: 'home.html' },
      { text: 'index.html', correct: true },
      { text: 'webpage.html' },
    ], 'index.html is the web standard. When a browser visits a folder, it automatically looks for index.html first. Always name your main file index.html.') }),

    makeBlock(sid, 6, 'faq', 'Day 3 FAQs', [], 'Common web basics questions.', 5,
    { faq_items: faqs([
      { q: 'Do I need to memorise all HTML tags?', a: 'No! Claude generates the code. You just need to recognise common patterns. Understanding what tags do is more important than memorising them.' },
      { q: 'Can I mix HTML, CSS, and JavaScript in one file?', a: 'Yes, but separating them is cleaner and more professional. Separate files make it easier to find and edit specific parts.' },
      { q: 'Do I need to use VS Code, or can I use another editor?', a: 'You can use others, but VS Code is the industry standard and has the best extension support for this course.' },
      { q: 'What if Live Server doesn\'t work?', a: 'Check that files are saved, paths are correct in HTML (href="css/styles.css"), and the Live Server extension is installed. Restart VS Code if needed.' },
      { q: 'What if I accidentally delete a file?', a: 'VS Code has Undo for file operations. Once we set up Github tomorrow, you\'ll also have version backups.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 3 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['HTML = structure, CSS = style, JavaScript = functionality', 'VS Code interface and key shortcuts', 'Project folder structure', 'Live Server for instant browser preview']),
      divider(),
      h('Homework'),
      p('Explore your starter page. Ask Claude to change the heading text, background colour, and font. See how CSS changes affect the browser instantly.'),
      callout('Tomorrow: Problem Identification + Requirements. You\'ll define exactly what you\'re building for the next 11 days.', 'info'),
    ], 'Students now have a working development environment. This is a real milestone. Celebrate it.', 10),
  ]
}

// ─── DAY 4: Problem Identification & Requirements Gathering ───────────────────
function day4(): Block[] {
  const sid = S[3]
  return [
    makeBlock(sid, 0, 'intro', 'Day 4 — Problem Identification & Requirements Gathering', [
      h('Day 4 — Problem Identification & Requirements Gathering'),
      p('Bad approach: "I\'ll build a website because everyone has one." Good approach: "Delivery customers struggle to track orders → I\'ll build a tracking dashboard."'),
      bullets(['Find a real problem worth solving', 'Create a project brief', 'MoSCoW method for feature prioritisation', 'Write detailed feature specifications']),
      callout('No-code development is fast, but building the wrong thing fast is still a waste. Plan first.', 'warning'),
    ], 'Ask students to share the problem ideas they thought about for homework. Write them on the whiteboard. This creates energy and shows the variety of possibilities.', 10),

    makeBlock(sid, 1, 'concept', 'The Problem Identification Framework', [
      h('Step 1: Find a Real Problem'),
      p('Ask yourself or others: What tasks take too much time? What\'s frustrating in daily life? What information is hard to find? What processes could be simpler?'),
      bullets([
        'Students: "Finding tutors in my area is confusing" → Tutor directory website',
        'Professionals: "Our team shares files through email" → File-sharing dashboard',
        'Business: "Customers ask the same questions repeatedly" → FAQ page',
      ]),
      divider(),
      h('Step 2: Define Your Users'),
      bullets(['Age group and tech skill level', 'What device will they use? (phone/desktop)', 'What is their main goal?']),
      divider(),
      h('Step 3: Create a Project Brief'),
      code('PROJECT NAME: [Clear, catchy name]\n\nPROBLEM STATEMENT:\n[Who] struggles with [what] because [why]\n\nSOLUTION:\nA [type of website/app] that helps users [do what]\n\nKEY FEATURES (Top 3-5):\n1.\n2.\n3.\n\nOUT OF SCOPE:\n- [Feature too complex]\n- [Feature for later]', 'text'),
    ], 'Walk through a real example. Use a student\'s idea from the whiteboard. Build the brief together as a class before students do their own.', 25),

    makeBlock(sid, 2, 'concept', 'MoSCoW Method + Feature Specifications', [
      h('MoSCoW: Prioritise Your Features'),
      bullets([
        'Must Have: Core functionality required to launch. Can\'t go live without these.',
        'Should Have: Important but not critical. Can add in final days.',
        'Could Have: Nice extras if time allows.',
        'Won\'t Have: Out of scope. Too complex or for future versions.',
      ]),
      callout('A polished site with 3 working features beats an unfinished site with 8 broken ones.', 'tip'),
      divider(),
      h('Feature Specification Template'),
      code('FEATURE NAME: [Clear name]\n\nWHAT IT DOES:\n[User action → System response]\n\nUSER FLOW:\n1. User does X\n2. System shows Y\n3. User completes Z\n\nCOMPONENTS NEEDED:\n- UI elements (buttons, forms, cards)\n- Data to display\n\nACCEPTANCE CRITERIA:\n- [ ] User can do X successfully\n- [ ] Works on mobile and desktop', 'text'),
    ], 'The MoSCoW method is the most important planning tool in this course. Students who skip this end up rebuilding everything in Week 3.', 20),

    makeBlock(sid, 3, 'activity', 'Project Brief + Requirements Document', [
      h('Hands-on Task: Complete Requirements Document'),
      numbered([
        'Brainstorm 3 problem ideas (15 mins) — use the framework above',
        'Pick the best idea — ask: Is it solvable with a website? Can I build it in 10 days? Would 10+ people find it useful?',
        'Create your project brief with Claude: "I want to build [idea]. Help me create a clear project brief with problem statement, solution, target users, and 3-5 key features. Keep it simple for a 10-day build."',
        'MoSCoW categorisation: "Help me categorise these features for my project: [list all ideas]. Use MoSCoW method and explain your reasoning."',
        'Detail each Must Have feature: write user flows, components, and acceptance criteria',
        'Claude review: "Review this requirements document. What\'s missing or unclear? [paste doc]"',
      ]),
      callout('Save this document! You will reference it constantly during development. This is your blueprint.', 'warning'),
    ], 'Circulate and help students who are stuck. Common issue: ideas that are too complex. Push them to simplify. "What is the ONE core thing this does?"', 50,
    { activity_data: activity('Project Brief + Requirements Document', 'Brainstorm 3 ideas, pick 1, create a complete project brief and requirements document with Claude.', 50, 'Help students scope down complex ideas. Ensure everyone has a clear, buildable project by end of session.', '3 ideas brainstormed, 1 selected, complete project brief and MoSCoW requirements document created.') }),

    makeBlock(sid, 4, 'quiz', 'Day 4 Knowledge Check', [], 'Requirements planning check.', 5,
    { quiz_data: mcq('What does "Must Have" mean in the MoSCoW method?', [
      { text: 'Nice animation effects' },
      { text: 'Core functionality required to launch — can\'t go live without it', correct: true },
      { text: 'Future version features' },
      { text: 'Experimental ideas' },
    ], 'Must Have features are your minimum viable product. Without them, the site doesn\'t fulfil its core purpose. Everything else is secondary.') }),

    makeBlock(sid, 5, 'faq', 'Day 4 FAQs', [], 'Common planning questions.', 5,
    { faq_items: faqs([
      { q: 'What if I can\'t think of a problem to solve?', a: 'Look at your daily routine. What\'s annoying? Ask friends what frustrates them. Browse online communities for common complaints.' },
      { q: 'Should my project be completely original?', a: 'No! Improving existing solutions or combining ideas is great. Don\'t reinvent the wheel — make it roll smoother.' },
      { q: 'How do I know if something is "too complex"?', a: 'Ask Claude: "Can I build [X] with HTML/CSS/JavaScript and no backend server?" It will guide you honestly.' },
      { q: 'How detailed should feature specs be?', a: 'Detailed enough that someone else (or Claude) could build it without guessing. If there\'s ambiguity, add clarity.' },
      { q: 'Can I change my project idea later?', a: 'Try to finalise by end of today. Changing midway wastes precious build time. Simplify rather than change.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 4 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Problem identification framework', 'Project brief template', 'MoSCoW method for feature prioritisation', 'Feature specification with user flows and acceptance criteria']),
      divider(),
      h('Homework'),
      p('Review your requirements document tonight. Add anything you missed. Think about what your site will look like — sketch a rough wireframe on paper.'),
      callout('Tomorrow: Git, Github & Version Control. You\'ll push your project online for the first time.', 'info'),
    ], 'Students now have a clear plan. The rest of the course is executing that plan. Celebrate the clarity.', 10),
  ]
}

// ─── DAY 5: Git, Github & Version Control ─────────────────────────────────────
function day5(): Block[] {
  const sid = S[4]
  return [
    makeBlock(sid, 0, 'intro', 'Day 5 — Git, Github & Version Control', [
      h('Day 5 — Git, Github & Version Control'),
      p('Without version control: files named essay_final.doc, essay_final_v2.doc, essay_FINAL_FINAL.doc. With Git: one file, complete history of every change, ability to go back to any version.'),
      bullets(['Git vs Github — they\'re different!', 'Key concepts: commit, push, pull', 'The daily workflow', 'Your first commit and push']),
      callout('All developers use Git. Your Github profile is your developer portfolio. Start building it today.', 'tip'),
    ], 'Ask: "Has anyone ever lost work because they saved over a file?" That\'s the problem Git solves. Make it personal.', 10),

    makeBlock(sid, 1, 'concept', 'Git vs Github + Key Concepts', [
      h('Git vs Github — They\'re Different'),
      bullets([
        'Git: Software on your computer. Tracks changes locally. Like Microsoft Word (software).',
        'Github: Website (github.com). Stores your code online. Like OneDrive (cloud storage).',
      ]),
      divider(),
      h('Key Concepts'),
      bullets([
        'Repository (Repo): Your project folder tracked by Git — contains all files + complete history',
        'Commit: A snapshot of your project at a moment in time. Like saving a checkpoint in a game.',
        'Push: Upload your commits to Github — makes your local changes available online',
        'Pull: Download changes from Github to your computer',
      ]),
      divider(),
      h('The Daily Workflow'),
      numbered(['Make changes to files (VS Code)', 'Save files', 'Stage changes (select what to commit)', 'Commit with message ("Add hero section")', 'Push to Github (upload)']),
    ], 'The Git vs Github distinction confuses many beginners. The analogy to Word/OneDrive usually helps. Repeat it until it clicks.', 20),

    makeBlock(sid, 2, 'demo', 'Setting Up Git + First Push', [
      h('Step-by-Step: Connect Your Project to Github'),
      numbered([
        'Install Git from git-scm.com (Windows) or run git --version in Terminal (Mac)',
        'Configure Git: git config --global user.name "Your Name"',
        'Configure Git: git config --global user.email "your-email@example.com"',
        'Go to github.com → click "+" → "New repository"',
        'Name it to match your local folder. Keep it Public. Don\'t initialise with README.',
        'In VS Code terminal, run the 6 setup commands (shown below)',
        'Refresh Github — your files should appear!',
      ]),
      code('git init\ngit add .\ngit commit -m "Initial commit: Project setup and structure"\ngit branch -M main\ngit remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git\ngit push -u origin main', 'bash'),
      callout('If you get an authentication error: Github requires personal access tokens. Settings → Developer Settings → Personal Access Tokens → Generate new token. Use the token as your password.', 'warning'),
    ], 'Do this live. Go slowly. Wait for everyone to catch up at each step. The first push is always the hardest — after that it\'s easy.', 25),

    makeBlock(sid, 3, 'concept', 'VS Code Git + Good Commit Messages', [
      h('Using VS Code\'s Built-in Git (Easier!)'),
      numbered([
        'Click the Source Control icon (Activity Bar)',
        'See all changed files listed',
        'Click "+" next to a file to stage it',
        'Write a commit message in the text box',
        'Click "✓" to commit',
        'Click "..." → Push',
      ]),
      divider(),
      h('Writing Good Commit Messages'),
      bullets([
        'Bad: "stuff", "changes", "fixed it", "asdfasdf"',
        'Good: "Add hero section to homepage"',
        'Good: "Fix navigation menu on mobile"',
        'Good: "Add contact form with validation"',
      ]),
      callout('Formula: [Action] [What] [Where if needed]. Commit after every completed feature — never lose progress.', 'tip'),
    ], 'Show VS Code\'s Source Control panel. Most students prefer this over terminal commands. Both work — use whichever feels comfortable.', 15),

    makeBlock(sid, 4, 'activity', 'Initialise Git & Make First Commit', [
      h('Hands-on Task: Your Project Live on Github'),
      numbered([
        'Install and configure Git (name + email)',
        'Create your Github repository (match your folder name)',
        'Run the 6 setup commands in VS Code terminal',
        'Refresh Github — your files should appear!',
        'Practice the workflow: make a small change to README.md, stage it, commit ("Update README with project description"), push, verify on Github',
        'Ask Claude: "Create a .gitignore file for a basic HTML/CSS/JS project"',
      ]),
    ], 'Help students who get authentication errors. This is the most common blocker. Personal access tokens solve it every time.', 30,
    { activity_data: activity('Initialise Git & Make First Commit', 'Install Git, create Github repo, push initial commit, practice the commit-push workflow.', 30, 'Help with authentication errors. Ensure everyone has their project visible on Github before ending the session.', 'Git installed, Github repo created, initial commit pushed and visible on Github, practice commit completed.') }),

    makeBlock(sid, 5, 'quiz', 'Day 5 Knowledge Check', [], 'Version control check.', 5,
    { quiz_data: mcq('What does "push" do?', [
      { text: 'Deletes your Github repo' },
      { text: 'Creates a commit' },
      { text: 'Uploads your commits to Github', correct: true },
      { text: 'Downloads changes from Github' },
    ], 'Push uploads your local commits to Github. Pull downloads changes from Github to your computer. Commit creates a snapshot. These three commands are the core of the daily workflow.') }),

    makeBlock(sid, 6, 'faq', 'Day 5 FAQs', [], 'Common Git questions.', 5,
    { faq_items: faqs([
      { q: 'How often should I commit?', a: 'After completing each feature or logical chunk. At minimum, daily. Too many commits is better than too few.' },
      { q: 'Can others see my code on Github?', a: 'If public, yes. That\'s the point — it\'s your portfolio! Keep private repos for sensitive projects.' },
      { q: 'What if I deleted a file by accident?', a: 'If you\'ve committed before, you can restore from Git history. This is why committing frequently is so important.' },
      { q: 'What if I get an authentication error when pushing?', a: 'Github requires personal access tokens. Go to Settings → Developer Settings → Personal Access Tokens → Generate new token. Use the token as your password when pushing.' },
      { q: 'Do I need to learn terminal Git commands?', a: 'For this course, VS Code\'s GUI is enough. But knowing the commands helps with understanding and is useful for advanced work.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 5 Wrap-Up — Week 1 Complete!', [
      h('Week 1 Complete — Foundation Training Done'),
      bullets(['Day 1: Tools and workflow', 'Day 2: AI prompting mastery', 'Day 3: Web basics + VS Code', 'Day 4: Project planning + requirements', 'Day 5: Git + Github version control']),
      divider(),
      h('Week 2 Preview'),
      bullets(['Day 6: Navigation + Hero Section', 'Day 7: Forms & User Input', 'Day 8: Content Sections', 'Day 9: Styling & Polish', 'Day 10: Error Handling & Debugging']),
      callout('Week 2 is where you start building real components. Come ready to build.', 'tip'),
    ], 'Celebrate Week 1 completion. Students now have everything they need to start building. The hard part is over — now comes the fun part.', 10),
  ]
}

// ─── DAY 6: Navigation + Hero Section ────────────────────────────────────────
function day6(): Block[] {
  const sid = S[5]
  return [
    makeBlock(sid, 0, 'intro', 'Day 6 — Navigation + Hero Section', [
      h('Day 6 — Navigation + Hero Section'),
      p('Week 2 starts now. Stop learning theory, start building. Today: the two most important components of any website.'),
      bullets(['The development workflow you\'ll repeat for every component', 'Build a responsive navigation menu', 'Build an impactful hero section', 'CSS Flexbox basics and media queries']),
      callout('The workflow: Define → Prompt Claude → Copy to VS Code → Test with Live Server → Refine → Commit → Push. Repeat for every feature.', 'tip'),
    ], 'Write the workflow on the whiteboard. It stays there for all of Week 2. Students should internalise this loop.', 10),

    makeBlock(sid, 1, 'concept', 'Navigation Menu — What You\'ll Build', [
      h('Responsive Navigation Menu'),
      bullets(['Horizontal links on desktop', 'Hamburger icon on mobile (3 lines)', 'Smooth toggle animation when hamburger is clicked', 'Sticky positioning (stays at top on scroll)', 'Active page highlighting']),
      divider(),
      h('Prompt Template'),
      code('Create a responsive navigation menu:\n\nDESKTOP VIEW:\n- Logo on the left\n- Horizontal menu links on the right: [your links]\n- Sticky positioning (stays at top on scroll)\n- Smooth hover effects (underline animation)\n- Semi-transparent white background with backdrop blur\n\nMOBILE VIEW (below 768px):\n- Logo on left, hamburger icon on right\n- When clicked, menu slides down from top\n- Links stacked vertically\n\nSTYLING:\n- Modern, minimal design\n- Active link highlighted in [your colour]\n- Smooth transitions\n\nProvide complete HTML, CSS, and JavaScript in separate code blocks.', 'text'),
    ], 'Show the prompt template. Emphasise that students should customise it with their own logo name, link labels, and colours.', 15),

    makeBlock(sid, 2, 'concept', 'Hero Section — Design Principles', [
      h('The Hero Section'),
      p('The hero section is the first large section visitors see. It must grab attention immediately.'),
      bullets([
        'Attention-grabbing headline (6–10 words)',
        'Supporting subtext (15–20 words)',
        'Call-to-action (CTA) button: "Get Started", "Learn More", etc.',
        'Background: gradient, solid colour, or image',
      ]),
      divider(),
      h('Design Principles'),
      bullets([
        'Visual Hierarchy: Headline largest → Subtext medium → CTA button contrasting',
        'Contrast: Text must be readable against background',
        'Whitespace: Give elements room to breathe',
        'One focal point: One clear message, one primary action',
      ]),
      code('/* Option A: CSS background image */\n.hero {\n  background-image: url(\'../images/hero-bg.jpg\');\n  background-size: cover;\n  background-position: center;\n}\n\n/* Option B: Gradient (no image needed) */\n.hero {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n}', 'css'),
      callout('Free stock photos: unsplash.com, pexels.com. Gradients are simpler and faster to load.', 'info'),
    ], 'Show examples of good and bad hero sections from real websites. Students learn design by seeing.', 15),

    makeBlock(sid, 3, 'demo', 'CSS Flexbox + Media Queries', [
      h('Key CSS Concepts for Today'),
      h('Flexbox — Arranging Elements'),
      code('.container {\n  display: flex;\n  justify-content: center;   /* Horizontal alignment */\n  align-items: center;       /* Vertical alignment */\n  flex-direction: row;       /* Row or column */\n}', 'css'),
      divider(),
      h('Media Queries — Responsive Design'),
      code('/* Applies only on screens smaller than 768px */\n@media (max-width: 768px) {\n  .nav-links { display: none; }\n  .hamburger { display: block; }\n}', 'css'),
      callout('You don\'t need to memorise these. Recognise them when Claude uses them. Ask Claude to explain any CSS you don\'t understand.', 'info'),
    ], 'Show these in a real file. Point to where Claude uses them in the navigation code. Connect theory to practice immediately.', 10),

    makeBlock(sid, 4, 'activity', 'Build Navigation + Hero Section', [
      h('Hands-on Task: Both Components Working + Committed'),
      h('Navigation (45 mins)'),
      numbered(['Write your spec (logo name, link labels, colours)', 'Prompt Claude using the template above', 'Implement in VS Code (HTML → CSS → JS)', 'Test desktop view + mobile hamburger toggle', 'Refine any issues with Claude', 'Commit: "Add responsive navigation menu with mobile hamburger"']),
      divider(),
      h('Hero Section (45 mins)'),
      numbered(['Write your headline, subtext, and CTA text', 'Choose: gradient, solid, or image background', 'Prompt Claude using the template', 'Implement below navigation in index.html', 'Test responsiveness on multiple sizes', 'Get one person\'s feedback ("What\'s your first impression?")', 'Commit: "Add hero section with headline, CTA, and responsive design"']),
    ], 'Walk around constantly. Students will have very different results — that\'s good. Encourage personalisation. Help with hamburger toggle issues (most common problem).', 90,
    { activity_data: activity('Build Navigation + Hero Section', 'Build both components, test responsiveness, get feedback, commit to Github.', 90, 'Walk the room. Help with hamburger toggle issues. Encourage personalisation. Ensure everyone commits before leaving.', 'Navigation desktop horizontal + mobile hamburger working. Hero headline clear and impactful. Both responsive and committed to Github.') }),

    makeBlock(sid, 5, 'quiz', 'Day 6 Knowledge Check', [], 'Responsive design check.', 5,
    { quiz_data: mcq('Media queries are used for:', [
      { text: 'Contacting the press' },
      { text: 'Asking Claude questions' },
      { text: 'Applying different styles at different screen sizes', correct: true },
      { text: 'Database queries' },
    ], 'Media queries let you apply different CSS rules based on screen size. @media (max-width: 768px) means "apply these styles on screens 768px wide or smaller" — typically phones and small tablets.') }),

    makeBlock(sid, 6, 'faq', 'Day 6 FAQs', [], 'Common component building questions.', 5,
    { faq_items: faqs([
      { q: 'Do I need to understand every line of code?', a: 'Understand the overall flow and key parts. For now, focus on "what it does" not "exact syntax." Understanding improves with practice.' },
      { q: 'What if my hero section looks different to what I expected?', a: 'Refine with Claude! Describe what you want changed specifically. Iteration is normal — most features take 2-4 rounds.' },
      { q: 'Should I use images or gradients?', a: 'Gradients are simpler and faster to load. Use images only if they\'re highly relevant to your project.' },
      { q: 'Can I have multiple CTA buttons?', a: 'One primary CTA is best. If needed, make secondary actions less prominent (outline button vs solid).' },
      { q: 'How do I know if code is "good"?', a: 'Ask Claude: "Review this code. Is it following best practices? Any improvements?" It will give you honest feedback.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 6 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['The development workflow: Define → Prompt → Implement → Test → Refine → Commit', 'Responsive navigation with hamburger menu', 'Hero section with visual hierarchy', 'CSS Flexbox and media queries']),
      divider(),
      h('Homework'),
      p('Show your hero section to someone outside the class. Ask: "What\'s your first impression? What do you think this site is for?" Their answer tells you if your message is clear.'),
      callout('Tomorrow: Forms & User Input. You\'ll build the interactive heart of your project.', 'info'),
    ], 'Students have their first real components. This is a proud moment. Take screenshots of everyone\'s hero sections.', 10),
  ]
}

// ─── DAY 7: Forms & User Input ────────────────────────────────────────────────
function day7(): Block[] {
  const sid = S[6]
  return [
    makeBlock(sid, 0, 'intro', 'Day 7 — Forms & User Input', [
      h('Day 7 — Forms & User Input'),
      p('Forms are how users interact with your website beyond clicking links. They enable contact, sign-ups, search, and data submission.'),
      bullets(['Form anatomy and common input types', 'HTML5 built-in validation', '3 approaches to form submission', 'Form UX best practices']),
      callout('For your project: likely a contact form, session creation form, or search. Check your requirements document.', 'info'),
    ], 'Ask students: "What forms have you filled in online today?" Login, search, checkout — forms are everywhere. Today you build them.', 10),

    makeBlock(sid, 1, 'concept', 'Form Anatomy + Input Types', [
      h('Form Anatomy'),
      code('<form id="contactForm">\n  <label for="name">Full Name</label>\n  <input type="text" id="name" name="name" placeholder="Your Name" required>\n\n  <label for="email">Email Address</label>\n  <input type="email" id="email" name="email" placeholder="Email" required>\n\n  <label for="message">Message</label>\n  <textarea id="message" name="message" placeholder="Your Message" required></textarea>\n\n  <button type="submit">Send Message</button>\n</form>', 'html'),
      divider(),
      h('Common Input Types'),
      bullets([
        'type="text" — General text',
        'type="email" — Email (auto-validates format)',
        'type="tel" — Phone number',
        'type="number" — Numeric input',
        'type="date" — Date picker',
        'type="password" — Hidden text',
        'type="checkbox" — Check boxes',
        'type="radio" — Single-choice options',
      ]),
    ], 'Show a real form in the browser. Open DevTools and inspect the input elements. Students should see the connection between HTML and what they see on screen.', 20),

    makeBlock(sid, 2, 'concept', 'Validation + 3 Submission Approaches', [
      h('HTML5 Built-in Validation (Free, No Code Needed)'),
      code('<input type="email" required>\n<input type="text" minlength="3" maxlength="50">\n<input type="number" min="1" max="100">', 'html'),
      divider(),
      h('3 Approaches to Form Submission'),
      bullets([
        'Option 1: FormSpree (Easiest) — Free service that emails you submissions. No backend needed. Sign up at formspree.io.',
        'Option 2: localStorage (Great for practice) — Saves data in the browser. Perfect for session lists, to-do items, form drafts.',
        'Option 3: Display Only (Simplest) — Form validates but doesn\'t send anywhere. Shows success message. Perfect for learning UX.',
      ]),
      divider(),
      h('Form UX Best Practices'),
      bullets([
        'DO: Clear labels above each field, helpful placeholder text, mark required fields (*), show validation errors clearly, confirm successful submission',
        'DON\'T: Hide error messages, use confusing labels, make inputs too small to tap on mobile, require unnecessary information',
      ]),
    ], 'Show FormSpree setup live. It takes 2 minutes and students can receive real emails from their forms. This makes the project feel real.', 20),

    makeBlock(sid, 3, 'demo', 'Build a Form with Claude', [
      h('Prompt Template for Forms'),
      code('Create a [form type] with these specifications:\n\nFIELDS:\n1. [Field name]: [type], [required/optional], [constraints]\n2. [Field name]: [type], [required/optional], [constraints]\n\nVALIDATION:\n- All required fields must be filled before submission\n- Email must be valid format\n- [Any custom rules]\n\nDESIGN:\n- Modern, clean form design\n- Clear labels above each field\n- Visible red error messages below invalid fields\n- Prominent submit button\n- Success message after submission\n\nFUNCTIONALITY:\n- [FormSpree / localStorage / display only]\n- Prevent submission if validation fails\n- Clear form after successful submission\n\nRESPONSIVE:\n- Full-width inputs on mobile\n- Comfortable touch-friendly spacing\n\nProvide complete HTML, CSS, and JavaScript.', 'text'),
    ], 'Build a contact form live using this template. Show the full cycle: prompt → code → implement → test validation → test submission.', 15),

    makeBlock(sid, 4, 'activity', 'Build a Functional, Validated Form', [
      h('Hands-on Task: Working Form + Committed to Github'),
      numbered([
        'Choose your form type based on your project requirements',
        'List all fields with types, required/optional status, and validation rules',
        'Choose submission method (FormSpree recommended for contact forms)',
        'Prompt Claude using the template above',
        'Implement HTML, CSS, and JS in your project',
        'Test: Submit empty → errors appear. Invalid email → email error. Fill correctly → success message. Test on mobile via DevTools.',
        'Have someone else use the form and watch where they get confused',
        'Refine based on feedback',
        'Commit: "Add [form type] with validation and success confirmation"',
      ]),
    ], 'Walk around. Test each student\'s form yourself. Common issues: validation not triggering, success message not showing, form not clearing after submit.', 50,
    { activity_data: activity('Build a Functional, Validated Form', 'Build a form with validation, test all scenarios, user-test with one person, commit to Github.', 50, 'Test each student\'s form. Check all validation paths. Ensure mobile responsiveness. Help with FormSpree setup.', 'Form validates correctly, error messages clear, success confirmation shows, responsive on mobile, user-tested, committed to Github.') }),

    makeBlock(sid, 5, 'quiz', 'Day 7 Knowledge Check', [], 'Forms check.', 5,
    { quiz_data: mcq('Where does localStorage save data?', [
      { text: 'On the server' },
      { text: 'In the cloud' },
      { text: 'In the user\'s browser', correct: true },
      { text: 'In a database' },
    ], 'localStorage saves data in the user\'s browser. It persists across page refreshes but is browser-specific — data doesn\'t sync across devices. It\'s perfect for this course\'s projects.') }),

    makeBlock(sid, 6, 'faq', 'Day 7 FAQs', [], 'Common form questions.', 5,
    { faq_items: faqs([
      { q: 'Do I need a database for forms?', a: 'Not for this course. Use FormSpree for contact forms or localStorage for practice. A real database is a separate skillset.' },
      { q: 'What if users submit spam?', a: 'For learning, not a concern. In production, use Google reCAPTCHA. FormSpree also has basic spam filtering.' },
      { q: 'Can forms work without JavaScript?', a: 'Basic forms yes, but modern validation and UX features require JavaScript. Claude will generate the JS for you.' },
      { q: 'How do I receive form submissions?', a: 'FormSpree emails them to you. It\'s the simplest solution for static websites with no backend.' },
      { q: 'How do I style error messages?', a: 'Claude will include CSS for error states. Typically: red text, small font, appears below the field. Ask Claude to adjust the style if needed.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 7 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Form anatomy: labels, inputs, textarea, submit button', 'Common input types and HTML5 validation', '3 submission approaches: FormSpree, localStorage, display only', 'Form UX best practices']),
      divider(),
      h('Homework'),
      p('Test your form on your actual phone (not just DevTools). Are the inputs big enough to tap? Does the keyboard cover the form? Fix anything that feels awkward.'),
      callout('Tomorrow: Content Sections — Cards, Lists & Data Display. The core of your project.', 'info'),
    ], 'Students now have interactive forms. Their projects are starting to feel real. Celebrate the progress.', 10),
  ]
}

// ─── DAY 8: Content Sections ──────────────────────────────────────────────────
function day8(): Block[] {
  const sid = S[7]
  return [
    makeBlock(sid, 0, 'intro', 'Day 8 — Content Sections: Cards, Lists & Data Display', [
      h('Day 8 — Content Sections: Cards, Lists & Data Display'),
      p('Content sections are the core of your website — where your main information lives. After the hero grabs attention, content sections deliver on the promise.'),
      bullets(['Build reusable card components', 'CSS Grid for responsive layouts', 'Filtering and search functionality', 'localStorage for dynamic content']),
      callout('Cards are the most reusable UI pattern. Master them and you can build almost any content section.', 'tip'),
    ], 'Show examples of card-based UIs: Airbnb listings, Netflix thumbnails, LinkedIn posts. Students recognise these immediately.', 10),

    makeBlock(sid, 1, 'concept', 'Card Components + CSS Grid', [
      h('Anatomy of a Card'),
      code('<div class="card">\n  <img src="images/thumbnail.jpg" alt="Description" class="card-img">\n  <div class="card-body">\n    <span class="card-tag">Category</span>\n    <h3 class="card-title">Title Here</h3>\n    <p class="card-text">Brief description goes here...</p>\n    <div class="card-meta">\n      <span>📅 Date</span>\n      <span>📍 Location</span>\n    </div>\n    <button class="card-btn">Action</button>\n  </div>\n</div>', 'html'),
      divider(),
      h('CSS Grid — Responsive Without Media Queries'),
      code('.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n  padding: 40px 20px;\n}', 'css'),
      callout('This single CSS rule automatically creates as many columns as fit, and collapses to 1 column on mobile. No media query needed!', 'tip'),
    ], 'Show the grid in action by resizing the browser. Students are always impressed by how auto-fit works.', 20),

    makeBlock(sid, 2, 'concept', 'Filtering, Search + localStorage Cards', [
      h('Adding Search Functionality'),
      code('// Claude will generate something like this\nsearchInput.addEventListener(\'input\', function() {\n  const query = this.value.toLowerCase();\n  cards.forEach(card => {\n    const title = card.querySelector(\'.card-title\').textContent.toLowerCase();\n    card.style.display = title.includes(query) ? \'block\' : \'none\';\n  });\n});', 'javascript'),
      divider(),
      h('Dynamic Cards with localStorage'),
      p('If your project lets users add content (sessions, listings, to-do items):'),
      bullets([
        'Reads items from localStorage and displays them as cards',
        'Has an "Add New" button that opens your form',
        'When a new item is saved, the card grid automatically updates',
        'Each card has a "Delete" button',
        'Shows a friendly empty state when there are no items',
      ]),
    ], 'Show the localStorage cycle live: add an item via form → see it appear as a card → delete it → empty state shows. This is the core interaction of many student projects.', 20),

    makeBlock(sid, 3, 'demo', 'Prompt Templates for Content Sections', [
      h('Prompt Template: Cards + Grid'),
      code('Create a content section for my [project type]:\n\nSECTION PURPOSE:\n[What this section displays]\n\nCARD CONTENT (each card shows):\n- [Field 1]\n- [Field 2]\n- [Field 3]\n- [Action button text]\n\nSAMPLE DATA:\nInclude 6 sample cards with realistic content\n\nLAYOUT:\n- CSS Grid: 3 columns desktop, 2 tablet, 1 mobile\n- Cards have subtle shadow and hover lift effect\n\nFILTERING (if needed):\n- Filter buttons above the grid (by category)\n- "All" button shows everything\n\nSTYLE:\n- Match this colour scheme: [your colours]\n\nProvide complete HTML, CSS, and JavaScript.', 'text'),
    ], 'Build a card section live using this template. Show the filtering working. Students should see the full component before building their own.', 15),

    makeBlock(sid, 4, 'activity', 'Build Your Core Content Section', [
      h('Hands-on Task: Card Grid + Filtering + Committed'),
      numbered([
        'Identify what your content section displays (from your requirements doc)',
        'Write the spec: what does each card/item show?',
        'Decide: do you need filtering? Search? Dynamic add/delete?',
        'Prompt Claude using the template above',
        'Implement in VS Code — test with Live Server',
        'If using localStorage: test the full cycle (add item → see card → delete card)',
        'Check responsiveness: desktop grid → tablet → mobile',
        'Refine any visual inconsistencies',
        'Commit: "Add [content type] grid section with filtering"',
      ]),
    ], 'This is a substantial build. Walk around constantly. Help with localStorage issues — they\'re the most complex part. Celebrate when the add/delete cycle works.', 60,
    { activity_data: activity('Build Core Content Section', 'Build card grid with filtering or search, test localStorage cycle if applicable, commit to Github.', 60, 'Help with localStorage issues. Check grid responsiveness. Ensure filtering works correctly.', 'Cards display with realistic content, grid responsive, filtering/search works, localStorage cycle complete if applicable, committed to Github.') }),

    makeBlock(sid, 5, 'quiz', 'Day 8 Knowledge Check', [], 'Content sections check.', 5,
    { quiz_data: mcq('What does `display: none` do to a card?', [
      { text: 'Deletes it permanently from the HTML' },
      { text: 'Hides it visually but keeps it in the HTML', correct: true },
      { text: 'Makes it transparent' },
      { text: 'Moves it off screen' },
    ], 'display: none hides the element visually but it remains in the HTML. This is how filtering works — cards are hidden/shown based on the filter, not added/removed from the DOM.') }),

    makeBlock(sid, 6, 'faq', 'Day 8 FAQs', [], 'Common content section questions.', 5,
    { faq_items: faqs([
      { q: 'What if I don\'t have real data yet?', a: 'Ask Claude to generate realistic sample data for your project type. It\'s perfect for prototyping and makes the UI look complete.' },
      { q: 'How do I add real images to cards?', a: 'Save images to your images/ folder and update the src path in the HTML. Use unsplash.com for free stock photos.' },
      { q: 'Is localStorage permanent?', a: 'It persists until the user clears their browser data. It\'s browser-specific — data doesn\'t sync across devices. Perfect for this course.' },
      { q: 'My grid doesn\'t look even. How do I fix it?', a: 'Ask Claude: "My CSS Grid cards have uneven heights. How do I make all cards in a row the same height?" Hint: align-items: stretch on the grid container.' },
      { q: 'How do I make cards link to detail pages?', a: 'Wrap the card in an <a> tag, or add an onclick handler. For now, this is an extension challenge — focus on the grid first.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 8 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Card component anatomy', 'CSS Grid with auto-fit for responsive layouts', 'Client-side filtering and search', 'localStorage for dynamic add/delete']),
      divider(),
      h('Homework'),
      p('Add 3 more sample cards to your grid. Make sure they all look consistent. If using localStorage, test adding and deleting items on your phone.'),
      callout('Tomorrow: Styling, Animations & Responsive Polish. Your site goes from functional to professional.', 'info'),
    ], 'Students now have the core of their project working. The site is starting to look like a real product.', 10),
  ]
}

// ─── DAY 9: Styling, Animations & Responsive Polish ──────────────────────────
function day9(): Block[] {
  const sid = S[8]
  return [
    makeBlock(sid, 0, 'intro', 'Day 9 — Styling, Animations & Responsive Polish', [
      h('Day 9 — Styling, Animations & Responsive Polish'),
      p('A site that works is good. A site that works AND feels good to use is memorable. Today you transform your functional components into a polished, professional product.'),
      bullets(['CSS variables — your design system', 'Hover effects and micro-interactions', 'Scroll-triggered animations', 'Full responsiveness audit + footer']),
      callout('The difference: Unpolished = inconsistent colours, abrupt transitions, awkward spacing. Polished = consistent typography, smooth animations, perfect spacing.', 'info'),
    ], 'Show a before/after of a polished vs unpolished version of the same site. The difference is dramatic and motivating.', 10),

    makeBlock(sid, 1, 'concept', 'CSS Variables — Your Design System', [
      h('Define Once, Use Everywhere'),
      code(':root {\n  /* Colours */\n  --primary: #2563eb;\n  --primary-dark: #1d4ed8;\n  --secondary: #10b981;\n  --text-dark: #1f2937;\n  --text-light: #6b7280;\n  --bg-white: #ffffff;\n  --bg-light: #f9fafb;\n  --border: #e5e7eb;\n\n  /* Typography */\n  --font-base: \'Inter\', sans-serif;\n  --text-base: 1rem;\n  --text-lg: 1.125rem;\n  --text-xl: 1.25rem;\n  --text-2xl: 1.5rem;\n  --text-4xl: 2.25rem;\n\n  /* Other */\n  --radius: 8px;\n  --radius-lg: 16px;\n  --shadow: 0 1px 3px rgba(0,0,0,0.12);\n  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);\n  --transition: 0.3s ease;\n}', 'css'),
      callout('Prompt: "Create a CSS variables design system for my [project type]. I want a [modern/professional/minimal] style with a [your colour] accent."', 'tip'),
    ], 'Show how changing one variable updates the entire site. This is the power of a design system.', 15),

    makeBlock(sid, 2, 'concept', 'Animations + Responsiveness', [
      h('Hover Effects (CSS Only)'),
      code('.card {\n  transition: transform var(--transition), box-shadow var(--transition);\n}\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n}\n\n.btn:hover {\n  background: var(--primary-dark);\n  transform: scale(1.02);\n}', 'css'),
      divider(),
      h('Responsiveness Checklist'),
      bullets(['320px — Mobile S: Text readable, no horizontal scroll', '375px — Mobile M: Most common phone size', '768px — Tablet: Grid adjusts, nav changes', '1024px — Laptop: Desktop layout begins', '1440px — Desktop: Wide screen looks balanced']),
      divider(),
      h('Typography Polish'),
      bullets(['Maximum 2 fonts: one for headings, one for body', 'Body text: minimum 16px', 'Line height: 1.5–1.7 for body', 'Paragraph max-width: 65ch for readability']),
      callout('Always animate transform and opacity — never width, height, margin, or top/left. Claude will use the right properties.', 'warning'),
    ], 'Show the responsiveness checklist in DevTools. Test a student\'s site live at each breakpoint. Find and fix issues together.', 20),

    makeBlock(sid, 3, 'activity', 'Full Design Polish Pass', [
      h('Hands-on Task: Visually Consistent, Animated, Fully Responsive Site'),
      numbered([
        'Design System (20 mins): Generate CSS variables and apply them across all CSS files. Replace any hardcoded colours or sizes.',
        'Animations (20 mins): Add hover effects to cards and buttons. Add scroll fade-in to main sections.',
        'Responsiveness audit (30 mins): Test every page at every breakpoint. List all issues found.',
        'Fix all responsiveness issues (20 mins): Prompt Claude with each specific issue.',
        'Typography (15 mins): Apply Google Fonts and proper type scale.',
        'Footer (15 mins): Build and add footer.',
        'Final visual review: Open your site and scroll through. Does it look professional?',
        'Commit: "Polish: design system, animations, responsive fixes, footer"',
      ]),
    ], 'This is a creative session. Encourage experimentation. Walk around and give design feedback. This is where sites go from good to great.', 90,
    { activity_data: activity('Full Design Polish Pass', 'Apply CSS variables, animations, responsive fixes, typography, and footer. Commit everything.', 90, 'Give design feedback. Encourage subtlety over flashiness. Help with colour contrast and readability issues.', 'CSS variables used consistently, hover animations on cards and buttons, no layout breaks at any breakpoint, footer present, typography clean, committed to Github.') }),

    makeBlock(sid, 4, 'quiz', 'Day 9 Knowledge Check', [], 'Design polish check.', 5,
    { quiz_data: mcq('What are CSS variables used for?', [
      { text: 'Storing JavaScript data' },
      { text: 'Defining reusable design tokens like colours, spacing, and fonts', correct: true },
      { text: 'Creating animations' },
      { text: 'Setting page size' },
    ], 'CSS variables (custom properties) let you define values once and reuse them everywhere. Change --primary once and every element using it updates automatically. This is the foundation of a design system.') }),

    makeBlock(sid, 5, 'faq', 'Day 9 FAQs', [], 'Common polish questions.', 5,
    { faq_items: faqs([
      { q: 'How many animations are too many?', a: 'If the user notices the animations more than the content, that\'s too many. Aim for subtle and purposeful. Less is more.' },
      { q: 'Should I use a CSS framework like Bootstrap?', a: 'For this course, pure CSS is better for learning. Bootstrap is great for speed later, but it can hide important concepts.' },
      { q: 'How do I import Google Fonts?', a: 'Ask Claude: "How do I add [Font Name] from Google Fonts to my HTML and CSS?" It will give you the exact link and CSS.' },
      { q: 'My animations feel choppy. Why?', a: 'Always animate transform and opacity — never width, height, margin, or top/left. Claude will use the right properties if you ask it to.' },
      { q: 'What\'s the minimum colour contrast for readability?', a: 'WCAG standard is 4.5:1 for normal text. Ask Claude: "Check if my text colour [X] on background [Y] meets accessibility contrast standards."' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 9 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['CSS variables for a consistent design system', 'Hover effects and scroll animations', 'Full responsiveness audit and fixes', 'Typography polish and footer']),
      divider(),
      h('Homework'),
      p('Show your polished site to someone outside the class. Ask: "Does this look professional? Would you trust this site?" Their answer tells you if the polish worked.'),
      callout('Tomorrow: Error Handling, Debugging & Code Review. Clean up before the final sprint.', 'info'),
    ], 'Sites are now polished and professional. This is a proud moment. Take screenshots before tomorrow\'s changes.', 10),
  ]
}

// ─── DAY 10: Error Handling, Debugging & Code Review ─────────────────────────
function day10(): Block[] {
  const sid = S[9]
  return [
    makeBlock(sid, 0, 'intro', 'Day 10 — Error Handling, Debugging & Code Review', [
      h('Day 10 — Error Handling, Debugging & Code Review'),
      p('Every developer encounters errors. The difference between beginners and professionals is not that professionals don\'t get errors — it\'s that they know how to find and fix them quickly.'),
      bullets(['4 types of errors you\'ll encounter', 'Browser DevTools — your debugging superpower', 'The debugging process', 'Code review with Claude']),
      callout('Today you clean up your project before the final sprint. A clean codebase is faster to build on.', 'info'),
    ], 'Ask: "Has anyone had code that didn\'t work this week?" Everyone has. Today you learn to fix it systematically.', 10),

    makeBlock(sid, 1, 'concept', '4 Types of Errors + DevTools', [
      h('4 Types of Errors'),
      bullets([
        'HTML Errors: Unclosed tags, incorrect file paths, missing required attributes',
        'CSS Errors: Typos in property names, wrong selector, units missing (20 instead of 20px)',
        'JavaScript Errors: Missing brackets, null errors, event listeners not attached',
        'Layout Errors: Content overflowing, elements overlapping, broken responsiveness',
      ]),
      divider(),
      h('Browser DevTools — Open with F12'),
      bullets([
        'Elements Tab: See full HTML structure. Click any element to inspect. Edit HTML live.',
        'Styles Panel (inside Elements): See all CSS applied. Toggle properties on/off. See overridden styles (strikethrough).',
        'Console Tab: See JavaScript errors (red text). Copy error message to paste into Claude.',
        'Network Tab: See if files are loading. Red rows = failed to load (check file path).',
        'Device Toolbar: Toggle mobile view. Test at specific screen sizes.',
      ]),
    ], 'Open DevTools on a real site and walk through each panel. Show a real error in the Console. Students should feel comfortable with DevTools before the final sprint.', 20),

    makeBlock(sid, 2, 'concept', 'The Debugging Process + Common Fixes', [
      h('The 4-Step Debugging Process'),
      numbered([
        'Reproduce the problem: "Does this always happen, or only sometimes? What exact steps cause it?"',
        'Identify where: Visual problem → Elements/Styles tab. JS not working → Console tab. File not loading → Network tab.',
        'Read the error: Console errors tell you exactly what went wrong and which line.',
        'Fix with Claude: "I\'m getting this error: [paste exact error]. Here\'s the relevant code: [paste code]. The error happens when: [describe]. Help me fix this."',
      ]),
      divider(),
      h('Common Fixes Reference'),
      bullets([
        'Image not showing → Wrong file path. Check path matches exactly — case sensitive!',
        'CSS not applying → Wrong selector or typo. Inspect element, check which CSS is applied.',
        'Button click does nothing → JS file not linked or JS error. Check Console.',
        'Mobile layout broken → Missing viewport meta tag. Add <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      ]),
    ], 'Walk through a real debugging session live. Introduce a deliberate error, then find and fix it using DevTools. Students learn by watching the process.', 20),

    makeBlock(sid, 3, 'activity', 'Full Debug & Code Review Session', [
      h('Hands-on Task: Clean, Error-Free Project Ready for Final Sprint'),
      numbered([
        'Console check (15 mins): Open your site, open DevTools Console. Fix every red error.',
        'Link & button audit (10 mins): Click every link and button. Document anything that doesn\'t work.',
        'Form test (15 mins): Test all form validation paths. Fix any that behave unexpectedly.',
        'Responsiveness final check (15 mins): DevTools device toolbar — check 320px, 375px, 768px, 1024px.',
        'Claude code review (20 mins): Paste each major file to Claude for a review. Apply its suggestions.',
        'Performance check (10 mins): Run Lighthouse in DevTools (Lighthouse tab). Note your score.',
        'Clean up (10 mins): Remove commented-out code, console.log() statements, and unused files.',
        'Commit: "Debug: fix errors, code review, performance improvements"',
      ]),
    ], 'Walk around and check each student\'s Console. Zero red errors is the goal before Week 3. Help fix any persistent issues.', 60,
    { activity_data: activity('Full Debug & Code Review Session', 'Fix all Console errors, audit links and buttons, test forms, check responsiveness, Claude code review, clean up.', 60, 'Check each student\'s Console. Zero red errors before Week 3. Help with persistent issues.', 'Zero red errors in Console, all links and buttons work, form validation tested, Lighthouse score noted, code reviewed and cleaned up, committed to Github.') }),

    makeBlock(sid, 4, 'quiz', 'Day 10 Knowledge Check', [], 'Debugging check.', 5,
    { quiz_data: mcq('Where do you find JavaScript errors in DevTools?', [
      { text: 'Elements tab' },
      { text: 'Console tab', correct: true },
      { text: 'Network tab' },
      { text: 'Sources tab' },
    ], 'The Console tab shows JavaScript errors in red. Always check the Console first when something isn\'t working. Copy the exact error message and paste it to Claude for the fastest fix.') }),

    makeBlock(sid, 5, 'faq', 'Day 10 FAQs', [], 'Common debugging questions.', 5,
    { faq_items: faqs([
      { q: 'What if I can\'t find the error?', a: 'Paste your entire file to Claude and say "Find all errors and issues in this code." It will audit the full file.' },
      { q: 'My DevTools shows hundreds of things. Where do I start?', a: 'Always start with the Console. Red error messages are your top priority. Address them first, then warnings.' },
      { q: 'How do I copy an error from the Console?', a: 'Right-click the error → "Copy message" or just select and copy the text. Then paste it directly into Claude.' },
      { q: 'Should I fix every warning (yellow) in the Console?', a: 'Fix errors (red) first. Warnings (yellow) are lower priority but good to address before launch.' },
      { q: 'How do I know if my site is fast enough?', a: 'In Chrome DevTools → Lighthouse tab → Generate Report. Aim for 80+ on performance and accessibility.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 10 Wrap-Up — Week 2 Complete!', [
      h('Week 2 Complete — Guided Development Done'),
      bullets(['Day 6: Navigation + Hero Section', 'Day 7: Forms & User Input', 'Day 8: Content Sections', 'Day 9: Styling & Polish', 'Day 10: Error Handling & Debugging']),
      divider(),
      h('Week 3 Preview — Final Project'),
      bullets(['Day 11: Sprint planning + project structure', 'Day 12: Core development sprint', 'Day 13: Testing, accessibility & polish', 'Day 14: Vercel deployment & launch']),
      callout('Week 3 is where it all comes together. Come ready to build your complete, cohesive project.', 'tip'),
    ], 'Celebrate Week 2 completion. Students have all the skills they need. Week 3 is execution. Build confidence before the final sprint.', 10),
  ]
}

// ─── DAY 11: Final Project Planning & Sprint Setup ────────────────────────────
function day11(): Block[] {
  const sid = S[10]
  return [
    makeBlock(sid, 0, 'intro', 'Day 11 — Final Project Planning & Sprint Setup', [
      h('Day 11 — Final Project Planning & Sprint Setup'),
      p('By the end of Week 2, you have: a working navigation and hero section, a functional validated form, a content section, consistent styling, and clean reviewed code on Github.'),
      p('Now you build the complete, cohesive project — connecting all components and completing your Must Have features.'),
      bullets(['Progress audit: what\'s built vs what remains', 'Build a realistic 4-day sprint plan', 'Finalise site structure and content', 'Set up for efficient building']),
      callout('A polished site with 3 working features beats an unfinished site with 8 broken ones. Be honest about your progress.', 'warning'),
    ], 'Ask students to open their requirements document from Day 4. This is the moment of truth — how much is done?', 10),

    makeBlock(sid, 1, 'concept', 'Progress Audit + Sprint Planning', [
      h('Progress Audit'),
      p('For each Must Have feature, mark its status:'),
      bullets(['✅ Complete — Built and working', '🔄 Partial — Started but needs work', '❌ Not Started — Needs to be built']),
      callout('Be honest. Overestimating progress leads to a rushed launch.', 'warning'),
      divider(),
      h('4-Day Sprint Plan Template'),
      code('DAY 12 — CORE DEVELOPMENT SPRINT\nFocus: Build all remaining Must Have features\nTasks:\n  - [ ] Feature: [name] — Est. time: [X] hrs\n  - [ ] Connect components (navigation links, page flow)\n\nDAY 13 — TESTING, ACCESSIBILITY & POLISH\nFocus: Quality, not new features\nTasks:\n  - [ ] Full user journey test\n  - [ ] Accessibility audit\n  - [ ] Mobile polish\n  - [ ] Content review\n\nDAY 14 — DEPLOYMENT & LAUNCH\nFocus: Making it live\nTasks:\n  - [ ] Final commit\n  - [ ] Deploy to Vercel\n  - [ ] Test live URL\n  - [ ] Share with others', 'text'),
    ], 'Walk through the sprint planning template with the class. Help students be realistic about time estimates. 1 feature = 1-2 hours is a good rule of thumb.', 20),

    makeBlock(sid, 2, 'concept', 'Scoping + Multi-Page vs Single-Page', [
      h('Scoping Your Final Days Honestly'),
      bullets([
        'If you\'re behind: Focus only on Must Haves. A simple, complete, working project is better than a complex, broken one.',
        'If you\'re ahead: Pick 1-2 Should Have features to add. Don\'t over-scope.',
        'What to cut if time is short: Complex animations, extra pages, optional features.',
      ]),
      divider(),
      h('Single-Page vs Multi-Page'),
      bullets([
        'Single Page (Recommended): Everything on one index.html. Sections scroll into view. Simpler to build and deploy.',
        'Multi-Page: Separate HTML files (index.html, about.html, contact.html). Better for content-heavy sites.',
      ]),
      callout('For most projects in this course, a great single-page site beats multiple mediocre pages.', 'tip'),
    ], 'Help students make the single vs multi-page decision based on their project. Most should choose single-page.', 15),

    makeBlock(sid, 3, 'activity', 'Sprint Plan + Site Structure Setup', [
      h('Hands-on Task: Complete Sprint Plan + Structure Committed'),
      numbered([
        'Progress audit (20 mins): Review each Must Have feature — Complete, Partial, or Not Started',
        'Gap analysis (10 mins): List exactly what needs to be built',
        'Time estimate (15 mins): For each remaining task, estimate hours needed. Be realistic.',
        'Build your 4-day sprint plan using the template above',
        'Content audit (20 mins): Review and finalise all text content with Claude\'s help. Prompt: "Review this website copy for clarity and professionalism: [paste all text]"',
        'Project structure cleanup (20 mins): Organise all files, remove test/junk files, ensure CSS variables are consistent, check all file links in index.html',
        'Commit: "Day 11: Sprint plan ready, project structure finalised"',
      ]),
    ], 'Circulate and review each student\'s sprint plan. Push back on unrealistic estimates. Help students scope down if needed.', 60,
    { activity_data: activity('Sprint Plan + Site Structure Setup', 'Complete progress audit, write 4-day sprint plan, finalise content, clean up project structure.', 60, 'Review each sprint plan. Push back on unrealistic estimates. Help scope down if needed.', 'Progress audit complete, sprint plan written with tasks and time estimates, content finalised, file structure clean, committed to Github.') }),

    makeBlock(sid, 4, 'quiz', 'Day 11 Knowledge Check', [], 'Sprint planning check.', 5,
    { quiz_data: mcq('What is the most important quality for a final project?', [
      { text: 'Number of features' },
      { text: 'Complex animations' },
      { text: 'Being complete, functional, and working correctly', correct: true },
      { text: 'Number of pages' },
    ], 'A complete, working project with 3 features is always better than an incomplete project with 8 broken features. Quality over quantity. This is true in professional development too.') }),

    makeBlock(sid, 5, 'faq', 'Day 11 FAQs', [], 'Common sprint planning questions.', 5,
    { faq_items: faqs([
      { q: 'What if I\'m significantly behind?', a: 'That\'s okay! Simplify your project scope. Tell Claude: "I have 3 days left. Here\'s what I\'ve built and what I planned. What can I realistically finish?" It will give you an honest scope.' },
      { q: 'Can I change my project idea at this stage?', a: 'No — you don\'t have enough time. Polish and complete what you have. Simplify rather than change direction.' },
      { q: 'Do I need all the features from my requirements?', a: 'Only Must Haves. A polished site with 3 working features beats an unfinished site with 8 broken ones.' },
      { q: 'What if my site is mostly done?', a: 'Excellent! Use the extra time on Day 13 to nail the details — accessibility, performance, copy, and mobile experience. These make a huge difference.' },
      { q: 'Should I add a backend or database?', a: 'No. localStorage is sufficient for this course. A backend is a separate skillset and would delay your deployment.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 11 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Progress audit — honest assessment of what\'s done', 'Sprint planning for Days 12-14', 'Scoping decisions — what to build vs cut', 'Project structure cleanup']),
      divider(),
      h('Tonight'),
      p('Review your sprint plan. Is it realistic? Can you actually build everything in Day 12? If not, cut something now rather than on Day 13.'),
      callout('Tomorrow: Core Development Sprint. Come ready to build. No distractions.', 'tip'),
    ], 'Students now have a clear plan for the final 3 days. The anxiety of "what do I build?" is replaced by a concrete task list.', 10),
  ]
}

// ─── DAY 12: Core Development Sprint ─────────────────────────────────────────
function day12(): Block[] {
  const sid = S[11]
  return [
    makeBlock(sid, 0, 'intro', 'Day 12 — Core Development Sprint', [
      h('Day 12 — Core Development Sprint'),
      p('Today is a full build day. Work from your sprint plan. No new ideas. No distractions. Just build.'),
      bullets(['Sprint execution rules', 'Connecting all components', 'Tackling remaining features', 'Debugging checklist after each feature']),
      callout('Rule: If stuck for more than 15 minutes, paste the problem to Claude. Don\'t sit on it.', 'warning'),
    ], 'Set the tone: this is a focused work session. Play background music. Walk around constantly. Keep energy high.', 10),

    makeBlock(sid, 1, 'concept', 'Sprint Rules + Connecting Components', [
      h('Sprint Execution Rules'),
      numbered([
        'Work from your sprint plan — don\'t get distracted by new ideas',
        'Commit after every completed feature — never lose progress',
        'If stuck for more than 15 minutes, paste the problem to Claude',
        'Mark tasks complete as you finish them',
        'No perfecting yet — get it working, polish on Day 13',
      ]),
      divider(),
      h('Connecting Components — Navigation to Sections'),
      code('<!-- Navigation link -->\n<a href="#features">Features</a>\n\n<!-- Target section -->\n<section id="features">...</section>', 'html'),
      code('/* In CSS */\nhtml {\n  scroll-behavior: smooth;\n}', 'css'),
      callout('Prompt: "My navigation links don\'t scroll to my page sections. Here\'s my nav HTML: [paste]. Here are my section IDs: [list IDs]. How do I connect them?"', 'tip'),
    ], 'Show the anchor link + scroll-behavior pattern live. This is the most common "connecting" task students need.', 15),

    makeBlock(sid, 2, 'concept', 'Common Remaining Features + Prompts', [
      h('Prompts for Common Remaining Features'),
      bullets([
        'About/Team section: "Create an about section for [project name] with a brief description, key values (3 cards with icons), and a team member card. Match my existing CSS variables: [paste variables]."',
        'Testimonials: "Create a testimonials section with 3 quote cards. Each has: quote text, name, and role. Style with large quotation marks. Responsive — 3 across desktop, 1 on mobile."',
        'Stats/Numbers: "Create a statistics section with 4 numbers: [stat 1], [stat 2], [stat 3], [stat 4]. Add a count-up animation that triggers when the section scrolls into view."',
        'Modal/Popup: "Add a modal popup that opens when [button name] is clicked. It contains [content]. Close by clicking X or clicking outside. Include smooth open/close animation."',
      ]),
      divider(),
      h('Debugging Checklist After Each Feature'),
      bullets(['Does it display correctly on desktop?', 'Does it display correctly on mobile?', 'Does the JavaScript work without errors? (Check Console)', 'Is it linked/connected to the rest of the site?', 'Did I commit?']),
    ], 'These prompts are ready to use. Students should copy and customise them for their specific project.', 15),

    makeBlock(sid, 3, 'activity', 'Full Sprint Day', [
      h('Hands-on Task: All Must Have Features Complete'),
      p('Work through your sprint plan tasks from Day 11 in order. For each task:'),
      numbered([
        'Review the feature spec from your requirements document',
        'Prompt Claude with full context (existing HTML, CSS variables, feature spec)',
        'Implement and test immediately',
        'Fix any issues (Console + DevTools)',
        'Test on mobile (DevTools device toolbar)',
        'Commit with descriptive message',
      ]),
      divider(),
      h('End of Day Check'),
      bullets(['All Must Have features implemented', 'All navigation links work', 'CTA buttons connect to correct sections/actions', 'No Console errors', 'All code committed to Github']),
    ], 'This is a full build session. Walk around constantly. Help unblock students quickly. Keep the energy high. Celebrate each completed feature.', 90,
    { activity_data: activity('Full Sprint Day', 'Build all remaining Must Have features, connect all components, commit after each feature.', 90, 'Walk constantly. Unblock students quickly. Celebrate each completed feature. Ensure everyone commits before leaving.', 'All Must Have features implemented, site functions as a cohesive whole, all internal links work, zero Console errors, all code committed to Github.') }),

    makeBlock(sid, 4, 'quiz', 'Day 12 Knowledge Check', [], 'Sprint execution check.', 5,
    { quiz_data: mcq('Why commit after every completed feature?', [
      { text: 'It is not necessary' },
      { text: 'To create save points so no work is lost if something breaks', correct: true },
      { text: 'Github requires it' },
      { text: 'To tell Vercel to deploy' },
    ], 'Committing frequently creates save points. If you break something, you can always go back to the last working commit. This is the safety net that lets you experiment confidently.') }),

    makeBlock(sid, 5, 'faq', 'Day 12 FAQs', [], 'Common sprint day questions.', 5,
    { faq_items: faqs([
      { q: 'What if a feature is taking much longer than estimated?', a: 'Timebox it — give it one more focused hour. If still stuck, simplify or cut it. Prompt Claude: "Give me a simpler version of [feature] that achieves the same goal."' },
      { q: 'My localStorage data doesn\'t persist between page refreshes. Is that normal?', a: 'localStorage DOES persist across refreshes. If data disappears, check that you\'re saving before navigating away. Prompt Claude to debug your save/load functions.' },
      { q: 'My site has multiple pages. How do I share a navigation across all of them?', a: 'Copy the navigation HTML into each page\'s header section. Update the active link class for each page. Ask Claude for a JS template injection snippet for automation.' },
      { q: 'I finished all my features ahead of schedule. What should I work on?', a: 'Add your top Should Have feature from your requirements doc. Or spend the time on a thorough mobile polish pass.' },
      { q: 'Can I use a CDN library for a complex feature?', a: 'Yes! Libraries from cdnjs.cloudflare.com are safe to use. Ask Claude: "I want to add [feature]. Is there a lightweight library I can include via CDN?"' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 12 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Sprint execution rules', 'Connecting navigation to sections with anchor links', 'Building remaining features with Claude', 'Debugging checklist after each feature']),
      divider(),
      h('Tonight'),
      p('Review your site end-to-end. Click every link, test every form, check every button. Write down anything that feels broken or incomplete. Tomorrow is your last chance to fix it.'),
      callout('Tomorrow: Testing, Accessibility & Polish. Quality day — no new features.', 'info'),
    ], 'Students should have a complete, connected site by end of today. Celebrate the milestone. Tomorrow is about quality, not quantity.', 10),
  ]
}

// ─── DAY 13: Testing, Accessibility & Polish ─────────────────────────────────
function day13(): Block[] {
  const sid = S[12]
  return [
    makeBlock(sid, 0, 'intro', 'Day 13 — Testing, Accessibility & Polish', [
      h('Day 13 — Testing, Accessibility & Polish'),
      p('Today is quality day. No new features. Only testing, fixing, and polishing. This is what separates a good project from a great one.'),
      bullets(['End-to-end user journey testing', 'Accessibility basics (a11y)', 'Cross-browser testing', 'Lighthouse audit + pre-deployment checklist']),
      callout('If you find a big bug today, fix it now. This is exactly why Day 13 exists.', 'warning'),
    ], 'Set the tone: today is about quality, not quantity. Students who rush through testing regret it on Day 14 when their live site has obvious issues.', 10),

    makeBlock(sid, 1, 'concept', 'End-to-End User Journey Testing', [
      h('Step Into Your User\'s Shoes'),
      numbered([
        'Arrive at the site — What\'s the first impression?',
        'Read the hero — Is the value clear in 5 seconds?',
        'Navigate — Click every nav link. Do they all work?',
        'Browse content — Scroll through all sections. Is anything broken?',
        'Use the form — Submit with invalid data, then valid data.',
        'Use all buttons — Every CTA, filter, and action button.',
        'Check on mobile — Repeat the full journey on a phone screen.',
      ]),
      callout('Write down every issue you find. Fix them all before deployment.', 'warning'),
    ], 'Do this journey test live on a student\'s site (with their permission). Find real issues together. This makes the process concrete.', 15),

    makeBlock(sid, 2, 'concept', 'Accessibility Basics', [
      h('Accessibility (a11y) — Your Site Works for Everyone'),
      h('1. Alt text on all images'),
      code('<!-- Bad -->\n<img src="hero.jpg">\n\n<!-- Good -->\n<img src="hero.jpg" alt="A group of students studying together in a library">', 'html'),
      h('2. Form labels properly associated'),
      code('<!-- Bad -->\n<p>Name</p>\n<input type="text">\n\n<!-- Good -->\n<label for="name">Name</label>\n<input type="text" id="name" name="name">', 'html'),
      h('3. Semantic HTML'),
      code('<!-- Bad (divs for everything) -->\n<div class="header">...</div>\n<div class="content">...</div>\n\n<!-- Good (semantic tags) -->\n<header>...</header>\n<main>...</main>\n<footer>...</footer>', 'html'),
      callout('Accessibility audit prompt: "Review my HTML for accessibility issues. Check for: missing alt text, unlabelled form inputs, missing ARIA labels, poor heading hierarchy. Here\'s the code: [paste HTML]"', 'tip'),
    ], 'Accessibility is a professional standard. It improves Lighthouse scores and teaches habits that matter in real jobs.', 20),

    makeBlock(sid, 3, 'concept', 'Lighthouse Audit + Pre-Deployment Checklist', [
      h('Lighthouse Score Targets'),
      bullets(['Performance: 70+', 'Accessibility: 90+', 'Best Practices: 80+', 'SEO: 80+']),
      p('In Chrome DevTools → Lighthouse tab → Select "Mobile" → Generate Report.'),
      divider(),
      h('Pre-Deployment Checklist'),
      bullets([
        'Code Quality: No Console errors, no TODO comments, no unused CSS/JS, all files properly linked',
        'Content: No Lorem ipsum placeholder text, no broken images, all links work, favicon present',
        'Responsive: Looks good at 320px, 768px, and 1440px',
        'Accessibility: All images have alt text, all form inputs have labels, site navigable by keyboard',
        'Performance: No image files over 500KB, CSS and JS files linked correctly',
      ]),
      callout('SEO basics prompt: "Add proper SEO meta tags to my HTML head section for a site about [your project description]. Include title, description, and Open Graph tags."', 'tip'),
    ], 'Run Lighthouse on a student\'s site live. Show what the scores mean and how to improve them.', 15),

    makeBlock(sid, 4, 'activity', 'Full Testing & Polish Session', [
      h('Hands-on Task: Deployment-Ready Site'),
      numbered([
        'User journey test (30 mins): Follow every step in the journey list above. Document all issues.',
        'Fix all found issues (20 mins): Use Claude for each specific fix.',
        'Accessibility audit (20 mins): Run Claude\'s accessibility review on your HTML. Apply all suggestions.',
        'Keyboard test (10 mins): Tab through your entire site. Fix any unreachable elements.',
        'Cross-browser check (15 mins): Open in Chrome, Firefox, and Safari. Note differences.',
        'Content proofread (15 mins): Read every word. Fix spelling, grammar, placeholder text.',
        'Lighthouse audit (15 mins): Generate report on desktop and mobile. Fix top 3 issues.',
        'Pre-deployment checklist: Check every item above.',
        'Final commit: "Day 13: Testing complete, accessibility fixes, pre-deployment polish"',
      ]),
    ], 'Walk around with your phone. Test each student\'s site on a real device. Real devices reveal issues that DevTools misses.', 90,
    { activity_data: activity('Full Testing & Polish Session', 'User journey test, accessibility audit, cross-browser check, content proofread, Lighthouse audit, pre-deployment checklist.', 90, 'Walk around with your phone. Test on real devices. Help fix any blocking issues before deployment.', 'Full user journey tested, Lighthouse Accessibility 85+, no placeholder text, all images have alt text, no Console errors, pre-deployment checklist complete, committed to Github.') }),

    makeBlock(sid, 5, 'quiz', 'Day 13 Knowledge Check', [], 'Testing and accessibility check.', 5,
    { quiz_data: mcq('What does "alt text" on an image do?', [
      { text: 'Changes image colour' },
      { text: 'Describes the image for screen readers and when the image fails to load', correct: true },
      { text: 'Makes the image load faster' },
      { text: 'Adds a caption below the image' },
    ], 'Alt text serves two purposes: it describes the image to screen readers (used by visually impaired users) and it displays as text when the image fails to load. Both are important for accessibility and user experience.') }),

    makeBlock(sid, 6, 'faq', 'Day 13 FAQs', [], 'Common testing questions.', 5,
    { faq_items: faqs([
      { q: 'What if my Lighthouse performance score is very low?', a: 'Ask Claude: "My Lighthouse performance score is [X]. Here\'s my setup: [describe images, fonts, scripts]. Give me the top 5 improvements I can make without changing functionality."' },
      { q: 'Do I really need to test in multiple browsers?', a: 'At minimum, Chrome and one other. Safari is especially important if your audience includes iPhone users.' },
      { q: 'How do I add a favicon?', a: 'Ask Claude: "How do I add a simple emoji favicon to my HTML? I want to use the [emoji] emoji." It\'s a one-line addition to your HTML head.' },
      { q: 'Is accessibility really that important for a learning project?', a: 'Yes! It\'s a professional standard, it improves your Lighthouse score, and it teaches habits that matter in real jobs.' },
      { q: 'What if I find a big bug on Day 13?', a: 'Fix it now. This is exactly why Day 13 exists. Don\'t skip testing to save time — you\'ll regret it on Day 14.' },
    ]) }),

    makeBlock(sid, 7, 'wrapup', 'Day 13 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['End-to-end user journey testing', 'Accessibility: alt text, form labels, semantic HTML', 'Lighthouse audit and score targets', 'Pre-deployment checklist']),
      divider(),
      h('Tonight'),
      p('Your site should be deployment-ready. Do one final review. Open it on your phone. Show it to someone. If anything feels wrong, fix it tonight.'),
      callout('Tomorrow: DEPLOYMENT DAY. Your site goes live on the internet. Come ready to celebrate.', 'tip'),
    ], 'Students should feel confident and proud. Tomorrow is the culmination of 14 days of work. Build excitement.', 10),
  ]
}

// ─── DAY 14: Vercel Deployment & Launch ──────────────────────────────────────
function day14(): Block[] {
  const sid = S[13]
  return [
    makeBlock(sid, 0, 'intro', 'Day 14 — Vercel Deployment & Launch', [
      h('Day 14 — DEPLOYMENT DAY'),
      p('Today your project becomes a real website with a real URL that anyone in the world can visit.'),
      bullets(['Deploy to Vercel — step by step', 'Test the live URL thoroughly', 'Continuous deployment in action', 'Share your work with the world']),
      callout('After today, you can share your site on LinkedIn, your CV, and with potential employers. This is real.', 'tip'),
    ], 'High energy day. Have the deployment flow ready to demonstrate. Set up the room for a celebration. This is the finish line.', 15),

    makeBlock(sid, 1, 'concept', 'What is Vercel + How It Works', [
      h('What is Vercel?'),
      p('Vercel is a cloud platform that takes your code from Github and makes it available on the internet instantly.'),
      bullets(['Free for personal projects', 'Automatic HTTPS (secure connection)', 'Auto-deploys when you push to Github', 'Global CDN (fast loading worldwide)', 'Custom domain support']),
      divider(),
      h('How Vercel Works with Github'),
      numbered([
        'You push code to Github',
        'Vercel detects the change automatically',
        'Vercel builds and deploys your site',
        'Live URL updated within 30 seconds',
      ]),
      callout('Every future git push automatically updates your live site. This is continuous deployment — a professional workflow.', 'info'),
    ], 'Explain the Github → Vercel connection clearly. Students often confuse Github (code storage) with Vercel (hosting). They work together.', 15),

    makeBlock(sid, 2, 'demo', 'Deploy to Vercel — Step by Step', [
      h('Live Demo: Full Deployment Walkthrough'),
      numbered([
        'Go to vercel.com — click "Sign Up" and choose "Continue with Github"',
        'Authorise Vercel to access your Github',
        'Click "Add New" → "Project"',
        'Find your project repository and click "Import"',
        'Framework Preset: Select "Other" (plain HTML/CSS/JS)',
        'Root Directory: Leave as is',
        'Build & Output Settings: Leave as defaults',
        'Click "Deploy"',
        'Watch the build log — takes 30-60 seconds',
        'Confetti animation + your live URL! 🎉',
        'Your URL: https://your-project-name.vercel.app',
      ]),
      callout('If something breaks on the live site: open DevTools on the live URL — errors show the same way as locally. Most common issue: wrong file path (case-sensitive on Linux servers).', 'warning'),
    ], 'Do this live from start to finish. Let students see the entire process including the build logs and the final live site. The confetti moment is always special.', 30),

    makeBlock(sid, 3, 'activity', 'Deploy Your Site + Test + Share', [
      h('Hands-on Task: Your Site Live on the Internet'),
      numbered([
        'Sign in to Vercel with Github',
        'Import your project repository',
        'Configure: Framework = Other, leave all other settings as default',
        'Click Deploy and watch the build log',
        'Open your live URL and test everything:',
        '  - Site loads correctly',
        '  - All images appear',
        '  - CSS is applied',
        '  - JavaScript works (navigation toggle, form, etc.)',
        '  - Form submission works on the live site',
        '  - Mobile looks correct (test on your actual phone)',
        'Test continuous deployment: make a small change locally, commit, push, watch Vercel auto-update',
        'Share your live URL in the class group chat',
        'Post on LinkedIn: "I built and deployed my first website in 14 days using no-code tools!"',
      ]),
    ], 'Be ready to debug deployment issues. Common problems: wrong file paths (case-sensitive), images not in Github repo, fonts not loading. Help each student get their site live.', 60,
    { activity_data: activity('Deploy Your Site + Test + Share', 'Deploy to Vercel, test the live URL thoroughly, test continuous deployment, share with the world.', 60, 'Help with deployment errors. Verify each site goes live. Collect all live URLs. Celebrate every successful deployment.', 'Every student has a live site accessible via a public URL, tested on mobile, and shared with the class.') }),

    makeBlock(sid, 4, 'quiz', 'Day 14 Knowledge Check', [], 'Deployment check.', 5,
    { quiz_data: mcq('What happens when you push new code to Github after deploying to Vercel?', [
      { text: 'Nothing — you need to redeploy manually' },
      { text: 'Vercel automatically rebuilds and updates your live site', correct: true },
      { text: 'Your site goes offline until you click Deploy again' },
      { text: 'Github sends you an email asking permission to deploy' },
    ], 'Vercel watches your Github repository. Every push triggers an automatic rebuild and deployment. This is continuous deployment — a professional workflow used by companies worldwide.') }),

    makeBlock(sid, 5, 'faq', 'Day 14 FAQs', [], 'Common deployment questions.', 5,
    { faq_items: faqs([
      { q: 'Can I use my own domain name instead of .vercel.app?', a: 'Yes. You can buy a domain and connect it to Vercel. In your Vercel project → Settings → Domains. Optional and not required for this course.' },
      { q: 'What if my site looks different on Vercel than locally?', a: 'Most common cause: file paths are case-sensitive on Vercel\'s Linux servers. Check that your file names match exactly (styles.css not Styles.css).' },
      { q: 'How much does Vercel cost?', a: 'The free tier is generous: unlimited sites, unlimited bandwidth for personal projects. You will not hit the limits for a portfolio or small project.' },
      { q: 'Can I deploy something other than a portfolio?', a: 'Yes. Any static website (HTML/CSS/JS) can be deployed this way. Blogs, landing pages, documentation sites — all work.' },
      { q: 'What do I do after this course?', a: 'Keep building! Add more projects to your portfolio. Learn JavaScript more deeply. Explore React or Next.js. Share your work on LinkedIn. The skills you have now are real and valuable.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Course Complete — You Did It!', [
      h('14 Days. From Zero to Deployed.'),
      bullets([
        'Week 1: Tools, prompting, web basics, project planning, version control',
        'Week 2: Navigation, forms, content sections, styling, debugging',
        'Week 3: Sprint planning, full build, testing, deployment',
      ]),
      divider(),
      h('What You Now Have'),
      bullets([
        'A live website with a real URL',
        'A Github profile with real code',
        'Skills in Claude AI, VS Code, Github, and Vercel',
        'The ability to build and deploy any static website',
        'A foundation to keep learning',
      ]),
      divider(),
      h('What\'s Next?'),
      bullets([
        'Add your live URL to your LinkedIn profile and CV',
        'Keep building — add more projects to your portfolio',
        'Learn JavaScript more deeply',
        'Explore React, Next.js, or backend development',
        'Help others who are where you were 14 days ago',
      ]),
      callout('You came in with zero experience. You leave with a live product, real skills, and proof that you can build anything. Congratulations.', 'tip'),
    ], 'Hand out certificates. Take a class photo. Celebrate loudly. This moment matters. Students have earned it.', 20),
  ]
}
