import { A } from '@solidjs/router';
import { Component, Show } from 'solid-js';

type Props = {
  href?: string,
  title: string,
  icon?: Component,
  class?: string,
  label?: string,
}

export default (props: Props) => {
  const Icon = props.icon as any;

  return (
    <A href={props.href || ''}>
      <div class={`relative h-48 rounded-xl hover:scale-102 duration-200 ${props.class}`}>
        <p class="absolute bottom-8 left-2 text-background/50 text-7xl font-bold">{props.title}</p>
        <div class="absolute bottom-0 left-0 right-0 h-6 bg-background/50" />
        <Show when={props.icon}>
          <Icon size={96} class="absolute bottom-9 right-2 text-background/50" />
        </Show>
        <Show when={props.label}>
          <div class="absolute row top-2 right-2 h-8 bg-background px-4 rounded-full">
            <p class="my-auto text-sm font-bold">{props.label}</p>
          </div>
        </Show>
      </div>
    </A>
  )
}