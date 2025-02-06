import type { AvailableLanguageTag } from "../../lib/paraglide/runtime"
import type { ParaglideLocals } from "@inlang/paraglide-sveltekit"
/// <reference types="svelte-clerk/env" />

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: any;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
