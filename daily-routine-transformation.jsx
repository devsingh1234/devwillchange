import { useState } from "react";

const ACCENT = "#E85D04";
const DARK = "#0A0A0A";
const CARD_BG = "#141414";
const BORDER = "#222";
const MUTED = "#888";
const GREEN = "#2DC653";
const BLUE = "#3A86FF";
const PURPLE = "#8338EC";
const WARM = "#F77F00";
const PINK = "#E056A0";
const TEAL = "#0EA5E9";

const tabs = [
  { label: "Daily", icon: "⏰" },
  { label: "Weekend", icon: "📅" },
  { label: "Study", icon: "📚" },
  { label: "Meals", icon: "🥗" },
  { label: "Mindset", icon: "🧠" },
  { label: "Detox", icon: "📵" },
  { label: "Portfolio", icon: "💻" },
  { label: "Network", icon: "🤝" },
  { label: "Habits", icon: "✅" },
  { label: "Bad Day", icon: "🛟" },
  { label: "Content", icon: "📸" },
  { label: "Weekly", icon: "📊" },
];

const dailyRoutine = [
  { time: "7:00 AM", activity: "Wake Up — No Phone, Mindset Reset", icon: "☀️", type: "mindset", detail: "Splash cold water on face. No phone for first 10 min. Say 'I can do hard things.' Write 3 things you're grateful for. Drink a full glass of water. This kills the overthinking loop before it starts." },
  { time: "7:10 AM", activity: "Pre-Workout Fuel + Get Ready", icon: "🍌", type: "health", detail: "Quick bite: banana + black coffee OR a handful of dry fruits + water. Don't go to gym on empty stomach. Get your gym bag ready the night before — zero friction in the morning." },
  { time: "7:30 AM", activity: "GYM — Weight Training + Cardio", icon: "🏋️", type: "fitness", detail: "45-60 min. Push/Pull/Legs split. Start with compound lifts (squats, deadlifts, bench press). End with 15 min incline treadmill walk (~2,000 steps). Morning gym = discipline locked in before the world can distract you. This is NON-NEGOTIABLE." },
  { time: "8:30 AM", activity: "Post-Workout Breakfast — High Protein", icon: "🍳", type: "health", detail: "Eat within 30-45 min of gym. Eggs + toast OR oats + banana + peanut butter + protein shake. Target 30-40g protein in this meal. Keep it under 500 cal. This is your biggest meal of the day — you've earned it." },
  { time: "9:00 AM", activity: "Study Block 1 — Deep Technical Study", icon: "📚", type: "study", detail: "Post-gym brain is SHARP — endorphins + focus. This is your GOLDEN HOUR. Study Kubernetes, Terraform, or AWS per the weekly plan. No phone. Use Pomodoro (25 min study, 5 min rest). Even 30 min here compounds massively." },
  { time: "9:30 AM", activity: "Commute / Travel to Office", icon: "🚌", type: "neutral", detail: "Listen to a tech podcast: DevOps Paradox, Kubernetes Podcast, or Cloud Unfiltered. Turn dead commute time into passive learning. You'll absorb more than you think." },
  { time: "10:00 AM", activity: "Office — Do Assigned Work Fast", icon: "💼", type: "work", detail: "Complete whatever tasks they give you quickly and efficiently. Screenshot tasks? Finish in 30 min. Don't fight the system, outgrow it. The faster you finish their work, the more time you reclaim for YOUR work." },
  { time: "10:30 AM", activity: "Office — Stealth Study Mode", icon: "🥷", type: "study", detail: "Open terminal. Practice kubectl commands, write Terraform configs, explore AWS console. Looks like work, IS your future career. Apply to 2 jobs during this window. Keep a tab of Naukri/LinkedIn open." },
  { time: "1:00 PM", activity: "Lunch — Walk + Eat Clean", icon: "🥗", type: "health", detail: "2,000 steps during/after lunch. Eat dal + roti + sabzi OR salad with protein. Avoid fried food. Skip the gossip table — eat alone or with positive people only. This is where you break the negativity habit." },
  { time: "1:45 PM", activity: "Office — Continue Study / Apply", icon: "📝", type: "study", detail: "Apply to 2-3 more positions. Update LinkedIn profile. Work on a side project that demonstrates DevOps/SRE skills — this IS your portfolio. Build something real." },
  { time: "4:00 PM", activity: "Office — Startup Research/Planning", icon: "🚀", type: "startup", detail: "Spend 30-45 min researching startup ideas. Validate problems. Read about bootstrapping. Note ideas in a dedicated notebook. Think: what DevOps problem can I solve as a product?" },
  { time: "5:00 PM", activity: "Office — Wrap Up + Walk", icon: "🏢", type: "neutral", detail: "1,000 steps around the office/building. Prepare tomorrow's task list. Close all tabs clean. Mental closure before leaving." },
  { time: "7:00 PM", activity: "Leave Office + Commute", icon: "🏠", type: "neutral", detail: "Listen to audiobook or podcast. Recommendations: Atomic Habits, The Hard Thing About Hard Things, Zero to One. Commute = free learning time." },
  { time: "7:30 PM", activity: "Evening Walk — 3,000 steps", icon: "🚶", type: "fitness", detail: "Brisk walk after reaching home. This is your decompression time. No phone calls, no social media. Walk at a pace where talking feels slightly hard. Clear the office stress from your head." },
  { time: "8:15 PM", activity: "Dinner — Light and Clean", icon: "🍲", type: "health", detail: "Light dinner: protein + veggies + minimal carbs. Chicken/paneer/eggs + salad or sabzi. Keep under 500 cal. No heavy food after 8:30 PM. Total daily target: ~1800-2000 cal for weight loss." },
  { time: "9:00 PM", activity: "Study Block 2 — Lighter Study", icon: "💻", type: "study", detail: "Watch 1 YouTube tutorial or do a hands-on lab. This is revision time, not new concepts. Review what you studied in the morning. Practice on KodeKloud/Udemy labs. Keep it relaxed — consistency beats intensity." },
  { time: "10:00 PM", activity: "Wind Down — No Screens", icon: "📖", type: "mindset", detail: "Read 10 pages of a book (non-fiction preferred). Journal: What went well today? What will I do better tomorrow? Write down negative thoughts and physically cross them out. This trains your brain to reject negativity." },
  { time: "10:30 PM", activity: "Sleep Prep", icon: "😴", type: "mindset", detail: "Phone on airplane mode. Room dark and cool. Visualize the person you're becoming — successful, fit, calm, respected. Fall asleep with that image. Target: asleep by 11 PM. Sleep is when muscles grow and knowledge consolidates." },
];

