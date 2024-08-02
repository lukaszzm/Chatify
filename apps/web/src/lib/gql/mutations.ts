import { graphql } from "@/gql";

export const REFRESH_TOKEN_MUTATION = graphql(`
  mutation RefreshToken($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`);

export const SIGN_IN_MUTATION = graphql(`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data) {
      accessToken
      refreshToken
    }
  }
`);

export const SIGN_UP_MUTATION = graphql(`
  mutation SignUp($data: SignUpInput!) {
    signUp(data: $data) {
      accessToken
      refreshToken
    }
  }
`);

export const START_CHAT_MUTATION = graphql(`
  mutation StartChat($data: StartChatInput!) {
    startChat(data: $data) {
      id
    }
  }
`);

export const CREATE_NOTE_MUTATION = graphql(`
  mutation CreateNote($data: CreateNoteInput!) {
    createNote(data: $data) {
      id
      title
      content
      updatedAt
      isLocked
    }
  }
`);

export const DELETE_NOTE_MUTATION = graphql(`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId) {
      id
    }
  }
`);

export const TOGGLE_LOCK_MUTATION = graphql(`
  mutation ToggleLock($noteId: String!) {
    toggleLock(noteId: $noteId) {
      id
      isLocked
      updatedAt
    }
  }
`);

export const UPDATE_NOTE_MUTATION = graphql(`
  mutation UpdateNote($noteId: String!, $content: String!) {
    updateNote(noteId: $noteId, content: $content) {
      id
      content
      updatedAt
    }
  }
`);

export const SEND_MESSAGE_MUTATION = graphql(`
  mutation SendMessage($data: SendMessageInput!) {
    sendMessage(data: $data) {
      id
    }
  }
`);

export const DELETE_ACCOUNT_MUTATION = graphql(`
  mutation DeleteAccount {
    deleteAccount {
      id
    }
  }
`);

export const UPDATE_PASSWORD_MUTATION = graphql(`
  mutation UpdatePassword($data: UpdatePasswordInput!) {
    updatePassword(data: $data) {
      id
    }
  }
`);

export const UPDATE_PROFILE_MUTATION = graphql(`
  mutation UpdateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`);
