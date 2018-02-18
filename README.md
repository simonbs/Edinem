# Edinem

Editor for Charles session files built on Electron using React.

![](https://github.com/simonbs/Edinem/blob/master/icon.png)

## Features

- Edit existing requests and responses
- Add and remove requests

## Building

Build the app by running `npm run build`

Create an application directory by running `npm run pack`. This will create an application that you can move to your /Applications folder and run.

In order to create a DMG suitable for distribution, run `npm run dist`.

## Development

When developing the app, you will want to run `npm run watch` to watch for changes to the files. Then run `npm run app` to open the app in Electron. Note that when making changes to the files, the app will be rebuilt if you have run `npm run watch` but there is not hot reloading, so you will need to refresh the app yourself.

## Motivation

[Charles](https://www.charlesproxy.com) is a web debugging proxy enabling developers to inspect and manipulate network requests and responses. My many uses of Charles include utilizing exported Charles recordings of network traffic for mocking APIs in clients. 
From time to time it is necessary to modify the exported recordings, either because the APIs have changed or because I want to mockup different functionality. This is cumbersome since Charles do not provide functionality for editing sessions. That's why I developed Edinem.

Charles sessions are exported to XML in a format described in the DTD:
[http://www.charlesproxy.com/dtd/charles-session-1_0.dtd](http://www.charlesproxy.com/dtd/charles-session-1_0.dtd)