const weekendRoutine = {
  saturday: [
    { time: "7:00 AM", activity: "Wake Up — Gratitude + Water", icon: "☀️", type: "mindset", detail: "Same wake-up ritual. Consistency doesn't take weekends off. But today you can take an extra 5 min to stretch and breathe." },
    { time: "7:30 AM", activity: "GYM — Full Body + Extended Cardio", icon: "🏋️", type: "fitness", detail: "Full body workout + 30 min cardio. Saturday is your power gym day. Push harder — try heavier weights or longer sets. Burn an extra 200-300 cal." },
    { time: "9:00 AM", activity: "Big Post-Workout Breakfast", icon: "🍳", type: "health", detail: "Your biggest meal. Eggs, toast, fruit, protein shake. Refuel after the harder workout. This is earned." },
    { time: "9:30 AM", activity: "Deep Study Block — 2 Hours", icon: "📚", type: "study", detail: "WEEKLY POWER SESSION. No interruptions, no office, no distractions. Dive deep into the current certification topic. Do hands-on labs, not just watching videos. Set a timer and go." },
    { time: "11:30 AM", activity: "Startup / Side Project Work", icon: "🚀", type: "startup", detail: "2 hours dedicated to building your startup MVP or side project. This is where the portfolio pieces come from. Code something real. Ship something small." },
    { time: "1:30 PM", activity: "Lunch + Cheat Meal (if earned)", icon: "🍕", type: "health", detail: "Saturday lunch is your ONE cheat meal of the week. Enjoy it guilt-free — you've trained hard all week. But keep it to ONE meal, not a cheat day." },
    { time: "2:30 PM", activity: "Instagram Content Creation", icon: "📸", type: "startup", detail: "Work on this month's Instagram post. Shoot photos/videos, design carousels, write captions. Batch create — don't spread content work across the week." },
    { time: "4:00 PM", activity: "Grocery Shopping + Meal Prep", icon: "🛒", type: "health", detail: "Buy groceries for the week (see Meals tab). Start prepping: boil eggs, cut veggies, cook chicken/paneer, portion snacks. This saves 30+ min every weekday." },
    { time: "6:00 PM", activity: "Social Time / Personal", icon: "😊", type: "neutral", detail: "Call family, meet a friend (a positive one), or just relax. You need human connection. But choose wisely — avoid energy vampires." },
    { time: "8:00 PM", activity: "Light Dinner + Relax", icon: "🎬", type: "neutral", detail: "Wind down. Watch something, relax. Your brain needs recovery too. But stop screens by 10 PM." },
    { time: "10:30 PM", activity: "Plan Sunday + Sleep", icon: "😴", type: "mindset", detail: "15 min planning Sunday's tasks. Lay out gym clothes. Sleep by 11 PM." },
  ],
  sunday: [
    { time: "8:00 AM", activity: "Wake Up — 1 Hour Extra Sleep", icon: "☀️", type: "mindset", detail: "One extra hour. Earned. But don't go past 8 AM — protect your sleep cycle. Same gratitude ritual." },
    { time: "8:30 AM", activity: "Active Recovery — Long Walk (5K steps)", icon: "🚶", type: "fitness", detail: "No gym today. Long walk outside — park, nature trail, anywhere green. Active recovery + mental reset. Listen to an audiobook. Walk 45-60 min." },
    { time: "9:30 AM", activity: "Big Healthy Breakfast", icon: "🍳", type: "health", detail: "Cook something nice — omelette with veggies, smoothie bowl, poha. Sunday breakfast should feel like a reward." },
    { time: "10:00 AM", activity: "Weekly Review + Planning", icon: "📋", type: "mindset", detail: "THE MOST IMPORTANT HOUR OF THE WEEK. Review: What did I study? How many jobs applied? Steps hit target? Gym sessions completed? Rate each area 1-10. Plan next week." },
    { time: "11:00 AM", activity: "Study — Review + Mock Tests", icon: "📚", type: "study", detail: "Review the whole week's learning. Do a practice test or mock exam. Identify weak spots for next week. Consolidation, not new material." },
    { time: "12:30 PM", activity: "Meal Prep Round 2", icon: "🥘", type: "health", detail: "Finish remaining meal prep. Cook large batch of dal, chicken, or paneer. Portion lunches for Mon-Wed. Pre-cut salad ingredients." },
    { time: "2:00 PM", activity: "Energy Audit", icon: "🔋", type: "mindset", detail: "List every person, app, habit from this week. Mark +Energy or -Energy. Plan to reduce one -Energy item next week. Systematically remove negativity." },
    { time: "3:00 PM", activity: "Networking / Open Source / LinkedIn", icon: "🤝", type: "study", detail: "Write a LinkedIn post, contribute to open source, or reach out to 2-3 people in DevOps/SRE. Career investment time. See Network tab." },
    { time: "4:30 PM", activity: "Free Time — Hobby / Rest", icon: "🎯", type: "neutral", detail: "Something you enjoy that isn't screen-based. Cook, walk, meet someone, explore. Recharge your batteries." },
    { time: "7:00 PM", activity: "Light Dinner + Monday Prep", icon: "🍲", type: "health", detail: "Clean, light dinner. Prep bag, gym clothes, and lunch for Monday. Set 3 intentions for the week ahead." },
    { time: "9:00 PM", activity: "Early Sleep", icon: "😴", type: "mindset", detail: "Read, journal, relax. Bed 30 min early on Sunday — start the week fully charged." },
  ],
};

