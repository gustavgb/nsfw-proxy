# nsfw-proxy

I had the idea to intercept browser requests for images and load them through a proxy that would use deepai.org's nudity detection API and block images that scored poorly. However, it is far too unreliable, slow and pricy to use for any real application.

## Development

Add a `key.json` file in the root:

```json
{
  "key": "YOUR_API_KEY"
}
```

Then `node .`

Now, try it at `http://localhost:9999/?image=IMAGE_URL`.
