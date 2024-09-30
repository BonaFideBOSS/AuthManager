# Auth Manager - The Amazing Auth Management Service

**Note:** Both backend and frontend are developed separately, but they can be merged and deployed together as a single application.

### How to run the Backend locally?

- Prerequisite: Python 3.10 or newer
- Run the following commands inside the backend folder

1. Setup virtual environment

```
py -m venv venv
```

```
venv\scripts\activate
```

2. Install requirements

```
pip install -r requirements
```

3. Run

```
uvicorn app:app
```

<hr />

### How to run the Frontend locally?

- Prerequisite: Node.js 18.16 or newer
- Run the following commands inside the frontend folder

1. Install dependencies

```
npm install
```

2. Run the app on dev mode

```
npm run dev
```

<hr />

### How to run app on production?

1. Build the frontend for production

```
npm run build
```

- You can preview the build by running `npm run preview` (Optional)

2. Copy and paste the build from `dist` to backend's `views` folder

3. Deploy the backend