const weeklyStudyPlan = [
  { week: "Week 1-4", title: "Kubernetes Deep Dive", topics: ["CKA Exam Prep — Pods, Deployments, Services", "RBAC, Network Policies, Security Contexts", "Helm Charts + Kustomize", "Troubleshooting clusters like a pro"], resources: ["KodeKloud CKA Course", "Mumshad's Kubernetes Labs", "YouTube: TechWorld with Nana — K8s playlist"], cert: "CKA (Certified Kubernetes Administrator)" },
  { week: "Week 5-8", title: "Terraform + IaC Mastery", topics: ["Terraform state management, workspaces", "Modules, variables, outputs — production patterns", "Multi-cloud provisioning (AWS + GCP)", "Terraform Cloud / Atlantis for team workflows"], resources: ["HashiCorp Learn Portal", "YouTube: Sid's Tech — Terraform playlist", "KodeKloud Terraform Course"], cert: "HashiCorp Terraform Associate" },
  { week: "Week 9-12", title: "AWS Solutions Architect", topics: ["VPC, EC2, S3, IAM deep dive", "EKS, Lambda, API Gateway", "CloudFormation vs Terraform tradeoffs", "Cost optimization + Well-Architected Framework"], resources: ["Adrian Cantrill's SAA Course", "Stephane Maarek on Udemy", "AWS Free Tier hands-on labs"], cert: "AWS Solutions Architect Associate" },
  { week: "Week 13-16", title: "Platform Engineering + SRE", topics: ["SLIs, SLOs, SLAs — defining reliability", "Observability: Prometheus + Grafana + ELK", "Incident management, postmortems", "Internal Developer Platforms (Backstage, Port)"], resources: ["Google SRE Book (free online)", "YouTube: DevOps Toolkit", "Backstage.io documentation"], cert: "Build an internal platform portfolio project" },
  { week: "Week 17-20", title: "AI/ML for DevOps Engineers", topics: ["Python basics for automation", "LLM APIs — OpenAI, Anthropic, local models", "AI-powered monitoring & AIOps concepts", "Building CLI tools with AI integration"], resources: ["YouTube: Fireship — AI explained", "Anthropic docs + Claude API", "FastAPI + LangChain tutorials"], cert: "Portfolio: AI-powered DevOps tool" },
  { week: "Week 21-24", title: "AI-Proof Earning Skills", topics: ["DevOps consulting — package your knowledge", "Technical content creation (blog + YouTube)", "Freelancing on Toptal / Upwork for DevOps", "SaaS idea validation + MVP building"], resources: ["YouTube: Ali Abdaal — Freelancing", "Indie Hackers community", "Pieter Levels — MAKE book"], cert: "Launch freelance profile OR MVP" },
];

const mealPlan = {
  weekday: [
    { meal: "Pre-Workout (7:10 AM)", calories: "~100", items: ["1 banana OR handful of almonds/cashews", "Black coffee (no sugar) OR green tea", "1 glass water"], note: "Just enough fuel to power the workout. Nothing heavy." },
    { meal: "Breakfast (8:30 AM)", calories: "~450", items: ["3 whole eggs scrambled/boiled + 2 toast", "OR: Oats (50g) + banana + 1 tbsp peanut butter", "Protein shake (1 scoop whey + water/milk)", "Black coffee or green tea"], note: "BIGGEST meal. 30-40g protein minimum. Eat within 45 min of gym." },
    { meal: "Mid-Morning Snack (11:30 AM)", calories: "~150", items: ["1 apple or seasonal fruit", "10 almonds or walnuts", "Green tea"], note: "Keeps metabolism active. Prevents overeating at lunch." },
    { meal: "Lunch (1:00 PM)", calories: "~500", items: ["2 roti + dal + sabzi (any green vegetable)", "OR: Brown rice (small) + rajma/chole + salad", "OR: Grilled chicken/paneer (150g) + salad + 1 roti", "Buttermilk or lemon water"], note: "Protein + fiber rich. Avoid fried food. Carry from home." },
    { meal: "Evening Snack (5:00 PM)", calories: "~100", items: ["Roasted chana (50g) OR makhana", "OR: 1 small fruit + green tea", "Avoid: samosa, chips, biscuits"], note: "Light energy boost. Skip if not hungry." },
    { meal: "Dinner (8:15 PM)", calories: "~450", items: ["Grilled chicken/fish (150g) + stir-fry veggies", "OR: Paneer bhurji (150g) + salad + 1 roti", "OR: 3 egg whites + sauteed veggies + small salad", "No rice at dinner. Max 1 roti."], note: "Light and protein-focused. No food after 9 PM." },
  ],
  grocery: [
    { category: "🥩 Proteins", items: "Eggs (30/week), chicken breast (1kg), paneer (500g), whey protein, dal varieties (moong, masoor, chana), rajma, chole, tofu" },
    { category: "🌾 Carbs", items: "Oats (1kg), whole wheat atta, brown rice (small bag), whole wheat bread, bananas (7), sweet potatoes" },
    { category: "🥬 Veggies", items: "Spinach, broccoli, capsicum, tomatoes, onions, cucumber, carrots, bottle gourd (lauki), cabbage, mixed frozen veggies" },
    { category: "🍎 Fruits", items: "Apples (7), seasonal fruit (1kg), lemons (6), any berries available" },
    { category: "🥜 Snacks", items: "Almonds (200g), walnuts (100g), roasted chana (500g), makhana (200g), peanut butter (1 jar)" },
    { category: "🫙 Others", items: "Olive oil / mustard oil, green tea, coffee, spices, curd (1kg), buttermilk, milk" },
  ],
  rules: [
    "Total daily target: 1800-2000 calories",
    "Protein: 120g+ per day (muscle building + fat loss)",
    "Water: 3-4 liters daily (carry a bottle everywhere)",
    "No sugary drinks — no cola, no packaged juice, no sweet chai",
    "No fried food Mon-Fri. One cheat meal Saturday lunch ONLY",
    "Meal prep Sunday: boil 15 eggs, cook protein, cut veggies, portion dal",
    "Carry lunch to office — saves money AND calories",
    "If eating out: choose grilled/tandoori over fried/creamy",
  ],
};

