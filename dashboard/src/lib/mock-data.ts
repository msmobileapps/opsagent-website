import { Agent, ExecutionLog, DepartmentMetrics } from './types';

export const agents: Agent[] = [
  {
    id: 'lead-pipeline',
    name: 'Lead Pipeline',
    department: 'Sales',
    description: 'Daily scanning, prioritization, and pipeline report delivery. Updates CRM events and sends briefings.',
    status: 'idle',
    schedule: 'Every day at 08:00',
    lastRun: '2026-03-21T08:00:00Z',
    nextRun: '2026-03-22T08:00:00Z',
    icon: 'target',
    metrics: [
      { label: 'Leads Processed', value: 47, trend: 12 },
      { label: 'Follow-ups Sent', value: 18, trend: 5 },
      { label: 'Conversion Rate', value: '24%', trend: 3 },
    ],
  },
  {
    id: 'linkedin-outreach',
    name: 'LinkedIn Outreach',
    department: 'Sales',
    description: 'Finds target segments, writes personalized messages, sends them via LinkedIn, and tracks responses.',
    status: 'running',
    schedule: 'Every day at 09:30',
    lastRun: '2026-03-21T09:30:00Z',
    nextRun: '2026-03-22T09:30:00Z',
    icon: 'send',
    metrics: [
      { label: 'Messages Sent', value: 312, trend: 8 },
      { label: 'Response Rate', value: '19%', trend: 2 },
      { label: 'Meetings Booked', value: 11, trend: 15 },
    ],
  },
  {
    id: 'proposal-generator',
    name: 'Proposal Generator',
    department: 'Sales',
    description: 'Generates client proposals and quotes based on templates, project scope, and historical pricing data.',
    status: 'idle',
    schedule: 'On demand',
    lastRun: '2026-03-20T14:30:00Z',
    nextRun: '2026-03-22T14:30:00Z',
    icon: 'file-text',
    metrics: [
      { label: 'Proposals Created', value: 8, trend: 33 },
      { label: 'Win Rate', value: '62%', trend: 8 },
      { label: 'Avg Value', value: '₪45K', trend: 12 },
    ],
  },
  {
    id: 'recruiter',
    name: 'Recruiting Pipeline',
    department: 'HR',
    description: 'Posts jobs, boosts listings, screens applications, and manages candidate pipeline.',
    status: 'scheduled',
    schedule: 'Every Monday at 10:00',
    lastRun: '2026-03-17T10:00:00Z',
    nextRun: '2026-03-24T10:00:00Z',
    icon: 'users',
    metrics: [
      { label: 'Positions Open', value: 3, trend: 0 },
      { label: 'Applications Reviewed', value: 86, trend: 22 },
      { label: 'Interviews Scheduled', value: 7, trend: 40 },
    ],
  },
  {
    id: 'invoicing',
    name: 'Client Invoicing',
    department: 'Finance',
    description: 'Generates end-of-month invoices, timesheet reports, and billing summaries for all active clients.',
    status: 'idle',
    schedule: 'Last day of month at 09:00',
    lastRun: '2026-02-28T09:00:00Z',
    nextRun: '2026-03-31T09:00:00Z',
    icon: 'receipt',
    metrics: [
      { label: 'Invoices Generated', value: 12, trend: 0 },
      { label: 'Total Billed', value: '₪148K', trend: 6 },
      { label: 'Avg Processing Time', value: '4 min', trend: -20 },
    ],
  },
  {
    id: 'receipts',
    name: 'Receipt Matching',
    department: 'Finance',
    description: 'Matches bank transactions and credit card charges to invoices. Uploads to accounting and flags missing receipts.',
    status: 'idle',
    schedule: 'Every Sunday at 07:00',
    lastRun: '2026-03-16T07:00:00Z',
    nextRun: '2026-03-23T07:00:00Z',
    icon: 'file-check',
    metrics: [
      { label: 'Transactions Matched', value: 94, trend: 8 },
      { label: 'Match Rate', value: '91%', trend: 3 },
      { label: 'Flagged Missing', value: 8, trend: -12 },
    ],
  },
  {
    id: 'social-posts',
    name: 'Social Content',
    department: 'Marketing',
    description: 'Creates daily multi-platform social media content for LinkedIn, Instagram, Facebook, and X.',
    status: 'idle',
    schedule: 'Every day at 07:30',
    lastRun: '2026-03-21T07:30:00Z',
    nextRun: '2026-03-22T07:30:00Z',
    icon: 'megaphone',
    metrics: [
      { label: 'Posts Created', value: 142, trend: 5 },
      { label: 'Engagement Rate', value: '4.2%', trend: 11 },
      { label: 'Reach', value: '28K', trend: 18 },
    ],
  },
  {
    id: 'status-reports',
    name: 'Status Reports',
    department: 'Operations',
    description: 'Compiles daily and weekly operational status reports from all departments and distributes to stakeholders.',
    status: 'idle',
    schedule: 'Every day at 18:00',
    lastRun: '2026-03-21T18:00:00Z',
    nextRun: '2026-03-22T18:00:00Z',
    icon: 'clipboard-list',
    metrics: [
      { label: 'Reports Sent', value: 64, trend: 0 },
      { label: 'Departments Covered', value: 4, trend: 0 },
      { label: 'Avg Compile Time', value: '3 min', trend: -15 },
    ],
  },
  {
    id: 'email-triage',
    name: 'Email Triage',
    department: 'Operations',
    description: 'Scans incoming emails, categorizes by priority and department, drafts responses, and flags urgent items.',
    status: 'running',
    schedule: 'Every 2 hours',
    lastRun: '2026-03-22T06:00:00Z',
    nextRun: '2026-03-22T08:00:00Z',
    icon: 'mail',
    metrics: [
      { label: 'Emails Processed', value: 238, trend: 10 },
      { label: 'Auto-Replied', value: 54, trend: 18 },
      { label: 'Flagged Urgent', value: 12, trend: -8 },
    ],
  },
  {
    id: 'calendar-manager',
    name: 'Calendar Manager',
    department: 'Operations',
    description: 'Manages scheduling, resolves conflicts, sends reminders, and coordinates cross-team availability.',
    status: 'idle',
    schedule: 'Every day at 07:00',
    lastRun: '2026-03-21T07:00:00Z',
    nextRun: '2026-03-22T07:00:00Z',
    icon: 'calendar',
    metrics: [
      { label: 'Events Managed', value: 34, trend: 6 },
      { label: 'Conflicts Resolved', value: 5, trend: -20 },
      { label: 'Reminders Sent', value: 22, trend: 10 },
    ],
  },
];

