#!/bin/bash

rsync -avz --delete public/ jemmons_jestatic@ssh.phx.nearlyfreespeech.net:/home/public/www.johnemmons.com
