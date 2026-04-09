# App Structure And Flow

This document explains the current React app structure and the navigation logic between pages.

It is intended to be the single place to update when page meaning, button behavior, or jump logic changes.

## 1. What `main.tsx` Does

File: [src/main.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/main.tsx)

`main.tsx` is the app entry file.

Its job is only to:

- load React
- load the root `App` component
- load the global stylesheet
- render the app into the HTML root node

In simple terms:

- `main.tsx` starts the app
- `App.tsx` decides which page to show

`main.tsx` does not contain product logic or page jump rules.

## 2. What `App.tsx` Does

File: [src/App.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/App.tsx)

`App.tsx` is the page switch controller for the whole demo.

Right now this project does not use React Router. Instead, `App.tsx` uses local React state to decide which page component to render.

Current app-level state:

- `screen`
  - decides the current page
  - possible values:
    - `home`
    - `moment-day`
    - `moment-week`
    - `plan`
    - `wilo`
- `analysisOpen`
  - controls whether the analysis bottom sheet is open on the `moment-week` screen
- `returnScreen`
  - remembers which page opened `Wilo`
  - when the user exits `Wilo`, the app returns to that remembered page

So:

- `main.tsx` mounts the app
- `App.tsx` is the traffic controller
- each file in `src/pages/` is one screen implementation

## 3. Current Pages

### Home Page

File: [src/pages/HomePage.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/pages/HomePage.tsx)

Purpose:

- first screen of the demo
- shows the `活力在线` hero
- shows `我的目标`
- shows `智能计划`
- shows the floating `Agent 正在分析` bar
- provides entry points into `Moments` and `Wilo`

This page should illustrate:

- current daily vitality summary
- top-level goal
- smart plan overview
- agent analysis entry

### Moments Page

File: [src/pages/MomentPage.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/pages/MomentPage.tsx)

Purpose:

- shows the emotion / moments analysis surface
- supports both day mode and week mode inside the same page component
- can show the Wilo analysis sheet

This page has two display modes:

- `day`
  - daily emotion summary
  - emotion bubbles over the day timeline
- `week`
  - weekly summary
  - weekly bars
  - optional analysis sheet

This page should illustrate:

- emotion status by day or week
- Wilo suggestion entry
- transition into plan confirmation

### Plan Page

File: [src/pages/PlanPage.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/pages/PlanPage.tsx)

Purpose:

- shows the confirmed or suggested plan after analysis
- presents a calendar strip and timeline cards
- acts as the next step after analysis confirmation

This page should illustrate:

- plan output
- recommended or active tasks
- plan detail state after Wilo suggestion is confirmed

### Wilo Page

File: [src/pages/WiloPage.tsx](/Users/luyoudao12/Desktop/figmaTodemo/src/pages/WiloPage.tsx)

Purpose:

- standalone Wilo session screen
- short immersive focus / adjustment experience
- temporary screen that returns to the page that opened it

This page should illustrate:

- a focused Wilo state
- timed intervention experience

## 4. Current Navigation Logic

This section describes the current behavior only.

If future logic changes, update this section first.

### App Start

Initial screen:

- app starts on `home`

### From Home Page

When user clicks the top hero area:

- jump to `moment-day`

When user clicks bottom nav `Moments`:

- jump to `moment-day`

When user clicks `Agent 正在分析`:

- jump to `moment-week`
- open the analysis sheet

When user clicks `Wilo 一下` entry from home:

- jump to `wilo`
- store `home` as the return page

### From Moments Page In Day Mode

When user clicks `周`:

- jump to `moment-week`

When user clicks `日`:

- stay on `moment-day`

When user clicks `Wilo 建议`:

- jump to `moment-week`
- open the analysis sheet

When user clicks bottom nav `Daily`:

- jump to `home`

When user clicks floating `Wilo 一下`:

- jump to `wilo`
- store `moment-day` as the return page

### From Moments Page In Week Mode

When user clicks `日`:

- close analysis sheet if open
- jump to `moment-day`

When user clicks `周`:

- stay on `moment-week`

When user clicks `Wilo 建议`:

- open the analysis sheet

When user closes the analysis sheet:

- stay on `moment-week`
- set `analysisOpen = false`

When user clicks `确认计划` inside the analysis sheet:

- close analysis sheet
- jump to `plan`

When user clicks bottom nav `Daily`:

- close analysis sheet if open
- jump to `home`

When user clicks floating `Wilo 一下`:

- jump to `wilo`
- store `moment-week` as the return page

### From Plan Page

When user clicks back:

- jump to `moment-week`

When user clicks floating `Wilo 一下`:

- jump to `wilo`
- store `plan` as the return page

### From Wilo Page

When user clicks top back button:

- return to the stored `returnScreen`

When user clicks `结束`:

- return to the stored `returnScreen`

## 5. Why `MomentPage.tsx` Is One File For Two Pages

Even though you may think of `日` and `周` as two pages, the current code treats them as two modes of the same screen.

That is why `MomentPage.tsx` has a prop:

- `mode: 'day' | 'week'`

This is useful because:

- both modes share the same general page shell
- both belong to the same product surface
- switching between them is lightweight

If later the day and week designs become much more different, they can be split into separate files.

## 6. Recommended Future Documentation Pattern

When you later define more button logic, update this doc using this format:

### Page Name

- Purpose:
- Main sections:
- Entry points:
- Exit points:

### Button Or Trigger

- Location:
- Visible label:
- Condition:
- Result:
- Notes:

Example:

- Location: Home page, floating analysis bar
- Visible label: `Agent 正在分析`
- Condition: always visible on home
- Result: open `moment-week` and set analysis sheet open
- Notes: if future backend exists, this may depend on live analysis state

## 7. Short Mental Model

If you want the simplest way to think about the app:

- `main.tsx` starts the app
- `App.tsx` decides which page is visible
- `HomePage.tsx` is the landing screen
- `MomentPage.tsx` is the emotion analysis surface
- `PlanPage.tsx` is the plan result screen
- `WiloPage.tsx` is the focused intervention screen
