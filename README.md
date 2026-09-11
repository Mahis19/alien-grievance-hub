# Galactic Grievance Gateway

Build a fully functional, polished, responsive web application called:

"ALIEN COMPLAINT PORTAL 👽"

Tagline:

"Because even aliens have problems."

This is a college hackathon project for a "Useless Project" competition. The concept is a government-style complaint portal for aliens living on Earth. It should look extremely serious and professional, but the complaints and features should be absurd and funny.

IMPORTANT:

The website must actually work, not just be a static landing page.

TECH STACK:

- React

- TypeScript

- Tailwind CSS

- Modern component-based architecture

- Use localStorage for persistence if no backend is available

- Make the application easy to connect to a backend later

- Responsive on desktop, tablet, and mobile

DESIGN THEME:

Use a futuristic alien / government portal aesthetic.

Primary colors:

- Neon/Lime Green: #7CFF00

- White: #FFFFFF

- Deep Purple: #3B1466

Supporting colors:

- Almost black background: #080A0C

- Dark purple panels

- Slight neon green glow

- Gray text for secondary information

The UI should feel like:

"NASA + Area 51 + Indian government complaint website + alien technology"

Do NOT make it look like a generic SaaS dashboard.

Use:

- glowing green borders

- subtle gradients

- futuristic cards

- glassmorphism where appropriate

- alien symbols

- small animated particles/stars

- subtle scanline effects

- UFO/planet illustrations

- rounded cards but not excessively rounded

- futuristic typography

Avoid overusing animations. Keep it professional but funny.

==================================================

1. LANDING PAGE

==================================================

Create a dramatic landing page.

Hero section:

Large heading:

"ALIEN COMPLAINT PORTAL"

Subheading:

"Because even extraterrestrials deserve customer support."

Add a funny status badge:

🟢 EARTH OPERATIONS: ACTIVE

Hero visual:

Create an illustration or CSS-based visual of a green alien sitting at a computer, looking frustrated.

Add two major buttons:

[ FILE A COMPLAINT ]

[ VIEW GALACTIC COMPLAINTS ]

Add a small disclaimer:

"Officially recognized by absolutely nobody."

Add a scrolling/floating message:

"TRANSMISSION RECEIVED FROM PLANET ZORP..."

==================================================

2. COMPLAINT FORM

==================================================

Create a dedicated complaint submission page/modal.

Heading:

"SUBMIT YOUR COMPLAINT"

Description:

"Tell us what went wrong on Earth. Our highly trained intergalactic support team will probably ignore it."

Fields:

Alien Name

- text input

- placeholder: "Zorp McZorp"

Planet

- dropdown

- options:

  - Mars

  - Venus

  - Planet Zorp

  - Kepler-452b

  - Unknown Dimension

  - Earth (unfortunately)

Alien ID

- text input

- placeholder: "ALN-0000-X"

Complaint Category

Dropdown options:

- Humans

- Food

- Traffic

- Weather

- WiFi

- Government

- Earth Animals

- Dating Humans

- Gravity

- Other

Complaint Title

- text input

Complaint Description

- large textarea

How serious is this?

Create a slider from:

"Not Important"

to

"THE GALAXY IS DOOMED"

Location on Earth

- text input

- placeholder: "Behind a suspicious bush"

Upload Evidence

- optional file input

- accept images

- show preview if image is selected

Add checkbox:

☑ I confirm that I am an extraterrestrial entity and this complaint is unnecessarily important.

Submit button:

"TRANSMIT COMPLAINT 🚀"

After submission:

Show a dramatic success animation.

Message:

"COMPLAINT SUCCESSFULLY TRANSMITTED."

Generate a unique complaint ID such as:

ALN-2026-48291

Then show:

"Estimated resolution time:

3–500 business years."

Also provide:

[ TRACK COMPLAINT ]

Store submitted complaints in localStorage so they remain after refreshing the page.

==================================================

3. COMPLAINT DASHBOARD

==================================================

Create a page called:

"GALACTIC COMPLAINTS"

Display complaints in attractive cards.

Each card should show:

- Complaint ID

