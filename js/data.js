/*
 * Guardian Angel Student Portal — content
 * Source: "Guardian Angel Student Portal · Onboarding Content Framework" (Merrickson, 21 Oct 2026).
 * Every playbook entry and rule carries a version and a last reviewed date.
 */
window.GA_DATA = {
  version: '1.0',
  reviewed: '2026-10-21',

  // Permitted texting hours in the seller's local time (24h clock).
  // PLACEHOLDER — US counsel sets the real window. Change it here and every clock updates.
  window: { start: 9, end: 20, note: 'Placeholder until US counsel confirms the permitted hours.' },

  zones: [
    { tz: 'America/New_York', name: 'Eastern', city: 'New York' },
    { tz: 'America/Chicago', name: 'Central', city: 'Chicago' },
    { tz: 'America/Denver', name: 'Mountain', city: 'Denver' },
    { tz: 'America/Phoenix', name: 'Arizona', city: 'Phoenix', note: 'No daylight saving' },
    { tz: 'America/Los_Angeles', name: 'Pacific', city: 'Los Angeles' },
    { tz: 'America/Anchorage', name: 'Alaska', city: 'Anchorage' },
    { tz: 'Pacific/Honolulu', name: 'Hawaii', city: 'Honolulu' }
  ],
  home: { tz: 'Asia/Kolkata', name: 'You', city: 'India · IST' },

  sections: [
    {
      id: 'company', num: '01', icon: 'roof', title: 'Company and mission', nav: 'Company and mission', time: '30 min',
      short: 'What Guardian Angel does, how a deal moves and where the student fits',
      kicker: 'About 30 minutes · The first thing a new login opens',
      lead: 'Every student starts with the same picture of the business.',
      intro: 'This section takes about thirty minutes and is the first thing a new login opens.'
    },
    {
      id: 'basics', num: '02', icon: 'book', title: 'US real estate basics', nav: 'Real estate basics', time: '60 min',
      short: 'The vocabulary, market context and seller situations they will meet',
      kicker: 'Vocabulary · Market context · Seller situations',
      lead: 'Most students have never worked in the US property market.',
      intro: 'This section gives you enough grounding to read a seller’s situation correctly and reply in natural American English.'
    },
    {
      id: 'playbook', num: '03', icon: 'chat', title: 'Messaging playbook', nav: 'Messaging playbook', time: '90 min',
      short: 'Approved replies for every common seller message',
      kicker: 'The section you will use every day',
      lead: 'This is the section students use every day.',
      intro: 'It gives an approved reply to every common seller message, so no student needs to ask a manager what to say.'
    },
    {
      id: 'compliance', num: '04', icon: 'shield', title: 'Compliance and red lines', nav: 'Compliance', time: '45 min',
      short: 'The rules for texting US property owners, with no exceptions',
      kicker: 'No exceptions · Test requires 100%',
      lead: 'Texting US consumers is regulated, and breaches carry penalties per message.',
      intro: 'Federal rules, including the Telephone Consumer Protection Act and the National Do Not Call Registry, apply alongside state texting laws that are often stricter. Guardian Angel’s US counsel approves this section before launch and whenever the rules change.'
    },
    {
      id: 'training', num: '05', icon: 'target', title: 'Training and certification', nav: 'Training', time: '',
      short: 'Tests, practice conversations and staged access to the live system',
      kicker: 'Modules · Simulator · Access levels',
      lead: 'Students earn access in stages.',
      intro: 'Self paced modules, practice conversations and fixed pass marks replace the training time management would otherwise spend.'
    },
    {
      id: 'support', num: '06', icon: 'buoy', title: 'Self serve support', nav: 'Self serve support', time: '',
      short: 'Answers to questions without going to management',
      kicker: 'Five layers · One short list reaches management',
      lead: 'Questions are answered in layers,',
      intro: 'and only a short list ever reaches management.'
    },
    {
      id: 'feedback', num: '07', icon: 'loop', title: 'Feedback loop', nav: 'Feedback loop', time: '',
      short: 'A way for field experience to keep the portal current',
      kicker: 'Field experience keeps the portal current',
      lead: 'The portal improves from what students meet in the field,',
      intro: 'without management writing the updates.'
    }
  ],

  signals: ['Bankruptcy filings', 'Inherited and legacy ownership', 'Tax delinquency', 'Pre-foreclosure', 'Code violations'],

  pipeline: [
    { stage: 'Data sourcing', what: 'Properties are flagged from public records and distress signals', who: 'Data team' },
    { stage: 'Outreach', what: 'First text campaigns go out to property owners', who: 'System' },
    { stage: 'Conversation', what: 'Replies are handled and the seller’s situation is understood', who: 'Student', you: true },
    { stage: 'Qualification', what: 'Condition, timeline, motivation and price expectation are confirmed', who: 'Student', you: true },
    { stage: 'Offer', what: 'The property is valued and an offer is made', who: 'Acquisitions' },
    { stage: 'Closing', what: 'Title, escrow and contract are completed', who: 'Acquisitions and legal' },
    { stage: 'Renovation', what: 'The property is repaired and upgraded', who: 'Renovation team' },
    { stage: 'Resale', what: 'The finished property is sold on the open market', who: 'Sales' }
  ],

  ownerValue: [
    { gets: 'Speed', means: 'A sale in weeks rather than months on the open market' },
    { gets: 'An as is sale', means: 'No repairs, cleaning or clearing out before selling' },
    { gets: 'Certainty', means: 'No buyer financing falling through and no repeated viewings' },
    { gets: 'Fewer costs', means: 'No agent commission and fewer parties involved' },
    { gets: 'A way out', means: 'An exit from a property that has become a financial or personal burden' }
  ],

  glossary: [
    { term: 'Distressed property', meaning: 'A property whose owner is under financial, legal or personal pressure, or which is in poor condition' },
    { term: 'Pre-foreclosure', meaning: 'The period after an owner falls behind on mortgage payments and before the lender takes the property' },
    { term: 'Probate', meaning: 'The court process for settling the estate of someone who has died, often including their home' },
    { term: 'Inherited or legacy property', meaning: 'A home passed to heirs who may live elsewhere or not want to keep it' },
    { term: 'Tax lien', meaning: 'A legal claim placed on a property when property taxes go unpaid' },
    { term: 'Code violation', meaning: 'A notice from the city that a property breaks building or safety rules' },
    { term: 'Absentee owner', meaning: 'An owner who does not live at the property' },
    { term: 'Tired landlord', meaning: 'A rental owner worn down by tenants and repairs and open to selling' },
    { term: 'Bankruptcy', meaning: 'A legal process for people or businesses unable to pay debts; a sale may need court approval' },
    { term: 'Equity', meaning: 'The property’s value minus what is still owed on it' },
    { term: 'ARV', meaning: 'After repair value, the expected value once renovation is complete' },
    { term: 'As is', meaning: 'A sale in current condition with no repairs by the seller' },
    { term: 'Cash offer', meaning: 'An offer that does not depend on bank financing, allowing a faster close' },
    { term: 'Title', meaning: 'Legal ownership; a clean title has no unresolved claims against it' },
    { term: 'Escrow', meaning: 'A neutral third party holding money and documents until the sale completes' },
    { term: 'Closing', meaning: 'The final step where ownership transfers and payment is made' }
  ],

  usRules: [
    { title: 'Their clock, not yours', body: 'Keep the time zone map and IST converter open. Check the seller’s local time before every message.' },
    { title: 'American spelling', body: 'Color, favor, realize, center. The phrase check below catches the common slips.' },
    { title: 'Plain, conversational English', body: 'Avoid Indian English phrases such as “kindly”, “do the needful” and “revert”.' },
    { title: 'Dollars, square feet, month first', body: 'Prices in dollars, areas in square feet, and dates written month first: 10/21/2026.' }
  ],

  situations: [
    { id: 'preforeclosure', name: 'Pre-foreclosure', mind: 'Stressed and short on time', helps: 'A calm tone and discretion', avoid: 'Mentioning debt or pushing urgency' },
    { id: 'probate', name: 'Probate or inherited', mind: 'Grieving or overwhelmed', helps: 'Patience and flexibility on timing', avoid: 'Rushing the family' },
    { id: 'landlord', name: 'Tired landlord', mind: 'Frustrated and practical', helps: 'Short, direct answers', avoid: 'Long or vague messages' },
    { id: 'tax', name: 'Tax delinquent', mind: 'Worried, sometimes defensive', helps: 'Respectful, practical language', avoid: 'Anything that sounds like judgement' },
    { id: 'code', name: 'Code violations', mind: 'Cornered by the city', helps: 'Taking the problem off their hands', avoid: 'Criticising the property' },
    { id: 'bankruptcy', name: 'Bankruptcy', mind: 'Anxious and legally constrained', helps: 'Passing legal questions upward', avoid: 'Commenting on their finances' },
    { id: 'absentee', name: 'Vacant or absentee', mind: 'Detached from the property', helps: 'A simple, low effort route to sell', avoid: 'Assuming they know its condition' }
  ],

  principles: [
    { p: 'Sound like a person', how: 'Adapt the template to the seller’s words and use their name. Never paste the same reply twice.' },
    { p: 'Keep it short', how: 'Two or three sentences, one question at a time.' },
    { p: 'Acknowledge first', how: 'Respond to what the seller said before moving the conversation on. Never argue.' },
    { p: 'No pressure', how: 'No false urgency and no pushing after a clear no.' },
    { p: 'Stay accurate', how: 'Never guess a price or invent facts about the firm.' }
  ],

  cadence: [
    { k: 'Response window', v: 'Every inbound reply is answered within the firm’s response window.' },
    { k: 'Permitted hours', v: 'Only during the seller’s permitted hours, in their time zone.' },
    { k: 'Two follow ups', v: 'An unanswered thread gets no more than two, then moves to long term status.' },
    { k: 'Notes logged', v: 'Every conversation ends with notes in the dashboard anyone can pick up.' }
  ],

  replies: [
    { id: 'interested', says: 'Interested', keys: 'yes tell me more how does it work', reply: 'Thanks for getting back to me, [Name]. Happy to explain how it works. What condition is the home in, and when would you ideally like to sell?', next: 'Gather condition, timeline, motivation and price expectation' },
    { id: 'number', says: 'How did you get my number?', keys: 'who is this where privacy', reply: 'Fair question. We use public property records to reach owners in [City]. If you’d rather not hear from us, reply STOP and we won’t text again.', next: 'Continue only if they engage' },
    { id: 'notforsale', says: 'Not for sale', keys: 'no not interested not selling', reply: 'Understood, and thanks for letting me know. If anything changes, feel free to reach out.', next: 'Tag not interested; no more outreach this cycle' },
    { id: 'offer', says: 'What’s your offer?', keys: 'price how much worth pay number value ballpark', reply: 'I’d rather give you a real number than a guess. What condition is the home in right now?', next: 'Collect details and hand over to acquisitions' },
    { id: 'hostile', says: 'Angry or hostile', keys: 'rude swearing leave me alone annoyed', reply: 'Sorry for the bother. I’ll make sure you aren’t contacted again.', next: 'Mark do not contact; no further reply' },
    { id: 'wrong', says: 'Wrong number', keys: 'not me wrong person', reply: 'Apologies for the mix up. I’ll remove this number from our list.', next: 'Mark wrong number' },
    { id: 'passed', says: 'The owner has passed away', keys: 'died death deceased estate probate family', reply: 'I’m very sorry for your loss, and sorry for the intrusion. If your family ever wants to talk about the property, there’s no pressure at all.', next: 'Tag probate and pause outreach' },
    { id: 'listed', says: 'Listed with an agent', keys: 'realtor listing agent market mls', reply: 'Thanks for letting me know. If the listing ends and you’d like a simple as is option, you’re welcome to reach out.', next: 'Tag listed; no contact while under contract' },
    { id: 'scam', says: 'Is this a scam?', keys: 'legit real fraud trust who are you', reply: 'Fair to be careful. We’re Guardian Angel Acquisitions, buying homes in [Area]. You can find us at [website]. We never ask for money or bank details.', next: 'Share only approved company details' },
    { id: 'later', says: 'Call me later', keys: 'busy phone call another time', reply: 'No problem. When’s a good time to reconnect?', next: 'Schedule at their local time' },
    { id: 'think', says: 'Needs time to think', keys: 'not sure maybe think about it wait', reply: 'Take all the time you need. Alright if I check back in a couple of weeks?', next: 'Follow up only if they agree' },
    { id: 'stop', says: 'STOP', keys: 'unsubscribe remove me opt out stop texting', reply: '', next: 'Opt out is processed instantly', noReply: 'No reply beyond the system confirmation.' }
  ],

  betterWorse: [
    { seller: 'What would you pay for it?', worse: 'We can do $180k cash, close in 7 days!', better: 'I’d rather give you an accurate number than a guess. What condition is the home in?', why: 'Quotes a price and promises a timeline, two red lines in one message.' },
    { seller: 'My dad passed and I don’t know what to do with it.', worse: 'Great, we buy inherited homes fast. Want an offer?', better: 'I’m so sorry about your dad. There’s no rush. Whenever you’re ready, I’m happy to explain your options.', why: 'Skips the loss entirely and rushes a grieving family.' },
    { seller: 'Stop texting me.', worse: 'Sorry! Just one quick question before I go...', better: null, betterNote: 'No reply. The opt out is processed.', why: 'Any reply after an opt out is a breach.' }
  ],

  rules: [
    { rule: 'Opt outs are final', means: 'STOP, unsubscribe, remove me or any clear request ends contact permanently.' },
    { rule: 'Permitted hours only', means: 'Messages go out only within permitted hours in the seller’s local time, as set by counsel.' },
    { rule: 'No prices or promises', means: 'No figures, valuations, closing dates or guaranteed outcomes.' },
    { rule: 'No advice', means: 'Questions on debt, foreclosure, bankruptcy, tax or probate are passed upward, never answered.' },
    { rule: 'No misrepresentation', means: 'Students never misstate who they are, where they are or what the firm does.' },
    { rule: 'Care with vulnerable sellers', means: 'Extra care with elderly owners, grieving families and anyone in legal or financial distress.' },
    { rule: 'Equal treatment', means: 'Every seller is treated the same, in line with fair housing principles.' },
    { rule: 'Data stays in the system', means: 'No screenshots, no copying lead data, no personal phones or apps for seller contact.' }
  ],

  neverDo: [
    'Reply to a seller after they opt out',
    'Text outside permitted hours in the seller’s time zone',
    'Quote a price, value or timeline',
    'Give legal, tax or financial advice',
    'Pressure, threaten or invent urgency',
    'Pretend to be local or anyone other than a Guardian Angel representative',
    'Contact a seller from a personal phone, email or social account',
    'Share, copy or export seller information',
    'Argue with a seller',
    'Continue contact after a seller says an attorney is handling the matter'
  ],

  modules: [
    { id: 'm-company', name: 'Company and mission', format: 'Video and reading', time: '30 min', pass: 'Quiz, 80%', route: 'company' },
    { id: 'm-basics', name: 'US real estate basics', format: 'Reading and glossary', time: '60 min', pass: 'Quiz, 80%', route: 'basics' },
    { id: 'm-situations', name: 'Seller situations', format: 'Reading and cases', time: '45 min', pass: 'Scenario quiz, 80%', route: 'basics', anchor: 'situations' },
    { id: 'm-playbook', name: 'Messaging playbook', format: 'Library and examples', time: '90 min', pass: 'Written replies, marked by a team lead', route: 'playbook' },
    { id: 'm-compliance', name: 'Compliance and red lines', format: 'Reading and sign off', time: '45 min', pass: 'Test, 100%', route: 'compliance', anchor: 'test' },
    { id: 'm-practice', name: 'Practice conversations', format: 'Simulator', time: '60 min', pass: 'Minimum score on every persona', route: 'training', anchor: 'simulator' }
  ],

  levels: [
    { id: 'trainee', name: 'Trainee', access: 'Portal only', up: 'Pass every module and the compliance test' },
    { id: 'supervised', name: 'Supervised', access: 'Live dashboard; a team lead approves each reply before it is sent', up: 'First 25 to 50 conversations approved with no compliance issues' },
    { id: 'independent', name: 'Independent', access: 'Full reply rights within the playbook', up: 'Steady quality reviews and response times' },
    { id: 'lead', name: 'Team lead', access: 'Approves supervised replies and supports peers', up: 'Chosen on performance and reliability' }
  ],

  nextSteps: [
    { id: 'gather', label: 'Gather condition, timeline, motivation and price expectation' },
    { id: 'handover', label: 'Collect details and hand over to acquisitions' },
    { id: 'notint', label: 'Tag not interested' },
    { id: 'dnc', label: 'Mark do not contact' },
    { id: 'probate', label: 'Tag probate and pause outreach' },
    { id: 'escalate', label: 'Pass the question upward' },
    { id: 'schedule', label: 'Schedule a follow up at their local time' }
  ],

  personas: [
    {
      id: 'cautious', name: 'Curious but cautious owner', tests: 'Building trust and handling “is this a scam”', seller: 'Linda · Columbus, OH', tz: 'America/New_York',
      turns: ['Who is this? How did you get my number?', 'Ok. How do I know this isn’t some kind of scam?'],
      next: 'gather',
      signals: [
        { re: /public (property )?records?/i, ok: 'Explained where the number came from', miss: 'Say you use public property records' },
        { re: /\bstop\b/i, ok: 'Offered a clear way out', miss: 'Offer a way out: they can reply STOP' },
        { re: /guardian angel/i, ok: 'Named the company', miss: 'Say who you are: Guardian Angel Acquisitions' },
        { re: /(never|don'?t|do not|won'?t)\s+(ever\s+)?ask\b.{0,30}(money|bank|payment)/i, ok: 'Reassured them you never ask for money', miss: 'Tell them you never ask for money or bank details' }
      ],
      avoid: [{ re: /\b(trust me|i promise|100 ?%|totally legit)\b/i, msg: 'Don’t ask for trust. Show it: name the company and point to the website.' }]
    },
    {
      id: 'heir', name: 'Grieving heir', tests: 'Empathy and knowing when to pause', seller: 'Marcus · Tulsa, OK', tz: 'America/Chicago',
      turns: ['My mom passed in March. The house is hers. Honestly I don’t even know what to do with it yet.'],
      next: 'probate',
      signals: [
        { re: /\bsorry\b/i, ok: 'Opened with condolence', miss: 'Open with condolence before anything else' },
        { re: /(no (rush|pressure|hurry))|whenever you'?re ready|take (all )?(the |your )?time/i, ok: 'Took the pressure off', miss: 'Make clear there is no rush at all' }
      ],
      avoid: [{ re: /\b(offer|price|worth|cash|condition|how soon|timeline|sell (it|the (home|house)))\b/i, msg: 'Too soon to talk about the property. Pause and let the family come back to you.' }]
    },
    {
      id: 'landlord', name: 'Frustrated landlord', tests: 'Staying direct and calm', seller: 'Dave · Phoenix, AZ', tz: 'America/Phoenix',
      turns: ['Third set of tenants trashed it. I’m done. Are you actually buying or just wasting my time?'],
      next: 'gather', maxSentences: 2,
      signals: [
        { re: /\b(condition|shape|repairs?|damage|state of)\b/i, ok: 'Asked about condition', miss: 'Ask what condition the place is in' },
        { re: /\b(when|timeline|how soon|timing)\b/i, ok: 'Asked about timing', miss: 'Ask when they’d like to sell' }
      ],
      avoid: [{ re: /\b(tenants? (are|can be)|landlording is|you should have)\b/i, msg: 'Skip the commentary. Short, direct answers.' }]
    },
    {
      id: 'price', name: 'Price first seller', tests: 'Declining to quote while keeping the conversation going', seller: 'Teresa · Fresno, CA', tz: 'America/Los_Angeles',
      turns: ['Just give me a number. What would you pay?', 'Come on, ballpark. Even a range.'],
      next: 'handover',
      signals: [
        { re: /(real|accurate|fair) (number|figure)|than a guess|rather not guess|can'?t (give|quote)|not able to (give|quote)|won'?t guess/i, ok: 'Declined to quote', miss: 'Say you’d rather give a real number than a guess' },
        { re: /\b(condition|shape|repairs?|updates?|roof|kitchen)\b/i, ok: 'Kept it going with a condition question', miss: 'Keep the conversation going: ask about condition' }
      ],
      avoid: []
    },
    {
      id: 'hostile', name: 'Hostile recipient', tests: 'Ending contact correctly', seller: 'Unknown · Anchorage, AK', tz: 'America/Anchorage',
      turns: ['STOP texting me. This is the last time I’m saying it.'],
      next: 'dnc', hostile: true, signals: [], avoid: []
    },
    {
      id: 'foreclosure', name: 'Seller in foreclosure', tests: 'Discretion and passing legal questions upward', seller: 'Ray · Jacksonville, FL', tz: 'America/New_York',
      turns: ['The bank says the auction is in six weeks. Can you stop the foreclosure? Should I file bankruptcy first?'],
      next: 'escalate',
      signals: [
        { re: /\b(team|colleague|specialist|someone who|pass (this|that|it)|check with|get back to you|the right person)\b/i, ok: 'Passed the legal question upward', miss: 'Say you’ll pass the legal question to the right person' },
        { re: /\b(understand|sorry|sounds (stressful|tough|hard)|appreciate|thanks for)\b/i, ok: 'Calm, discreet tone', miss: 'Acknowledge the pressure calmly first' }
      ],
      avoid: [{ re: /\b(debt|behind on|owe|running out of time|act fast|quickly|asap|before it'?s too late)\b/i, msg: 'Don’t mention their debt or push urgency.' }]
    }
  ],

  quiz: [
    { q: 'A seller replies: “remove me from your list.” What happens next?', options: ['Send a short apology confirming removal', 'No reply beyond the system confirmation. The opt out is final', 'Ask once whether they’d sell in the future', 'Wait a week, then follow up one last time'], a: 1, why: '“Remove me” is an opt out. Opt outs are final and Never do #01 rules out any reply.' },
    { q: 'It’s 7:30 AM in Denver. A Colorado seller replied overnight. You…', options: ['Reply now while they’re engaged', 'Wait until the permitted window opens in Mountain Time', 'Reply now, it’s daytime in India', 'Reply, but keep it to one sentence'], a: 1, why: 'Permitted hours are set in the seller’s local time, never yours.' },
    { q: '“Should I file for bankruptcy before I sell?”', options: ['Explain how bankruptcy affects a sale', 'Tell them most sellers file first', 'Pass the question upward and don’t answer it', 'Suggest they ask a friend who’s been through it'], a: 2, why: 'No advice. Debt, foreclosure, bankruptcy, tax and probate questions are passed upward.' },
    { q: '“Just tell me roughly what it’s worth.”', options: ['Give a wide range so they aren’t disappointed', 'Quote a cash figure and a 7 day close', 'Say you’d rather give a real number than a guess, and ask about condition', 'Point them to an online estimate'], a: 2, why: 'No figures, valuations or closing dates. Keep the conversation going with a condition question.' },
    { q: 'A seller says their attorney is handling the matter.', options: ['Keep texting, but only once a week', 'Stop contact and escalate to management', 'Ask for the attorney’s number', 'Send the approved scam reply'], a: 1, why: 'Never do #10. Any mention of an attorney goes to management.' },
    { q: 'A seller asks you to move the chat to WhatsApp.', options: ['Fine, since they asked first', 'Use your personal phone for follow ups only', 'Keep all contact inside the system', 'Screenshot the thread so you remember them'], a: 2, why: 'Data stays in the system. No personal phones or apps for seller contact.' },
    { q: 'A seller asks, “Are you local?”', options: ['Say yes, it builds trust', 'Say you’re a Guardian Angel representative without misstating where you are', 'Change the subject', 'Name a nearby city'], a: 1, why: 'No misrepresentation. Never pretend to be local.' },
    { q: 'Which of these is allowed?', options: ['Copying a lead list into a spreadsheet to work faster', 'Logging conversation notes in the dashboard', 'Telling a grieving heir the offer expires Friday', 'Politely arguing with a seller who has the facts wrong'], a: 1, why: 'Notes belong in the dashboard. The rest break rules on data, pressure and arguing.' }
  ],

  layers: [
    { n: 1, where: 'Portal search and FAQ', what: 'Definitions, scenarios, process and rules' },
    { n: 2, where: 'Handbook assistant', what: 'Instant answers drawn only from approved portal content' },
    { n: 3, where: 'Team leads', what: 'Situations the library does not cover and reply approvals' },
    { n: 4, where: 'Ticket form', what: 'System problems, logistics and anything team leads cannot resolve' },
    { n: 5, where: 'Management', what: 'Only the items in the escalation guide' }
  ],

  escalation: {
    student: ['Questions covered by the library', 'Scheduling follow ups', 'Tags and notes', 'Opt outs and wrong numbers', 'Gathering property and timeline details'],
    lead: ['Replies the library does not cover', 'A seller asking for a phone call', 'Rude but not threatening sellers', 'Uncertainty about a tag or status', 'Dashboard or system errors'],
    management: ['A qualified seller ready for an offer, through the dashboard handover', 'Any mention of an attorney, lawsuit or legal threat', 'Media enquiries', 'A seller alleging harm or misconduct', 'A suspected data breach or compliance violation']
  },

  ticketCategories: ['System and access', 'Process question', 'Missing scenario', 'Schedule and logistics', 'Payments'],

  scenarioSteps: [
    { what: 'A student meets a seller message the library does not cover and submits it', who: 'Student' },
    { what: 'A team lead drafts a reply and tags the scenario', who: 'Team lead' },
    { what: 'Drafts are approved together in a weekly review', who: 'Reviewer' },
    { what: 'The reply is added to the library and noted in the changelog', who: 'Portal admin' },
    { what: 'Students are notified and receive a short refresher card', who: 'System' }
  ],

  feeds: [
    { source: 'Unanswered assistant questions', improves: 'New FAQ entries and clearer pages' },
    { source: 'Ticket categories', improves: 'Process fixes where questions cluster' },
    { source: 'Simulator scores', improves: 'Rewrites of modules where students struggle' },
    { source: 'Successful transcripts', improves: 'New examples for the playbook' },
    { source: 'Failed transcripts', improves: 'New better and worse comparisons' },
    { source: 'First month survey', improves: 'The order, pace and clarity of training' }
  ],

  survey: ['Which modules helped?', 'Where did you feel unprepared?', 'What did you still have to ask a person?'],

  faq: [
    { q: 'How many follow ups can I send?', a: 'An unanswered thread gets no more than two follow ups before it moves to long term status.', route: 'playbook', anchor: 'cadence', keys: 'follow up chase no reply ghosted' },
    { q: 'When am I allowed to text a seller?', a: 'Only within permitted hours in the seller’s local time, as set by counsel. Check the seller clocks on the dashboard before every message.', route: 'dashboard', anchor: 'clocks', keys: 'time hours window night morning permitted' },
    { q: 'A seller wants a phone call. What do I do?', a: 'A seller asking for a phone call is a team lead decision. Hand it to your team lead.', route: 'support', anchor: 'escalation', keys: 'call phone speak talk' },
    { q: 'What happens if I break a compliance rule?', a: 'A breach leads to retraining or removal of access depending on its seriousness. At the independent level, a breach returns you to supervised work for a fixed period.', route: 'training', anchor: 'levels', keys: 'breach mistake penalty violation' },
    { q: 'How do I move up from trainee?', a: 'Pass every module and the compliance test. Supervised access comes next, where a team lead approves each reply before it is sent.', route: 'training', anchor: 'levels', keys: 'level promotion supervised access live' },
    { q: 'How long is the buddy period?', a: 'Each new student is paired with a buddy for their first two weeks.', route: 'support', anchor: 'buddies', keys: 'buddy mentor pair' },
    { q: 'Who handles media enquiries?', a: 'Management decides. Pass it up without replying.', route: 'support', anchor: 'escalation', keys: 'press journalist news reporter media' },
    { q: 'The seller is ready for an offer. Now what?', a: 'A qualified seller ready for an offer goes to management through the dashboard handover.', route: 'support', anchor: 'escalation', keys: 'offer ready qualified handover acquisitions' },
    { q: 'Can I use my own phone or WhatsApp?', a: 'No. Data stays in the system: no personal phones, email, social accounts or apps for seller contact.', route: 'compliance', anchor: 'rules', keys: 'whatsapp personal phone app social email' },
    { q: 'How do I add a message the library doesn’t cover?', a: 'Submit it through the feedback loop. A team lead drafts a reply, it is approved in the weekly review, then added to the library.', route: 'feedback', anchor: 'submit', keys: 'new scenario missing reply add submit' },
    { q: 'When is the management office hour?', a: 'Management holds one weekly office hour as the only live contact. Questions are submitted in advance through the ticket form.', route: 'support', anchor: 'tickets', keys: 'office hour meeting management live' },
    { q: 'Seller mentions an attorney or lawsuit', a: 'Stop contact. Any mention of an attorney, lawsuit or legal threat goes to management.', route: 'support', anchor: 'escalation', keys: 'attorney lawyer lawsuit sue legal threat' }
  ],

  announcements: [
    { date: '2026-10-21', title: 'The student portal is live', body: 'All seven sections are open. Start with 01 Company and mission, then work down the list.' },
    { date: '2026-10-21', title: 'Weekly office hour', body: 'Management holds one office hour each week as the only live contact. Send your questions in advance through the ticket form.' }
  ],

  changelog: [
    { v: '1.0', date: '2026-10-21', note: 'Portal launched: seven sections, twelve approved replies, eight compliance rules.' }
  ]
};