const mindsetRules = [
  { rule: "Zero Gossip Policy", detail: "Every minute spent on gossip is a minute stolen from your future. When colleagues start backbiting, physically leave. Say 'I need to finish something.' No explanation needed. Gossip is a drug — withdrawal is uncomfortable but freedom is on the other side.", icon: "🚫" },
  { rule: "The 5-Second Rule", detail: "When a negative thought hits, count 5-4-3-2-1 and physically move or start a task. Don't let the thought marinate. Overthinking is just your brain running a loop — interrupt the loop with action.", icon: "⏱️" },
  { rule: "Compare Down, Then Forward", detail: "Stop comparing yourself to people ahead of you. Compare to where YOU were 6 months ago. Then look forward: where will you be in 6 months if you follow this plan? That gap is your motivation.", icon: "📈" },
  { rule: "Earn Respect, Don't Seek It", detail: "Your current workplace doesn't value you? Good. Use that anger as fuel, not poison. The goal isn't to prove them wrong — it's to become so skilled that their opinion becomes irrelevant.", icon: "💎" },
  { rule: "Identity-Based Change", detail: "Don't say 'I'm trying to lose weight.' Say 'I'm someone who takes care of their body.' Don't say 'I'm studying for a job.' Say 'I'm a Platform Engineer who happens to be at a bad job right now.' Become the person first.", icon: "🪞" },
  { rule: "Energy Audit Every Sunday", detail: "List every person, activity, and habit in your life. Mark each as +Energy or -Energy. Ruthlessly reduce -Energy items. This includes toxic WhatsApp groups, negative news, and people who only complain.", icon: "🔋" },
  { rule: "The Hard Things Mantra", detail: "Every morning: 'I can do hard things.' Gym when tired? Hard thing — do it. Study after work? Hard thing — do it. Walk away from gossip? Hard thing — do it. Stack enough hard things and you become unstoppable.", icon: "🔥" },
  { rule: "Document Everything", detail: "Keep a private log of every skill learned, every lab completed, every cert passed. When imposter syndrome hits (and it will), open this log. Evidence beats emotion every time.", icon: "📓" },
];

const socialDetox = {
  remove: [
    { app: "Instagram Explore", action: "Turn off. Only open Instagram to POST, not scroll. Set 15 min daily limit.", icon: "📱" },
    { app: "Toxic WhatsApp Groups", action: "Leave every group that's gossip, memes, or negativity. Keep only: family, close friends, and 1-2 tech groups.", icon: "💬" },
    { app: "News Apps / Negative Media", action: "Uninstall news apps. If something truly important happens, you'll hear about it.", icon: "📰" },
    { app: "YouTube Shorts / Reels", action: "Disable Shorts. YouTube is ONLY for learning. Install 'Unhook' extension to remove recommendations.", icon: "🎬" },
  ],
  replace: [
    { old: "30 min scrolling in bed", with: "10 min gratitude journal + 10 pages reading", icon: "📖" },
    { old: "Lunch hour gossip", with: "Walk + podcast or eat alone with course on phone", icon: "🎧" },
    { old: "Evening social media binge", with: "Evening walk (3,000 steps, no phone)", icon: "🚶" },
    { old: "Late night reels/shorts", with: "Wind down: journal + book + visualization", icon: "🧘" },
    { old: "WhatsApp drama groups", with: "1 DevOps/SRE Slack/Discord community", icon: "💻" },
  ],
  rules: [
    "Phone on airplane mode 10:30 PM to 7:10 AM",
    "Screen Time: 30 min daily limit for ALL social media combined",
    "No phone during meals — eat mindfully",
    "No phone first 10 min after waking",
    "One phone-free hour daily: your evening walk",
    "Unfollow anyone who makes you feel bad — no exceptions",
    "Follow ONLY: tech educators, fitness motivation, and builders",
  ],
};

const portfolioStrategy = {
  github: [
    { project: "K8s Home Lab Setup", desc: "Document entire Kubernetes home lab: cluster setup, monitoring with Prometheus/Grafana, CI/CD pipelines, GitOps with ArgoCD. Include architecture diagrams and detailed README.", timeline: "Week 3-6", impact: "Shows hands-on infra skills. Recruiters LOVE real setups." },
    { project: "Terraform Multi-Cloud Modules", desc: "Reusable Terraform modules for AWS + GCP. VPC setup, EKS/GKE cluster, RDS/Cloud SQL, S3/GCS. Production-grade with variables and outputs.", timeline: "Week 7-10", impact: "Proves IaC mastery. Companies want module writers." },
    { project: "AI-Powered DevOps CLI Tool", desc: "CLI tool using LLM APIs to help with DevOps: generate Terraform configs, debug K8s issues, analyze logs. Open source it.", timeline: "Week 17-22", impact: "UNIQUE differentiator. AI + DevOps = future-proof." },
    { project: "Internal Developer Platform (Mini)", desc: "Small IDP using Backstage or custom solution. Service catalog, deployment templates, self-service infra provisioning.", timeline: "Week 14-18", impact: "Platform Engineering is THE hot field right now." },
  ],
  profile: [
    "Professional profile photo (not a selfie)",
    "Bio: 'Platform Engineer | CKA Certified | Building AI-powered DevOps tools'",
    "Pin your 3 best repos at the top",
    "Every repo: README with screenshots/diagrams, clean code, .gitignore, LICENSE",
    "Contribution graph should be green — commit daily, even small fixes",
    "Profile README (username/username repo) with project links and certs",
  ],
};

