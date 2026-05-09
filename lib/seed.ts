import { db } from './db'
import { generateId } from './utils'
import { makeBlock, p, h, bullets, numbered, code, callout, divider, mcq, trueFalse, activity, faqs } from './seed-helpers'
import type { CurriculumLevel, Session, Block } from './types'

const LEVEL_ID = 'level-21d-fixed'

// Fixed session IDs for idempotent seeding
const S = Array.from({ length: 21 }, (_, i) => `session-21d-day${i + 1}`)

export async function seedCurriculum(): Promise<void> {
  try {
    await db.transaction('rw', [db.curriculum_levels, db.sessions, db.blocks], async () => {
      // Re-seed if blocks table is empty (handles migration from old step-based schema)
      const blockCount = await db.blocks.count()
      const existing = await db.curriculum_levels.get(LEVEL_ID)

      if (existing && blockCount > 0) return // already seeded with blocks

      const NOW = new Date().toISOString()

      // If level exists but no blocks, clear sessions and re-seed everything
      if (existing && blockCount === 0) {
        await db.sessions.where('level_id').equals(LEVEL_ID).delete()
        await db.curriculum_levels.delete(LEVEL_ID)
      }

      const level21D: CurriculumLevel = {
        id: LEVEL_ID,
        code: '21D',
        title: '21-Day Summer Crash Course',
        description: 'A complete no-code development journey from zero to deployed portfolio in 21 days.',
        order_index: 0,
        badge_color: 'green',
        total_sessions: 21,
        created_at: NOW,
      }

      const sessions: Session[] = buildSessions(NOW)
      const blocks: Block[] = buildAllBlocks()

      if (!blocks || blocks.length === 0) {
        throw new Error('Block data missing')
      }

      await db.curriculum_levels.add(level21D)
      await db.sessions.bulkAdd(sessions)
      await db.blocks.bulkAdd(blocks)
    })
  } catch (error) {
    console.error('Failed to seed curriculum:', error)
    throw error
  }
}

function buildSessions(NOW: string): Session[] {
  const titles = [
    'Welcome + Computer Basics + Mindset',
    'File Management + Browser Mastery',
    'Logic Thinking + Problem Solving',
    'Flowcharts + Wireframing on Paper',
    'Introduction to AI + Claude Basics',
    'Prompt Engineering — Writing Like a Pro',
    'Week 1 Review + Quiz + Group Activity',
    'HTML — Reading and Understanding Code',
    'CSS — Styling Without Writing It',
    'VS Code Setup + First File Saved Locally',
    'Spec Writing — Plan Before You Build',
    'GitHub — Your First Repository',
    'Build Portfolio — Hero + About Sections',
    'Mid-Course Checkpoint + Show and Tell',
    'Build Portfolio — Skills + Projects Sections',
    'Contact Section + Mobile Responsiveness',
    'Polish Day — Fonts, Colors, Animation',
    'Final GitHub Push + README Writing',
    'Deployment — Go Live on Cloudflare Pages',
    'Demo Day Prep — Rehearse Your Presentation',
    'DEMO DAY — Live Presentations + Certificate',
  ]

  const tools: string[][] = [
    [],
    [],
    [],
    [],
    ['Claude.ai'],
    ['Claude.ai'],
    [],
    ['Claude.ai'],
    ['Claude.ai'],
    ['VS Code'],
    ['Claude.ai', 'VS Code'],
    ['GitHub', 'VS Code'],
    ['Claude.ai', 'VS Code', 'GitHub'],
    [],
    ['Claude.ai', 'VS Code', 'GitHub'],
    ['Claude.ai', 'VS Code'],
    ['Claude.ai', 'VS Code'],
    ['VS Code', 'GitHub'],
    ['GitHub', 'Cloudflare Pages'],
    [],
    ['GitHub', 'Cloudflare Pages'],
  ]

  const durations = Array.from({ length: 21 }, (_, i) => i === 20 ? 180 : 120)

  return titles.map((title, i) => ({
    id: S[i],
    level_id: LEVEL_ID,
    title,
    description: `Day ${i + 1} of the 21-Day Crash Course`,
    session_number: i + 1,
    duration_minutes: durations[i],
    objectives: [],
    tools_used: tools[i],
    outcome: '',
    order_index: i,
    created_at: NOW,
  }))
}

function buildAllBlocks(): Block[] {
  return [
    ...day1Blocks(),
    ...day2Blocks(),
    ...day3Blocks(),
    ...day4Blocks(),
    ...day5Blocks(),
    ...day6Blocks(),
    ...day7Blocks(),
    ...day8Blocks(),
    ...day9Blocks(),
    ...day10Blocks(),
    ...day11Blocks(),
    ...day12Blocks(),
    ...day13Blocks(),
    ...day14Blocks(),
    ...day15Blocks(),
    ...day16Blocks(),
    ...day17Blocks(),
    ...day18Blocks(),
    ...day19Blocks(),
    ...day20Blocks(),
    ...day21Blocks(),
  ]
}

