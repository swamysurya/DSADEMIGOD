# Content Writing Instructions

These instructions are mandatory.

Follow these rules whenever you generate lessons, chapters, explanations, examples, visualizations, notes, MCQs, summaries, or any educational content for this DSA platform.

These instructions override your default writing style.

------------------------------------------------------------

## Rule 1 — Write Like a Teacher

Do not write like a textbook.
Do not write like documentation.
Write like an experienced mentor who is teaching a student sitting beside them.
The learner should feel like someone is personally explaining the topic.
The writing should feel natural, conversational, and easy to follow.

------------------------------------------------------------

## Rule 2 — Use Very Simple English

Always use plain English.
Avoid complicated vocabulary.
Avoid difficult sentence structures.
Avoid professional or academic writing style.
A beginner should be able to understand every sentence.

------------------------------------------------------------

## Rule 3 — Explain Every Technical Word

Whenever you introduce a technical term for the first time,
first explain what it means in simple English.
Only after explaining it should you continue using that technical term.
Never assume the learner already knows programming terminology.

### Example
Instead of writing:
> "A variable stores values."

Write:
> "A variable is like a box where we keep a value. Every box has a name so we can find it later. This box is called a variable."

After that, you may simply use the word "variable".

------------------------------------------------------------

## Rule 3b — Never Use Jargon That Has Not Been Taught

Never mention advanced terms, library systems, or code keywords (such as Standard Template Library, STL, vectors, maps, heaps, or pointers) in early chapters unless they are explicitly introduced and explained step-by-step in that exact lesson. If a word has not yet been taught, do not mention it.

------------------------------------------------------------

## Rule 4 — Keep Explanations Short but Complete

Do not write huge paragraphs.
Do not write one-line explanations.
Write explanations that are:
- Short
- Clear
- Complete
- Easy to understand

Every sentence should add value. Avoid unnecessary repetition.

------------------------------------------------------------

## Rule 5 — Build Understanding Step by Step

Never jump directly into technical explanations.
Teach concepts gradually.
Whenever possible, follow this sequence:
1. What is it?
2. Why do we need it?
3. Simple real-world example / Analogy
4. Technical explanation
5. Visual drawing
6. Code example
7. Summary

------------------------------------------------------------

## Rule 6 — Always Think Visually

Before explaining a concept, ask yourself:
> "Can this concept become easier with a drawing?"

If the answer is YES, include a drawing.
Never rely only on text when a visual explanation is better.

------------------------------------------------------------

## Rule 7 — Drawing Style

Every drawing should look like it was quickly drawn by a teacher.
Use:
- Boxes
- Arrows
- Labels
- Circles
- Memory blocks
- Flow diagrams
- Whiteboard style
- Notebook style
- Hand-drawn sketches

Avoid:
- Decorative graphics
- 3D artwork
- Cartoon illustrations
- Fancy stock images

The drawing exists to teach.

------------------------------------------------------------

## Rule 7b — Programmatic Drawing Constraints

To maintain neat, readable, and responsive textbook layouts:
- **No Text Distortion**: Never apply wobbly turbulence filters (SVG displacement maps) to elements containing text (HTML text or SVG `<text>` elements). Keep text crisp and sharp. Apply wobbly/hand-drawn distortion *only* to vector paths, boxes, and border lines.
- **HTML Layout over SVG Coordinates**: Use standard HTML and CSS flex/grid boxes for drawing card layouts instead of hardcoded SVG coordinates. This ensures text wrapping, responsive scaling, and 0% chance of text overflow.
- **Scrollbar Prevention**: Horizontal drawings (like compilation timelines) must wrap into multi-row structures (e.g., a 3x2 grid) on mobile screens. Never let a diagram overflow to trigger a horizontal scrollbar.
- **Cursive Annotations**: Use the Google Font *Caveat* for subtext and annotations in diagrams to retain the teacher's hand-written whiteboard feel.
- **Direct Black & White Portraits**: When showing historical figures, display their official photo directly as a prominent, full-width black-and-white card rather than drawing vector avatars.

------------------------------------------------------------

## Rule 8 — Include Drawings Whenever Needed

