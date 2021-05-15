# A simple notes list

This is a simple notes list showcasing the clean architecture approach.
The demo can be experienced at the following link: [Click here](https://gorjan5sk.github.io/notes-list/)

## Short architecture overview

### Domain and storage

`src/domain` contains the core business logic. Since this is a simple component both business and application layers are contained there. The core has no outward dependencies apart from utilities and mobx. The storage providers are decoupled from the core with interfaces and provided upon instantiation in `src/index.tsx".

The selection is stored in `NotesList` since it's application-specific.

### User interactions and rendering

The presenter prepares and transforms data so it can be easily used by the view layer which in this case are React components but because of the decoupling and one-way dependency could be adapted for any library.

The controller encapsulates and coordinates user actions with the simplest possible API exposed to the view components.
