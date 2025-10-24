# Workout Dashboard

A comprehensive web application for creating and managing workout plans with muscle engagement analytics.

## Features

- **Exercise Library Management**
  - Pre-loaded with 25+ common exercises
  - Add/edit/delete custom exercises
  - Define muscle targets with impact weights (Low/Medium/High)
  - Filter and search exercises

- **Workout Plan Builder**
  - Create multiple workout plans
  - Add workouts to each plan
  - Assign exercises with sets and reps
  - Visual muscle engagement analytics

- **Muscle Analytics**
  - Real-time muscle engagement tracking
  - Visual bar charts showing muscle load
  - Simple totals for each muscle group
  - Exercise count per muscle

- **Data Persistence**
  - All data stored in browser localStorage
  - No backend required
  - Data persists across sessions

## Tech Stack

- **React** - UI framework
- **Redux Toolkit** - State management
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **LocalStorage** - Data persistence

## Installation & Setup

1. **Fix npm permissions** (if needed):
   ```bash
   npm cache clean --force
   ```

2. **Install dependencies**:
   ```bash
   cd workout-dashboard
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:5173`

## Usage Guide

### Creating a Workout Plan

1. Click "Create New Plan" on the dashboard
2. Enter plan name and description
3. Click "Create Plan"
4. Add workouts to your plan
5. Add exercises to each workout
6. Configure sets and reps for each exercise

### Managing Exercises

1. Navigate to "Exercise Library"
2. Click "Add Exercise" to create new exercises
3. Select muscle targets and impact weights
4. Edit or delete existing exercises

### Viewing Analytics

1. Open a workout plan
2. Click "Show Muscle Analytics"
3. View muscle engagement totals and charts

## Data Model

### Exercise Impact Weights
- **1 (Low)**: Light engagement, isolation
- **2 (Medium)**: Moderate engagement
- **3 (High)**: Primary target, heavy engagement

### Muscle Groups
- **Upper Body**: chest, back, shoulders, biceps, triceps, forearms
- **Core**: core, obliques
- **Lower Body**: quads, hamstrings, glutes, calves

## License

MIT