- Alien name

- Planet

- Category

- Complaint title

- Short description

- Date

- Status

- Priority

Statuses:

🟡 RECEIVED

🔵 UNDER INVESTIGATION

🟣 FORWARDED TO GALACTIC COUNCIL

🔴 HUMAN ERROR

🟢 SOMEHOW RESOLVED

Use randomly generated statuses for demo complaints.

Create filters:

- All

- Received

- Investigating

- Resolved

- Human Error

Category filter.

Search box:

"Search complaints across the universe..."

==================================================

4. PRELOADED FUNNY COMPLAINTS

==================================================

Include several demo complaints so the website never looks empty.

Example complaints:

1.

Alien: Zorp

Planet: Planet Zorp

Category: WiFi

Title:

"Earth WiFi is slower than intergalactic travel."

Description:

"I travelled 4.7 million light years but your WiFi still takes 3 minutes to load a video."

Status:

UNDER INVESTIGATION

Priority:

HIGH

2.

Alien: Blip Blorp

Planet: Mars

Category:

Food

Title:

"Humans have incorrectly classified tomatoes."

Description:

"I demand an investigation into whether tomatoes are fruits, vegetables, or government surveillance devices."

3.

Alien: Xel-900

Planet: Kepler-452b

Category:

Traffic

Title:

"Why does everyone drive on the same road?"

Description:

"There are 8 billion humans and apparently only one functional road."

4.

Alien: Gronk

Category:

Weather

Title:

"Earth weather makes no logical sense."

Description:

"Sunny at 2 PM. Rain at 2:03 PM. Extremely suspicious planet."

5.

Alien: Zorg

Category:

Humans

Title:

"Human keeps asking if I am from China."

Description:

"I am from 14 galaxies away."

6.

Alien: Plumbus-7

Category:

Gravity

Title:

"Gravity is unnecessarily strong."

Description:

"Please reduce gravity by 12%. My spaceship insurance does not cover this."

==================================================

5. COMPLAINT TRACKING

==================================================

Create a "Track Complaint" page.

Input:

"Enter Complaint ID"

Example:

ALN-2026-48291

When a valid ID is entered, display a timeline:

COMPLAINT SUBMITTED

        ↓

EARTH SUPPORT RECEIVED IT

        ↓

HUMAN DEPARTMENT NOTIFIED

        ↓

GALACTIC COUNCIL CONTACTED

        ↓

CURRENT STATUS

Make the timeline visually futuristic.

If the complaint doesn't exist:

"Complaint not found in this dimension."

==================================================

6. ALIEN STATISTICS DASHBOARD

==================================================

Create a statistics section.

Show cards:

TOTAL COMPLAINTS

1,337

ALIENS HELPED

42

COMPLAINTS ABOUT HUMANS

87%

GALACTIC SATISFACTION

2.3%

AVERAGE RESOLUTION TIME

∞ years

Make the numbers animated when the page loads.

Add a chart:

"Complaints by Category"

Categories:

- Humans

- WiFi

- Food

- Traffic

- Weather

- Gravity

Use a futuristic green/purple chart.

==================================================

7. "MOST USELESS COMPLAINT" FEATURE

==================================================

Create a fun section:

🏆 COMPLAINT OF THE DAY

Randomly select one complaint.

Example:

"An alien has complained that humans keep looking at the moon."

Score:

97% Useless

Button:

"GENERATE USELESS COMPLAINT"

When clicked, generate a random absurd complaint.

Possible generated complaints:

- "My UFO does not have cup holders."

- "Humans keep naming planets after Roman gods."

- "The moon is following me."

- "Earth squirrels are suspicious."

- "Why is pineapple allowed on pizza?"

- "The sun is too bright."

- "Gravity keeps pulling my spaceship down."

- "Humans have too many reality shows."

- "My tentacles don't fit standard gloves."

- "Earth has insufficient parking for UFOs."

==================================================

8. ALIEN EMERGENCY BUTTON

==================================================

Add a suspicious red/purple button somewhere:

🚨 EMERGENCY: CONTACT GALACTIC SUPPORT

When clicked, show a modal:

