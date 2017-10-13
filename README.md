# iWantAPlus [![Build Status](https://travis-ci.org/rijn/i-want-a-plus.svg?branch=master)](https://travis-ci.org/rijn/i-want-a-plus)

## Build Setup

``` bash
# Backend
grunt dev:server

# serve with hot reload at localhost:8080
# Server run at localhost:5000
grunt dev

# Run server or client individually
grunt dev:server
grunt dev:client

# build for production with minification
grunt build

# run ESLint test
grunt eslint

# run unit test
grunt unit

# Useful args
--livereload     Start livereload server as well
```

## Merge instruction

1. Start a new brance `git checkout -b <your-branch>`
2. Do something cool!
3. Make sure you've already pass `grunt unit` test
4. `git checkout master` and `git pull` to make sure your master branch is up to date
5. `git checkout <your-branch>` and `git rebase master`
6. Resolve conflicts by `git add` and `git rebase --continue` if possible
7. Push your commits `git push`
8. Make a PR on webpage

