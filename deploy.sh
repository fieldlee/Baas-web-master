#!/usr/bin/env bash
rm -rf dist
npm run build
scp -r dist/ root@192.168.0.237:/var/www/Baas-web
