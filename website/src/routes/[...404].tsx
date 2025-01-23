import { HttpStatusCode } from '@solidjs/start';
import { A } from '@solidjs/router';

export default () => {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="py-20 col gap-4 text-center">
        <p class="font-bold text-5xl">404</p>
        <A href="/" class="text-blue-500">{"<- Home"}</A>
      </div>
    </>
  );
}