### Examples
- **Variables**: Draw Variable Name → Memory Box → Memory Address.
- **Arrays**: Draw adjacent memory cells.
- **Pointers**: Draw pointer → memory address → variable.
- **Linked List**: Draw nodes connected using arrows.
- **Stack**: Draw stacked boxes.
- **Queue**: Draw queue slots.
- **Tree**: Draw tree nodes with branching arrows.
- **Graph**: Draw nodes and edges.
- **Hash Table**: Draw buckets list.
- **Binary Search**: Draw left, mid, right bounds.
- **Sliding Window**: Draw moving window frame.
- **Two Pointers**: Draw pointer index arrows.
- **Dynamic Programming**: Draw state transitions.

If a drawing improves understanding, always include one.

------------------------------------------------------------

## Rule 9 — Explain Why Before How

Before teaching an algorithm, first explain:
1. Why does this problem exist?
2. Why do we need this algorithm?

Only then explain:
3. How it works.

------------------------------------------------------------

## Rule 10 — Never Overwhelm

Only explain what is necessary for the current lesson.
Do not dump advanced information into beginner lessons.
Keep learners focused.

------------------------------------------------------------

## Rule 11 — Use Real Examples

Every important concept should contain at least one example.
Prefer practical examples over artificial examples.

------------------------------------------------------------

## Rule 12 — Build Intuition

Do not encourage memorization.
Help learners understand the idea behind the concept.
The learner should understand WHY something works before remembering HOW it works.

------------------------------------------------------------

## Rule 12b — Diagrams Must Be Self-Explanatory

Every visual drawing or diagram must explain itself to an absolute beginner. Do not simply list raw, unexplained technical terms (like "expand headers", "assembly", "binary", or "linkers") inside boxes or arrows. Instead, write short, clear translations inside the diagram (e.g., instead of "Compile to Assembly", write "Translate C++ into simple CPU commands"). The learner should understand the concept just by looking at the diagram.

------------------------------------------------------------

## Rule 13 — Highlight Important Information

Whenever appropriate, highlight using style badges (like callout boxes):
- Important
- Remember
- Common Mistake
- Interview Tip
- Key Idea
- Formula

Do not overuse highlighting.

------------------------------------------------------------

## Rule 14 — Visualizers

In the future, this platform will include interactive visualizers.
Whenever you generate lesson content, think about where a visualizer would naturally fit.
If a visualizer would improve understanding, add a placeholder like:
`[Interactive Visualizer]`

Do not implement the visualizer. Only indicate where it belongs.

------------------------------------------------------------

## Rule 15 — Lesson Flow

Every lesson should follow this order whenever applicable:
1. Introduction
2. Why do we need this?
3. Intuition
4. Real-world analogy
5. Concept explanation
6. Visual drawing
7. Interactive visualizer placeholder (if applicable)
8. Step-by-step explanation
9. Code example
10. Dry run
11. Time Complexity
12. Space Complexity
13. Key Takeaways
14. Common Mistakes
15. Practice Questions
16. Summary

------------------------------------------------------------

## Rule 15b — Quiz Slide-Deck Grouping

Do not list multiple multiple-choice questions consecutively down the page. Always bundle consecutive MCQ blocks into a single interactive Quiz Box. This box must:
- Show only **one** active question at a time.
- Validate correctness and show explanation feedback instantly upon submission.
- Provide a "Next Question" button to transition within the same box.
- End with a **Scorecard Summary** screen displaying their final score (e.g., `4 of 5`), a review list of correctness checkmarks, and a "Restart Quiz" button.

## Rule 16 — Prioritize Visualization (Less Text, More Diagrams)

Our website must prioritize visual representation over large blocks of text. Whenever a concept is introduced, check if it can be represented using a drawing or simulation. Hashing lessons in particular must heavily feature visual step-by-step resolution sequences rather than purely mathematical or textual descriptions. For example, when demonstrating array allocations, linked lists, or hash table buckets, always include a visual diagram block.

------------------------------------------------------------

## Final Rule

Before finishing any lesson, ask yourself:
> "If I were completely new to programming, would I understand this lesson after reading it once?"

