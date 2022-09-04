import React, { useEffect, useState, useContext, useReducer } from "react";
import "./App.css";
import Appbar from "./components/Header";
import Create from "./components/Create";
import List from "./components/List";
import Footer from "./components/Footer";
import { AppProvider, AppContext } from "./context/AppState";
import "./App.css";
import "./App.dark.css";


function App() {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ posts, darkTheme, setDarkTheme, addPost, deletePost, editPost }) => (
          <>
            <main className={`${darkTheme ? "dark" : ""}`}>
              <Appbar />
              <Create addPost={addPost}/>
              <List postList={posts} />
              <Footer />
            </main>
          </>
        )}
      </AppContext.Consumer>
      
    </AppProvider>
  );
}

export default App;
