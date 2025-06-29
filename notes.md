Below is a **“next-steps backlog”**—small, incremental tasks that will make the app feel more polished and add useful functionality.
✱ Each item is purposely bite-sized (1 file ≈ 1 commit).
✱ Nothing is executed yet—pick **one** item, say **“ready”**, and I’ll walk you through the exact code changes.

| 🔢            | Area          | Task (single clear outcome)                                                                                      | Why it helps                                               |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **UI-01**     | Theme         | Expose **“Follow system theme”** toggle (default on) and wire it to `prefers-color-scheme`                       | Users don’t need to open Settings to match OS dark/light   |
| **UI-02**     | Topbar        | Add a hamburger + **side drawer** (Angular *MatDrawer*) for navigation instead of the overflow menu              | Faster navigation, frees the action bar for future actions |
| **UI-03**     | Cards         | Give **category/exercise cards elevation & ripple** using simple CSS variables (works in both themes)            | Modern Material feel; clearer tap feedback                 |
| **UI-04**     | Forms         | Move the “Add Set / Save Workout” buttons into a sticky footer on small screens                                  | Prevents scrolling all the way down on long forms          |
| **UI-05**     | Icons         | Replace emoji bullets in **Settings** with `ionicons` (already bundled with Capacitor)                           | Consistent icon set; emoji vary across devices             |
| **UI-06**     | Home          | Add a **floating action button (FAB)** that jumps straight to the last exercise you logged                       | One-tap resume of your usual workout                       |
| **DATA-07**   | History       | Add a **search bar & date-range filter** to `HistoryComponent` (pure front-end filter, no DB change)             | Quickly find past sessions                                 |
| **DATA-08**   | History       | Implement **CSV export** (`Export history ➜ CSV` in overflow) using vanilla JS CSV build                         | Easy backup / share                                        |
| **DATA-09**   | DB            | Add a column `notes TEXT` to `workouts` + textarea in form                                                       | Users can jot cues (e.g., “felt easy”)                     |
| **DATA-10**   | Charts        | Create a simple **line chart** (Chart.js) of weight vs date for one exercise (`/history/:exercise/chart`)        | Visual progress motivates                                  |
| **PERF-11**   | Service       | Turn `WorkoutDatabaseService` into a **singleton `@Injectable({ providedIn: 'root' })` with `OnPush` observers** | Reactive UI, no manual refresh after insert/delete         |
| **PERF-12**   | Images        | **Lazy-load** muscle images with `loading="lazy"` + `width/height` attrs                                         | Saves memory on long lists                                 |
| **NATIVE-13** | Notifications | Add **local workout-reminder notification** (`@capacitor/local-notifications`) at user-defined time              | Keeps users consistent                                     |
| **NATIVE-14** | Share         | Implement **Android share-sheet** for a single workout (JSON text)                                               | One-tap send to friend/coach                               |
| **QA-15**     | Onboarding    | First-run **intro slides** (Ionic Slides or custom) with permission requests                                     | Explains purpose & theme switch                            |

---

### How to proceed

1. **Choose exactly one task** you want to tackle first.
2. Reply **“ready” plus the task code (e.g., UI-03)**.
3. I’ll give you the precise file path(s), code snippets, and testing tip—one micro-step at a time.

When that task is finished, we’ll move on to the next.
Pick whichever excites you most!