export const executionLogs: ExecutionLog[] = [
  {
    id: 'log-001',
    agentId: 'linkedin-outreach',
    agentName: 'LinkedIn Outreach',
    department: 'Sales',
    startedAt: '2026-03-21T09:30:00Z',
    completedAt: '2026-03-21T09:47:22Z',
    status: 'success',
    summary: 'Sent 15 personalized outreach messages to SaaS CTOs segment',
    details: [
      'Loaded segment: SaaS CTOs (Israel, 50-200 employees)',
      'Generated 15 personalized connection messages',
      'Sent all 15 messages via LinkedIn',
      'Updated tracking in Notion CRM',
      'Sent summary email to michal@msapps.co.il',
      '3 responses received from previous batch',
    ],
    outputCount: 15,
    output: [
      {
        type: 'summary',
        title: 'What was done',
        items: [
          { icon: 'check', text: '15 personalized messages sent to SaaS CTOs in Israel (50-200 employees)' },
          { icon: 'check', text: 'All contacts tracked and updated in Notion CRM' },
          { icon: 'email', text: 'Summary report sent to your email' },
        ],
      },
      {
        type: 'results',
        title: 'Key results',
        items: [
          { icon: 'check', text: '15 new connections requested' },
          { icon: 'user', text: '3 responses received from previous batch' },
          { icon: 'calendar', text: '1 meeting request from Nir Shalem (CTO, FinBridge)', actions: [
            { label: 'Schedule Meeting', style: 'primary', icon: 'calendar' },
            { label: 'View Profile', style: 'secondary', icon: 'eye' },
          ] },
        ],
      },
      {
        type: 'attention',
        title: 'Needs your attention',
        items: [
          { icon: 'alert', text: 'Nir Shalem responded — interested in a demo. Reply recommended today.', highlight: true, actions: [
            { label: 'View Reply', style: 'primary', icon: 'eye' },
            { label: 'Schedule Demo', style: 'success', icon: 'calendar' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'alert', text: 'Segment running low — only 8 contacts remaining.', highlight: true, actions: [
            { label: 'Add New Segment', style: 'primary', icon: 'user-plus' },
            { label: 'View Remaining', style: 'secondary', icon: 'eye' },
          ] },
        ],
      },
      {
        type: 'contacts',
        title: 'Suggested contacts for next batch',
        items: [
          { icon: 'user', text: 'Nir Gazit', subtitle: 'CTO at Lemonade · 180 employees · Insurtech', actions: [
            { label: 'Add to Segment', style: 'primary', icon: 'user-plus' },
            { label: 'View Profile', style: 'secondary', icon: 'eye' },
          ] },
          { icon: 'user', text: 'Shira Abramov', subtitle: 'VP Engineering at Honeybook · 120 employees · SaaS', actions: [
            { label: 'Add to Segment', style: 'primary', icon: 'user-plus' },
            { label: 'View Profile', style: 'secondary', icon: 'eye' },
          ] },
          { icon: 'user', text: 'Eyal Peled', subtitle: 'CTO at Bringg · 200 employees · Logistics SaaS', actions: [
            { label: 'Add to Segment', style: 'primary', icon: 'user-plus' },
            { label: 'View Profile', style: 'secondary', icon: 'eye' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-002',
    agentId: 'lead-pipeline',
    agentName: 'Lead Pipeline',
    department: 'Sales',
    startedAt: '2026-03-21T08:00:00Z',
    completedAt: '2026-03-21T08:12:45Z',
    status: 'success',
    summary: 'Daily pipeline scan completed — 4 hot leads identified, briefing sent',
    details: [
      'Scanned 47 active leads across all stages',
      'Identified 4 hot leads requiring immediate follow-up',
      'Updated priority scores based on recent interactions',
      'Generated daily briefing report',
      'Sent briefing via email with action items',
      'Updated calendar events for 2 follow-up meetings',
    ],
    outputCount: 4,
    output: [
      {
        type: 'summary',
        title: 'What was done',
        items: [
          { icon: 'check', text: 'Scanned all 47 active leads and updated priority scores' },
          { icon: 'email', text: 'Daily briefing sent to your email with action items' },
          { icon: 'calendar', text: '2 follow-up meetings added to your calendar' },
        ],
      },
      {
        type: 'results',
        title: 'Hot leads identified',
        items: [
          { icon: 'money', text: 'NovaTech Solutions — ₪52K proposal ready, awaiting response', tag: '₪52K', tagColor: 'green', actions: [
            { label: 'View Proposal', style: 'primary', icon: 'eye' },
            { label: 'Send Follow-up', style: 'success', icon: 'send' },
          ] },
          { icon: 'money', text: 'Meridian Digital — ₪85K opportunity, requested pricing', tag: '₪85K', tagColor: 'green', actions: [
            { label: 'Generate Proposal', style: 'primary', icon: 'edit' },
            { label: 'Schedule Call', style: 'secondary', icon: 'phone' },
          ] },
          { icon: 'user', text: 'Gett — New inquiry, first meeting Thursday', actions: [
            { label: 'View Details', style: 'secondary', icon: 'eye' },
          ] },
          { icon: 'user', text: 'Wix Studios — Referred by existing client, high potential', actions: [
            { label: 'View Details', style: 'secondary', icon: 'eye' },
            { label: 'Send Intro', style: 'primary', icon: 'send' },
          ] },
        ],
      },
      {
        type: 'documents',
        title: 'Reports generated',
        items: [
          { icon: 'file', text: 'Daily Pipeline Brief — March 21', subtitle: 'Sent to michal@msapps.co.il', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Download', style: 'secondary', icon: 'download' },
            { label: 'Edit & Resend', style: 'secondary', icon: 'edit' },
          ] },
        ],
      },
      {
        type: 'attention',
        title: 'Needs your attention',
        items: [
          { icon: 'alert', text: 'NovaTech Solutions proposal sent 3 days ago — no response yet.', highlight: true, actions: [
            { label: 'Send Follow-up', style: 'primary', icon: 'send' },
            { label: 'Call Contact', style: 'success', icon: 'phone' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'alert', text: 'Meridian Digital requested pricing by end of week — proposal needed.', highlight: true, actions: [
            { label: 'Generate Proposal', style: 'primary', icon: 'edit' },
            { label: 'Schedule Call', style: 'success', icon: 'phone' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-003',
    agentId: 'social-posts',
    agentName: 'Social Content',
    department: 'Marketing',
    startedAt: '2026-03-21T07:30:00Z',
    completedAt: '2026-03-21T07:38:15Z',
    status: 'success',
    summary: 'Created 4 posts across LinkedIn, Instagram, Facebook, and X',
    details: [
      'Generated LinkedIn article: "Why Managed Ops Beats Hiring"',
      'Created Instagram carousel: 5 slides on automation ROI',
      'Drafted Facebook post with engagement hook',
      'Composed X thread: 4 tweets on operational efficiency',
    ],
    outputCount: 4,
    output: [
      {
        type: 'documents',
        title: 'Content created',
        items: [
          { icon: 'file', text: 'LinkedIn: Article — "Why Managed Ops Beats Hiring"', tag: 'LinkedIn', tagColor: 'blue', actions: [
            { label: 'Preview', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Post Now', style: 'success', icon: 'send' },
          ] },
          { icon: 'image', text: 'Instagram: Carousel — 5 slides on automation ROI', tag: 'Instagram', tagColor: 'purple', actions: [
            { label: 'Preview', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Post Now', style: 'success', icon: 'send' },
          ] },
          { icon: 'file', text: 'Facebook: Post with engagement hook', tag: 'Facebook', tagColor: 'blue', actions: [
            { label: 'Preview', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Post Now', style: 'success', icon: 'send' },
          ] },
          { icon: 'file', text: 'X: Thread — 4 tweets on operational efficiency', tag: 'X', tagColor: 'gray', actions: [
            { label: 'Preview', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Post Now', style: 'success', icon: 'send' },
          ] },
        ],
      },
      {
        type: 'results',
        title: 'Yesterday\'s performance',
        items: [
          { icon: 'check', text: 'LinkedIn post reached 1,240 people (+18% vs average)' },
          { icon: 'check', text: '12 new LinkedIn followers gained' },
          { icon: 'user', text: '3 comments received — 2 positive, 1 question' },
        ],
      },
      {
        type: 'attention',
        title: 'Needs your attention',
        items: [
          { icon: 'alert', text: 'Comment on LinkedIn from potential lead — consider replying personally.', highlight: true, actions: [
            { label: 'View Comment', style: 'primary', icon: 'eye' },
            { label: 'Reply', style: 'success', icon: 'send' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-009',
    agentId: 'email-triage',
    agentName: 'Email Triage',
    department: 'Operations',
    startedAt: '2026-03-21T14:00:00Z',
    completedAt: '2026-03-21T14:08:33Z',
    status: 'success',
    summary: 'Processed 28 emails — 6 auto-replied, 3 flagged urgent',
    details: [
      'Scanned 28 new emails from last 2 hours',
      'Categorized: 12 client, 8 internal, 5 vendor, 3 spam',
      'Auto-replied to 6 routine inquiries',
      'Drafted responses for 4 client requests (awaiting review)',
      'Flagged 3 urgent items for immediate attention',
      'Updated email summary in daily digest',
    ],
    outputCount: 28,
    output: [
      {
        type: 'summary',
        title: 'Email overview',
        items: [
          { icon: 'email', text: '28 emails processed: 12 client, 8 internal, 5 vendor, 3 spam' },
          { icon: 'check', text: '6 routine inquiries auto-replied' },
          { icon: 'file', text: '4 draft responses ready for your review' },
        ],
      },
      {
        type: 'attention',
        title: 'Urgent — needs your attention',
        items: [
          { icon: 'alert', text: 'Client "Atlas Industries" — contract renewal question, reply needed today', highlight: true, actions: [
            { label: 'View Email', style: 'primary', icon: 'eye' },
            { label: 'Send Draft Reply', style: 'success', icon: 'send' },
            { label: 'Call Client', style: 'secondary', icon: 'phone' },
          ] },
          { icon: 'alert', text: 'Vendor billing dispute from CloudHost — ₪2,400 overcharge claim', highlight: true, tag: '₪2,400', tagColor: 'red', actions: [
            { label: 'View Dispute', style: 'primary', icon: 'eye' },
            { label: 'Send Reply', style: 'success', icon: 'send' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'alert', text: 'HR candidate declined offer — need to reopen search for Senior Dev', highlight: true, actions: [
            { label: 'Reopen Search', style: 'primary', icon: 'user-plus' },
            { label: 'View Details', style: 'secondary', icon: 'eye' },
          ] },
        ],
      },
      {
        type: 'documents',
        title: 'Draft replies ready for review',
        items: [
          { icon: 'email', text: 'Reply to Atlas Industries — contract renewal confirmation', tag: 'Draft', tagColor: 'yellow', actions: [
            { label: 'Review & Send', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
          { icon: 'email', text: 'Reply to CloudHost — requesting invoice clarification', tag: 'Draft', tagColor: 'yellow', actions: [
            { label: 'Review & Send', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
          { icon: 'email', text: 'Reply to Gett — meeting confirmation for Thursday', tag: 'Draft', tagColor: 'yellow', actions: [
            { label: 'Review & Send', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
          { icon: 'email', text: 'Reply to Wix Studios — project scope questions', tag: 'Draft', tagColor: 'yellow', actions: [
            { label: 'Review & Send', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-010',
    agentId: 'status-reports',
    agentName: 'Status Reports',
    department: 'Operations',
    startedAt: '2026-03-21T18:00:00Z',
    completedAt: '2026-03-21T18:03:45Z',
    status: 'success',
    summary: 'Daily status report compiled and sent to stakeholders',
    details: [
      'Collected data from Sales, HR, Finance, Marketing',
      'Compiled daily KPIs and highlights',
      'Generated summary with action items',
      'Sent report to michal@msapps.co.il',
    ],
    outputCount: 1,
  },
  {
    id: 'log-004',
    agentId: 'recruiter',
    agentName: 'Recruiting Pipeline',
    department: 'HR',
    startedAt: '2026-03-17T10:00:00Z',
    completedAt: '2026-03-17T10:34:50Z',
    status: 'success',
    summary: 'Weekly recruiting cycle — reviewed 23 applications, scheduled 3 interviews',
    details: [
      'Boosted job postings on AllJobs and Goozali',
      'Screened 23 new applications for Senior Developer role',
      'Shortlisted 5 candidates based on criteria match',
      'Sent rejection emails to 18 non-matching candidates',
      'Scheduled 3 first-round interviews',
      'Updated recruiting spreadsheet with all statuses',
    ],
    outputCount: 23,
    output: [
      {
        type: 'summary',
        title: 'Recruiting update',
        items: [
          { icon: 'check', text: 'Job postings boosted on AllJobs and Goozali' },
          { icon: 'user', text: '23 applications reviewed for Senior Developer role' },
          { icon: 'email', text: '18 rejection emails sent to non-matching candidates' },
        ],
      },
      {
        type: 'contacts',
        title: 'Top candidates shortlisted',
        items: [
          { icon: 'user', text: 'Daniel Levy', subtitle: '8 yrs React/Node · ex-Wix · Interview: Tuesday 10:00', actions: [
            { label: 'View CV', style: 'primary', icon: 'eye' },
            { label: 'Reschedule', style: 'secondary', icon: 'calendar' },
          ] },
          { icon: 'user', text: 'Maya Cohen', subtitle: '6 yrs fullstack · ex-Monday.com · Interview: Tuesday 14:00', actions: [
            { label: 'View CV', style: 'primary', icon: 'eye' },
            { label: 'Reschedule', style: 'secondary', icon: 'calendar' },
          ] },
          { icon: 'user', text: 'Amit Reshef', subtitle: '5 yrs backend · ex-Fiverr · Interview: Wednesday 11:00', actions: [
            { label: 'View CV', style: 'primary', icon: 'eye' },
            { label: 'Reschedule', style: 'secondary', icon: 'calendar' },
          ] },
          { icon: 'user', text: 'Noa Berkovic', subtitle: '7 yrs mobile · ex-Gett · Pending schedule', actions: [
            { label: 'View CV', style: 'primary', icon: 'eye' },
            { label: 'Schedule Interview', style: 'success', icon: 'calendar' },
          ] },
          { icon: 'user', text: 'Yoni Katz', subtitle: '4 yrs React Native · ex-Lightricks · Pending schedule', actions: [
            { label: 'View CV', style: 'primary', icon: 'eye' },
            { label: 'Schedule Interview', style: 'success', icon: 'calendar' },
          ] },
        ],
      },
      {
        type: 'attention',
        title: 'Needs your attention',
        items: [
          { icon: 'calendar', text: '3 interviews scheduled this week — review candidate profiles before meetings.', highlight: true, actions: [
            { label: 'View All Profiles', style: 'primary', icon: 'eye' },
            { label: 'Add to Calendar', style: 'secondary', icon: 'calendar' },
          ] },
          { icon: 'alert', text: '2 shortlisted candidates still need interview slots.', highlight: true, actions: [
            { label: 'Schedule Now', style: 'primary', icon: 'calendar' },
            { label: 'Dismiss', style: 'secondary', icon: 'x' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-005',
    agentId: 'receipts',
    agentName: 'Receipt Matching',
    department: 'Finance',
    startedAt: '2026-03-16T07:00:00Z',
    completedAt: '2026-03-16T07:22:10Z',
    status: 'partial',
    summary: 'Matched 41 of 45 transactions — 4 receipts missing, flagged for review',
    details: [
      'Pulled 45 unmatched transactions from iCount',
      'Searched Zoho Mail for corresponding invoices',
      'Successfully matched 41 transactions',
      'Uploaded 41 receipts to iCount',
      'Flagged 4 missing receipts in Google Doc',
      'Sent summary to michal@msapps.co.il for manual review',
    ],
    outputCount: 41,
    output: [
      {
        type: 'summary',
        title: 'Matching results',
        items: [
          { icon: 'check', text: '41 out of 45 transactions matched and uploaded to iCount' },
          { icon: 'check', text: 'Match rate: 91%' },
          { icon: 'email', text: 'Summary sent to your email' },
        ],
      },
      {
        type: 'attention',
        title: 'Missing receipts — 4 transactions unmatched',
        items: [
          { icon: 'money', text: 'Amazon AWS — ₪847, charged March 5. No receipt found in email.', highlight: true, tag: '₪847', tagColor: 'red', actions: [
            { label: 'Upload Receipt', style: 'primary', icon: 'download' },
            { label: 'Search Again', style: 'secondary', icon: 'eye' },
            { label: 'Mark Resolved', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'money', text: 'Google Workspace — ₪320, charged March 8.', highlight: true, tag: '₪320', tagColor: 'red', actions: [
            { label: 'Upload Receipt', style: 'primary', icon: 'download' },
            { label: 'Mark Resolved', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'money', text: 'WeWork — ₪4,200, charged March 10. May be paper mail.', highlight: true, tag: '₪4,200', tagColor: 'red', actions: [
            { label: 'Upload Receipt', style: 'primary', icon: 'download' },
            { label: 'Mark Resolved', style: 'secondary', icon: 'x' },
          ] },
          { icon: 'money', text: 'Cafe Landwer — ₪186, charged March 12.', highlight: true, tag: '₪186', tagColor: 'red', actions: [
            { label: 'Upload Receipt', style: 'primary', icon: 'download' },
            { label: 'Mark Resolved', style: 'secondary', icon: 'x' },
          ] },
        ],
      },
      {
        type: 'documents',
        title: 'Documents updated',
        items: [
          { icon: 'spreadsheet', text: 'Missing receipts list — updated in Google Docs', tag: 'DOC', tagColor: 'blue', actions: [
            { label: 'Open', style: 'primary', icon: 'open' },
          ] },
          { icon: 'file', text: 'iCount — 41 receipts uploaded and matched', actions: [
            { label: 'View in iCount', style: 'primary', icon: 'open' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-006',
    agentId: 'invoicing',
    agentName: 'Client Invoicing',
    department: 'Finance',
    startedAt: '2026-02-28T09:00:00Z',
    completedAt: '2026-02-28T09:18:33Z',
    status: 'success',
    summary: 'Generated 12 invoices totaling ₪148,200 for February',
    details: [
      'Pulled timesheet data from Monday.com for all active clients',
      'Calculated billable hours per client and project',
      'Generated 12 PDF invoices with correct rates',
      'Created summary report with breakdown by client',
      'Sent invoices via email to client contacts',
      'Updated accounting records in iCount',
    ],
    outputCount: 12,
    output: [
      {
        type: 'summary',
        title: 'Invoice run complete',
        items: [
          { icon: 'check', text: '12 invoices generated for February 2026', tag: '₪148,200', tagColor: 'green' },
          { icon: 'email', text: 'All invoices sent to client contacts via email' },
          { icon: 'check', text: 'Accounting records updated in iCount' },
        ],
      },
      {
        type: 'documents',
        title: 'Invoices generated',
        items: [
          { icon: 'file', text: 'Invoice #2026-024 — Atlas Industries', subtitle: '142 hours · ₪28,400', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Resend', style: 'secondary', icon: 'send' },
          ] },
          { icon: 'file', text: 'Invoice #2026-025 — Gett', subtitle: '96 hours · ₪19,200', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Resend', style: 'secondary', icon: 'send' },
          ] },
          { icon: 'file', text: 'Invoice #2026-026 — Wix Studios', subtitle: '180 hours · ₪36,000', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Resend', style: 'secondary', icon: 'send' },
          ] },
          { icon: 'file', text: '+ 9 more invoices', subtitle: 'Total: ₪64,600', actions: [
            { label: 'View All', style: 'primary', icon: 'eye' },
            { label: 'Download All', style: 'secondary', icon: 'download' },
          ] },
        ],
      },
      {
        type: 'documents',
        title: 'Reports',
        items: [
          { icon: 'spreadsheet', text: 'Monthly Billing Summary — February 2026', subtitle: 'Breakdown by client, project, and hours', tag: 'XLSX', tagColor: 'green', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Download', style: 'secondary', icon: 'download' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
          { icon: 'file', text: 'Hours Report — all timesheets for February', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Download', style: 'secondary', icon: 'download' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-011',
    agentId: 'proposal-generator',
    agentName: 'Proposal Generator',
    department: 'Sales',
    startedAt: '2026-03-20T14:30:00Z',
    completedAt: '2026-03-20T14:42:18Z',
    status: 'success',
    summary: 'Generated proposal for NovaTech Solutions — ₪52K project scope',
    details: [
      'Loaded client profile and project requirements',
      'Selected template: Enterprise Mobile App',
      'Calculated pricing based on scope and historical data',
      'Generated 8-page proposal PDF with timeline',
      'Uploaded to Google Drive (Sales folder)',
      'Sent draft for review to michal@msapps.co.il',
    ],
    outputCount: 1,
    output: [
      {
        type: 'summary',
        title: 'Proposal generated',
        items: [
          { icon: 'check', text: 'Client: NovaTech Solutions (via contact: Dan Cohen)' },
          { icon: 'money', text: 'Project scope: ₪52,000 — Enterprise Mobile App', tag: '₪52K', tagColor: 'green' },
          { icon: 'check', text: 'Template: Enterprise Mobile App · 8 pages · Timeline included' },
        ],
      },
      {
        type: 'documents',
        title: 'Generated documents',
        items: [
          { icon: 'file', text: 'Proposal — NovaTech Solutions Enterprise Mobile App', subtitle: '8 pages · Generated from Enterprise template', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
            { label: 'Download', style: 'secondary', icon: 'download' },
            { label: 'Send to Client', style: 'success', icon: 'send' },
          ] },
          { icon: 'spreadsheet', text: 'Pricing Breakdown — detailed line items', subtitle: 'Development, design, QA, project management', tag: 'XLSX', tagColor: 'green', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
            { label: 'Edit', style: 'secondary', icon: 'edit' },
          ] },
          { icon: 'file', text: 'Project Timeline — 16 week delivery plan', tag: 'PDF', tagColor: 'blue', actions: [
            { label: 'View', style: 'primary', icon: 'eye' },
          ] },
        ],
      },
      {
        type: 'attention',
        title: 'Before sending',
        items: [
          { icon: 'alert', text: 'Review pricing on page 4 — rates updated from last quarter.', highlight: true, actions: [
            { label: 'Review Now', style: 'primary', icon: 'eye' },
            { label: 'Approve & Send', style: 'success', icon: 'send' },
          ] },
          { icon: 'alert', text: 'Proposal saved to Google Drive (Sales folder) — not yet sent to client.', highlight: true, actions: [
            { label: 'Open in Drive', style: 'primary', icon: 'open' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'log-012',
    agentId: 'calendar-manager',
    agentName: 'Calendar Manager',
    department: 'Operations',
    startedAt: '2026-03-21T07:00:00Z',
    completedAt: '2026-03-21T07:05:20Z',
    status: 'success',
    summary: 'Morning calendar review — 2 conflicts resolved, 8 reminders sent',
    details: [
      'Scanned today\'s calendar: 6 meetings scheduled',
      'Detected 2 overlapping meetings (10:00-11:00)',
      'Resolved conflicts by rescheduling 1 internal sync',
      'Sent 8 meeting reminders with prep notes',
      'Updated shared team calendar',
    ],
    outputCount: 8,
  },
  {
    id: 'log-007',
    agentId: 'lead-pipeline',
    agentName: 'Lead Pipeline',
    department: 'Sales',
    startedAt: '2026-03-20T08:00:00Z',
    completedAt: '2026-03-20T08:11:20Z',
    status: 'success',
    summary: 'Daily pipeline scan — 2 leads moved to proposal stage',
    details: [
      'Scanned 45 active leads',
      'Identified 2 leads ready for proposals',
      'Updated CRM with latest interaction notes',
      'Sent daily briefing to team',
    ],
    outputCount: 2,
  },
  {
    id: 'log-008',
    agentId: 'linkedin-outreach',
    agentName: 'LinkedIn Outreach',
    department: 'Sales',
    startedAt: '2026-03-20T09:30:00Z',
    completedAt: '2026-03-20T09:44:18Z',
    status: 'success',
    summary: 'Sent 12 messages to Fintech founders segment',
    details: [
      'Loaded segment: Fintech Founders (Tel Aviv)',
      'Generated 12 personalized messages',
      'Sent all via LinkedIn',
      'Updated Notion tracking',
    ],
    outputCount: 12,
  },
];

export const departmentMetrics: DepartmentMetrics[] = [
  {
    department: 'Sales',
    icon: 'trending-up',
    kpis: [
      { label: 'Pipeline Value', value: '₪2.4M', trend: 14, sparkline: [180, 195, 210, 220, 235, 260, 280] },
      { label: 'Leads This Month', value: 142, unit: 'leads', trend: 8, sparkline: [98, 105, 112, 118, 125, 134, 142] },
      { label: 'Outreach Sent', value: 312, unit: 'messages', trend: 12, sparkline: [220, 240, 255, 270, 285, 298, 312] },
      { label: 'Meetings Booked', value: 23, unit: 'meetings', trend: 15, sparkline: [12, 14, 16, 17, 19, 21, 23] },
    ],
  },
  {
    department: 'HR',
    icon: 'users',
    kpis: [
      { label: 'Open Positions', value: 3, trend: 0, sparkline: [4, 4, 3, 3, 3, 3, 3] },
      { label: 'Applications This Month', value: 86, unit: 'apps', trend: 22, sparkline: [45, 52, 58, 65, 72, 79, 86] },
      { label: 'Interview Rate', value: '8.1%', trend: 5, sparkline: [6, 6.2, 6.8, 7.1, 7.5, 7.8, 8.1] },
      { label: 'Time to Fill', value: '18 days', trend: -10, sparkline: [24, 23, 22, 21, 20, 19, 18] },
    ],
  },
  {
    department: 'Finance',
    icon: 'wallet',
    kpis: [
      { label: 'Monthly Revenue', value: '₪148K', trend: 6, sparkline: [120, 125, 130, 135, 138, 142, 148] },
      { label: 'Receipt Match Rate', value: '91%', trend: 3, sparkline: [82, 84, 86, 87, 89, 90, 91] },
      { label: 'Invoices Processed', value: 12, unit: 'invoices', trend: 0, sparkline: [11, 12, 11, 12, 12, 12, 12] },
      { label: 'Processing Time', value: '4 min', trend: -20, sparkline: [8, 7, 6.5, 6, 5.5, 4.5, 4] },
    ],
  },
  {
    department: 'Marketing',
    icon: 'megaphone',
    kpis: [
      { label: 'Posts Published', value: 142, unit: 'posts', trend: 5, sparkline: [110, 115, 120, 125, 130, 136, 142] },
      { label: 'Total Reach', value: '28K', trend: 18, sparkline: [15, 17, 19, 21, 23, 25, 28] },
      { label: 'Engagement Rate', value: '4.2%', trend: 11, sparkline: [3.0, 3.2, 3.5, 3.7, 3.9, 4.0, 4.2] },
      { label: 'Followers Gained', value: 340, unit: 'followers', trend: 24, sparkline: [180, 200, 230, 260, 285, 310, 340] },
    ],
  },
  {
    department: 'Operations',
    icon: 'settings',
    kpis: [
      { label: 'Emails Processed', value: 238, unit: 'emails', trend: 10, sparkline: [170, 185, 195, 205, 215, 225, 238] },
      { label: 'Reports Generated', value: 64, unit: 'reports', trend: 0, sparkline: [60, 61, 62, 62, 63, 63, 64] },
      { label: 'Calendar Conflicts', value: 5, unit: 'resolved', trend: -20, sparkline: [12, 10, 9, 8, 7, 6, 5] },
      { label: 'Avg Response Time', value: '12 min', trend: -25, sparkline: [28, 24, 20, 18, 16, 14, 12] },
    ],
  },
];