If the answer is NO, rewrite the lesson until the answer becomes YES.
Never sacrifice clarity for technical language.

------------------------------------------------------------

# Global UI/UX Theme Instructions

These instructions are mandatory.

Follow these rules for every page, component, layout, visualizer, simulation, lesson, and feature throughout the DSA Learning Platform.

These instructions override your default design decisions.

If any newly created page violates these rules, redesign it until it follows them.

────────────────────────────────────────────────────────────

# Project Vision

This is NOT a dashboard.

This is NOT an LMS.

This is NOT a documentation website.

This is NOT a SaaS product.

This is an Interactive Programming Book.

The user should feel like they are reading a beautifully designed technical book that has become interactive.

Every UI decision should improve learning.

Never design purely for visual appearance.

Always design for learning.

────────────────────────────────────────────────────────────

# Psychology

The UI should create these feelings.

• Calm

The interface should never overwhelm the learner.

Students should immediately feel

"I can understand this."

• Focus

Nothing should compete with the lesson content.

Content is always the hero.

UI exists only to support learning.

• Curiosity

The design should encourage learners to continue reading naturally.

Do not reveal everything immediately.

Allow the learner to discover concepts step by step.

• Achievement

Learners should always know

Where they are.

What they completed.

What comes next.

Progress should be visible throughout the course.

────────────────────────────────────────────────────────────

# Overall Theme

Theme Name

Scholarly Minimalism

Think of the experience as

Apple Books

+

Kindle

+

Notion

+

A beautifully printed programming textbook

The website should feel timeless.

Avoid trendy UI styles.

────────────────────────────────────────────────────────────

# Color Palette

Background

Use a warm paper color.

Example

#F8F6F2

Never use pure white.

Primary Surface

#FCFBF8

Secondary Surface

#F4F1EA

Primary Text

#232323

Never use absolute black.

Secondary Text

#666666

Borders

#DDD7CC

Very thin and subtle.

Do not create heavy boxes.

Primary Accent Color

Deep Indigo

#3F51B5

Use this color consistently.

Only use it for

• Active navigation

• Primary buttons

• Progress

• Links

• Selection

Do not introduce multiple accent colors.

Status Colors

Success

#2E7D32

Warning

#D97706

Error

#C0392B

Advanced Concepts

#6B46C1

────────────────────────────────────────────────────────────

# Typography

Headings

Use an elegant serif font.

Examples

Libre Baskerville

Merriweather

Lora

Body Text

Use a highly readable serif font.

Examples

Source Serif 4

Literata

Crimson Text

Code

Use JetBrains Mono.

Notes

Handwritten fonts are allowed ONLY for

• Teacher Notes

• Margin Notes

• Sketch Labels

Never use handwritten fonts for headings or paragraphs.

────────────────────────────────────────────────────────────

# Layout Philosophy

The interface should resemble an open book.

Avoid card-heavy layouts.

Use sections instead of boxes.

Instead of

□□□□□□□□□□□□□□□□□□□□

Use

────────────────────────

Section Title

Content

────────────────────────

Visualization

────────────────────────

Simulation

The page should breathe.

Use whitespace intentionally.

────────────────────────────────────────────────────────────

# Buttons

Buttons should feel professional and minimal.

Use outlined buttons wherever possible.

Filled buttons should only indicate important actions.

Examples

Start Learning

Run

Continue

Avoid oversized colorful buttons.

────────────────────────────────────────────────────────────

# Borders

Borders should be subtle.

Avoid thick borders.

Avoid heavy shadows.

Use thin separators to organize content.

The page should feel lightweight.

────────────────────────────────────────────────────────────

# Shadows

Use almost no shadows.

Books do not have shadows.

Only use subtle shadows when required for elevation.

────────────────────────────────────────────────────────────

# Icons

Use Lucide Icons.

Use thin outline icons.

Icons should support the content.

Never become the focus.

────────────────────────────────────────────────────────────

# Animations

Animations should improve understanding.

Animation Duration

200ms–250ms

Allowed

• Smooth Fade

• Smooth Expand

• Smooth Collapse

• Soft Highlight

• Underline Animation

