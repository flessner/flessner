const Heading = (props: any) => {
  return (
    <h2 class="mb-2 mt-8 text-foreground/muted font-mono font-bold tracking-widest text-xs">{props.children}</h2>
  );
}

const Link = (props: any) => {
  return (
    <a href={props.href} class="text-primary underline block">
      {props.children}
    </a>
  );
}

export default () => {
  return (
    <div class="max-w-lg mx-auto px-4 -mt-4">
      <Heading>PROJECTS</Heading>
      <Link href="https://netzblatt.com">netzblatt</Link>
      <Heading>PACKAGES</Heading>
      <Link href="https://www.npmjs.com/package/@flessner/unocss-preset">@flessner/unocss-autload</Link>
      <Link href="https://www.npmjs.com/package/@flessner/unocss-preset">@flessner/unocss-preset</Link>
      <Heading>SOCIALS</Heading>
      <Link href="https://github.com/flessner">github</Link>
      <Link href="https://bsky.app/profile/flessner.dev">bluesky</Link>
    </div>
  );
}
