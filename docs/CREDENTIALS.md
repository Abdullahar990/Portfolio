# Asset utility credentials

The original `compress-images.js` contained an image-processing API key. It has been removed from the current source. Because an earlier version may still exist in Git history, removing the literal does not revoke the credential.

The owner should rotate or revoke that key in the [Tinify account](https://tinify.com/developers). The portfolio, CI and Vercel deployment do not need this key. Do not copy the old key into Vercel, client environment variables, an issue or a commit.

The optional utility now reads `TINIFY_API_KEY` from the process environment, stops before any request when absent and writes optimized copies under the ignored `test-results/optimized-images/` directory. It preserves the original public assets. Tinify is an external service with its own account quota; it is not needed for site rendering or Next.js image optimization.

If you intentionally use the utility, provide a newly issued key through your shell's secure environment tooling. Node 24 can also load a private, ignored `.env.local` file:

```sh
node --env-file=.env.local compress-images.js
```

Do not prefix this credential with `NEXT_PUBLIC_`. Review optimized copies before replacing source images. The utility does not log keys, SDK request objects or SDK error text.

See the [official Tinify Node.js reference](https://tinify.com/developers/reference/nodejs) for authentication and account-error handling.