• Small Slide Animation

Avoid

• Bounce

• Elastic

• Flash

• Zoom

• Large Scale Effects

Animations should feel calm.

────────────────────────────────────────────────────────────

# Illustrations

Never use decorative illustrations.

Every illustration must teach something.

Preferred Style

• Notebook Sketch

• Pencil Drawing

• Whiteboard Drawing

• Engineering Diagram

• Flow Diagram

• Hand-drawn Boxes

• Arrows

• Labels

Avoid

• Corporate Illustrations

• Stock Images

• Cartoon Graphics

• Decorative Art

Every visual should improve understanding.

────────────────────────────────────────────────────────────

# Components

Components should be simple.

Avoid large rounded cards.

Avoid unnecessary containers.

Every component should look like part of the same book.

Maintain consistent spacing throughout the application.

────────────────────────────────────────────────────────────

# Reading Experience

This is the highest priority.

Users should comfortably read for several hours.

The interface should disappear behind the content.

Reading should never become tiring.

Avoid visual clutter.

Avoid unnecessary decorations.

────────────────────────────────────────────────────────────

# Interactive Components

Visualizers

Simulations

Animations

Interactive diagrams

should always become the center of attention only when they are being used.

The rest of the interface should remain quiet.

────────────────────────────────────────────────────────────

# Content Hierarchy

Every lesson should follow the same structure.

Introduction

↓

Why do we need this?

↓

Real-world Analogy

↓

Concept

↓

Visualization

↓

Simulation

↓

Code

↓

Dry Run

↓

Complexity

↓

Key Takeaways

↓

Common Mistakes

↓

Practice Questions

↓

Summary

This hierarchy should remain consistent across the entire platform.

────────────────────────────────────────────────────────────

# Consistency

Every page should look like it belongs to the same book.

Never redesign individual pages differently.

Maintain consistent

• Typography

• Colors

• Buttons

• Spacing

• Borders

• Icons

• Navigation

• Visual hierarchy

────────────────────────────────────────────────────────────

# Performance

Always prioritize

• Fast loading

• Minimal JavaScript

• Lazy loading

• Static rendering where possible

• Reusable components

Visual quality should never compromise performance.

────────────────────────────────────────────────────────────

# Golden Rule

Before implementing any page, ask yourself

"Does this page feel like reading a premium interactive programming book?"

If the answer is NO,

redesign it until the answer becomes YES.

Every design decision should support learning, clarity, focus, and long-term reading comfort.

Never optimize for flashy visuals.

Always optimize for deep learning.

------------------------------------------------------------

## Rule 17 — Research and Depth for Minimal Requests

When the user asks to implement a lesson by providing only a topic name:
1. **Web Research**: Perform a web search on the topic to retrieve the top 10 articles or blogs.
2. **Synthesize Best Explanations**: Read the content to gather the best analogies, explanations, and visual setups.
3. **Smooth Learning Curve**: Break down the topic systematically so the learning curve remains very smooth and gradual.
4. **Visual Diagrams**: Design and draw clear, self-explanatory whiteboard diagrams showing key states or progressions to make the concepts highly intuitive.

------------------------------------------------------------

## Rule 18 — Connect Every Lesson to Previous Knowledge

Never introduce a new concept in isolation.
At the beginning of every lesson, briefly remind the learner what they already know that will help them understand this lesson.

### Example
> We already know how arrays store elements one after another. Today we'll use that knowledge to understand sliding windows.

This makes learning feel continuous instead of disconnected.

------------------------------------------------------------

## Rule 19 — Predict Student Questions

While writing every explanation, ask yourself:
> "What question is a beginner likely to ask next?"

Answer that question before moving forward. A great teacher explains doubts before students ask them.

------------------------------------------------------------

## Rule 20 — Explain Why Other Approaches Fail

Whenever teaching an optimized algorithm, don't only explain why the optimal solution works. Also explain:
- Why the brute-force approach is slow.
- Why another idea almost works but fails.

Students learn optimization better by comparing ideas.

------------------------------------------------------------

## Rule 21 — Never Hide the Thinking Process

