import { Component } from "solid-js";

type Props = {
  icon: Component,
  label: string,
}

export default (props: Props) => {
  const Icon = props.icon as any;

  return (
    <div class="row gap-2 h-12">
      <Icon size={16} strokeWidth={3} class="my-auto" />
      <p class="my-auto text-xs font-bold select-none">
        {props.label.toUpperCase()}
      </p>
    </div>
  );
}