const networkingPlan = {
  linkedin: [
    { action: "Optimize Profile", detail: "Headline: 'DevOps / Platform Engineer | CKA | AWS | Terraform'. Banner: tech-related. About: your story in 3 paragraphs.", freq: "Once, update monthly" },
    { action: "Post Content Weekly", detail: "Share learnings: 'Today I learned about K8s Network Policies...' 5-8 lines + takeaway. Hashtags: #DevOps #Kubernetes #PlatformEngineering.", freq: "1-2x per week" },
    { action: "Comment on Leaders' Posts", detail: "Follow 20 DevOps/SRE leaders. Leave thoughtful comments. Add your perspective. Gets you VISIBLE to hiring managers.", freq: "Daily, 5-10 min" },
    { action: "Cold DMs to Recruiters", detail: "Search 'DevOps recruiter'. Personalized connection requests: 'Hi [Name], I'm transitioning into Platform Engineering with CKA. Would love to connect.'", freq: "5 per week" },
    { action: "Engage with Target Companies", detail: "Follow target companies. Comment on their tech posts. Connect with their DevOps team. When you apply, you won't be a stranger.", freq: "3-4x per week" },
  ],
  communities: [
    { name: "DevOps Chandigarh Meetup", detail: "Search meetup.com. If none exist, START ONE — instant authority.", type: "Local" },
    { name: "CNCF Slack Workspace", detail: "Free. Channels for K8s, Helm, Argo, Prometheus. Ask and answer questions.", type: "Online" },
    { name: "KubeHuddle / DevOpsDays", detail: "Virtual or in-person conferences. Learn what companies actually need.", type: "Conference" },
    { name: "r/devops + r/kubernetes", detail: "Lurk first, then contribute. Teaching solidifies your own learning.", type: "Reddit" },
    { name: "Hashnode / Dev.to Blog", detail: "1 technical blog per month. CKA journey, Terraform learnings. Ranks on Google.", type: "Content" },
  ],
};

const accountability = {
  daily: [
    { habit: "Gym completed", icon: "🏋️", pts: 10 },
    { habit: "10,000 steps", icon: "🦶", pts: 5 },
    { habit: "Study Block 1 (AM)", icon: "📚", pts: 10 },
    { habit: "Study Block 2 (PM)", icon: "💻", pts: 5 },
    { habit: "Clean eating (on plan)", icon: "🥗", pts: 5 },
    { habit: "Zero gossip / negativity", icon: "🚫", pts: 10 },
    { habit: "No social media binge", icon: "📵", pts: 5 },
    { habit: "Gratitude journal done", icon: "📓", pts: 5 },
    { habit: "Applied to 2+ jobs", icon: "💼", pts: 5 },
    { habit: "8 hours sleep", icon: "😴", pts: 5 },
  ],
  tools: [
    { tool: "Notion Habit Tracker", detail: "Simple table: rows = habits, columns = days. Check off daily. Free and visual. Review every Sunday.", icon: "📋" },
    { tool: "Streaks (iOS) / Loop (Android)", detail: "Top 5 non-negotiable habits. Tracks streaks. After 30 days, you'll NEVER want to break the chain.", icon: "🔗" },
    { tool: "Body Measurements Log", detail: "Every Sunday: weight, waist, chest, arms. Progress photo. Don't trust the mirror — trust the numbers.", icon: "📐" },
    { tool: "GitHub Contribution Graph", detail: "Green squares = accountability. One commit per day. The graph doesn't lie.", icon: "🟩" },
    { tool: "Weekly Review Template", detail: "Every Sunday: Rate each area 1-10 (fitness, study, career, mindset, nutrition). One WIN + one IMPROVEMENT each.", icon: "📊" },
  ],
};

const badDayPlan = {
  minimum: [
    { task: "Walk 5,000 steps (not 10K)", icon: "🚶", detail: "Half steps > zero steps. Walk during lunch and after office. That's it." },
    { task: "Study 20 min (not 2 hours)", icon: "📚", detail: "ONE video. ONE article. Keep the streak alive. Tiny input today protects the habit for tomorrow." },
    { task: "Eat at least 2 clean meals", icon: "🥗", detail: "Even if one meal is junk, make two clean. Damage control, not perfection." },
    { task: "Zero gossip (NON-NEGOTIABLE)", icon: "🚫", detail: "On bad days, you're extra vulnerable to negativity. This rule NEVER breaks. Walk away, headphones on, leave." },
    { task: "Journal 3 lines before bed", icon: "📓", detail: "What happened? Why was it bad? What will I do differently? Three lines prevent bad days from becoming bad weeks." },
  ],
  triggers: [
    { trigger: "Manager disrespected you again", response: "Write it down. Then open study notes. Channel anger into: 'I'm getting out.' Apply to 3 extra jobs today. Revenge is a career upgrade." },
    { trigger: "Missed gym / broke diet", response: "One miss doesn't erase a week of progress. Speed bump, not cliff. Walk instead. Tomorrow gym is non-negotiable." },
    { trigger: "Feeling overwhelmed by everything", response: "Pick ONE task from the routine. Just one. Complete it. Then pick another. You don't do everything — you do the NEXT thing." },
    { trigger: "Comparing yourself to others online", response: "Close the app. Open your progress log. Look at 30 days ago. THAT's your comparison. Then do one push-up. Action breaks spirals." },
    { trigger: "Zero motivation / everything feels pointless", response: "Normal. Motivation is unreliable — that's why you have a SYSTEM. Follow minimum viable day above. Survive today. Motivation returns." },
    { trigger: "Job rejection", response: "Every rejection = data point, not verdict. Ask for feedback. Tweak resume. Apply to 3 more. 100 applications beats 10 applications + giving up." },
  ],
  mantra: "A bad day following the plan is better than a good day without one. You don't need to be perfect — you need to be consistent. The person who shows up on bad days wins.",
};

const contentPlan = [
  { month: 1, topic: "My DevOps Home Lab Setup", format: "Carousel (8-10 slides)", hook: "Show your K8s cluster, monitoring dashboard, tools. People love real setups.", tags: "#DevOps #HomeLab #Kubernetes" },
  { month: 2, topic: "5 Tools Every DevOps Engineer Needs in 2026", format: "Reel (60-90 sec)", hook: "Quick cuts showing each tool in action. Fast, visual, punchy.", tags: "#DevOps #CloudEngineering #TechTools" },
  { month: 3, topic: "My Transformation Journey — Month 3", format: "Carousel with photos", hook: "Vulnerability wins. Show progress, not perfection. Before/during shots.", tags: "#Transformation #FitnessJourney #GrowthMindset" },
  { month: 4, topic: "How I Passed CKA While Working Full-Time", format: "Reel + detailed caption", hook: "Study routine + struggles + result. Gold content for tech Instagram.", tags: "#CKA #Kubernetes #CertificationJourney" },
  { month: 5, topic: "Building an AI-Powered DevOps Tool", format: "Carousel (code + demo)", hook: "Problem → solution → code → result. Technical + visual.", tags: "#AI #DevOps #BuildInPublic" },
  { month: 6, topic: "6-Month Transformation: Body + Career + Mind", format: "Reel (montage)", hook: "Full story compilation. This could be your breakout post.", tags: "#6MonthChallenge #Transformation #DevOps" },
];