Don't suddenly present an algorithm. Show how someone could discover it naturally. The learner should feel "I could have invented this" rather than "I have to memorize this."

------------------------------------------------------------

## Rule 22 — Teach Pattern Recognition

Every problem should answer:
- What pattern does this belong to?
- How can I recognize this pattern in future problems?
- What words in the problem statement act as clues?

### Example
Questions containing "longest", "smallest", or "continuous" often indicate Sliding Window.

------------------------------------------------------------

## Rule 23 — Compare Similar Concepts

Whenever two concepts are commonly confused, include a comparison table.

### Example
- Stack vs Queue
- Array vs Linked List
- DFS vs BFS
- Hash Map vs Hash Set

This reduces confusion.

------------------------------------------------------------

## Rule 24 — Tell Students What NOT to Do

Every lesson should include "What beginners usually do wrong." Students remember mistakes surprisingly well.

------------------------------------------------------------

## Rule 25 — Build Mental Models

Don't teach syntax first. Teach the mental picture first.

### Example
Instead of saying "A pointer stores an address," help learners imagine:
> "A pointer is like a piece of paper with someone's house address written on it."

Mental models last longer than definitions.

------------------------------------------------------------

## Rule 26 — Make Every Animation Teach One Idea

Never animate for beauty. Every animation should answer exactly one question.

### Examples
- How recursion grows
- How merge sort divides
- How BFS expands
- How a hash collision happens

One animation = One concept.

------------------------------------------------------------

## Rule 27 — Learning Before Coding

Before showing code, the learner should already know:
- what will happen
- why it will happen
- how the algorithm behaves

Code should feel like a translation of an already understood idea.

------------------------------------------------------------

## Rule 28 — Encourage Active Learning

Do not let learners only read. Frequently pause and ask them to predict.

### Examples
- "What do you think happens next?"
- "Pause for 30 seconds and guess the output."
- "Can you find the bug before scrolling?"

Learning improves when students think before seeing the answer.

------------------------------------------------------------

## Rule 29 — Layer Information

Do not reveal everything immediately. Start with the simplest explanation. Allow learners to expand sections for:
- deeper intuition
- mathematical proof
- optimizations
- interview discussion

This keeps beginners from feeling overwhelmed while still serving advanced learners.

------------------------------------------------------------

## Rule 30 — Every Lesson Should End With Confidence

The learner should finish every lesson thinking:
- [x] I understand the idea.
- [x] I know when to use it.
- [x] I can recognize it.
- [x] I can implement it.
- [x] I know the common mistakes.
- [x] I know what to learn next.

Never end a lesson with unanswered confusion.

------------------------------------------------------------

## Rule 31 — Optimize for "Aha!" Moments

The goal of every lesson is not to transfer information. The goal is to create at least one moment where the learner thinks:
> "Ohhh... now I get it!"

Design explanations, analogies, diagrams, and examples specifically to produce these moments. A single genuine insight is more valuable than pages of information.

------------------------------------------------------------

## Rule 32 — Default to Visual First

Before writing any explanation, ask yourself:
> "Can I teach this using a picture instead of paragraphs?"

If the answer is YES, generate the visual first. Text should explain the visual, not replace it.

------------------------------------------------------------

## Rule 33 — Text Requires Justification

If a section explains a concept that can be understood faster with a visual, you must insert an appropriate visual regardless of paragraph length. Sometimes 80 words need a diagram, while sometimes 400 words do not.

------------------------------------------------------------

## Rule 34 — Mandatory Diagram Triggers

A diagram is mandatory whenever explaining:
- Relationships
- Movement
- Memory
- State changes
- Flow of execution
- Hierarchy
- Comparisons
- Multi-step processes

No exceptions. This automatically covers future topics.

------------------------------------------------------------

## Rule 35 — One Concept = One Visual

Every major concept introduced in a lesson must have its own dedicated visual. Never explain three concepts using one large diagram.

------------------------------------------------------------

## Rule 36 — Visual Coverage Requirement

Every lesson should contain enough visuals that learners never encounter long uninterrupted blocks of explanation. This is much more flexible than rigid percentage rules and ensures text stays engaging.

------------------------------------------------------------

