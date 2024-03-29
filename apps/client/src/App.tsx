import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./layout";

import { Chat } from "./pages/Chat";
import { ChatBox } from "./pages/Chat/ChatBox";

import { Home } from "./pages/Home";
import { Form } from "./pages/Home/Form";

import { NotFound } from "./pages/NotFound";

import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Settings/Profile";
import { Password } from "./pages/Settings/Password";
import { Appearance } from "./pages/Settings/Appearance";

import { Notes } from "./pages/Notes";
import { NoteBox } from "./pages/Notes/NoteBox";
import { useAuth } from "./hooks/useAuth";
import { FullScreenLoader } from "./components/UI";

export const App = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) return <FullScreenLoader />;

  return (
    <Routes>
      <Route path="/dashboard" element={data ? <Layout /> : <Navigate to="/" />}>
        <Route path="chat" element={<Chat />}>
          <Route path=":chatId" element={<ChatBox />} />
        </Route>
        <Route path="notes" element={<Notes />}>
          <Route path=":noteId" element={<NoteBox />} />
        </Route>
        <Route path="settings" element={<Settings />}>
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>
      </Route>
      <Route path="/" element={data ? <Navigate to="dashboard/chat" /> : <Home />}>
        <Route path="register" element={<Form />} />
        <Route path="" element={<Form isLogin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
