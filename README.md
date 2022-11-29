## Next.js memory leak demo
Calling `fetch()` without consuming the body will leak memory, for example

```typescript
    fetch("http://127.0.0.1:3000/api/test")
      .then(async (res) => {
        return res.headers;
      })
```

But forcibly consuming the body will not

```typescript
    fetch("http://127.0.0.1:3000/api/test")
      .then(async (res) => {
        for await (const chunk of res.body as any) {
          // force consumption of body
        }

        return res.headers;
      })
```

This is a [Next.js](https://nextjs.org/) template to use when reporting a [bug in the Next.js repository](https://github.com/vercel/next.js/issues). 