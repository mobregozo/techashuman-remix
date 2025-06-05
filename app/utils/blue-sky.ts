export async function getBlueSkyThreadInfo(postId: string) {
  const username = 'techashuman.com'
  const uri = `at://${username}/app.bsky.feed.post/${postId}`
  const postUrl = `https://bsky.app/profile/${username}/post/${postId}`
  const res = await fetch(
    'https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=' + uri,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    return { thread: null, postUrl }
  }

  return { thread: await res.json(), postUrl }
}