const weeklyView = [
  { day: "Monday", gym: "7:30 AM — Push (Chest + Shoulders + Triceps)", study_am: "Primary Topic — New Concepts", study_pm: "Practice Labs", extra: "Apply to 3 jobs" },
  { day: "Tuesday", gym: "7:30 AM — Pull (Back + Biceps)", study_am: "Primary Topic — Deep Dive", study_pm: "YouTube Tutorial", extra: "Apply to 2 jobs" },
  { day: "Wednesday", gym: "7:30 AM — Legs + Core", study_am: "Primary Topic — Hands-on", study_pm: "Revision Notes", extra: "Startup research 45 min" },
  { day: "Thursday", gym: "7:30 AM — Push (variation)", study_am: "Secondary Topic — Intro", study_pm: "Practice Labs", extra: "Apply to 3 jobs" },
  { day: "Friday", gym: "7:30 AM — Pull (variation)", study_am: "Secondary Topic — Deep Dive", study_pm: "Portfolio project", extra: "Content prep" },
  { day: "Saturday", gym: "7:30 AM — Full Body + 30min Cardio", study_am: "2hr deep study", study_pm: "Mock exam", extra: "Startup MVP 2hrs" },
  { day: "Sunday", gym: "8:00 AM — Recovery Walk (5K steps)", study_am: "Review week", study_pm: "Plan next week", extra: "Energy Audit + Meal Prep" },
];

const stepGoals = { gym_treadmill: 2000, lunch_walk: 2000, office: 1000, evening_walk: 3000, misc: 2000 };

// ===== COMPONENTS =====

function Badge({ children, color }) {
  return <span style={{ background: color + "22", color, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{children}</span>;
}

function typeColor(type) {
  return { fitness: GREEN, study: BLUE, mindset: PURPLE, health: WARM, work: MUTED, startup: ACCENT, neutral: "#555" }[type] || MUTED;
}

function Card({ title, color, children }) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 16, marginBottom: 12 }}>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  );
}

