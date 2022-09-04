import React, { createContext, useReducer } from "react";
// açık kalsın izliyorum :D sıkıntı yaşarsan yaz anlık bakarım buradan...
//reis be :D
const appReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    }
    case "ADD_POST": {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }
    case "ADD_ALL_POST": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "EDIT_POST": {
      const { id, title, description } = action.payload;
      const post = { ...state.posts.find(c => c.id === id), title, description };
      debugger
      return {
        ...state,
        posts: state.posts.map(c => {return (c.id !== id) ? c : post;})        
      };
      
    }
    case "SET_DARK_THEME": {
      return {
        ...state,
        darkTheme: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  posts: [],
  darkTheme: false,
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getPosts = async () => {
    const res = await fetch("http://localhost:8080/task/list");
    const jsonRes = await res.json();
    addAllPost(jsonRes);
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id) => {
    dispatch({
      type: "DELETE_POST",
      payload: id,
    });
  };

  const addPost = (post) => {
    const newId = state.posts ? state.posts.length + 1 : 1;
    const newDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; 
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '/' + mm + '/' + yyyy;
      return formattedToday.toString();
    }
    debugger
    post.id = newId;
    post.createDate = newDate();
    dispatch({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addAllPost = (posts) => {
    dispatch({
      type: "ADD_ALL_POST",
      payload: posts,
    });
  };

  const editPost = (post) => {
    dispatch({
      type: "EDIT_POST",
      payload: post,
    });
  };

  const setDarkTheme = (bool) => {
    dispatch({
      type: "SET_DARK_THEME",
      payload: bool,
    });
  };

  return (
    <AppContext.Provider
      value={{
        posts: state.posts,
        darkTheme: state.darkTheme,
        deletePost,
        addPost,
        editPost,
        addAllPost,
        setDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
