# Edinem

Editor for Charles session files built on Electron using React.

## Features

- Edit existing requests and responses
- Add and remove requests

## Motivation

[Charles](https://www.charlesproxy.com) is a web debugging proxy enabling developers to inspect and manipulate network requests and responses. My many uses of Charles include utilizing exported Charles recordings of network traffic for mocking APIs in clients. 
From time to time it is necessary to modify the exported recordings, either because the APIs have changed or because I want to mockup different functionality. This is cumbersome since Charles do not provide functionality for editing sessions. That's why I developed Edinem.

Charles sessions are exported to XML in a format described in the DTD:
[http://www.charlesproxy.com/dtd/charles-session-1_0.dtd](http://www.charlesproxy.com/dtd/charles-session-1_0.dtd)

