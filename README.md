### Get Start

Upload packets: **npm install**

Add user (admin, admin): **node bin/addUser**
  
  NODE_PATH = .
  
  NODE_ENV = development
  
  DEBUG = debug, warn
  
### Routes
**/**  - main

**/login**   - authorized form

**/game**   - game page

### Run server

```
npm run start
```

### Architecture

**modules/socket/index.js** listening clients events

**views/game.jade** listening server events