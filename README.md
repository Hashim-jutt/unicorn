## Unicorn Dashboard (Vue 3 + Vite + Tailwind)

This frontend is a **Unicorn Dashboard** built with **Vue 3**, **Vite**, and **Tailwind CSS**.  
It consumes the `crudcrud.com` REST API to perform full **CRUD** on unicorns and implements:

- Listing unicorns with **pagination** (5 per page).
- **Create / edit / delete** unicorns via forms.
- Derived **status** based on age:
  - 0–8 → Baby Unicorn
  - 9–25 → Mature Unicorn
  - 26+ → Old Unicorn
- **Sorting** by `name` and `age`.
- Loading and basic error states.

### Setup & Running Locally

```bash
cd frontend
npm install

# configure env
cp .env.example .env
# then edit .env and set:
# VITE_CRUDCRUD_BASE_URL=https://crudcrud.com/api/{unique_id}/unicorns

npm run dev
```

### Environment Variable (crudcrud)

- `VITE_CRUDCRUD_BASE_URL` – base URL of your crudcrud unicorn endpoint, for example:
  - `https://crudcrud.com/api/xxxxxxxxxxxxxxxxxxxxxx/unicorns`
- This acts as the **single global place** where the temporary crudcrud ID is stored; to update it, change only this value.

### Structure

- `src/main.js` – bootstraps Vue app, registers Pinia and Tailwind styles.
- `src/App.vue` – main layout shell aligned with the Unicorn Dashboard Figma (header + content).
- `src/components/UnicornDashboard.vue`
  - Unicorn list table with pagination and sorting controls.
  - Create / edit form with basic validation (name length, non-negative age).
  - Status chips (Baby/Mature/Old) based on age.
  - Loading and error handling around API calls.
- `src/services/unicornApi.js`
  - Thin Axios wrapper around crudcrud endpoints (`fetchUnicorns`, `createUnicorn`, `updateUnicorn`, `deleteUnicorn`).
- `src/utils/unicornStatus.js`
  - Maps an age to the appropriate unicorn status string.

### Notes & Design Decisions

- Tailwind is used for a clean, responsive layout; the table container becomes horizontally scrollable on small screens.
- API calls are kept minimal:
  - A single fetch on mount for the list.
  - After create, the new item is appended locally.
  - After update/delete, we either refresh or adjust the local array.
- Form and table UI follow the spirit of the Figma design; mobile layout is simplified but remains fully functional.

