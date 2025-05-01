#!/bin/bash
cp docs/.vitepress/dist ../personal-management-system-docs/docs -R;
cd ../personal-management-system-docs/docs;

git add *;
git commit -m 'Update docs';
git push;
