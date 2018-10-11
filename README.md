# react-tags-field

> Provide TagsField component, allow user input list of words

[![NPM](https://img.shields.io/npm/v/react-tags-field.svg)](https://www.npmjs.com/package/react-tags-field) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Screenshot
![Screenshot](https://i.imgur.com/0dcF5Sa.png)

## Install

```bash
npm install --save react-tags-field
```

## Usage

```jsx
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

```

## Run demo

```
npm run build
cd example
npm start
```

## License

MIT © [nclong87](https://github.com/nclong87)