## Rule 37 — Detect Visual Opportunities

After generating a lesson, scan it again. For every paragraph ask:
> "Would a beginner understand this faster with a picture?"

If YES, insert a diagram immediately after that paragraph. Repeat until no paragraph benefits from a visual.

------------------------------------------------------------

## Rule 38 — Diagram Before Code

Never show code until the learner has seen a visual, a simulation, a memory diagram, or a flowchart. The learner should already understand the algorithm before seeing syntax.

------------------------------------------------------------

## Rule 39 — Visual Thinking Priority

When multiple teaching methods are possible, prefer them in this order:
1. Interactive Visualizer
2. Animation
3. Whiteboard Diagram
4. Step-by-Step Illustration
5. Table
6. Timeline
7. Text

Text is the last choice, not the first.

------------------------------------------------------------

## Rule 40 — Diagram Review Pass

Before completing a lesson, perform a second review. Every major concept must have at least one supporting learning aid. A learning aid includes:
- Diagram
- Animation
- Table
- Simulation
- Timeline
- Interactive Visualizer

Sometimes a comparison table or timeline teaches better than a diagram.

------------------------------------------------------------

## Rule 41 — Keep Diagrams Simple

Every diagram should simplify the concept, not make it more complicated. A learner should understand the main idea within 5–10 seconds of looking at the diagram.

### Guidelines
- Show only the information needed for the current lesson.
- Remove unnecessary details and decorations.
- Break complex concepts into multiple small diagrams instead of one large diagram.
- Use simple boxes, arrows, labels, and highlights.
- Prefer whiteboard-style sketches over detailed technical drawings.
- Keep labels short and easy to read.
- If a diagram becomes crowded, split it into two or more diagrams.
- Each diagram should teach only one concept.

### Good Example
Instead of one large diagram showing Array, Sliding Window, Prefix Sum, Pointer Movement, and Time Complexity together, create separate diagrams:
- Diagram 1 → Array Layout
- Diagram 2 → Window Movement
- Diagram 3 → Sum Update
- Diagram 4 → Final Result

### Final Check
Before adding a diagram, ask yourself:
> "Will a beginner understand this within 10 seconds?"

If the answer is NO, redesign or simplify the diagram until the answer is YES.

------------------------------------------------------------

## Rule 42 — Teach Code Construction

Never assume that a learner can convert an algorithm into code. Whenever a new algorithm or problem is introduced, include a "How to Write the Code" section before showing the final implementation. This section should explain how to translate the idea into code step by step.

Use this reusable construction framework:
1. **Idea**: Identify the inputs, expected outputs, and general algorithm strategy.
2. **Variables**: Decide which variables are needed and explain why each is needed.
3. **Loops**: Decide how many loops or recursive calls are required and explain their responsibilities.
4. **Conditions**: Define constraints and boundary conditions.
5. **Logic**: Build the solution one small step at a time, showing how the complete code gradually forms.
6. **Final Code**: Present the final clean implementation.

Never jump directly from the algorithm to the finished code.

------------------------------------------------------------

## Rule 43 — Visual Planning Phase

Every lesson must begin with an internal Visual Plan. The plan determines which concepts need diagrams, simulations, animations, tables, or visualizers. The lesson must be generated according to this plan. This avoids unnecessary interruptions during generation.

------------------------------------------------------------

## Rule 44 — One New Idea at a Time

Every section should teach exactly one new idea. Do not introduce multiple new concepts in the same explanation to reduce cognitive overload.

### Example
- ❌ **Bad**: Explain arrays, indexing, memory, and loops all together.
-  **Good**: Section 1 → Arrays, Section 2 → Index, Section 3 → Memory Layout, Section 4 → Traversing, Section 5 → Loops.

------------------------------------------------------------

## Rule 45 — Reuse the Same Example

Whenever possible, continue using the same example throughout the lesson instead of introducing new ones. For example, if a lesson starts with an array `[10, 20, 30, 40, 50]`, use that exact same array for traversal, binary search, prefix sum, sliding window, dry runs, and complexity explanations. This allows students to focus on learning the concept instead of constantly re-interpreting new input sets.





