When you open your browser on the provided URL.

Writing a Dockerfile

Docker, in a nutshell, allows developers to simply generate, distribute, and deploy images, resulting in faster development cycles and simpler application management.

With that stated, let's create a file named, Dockerfile in our root directory and paste the following content within it.
FROM node:18-alpine as builder
WORKDIR /my-space

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]

Optimize Nextjs for Production

Edit next.config.js
Edit your next.config.js, it will be generate .next/standalone.

During next build, Next.js will use @vercel/nft to statically analyze import, require, and fs usage to determine all files that a page might load.

Next.js' production server is also traced for its needed files and output at .next/next-server.js.nft.json which can be leveraged in production.

To leverage the .nft.json files emitted to the .next output directory, you can read the list of files in each trace that are relative to the .nft.json file and then copy them to your deployment location.
const nextConfig = {
    output: 'standalone',
}
Add sharp module
npm i sharp
yarn add sharp
pnpm add sharp
bun add sharp
Update start script
To optimize image size, in the standalone directory do not install the next module, and we cannot run next start. We have to run it using node.

update your package.json
{
    "scripts" : {
        "start": "node server.js",
    }
}
Build Docker Images
docker build -t rupadana/rupadana.com ./
Run app
docker run -d -p 3000:3000 rupadana/rupadana.com
Finally, it will be hosted on http://localhost:3000

Next.js Tips (2 Part Series)
1
Run Next.js 14 on docker
2
Optimizing Next.js Performance with Code Splitting and Dynamic Imports
Top comments (4)
Subscribe
pic
Add to the discussion
 
 
rupadana profile image
Rupadana
•
23년 10월 1일

Hi, kindly leave a like and comment if you got new insight! 🔥


1
Like
 
 
datroy profile image
levietdat
•
1월 18일 • Edited

How can I use with pnpm instead?


1
Like
 
 
r11 profile image
Peter Jaffray
•
23년 11월 28일

Do we need to copy next.config.js for the runner stage?


1
Like
 
 
rupadana profile image
Rupadana
•
23년 12월 30일

Yes, you need to do it.


2
Like
Code of Conduct • Report abuse
profile
Platform.sh
PROMOTED

Billboard image

Experience effortless application deployment 🚀
Deploy your apps seamlessly on an all-in-one PaaS.
🚀 Flexible, automated infrastructure provisioning.
🎯 Multicloud and multistack.
👾 Safe, secure and reliable around-the-clock.
👉 Get a 30-day free trial to build and deploy your way.

Claim your free trial

Read next
madsstoumann profile image
Camping with HTML and CSS
Mads Stoumann - Mar 22

chenaski profile image
Breaking Down Next.js 14
Eugene Boruhov - Mar 22

martinadamsdev profile image
How to add a Docusaurus website within Next.js Website as a route? It's worth $200
Martin Adams - Mar 11

highflyer910 profile image
Intersection Observer API - One Byte Explainer
Thea - Mar 21


Rupadana
Follow
I'm a Developer since 2019 joining my company as a R&D Team, Work with Programming language PHP, Javascript and Dart. Develop many things with Laravel. Currently learning automate system for CI/CD :)
JOINED
2023년 9월 7일
More from Rupadana
Filamentphp 3 : Input Group with Filament Field
#php #laravel #filamentphp #tips
Optimizing Next.js Performance with Code Splitting and Dynamic Imports
#javascript #nextjs #tutorial #webdev
profile
Auth0
PROMOTED

Auth0

Make login our problem, not yours. 🤝
Let us handle login, so you can focus on the exciting stuff. 🤝 Sign up free today.

Start building with Auth0

FROM node:18-alpine as builder
WORKDIR /my-space

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