function Timeline({ item, isOpen, onClick, isLast }) {
  const c = typeColor(item.type);
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 2 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56, flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: MUTED, fontWeight: 600, whiteSpace: "nowrap" }}>{item.time}</div>
        <div style={{ width: 2, flex: 1, background: isLast ? "transparent" : BORDER, marginTop: 4 }} />
      </div>
      <div onClick={onClick} style={{ flex: 1, background: isOpen ? c + "0d" : CARD_BG, border: `1px solid ${isOpen ? c + "44" : BORDER}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8, cursor: "pointer", transition: "all 0.2s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{item.activity}</span>
          <Badge color={c}>{item.type}</Badge>
        </div>
        {isOpen && <div style={{ marginTop: 10, fontSize: 13, color: "#ccc", lineHeight: 1.7, borderTop: `1px solid ${BORDER}`, paddingTop: 10 }}>{item.detail}</div>}
      </div>
    </div>
  );
}

function Expand({ title, icon, color, detail, isOpen, onClick }) {
  return (
    <div onClick={onClick} style={{ background: isOpen ? color + "0d" : CARD_BG, border: `1px solid ${isOpen ? color + "44" : BORDER}`, borderRadius: 12, padding: 14, marginBottom: 8, cursor: "pointer", transition: "all 0.2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
        <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{title}</span>
        <span style={{ color: MUTED, fontSize: 16 }}>{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <div style={{ marginTop: 12, fontSize: 13, color: "#ccc", lineHeight: 1.8, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>{typeof detail === "string" ? detail : detail}</div>}
    </div>
  );
}

// ===== MAIN =====

export default function App() {
  const [tab, setTab] = useState(0);
  const [exp, setExp] = useState({});
  const t = (k) => setExp(p => ({ ...p, [k]: !p[k] }));

  return (
    <div style={{ background: DARK, minHeight: "100vh", color: "#eee", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: `linear-gradient(135deg, ${DARK}, #1a0a00, ${DARK})`, borderBottom: `1px solid ${BORDER}`, padding: "24px 16px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>360° Life Transformation</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff" }}>Your Complete Blueprint</h1>
        <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 11 }}>DevOps → Platform Engineer / SRE + Fit + Founder</p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
          <Badge color={GREEN}>10K Steps</Badge><Badge color={BLUE}>2hr Study</Badge><Badge color={PURPLE}>Gym 6x</Badge><Badge color={WARM}>12 Tabs</Badge>
        </div>
      </div>

      <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}`, overflowX: "auto", background: "#0d0d0d", WebkitOverflowScrolling: "touch" }}>
        {tabs.map((tb, i) => (
          <button key={i} onClick={() => { setTab(i); setExp({}); }} style={{
            flex: "0 0 auto", padding: "8px 10px", background: "none", border: "none",
            borderBottom: tab === i ? `2px solid ${ACCENT}` : "2px solid transparent",
            color: tab === i ? ACCENT : MUTED, fontSize: 10, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
          }}>
            <div style={{ fontSize: 14 }}>{tb.icon}</div>
            <div style={{ marginTop: 1 }}>{tb.label}</div>
          </button>
        ))}
      </div>

      <div style={{ padding: "14px 14px 60px", maxWidth: 640, margin: "0 auto" }}>

        {tab === 0 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>Weekday schedule. Gym first, study, office, grow. Tap any block for details.</p>
          {dailyRoutine.map((item, i) => <Timeline key={i} item={item} isOpen={exp[`d${i}`]} onClick={() => t(`d${i}`)} isLast={i === dailyRoutine.length - 1} />)}
          <Card title="🦶 Steps Breakdown — 10,000 Total" color={GREEN}>
            {Object.entries(stepGoals).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 90, fontSize: 11, color: MUTED, textTransform: "capitalize" }}>{k.replace(/_/g, " ")}</div>
                <div style={{ flex: 1, height: 8, background: "#222", borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${(v / 10000) * 100}%`, height: "100%", background: GREEN, borderRadius: 4 }} /></div>
                <div style={{ fontSize: 12, color: "#ccc", width: 45, textAlign: "right" }}>{v.toLocaleString()}</div>
              </div>
            ))}
          </Card>
        </div>}

        {tab === 1 && <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {["saturday", "sunday"].map(d => (
              <button key={d} onClick={() => setExp(p => ({ weekendDay: d }))} style={{
                flex: 1, padding: 10, borderRadius: 10, border: "none", cursor: "pointer",
                background: (exp.weekendDay || "saturday") === d ? ACCENT : CARD_BG,
                color: (exp.weekendDay || "saturday") === d ? "#fff" : MUTED,
                fontSize: 12, fontWeight: 700, textTransform: "capitalize",
              }}>{d === "saturday" ? "⚡ Saturday" : "🔄 Sunday"}</button>
            ))}
          </div>
          {(weekendRoutine[exp.weekendDay || "saturday"] || []).map((item, i, arr) => (
            <Timeline key={i} item={item} isOpen={exp[`w${i}`]} onClick={() => t(`w${i}`)} isLast={i === arr.length - 1} />
          ))}
        </div>}

        {tab === 2 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>24 weeks. 2-3 certs + portfolio + AI skills. Tap each block.</p>
          {weeklyStudyPlan.map((b, i) => {
            const cs = [BLUE, PURPLE, ACCENT, GREEN, WARM, PINK]; const c = cs[i];
            return <Expand key={i} title={`${b.week}: ${b.title}`} icon={<div style={{ width: 28, height: 28, borderRadius: 8, background: c + "22", color: c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{i + 1}</div>} color={c}
              detail={<div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c, marginBottom: 6 }}>TOPICS:</div>
                {b.topics.map((tp, j) => <div key={j} style={{ fontSize: 12, color: "#ccc", padding: "3px 0 3px 12px", borderLeft: `2px solid ${c}33`, marginBottom: 3 }}>{tp}</div>)}
                <div style={{ fontSize: 12, fontWeight: 700, color: c, marginBottom: 6, marginTop: 12 }}>RESOURCES:</div>
                {b.resources.map((r, j) => <div key={j} style={{ fontSize: 12, color: "#aaa", padding: "2px 0 2px 12px", borderLeft: `2px solid ${c}22` }}>📌 {r}</div>)}
                <div style={{ marginTop: 12, padding: "8px 12px", background: c + "15", borderRadius: 8, fontSize: 12, fontWeight: 700, color: c }}>🎯 {b.cert}</div>
              </div>} isOpen={exp[`s${i}`]} onClick={() => t(`s${i}`)} />;
          })}
        </div>}

        {tab === 3 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>~1800-2000 cal/day. High protein, Indian food focused. Tap each meal for options.</p>
          {mealPlan.weekday.map((m, i) => (
            <Expand key={i} title={`${m.meal}  •  ${m.calories}`} color={WARM}
              detail={<div>
                {m.items.map((it, j) => <div key={j} style={{ padding: "3px 0 3px 12px", borderLeft: `2px solid ${WARM}33`, marginBottom: 3, fontSize: 12 }}>{it}</div>)}
                <div style={{ marginTop: 8, padding: "6px 10px", background: WARM + "15", borderRadius: 6, fontSize: 11, color: WARM }}>💡 {m.note}</div>
              </div>} isOpen={exp[`m${i}`]} onClick={() => t(`m${i}`)} />
          ))}
          <Card title="🛒 Weekly Grocery List" color={GREEN}>
            {mealPlan.grocery.map((g, i) => <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, marginBottom: 3 }}>{g.category}</div>
              <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${GREEN}22` }}>{g.items}</div>
            </div>)}
          </Card>
          <Card title="📏 Nutrition Rules" color={ACCENT}>
            {mealPlan.rules.map((r, i) => <div key={i} style={{ fontSize: 12, color: "#ccc", padding: "3px 0 3px 12px", borderLeft: `2px solid ${ACCENT}33`, marginBottom: 3, lineHeight: 1.6 }}>{r}</div>)}
          </Card>
        </div>}

        {tab === 4 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>The most important tab. 8 rules = your mental operating system upgrade.</p>
          {mindsetRules.map((m, i) => <Expand key={i} title={m.rule} icon={m.icon} color={PURPLE} detail={m.detail} isOpen={exp[`mi${i}`]} onClick={() => t(`mi${i}`)} />)}
          <div style={{ background: `linear-gradient(135deg, ${PURPLE}22, ${ACCENT}22)`, border: `1px solid ${PURPLE}44`, borderRadius: 12, padding: 16, marginTop: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 6 }}>"I can do hard things."</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7 }}>Say it at 7 AM. Say it at the gym. Say it when gossip calls. Say it when Terraform breaks at 10 PM. This is your mantra.</div>
          </div>
        </div>}

        {tab === 5 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>Your phone is either a growth tool or a weapon against you. No middle ground.</p>
          <Card title="🗑️ DELETE / LIMIT" color="#EF4444">
            {socialDetox.remove.map((s, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div><div style={{ fontSize: 12, fontWeight: 700, color: "#EF4444" }}>{s.app}</div><div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.5, marginTop: 2 }}>{s.action}</div></div>
            </div>)}
          </Card>
          <Card title="🔄 Replace With" color={GREEN}>
            {socialDetox.replace.map((s, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div><div style={{ fontSize: 11, color: "#EF4444", textDecoration: "line-through" }}>{s.old}</div><div style={{ fontSize: 12, fontWeight: 600, color: GREEN, marginTop: 2 }}>→ {s.with}</div></div>
            </div>)}
          </Card>
          <Card title="📜 Phone Rules" color={BLUE}>
            {socialDetox.rules.map((r, i) => <div key={i} style={{ fontSize: 12, color: "#ccc", padding: "4px 0 4px 12px", borderLeft: `2px solid ${BLUE}33`, marginBottom: 3, lineHeight: 1.5 }}>{r}</div>)}
          </Card>
        </div>}

        {tab === 6 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>GitHub IS your resume in 2026. 4 projects that make recruiters come to YOU.</p>
          {portfolioStrategy.github.map((p, i) => {
            const cs = [BLUE, PURPLE, ACCENT, GREEN]; const c = cs[i];
            return <Expand key={i} title={p.project} icon="📁" color={c}
              detail={<div><div style={{ lineHeight: 1.7, marginBottom: 8 }}>{p.desc}</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><Badge color={c}>{p.timeline}</Badge></div></div>}
              isOpen={exp[`p${i}`]} onClick={() => t(`p${i}`)} />;
          })}
          <Card title="👤 GitHub Profile Checklist" color={TEAL}>
            {portfolioStrategy.profile.map((p, i) => <div key={i} style={{ fontSize: 12, color: "#ccc", padding: "4px 0 4px 12px", borderLeft: `2px solid ${TEAL}33`, marginBottom: 3, lineHeight: 1.5 }}>{p}</div>)}
          </Card>
        </div>}

        {tab === 7 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>80% of jobs filled through networking. LinkedIn + community = hired faster than 100 cold applications.</p>
          {networkingPlan.linkedin.map((n, i) => (
            <Expand key={i} title={n.action} icon="🔗" color={BLUE}
              detail={<div><div style={{ lineHeight: 1.7, marginBottom: 8 }}>{n.detail}</div><Badge color={BLUE}>{n.freq}</Badge></div>}
              isOpen={exp[`n${i}`]} onClick={() => t(`n${i}`)} />
          ))}
          <Card title="🌐 Communities to Join" color={PURPLE}>
            {networkingPlan.communities.map((c, i) => <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{c.name}</div><Badge color={PURPLE}>{c.type}</Badge></div>
              <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.5, marginTop: 3 }}>{c.detail}</div>
            </div>)}
          </Card>
        </div>}

        {tab === 8 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>Without tracking, plans die in 2 weeks. Score yourself daily. Numbers don't lie.</p>
          <Card title="📊 Daily Scorecard (65 pts possible)" color={GREEN}>
            {accountability.daily.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{h.icon}</span>
                <span style={{ flex: 1, fontSize: 12, color: "#ccc" }}>{h.habit}</span>
                <div style={{ background: GREEN + "22", color: GREEN, padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>+{h.pts}</div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: "8px 12px", background: GREEN + "12", borderRadius: 8, fontSize: 11, color: GREEN, lineHeight: 1.6 }}>
              50+ = great day • 40-49 = good day • Below 40 = review and fix tomorrow
            </div>
          </Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 8 }}>🛠️ Tracking Tools</div>
          {accountability.tools.map((tl, i) => <Expand key={i} title={tl.tool} icon={tl.icon} color={PURPLE} detail={tl.detail} isOpen={exp[`a${i}`]} onClick={() => t(`a${i}`)} />)}
        </div>}

        {tab === 9 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>Bad days WILL come. This is your emergency protocol. Open this tab when everything's falling apart.</p>
          <Card title="🛟 Minimum Viable Day (motivation = 0)" color={WARM}>
            {badDayPlan.minimum.map((m, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <div><div style={{ fontSize: 12, fontWeight: 700, color: WARM }}>{m.task}</div><div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.5, marginTop: 2 }}>{m.detail}</div></div>
            </div>)}
          </Card>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", marginBottom: 8 }}>⚡ Trigger → Response Playbook</div>
          {badDayPlan.triggers.map((tr, i) => <Expand key={i} title={tr.trigger} icon="🔥" color="#EF4444" detail={tr.response} isOpen={exp[`b${i}`]} onClick={() => t(`b${i}`)} />)}
          <div style={{ background: `linear-gradient(135deg, ${WARM}22, ${ACCENT}22)`, border: `1px solid ${WARM}44`, borderRadius: 12, padding: 14, marginTop: 10 }}>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.8, fontStyle: "italic" }}>{badDayPlan.mantra}</div>
          </div>
        </div>}

        {tab === 10 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>1 post/month. Tech + fitness + mindset = rare combo that stands out.</p>
          {contentPlan.map((c, i) => (
            <div key={i} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 14, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ACCENT + "22", color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>M{c.month}</div>
                <div><div style={{ fontSize: 13, fontWeight: 700 }}>{c.topic}</div><div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{c.format}</div></div>
              </div>
              <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.5, marginBottom: 6 }}>{c.hook}</div>
              <div style={{ fontSize: 10, color: BLUE }}>{c.tags}</div>
            </div>
          ))}
        </div>}

        {tab === 11 && <div>
          <p style={{ color: MUTED, fontSize: 12, marginBottom: 14, lineHeight: 1.6 }}>Week at a glance. Mon-Fri grind. Saturday power day. Sunday recover + plan.</p>
          {weeklyView.map((d, i) => {
            const we = i >= 5;
            return <div key={i} style={{ background: we ? ACCENT + "0a" : CARD_BG, border: `1px solid ${we ? ACCENT + "33" : BORDER}`, borderRadius: 12, padding: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: we ? ACCENT : "#fff", marginBottom: 8 }}>{d.day} {we && "⭐"}</div>
              {[{ l: "GYM", v: d.gym, c: GREEN }, { l: "AM", v: d.study_am, c: BLUE }, { l: "PM", v: d.study_pm, c: PURPLE }, { l: "EXTRA", v: d.extra, c: WARM }].map((r, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 40, fontSize: 10, fontWeight: 700, color: r.c, paddingTop: 1, flexShrink: 0 }}>{r.l}</div>
                  <div style={{ fontSize: 11, color: "#bbb", lineHeight: 1.4 }}>{r.v}</div>
                </div>
              ))}
            </div>;
          })}
          <Card title="🎯 Weekly Targets" color={ACCENT}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { l: "Applications", v: "15/wk", c: ACCENT }, { l: "Study", v: "14hrs", c: BLUE }, { l: "Steps", v: "70K", c: GREEN },
                { l: "Gym", v: "6x", c: PURPLE }, { l: "LinkedIn", v: "1 post", c: TEAL }, { l: "Cold DMs", v: "5/wk", c: WARM },
              ].map((g, i) => <div key={i} style={{ background: g.c + "11", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: g.c }}>{g.v}</div>
                <div style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{g.l}</div>
              </div>)}
            </div>
          </Card>
        </div>}
      </div>
    </div>
  );
}
