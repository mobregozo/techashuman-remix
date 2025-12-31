const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/manuelobregozo/?locale=en_US',
    name: 'LinkedIn',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className='h-7 w-7 flex-none transform fill-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105 group-hover:fill-primary-600 dark:fill-zinc-300'
        viewBox="0 0 16 16"
      >
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
      </svg>
    ),
  },
  {
    href: 'https://techashuman.substack.com/',
    name: 'Substack',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        className='h-7 w-7 flex-none transform fill-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105 group-hover:fill-primary-600 dark:fill-zinc-300'
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"></path>
      </svg>
    ),
  },
  {
    href: 'https://bsky.app/profile/techashuman.com',
    name: 'Bluesky',
    svg: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className='h-7 w-7 flex-none transform fill-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105 group-hover:fill-primary-600 dark:fill-zinc-300'
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.33525 3.34624C8.6282 5.3013 11.0944 9.26553 12 11.3927C12.9056 9.26553 15.3718 5.3013 17.6648 3.34624C19.3192 1.93553 22 0.844029 22 4.31729C22 5.01097 21.6498 10.1444 21.4444 10.9779C20.7305 13.8754 18.1291 14.6144 15.815 14.1671C19.8599 14.949 20.8889 17.5388 18.6667 20.1285C14.4462 25.0471 12.6007 18.8945 12.1279 17.318C12.0412 17.029 12.0006 16.8937 12 17.0087C11.9994 16.8937 11.9588 17.029 11.8721 17.318C11.3993 18.8945 9.55377 25.0471 5.33334 20.1285C3.11113 17.5388 4.14007 14.949 8.18497 14.1671C5.87088 14.6144 3.26947 13.8754 2.55556 10.9779C2.35018 10.1444 2 5.01097 2 4.31729C2 0.844029 4.68077 1.93553 6.33525 3.34624Z" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/mobregozo',
    name: 'GitHub',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className='h-7 w-7 flex-none transform fill-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105 group-hover:fill-primary-600 dark:fill-zinc-300'
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    ),
  },
]

export const SocialMedia = () => (
  <div className="mb-8 flex space-x-4">
    {socialLinks.map((link) => (
      <a
        key={link.href}
        className="group flex items-center font-medium text-sm text-zinc-800 transition hover:text-primary-600 dark:text-zinc-200 dark:hover:text-primary-600"
        href={link.href}
        aria-label={`Social media link of ${link.name}`}
      >
        {link.svg}
      </a>
    ))}
  </div>
)
