import React, {useState} from 'react'
import {Header} from './components/layout/Header'
import {Content} from './components/layout/Content'
import {Main} from './components/Main'
import {Login} from './components/Authentication/Login'
import {Signup} from './components/Authentication/Signup'
import {ForgotPassword} from './components/Authentication/ForgotPassword'
import {ProjectsProvider, SelectedProjectProvider, AuthContextProvider, useAuth} from './context'
import { PrivateRoute } from './components/Authentication/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export const App =  ({ darkmodeDefault = false }) => {

  const [darkMode, setDarkMode] = useState(darkmodeDefault)

  return (
    
    
      <AuthContextProvider>
      <ProjectsProvider>
      <SelectedProjectProvider>
          <Router>
          <Switch>
            {/* <PrivateRoute exact path="/" >
                  <main 
                  data-testid="application"
                  className={ darkMode ? 'darkmode' : undefined}
                  >
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Content/>
                  </main>
            </PrivateRoute> */}
            <PrivateRoute exact path="/" component={Main}/>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword/>
            </Route>
          </Switch>
          </Router>
      </SelectedProjectProvider>
      </ProjectsProvider>
      </AuthContextProvider>
    
      
  )
}


