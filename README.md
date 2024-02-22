# PsyCare Web
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PsyCare-org/psycare-web/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/PsyCare-org/psycare-web/blob/main/README.pt-br.md)

## About
Web application that provides the user interface for the PsyCare application. It consumes its respective back-end, the [PsyCare API](https://github.com/PsyCare-org/psycare-api). The main technologies used in the development were:
* [ReactJS](https://react.dev/)
* [MUI](https://mui.com/)
* [React Hook Form](https://react-hook-form.com/)
* [Socket.IO](https://socket.io/)

## Getting Started
### Prerequisites
You will need [NodeJS](https://nodejs.org/en/download/), and a package manager of your choice.

### Environment variables
In the root of the project, create a file called .env, with the following content, filling it with your values:
```
REACT_APP_API_URL=<PsyCare API url>
REACT_APP_WS_URL=<psycare websocket url>
REACT_APP_CALL_TOKEN=<VideoSDK API Token>
```

The `.env.example` file contains an example of what the environment variables file should look like.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/PsyCare-org/psycare-web
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Run it
   ```sh
   npm start
   ```

## Usage
The application is pretty self-explanatory, but the app needs to be used with its back-end, the [PsyCare API](https://github.com/PsyCare-org/psycare-api).

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.