"Are you absolutely sure?"

Buttons:

[ YES ]

[ NO ]

If YES:

"Please remain calm.

Your emergency has been escalated to:

Department of Intergalactic Minor Inconveniences.

Estimated response time:

47 years."

==================================================

9. NAVIGATION BAR

==================================================

Create a futuristic navigation bar.

Logo:

👽 ACP

ALIEN COMPLAINT PORTAL

Navigation:

Home

File Complaint

Complaints

Track Complaint

Galactic Stats

Right side:

🟢 SYSTEM ONLINE

On mobile, use a hamburger menu.

==================================================

10. FOOTER

==================================================

Footer text:

ALIEN COMPLAINT PORTAL © 2026

"Serving extraterrestrials since absolutely never."

Links:

Privacy

Terms

Galactic Constitution

Report a Human

Add:

🌎 Earth Server: ONLINE

🛸 UFO Detection: ACTIVE

👽 Alien Support: QUESTIONABLE

==================================================

11. FUN INTERACTIONS

==================================================

Add small Easter eggs.

If the user clicks the alien logo 5 times:

Show:

"SECRET ALIEN MODE ACTIVATED 👽"

Then change the interface slightly and display:

"WE KNOW YOU ARE HUMAN."

If the user stays idle for 20 seconds:

Show a small notification:

"👽 Are you still there? Your complaint is probably still unresolved."

Add a fake system status indicator:

SYSTEM STATUS:

🟢 Alien Database

🟢 UFO Communication

🟡 Human Cooperation

🔴 Common Sense

==================================================

12. RESPONSIVENESS

==================================================

The website must work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

Do not allow horizontal scrolling.

Forms should be easy to use on mobile.

Cards should stack properly on smaller screens.

==================================================

13. DATA / FUNCTIONALITY

==================================================

The following must actually work:

- Submit complaint

- Generate complaint ID

- Save complaint to localStorage

- Display newly submitted complaint in dashboard

- Search complaints

- Filter complaints

- Track complaint by ID

- Generate random useless complaint

- Statistics update based on complaints

- Navigation between pages

- Responsive mobile menu

- Modal dialogs

- Form validation

- Image preview for evidence uploads

Use realistic demo data on first load.

Do not require authentication for the hackathon demo.

Make all buttons functional.

If backend functionality is not available, use localStorage and clean abstraction so a backend can easily be added later.

==================================================

14. VISUAL DETAILS

==================================================

Use neon green (#7CFF00) as the main accent.

Use deep purple (#3B1466) as the secondary accent.

White text on dark backgrounds.

Add subtle glowing effects:

box-shadow:

0 0 15px rgba(124,255,0,0.25)

Use futuristic borders and hover effects.

Buttons should have subtle glow on hover.

Cards should slightly lift on hover.

Use smooth page transitions.

Add subtle stars/particles in the background.

Don't make the entire screen glow green; use neon green as an accent.

==================================================

15. HUMOR STYLE

==================================================

The most important part:

The website should look like a SERIOUS GOVERNMENT SYSTEM.

The content should be COMPLETELY RIDICULOUS.

Do not make the UI childish.

Think:

"Alien government website designed by someone who took the job way too seriously."

Examples of serious-sounding nonsense:

"Your complaint has been escalated to Level 7 Intergalactic Authorities."

"Human Affairs Department has been notified."

"Your request is currently orbiting the appropriate department."

"Resolution delayed due to Mercury being in retrograde."

"Complaint forwarded to Planetary Grievance Management."

==================================================

16. FINAL REQUIREMENT

==================================================

After building the application, make sure there are no broken buttons, empty pages, console errors, or placeholder components.

The final application should feel like a complete hackathon-ready product.

The homepage should immediately communicate:

ALIENS ARE ANGRY.

EARTH HAS A COMPLAINT PORTAL.

NOBODY KNOWS WHY.

Make it funny enough that judges want to click around and discover features.

The final result should be polished enough to look like a real startup/government portal while being intentionally useless.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://alien-grievance-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1526aa00-0a68-4e3e-b916-5588608a0783).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
