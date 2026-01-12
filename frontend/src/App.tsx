// src/App.tsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext'; // Import your ThemeContext
import { ThemeContext } from './context/ThemeContext'; // Import the context
import { lightTheme, darkTheme } from './theme'; // Import themes
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import TasksTablePage from './pages/TasksTablePage';
import CreateTaskPage from './pages/CreateTaskPage';
import Layout from './components/Layout';
import EditTaskPage from './pages/EditTaskPage';
import TodaysTaskpage from './pages/TodaysTasksPage';
import ProfilePage from './pages/ProfilePage';
import CompletedTasks from './pages/CompletedTasks';
import SignUp from './pages/SignUp';
import SignupPage from './pages/SignUp';


function App() {
  // Use the ThemeContext to get the current theme
  const { themeMode } = useContext(ThemeContext);

  return (
    <ThemeProvider> {/* Wrap your whole app with ThemeProvider from context */}
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}> {/* Apply light/dark theme */}
        <CssBaseline /> {/* Apply global CSS reset */}
        <Router>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/taskstablepage" element={<TasksTablePage />} />
              <Route path="/createtaskpage" element={<CreateTaskPage />} />
              <Route path="/edittaskpage/:id" element={<EditTaskPage />} />
              <Route path="/todaystaskspage" element={<TodaysTaskpage />} />              
              <Route path="/profile" element={<ProfilePage />} />              
              <Route path="/completedtasks" element={<CompletedTasks />} />              
              <Route path="/signup" element={<SignupPage />} />              
            </Routes>
          </Layout>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
