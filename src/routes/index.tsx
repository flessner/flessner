import { A } from '@solidjs/router';
import { MetaProvider, Title as MetaTitle } from '@solidjs/meta';
import { Folder, Newspaper, Mail } from 'lucide-solid';
import Title from '../lib/Title';
import Item from '../lib/Item';

export default () => {
  return (
    <MetaProvider>
      <MetaTitle>flessner.dev</MetaTitle>
      <div class="max-w-2xl mx-auto px-4">
        <div class="row h-20">
          <A href="/" class="my-auto font-bold text-2xl select-none">flessner.dev</A>
          <a href="mailto:torben@flessner.dev" class="my-auto ml-auto"><Mail /></a>
        </div>
        <Title label="Projects" icon={Folder} />
        <div class="col gap-4">
          <Item title="Netzblatt" href="https://viernheim.netzblatt.com" icon={Newspaper} class="bg-blue-500" label="WIP" />
          <Item title="Bookheim" class="bg-gray-500/50" label="TBD" />
          <Item title="Notized" class="bg-gray-500/50" label="TBD" />
          <Item title="NothingERP" class="bg-gray-500/50" label="TBD" />
        </div>
        <div class="h-64" />
      </div>
    </MetaProvider>
  );
}