// ─── DAY 1: Welcome + Computer Basics + Mindset ───────────────────────────────
function day1Blocks(): Block[] {
  const sid = S[0]
  return [
    makeBlock(sid, 0, 'intro', 'Welcome to CodeShala!', [
      h('Day 1 — Welcome + Computer Basics + Mindset'),
      p('Today you begin a 21-day journey that will take you from zero to a live, deployed portfolio website.'),
      bullets([
        'No prior coding experience needed',
        'You will build real things from Day 1',
        'Ask questions freely — there are no silly questions here',
      ]),
      callout('By the end of 21 days, you will have a live website, a GitHub profile, and real skills.', 'tip'),
    ], 'Welcome everyone warmly. Ask: who has never touched code before? Celebrate that. Set the tone — this is a safe space.', 10),

    makeBlock(sid, 1, 'concept', 'How Computers Work', [
      h('What is a Computer, Really?'),
      p('A computer is a machine that takes input, processes it, and gives output. That is it.'),
      bullets([
        'Input: keyboard, mouse, microphone, camera',
        'Processing: CPU (the brain) + RAM (short-term memory)',
        'Storage: Hard drive / SSD (long-term memory)',
        'Output: screen, speakers, printer',
      ]),
      divider(),
      h('Files and Folders'),
      p('Everything on a computer is a file. Files live in folders. Folders live in drives.'),
      callout('Think of your computer like a physical office. The hard drive is the filing cabinet. RAM is your desk — things you are working on right now.', 'info'),
    ], 'Use the whiteboard to draw the input-process-output diagram. Ask students to name examples of each.', 20),

    makeBlock(sid, 2, 'demo', 'Navigating Your Computer', [
      h('Live Demo: File Explorer / Finder'),
      numbered([
        'Open File Explorer (Windows) or Finder (Mac)',
        'Navigate to the Desktop folder',
        'Create a new folder called "CodeShala"',
        'Inside it, create another folder called "Day1"',
        'Right-click and explore the options available',
      ]),
      callout('Every project you build will live in its own folder. Good folder habits now save hours of confusion later.', 'tip'),
    ], 'Do this on your own screen projected. Go slowly. Wait for students to follow along on their machines.', 15),

    makeBlock(sid, 3, 'activity', 'Create Your Workspace', [
      h('Activity: Set Up Your CodeShala Folder'),
      p('You have 10 minutes to complete this on your own computer.'),
      numbered([
        'Open File Explorer or Finder',
        'Go to your Desktop',
        'Create a folder called "CodeShala"',
        'Inside it, create 3 folders: "Week1", "Week2", "Week3"',
        'Inside Week1, create a folder called "Day1"',
      ]),
      callout('Raise your hand when done. Help your neighbour if they are stuck.', 'tip'),
    ], 'Walk around the room. Common issue: students creating folders in wrong location. Check that everyone has the right structure before moving on.', 10,
    { activity_data: activity('Create Your Workspace', 'Create the CodeShala folder structure on your Desktop as shown above.', 10, 'Walk the room. Check folder locations. Help anyone stuck.', 'Every student has a CodeShala/Week1/Week2/Week3/Day1 folder structure on their Desktop.') }),

    makeBlock(sid, 4, 'quiz', 'Quick Check', [
      p('Let us see what you remember from the last 30 minutes.'),
    ], 'Read the question aloud. Give 30 seconds to think. Then reveal the answer.', 5,
    { quiz_data: mcq('What does RAM stand for and what does it do?', [
      { text: 'Random Access Memory — stores data temporarily while the computer is running', correct: true },
      { text: 'Read And Memorize — helps the computer read files faster' },
      { text: 'Rapid Action Module — speeds up the processor' },
      { text: 'Random Application Manager — manages open apps' },
    ], 'RAM is your computer\'s short-term memory. It holds everything currently open. When you restart, RAM is cleared. That\'s why you save files to the hard drive.') }),

    makeBlock(sid, 5, 'faq', 'Common Questions', [
      p('Questions students typically ask on Day 1:'),
    ], 'Pull up this panel when students ask these questions. You can also proactively address them.', 5,
    { faq_items: faqs([
      { q: 'Do I need to buy any software?', a: 'No. Everything we use in this course is free. VS Code, GitHub, Claude, and Cloudflare Pages are all free tools.' },
      { q: 'What if I miss a day?', a: 'Each session builds on the previous one. If you miss a day, review the session notes and ask the trainer to catch you up at the start of the next session.' },
      { q: 'Is this real coding or just drag and drop?', a: 'You will write real HTML, CSS, and use real developer tools. But we use AI to help generate code, so you focus on understanding and customising rather than memorising syntax.' },
      { q: 'What computer do I need?', a: 'Any laptop or desktop made in the last 8 years will work. Windows, Mac, or Linux. A phone alone is not enough for this course.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 1 Wrap-Up', [
      h('What We Covered Today'),
      bullets([
        'How computers work: input, process, output',
        'Files, folders, and your workspace setup',
        'The CodeShala folder structure',
      ]),
      divider(),
      h('Homework'),
      p('Explore your computer tonight. Find 5 files you did not know existed. Notice what type they are (.pdf, .jpg, .docx).'),
      callout('Tomorrow: File Management + Browser Mastery. Bring your laptop fully charged.', 'info'),
    ], 'End on energy. Ask: what is one thing you learned today that surprised you? Collect attendance. Share tomorrow\'s time.', 10),
  ]
}

// ─── DAY 2: File Management + Browser Mastery ─────────────────────────────────
function day2Blocks(): Block[] {
  const sid = S[1]
  return [
    makeBlock(sid, 0, 'intro', 'Day 2 — File Management + Browser Mastery', [
      h('Day 2 — File Management + Browser Mastery'),
      p('Today you master two tools you use every single day but probably never learned properly: your file system and your browser.'),
      bullets(['File types and extensions', 'Organising projects like a developer', 'Browser DevTools — your new superpower']),
      callout('Developers spend 20% of their time writing code and 80% navigating files and browsers. Master these and you are already ahead.', 'tip'),
    ], 'Quick recap of Day 1. Ask: did anyone explore their computer last night? What did they find?', 10),

    makeBlock(sid, 1, 'concept', 'File Types and Extensions', [
      h('Every File Has a Type'),
      p('The extension at the end of a filename tells the computer what kind of file it is and which program should open it.'),
      bullets([
        '.txt — plain text, opens in Notepad',
        '.html — web page, opens in browser',
        '.css — stylesheet for web pages',
        '.js — JavaScript code',
        '.jpg / .png — images',
        '.pdf — document, opens in PDF reader',
        '.zip — compressed archive',
      ]),
      callout('Never rename a file extension unless you know what you are doing. Changing .html to .txt breaks the file.', 'warning'),
      divider(),
      h('Show File Extensions'),
      p('By default, Windows hides file extensions. Turn them on: View > Show > File name extensions.'),
    ], 'Show this on your screen. Many students have never seen file extensions. This is a revelation moment.', 15),

    makeBlock(sid, 2, 'demo', 'Browser DevTools', [
      h('Right-Click > Inspect — Your Secret Weapon'),
      numbered([
        'Open Chrome or Edge browser',
        'Go to any website (try google.com)',
        'Right-click anywhere on the page',
        'Click "Inspect" or press F12',
        'Click the Elements tab — you are looking at the HTML of the page',
        'Hover over HTML lines — watch the page highlight',
        'Try the Console tab — type: document.title and press Enter',
      ]),
      callout('Every website you have ever visited is made of HTML, CSS, and JavaScript. DevTools lets you see and edit it live.', 'info'),
    ], 'This always gets a reaction. Students realise they can "see inside" any website. Let them explore for 2 minutes after the demo.', 20),

    makeBlock(sid, 3, 'activity', 'Inspect a Real Website', [
      h('Activity: Explore Any Website with DevTools'),
      p('Pick any website you use regularly. Open DevTools and explore.'),
      numbered([
        'Open your favourite website in Chrome',
        'Press F12 to open DevTools',
        'Find the main heading of the page in the Elements panel',
        'Double-click the text and change it to your name',
        'Take a screenshot of your "edited" website',
      ]),
      callout('This only changes it on your screen — you are not hacking anything! Refresh the page and it goes back to normal.', 'info'),
    ], 'This is a fun activity. Students love "editing" famous websites. Encourage creativity. Common question: am I hacking? Reassure them.', 15,
    { activity_data: activity('Inspect a Real Website', 'Use DevTools to find and temporarily edit the main heading of any website you choose.', 15, 'Encourage fun choices. Let them share screenshots. Reinforce: this is local only, not real editing.', 'Every student has used DevTools to inspect and temporarily modify a live website.') }),

    makeBlock(sid, 4, 'quiz', 'File Types Quiz', [], 'Read aloud. Give 20 seconds.', 5,
    { quiz_data: trueFalse('Changing a file\'s extension from .html to .txt will make it open correctly in a text editor without any issues.', false, 'False. While the file will open in a text editor, the content is still HTML. More importantly, the browser will no longer recognise it as a web page. Always keep the correct extension for the file type.') }),

    makeBlock(sid, 5, 'faq', 'Browser and File FAQs', [], 'Pull up when relevant questions arise.', 5,
    { faq_items: faqs([
      { q: 'Which browser should I use for development?', a: 'Chrome or Edge are best for development because they have the most powerful DevTools. Firefox is also good. Avoid Safari for development work.' },
      { q: 'Can I use DevTools on my phone?', a: 'Yes, but it is much harder. For development, always use a laptop or desktop with a full browser.' },
      { q: 'What is the difference between a folder and a directory?', a: 'They are the same thing. "Directory" is the technical term used by developers and the command line. "Folder" is the user-friendly term used in graphical interfaces.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 2 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['File types and extensions', 'Showing hidden extensions in Windows', 'Browser DevTools — inspect any website', 'Temporarily editing live websites']),
      divider(),
      h('Homework'),
      p('Inspect 3 different websites tonight. Find one thing on each that surprises you about how it is built.'),
      callout('Tomorrow: Logic Thinking + Problem Solving. No computer needed — bring a pen and paper.', 'info'),
    ], 'Great energy day. End with the DevTools screenshots shared on screen if possible.', 10),
  ]
}

// ─── DAY 3: Logic Thinking + Problem Solving ──────────────────────────────────
function day3Blocks(): Block[] {
  const sid = S[2]
  return [
    makeBlock(sid, 0, 'intro', 'Day 3 — Logic Thinking + Problem Solving', [
      h('Day 3 — Logic Thinking + Problem Solving'),
      p('Today is about how developers think. Not syntax. Not tools. Pure thinking.'),
      bullets(['Breaking big problems into small steps', 'If-then-else logic', 'Loops and patterns', 'Debugging mindset']),
      callout('The best developers are not the fastest typists. They are the clearest thinkers.', 'tip'),
    ], 'This is a pen-and-paper day. No screens needed for the first half. Get students away from their laptops.', 10),

    makeBlock(sid, 1, 'concept', 'How Developers Think', [
      h('Decomposition — Break It Down'),
      p('Every complex problem can be broken into smaller, simpler problems. This is called decomposition.'),
      bullets(['Big problem: Build a website', 'Smaller: Build the header, build the nav, build the content, build the footer', 'Even smaller: Make the logo, make the menu items, make the search bar']),
      divider(),
      h('If-Then-Else Logic'),
      p('Almost every program ever written follows this pattern:'),
      code('IF something is true\n  THEN do this\nELSE\n  do that instead', 'pseudocode'),
      p('Example: IF the user is logged in, THEN show their dashboard. ELSE show the login page.'),
      divider(),
      h('Loops — Do It Again'),
      p('When you need to repeat something, you use a loop.'),
      code('FOR each student in the class\n  Print their name\nEND FOR', 'pseudocode'),
    ], 'Draw these on the whiteboard as you explain. Use real-life examples: traffic lights use if-then-else. Alarm clocks use loops.', 25),

    makeBlock(sid, 2, 'demo', 'Solving a Problem Step by Step', [
      h('Problem: Make a Cup of Tea'),
      p('Let us write the algorithm for making a cup of tea — like a computer would need it.'),
      numbered([
        'Fill kettle with water',
        'Turn on kettle',
        'WAIT until water boils',
        'Place teabag in cup',
        'Pour boiling water into cup',
        'WAIT 3 minutes',
        'Remove teabag',
        'IF you want milk, THEN add milk',
        'IF you want sugar, THEN add sugar',
        'Drink tea',
      ]),
      callout('Computers are literal. They do exactly what you tell them — nothing more, nothing less. If you forget a step, the program breaks.', 'warning'),
    ], 'Do this interactively. Ask students to call out the steps. Deliberately miss a step (like "turn on kettle") and ask: what goes wrong?', 15),

    makeBlock(sid, 3, 'activity', 'Write an Algorithm', [
      h('Activity: Write an Algorithm for Your Morning Routine'),
      p('On paper, write the step-by-step algorithm for getting ready in the morning.'),
      bullets([
        'Include at least one IF-THEN-ELSE decision',
        'Include at least one loop (something you repeat)',
        'Be specific enough that a robot could follow it',
        'Swap with a partner and try to find missing steps',
      ]),
      callout('There is no single correct answer. The goal is to think in steps.', 'info'),
    ], 'Give 10 minutes to write, then 5 minutes to swap and review. Listen for interesting algorithms to share with the class.', 15,
    { activity_data: activity('Write an Algorithm', 'Write a step-by-step algorithm for your morning routine including at least one IF-THEN-ELSE and one loop.', 15, 'Walk around and read what students write. Pick 2-3 interesting ones to share. Highlight creative use of conditions and loops.', 'Every student has written a structured algorithm with conditions and loops.') }),

    makeBlock(sid, 4, 'quiz', 'Logic Check', [], 'Give 30 seconds to think before revealing.', 5,
    { quiz_data: mcq('A website shows "Welcome back, Rahul!" when you are logged in, and "Please log in" when you are not. What programming concept is this?', [
      { text: 'A loop — it keeps checking if you are logged in' },
      { text: 'If-Then-Else logic — different output based on a condition', correct: true },
      { text: 'Decomposition — breaking the page into smaller parts' },
      { text: 'An algorithm — a set of steps to follow' },
    ], 'This is classic If-Then-Else. IF user is logged in THEN show welcome message ELSE show login prompt. You will write this exact logic later in the course.') }),

    makeBlock(sid, 5, 'faq', 'Logic and Thinking FAQs', [], 'Common questions about developer thinking.', 5,
    { faq_items: faqs([
      { q: 'Do I need to be good at maths to code?', a: 'No. Most web development uses very basic maths — addition, subtraction, percentages. Logic thinking is far more important than maths ability.' },
      { q: 'What is pseudocode?', a: 'Pseudocode is writing out your logic in plain English before writing actual code. It helps you plan without worrying about syntax. Many professional developers still use it.' },
      { q: 'How do I get better at problem solving?', a: 'Practice. Every time you face a problem, try to break it into smaller steps before jumping to a solution. The more you do it, the more natural it becomes.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 3 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Decomposition — breaking problems into steps', 'If-Then-Else logic', 'Loops and repetition', 'Writing algorithms in plain English']),
      divider(),
      h('Homework'),
      p('Pick any app on your phone. Write a 10-step algorithm for one thing it does — like sending a message or searching for a song.'),
      callout('Tomorrow: Flowcharts + Wireframing. Bring coloured pens if you have them.', 'info'),
    ], 'This is often a mindset-shifting day. Students realise coding is thinking, not typing. Celebrate that insight.', 10),
  ]
}

// ─── DAY 4: Flowcharts + Wireframing ──────────────────────────────────────────
function day4Blocks(): Block[] {
  const sid = S[3]
  return [
    makeBlock(sid, 0, 'intro', 'Day 4 — Flowcharts + Wireframing on Paper', [
      h('Day 4 — Flowcharts + Wireframing on Paper'),
      p('Before any developer writes a single line of code, they draw. Today you learn the two most important planning tools.'),
      bullets(['Flowcharts — visualise logic and decisions', 'Wireframes — sketch what a page will look like', 'Why planning saves 10x more time than fixing']),
      callout('Professional developers spend more time planning than coding. A 30-minute sketch prevents 3 hours of rework.', 'tip'),
    ], 'Distribute paper and pens. This is a hands-on drawing session. Encourage messy, rough sketches — perfection is not the goal.', 10),

    makeBlock(sid, 1, 'concept', 'Flowchart Symbols', [
      h('The 4 Shapes You Need'),
      bullets([
        'Oval / Rounded rectangle — Start or End',
        'Rectangle — A process or action (Do something)',
        'Diamond — A decision (Yes or No question)',
        'Arrow — Flow direction',
      ]),
      callout('You only need these 4 shapes to map any process in the world.', 'info'),
      divider(),
      h('Wireframe Basics'),
      p('A wireframe is a rough sketch of a web page. No colours, no fonts — just boxes and labels.'),
      bullets([
        'Box with X through it = an image placeholder',
        'Horizontal lines = text content',
        'Rectangle with label = a button',
        'Thin rectangle at top = navigation bar',
      ]),
    ], 'Draw these shapes on the whiteboard as you explain. Keep it simple. Students often overthink wireframes.', 20),

    makeBlock(sid, 2, 'demo', 'Flowchart: User Login Process', [
      h('Live Demo: Drawing a Login Flowchart'),
      numbered([
        'Start oval: "User visits login page"',
        'Rectangle: "User enters email and password"',
        'Diamond: "Are credentials correct?"',
        'YES arrow: Rectangle "Show dashboard"',
        'NO arrow: Rectangle "Show error message"',
        'Diamond: "Try again?"',
        'YES arrow: back to "User enters email and password"',
        'NO arrow: End oval "User leaves"',
      ]),
      callout('Notice how the flowchart makes the logic crystal clear before writing any code.', 'tip'),
    ], 'Draw this live on the whiteboard or paper under a document camera. Go slowly. Ask students to predict the next shape.', 15),

    makeBlock(sid, 3, 'activity', 'Wireframe Your Portfolio', [
      h('Activity: Wireframe Your Portfolio Homepage'),
      p('Sketch a wireframe of the portfolio website you will build in Week 3.'),
      bullets([
        'Navigation bar at the top with your name and menu links',
        'Hero section: your name, title, and a call-to-action button',
        'About section: photo placeholder and a short bio',
        'Skills section: a grid of skill boxes',
        'Footer: contact links',
      ]),
      callout('Use boxes, lines, and labels only. No colours. No details. Just layout.', 'info'),
    ], 'Give 15 minutes. Walk around and give feedback. Common mistake: too much detail. Remind them wireframes are rough sketches, not designs.', 15,
    { activity_data: activity('Wireframe Your Portfolio', 'Sketch a wireframe of your portfolio homepage with nav, hero, about, skills, and footer sections.', 15, 'Encourage rough sketches. Discourage perfectionism. Look for students who understand layout vs those who are drawing logos.', 'Every student has a hand-drawn wireframe of their portfolio homepage.') }),

    makeBlock(sid, 4, 'quiz', 'Planning Tools Quiz', [], 'Quick check on today\'s concepts.', 5,
    { quiz_data: mcq('In a flowchart, which shape represents a decision point (a yes/no question)?', [
      { text: 'Rectangle — it represents an action' },
      { text: 'Oval — it represents start or end' },
      { text: 'Diamond — it represents a decision', correct: true },
      { text: 'Arrow — it represents the flow direction' },
    ], 'The diamond shape always represents a decision — a point where the flow splits into two paths based on a yes/no condition. This maps directly to If-Then-Else logic from Day 3.') }),

    makeBlock(sid, 5, 'faq', 'Planning FAQs', [], 'Common questions about planning and design.', 5,
    { faq_items: faqs([
      { q: 'Do professional developers actually draw wireframes?', a: 'Yes, always. Even senior developers sketch before coding. Tools like Figma are digital wireframing tools used by millions of professionals.' },
      { q: 'What is the difference between a wireframe and a mockup?', a: 'A wireframe is a rough layout sketch with no styling. A mockup is a detailed, styled design that looks close to the final product. We start with wireframes.' },
      { q: 'Can I use an app to make wireframes instead of paper?', a: 'Yes. Figma, Excalidraw, and even Google Slides work well. But paper is fastest for initial ideas. We will use Figma later in the course.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 4 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Flowchart symbols and how to use them', 'Wireframing — sketching page layouts', 'Your portfolio wireframe is ready']),
      divider(),
      h('Homework'),
      p('Refine your wireframe. Add a Projects section and a Contact section. You will build exactly this in Week 3.'),
      callout('Tomorrow: Introduction to AI + Claude Basics. Bring your laptop — we go online.', 'info'),
    ], 'Collect the wireframes or photograph them. You will reference these in Week 3 when students build their portfolios.', 10),
  ]
}

// ─── DAY 5: Introduction to AI + Claude Basics ────────────────────────────────
function day5Blocks(): Block[] {
  const sid = S[4]
  return [
    makeBlock(sid, 0, 'intro', 'Day 5 — Introduction to AI + Claude Basics', [
      h('Day 5 — Introduction to AI + Claude Basics'),
      p('Today you meet your most powerful tool: Claude AI. This changes everything about how you will learn and build.'),
      bullets(['What AI is and is not', 'How Large Language Models work (simply)', 'Claude.ai — your AI coding partner', 'First conversation with Claude']),
      callout('AI does not replace learning. It accelerates it. You still need to understand what you are building — AI just removes the boring parts.', 'tip'),
    ], 'High energy day. Students are usually excited about AI. Channel that energy. Open claude.ai on the projector before class starts.', 10),

    makeBlock(sid, 1, 'concept', 'What is AI, Really?', [
      h('AI is Pattern Recognition at Scale'),
      p('An AI language model has read billions of pages of text — books, websites, code, conversations. It learned patterns from all of it.'),
      p('When you ask it a question, it predicts the most useful response based on those patterns.'),
      callout('It is not thinking. It is not conscious. It is an extremely sophisticated autocomplete.', 'info'),
      divider(),
      h('What Claude is Good At'),
      bullets([
        'Explaining concepts in simple language',
        'Writing and debugging code',
        'Answering questions with context',
        'Helping you plan and structure projects',
        'Reviewing and improving your writing',
      ]),
      divider(),
      h('What Claude is NOT Good At'),
      bullets([
        'Real-time information (it has a knowledge cutoff)',
        'Accessing the internet or your files',
        'Being 100% accurate — always verify important facts',
        'Replacing your own understanding',
      ]),
    ], 'The "sophisticated autocomplete" framing helps students understand why AI sometimes gets things wrong. It is predicting, not knowing.', 20),

    makeBlock(sid, 2, 'demo', 'First Conversation with Claude', [
      h('Live Demo: Talking to Claude'),
      numbered([
        'Open claude.ai in your browser',
        'Create a free account (or log in)',
        'Type: "Explain what HTML is to a complete beginner in 3 sentences"',
        'Read the response together',
        'Now type: "Give me an example of a simple HTML page"',
        'Copy the code it gives you',
        'Open Notepad, paste the code, save as index.html',
        'Open the file in your browser — you have a web page!',
      ]),
      callout('You just built a web page using AI in under 5 minutes. This is the power of the tools you are learning.', 'tip'),
    ], 'Do this live. The moment students see their first web page appear in a browser is a milestone. Celebrate it.', 20),

    makeBlock(sid, 3, 'activity', 'Ask Claude Anything', [
      h('Activity: 5 Questions for Claude'),
      p('Spend 15 minutes having a real conversation with Claude about topics you are curious about.'),
      numbered([
        'Ask Claude to explain one concept from Days 1-4 in a different way',
        'Ask it to write a simple HTML page about your favourite hobby',
        'Ask it "What questions should I ask to learn web development faster?"',
        'Ask it to explain something it just said in even simpler terms',
        'Ask it to give you a quiz question about what you learned today',
      ]),
      callout('Notice how you can ask follow-up questions. Claude remembers the conversation context.', 'info'),
    ], 'Walk around and see what students are asking. Interesting conversations to highlight to the class. Some students will go off-topic — that is fine, redirect gently.', 15,
    { activity_data: activity('Ask Claude Anything', 'Have a 15-minute conversation with Claude exploring topics from the course so far.', 15, 'Encourage curiosity. Let students explore freely. Highlight interesting exchanges to the class.', 'Every student has had a multi-turn conversation with Claude and seen it generate working HTML.') }),

    makeBlock(sid, 4, 'quiz', 'AI Understanding Check', [], 'Important misconceptions to address.', 5,
    { quiz_data: mcq('Claude gives you an answer about a recent news event. Should you trust it completely?', [
      { text: 'Yes — Claude has access to the internet and real-time information' },
      { text: 'No — Claude has a knowledge cutoff date and cannot access real-time information', correct: true },
      { text: 'Yes — Claude is always accurate because it has read billions of pages' },
      { text: 'No — Claude cannot answer questions about news at all' },
    ], 'Claude\'s training data has a cutoff date. It does not browse the internet in real time. For current events, always verify with a live source. This is one of the most important limitations to understand.') }),

    makeBlock(sid, 5, 'faq', 'AI and Claude FAQs', [], 'Very common questions on AI day.', 5,
    { faq_items: faqs([
      { q: 'Is Claude free?', a: 'Claude has a free tier that is sufficient for this course. The paid Pro plan gives more messages and access to more powerful models, but the free tier works well for learning.' },
      { q: 'Can I use ChatGPT instead of Claude?', a: 'Yes. ChatGPT, Gemini, and Claude are all capable AI assistants. We use Claude because it tends to give cleaner code explanations, but the skills transfer to any AI tool.' },
      { q: 'Will AI take my job as a developer?', a: 'AI is changing development, not eliminating it. Developers who use AI tools are more productive. The skill is knowing what to build and how to direct AI — that requires human judgment.' },
      { q: 'Can Claude write my entire project for me?', a: 'It can generate code, but you need to understand it, customise it, and debug it. Blindly copying AI code without understanding it leads to projects that break and cannot be fixed.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 5 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['How AI language models work', 'Claude.ai — setup and first conversation', 'Generating your first HTML with AI', 'AI limitations to always remember']),
      divider(),
      h('Homework'),
      p('Use Claude tonight to explain one thing you are confused about from this week. Share the conversation tomorrow.'),
      callout('Tomorrow: Prompt Engineering — how to talk to AI like a pro.', 'info'),
    ], 'Students are energised after AI day. Channel this into tomorrow\'s prompt engineering session.', 10),
  ]
}

// ─── DAY 6: Prompt Engineering ────────────────────────────────────────────────
function day6Blocks(): Block[] {
  const sid = S[5]
  return [
    makeBlock(sid, 0, 'intro', 'Day 6 — Prompt Engineering', [
      h('Day 6 — Prompt Engineering: Writing Like a Pro'),
      p('The quality of what AI gives you depends entirely on the quality of what you ask. Today you learn to ask well.'),
      bullets(['The anatomy of a great prompt', 'Context, role, format, constraints', 'Iterating and refining prompts', 'Prompt patterns for coding']),
      callout('A bad prompt gets a generic answer. A great prompt gets exactly what you need. This skill is worth more than knowing any programming language.', 'tip'),
    ], 'Start by showing two prompts side by side: a vague one and a specific one. Let students see the difference in output quality.', 10),

    makeBlock(sid, 1, 'concept', 'The Anatomy of a Great Prompt', [
      h('4 Elements of a Powerful Prompt'),
      numbered([
        'Role — Tell Claude who to be: "You are an expert web developer..."',
        'Context — Give background: "I am a beginner building my first portfolio..."',
        'Task — Be specific: "Write the HTML for a hero section with my name, title, and a button..."',
        'Format — Specify output: "Give me only the HTML code, no explanation"',
      ]),
      divider(),
      h('Bad Prompt vs Good Prompt'),
      callout('Bad: "Make me a website"\nGood: "You are a web developer. I am a beginner. Write HTML for a portfolio hero section with a heading showing my name Rahul, a subheading saying Full Stack Developer, and a blue button saying Contact Me. Give only the HTML code."', 'info'),
      divider(),
      h('Prompt Patterns for Coding'),
      bullets([
        '"Explain this code line by line: [paste code]"',
        '"What is wrong with this code: [paste code]"',
        '"Rewrite this to be simpler: [paste code]"',
        '"Add [feature] to this existing code: [paste code]"',
      ]),
    ], 'The bad vs good prompt comparison is the key teaching moment. Show both in Claude live and compare outputs.', 25),

    makeBlock(sid, 2, 'demo', 'Live Prompt Refinement', [
      h('Demo: Improving a Prompt in Real Time'),
      numbered([
        'Start with: "Make a navigation bar"',
        'Show the generic output',
        'Improve: "Write HTML for a navigation bar with links: Home, About, Projects, Contact. Style it with a dark background and white text using inline CSS."',
        'Show the improved output',
        'Improve again: "The links should be horizontal, spaced evenly, and turn purple when hovered."',
        'Show the final output',
        'Discuss: same task, 3 different results based on prompt quality',
      ]),
      callout('Prompt engineering is iterative. You rarely get the perfect result on the first try. Keep refining.', 'tip'),
    ], 'This live demo is very effective. Students see the direct relationship between prompt quality and output quality.', 15),

    makeBlock(sid, 3, 'activity', 'Prompt Challenge', [
      h('Activity: The Prompt Challenge'),
      p('Your goal: get Claude to generate a complete, styled hero section for your portfolio using only prompts.'),
      bullets([
        'Must include: your name, your title/role, a short tagline, and a button',
        'Must have: a dark background, large white text, and a coloured button',
        'You can only use prompts — no manual editing of the code',
        'Iterate until you are happy with the result',
        'Save the final HTML to your Day6 folder',
      ]),
      callout('The constraint of no manual editing forces you to get good at prompting. This is intentional.', 'info'),
    ], 'This is a competitive activity. Students who finish early can help others refine their prompts. Share the best results on the projector.', 20,
    { activity_data: activity('Prompt Challenge', 'Use only prompts to get Claude to generate a complete styled hero section for your portfolio.', 20, 'No manual code editing allowed. Students must iterate prompts. Share best results. Discuss what made the winning prompts effective.', 'Every student has a Claude-generated hero section saved as HTML that matches their requirements.') }),

    makeBlock(sid, 4, 'quiz', 'Prompt Engineering Quiz', [], 'Test prompt knowledge.', 5,
    { quiz_data: mcq('Which prompt will get the most useful response from Claude?', [
      { text: '"Help me with CSS"' },
      { text: '"Fix my code"' },
      { text: '"You are a CSS expert. I have a div that should be centered on the page but it is aligned left. Here is my code: [code]. What is wrong and how do I fix it?"', correct: true },
      { text: '"Make my website look better"' },
    ], 'The third option includes role (CSS expert), context (centering problem), specific task (what is wrong), and the actual code. This gives Claude everything it needs to give a precise, useful answer.') }),

    makeBlock(sid, 5, 'faq', 'Prompt Engineering FAQs', [], 'Common questions about prompting.', 5,
    { faq_items: faqs([
      { q: 'How long should a prompt be?', a: 'As long as it needs to be. Short prompts for simple tasks, detailed prompts for complex ones. There is no ideal length — clarity matters more than brevity.' },
      { q: 'Should I always use the role technique?', a: 'Not always, but it helps for technical tasks. Telling Claude "you are an expert in X" tends to produce more focused, technical responses.' },
      { q: 'What if Claude keeps giving me the wrong answer?', a: 'Try rephrasing. Add more context. Break the task into smaller parts. Or start a new conversation — sometimes the context of previous messages confuses the model.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 6 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['The 4 elements of a great prompt: Role, Context, Task, Format', 'Iterative prompt refinement', 'Coding-specific prompt patterns', 'Built a hero section using only prompts']),
      divider(),
      h('Homework'),
      p('Use the prompt patterns to ask Claude to explain something from your homework or job. Practice the role + context + task format.'),
      callout('Tomorrow: Week 1 Review + Quiz + Group Activity. Come ready to show what you built this week.', 'info'),
    ], 'Strong end to Week 1. Students now have AI as a genuine tool, not a toy.', 10),
  ]
}

// ─── DAY 7: Week 1 Review ─────────────────────────────────────────────────────
function day7Blocks(): Block[] {
  const sid = S[6]
  return [
    makeBlock(sid, 0, 'intro', 'Day 7 — Week 1 Review + Quiz + Group Activity', [
      h('Day 7 — Week 1 Review'),
      p('You have completed Week 1. Today we consolidate everything before moving into HTML and CSS next week.'),
      bullets(['Review all 6 days of content', 'Team quiz competition', 'Group activity: plan a mini project', 'Celebrate Week 1 completion']),
      callout('Week 1 was about foundations. Week 2 is where you start building real things.', 'tip'),
    ], 'High energy day. Set up teams before class. Have a small prize for the quiz winner if possible.', 10),

    makeBlock(sid, 1, 'concept', 'Week 1 Recap', [
      h('What You Learned This Week'),
      bullets([
        'Day 1: How computers work — input, process, output, files, folders',
        'Day 2: File types, extensions, Browser DevTools',
        'Day 3: Logic thinking — decomposition, if-then-else, loops, algorithms',
        'Day 4: Flowcharts and wireframing — planning before building',
        'Day 5: AI and Claude — what it is, what it is not, first HTML page',
        'Day 6: Prompt engineering — role, context, task, format',
      ]),
      divider(),
      h('The Big Picture'),
      p('These 6 days gave you the mental model of a developer. You now think in steps, plan before building, and use AI as a tool.'),
      callout('Most people who try to learn coding fail because they skip this foundation. You did not skip it.', 'tip'),
    ], 'This recap is important. Students often underestimate how much they have learned. Make it concrete.', 15),

    makeBlock(sid, 2, 'demo', 'Week 1 Knowledge Demo', [
      h('Live Demo: Everything Connected'),
      numbered([
        'Open Claude.ai',
        'Use a well-structured prompt to ask it to explain the difference between RAM and storage',
        'Ask it to draw a flowchart (in text) for a user signing up to a website',
        'Open DevTools on any website and find the navigation HTML',
        'Show the CodeShala folder structure from Day 1',
      ]),
      callout('Notice how Days 1-6 all connect. The folder holds your files. DevTools shows the HTML. Claude helps you understand it. Prompts control what Claude gives you.', 'info'),
    ], 'This connecting demo is powerful. Students see the week as a coherent whole, not isolated lessons.', 15),

    makeBlock(sid, 3, 'activity', 'Team Quiz Competition', [
      h('Activity: Week 1 Team Quiz'),
      p('Split into teams of 3-4. 10 questions. First team to answer correctly wins the point.'),
      bullets([
        'Questions cover all 6 days',
        'Teams discuss before answering — 30 seconds per question',
        'Trainer reads questions aloud',
        'Winning team gets bragging rights (and maybe a prize)',
      ]),
      callout('This is competitive but friendly. The goal is to surface gaps in understanding, not to embarrass anyone.', 'info'),
    ], 'Use the quiz blocks below for the actual questions. Keep energy high. Move fast between questions.', 25,
    { activity_data: activity('Team Quiz Competition', 'Team-based quiz covering all of Week 1. Teams of 3-4, 10 questions, 30 seconds per question.', 25, 'Keep energy high. Move fast. If a team gets it wrong, open it to other teams. Celebrate correct answers.', 'Students have reviewed and reinforced all Week 1 concepts through active recall.') }),

    makeBlock(sid, 4, 'quiz', 'Week 1 Final Quiz', [], 'Use these questions for the team competition.', 10,
    { quiz_data: mcq('Which of these is the BEST example of a well-structured prompt?', [
      { text: '"Write code for me"' },
      { text: '"You are a web developer. I am building a portfolio. Write HTML for a footer with my name and three social media links. Give only the HTML."', correct: true },
      { text: '"Make a footer"' },
      { text: '"HTML footer please"' },
    ], 'The second option includes all 4 elements: Role (web developer), Context (portfolio), Task (footer with specific requirements), Format (only HTML). This is the prompt engineering framework from Day 6.') }),

    makeBlock(sid, 5, 'faq', 'Week 1 Common Confusions', [], 'Address these if they come up in the review.', 5,
    { faq_items: faqs([
      { q: 'I am still confused about the difference between HTML, CSS, and JavaScript.', a: 'HTML is the structure (the bones). CSS is the styling (the skin and clothes). JavaScript is the behaviour (the muscles that make things move). We cover HTML on Day 8 and CSS on Day 9.' },
      { q: 'Is Claude the same as ChatGPT?', a: 'They are different products from different companies (Claude is from Anthropic, ChatGPT is from OpenAI) but they work similarly. The prompting skills you learned work on both.' },
      { q: 'I missed a day. How do I catch up?', a: 'Review the session content in this app for the day you missed. The key concepts are all here. Ask the trainer to clarify anything unclear at the start of the next session.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Week 1 Complete!', [
      h('Week 1 Complete — You Did It!'),
      p('You have built the foundation that most self-taught developers never get. You think like a developer now.'),
      bullets(['Computer basics and file management', 'Logic thinking and algorithms', 'Planning with flowcharts and wireframes', 'AI as a tool — Claude and prompt engineering']),
      divider(),
      h('Week 2 Preview'),
      bullets(['Day 8: HTML — reading and understanding code', 'Day 9: CSS — styling without writing it', 'Day 10: VS Code setup + first file saved locally']),
      callout('Rest this weekend. Week 2 is where you start building real web pages.', 'tip'),
    ], 'Celebrate Week 1 completion. Take a class photo. Share next session time. Collect attendance.', 10),
  ]
}

// ─── DAYS 8-21: Remaining sessions (structured blocks) ────────────────────────

function day8Blocks(): Block[] {
  const sid = S[7]
  return [
    makeBlock(sid, 0, 'intro', 'Day 8 — HTML: Reading and Understanding Code', [
      h('Day 8 — HTML: Reading and Understanding Code'),
      p('HTML is the skeleton of every website. Today you learn to read it, understand it, and write it with AI help.'),
      bullets(['What HTML tags are and how they work', 'The structure of every HTML page', 'Reading HTML in DevTools', 'Writing your first HTML file']),
      callout('You do not need to memorise HTML tags. You need to understand the pattern. AI handles the rest.', 'tip'),
    ], 'Students are excited to start "real coding". Channel that energy. Open a simple HTML file on the projector.', 10),

    makeBlock(sid, 1, 'concept', 'HTML Tags and Structure', [
      h('HTML is Just Labels'),
      p('HTML stands for HyperText Markup Language. It uses tags to label content.'),
      code('<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is a paragraph.</p>\n  </body>\n</html>', 'html'),
      bullets([
        '<html> — the root of the page',
        '<head> — metadata, title, links to CSS',
        '<body> — everything visible on the page',
        '<h1> to <h6> — headings (h1 is biggest)',
        '<p> — paragraph',
        '<a href="..."> — link',
        '<img src="..."> — image',
        '<div> — a container box',
      ]),
      callout('Tags come in pairs: opening <p> and closing </p>. The content goes between them.', 'info'),
    ], 'Write this on the projector live. Explain each tag as you type it. Ask students to predict what each tag does.', 25),

    makeBlock(sid, 2, 'demo', 'Build a Page Live', [
      h('Live Demo: Build a Simple Bio Page'),
      numbered([
        'Open VS Code (or Notepad)',
        'Type the HTML boilerplate structure',
        'Add an h1 with your name',
        'Add a p tag with a short bio',
        'Add an unordered list of 3 hobbies',
        'Save as bio.html in your Day8 folder',
        'Open in browser — see your page',
        'Open DevTools and find your h1 in the Elements panel',
      ]),
      callout('Every website you have ever visited started exactly like this — a blank file with HTML tags.', 'tip'),
    ], 'Type slowly. Wait for students to follow along. The moment they see their page in the browser is always exciting.', 20),

    makeBlock(sid, 3, 'activity', 'Build Your Bio Page', [
      h('Activity: Build Your Bio Page'),
      p('Using Claude and what you learned today, build a bio page about yourself.'),
      bullets([
        'Your name as the page title and h1',
        'A short paragraph about yourself',
        'A list of 3-5 things you are learning or interested in',
        'At least one link (to any website)',
        'Save as bio.html and open in browser',
      ]),
      callout('Use Claude to help with any tags you are unsure about. Prompt: "How do I add a link in HTML?"', 'tip'),
    ], 'Walk around and check progress. Common issues: forgetting to close tags, saving as .txt instead of .html.', 20,
    { activity_data: activity('Build Your Bio Page', 'Build an HTML bio page with your name, a paragraph, a list, and a link.', 20, 'Check file extensions. Help with tag closing issues. Celebrate when pages open in browser.', 'Every student has a working bio.html file that opens correctly in a browser.') }),

    makeBlock(sid, 4, 'quiz', 'HTML Quiz', [], 'Quick HTML check.', 5,
    { quiz_data: mcq('What does the <a> tag do in HTML?', [
      { text: 'Creates a heading' },
      { text: 'Creates a paragraph' },
      { text: 'Creates a clickable link', correct: true },
      { text: 'Creates an image' },
    ], 'The <a> tag (anchor tag) creates hyperlinks. The href attribute specifies where the link goes: <a href="https://google.com">Click here</a>') }),

    makeBlock(sid, 5, 'faq', 'HTML FAQs', [], 'Common HTML questions.', 5,
    { faq_items: faqs([
      { q: 'Do I need to memorise all HTML tags?', a: 'No. Professional developers look up tags all the time. You need to understand the pattern (opening tag, content, closing tag) and know the most common 10-15 tags. AI handles the rest.' },
      { q: 'What happens if I forget to close a tag?', a: 'The browser tries to fix it, but the result is unpredictable. Always close your tags. VS Code will highlight unclosed tags.' },
      { q: 'What is the difference between <div> and <section>?', a: 'Both are container elements. <div> is generic. <section> has semantic meaning — it tells the browser this is a distinct section of content. Use semantic tags when possible.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 8 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['HTML tag structure — opening, content, closing', 'The anatomy of an HTML page: DOCTYPE, html, head, body', 'Common tags: h1-h6, p, a, img, div, ul, li', 'Built a working bio page']),
      divider(),
      h('Homework'),
      p('Add an image to your bio page. Use Claude to find out how. Hint: the <img> tag.'),
      callout('Tomorrow: CSS — making your page look good without writing much CSS yourself.', 'info'),
    ], 'Students have their first real HTML file. This is a milestone. Celebrate it.', 10),
  ]
}

function day9Blocks(): Block[] {
  const sid = S[8]
  return [
    makeBlock(sid, 0, 'intro', 'Day 9 — CSS: Styling Without Writing It', [
      h('Day 9 — CSS: Styling Without Writing It'),
      p('CSS makes your HTML look good. Today you learn to read CSS, understand it, and use AI to write it for you.'),
      bullets(['How CSS connects to HTML', 'Selectors, properties, and values', 'Colors, fonts, spacing, layout basics', 'Using Claude to generate CSS']),
      callout('CSS has thousands of properties. You do not need to know them all. You need to know how to describe what you want.', 'tip'),
    ], 'Open the bio page from Day 8 on the projector. It looks plain. Today we make it look good.', 10),

    makeBlock(sid, 1, 'concept', 'How CSS Works', [
      h('CSS: Selector + Property + Value'),
      p('Every CSS rule follows the same pattern:'),
      code('selector {\n  property: value;\n  property: value;\n}', 'css'),
      p('Example:'),
      code('h1 {\n  color: purple;\n  font-size: 48px;\n  font-family: Arial;\n}', 'css'),
      bullets([
        'h1 — the selector (which element to style)',
        'color — the property (what to change)',
        'purple — the value (what to change it to)',
      ]),
      divider(),
      h('Connecting CSS to HTML'),
      code('<head>\n  <link rel="stylesheet" href="style.css">\n</head>', 'html'),
      callout('Create a separate style.css file and link it in the <head>. This keeps your HTML and CSS organised.', 'info'),
    ], 'Write this live. Show the immediate visual change when CSS is applied. Students love seeing instant results.', 25),

    makeBlock(sid, 2, 'demo', 'Style the Bio Page', [
      h('Live Demo: Transform the Bio Page'),
      numbered([
        'Create style.css in the same folder as bio.html',
        'Link it in the <head> of bio.html',
        'Add: body { background-color: #1a1a1a; color: white; font-family: Arial; }',
        'Add: h1 { color: #6c63ff; font-size: 48px; }',
        'Add: p { font-size: 18px; line-height: 1.6; }',
        'Save and refresh the browser',
        'Now use Claude: "Add CSS to center all content and add padding"',
        'Paste the CSS and refresh again',
      ]),
      callout('Notice how we used Claude for the layout CSS. Describe what you want, get the code, paste it in.', 'tip'),
    ], 'The transformation from plain HTML to styled page is always impressive. Let students react.', 20),

    makeBlock(sid, 3, 'activity', 'Style Your Bio Page', [
      h('Activity: Make Your Bio Page Look Great'),
      p('Use CSS (with Claude\'s help) to style your bio page.'),
      bullets([
        'Change the background color and text color',
        'Style your h1 with a different color and larger font',
        'Add padding and margin to make it breathe',
        'Center the content on the page',
        'Add a hover effect to your link',
      ]),
      callout('Prompt Claude: "Write CSS to [describe what you want]. Here is my current HTML: [paste HTML]"', 'tip'),
    ], 'Walk around. Students will have very different results — celebrate the variety. Common issue: CSS not linking correctly.', 20,
    { activity_data: activity('Style Your Bio Page', 'Use CSS and Claude to style your bio page with colors, fonts, spacing, and layout.', 20, 'Check that style.css is linked correctly. Help with selector issues. Celebrate creative designs.', 'Every student has a styled bio page with custom colors, fonts, and layout.') }),

    makeBlock(sid, 4, 'quiz', 'CSS Quiz', [], 'CSS fundamentals check.', 5,
    { quiz_data: mcq('In CSS, what does this rule do?  p { color: red; }', [
      { text: 'Makes all paragraphs have a red background' },
      { text: 'Makes all paragraphs have red text', correct: true },
      { text: 'Makes all elements with class "p" red' },
      { text: 'Makes the page border red' },
    ], 'The selector "p" targets all <p> (paragraph) elements. The property "color" changes text color. So all paragraph text becomes red. To change background, you would use "background-color: red" instead.') }),

    makeBlock(sid, 5, 'faq', 'CSS FAQs', [], 'Common CSS questions.', 5,
    { faq_items: faqs([
      { q: 'What is the difference between margin and padding?', a: 'Padding is space inside the element (between content and border). Margin is space outside the element (between the element and other elements). Think of a picture frame: padding is the mat inside the frame, margin is the wall space around the frame.' },
      { q: 'Why is my CSS not working?', a: 'Check: 1) Is the CSS file linked correctly in the HTML head? 2) Is the selector correct? 3) Did you save both files? 4) Did you refresh the browser? These cover 90% of CSS issues.' },
      { q: 'Should I write CSS myself or always use Claude?', a: 'Both. Understanding CSS properties helps you give better prompts and debug issues. But for complex layouts, using Claude is faster and more reliable than writing from scratch.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 9 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['CSS syntax: selector, property, value', 'Linking CSS to HTML', 'Colors, fonts, spacing, centering', 'Using Claude to generate CSS from descriptions']),
      divider(),
      h('Homework'),
      p('Make your bio page look like a real portfolio page. Use Claude to add a navigation bar at the top.'),
      callout('Tomorrow: VS Code setup. We move from Notepad to a professional code editor.', 'info'),
    ], 'Students now have a styled page. The progress from Day 8 to Day 9 is visible and motivating.', 10),
  ]
}

function day10Blocks(): Block[] {
  const sid = S[9]
  return [
    makeBlock(sid, 0, 'intro', 'Day 10 — VS Code Setup + First File Saved Locally', [
      h('Day 10 — VS Code Setup + First File Saved Locally'),
      p('Today you set up the tool that professional developers use every day: Visual Studio Code.'),
      bullets(['Install and configure VS Code', 'Essential extensions for web development', 'Open your project folder in VS Code', 'Live Server — see changes instantly']),
      callout('VS Code is free, used by over 70% of developers worldwide, and works on Windows, Mac, and Linux.', 'info'),
    ], 'Check that all students can download VS Code. Some may need admin permissions on school/work computers.', 10),

    makeBlock(sid, 1, 'concept', 'Why VS Code?', [
      h('VS Code vs Notepad'),
      bullets([
        'Syntax highlighting — code is colour-coded for readability',
        'Auto-complete — suggests code as you type',
        'Error detection — underlines mistakes before you run the code',
        'Extensions — add features like live preview, Git integration',
        'Integrated terminal — run commands without leaving the editor',
        'Multi-file projects — see all your files in a sidebar',
      ]),
      callout('Notepad is a text editor. VS Code is a development environment. The difference is like writing with a pencil vs using a word processor.', 'info'),
      divider(),
      h('Essential Extensions to Install'),
      bullets([
        'Prettier — auto-formats your code',
        'Live Server — refreshes browser automatically on save',
        'HTML CSS Support — better autocomplete',
        'GitHub Copilot — AI code suggestions (optional)',
      ]),
    ], 'Show VS Code open with a project. The visual difference from Notepad is immediately obvious.', 20),

    makeBlock(sid, 2, 'demo', 'VS Code Setup Walkthrough', [
      h('Live Demo: Install and Configure VS Code'),
      numbered([
        'Download VS Code from code.visualstudio.com',
        'Install with default settings',
        'Open VS Code',
        'Click Extensions icon (left sidebar) or press Ctrl+Shift+X',
        'Search and install: Prettier, Live Server',
        'Open your CodeShala folder: File > Open Folder',
        'Open bio.html',
        'Right-click in the editor > Open with Live Server',
        'Edit the h1 text and save — watch the browser update automatically',
      ]),
      callout('Live Server is a game changer. No more manual refreshing.', 'tip'),
    ], 'Go slowly through the install. Wait for everyone to catch up at each step. Live Server demo always gets a reaction.', 25),

    makeBlock(sid, 3, 'activity', 'Set Up Your Dev Environment', [
      h('Activity: Full VS Code Setup'),
      p('Complete your VS Code setup and migrate your bio page project.'),
      numbered([
        'Install VS Code if not done already',
        'Install Prettier and Live Server extensions',
        'Open your CodeShala folder in VS Code',
        'Open bio.html with Live Server',
        'Make 3 changes to your bio page and watch them update live',
        'Use Prettier to format your code (right-click > Format Document)',
      ]),
      callout('If you get stuck on any step, ask your neighbour or raise your hand.', 'info'),
    ], 'This is a setup session. Expect varied progress. Pair faster students with slower ones. The goal is everyone has Live Server working by end.', 20,
    { activity_data: activity('Set Up Your Dev Environment', 'Install VS Code, add extensions, open your project, and use Live Server.', 20, 'Pair students. Common issues: admin permissions, wrong folder opened, Live Server port conflicts.', 'Every student has VS Code open with their bio project running on Live Server.') }),

    makeBlock(sid, 4, 'quiz', 'VS Code Quiz', [], 'Check VS Code understanding.', 5,
    { quiz_data: mcq('What does the Live Server extension do?', [
      { text: 'Uploads your website to the internet automatically' },
      { text: 'Automatically refreshes your browser when you save a file', correct: true },
      { text: 'Checks your code for security vulnerabilities' },
      { text: 'Connects your VS Code to GitHub' },
    ], 'Live Server creates a local development server and watches your files. When you save, it automatically refreshes the browser. This eliminates the manual refresh cycle and speeds up development significantly.') }),

    makeBlock(sid, 5, 'faq', 'VS Code FAQs', [], 'Common VS Code setup questions.', 5,
    { faq_items: faqs([
      { q: 'VS Code says I need admin permission to install. What do I do?', a: 'Download the "User Installer" version from the VS Code website instead of the System Installer. The User Installer does not require admin rights.' },
      { q: 'Live Server is not working. What should I check?', a: 'Make sure you opened a folder (not just a file) in VS Code. Right-click the HTML file in the Explorer panel and select "Open with Live Server". Check that port 5500 is not blocked by a firewall.' },
      { q: 'Should I use VS Code or an online editor like CodePen?', a: 'VS Code for real projects. CodePen is great for quick experiments and sharing snippets. We use VS Code because it mirrors professional development workflow.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 10 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['VS Code installation and configuration', 'Essential extensions: Prettier, Live Server', 'Opening a project folder', 'Live development workflow']),
      divider(),
      h('Homework'),
      p('Spend 20 minutes in VS Code. Open your bio page, make improvements, and get comfortable with the editor.'),
      callout('Tomorrow: Spec Writing — how to plan a project before building it. This is how professionals work.', 'info'),
    ], 'Students now have a professional development environment. This is a significant milestone.', 10),
  ]
}

function day11Blocks(): Block[] {
  const sid = S[10]
  return [
    makeBlock(sid, 0, 'intro', 'Day 11 — Spec Writing: Plan Before You Build', [
      h('Day 11 — Spec Writing: Plan Before You Build'),
      p('A spec (specification) is a written plan for what you are building. Today you learn to write one.'),
      bullets(['What a spec is and why it matters', 'Requirements vs design vs tasks', 'Writing a spec with Claude', 'Your portfolio spec']),
      callout('Developers who write specs ship faster and with fewer bugs. It forces you to think before you type.', 'tip'),
    ], 'This connects directly to the wireframing from Day 4. Students are now planning digitally.', 10),

    makeBlock(sid, 1, 'concept', 'The 3 Parts of a Spec', [
      h('Requirements — What it must do'),
      p('List every feature the project needs. Be specific.'),
      code('- User can see my name and photo\n- User can read my bio\n- User can see my 3 projects\n- User can click a button to contact me\n- Page works on mobile', 'text'),
      divider(),
      h('Design — How it will look'),
      p('Describe the layout, colors, fonts. Reference your wireframe.'),
      divider(),
      h('Tasks — What to build and in what order'),
      code('1. Create HTML structure\n2. Add CSS styling\n3. Add project cards\n4. Make it responsive\n5. Deploy to Cloudflare', 'text'),
      callout('A spec is a living document. Update it as you build and learn more.', 'info'),
    ], 'Show a real spec document. Even a simple one makes the concept concrete.', 20),

    makeBlock(sid, 2, 'demo', 'Write a Spec with Claude', [
      h('Live Demo: Portfolio Spec with Claude'),
      numbered([
        'Open Claude.ai',
        'Prompt: "You are a software architect. Help me write a spec for a personal portfolio website. I am a beginner. The site should have: home, about, projects, contact sections. Format it with Requirements, Design, and Tasks sections."',
        'Review the output together',
        'Refine: "Add a requirement that it must work on mobile phones"',
        'Refine: "Break the Tasks into smaller sub-tasks"',
        'Save the spec as spec.md in your CodeShala folder',
      ]),
      callout('Notice how Claude helps you think of requirements you might have missed.', 'tip'),
    ], 'This demo shows Claude as a thinking partner, not just a code generator. Important mindset shift.', 20),

    makeBlock(sid, 3, 'activity', 'Write Your Portfolio Spec', [
      h('Activity: Write Your Portfolio Spec'),
      p('Use Claude to write a complete spec for your portfolio website.'),
      bullets([
        'Requirements: at least 8 specific requirements',
        'Design: colors, fonts, layout description',
        'Tasks: ordered list of what to build',
        'Save as portfolio-spec.md in your CodeShala folder',
      ]),
      callout('This spec is your blueprint for Week 3. The more detailed it is, the easier building will be.', 'tip'),
    ], 'Students who struggle with this are usually being too vague. Push them to be specific. "It should look good" is not a requirement.', 20,
    { activity_data: activity('Write Your Portfolio Spec', 'Write a complete spec for your portfolio with requirements, design, and tasks sections.', 20, 'Push for specificity. Vague requirements lead to vague results. Review 2-3 specs with the class.', 'Every student has a saved portfolio-spec.md with at least 8 requirements, design notes, and ordered tasks.') }),

    makeBlock(sid, 4, 'quiz', 'Spec Writing Quiz', [], 'Check spec understanding.', 5,
    { quiz_data: mcq('Which of these is a good requirement for a portfolio website?', [
      { text: 'It should look professional' },
      { text: 'It should be nice' },
      { text: 'The Projects section must display at least 3 project cards, each with a title, description, and link', correct: true },
      { text: 'It should have good design' },
    ], 'Good requirements are specific and measurable. "The Projects section must display at least 3 project cards, each with a title, description, and link" tells you exactly what to build and how to know when it is done.') }),

    makeBlock(sid, 5, 'faq', 'Spec Writing FAQs', [], 'Common spec questions.', 5,
    { faq_items: faqs([
      { q: 'Do real developers write specs?', a: 'Yes, always — though they may call them PRDs (Product Requirements Documents), user stories, or tickets. The format varies but the principle is the same: write down what you are building before you build it.' },
      { q: 'What is a .md file?', a: 'A Markdown file. Markdown is a simple formatting language where # means heading, - means bullet point, and **text** means bold. GitHub renders .md files beautifully. We will use it for your README on Day 18.' },
      { q: 'How detailed should a spec be?', a: 'Detailed enough that someone else could build it from your spec without asking you questions. If you have to explain something verbally, it should be in the spec.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 11 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Spec writing: Requirements, Design, Tasks', 'Using Claude as a thinking partner', 'Your portfolio spec is written']),
      divider(),
      h('Homework'),
      p('Review your spec tonight. Add anything you missed. Think about what your 3 portfolio projects will be.'),
      callout('Tomorrow: GitHub — your code\'s home on the internet.', 'info'),
    ], 'Students now have a plan. The rest of the course is executing that plan.', 10),
  ]
}

function day12Blocks(): Block[] {
  const sid = S[11]
  return [
    makeBlock(sid, 0, 'intro', 'Day 12 — GitHub: Your First Repository', [
      h('Day 12 — GitHub: Your First Repository'),
      p('GitHub is where developers store, share, and collaborate on code. Today you create your developer identity online.'),
      bullets(['What Git and GitHub are', 'Create a GitHub account', 'Create your first repository', 'Upload your bio page']),
      callout('Your GitHub profile is your developer portfolio. Employers look at it. Start building it today.', 'tip'),
    ], 'Many students have heard of GitHub but never used it. Demystify it early: it is just a website that stores your code.', 10),

    makeBlock(sid, 1, 'concept', 'Git vs GitHub', [
      h('Git — Version Control'),
      p('Git is a tool that tracks changes to your files over time. It is like a save history for your entire project.'),
      bullets([
        'Every save is called a "commit"',
        'You can go back to any previous commit',
        'Multiple people can work on the same project',
        'Git runs on your computer',
      ]),
      divider(),
      h('GitHub — Cloud Storage for Code'),
      p('GitHub is a website that stores your Git repositories online.'),
      bullets([
        'Free for public and private repositories',
        'Share your code with anyone',
        'Collaborate with other developers',
        'Deploy websites directly from GitHub',
      ]),
      callout('Git is the tool. GitHub is the service. Like how email is the concept and Gmail is the service.', 'info'),
    ], 'The Git vs GitHub distinction confuses many beginners. The analogy to email/Gmail usually helps.', 20),

    makeBlock(sid, 2, 'demo', 'Create Your First Repository', [
      h('Live Demo: GitHub Setup and First Repo'),
      numbered([
        'Go to github.com and create a free account',
        'Use a professional username — this is your developer identity',
        'Click the + icon > New repository',
        'Name it "portfolio" — keep it lowercase',
        'Check "Add a README file"',
        'Click Create repository',
        'Click "Add file" > "Upload files"',
        'Drag your bio.html and style.css files',
        'Click "Commit changes"',
        'View your files on GitHub',
      ]),
      callout('Your code is now on the internet. Anyone with the link can see it.', 'tip'),
    ], 'Go slowly through account creation. Username choice matters — encourage professional names.', 25),

    makeBlock(sid, 3, 'activity', 'Upload Your Project to GitHub', [
      h('Activity: Create Your GitHub Profile and First Repo'),
      numbered([
        'Create your GitHub account with a professional username',
        'Create a repository called "portfolio"',
        'Upload your bio.html and style.css files',
        'Add a commit message: "Initial portfolio upload"',
        'Share your GitHub profile link with the trainer',
      ]),
      callout('Your GitHub username will appear on your portfolio and CV. Choose wisely.', 'warning'),
    ], 'Help students choose good usernames. Avoid numbers, underscores, or anything unprofessional. This is their developer identity.', 20,
    { activity_data: activity('Upload Your Project to GitHub', 'Create a GitHub account, create a portfolio repository, and upload your bio page files.', 20, 'Check usernames before they commit. Help with file upload issues. Collect GitHub profile links.', 'Every student has a GitHub account with a portfolio repository containing their bio page.') }),

    makeBlock(sid, 4, 'quiz', 'GitHub Quiz', [], 'Check GitHub understanding.', 5,
    { quiz_data: trueFalse('Git and GitHub are the same thing.', false, 'False. Git is a version control tool that runs on your computer. GitHub is a cloud service that hosts Git repositories online. You can use Git without GitHub, but GitHub requires Git.') }),

    makeBlock(sid, 5, 'faq', 'GitHub FAQs', [], 'Common GitHub questions.', 5,
    { faq_items: faqs([
      { q: 'Is GitHub free?', a: 'Yes. GitHub is free for unlimited public and private repositories. The paid plans add team features and advanced CI/CD tools, which you do not need for this course.' },
      { q: 'What is a commit message?', a: 'A short description of what you changed. Good commit messages: "Add contact section", "Fix navigation styling", "Update project descriptions". Bad: "changes", "update", "fix".' },
      { q: 'Can I delete a repository?', a: 'Yes, from the repository Settings page. But be careful — deleting a repository deletes all its history. You cannot undo this.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 12 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Git vs GitHub — the difference', 'Creating a GitHub account and repository', 'Uploading files to GitHub', 'Your developer identity is online']),
      divider(),
      h('Homework'),
      p('Explore GitHub tonight. Look at 3 other developers\' profiles. Notice how they organise their repositories.'),
      callout('Tomorrow: We start building your real portfolio — Hero and About sections.', 'info'),
    ], 'Students now have a GitHub profile. This is a major milestone. Share the links in the group chat.', 10),
  ]
}

function day13Blocks(): Block[] {
  const sid = S[12]
  return [
    makeBlock(sid, 0, 'intro', 'Day 13 — Build Portfolio: Hero + About Sections', [
      h('Day 13 — Build Portfolio: Hero + About Sections'),
      p('Week 3 starts now. You are building your real portfolio — the one you will show to the world.'),
      bullets(['Set up the portfolio project structure', 'Build the Hero section', 'Build the About section', 'Push to GitHub']),
      callout('Reference your wireframe from Day 4 and your spec from Day 11. You planned this. Now you build it.', 'tip'),
    ], 'Students should have their wireframe and spec ready. Reference them throughout the session.', 10),

    makeBlock(sid, 1, 'concept', 'Portfolio Structure', [
      h('Professional Portfolio Structure'),
      code('portfolio/\n  index.html\n  style.css\n  assets/\n    profile-photo.jpg\n  README.md', 'text'),
      divider(),
      h('Hero Section Anatomy'),
      bullets([
        'Full-width section at the top of the page',
        'Your name as the main heading (h1)',
        'Your title/role as a subheading',
        'A short tagline (1-2 sentences)',
        'A call-to-action button (View Projects or Contact Me)',
        'Optional: your photo',
      ]),
      divider(),
      h('About Section Anatomy'),
      bullets([
        'Your photo (or avatar)',
        'A 2-3 paragraph bio',
        'Your background and what you are learning',
        'What you are looking for (internship, freelance, etc.)',
      ]),
    ], 'Show a real portfolio example on the projector. Point out the hero and about sections.', 15),

    makeBlock(sid, 2, 'demo', 'Build Hero Section Live', [
      h('Live Demo: Hero Section with Claude'),
      numbered([
        'Create a new folder: portfolio/',
        'Create index.html and style.css',
        'Prompt Claude: "Write HTML and CSS for a portfolio hero section. Name: [your name]. Title: No-Code Developer. Tagline: Building the web without barriers. Button: View My Work. Dark background #0f0f0f, white text, purple accent #6c63ff."',
        'Paste the HTML into index.html',
        'Paste the CSS into style.css',
        'Open with Live Server',
        'Adjust anything that does not look right using follow-up prompts',
      ]),
      callout('Use your own name and details. This is YOUR portfolio.', 'tip'),
    ], 'Students follow along building their own version. Encourage personalisation — different colors, different taglines.', 25),

    makeBlock(sid, 3, 'activity', 'Build Hero + About', [
      h('Activity: Build Your Hero and About Sections'),
      p('Using Claude and your spec, build both sections of your portfolio.'),
      bullets([
        'Hero: your name, title, tagline, and a button',
        'About: your photo (or placeholder), bio paragraphs',
        'Both sections styled and looking good',
        'Commit and push to GitHub when done',
      ]),
      callout('Prompt tip: "Here is my current HTML: [paste]. Add an About section below the hero with a photo placeholder and 2 paragraphs."', 'tip'),
    ], 'This is a long build session. Walk around constantly. Students will have very different results — that is good.', 30,
    { activity_data: activity('Build Hero + About Sections', 'Build and style the Hero and About sections of your portfolio using Claude.', 30, 'Walk the room. Help with CSS issues. Encourage personalisation. Push everyone to commit to GitHub.', 'Every student has a portfolio with a styled Hero and About section pushed to GitHub.') }),

    makeBlock(sid, 4, 'quiz', 'Portfolio Structure Quiz', [], 'Quick check.', 5,
    { quiz_data: mcq('What is the purpose of the Hero section in a portfolio?', [
      { text: 'To list all your projects in detail' },
      { text: 'To show your contact information' },
      { text: 'To immediately communicate who you are and what you do, and prompt a call to action', correct: true },
      { text: 'To display your educational background' },
    ], 'The Hero section is the first thing visitors see. Its job is to answer "who are you?" and "what do you want me to do?" in under 5 seconds. Name, title, tagline, and a clear call-to-action button.') }),

    makeBlock(sid, 5, 'faq', 'Portfolio Building FAQs', [], 'Common portfolio questions.', 5,
    { faq_items: faqs([
      { q: 'What should I write in my bio if I have no experience?', a: 'Write about what you are learning, why you are learning it, and what you want to build. Honesty about being a beginner is fine. Enthusiasm and direction are more important than experience at this stage.' },
      { q: 'Should I use a real photo?', a: 'Yes, if you are comfortable. A real photo builds trust and makes your portfolio more personal. If not, a professional avatar or illustration works too.' },
      { q: 'My portfolio looks different from the demo. Is that okay?', a: 'Yes! Your portfolio should look like YOU, not like the trainer\'s demo. Different colors, layouts, and content are encouraged. The goal is a portfolio you are proud of.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 13 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Portfolio project structure', 'Hero section: name, title, tagline, CTA', 'About section: photo, bio', 'Pushed to GitHub']),
      divider(),
      h('Homework'),
      p('Refine your Hero and About sections tonight. Ask a friend or family member to look at it and give feedback.'),
      callout('Tomorrow: Mid-Course Checkpoint. Come ready to show what you have built.', 'info'),
    ], 'Students have a real portfolio started. This is a huge milestone. Celebrate it.', 10),
  ]
}

function day14Blocks(): Block[] {
  const sid = S[13]
  return [
    makeBlock(sid, 0, 'intro', 'Day 14 — Mid-Course Checkpoint + Show and Tell', [
      h('Day 14 — Mid-Course Checkpoint + Show and Tell'),
      p('Halfway through. Today you present what you have built, get feedback, and plan the second half.'),
      bullets(['Show and Tell: everyone presents their portfolio so far', 'Peer feedback session', 'Review what is working and what is not', 'Plan for Week 3 completion']),
      callout('Presenting your work is a skill. Practice it today — you will do it for real on Day 21.', 'tip'),
    ], 'Set up a presentation format. Each student gets 2 minutes to show their portfolio on the projector.', 10),

    makeBlock(sid, 1, 'concept', 'How to Give Good Feedback', [
      h('The Feedback Framework'),
      bullets([
        'Start with what works: "I like how you..."',
        'Be specific: "The purple color scheme is consistent and professional"',
        'Suggest, do not criticise: "Have you considered..." instead of "This is wrong"',
        'Focus on the work, not the person',
      ]),
      divider(),
      h('What to Look For in a Portfolio'),
      bullets([
        'Is the name and title immediately visible?',
        'Is the purpose of the site clear in 5 seconds?',
        'Does it look good on a phone? (resize the browser)',
        'Are there any broken elements or missing images?',
        'Is the text readable (contrast, size)?',
      ]),
    ], 'Model good feedback yourself. Students learn how to give feedback by watching you give it.', 15),

    makeBlock(sid, 2, 'demo', 'Mid-Course Progress Review', [
      h('What You Have Built in 13 Days'),
      bullets([
        'Day 1-4: Computer basics, file management, logic thinking, wireframing',
        'Day 5-6: AI tools, prompt engineering',
        'Day 7: Week 1 review',
        'Day 8-9: HTML and CSS fundamentals',
        'Day 10: VS Code professional setup',
        'Day 11: Spec writing',
        'Day 12: GitHub account and first repository',
        'Day 13: Portfolio Hero and About sections',
      ]),
      callout('In 13 days you went from zero to a live portfolio on GitHub. Most people take months to get here.', 'tip'),
    ], 'This recap builds confidence. Students often underestimate their progress.', 10),

    makeBlock(sid, 3, 'activity', 'Show and Tell', [
      h('Activity: Present Your Portfolio'),
      p('Each student presents their portfolio for 2 minutes.'),
      bullets([
        'Show your portfolio in the browser',
        'Explain: what you built, what you are proud of, what you want to improve',
        'Class gives feedback using the framework above',
        'Trainer notes 1 specific improvement for each student',
      ]),
      callout('Be brave. Everyone is at the same stage. This is a safe space.', 'info'),
    ], 'Keep presentations to 2 minutes each. Give specific, actionable feedback. Note common issues to address in the next sessions.', 40,
    { activity_data: activity('Show and Tell', 'Each student presents their portfolio for 2 minutes and receives peer feedback.', 40, 'Keep time strictly. Give specific feedback. Note common issues across portfolios to address in Days 15-17.', 'Every student has presented their work and received specific feedback on what to improve.') }),

    makeBlock(sid, 4, 'quiz', 'Halfway Check', [], 'Reflection quiz.', 5,
    { quiz_data: mcq('What is the most important thing a portfolio homepage must communicate in the first 5 seconds?', [
      { text: 'Your full work history and education' },
      { text: 'Who you are, what you do, and what you want the visitor to do next', correct: true },
      { text: 'All your technical skills in detail' },
      { text: 'Your contact information' },
    ], 'The 5-second rule: a visitor should immediately understand who you are, what you do, and what action to take. Name + title + tagline + CTA button achieves this. Everything else is secondary.') }),

    makeBlock(sid, 5, 'faq', 'Mid-Course FAQs', [], 'Common questions at the halfway point.', 5,
    { faq_items: faqs([
      { q: 'My portfolio looks worse than others. Should I be worried?', a: 'No. Everyone learns at a different pace. The goal is YOUR progress, not comparison. Focus on the specific feedback you received today and implement it.' },
      { q: 'Can I change my portfolio design completely?', a: 'Yes. Day 14 is the perfect time to pivot if you are not happy with your direction. You have 7 days left to build. A fresh start now is better than finishing something you do not like.' },
      { q: 'What should my 3 portfolio projects be?', a: 'They can be anything you build in this course, personal projects, or even redesigns of existing websites. The key is that each project shows a skill and has a live link.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 14 Wrap-Up', [
      h('Halfway There — Keep Going'),
      p('You have presented your work, received feedback, and know exactly what to improve.'),
      bullets(['Specific feedback received for your portfolio', 'Week 3 plan: Skills, Projects, Contact, Polish, Deploy']),
      divider(),
      h('Action Items'),
      p('Based on the feedback you received today, write down 3 specific things to improve in your portfolio.'),
      callout('Tomorrow: Skills + Projects sections. The portfolio starts to look complete.', 'info'),
    ], 'End on encouragement. The second half is where portfolios really come together.', 10),
  ]
}

// ─── DAY 15: Build Portfolio — Skills + Projects Sections ─────────────────────
function day15Blocks(): Block[] {
  const sid = S[14]
  return [
    makeBlock(sid, 0, 'intro', 'Day 15 — Build Portfolio: Skills + Projects Sections', [
      h('Day 15 — Build Portfolio: Skills + Projects Sections'),
      p('Today you add the meat of your portfolio — the Skills and Projects sections that show what you can do.'),
      bullets(['Skills section with visual indicators', 'Projects section with cards', 'Linking to live projects or GitHub repos', 'Styling for visual hierarchy']),
      callout('Your projects do not need to be complex. They need to be real, working, and well-presented.', 'tip'),
    ], 'Students should have their feedback from Day 14. Start by addressing common issues observed.', 10),

    makeBlock(sid, 1, 'concept', 'Skills and Projects Design', [
      h('How to Present Skills'),
      bullets(['Group by category: Languages, Tools, Soft Skills', 'Use badges or pills for visual interest', 'Be honest — only list skills you can discuss', 'Include skills you are currently learning']),
      divider(),
      h('Projects Section Anatomy'),
      bullets(['Project cards in a grid layout', 'Each card needs: title, description, tech used, live link', 'Start with 3 projects minimum', 'Order by most impressive first']),
      callout('A well-presented simple project beats a complex project with poor presentation.', 'info'),
    ], 'Show examples of good skills and projects sections from real portfolios.', 20),

    makeBlock(sid, 2, 'demo', 'Build Skills Section Live', [
      h('Live Demo: Skills Section with Claude'),
      numbered(['Prompt Claude: "Add a Skills section to my portfolio HTML. Categories: Web Development (HTML, CSS, VS Code), AI Tools (Claude, Prompt Engineering), Soft Skills (Problem Solving, Communication). Use pill-style badges."', 'Paste the HTML and CSS', 'Adjust colors and layout', 'Use Claude to refine: "Make the skills pills smaller and add hover effects"']),
      callout('Skills sections are about visual hierarchy. The most important skills should stand out.', 'tip'),
    ], 'Build this live. Show the iterative refinement process with Claude.', 25),

    makeBlock(sid, 3, 'activity', 'Build Skills + Projects Sections', [
      h('Activity: Complete Skills and Projects'),
      p('Add both sections to your portfolio and style them professionally.'),
      bullets(['Skills section with at least 8-10 skills grouped into categories', 'Projects section with 3 project cards', 'Each project must have: title, description, tech used, and a link', 'Both sections styled to match your portfolio theme', 'Commit and push to GitHub when done']),
      callout('If you do not have 3 projects yet, use: "Personal Portfolio (This site!)", "Bio Page (From Day 8)", "Coming Soon Project"', 'info'),
    ], 'This is a substantial build. Students will need the full time. Help with layout issues especially.', 35,
    { activity_data: activity('Build Skills + Projects Sections', 'Add Skills and Projects sections to your portfolio with styling.', 35, 'Help with grid layouts. Check that links work. Encourage good project descriptions.', 'Every student has Skills and Projects sections added to their portfolio and pushed to GitHub.') }),

    makeBlock(sid, 4, 'quiz', 'Portfolio Content Quiz', [], 'Check understanding of portfolio content.', 5,
    { quiz_data: mcq('What should you include for each project in your Projects section?', [
      { text: 'Just the project name' },
      { text: 'Name, description, technologies used, and a link to view or the code', correct: true },
      { text: 'Only a screenshot' },
      { text: 'A detailed technical blog post about how you built it' },
    ], 'Each project card should give enough information for someone to understand what you built, how you built it, and where they can see it. Minimum: title, description, tech stack, link.') }),

    makeBlock(sid, 5, 'faq', 'Skills and Projects FAQs', [], 'Common questions about portfolio content.', 5,
    { faq_items: faqs([
      { q: 'Should I list skills I am still learning?', a: 'Yes. Frame them honestly: "Currently learning: JavaScript". Never claim mastery of something you have only touched once.' },
      { q: 'What if my projects are too simple?', a: 'Simple projects well-presented are better than nothing. Your bio page from Day 8 is a legitimate project. Your portfolio itself is a project.' },
      { q: 'Should I include school projects?', a: 'Include anything that demonstrates your skills and that you are allowed to share publicly.' },
    ]) }),

    makeBlock(sid, 6, 'wrapup', 'Day 15 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Skills section with categorised skills', 'Projects section with project cards', 'Linking projects to live sites or repos']),
      divider(),
      h('Homework'),
      p('Add screenshots or placeholder images to your project cards.'),
      callout('Tomorrow: Contact section and mobile responsiveness.', 'info'),
    ], 'Portfolios are starting to look complete. Celebrate the progress.', 10),
  ]
}

// ─── DAY 16 ───────────────────────────────────────────────────────────────────
function day16Blocks(): Block[] {
  const sid = S[15]
  return [
    makeBlock(sid, 0, 'intro', 'Day 16 — Contact Section + Mobile Responsiveness', [
      h('Day 16 — Contact Section + Mobile Responsiveness'),
      p('Make your portfolio accessible on every device and give people a way to reach you.'),
      bullets(['Contact section with links', 'Responsive design basics', 'CSS media queries', 'Testing on mobile']),
      callout('Over 60% of web traffic is mobile. If your portfolio does not work on phones, you lose more than half your audience.', 'tip'),
    ], 'Start by showing a non-responsive portfolio on a phone. The difference is stark.', 10),
    makeBlock(sid, 1, 'concept', 'Contact Section + Responsive Design', [
      h('What to Include in Contact'),
      bullets(['Email (professional address)', 'LinkedIn profile link', 'GitHub profile link']),
      callout('Never put your phone number on a public portfolio unless you want spam calls.', 'warning'),
      divider(),
      h('Responsive Design Basics'),
      p('Responsive design means your site works on screens of all sizes.'),
      code('@media (max-width: 768px) {\n  .hero h1 { font-size: 32px; }\n  .grid { grid-template-columns: 1fr; }\n}', 'css'),
    ], 'Explain media queries simply. Most students have never heard of them.', 25),
    makeBlock(sid, 2, 'demo', 'Make Portfolio Responsive', [
      h('Live Demo: Add Mobile Responsiveness'),
      numbered(['Open DevTools and toggle device toolbar (Ctrl+Shift+M)', 'View portfolio on iPhone SE size — notice what breaks', 'Prompt Claude: "Make my portfolio responsive for mobile. Here is my CSS: [paste]. Fix the hero text size and section stacking."', 'Add the media query CSS', 'Test on multiple device sizes']),
      callout('Responsive design is iterative. Test, find what breaks, fix it, test again.', 'tip'),
    ], 'Do this live. Students see the immediate impact of responsive CSS.', 25),
    makeBlock(sid, 3, 'activity', 'Add Contact + Make Responsive', [
      h('Activity: Contact Section and Mobile Optimization'),
      bullets(['Add a Contact section with email, GitHub, and LinkedIn links', 'Add media queries to make all sections responsive', 'Test on at least 3 device sizes in DevTools', 'Commit and push to GitHub']),
    ], 'Walk around with your phone. Test on real devices if possible.', 30,
    { activity_data: activity('Add Contact + Make Responsive', 'Add Contact section and implement responsive design.', 30, 'Test on real devices. Check that buttons are tappable. Help with media query issues.', 'Every student has a Contact section and a mobile-responsive portfolio.') }),
    makeBlock(sid, 4, 'quiz', 'Responsive Design Quiz', [], 'Check responsive understanding.', 5,
    { quiz_data: mcq('What does @media (max-width: 768px) mean?', [
      { text: 'Apply styles only on screens wider than 768px' },
      { text: 'Apply styles on screens 768px wide or smaller', correct: true },
      { text: 'Make all elements exactly 768px wide' },
      { text: 'Hide elements on small screens' },
    ], 'max-width: 768px means the styles apply on screens UP TO 768px wide — phones and small tablets.') }),
    makeBlock(sid, 5, 'faq', 'Responsive Design FAQs', [], 'Common responsive questions.', 5,
    { faq_items: faqs([
      { q: 'What is a good breakpoint for mobile?', a: '768px for tablets and below, 480px for phones. Choose breakpoints where YOUR design breaks.' },
      { q: 'Mobile first or desktop first?', a: 'Professionals often design mobile-first. For learning, start with whichever feels natural.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'Day 16 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Contact section with professional links', 'Media queries for responsive design', 'Testing on multiple device sizes']),
      divider(),
      h('Homework'),
      p('Send your portfolio link to a friend with a phone. Ask them to test it and screenshot any issues.'),
      callout('Tomorrow: Polish day — fonts, colors, animations.', 'info'),
    ], 'Mobile responsiveness is a major milestone. Their portfolios now work everywhere.', 10),
  ]
}

// ─── DAY 17 ───────────────────────────────────────────────────────────────────
function day17Blocks(): Block[] {
  const sid = S[16]
  return [
    makeBlock(sid, 0, 'intro', 'Day 17 — Polish Day: Fonts, Colors, Animation', [
      h('Day 17 — Polish Day: Fonts, Colors, Animation'),
      p('Your portfolio works. Today you make it beautiful. Polish is what separates amateur from professional.'),
      bullets(['Google Fonts for typography', 'Color palette selection', 'Subtle CSS animations', 'Attention to detail']),
      callout('Good design is invisible. Great design makes people remember you.', 'tip'),
    ], 'Show before/after examples of portfolios with and without polish. The difference is dramatic.', 10),
    makeBlock(sid, 1, 'concept', 'Design Fundamentals for Developers', [
      h('Typography: Pick 2 Fonts Maximum'),
      bullets(['One for headings, one for body text', 'Google Fonts is free with thousands of options', 'Safe combos: Sora + DM Sans, Montserrat + Lato, Playfair Display + Source Sans Pro']),
      divider(),
      h('Color Palette: 3-4 Colors Total'),
      bullets(['Background, text, accent, secondary accent', 'Use coolors.co or ask Claude to suggest a palette', 'Ensure good contrast for readability']),
      divider(),
      h('Animations: Less is More'),
      code('.button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.2);\n  transition: all 0.3s ease;\n}', 'css'),
      callout('Animations should enhance, not distract. Subtle hover effects are all you need.', 'info'),
    ], 'Show examples of good and bad typography, color choices, and animations.', 25),
    makeBlock(sid, 2, 'demo', 'Apply Polish Live', [
      h('Live Demo: Transform with Polish'),
      numbered(['Go to fonts.google.com and pick 2 fonts', 'Copy the link tags and add to HTML head', 'Update CSS font-family', 'Prompt Claude: "Suggest a color palette for a developer portfolio. Professional, modern, accessible."', 'Apply the suggested colors', 'Add hover animations to buttons and links']),
      callout('The before/after is striking. Small polish changes create huge visual impact.', 'tip'),
    ], 'Do this transformation live. Students love seeing the instant upgrade.', 25),
    makeBlock(sid, 3, 'activity', 'Polish Your Portfolio', [
      h('Activity: Full Portfolio Polish Pass'),
      bullets(['Add Google Fonts — choose 2 complementary fonts', 'Implement a cohesive color palette', 'Add hover effects to all interactive elements', 'Check spacing and alignment', 'Get feedback from a peer and refine', 'Commit final polished version to GitHub']),
      callout('Spend 10 minutes just looking at your portfolio critically. What feels off? Fix it.', 'info'),
    ], 'This is a creative session. Encourage experimentation. Give design feedback.', 35,
    { activity_data: activity('Polish Your Portfolio', 'Apply fonts, colors, animations, and attention to detail across your entire portfolio.', 35, 'Give design feedback. Encourage subtlety over flashiness. Help with color contrast issues.', 'Every student has a polished, professional-looking portfolio with custom fonts, cohesive colors, and smooth interactions.') }),
    makeBlock(sid, 4, 'quiz', 'Design Polish Quiz', [], 'Check design understanding.', 5,
    { quiz_data: mcq('Why should you limit your portfolio to 2 fonts maximum?', [
      { text: 'To make the page load faster' },
      { text: 'To maintain visual consistency and avoid looking cluttered', correct: true },
      { text: 'Because Google Fonts only allows 2 fonts per page' },
      { text: 'To save CSS code' },
    ], 'Too many fonts create visual chaos. 2 fonts gives you variety while maintaining a cohesive, professional look.') }),
    makeBlock(sid, 5, 'faq', 'Design and Polish FAQs', [], 'Common polish questions.', 5,
    { faq_items: faqs([
      { q: 'How do I know if my color palette is good?', a: 'Test for contrast, ask 3 people for feedback, and compare to professional portfolios you admire.' },
      { q: 'My animations feel too slow. How do I fix them?', a: 'Adjust the transition duration. 0.2s-0.3s feels snappy. 0.5s+ feels sluggish.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'Day 17 Wrap-Up', [
      h('What We Covered Today'),
      bullets(['Typography with Google Fonts', 'Color palette selection', 'Subtle CSS animations and transitions']),
      divider(),
      h('Homework'),
      p('Show your polished portfolio to someone outside the class. Ask: does this look professional?'),
      callout('Tomorrow: Final GitHub push and README writing.', 'info'),
    ], 'Portfolios are now polished and professional. Take screenshots before tomorrow.', 10),
  ]
}

// ─── DAY 18 ───────────────────────────────────────────────────────────────────
function day18Blocks(): Block[] {
  const sid = S[17]
  return [
    makeBlock(sid, 0, 'intro', 'Day 18 — Final GitHub Push + README Writing', [
      h('Day 18 — Final GitHub Push + README Writing'),
      p('A portfolio without documentation is incomplete. Today you write a professional README.'),
      bullets(['What makes a good README', 'Markdown formatting', 'Documenting your portfolio', 'Final GitHub push before deployment']),
      callout('Your README is the first thing people see on GitHub. Make it count.', 'tip'),
    ], 'Show examples of great READMEs from real GitHub repositories.', 10),
    makeBlock(sid, 1, 'concept', 'Anatomy of a Great README', [
      h('Essential Sections'),
      numbered(['Project Title and Description', 'Screenshot — show, do not just tell', 'Features list', 'Tech Stack', 'Live Link', 'Future Improvements', 'Author/Contact']),
      divider(),
      h('Markdown Basics'),
      code('# Heading 1\n## Heading 2\n**bold** *italic*\n- bullet point\n[Link](https://url.com)\n![Image](image-url.jpg)', 'markdown'),
      callout('GitHub automatically renders .md files as formatted documents.', 'info'),
    ], 'Explain Markdown live. Show how it renders on GitHub.', 20),
    makeBlock(sid, 2, 'demo', 'Write README with Claude', [
      h('Live Demo: Professional README'),
      numbered(['Create README.md in your portfolio folder', 'Prompt Claude: "Write a professional README.md for my personal portfolio website. Include: title, description, screenshot section, features, tech stack (HTML, CSS, VS Code, Claude AI), live link section, and contact info. Use Markdown."', 'Paste the output into README.md', 'Add your screenshot and actual live link', 'Push to GitHub and verify it renders']),
      callout('A README with a screenshot gets 10x more attention than one without.', 'tip'),
    ], 'Build this live. Show the markdown rendering on GitHub.', 25),
    makeBlock(sid, 3, 'activity', 'Write README and Final Push', [
      h('Activity: Complete Documentation and GitHub Push'),
      bullets(['Write a complete README.md with all sections', 'Take a screenshot of your portfolio and add it', 'Review all your code — fix any TODO notes', 'Push everything to GitHub', 'Verify README renders correctly', 'Make your repository public if it is private']),
      callout('This is your last chance to fix anything before deployment tomorrow.', 'warning'),
    ], 'Check every student\'s GitHub repo. README rendering issues are common.', 30,
    { activity_data: activity('Write README and Final Push', 'Write a professional README and push your complete portfolio to GitHub.', 30, 'Check that READMEs render correctly. Ensure repos are public. Verify all files are present.', 'Every student has a complete portfolio on GitHub with a professional README.') }),
    makeBlock(sid, 4, 'quiz', 'Documentation Quiz', [], 'Check README understanding.', 5,
    { quiz_data: mcq('What is the purpose of a README file?', [
      { text: 'To store secret API keys' },
      { text: 'To document what the project is, how to use it, and how to contribute', correct: true },
      { text: 'To list all the bugs in the project' },
      { text: 'To replace the need for comments in code' },
    ], 'The README is the front door of your repository. A good README is the difference between a project people use and one they ignore.') }),
    makeBlock(sid, 5, 'faq', 'README and GitHub FAQs', [], 'Common documentation questions.', 5,
    { faq_items: faqs([
      { q: 'Should my README be super detailed or brief?', a: 'Brief but complete. Cover the essentials in 30 seconds of reading.' },
      { q: 'What if I do not have a live link yet?', a: 'Add a placeholder: "Live link coming soon". Update it after deployment tomorrow.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'Day 18 Wrap-Up', [
      h('Pre-Deployment Checklist'),
      bullets(['All files on GitHub', 'README complete with screenshot', 'Repository is public', 'No broken links or missing images']),
      callout('Tomorrow: Deployment on Cloudflare Pages. Your portfolio goes live.', 'info'),
    ], 'Make sure everyone is ready. No one should be blocked tomorrow by GitHub issues.', 10),
  ]
}

// ─── DAY 19 ───────────────────────────────────────────────────────────────────
function day19Blocks(): Block[] {
  const sid = S[18]
  return [
    makeBlock(sid, 0, 'intro', 'Day 19 — Deployment: Go Live on Cloudflare Pages', [
      h('Day 19 — Deployment: Go Live on Cloudflare Pages'),
      p('Today your portfolio becomes a real website with a real URL that anyone in the world can visit.'),
      bullets(['What deployment means', 'Cloudflare Pages overview', 'Connect GitHub to Cloudflare', 'Your site goes live']),
      callout('After today, you can share your portfolio on LinkedIn and your CV. This is real.', 'tip'),
    ], 'High energy day. Have the deployment flow ready to demonstrate.', 10),
    makeBlock(sid, 1, 'concept', 'What is Deployment?', [
      h('From Local to Live'),
      p('Right now your portfolio only exists on your computer and GitHub. Deployment puts it on a server so anyone can access it via a URL.'),
      bullets(['GitHub stores your code', 'Cloudflare Pages hosts your website', 'Every push to GitHub auto-updates your site', 'You get a free .pages.dev URL']),
      divider(),
      h('Why Cloudflare Pages?'),
      bullets(['Free for personal projects', 'Automatic HTTPS', 'Fast global CDN', 'Auto-deployment from GitHub', 'Zero configuration for static sites']),
    ], 'Explain the deployment pipeline clearly. Students often confuse GitHub with hosting.', 20),
    makeBlock(sid, 2, 'demo', 'Deploy to Cloudflare Pages', [
      h('Live Demo: Full Deployment Walkthrough'),
      numbered(['Go to pages.cloudflare.com and create a free account', 'Click "Create a project" > "Connect to Git"', 'Authorize Cloudflare to access your GitHub', 'Select your portfolio repository', 'Framework preset: None (static site)', 'Build command: leave empty', 'Build output directory: / (root)', 'Click "Save and Deploy"', 'Wait 1-2 minutes — watch the build logs', 'Site goes live! Click "Visit site"', 'Share the URL: yourname.pages.dev']),
      callout('From now on, every push to GitHub automatically updates your live site. This is continuous deployment.', 'tip'),
    ], 'Do this live from start to finish. Let students see the entire process.', 30),
    makeBlock(sid, 3, 'activity', 'Deploy Your Portfolio', [
      h('Activity: Go Live'),
      numbered(['Create a Cloudflare Pages account', 'Connect your GitHub account', 'Deploy your portfolio repository', 'Wait for the build to complete', 'Visit your live site and test everything', 'Share your live URL in the class group chat']),
      callout('If deployment fails, check the build logs. Most common issue: wrong build directory or missing index.html.', 'warning'),
    ], 'Be ready to debug deployment issues. Common problems: repo not public, wrong build settings.', 25,
    { activity_data: activity('Deploy Your Portfolio', 'Deploy your portfolio to Cloudflare Pages and share your live URL.', 25, 'Help with deployment errors. Verify each site goes live. Collect all live URLs.', 'Every student has a live portfolio accessible via a public URL.') }),
    makeBlock(sid, 4, 'quiz', 'Deployment Quiz', [], 'Check deployment understanding.', 5,
    { quiz_data: mcq('What happens when you push new code to GitHub after deploying to Cloudflare Pages?', [
      { text: 'Nothing — you need to redeploy manually' },
      { text: 'Cloudflare automatically rebuilds and updates your live site', correct: true },
      { text: 'Your site goes offline until you click Deploy again' },
      { text: 'GitHub sends you an email asking permission to deploy' },
    ], 'Cloudflare Pages watches your GitHub repo. Every push triggers an automatic rebuild and deployment.') }),
    makeBlock(sid, 5, 'faq', 'Deployment FAQs', [], 'Common deployment questions.', 5,
    { faq_items: faqs([
      { q: 'Can I use my own domain name?', a: 'Yes. You can buy a domain and connect it to Cloudflare Pages. Optional and not covered in this course.' },
      { q: 'How much does Cloudflare Pages cost?', a: 'The free tier is generous: unlimited sites, unlimited bandwidth for personal projects.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'You Are Live on the Internet', [
      h('Your Portfolio is Now a Real Website'),
      bullets(['Deployed to Cloudflare Pages', 'Continuous deployment from GitHub', 'Public URL you can share']),
      divider(),
      h('Next Steps'),
      bullets(['Add your portfolio URL to your LinkedIn profile', 'Add it to your CV', 'Test it on different devices and browsers']),
      callout('Tomorrow: Demo Day prep. You will present your portfolio to the group.', 'info'),
    ], 'Take a class screenshot with everyone\'s portfolio URLs visible.', 10),
  ]
}

// ─── DAY 20 ───────────────────────────────────────────────────────────────────
function day20Blocks(): Block[] {
  const sid = S[19]
  return [
    makeBlock(sid, 0, 'intro', 'Day 20 — Demo Day Prep: Rehearse Your Presentation', [
      h('Day 20 — Demo Day Prep: Rehearse Your Presentation'),
      p('Tomorrow is Demo Day. Today you prepare a 3-minute presentation that showcases your work and your growth.'),
      bullets(['Structuring a 3-minute demo', 'What to show and what to skip', 'Handling questions', 'Practice presentations']),
      callout('Public speaking is a skill. Practice is what makes it easier.', 'tip'),
    ], 'Set up the room for presentations. Everyone will present today as practice for tomorrow.', 10),
    makeBlock(sid, 1, 'concept', 'The 3-Minute Demo Structure', [
      h('What to Cover in 3 Minutes'),
      numbered(['Introduction (15 sec): Your name, background, why you joined', 'The Journey (30 sec): What you learned, hardest part, biggest surprise', 'The Portfolio (90 sec): Walk through your live site', 'The Tech (30 sec): What you built it with', 'What is Next (15 sec): Where you go from here']),
      callout('3 minutes goes fast. Practice with a timer. Cut anything that does not add value.', 'warning'),
      divider(),
      h('Demo Tips'),
      bullets(['Open your live site before you start talking', 'Scroll slowly — give people time to see', 'Be proud but honest about what you are still learning', 'Smile. Breathe. This is a celebration, not a test.']),
    ], 'Show an example 3-minute demo. Time it. Let students see what 3 minutes looks like.', 20),
    makeBlock(sid, 2, 'demo', 'Handling Questions', [
      h('Common Questions and How to Answer'),
      bullets(['"How long did this take?" — "21 days, 2 hours per day"', '"Did you write all the code yourself?" — "I used Claude AI to help generate code, but I customised and understood everything"', '"What was the hardest part?" — Be honest', '"What would you build next?" — Have an answer ready']),
      divider(),
      p('It is okay to say "I do not know, but I know how to find out." This is an honest, professional answer.'),
    ], 'Role-play some Q&A scenarios. Let students practice answering unexpected questions.', 15),
    makeBlock(sid, 3, 'activity', 'Full Rehearsal', [
      h('Activity: Practice Presentations'),
      p('Everyone presents their 3-minute demo to the class.'),
      numbered(['Present in order', 'Hard stop at 3 minutes', 'Class asks 1-2 questions after each', 'Trainer gives specific feedback', 'Note what to improve for tomorrow']),
      callout('This is practice. Mistakes here are good — they will not happen tomorrow.', 'info'),
    ], 'Run this like the real Demo Day. Strict timing. Encourage applause after each presentation.', 50,
    { activity_data: activity('Full Rehearsal', 'Each student presents their 3-minute demo and receives feedback.', 50, 'Time strictly. Give specific feedback. Note who needs extra support tomorrow.', 'Every student has rehearsed their presentation and knows what to improve for Demo Day.') }),
    makeBlock(sid, 4, 'quiz', 'Presentation Readiness Check', [], 'Quick self-assessment.', 5,
    { quiz_data: trueFalse('In a 3-minute demo, you should spend most of the time explaining how the code works line by line.', false, 'False. In 3 minutes, focus on the big picture: what you built, why it matters, what you learned. Keep it high-level and engaging.') }),
    makeBlock(sid, 5, 'faq', 'Demo Day Prep FAQs', [], 'Common presentation questions.', 5,
    { faq_items: faqs([
      { q: 'What if I freeze or forget what to say?', a: 'Have notes on your phone or paper. Take a breath, refer to your notes, continue. No one will judge you.' },
      { q: 'Should I memorise my presentation word-for-word?', a: 'No. Know your structure and key points, speak naturally. Memorised presentations sound robotic.' },
      { q: 'What if my portfolio is not perfect?', a: 'No one expects perfection. Show what you built, acknowledge what you would improve.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'Demo Day Prep Complete', [
      h('You Are Ready for Demo Day'),
      bullets(['3-minute structure practiced', 'Q&A skills rehearsed', 'Feedback received and noted']),
      divider(),
      h('Tonight'),
      bullets(['Review your presentation one more time', 'Test your live site on the device you will use tomorrow', 'Get good sleep — tomorrow is your moment']),
      callout('Tomorrow: DEMO DAY. Presentations, certificates, celebration.', 'tip'),
    ], 'End with encouragement. Students are nervous and excited. Reassure them they are ready.', 10),
  ]
}

// ─── DAY 21 ───────────────────────────────────────────────────────────────────
function day21Blocks(): Block[] {
  const sid = S[20]
  return [
    makeBlock(sid, 0, 'intro', 'DEMO DAY — Live Presentations + Certificates', [
      h('DEMO DAY — This Is Your Moment'),
      p('You started 21 days ago with zero coding experience. Today you present your work to the world.'),
      bullets(['Final presentations', 'Audience Q&A', 'Certificates of completion', 'Celebration and next steps']),
      callout('Today is about celebration. You did it. Be proud.', 'tip'),
    ], 'Set up the room for an event. Invite guests if possible. Make it special.', 15),
    makeBlock(sid, 1, 'concept', 'What You Achieved in 21 Days', [
      h('From Zero to Deployed'),
      bullets(['Week 1: Computer basics, logic thinking, AI tools, prompt engineering', 'Week 2: HTML, CSS, VS Code, GitHub, spec writing, portfolio foundations', 'Week 3: Full portfolio build, polish, deployment, presentation skills']),
      divider(),
      h('Skills You Now Have'),
      bullets(['HTML and CSS fundamentals', 'Using AI tools professionally', 'Version control with Git and GitHub', 'Deployment and hosting', 'Project planning and documentation', 'Public presentation skills']),
      callout('These skills are transferable to any development path you choose next.', 'info'),
    ], 'This recap is important. Make the learning explicit. Students often underestimate how much they have learned.', 20),
    makeBlock(sid, 2, 'demo', 'Trainer Reflection', [
      h('A Word from the Trainer'),
      bullets(['Highlight individual growth moments', 'Share memorable moments from the course', 'Acknowledge the effort everyone put in', 'Express pride in the group']),
      callout('This is your chance as a trainer to acknowledge each student personally. Make it count.', 'tip'),
    ], 'Keep this short but heartfelt. Students remember this moment.', 10),
    makeBlock(sid, 3, 'activity', 'Final Presentations', [
      h('Activity: Demo Day Presentations'),
      p('Each student presents their portfolio to the audience. 3 minutes per person plus Q&A.'),
      numbered(['Student shares their screen', 'Delivers 3-minute presentation', 'Audience asks 1-2 questions', 'Applause and transition to next presenter']),
      callout('This is the culmination of 21 days. Celebrate every presentation. Applaud loudly.', 'tip'),
    ], 'Plan for 5-7 minutes per student including setup and Q&A. Keep energy high throughout.', 90,
    { activity_data: activity('Final Presentations', 'Each student presents their portfolio in a formal Demo Day setting.', 90, 'Keep time loosely but keep moving. Encourage audience engagement. Celebrate every presentation.', 'Every student has presented their portfolio to an audience and received recognition.') }),
    makeBlock(sid, 4, 'quiz', 'Final Reflection', [], 'A reflection moment, not a test.', 10,
    { quiz_data: mcq('What is the most important thing you learned in the last 21 days?', [
      { text: 'HTML and CSS syntax' },
      { text: 'How to use AI tools' },
      { text: 'That I can learn hard things if I stick with them', correct: true },
      { text: 'How to deploy a website' },
    ], 'The technical skills matter, but the real win is the confidence that comes from completing something hard. You proved to yourself that you can learn anything.') }),
    makeBlock(sid, 5, 'faq', 'What Comes Next?', [], 'Post-course guidance.', 15,
    { faq_items: faqs([
      { q: 'What should I learn next?', a: 'JavaScript is the natural next step for interactivity. Or dive deeper into CSS. Follow your curiosity.' },
      { q: 'How do I keep improving my portfolio?', a: 'Add more projects. Refine the design. Get feedback from developers you admire. Your portfolio is never done.' },
      { q: 'Can I get a job with just HTML and CSS?', a: 'Entry-level jobs usually require JavaScript too, but HTML/CSS skills make you valuable for content roles and freelance work.' },
      { q: 'What if I want to keep learning with CodeShala?', a: 'Ask the trainer about next courses: JavaScript, React, backend development.' },
    ]) }),
    makeBlock(sid, 6, 'wrapup', 'Certificates and Celebration', [
      h('You Did It — Certificate Time'),
      p('Each student receives their certificate of completion for the 21-Day Summer Crash Course.'),
      divider(),
      h('What Now?'),
      bullets(['Update your LinkedIn with your new skills and portfolio link', 'Share your portfolio on social media', 'Keep building — the learning does not stop here', 'Help others who are where you were 21 days ago']),
      divider(),
      h('Final Words'),
      p('You came in with zero experience. You leave with a live website, real skills, and proof that you can learn anything.'),
      callout('Congratulations, developers. You earned this.', 'tip'),
    ], 'Hand out certificates. Take photos. Celebrate. End on high energy. This moment matters.', 20),
  ]
}