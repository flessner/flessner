// import { LRUCache } from "lru-cache"
import { users } from "./data.js"
import { CronJob } from 'cron';

const FIREBASE = 'https://hacker-news.firebaseio.com/v0'
const AGOLIA = 'https://hn.algolia.com/api' // 10000 requests per hour
const WEBHOOK = 'https://discord.com/api/webhooks/1330913886240641044/gUUXyHecrQXtq1b5Gzvf1ohhqgq-lUc2zZFgcD_fQsfsnzvc_G0eXKVIbDYqNLM1eBmC'

// run every hour
new CronJob('0 * * * *', main, null, true);

async function main() {
  // console.log('fetching top stories...')
  try {
    // fetching top 500 HN stories
    const req = await fetch(`${FIREBASE}/topstories.json?print=pretty`)
    const data = await req.json()

    // result object of all data points
    let results: any[] = []

    for (const storyId of data) {
      // fetching comments for each story
      const req = await fetch(`${AGOLIA}/v1/items/${storyId}`)
      const data = await req.json()

      // loop through all comments
      const commentTree = data.children || []
      const comments = traverseComments(commentTree)

      for (const comment of comments) {
        const { author, text, id: commentId, created_at: createdAt } = comment

        const timestamp = new Date(createdAt)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

        // only consider comments from the last hour
        if (timestamp < oneHourAgo) continue

        if (Object.keys(users).includes(author)) {
          results.push({ author, text, commentId, storyId })
        }
      }
    }

    // if no results, stop
    if (results.length == 0) return

    // tally the results
    const stories: any = {};
    results.forEach(item => {
      stories[item.storyId] = (stories[item.storyId] || 0) + 1;
    });

    // get current date and time
    const now = new Date()
    const time = now.toTimeString().split(' ')[0]

    // prepare message
    let message = `${now.toDateString()} - ${time}\n`
    for (const story of Object.keys(stories)) {
      // load story metadata
      const req = await fetch(`${AGOLIA}/v1/items/${story}`)
      const data = await req.json()
      message += `[${data.title || "Unnamed HN Story"}](<https://news.ycombinator.com/item?id=${story}>) (${stories[story]})\n`

      // find story posts
      const posts = results.filter((item: any) => item.storyId == story)
      const authors: any = {}
      posts.forEach((post: any) => {
        authors[post.author] = (authors[post.author] || 0) + 1
      })

      // append authors
      Object.keys(authors).forEach((author: any) => {
        message += `- ${author} (${authors[author]}) - ${users[author]}\n`
      })

      message += '\n'
    }

    // send message to discord
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: message
       })
    })

    // console.log('message sent to discord')
  } catch (error) {
    console.error(error)
  }
}

// helper function to traverse comments
function traverseComments(comments: any[]): any[] {
  let result: any[] = []

  // traverse function
  function traverse(comment: any) {
    result.push({ ...comment, children: undefined });
    if (Array.isArray(comment.children)) {
      comment.children.forEach(traverse);
    }
  }

  // start traversing
  comments.forEach(traverse)
  return result
}