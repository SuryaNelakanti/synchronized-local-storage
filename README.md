# synchronized-local-storage

Local Storage Counters
This code implements multiple counters that are persisted in localStorage.

## Features
- 3 separate counters identified as "one", "two", and "three"
- Each counter value is persisted in localStorage
- Counters can be incremented, decremented, and reset
- Counters can be locked to prevent further changes
- Lock state is also persisted in localStorage
- Counter values update reactively across browser tabs using localStorage events


## Usage
- Click the buttons to increment, decrement, reset, and lock/unlock each counter
- Locking a counter will turn its text red and prevent further changes
- Changes made in one tab will reactive update counter values in other tabs



## Implementation
- localStorageHelpers provides getItem, setItem, removeItem utility functions
- counterClosure factory function creates closures for each counter
- Closures handle all counter logic and localStorage
- closuresObj holds the closures for easy access
- Event listeners call closure methods on button clicks
- onstorage listener refreshes counters when localStorage updated



## Concepts
- **Closures** - The `counterClosure` factory function creates a closure for each counter. This encapsulates the counter's private state and behaviors.
- **Event Handling** - Event listeners attach the counter behaviors to their respective buttons. This allows separating event logic from the counter implementation. 
- **Web Storage API** - localStorage persists the counter value and lock status. The `localStorageHelpers` module provides utility functions for interacting with localStorage.
- **Reactive Updates** - The `window.onstorage` listener refreshes counters when localStorage changes in other tabs. This enables reactive counter updates across tabs.
- **Factory Functions** - `counterClosure` is a factory method that produces reusable closures for each required counter instance.
- **Modular Pattern** - Code is organized into modules like `localStorageHelpers` and `closuresObj` for separation of concerns.
- **State Persistence** - Key state like `counterValue` persists across sessions via the closures and localStorage.
By leveraging these skills together, the counters implement encapsulated, persistent, and reactive state - important patterns for scalable web apps.
