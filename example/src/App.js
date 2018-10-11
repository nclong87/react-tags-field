import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TagsField from 'react-tags-field';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '600px', margin: 'auto', marginTop: 100 }}>
            <TagsField
              themeColor="orange"
              caption="Give us some words"
              isMandatory
              validationMessage="Please input some words"
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
